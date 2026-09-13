import { randomBytes } from "node:crypto";
import { and, count, desc, eq, gt, inArray, isNull, lte, max, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  emailSuppressions,
  reviewRequests,
  reviewTouches,
  type ReviewRequest,
  type StoppedReason,
  type SuppressionReason,
} from "@/lib/db/schema";
import { daysBetween, todayInBusinessTz } from "./dates";
import {
  isSequenceComplete,
  nextDueTouch,
  resolveStartAt,
  touchDueDate,
  type TouchNumber,
} from "./schedule";

/** 16 URL-safe chars from 12 random bytes. Unguessable, carries no PII. */
export function generateToken(): string {
  return randomBytes(12).toString("base64url");
}

export interface CreateRequestInput {
  name: string;
  email: string;
  phone?: string | null;
  projectType?: string | null;
  completedAt?: string | null;
  /** Override the computed first-send date. */
  startAt?: string | null;
  notes?: string | null;
}

export async function createReviewRequest(input: CreateRequestInput): Promise<ReviewRequest> {
  const db = getDb();
  const today = todayInBusinessTz();
  const completedAt = input.completedAt || null;

  const [row] = await db
    .insert(reviewRequests)
    .values({
      token: generateToken(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || null,
      projectType: input.projectType?.trim() || null,
      completedAt,
      startAt: input.startAt || resolveStartAt(completedAt, today),
      notes: input.notes?.trim() || null,
    })
    .returning();

  return row;
}

export async function getRequestByToken(token: string): Promise<ReviewRequest | null> {
  const db = getDb();
  const [row] = await db
    .select()
    .from(reviewRequests)
    .where(eq(reviewRequests.token, token))
    .limit(1);
  return row ?? null;
}

/**
 * The kill switch. Called the moment a customer picks a face on /feedback —
 * deliberately not on form submit, because most people who pick a positive
 * face go straight to Google and never come back to the page.
 *
 * Idempotent: a second click won't overwrite the original response.
 */
export async function markResponded(token: string, rating: number): Promise<boolean> {
  const db = getDb();
  const result = await db
    .update(reviewRequests)
    .set({
      respondedAt: new Date(),
      rating,
      status: "stopped",
      stoppedReason: "responded",
      stoppedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(eq(reviewRequests.token, token), sql`${reviewRequests.respondedAt} is null`))
    .returning({ id: reviewRequests.id });

  return result.length > 0;
}

export async function stopRequest(id: string, reason: StoppedReason): Promise<void> {
  const db = getDb();
  await db
    .update(reviewRequests)
    .set({ status: "stopped", stoppedReason: reason, stoppedAt: new Date(), updatedAt: new Date() })
    .where(eq(reviewRequests.id, id));
}

/**
 * Record a send. Relies on the unique index on (request_id, n) — a concurrent
 * or repeated call inserts nothing rather than sending twice. Returns false
 * if this touch had already been recorded.
 */
export async function recordTouch(
  requestId: string,
  n: TouchNumber,
  providerId?: string,
): Promise<boolean> {
  const db = getDb();
  const inserted = await db
    .insert(reviewTouches)
    .values({ requestId, n, providerId: providerId ?? null })
    .onConflictDoNothing()
    .returning({ id: reviewTouches.id });

  return inserted.length > 0;
}

/**
 * Fill in the provider's message id after a successful send.
 *
 * The touch row is written *before* the send (see dispatch.ts) so a crash
 * can't cause a duplicate — which means the id isn't known yet at insert
 * time. This backfills it so a specific email can be traced in Resend.
 * Best-effort: a failure here must never fail the send.
 */
export async function attachProviderId(
  requestId: string,
  n: TouchNumber,
  providerId: string,
): Promise<void> {
  const db = getDb();
  await db
    .update(reviewTouches)
    .set({ providerId })
    .where(and(eq(reviewTouches.requestId, requestId), eq(reviewTouches.n, n)));
}

export interface DueRequest {
  request: ReviewRequest;
  touch: TouchNumber;
}

/**
 * Requests with a touch due today, capped. The cap is a deliberate
 * deliverability guard: importing 40 past customers should drain over days
 * rather than emit 40 emails from a domain that normally sends a handful.
 */
export async function findDueRequests(limit: number): Promise<DueRequest[]> {
  const db = getDb();
  const today = todayInBusinessTz();

  const candidates = await db
    .select()
    .from(reviewRequests)
    .where(and(eq(reviewRequests.status, "active"), lte(reviewRequests.startAt, today)))
    .orderBy(reviewRequests.startAt);

  if (candidates.length === 0) return [];

  const sent = await sentTouches(candidates.map((c) => c.id));
  const suppressed = await suppressedEmails(candidates.map((c) => c.email));

  const due: DueRequest[] = [];
  for (const request of candidates) {
    if (suppressed.has(request.email)) continue;

    const touch = nextDueTouch(request.startAt, sent.get(request.id) ?? [], today);
    if (touch === null) continue;

    due.push({ request, touch });
    if (due.length >= limit) break;
  }

  return due;
}

/** Close out sequences whose third touch has been sent. */
export async function closeCompletedSequences(): Promise<number> {
  const db = getDb();
  const active = await db
    .select({ id: reviewRequests.id })
    .from(reviewRequests)
    .where(eq(reviewRequests.status, "active"));

  if (active.length === 0) return 0;

  const sent = await sentTouches(active.map((a) => a.id));
  const done = active.filter((a) => isSequenceComplete(sent.get(a.id) ?? []));
  if (done.length === 0) return 0;

  await db
    .update(reviewRequests)
    .set({
      status: "stopped",
      stoppedReason: "complete",
      stoppedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(
      inArray(
        reviewRequests.id,
        done.map((d) => d.id),
      ),
    );

  return done.length;
}

/** Touch numbers already sent, keyed by request id. */
async function sentTouches(requestIds: string[]): Promise<Map<string, number[]>> {
  const db = getDb();
  const rows = await db
    .select({ requestId: reviewTouches.requestId, n: reviewTouches.n })
    .from(reviewTouches)
    .where(inArray(reviewTouches.requestId, requestIds));

  const byRequest = new Map<string, number[]>();
  for (const t of rows) {
    byRequest.set(t.requestId, [...(byRequest.get(t.requestId) ?? []), t.n]);
  }
  return byRequest;
}

export interface RequestWithTouches extends ReviewRequest {
  touchCount: number;
}

/** Dashboard list view. */
export async function listRequests(): Promise<RequestWithTouches[]> {
  const db = getDb();
  const rows = await db
    .select({
      request: reviewRequests,
      touchCount: sql<number>`count(${reviewTouches.id})::int`,
    })
    .from(reviewRequests)
    .leftJoin(reviewTouches, eq(reviewTouches.requestId, reviewRequests.id))
    .groupBy(reviewRequests.id)
    .orderBy(desc(reviewRequests.createdAt));

  return rows.map((r) => ({ ...r.request, touchCount: r.touchCount }));
}

export interface HealthSnapshot {
  /** Touches due today or earlier. */
  due: number;
  /** Of those, how many were due before today — they should already have gone out. */
  overdue: number;
  lastSentAt: Date | null;
  /** Touches claimed in the window but with no Resend id: the send was rejected. */
  unconfirmedRecent: number;
}

/**
 * Counts only — the health endpoint's response ends up in public GitHub
 * Actions logs, so nothing here may identify a customer.
 */
export async function healthSnapshot(windowHours: number): Promise<HealthSnapshot> {
  const db = getDb();
  const today = todayInBusinessTz();
  const since = new Date(Date.now() - windowHours * 3_600_000);

  const due = await findDueRequests(Number.MAX_SAFE_INTEGER);
  const overdue = due.filter(
    (d) => daysBetween(touchDueDate(d.request.startAt, d.touch), today) > 0,
  ).length;

  const [{ lastSentAt }] = await db
    .select({ lastSentAt: max(reviewTouches.sentAt) })
    .from(reviewTouches);

  const [{ unconfirmed }] = await db
    .select({ unconfirmed: count() })
    .from(reviewTouches)
    .where(and(isNull(reviewTouches.providerId), gt(reviewTouches.sentAt, since)));

  return { due: due.length, overdue, lastSentAt, unconfirmedRecent: unconfirmed };
}

export async function suppressEmail(email: string, reason: SuppressionReason): Promise<void> {
  const db = getDb();
  const normalized = email.trim().toLowerCase();

  await db
    .insert(emailSuppressions)
    .values({ email: normalized, reason })
    .onConflictDoNothing();

  await db
    .update(reviewRequests)
    .set({
      status: "stopped",
      stoppedReason: reason === "bounced" ? "bounced" : "unsubscribed",
      stoppedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(eq(reviewRequests.email, normalized), eq(reviewRequests.status, "active")));
}

async function suppressedEmails(emails: string[]): Promise<Set<string>> {
  if (emails.length === 0) return new Set();
  const db = getDb();
  const rows = await db
    .select({ email: emailSuppressions.email })
    .from(emailSuppressions)
    .where(inArray(emailSuppressions.email, emails));
  return new Set(rows.map((r) => r.email));
}
