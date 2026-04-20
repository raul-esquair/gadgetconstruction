/**
 * Propose the next batch of 4 blog briefs for the content queue.
 *
 * Reads:
 *   - content/post-queue.json          (what's already planned)
 *   - lib/blog-data.ts                 (what's published)
 *   - lib/constants.ts                 (services)
 *   - lib/service-areas-data.ts        (cities)
 *   - google-ads-campaign-plan.md      (keyword targets with volume/CPC)
 *   - content/style-reference.md       (voice guide)
 *   - Google Search Console            (real ranking data — or falls back if new site)
 *
 * Writes:
 *   - content/proposed-briefs.json     (4 briefs for your review)
 *   - content/proposed-briefs-summary.md  (human-readable summary)
 *
 * Opens: a PR for your review. Merging the PR triggers merge-proposed-briefs.yml
 * which moves the briefs into post-queue.json.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=... GSC_SERVICE_ACCOUNT_JSON_BASE64=... npx tsx scripts/propose-next-batch.ts
 *   npx tsx scripts/propose-next-batch.ts --dry-run   # no PR, no file writes
 */

import Anthropic from "@anthropic-ai/sdk";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { fetchGscReport, type GscReport } from "./fetch-gsc-data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const QUEUE_PATH = resolve(REPO_ROOT, "content/post-queue.json");
const STYLE_PATH = resolve(REPO_ROOT, "content/style-reference.md");
const ADS_PLAN_PATH = resolve(REPO_ROOT, "google-ads-campaign-plan.md");
const BLOG_DATA_PATH = resolve(REPO_ROOT, "lib/blog-data.ts");
const CONSTANTS_PATH = resolve(REPO_ROOT, "lib/constants.ts");
const SERVICE_AREAS_PATH = resolve(REPO_ROOT, "lib/service-areas-data.ts");

const PROPOSAL_PATH = resolve(REPO_ROOT, "content/proposed-briefs.json");
const SUMMARY_PATH = resolve(REPO_ROOT, "content/proposed-briefs-summary.md");

const MODEL = process.env.MODEL || "claude-opus-4-7";
const IS_DRY_RUN = process.argv.includes("--dry-run");
const BATCH_SIZE = 4;

// ──────────── Helpers ────────────

function run(cmd: string): string {
  return execSync(cmd, { cwd: REPO_ROOT, encoding: "utf8" }).trim();
}

function nextMondayAfter(dateIso: string): string {
  const d = new Date(dateIso);
  d.setDate(d.getDate() + 7); // a week later, same weekday
  return d.toISOString().slice(0, 10);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

// ──────────── Main ────────────

async function main(): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ERROR: ANTHROPIC_API_KEY required");
    process.exit(1);
  }

  // 1. Load all inputs
  console.log("Loading current state...");
  const queue = JSON.parse(readFileSync(QUEUE_PATH, "utf8"));
  const style = readFileSync(STYLE_PATH, "utf8");
  const adsPlan = readFileSync(ADS_PLAN_PATH, "utf8");
  const blogMod = await import(BLOG_DATA_PATH);
  const servicesMod = await import(CONSTANTS_PATH);
  const areasMod = await import(SERVICE_AREAS_PATH);

  const publishedPosts = (blogMod.BLOG_POSTS as Array<{
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    relatedService?: string;
  }>).map(({ slug, title, excerpt, date, relatedService }) => ({
    slug,
    title,
    excerpt,
    date,
    relatedService,
  }));

  const services = (servicesMod.SERVICES as Array<{
    slug: string;
    name: string;
    shortDescription: string;
  }>).map(({ slug, name, shortDescription }) => ({
    slug,
    name,
    shortDescription,
  }));

  const cityCount = (areasMod.SERVICE_AREAS as unknown[]).length;

  // 2. Fetch GSC data (graceful fallback)
  let gscReport: GscReport | { newSite: true; error?: string } = { newSite: true };
  try {
    console.log("Fetching Google Search Console data (last 90 days)...");
    gscReport = await fetchGscReport();
    console.log(
      `GSC: ${gscReport.summary.totalImpressions} impressions, ${gscReport.summary.totalClicks} clicks | ${gscReport.opportunities.closeToPage1.length} close-to-page-1 opportunities`,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`GSC fetch failed — proceeding without it. Reason: ${msg}`);
    gscReport = { newSite: true, error: msg };
  }

  // 3. Figure out next scheduled date (Monday after last queued/scheduled brief)
  const lastDate =
    queue.length > 0
      ? queue
          .map((b: { scheduledDate: string }) => b.scheduledDate)
          .sort()
          .at(-1)!
      : todayIso();

  const scheduledDates: string[] = [];
  let cursor = lastDate;
  for (let i = 0; i < BATCH_SIZE; i++) {
    cursor = nextMondayAfter(cursor);
    scheduledDates.push(cursor);
  }
  console.log(`Proposing ${BATCH_SIZE} briefs scheduled: ${scheduledDates.join(", ")}`);

  // 4. Call Claude
  const proposal = await callClaudeForProposal({
    queue,
    publishedPosts,
    services,
    cityCount,
    adsPlan,
    style,
    gscReport,
    scheduledDates,
  });

  // 5. Write files
  if (IS_DRY_RUN) {
    console.log("\n──────────── DRY RUN ────────────\n");
    console.log(proposal.summaryMarkdown);
    console.log("\n──────────── PROPOSED BRIEFS ────────────\n");
    console.log(JSON.stringify(proposal.briefs, null, 2));
    return;
  }

  writeFileSync(PROPOSAL_PATH, JSON.stringify(proposal.briefs, null, 2) + "\n");
  writeFileSync(SUMMARY_PATH, proposal.summaryMarkdown);
  console.log(`Wrote ${proposal.briefs.length} briefs to ${PROPOSAL_PATH}`);

  // 6. Open PR
  openReviewPR(proposal.briefs, proposal.summaryMarkdown);
}

