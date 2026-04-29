# Google Ads — Gadget Construction Inc.

**Live as of:** 2026-04-29
**Client:** Gadget Construction Inc. | CA Lic #1132983
**Service Area:** Marin, San Francisco, San Mateo, Santa Clara, Alameda, Contra Costa counties (6 counties · 31 cities)
**Google Ads Conversion ID:** `AW-16885734093`
**Monthly Budget (current):** $1,820/mo ($60/day split across 3 campaigns)

---

## Current Status (at a glance)

| Area | Status |
|---|---|
| **Conversion tracking — gtag installed on site** | ✅ Live |
| **LP Form Submission conversion action** | ✅ ENABLED (was Inactive — flipped active 2026-04-25 with first traffic to new LPs) |
| **LP Form Submission attached to all campaigns** | ✅ 3 of 3 |
| **CallRail → Google Ads integration** | ✅ First Time Phone Call $1,500 + Repeat Phone Call $500, attached to 3 of 3 campaigns |
| **Account negative keyword list applied** | ✅ Applied to all 3 campaigns |
| **Campaign 1 — Dry Rot Repair** *(renamed from "Urgent Repairs")* | ✅ Enabled |
| **Campaign 2 — Stucco Repair** *(NEW 2026-04-25 — split out of Urgent Repairs)* | ✅ Enabled |
| **Campaign 3 — Planned Projects (Composite Decks)** | ✅ Enabled |
| **Ad Group — Dry Rot** | ✅ Live (4 keywords, 15 HL + 4 desc, 3 pins) — final URL `/lp/dry-rot-repair` |
| **Ad Group — Stucco Repair** *(NEW campaign)* | ✅ Live (7 keywords, 15 HL + 4 desc, 3 pins, DKI on H1) — final URL `/lp/stucco-repair` |
| **Ad Group — Composite Decks** | ✅ Live (12 keywords: 6 Exact + 6 Phrase as of 2026-04-29, Max CPC raised $10 → $20 to meet $10.54–$33.22 market range) |
| **Ad Group — Stucco Repair (OLD, in Dry Rot Repair campaign)** | ⏸ Paused 2026-04-25 (replaced by new Stucco campaign — keep paused 30 days for history, then delete) |
| **Ad Group — Siding** | 🔴 Deferred (LP `/lp/siding-repair` BUILT and ready — activate ad group when budget scales month 2+) |
| **Ad Group — Underpinning** | 🔴 Deferred (month 2+) |
| **Dedicated LPs — Dry Rot, Stucco, Siding** | ✅ All 3 launched 2026-04-25 — see Landing Pages section |
| **Workmanship warranty messaging removed from LPs** | ✅ 2026-04-25 — per client direction; manufacturer warranty (Trex/TimberTech 25-yr) preserved on Composite Decks LP |
| **Pricing CRO tweaks on LPs (cost-of-waiting callout, includes/not-included footnote)** | ✅ 2026-04-25 |
| **Sitelinks (deep-link to LP sections)** | ✅ Dry Rot ad group: 6 sitelinks anchoring to `#pricing`, `#gallery`, `#process`, `#faq`, `#scope`, `#service-area` · Stucco ad group: same pattern with `#why-gadget` substituting for `#gallery` |
| **Callouts — all 3 campaigns** | ✅ 10 service-specific callouts each (no warranty mentions) |
| **Dynamic Keyword Insertion in Stucco RSA** | ✅ `{KeyWord:Stucco Repair}` pinned to Position 1 |
| **Mon–Sat 6am–9pm Pacific schedule** | ✅ Applied to all 3 campaigns 2026-04-25 (account is on Central Time so entries are 08:00–23:00 to translate to 06:00–21:00 PT) |
| **Search Partners disabled** | ✅ All 3 campaigns 2026-04-25 |
| **Google auto-apply recommendations** | ✅ DISABLED account-wide 2026-04-25 — every toggle in "Maintain your ads" off |
| **Google Ads MCP (live telemetry from Claude)** | ✅ Live — Gadget `8495875417` through Esquair MCC `7701854464` |
| **Straggler — `how to fix rotting door frame` (Exact) in Dry Rot** | 🟡 Still pending removal (carried from 2026-04-23 — 0 impressions in last 7 days so low urgency) |
| **Test-submit form on Stucco LP to verify conversion fires** | ✅ Verified 2026-04-29 — gtag conversion event fires (status 302 ping) confirmed via DevTools Network. Dashboard "Tag inactive" flag was a 7+ day staleness signal; will flip to Active once today's hit propagates (3–24 hrs). |
| **Test-submit form on Dry Rot + Siding + Composite Decks LPs** | 🟡 Pending — same verification on remaining 3 LPs |
| **SearchAtlas dynamic optimization script 404** | ⚠️ Discovered 2026-04-29 — `sa.searchatlas.com/a..86c6-d44ba9e99b3c` returns 404. Loaded via base64 wrapper in `app/layout.tsx`. Not blocking ads (`lazyOnload`) but not doing the SEO work it's billed for. Investigate or remove. |
| **Time zone — account currently on Central Time** | 🟡 Pending fix — should be Pacific. Entries currently use +2 hour math. One-way change. |
| **Client recap PDF generated** | ✅ 2026-04-25 — `Gadget-Ads-Recap-Apr25-2026.pdf` (with LP pricing tables for client verification) |

