/**
 * Submit newly-published post URLs to IndexNow (Bing, Yandex, DuckDuckGo, et al).
 * Google does NOT consume IndexNow, so this is a Bing-side accelerator only —
 * cheap, low-risk, near-instant indexing on the engines that do use it.
 *
 * Key ownership is proven by hosting the key string at
 *   https://gadgetconstructionsf.com/<key>.txt
 * (see public/<key>.txt). The key below must match that file's contents.
 */
import { getPublishedPosts } from "../lib/blog-data";

const KEY = process.env.INDEXNOW_KEY || "606f98a819bdbcc9f5e673452bb5cd7c";
const HOST = "gadgetconstructionsf.com";
const BASE = `https://${HOST}`;
const RECENT_DAYS = 8; // covers the weekly publish window with margin

async function main() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RECENT_DAYS);
  const cutoffIso = cutoff.toISOString().slice(0, 10);

  const recent = getPublishedPosts().filter(
    (p) => (p.dateModified ?? p.date) >= cutoffIso,
  );

  // Always include homepage + blog index — both change when a post publishes.
  const urlList = [
    ...recent.map((p) => `${BASE}/blog/${p.slug}`),
    `${BASE}/`,
    `${BASE}/blog`,
  ];

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow:`);
  urlList.forEach((u) => console.log(`  ${u}`));

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${BASE}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  if (!res.ok && res.status !== 202 && res.status !== 200) {
    throw new Error(`IndexNow returned ${res.status}`);
  }
}

main().catch((e) => {
  console.error("submit-indexnow failed:", e?.message || e);
  process.exit(1);
});