// ──────────── Claude call ────────────

interface ProposedBrief {
  slug: string;
  scheduledDate: string;
  status: "proposed";
  action: "new" | "refresh";
  refreshesSlug?: string;
  title: string;
  metaTitle: string;
  excerpt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  relatedService: string;
  targetWordCount: number;
  geoFocus: string;
  citiesReferenced?: string[];
  outline: Array<{ h2: string; h3?: string[]; notes?: string }>;
  mustInclude?: string[];
  mustAvoid?: string[];
  internalLinks?: Array<{ url: string; anchor: string }>;
  cta: string;
  proposalRationale: string;
}

interface Proposal {
  briefs: ProposedBrief[];
  summaryMarkdown: string;
}

async function callClaudeForProposal(ctx: {
  queue: unknown[];
  publishedPosts: unknown[];
  services: unknown[];
  cityCount: number;
  adsPlan: string;
  style: string;
  gscReport: GscReport | { newSite: true; error?: string };
  scheduledDates: string[];
}): Promise<Proposal> {
  const system = `You are a senior SEO content strategist proposing the next batch of blog posts for Gadget Construction — a Class B general contractor serving 31 Bay Area cities across 6 counties. CA Lic #1132983.

Your job: propose ${BATCH_SIZE} blog briefs that will maximize organic traffic and lead generation for their 5 target services (composite decks, foundation underpinning, stucco repair, siding, dry rot repair).

<style_guide>
${ctx.style}
</style_guide>

# Decision framework

Consider in order of importance:

1. **Real GSC data** (if the site has impressions). If pages are ranking page 2-3 for valuable keywords, propose a refresh (action: "refresh") rather than a new post. If existing posts have high impressions but near-zero clicks, propose a refresh to fix title/meta. If queries are getting impressions but have no dedicated landing page, propose a new post.

2. **Topic cluster completion.** Every existing post is part of a cluster (composite decks, exterior repairs, foundation). Look at what's covered vs. what's missing. Propose supporting posts that fill gaps and strengthen topical authority.

3. **Google Ads keyword plan** as a secondary source of keyword targets. The plan lists 28 keywords across 5 ad groups with actual search volume and CPC data. Prioritize keywords with high commercial intent (cost, "near me," "contractor") that don't yet have dedicated content coverage.

4. **Seasonal / timely angles.** Consider the current date — some topics are better in certain seasons (deck planning in spring, dry rot after winter storms, foundation work before rainy season).

5. **Action mix:** For each batch of 4, aim for roughly 3 new posts + 1 refresh if GSC data shows refresh opportunities. If site is brand new with no GSC data, all 4 can be new.

# Constraints

- Each brief must follow the exact schema used in content/post-queue.json — see the current queue samples in the context.
- Assign scheduled dates from the list provided (one date per brief, in order).
- For "refresh" action briefs, include refreshesSlug pointing to the existing post.
- Do NOT duplicate keywords or angles already covered in queue or published posts.
- Include a "proposalRationale" field on each brief explaining WHY this post wins — cite GSC data, keyword volume, or cluster logic.
- targetWordCount range: 2000-3000 typical. Cost guides 2200-2500. Comparisons 2500-3000. Symptom guides 2500-2800.
- Internal links: propose 3-5 per brief from real URLs that exist in the site (service pages, city pages, published posts, other queued briefs).
- Must-includes should reference specific facts to cover: prices from pricing-data, local neighborhoods, permit jurisdictions, housing eras.

# Output format

Respond with exactly two XML-tagged blocks in order:

<briefs>
[
  { ...brief 1 matching the schema... },
  { ...brief 2... },
  { ...brief 3... },
  { ...brief 4... }
]
</briefs>

<summary>
# Proposed Content Batch

## Selection rationale
(3-5 sentences explaining the overall strategy of this batch — what cluster gaps it fills, what keywords it targets, what GSC data it responds to.)

## Briefs

### 1. [Brief title]
- **Publishing:** [date] ([day of week])
- **Primary keyword:** \`[keyword]\` (volume/CPC if from ads plan)
- **Action:** new | refresh (and which slug if refresh)
- **Why:** [2-3 sentences on why this wins]

### 2. ...
### 3. ...
### 4. ...

## GSC signals used
(Brief bullet points on which real ranking data shaped this batch, if any.)
</summary>`;

  const user = `# Current content state

## Already-queued briefs (do NOT duplicate)
${JSON.stringify(ctx.queue, null, 2)}

## Already-published posts (candidates for refresh if GSC data supports)
${JSON.stringify(ctx.publishedPosts, null, 2)}

## Services offered
${JSON.stringify(ctx.services, null, 2)}

## Service areas
${ctx.cityCount} cities across 6 Bay Area counties. Available URLs under /service-areas/<slug>.

## Google Ads keyword plan (keyword targets, volumes, CPCs)
${ctx.adsPlan}

## Google Search Console — last 90 days
${JSON.stringify(ctx.gscReport, null, 2)}

## Scheduled dates for this batch (assign one per brief, in order)
${JSON.stringify(ctx.scheduledDates)}

## Today's date
${todayIso()}

---

Generate the batch of ${BATCH_SIZE} briefs plus the human summary. Follow the output format exactly.`;

  console.log(`Calling Claude (${MODEL})...`);
  const client = new Anthropic();
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16_000,
    system,
    messages: [{ role: "user", content: user }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in Claude response");
  }

  const cost =
    (response.usage.input_tokens * 15 + response.usage.output_tokens * 75) /
    1_000_000;
  console.log(
    `Proposal done. Input: ${response.usage.input_tokens} | Output: ${response.usage.output_tokens} | ~$${cost.toFixed(3)}`,
  );

  return parseProposal(textBlock.text);
}

