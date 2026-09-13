/**
 * Routes that render without the site chrome (Header, Footer, MobileBottomBar).
 *
 * - /lp/* — ad landing pages, which render their own sticky bar.
 * - /feedback — a single-decision page texted to customers after a job; every
 *   competing link on it costs a response, and the mobile bar's estimate
 *   button would sit on top of its Google review button.
 * - /unsubscribe — offering someone a free estimate while they opt out is the
 *   wrong note.
 * - /dashboard — an internal tool with its own header.
 *
 * A bare route must render its own logo, or it reads as a phishing form. The
 * `(bare)` route group's layout cancels `<main>`'s header padding for the last
 * three; /lp does the same in its own layout.
 */
const BARE_ROUTES = new Set(["/feedback", "/unsubscribe"]);
const BARE_PREFIXES = ["/lp", "/dashboard"];

export function isBareRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  if (BARE_ROUTES.has(pathname)) return true;
  return BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
