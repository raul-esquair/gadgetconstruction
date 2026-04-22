# Weekly Client Digest — Feature Spec

**Status:** Designed, not implemented — saved 2026-04-21 for later pickup
**Target user:** Raul (single-user)
**Core ask:** One channel that surfaces (a) the blog post queue and (b) last week's Google Ads metrics.

## Architectural constraint

The Google Ads MCP server is a Claude Code subprocess spawned via stdio. It cannot be invoked from a GitHub Action cron or any other non-Claude-Code runtime. So **"leverages the MCP" and "fully automated" are mutually exclusive.**

## Three options weighed

| # | Approach | MCP used? | Auto? | Effort | Status |
|---|---|---|---|---|---|
| 1 | Manual `/weekly-digest` skill in Claude Code — pulls ads via MCP, reads post-queue.json, drafts + sends email via Resend | ✅ | Manual (one slash command per week) | ~2 hrs | **Chosen** |
| 2 | Hybrid — Claude Code skill writes ads snapshot to `content/ads-snapshot.json` + commits; GitHub Action sends email Monday from snapshot + post-queue | ✅ (for snapshot) | Email auto, snapshot manual | ~4–5 hrs | Backup if option 1 friction is too high |
| 3 | GitHub Action calls Google Ads API directly using stored OAuth creds (no MCP) | ❌ | ✅ Fully automated | ~1 day + credential migration to GitHub Secrets | Rejected — overkill for a single user, expands secret-leak surface |

## Why option 1

- Raul is already in Claude Code regularly for `/google-ads`, content generation, etc.
- MCP is wired and verified (reaches Gadget `8495875417` through Esquair MCC `7701854464`)
- "Manual" = typing one slash command on Monday. Lower friction than building automation that needs maintenance.
- Avoids migrating Google Ads OAuth credentials from `.mcp.json` to GitHub Secrets
- Easy to upgrade to option 2 or 3 later if usage proves the value

## Implementation outline (option 1)

### New skill: `.claude/skills/weekly-digest/SKILL.md`

Triggered by `/weekly-digest`. Steps:

1. Pull last 7 days of metrics via `mcp__google-ads__search` against:
   - `campaign` (impressions, clicks, conversions, spend per campaign)
   - `keyword_view` or `ad_group_criterion` (top performers + zero-converting cost sinks)
   - `search_term_view` (top 3 by conversion + any junk to add as negatives)
2. Read `content/post-queue.json` — list next 4 unpublished briefs with scheduled date and any `drafts/*` PRs open
3. Compose markdown digest
4. Send via Resend (`estimates@gadgetconstructionsf.com` — already verified sender)
5. Display the same digest inline in terminal so Raul gets it in two channels
6. Optionally update `google-ads-campaign-plan.md` if anything meaningful surfaced (per the existing `/google-ads` skill convention)

### Email template

- **Subject:** `Weekly digest — week of [Mon date]`
- **From:** `estimates@gadgetconstructionsf.com`
- **To:** `info@gadgetconstructionsf.com` (Raul) — decide on CC at build time
- **Sections:**
  - **Ads at a glance** — impressions, clicks, conversions, spend, ROAS (per campaign)
  - **Top 3 search terms** by conversion (last 7 days)
  - **Spending keywords with zero conversions** (30+ click threshold) — pause candidates
  - **Budget pacing** — actual vs. $1,800/mo committed
  - **Content queue** — next 4 unpublished briefs (slug, title, scheduled date, status)
  - **Open draft PRs** — anything in `drafts/*` awaiting review
  - **Anything that needs attention** — surfaced anomalies

### Data shape from MCP

Use existing tools: `mcp__google-ads__search`, `mcp__google-ads__list_accessible_customers`, `mcp__google-ads__get_resource_metadata`. Customer ID: `8495875417`. Login customer (MCC): `7701854464`.

## Open decisions for build time

- Email recipients — just Raul, or CC `admin@esquair.com`?
- Cadence — strict Monday, or "whenever Raul invokes"?
- Auto-commit historical snapshots? (e.g., `content/ads-snapshot-2026-W18.json`)
- Skill name — `/weekly-digest` vs `/digest` vs `/monday-brief`?

## Future expansion

If option 1 proves valuable and Raul wants more polish, build the full **`/dashboard`** route on the existing site:
- Gated route, magic-link auth via Resend
- `/dashboard/content` (blog queue with edit capability)
- `/dashboard/ads` (live + historical ads metrics, calling Google Ads API directly server-side)
- Effort: 4–6 days
- Spec separately at that time
