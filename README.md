<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF9933,50:FFFFFF,100:138808&height=200&section=header&text=Jan%20Sutra&fontSize=60&fontColor=1a1a2e&animation=fadeIn&fontAlignY=35&desc=India's%20First%20Fully%20Digital%20Census%20—%20Census%202027&descAlignY=55&descSize=18" width="100%"/>

<a href="https://jansutra-web.vercel.app/">
  <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=22&pause=1000&color=FF9933&center=true&vCenter=true&width=600&lines=Built+for+Prompt+Wars+%23PromptWarsXADYPU;Explaining+Census+2027+to+every+Indian+citizen;React+%2B+Firebase+%2B+GenAI+%E2%80%94+shipped+in+4+hours" alt="Typing SVG" />
</a>

<br/><br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-jansutra--web.vercel.app-FF9933?style=for-the-badge)](https://jansutra-web.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/📦_Source-GitHub-138808?style=for-the-badge&logo=github)](https://github.com/phadtareshivansh/Jansutra)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![OpenRouter](https://img.shields.io/badge/GenAI-OpenRouter%2FGemini-8A2BE2?style=flat-square)

</div>

<br/>

## 🇮🇳 About

**Jan Sutra** (जनसूत्र — "the people's thread") is a GenAI-powered web app that makes **Census 2027** — India's 16th census and first ever conducted fully digitally — actually understandable for the average citizen.

Built solo, end-to-end, in a 4-hour hackathon (**Prompt Wars — #PromptWarsXADYPU**, hosted by Hack2Skill), the problem statement dropped with zero warning and the whole stack came together in one sitting.

> ⚠️ **This is a hackathon demo project, not an official government website.** It is not affiliated with the Office of the Registrar General & Census Commissioner, India.

<br/>

## ✨ What it does

| | Feature | Description |
|---|---|---|
| 🗓️ | **Two-Phase Explainer** | Breaks down Phase 1 (Houselisting & Housing Census) vs Phase 2 (Population Enumeration) — what each collects, and why it matters |
| 📍 | **State-wise Schedule** | Searchable, Firestore-backed lookup of self-enumeration and survey dates by state, with live status badges |
| 🧭 | **Self-Enumeration Guide** | Step-by-step walkthrough of the actual `se.census.gov.in` process, from ID verification to receiving your Self-Enumeration ID |
| 🔒 | **Privacy & Myth-Busting** | Explains real data protections and directly debunks common misinformation (e.g. "no documents required") |
| 📊 | **Data Visualization** | Visual breakdown of rollout scale — enumerators, villages, states, and phase timing |
| 🌐 | **Multi-language Support** | Full i18n across English, Hindi, Marathi, and Tamil |
| 🤖 | **Ask Assistant** | GenAI chat assistant grounded in real Census 2027 facts — no hallucinated dates |
| 🔐 | **Google Sign-In** | Firebase Authentication for a personalized experience |

<br/>

## 🛠️ Tech Stack

```
Frontend    →  React + Vite + TypeScript
Backend     →  Node.js + Express + TypeScript
Database    →  Firebase Firestore (via firebase-admin)
Auth        →  Firebase Authentication (Google sign-in)
GenAI       →  /api/ask assistant, routed through OpenRouter (Gemini)
Deploy      →  Vercel (static frontend + serverless /api/* functions)
```

<br/>

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 2. Backend environment (server-only secrets)
cp backend/.env.example backend/.env
# Fill in FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY,
# and OPENROUTER_API_KEY (optional, powers /api/ask)

# 3. Frontend environment (public config, not secrets)
cp frontend/.env.example frontend/.env
# Fill in the VITE_FIREBASE_* web-app-config values

# 4. Seed Firestore (optional but recommended)
cd backend && npm run seed

# 5. Run everything
npm run dev
```

Frontend → `http://localhost:5173` &nbsp;·&nbsp; Backend → `http://localhost:3001`

> **No Firebase credentials yet?** The app still runs — without `FIREBASE_*` env vars, the backend falls back to in-memory seed data for `/api/states`, and auth is bypassed in dev mode.

<details>
<summary><b>📋 Setting up your own free Firebase project (click to expand)</b></summary>

<br/>

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**
2. **Build → Firestore Database → Create database** (test mode is fine, pick a nearby region like `asia-south1`)
3. **Build → Authentication → Get started → Sign-in method → enable Google**
4. **Project Settings → Your apps → Add app → Web** → copy the `firebaseConfig` object into `frontend/.env` as `VITE_FIREBASE_*`
5. **Project Settings → Service Accounts → Generate new private key** → from the downloaded JSON, copy `project_id`, `client_email`, and `private_key` into `backend/.env` (keep the `\n` escapes, wrap in quotes)

**Never commit the service account JSON or its values.**

</details>

<br/>

## 🔌 API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/ping` | Health check |
| `GET` | `/api/states` | All state schedules (Firestore, with seed fallback) |
| `POST` | `/api/ask` | GenAI assistant, grounded in real Census 2027 facts |

Protected endpoints verify a Firebase ID token sent as `Authorization: Bearer <token>`.

<br/>

## 📁 Project Structure

```
api/         → Vercel serverless functions (/api/*)
backend/     → Express server (local dev) + firebase-admin + seed script
frontend/    → React + Vite + TypeScript (Firebase Auth, Google sign-in)
.opencode/   → Custom commands and agents used to build this in 4 hours
```

<br/>

## 🧪 Tests

```bash
cd backend && npm test    # seed data integrity
cd frontend && npm test   # date-window logic
```

<br/>

## 📦 Deploy to Vercel

```bash
npx vercel           # preview deploy
npx vercel --prod    # production deploy
```

Set environment variables in **Vercel → Project → Settings → Environment Variables** before deploying — see `.env.example` in both `backend/` and `frontend/` for the full list.

<br/>

## 🏆 Built For

**Prompt Wars** (`#PromptWarsXADYPU`) — a 4-hour hackathon where the problem statement is released at the exact start time. This project was conceived, built, and deployed entirely within that window, solo, using [Antigravity](https://antigravity.google/) as an AI pair-programmer.

<br/>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:138808,50:FFFFFF,100:FF9933&height=100&section=footer" width="100%"/>

Made with 🧡🤍💚 for **Census 2027**

</div>
