# PromptWars — Census 2027 · Digital Enumeration

Hackathon app for India's first fully digital census. React + Vite frontend, Node/Express backend, **Firebase Firestore** for storage, **Firebase Authentication** (Google sign-in), deployed on Vercel.

## Stack

- **Frontend:** React + Vite + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Database:** Firebase Firestore (via `firebase-admin`)
- **Auth:** Firebase Authentication (Google sign-in popup)
- **GenAI:** `/api/ask` assistant routed through OpenRouter (Gemini model)
- **Deploy:** Vercel (static frontend + serverless `/api/*` functions)

## Quick Start (local dev)

```bash
# 1) Install dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 2) Set up backend environment (server-only secrets)
cp backend/.env.example backend/.env
#    Fill in FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY,
#    and OPENROUTER_API_KEY (optional, for /api/ask).

# 3) Set up frontend environment (public config — not secrets)
cp frontend/.env.example frontend/.env
#    Fill in the VITE_FIREBASE_* web-app-config values.

# 4) Seed Firestore (optional but recommended)
cd backend && npm run seed

# 5) Run both servers
npm run dev
```

Frontend: http://localhost:5173 · Backend: http://localhost:3001

> **No credentials yet?** The app still runs. Without `FIREBASE_*` env vars the backend falls back to in-memory seed data for `/api/states` and auth is bypassed (dev mode) — so you can develop the UI before Firebase is ready.

## Step-by-step: Create a free Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and click **Add project**. Enter a project name and follow the prompts (Google Analytics optional, can disable).
2. In **Build → Firestore Database**, click **Create database**, choose **production mode** (or test mode for quick hacking), and pick a region (e.g. `asia-south1`).
3. Enable **Google sign-in**:
   - **Build → Authentication → Get started**.
   - Go to the **Sign-in method** tab, enable **Google**, and save.
4. Register the web app to get the **public config**:
   - **Project settings → Your apps → Add app → Web** (`</>`).
   - Copy the `firebaseConfig` object into `frontend/.env` as the `VITE_FIREBASE_*` values.
5. Create the **service account** (for the backend + seed):
   - **Project settings → Service accounts → Generate new private key**.
   - This downloads a JSON file. From it, copy:
     - `project_id` → `FIREBASE_PROJECT_ID`
     - `client_email` → `FIREBASE_CLIENT_EMAIL`
     - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the `\n` escapes; keep it in quotes in `.env`)
   - **Never commit this JSON or its values.**

## Seeding Firestore

The seed script writes the `states` and `faqs` collections from real Census 2027 data:

```bash
cd backend
npm run seed
```

Firestore collection model:

- **`states`** — one doc per state: `name`, `selfEnumStart`, `selfEnumEnd`, `houseListingStart`, `houseListingEnd`
- **`faqs`** — one doc per FAQ: `question`, `answer`, `category`, `language`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/ping` | Health check (writes a Firestore doc when configured) |
| GET | `/api/states` | All state schedules (Firestore, or seed fallback) |
| POST | `/api/ask` | GenAI assistant — grounded in Census 2027 facts (OpenRouter) |

Protected endpoints (when Firebase is configured) verify a Firebase ID token sent as `Authorization: Bearer <token>`.

## Deploy to Vercel

```bash
npx vercel           # preview deploy
npx vercel --prod    # production deploy
```

**Before deploying, set environment variables in Vercel** (Project → Settings → Environment Variables):
- Backend-only (server): `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `OPENROUTER_API_KEY`
- Frontend/build-time (public): `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`

Firestore and Firebase Auth are both called over HTTPS, so **no special serverless config is needed** in `vercel.json` — the existing `/api/*` rewrite to the serverless functions is sufficient.

## Project Structure

```
api/         — Vercel serverless functions (/api/*)
backend/     — Express server (local dev) + firebase-admin + seed script
frontend/    — React + Vite + TypeScript (Firebase Auth, Google sign-in)
.opencode/   — Custom commands and agents for hackathon speed
```

## Tests

```bash
cd backend && npm test    # seed data integrity
cd frontend && npm test   # date-window logic
```
