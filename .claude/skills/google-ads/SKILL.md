---
name: google-ads
description: Iterate on Google Ads campaigns with full context loaded. Reads google-ads-campaign-plan.md (living status doc), summarizes what's live/pending/deferred, asks what to work on today. Updates the doc on meaningful changes and offers to commit. When the googleads/google-ads-mcp MCP server is connected, prefer live data from it over the status doc for telemetry questions. Use whenever the user is starting a Google Ads work session — adding ad groups, reviewing performance, tuning bids, adding negatives, troubleshooting conversions, or proposing strategy changes.
---

# Google Ads Iteration Skill

## Purpose

Keeps Claude and the user synced on Google Ads state across sessions. The
user's workflow: open Google Ads in a browser tab, open Claude Code, invoke
`/google-ads`, get a crisp status summary, pick a task, execute, update the
doc, commit. Rinse and repeat.

## Invocation Flow

### 1. Read the status doc

Read `google-ads-campaign-plan.md` from the repo root. This is the single
source of truth for strategy, settings, budget, conversion tracking setup,
and what's deferred.

If the file is missing, tell the user and stop — don't regenerate from scratch.

### 2. Check for the Google Ads MCP (optional, future)

If the `google-ads-mcp` MCP server is connected (check for `mcp__google-ads-*`
tools), announce it and favor live data from it for any telemetry question
(impressions, clicks, CPCs, conversions, Quality Score, etc.). The status
doc is for strategy and decisions; the MCP is for live metrics.

If not connected, rely entirely on the status doc and on-screen screenshots
the user pastes.

### 3. Summarize the current state (≤150 words)

Open with a tight summary covering:
- Date of last doc update
- What's live right now (active campaigns, ad groups, conversion actions)
- Anything flagged 🟡 (pending action this week)
- Anything flagged ⚠️ (misconfigured / needs attention)
- Deferred items 🔴 (context only)

Don't re-paste the whole status table. Surface only what's actionable or
newly changed since the user was last in Google Ads.

### 4. Ask what to work on

Propose 3–5 likely tasks based on what's actionable. Don't guess — offer
options. Examples (pick the ones that fit current state):

- Add a pending ad group (Stucco / Siding / Underpinning if still deferred)
- Review the Search terms report and add new negative keywords
- Check conversion verification status and tune CallRail conversion values
- Reallocate budget based on week's performance
- Switch from Manual CPC → Target CPA (only if 30+ conversions)
- Pause underperforming keywords
- Add sitelinks/callouts to a campaign missing them
- Propose new ad groups based on search terms that are converting
- Apply for a Developer Token / connect the MCP server (if not already done)

Let the user pick. If they describe a non-obvious goal, confirm understanding
before acting.

### 5. Execute

Work through the chosen task. Typical patterns:

- **Adding an ad group:** use the ad group keyword list + RSA copy already
  drafted in `google-ads-campaign-plan.md`. Walk the user through the
  Google Ads UI field-by-field with copy-paste-ready blocks.
- **Review performance:** ask for screenshots or (if MCP connected) query
  live data. Flag underperformers with 30+ clicks and 0 conversions as
  pause candidates.
- **Search terms review:** ask user to paste the Search terms report, or
  query via MCP if available. Propose specific negatives to add.
- **Bid strategy change:** verify conversion count first. Target CPA needs
  30+ conversions in the last 30 days.

### 6. Update the status doc

After any meaningful change, update `google-ads-campaign-plan.md`:

- Update the **Live as of** date at top
- Update the status table (top-of-file) — flip 🟡 to ✅ when shipped, mark
  new 🟡/⚠️ if new pending items appeared
- Update the specific section(s) affected (ad group tables, budget
  allocation, conversion action inventory, etc.)
- If the change reveals something worth remembering for future sessions,
  add it to the **Immediate Next Steps** section at the bottom

Don't touch the doc for trivial reads or questions that don't change state.

### 7. Offer to commit

After updating the doc, propose a concise commit message focused on **why**,
not what:

> "Add Stucco ad group — Urgent Repairs now at capacity"
> "Reallocate budget: Decks to $30/day after week 1 perf"
> "Pause 4 non-converting keywords after 30-click threshold"

Ask the user to confirm the message before committing. Use the format and
safety rules from the global Claude guidance (HEREDOC commit body, no
`--no-verify`, NEVER commit without explicit user go-ahead).

## Stable Reference Facts

These are the durable things that change rarely. Keep them in the skill so
we don't re-derive them every session:

- **Google Ads Conversion ID:** `AW-16885734093`
- **LP Form Submission `send_to`:** `AW-16885734093/jV9TCOXkkqAcEM213_M-`
- **Real business phone:** (650) 771-5817 (CallRail DNI swaps the display)
- **CA License:** #1132983
- **Avg lead value:** $1,500 (used at conversion-action level for Smart Bidding)
- **Domain:** gadgetconstructionsf.com
- **Landing pages:**
  - `/lp/exterior-repairs` (+ `#dry-rot`, `#stucco`, `#siding` anchors)
  - `/lp/composite-decks`
- **Services fallback (non-LP):** `/services/concrete-foundations` for Underpinning

## Hard Rules

- **Don't execute destructive Google Ads actions on behalf of the user.** The
  Google Ads MCP (when connected) is read-only by design. For any change
  (pause keywords, adjust bids, disable campaigns), give the user the exact
  click path and let them do it in the UI.
- **Don't invent keyword performance numbers.** If no MCP and no screenshot,
  say "I can't see live data — paste a screenshot or tell me what you're
  seeing."
- **Don't recommend switching to Target CPA below 30 conversions.** Smart
  Bidding needs ≥30 conversions in 30 days or it performs worse than Manual.
- **Don't silently overwrite the status doc.** Show the user the diff (or at
  least a summary of what sections changed) before you edit.
- **When in doubt about budget impact, err on the side of pausing more
  aggressively.** A paused keyword costs $0/day. An untuned campaign can
  burn $30–40/day.

## Quality Checks Before Concluding a Session

Before ending the skill invocation, verify:

1. Is the status doc up to date? (Date, status table, section changes.)
2. Did we capture "next time" items in Immediate Next Steps?
3. Is there a commit pending? If so, offer it explicitly.
4. Did we surface any risks the user should watch (runaway keyword, budget
   overshoot, Quality Score drop)?

If any are no, resolve them before handing back.

## Not In Scope

Skip these — they're handled elsewhere:

- Writing ad copy from scratch: existing RSA copy for all 5 ad groups is in
  `google-ads-campaign-plan.md`. Reuse it. Only draft new copy when adding
  a genuinely new ad group or replacing a deprecated ad.
- Site code changes for tracking: the gtag is already installed at
  `AW-16885734093` in `app/layout.tsx`, and the form fires the conversion
  from `components/lp/LpQuickForm.tsx`. Don't re-wire unless the conversion
  label actually changed in Google Ads.
- Budget philosophy debates: $1,500/mo is the committed budget. Don't push
  to scale unless performance data justifies it (ROAS > 3x after 30 days).
