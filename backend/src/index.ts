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

const ALLOWED_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, server-to-server) and matching origins.
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(authMiddleware);

async function start() {
  // Initialise Firebase (lazily configured — no-op if credentials missing).
  if (process.env.FIREBASE_PROJECT_ID) {
    getFirebaseApp();
  }

  app.use("/api", pingRoutes);
  app.use("/api", statesRoutes);
  app.use("/api", askRoutes);

  app.use((_req: express.Request, res: express.Response) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("[error]", err.message);
    res.status(500).json({ error: "Internal server error" });
  });

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("[startup] failed to start backend:", err);
  process.exit(1);
});
