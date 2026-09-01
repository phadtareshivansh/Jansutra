import { getFirestoreDb } from "../db";
import { STATE_SCHEDULES, type StateSchedule } from "../data/states";

/**
 * Fetch all states from the Firestore "states" collection.
 * Falls back to the hardcoded seed schedules when Firestore isn't configured,
 * so local dev works before credentials are added.
 */
export async function getStates(): Promise<StateSchedule[]> {
  const db = getFirestoreDb();
  if (!db) {
    return STATE_SCHEDULES;
  }

  try {
    const snap = await db.collection("states").orderBy("selfEnumStart").get();
    if (snap.empty) return STATE_SCHEDULES;
    return snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: Number(doc.id) || 0,
        state: String(d.state ?? ""),
        selfEnumStart: String(d.selfEnumStart ?? ""),
        selfEnumEnd: String(d.selfEnumEnd ?? ""),
        houseListingStart: String(d.houseListingStart ?? ""),
        houseListingEnd: String(d.houseListingEnd ?? ""),
      };
    });
  } catch (err) {
    console.error("[firestore] getStates failed, using fallback:", err);
    return STATE_SCHEDULES;
  }
}

/** Fetch a single state by its Firestore document id. */
export async function getStateById(id: string): Promise<StateSchedule | null> {
  const db = getFirestoreDb();
  const fallback = STATE_SCHEDULES.find((s) => String(s.id) === id) ?? null;
  if (!db) return fallback;

  try {
    const doc = await db.collection("states").doc(id).get();
    if (!doc.exists) return fallback ?? null;
    const d = doc.data()!;
    return {
      id: Number(doc.id) || 0,
      state: String(d.state ?? ""),
      selfEnumStart: String(d.selfEnumStart ?? ""),
      selfEnumEnd: String(d.selfEnumEnd ?? ""),
      houseListingStart: String(d.houseListingStart ?? ""),
      houseListingEnd: String(d.houseListingEnd ?? ""),
    };
  } catch (err) {
    console.error("[firestore] getStateById failed:", err);
    return fallback;
  }
}
