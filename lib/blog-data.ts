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

Composite decks in San Francisco typically run $15,000–$60,000+ depending on size, site conditions, and materials. Most mid-sized decks (around 300 sq ft) fall between $15,000 and $35,000 fully installed. Multi-level hillside builds push $35,000–$60,000+, and decks with pergolas and lighting land in the $25,000–$50,000 range. Here's what actually drives those numbers — with pricing from 500+ Bay Area projects, not national averages.

## Price Ranges by Project Type

Composite isn't a commodity. Trex Transcend and TimberTech AZEK perform very differently in SF's fog belt than builder-grade composites — and they're priced accordingly. Below is what each project tier actually costs here, and what you're getting for the money.

### Standard 300 sq ft Deck ($15,000–$35,000)

This is the most common project we see in San Francisco — a single-level rear deck, typically off the kitchen or living room, on a relatively flat lot. At $15,000 on the low end, you're looking at Trex Enhance or Fiberon Goodlife decking on a pressure-treated subframe, standard aluminum or cable railing, and a straightforward ledger attachment to the house. At $35,000, you're into Trex Transcend or TimberTech AZEK, composite railing, concealed fasteners, and a more complex framing situation.

What's included in a standard build:
- Demo and haul-off of existing deck or concrete pad
- Pressure-treated framing with joist hangers and beam hardware
- Composite decking (brand and line determined by your budget)
- Railing system (aluminum, cable, or composite)
- SF DBI permit (required for any deck more than 30 inches above grade)
- One or two sets of stairs

Timeline: 3–5 weeks from permit issuance to completion. Typical neighborhoods: Noe Valley flat lots, Sunset single-family homes, Richmond district homes with rear yard access.

### Multi-Level Hillside Deck ($35,000–$60,000+)

This is the project that catches people off-guard. In Bernal Heights, Twin Peaks, and the steeper blocks of Noe Valley, a "deck" isn't a flat platform — it's a structure cantilevered over a hillside, requiring engineered footings drilled into the slope, heavy-gauge posts, and often a multi-level layout that works with the grade change rather than fighting it.

The cost premium here comes from three places: engineering (a structural engineer stamps the drawings before DBI will even look at them), foundation work (Sonotubes drilled 18–24 inches into the hillside, sometimes with a concrete grade beam), and the sheer labor of getting materials up a 30% grade with no truck access. Add 15–20% to any hillside estimate for site-access and logistics alone.

At $60,000+, you're typically looking at 500–700 sq ft of TimberTech or Trex Transcend on a two-level structure with composite railing, lighting rough-in, and a staircase connecting levels. A 600 sq ft build in Bernal Heights is not the same project as a 600 sq ft build in Daly City's Westlake neighborhood. Same footprint, meaningfully different cost.

### Deck with Pergola and Lighting ($25,000–$50,000)

A pergola and LED lighting package is the most popular add-on we see right now — partly because it extends useful deck hours into the evening, and partly because SF's fog and wind make shade structures genuinely useful for wind blocking rather than just sun shade.

A standard attached pergola (12' × 12', aluminum or cedar) adds $6,000–$15,000 to a deck build, depending on material and complexity. LED low-voltage deck lighting adds $1,500–$4,000. If you want a fan, heaters, or a gas line for a fire feature, budget an additional $2,000–$6,000 for the electrical or gas rough-in.

The $25,000 end of this range is a 300 sq ft Trex Enhance deck with a basic cedar pergola and string lights. The $50,000 end is a 400 sq ft TimberTech AZEK deck with an engineered aluminum pergola, integrated LED step and post lighting, and an outdoor heater circuit. Timeline adds 1–2 weeks over a standard deck build.

### Railing-Only Replacement ($3,000–$8,000)

If your existing deck structure is sound but the railing is rotted, wobbly, or just dated, a railing replacement is a legitimate standalone project. This is one case where we'll tell you upfront: don't rebuild the whole deck if the subframe and decking are in good shape.

Aluminum railing runs $3,000–$5,000 for a standard 40-linear-foot run. Cable railing (which most SF homeowners want for the view-preserving profile) runs $5,000–$8,000 for the same run, because the stainless cable tensioning hardware is expensive and the installation is more labor-intensive. Composite railing falls in the middle at $4,000–$7,000.

---

## What Drives Composite Deck Costs in San Francisco

### Material Selection (Trex, TimberTech, Fiberon)

The composite decking market has three tiers. What you choose affects both upfront cost and long-term performance — and in SF's coastal climate, the performance difference is real.

| Material | Installed Cost | Fade Warranty | Best For |
|---|---|---|---|
| Trex Enhance | $10–$13/sq ft | 25 years | Budget-conscious builds, flat lots |
| Trex Transcend | $14–$18/sq ft | 25 years | Most SF homes, fog belt |
| TimberTech AZEK | $18–$22/sq ft | 50 years | Coastal / heavy fog exposure |
| Fiberon Paramount | $16–$20/sq ft | 50 years | Value premium option |
| Fiberon Goodlife | $10–$13/sq ft | 15 years | Entry-level, sheltered locations |

