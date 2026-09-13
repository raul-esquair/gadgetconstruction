import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Review-request tables. Ported from the Lamorinda Pavers site, where the same
 * system has run in production since 2026-08 — the leads and SMS tables there
 * were deliberately left behind.
 *
 * ⚠️ Every table calls `.enableRLS()`. Supabase publishes the `public` schema
 * through its Data API, so a table without row-level security is readable and
 * writable by anyone holding the project's anon key — and that key is designed
 * to be public. With RLS on and no policies, the Data API sees nothing. The app
 * is unaffected: it connects as the `postgres` role, which owns these tables,
 * and a table owner bypasses RLS. Any new table needs the same call.
 */

/**
 * Lifecycle of a review request. `active` is the only state the scheduler
 * will send for.
 */
export type RequestStatus = "active" | "stopped";

/**
 * Why a sequence stopped. `responded` is the kill switch firing from the
 * /feedback page; `complete` means all three touches went out normally.
 */
export type StoppedReason = "responded" | "manual" | "unsubscribed" | "bounced" | "complete";

export type SuppressionReason = "unsubscribed" | "bounced" | "complained" | "manual";

export const reviewRequests = pgTable(
  "review_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    /** URL-safe token used in /feedback?t=… — never sequential, never PII. */
    token: text("token").notNull(),

    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    /** A service slug from SERVICES (e.g. "composite-decks"), or null. */
    projectType: text("project_type"),

    /** When the job actually finished (for context in the email copy). */
    completedAt: date("completed_at"),
    /**
     * When touch 1 fires. Deliberately separate from completedAt so a
     * backfill of old jobs doesn't fire all three touches at once.
     */
    startAt: date("start_at").notNull(),

    status: text("status").$type<RequestStatus>().notNull().default("active"),
    stoppedReason: text("stopped_reason").$type<StoppedReason>(),
    stoppedAt: timestamp("stopped_at", { withTimezone: true }),

    /** Set by the kill switch the moment a face is clicked. */
    respondedAt: timestamp("responded_at", { withTimezone: true }),
    rating: integer("rating"),

    notes: text("notes"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("review_requests_token_idx").on(table.token),
    // The scheduler's hot path: active rows whose next touch may be due.
    index("review_requests_due_idx").on(table.status, table.startAt),
    index("review_requests_email_idx").on(table.email),
  ],
).enableRLS();

/**
 * One row per email actually sent. Separate table rather than a JSON array so
 * the unique index below makes a duplicate send impossible at the database
 * level — not merely unlikely in application code.
 */
export const reviewTouches = pgTable(
  "review_touches",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => reviewRequests.id, { onDelete: "cascade" }),
    /** 1, 2 or 3. */
    n: integer("n").notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
    /** Resend message id, for tracing a specific send. */
    providerId: text("provider_id"),
  },
  (table) => [uniqueIndex("review_touches_request_n_idx").on(table.requestId, table.n)],
).enableRLS();

/**
 * Email-level suppression. Deliberately NOT a flag on review_requests: an
 * unsubscribe has to outlive the request it came from, or the next project
 * for that customer would email them again.
 */
export const emailSuppressions = pgTable("email_suppressions", {
  email: text("email").primaryKey(),
  reason: text("reason").$type<SuppressionReason>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

/**
 * Osmin's settings from /dashboard/settings — one row, id "default".
 *
 * Every column except `paused` is nullable, and null means "use the default
 * in code" (DEFAULT_SETTINGS in lib/reviews/settings.ts). That keeps the
 * defaults in one place: a fresh database, a missing row and the owner guide
 * PDF all see the same copy and cadence. Email templates are stored only when
 * they differ from the default, so improving the default copy in code still
 * reaches any email he never touched.
 */
export const reviewSettings = pgTable("review_settings", {
  id: text("id").primaryKey(),
  paused: boolean("paused").notNull().default(false),
  pausedAt: timestamp("paused_at", { withTimezone: true }),
  /** When sending last resumed — the health check allows a day for the first send after. */
  resumedAt: timestamp("resumed_at", { withTimezone: true }),
  emailCount: integer("email_count"),
  /** Days after email 1 that email 2 goes out. */
  gapDays2: integer("gap_days_2"),
  /** Days after email 2 that email 3 goes out. */
  gapDays3: integer("gap_days_3"),
  skipWeekends: boolean("skip_weekends"),
  repeatWindowDays: integer("repeat_window_days"),
  /** Keyed "1" | "2" | "3"; only customized emails are present. */
  templates: jsonb("templates").$type<Partial<Record<"1" | "2" | "3", { subject: string; body: string }>>>(),
  replyTo: text("reply_to"),
  /** Comma-separated. */
  alertEmails: text("alert_emails"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export type ReviewSettingsRow = typeof reviewSettings.$inferSelect;

export type ReviewRequest = typeof reviewRequests.$inferSelect;
export type NewReviewRequest = typeof reviewRequests.$inferInsert;
export type ReviewTouch = typeof reviewTouches.$inferSelect;
