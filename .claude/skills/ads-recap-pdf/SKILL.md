---
name: ads-recap-pdf
description: Generate a client-facing PDF recap of the current Google Ads analysis session — performance snapshot, findings, actions completed, actions pending, expected outcomes, next review date. Automatically carries forward context from the last report via reports/history.json so each recap builds on the previous one. Use this at the end of a /google-ads session to hand the client a polished status document.
---

# Ads Recap PDF Skill

## When to invoke

The user just finished a Google Ads analysis + optimization session (usually via `/google-ads`) and wants a PDF they can share with stakeholders covering what happened, what was done, and what's next. Tone is client-facing — translate jargon, lead with business outcomes.

## Steps

### 1. Read the history

Read `.claude/skills/ads-recap-pdf/reports/history.json`. Note:
- Last report date + period label
- Pending actions from last report (needed for continuity comparison)
- Last report's key metrics (for period-over-period delta narratives)

If history.json is missing or empty, this is the first report — skip continuity logic.

### 2. Check which pending items got done this session

Compare the last report's `pending_actions` list against what the user did in this session (either from the active conversation, or by pulling live account state via the Google Ads MCP). For each item: did it land? Still pending? Deferred?

Write a short `continuity_note` paragraph — 2-3 sentences — that the new PDF will include:

> Since the April 23 recap, the auto-apply recommendations setting has been turned off and the Urgent Repairs max bid has been raised from $12 to $16. The residual DIY keyword in Dry Rot remains pending and is carried into the next review window.

If this is the first report, skip the continuity_note.

### 3. Gather current-session data

For each of these fields, either (a) pull live from the Google Ads MCP, (b) reuse figures from the current conversation, or (c) ask the user directly. Do not invent numbers.

**Period:**
- `report_date` — today's date (YYYY-MM-DD)
- `period_label` — human-readable label like "April 21–23, 2026 · Launch + First 3 Days" or "Week 2 · April 28 – May 4, 2026"

**Performance data** (live-pull from MCP when available):
- `account_totals` — key-value pairs (Impressions, Clicks, CTR, Avg CPC, Total Spend, Leads, Committed Monthly Budget)
- `by_campaign` — header row + data rows for the campaign breakdown
- `by_ad_group` — same shape

**Analysis:**
- `findings` — 1-3 findings, each with `{label, body, callout?}`. The `label` is short (e.g. "Finding 1 — Click-through rate climbed 28%"). Body is 2-4 sentences in plain language. Optional `callout` is a one-line bold emphasis statement.
- `actions_completed` — flat list of strings, each starting with a bolded category (e.g. "<b>Urgent Repairs Max CPC raised.</b> From $12 to $16...")
- `actions_pending` — flat list of strings, same format
- `expectations` — flat list of "what to watch" items

**Wrap-up:**
- `next_review` — one sentence on when and what. E.g. "April 26–27, 2026 — by then we'll have 72+ hours of clean post-cleanup data..."
- `footer_note` — optional override of the default attribution line

### 4. Translate jargon for the client

The audience is non-technical. Rewrite terms before putting them in the PDF:

| Internal term | Client-facing term |
|---|---|
| Rank Lost Impression Share | auction win rate / bid competitiveness |
| Impression Share | ad visibility |
| Quality Score | ad relevance score |
| CPC | cost per click |
| CTR | click-through rate |
| Broad/Phrase/Exact match | how tightly the keyword targets searches |
| Negative keyword | search-term block |

Never leave raw acronyms in the body paragraphs.

### 5. Write the payload JSON

Write to `/tmp/skill-ads-recap-payload.json`. Full schema:

```json
{
  "report_date": "YYYY-MM-DD",
  "period_label": "...",
  "executive_summary": "...",
  "continuity_note": "..." (optional, only if not first report),
  "performance": {
    "account_totals": [["Impressions", "433"], ["Clicks", "26"], ...],
    "by_campaign": {
      "header": ["Campaign", "Impr.", "Clicks", "Spend", "CTR", "Avg CPC"],
      "rows": [["Urgent Repairs", "373", "22", "$137.36", "5.90%", "$6.24"], ...]
    },
    "by_ad_group": {
      "header": [...],
      "rows": [...]
    }
  },
  "findings": [
    {"label": "Finding 1 — ...", "body": "...", "callout": "..."}
  ],
  "actions_completed": ["<b>...</b> ..."],
  "actions_pending": ["<b>...</b> ..."],
  "expectations": ["<b>...</b> ..."],
  "next_review": "...",
  "footer_note": "Prepared YYYY-MM-DD. Data source: Google Ads live API."
}
```

Also save a dated copy to `.claude/skills/ads-recap-pdf/reports/{report_date}.json` — this becomes the durable record for future continuity checks.

### 6. Run the generator

```bash
python3 .claude/skills/ads-recap-pdf/generate.py \
  --payload /tmp/skill-ads-recap-payload.json \
  --output ./Gadget-Ads-Recap-{ShortDate}.pdf
```

Where `{ShortDate}` is something like `Apr23-2026` or `May6-2026` — pick a human-friendly format. This PDF lands in the repo root (latest).

Also archive by copying the same PDF to `.claude/skills/ads-recap-pdf/reports/Gadget-Ads-Recap-{ShortDate}.pdf`.

### 7. Update history.json

Append a new entry to `.claude/skills/ads-recap-pdf/reports/history.json`:

```json
{
  "report_date": "YYYY-MM-DD",
  "period_label": "...",
  "pdf_file": ".claude/skills/ads-recap-pdf/reports/Gadget-Ads-Recap-{ShortDate}.pdf",
  "data_file": ".claude/skills/ads-recap-pdf/reports/{report_date}.json",
  "key_metrics": {
    "total_spend": 158.74,
    "total_clicks": 26,
    "total_impressions": 433,
    "total_conversions": 0,
    "ctr_pct": 6.00,
    "avg_cpc": 6.10
  },
  "actions_completed_count": 4,
  "pending_actions": [
    "Remove `how to fix rotting door frame` (Exact) from Dry Rot",
    "..."
  ]
}
```

### 8. Open + confirm

- `open ./Gadget-Ads-Recap-{ShortDate}.pdf`
- Report to the user:
  - Output path
  - How many pages
  - What's in each section
  - Which items from the last report's pending list made it out of pending this cycle

## Conventions

- **Repo root PDF** = the latest report; previous versions are overwritten there. Fine because the archive copy in `reports/` preserves every past report.
- **`reports/{date}.json`** = the full payload that produced the PDF. Keep this — it's what lets future runs compute deltas.
- **`reports/history.json`** = lightweight index. Don't put body prose here, just metrics + dates + pending list.

## Hard Rules

- **Never invent numbers.** If a metric isn't available from MCP and the user hasn't provided it, ask. Client-facing docs break trust when wrong.
- **Never leave raw jargon in body paragraphs.** Translate per the table in Step 4.
- **Never delete or rewrite historical entries** in `history.json`. Append only.
- **Don't commit the report files automatically.** The user may want to review or send the PDF before it becomes part of the git record. Offer the commit; don't execute it.
- **Don't include projections tables or ROAS estimates** unless the user explicitly asks. (Raul removed the Month-One Projections table from the Apr 23 version — treat that as the default.)

## Not in scope

- Writing the analysis itself — that's `/google-ads`. This skill assumes the analysis already happened.
- Google Ads MCP config — assume it's already connected. If it isn't, ask the user to run `/google-ads` first.
- Sending the PDF anywhere — the user handles distribution.
