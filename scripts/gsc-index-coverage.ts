/**
 * GSC index coverage diagnostic.
 *
 * Pulls two things and writes a combined JSON report:
 *   A. Sitemap submission status (sitemaps.list + sitemaps.get for each)
 *   B. Per-URL inspection (urlInspection.index.inspect) for every URL in
 *      the live sitemap.xml — tells us indexed / not-indexed and the reason.
 *
 * Auth: same GSC_SERVICE_ACCOUNT_JSON_BASE64 as fetch-gsc-data.ts.
 * Site: Domain property sc-domain:gadgetconstructionsf.com.
 */

import { google } from "googleapis";
import { JWT } from "google-auth-library";

const SITE_URL = "sc-domain:gadgetconstructionsf.com";
const PUBLIC_HOST = "https://gadgetconstructionsf.com";
const SITEMAP_URL = `${PUBLIC_HOST}/sitemap.xml`;

function getAuth(): JWT {
  const base64Key = process.env.GSC_SERVICE_ACCOUNT_JSON_BASE64;
  if (!base64Key) throw new Error("GSC_SERVICE_ACCOUNT_JSON_BASE64 missing");
  const creds = JSON.parse(Buffer.from(base64Key, "base64").toString("utf-8"));
  return new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
}

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch ${res.status}`);
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1].trim());
}

async function getSitemapStats(auth: JWT) {
  const sc = google.searchconsole({ version: "v1", auth });
  // List all sitemaps Google knows about for this property.
  const listRes = await sc.sitemaps.list({ siteUrl: SITE_URL });
  const sitemaps = listRes.data.sitemap ?? [];
  // For Domain properties, also probe the canonical sitemap directly even
  // if it's not in the list (some Domain properties don't auto-list it).
  const probed: typeof sitemaps = [];
  const known = new Set(sitemaps.map((s) => s.path));
  if (!known.has(SITEMAP_URL)) {
    try {
      const r = await sc.sitemaps.get({ siteUrl: SITE_URL, feedpath: SITEMAP_URL });
      probed.push(r.data);
    } catch {
      /* not submitted yet */
    }
  }
  return [...sitemaps, ...probed];
}

interface InspectionResult {
  url: string;
  verdict: string; // PASS / NEUTRAL / FAIL / VERDICT_UNSPECIFIED
  coverageState: string;
  indexingState: string;
  lastCrawlTime: string | null;
  pageFetchState: string;
  robotsTxtState: string;
  googleCanonical: string;
  userCanonical: string;
  referringUrls: number;
  error?: string;
}

async function inspectUrl(auth: JWT, url: string): Promise<InspectionResult> {
  const sc = google.searchconsole({ version: "v1", auth });
  try {
    const res = await sc.urlInspection.index.inspect({
      requestBody: { inspectionUrl: url, siteUrl: SITE_URL },
    });
    const r = res.data.inspectionResult?.indexStatusResult ?? {};
    return {
      url,
      verdict: r.verdict ?? "UNKNOWN",
      coverageState: r.coverageState ?? "",
      indexingState: r.indexingState ?? "",
      lastCrawlTime: r.lastCrawlTime ?? null,
      pageFetchState: r.pageFetchState ?? "",
      robotsTxtState: r.robotsTxtState ?? "",
      googleCanonical: r.googleCanonical ?? "",
      userCanonical: r.userCanonical ?? "",
      referringUrls: r.referringUrls?.length ?? 0,
    };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      url,
      verdict: "ERROR",
      coverageState: "",
      indexingState: "",
      lastCrawlTime: null,
      pageFetchState: "",
      robotsTxtState: "",
      googleCanonical: "",
      userCanonical: "",
      referringUrls: 0,
      error: msg,
    };
  }
}

async function main() {
  const auth = getAuth();

  console.error("Fetching sitemap URLs...");
  const urls = await fetchSitemapUrls();
  console.error(`  Found ${urls.length} URLs in sitemap`);

  console.error("Fetching sitemap submission stats...");
  const sitemapStats = await getSitemapStats(auth);
  console.error(`  ${sitemapStats.length} sitemap entries known to GSC`);

  console.error(`Inspecting ${urls.length} URLs (this takes a couple minutes)...`);
  const results: InspectionResult[] = [];
  // Sequential to stay well under the per-minute quota and avoid 429s.
  for (let i = 0; i < urls.length; i++) {
    const r = await inspectUrl(auth, urls[i]);
    results.push(r);
    if ((i + 1) % 10 === 0) console.error(`  ${i + 1}/${urls.length}`);
  }

  // Aggregate by verdict for the headline number.
  const byVerdict: Record<string, number> = {};
  const byCoverage: Record<string, number> = {};
  for (const r of results) {
    byVerdict[r.verdict] = (byVerdict[r.verdict] ?? 0) + 1;
    if (r.coverageState) byCoverage[r.coverageState] = (byCoverage[r.coverageState] ?? 0) + 1;
  }

  const indexed = results.filter((r) => r.verdict === "PASS").length;
  const notIndexed = results.filter((r) => r.verdict !== "PASS" && r.verdict !== "ERROR").length;
  const errors = results.filter((r) => r.verdict === "ERROR").length;

  const report = {
    site: SITE_URL,
    generatedAt: new Date().toISOString(),
    sitemapUrl: SITEMAP_URL,
    totalUrlsInSitemap: urls.length,
    summary: {
      indexed,
      notIndexed,
      errors,
      indexedPercent: urls.length > 0 ? Math.round((indexed / urls.length) * 100) : 0,
    },
    byVerdict,
    byCoverage,
    sitemapStats,
    inspections: results,
  };

  console.log(JSON.stringify(report, null, 2));
}

main().catch((e) => {
  console.error("FAILED:", e);
  process.exit(1);
});
