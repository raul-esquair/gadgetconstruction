/**
 * Auto-generate the next queued blog post using the Claude API.
 *
 * Reads content/post-queue.json to find the next post with status="queued",
 * calls Claude with the brief + style-reference.md + 2 most-recent published
 * posts as voice anchors, inserts the generated post into lib/blog-data.ts,
 * flips the brief's status to "drafted", and opens a PR via `gh` CLI.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx scripts/generate-post.ts
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx scripts/generate-post.ts --dry-run
 *   ANTHROPIC_API_KEY=sk-ant-... MODEL=claude-opus-4-7 npx tsx scripts/generate-post.ts
 *
 * Environment:
 *   ANTHROPIC_API_KEY — required
 *   MODEL             — optional, defaults to claude-sonnet-4-6
 *   GH_TOKEN          — required in CI for gh pr create
 */

import Anthropic from "@anthropic-ai/sdk";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ──────────── Setup ────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const QUEUE_PATH = resolve(REPO_ROOT, "content/post-queue.json");
const STYLE_PATH = resolve(REPO_ROOT, "content/style-reference.md");
const BLOG_DATA_PATH = resolve(REPO_ROOT, "lib/blog-data.ts");

const MODEL = process.env.MODEL || "claude-sonnet-4-6";
const IS_DRY_RUN = process.argv.includes("--dry-run");

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ERROR: ANTHROPIC_API_KEY environment variable is required");
  process.exit(1);
}

// ──────────── Types ────────────

interface Brief {
  slug: string;
  scheduledDate: string;
  status: "queued" | "drafted" | "published";
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
}

// ──────────── Load queue ────────────

function loadQueue(): Brief[] {
  return JSON.parse(readFileSync(QUEUE_PATH, "utf8"));
}

function saveQueue(queue: Brief[]): void {
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n");
}

function findNextQueued(queue: Brief[]): Brief | null {
  return queue.find((b) => b.status === "queued") ?? null;
}

// ──────────── Load voice anchors (2 most-recent published posts) ────────────

async function loadVoiceAnchors(): Promise<{ title: string; content: string }[]> {
  // Dynamic import works because tsx handles TS at runtime
  const mod = await import(BLOG_DATA_PATH);
  const posts: Array<{ title: string; date: string; content: string }> =
    mod.BLOG_POSTS ?? [];
  return posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 2)
    .map((p) => ({ title: p.title, content: p.content }));
}

// ──────────── Build prompt ────────────

function buildSystemPrompt(styleGuide: string): string {
  return `You are a blog post writer for Gadget Construction, a Class B general contractor serving 31 cities across 6 San Francisco Bay Area counties. CA License #1132983. 12+ years, 500+ projects.

You must follow the style guide below EXACTLY. It is not a suggestion — it is the lock. Voice, structure, formatting, Bay Area specificity, banned phrases — all of it. A post that violates the style guide will be rejected.

<style_guide>
${styleGuide}
</style_guide>`;
}

function buildUserPrompt(
  brief: Brief,
  anchors: { title: string; content: string }[],
): string {
  return `Write the full blog post body for the brief below. Match the voice, structure, and formatting of the two reference posts exactly.

<reference_post_1>
Title: ${anchors[0]?.title ?? "(no reference available)"}

${anchors[0]?.content ?? ""}
</reference_post_1>

<reference_post_2>
Title: ${anchors[1]?.title ?? "(no reference available)"}

${anchors[1]?.content ?? ""}
</reference_post_2>

<brief>
${JSON.stringify(brief, null, 2)}
</brief>

Output requirements:
1. Return ONLY the markdown body — no H1 title, no frontmatter, no metadata, no preamble, no commentary after.
2. Start with "## The Short Answer" followed by 2-4 sentences delivering the conclusion upfront.
3. Proceed through every H2 section listed in the brief's outline, in order.
4. Include every H3 subsection listed under each H2.
5. Include every item from mustInclude. Exclude everything from mustAvoid.
6. Weave internalLinks naturally into the body using the specified anchor text — format them as markdown links: [anchor text](url).
7. End with a CTA section based on the brief's "cta" field.
8. Target word count: ${brief.targetWordCount} words (plus or minus 15%).
9. Use markdown tables where the brief calls for comparisons of 3+ things with 3+ attributes.
10. Use H3 subsections (###) inside H2 sections (##) — do not nest tables inside H3s unless necessary.

Do not wrap the output in backticks. Do not include a title line. Begin with "## The Short Answer".`;
}

// ──────────── Call Claude ────────────

async function generatePost(brief: Brief): Promise<string> {
  const styleGuide = readFileSync(STYLE_PATH, "utf8");
  const anchors = await loadVoiceAnchors();

  console.log(`Loading voice anchors: ${anchors.map((a) => a.title.slice(0, 40)).join(" | ")}`);
  console.log(`Calling Claude (${MODEL}) for: ${brief.title}`);

  const client = new Anthropic();
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8192,
    system: buildSystemPrompt(styleGuide),
    messages: [{ role: "user", content: buildUserPrompt(brief, anchors) }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in Claude response");
  }

  const usage = response.usage;
  const approxCost =
    (usage.input_tokens * 3 + usage.output_tokens * 15) / 1_000_000;
  console.log(
    `Done. Input: ${usage.input_tokens} tokens | Output: ${usage.output_tokens} tokens | ~$${approxCost.toFixed(3)}`,
  );

  return textBlock.text.trim();
}

