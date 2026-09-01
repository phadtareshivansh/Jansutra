import { getFirestoreDb } from "../db";
import { STATE_SCHEDULES } from "../../../shared/data";
import type { StateSchedule } from "../../../shared/types";

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
      const state = String(d.name ?? d.state ?? "");
      const seed = STATE_SCHEDULES.find((s) => s.state === state);
      return {
        id: typeof d.id === "number" ? d.id : seed?.id ?? 0,
        state,
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
  const fallback = STATE_SCHEDULES.find((s) => s.state === id) ?? null;
  if (!db) return fallback;

  try {
    const doc = await db.collection("states").doc(id).get();
    if (!doc.exists) return fallback ?? null;
    const d = doc.data()!;
    const state = String(d.name ?? d.state ?? "");
    const seed = STATE_SCHEDULES.find((s) => s.state === state);
    return {
      id: typeof d.id === "number" ? d.id : seed?.id ?? 0,
      state,
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

