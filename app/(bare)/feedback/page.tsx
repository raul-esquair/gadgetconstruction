import type { Metadata } from "next";
import { Suspense } from "react";
import { COMPANY } from "@/lib/constants";
import FeedbackPageContent from "./FeedbackPageContent";

// Intentionally kept out of the index and out of app/sitemap.ts. This is a
// link handed to customers directly (texts, invoices, review emails), not a
// search asset. Do NOT add /feedback to robots.ts `disallow` — a blocked URL
// can't be crawled, so Google would never see the noindex below.
export const metadata: Metadata = {
  title: "Share Your Experience",
  description: `Tell ${COMPANY.ownerFirstName} how your project went — it takes about thirty seconds.`,
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

/**
 * Deliberately still statically generated. The ?t= token is read on the
 * client via useSearchParams rather than server-side, so this page stays on
 * the CDN — it's opened from a text or an email on a phone, and a database
 * round trip in front of first paint would be the wrong trade. Suspense is
 * required because useSearchParams suspends.
 */
export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <FeedbackPageContent />
    </Suspense>
  );
}
