/**
 * Build content/site-inventory.json — a flat list of every linkable URL
 * on the site with a title and short summary. Used by the blog generator's
 * critique pass to pick contextually relevant internal links.
 *
 * Sources:
 *   - lib/constants.ts      → SERVICES (7 service pages)
 *   - lib/service-areas-data.ts → SERVICE_AREAS (31 city pages)
 *   - lib/blog-data.ts      → BLOG_POSTS (published posts)
 *   - Hardcoded static pages (/about, /gallery, /service-areas, /services)
 */

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_PATH = resolve(REPO_ROOT, "content/site-inventory.json");

interface InventoryEntry {
  url: string;
  type: "service" | "city" | "blog" | "static";
  title: string;
  summary: string;
  // tags help the critique pass filter candidates by topic relevance
  tags?: string[];
}

async function main() {
  const entries: InventoryEntry[] = [];

  // Static pages
  entries.push(
    {
      url: "/",
      type: "static",
      title: "Homepage",
      summary: "Gadget Construction homepage — Bay Area general contractor, 500+ projects, 31 cities.",
    },
    {
      url: "/services",
      type: "static",
      title: "All Services",
      summary: "Service hub listing all 7 services offered by Gadget Construction.",
    },
    {
      url: "/service-areas",
      type: "static",
      title: "Bay Area Service Areas",
      summary: "Interactive map of all 31 cities served across 6 Bay Area counties.",
    },
    {
      url: "/gallery",
      type: "static",
      title: "Project Gallery",
      summary: "Filterable portfolio of completed projects by service category.",
    },
    {
      url: "/about",
      type: "static",
      title: "About Gadget Construction",
      summary: "Founder story, credentials, company values, and licensing.",
    },
    {
      url: "/blog",
      type: "static",
      title: "Blog",
      summary: "Insights and guides for San Francisco Bay Area homeowners.",
    },
    {
      url: "/contact",
      type: "static",
      title: "Contact",
      summary: "Contact form and phone number for free estimates.",
    },
  );

  // Service pages
  const { SERVICES } = await import(resolve(REPO_ROOT, "lib/constants.ts"));
  for (const s of SERVICES as { slug: string; name: string; shortDescription: string }[]) {
    entries.push({
      url: `/services/${s.slug}`,
      type: "service",
      title: s.name,
      summary: s.shortDescription,
      tags: [s.slug],
    });
  }

  // City pages
  const { SERVICE_AREAS } = await import(
    resolve(REPO_ROOT, "lib/service-areas-data.ts")
  );
  for (const c of SERVICE_AREAS as {
    slug: string;
    name: string;
    county: string;
    tier: number;
    housingStock: string;
  }[]) {
    entries.push({
      url: `/service-areas/${c.slug}`,
      type: "city",
      title: `${c.name}, ${c.county}`,
      summary: c.housingStock.split(".")[0] + ".",
      tags: ["city", c.county.toLowerCase().replace(/ /g, "-"), `tier-${c.tier}`],
    });
  }

  // Blog posts — all, published and scheduled
  const { BLOG_POSTS } = await import(resolve(REPO_ROOT, "lib/blog-data.ts"));
  for (const p of BLOG_POSTS as { slug: string; title: string; excerpt: string; relatedService?: string }[]) {
    entries.push({
      url: `/blog/${p.slug}`,
      type: "blog",
      title: p.title,
      summary: p.excerpt,
      tags: p.relatedService ? [p.relatedService, "blog"] : ["blog"],
    });
  }

  writeFileSync(OUT_PATH, JSON.stringify(entries, null, 2) + "\n");
  console.log(`Wrote ${entries.length} entries to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
