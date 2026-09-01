import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { STATE_SCHEDULES, type StateSchedule } from "./data.js";

/**
 * Firestore helpers for Vercel serverless functions.
 *
 * Reads credentials ONLY from environment variables (FIREBASE_PROJECT_ID,
 * FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY) — the deployed path. There is
 * deliberately NO local-file fallback here, so no secret file path can ever
 * reach the deployed/bundled code.
 */

let firestoreDb: Firestore | null = null;

function initFirestore(): Firestore | null {
  if (firestoreDb) return firestoreDb;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  if (getApps().length === 0) {
    initializeApp({
      projectId,
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });
  }

  firestoreDb = getFirestore();
  return firestoreDb;
}

/** Query all states from Firestore, falling back to bundled seed data when unconfigured/empty. */
export async function getStates(): Promise<StateSchedule[]> {
  const db = initFirestore();
  if (!db) return STATE_SCHEDULES;

  try {
    const snap = await db.collection("states").orderBy("selfEnumStart").get();
    if (snap.empty) return STATE_SCHEDULES;
    return snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: Number(doc.id) || 0,
        state: String(d.name ?? d.state ?? ""),
        selfEnumStart: String(d.selfEnumStart ?? ""),
        selfEnumEnd: String(d.selfEnumEnd ?? ""),
        houseListingStart: String(d.houseListingStart ?? ""),
        houseListingEnd: String(d.houseListingEnd ?? ""),
      };
    });
  } catch (err) {
    console.error("getStates failed, using fallback:", err);
    return STATE_SCHEDULES;
  }
}
