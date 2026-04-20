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
    featuredImage: "/images/blog-composite-deck-cost-san-francisco.png",
    title: "Composite Deck Cost in San Francisco: Real 2026 Numbers from 500+ Bay Area Projects",
    excerpt:
      "Composite decks in San Francisco typically run $15,000 to $60,000+. Here's what actually drives the range — with pricing from 500+ Bay Area projects, not national averages.",
    date: "2026-04-27",
    readingTime: "10 min read",
    relatedService: "composite-decks",
    content: `
## The Short Answer

Composite decks in San Francisco typically run $15,000–$60,000+ depending on size, site conditions, and materials. Most mid-sized decks (300 sq ft) fall between $15,000 and $35,000 fully installed. Multi-level hillside builds and decks with pergolas push into the $35,000–$60,000+ range. Here's what actually drives that spread — with pricing from 500+ Bay Area projects, not national averages.

## Price Ranges by Project Type

Every composite deck quote has a floor and a ceiling. The floor is set by square footage and materials. The ceiling is set by your lot, your site access, and what's already there. Here's how the tiers break down in the SF market.

### Standard 300 sq ft Deck ($15,000–$35,000)

This is the most common project we see in Noe Valley and the Sunset — a single-level deck off the back of a house, typically replacing a deteriorated wood deck or a concrete pad.

At $15,000–$20,000, you're getting a straightforward build: pressure-treated framing, Trex Enhance or Fiberon Good Life decking, cable or aluminum railings, and a basic stair set. No demo headaches, flat lot, clean ledger board. Timeline: 5–8 days.

At $25,000–$35,000, the project gets more complex — perhaps a second stair run, upgraded Trex Transcend or TimberTech AZEK decking, hidden fasteners for a clean face, and composite railings with glass panels. Same footprint, higher spec.

Included in both: ledger board inspection and attachment, all framing hardware (joist hangers, post bases), concrete footings, and permit filing with [SF Department of Building Inspection (DBI)](https://sfdbi.org) if the deck is over 30 inches above grade.

### Multi-Level Hillside Deck ($35,000–$60,000+)

Bernal Heights, Twin Peaks, and the west slope of Noe Valley are where these jobs live. A hillside lot means deeper footings, longer posts, more lateral bracing, and often a structural engineer's stamp before DBI will approve plans.

A two-level deck at 500–700 sq ft with significant grade change typically runs $40,000–$55,000. At $60,000+, you're looking at a complex build with multiple platforms, cable railings on all sides, a built-in stair tower, and a site that required a crane or material lift because a truck couldn't get within 40 feet of the backyard. Timeline: 2–4 weeks.

The material bill alone on a 600 sq ft TimberTech deck is $18,000–$22,000 before a single post goes in the ground.

### Deck with Pergola and Lighting ($25,000–$50,000)

A 400–500 sq ft deck with a freestanding or attached pergola, LED recessed lighting in the decking, and post cap lights runs $25,000–$50,000 depending on pergola complexity and electrical scope.

Aluminum pergolas (like those from Trex Pergola or AZEK Building Products) cost $6,000–$14,000 installed. Cedar or Douglas fir pergolas run $4,000–$9,000 but need ongoing maintenance — ironic when paired with composite decking. LED deck lighting adds $1,500–$4,000 depending on circuit runs.

This project type requires a dedicated electrical permit in addition to the deck permit. Budget $800–$1,500 in additional DBI fees.

### Railing-Only Replacement ($3,000–$8,000)

If your deck structure is sound but the railings are rotted wood or corroded metal, a railing-only swap is often the right call. Don't let a contractor talk you into a full rebuild when the framing is solid.

Cable railing systems (Feeney, Atlantis Rail) run $180–$250 per linear foot installed, including posts. Aluminum panel railings run $150–$220 per linear foot. Composite railings (Trex Transcend, TimberTech) run $120–$180 per linear foot. A typical 60-foot railing run lands at $7,200–$15,000 — but for smaller decks with 30–40 linear feet, the $3,000–$8,000 range is realistic.

## What Drives Composite Deck Costs in San Francisco

National pricing calculators will quote you $30–$60 per sq ft for composite decking. Bay Area reality is $50–$100+ per sq ft installed, and occasionally higher. Here's exactly why.

### Material Selection (Trex, TimberTech, Fiberon)

Composite decking is not a commodity. There's a $6–$8 per sq ft installed cost difference between entry-level and premium boards. The fog belt and coastal salt air that blankets the Sunset, Pacifica's Linda Mar neighborhood, and Sausalito's waterfront make material selection more consequential than in inland climates.

| Material | Installed Cost | Fade/Stain Warranty | Best For |
|---|---|---|---|
| Trex Enhance Basics | $9–$12/sq ft | 25 years | Budget builds, inland SF neighborhoods |
| Trex Transcend | $14–$18/sq ft | 25 years | Most SF homes |
| TimberTech AZEK | $18–$22/sq ft | 50 years | Fog belt, coastal, Sausalito waterfront |
| Fiberon Paramount | $16–$20/sq ft | 50 years | Value premium tier |
| Fiberon Good Life | $10–$13/sq ft | 25 years | Entry-level composite |

For homes in the fog belt — Sunset, Richmond, Pacifica — we typically recommend TimberTech AZEK or Fiberon Paramount over entry-level composites. The 50-year fade warranty isn't marketing; it reflects a capping technology that holds up better under persistent moisture and UV cycling. Trex Enhance will work, but you'll see more color variation faster.

### Site Access and Demolition

This is the cost factor most contractors bury in a vague "site conditions" line item. It deserves specifics.

- **Flat lot, gate access:** No premium. Standard pricing applies.
- **Flat lot, no gate (material goes over fence):** Add $500–$1,500.
- **Hillside lot, moderate grade:** Add $2,000–$5,000 for extra labor, extended post cuts, and additional bracing.
- **Hillside lot, steep access, no vehicle access:** Add $5,000–$12,000. Material staging becomes a full-day operation. On some Twin Peaks and Bernal Heights lots, we've coordinated material lifts over the roof of the house.

Demolition of an existing deck adds $1,500–$4,000 depending on size and whether there's a dumpster drop-off location nearby. In SF's denser neighborhoods — the Inner Richmond, Mission, Noe Valley — dumpster permits from SFMTA (San Francisco Municipal Transportation Agency) add $200–$400 and require advance scheduling.

### Structural Requirements (Hillside, Multi-Level, Elevated)

Any deck over 30 inches above grade in San Francisco triggers a building permit through DBI — and permits require stamped structural drawings if the height or complexity exceeds basic prescriptive standards.

Structural engineering fees for a deck: $1,500–$3,500. That's before permit fees.

On hillside lots, posts may need to go 4–6 feet into the ground to reach stable soil. In Bernal Heights and Twin Peaks, we often encounter serpentine rock or expansive clay within the first 3 feet. Either condition changes the footing design and adds cost — typically $300–$800 per footing location beyond standard depth.

Multi-level decks also require more lateral bracing (knee bracing or diagonal blocking between posts) to meet SF's seismic requirements. That's material and labor you won't see in an out-of-state bid template.

### SF DBI Permits (Decks Over 30 Inches)

In San Francisco, any deck more than 30 inches above grade requires a building permit from DBI. There is no workaround. A deck built without a permit is an unpermitted structure — and it's a liability when you sell.

Permit costs for a standard deck in SF: $1,200–$3,500 in fees, plus plan check time. If your deck is attached to the house (which most are), you may also need a mechanical or electrical permit if lighting or gas is involved.

Timeline: DBI plan review for a straightforward deck permit currently runs 6–12 weeks. Expedited review is available for an additional fee but doesn't guarantee a short timeline. Factor this into your project start date — if you want a deck ready by July 4th, submit plans in March.

Decks under 30 inches above grade and under 200 sq ft may qualify for an over-the-counter permit, which can be issued same-day. We always verify eligibility before telling a homeowner this option exists.

### Add-Ons: Pergolas, Lighting, Railings

These are legitimate budget drivers, not upsells for their own sake:

- **Aluminum pergola:** $6,000–$14,000 installed (freestanding, powder-coated)
- **Cedar/Doug fir pergola:** $4,000–$9,000 installed (requires periodic sealing)
- **LED deck lighting (recessed in decking):** $1,500–$3,000
- **Post cap and riser lighting:** $800–$1,800
- **Gas line for fire pit or heater:** $1,500–$3,500 (requires separate DBI gas permit)
- **Cable railing upgrade (from composite):** $2,000–$5,000 additional depending on run length

We can review all of these in [our composite deck projects](/gallery) if you want to see what combinations actually look like installed.

## Hidden Costs Most Contractors Don't Tell You About

This is where low bids fall apart. A contractor who quotes you $18,000 for a Noe Valley deck and shows up to find a rotted ledger board has two choices: tell you the truth and revise the number, or start cutting corners. You want a contractor who tells you the truth.

Here are the most common budget surprises on SF composite deck projects:

**1. Dry rot at the ledger board.** The ledger board is where the deck attaches to your house. On pre-1980 SF homes, it's frequently deteriorated behind the siding — invisible at bid time. [Dry rot at deck ledger boards](/services/exterior-repairs) is the single most common hidden cost we encounter. Repair scope: $500–$4,000 depending on how far it's spread into the rim joist and floor framing.

**2. Undersized existing footings.** If you're rebuilding a deck, the original footings may not meet current code for the new load. Replacing or augmenting footings adds $300–$800 per location. A typical deck has 4–8 footing locations.

**3. Inadequate drainage.** Water pooling under a deck destroys the crawl space, accelerates substructure rot, and creates mosquito habitat. Re-grading and adding drainage swales or French drains adds $1,500–$4,000. We catch this during site walk; many contractors don't mention it until after demo.

**4. Old lag screws and ledger hardware.** Pre-2000 ledger attachments rarely meet current IRC (International Residential Code) requirements. New hardware and fasteners: $300–$800.

**5. HOA review fees.** If your building has an HOA — common in SF condos and TIC (tenants-in-common) buildings — architectural review adds 4–8 weeks to the timeline and $200–$600 in HOA fees. We've seen HOA reviews kill the July timeline more often than DBI.

**6. Electrical panel capacity.** Adding deck lighting and a gas igniter for a fire feature sometimes reveals that your panel is already at capacity. Panel upgrade: $3,000–$6,000 (separate project, separate permit).

**7. Gas line from the house.** If you want a built-in heater or fire pit and there's no existing gas stub-out on the exterior, running a new line from the house ranges from $1,500–$3,500 depending on distance and wall penetration complexity.

Budget 10–15% contingency on any deck project that involves demolition of an existing structure or is attached to a home built before 1985.

## Real Project Examples from 500+ Bay Area Projects

Numbers are more useful than ranges when they're attached to a real job. Here are three.

**Project 1: 320 sq ft Trex Transcend deck, Noe Valley flat lot — $22,000**

Single-level deck replacing a deteriorated redwood deck on a flat Noe Valley lot with gate access. Scope included demo and haul-off of existing deck ($1,800), 4 new concrete footings at standard depth, pressure-treated framing, Trex Transcend Spiced Rum decking with hidden Trex Hideaway fasteners, Trex Transcend composite railing with glass panel infill, and a single 5-step stair. DBI permit included. Ledger board was clean — no dry rot. Timeline: 7 working days.

**Project 2: 600 sq ft TimberTech multi-level hillside deck, Bernal Heights — $48,000**

Two-level deck on a steeply sloped Bernal Heights lot with no vehicle access to the backyard. Material staging required hand-carry over a 6-foot fence and up a 30-foot run — one full day of labor before framing began. Scope included structural engineering ($2,200), 8 footings at 48-inch depth due to expansive clay, TimberTech Landmark series decking on both levels, cable railing (Feeney CableRail) on all exposed sides, two stair runs, and LED riser lighting. DBI permit and plan check included. Timeline: 18 working days. This is the type of [composite deck construction](/services/composite-decks) that looks straightforward in photos but is genuinely complex to build safely on an SF hillside.

**Project 3: 450 sq ft Fiberon Paramount deck with pergola and LED lighting, Sunset District — $39,000**

Single-level deck on a flat Sunset lot replacing a concrete patio. Scope included concrete demo and haul-off ($2,200), 6 footings, Fiberon Paramount Coastal Cedar decking, aluminum Trex Pergola (14 x 16 ft, freestanding), LED recessed deck lights on two circuits, and post cap lighting. Coastal fog-belt location drove the Fiberon Paramount selection over entry-level composites. DBI deck permit and separate electrical permit included. Timeline: 12 working days. The homeowner had budgeted $32,000 — we flagged the electrical permit requirement and the concrete demo scope upfront so there were no surprises.

## How to Budget for Your SF Deck

Here's a practical framework before you talk to anyone.

**1. Get 2–3 estimates from licensed Class B contractors.** Not handymen. Not unlicensed subs. A deck attached to your house is a structural project. Verify CA license status at the CSLB (Contractors State License Board) website before signing anything.

**2. Compare line-item bids, not lump sums.** Your bids should separately call out: demo, footings, framing, decking material (brand and product line specified), railing (brand specified), stairs, electrical, permit fees, and final cleanup. Any bid that doesn't break these out is hiding something.

**3. Confirm which composite product is being priced.** "Composite decking" on a bid means nothing. Trex Enhance Basics and TimberTech AZEK are both composite decking. The installed price difference is $6–$10 per sq ft. Specify the product line in writing before you sign.

**4. Ask whether demo and haul-off are included.** Surprisingly common omission. Removal of an existing deck or patio adds $1,500–$4,000 and should be an explicit line item.

**5. Budget 10–15% contingency.** If demo is involved or the home is pre-1985, this isn't optional. It's the honest math.

**6. Understand the per-sq-ft math.** A $50/sq ft quote on a 300 sq ft deck is $15,000. The same $50/sq ft on a 600 sq ft deck is $30,000 — but some costs (permit fees, mobilization, engineering) don't scale linearly, so larger decks often have a lower effective per-sq-ft cost.

Here's what we do differently: every Gadget Construction estimate is fixed-price, fully itemized, with no allowances. An allowance is a placeholder number a contractor puts in when they haven't actually priced a component. "Lighting allowance: $2,000" means the real number could be $4,000. We price it out. Every line. Before you sign. And every project we build comes with a 5-year workmanship warranty, in writing.

## Ready to Know What Your Specific Deck Will Cost?

Every lot in San Francisco is different. Site access, soil conditions, existing structure condition, and your target material tier all move the number. The only way to give you an accurate figure is to walk your property.

We provide detailed, line-item estimates after a free site visit — no allowances, no surprises. Tell us what you're thinking and we'll tell you exactly what it costs to build it right.
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