For homes in the SF Sunset, SF Richmond, Pacifica's Linda Mar or Rockaway Beach neighborhoods, or Sausalito waterfront — where salt air and persistent moisture are daily realities — we consistently recommend TimberTech AZEK or Fiberon Paramount. The 50-year fade warranty isn't marketing: the PVC cap layer on those products outperforms wood-composite blends in sustained wet and salty conditions.

### Site Access and Demolition

Site access is the cost driver most contractors either bury in an allowance or forget to mention. In San Francisco, access is almost never simple.

Narrow side yards (under 36 inches wide) mean all lumber and composite boards get carried by hand rather than moved by equipment. A property on Twin Peaks with 35 steps from the street to the rear yard adds 1–2 days of labor just for material staging. Removing an existing concrete pad — common under older decks — adds $1,500–$4,000 depending on thickness and reinforcement. Hauling debris off a hillside property can cost $800–$1,500 more than a flat-lot job.

Our rule: if a contractor gives you a deck bid without asking about your site access, ask them to walk the property before they finalize the number.

### Structural Requirements (Hillside, Multi-Level, Elevated)

Any deck more than 30 inches above grade in San Francisco requires a SF DBI (Department of Building Inspection) permit and engineered drawings. That threshold catches more people than you'd expect — if your first-floor is raised, even a "ground level" deck off the back can easily be 30+ inches above the downhill grade.

For hillside and multi-level builds, DBI requires stamped structural engineering. An engineer's involvement adds $1,500–$4,000 to the project budget and typically 2–4 weeks to the design phase. Footings on sloped sites need to be designed for both vertical load and lateral forces — a standard 12-inch Sonotube isn't always sufficient. On some Bernal Heights and Twin Peaks lots, we've drilled 24-inch piers and tied them to a grade beam before framing could start.

### SF DBI Permits (Decks Over 30 Inches)

Any deck over 30 inches above grade requires a building permit from SF DBI. For decks under that threshold, a permit is still advisable — it documents the work, satisfies disclosure requirements when you sell, and ensures your homeowner's insurance covers the structure.

Permit fees for a standard deck in SF run $1,500–$3,500, including plan check and inspection fees. DBI plan review typically takes 6–10 weeks for a straightforward deck, 10–16 weeks if there are complications (hillside, variance required, historic district). Factor that into your timeline — we tell every client to expect 2–4 months from design start to permit-in-hand before a single board gets cut.

### Add-Ons: Pergolas, Lighting, Railings

Add-ons are where a $22,000 deck becomes a $38,000 outdoor living space. The items with the biggest impact:

- **Pergola (attached, cedar):** $6,000–$10,000
- **Pergola (freestanding, aluminum):** $10,000–$18,000
- **LED low-voltage deck lighting:** $1,500–$4,000
- **Outdoor heater circuit (220V):** $800–$1,500
- **Gas line for fire pit or grill:** $2,000–$4,500
- **Cable railing upgrade over aluminum:** $1,500–$3,000 for standard run
- **Stair landing and additional stair run:** $2,500–$5,000

None of these are frivolous in SF's climate. A good pergola knocks the wind down. Heater circuits extend usable season by 4–6 months. Spec these early — adding a gas line after the deck is built costs 3× more than roughing it in during framing.

---

## Hidden Costs Most Contractors Don't Tell You About

This is the section most contractor blogs skip. We don't, because the surprises that blow budgets are predictable — you just have to know where to look.

**1. Dry rot at the ledger board ($500–$4,000+).** The ledger board is where your deck attaches to the house. It's also the single most common spot for moisture damage on Bay Area homes, especially on anything built before 1980 without proper flashing. When we open up the siding to set the ledger, we frequently find [dry rot at deck ledger boards](/services/exterior-repairs) — rotted sheathing, damaged rim joists, compromised sill plates. If we find it, we fix it before the deck goes on. Budget $500–$4,000 depending on extent.

**2. Undersized existing footings ($1,000–$3,500).** If you're replacing a deck that was built without a permit — common in SF — the original footings are often inadequate for the new load. We've dug up 6-inch concrete pads that were never designed for structural support. New footings mean excavation and concrete work.

**3. Inadequate drainage at the house foundation ($500–$2,000).** A deck that traps water against the house is worse than no deck. Proper drainage requires either a waterproof membrane between the deck and house, or a designed gap with flashing. Fixing drainage problems discovered mid-project adds $500–$2,000.

**4. Old fasteners and hardware ($200–$800).** Replacing an existing deck? The old lag screws, joist hangers, and post bases are often corroded beyond reuse. Budget for new hardware — it's not expensive, but it's not free either.

