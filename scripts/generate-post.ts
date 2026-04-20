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
import { marked } from "marked";
import { Resend } from "resend";
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

// ──────────── Email draft for review ────────────

async function sendDraftEmail(
  brief: Brief,
  markdownContent: string,
  prUrl: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("RESEND_API_KEY not set — skipping email.");
    return;
  }

  const recipientsRaw = process.env.DRAFT_REVIEW_EMAILS;
  if (!recipientsRaw) {
    console.log("DRAFT_REVIEW_EMAILS not set — skipping email.");
    return;
  }
  const recipients = recipientsRaw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const renderedBody = await marked.parse(markdownContent);

  const readingTime = Math.max(1, Math.round(brief.targetWordCount / 250));
  const wordCount = brief.targetWordCount.toLocaleString();
  const scheduledLabel = new Date(brief.scheduledDate).toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" },
  );

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(brief.title)}</title>
<style>
  body { margin:0; padding:0; background:#f4f4f5; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; color:#222222; line-height:1.6; }
  .wrap { max-width: 680px; margin: 0 auto; padding: 24px 16px 48px; }
  .header { background:#222222; color:#ffffff; padding: 20px 24px; border-radius: 12px 12px 0 0; }
  .badge { display:inline-block; background:#CC0000; color:#fff; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:4px 10px; border-radius: 999px; }
  .header h2 { margin: 12px 0 0; font-size: 20px; font-weight: 700; color:#ffffff; }
  .meta-grid { background: #ffffff; padding: 20px 24px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5; }
  .meta-row { display:flex; font-size: 13px; margin-bottom: 8px; }
  .meta-label { width: 140px; color:#6b7280; font-weight:600; }
  .meta-value { color:#222222; }
  .actions { background:#ffffff; padding: 16px 24px 24px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; border-radius: 0 0 12px 12px; }
  .btn-primary { display:inline-block; background:#CC0000; color:#ffffff !important; text-decoration:none; padding: 12px 22px; border-radius: 8px; font-weight:700; font-size: 14px; }
  .btn-secondary { display:inline-block; margin-left: 8px; color:#222222 !important; text-decoration:none; padding: 12px 22px; border-radius: 8px; border:1px solid #d4d4d8; font-weight:600; font-size: 14px; }
  .article { background:#ffffff; margin-top: 24px; padding: 32px 28px; border: 1px solid #e5e5e5; border-radius: 12px; }
  .article h1 { font-size: 28px; line-height: 1.2; margin: 0 0 16px; color:#222222; }
  .article h2 { font-size: 22px; line-height: 1.25; margin: 32px 0 12px; color:#222222; border-bottom: 2px solid #f4f4f5; padding-bottom: 8px; }
  .article h3 { font-size: 17px; line-height: 1.3; margin: 22px 0 8px; color:#222222; }
  .article p { margin: 0 0 14px; color: #444444; font-size: 15px; }
  .article ul, .article ol { margin: 0 0 14px; padding-left: 22px; color:#444444; }
  .article li { margin-bottom: 6px; }
  .article a { color: #CC0000; text-decoration: underline; }
  .article strong { color: #222222; }
  .article table { width:100%; border-collapse: collapse; margin: 14px 0 18px; }
  .article th, .article td { border: 1px solid #e5e5e5; padding: 8px 10px; text-align: left; font-size: 14px; vertical-align: top; }
  .article th { background:#fafafa; font-weight:700; }
  .article blockquote { margin: 14px 0; padding: 10px 16px; border-left: 3px solid #CC0000; background: #fafafa; color:#444444; }
  .footer { text-align:center; color:#9ca3af; font-size: 12px; margin-top: 32px; }
  .footer a { color:#9ca3af; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <span class="badge">Draft for review</span>
      <h2>${escapeHtml(brief.title)}</h2>
    </div>
    <div class="meta-grid">
      <div class="meta-row"><div class="meta-label">Scheduled to publish</div><div class="meta-value">${escapeHtml(scheduledLabel)}</div></div>
      <div class="meta-row"><div class="meta-label">Primary keyword</div><div class="meta-value"><code>${escapeHtml(brief.primaryKeyword)}</code></div></div>
      <div class="meta-row"><div class="meta-label">Target service</div><div class="meta-value">/services/${escapeHtml(brief.relatedService)}</div></div>
      <div class="meta-row"><div class="meta-label">Word count</div><div class="meta-value">${wordCount} words — ~${readingTime} min read</div></div>
      <div class="meta-row"><div class="meta-label">Geographic focus</div><div class="meta-value">${escapeHtml(brief.geoFocus)}</div></div>
    </div>
    <div class="actions">
      <a class="btn-primary" href="${prUrl}">Review &amp; merge on GitHub</a>
      <a class="btn-secondary" href="${prUrl}">Open PR in browser</a>
    </div>
    <div class="article">
      ${renderedBody}
    </div>
    <div class="footer">
      Auto-generated by Gadget Construction's weekly blog pipeline. Close the PR to reject this draft.<br>
      Merging publishes the post on ${escapeHtml(scheduledLabel)}.
    </div>
  </div>
</body>
</html>`;

  const resend = new Resend(apiKey);
  const fromAddress = process.env.DRAFT_FROM_EMAIL || "Gadget Drafts <drafts@gadgetconstructionsf.com>";

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: recipients,
    subject: `📝 New blog draft ready: ${brief.title}`,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(`Failed to send draft email: ${JSON.stringify(error)}`);
  }
  console.log(`Draft email sent to ${recipients.join(", ")} (id: ${data?.id})`);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ──────────── Git operations ────────────

function run(cmd: string): string {
  return execSync(cmd, { cwd: REPO_ROOT, encoding: "utf8" }).trim();
}

function createDraftPR(brief: Brief): string {
  const branch = `drafts/${brief.slug}`;

  // Configure git identity for CI
  try {
    run("git config user.email");
  } catch {
    run('git config user.email "noreply@gadgetconstructionsf.com"');
    run('git config user.name "Gadget Construction Bot"');
  }

  console.log(`Creating branch ${branch}`);
  // Delete the local branch if it exists (from a partial prior run), then recreate fresh
  try { run(`git branch -D ${branch}`); } catch { /* branch didn't exist */ }
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
  // Force push — previous stale drafts for this slug are always overwritten.
  // Any unmerged draft branch is treated as abandoned; merge before rerunning to preserve.
  run(`git push --force-with-lease origin ${branch}`);

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
  const prUrl = run(
    `gh pr create --title "📝 Draft: ${brief.title.slice(0, 80)}" --body-file ${prBodyPath}`,
  );
  console.log(`PR created: ${prUrl}`);
  return prUrl;
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

  const prUrl = createDraftPR(next);

  try {
    await sendDraftEmail(next, content, prUrl);
  } catch (err) {
    // Don't fail the whole workflow if email delivery breaks — PR still exists
    console.error("Draft email failed but PR is live:", err);
  }

  console.log("\n✓ Done. Review and merge the PR before the scheduled publish date.");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
