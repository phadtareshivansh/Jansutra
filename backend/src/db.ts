import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

export type { StateSchedule } from "../../shared/types";

let cachedApp: App | null = null;
let cachedDb: Firestore | null = null;

/**
 * Initialise the Firebase Admin SDK from environment variables.
 * Returns null when not configured (local dev without credentials) so the
 * app can degrade gracefully instead of crashing.
 */
export function getFirebaseApp(): App | null {
  if (cachedApp) return cachedApp;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("[firebase] Not configured (missing FIREBASE_PROJECT_ID / CLIENT_EMAIL / PRIVATE_KEY). Firestore/auth disabled.");
    return null;
  }

  const existing = getApps().find((a) => a.name === "[DEFAULT]");
  if (existing) {
    cachedApp = existing;
    return cachedApp;
  }

  cachedApp = initializeApp({
    projectId,
    credential: cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
  return cachedApp;
}

/** Access the Firestore database instance, or null when Firebase isn't configured. */
export function getFirestoreDb(): Firestore | null {
  if (cachedDb) return cachedDb;
  const app = getFirebaseApp();
  if (!app) return null;
  cachedDb = getFirestore(app);
  return cachedDb;
}

/** True when real Firebase credentials are configured. */
export function isFirebaseConfigured(): boolean {
  return Boolean(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY);
}
