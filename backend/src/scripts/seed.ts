import "dotenv/config";
import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

type StateSeed = {
  name: string;
  selfEnumStart: string;
  selfEnumEnd: string;
  houseListingStart: string;
  houseListingEnd: string;
};

type FaqSeed = {
  question: string;
  answer: string;
  category: string;
  language: string;
};

const STATES: StateSeed[] = [
  { name: "Karnataka", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { name: "Gujarat", selfEnumStart: "2026-04-05", selfEnumEnd: "2026-04-19", houseListingStart: "2026-04-20", houseListingEnd: "2026-05-19" },
  { name: "Maharashtra", selfEnumStart: "2026-05-01", selfEnumEnd: "2026-05-15", houseListingStart: "2026-05-16", houseListingEnd: "2026-06-14" },
  { name: "Uttar Pradesh", selfEnumStart: "2026-05-07", selfEnumEnd: "2026-05-21", houseListingStart: "2026-05-22", houseListingEnd: "2026-06-20" },
  { name: "Kerala", selfEnumStart: "2026-06-16", selfEnumEnd: "2026-06-30", houseListingStart: "2026-07-01", houseListingEnd: "2026-07-30" },
  { name: "Tamil Nadu", selfEnumStart: "2026-07-17", selfEnumEnd: "2026-07-31", houseListingStart: "2026-08-01", houseListingEnd: "2026-08-30" },
];

const FAQS: FaqSeed[] = [
  {
    question: "Are any documents required for self-enumeration?",
    answer: "No. Self-enumeration does not require any documents from citizens.",
    category: "privacy",
    language: "en",
  },
  {
    question: "How much does the census cost?",
    answer: "Census 2027 has a budget of Rs. 11,718.24 crore and deploys over 31 lakh enumerators.",
    category: "scale",
    language: "en",
  },
  {
    question: "Is my data kept private?",
    answer: "Individual-level data is protected under the Census Act and kept confidential.",
    category: "privacy",
    language: "en",
  },
];

function ensureFirebase(): void {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error(
      "Firebase not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env and try again."
    );
    process.exit(1);
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
}

async function seed(): Promise<void> {
  ensureFirebase();
  const db = getFirestore();

  const statesRef = db.collection("states");
  for (const s of STATES) {
    await statesRef.doc(s.name).set(s, { merge: true });
    console.log(`Seeded state: ${s.name}`);
  }

  const faqsRef = db.collection("faqs");
  for (const f of FAQS) {
    await faqsRef.add(f);
    console.log(`Seeded FAQ: ${f.question}`);
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
