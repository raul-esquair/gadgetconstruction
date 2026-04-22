# Google Ads — Gadget Construction Inc.

**Live as of:** 2026-04-21
**Client:** Gadget Construction Inc. | CA Lic #1132983
**Service Area:** Marin, San Francisco, San Mateo, Santa Clara counties
**Google Ads Conversion ID:** `AW-16885734093`
**Monthly Budget (current):** $1,500/mo ($49.50/day split across 2 campaigns)

---

## Current Status (at a glance)

| Area | Status |
|---|---|
| **Conversion tracking — gtag installed on site** | ✅ Live (commit `9ef5362`) |
| **LP Form Submission conversion action** | ⏳ Inactive (awaiting Google tag verification — auto on first traffic) |
| **LP Form Submission attached to both campaigns** | ✅ 2 of 2 |
| **Phone call lead conversion attached to both campaigns** | ✅ 2 of 2 Active |
| **CallRail → Google Ads integration** | ✅ Activated + goal attached to 2 of 2 campaigns (First Time Phone Call $1,500, Repeat Phone Call $500) |
| **Account negative keyword list applied** | ✅ Applied to both campaigns |
| **Campaign 1 — Urgent Repairs** | ✅ Enabled |
| **Campaign 2 — Planned Projects (Composite Decks)** | ✅ Enabled |
| **Ad Group — Dry Rot Repair** | ✅ Live (4 keywords, 15 HL + 4 desc, 3 pins) |
| **Ad Group — Stucco Repair** | ✅ Live (7 keywords, 15 HL + 4 desc, 3 pins) |
| **Ad Group — Composite Decks** | ✅ Live (5 keywords, 15 HL + 4 desc, 3 pins) |
| **Ad Group — Siding** | 🔴 Deferred (month 2+ when budget scales) |
| **Ad Group — Underpinning** | 🔴 Deferred (month 2+) |
| **Sitelinks + Callouts — Campaign 1 (Urgent Repairs)** | ✅ 6 sitelinks + 10 callouts |
| **Sitelinks — Campaign 2 (Planned Projects)** | ✅ 6 sitelinks (incl. Composite vs. Wood Decks) |
| **Callouts — Campaign 2 (Planned Projects)** | ✅ 10 callouts (deck-tailored mix) |

---

## Live Assets Reference

### Landing Pages
- `https://gadgetconstructionsf.com/lp/exterior-repairs` (Dry Rot / Stucco / Siding, noindex, single-step form)
- `https://gadgetconstructionsf.com/lp/exterior-repairs#dry-rot` — Dry Rot ad group final URL
- `https://gadgetconstructionsf.com/lp/exterior-repairs#stucco` — Stucco ad group final URL (when built)
- `https://gadgetconstructionsf.com/lp/exterior-repairs#siding` — Siding ad group final URL (when built)
- `https://gadgetconstructionsf.com/lp/composite-decks` — Composite Decks ad group final URL

### Business Info on Ads
- **Phone:** (650) 771-5817 (displayed number swapped by CallRail DNI per visitor)
- **License:** CA #1132983
- **Form:** LP single-step — name + phone + optional email + optional project details

### Conversion Events
- **Form Submission:** gtag event fired from `LpQuickForm.tsx` on successful POST to `/api/contact`
  - `send_to: AW-16885734093/jV9TCOXkkqAcEM213_M-`
  - Assigned value: $1,500 per lead (blended close rate × avg job value)
- **Phone call (from ads):** Google's native call extension tracking (auto)
- **Phone call (from website):** CallRail push after 60s+ qualifying call, separate first-time / repeat

---

## Campaign Snapshot

### Campaign 1: Urgent Repairs — Dry Rot + Stucco