// ──────────── Insert into blog-data.ts ────────────

function insertPostIntoBlogData(brief: Brief, content: string): void {
  const file = readFileSync(BLOG_DATA_PATH, "utf8");

  // Escape backticks in generated content so the TS template literal is valid
  const escapedContent = content.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

  const newEntry = `  {
    slug: "${brief.slug}",
    title: ${JSON.stringify(brief.title)},
    excerpt:
      ${JSON.stringify(brief.excerpt)},
    date: "${brief.scheduledDate}",
    readingTime: "${Math.max(1, Math.round(brief.targetWordCount / 250))} min read",
    relatedService: "${brief.relatedService}",
    content: \`
${escapedContent}
    \`.trim(),
  },
`;

  // Insert at the top of the BLOG_POSTS array
  const marker = "export const BLOG_POSTS: BlogPost[] = [";
  const markerIdx = file.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error(`Could not find BLOG_POSTS array in ${BLOG_DATA_PATH}`);
  }
  const insertAt = markerIdx + marker.length;
  const updated =
    file.slice(0, insertAt) + "\n" + newEntry + file.slice(insertAt);

  writeFileSync(BLOG_DATA_PATH, updated);
  console.log(`Inserted post into ${BLOG_DATA_PATH}`);
}

// ──────────── Git operations ────────────

function run(cmd: string): string {
  return execSync(cmd, { cwd: REPO_ROOT, encoding: "utf8" }).trim();
}

function createDraftPR(brief: Brief): void {
  const branch = `drafts/${brief.slug}`;

  // Configure git identity for CI
  try {
    run("git config user.email");
  } catch {
    run('git config user.email "noreply@gadgetconstructionsf.com"');
    run('git config user.name "Gadget Construction Bot"');
  }

  console.log(`Creating branch ${branch}`);
  run(`git checkout -b ${branch}`);
  run("git add lib/blog-data.ts content/post-queue.json");

  const commitMsg = `Draft: ${brief.title}

Auto-generated blog post for ${brief.scheduledDate}.
Primary keyword: ${brief.primaryKeyword}
Model: ${MODEL}

This post is scheduled to auto-publish on ${brief.scheduledDate}.
Review, edit inline, and merge this PR before the scheduled date.
`;
  const commitMsgPath = "/tmp/draft-commit-msg.txt";
  writeFileSync(commitMsgPath, commitMsg);
  run(`git commit -F ${commitMsgPath}`);
  run(`git push origin ${branch}`);

  const prBody = `## 📝 Auto-generated draft for ${brief.scheduledDate}

**Title:** ${brief.title}
**Primary keyword:** \`${brief.primaryKeyword}\`
**Target service:** \`/services/${brief.relatedService}\`
**Target word count:** ${brief.targetWordCount}
**Generated with:** ${MODEL}

## Review checklist

- [ ] Numbers are accurate (pricing, statistics, local references)
- [ ] Neighborhood and permit jurisdiction references are correct
- [ ] Voice matches existing posts (second person, short sentences, specific)
- [ ] Internal links resolve to real URLs on the site
- [ ] CTA matches the brief
- [ ] No banned phrases ("we pride ourselves on", stock language, etc.)
- [ ] Headline and excerpt read well

## How to edit

- **Inline via GitHub UI:** click any line in the diff and choose "Edit file"
- **Locally:** \`git fetch && git checkout ${branch}\` then edit \`lib/blog-data.ts\`

## When to merge

Merge anytime before **${brief.scheduledDate}**. The post stays hidden on the site until its scheduled date arrives (filter in \`lib/blog-data.ts\` \`isPublished()\`), then the Monday scheduled rebuild makes it live.

If the draft is bad, close this PR without merging. The brief stays in the queue for next week.
`;
  const prBodyPath = "/tmp/draft-pr-body.md";
  writeFileSync(prBodyPath, prBody);
  run(`gh pr create --title "📝 Draft: ${brief.title.slice(0, 80)}" --body-file ${prBodyPath}`);
  console.log(`PR created.`);
}

// ──────────── Main ────────────

async function main(): Promise<void> {
  const queue = loadQueue();
  const next = findNextQueued(queue);

  if (!next) {
    console.log("No queued posts remaining. Nothing to draft.");
    return;
  }

  console.log(`Next post: ${next.title}`);
  console.log(`Scheduled: ${next.scheduledDate}`);
  console.log(`Status: ${next.status}`);
  console.log("");

  const content = await generatePost(next);

  if (IS_DRY_RUN) {
    console.log("\n──────────── DRY RUN — generated content ────────────\n");
    console.log(content);
    console.log("\n──────────── END DRY RUN ────────────\n");
    console.log("No files modified. No PR created.");
    return;
  }

  insertPostIntoBlogData(next, content);

  // Flip status in queue
  const updatedQueue = queue.map((b) =>
    b.slug === next.slug ? { ...b, status: "drafted" as const } : b,
  );
  saveQueue(updatedQueue);
  console.log(`Updated ${next.slug} status: queued → drafted`);

  createDraftPR(next);

  console.log("\n✓ Done. Review and merge the PR before the scheduled publish date.");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