---

## Live Assets Reference

### Landing Pages — Dedicated Per Service (2026-04-25)
- `https://gadgetconstructionsf.com/lp/dry-rot-repair` ✅ — Dry Rot ad group final URL
  - Hero: real Gadget crew on scaffolding, demo of rotted bay window framing
  - 4-image before/after gallery (wide before/after + close-up sister-joist before/after)
  - Anchor IDs: `#scope`, `#gallery`, `#pricing`, `#process`, `#faq`, `#service-area`
- `https://gadgetconstructionsf.com/lp/stucco-repair` ✅ — Stucco ad group final URL
  - Hero: real Gadget crew on scaffolding, three-coat prep with masking and containment
  - Anchor IDs: `#scope`, `#why-gadget`, `#pricing`, `#process`, `#faq`, `#service-area`
- `https://gadgetconstructionsf.com/lp/siding-repair` ✅ — Built and ready, Siding ad group still deferred
  - Hero: real Gadget crew installing DuPont Tyvek HomeWrap during siding tear-off
  - Anchor IDs: same pattern (no gallery yet)
- `https://gadgetconstructionsf.com/lp/composite-decks` ✅ — Composite Decks ad group final URL (existing, no change)
- `https://gadgetconstructionsf.com/lp/exterior-repairs` — DEPRECATED (the old multi-service shared LP). Keep for now since `#siding` anchor still indirectly works; retire in month 2.

All LPs use `noindex, follow` so they don't compete with `/services/exterior-repairs` in organic search. All forms fire `gtag('event', 'conversion', { send_to: 'AW-16885734093/jV9TCOXkkqAcEM213_M-' })`. All workmanship warranty mentions stripped per client direction (manufacturer warranty preserved where relevant on Composite Decks).

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

*Restructured 2026-04-25: split former "Urgent Repairs" into two single-service campaigns. Old Stucco ad group paused inside renamed Dry Rot campaign.*

### Campaign 1: Dry Rot Repair *(renamed from "Urgent Repairs" 2026-04-25)*

| Setting | Value |
|---|---|
| **Status** | Enabled |
| **Daily Budget** | $10/day (~$300/mo) — lowered from $33/day after Stucco split out |
| **Bidding** | Maximize Clicks + Max CPC cap $8.00 — lowered from $12 (Dry Rot avg CPC is $5.84) |
| **Locations** | 6 counties (Marin, SF, San Mateo, Santa Clara, Alameda, Contra Costa) — Presence only |
| **Schedule** | Mon–Sat, 6am–9pm Pacific (entered as 08:00–23:00 in current Central time zone) |
| **Language** | English |
| **Networks** | Search only — Search Partners and Display unchecked |
| **AI Max** | OFF |
| **Conversion Goals** | Submit lead forms ($1,500) + Other (First Time Phone Call $1,500 + Repeat Phone Call $500) |
| **Negative Keyword List** | "Global negatives — all campaigns" applied |
| **Sitelinks** | 6 ad-group-level deep-linking to LP sections (`#pricing`, `#gallery`, `#process`, `#faq`, `#scope`, `#service-area`) |
| **Callouts** | 10 ad-group-level (Free Inspection, Free Moisture Probe, Sister-and-Replace, etc. — no warranty mentions) |
| **Ad Groups** | 1 live (Dry Rot, 4 keywords pointing to `/lp/dry-rot-repair`) + 1 paused (old Stucco — keep 30 days for history then delete) |