**5. HOA review fees ($0–$1,500).** Some SF buildings and planned developments require HOA architectural review before permits are pulled. This isn't common in typical SF single-family neighborhoods, but it applies to some Marina District and Pacific Heights buildings. Ask your HOA before assuming.

**6. Electrical panel capacity ($0–$3,500).** Adding a heater circuit or lighting circuit to a home with a 100-amp panel that's already loaded can require a panel upgrade. We check this before designing the electrical rough-in.

**7. Existing gas line distance ($1,500–$4,500).** Want a gas fire feature or built-in grill? If the nearest gas line is on the opposite side of the house, the run cost goes up fast.

---

## Real Project Examples from 500+ Bay Area Projects

### Project 1: 320 sq ft Trex Enhance Deck, Noe Valley

Flat lot, rear yard access through a side gate (28 inches wide — tight but manageable). Replacing a deteriorated pressure-treated wood deck that had no permit. 

**Scope:** Demo and haul-off, new pressure-treated subframe, Trex Enhance Naturals in Toasted Sand, aluminum railing with cable infill, two stair treads, SF DBI permit.

**Total: $22,000.** Timeline: 4 weeks from permit issuance. The ledger board replacement added $800 due to minor dry rot in the rim joist — we found it when we removed the old deck and addressed it before framing.

### Project 2: 600 sq ft TimberTech AZEK Multi-Level Deck, Bernal Heights

Steep hillside lot, 22-foot elevation change across the rear yard. No truck access — all materials staged from the street and carried by hand. Two-level design with stairs connecting levels and cable railing throughout.

**Scope:** Structural engineering, four 24-inch concrete piers, pressure-treated heavy-timber framing, TimberTech AZEK Vintage Weathered Teak, stainless cable railing, built-in LED step lighting, DBI permit.

**Total: $48,000.** Timeline: 6 weeks from permit (14 weeks total from design start). The site access and engineering accounted for roughly $9,000 of that total — about 19% of the project cost, which is consistent with steep hillside work in Bernal Heights and Twin Peaks.

### Project 3: 450 sq ft Fiberon Paramount Deck with Pergola and Lighting, SF Sunset

Fog-belt location — we spec'd Fiberon Paramount specifically for the coastal exposure. Single-level deck off the back of a 1950s Doelger-style home, attached cedar pergola, integrated LED low-voltage lighting on stairs and posts.

**Scope:** Demo of existing concrete patio, new pressure-treated subframe on existing slab footings (adequate, no new piers needed), Fiberon Paramount in Hazel, composite railing, attached 12'×14' cedar pergola, low-voltage LED lighting package, DBI permit.

**Total: $39,000.** Timeline: 5 weeks from permit. No hidden cost surprises on this one — slab footings were solid, ledger was clean, and the existing electrical panel had capacity for the lighting circuit.

---

## How to Budget for Your SF Deck

**Get 2–3 estimates from licensed contractors.** Not handymen, not unlicensed "deck guys." A Class B general contractor (like us, CA License #1132983) carries the licensing, insurance, and permit authority to pull DBI permits and take responsibility for the structural work.

**Compare apples to apples.** When you get bids, make sure each one specifies:
- The exact composite brand and product line (Trex Enhance vs. Transcend is not the same)
- Whether demo and haul-off are included
- Whether the permit fee is included or billed separately
- What the railing system is and what material
- Whether electrical rough-in (if any) is in scope

Lump-sum bids that don't break out these items will have surprises. Ask for itemization.

**Budget 10% contingency.** On any deck where we're opening up the ledger or replacing an existing structure, there's a meaningful chance of finding dry rot or deteriorated framing behind the siding. It's not guaranteed — but it's common enough in SF homes built before 1970 that 10% contingency is honest budgeting, not pessimism.

**Understand per-square-foot math — but don't over-rely on it.** The most useful reality check: a standard single-level deck in SF runs $50–$110 per sq ft installed, depending on materials and site conditions. Below $45/sq ft should prompt questions about what's been left out. Above $120/sq ft on a flat lot should prompt questions about margin.

**Here's what we do differently.** We provide fixed-price written estimates with every line item broken out — materials, labor, permit fees, demo, and any anticipated hidden-cost scenarios we've identified during the site visit. No allowances for "materials TBD." No vague lump sums. You see every number before you sign anything. Our [composite deck construction](/services/composite-decks) work comes with a 5-year workmanship warranty, in writing, on every project. You can also browse [our composite deck projects](/gallery) to see finished work from homes across SF, Marin, and the Peninsula.

---

## Ready to Know What Your Specific Deck Will Cost?

Every lot is different. The only way to get an accurate number for your project is a site visit — not a square-footage formula, not a phone estimate.

We provide detailed, line-item estimates after a free site visit: no allowances, no surprises, no pressure. Tell us what you're thinking and we'll tell you exactly what it costs.
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
