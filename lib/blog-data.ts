import type { BlogPost } from "./types";

/**
 * A post is "published" when its `date` field is today or earlier.
 * Future-dated posts stay in the array but are filtered out of routing,
 * listings, sitemaps, and schemas until a build runs on/after that date.
 * Combined with a scheduled Netlify rebuild, this lets you pre-write posts
 * and have them auto-appear on their target date.
 */
export function isPublished(post: BlogPost, now: Date = new Date()): boolean {
  return new Date(post.date).getTime() <= now.getTime();
}

export function getPublishedPosts(now: Date = new Date()): BlogPost[] {
  return BLOG_POSTS.filter((post) => isPublished(post, now));
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "composite-deck-cost-san-francisco",
    title: "Composite Deck Cost in San Francisco: Real 2026 Numbers from 500+ Bay Area Projects",
    excerpt:
      "Composite decks in San Francisco typically run $15,000 to $60,000+. Here's what actually drives the range — with pricing from 500+ Bay Area projects, not national averages.",
    date: "2026-04-27",
    readingTime: "10 min read",
    relatedService: "composite-decks",
    content: `
## The Short Answer

Composite decks in San Francisco typically run $15,000–$60,000+ depending on size, site conditions, and materials. Most mid-sized decks (around 300 sq ft) fall between $15,000 and $35,000 fully installed. SF prices run 25–40% above national averages — because of permit requirements, steep-lot access costs, and labor rates that reflect what licensed tradespeople actually earn in this market. Here's what actually drives the range, with pricing from 500+ Bay Area projects, not national averages.

## Price Ranges by Project Type

The tier you land in depends mostly on size, elevation, and how much structural work the site demands. Here's how the numbers break down.

### Standard 300 sq ft Deck ($15,000–$35,000)

This is the most common project we build. A 300 sq ft ground-level or low-elevation deck on a flat or gently sloped lot — typical in Noe Valley, the Sunset, and the flatter blocks of the Richmond — runs $15,000–$35,000 installed. That price includes demolition of the existing deck or surface, new pressure-treated framing, composite decking boards, a code-compliant railing system, and all fasteners and flashing.

Material choice moves you around within this range. Trex Enhance (entry-level Trex line) installed runs roughly $14–$17 per sq ft for materials alone. TimberTech AZEK — a better choice for the fog belt — runs $18–$22 per sq ft. Budget 6–8 weeks from contract to completion on a project this size, assuming permits are pulled and approved.

### Multi-Level Hillside Deck ($35,000–$60,000+)

Bernal Heights, Twin Peaks, and the upper blocks of Noe Valley are where this tier lives. A multi-level deck on a sloped lot adds significant cost — not because composite decking is more expensive, but because the structural work underneath it is. You're looking at taller posts, more complex framing, cross-bracing, deeper footings, and often engineered plans stamped by a licensed structural engineer.

A 500–700 sq ft two-level deck on a steep Bernal Heights lot typically runs $40,000–$60,000. The structural package alone — footings, posts, beams, and engineering — can represent 35–45% of total project cost before a single decking board goes down.

### Deck with Pergola and Lighting ($25,000–$50,000)

Adding a pergola to a standard deck moves the budget to $25,000–$50,000 depending on scale and materials. A cedar or Douglas fir pergola over a 300 sq ft Trex deck runs $8,000–$15,000 more than the deck alone. Aluminum pergola systems (powder-coated, low-maintenance) run $12,000–$20,000 installed. Integrated LED lighting — recessed into the decking surface, post-cap lights, or string-light posts — adds $2,000–$5,000 depending on the circuit layout and how much electrical work is needed at the panel. Timeline: 8–10 weeks from contract.

### Railing-Only Replacement ($3,000–$8,000)

If your deck structure is solid but the railing is failing — rusted posts, cracked balusters, a top rail that wobbles — a railing-only swap is often the right call. Don't let a contractor sell you a full deck replacement when only the railing needs to go. We've replaced railings on 15-year-old Doelger decks in the Sunset where the framing was still perfectly sound. Cable railing systems run $4,000–$8,000 for a standard 40–60 linear foot run. Aluminum balusters with a composite top rail run $3,000–$6,000.

## What Drives Composite Deck Costs in San Francisco

### Material Selection (Trex, TimberTech, Fiberon)

Composite decking isn't a commodity — the products vary significantly in how they hold up to fog, salt air, and UV exposure. That matters in SF more than almost anywhere else.

| Material | Installed Cost (materials only) | Fade Warranty | Best For |
|---|---|---|---|
| Trex Enhance | $14–$17/sq ft | 25 years | Budget-conscious, inland SF |
| Trex Transcend | $16–$20/sq ft | 25 years | Mid-range, most SF homes |
| TimberTech AZEK | $18–$22/sq ft | 50 years | Coastal / fog belt |
| Fiberon Paramount | $16–$20/sq ft | 50 years | Value premium |
| Fiberon Good Life | $13–$16/sq ft | 25 years | Entry-level |

For homes in the Outer Sunset, Outer Richmond, Pacifica (Rockaway, Linda Mar), and Sausalito waterfront, TimberTech AZEK or Fiberon Paramount are the right call. Both carry 50-year fade and stain warranties and use a full PVC cap that resists the moisture cycling that breaks down cheaper composites. Trex Enhance installed in a fog-zone deck can show surface degradation in 7–10 years. AZEK won't.

### Site Access and Demolition

This is the cost variable most homeowners don't see coming. If your home has no side-yard access, a staircase-only rear approach, or sits on a block where a delivery truck can't park, material handling costs increase — sometimes by $2,000–$5,000. Demo on a hillside lot where debris has to be hand-carried out adds labor. Demo of a concrete or pavers patio adds disposal fees ($500–$1,500 depending on volume).

Twin Peaks and upper Bernal Heights are the hardest sites we work in SF. Narrow streets, steep driveways, and no staging area mean every board goes up by hand. Factor that in when comparing bids.

### Structural Requirements (Hillside, Multi-Level, Elevated)

Any deck elevated more than 30 inches above grade in San Francisco triggers a permit with the SF Department of Building Inspection (DBI) — and structural engineering. Even a deck that stays under 30 inches may need engineering if it's cantilevered, multi-level, or attached to a hillside home with complex load paths.

Structural engineering fees run $2,000–$5,000 for a residential deck project. Foundation upgrades — replacing undersized existing footings or pouring new concrete piers — add $1,500–$4,000. Post-and-beam upgrades for a hillside deck can add $5,000–$15,000 depending on height and span.

### SF DBI Permits (Decks Over 30 Inches)

Decks over 30 inches above grade require a building permit from SF DBI. The permit process includes plan submittal, plan check review, and field inspections at framing and final. Budget $1,500–$4,000 for permit fees on a typical residential deck, plus your contractor's time to prepare and manage the submittal.

Decks under 30 inches above grade generally don't require a permit — but the work still needs to meet code. We pull permits on every project that requires one. Skipping a permit on an elevated deck isn't just a code violation — it's a liability issue when you sell.

### Add-Ons: Pergolas, Lighting, Railings

Each add-on has a real cost impact:

- **Pergola (wood):** $8,000–$15,000 installed
- **Pergola (aluminum louvered system):** $15,000–$25,000 installed
- **LED recessed deck lighting:** $150–$250 per fixture installed, plus electrical panel work ($500–$1,500)
- **Cable railing system:** $90–$130 per linear foot installed
- **Glass panel railing:** $150–$220 per linear foot installed
- **Composite/aluminum railing:** $60–$100 per linear foot installed
- **Gas line for fire feature:** $1,500–$4,000 depending on distance to existing line

Don't price these separately and assume you can mix and match contractors. The lighting circuit, framing, and structural attachments need to be coordinated from the start.

## Hidden Costs Most Contractors Don't Tell You About

A low bid often means someone isn't including something. Here's what sandbags deck budgets in SF:

**1. Dry rot at the ledger board.** The ledger board is where your deck attaches to the house. It's also where water infiltrates, especially on older homes with inadequate kickout flashing (the metal diverter that keeps water from running behind the siding at the deck connection). We find significant [dry rot at deck ledger boards](/services/exterior-repairs) on roughly 30% of the deck replacements we do in the Sunset and Richmond. Repairing it adds $1,500–$6,000 depending on how deep it's spread into the rim joist and framing. You won't know until the old deck comes off.

**2. Undersized existing footings.** Pre-1990 decks were often built on footings that don't meet current code — undersized diameter, insufficient depth for frost or seismic, or poured without rebar. SF DBI now requires footings that meet current code when an existing deck is replaced with a permitted one. New footings: $300–$600 each, typically 4–8 per deck.

**3. Inadequate drainage.** Flat lots in the Sunset and Mission often have drainage that runs toward the house rather than away from it. If your deck is covering an area with poor drainage, you'll want to address the grading before the deck goes in — otherwise you're trapping moisture under the structure. Budget $1,000–$3,000 for drainage corrections.

**4. Electrical for lighting.** Many homeowners price out a deck with lighting, then discover their panel is already at capacity or the circuit run requires opening interior walls. Running a new 20-amp circuit for deck lighting from the panel can run $800–$2,500 depending on distance and obstacles.

**5. HOA review fees.** Many SF condos and TIC (tenants in common) buildings require HOA or co-owner approval before exterior construction. HOA review processes can take 30–60 days and sometimes require architectural drawings. Budget 4–6 weeks for this process if it applies to your property.

**6. Gas line for fire pit or fire table.** Adding a gas fire feature is increasingly popular on SF decks — evenings here are cold even in July. Running a gas line from your existing service to a deck fire feature adds $1,500–$4,000. If your meter is undersized, add more.

**7. Old fasteners and hardware.** On a full deck replacement, corroded joist hangers, split blocking, and stripped ledger bolts all need to go. This isn't optional — it's a code requirement during a permitted rebuild. Budget $500–$1,500 for hardware replacement on an older structure.

## Real Project Examples from 500+ Bay Area Projects

Numbers are more useful when they're attached to a real project. Here are three from our work.

**Project 1: 320 sq ft Trex Transcend deck, Noe Valley, flat lot**
A homeowner on a flat lot in Noe Valley needed to replace a rotted redwood deck off the main living level. Site access was clean — driveway to the rear yard. Demo took half a day. We found moderate dry rot at the ledger board (added $2,200 to scope). New pressure-treated framing, Trex Transcend Spiced Rum boards, aluminum railing with cable infill, and permit through SF DBI. Total: $22,000. Timeline: 5 weeks from contract to final inspection.

**Project 2: 600 sq ft TimberTech AZEK multi-level deck, Bernal Heights hillside**
An upper Bernal Heights home needed a full rebuild — two levels, 9-foot elevation on the lower level, zero side-yard access. Engineering was required. We poured 6 new concrete piers, framed a post-and-beam substructure with cross-bracing, and installed TimberTech AZEK Vintage Weathered Teak throughout. The no-access situation added roughly $3,500 in manual handling time. Structural engineering: $3,200. Total: $48,000. Timeline: 9 weeks.

**Project 3: 450 sq ft Fiberon Paramount deck with pergola and LED lighting, Twin Peaks**
A Twin Peaks homeowner wanted a usable outdoor space that worked in the wind and fog — which rules out anything fragile. We built a Fiberon Paramount deck in Hazel finish with a cedar pergola, 8 recessed LED deck lights on a dedicated 20-amp circuit, and glass panel railing for wind protection. The permit process through SF DBI took 6 weeks for plan check. Total: $39,000. Timeline: 11 weeks including permitting.

You can see more of [our composite deck projects](/gallery) to get a sense of materials and finished quality.

## How to Budget for Your SF Deck

**Get 2–3 estimates from licensed Class B contractors** — not handymen, not unlicensed crews. Composite [composite deck construction](/services/composite-decks) is structural work. It requires permits, inspections, and someone who carries liability insurance.

**Compare apples to apples.** Ask every bidder to specify: the exact decking product and line (not just "Trex"), whether demo is included, whether permits are included, whether electrical and drainage are in scope. A $28,000 bid that excludes permits and electrical might be more expensive than a $32,000 all-in bid.

**Understand the per-square-foot math — but don't let it fool you.** At $50–$80 per installed sq ft (the realistic Bay Area range for mid-grade composite), a 300 sq ft deck runs $15,000–$24,000 before add-ons. But fixed costs — permit fees, site setup, demolition, ledger work — don't scale with square footage. A 150 sq ft deck doesn't cost half as much as a 300 sq ft deck.

**Budget 10% contingency for hidden damage.** Especially on any deck attached to a pre-1980 home. Dry rot, corroded hardware, and undersized footings are common. A 10% contingency on a $25,000 project is $2,500 — cheap insurance.

**Know what a fixed-price estimate means.** We provide written, line-item estimates that specify every material, every scope item, and every permit cost — no allowances that expand later. If we find dry rot at the ledger after demo starts, we document it and bring you a change order with a clear price before proceeding. No surprises after the fact.

Our 5-year workmanship warranty covers every [composite deck construction](/services/composite-decks) project we complete, in writing — not as a verbal promise.

## Ready to Know What Your Specific Deck Will Cost?

Every site in San Francisco is different — flat lots in Noe Valley price differently than hillside lots in Bernal Heights or fog-zone locations in the Outer Sunset. The only way to get a real number is a site visit where we can see your access, assess the existing structure, and put a line-item price in writing.

We provide detailed, line-item estimates after a free site visit — no allowances, no surprises. You'll know exactly what material we're using, what's included in demo, whether permits are needed, and what the contingency looks like before any work begins.
    `.trim(),
  },

  {
    slug: "home-remodel-cost-san-francisco-2026",
    title: "How Much Does a Home Remodel Cost in San Francisco? (2026 Guide)",
    excerpt:
      "San Francisco is one of the most expensive remodeling markets in the country. Here's what projects actually cost — with real numbers, not national averages.",
    date: "2026-04-01",
    readingTime: "15 min read",
    featuredImage: "/images/blog-remodel-cost-sf.png",
    relatedService: "complete-remodel",
    content: `
## The Short Answer

San Francisco remodeling costs run 30–60% above the national average. A mid-range kitchen remodel typically costs $75,000–$150,000. A bathroom remodel runs $30,000–$75,000. Whole-home renovations range from $200–$450+ per square foot.

Those numbers feel high — because they are. But they reflect the reality of building in one of the most expensive and heavily regulated construction markets in the United States.

## Kitchen Remodel Costs in San Francisco

The kitchen is the most popular — and most expensive — remodel in any home. Here's what to expect in SF:

**Budget-friendly refresh ($30,000–$50,000):** Reface cabinets, new countertops, updated fixtures and lighting, fresh paint. No layout changes. Minimal permitting.

**Mid-range remodel ($75,000–$150,000):** New custom or semi-custom cabinets, stone countertops, new appliances, updated plumbing and electrical, reconfigured layout. This is where most SF homeowners land.

**High-end renovation ($150,000–$300,000+):** Structural changes (wall removal, room expansion), top-tier appliances, custom millwork, designer finishes, and full mechanical upgrades. Common in Pacific Heights, Noe Valley, and Sea Cliff.

### What Drives Kitchen Costs in SF

- **Labor:** Skilled tradespeople in SF command higher rates than the national average. A licensed electrician in SF charges $120–$180/hour vs. $80–$120 nationally.
- **Permits:** SF DBI permit fees, plan review costs, and inspection scheduling add $3,000–$8,000+ to most kitchen projects.
- **Structural work:** Removing a load-bearing wall to open up a floor plan adds $10,000–$25,000 for engineering, headers, and associated work.
- **Old home challenges:** Many SF homes are 80–120 years old. Behind the walls, you may find outdated electrical, galvanized plumbing, or structural issues that need addressing. Budget 10–15% for contingency.

## Bathroom Remodel Costs in San Francisco

**Basic update ($15,000–$30,000):** New fixtures, tile refresh, vanity replacement. No layout changes.

**Mid-range remodel ($30,000–$75,000):** Full gut and rebuild — new tile, shower/tub, vanity, fixtures, plumbing, and electrical. Waterproofing and ventilation included.

**High-end renovation ($75,000–$150,000+):** Expansion, heated floors, custom shower systems, premium tile, freestanding tubs, smart fixtures.

### Why Bathrooms Cost More Than You Think

Waterproofing. It's the single most important detail in a bathroom remodel, and it's invisible once the tile goes up. A properly waterproofed shower requires a membrane system, proper drainage slope, and cement board substrate — not just tile over drywall. Skipping this step is how you get a $20,000 bathroom that needs to be rebuilt in five years.

## Whole-Home Renovation Costs

For a full-home renovation in San Francisco, expect:

- **Cosmetic refresh:** $100–$200 per square foot
- **Mid-range renovation:** $200–$350 per square foot
- **High-end gut renovation:** $350–$500+ per square foot

A 1,500-square-foot home at mid-range scope lands at roughly $300,000–$525,000. That includes structural modifications, mechanical upgrades (plumbing, electrical, HVAC), finishes, and permits.

## Factors That Affect Your Remodel Cost

**1. Scope of structural work.** Moving walls, changing floor plans, and adding square footage cost significantly more than cosmetic updates.

**2. Age of your home.** Pre-1950 homes in SF often need electrical panel upgrades, plumbing replacement, and seismic improvements once walls are opened. Budget for surprises.

**3. Permit and code requirements.** SF's building codes are among the strictest in the country. Title 24 energy compliance, seismic requirements, and ADA considerations can add cost.

**4. Site access.** If your home is on a steep hill, has no driveway, or requires street parking permits for construction vehicles — logistics costs increase.

**5. Finishes and materials.** The difference between Ikea cabinets and custom millwork can be 3–5x. We help you prioritize where to invest and where to save.

## How to Budget for Your Remodel

1. **Get 2–3 estimates** from licensed contractors (not handymen).
2. **Compare apples to apples** — ask for itemized bids, not lump sums.
3. **Budget 10–15% contingency** for unexpected conditions behind walls.
4. **Don't forget permits** — they're a real cost in SF ($3,000–$10,000+).
5. **Think timeline** — a longer project means more months of disruption and potentially more cost.

## Ready to Get a Real Number?

Every home is different. The only way to get an accurate estimate for your specific project is to have a contractor walk your space, understand your goals, and put it in writing.

Gadget Construction provides detailed, itemized estimates with no obligation. We explain every line item so you know exactly what you're paying for — before any work begins.
    `.trim(),
  },
  {
    slug: "adu-construction-san-francisco-guide",
    title:
      "ADU Construction in SF: Costs, Permits & Everything You Need to Know",
    excerpt:
      "Thinking about building an ADU in San Francisco? Here's the complete guide — from California law to DBI permits to actual construction costs.",
    date: "2026-03-15",
    readingTime: "16 min read",
    featuredImage: "/images/blog-adu-construction-sf.png",
    relatedService: "adu-construction",
    content: `
## What Is an ADU?

An Accessory Dwelling Unit (ADU) is a secondary housing unit on a single-family residential lot. In San Francisco, ADUs go by many names — in-law unit, granny flat, backyard cottage, garden apartment. Whatever you call it, an ADU is a fully independent living space with its own kitchen, bathroom, entrance, and sleeping area.

California's ADU laws (AB 881, SB 13, AB 68) have dramatically expanded homeowners' rights to build ADUs — overriding many local restrictions that previously made them nearly impossible in cities like San Francisco.

## Types of ADUs You Can Build in San Francisco

### Detached ADU
A standalone structure in your backyard, side yard, or rear yard. Can be up to 1,200 square feet regardless of your lot size. This is the most flexible option and typically offers the best rental income potential.

### Garage Conversion
Convert your existing garage into a finished living space. Often the most cost-effective option because the structure already exists. You are NOT required to replace the lost parking space.

### Basement Conversion
Convert unused basement space into a legal dwelling unit. Requires proper ceiling height (minimum 7 feet), egress windows, ventilation, and waterproofing. Common in SF's older homes with unfinished basements.

### Junior ADU (JADU)
A unit up to 500 square feet created within your existing home — for example, converting a bedroom with a separate entrance and kitchenette. JADUs are often the fastest and cheapest to build. You can build a JADU AND a detached ADU on the same lot.

## How Much Does an ADU Cost in San Francisco?

Real numbers from the SF market:

| ADU Type | Typical Cost Range |
|---|---|
| Garage Conversion | $100,000 – $200,000 |
| Basement Conversion | $120,000 – $250,000 |
| Junior ADU (within existing home) | $80,000 – $150,000 |
| Detached New Construction (studio/1BR) | $200,000 – $350,000 |
| Detached New Construction (2BR, high-end) | $300,000 – $450,000+ |

### What's Included in These Costs

- Architectural design and engineering
- DBI permit fees and plan review
- Site work and foundation
- Framing, plumbing, electrical, HVAC
- Insulation, drywall, paint
- Kitchen and bathroom fixtures
- Flooring, doors, windows
- Title 24 energy compliance
- Final inspections and Certificate of Occupancy

### What Drives ADU Costs Up

- **Site conditions:** Sloped lots, limited access, and poor soil conditions increase foundation and site work costs.
- **Utility connections:** Running new sewer, water, and electrical service to a detached ADU can add $15,000–$40,000 depending on distance and existing infrastructure.
- **Finishes:** Builder-grade finishes vs. high-end finishes can swing costs by 30–50%.
- **Structural complexity:** Two-story ADUs, complex rooflines, and custom designs cost more than simple rectangular floor plans.

## The SF DBI Permit Process for ADUs

San Francisco has streamlined its ADU permitting, but it's still a multi-step process:

**Step 1: Pre-Application Research (1–2 weeks)**
Check your lot's zoning, setbacks, and utility access. Determine which type and size of ADU is feasible.

**Step 2: Design & Engineering (4–8 weeks)**
Architectural plans, structural engineering, and Title 24 energy calculations — all prepared for DBI submittal.

**Step 3: DBI Plan Review (8–16 weeks)**
Submit your plans to DBI for review. Expect plan check comments and at least one round of revisions. ADU projects typically get expedited review — but "expedited" in SF still means 2–4 months.

**Step 4: Permit Issuance**
Once plans are approved, your building permit is issued and construction can begin.

**Step 5: Construction Inspections**
Multiple inspections throughout construction — foundation, framing, rough plumbing/electrical, insulation, and final.

**Step 6: Certificate of Occupancy**
After final inspection, you receive a Certificate of Occupancy — the legal document that makes your ADU a permitted dwelling unit.

### Pro Tips for Faster Permitting

- Submit complete, code-compliant plans the first time. Incomplete submittals get sent back and restart the queue.
- Use standard details and proven floor plans. Custom everything takes longer to review.
- Respond to plan check comments within 2 weeks. Don't let your file go stale.
- Work with a contractor who has been through the DBI process before. Experience with the department saves months.

## ADU Rental Income in San Francisco

Current market rental rates for ADUs in San Francisco:

- **Studio/efficiency:** $1,800 – $2,500/month
- **1-bedroom:** $2,200 – $3,500/month
- **2-bedroom:** $3,000 – $4,500/month

At these rates, a well-built ADU can generate $25,000–$50,000+ in annual rental income. Most ADUs in SF pay for themselves within 5–10 years through rental income alone — while also adding $200,000–$400,000+ to property value.

**Important:** ADUs in San Francisco are subject to rent control and just-cause eviction protections. Consult a property management professional or attorney for current tenant regulations.

## Will an ADU Increase My Property Value?

Yes — significantly. Appraisers value ADUs based on the income they generate and the additional living space they provide. In San Francisco's market, a fully permitted ADU typically adds $200,000–$400,000+ to property value.

Key factors that maximize ADU value:
- Full permit and Certificate of Occupancy (unpermitted units are a liability, not an asset)
- Separate utility meters
- Private entrance and outdoor space
- Quality finishes that match the neighborhood
- Code-compliant kitchen and bathroom

## Is an ADU Right for You?

An ADU makes sense if you:
- Want rental income to offset your mortgage or supplement retirement
- Need space for a family member (aging parent, adult child)
- Want a home office or studio separate from your main home
- Plan to stay in your home long-term and want to maximize property value
- Have underutilized space (unused garage, unfinished basement, large backyard)

## Next Steps

The first step is a feasibility assessment. We visit your property, evaluate your lot, review zoning and setback requirements, and give you a clear answer on what type and size of ADU you can build — and what it will cost.

No obligation. No pressure. Just the information you need to make a smart decision.
    `.trim(),
  },
  {
    slug: "foundation-repair-signs-san-francisco",
    title: "5 Signs Your San Francisco Home Needs Foundation Repair",
    excerpt:
      "Cracks in the walls? Doors that won't close? Here are the warning signs that your foundation needs attention — and what to do about them.",
    date: "2026-03-01",
    readingTime: "12 min read",
    featuredImage: "/images/blog-foundation-repair-sf.png",
    relatedService: "concrete-foundations",
    content: `
## Why San Francisco Homes Are Vulnerable

San Francisco's housing stock is old. Many homes in the city were built between 1900 and 1950 — long before modern seismic codes and foundation engineering standards existed. Combine aging construction with the city's challenging soil conditions (expansive clay in the Sunset, fill in the Marina, sand in the Richmond), active seismic faults, and steep terrain — and you have a recipe for foundation problems.

The good news: most foundation issues are fixable if you catch them early. The bad news: most homeowners don't know what to look for until the damage is advanced and expensive.

Here are five warning signs that your foundation needs professional attention.

## 1. Cracks in Walls, Floors, or the Foundation Itself

Not all cracks are equal.

**Hairline cracks** in drywall or plaster are common in older homes and are usually cosmetic — especially if they run horizontally along tape joints. These are typically caused by normal settling or seasonal expansion.

**Diagonal cracks** running from the corner of a window or door toward the ceiling are a red flag. These indicate differential settlement — one part of your foundation is moving while another isn't. The larger the crack and the more it grows over time, the more serious the underlying problem.

**Stair-step cracks** in exterior brick or block walls follow the mortar joints in a stair-step pattern. This is a classic sign of foundation settlement.

**Floor cracks** wider than 1/4 inch, especially in a basement or garage slab, may indicate soil movement beneath the foundation.

### What to Do

Document cracks with photos and measurements. Check them again in 3–6 months. If they're growing, widening, or multiplying — call a foundation contractor for an assessment. Don't fill cracks with caulk and hope for the best.

## 2. Doors and Windows That Stick or Won't Close Properly

If doors that used to close fine are suddenly sticking, dragging, or swinging open on their own — your house may be shifting. When a foundation settles unevenly, it pulls the framing out of square. Door frames become parallelograms instead of rectangles. Gaps appear at the top while the bottom drags.

The same applies to windows. If they're suddenly hard to open, won't lock, or have visible gaps around the frame — the structure around them may be moving.

### What to Do

Check multiple doors and windows throughout the house. If the problem is isolated to one door, it might be a hinge issue. If it's happening across multiple rooms — especially on the same side of the house — the foundation is likely involved.

## 3. Uneven or Sloping Floors

Put a marble on your kitchen floor. If it rolls, you have a slope. Some slope is normal in older homes — San Francisco houses have character. But if the slope is noticeable when walking, or if it's gotten worse over time, your foundation may be settling or the framing may be failing.

In older SF homes, the issue is often a combination of foundation movement and deteriorated mudsills (the wood framing that sits directly on the foundation). Moisture, termites, and time take their toll.

### What to Do

Use a level to measure the slope in multiple rooms. Anything over 1 inch of slope across 15 feet warrants professional assessment. If floors are bouncy or feel soft, the issue may be structural framing rather than (or in addition to) the foundation.

## 4. Water in Your Basement or Crawl Space

Water intrusion below your home isn't just a nuisance — it's a foundation threat. In San Francisco, many homes have basements or crawl spaces that were never properly waterproofed. When water accumulates around or under the foundation, it can:

- **Erode soil** supporting the foundation, causing settlement
- **Create hydrostatic pressure** against basement walls, causing cracking and bowing
- **Deteriorate concrete** over time (especially in older foundations with lower cement content)
- **Rot mudsills and floor joists**, weakening the connection between your home and its foundation

### What to Do

After a rain, check your basement or crawl space for standing water, damp spots, or efflorescence (white mineral deposits on concrete surfaces). Look for water stains on basement walls. If you smell mold or musty air — there's moisture you're not seeing.

Addressing water intrusion typically involves exterior drainage improvements, interior French drains, sump pumps, or vapor barriers — not just patching the symptoms.

## 5. Gaps Between Walls and Ceilings or Floors

When a foundation settles unevenly, the structure above it follows. One of the most visible signs is separation — gaps appearing where walls meet ceilings, where walls meet floors, or where interior walls join exterior walls.

Look for:
- **Crown molding pulling away from the ceiling** — this creates a visible shadow gap that wasn't there before
- **Baseboards separating from the floor** — especially on one side of a room
- **Gaps at wall corners** — where two walls used to meet flush

These separations are your house telling you that different parts of the structure are moving in different directions.

### What to Do

Measure the gaps. Photograph them. Monitor for changes over 3–6 months. If the gaps are growing or you're seeing multiple signs from this list simultaneously — it's time for a professional foundation assessment.

## When to Act

Foundation problems don't fix themselves. They get worse. And the longer you wait, the more expensive the repair becomes. A $5,000 seismic bolting job today could prevent a $50,000 foundation replacement five years from now.

If you're seeing two or more of these signs in your San Francisco home, a professional assessment is the smart move. It costs nothing to find out where you stand — and it could save you tens of thousands of dollars in future repairs.

## Get a Free Foundation Assessment

Gadget Construction provides free foundation assessments for San Francisco homeowners. We'll inspect your foundation, identify any issues, and give you a clear, honest recommendation — whether that's repair, monitoring, or nothing at all. No scare tactics. No pressure. Just the facts.
    `.trim(),
  },
];
