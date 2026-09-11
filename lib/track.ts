/**
 * Funnel events for GA4 (estimate_open, estimate_step, generate_lead,
 * phone_click). Sent to the GA4 property only, never to the Ads tag: the Ads
 * account runs Smart Bidding, and a stray event there is one import away from
 * becoming a conversion it optimizes on. A no-op until
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function track(
  event: string,
  params: Record<string, string | number | undefined> = {}
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, { ...params, send_to: GA_MEASUREMENT_ID });
}
