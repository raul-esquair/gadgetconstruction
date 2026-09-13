import type { Config } from "drizzle-kit";

// `drizzle-kit generate` reads only `schema` and `out` — it diffs against the
// committed migration history, so it needs no database connection. `migrate`
// and `studio` do. Migrations prefer DIRECT_URL (Supabase's session pooler,
// port 5432): DDL is safer on a session connection than through the
// transaction pooler the app uses at runtime.
export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
} satisfies Config;