| Setting | Value |
|---|---|
| **Status** | Enabled |
| **Daily Budget** | $33/day (~$1,000/mo) |
| **Bidding** | Clicks + Max CPC cap $12.00 (Manual CPC equivalent) |
| **Locations** | Marin, SF, San Mateo, Santa Clara counties — Presence only |
| **Schedule** | Mon–Sat, 6am–9pm PT |
| **Language** | English |
| **Networks** | Search only (no Search Partners, no Display) |
| **AI Max** | OFF |
| **Sitelinks** | 6 campaign-level (Gallery, Service Areas, About, Pricing/FAQ, Contact, #stucco) |
| **Callouts** | 10 campaign-level |
| **Ad Groups** | 2 live (Dry Rot, Stucco) |

### Campaign 2: Planned Projects — Composite Decks

| Setting | Value |
|---|---|
| **Status** | Enabled |
| **Daily Budget** | $16.50/day (~$500/mo) |
| **Bidding** | Clicks + Max CPC cap $10.00 |
| **Locations** | Same as Campaign 1 |
| **Schedule** | Same as Campaign 1 |
| **AI Max** | OFF |
| **Sitelinks** | 6 campaign-level (see Ad Extensions section) |
| **Callouts** | 10 campaign-level (see Ad Extensions section) |
| **Ad Groups** | 1 live (Composite Decks) |

---

## Ad Groups & Keywords

Legend: 🟢 Live · 🟡 Pending / Scheduled · 🔴 Deferred

### 🟢 Ad Group 1: Dry Rot Repair  *(Campaign 1)*

**Final URL:** `/lp/exterior-repairs#dry-rot`

| Keyword | Match Type | Monthly Vol | CPC Range |
|---------|-----------|-------------|-----------|
| dry rot repair | Phrase | 110 | $5.61–$45.45 |
| dry rot repair near me | Exact | 20 | $6.37–$45.59 |
| dry rot contractor | Phrase | 10 | $7.39–$22.44 |
| dry rot repair contractor | Phrase | 20 | — |
| **Group total** | | **160** | |

---

### 🟢 Ad Group 2: Stucco Repair  *(Campaign 1 — added 2026-04-21)*

**Final URL:** `/lp/exterior-repairs#stucco`

| Keyword | Match Type | Monthly Vol | CPC Range |
|---------|-----------|-------------|-----------|
| stucco repair | Phrase | 390 | $3.78–$12.36 |
| fixing stucco | Phrase | 390 | $3.78–$12.36 |
| stucco repair near me | Exact | 50 | $5.36–$13.80 |
| stucco contractor | Phrase | 260 | $8.45–$37.27 |
| stucco contractors near me | Exact | 110 | $5.06–$11.36 |
| stucco companies near me | Exact | 110 | $5.06–$11.36 |
| stucco company | Phrase | 20 | $8.09–$30.00 |
| **Group total** | | **1,330** | |

**Ad group default bid (Max CPC):** $8.00
**Display paths:** `stucco-repair` / `bay-area`

**Responsive Search Ad — headlines (15, ≤30 chars):**

| # | Headline | Pin |
|---|---|---|
| 1 | Stucco Repair Bay Area | Position 1 |
| 2 | Stucco Repair Near You | Position 1 |
| 3 | Cracked Stucco? Fixed Right | Position 2 |
| 4 | Free Stucco Inspection | Position 2 |
| 5 | CA Licensed, 5-Yr Warranty | Position 3 |
| 6 | Three-Coat Re-Stucco Pros | — |
| 7 | Hairline Crack to Re-Coat | — |
| 8 | 500+ Bay Area Projects | — |
| 9 | Fixed-Price Stucco Quotes | — |
| 10 | 12+ Years in the Bay Area | — |
| 11 | Stucco Contractor, SF & Marin | — |
| 12 | Stop Water Damage Fast | — |
| 13 | Same-Week Stucco Estimates | — |
| 14 | Full-House Re-Stucco Service | — |
| 15 | Free Fixed-Price Estimate | — |

**Descriptions (4, ≤90 chars):**

1. Licensed Bay Area stucco pros. Crack patching to full re-stucco. 5-year warranty.
2. 500+ Bay Area projects, 12+ years. Fixed-price quotes after free on-site inspection.
3. Catch water damage early. We diagnose whether you need a patch, re-coat, or tear-off.
4. CA Lic #1132983. Serving 31 Bay Area cities. Free inspection - response in minutes.

---

### 🟢 Ad Group 3: Composite Decks  *(Campaign 2)*

**Final URL:** `/lp/composite-decks`

| Keyword | Match Type | Monthly Vol | CPC Range |
|---------|-----------|-------------|-----------|
| deck builder near me | Exact | 320 | $10.54–$33.22 |
| deck contractors near me | Exact | 320 | $10.54–$33.22 |
| deck building companies near me | Exact | 320 | $10.54–$33.22 |
| deck installation companies near me | Exact | 10 | $5.91–$20.66 |
| composite decking installers near me | Exact | 10 | $5.23–$15.00 |
| **Group total** | | **980** | |

---

### 🔴 Ad Group 4: Siding  *(Campaign 2 — deferred to month 2+)*

**Final URL when activated:** `/lp/exterior-repairs#siding`

| Keyword | Match Type | Monthly Vol | CPC Range |
|---------|-----------|-------------|-----------|
| siding contractor near me | Exact | 170 | $14.25–$75.00 |
| siding companies near me | Exact | 170 | $14.25–$75.00 |
| siding repair | Phrase | 110 | $9.88–$23.74 |
| siding replacement | Phrase | 40 | $10.00–$33.89 |
| siding replacement estimate | Phrase | 50 | $4.39–$18.54 |
| siding replacement near me | Exact | 10 | $18.72–$75.45 |
| replacement of siding | Phrase | 40 | $10.00–$33.89 |
| changing siding | Phrase | 40 | $10.00–$33.89 |
| **Group total** | | **630** | |

**Why deferred:** CPCs run high ($14–$75). Budget better spent on Dry Rot + Stucco + Decks first. Revisit once we have 30 conversions of data.

---

### 🔴 Ad Group 5: Underpinning  *(deferred to month 2+)*

**Final URL when activated:** `/services/concrete-foundations` (existing service page, not an LP)

| Keyword | Match Type | Monthly Vol | CPC Range |
|---------|-----------|-------------|-----------|
| under pinning | Phrase | 480 | $2.95–$55.00 |
| foundation underpinning | Phrase | 90 | $2.48–$28.17 |
| foundation underpinning contractors | Exact | 20 | — |
| underpinning contractor | Exact | 10 | — |
| **Group total** | | **600** | |

**Why deferred:** Limited inventory (~600 searches/mo) means $500/mo budget would undersend. Add once we're scaling total budget.

---

## Current Budget Allocation

| Campaign | Ad Group | Daily | Monthly | Status |
|---|---|---|---|---|
| Urgent Repairs | Dry Rot | (shares $33/day) | ~$250 | 🟢 Live |
| Urgent Repairs | Stucco | (shares $33/day) | ~$750 | 🟢 Live |
| Planned Projects | Composite Decks | $16.50/day | ~$500 | 🟢 Live |
| **Total** | | **$49.50** | **~$1,500** | |

*Google splits campaign budget across ad groups based on performance. With Stucco added, Urgent Repairs internally distributes $33/day between Dry Rot (low volume) and Stucco (high volume), favoring Stucco.*

### Scaling Path

- **If Month 1 ROAS > 300%:** scale to $2,500/mo, add Siding + Underpinning
- **If Month 1 ROAS 150–300%:** hold budget, optimize creative + bids
- **If Month 1 ROAS < 150%:** pause underperforming ad group, consolidate budget onto winners

---

## Conversion Tracking Setup

### What's Live
- **Global Google tag** in `app/layout.tsx` — fires on every page
- **Form submit event** fires from `components/lp/LpQuickForm.tsx` after successful POST to `/api/contact`
- **Conversion value:** $1,500 per lead (set at conversion-action level, not per-fire)
- **Attribution window:** 30-day click-through, 1-day view-through
- **Attribution model:** Data-driven (falls back to Last click if < 300 conversions)

### CallRail → Google Ads
- **Activation:** 2026-04-21
- **Min call duration for conversion:** 60 seconds
- **Conversion actions pushed (actual Google Ads names):**
  - `First Time Phone Call` — $1,500 value (set 2026-04-21)
  - `Repeat Phone Call` — $500 value (set 2026-04-21)
- **Count setting:** "Every" (phone-native default — each call counts; correct for repeat caller action)
- **Attribution window:** 90-day click-through (CallRail default; longer than form action since call leads take longer to close)
- **Goal group:** "Other" (account-default), attached to **2 of 2 campaigns** after goal-attachment fix on 2026-04-21

### Why $500 on Repeat Phone Call (not $1,500)

Repeat callers are a mix of returning prospects, existing customers with warranty/followup questions, and past non-converters circling back. Setting repeat caller equal to form value would teach Smart Bidding to bid aggressively toward queries that surface repeat callers — largely people who'd call regardless of ad spend. $500 captures real incremental lead value without overweighting. Revisit after 60–90 days of CallRail call recordings reveal the actual repeat-caller breakdown.

### Conversion Action Inventory

| Action | Source | Status | Value |
|---|---|---|---|
| LP Form Submission | Website (gtag) | Inactive (verifying) | $1,500 |
| First Time Phone Call | CallRail push | Pending first call | $1,500 |
| Repeat Phone Call | CallRail push | Pending first call | $500 |
| Calls from Smart Campaign Ads | Google (call extension) | Locked/system-managed | — (skipped; Smart Campaign-only, doesn't fire from Search campaigns) |

---

## Ad Extensions (Assets)

### Campaign 1 — Urgent Repairs ✅
- **Call extension:** (650) 771-5817
- **Sitelinks (6):** Bay Area Project Gallery, 31 Cities We Serve, 12+ Years of Trust, Pricing & FAQs, Call or Request Quote, Siding & Stucco Options
- **Callouts (10):** 5-Yr Workmanship Warranty · 500+ Bay Area Projects · Licensed & Fully Insured · Free On-Site Inspection · Fixed-Price Quotes · Respond in Minutes · 12+ Years in the Bay Area · Full Permit Handling · CA License #1132983 · Family Owned & Operated

### Campaign 2 — Planned Projects ✅
- **Call extension:** (650) 771-5817
- **Sitelinks (6):** Bay Area Project Gallery, 31 Cities We Serve, 12+ Years of Trust, Pricing & FAQs, Call or Request Quote, Composite vs. Wood Decks
  - *Note: Campaign 2 uses a deck-specific 6th sitelink ("Composite vs. Wood Decks" → `/services/composite-decks`) instead of Campaign 1's Siding/Stucco one.*
- **Callouts (10, added 2026-04-21):** 5-Yr Workmanship Warranty · 25-Yr Board Warranty · Trex & TimberTech Pros · 500+ Bay Area Projects · No Stain, No Sand, No Rot · Fixed-Price Quotes · Respond in Minutes · Free Deck Design Visit · 12+ Years in the Bay Area · CA License #1132983
  - *Tailored vs. Campaign 1:* swapped `Licensed & Fully Insured`, `Family Owned & Operated`, `Full Permit Handling` for `25-Yr Board Warranty`, `Trex & TimberTech Pros`, `No Stain, No Sand, No Rot`. Also rephrased `Free On-Site Inspection` → `Free Deck Design Visit` since Planned Projects buyers are designing, not inspecting damage.

### Sitelink 6 copy (Campaign 2 only)

Added 2026-04-21. Catches top-of-funnel deck shoppers still comparing materials.

| Field | Value |
|---|---|
| Sitelink text | Composite vs. Wood Decks |
| Description 1 | 25-year lifespan, zero staining |
| Description 2 | Why composite outlasts redwood |
| Final URL | `https://gadgetconstructionsf.com/services/composite-decks` |

### Structured Snippets (pending)
- **Type:** Services
- **Values:** Dry Rot Repair, Stucco Repair, Siding Installation, Composite Decks, Foundation Underpinning, Home Remodeling

### Location Extension (pending)
Link Google Business Profile in Google Ads → Tools → Business Profile.

---

## Negative Keywords — Applied to Both Campaigns

Shared list name: `Global negatives — all campaigns`

```
diy
how to
how to fix
how do i
what is
definition
cheap
free
discount
affordable
home depot
lowes
menards
cost of
price of
jobs
hiring
salary
career
pictures
images
ideas
pinterest
reddit
forum
youtube
videos
near me free
for sale
rent
rental
```

Expand weekly based on Search terms report.

---

## Campaign Settings (both campaigns)

| Setting | Value |
|---|---|
| **Network** | Search only (no Search Partners, no Display) |
| **Locations** | Marin, SF, San Mateo, Santa Clara counties |
| **Location option** | Presence only (NOT "Presence or interest") |
| **Language** | English |
| **Ad schedule** | Mon–Sat, 6am–9pm Pacific |
| **Bid strategy** | Clicks + Max CPC cap (Manual CPC equivalent) |
| **Max CPC — Urgent Repairs** | $12.00 |
| **Max CPC — Planned Projects** | $10.00 |
| **Device** | All devices, no bid adjustments |
| **Ad rotation** | Optimize for best performing ads |
| **AI Max** | OFF |

---

## Landing Pages

| Service | Page | Status |
|---------|------|--------|
| Dry Rot | /lp/exterior-repairs#dry-rot | ✅ Live |
| Stucco | /lp/exterior-repairs#stucco | ✅ Live |
| Siding | /lp/exterior-repairs#siding | ✅ Live (unused until Siding ad group activates) |
| Composite Decks | /lp/composite-decks | ✅ Live |
| Underpinning | /services/concrete-foundations | ✅ Existing (not optimized as PPC LP) |

All LPs have `noindex, follow` meta robots so they don't compete with /services/* organic rankings.

---

## 30-Day Optimization Checklist

### Week 1 (Apr 21–27)
- [ ] Daily: check Search terms report. Add obvious junk queries as negatives.
- [ ] Add Stucco ad group (today)
- [ ] Verify sitelinks/callouts attached to Campaign 2 (Planned Projects)
- [ ] Once LP Form Submission flips to Active, verify test-submit registers in dashboard
- [ ] Set $1,500 value on CallRail conversion actions (first-time + repeat) in Google Ads
- [ ] Check impression share — if < 30%, raise Max CPC caps in $2 increments

### Week 2 (Apr 28–May 4)
- [ ] Pause any keyword with 30+ clicks, 0 conversions
- [ ] Increase bids on converting keywords by 20%
- [ ] Review which ad headlines are winning (Assets tab shows headline performance)

### Week 3 (May 5–11)
- [ ] A/B test ad copy: clone top-performing RSA, swap H4–H15 for new variants
- [ ] Check Quality Score on every keyword. Anything < 5/10 — fix LP relevance or pause.
- [ ] Review CallRail call recordings — are calls actually qualifying? Tune min duration if needed.

### Week 4 (May 12–18)
- [ ] Full month performance review
- [ ] If 30+ conversions: switch both campaigns to **Target CPA** bidding
  - Start target: $60 (tune based on actual cost-per-lead)
- [ ] Reallocate budget from underperforming ad groups to winners
- [ ] If budget justifies: activate Siding and/or Underpinning ad groups

---

## Expected Performance (Month 1)

Based on current $1,500/mo budget, $10–15 avg CPC, 4–5% form CVR, 20–25% close rate.

| Metric | Low | Mid | High |
|--------|-----|-----|------|
| Monthly spend | $1,500 | $1,500 | $1,500 |
| Clicks | 100 | 125 | 150 |
| Avg CPC | $15 | $12 | $10 |
| Form submissions (5% CVR) | 5 | 6 | 8 |
| Phone calls (CallRail qualified) | 3 | 5 | 7 |
| Total leads | 8 | 11 | 15 |
| Closed jobs (22% close rate) | 2 | 2–3 | 3–4 |
| Avg job value (blended) | $6,000 | $8,000 | $12,000 |
| **Revenue estimate** | **$12K** | **$20K** | **$45K** |
| **ROAS** | 8x | 13x | 30x |

*These are estimates. Response time to leads (minutes vs hours) is the single biggest lever on close rate.*

---

## Immediate Next Steps

1. **Within 24 hrs of Stucco launch:** confirm ad flipped from "Under review" to "Eligible" and all 7 Stucco keywords show Eligible. Spot-check that `/lp/exterior-repairs#stucco` is scrolling to the Stucco section on ad click.
2. **Watch Stucco ad group closely week 1:** it has 1,330 mo search volume vs. Dry Rot's 160, so it will absorb most of Campaign 1's $33/day budget. If impression share < 30% with bid at $8, raise to $10 before raising campaign cap.
3. **End of week 1:** First optimization pass based on Search terms report. Focus on `stucco contractor` queries — that phrase-match has the widest CPC spread ($8.45–$37.27).
4. **After first CallRail calls fire:** verify in Google Ads that First Time Phone Call and Repeat Phone Call conversions are recording with the correct values ($1,500 and $500 respectively). Spot-check in CallRail that the conversion push is tagging the correct action on each call.
5. **60–90 days in:** review the actual repeat-caller breakdown in CallRail recordings. Decide whether to raise/lower the $500 repeat value based on what % are returning prospects vs. existing customers.
6. **Stucco RSA copy stored in status doc** (see Ad Group 2 section) — no longer requires conversation-history lookup for future regeneration.
7. **Google Ads MCP config — known issue (2026-04-21):** the `google-ads-mcp` MCP server returned `list_accessible_customers` as `["5173141186"]` but all queries against it returned `User doesn't have permission to access customer` because the MCP server wasn't passing a `login-customer-id` header for the parent MCC. `.mcp.json` env var `GOOGLE_ADS_LOGIN_CUSTOMER_ID` was set to two conflicting IDs (`7701854464` and `8495875417`) as duplicate keys; one was kept but MCP queries still failed (possibly wrong MCC chosen OR Claude Code process not fully restarted after edit). **Next session:** cmd-Q Claude Code → verify the correct MCC in Google Ads top-right account switcher → set `.mcp.json` to that single MCC ID → relaunch Claude Code → retry `list_accessible_customers` then a campaign-metrics query. Until fixed, fall back to screenshots from the Google Ads UI for telemetry questions.

---

*Website: gadgetconstructionsf.com | Phone: (650) 771-5817 | CA Lic #1132983*
