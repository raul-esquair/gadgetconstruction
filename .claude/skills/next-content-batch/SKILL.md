---
name: next-content-batch
description: Propose the next 4 blog post briefs to add to the content queue. Reads Google Search Console data, existing queue, published posts, services, cities, and the Google Ads keyword plan. Calls Claude to generate 4 new or refresh briefs, writes them to content/proposed-briefs.json, and opens a PR for review. Merging the PR moves the briefs into post-queue.json.
---

# Next Content Batch — Brief Generator

When the user invokes this skill, propose the next batch of 4 blog briefs.

## Steps

1. **Verify required environment.** The following must be set:
   - `ANTHROPIC_API_KEY` (Claude API)
   - `GSC_SERVICE_ACCOUNT_JSON_BASE64` (Google Search Console)

   If running inside a GitHub Actions workflow, these are supplied automatically from repo secrets. If running locally, the user needs to export them.

   **No email is sent** when invoked manually from Claude Code. The script only sends the HTML review email when `SEND_PROPOSAL_EMAIL=true` is set in the environment, which only happens in the `auto-propose-batch.yml` workflow. If the user wants an email during manual invocation, they can prefix the command: `SEND_PROPOSAL_EMAIL=true RESEND_API_KEY=... DRAFT_REVIEW_EMAILS=... npx tsx scripts/propose-next-batch.ts`.

2. **Invoke the proposal script:**

   ```bash
   npx tsx scripts/propose-next-batch.ts
   ```

   The script:
   - Reads `content/post-queue.json`, `content/style-reference.md`, `google-ads-campaign-plan.md`, `lib/blog-data.ts`, `lib/constants.ts`, `lib/service-areas-data.ts`
   - Fetches last 90 days of Search Console data (gracefully degrades if site is new)
   - Calls Claude (default: Opus 4.7) with full context
   - Writes `content/proposed-briefs.json` + `content/proposed-briefs-summary.md`
   - Opens a PR on the `proposals/content-batch-<date>` branch

3. **Report outcome to the user:**
   - Which 4 briefs were proposed (titles + scheduled dates)
   - PR URL
   - Instruction to review, edit, or merge

4. **Do NOT modify `content/post-queue.json` directly.** The merge workflow (`.github/workflows/merge-proposed-briefs.yml`) handles that when the PR merges.

## When to use

Typically monthly, when the queue is running low on unpublished posts (e.g., 2-3 weeks of content left). Also useful after a Search Console data review when you want AI-assisted topic selection.

## Variations the user might request

- `/next-content-batch with focus on [topic]` — pass the focus to the proposal script via an env var (`FOCUS_TOPIC=xxx npx tsx ...`) — not yet implemented, propose manually if asked
- `/next-content-batch only refreshes` — the script currently proposes a mix; for refresh-only, edit the proposal after generation or rerun with dry-run and filter
- `/next-content-batch 8 posts` — scope change; would need script modification. For now, run it twice.

## Troubleshooting

- **"GSC returned permission denied"** — verify the service account email is added as a user in Search Console for gadgetconstructionsf.com
- **"No data in GSC"** — normal for a new site; script falls back to keyword plan + cluster analysis
- **PR create fails** — ensure "Allow GitHub Actions to create and approve pull requests" is enabled in repo settings

## Cost per run

~$0.50–$1.50 (Opus 4.7, ~15K input tokens with full context, ~8K output tokens). Much cheaper with Sonnet 4.6 (~$0.20). Worth Opus here for strategy quality — topic selection has a multiplier effect on every downstream post.
