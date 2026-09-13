"use client";

import { useState, useTransition } from "react";
import type { RequestWithTouches } from "@/lib/reviews/queries";
import { stopFollowUps } from "@/lib/actions/review-requests";
import { touchDueDate, TOUCH_NUMBERS, type TouchNumber } from "@/lib/reviews/schedule";
import { SERVICES } from "@/lib/constants";

// Darker shades of the /feedback face colors, so the text stays readable on white.
const RATING: Record<number, { label: string; className: string }> = {
  1: { label: "Not happy", className: "text-red-600" },
  2: { label: "Could be better", className: "text-yellow-700" },
  3: { label: "Happy", className: "text-green-600" },
  4: { label: "Delighted", className: "text-green-800" },
};

const SERVICE_NAMES = new Map(SERVICES.map((s) => [s.slug, s.name]));

function statusChip(r: RequestWithTouches) {
  if (r.respondedAt) return { label: "Responded", className: "bg-green-50 text-green-700" };
  if (r.status === "active") return { label: "Active", className: "bg-amber-50 text-amber-700" };

  const map: Record<string, string> = {
    complete: "All 3 sent",
    manual: "Stopped",
    unsubscribed: "Unsubscribed",
    bounced: "Bounced",
  };
  return { label: map[r.stoppedReason ?? ""] ?? "Stopped", className: "bg-neutral-100 text-neutral-400" };
}

/** Next touch that hasn't been sent, based on how many have gone out. */
function nextTouchDate(r: RequestWithTouches): string | null {
  if (r.status !== "active") return null;
  const next = TOUCH_NUMBERS.find((n) => n > r.touchCount) as TouchNumber | undefined;
  return next ? touchDueDate(r.startAt, next) : null;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  const [y, m, d] = value.split("-");
  return `${Number(m)}/${Number(d)}/${y.slice(2)}`;
}

export default function RequestsTable({
  requests,
  siteUrl,
}: {
  requests: RequestWithTouches[];
  siteUrl: string;
}) {
  const [pending, startTransition] = useTransition();
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function copyLink(token: string) {
    const url = `${siteUrl}/feedback?t=${token}`;
    navigator.clipboard?.writeText(url).then(
      () => {
        setCopied(token);
        setTimeout(() => setCopied((c) => (c === token ? null : c)), 2000);
      },
      () => setError("Couldn't copy to clipboard."),
    );
  }

  function stop(id: string) {
    setError(null);
    startTransition(async () => {
      const result = await stopFollowUps(id);
      if (!result.ok) setError(result.error);
    });
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-200 bg-white/60 px-6 py-14 text-center">
        <p className="font-heading text-lg font-semibold text-primary">No requests yet</p>
        <p className="mt-1 text-sm text-neutral-400">
          Add a customer after their job wraps and the sequence starts on its own.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-sm text-accent-red" role="alert">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full min-w-[46rem] text-left">
          <thead>
            <tr className="border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-300">
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Sent</th>
              <th className="px-4 py-3 font-medium">Next</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {requests.map((r) => {
              const chip = statusChip(r);
              const next = nextTouchDate(r);
              const rating = r.rating !== null ? RATING[r.rating] : null;
              return (
                <tr key={r.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3 align-top">
                    <p className="font-medium text-primary">{r.name}</p>
                    <p className="text-xs text-neutral-300">{r.email}</p>
                    {rating && <p className={`text-xs font-medium ${rating.className}`}>{rating.label}</p>}
                  </td>
                  <td className="px-4 py-3 align-top text-neutral-500">
                    <p>{(r.projectType && SERVICE_NAMES.get(r.projectType)) ?? r.projectType ?? "—"}</p>
                    <p className="text-xs text-neutral-300">done {formatDate(r.completedAt)}</p>
                  </td>
                  <td className="px-4 py-3 align-top text-neutral-500">{r.touchCount} of 3</td>
                  <td className="px-4 py-3 align-top text-neutral-500">{next ? formatDate(next) : "—"}</td>
                  <td className="px-4 py-3 align-top">
                    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${chip.className}`}>
                      {chip.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => copyLink(r.token)}
                        className="text-xs font-medium text-accent-orange hover:underline cursor-pointer"
                      >
                        {copied === r.token ? "Copied" : "Copy link"}
                      </button>
                      {r.status === "active" && (
                        <button
                          type="button"
                          onClick={() => stop(r.id)}
                          disabled={pending}
                          className="text-xs text-neutral-300 hover:text-accent-red transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          Stop
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-neutral-300">
        &ldquo;Copy link&rdquo; gives you that customer&apos;s personal feedback link &mdash; handy for
        texting it at the final walkthrough instead of waiting for the first email.
      </p>
    </div>
  );
}
