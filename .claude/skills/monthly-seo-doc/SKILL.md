---
name: monthly-seo-doc
description: Generate a client-facing Word doc covering the next month of scheduled blog posts. Reads content/post-queue.json, picks the next 4 unpublished posts, writes custom client-facing rationale and target audience for each, produces a polished .docx in the repo root titled "Gadget-Construction-SEO-Month-N.docx".
---

# Monthly SEO Content Plan — Client Doc Generator

When the user invokes this skill, generate a client-ready Word document for the **next** month of blog publishing.

## Steps

### 1. Read the queue

Read `content/post-queue.json`. The structure is a list of brief objects, each with fields including `slug`, `scheduledDate`, `status`, `title`, `primaryKeyword`, `outline`, and others.

### 2. Determine which posts go in this month's doc

Find all briefs where `status === "queued"` AND `scheduledDate >= today`. The "next month" is the next **4 consecutive** posts in queue order (sorted by `scheduledDate` ascending).

- If fewer than 4 queued posts remain, use whatever's left.
- If 0 remain, tell the user all planned posts are covered and exit.

### 3. Figure out the month number

Count how many already-published posts exist in the queue (`status === "published"`), divide by 4, round up, add 1. So:

- 0 published → Month 1
- 4 published → Month 2
- 8 published → Month 3

If the user wants a specific month explicitly (e.g. "generate month 3"), honor that instead — select posts by index: month N covers queue positions `(N-1)*4` through `N*4 - 1`.

### 4. Write custom client copy for each post

For each of the 4 posts selected, compose two short paragraphs. Match the voice in `scripts/generate-month1-doc.py` (see `POST_RATIONALE` and `POST_AUDIENCE` dicts) — confident, specific, client-facing, not salesy, no buzzwords.

**`clientRationale`** (3–4 sentences) — explain why this post wins. Touch on:
- Search intent of the primary keyword (commercial, decision-stage, symptom, etc.)
- Competitive landscape (who else ranks — directories, manufacturers, DIY sites?)
- Specific business value (high CPC, low competition, cluster authority, etc.)
- What makes Gadget's version better than what's currently ranking

**`targetAudience`** (3–4 sentences) — describe the reader:
- Typical neighborhood or region (pull from citiesReferenced if present)
- Household income bracket or home value
- Project stage (researching, budgeting, comparing contractors, urgent need)
- Approximate ticket size

### 5. Assemble the payload JSON

Write to `/tmp/skill-monthly-seo-payload.json`:

```json
{
  "monthNumber": 2,
  "dateRangeLabel": "May 4 – May 25, 2026",
  "posts": [
    {
      "brief": { ...full brief from post-queue.json... },
      "clientRationale": "...",
      "targetAudience": "..."
    },
    ...
  ]
}
```

### 6. Run the generator

```bash
python3 .claude/skills/monthly-seo-doc/generate.py \
  --payload /tmp/skill-monthly-seo-payload.json \
  --output ./Gadget-Construction-SEO-Month-N.docx
```

Replace `N` with the month number. The output path is relative to the repo root.

### 7. Confirm to the user

Report:
- Month number + date range
- Which 4 post titles are included
- The output file path
- Suggest they open it with `open Gadget-Construction-SEO-Month-N.docx`

## Notes

- The Python script `generate.py` does ALL the formatting — don't hand-format in Claude, just produce the payload
- The first-month reference file is `scripts/generate-month1-doc.py` — consult it for rationale/audience voice examples
- Don't modify `content/post-queue.json` as part of this skill — it's read-only here. Updates to status happen elsewhere (when a post actually publishes)
- If the user has specific guidance ("emphasize X for this month" or "the client is worried about budget"), fold that into the rationale paragraphs
