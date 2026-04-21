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
| **CallRail → Google Ads integration** | ✅ Activated, separate first-time / repeat caller conversions |
| **Account negative keyword list applied** | ✅ Applied to both campaigns |
| **Campaign 1 — Urgent Repairs** | ✅ Enabled |
| **Campaign 2 — Planned Projects (Composite Decks)** | ✅ Enabled |
| **Ad Group — Dry Rot Repair** | ✅ Live (4 keywords, 15 HL + 4 desc, 3 pins) |
| **Ad Group — Stucco Repair** | 🟡 Pending (user adding today) |
| **Ad Group — Composite Decks** | ✅ Live (5 keywords, 15 HL + 4 desc, 3 pins) |
| **Ad Group — Siding** | 🔴 Deferred (month 2+ when budget scales) |
| **Ad Group — Underpinning** | 🔴 Deferred (month 2+) |
| **Sitelinks + Callouts — Campaign 1 (Urgent Repairs)** | ✅ 6 sitelinks + 10 callouts |
| **Sitelinks + Callouts — Campaign 2 (Planned Projects)** | ⚠️ Not verified — may need to copy from Campaign 1 |

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
| **Ad Groups** | 1 live (Dry Rot), 1 pending (Stucco) |

### Campaign 2: Planned Projects — Composite Decks

| Setting | Value |
|---|---|
| **Status** | Enabled |
| **Daily Budget** | $16.50/day (~$500/mo) |
| **Bidding** | Clicks + Max CPC cap $10.00 |
| **Locations** | Same as Campaign 1 |
| **Schedule** | Same as Campaign 1 |
| **AI Max** | OFF |
| **Sitelinks / Callouts** | ⚠️ Verify — may need to be added at campaign level |
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

### 🟡 Ad Group 2: Stucco Repair  *(Campaign 1 — to be added 2026-04-21)*

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
| Urgent Repairs | Stucco | (shares $33/day) | ~$750 | 🟡 Adding today |
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
- **Conversion actions pushed:**
  - `Phone call from CallRail (first-time caller)`
  - `Phone call from CallRail (repeat caller)`
- **Conversion values:** ⚠️ TODO — set to $1,500 each in Google Ads to match form value

### Conversion Action Inventory

| Action | Source | Status | Value |
|---|---|---|---|
| LP Form Submission | Website (gtag) | Inactive (verifying) | $1,500 |
| Calls from Smart Campaign Ads | Google (call extension) | Active | $0 — needs update |
| CallRail — first-time caller | CallRail push | Pending first call | $0 — needs update |
| CallRail — repeat caller | CallRail push | Pending first call | $0 — needs update |

---

## Ad Extensions (Assets)

### Campaign 1 — Urgent Repairs ✅
- **Call extension:** (650) 771-5817
- **Sitelinks (6):** Bay Area Project Gallery, 31 Cities We Serve, 12+ Years of Trust, Pricing & FAQs, Call or Request Quote, Siding & Stucco Options
- **Callouts (10):** 5-Yr Workmanship Warranty · 500+ Bay Area Projects · Licensed & Fully Insured · Free On-Site Inspection · Fixed-Price Quotes · Respond in Minutes · 12+ Years in the Bay Area · Full Permit Handling · CA License #1132983 · Family Owned & Operated

### Campaign 2 — Planned Projects ⚠️
**TODO:** Verify the same sitelinks + callouts are attached. If not, either:
- Copy sitelinks/callouts into Campaign 2 inline, OR
- Move existing assets to **account level** via Ads & Assets → Assets so both campaigns share one master set.

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

1. **Today (2026-04-21):** Add Stucco ad group to Urgent Repairs using the content in the Stucco section above. 15 headlines + 4 descriptions already drafted — see conversation history for the exact copy.
2. **This week:** Verify Campaign 2 has sitelinks + callouts attached. Update CallRail conversion values to $1,500.
3. **End of week 1:** First optimization pass based on Search terms report.

---

*Website: gadgetconstructionsf.com | Phone: (650) 771-5817 | CA Lic #1132983*
