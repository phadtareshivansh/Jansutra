import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

/**
 * Firebase web config.
 *
 * These VITE_FIREBASE_* values are the PUBLIC config object — they are safe to
 * expose to the browser (not secrets). They identify the project and enable
 * client-side Google sign-in. The backend's service account private key, by
 * contrast, stays server-only and is NEVER in the frontend.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseConfigured()) return null;
  if (!auth) {
    app = app ?? initializeApp(firebaseConfig);
    auth = getAuth(app);
  }
  return auth;
}

export const googleProvider = new GoogleAuthProvider();
