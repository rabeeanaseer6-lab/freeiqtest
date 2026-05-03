import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useSubmitTestResult } from '@workspace/api-client-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Brain, Clock, ChevronRight } from 'lucide-react';
import { questions } from '@/data/questions';

export default function Test() {
  usePageTitle('Take the Free IQ Test — 30 Questions, Instant Results');
  const [, setLocation] = useLocation();
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const submitResult = useSubmitTestResult();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (started && startTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started, startTime]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStarted(true);
    setStartTime(Date.now());
  };

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: answerIndex }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishTest({ ...answers, [currentQuestionIndex]: answerIndex });
    }
  };

  const finishTest = (finalAnswers: Record<number, number>) => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (finalAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round(70 + (correct / questions.length) * 75);
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

    const localResult = {
      id: 0,
      userName: userName || null,
      score,
      timeTaken,
      correctAnswers: correct,
      totalQuestions: questions.length,
      percentile: calculatePercentile(score),
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem('iq_local_result', JSON.stringify(localResult));
    setLocation('/results/local');

    submitResult.mutate(
      {
        data: {
          userName: userName || undefined,
          score,
          timeTaken,
          correctAnswers: correct,
          totalQuestions: questions.length,
        },
      },
      {
        onSuccess: (result) => {
          setLocation(`/results/${result.id}`);
        },
      }
    );
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!started) {
    return (
      <Layout>
        <div className="container mx-auto max-w-2xl px-4 py-24">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Official Cognitive Assessment</h1>
              <p className="text-lg text-slate-600 mb-8">
                This assessment consists of 30 questions designed to measure logical, spatial, and numerical reasoning.
                Find a quiet place. You will have approximately 20 minutes.
              </p>
              <form onSubmit={handleStart} className="max-w-sm mx-auto space-y-4">
                <div>
                  <Input
                    placeholder="Enter your name or location (optional)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="text-center"
                  />
                  <p className="text-xs text-slate-500 mt-2">Used for the public leaderboard.</p>
                </div>
                <Button type="submit" size="lg" className="w-full h-12 text-lg">
                  Begin Test
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <Layout>
      <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-8">
        <div className="container mx-auto max-w-3xl px-4">

          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="flex items-center text-slate-600 font-mono bg-white px-3 py-1 rounded-md border shadow-sm">
              <Clock className="h-4 w-4 mr-2" />
              {formatTime(timeElapsed)}
            </div>
          </div>

          <Progress value={progress} className="h-2 mb-8 bg-slate-200" />

          <Card className="border-0 shadow-md mb-8">
            <CardContent className="p-8 md:p-10">
              <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-6">
                {currentQuestion.category}
              </div>

              <h2 className="text-xl md:text-2xl font-medium text-slate-900 mb-8 leading-relaxed">
                {currentQuestion.text}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-blue-50 transition-all duration-200 group flex items-center justify-between"
                  >
                    <span className="text-slate-700 font-medium group-hover:text-primary">{option}</span>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  );
}

function calculatePercentile(score: number): number {
  if (score >= 130) return 98;
  if (score >= 125) return 95;
  if (score >= 120) return 91;
  if (score >= 115) return 84;
  if (score >= 110) return 75;
  if (score >= 105) return 63;
  if (score >= 100) return 50;
  if (score >= 95) return 37;
  if (score >= 90) return 25;
  if (score >= 85) return 16;
  if (score >= 80) return 9;
  if (score >= 75) return 5;
  if (score >= 70) return 2;
  return 1;
}
