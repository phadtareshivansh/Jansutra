# AGENTS.md — PromptWars Hackathon Rules

## Development Rules

1. **Prefer proven, boring libraries** over new/fancy ones under time pressure. React, Express, Vite, Postgres — these win hackathons.

2. **Commit after every working feature** — small, frequent commits. Never accumulate 50 changes in one commit. A working checkpoint beats a perfect one.

3. **Write minimal tests only for core business logic.** Skip tests for UI components and glue code. Time is scarce — test what breaks the app, not what looks nice on a coverage report.

4. **Default stack:**
   - Frontend: React + Vite + TypeScript
   - Backend: Node.js + Express + TypeScript
   - Database: Neon Postgres (SQLite fallback for local dev)
   - Deploy: Vercel

5. **Always keep a working deployable state.** Never leave main broken for longer than 10 minutes. If a feature isn't done, it goes behind a flag or a route — not in a broken state.

6. **Explain trade-offs briefly before big architectural decisions.** Don't silently pick one. A one-sentence "I'm choosing X because Y" is enough — but make it explicit.

## Quick Reference

- Frontend dev: `cd frontend && npm run dev`
- Backend dev: `cd backend && npm run dev`
- Full dev: `npm run dev` (from root — runs both)
- Deploy: `npx vercel --prod`
