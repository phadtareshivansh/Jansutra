import "dotenv/config";
import express from "express";
import cors from "cors";
import { getFirebaseApp } from "./db";
import { authMiddleware } from "./middleware/auth";
import pingRoutes from "./routes/ping";
import statesRoutes from "./routes/states";
import askRoutes from "./routes/ask";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

async function start() {
  // Initialise Firebase (lazily configured — no-op if credentials missing).
  if (process.env.FIREBASE_PROJECT_ID) {
    getFirebaseApp();
  }

  app.use("/api", pingRoutes);
  app.use("/api", statesRoutes);
  app.use("/api", askRoutes);

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

start();
