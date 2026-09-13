import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export * from "./schema";

/**
 * Supabase Postgres, through its **transaction pooler** (Supavisor, port
 * 6543). Serverless functions open a connection per cold start and never
 * close it cleanly, so a direct connection would exhaust Postgres's small
 * connection limit; the pooler multiplexes them.
 *
 * Transaction mode can't hold prepared statements across requests, so
 * `prepare: false` is required — without it queries fail intermittently with
 * "prepared statement already exists". `max: 1` because each function
 * instance handles one request at a time.
 *
 * ⚠️ Never run queries concurrently (`Promise.all` over two queries). With one
 * connection, postgres.js pipelines them, and Supavisor's transaction mode
 * hangs on pipelined queries: the call never resolves, and every later query
 * on that instance queues behind it. Verified 2026-09-13 — three parallel
 * selects hung past 8s; the same three sequentially took ~40ms. `next dev`
 * serves concurrent requests from one process, so two tabs loading at once
 * can wedge the dev server the same way; restart it if pages hang on the DB.
 */
function connectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Use the Supabase transaction pooler string (Project → Connect → Transaction pooler, port 6543).",
    );
  }
  return url;
}

let cached: ReturnType<typeof createClient> | undefined;

function createClient() {
  const client = postgres(connectionString(), { prepare: false, max: 1 });
  return drizzle(client, { schema });
}

/**
 * Lazy on purpose. The site prerenders ~60 static pages at build time and
 * almost none of them touch the database — resolving the connection at import
 * time would fail every build that runs without the env var.
 */
export function getDb() {
  cached ??= createClient();
  return cached;
}
