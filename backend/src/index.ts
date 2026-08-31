import express from "express";
import cors from "cors";
import { createDB } from "./db";
import { authMiddleware } from "./middleware/auth";
import pingRoutes from "./routes/ping";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

async function start() {
  const db = await createDB();
  app.locals.db = db;

  app.use("/api", pingRoutes);

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });

  process.on("SIGTERM", async () => {
    await db.close();
    process.exit(0);
  });
}

start();
