/**
 * Curated internal-linking map: service slug → ordered blog-post slugs.
 *
 * Why curated (not auto-derived from `relatedService`): 6 of 13 posts tag
 * `exterior-repairs`, so an auto list would dump half the blog onto one page.
 * These lists are hand-ordered COMMERCIAL-INTENT FIRST (cost / comparison /
 * scope) — the posts that attract buyers — and deliberately avoid pairing two
 * posts that cannibalize the same query.
 *
 * Ordering within each list is the priority order used by the Guides module.
 *
 * Deliberate omission: `cracked-stucco-san-francisco-patch-recoat-tear-off`
 * competes with the stucco-vs-hardie comparison post for the same intent, and
 * Google currently has it as "Crawled - currently not indexed". Pointing more
 * internal links at it would reinforce the duplication rather than resolve it.
 *
 * Gaps worth noting: `retaining-walls` has no posts at all.
 * The Guides module simply doesn't render for a service with an empty list.
 */
import { getPostBySlug } from "./blog-data";
import type { BlogPost } from "./types";

export const SERVICE_GUIDES: Record<string, string[]> = {
  "exterior-repairs": [
    "siding-replacement-cost-san-francisco-2026", // cost — commercial
    "dry-rot-bay-area-homes-spot-repair-cost", // cost + diagnosis — commercial
    "stucco-vs-hardie-board-vs-wood-siding-bay-area", // material comparison
    "5-exterior-repairs-coastal-bay-area-homes-always-need", // scope
  ],
  "composite-decks": [
    "composite-deck-cost-san-francisco", // cost — commercial
    "trex-vs-timbertech-vs-fiberon-bay-area-2026", // brand comparison — commercial
    "hillside-multi-level-deck-construction-sf-marin", // premium scope — commercial
    "composite-vs-wood-decking-bay-area-2026", // material comparison
  ],
  "concrete-foundations": [
    "foundation-underpinning-cost-san-francisco", // cost — commercial
    "foundation-repair-signs-san-francisco", // diagnosis
  ],
  "complete-remodel": ["home-remodel-cost-san-francisco-2026"], // cost — commercial
  "structural-repairs": [
    "foundation-underpinning-cost-san-francisco", // cost — commercial (the page's FAQ stays diagnostic so the two don't compete)
    "how-long-does-foundation-underpinning-take-san-francisco", // timeline
    "dry-rot-bay-area-homes-spot-repair-cost", // when rot reaches joists and sills
    "foundation-repair-signs-san-francisco", // foundation vs. framing diagnosis
  ],
  "retaining-walls": [],
};

/**
 * Resolve a service's curated guide slugs to published posts, preserving the
 * curated order. Unpublished or missing slugs are dropped silently, so a
 * future-dated post can sit in the map ahead of its publish date.
 */
export function getServiceGuides(serviceSlug: string, limit = 4): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const slug of SERVICE_GUIDES[serviceSlug] ?? []) {
    const post = getPostBySlug(slug);
    if (post) posts.push(post);
    if (posts.length >= limit) break;
  }
  return posts;
}