### Campaign 2: Stucco Repair *(NEW 2026-04-25)*

| Setting | Value |
|---|---|
| **Status** | Enabled |
| **Daily Budget** | $25/day (~$760/mo) — sized to Stucco's higher search volume |
| **Bidding** | Maximize Clicks + Max CPC cap $10.00 (Stucco avg CPC is $8.62) |
| **Locations** | Same as Campaign 1 (6 counties, Presence only) |
| **Schedule** | Same as Campaign 1 |
| **Language** | English |
| **Networks** | Search only |
| **AI Max** | OFF |
| **Conversion Goals** | Submit lead forms + Other (CallRail phone calls) |
| **Negative Keyword List** | "Global negatives — all campaigns" applied |
| **Sitelinks** | 6 ad-group-level deep-linking to `/lp/stucco-repair` sections (See Pricing, Patch or Re-Stucco?, 5-Step Process, What We Repair, Color & Texture Match, 31 Cities Served) |
| **Callouts** | 10 stucco-specific (Free Moisture Probe, 3-Coat System Only, Color & Texture Matched, etc.) |
| **Special** | DKI on H1: `{KeyWord:Stucco Repair}` pinned Position 1 — headline auto-matches searcher's keyword |
| **Ad Groups** | 1 live (Stucco Repair, 7 keywords pointing to `/lp/stucco-repair`) |

### Campaign 3: Planned Projects — Composite Decks

| Setting | Value |
|---|---|
| **Status** | Enabled |
| **Daily Budget** | $25.00/day (~$760/mo) |
| **Bidding** | Maximize Clicks + Max CPC cap **$20.00** *(raised from $10 on 2026-04-29 — original cap was below market range $10.54–$33.22, causing 87.5% rank-lost IS)* |
| **Locations** | Same as Campaign 1 |
| **Schedule** | Mon–Sat, 6am–9pm Pacific |
| **AI Max** | OFF |
| **Networks** | Search only |
| **Sitelinks** | 6 campaign-level (incl. Composite vs. Wood Decks deep-link) |
| **Callouts** | 10 deck-tailored (no workmanship warranty — 25-yr manufacturer warranty preserved) |
| **Ad Groups** | 1 live (Composite Decks, 12 keywords: 6 Exact + 6 Phrase, all pointing to `/lp/composite-decks`) |

### Total Account Allocation
| Campaign | Daily | Monthly | Service |
|---|---|---|---|
| Dry Rot Repair | $10 | $300 | Lower volume, higher per-job value |
| Stucco Repair | $25 | $760 | Higher volume, mid per-job value |
| Composite Decks | $25 | $760 | Mid volume, highest per-job value |
| **Total** | **$60** | **~$1,820** | (matches committed monthly budget) |

---

## Ad Groups & Keywords

Legend: 🟢 Live · 🟡 Pending / Scheduled · 🔴 Deferred

### 🟢 Ad Group 1: Dry Rot Repair  *(Campaign 1: Dry Rot Repair)*

**Final URL:** `/lp/dry-rot-repair` *(updated 2026-04-25 from `/lp/exterior-repairs#dry-rot`)*

| Keyword | Match Type | Monthly Vol | CPC Range |
|---------|-----------|-------------|-----------|
| dry rot repair | Phrase | 110 | $5.61–$45.45 |
| dry rot repair near me | Exact | 20 | $6.37–$45.59 |
| dry rot contractor | Phrase | 10 | $7.39–$22.44 |
| dry rot repair contractor | Phrase | 20 | — |
| **Group total** | | **160** | |

---

### 🟢 Ad Group 2: Stucco Repair  *(Campaign 2: Stucco Repair — moved to own campaign 2026-04-25)*

**Final URL:** `/lp/stucco-repair` *(updated 2026-04-25 from `/lp/exterior-repairs#stucco`)*

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

### 🟢 Ad Group 3: Composite Decks  *(Campaign 3)*

**Final URL:** `/lp/composite-decks`

