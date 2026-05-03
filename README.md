# 🧠 FreeIQTest — Psychometric Intelligence Platform

[![Website Live](https://img.shields.io/website?url=https%3A%2F%2Ffreeiqtestonline.online&label=Live%20Platform&style=for-the-badge)](https://freeiqtestonline.online)
[![React](https://img.shields.io/badge/React_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](#tech-stack)
[![Express.js](https://img.shields.io/badge/Express_5-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](#tech-stack)
[![MySQL](https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)](#database)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg?style=for-the-badge)](#license)

> A professional, high-authority IQ testing platform deployed at **[freeiqtestonline.online](https://freeiqtestonline.online)**. This platform delivers a scientifically calibrated 30-question cognitive assessment using IRT-based scoring, instant percentile analysis, a live global leaderboard, and a comprehensive educational ecosystem built to drive high organic search traffic.

---
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/9c897b91-7825-4906-a51b-7e668f59e1d8" />


## 📑 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Getting Started](#-getting-started)
- [Database Architecture](#-database-architecture)
- [Environment Variables](#-environment-variables)
- [Author & Licensing](#-author)

---

## 🔬 Overview

**FreeIQTest** is a full-stack monorepo web application engineered to be a trusted destination for psychometric assessment. It shifts away from basic "quiz" logic to utilize real mathematical models for intelligence scoring while building massive domain authority through a deep, structured content library.

**Platform Highlights:**
* **Scientific Rigor:** Item Response Theory (IRT) scoring normalized to a true intelligence bell curve (mean=100, SD=15).
* **Technical SEO Mastery:** Implements strict structured data (JSON-LD), canonical routing, and dynamic meta-tagging for maximum search visibility.
* **Modern Performance:** Lightning-fast React + Vite Single Page Application (SPA) driven by an Express/MySQL backend.

---

## ✨ Features

### 🧠 The Assessment Engine
* **30-Question Adaptive Matrix:** Tests logical reasoning, quantitative analysis, and spatial visualization.
* **Weighted Scoring (IRT):** Dynamically rewards users for correctly solving high-difficulty nodes.
* **Time Penalties/Bonuses:** Precision scoring based on completion speed.
* **WAIS-Standard Normalization:** Outputs accurate percentiles mapped directly to the 70–145 IQ scale.

### 📊 Real-Time Analytics & Leaderboard
* **Instant Breakdown:** Users receive their exact score, global percentile, and a rendered bell curve (powered by Recharts).
* **Live Global Leaderboard:** Ranks the top 10 daily scores in real-time.
* **Platform Telemetry:** Publicly tracks total assessments taken, platform average score, and daily volume.

### 📚 SEO Content Ecosystem
* **Knowledge Wiki:** 17 in-depth academic entries across Neuroscience, Psychometrics, and Intelligence Theory, complete with full-text search.
* **Long-Form Blog:** 13 deeply researched articles featuring dynamic routing, tag filtering, and related-post algorithms.
* **Methodology Hub:** Transparent documentation detailing the platform's psychometric pipeline.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite 7, TypeScript |
| **Routing** | Wouter |
| **UI Architecture** | shadcn/ui, Tailwind CSS v4, Framer Motion, Lucide React |
| **Data Visualization** | Recharts |
| **State & Fetching** | TanStack Query v5 |
| **Backend API** | Express 5, Node.js |
| **Database & ORM** | MySQL (mysql2), Drizzle ORM |
| **Schema Validation** | Zod |
| **API Code Generation**| Orval (OpenAPI → React Query hooks) |
| **Package Management** | pnpm (Workspace Monorepo) |

---

## 📂 Project Structure

```text
/
├── artifacts/
│   ├── iq-test/              # Frontend Web Application
│   │   ├── index.html        # SEO, JSON-LD, GA4 Initialization
│   │   ├── public/           # Static assets & SVG Favicon suite
│   │   └── src/
│   │       ├── pages/        # All 17 route components
│   │       ├── components/   # UI Primitives, Layouts, Charts
│   │       ├── data/         # Assessment JSON, Wiki/Blog data
│   │       └── hooks/        # Custom SEO and utility hooks
│   │
│   └── api-server/           # Backend Express API
│       └── src/
│           ├── routes/       # Handlers: /results, /leaderboard, /stats
│           └── lib/          # Pino Logger & Middleware
│
└── lib/
    ├── db/                   # Drizzle Schema & MySQL Connection pooling
    ├── api-spec/             # Single Source of Truth: OpenAPI Spec
    ├── api-zod/              # Auto-generated Zod validation layers
    └── api-client-react/     # Auto-generated TanStack Query hooks
```

---

## 🗺 Pages & Routes

| Path | Description |
| :--- | :--- |
| `/` | **Home** — Value proposition, statistics ticker, IQ distribution visuals. |
| `/test` | **Assessment Engine** — The core 30-question interactive test. |
| `/results/:id` | **Results** — Personalized score report and percentile chart. |
| `/blog` | **Blog Index** — Dynamic article listing with category filters. |
| `/blog/:slug` | **Article** — Immersive, long-form reading experience. |
| `/wiki` | **Wiki** — Encyclopedia of intelligence with search capabilities. |
| `/methodology` | **Methodology** — Documentation of scoring algorithms. |
| `/science` | **Science** — Deep dives into the g-factor and the Flynn Effect. |
| `/about` | **About** — Mission statement and creator bio. |
| `/author` | **Author** — Dedicated profile for Rabeea Naseer. |
| `/updates` , `/contact` | **Platform** — Changelogs and user inquiry routing. |
| `/privacy`, `/terms`... | **Compliance** — Standard legal and cookie policies. |

---

## 🚀 Getting Started

### Prerequisites
* Node.js 20+
* pnpm 9+
* A running MySQL instance

### Local Installation
```bash
# Clone the repository
git clone [https://github.com/rabeeanaseer6-lab/Psychometric-IQ-Platform.git](https://github.com/rabeeanaseer6-lab/Psychometric-IQ-Platform.git)
cd Psychometric-IQ-Platform

# Install workspace dependencies
pnpm install
```

### Running the Development Environment
This is a monorepo, requiring both the API and Frontend to run concurrently.

```bash
# Terminal 1: Boot the API Server (Defaults to port 8080)
pnpm --filter @workspace/api-server run dev

# Terminal 2: Boot the Frontend application
pnpm --filter @workspace/iq-test run dev
```

---

## 🗄 Database Architecture

The backend operates on a highly optimized, single-table architecture designed for rapid writes and leaderboard reads, managed by **Drizzle ORM**.

```sql
CREATE TABLE test_results (
  id              SERIAL PRIMARY KEY,
  user_name       VARCHAR(255),
  score           INT NOT NULL,
  time_taken      INT NOT NULL,        -- measured in seconds
  correct_answers INT NOT NULL,
  total_questions INT NOT NULL,
  percentile      INT NOT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

**Syncing your database locally:**
```bash
# Push the Drizzle schema directly to your MySQL instance
pnpm --filter @workspace/db run push
```

---

## 🔐 Environment Variables

Create a `.env` file at the root of your workspace. Never commit this file.

| Variable | Required | Description |
| :--- | :---: | :--- |
| `DATABASE_URL` | **Yes** | Standard MySQL connection string. |
| `SESSION_SECRET` | **Yes** | Cryptographic key for session integrity. |
| `NODE_ENV` | **Yes** | `development` or `production`. |
| `PORT` | No | Target port for the API server (Default: 8080). |

---

## 👨‍💻 Author

**Rabeea Naseer** *Founder @ NovatraTech — AI & Data-Driven Systems Developer* Architecting scalable SaaS products, automated web infrastructures, and data-intelligent digital ecosystems.

* **Portfolio:** [rabeeanaseer.online](https://rabeeanaseer.online)
* **Company:** [novatratech.online](https://novatratech.online)
* **LinkedIn:** [linkedin.com/in/rabeea-naseer](https://linkedin.com/in/rabeea-naseer-045b4a337)
* **GitHub:** [@rabeeanaseer6-lab](https://github.com/rabeeanaseer6-lab)
* **Kaggle:** [kaggle.com/rabeeanaseer](https://kaggle.com/rabeeanaseer)

---

## 📄 License

This project is proprietary software. All rights reserved — FreeIQTest.online © 2026.  
For licensing, enterprise deployment, or codebase inquiries, contact: **legal@freeiqtestonline.online**
