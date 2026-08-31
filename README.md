# PromptWars

Hackathon starter — React + Vite frontend, Node/Express backend, Neon Postgres (SQLite fallback).

## Quick Start

```bash
# Install dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL and AUTH_TOKEN (optional)

# Run both frontend + backend
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3001

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/ping | Returns `{ ok: true, timestamp }` — used to verify round-trip |

## Deploy to Vercel

```bash
npx vercel           # preview deploy
npx vercel --prod    # production deploy
```

## Project Structure

```
frontend/    — React + Vite + TypeScript
backend/     — Node + Express + TypeScript
.opencode/   — Custom commands and agents for hackathon speed
```