| Keyword | Match Type | Monthly Vol | CPC Range |
|---------|-----------|-------------|-----------|
| deck builder near me | Exact | 320 | $10.54–$33.22 |
| deck contractors near me | Exact | 320 | $10.54–$33.22 |
| deck building companies near me | Exact | 320 | $10.54–$33.22 |
| deck installation companies near me | Exact | 10 | $5.91–$20.66 |
| composite decking installers near me | Exact | 10 | $5.23–$15.00 |
| deck builders | Exact | — | — |
| deck builder near me | **Phrase** *(added 2026-04-29)* | — | — |
| deck contractors near me | **Phrase** *(added 2026-04-29)* | — | — |
| deck building companies near me | **Phrase** *(added 2026-04-29)* | — | — |
| composite decking installers near me | **Phrase** *(added 2026-04-29)* | — | — |
| composite deck contractor | **Phrase** *(added 2026-04-29)* | — | — |
| trex deck installer | **Phrase** *(added 2026-04-29)* | — | — |
| **Group total** | | **980+** | |

**Why Phrase added 2026-04-29:** Pre-fix the ad group was Exact-only and matched just 3 unique queries in 4 days (`deck renovations near me`, `decking contractors near me`, `decking companies near me`). Phrase variants 3–5x the eligible auction pool. The two broader Phrase keywords (`composite deck contractor`, `trex deck installer`) align with the brand-cert positioning (Trex Pro / TimberTech Pro) and target material-specific shopper intent.

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
| Urgent Repairs | Dry Rot | (shares $33.96/day) | ~$260 | 🟢 Live |
| Urgent Repairs | Stucco | (shares $33.96/day) | ~$780 | 🟢 Live |
| Planned Projects | Composite Decks | $25.00/day | ~$760 | 🟢 Live |
| **Total** | | **$58.96** | **~$1,800** | |

*Google splits campaign budget across ad groups based on performance. With Stucco added, Urgent Repairs internally distributes $33.96/day between Dry Rot (low volume) and Stucco (high volume), favoring Stucco.*

### Scaling Path

