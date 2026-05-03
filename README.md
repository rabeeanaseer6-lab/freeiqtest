# 🧠 FreeIQTest.online — Psychometric IQ Platform

[![Website Live](https://img.shields.io/website?url=https%3A%2F%2Ffreeiqtest.online&label=Live%20Platform&style=for-the-badge)](https://freeiqtest.online)
[![React](https://img.shields.io/badge/React_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](#tech-stack)
[![Express.js](https://img.shields.io/badge/Express_5-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](#tech-stack)
[![MySQL](https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)](#database)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg?style=for-the-badge)](#license)

> A professional, high-authority IQ testing platform built for deployment at **[freeiqtest.online](https://freeiqtest.online)**. Delivers a scientifically styled 30-question cognitive assessment with IRT-based scoring, instant percentile results, a live leaderboard, long-form blog, knowledge wiki, and a full authority-content infrastructure.

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database](#-database)
- [Deploying to Hostinger](#-deploying-to-hostinger)
- [Author & Licensing](#-author)

---

## 🔬 Overview

**FreeIQTest.online** is a full-stack monorepo web platform designed to be a trusted, high-traffic IQ assessment destination. It combines psychometrically rigorous test scoring with a deep content ecosystem (blog, wiki, methodology pages) to build domain authority and organic search presence.

**Key Design Goals:**
* **Scientific Credibility:** IRT-based (Item Response Theory) scoring normalized to mean=100, SD=15 (WAIS standard).
* **SEO Authority:** Structured data (JSON-LD), comprehensive meta tags, canonical URLs, and Open Graph / Twitter Cards.
* **Performance:** Lightning-fast React + Vite SPA frontend, Express API, and MySQL backend.
* **Analytics:** Native Google Analytics 4 (`G-RVCG58P63Z`) integrated via `gtag.js`.

---

## ✨ Features

### 🧠 Assessment Engine
* **30-Question Adaptive Test:** Covers matrix reasoning, quantitative reasoning, and spatial visualization.
* **IRT-Based Algorithm:** Scores are not based on a raw count; the algorithm rewards correctly answering higher-difficulty questions.
* **Time Bonus:** Dynamic scoring adjustments applied for faster completion times.
* **Normalized Distribution:** Scores map strictly to the IQ scale (70–145 range) with percentiles calculated from a normal distribution.

### 📊 Results & Leaderboard
* **Instant Results Page:** Displays IQ score, percentile rank, and a bell curve visualization (via Recharts).
* **Score Breakdown:** Detailed analysis by cognitive domain.
* **Live Leaderboard:** Real-time top 10 daily scores.
* **Platform-Wide Stats:** Tracks total tests taken, average score, highest score, and daily volume.

### 📚 Content Ecosystem
* **Blog:** 13 long-form articles with featured Unsplash images, author bios, related posts, and tag filtering.
* **Wiki:** 17 in-depth knowledge base entries across 5 categories (Intelligence Theory, Psychometrics, Neuroscience, Cognitive Factors, Test Design) featuring full-text search.
* **Methodology & Science:** Deep-dives into IRT, g-factor assessment, scoring pipelines, neuroscience, and psychology.

### 🔍 SEO & Identity
* **Full `<head>` Meta Suite:** Description, keywords, author, robots, theme-color, and canonical links.
* **Rich Previews:** Open Graph tags and Twitter Cards for social sharing.
* **Structured Data:** JSON-LD integration for `WebSite`, `Organization`, and `Quiz` schemas.
* **Dynamic Document Titles:** Handled efficiently via a custom `usePageTitle` hook.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite 7, TypeScript |
| **Routing** | Wouter |
| **UI & Styling** | shadcn/ui, Tailwind CSS v4, Framer Motion, Lucide React |
| **Charts** | Recharts |
| **Data Fetching** | TanStack Query v5 |
| **API Backend** | Express 5, TypeScript |
| **ORM & DB** | Drizzle ORM, MySQL (mysql2 driver) |
| **Validation** | Zod |
| **Code Generation**| Orval (OpenAPI → React Query hooks) |
| **Tooling** | pnpm (workspace monorepo), esbuild (API), Vite (frontend) |
| **Logging** | Pino + pino-http |

---

## 📂 Project Structure

```text
/
├── artifacts/
│   ├── iq-test/              # React + Vite frontend (main site)
│   │   ├── index.html        # SEO meta, JSON-LD, Google Analytics
│   │   ├── public/
│   │   │   └── favicon.svg   # Branded brain icon
│   │   └── src/
│   │       ├── pages/        # All page components (17 routes)
│   │       ├── components/   # Layout, Header, Footer, UI primitives
│   │       ├── data/         # Questions, articles (blog), wiki terms
│   │       └── hooks/        # usePageTitle, use-toast, etc.
│   │
│   └── api-server/           # Express REST API
│       └── src/
│           ├── routes/       # /results, /leaderboard, /stats, /health
│           └── lib/          # Logger
│
└── lib/
    ├── db/                   # @workspace/db — Drizzle schema + MySQL connection
    │   ├── src/schema/       # testResultsTable definition
    │   ├── src/index.ts      # mysql2 driver + drizzle instance
    │   └── drizzle.config.ts # dialect: "mysql"
    ├── api-spec/             # OpenAPI spec (source of truth)
    ├── api-zod/              # Zod schemas auto-generated from spec
    └── api-client-react/     # TanStack Query hooks auto-generated by Orval
🗺 Pages & RoutesPathPage Description/Home — Hero, stats ticker, how-it-works, IQ distribution, EQ comparison, CTA./testTest — 30-question IQ test with active timer./results/:idResults — Score, percentile, bell curve, sharing options./blogBlog — Article listing with tag filter and search./blog/:slugArticle — Individual long-form blog post./wikiKnowledge Base — 17 entries, category filtering, search./methodologyMethodology — IRT methodology deep-dive./scienceScience — Science of intelligence (g-factor, Flynn Effect, etc.)./updatesUpdates — Platform changelog./aboutAbout — Mission, methodology summary, author bio./authorAuthor — Dedicated Rabeea Naseer profile page./contactContact — User inquiry form./careersCareers — Open roles and company values./privacy, /terms, /disclaimer, /cookiesLegal — Standard platform compliance policies.🚀 Getting StartedPrerequisitesNode.js 20+pnpm 9+A MySQL database (local or hosted)InstallationBash# Clone the repo
git clone [https://github.com/rabeeanaseer6-lab/Psychometric-IQ-Platform.git](https://github.com/rabeeanaseer6-lab/Psychometric-IQ-Platform.git)
cd Psychometric-IQ-Platform

# Install all workspace dependencies
pnpm install
DevelopmentTwo services need to run simultaneously: the API server and the Vite dev server.Bash# Terminal 1: Start the API server (port 8080 by default)
pnpm --filter @workspace/api-server run dev

# Terminal 2: Start the frontend
pnpm --filter @workspace/iq-test run dev
The frontend will be available at http://localhost:<PORT>.🗄 DatabaseThe application utilizes a single highly-optimized table managed via Drizzle ORM (lib/db/src/schema/results.ts).SQLCREATE TABLE test_results (
  id              SERIAL PRIMARY KEY,
  user_name       VARCHAR(255),
  score           INT NOT NULL,
  time_taken      INT NOT NULL,        -- in seconds
  correct_answers INT NOT NULL,
  total_questions INT NOT NULL,
  percentile      INT NOT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
To sync your schema: After setting your DATABASE_URL in your .env, push the schema to your database (no migration files needed):Bashpnpm --filter @workspace/db run push
🔐 Environment VariablesSet these in your deployment environment or a local .env file (never commit secrets).VariableRequiredDescriptionDATABASE_URLYesMySQL connection string.SESSION_SECRETYesSecret key for signing sessions.NODE_ENVYesSet to production for deployment.PORTNoAPI server port (default: 8080, auto-injected by most hosts).LOG_LEVELNoPino log level: info (default), warn, or error.Database URL Format (Example for Hostinger):mysql://u123456789_mydb:MySecurePassword@srv1234.hstgr.io:3306/u123456789_mydb☁️ Deploying to Hostinger1. Build the frontendBashpnpm --filter @workspace/iq-test run build
Output goes to artifacts/iq-test/dist/. Upload or serve this via Hostinger's file manager for static files.2. Build the API serverBashpnpm --filter @workspace/api-server run build
Output goes to artifacts/api-server/dist/index.mjs. Run via Node.3. Configure Hostinger EnvironmentAdd your environment variables under Advanced → PHP / Node.js configuration in your Hostinger hPanel. Ensure NODE_ENV is set to production.4. Push Database SchemaRun this command locally or via Hostinger's terminal once your database is created:BashDATABASE_URL="mysql://..." pnpm --filter @workspace/db run push
5. Point Your DomainIn Hostinger DNS, point freeiqtest.online to your hosting IP. SSL is handled automatically by Hostinger's built-in Let's Encrypt integration.👨‍💻 AuthorRabeea Naseer Founder @ NovatraTech — AI & Data-Driven Systems Developer Building scalable SaaS products, automated web infrastructures, and data-intelligent digital ecosystems.Portfolio: rabeeanaseer.onlineCompany: novatratech.onlineLinkedIn: linkedin.com/in/rabeea-naseer-045b4a337GitHub: @rabeeanaseer6-labKaggle: kaggle.com/rabeeanaseer📄 LicenseThis project is proprietary software. All rights reserved — FreeIQTest.online © 2026.For licensing or enterprise deployment inquiries, contact: legal@freeiqtest.online
