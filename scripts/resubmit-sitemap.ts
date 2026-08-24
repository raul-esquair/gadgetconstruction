/**
 * Nudge Google to re-fetch the sitemap after a publish. This is the only
 * legitimate "re-crawl" signal available via API — the old anonymous sitemap
 * ping was removed by Google in 2023, and there is no public request-indexing
 * API. Authenticated sitemaps.submit still works and re-queues the sitemap.
 *
 * This matters here specifically: as of 2026-08-23, Google's last recorded
 * download of gadgetconstructionsf.com/sitemap.xml was 2026-06-30 — eight
 * weeks stale, with 39 of 58 URLs never crawled. Resubmitting on every
 * publish keeps the sitemap in Google's queue instead of waiting for it to
 * come back on its own.
 *
 * Needs (already used elsewhere in CI):
 *   GSC_SERVICE_ACCOUNT_JSON_BASE64 — service-account key (Full user on property)
 *   GSC_PROPERTY_URL                — sc-domain:gadgetconstructionsf.com
 *
 * Note the property is a Domain property, so GSC_PROPERTY_URL must use the
 * `sc-domain:` form. The URL-prefix form returns a misleading 403.
 *
 * Best-effort: exits non-zero on failure so the workflow can continue-on-error.
 */
import { google } from "googleapis";

const SITEMAP_URL = "https://gadgetconstructionsf.com/sitemap.xml";

async function main() {
  const base64 = process.env.GSC_SERVICE_ACCOUNT_JSON_BASE64;
  const siteUrl = process.env.GSC_PROPERTY_URL;
  if (!base64 || !siteUrl) {
    throw new Error(
      "GSC_SERVICE_ACCOUNT_JSON_BASE64 and GSC_PROPERTY_URL are required",
    );
  }
  const creds = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  });
  const sc = google.webmasters({ version: "v3", auth });
  await sc.sitemaps.submit({ siteUrl, feedpath: SITEMAP_URL });
  console.log(`Resubmitted ${SITEMAP_URL} to ${siteUrl}`);
}

main().catch((e) => {
  console.error("resubmit-sitemap failed:", e?.message || e);
  process.exit(1);
});