function parseProposal(raw: string): Proposal {
  const briefsMatch = raw.match(/<briefs>([\s\S]*?)<\/briefs>/);
  const summaryMatch = raw.match(/<summary>([\s\S]*?)<\/summary>/);
  if (!briefsMatch) {
    throw new Error(
      "Proposal missing <briefs> block. Raw:\n" + raw.slice(0, 500),
    );
  }
  let briefs: ProposedBrief[];
  try {
    briefs = JSON.parse(briefsMatch[1].trim());
  } catch (err) {
    throw new Error(
      `Failed to parse <briefs> JSON: ${err}\n\nRaw:\n${briefsMatch[1].slice(0, 800)}`,
    );
  }
  return {
    briefs,
    summaryMarkdown:
      summaryMatch?.[1]?.trim() ?? "(no summary generated)",
  };
}

// ──────────── Git / PR ────────────

function openReviewPR(briefs: ProposedBrief[], summary: string): void {
  const branch = `proposals/content-batch-${todayIso()}`;

  // Configure git identity for CI
  try {
    run("git config user.email");
  } catch {
    run('git config user.email "noreply@gadgetconstructionsf.com"');
    run('git config user.name "Gadget Construction Bot"');
  }

  try {
    run(`git branch -D ${branch}`);
  } catch { /* branch didn't exist locally */ }
  run(`git checkout -b ${branch}`);
  run(`git add content/proposed-briefs.json content/proposed-briefs-summary.md`);

  const commitMsg = `📋 Propose next content batch — ${briefs.length} briefs

Auto-generated via /next-content-batch skill.
Scheduled dates: ${briefs.map((b) => b.scheduledDate).join(", ")}

Merging this PR moves these briefs into post-queue.json via the
merge-proposed-briefs workflow. Edit content/proposed-briefs.json in
this PR to revise before merging, or close the PR to reject.
`;
  writeFileSync("/tmp/proposal-commit-msg.txt", commitMsg);
  run(`git commit -F /tmp/proposal-commit-msg.txt`);
  run(`git push --force origin ${branch}`);

  const prBody = `## 📋 Proposed content batch for your review

${summary}

---

## Next steps

1. **Review** the proposed briefs in \`content/proposed-briefs.json\`
2. **Edit** any brief inline if you want to adjust title, outline, keywords, etc.
3. **Merge** this PR → the \`merge-proposed-briefs\` workflow automatically moves the briefs into \`post-queue.json\` with \`status: "queued"\` so the Friday automation picks them up.
4. **Close** this PR (without merging) to reject the batch. Briefs stay unconsumed; you can regenerate next month.

The briefs use the same schema as the existing 10 — same Friday automation, same review flow, same publishing pipeline.
`;
  writeFileSync("/tmp/proposal-pr-body.md", prBody);
  run(
    `gh pr create --title "📋 Next content batch (${briefs.length} briefs) — review for approval" --body-file /tmp/proposal-pr-body.md`,
  );
  console.log("PR created.");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
