import initSqlJs, { Database as SqlJsDatabase } from "sql.js";
import { Pool } from "pg";

export type DBClient = {
  query: (text: string, params?: unknown[]) => Promise<{ rows: unknown[] }>;
  close: () => Promise<void>;
};

export async function createDB(): Promise<DBClient> {
  const url = process.env.DATABASE_URL;

  if (url) {
    console.log("Using PostgreSQL (Neon)");
    const pool = new Pool({ connectionString: url });
    return {
      query: (text, params) => pool.query(text, params).then((r) => ({ rows: r.rows })),
      close: () => pool.end(),
    };
  }

  console.log("Using SQLite fallback (local dev)");
  const SQL = await initSqlJs();
  const db: SqlJsDatabase = new SQL.Database();
  db.run(`
    CREATE TABLE IF NOT EXISTS ping_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL
    )
  `);

  return {
    query: (text, params) => {
      const stmt = db.prepare(text);
      if (params) stmt.bind(params);
      const rows: unknown[] = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return Promise.resolve({ rows });
    },
    close: () => {
      db.close();
      return Promise.resolve();
    },
  };
}