- **If Month 1 ROAS > 300%:** scale to $2,800/mo, add Siding + Underpinning
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
kit
mix
mortar
filler
sealant
supplier
suppliers
consultant
patch
portland
crp plastering
valdez plastering
before painting
```

*Negatives added 2026-04-29 (last 13 entries):* derived from Stucco Repair search-terms report 2026-04-25 → 2026-04-28. DIY product queries (`stucco repair kit`, `stucco gap filler`, `sealant for stucco cracks`, etc.), B2B materials queries (`stucco suppliers near me`), competitor brand searches (`crp plastering`, `valdez plastering`), and out-of-area (`stucco repair portland`).

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

Based on current $1,800/mo budget, $10–15 avg CPC, 4–5% form CVR, 20–25% close rate.

| Metric | Low | Mid | High |
|--------|-----|-----|------|
| Monthly spend | $1,800 | $1,800 | $1,800 |
| Clicks | 120 | 150 | 180 |
| Avg CPC | $15 | $12 | $10 |
| Form submissions (5% CVR) | 6 | 8 | 9 |
| Phone calls (CallRail qualified) | 4 | 6 | 8 |
| Total leads | 10 | 14 | 17 |
| Closed jobs (22% close rate) | 2 | 3 | 4 |
| Avg job value (blended) | $6,000 | $8,000 | $12,000 |
| **Revenue estimate** | **$14K** | **$24K** | **$54K** |
| **ROAS** | 8x | 13x | 30x |

*These are estimates. Response time to leads (minutes vs hours) is the single biggest lever on close rate.*

---

## 2026-04-23 — Keyword Cleanup Session

**Context — what went wrong:** First ~48 hours of data revealed Dry Rot ad group had ballooned from the planned 4 keywords to 28 enabled keywords, most on BROAD match. Composite Decks also had a broken keyword (`[composite decking installers near me` — missing close bracket) acting as broad match. The broad-match bloat was pulling junk queries like "trex deck colors", "stucco patch spray", "how to fix dry rot", and competitor brand names (e.g., "cf contracting", "jeff myers construction") — burning ~25% of spend in 3 days (~$35–45 of $158.74).

**Root cause:** likely Google's "Apply optimizations" or "Keyword recommendations" widget getting auto-accepted. Broad match expanded from there.

**What was done (all via Raul in the UI, verified by Claude via MCP):**

1. **Dry Rot ad group:** nuclear reset. Deleted all 28 keywords, re-added the 4 from the plan:
   - `"dry rot repair"` (Phrase)
   - `[dry rot repair near me]` (Exact)
   - `"dry rot contractor"` (Phrase)
   - `"dry rot repair contractor"` (Phrase)

2. **Composite Decks ad group:** removed the broken Broad-match entry and added/restored 3 Exact-match keywords from the plan:
   - `[composite decking installers near me]` (re-added with correct brackets as Exact)
   - `[deck builder near me]` (backfilled — was missing)
   - `[deck building companies near me]` (backfilled — was missing)
   - (`[deck contractors near me]`, `[deck installation companies near me]` were already present and correct)

3. **Stucco Repair ad group:** added `[stucco contractors near me]` (Exact) which had been missing. Now matches plan 7/7.

**Leftover to clean up:**
- `how to fix rotting door frame` (EXACT) still enabled in Dry Rot. DIY query, should be removed — not re-added as a negative, just deleted from keyword list.

**Critical account-level follow-up before next session:**
- **Disable Google's auto-apply recommendations.** Tools & Settings → Recommendations → Auto-apply → turn off every toggle related to keyword additions, match-type changes, and "expand with broad match." Without this, the bloat will return within days.

**Expected effect of cleanup (watch next MCP pull in ~48 hrs):**
- CTR should rise on all 3 ad groups (junk traffic eliminated)
- Composite Decks impressions should recover from near-zero (broken keyword was dragging ad-group Quality Score down)
- Cost per click may drop (higher Quality Score = better Ad Rank at same bid)
- Lead quality on remaining clicks should improve

---

## 2026-04-25 — Strategic Restructure & New Landing Pages

**Context — what changed and why:** The Apr 23 plan called for raising the Urgent Repairs Max CPC $12 → $16 to address a 75.6% rank-lost impression share. Instead, we did something more structural: built 3 dedicated single-service landing pages, split Stucco out of Urgent Repairs into its own campaign, and rebalanced budgets so each service has a budget sized to its search volume. Higher Quality Score from dedicated LPs is expected to do more for CPC than raising the bid cap would have.

**What was done (all completed and verified live):**

1. **Three dedicated LPs launched** — `/lp/dry-rot-repair`, `/lp/stucco-repair`, `/lp/siding-repair`. Each has hyper-local copy, real Gadget project hero photos, scope of work, pricing, FAQs, and (dry rot only) a 4-image before/after gallery. All `noindex, follow`.
2. **LP pricing CRO tweaks per page** — heading rewritten away from "Honest Pricing" to direct framing, cost-of-waiting alert callout, includes/not-included transparency footnote.
3. **Workmanship warranty messaging removed** from all LPs per client direction. `LpTrustStrip` and `LpFooter` made configurable via `hideWarranty` prop. Manufacturer warranty (25-yr Trex/TimberTech) preserved on Composite Decks LP since it's a product, not service, warranty.
4. **Campaign restructure** — "Urgent Repairs - Dry Rot + Stucco" renamed to "Dry Rot Repair", Stucco ad group inside it paused. New "Stucco Repair" campaign created from scratch with Stucco ad group recreated (7 keywords, RSA, sitelinks, callouts).
5. **Budget rebalanced** — Dry Rot Repair $10/day, Stucco Repair $25/day, Composite Decks $25/day. Total $60/day = ~$1,820/mo. Stucco no longer starves Dry Rot.
6. **CPC caps tailored per service** — Dry Rot $8 (avg CPC $5.84), Stucco $10 (avg CPC $8.62). Composite Decks unchanged at $10.
7. **Sitelinks deep-link to LP sections** — anchor IDs added to all 3 LPs (`#scope`, `#pricing`, `#process`, `#faq`, `#service-area`, `#gallery` on dry rot, `#why-gadget` on stucco). Sitelinks point to specific sections so visitors jump straight to what they care about.
8. **DKI on Stucco RSA** — `{KeyWord:Stucco Repair}` pinned Position 1. Headline auto-matches searcher's keyword. Same Title-Case capitalization recommended for Dry Rot RSA next session.
9. **Mon–Sat 6am–9pm Pacific schedule** applied to all 3 campaigns. Account is on Central time so entries are 08:00–23:00 to translate to PT.
10. **Search Partners disabled** on all 3 campaigns (was enabled by default on the renamed Dry Rot Repair).
11. **Auto-apply recommendations DISABLED account-wide.** Every "Maintain your ads" toggle off. The setting that bloated Dry Rot from 4 → 28 keywords is now off.
12. **LP Form Submission conversion ACTIVATED.** Was Inactive (verifying) in the Apr 23 report. Now Enabled with $1,500 value.
13. **All 3 conversion goals attached to all 3 campaigns** — LP Form Submission ($1,500), First Time Phone Call ($1,500 via CallRail), Repeat Phone Call ($500 via CallRail).
14. **Shared negatives list applied to new Stucco campaign** — "Global negatives — all campaigns" now covers all 3 campaigns.

**Pre-restructure performance baseline (last 7 days, pulled via MCP at session end):**
- Total: 537 impressions, 30 clicks, $187.53 spend, 0 conversions, 5.59% CTR, $6.25 avg CPC
- Urgent Repairs (now split): 471 impr, 25 clicks, $165.41, IS 22.9%, rank-lost IS 67.2%
  - Dry Rot ad group: 307 impr, 18 clicks, $105.10, CTR 5.86%, $5.84 CPC
  - Stucco ad group: 164 impr, 7 clicks, $60.31, CTR 4.27%, $8.62 CPC
- Planned Projects: 66 impr, 5 clicks, $22.12, CTR 7.58%, $4.42 CPC, IS 31.1%

**Quality Score baseline (to watch against post-restructure):**
- `dry rot repair` Phrase: QS 5
- `stucco repair` Phrase: QS 3 ← biggest lift opportunity (target 5+ within 14 days)

**Client deliverable:** `Gadget-Ads-Recap-Apr25-2026.pdf` generated and shared. Includes performance snapshot, what was done, what's next, and the LP pricing tables for client verification.

---

## 2026-04-29 — 4-Day Post-Restructure Read + Composite Decks Fix + Conversion Verification

**Context — what this session did:** First check-in 4 days post-restructure (target was 5-day on 2026-05-02, ran early). Pulled MCP data, verified conversion tracking, diagnosed why Composite Decks had collapsed to 3 impressions in 4 days, applied the fix, audited Stucco LP quality, added 13 negatives from the search-terms report.

### 4-day MCP performance pull (2026-04-25 → 2026-04-28)

| Campaign | Impr | Clicks | Spend | CTR | Avg CPC | Search IS | Rank Lost | Budget Lost | Conv |
|---|---|---|---|---|---|---|---|---|---|
| Dry Rot Repair | 130 | 7 | $60.13 | 5.38% | $8.59 | 42.6% | 38.6% | 18.8%* | 0 |
| Stucco Repair *(new)* | 115 | 9 | $82.52 | **7.83%** | $9.17 | 40.9% | 50.4% | 8.7% | 0 |
| Composite Decks | 3 | 1 | $0.89 | 33.3% | $0.89 | 12.5% | 87.5% | 0% | 0 |
| **Total** | **248** | **17** | **$143.54** | 6.85% | $8.44 | — | — | — | **0** |

*\*The 18.8% Dry Rot budget-lost IS is a statistical artifact: $48.32 of the $60.13 campaign spend was the OLD Stucco Repair ad group's pre-pause spend on 4/25 before it was paused mid-day. The Dry Rot ad group itself only spent $11.81 across 4 days (~$4/day) — the campaign budget is materially underutilized going forward.*

### Stucco — clear winner of the restructure

vs pre-restructure baseline (Stucco ad group inside old Urgent Repairs campaign):

| Metric | Pre-restructure (daily) | Post-restructure (daily) | Change |
|---|---|---|---|
| Impressions | 23.4 | 38.3 | **+64%** |
| Clicks | 1.0 | 3.0 | **+200%** |
| CTR | 4.27% | 7.83% | **+83%** |
| Search IS | 22.9% | 40.9% | **+78%** |

- Ad strength: **EXCELLENT**, approval APPROVED
- 0 conversions on 9 clicks is expected at this sample size (5% form CVR → ~20 clicks for first conversion)

### Stucco Quality Score read (worth understanding)

Two keywords have data:

| Keyword | QS | Creative | Landing Page | Predicted CTR |
|---|---|---|---|---|
| stucco repair (Phrase) | 3 | ABOVE_AVERAGE ✅ | BELOW_AVERAGE ⚠️ | BELOW_AVERAGE ⚠️ |
| stucco contractor (Phrase) | 3 | ABOVE_AVERAGE ✅ | BELOW_AVERAGE ⚠️ | BELOW_AVERAGE ⚠️ |

- "Predicted CTR: BELOW_AVERAGE" is **stale data** — based on pre-restructure 4% CTR; actual is 7–12% now. Will lift in 7–14 days as data accumulates.
- "Landing page: BELOW_AVERAGE" is also likely stale. **Lighthouse audit on `/lp/stucco-repair` confirms LP is healthy:** Performance 98 / Accessibility 96 / Best Practices 96 / SEO 69 (the 69 is a `noindex` artifact — Lighthouse penalizes noindex pages but Google Ads QS uses its own evaluation, and noindex is the *correct* config for ad LPs). Speed and UX are NOT the QS bottleneck. Google just hasn't re-evaluated the new dedicated LP yet — typically takes 7–14 days.

### Composite Decks — diagnosis and fix applied

**Problem:** 3 impressions in 4 days, 87.5% rank-lost IS, $0.22/day actual spend vs $25/day budget (1% utilization).

**Root causes (two compounding):**
1. **Max CPC cap $10.00 was below market.** Doc-recorded market range for these keywords is $10.54–$33.22. We were literally below the floor — Google could never bid us in at competitive prices, only the leftover cheap auctions.
2. **All 6 keywords were Exact match.** Only 3 unique queries matched in 4 days (`deck renovations near me`, `decking contractors near me`, `decking companies near me`). Phrase variants 3–5x the eligible auction pool.

**Fix applied (verified via MCP after edit):**
- Max CPC ceiling: $10 → **$20** (mid-market)
- Added 6 Phrase-match keywords (already-Exact terms now also as Phrase, plus 2 broader: `composite deck contractor`, `trex deck installer`)
- Total ad-group keywords: 6 → **12** (6 Exact + 6 Phrase). New Phrase keywords show `UNDER_REVIEW` for approval (1–24 hrs to APPROVED) but already `ELIGIBLE` to serve.

**Expected effect (watch 2026-04-30 → 2026-05-02):** impressions 0.75/day → 5–10/day; first real Quality Score data within 7 days.

### Conversion tracking — verified working

The conversion action showed "Tag inactive — Last activity Apr 21" (8 days), which raised concern. Investigation:

- gtag.js loads correctly from `app/layout.tsx:74-80` (Conversion ID `AW-16885734093`)
- LP form fires `gtag('event', 'conversion', { send_to: 'AW-16885734093/jV9TCOXkkqAcEM213_M-' })` from `LpQuickForm.tsx:84-91`
- **Test submit on `/lp/stucco-repair` 2026-04-29 confirmed via DevTools Network panel:** conversion ping fired with status 302 (the success signal for googleads conversion endpoint), gtag.js loaded with HTTP 200
- The "Tag inactive" flag is a 7+ day staleness alert — Google auto-flags any conversion action with no fires in a week. Today's test will flip it back to Active within 3–24 hrs and the "All conv." column will tick from 0.00 → 1.00

**Conclusion:** Conversion plumbing is healthy. The zero conversions on 4 days / $143 spend is normal at this click volume (only 17 clicks total).

### Other findings

- **Old Stucco ad group cleanly shut off:** day-by-day breakdown confirms $48.32 spend was 4/25 pre-pause; 4/26–4/28 zero impressions. No leak. Safe to delete on/after 2026-05-25.
- **SearchAtlas dynamic optimization script 404'ing:** `sa.searchatlas.com/a..86c6-d44ba9e99b3c` returns 404. Loaded via base64 wrapper in `app/layout.tsx:62-67`. Not blocking ads (`lazyOnload`) but not doing the SEO work it's billed for. Logged for follow-up.

### What was changed in Google Ads this session

| Change | Where | Verified via MCP |
|---|---|---|
| Composite Decks Max CPC $10 → $20 | Campaign 3 settings | ✅ `cpc_bid_ceiling_micros: 20000000` |
| 6 new Phrase keywords added to Composite Decks ad group | Ad group keywords | ✅ 12 total enabled (6 Exact + 6 Phrase) |
| 13 negatives added to "Global negatives — all campaigns" shared list | Shared library | (confirmed by user — not yet re-pulled via MCP) |

### Critical takeaways

- Conversion tracking healthy — don't trust dashboard "Last activity" date alone, the real signal is the conversion ping firing (DevTools Network)
- Old Stucco ad group is fine to leave paused — no leak
- Composite Decks: market-rate bid + Phrase variants is the unlock
- Stucco is the clear restructure winner; QS lift will follow within 7–14 days
- Dry Rot has budget headroom — flag for week 2 review

---

## Immediate Next Steps

1. **Monitor Composite Decks impression volume next 48–72 hrs** (post-fix on 2026-04-29). Pre-fix: 3 impressions in 4 days. Target post-fix: 5–10 impressions/day. If still below 3/day on 2026-05-02, the bid raise wasn't the only issue and we need to dig deeper into Quality Score components.
2. **Test-submit the form on the remaining 3 LPs** (`/lp/dry-rot-repair`, `/lp/siding-repair`, `/lp/composite-decks`). Stucco LP verified 2026-04-29. Dashboard "All conv." count should tick up within 24 hrs of each test.
3. **Re-check Stucco Quality Score on 2026-05-09** (10 days post-restructure). Target: QS 3 → 5+, "Predicted CTR" component flips BELOW → AVERAGE, "Landing page experience" flips BELOW → AVERAGE. If LP component is still BELOW after 10 days, message-match audit (does ad copy mirror LP H1?) and scroll-depth check.
4. **Investigate SearchAtlas script 404** — currently 404'ing on `sa.searchatlas.com`. Either re-verify the UUID with whoever set up SearchAtlas, or remove the script entirely if no longer paid. File: `app/layout.tsx` lines 62–67.
5. **Remove `how to fix rotting door frame` (Exact) from Dry Rot ad group.** Carried from Apr 23. Low urgency (0 impressions in last 7 days) but should still be cleaned up.
6. **Pull search terms report on 2026-05-02** (week 2 post-restructure). Add new junk queries to "Global negatives — all campaigns" shared list.
7. **5-day MCP check-in (2026-05-02 / 2026-05-03):** verify QS movement, CPC, first conversions, IS improvement. Compare against the 4-day data captured 2026-04-29.
8. **Fix account time zone Central → Pacific** (one-way change). One-time 2-min fix, eliminates the +2 hour math on every schedule edit going forward. Tools → Preferences → Time zone.
9. **Apply DKI to Dry Rot RSA Position 1** — `{KeyWord:Dry Rot Repair}` for symmetry with Stucco. Currently Dry Rot RSA still uses static headlines.
10. **Delete the old Stucco ad group** (currently paused inside Dry Rot Repair campaign) on or after 2026-05-25 (30 days post-pause) if new Stucco campaign is performing.
11. **Consider raising Dry Rot Max CPC $8 → $10–$12** if the 38.6% rank-lost IS persists after the 2026-05-02 check-in. Dry Rot campaign is severely underspending its $10/day budget post-restructure (~$4/day actual), so headroom exists.
12. **Consider activating Siding ad group** in month 2 if Stucco/Dry Rot ROAS justifies budget expansion. LP `/lp/siding-repair` is already built and ready.

---

## Reference (preserved from prior plan)

- **Google Ads MCP — ACTIVATED 2026-04-21:** `.mcp.json` with `GOOGLE_ADS_LOGIN_CUSTOMER_ID=7701854464` (Esquair MCC) reaches Gadget `8495875417`. Campaign IDs: Dry Rot Repair `23773779275` (renamed from Urgent Repairs), Planned Projects `23773939394`. New Stucco Repair campaign ID assigned 2026-04-25 — pull via MCP next session.
- **CallRail repeat-caller value review (60–90 days in):** decide whether $500 repeat value should be raised/lowered based on actual breakdown.
- **Stucco RSA copy stored in status doc** (see Ad Group 2 section).

---

*Website: gadgetconstructionsf.com | Phone: (650) 771-5817 | CA Lic #1132983*
