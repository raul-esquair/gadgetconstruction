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

export function getRelatedPosts(
  currentSlug: string,
  relatedService: string | undefined,
  limit = 3,
  now: Date = new Date(),
): BlogPost[] {
  if (!relatedService) return [];
  return getPublishedPosts(now)
    .filter((p) => p.slug !== currentSlug && p.relatedService === relatedService)
    .slice(0, limit);
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "stucco-vs-hardie-board-vs-wood-siding-bay-area",
    featuredImage: "/images/blog-stucco-vs-hardie-board-vs-wood-siding-bay-area.png",
    title: "Stucco vs Hardie Board vs Wood Siding: What's Right for Bay Area Homes",
    excerpt:
      "Fog, salt air, and fire zones make the Bay Area uniquely hard on exterior siding. Here's how stucco, Hardie board, and wood siding actually compare — including failure patterns we see every week.",
    date: "2026-05-25",
    readingTime: "17 min read",
    relatedService: "exterior-repairs",
    faqs: [
      {
        "question": "Is Hardie board better than stucco for Bay Area homes?",
        "answer": "It depends on the house. HardiePlank handles coastal moisture and fire exposure with fewer installation failure modes than stucco. But on a Doelger home, Spanish Revival, or any stucco-native architecture, stucco is the architecturally correct choice — and properly installed with a new WRB, it performs well for 30+ years. Neither material wins every scenario in the stucco vs Hardie board comparison."
      },
      {
        "question": "How much does Hardie board siding cost to install in the Bay Area?",
        "answer": "Hardie board siding in the Bay Area runs $14–$22 per square foot installed, including standard WRB, fasteners, and basic trim. For a typical 2,000 square foot exterior, budget $28,000–$44,000 complete. The range reflects product choice, factory vs field paint, substrate prep, and trim complexity. Always request itemized bids separating material, labor, and substrate prep."
      },
      {
        "question": "Why do Eichler homes require T1-11 instead of fiber cement panels?",
        "answer": "T1-11 plywood siding — with its characteristic vertical grooves at regular intervals — is a defining visual element of Eichler's Mid-Century Modern design. The groove spacing, reveal depth, and shadow lines are proportionally specific to the architecture. Fiber cement approximations use different proportions, visible at close range. LP SmartSide T1-11 is the recommended quality upgrade — same look, better moisture performance."
      },
      {
        "question": "What happens if I install wood siding on a Pacifica or coastal home without stainless fasteners?",
        "answer": "Standard galvanized nails corrode within 8–12 years in persistent salt air. Corroded fasteners bleed rust through paint in brown streaks that don't clean off, and eventually lose structural holding power. Any coastal home in Pacifica, Sausalito, or the SF Sunset requires stainless or hot-dipped galvanized hardware throughout. Stainless ring-shank nails cost about 15–20% more — they're not optional in salt-air zones."
      },
      {
        "question": "Do I need a permit to replace siding on my San Francisco home?",
        "answer": "Yes, in most cases. SF DBI (the San Francisco Department of Building Inspection) requires a building permit for full siding replacement. Scope including WRB replacement, structural sheathing repair, or work on a historically designated building triggers additional review. SF DBI permit processing currently runs 6–12 weeks for residential exterior work. Factor that lead time into your project schedule."
      },
      {
        "question": "What is the most common siding failure pattern on Bay Area homes?",
        "answer": "Water intrusion at siding-to-trim transitions and around window openings is the most common failure pattern across all three material types. The cause is almost always installation detail failure — missing flashing, gaps in sealant at penetrations, or improperly lapped WRB. A correctly detailed stucco installation outperforms a poorly detailed Hardie installation every time. Verify flashing spec before accepting any siding bid."
      },
      {
        "question": "Is wood siding viable in the Bay Area fog belt, or should I always choose fiber cement?",
        "answer": "Wood siding is viable on the right home with the right maintenance commitment. Cedar clapboard on a Victorian in Pacific Heights can last 40+ years with refinishing every 5–7 years. The honest math: professional repainting runs $3,000–$7,000 per cycle — $12,000–$28,000 over 20 years before any board replacement. For owners who'll keep that schedule, wood is a legitimate choice. For others, fiber cement is the more practical recommendation."
      }
    ],
    content: `
## The Short Answer

For most Bay Area homes in 2026, stucco vs Hardie board comes down to one question: what was the house built with, and why? James Hardie fiber cement is the right call for coastal homes in Pacifica, WUI fire zones in the Marin hills and Oakland Hills, and any re-siding project where low maintenance is the priority. Stucco is the correct cladding for Spanish Revival, Mediterranean, and Doelger homes where it's architecturally native — not a second-best option. Wood is the right answer on Victorians, Craftsman bungalows, and Eichlers where replacing it with anything else compromises the architecture. No single material wins every scenario in the Bay Area, and the region's combination of persistent coastal moisture, wind-driven rain, wildfire exposure, and salt air means the wrong choice costs you real money. Here's the honest breakdown — with per-square-foot pricing and failure patterns from 500+ Bay Area projects.

---

## The Bay Area Siding Problem: Why Material Choice Here Is Different

The Bay Area is genuinely brutal on exterior siding in ways that most national product literature doesn't account for — and what works in the Pacific Northwest or Midwest doesn't automatically translate here.

Start with moisture. The SF Sunset and Richmond, Pacifica's Linda Mar and Rockaway Beach neighborhoods, and the Marin waterfront see persistent fog from June through September. Not occasional rain — daily damp cycles where siding absorbs moisture overnight and dries in the afternoon. That cycle is harder on wood and stucco than sustained rainfall, because repeated expansion and contraction degrades material faster than a wet-and-stays-wet climate would.

Add salt air. Within roughly a mile of the bay or ocean, airborne salt accelerates corrosion of fasteners, flashing, and any unsealed metal trim. Standard galvanized nails fail in 8–12 years on [coastal home siding in Pacifica](/service-areas/pacifica). Standard caulk formulations degrade faster. A siding job that would last 30 years in Menlo Park might need major repair at year 15 on the [Sausalito waterfront](/service-areas/sausalito) if it wasn't detailed for salt exposure.

Then there's wind-driven rain. The Bay Area doesn't get a lot of total precipitation, but what it gets often arrives sideways — especially on coastal-facing and hillside elevations. Water intrusion at siding seams, around window trim, and at the base of siding runs are the primary failure modes we see on [stucco and siding repair](/services/exterior-repairs) calls across the region.

Fire exposure matters increasingly. The Marin hills, Oakland Hills, Berkeley Hills, and Peninsula hillsides above 500 feet are Wildland-Urban Interface (WUI) zones — areas where residential construction meets fire-prone wildland vegetation. California's building codes require non-combustible or ignition-resistant exterior materials in these zones. That requirement eliminates some siding options outright and makes Class A fire ratings a non-negotiable spec item. Any siding decision for [WUI fire zone homes in Marin](/service-areas/mill-valley) or the [Oakland Hills](/service-areas/oakland) has to clear this bar first.

Any siding that works in the Bay Area has to handle all of this simultaneously. The comparison below reflects those real-world conditions, not manufacturer claims.

---

## Stucco: Traditional but Temperamental

Stucco gets dismissed unfairly in a lot of contractor conversations. It's the correct cladding for a significant share of Bay Area homes — and when it fails, it's almost always because of installation shortcuts, not the material itself.

### How Three-Coat Stucco Works

Traditional three-coat stucco is a layered masonry cladding applied over a weather-resistive barrier (WRB — a housewrap or felt-paper layer that prevents moisture from penetrating the wall assembly) and galvanized wire lath. The scratch coat goes on first: a rough Portland cement and sand mix that mechanically keys into the lath. The brown coat follows, building the wall to near-final thickness. The finish coat is the visible surface, available in smooth, sand finish, or textured variations.

Done correctly, three-coat stucco delivers 30–50 years of service with minimal maintenance in non-coastal locations. The system's structural weakness is at penetrations and transitions — windows, doors, hose bibs, electrical boxes, and anywhere the stucco terminates. Water that gets behind the system at those points has nowhere to drain and nowhere to dry. That detail failure is what drives the vast majority of stucco-related [exterior repair](/services/exterior-repairs) work we do across San Francisco and the Peninsula.

### Why It Cracks (And What It Means)

Not all stucco cracks signal the same problem. Context matters.

**Hairline surface cracks** in the finish coat, particularly around corners and at control joints (intentional breaks in the stucco plane that give the cladding room to expand and contract), are normal and cosmetic. If your stucco has no control joints and has fine cracks across the field, that's why.

**Diagonal cracks from window and door corners** are a more serious signal. These often indicate structural movement — house settling, a failed header above an opening, or seismic racking. The crack itself isn't the problem. The problem is what's moving behind it.

**Horizontal cracks at floor lines** on multi-story homes frequently indicate a failure in the WRB, allowing water to run down through the wall assembly and wick out at floor framing. We find rotted sill plates and sheathing behind these patterns on Outer Sunset Doelgers with regularity.

**The Doelger stucco-over-shiplap failure pattern:** Joseph Doelger built approximately 5,000 homes across the Sunset District and the Westlake neighborhood of Daly City between the 1940s and 1950s. His homes used stucco over shiplap sheathing (horizontal wood boards) — sound construction for the era. The problem is that the original tar paper WRB on these homes is now 70–80 years old and has largely failed. When water gets behind the stucco on a [Doelger home in Daly City](/service-areas/daly-city) or the Sunset, it saturates the shiplap directly. We've opened these walls to find shiplap that looks like wet cardboard. Re-stucco without replacing the WRB is a short-term fix that will fail the same way within 10–15 years. Any re-stucco bid for a Doelger home must explicitly include WRB replacement — if it doesn't, that's the reason the number is lower.

### Cost: Stucco Installation and Repair

New three-coat stucco installation runs **$7–$14 per square foot** installed, depending on substrate prep, finish texture, and whether the WRB and lath are included in scope (they should be). For a 2,000 square foot exterior, that's **$14,000–$28,000** for the stucco scope alone — not including window trim, corner bead, or paint.

Full-house re-stucco — removing existing stucco, replacing WRB and lath, applying a new three-coat system — runs **$15,000–$35,000** for a typical SF single-family home. Spot repairs run **$500–$2,500** depending on crack size and underlying cause. Surface hairline cracks can be treated with elastomeric caulk and a finish coat patch. Cracks from active structural movement need the movement to stop before the surface is repaired.

### Best Used On: Architectural Context

Stucco is the right choice when it matches the architecture. Spanish Revival and Mediterranean homes in the Mission, Noe Valley, and Pacific Heights were designed for stucco. [Doelger homes](/service-areas/daly-city) were built with stucco and look right with stucco. Midcentury ranch homes across the Peninsula are often stucco and should stay that way.

Stucco applied to a Victorian rowhouse in Alamo Square or a Craftsman bungalow in Rockridge is wrong — not because stucco is a bad material, but because it obscures the architectural character the home was built with. That's a renovation mistake, not a stucco failure.

---

## Hardie Board vs Stucco vs Wood: The Fiber Cement Case

James Hardie fiber cement has become the default siding recommendation for the majority of new Bay Area siding projects for specific, verifiable reasons — not marketing. When homeowners compare **fiber cement vs stucco** or evaluate **hardie board vs wood siding**, fiber cement wins on versatility, fire performance, and coastal durability. It's not perfect, and it's not always right — but it earns the default position.

### How Hardie Board Is Made (Cement, Sand, Cellulose Fiber)

HardiePlank and the broader fiber cement family are composites of Portland cement, silica sand, and cellulose fiber — pressed and cured into planks, panels, or shingles. The material doesn't rot, doesn't support mold growth, and doesn't provide food for insects. It won't warp from moisture cycling the way wood does. It's dimensionally stable across the fog-cycle conditions that are hardest on wood siding in the Sunset, Richmond, and Pacifica.

James Hardie is the dominant brand — HardiePlank lap siding, HardieShingle, HardiePanel — but LP SmartSide's fiber cement line and other manufacturers follow the same basic formulation. When we spec fiber cement, it's almost always HardiePlank or LP SmartSide; the generic category is real, but product quality varies enough that brand matters.

### Warranty and Durability

James Hardie's 30-year transferable warranty covers the substrate against manufacturing defects. Their ColorPlus factory finish carries a 15-year fade warranty. In practice, we've seen HardiePlank installations from the mid-2000s across [San Francisco](/service-areas/san-francisco) and [Berkeley](/service-areas/berkeley) that look essentially unchanged — holding color, holding dimension, showing no moisture damage at properly flashed seams.

The failure modes for fiber cement are almost entirely installation failures, not material failures: improper flashing at windows and penetrations, end cuts that aren't primed and sealed (bare cut ends absorb moisture), and butt joints without backer rod and appropriate sealant. A Hardie installation that's cut and detailed correctly is essentially a maintenance non-event. One that isn't is how you get rot at end cuts — a contractor failure, not a product failure.

One honest caveat: fiber cement is brittle and relatively heavy. It dents under direct impact more easily than wood, and at 2–3 times the weight of comparable wood boards, it requires more substantial fastening and can be awkward on complex trim profiles. It also requires paint — the factory-primed version needs a finish coat, and even the ColorPlus pre-finished version puts you on a 10–15 year repaint cycle.

### Fire Rating in WUI Zones

HardiePlank carries a Class A fire rating under ASTM E84 — the highest classification available. In California WUI zones, this matters concretely. Cal Fire's construction standards for Wildland-Urban Interface zones require ignition-resistant materials on exterior walls. Fiber cement meets that requirement. Untreated wood siding does not.

**The Class A fire rating requirement applies to all WUI-designated parcels in California.** If you're in the Marin hills, the Oakland Hills, the Berkeley Hills above Grizzly Peak, or on the Peninsula above 500 feet, verify that your siding spec meets your jurisdiction's WUI requirements before signing any contract. Your county's fire authority can confirm; so can a permit application, which will flag non-compliant material specs before work begins. Gadget Construction has completed fiber cement re-siding projects on WUI-designated homes across the Marin hills, Mill Valley, and the [Berkeley Hills](/service-areas/berkeley) — fire authority sign-off is part of our standard pre-permit process on those jobs.

### Cost: Hardie Board Installation per Square Foot

Installed fiber cement siding runs **$14–$22 per square foot**, depending on product profile, paint system, trim complexity, and substrate prep. For a 2,000 square foot exterior, budget **$28,000–$44,000** for a complete re-siding scope.

Get itemized bids that separate material from labor from substrate prep — that's the only way to compare quotes accurately. A bid that lumps everything into a single number is hiding something in the math.

### Best Used On: Versatile Across Architectural Styles

Fiber cement is the right answer for coastal homes in Pacifica and along the Sausalito waterfront where salt air makes wood maintenance intensive. It's the mandatory call for WUI homes in [Mill Valley](/service-areas/mill-valley) and the Oakland Hills where fire rating is a code requirement. It's right for midcentury ranches and tract homes getting exterior refreshes where the original wood or T1-11 has failed. It's also well-suited to contemporary new construction.

It's not the right answer where architectural authenticity demands real wood — Eichlers, Victorians, Craftsman bungalows where the grain, texture, and shadow lines of actual wood siding are part of what makes the home what it is.

---

## Wood Siding: When Tradition Is the Correct Answer

Wood siding has real weaknesses in the Bay Area climate. It also has genuine strengths that no current manufactured product fully replicates — and there are specific architectural situations where nothing else is the right call. For the **best siding options in San Francisco** Victorian and Craftsman neighborhoods, real wood still wins on period-correct projects.

### Cedar and Redwood Clapboard

Clear-grade cedar and redwood clapboard — horizontal overlapping boards — are the traditional siding for Victorian rowhouses in Alamo Square, Pacific Heights, the Mission, and Noe Valley, and for Edwardian flats in the Richmond and Cole Valley. The grain variation, the profile scale, and the paint holdout of properly maintained wood is genuinely different from fiber cement at close range.

Supply is tighter than it was. Clear-heart redwood runs $14–$22 per linear foot for 5/4 material in 2026. Cedar is more available but has compressed in quality — the kiln-dried tight-grain boards that resist cupping and splitting are a premium, not a baseline. This supply reality is one more reason some Victorian homeowners are accepting HardiePlank lap as a compromise.

### T1-11 Plywood (Eichler Siding)

T1-11 is a grooved plywood panel siding used extensively in Eichler homes — the modernist tract houses built by Joseph Eichler across Palo Alto's Green Gables, Fairmeadow, and Greenmeadow tracts; Menlo Park's Felton Gables and Willows neighborhoods; and San Jose's Fairglen and Meadows tracts. The vertical groove pattern at regular intervals is a defining visual element of Eichler's Mid-Century Modern aesthetic.

Replacing T1-11 with fiber cement panels that approximate the look is a documented mistake. The groove spacing, reveal depth, and shadow lines are proportionally specific to the design — fiber cement approximations use different proportions and the difference is visible at close range. Most Eichler owners who have tried the substitution report regretting it.

The authentic repair and replacement spec for [Eichler homes in Palo Alto](/service-areas/palo-alto) and across the Peninsula is T1-11 plywood, primed and painted with a high-quality exterior finish system. LP SmartSide T1-11 is an engineered wood version that holds paint better than standard plywood and resists moisture more effectively — it's the upgrade we recommend on Eichlers where the original material is being replaced. It keeps the architecture intact. It also applies to Eichler tracts in [Menlo Park](/service-areas/menlo-park) and [Sunnyvale](/service-areas/sunnyvale), where the same architectural requirement applies.

### Cedar Shake / Shingle

Cedar shakes and shingles are the correct spec for Berkeley brown-shingle homes throughout Elmwood, Claremont, and the Berkeley Hills; Craftsman bungalows in Rockridge and Temescal; and wooded hillside homes in [Mill Valley](/service-areas/mill-valley) and Kentfield where organic texture suits the site. Cedar shingles installed with proper felt underlayment and stainless ring-shank nails can last 25–35 years before replacement — longer in drier East Bay locations, shorter in the persistent coastal fog belt.

### Maintenance Reality

Wood siding in the Bay Area requires refinishing every 5–8 years to maintain appearance and moisture protection. In the fog belt, that interval compresses toward 5 years. Professional repainting of a wood-sided exterior runs **$3,000–$7,000** depending on home size, condition, and prep requirements. Over 20 years, that's **$12,000–$28,000** in maintenance — before factoring in any board replacement from rot or impact damage.

**Stainless fasteners are required for coastal wood siding installations.** Within roughly one mile of the bay or ocean — including [Pacifica's Linda Mar and Rockaway Beach neighborhoods](/service-areas/pacifica), the Sausalito waterfront, and the SF Sunset and Richmond — airborne salt corrodes standard galvanized nails within 8–12 years. Corroded fasteners stain siding with rust bleed-through and eventually lose structural holding power. Stainless ring-shank nails add roughly 15–20% to fastener cost and are the only correct spec in salt-air zones.

### Cost: Wood Siding Installation per Square Foot

| Wood Type | Installed Cost per Sq Ft |
|---|---|
| Cedar clapboard | $10–$16 |
| Redwood clapboard | $14–$20 |
| T1-11 plywood (standard) | $8–$12 |
| LP SmartSide T1-11 (engineered) | $11–$15 |
| Cedar shake / shingle | $14–$22 |

### Best Used On: Period-Correct Restoration

Wood is the right call when the architecture requires it. A Victorian on Alamo Square with original clapboard siding. A Craftsman bungalow in Rockridge where cedar shingles are part of the building's identity. An Eichler in Green Gables where T1-11 is the design intent, not a budget compromise. In these situations, fiber cement approximations don't fully deliver what the building requires — and the maintenance cost is worth paying to preserve the architecture. See our [project gallery](/gallery) for examples of period-correct wood siding restoration across the Bay Area.

---

## Which Siding Is Right for Your Bay Area Home?

This is the practical decision framework — organized by home type, location, and exposure. The best siding option for San Francisco homes is almost always driven by architectural context first, fire and coastal exposure second.

**Victorian and Edwardian homes (Alamo Square, Pacific Heights, Mission, Richmond, Cole Valley):** Wood clapboard for restoration-sensitive projects where original character matters. HardiePlank lap siding as a legitimate lower-maintenance alternative on non-historically-designated homes where budget is the primary constraint.

**Eichler tracts (Palo Alto Green Gables and Fairmeadow; Menlo Park Felton Gables; San Jose Fairglen):** T1-11 only — architectural integrity is non-negotiable. LP SmartSide T1-11 as the quality upgrade. See our [Eichler homes in Palo Alto](/service-areas/palo-alto) service page for specifics.

**Doelger homes and stucco ranches (Sunset, Westlake in Daly City, parts of Pacifica, St. Francis Heights):** Stucco is native to these homes and the correct re-cladding spec — provided WRB replacement is explicitly included in scope. Hardie is an option for homeowners prioritizing lower maintenance, but stucco is the architecturally correct choice. Full re-stucco on a Doelger typically runs $15,000–$35,000 with WRB included.

**WUI fire zones (Marin hills, Oakland Hills, Berkeley Hills, Peninsula hills above 500 ft):** HardiePlank or HardiePanel with Class A fire rating, without exception. [WUI fire zone homes in Marin](/service-areas/mill-valley) face the most stringent requirements in the region — consult your local fire authority for current code requirements before spec'ing any material.

**Coastal homes (Pacifica, Sausalito waterfront, SF Sunset, SF Richmond):** HardiePlank with stainless fasteners and full flashing detail at all penetrations. Salt air and the fog cycle make wood maintenance impractical on most [coastal home siding in Pacifica](/service-areas/pacifica) unless the owner is genuinely committed to a 5-year refinish schedule.

**Craftsman bungalows (Rockridge, Temescal, Berkeley Elmwood, Willow Glen):** Cedar shingle or shake for period-correct restoration. HardieShingle as a lower-maintenance alternative that approximates the profile — acceptable on homes where historical originality isn't the primary concern.

**Modern and contemporary new construction:** Any of the three systems depending on design intent. HardiePlank is the most common spec for cost-performance reasons. Stucco on contemporary designs with clean smooth-finish detailing. For new ADU construction, fiber cement is typically the spec — see our [ADU construction guide](/blog/adu-construction-san-francisco-guide) for how exterior material choice interacts with permitting.

---

## Installation Cost Comparison: Stucco vs Hardie Board vs Wood Siding

All costs reflect Bay Area labor rates and current 2026 material pricing. Installed costs include standard WRB, fasteners, and basic trim — not window replacement, painting, or structural substrate repair.

| Material | Installed Cost/Sq Ft | 20-Year Maintenance | Fire Rating | Best Architectural Fit | Bay Area Recommendation |
|---|---|---|---|---|---|
| Three-coat stucco | $7–$14 | Low (cosmetic repairs only) | Class A (system-dependent) | Spanish Revival, Mediterranean, Doelger ranch | Strong — correct architectural context only |
| HardiePlank lap siding | $14–$20 | Low (repaint at 10–15 yr) | Class A | Modern, coastal, WUI, most styles | Strongest — most versatile Bay Area option |
| HardieShingle | $16–$22 | Low (repaint at 10–15 yr) | Class A | Craftsman, shingle-style, Cape Cod | Strong — best Hardie choice for bungalows |
| Cedar clapboard | $10–$16 | High ($12K–$28K over 20 yr) | No Class A | Victorian, Edwardian, Craftsman | Conditional — period-correct restorations |
| Cedar shake / shingle | $14–$22 | High | No Class A | Craftsman, brown-shingle, hillside | Conditional — period-correct restorations |
| T1-11 / LP SmartSide | $8–$15 | Moderate (repaint every 7–10 yr) | No / Class A (LP Smart) | Eichler only | Specific — Eichler architectural requirement |
| Redwood clapboard | $14–$20 | High | No Class A | Victorian, Edwardian | Conditional — limited supply, premium cost |

For a broader look at how exterior material costs fit into a full remodel budget, see our [San Francisco home remodel cost guide](/blog/home-remodel-cost-san-francisco-2026).

---

## Frequently Asked Questions

### Is Hardie board better than stucco for Bay Area homes?

It depends on the house. HardiePlank is more forgiving of installation errors and handles coastal moisture without the crack-and-water-intrusion failure patterns that affect poorly maintained stucco. But on a Doelger home, a Spanish Revival, or any stucco-native architecture, stucco is the architecturally correct choice — and properly installed with a new WRB, it performs well for 30+ years. "Better" in the stucco vs Hardie board comparison means different things for different buildings. Neither material objectively wins every scenario.

### How much does Hardie board siding cost to install in the Bay Area?

Hardie board siding in the Bay Area runs $14–$22 per square foot installed, including standard WRB, fasteners, and basic trim. For a typical 2,000 square foot exterior, budget $28,000–$44,000 for a complete re-siding scope. The range reflects product choice (lap plank vs shingle profile), factory finish vs field paint, substrate prep required, and trim complexity. Always request itemized bids that separate material, labor, and substrate prep.

### Why do Eichler homes require T1-11 instead of fiber cement panels?

T1-11 plywood siding — with its characteristic vertical grooves at regular intervals — is a defining visual element of Eichler's Mid-Century Modern design. The groove spacing, reveal depth, and shadow lines are proportionally specific to the architecture. Fiber cement panel products that approximate the look use different proportions, and the difference is visible at close range. Most Eichler owners in Palo Alto's Green Gables and Menlo Park's Felton Gables tracts who have tried the substitution report regretting it. LP SmartSide T1-11 is the recommended quality upgrade — same look, better moisture performance.

### What happens if I install wood siding on a Pacifica or coastal home without stainless fasteners?

Standard galvanized nails corrode within 8–12 years in persistent salt air. Corroded fasteners bleed iron oxide (rust) through the paint surface in brown streaks that don't clean off. Eventually, corroded fasteners lose structural holding power — and the siding they're holding starts to fail with them. Re-siding any coastal home in Pacifica, Sausalito, or the SF Sunset with anything less than stainless or hot-dipped galvanized hardware is a maintenance and structural problem waiting to happen. Stainless ring-shank nails cost about 15–20% more than standard fasteners. They're not optional in salt-air zones.

### Do I need a permit to replace siding on my San Francisco home?

Yes, in most cases. SF DBI (the San Francisco Department of Building Inspection — the city agency that issues residential permits for structural, mechanical, and exterior work) requires a building permit for full siding replacement. Scope that includes WRB replacement, structural sheathing repair, or work on a historically designated building will trigger additional review. Permit processing at SF DBI currently runs 6–12 weeks for residential exterior work, depending on project complexity and review queue. Factor that lead time into your project schedule.

### What is the most common siding failure pattern on Bay Area homes?

Water intrusion at siding-to-trim transitions and around window openings is the most common failure pattern we see across all three material types. The cause is almost always installation detail failure — missing or undersized flashing, gaps in sealant at penetrations, or improperly lapped WRB. The material matters less than how the installation terminates at edges and openings. A correctly detailed stucco installation outperforms a poorly detailed Hardie installation every time. This is the single most important quality indicator to verify before accepting any siding bid.

### Is wood siding viable in the Bay Area fog belt, or should I always choose fiber cement?

Wood siding is viable in the fog belt on the right home with the right maintenance commitment. Cedar clapboard on a Victorian in Pacific Heights or Alamo Square is architecturally appropriate and can last 40+ years with proper refinishing every 5–7 years. The honest math: professional repainting runs $3,000–$7,000 per cycle, meaning $12,000–$28,000 over 20 years before any board replacement. For homeowners who'll keep that schedule, wood is a legitimate choice. For homeowners who won't, fiber cement is the more honest recommendation.

---

## Ready to Know What's Right for Your Home?

Choosing between stucco, Hardie board, and wood siding involves your home's architecture, fire zone designation, coastal exposure, and maintenance budget — and getting it wrong is expensive. Gadget Construction installs all three: traditional three-coat stucco, James Hardie fiber cement, and period-correct wood siding across [31 cities in the Bay Area](/service-areas).

We'll walk your home, check your fire zone and coastal designation, and give you a detailed, itemized estimate — not a range, not allowances. CA License #1132983. 12+ years. 500+ Bay Area projects. 5-year workmanship warranty in writing on every scope. Schedule a site visit through our [contact page](/contact), or learn more about our [stucco and siding repair](/services/exterior-repairs) work.
    `.trim(),
  },

  {
    slug: "foundation-underpinning-cost-san-francisco",
    featuredImage: "/images/blog-foundation-underpinning-cost-san-francisco.png",
    title: "Foundation Underpinning Cost in SF: Helical Piers vs Push Piers vs Slabjacking",
    excerpt:
      "Foundation underpinning in San Francisco typically costs $15,000 to $50,000+. The method matters more than the price. Here's how helical piers, push piers, and slabjacking compare — with real SF soil conditions in mind.",
    date: "2026-05-18",
    readingTime: "14 min read",
    relatedService: "concrete-foundations",
    faqs: [
      {
        "question": "How much does foundation underpinning cost in San Francisco?",
        "answer": "Foundation underpinning cost in San Francisco typically runs $15,000–$50,000+ for a complete project. Helical piers cost $2,500–$4,500 per pier installed; push piers cost $2,000–$3,500 per pier. Most SF homes need 8–16 piers. Add $3,000–$8,000 for engineering and $2,000–$5,000 for SF DBI permits. Total all-in cost for a mid-size SF home commonly lands between $25,000 and $55,000."
      },
      {
        "question": "What's the difference between helical piers and push piers — and which does SF need?",
        "answer": "Helical piers are rotated into the soil like a screw; push piers are hydraulically driven straight down using the building's weight as counterforce. In San Francisco, helical piers are preferred for Marina fill, bay mud, and Outer Sunset clay — soft soils where driving resistance is unreliable. Push piers work better on heavier Victorians and Edwardians with a well-defined load-bearing layer confirmed by a geotechnical report."
      },
      {
        "question": "Is slabjacking a legitimate fix for a settling SF home?",
        "answer": "Slabjacking is appropriate for settled garage slabs, driveways, and non-structural concrete — not for structural foundation failure. If your house shows sloping floors, diagonal wall cracks, or sticking doors, slabjacking won't stop the underlying soil movement. Applying it to the wrong problem delays the real fix and can add cost when the slabjacking material later needs to be removed before pier installation."
      },
      {
        "question": "Do I need a permit for foundation underpinning in San Francisco?",
        "answer": "Yes. SF DBI requires a building permit for all structural foundation underpinning work in San Francisco. Permit fees typically run $2,000–$5,000 depending on project valuation. You'll also need a geotechnical engineer's soil report and a structural engineer's underpinning design before DBI will issue the permit. Skipping engineering to save money upfront is the most common and most expensive mistake we see."
      },
      {
        "question": "How long does foundation underpinning take in San Francisco?",
        "answer": "Active construction runs 5–15 business days once permits are in hand. The permit and engineering phase — geotechnical report, structural design, DBI review — adds 6–12 weeks before any crew arrives. Homes in Historic Districts like Pacific Heights or Alamo Square should plan for an additional 4–8 weeks for architectural review. Total time from first call to project completion is commonly 3–5 months."
      },
      {
        "question": "Can I use the Brace + Bolt program instead of underpinning?",
        "answer": "The Brace + Bolt program provides grants up to $3,000 for seismic bolting and cripple wall bracing — a different intervention from underpinning. Seismic retrofitting addresses lateral earthquake movement; underpinning addresses vertical soil settlement. If your building is a pre-1989 soft-story with minor settling, check Brace + Bolt eligibility first. In some cases, the grant covers preventive work that avoids a $40,000 underpinning scope later."
      },
      {
        "question": "What SF soil conditions make foundation underpinning more expensive?",
        "answer": "Marina District and Mission Bay fill require piers 25–40 feet deep, adding shaft sections and time. Sites with documented bay mud typically cost 20–35% more than inland SF sites. Outer Sunset expansive clay requires engineering that accounts for seasonal shrink-swell cycles. Steep hillside sites in Bernal Heights or Twin Peaks add access complexity running $3,000–$8,000 in equipment and labor adders before pier count is considered."
      }
    ],
    content: `
## The Short Answer: SF Underpinning Cost Ranges

Foundation underpinning cost in San Francisco typically runs $15,000–$50,000+ depending on method, soil conditions, and how many piers your structure needs. Helical piers cost $2,500–$4,500 per pier installed. Push piers cost $2,000–$3,500 per pier. Slabjacking is far cheaper — $500–$1,500 per injection hole — but it only addresses surface-level slab settling, not structural foundation failure. Most SF homes need 8–16 piers for a full stabilization job. Permits, engineering, and site access add another 15–30% on top. Here's how to figure out which method your home actually needs — with SF soil conditions, real cost numbers, and the honest case for doing nothing more than seismic bolting right now if that's actually your situation.

---

## What Is Foundation Underpinning — And When Do You Need It?

Underpinning means adding structural support beneath an existing foundation that is failing, settling, or no longer adequate for the loads above it. You're not patching the foundation — you're extending it deeper into stable soil or bedrock so the structure stops moving.

The clearest warning signals: floors that slope noticeably when you set a marble down, diagonal cracks running from the corners of door or window frames toward the ceiling, doors and windows that stick seasonally or won't latch at all, and visible gaps between walls and ceilings that have widened over time. If you're seeing any of those, review the [5 signs your foundation needs repair](/blog/foundation-repair-signs-san-francisco) before calling anyone — it'll help you tell active movement from old cosmetic cracking.

In San Francisco specifically, these symptoms appear disproportionately in three soil situations. Marina District and Mission Bay fill is ground built on loose artificial material that consolidates over time and liquefies under seismic loading. The Outer Sunset and parts of the Richmond sit on expansive clay soils that shrink when dry and swell when wet, creating vertical movement in foundations above them. Steep hillside lots in Bernal Heights or Twin Peaks experience lateral soil movement that puts asymmetric loads on older foundations.

Underpinning is not a small project. The first question is always whether you actually need it — and that answer comes from a site visit, not a phone call.

---

## Method 1: Helical Piers — How They Work and What They Cost

### How They Work (Rotating Steel Shafts Driven to Bedrock)

Helical piers are steel shafts with screw-shaped helical plates welded along their length. A hydraulic torque motor rotates them into the ground — like a corkscrew into a wine bottle — until the plates seat in a load-bearing soil layer or bedrock. A bracket then attaches to the existing foundation, transferring the load from the failing foundation down through the pier to stable ground.

Depth varies by site. On a Marina fill site, a helical pier might go 20–35 feet before reaching adequate bearing capacity. On a Bernal Heights lot with competent bedrock near the surface, 10–15 feet can be enough. The crew monitors torque resistance as the pier advances — when torque reaches the engineer-specified threshold, they stop. That real-time confirmation is more reliable than visual inspection alone.

### Typical Use Cases in SF

Helical piers are the default recommendation for most San Francisco residential underpinning projects, for specific reasons.

**Marina District fill and bay mud:** Bay mud (a term for the highly compressible, organic-rich sediment underlying much of San Francisco Bay's filled shoreline) is soft, poorly consolidated, and prone to liquefaction under seismic loading. Helical piers can be torqued through this material to underlying bedrock or dense sand layers. Push piers struggle here because they need the structure's weight as resistance — soft soil offers an easier path than the resistance needed to confirm bearing capacity.

**Outer Sunset and Richmond expansive clay:** Clay soils shrink when dry and expand when wet, creating vertical foundation movement. Helical piers anchor below the zone of clay influence — typically 10–20 feet down — so seasonal moisture changes stop affecting the structure above.

**Tight access sites:** Helical pier installation requires only a compact hydraulic drive head and staged pier sections. They can go in through a crawl space, alongside a neighboring building, or in a narrow side yard where excavation equipment can't fit. In San Francisco's dense rowhouse blocks — attached Victorians on Alamo Square, Mission flats sharing property lines on both sides — access constraints are the norm, not the exception.

### Pros and Cons

**Pros:**
- Minimal excavation — no major digging required
- Immediately load-bearing after installation (no curing time)
- Works in tight access conditions common to SF rowhouses
- Installation torque monitoring confirms bearing capacity in real time
- Best performance in soft or unstable soils like Marina fill and Sunset clay

**Cons:**
- Higher per-pier cost than push piers
- Requires a skilled operator with proper torque equipment — not all contractors have it
- On very deep bedrock sites, shaft extension costs compound
- Not the best fit for extremely heavy structures where push pier resistance capacity is a stronger match

### Helical Pier Cost Per Pier and Total Project Cost

| Project Scale | Pier Count | Per-Pier Cost | Pier Subtotal |
|---|---|---|---|
| Localized corner repair | 4–6 piers | $2,500–$4,500 | $10,000–$27,000 |
| Mid-size home, one side | 8–10 piers | $2,500–$4,500 | $20,000–$45,000 |
| Full perimeter stabilization | 12–16 piers | $2,500–$4,500 | $30,000–$72,000 |

Engineering report and monitoring: $3,000–$8,000 depending on scope. SF DBI permit: $2,000–$5,000. **Total project cost for a typical SF home (8–12 piers, permits, and engineering): $25,000–$55,000+.**

---

## Method 2: Push Piers (Resistance Piers) — How They Work and What They Cost

### How They Work (Hydraulic Press Driven to Load-Bearing Strata)

Push piers — also called resistance piers or steel push piers — are hydraulically driven straight down through the soil using the weight of the structure above as the pushing force. Steel tube sections are added as each section advances, extending the pier incrementally until it reaches the target load-bearing stratum. A bracket attaches to the foundation footing, and hydraulic jacks lift the structure back toward its original elevation before the load transfers to the pier.

Because the house itself is the counterforce, push piers require a sufficiently heavy structure to generate adequate driving force. That's why they perform best on substantial masonry, concrete, or heavy wood-frame construction — and why they're less reliable in soft soils where the resistance calculation becomes uncertain.

### Typical Use Cases in SF

Push piers suit San Francisco's older, heavier building stock well.

**Victorian and Edwardian multi-story homes:** A three-story Victorian rowhouse in Alamo Square, Noe Valley, or the Mission carries substantial dead load — brick chimneys, heavy plaster walls, multiple floor systems. That weight is exactly what push piers need. These structures generate the driving resistance required to reliably reach bearing strata.

**Edwardian flats in the Richmond or Marina:** Edwardian flats — typically two or three units stacked with heavy floor assemblies — are strong candidates for push pier installation where site access allows excavation. The heavier the building, the more predictable the performance.

**Sites with a clear, consistent load-bearing layer:** When the geotechnical report shows a well-defined load-bearing stratum at a predictable depth, push piers are a reliable, cost-effective solution. The installation is more predictable when you know where you're going.

### Pros and Cons

**Pros:**
- Lower per-pier cost than helical, especially on heavier structures
- Well-proven on SF's older Victorian and Edwardian building stock
- Can provide controlled lift to restore settled floors closer to original elevation
- Predictable load capacity on well-defined soil profiles

**Cons:**
- Requires heavier structure to push against — unreliable on lighter buildings
- More excavation required than helical piers
- Soft soils like Marina fill can reduce driving resistance and complicate capacity verification
- More site disruption — typically requires shoring, staging space, and longer installation windows

### Push Pier Cost Per Pier and Total Project Cost

| Project Scale | Pier Count | Per-Pier Cost | Pier Subtotal |
|---|---|---|---|
| Localized repair | 4–6 piers | $2,000–$3,500 | $8,000–$21,000 |
| Mid-size home, one side | 8–10 piers | $2,000–$3,500 | $16,000–$35,000 |
| Full perimeter stabilization | 12–16 piers | $2,000–$3,500 | $24,000–$56,000 |

Engineering and permits add the same 15–30% premium as helical projects. **Total project cost for a typical Victorian or Edwardian SF home: $20,000–$50,000+**, with the lower end reflecting heavier structures where fewer piers are needed at lower per-unit cost.

---

## Method 3: Slabjacking / Mudjacking — How It Works and What It Costs

### How It Works (Polyurethane or Concrete Slurry Injection)

Slabjacking — sometimes called mudjacking — fills the void beneath a settled concrete slab by drilling small holes and injecting material under pressure until the slab rises back to grade. Traditional mudjacking uses a cement and soil slurry. Modern polyurethane foam injection (sometimes called polyjacking) uses expanding two-part foam that weighs a fraction of the slurry, cures in minutes, and requires smaller drill holes. The foam fills voids, compresses weak soil, and lifts the slab from below. A standard polyurethane injection project is typically done in a single day.

### Typical Use Cases in SF

Slabjacking addresses surface-level concrete settling — not structural foundation failure. The distinction matters, and it's the most important thing to understand about this method.

**Appropriate uses in SF:**
- Settled garage floor slabs in the Sunset or Richmond
- Sunken concrete driveways and walkways
- Cracked patio slabs that have dropped at one edge
- Non-structural interior concrete slabs that have settled unevenly

### When Slabjacking Is NOT Appropriate

If your house is settling — floors sloping, walls cracking, doors sticking — slabjacking is the wrong answer. It addresses the symptom of a sunken surface slab. It does not stop ongoing soil consolidation beneath a structural foundation.

We've seen homes in the Outer Sunset where a contractor performed slabjacking on a visibly settling garage slab without evaluating the adjacent house foundation — which had the same underlying soil problem. Two years later, the homeowner faced the full pier installation they needed from the start, plus the cost of removing the slabjacking material. Cheap and fast is not always the right call. If the garage slab is settling and the adjacent house shows diagonal wall cracks, evaluate the house foundation first — the [foundation repair signs](/blog/foundation-repair-signs-san-francisco) guide covers exactly what to look for.

### Slabjacking Cost Per Injection and Total Project Cost

| Application | Injection Holes | Per-Hole Cost | Typical Total |
|---|---|---|---|
| Small garage slab | 4–6 holes | $500–$1,000 | $2,000–$6,000 |
| Driveway or walkway | 6–10 holes | $500–$1,500 | $3,000–$12,000 |
| Large floor slab | 8–14 holes | $500–$1,500 | $4,000–$15,000 |

No engineering report is typically required for non-structural slab work. Most surface slab work doesn't require SF DBI permits, but confirm with SF DBI (the San Francisco Department of Building Inspection, the city agency that issues residential permits for structural, mechanical, and exterior work) before starting any concrete work.

---

## Which Underpinning Method Is Right for Your SF Foundation?

The method decision follows directly from what's failing and why. Here's the framework.

**Structural settlement in soft or fill soils (Marina, Sunset, Mission Bay):** Helical piers. The soil profile requires deep anchoring, and the installation method works in tight urban sites with soft ground. Push piers are less reliable where soft soil undermines driving resistance.

**Structural settlement on heavier Victorians or Edwardians with accessible perimeter:** Push piers, provided the geotechnical report confirms a clear load-bearing layer at reachable depth. Cost-per-pier is lower, and the building weight makes the method more predictable.

**Hillside lots in Bernal Heights or Twin Peaks with lateral soil movement:** Engineering evaluation first — underpinning alone may not be the complete solution if slope stabilization or drainage is also involved. Helical piers are usually the installation method, but the scope needs to account for what's driving the movement. Our [retaining walls](/services/retaining-walls) team handles the slope side of that equation when both problems are present.

**Settled garage slab, sunken driveway, or cracked patio:** Slabjacking, provided there's no evidence the house itself is moving.

**Soft-story building pre-1989:** Seismic retrofitting — bolting and cripple wall bracing — is likely the first intervention, not underpinning. Underpinning addresses vertical settlement. Seismic retrofitting addresses lateral movement during an earthquake. They're different problems with different solutions.

Our [foundation repair in San Francisco](/services/concrete-foundations) work covers all of these situations, but the engineering evaluation always comes before the method recommendation.

---

## What Drives SF Underpinning Cost Up

### Site Access (Can Equipment Reach the Foundation?)

San Francisco's residential density creates access problems other markets don't face. A Marina rowhouse with a shared property line on both sides, a six-foot side yard, and a basement entrance below grade may need compact equipment, hand-staged pier sections, and a longer installation window. Each factor adds cost. Budget $3,000–$8,000 in access-related cost adders for constrained sites — before pier count is even factored in.

### Soil Conditions (Bay Mud, Fill, Clay, Sand)

Marina District and Mission Bay fill can require piers 25–40 feet deep to reach competent bearing material. Deeper piers mean more shaft sections, more installation time, and higher cost per pier. Outer Sunset clay is shallower — typically 10–20 feet to stable material — but its expansive behavior means the engineering report needs to account for seasonal movement cycles. Sites with documented bay mud typically cost 20–35% more than inland sites with predictable soil profiles.

### Number of Piers Required

The engineering report specifies pier spacing based on foundation load distribution and soil capacity. A single-family home with localized corner settlement might need 4–6 piers. Full perimeter stabilization of a three-story Victorian typically requires 12–16 piers. Pier count is the largest single driver of total underpinning cost — and it can't be estimated without a geotechnical report.

### SF DBI Permit and Engineering Requirements

SF DBI (the San Francisco Department of Building Inspection) requires a building permit for all foundation underpinning work. Permit fees for foundation work typically run $2,000–$5,000 depending on project valuation. Beyond the permit, structural foundation work requires a licensed geotechnical engineer for the soil report and a structural engineer to design the underpinning system and specify pier placement. Engineering fees run $3,000–$8,000 for a complete scope.

Do not accept a bid from a foundation contractor who hasn't included engineering costs or who is speccing pier placement without a geotechnical report. That's not a shortcut — it's a liability. If you're navigating the permit process for the first time, our [SF foundation work](/service-areas/san-francisco) page covers what DBI requires at each stage.

### Historic District / Architectural Review

If your home is in a Historic District — Pacific Heights, Alamo Square, parts of the Mission and Noe Valley — permit review may involve additional architectural review by SF DBI's Planning Department before foundation permits are issued. This adds 4–8 weeks in some cases and may require documentation of existing conditions before work begins. Budget for the delay, not just the cost.

---

## The Real Cost of Waiting on Foundation Repair

Foundation problems don't stay the same size. A foundation that's settled two inches and is currently stable is a different problem than one that's actively moving. Active movement means the underlying cause — consolidating fill, shrinking clay, eroding sub-base — is still ongoing. Every year of delay widens the cracks, increases the floor slope, and allows water intrusion into the foundation system, which accelerates deterioration.

The version of this that hits SF homeowners hardest: pre-Loma Prieta soft-story buildings (typically 1920s–1960s multi-unit construction with open ground floors and inadequate cripple wall bracing) that have minor foundation settling right now. The settling isn't the emergency. The earthquake vulnerability is. California's [Brace + Bolt program](https://www.earthquakebracebolt.com) offers grants up to $3,000 for qualifying SF homes to fund seismic bolting and cripple wall bracing — the preventive work that keeps a manageable problem from becoming a catastrophic one. A $3,000 seismic retrofit assisted by a Brace + Bolt grant today is a realistic alternative to a $40,000 post-earthquake underpinning job in five years. Check eligibility before assuming underpinning is your only path.

For homes showing active movement rather than historical settling, the cost of waiting is more direct. Gadget Construction has handled [SF foundation work](/service-areas/san-francisco) across the Outer Sunset, Marina, and Bernal Heights where homeowners delayed acting on visible diagonal cracking for three to four years. In two of those cases, water intrusion had compromised the sill plate and lower cripple wall framing by the time we arrived — adding $8,000–$15,000 in carpentry and framing repair on top of the underpinning scope. The foundation problem was the same size. The collateral damage was not.

If a [complete remodel](/services/complete-remodel) or [ADU addition](/services/adu-construction) is already in your plans, address foundation settling before breaking ground — not after. Discovering active movement mid-project adds cost and schedule disruption that a pre-construction assessment would have avoided.

---

## Frequently Asked Questions

### How much does foundation underpinning cost in San Francisco?

Foundation underpinning cost in San Francisco typically runs $15,000–$50,000+ for a complete project. Helical piers cost $2,500–$4,500 per pier installed; push piers cost $2,000–$3,500 per pier. Most SF homes need 8–16 piers. Add $3,000–$8,000 for engineering and $2,000–$5,000 for SF DBI permits. Total all-in cost for a mid-size SF home commonly lands between $25,000 and $55,000.

### What's the difference between helical piers and push piers — and which does SF need?

Helical piers are rotated into the soil like a screw; push piers are hydraulically driven straight down using the building's weight as counterforce. In San Francisco, helical piers are preferred for Marina fill, bay mud, and Outer Sunset clay — soft soils where driving resistance is unreliable. Push piers work better on heavier Victorians and Edwardians with a well-defined load-bearing layer confirmed by a geotechnical report.

### Is slabjacking a legitimate fix for a settling SF home?

Slabjacking is appropriate for settled garage slabs, driveways, and non-structural concrete — not for structural foundation failure. If your house shows sloping floors, diagonal wall cracks, or sticking doors, slabjacking won't stop the underlying soil movement. Applying it to the wrong problem delays the real fix and can add cost when the slabjacking material later needs to be removed before pier installation.

### Do I need a permit for foundation underpinning in San Francisco?

Yes. SF DBI requires a building permit for all structural foundation underpinning work in San Francisco. Permit fees typically run $2,000–$5,000 depending on project valuation. You'll also need a geotechnical engineer's soil report and a structural engineer's underpinning design before DBI will issue the permit. Skipping engineering to save money upfront is the most common and most expensive mistake we see.

### How long does foundation underpinning take in San Francisco?

A typical SF underpinning project runs 5–15 business days of active construction once permits are in hand. The permit and engineering phase — geotechnical report, structural design, DBI review — adds 6–12 weeks before any crew shows up. If your home is in a Historic District like Pacific Heights or Alamo Square, plan for an additional 4–8 weeks for architectural review. Total time from first call to project completion is commonly 3–5 months.

### Can I use the Brace + Bolt program instead of underpinning?

The Brace + Bolt program provides grants up to $3,000 for seismic bolting and cripple wall bracing — a different intervention from underpinning. Seismic retrofitting addresses lateral earthquake movement; underpinning addresses vertical soil settlement. If your building is a pre-1989 soft-story with minor settling, check Brace + Bolt eligibility first. In some cases, the $3,000 grant covers the preventive work that avoids a $40,000 underpinning scope down the road.

### What SF soil conditions make foundation underpinning more expensive?

Marina District and Mission Bay fill — loose artificial fill and bay mud — require piers 25–40 feet deep, adding shaft sections and installation time. Sites with documented bay mud typically cost 20–35% more than inland SF sites with predictable soil profiles. Outer Sunset expansive clay is shallower but requires engineering that accounts for seasonal shrink-swell cycles. Steep hillside sites in Bernal Heights or Twin Peaks add access complexity that can run $3,000–$8,000 in equipment and labor adders before pier count is considered.

---

## Ready to Know What Your Foundation Actually Needs?

Foundation underpinning cost in San Francisco is too site-specific for a phone estimate to mean anything. Soil type, building weight, pier count, access constraints, and permit scope all vary by address — and the difference between a $15,000 helical pier job and a $55,000 full-perimeter stabilization comes down to those specifics.

Gadget Construction provides free on-site assessments with written findings — no scare tactics, no pressure. We'll tell you what's happening, which method fits your soil and structure, and what each option would cost for your specific situation. CA License #1132983. 12+ years. 500+ Bay Area projects. 5-year workmanship warranty in writing on every scope of work.

Schedule your free site assessment through our [contact page](/contact) — or explore the full range of [foundation repair in San Francisco](/services/concrete-foundations) we handle across all 31 cities we serve.
    `.trim(),
  },

  {
    slug: "composite-vs-wood-decking-bay-area-2026",
    featuredImage: "/images/blog-composite-vs-wood-decking-bay-area-2026.png",
    title: "Composite vs Wood Decking: Why Bay Area Homeowners Are Switching in 2026",
    excerpt:
      "Wood has a 30-year head start on composite. So why have most Bay Area homeowners we've worked with in 2026 chosen composite? Here's the honest breakdown — including when wood still wins.",
    date: "2026-05-11",
    readingTime: "9 min read",
    relatedService: "composite-decks",
    faqs: [
      {
        "question": "Is composite decking really cheaper than wood over time in the Bay Area?",
        "answer": "Yes — for most Bay Area locations. A 400 sq ft composite deck runs $18,000–$22,000 installed and requires roughly $200–$400 in maintenance over 20 years. The same deck in clear-grade redwood runs $14,000–$18,000 upfront but accumulates $18,000–$24,000 in maintenance and likely needs replacement before year 22 in fog-belt conditions. The composite vs wood decking 20-year total favors composite by $10,000–$18,000 in most Bay Area zip codes."
      },
      {
        "question": "How long does a composite deck last in the Bay Area's fog and salt air?",
        "answer": "Capped composite decking from Trex, TimberTech, or Fiberon carries 25–50 year fade and stain warranties depending on the product line. In coastal fog-belt neighborhoods like the SF Sunset, Pacifica's Linda Mar, or the Sausalito waterfront, composite holds up significantly better than wood — which typically shows structural failure at ledger boards and joist connections within 15–20 years under persistent moisture exposure."
      },
      {
        "question": "What are the biggest maintenance differences between a wood deck and a composite deck?",
        "answer": "Wood decks in the Bay Area require biannual professional staining and sealing — roughly $800–$1,500 per treatment — plus periodic board replacement as weathering progresses. Composite decks need soap-and-water cleaning once or twice a year, costing essentially nothing. The one exception: composite in heavily shaded locations can accumulate surface mildew that needs a dedicated deck wash and scrub — still a DIY job, not a contractor call."
      },
      {
        "question": "Does composite decking look fake compared to real wood?",
        "answer": "Modern capped composite — Trex Transcend, TimberTech Reserve, Fiberon Paramount — is convincing at normal viewing distance. It doesn't replicate the grain variation of actual clear-heart redwood up close. For period-sensitive homes like Victorian rowhouses in Alamo Square or Edwardian flats in the SF Richmond, natural wood grain can be architecturally important. For most standard Bay Area homes, composite aesthetics are not a meaningful drawback."
      },
      {
        "question": "Should I use composite or wood decking on an Eichler or midcentury home?",
        "answer": "Eichlers in Palo Alto's Green Gables tract or Fairglen in San Jose were designed around seamless indoor-outdoor living — and composite handles that well. The clean lines of capped composite in a warm gray or brown tone match midcentury aesthetics better than most homeowners expect. We'd specify Trex Transcend or Fiberon Paramount for most Eichler decks. If the home has original redwood board-and-batten siding, discuss grain matching with your contractor before committing."
      },
      {
        "question": "Can I get permits for a composite deck in San Francisco without a full plan set?",
        "answer": "Permit requirements in San Francisco are set by the SF Department of Building Inspection (DBI) and depend on deck size, height, and whether structural work is involved. Decks over 30 inches above grade or attached to the house typically require a building permit with plans. Material choice — composite vs wood — doesn't change the permit requirement. Factor 6–12 weeks for SF DBI permit processing into your project timeline."
      },
      {
        "question": "When does a wood deck actually make more financial sense than composite?",
        "answer": "Wood beats composite on upfront cost in every scenario — typically $4,000–$8,000 less installed for a 400 sq ft deck. It makes more financial sense on covered, protected patios in drier East Bay microclimates where maintenance costs are lower and the longevity gap narrows. If your budget is hard-constrained and you can't reach composite's upfront price, a pressure-treated deck is a legitimate short-term decision — just account for higher maintenance costs and earlier replacement."
      }
    ],
    content: `
## The Short Answer

Composite vs wood decking comes down to this: composite wins on maintenance, longevity, and 20-year total cost. Wood wins on upfront price and traditional aesthetics. For a 400 sq ft deck in the Bay Area fog belt, composite typically costs **less over its lifespan** than wood — even though it costs more upfront. Most Bay Area homeowners we've worked with in 2026 have chosen composite for exactly that reason. Here's the honest breakdown, including the specific situations where wood still makes the right call.

If you're still narrowing down which composite product fits your home, our [composite brand comparison](/blog/trex-vs-timbertech-vs-fiberon-bay-area-2026) covers Trex, TimberTech, and Fiberon side by side. And if you want to see what a full build costs before you decide on materials, the [composite deck cost guide for San Francisco](/blog/composite-deck-cost-san-francisco) has real numbers from 500+ local projects.

---

## Why Bay Area Homeowners Used to Choose Wood

For most of the 20th century, wood was the obvious choice for Bay Area decks — and not just because it was cheap. California redwood was abundant, locally milled, and genuinely suited to outdoor construction. It resists insects and rot naturally. It fit the architectural vernacular of the homes being built: the Craftsman bungalows in Rockridge and [Berkeley's Elmwood](/service-areas/berkeley), the ranch homes spreading across the Peninsula in the 1950s, the Eichlers in Green Gables (Palo Alto) and Fairglen (San Jose) that made outdoor living central to the floor plan. Cedar worked in similar ways — lighter in color, similarly rot-resistant, equally at home on a deck off a midcentury flat.

The cost was reasonable. The look was familiar. And for a generation of Bay Area homeowners, maintaining a wood deck — scrubbing it down in spring, applying a fresh coat of stain — was just part of the annual rhythm of owning a home.

That calculation has changed. Redwood supply has tightened significantly. In the **redwood deck vs composite** conversation, the supply side now tilts the math harder than most contractors admit. Clear-grade redwood — the knot-free, old-growth-adjacent boards that make a truly beautiful deck — is harder to source in 2026 than it was in 2006, and prices reflect it. Clear heart redwood currently runs $12–$18 per linear foot for 5/4×6 boards, versus $8–$12 five years ago. The supply constraint isn't temporary. Old-growth redwood is gone. Second-growth boards have more knots, more sapwood, and less of the natural tannin that gives redwood its durability. Cedar is more available but faces similar quality-grade compression. The "affordable, beautiful wood deck" of the 1980s is a genuinely different proposition today.

---

## The Case for Composite in 2026

### The Maintenance Reality (Wood vs Composite)

This is where the case for composite decking is most honest — and most often misrepresented. Composite isn't maintenance-free. What it is, is dramatically lower maintenance than wood.

Wood decks require annual cleaning at minimum, and biannual staining and sealing to maintain appearance and slow moisture damage. On a 400 sq ft deck in a fog-belt neighborhood — the SF Sunset, the SF Richmond, [Pacifica's](/service-areas/pacifica) Linda Mar — professional refinishing means stripping old finish, sanding, and applying two coats of a UV-protective stain. A professional job on a 400 sq ft deck runs $800–$1,500 depending on condition and access. Do that every two years for 20 years, and you've spent $8,000–$15,000 on maintenance before you've replaced a single board.

Composite decks require periodic soap-and-water cleaning — maybe once or twice a year to clear dirt, pollen, and mildew from shaded areas. The cost is essentially zero. No stripping, no sanding, no stain product, no contractor scheduling. On a fog-belt deck where moisture is constant, that difference compounds quickly.

One place composite maintenance is underestimated: mildew in shaded areas. A composite deck under heavy tree cover in Tamalpais Valley in [Mill Valley](/service-areas/mill-valley) or on a north-facing [Oakland Hills](/service-areas/oakland) lot can accumulate surface mildew that needs more aggressive cleaning — deck wash, soft brush, rinse. It's still a Saturday-morning job, not a $1,200 contractor visit. But "occasional cleaning" and "zero maintenance" aren't the same thing.

### Longevity in the Wood vs Composite Deck Debate: 20 Years vs 40+

A well-maintained redwood or cedar deck lasts 15–25 years in a protected Bay Area location. In the fog belt, that range compresses. We handle [dry rot repair at wooden decks](/services/exterior-repairs) regularly in the Sunset, Pacifica, and along the [Sausalito](/service-areas/sausalito) waterfront — and the common thread is that wood decks exposed to persistent moisture fail at the structural connections first: ledger boards, post bases, joist ends where water pools and can't drain. We find significant ledger rot on about 30% of our deck replacement projects in those neighborhoods. Most of those decks are under 20 years old.

Composite decking — specifically the capped products from Trex, TimberTech, and Fiberon — carries 25–50 year fade and stain warranties depending on the product line. The structural framing under any deck (wood or composite) still needs to be pressure-treated and properly detailed. But the decking surface doesn't deteriorate the same way. We've replaced Sunset District wood decks at year 17. We haven't replaced a capped composite deck in the fog belt due to material failure. That's not a marketing claim — it reflects the age of the product category in this market.

### Bay Area Climate Resistance

The Bay Area's climate is harder on wood than most homeowners expect when they're budgeting a project. The fog cycle — damp at night, dry in the afternoon, repeat — is particularly damaging. Wood absorbs moisture, expands, dries, contracts. Over years, that cycle checks the surface, opens grain, and creates pathways for deeper moisture penetration. UV from the afternoon sun compounds the damage.

Salt air accelerates this in coastal neighborhoods. Standard zinc hardware corrodes within 5–7 years in [Pacifica](/service-areas/pacifica) or along the [Sausalito](/service-areas/sausalito) waterfront. On wood decks, corroding fasteners stain the surface — and, worse, can structurally fail over time. Our [composite deck construction in the Bay Area](/services/composite-decks) uses stainless or hot-dipped galvanized hardware throughout, which holds up in salt-air environments where standard hardware doesn't.

Composite decking's capped polymer core sidesteps the moisture-absorption cycle entirely. The board doesn't expand and contract the same way wood does. On a west-facing Sunset deck that gets 200 fog days a year, that matters more than almost any other spec.

### Total Cost of Ownership (20-Year Math)

Here's the math most contractor websites skip. Reference project: 400 sq ft single-level deck, moderately accessible lot, mid-range materials for both options, fog-belt Bay Area location.

**Cedar deck vs composite (and redwood vs composite) — installed costs:**

*Wood (clear-grade redwood):* $14,000–$18,000 installed. Biannual professional refinishing at $1,000–$1,500 per treatment. Partial board replacement at year 8–10 as weather checking appears: $1,500–$2,500. Likely full replacement or major structural repair at year 18–22 in fog-belt conditions.

*Composite (Trex Transcend or Fiberon Paramount):* $18,000–$22,000 installed. Cleaning supplies: $50–$100/year. No staining, no sealing, no professional refinishing. No board replacement expected before year 25.

Over 20 years, the **composite or wood deck** cost question has a clear answer in the fog belt: composite costs less, even with a higher upfront price. See the full table in the next section.

---

## When Wood Still Makes Sense (We'll Say It)

Composite is the right call for most Bay Area decks in 2026. It's not the right call for every deck. Here's where wood genuinely wins.

**Period-correct restoration on Victorians and Edwardians.** If you own a Victorian rowhouse in Alamo Square, Noe Valley, or Pacific Heights, or an Edwardian flat in the Richmond or Cole Valley, composite can look out of place against original wood siding and period trim. The right call on a restoration-sensitive home is often clear-heart redwood or tight-grain Doug fir — stained to match — even knowing it requires more maintenance. Some architectural choices aren't about the 20-year spreadsheet. If you're doing a broader exterior restoration on a home like this, our [exterior repairs](/services/exterior-repairs) team can help you think through the full material spec.

**Covered patios and protected locations.** Wood's weakness is moisture. Remove persistent moisture — a covered patio under a solid roof overhang in a drier East Bay location like Rockridge or [Concord](/service-areas/concord) — and the longevity gap between wood and composite narrows significantly. A protected redwood patio in a dry inland microclimate can last 30+ years with basic maintenance. The case for spending more on composite weakens in these locations.

**Extreme budget constraints.** Pressure-treated pine decking runs $3–$6 per square foot in materials. Entry-level composite runs $9–$13. If your immediate budget is the binding constraint and you're not in a fog-belt location, a pressure-treated deck is a legitimate short-term decision. Be honest with yourself that you're front-loading savings against future maintenance and earlier replacement.

**Homeowners who genuinely enjoy the work.** This sounds like a footnote but it's real. Some homeowners like refinishing their deck in the spring. It's outdoor work, the result looks good, and the ritual has value. If maintenance is something you want to do rather than outsource, the cost calculus shifts. Composite's selling point is that you don't think about the deck. Not everyone wants that.

**Specific design requirements where real wood grain is non-negotiable.** Modern composite has gotten very good at approximating wood grain. Trex Signature, TimberTech Reserve, and Fiberon Paramount are convincing at a glance. But they're not real wood. If you're building adjacent to reclaimed barn wood or a custom furniture piece where grain matching matters, only actual wood will do.

---

## 20-Year Total Cost of Ownership Comparison

This table answers the **composite vs wood decking** cost question directly. Reference: 400 sq ft single-level deck, fog-belt Bay Area location (SF Sunset, western Richmond, [Pacifica](/service-areas/pacifica)). All costs in 2026 dollars. Composite reference product: Trex Transcend. Wood reference product: clear-grade redwood, professionally installed.

| Cost Item | Wood (Clear Redwood) | Composite (Trex Transcend) |
|---|---|---|
| Installed upfront cost | $14,000–$18,000 | $18,000–$22,000 |
| Year 1–5 maintenance | $3,000–$5,000 | $200–$400 |
| Year 5–10 maintenance | $3,000–$5,000 | $200–$400 |
| Year 10–15 maintenance | $4,000–$6,000 + partial board replacement | $200–$400 |
| Year 15–20 maintenance | $4,000–$6,000 + structural assessment | $200–$400 |
| Likely replacement year | Year 18–22 (fog belt) | Year 25–40+ |
| **20-year total (midpoint)** | **~$32,000–$42,000** | **~$19,500–$24,200** |

Wood maintenance assumes biannual professional refinishing at $800–$1,500 per application, consistent with fog-belt conditions. In a protected inland location, wood maintenance costs drop roughly 40% — but composite maintenance costs stay near zero, so the gap closes rather than reverses. At no Bay Area location does wood beat composite on 20-year total cost unless you DIY all maintenance yourself. For a deeper look at what composite installation costs before the 20-year clock starts, see our [composite deck cost breakdown for San Francisco](/blog/composite-deck-cost-san-francisco).

---

## Environmental Considerations

Neither wood nor composite has a clean ecological win. The honest answer depends on what you weight.

**The case for wood:** Wood is a renewable resource. FSC-certified (Forest Stewardship Council) redwood and cedar are harvested under managed forestry practices with chain-of-custody documentation. Wood is biodegradable — at end of life, a wood deck doesn't go to landfill indefinitely. Manufacturing a wood board uses significantly less energy than manufacturing a composite board.

The environmental problem with wood in practice: most decking-grade wood sold in the Bay Area is not FSC-certified. Ask your contractor or lumber supplier specifically for FSC-certified boards. It's available, it adds roughly 10–15% to material costs, and it's the only version of "sustainable wood decking" with third-party verification. Clear-grade redwood from unmanaged second-growth doesn't carry those protections.

**The case for composite:** Trex boards are approximately 95% recycled content — reclaimed wood fiber and recycled plastic film, primarily from grocery bags and packaging. TimberTech and Fiberon use similar recycled-content formulas. The manufacturing process is energy-intensive, and composite boards aren't biodegradable. But the 25–50 year lifespan means one composite deck replaces two or three wood decks over the same period — less raw material consumption and less manufacturing energy over time. Composite also eliminates the staining and sealing chemicals that run off from wood decks during rain events.

Neither option is clearly superior environmentally. If FSC-certified wood with no chemical maintenance is your priority, that's a legitimate position. If recycled content and reduced lifecycle replacement matters more, composite makes more sense. Most homeowners weigh these factors against performance and cost — which is honest.

---

## What We Recommend in 2026

For most Bay Area homes, composite is the right answer in the **composite vs wood decking** decision. Here's how we spec it by situation.

**Fog-belt homes in the SF Sunset, Richmond, or Pacifica:** Composite, without hesitation. TimberTech AZEK for coastal-facing decks; Trex Transcend or Fiberon Paramount for more sheltered lots. The moisture math is decisive. We wouldn't install a new wood deck on a west-facing [San Francisco](/service-areas/san-francisco) Sunset lot in 2026 and tell you it was the smart long-term choice.

**Marin hillside homes in [Mill Valley](/service-areas/mill-valley), [Tiburon](/service-areas/tiburon), or Kentfield:** Composite, specifically TimberTech Legacy or Reserve. The combination of ambient moisture, shade, and premium design expectations makes capped composite the right spec. The 50-year warranty backs the investment on a home where the deck is a significant feature.

**East Bay Craftsman homes in Rockridge, Temescal, or [Berkeley](/service-areas/berkeley) Elmwood:** Composite for most new builds and replacements, with an exception for period-sensitive restorations where matching the original architectural character matters more than minimizing maintenance.

**Peninsula homes in [Menlo Park](/service-areas/menlo-park), [Palo Alto](/service-areas/palo-alto), or [San Carlos](/service-areas/san-carlos):** Composite in most cases — Trex Transcend or Fiberon Paramount on standard lots. The Peninsula's drier summer microclimate makes wood more viable than the fog belt, but the 20-year cost math still favors composite.

**Period-correct Victorian or Edwardian homes where aesthetics are the primary constraint:** Consider wood seriously. FSC-certified clear-heart redwood, properly detailed and stained to match the home's original palette. Know what you're signing up for in maintenance, and budget accordingly. You might also want to look at our [complete remodel services](/services/complete-remodel) if the deck is part of a broader exterior project.

For the full breakdown on which composite product fits your microclimate and home type, see our [composite brand comparison](/blog/trex-vs-timbertech-vs-fiberon-bay-area-2026).

If it were our own house — a 1950s ranch home on a standard Sunset lot with a west-facing backyard — we'd install Fiberon Paramount or Trex Transcend, use stainless hidden fasteners throughout, and not think about the deck surface again for 25 years. That's what the product is designed to do, and it's what the 20-year math supports.

---

## Frequently Asked Questions

### Is composite decking really cheaper than wood over time in the Bay Area?

Yes — for most Bay Area locations. A 400 sq ft composite deck runs $18,000–$22,000 installed and requires roughly $200–$400 in maintenance over 20 years. The same deck in clear-grade redwood runs $14,000–$18,000 upfront but accumulates $18,000–$24,000 in maintenance and likely needs replacement before year 22 in fog-belt conditions. The composite vs wood decking 20-year total favors composite by $10,000–$18,000 in most Bay Area zip codes.

### How long does a composite deck last in the Bay Area's fog and salt air?

Capped composite decking from Trex, TimberTech, or Fiberon carries 25–50 year fade and stain warranties depending on the product line. In coastal fog-belt neighborhoods like the SF Sunset, Pacifica's Linda Mar, or the Sausalito waterfront, composite holds up significantly better than wood — which typically shows structural failure at ledger boards and joist connections within 15–20 years under persistent moisture exposure.

### What are the biggest maintenance differences between a wood deck and a composite deck?

Wood decks in the Bay Area require biannual professional staining and sealing — roughly $800–$1,500 per treatment — plus periodic board replacement as weathering progresses. Composite decks need soap-and-water cleaning once or twice a year, costing essentially nothing. The one exception: composite in heavily shaded locations (Oakland Hills north-facing lots, for example) can accumulate surface mildew that needs a dedicated deck wash and scrub — still a DIY job, not a contractor call.

### Does composite decking look fake compared to real wood?

Modern capped composite — Trex Transcend, TimberTech Reserve, Fiberon Paramount — has improved significantly and is convincing at normal viewing distance. That said, it doesn't replicate the grain variation of actual clear-heart redwood up close. For period-sensitive homes like Victorian rowhouses in Alamo Square or Edwardian flats in the SF Richmond, a natural wood grain can be architecturally important. For most standard Bay Area homes, composite aesthetics are not a meaningful drawback.

### Should I use composite or wood decking on an Eichler or midcentury home?

Eichlers in Palo Alto's Green Gables tract or Fairglen in San Jose were designed around seamless indoor-outdoor living — and composite handles that connection well. The clean lines of capped composite in a warm gray or brown tone match midcentury aesthetics better than many homeowners expect. We'd specify Trex Transcend or Fiberon Paramount for most Eichler decks. If the existing home has original redwood board-and-batten siding you're preserving, discuss grain matching with your contractor before committing.

### Can I get permits for a composite deck in San Francisco without a full plan set?

Permit requirements in San Francisco are set by the SF Department of Building Inspection (DBI) and depend on deck size, height, and whether structural work is involved. Decks over 30 inches above grade or attached to the house typically require a building permit with plans. Material choice — composite vs wood — doesn't change the permit requirement. Factor 6–12 weeks for SF DBI permit processing into your project timeline. Other Bay Area jurisdictions (Marin's Community Development Agency, Oakland's Planning & Building Department) have different thresholds, so confirm locally.

### When does a wood deck actually make more financial sense than composite?

Wood beats composite on upfront cost in every scenario — typically $4,000–$8,000 less installed for a 400 sq ft deck. It also makes more financial sense on covered, protected patios in drier East Bay microclimates (Concord, parts of Oakland and Berkeley) where maintenance costs are lower and the longevity gap narrows. If your budget is hard-constrained right now and you can't reach composite's upfront price, a pressure-treated deck is a legitimate short-term decision — just account for higher maintenance costs and earlier replacement in your planning.

---

## Ready to Figure Out Which Is Right for Your Deck?

The composite vs wood decking decision depends on your home's architecture, your location in the Bay Area, and how you want to use the space. There's no universal answer — but there is a right answer for your specific lot.

We'll walk your site, understand your architectural context, and give you an honest recommendation — plus fixed-price estimates for both options if you want to compare. CA License #1132983. 12+ years. 500+ Bay Area projects. 5-year workmanship warranty in writing on every build. [See how we work across our 31 Bay Area service areas](/service-areas), or [contact us](/contact) to schedule a site visit.
    `.trim(),
  },

  {
    slug: "trex-vs-timbertech-vs-fiberon-bay-area-2026",
    featuredImage: "/images/blog-trex-vs-timbertech-vs-fiberon-bay-area-2026.png",
    title: "Trex vs TimberTech vs Fiberon: Which Composite Decking Wins in Bay Area Weather (2026)",
    excerpt:
      "All three are solid composite decking brands. But Bay Area fog, salt air, and UV exposure expose different strengths. Here's how they compare — from a contractor certified in all three.",
    date: "2026-05-04",
    readingTime: "12 min read",
    relatedService: "composite-decks",
    faqs: [
      {
        "question": "Which composite decking brand is best for Bay Area fog and salt air?",
        "answer": "TimberTech AZEK is the strongest performer in Bay Area fog and coastal salt air because it's 100% PVC — there's no wood fiber in the core, so moisture absorption isn't physically possible. For homes in Pacifica, the SF Sunset, or the Sausalito waterfront, AZEK's composition gives it a genuine advantage over wood-fiber composites like Trex Transcend and Fiberon Paramount. Inland, the gap between brands narrows considerably."
      },
      {
        "question": "How much does composite decking cost installed in the Bay Area in 2026?",
        "answer": "Installed composite decking in the Bay Area typically runs $20–$50 per square foot depending on brand, product tier, and site conditions. Entry-level Fiberon or Trex Enhance lands at $20–$32/sq ft installed; TimberTech AZEK runs $34–$50/sq ft installed. A standard 300 sq ft deck falls between $15,000 and $35,000 fully installed. Hillside lots, limited access, and demolition of an existing deck all push costs higher."
      },
      {
        "question": "Is Trex still a good choice after its early rot problems?",
        "answer": "Yes — Trex's pre-2013 composite had well-documented mold and moisture issues, but the product was reformulated with full capping and the problem has been resolved. Post-2015 Trex Transcend installed on fog-exposed lots in the SF Sunset has held up without the surface mold issues seen in the older generation. The 25-year warranty is shorter than competitors, but the product itself is no longer the liability it once was."
      },
      {
        "question": "What's the difference between capped composite and 100% PVC decking?",
        "answer": "Capped composite decking (like Trex Transcend and Fiberon Paramount) has a wood-fiber and recycled plastic core wrapped in a protective polymer shell. 100% PVC decking, like TimberTech AZEK, has no wood fiber at all — the entire board is cellular PVC. The practical difference is moisture: capped composite cores can still absorb some water if the cap is compromised, while PVC cores cannot. In the Bay Area fog belt, that distinction drives our coastal recommendations."
      },
      {
        "question": "Does composite decking require permits in San Francisco?",
        "answer": "Yes. A new composite deck in San Francisco requires a permit through the SF Department of Building Inspection (DBI). Permit requirements vary by deck size, height above grade, and whether structural work is involved. Marin County projects go through the Marin Community Development Agency (CDA). Most Bay Area jurisdictions require permits for decks over 200 sq ft or elevated more than 30 inches above grade — your contractor should pull the permit, not you."
      },
      {
        "question": "How do Fiberon's warranties compare to Trex and TimberTech?",
        "answer": "Fiberon's Better and Best tier products (Concordia and Paramount) carry a 50-year fade and stain warranty — matching TimberTech Legacy, Reserve, and AZEK, and outrunning Trex's 25-year coverage on all lines. Trex Enhance, Select, Transcend, and Signature are all 25-year warranties. If warranty length is a priority and your budget doesn't reach TimberTech AZEK, Fiberon Paramount offers the best warranty-to-price ratio in this comparison."
      },
      {
        "question": "Can I install composite decking myself, or do I need a certified contractor?",
        "answer": "All three manufacturers — Trex, TimberTech, and Fiberon — require installation per their current guidelines to maintain warranty coverage. Incorrect ventilation gaps, wrong fastener specs, or improper end gapping can void the warranty and create drainage problems. TimberTech AZEK is particularly contractor-sensitive due to its weight and PVC expansion behavior. DIY installation is physically possible, but a failed warranty claim on a $30,000+ deck is an expensive lesson."
      }
    ],
    content: `
## The Short Answer: Which Wins in Fog and Salt Air

When comparing Trex vs TimberTech vs Fiberon for Bay Area homes, the answer depends almost entirely on where your deck sits. TimberTech AZEK leads for coastal moisture resistance — it's 100% PVC with zero wood fiber, so water absorption isn't physically possible. Trex Transcend is the safest all-around pick for inland and fog-adjacent lots. Fiberon Paramount is the value play that genuinely outperforms its price tier and matches TimberTech's 50-year fade warranty at a lower installed cost. We're certified installers for all three brands and carry no allegiance to any of them — this comparison is based on what we've actually seen fail, hold up, and surprise us across [500+ Bay Area composite deck installations](/services/composite-decks).

If you want the full cost picture before you choose a brand, our [full composite deck cost breakdown](/blog/composite-deck-cost-san-francisco) covers how lot conditions, access, and permits drive the final number. But if your question right now is "which brand for my specific home," keep reading.

## What These Three Brands Have in Common

All three brands — Trex, TimberTech, and Fiberon — share the same core advantages over pressure-treated wood, and over the cheap composite boards you'll find at big-box stores without asking many questions.

All three use recycled materials (sawdust, reclaimed wood fiber, recycled plastic) in most of their product lines. All three offer **capped composite construction** on their mid- and upper-tier lines — meaning the composite core is wrapped in a protective polymer shell that resists moisture, UV, and staining. All three carry fade and stain warranties of 25–50 years depending on the product line. All three come in tiered product families (roughly good/better/best), which is why brand name alone doesn't tell you what you're actually buying. And all three require proper hidden fasteners on their premium grooved-edge profiles to achieve the clean, seamless look that makes composite decking worth the investment.

These shared characteristics are what set this composite deck brand comparison apart from the real question: which product fits your specific Bay Area microclimate. The differences that matter — particularly in fog belt and coastal conditions — show up in core composition, warranty terms, pricing, and how each product holds up under repeated fog-cycle moisture and salt air. That's where the comparison gets real.

## Trex Composite Decking: The Market Leader

Trex is the brand most Bay Area homeowners have already heard of. It's the largest composite decking manufacturer in the world, with the name recognition to match. But name recognition isn't the same as best-fit for your specific lot and microclimate — and in the [SF Sunset, Pacifica](/service-areas/pacifica), and [Sausalito waterfront](/service-areas/sausalito), that distinction matters more than anywhere else.

### Product Lines: Enhance, Select, Transcend, Signature

Trex runs four main product lines relevant to Bay Area residential projects:

**Trex Enhance** is the entry-level line. It's a capped wood-plastic composite with a 25-year fade and stain warranty. Grooved boards are available for hidden fasteners, or you can use square-edge boards with face screws. This is the right choice for a budget-conscious project on a flat, inland lot — think a 300 sq ft deck in a sheltered Rockridge backyard or a covered patio in Willow Glen. It's not what we'd spec for a west-facing Sunset deck.

**Trex Select** sits between Enhance and Transcend. It's a solid, unremarkable mid-range performer. In practice, most homeowners who weigh Select versus Transcend end up at Transcend.

**Trex Transcend** is our most-recommended Trex product for Bay Area homes. It has a more durable capping system than Enhance, better scratch resistance, deeper color options with wood-grain profiles that hold up visually after years of fog exposure, and the same 25-year fade and stain warranty. This is the product that defines Trex's market position.

**Trex Signature** is the premium hardwood-look line — deep tones, dramatic grain patterns, and a price point to match. It's what we spec when a homeowner in Pacific Heights or Noe Valley wants a composite deck that doesn't read as composite from the back door.

### Warranty Terms and What They Actually Cover

Trex's 25-year fade and stain warranty covers fading beyond a certain color-shift threshold (measured in Delta E units) and stains that can't be removed per Trex's cleaning protocol. What it doesn't cover: surface scratches, mold on inadequately ventilated decks, damage from improper installation, and anything caused by standing water from poor drainage.

The "25 years" is the headline. The fine print matters. Trex requires the decking to be installed per their current installation guidelines — ventilation gaps, fastener specs, gapping for drainage — or the warranty is voided. We've seen DIY-installed Trex decks fail warranty claims because the ventilation gaps were wrong. Installation matters as much as the product itself.

### Installed Cost per Square Foot in the Bay Area

| Trex Line | Material Cost | Installed Cost (Bay Area) |
|---|---|---|
| Enhance | $10–$13/sq ft | $22–$32/sq ft |
| Select | $12–$15/sq ft | $25–$35/sq ft |
| Transcend | $14–$18/sq ft | $28–$40/sq ft |
| Signature | $18–$24/sq ft | $34–$48/sq ft |

Installed cost reflects Bay Area labor, permit costs, and standard framing on a moderate-access lot. Hillside lots, crane lifts, and demolition of an existing deck all push the number higher. Our [full composite deck cost breakdown](/blog/composite-deck-cost-san-francisco) covers how those site variables compound across the [31 cities we serve](/service-areas).

### Bay Area Performance: Strengths and Weaknesses

**The elephant in the room: the pre-2013 rot issue.** Early-generation Trex (pre-2010 to 2013) used an uncapped composite formula that was vulnerable to mold, mildew, and surface deterioration under persistent moisture. If you've heard a neighbor dismiss Trex, this is almost always why. That product is a different animal from what Trex sells today. Current Trex lines use capped composite construction that substantially eliminated the moisture problem. We've installed post-2015 Trex Transcend on foggy Sunset lots and haven't seen the surface mold issues that plagued the older generation.

That said, Trex's 25-year warranty is shorter than TimberTech and Fiberon's 50-year coverage — and in the fog belt, that gap matters. Trex Transcend performs well on most Bay Area lots. It's not our first pick for homes directly in the coastal moisture corridor — Pacifica's Linda Mar and Rockaway Beach neighborhoods, the western edge of the SF Richmond, the [Sausalito waterfront](/service-areas/sausalito) — but it holds up solidly in the [East Bay](/service-areas/oakland), the Peninsula, and inland SF neighborhoods.

## TimberTech: Premium Cap-Stock and PVC

TimberTech occupies the premium tier of the composite decking market, and the AZEK line — 100% PVC, no wood fiber at all — is the most moisture-resistant composite decking product available for Bay Area residential projects. If your deck is coastal, west-facing, or in persistent fog, this is the product conversation you should be having. It's also where the Trex vs TimberTech debate gets its clearest answer for coastal homeowners.

### Product Lines: Edge, Reserve, Legacy, AZEK (100% PVC)

**TimberTech Edge** is the entry-level line — a capped composite with a 25-year fade warranty. It's a competent product at a competitive price, but it's not the reason most contractors specify TimberTech.

**TimberTech Legacy** is the mid-range capped composite line and a solid performer. The 50-year fade and stain warranty starts here. We've spec'd Legacy on projects in [Marin County](/service-areas/mill-valley) and the [East Bay hills](/service-areas/berkeley) where the homeowner needed durability without the full AZEK price premium.

**TimberTech Reserve** is the upper-tier cap-stock composite — premium appearance, 50-year warranty, rich color palette. This is the spec for high-end projects where visual quality and longevity both matter: a [Kentfield](/service-areas/san-rafael) deck overlooking a canyon, a [Tiburon](/service-areas/tiburon) waterfront terrace.

**TimberTech AZEK** is in a different category entirely. It's not a wood-plastic composite — it's 100% cellular PVC. There's no wood fiber in the core, which means no moisture absorption is physically possible. In a fog-belt environment, that matters more than any other spec on this comparison sheet. AZEK also carries the industry's best warranty: 50 years on fade and stain, 30 years on the product itself. It's heavier than Trex, which means more care in handling and a more experienced installer — but the performance in coastal conditions is unmatched.

### Warranty Terms

TimberTech's 50-year fade and stain warranty (on Legacy, Reserve, and AZEK) is the strongest in the industry. Like Trex, the warranty requires proper installation per current TimberTech guidelines. Unlike Trex, AZEK's core composition means the warranty isn't fighting the material's natural tendencies in wet environments — the material simply doesn't absorb water.

One nuance: AZEK can expand and contract more than composite products in temperature swings. Bay Area temperatures are mild enough that this isn't the same issue as in Chicago winters, but proper gapping at board ends is still important on every AZEK install we do.

### Installed Cost per Square Foot

| TimberTech Line | Material Cost | Installed Cost (Bay Area) |
|---|---|---|
| Edge | $12–$15/sq ft | $25–$35/sq ft |
| Legacy | $14–$18/sq ft | $28–$40/sq ft |
| Reserve | $16–$22/sq ft | $32–$46/sq ft |
| AZEK (PVC) | $18–$26/sq ft | $34–$50/sq ft |

AZEK is the most expensive product on this list. On a 400 sq ft deck in [Pacifica](/service-areas/pacifica), the material premium over Trex Transcend runs $3,000–$5,000. Against a 50-year warranty and zero moisture vulnerability, that premium is easy to justify. Against a tight budget on an inland lot, it's less obvious. See our [composite deck cost breakdown](/blog/composite-deck-cost-san-francisco) to model the full number for your lot size and conditions.

### Bay Area Performance

TimberTech AZEK is what we spec first for any home in the coastal moisture corridor: [Pacifica](/service-areas/pacifica) (Rockaway Beach, Linda Mar), the SF Sunset, the SF Richmond, and the [Sausalito waterfront](/service-areas/sausalito). We've watched standard composite boards on west-facing Sunset decks show surface texture changes within 8–10 years. We haven't seen that with AZEK.

TimberTech Reserve and Legacy are our preferred specs for [Marin](/service-areas/mill-valley) hillside projects — Tamalpais Valley in Mill Valley, [Kentfield](/service-areas/san-rafael), [Fairfax](/service-areas/fairfax) — where the combination of shade, ambient moisture, and premium design expectations makes the 50-year capped composite the right call. TimberTech's heavier weight does require a well-organized crew and proper blocking at cut ends. This isn't a product where installation shortcuts hold up.

## Fiberon: The Underdog Value Play in This Composite Deck Brand Comparison

Fiberon doesn't have Trex's name recognition or TimberTech's premium positioning. What it does have is a legitimate 50-year fade and stain warranty at a price point that competes with Trex Transcend — making it the best composite decking value option that's genuinely hard to dismiss once you look at the specs.

### Product Lines: Good, Better, Best Tiers

Fiberon's line structure is less brand-forward than Trex or TimberTech, but the tier logic is straightforward.

**Fiberon Good tier (Sanctuary, Horizon)** is the entry-level offering: capped composite, grooved-edge option available, solid at the price point. At $9–$12/sq ft in materials, it's the most affordable capped composite on this comparison list.

**Fiberon Better tier (Concordia, Pro Tect Advantage)** is the mid-range line and our most-recommended Fiberon product for price-sensitive Bay Area projects. The 50-year fade and stain warranty kicks in at this tier, and the capping quality is noticeably better than the Good tier. Concordia holds up well in the [East Bay](/service-areas/oakland) and across the [Peninsula](/service-areas/san-carlos).

**Fiberon Best tier (Paramount)** is the premium line — 50-year warranty, excellent capping, the closest Fiberon gets to TimberTech Reserve in visual quality. At $16–$20/sq ft in materials, it lands below TimberTech Reserve and competes directly with Trex Transcend on price while matching TimberTech's 50-year coverage. An outer Sunset Fiberon Paramount deck we completed — 450 sq ft with a pergola, $39,000 total — is a project we'd spec the same way again. You can see how that compares to typical project ranges in [our recent deck projects](/gallery).

### Warranty Terms

Fiberon matches TimberTech's 50-year fade and stain warranty on its Better and Best tier products. Coverage terms are similar to the other manufacturers — installation per Fiberon guidelines is required, and scratches, damage from improper cleaning, and drainage-related issues are excluded.

One practical note: Fiberon products are available through most Bay Area lumber distributors. Lead times have generally been shorter than TimberTech AZEK over the past two years, which matters when you're trying to hit a permit window.

### Installed Cost per Square Foot

| Fiberon Line | Material Cost | Installed Cost (Bay Area) |
|---|---|---|
| Good Tier (Sanctuary/Horizon) | $9–$12/sq ft | $20–$30/sq ft |
| Better Tier (Concordia) | $12–$16/sq ft | $25–$36/sq ft |
| Best Tier (Paramount) | $16–$20/sq ft | $30–$42/sq ft |

For a homeowner who wants 50-year warranty coverage without the TimberTech AZEK price premium, Fiberon Paramount is the most honest recommendation on this list. It's not the flashiest product, and Fiberon's marketing doesn't have Trex's reach — but the specs and the field performance hold up.

### Bay Area Performance

Fiberon's capped composite products perform well across the Bay Area's inland and moderate-climate zones — the [East Bay hills](/service-areas/berkeley), [Marin inland](/service-areas/fairfax) (Fairfax, San Anselmo), and the [Peninsula](/service-areas/menlo-park). In direct coastal exposure, we still favor AZEK's 100% PVC core over Fiberon's wood-composite core. But the capping on Paramount is strong enough that it's a legitimate choice for all but the most aggressively fog-saturated lots.

We've used Fiberon Paramount on decks in [Berkeley](/service-areas/berkeley), Rockridge, and Willow Glen without issues. We've also used it on west-facing [Peninsula](/service-areas/palo-alto) lots where the homeowner needed the 50-year warranty but couldn't stretch to AZEK pricing. It's delivered in both contexts.

What Fiberon doesn't have is the contractor ecosystem that Trex and TimberTech have built. Fewer certified installers in the Bay Area means it's more important to vet your contractor's specific Fiberon experience before committing. This is also relevant when you're evaluating exterior conditions — dry rot and failing substrates under an old deck can complicate any composite installation, which is why we always inspect the framing before speccing a product. Our [exterior repairs](/services/exterior-repairs) work frequently uncovers framing issues that need to be addressed before new decking goes down.

## Side-by-Side Comparison: Trex vs TimberTech vs Fiberon

This table covers every product line in the Trex vs TimberTech vs Fiberon comparison, with installed costs based on Bay Area labor rates and standard lot conditions.

| Brand / Line | Installed Cost (Bay Area) | Fade Warranty | Moisture Resistance | Scratch Resistance | Bay Area Recommendation |
|---|---|---|---|---|---|
| Trex Enhance | $22–$32/sq ft | 25 years | Moderate | Moderate | Inland budget builds |
| Trex Transcend | $28–$40/sq ft | 25 years | Good | Good | Most SF inland neighborhoods |
| Trex Signature | $34–$48/sq ft | 25 years | Good | Very Good | Premium inland / East Bay |
| TimberTech Edge | $25–$35/sq ft | 25 years | Good | Good | Budget TimberTech entry |
| TimberTech Legacy | $28–$40/sq ft | 50 years | Very Good | Good | Marin hillside, East Bay |
| TimberTech Reserve | $32–$46/sq ft | 50 years | Very Good | Very Good | Premium mid-coast |
| TimberTech AZEK | $34–$50/sq ft | 50 years | Excellent (100% PVC) | Very Good | Coastal, fog belt, Pacifica |
| Fiberon Good Tier | $20–$30/sq ft | 25 years | Moderate | Moderate | Budget entry, inland only |
| Fiberon Concordia | $25–$36/sq ft | 50 years | Good | Good | Value play, inland/East Bay |
| Fiberon Paramount | $30–$42/sq ft | 50 years | Very Good | Very Good | Value premium, fog-adjacent |

The installed cost ranges assume a moderately accessible lot with standard framing. A hillside site in [Mill Valley](/service-areas/mill-valley) or a [San Francisco](/service-areas/san-francisco) rooftop deck with crane access will push every line higher — see the [full composite deck cost breakdown](/blog/composite-deck-cost-san-francisco) for how those conditions add up.

## Our Real Recommendation for Bay Area Homes

Here's how we actually spec this decision, depending on where your home sits and what your priorities are. This isn't a brand preference — it's a site-condition matrix based on 12+ years of [Bay Area composite deck installation](/services/composite-decks).

**Coastal and fog-belt homes → TimberTech AZEK.** If your deck is in [Pacifica's](/service-areas/pacifica) Linda Mar or Rockaway Beach neighborhoods, on the western edge of the SF Sunset or Richmond, or on the [Sausalito waterfront](/service-areas/sausalito), AZEK's 100% PVC composition is the right call. The moisture advantage isn't theoretical — wood-fiber composite boards in these environments work harder for every year of their warranty. AZEK sidesteps that entirely. The price premium is real; so is the performance difference.

**Inland Bay Area homes, strong all-around choice → Trex Transcend.** For [East Bay](/service-areas/oakland) homes in Rockridge, Temescal, or the [Berkeley](/service-areas/berkeley) Elmwood, [Peninsula](/service-areas/menlo-park) homes in Menlo Park and [Palo Alto](/service-areas/palo-alto), or inland SF neighborhoods like Noe Valley and Glen Park, Trex Transcend is our default recommendation. It's the most widely supported product by Bay Area contractors, the easiest to source, and the capping system has been solid since the post-2013 reformulation. The 25-year warranty is shorter than the competition — but for an inland lot away from salt air, that gap matters less in practice.

**Budget-conscious but serious about longevity → Fiberon Paramount.** If you want 50-year warranty coverage and your project budget doesn't reach AZEK pricing, Fiberon Paramount is where we'd land. It's not a compromise — it's an honest value decision. The capping quality is strong, the warranty matches TimberTech's, and it's available through Bay Area distributors without the lead-time issues that AZEK sometimes carries. We'd recommend it over Trex Transcend for any budget-constrained project where warranty term is a priority.

**Shade-heavy or canyon homes → Trex Transcend or TimberTech Legacy.** Decks under heavy tree canopy or in shaded canyon lots — Tamalpais Valley in [Mill Valley](/service-areas/mill-valley), parts of the [Oakland Hills](/service-areas/oakland) — face less UV stress but more ambient moisture. Both Trex Transcend and TimberTech Legacy handle this well. TimberTech Legacy gets a slight edge for its 50-year warranty in high-moisture-but-not-coastal conditions.

**Premium / high-visibility projects → TimberTech Reserve.** For a Pacific Heights terrace or a [Tiburon](/service-areas/tiburon) deck where visual quality is as important as durability, TimberTech Reserve is the spec. It's the closest thing to a premium hardwood aesthetic in capped composite, and the 50-year warranty holds up the investment. If you're also considering a broader [complete remodel](/services/complete-remodel) that includes outdoor living space, the Reserve and AZEK lines integrate well with high-end interior finishes.

We're certified installers for all three brands. You can see examples of each product in context across different Bay Area microclimates in [our recent deck projects](/gallery). The honest summary: all three brands are legitimate. None of them is the right answer for every project. The question is always which product fits your specific lot, microclimate, and budget — not which brand has the better marketing.

## Frequently Asked Questions

### Which composite decking brand is best for Bay Area fog and salt air?

TimberTech AZEK is the strongest performer in Bay Area fog and coastal salt air because it's 100% PVC — there's no wood fiber in the core, so moisture absorption isn't physically possible. For homes in Pacifica, the SF Sunset, or the Sausalito waterfront, AZEK's composition gives it a genuine advantage over wood-fiber composites like Trex Transcend and Fiberon Paramount. Inland, the gap between brands narrows considerably.

### How much does composite decking cost installed in the Bay Area in 2026?

Installed composite decking in the Bay Area typically runs $20–$50 per square foot depending on brand, product tier, and site conditions. Entry-level Fiberon or Trex Enhance lands at $20–$32/sq ft installed; TimberTech AZEK runs $34–$50/sq ft installed. A standard 300 sq ft deck falls between $15,000 and $35,000 fully installed. Hillside lots, limited access, and demolition of an existing deck all push costs higher.

### Is Trex still a good choice after its early rot problems?

Yes — Trex's pre-2013 composite had well-documented mold and moisture issues, but the product was reformulated with full capping and the problem has been resolved. Post-2015 Trex Transcend installed on fog-exposed lots in the SF Sunset has held up without the surface mold issues seen in the older generation. The 25-year warranty is shorter than competitors, but the product itself is no longer the liability it once was.

### What's the difference between capped composite and 100% PVC decking?

Capped composite decking (like Trex Transcend and Fiberon Paramount) has a wood-fiber and recycled plastic core wrapped in a protective polymer shell. 100% PVC decking, like TimberTech AZEK, has no wood fiber at all — the entire board is cellular PVC. The practical difference is moisture: capped composite cores can still absorb some water if the cap is compromised, while PVC cores cannot. In the Bay Area fog belt, that distinction drives our coastal recommendations.

### Does composite decking require permits in San Francisco?

Yes. A new composite deck in San Francisco requires a permit through the SF Department of Building Inspection (DBI). Permit requirements vary by deck size, height above grade, and whether structural work is involved. Marin County projects go through the Marin Community Development Agency (CDA). Most Bay Area jurisdictions require permits for decks over 200 sq ft or elevated more than 30 inches above grade — your contractor should pull the permit, not you.

### How do Fiberon's warranties compare to Trex and TimberTech?

Fiberon's Better and Best tier products (Concordia and Paramount) carry a 50-year fade and stain warranty — matching TimberTech Legacy, Reserve, and AZEK, and outrunning Trex's 25-year coverage on all lines. Trex Enhance, Select, Transcend, and Signature are all 25-year warranties. If warranty length is a priority and your budget doesn't reach TimberTech AZEK, Fiberon Paramount offers the best warranty-to-price ratio in this comparison.

### Can I install composite decking myself, or do I need a certified contractor?

All three manufacturers — Trex, TimberTech, and Fiberon — require installation per their current guidelines to maintain warranty coverage. Incorrect ventilation gaps, wrong fastener specs, or improper end gapping can void the warranty and create drainage problems. TimberTech AZEK is particularly contractor-sensitive due to its weight and PVC expansion behavior. DIY installation is physically possible, but a failed warranty claim on a $30,000+ deck is an expensive lesson.

## Ready to Get the Right Product for Your Deck?

Comparing Trex vs TimberTech vs Fiberon for your specific project? We're certified installers for all three brands across [31 Bay Area cities](/service-areas). We'll walk your site, assess your exposure conditions — fog corridor, shade, slope, salt air — and recommend what's actually right for your deck, not what's easiest for us to source.

We provide detailed, line-item estimates after a free site visit — with the specific product, product line, and installed cost spelled out before any work begins. No allowances, no vague "composite decking TBD." CA License #1132983. 12+ years. 500+ Bay Area projects. 5-year workmanship warranty in writing on every build.
    `.trim(),
  },

  {
    slug: "composite-deck-cost-san-francisco",
    featuredImage: "/images/blog-composite-deck-cost-san-francisco.png",
    title: "Composite Deck Cost in San Francisco: Real 2026 Numbers from 500+ Bay Area Projects",
    excerpt:
      "Composite decks in San Francisco typically run $15,000 to $60,000+. Here's what actually drives the range — with pricing from 500+ Bay Area projects, not national averages.",
    date: "2026-04-27",
    readingTime: "10 min read",
    relatedService: "composite-decks",
    faqs: [
      {
        "question": "How much does a composite deck cost in San Francisco in 2026?",
        "answer": "Composite deck cost in San Francisco runs $15,000–$60,000+ for most residential projects. A standard 300 sq ft single-level deck typically lands at $15,000–$35,000 installed. Multi-level hillside builds in neighborhoods like Bernal Heights or Twin Peaks push to $35,000–$60,000+. SF pricing runs 25–40% above national averages due to permits, steep lots, and access challenges."
      },
      {
        "question": "Does a composite deck in SF require a permit from DBI?",
        "answer": "Yes — any deck more than 30 inches above grade in San Francisco requires a building permit from SF DBI (San Francisco Department of Building Inspection). Permit and plan-check fees typically add $1,500–$4,500 to your total project cost. Decks at or below 30 inches may be exempt from a permit, but setback and HOA rules still apply regardless of height."
      },
      {
        "question": "How does Trex compare to TimberTech AZEK for a San Francisco deck?",
        "answer": "Trex Transcend ($14–$18/sq ft installed) is a solid choice for most SF neighborhoods, with a 25-year fade warranty. TimberTech AZEK ($18–$22/sq ft) carries a 50-year warranty and a polymer-capped core that outperforms in high-moisture environments — making it a better fit for fog-belt locations like the Sunset, Richmond, or coastal Pacifica. The $4–$6/sq ft premium is worth it if your deck faces west or sits in persistent fog."
      },
      {
        "question": "What hidden costs should I budget for when replacing a deck on an older SF home?",
        "answer": "The most common hidden costs on SF deck replacements are dry rot at the ledger board ($800–$4,000), undersized original footings ($1,200–$3,500), and inadequate drainage under the deck ($500–$2,000). Pre-1960 Doelger homes in the Sunset and Victorian-era homes in Noe Valley are especially prone to ledger rot from decades of flashing failures. Budget a 10% contingency on top of your base estimate."
      },
      {
        "question": "How long does it take to build a composite deck in San Francisco?",
        "answer": "A standard 300 sq ft composite deck in SF takes 3–5 weeks from permit to final inspection. Multi-level hillside decks run 5–8 weeks, largely because helical piers, structural engineering review, and SF DBI permit processing add time before framing can begin. DBI plan check alone typically takes 4–8 weeks for a straightforward over-the-counter permit."
      },
      {
        "question": "Can I add a pergola to my composite deck, and how much does it add to the cost?",
        "answer": "Yes — an attached pergola adds $8,000–$14,000 to a composite deck project; a freestanding pergola adds $10,000–$18,000 (it requires its own footings). A 450 sq ft Fiberon Paramount deck with an attached aluminum pergola and LED lighting in the outer Sunset runs approximately $39,000 total. A pergola that carries any structural load may also require its own DBI permit review."
      },
      {
        "question": "What should I look for in a composite deck contractor in the Bay Area?",
        "answer": "Look for a licensed Class B contractor with a verifiable CA license number (check at the CSLB website), experience with SF DBI permits, and a written workmanship warranty — not just the manufacturer's material warranty. Ask for itemized bids with specific product names, not 'composite decking — allowance.' Any bid that omits demolition cost, permit fees, or electrical should be questioned."
      }
    ],
    content: `
## The Short Answer: What Composite Decks Cost in San Francisco

Composite deck cost in San Francisco typically runs $15,000–$60,000+ depending on size, site conditions, and materials. Most mid-sized decks (around 300 sq ft) fall between $15,000 and $35,000 fully installed. Multi-level hillside builds and decks with pergolas push higher. Here's what actually drives the range — with pricing from [500+ Bay Area projects](/about), not national averages.

SF composite deck pricing runs 25–40% above national averages. Steep lots, SF DBI (San Francisco Department of Building Inspection) permits, and the coastal fog and salt air that shorten the life of inferior materials all push costs up. Those aren't excuses — they're the reality of building outdoors in this city. If you've gotten a quote that looks suspiciously low, keep reading.

## Price Ranges by Project Type

These ranges reflect real installed costs from [composite deck construction](/services/composite-decks) projects across SF's neighborhoods — not numbers pulled from a national cost database. Every figure below comes from permitted, licensed work across [31 Bay Area cities](/service-areas).

### Standard 300 sq ft Deck ($15,000–$35,000)

A standard single-level deck is the most common composite deck project in San Francisco. This scope covers a single-level deck off the rear of the home, ground-level or minimally elevated, with composite decking, pressure-treated framing, and cable or aluminum railings.

At the lower end ($15,000–$20,000), you're getting Trex Enhance or a comparable entry-level composite, standard pressure-treated posts and beams, and basic railing. At the upper end ($28,000–$35,000), you're stepping into Trex Transcend or TimberTech AZEK, hidden fasteners, powder-coated aluminum railings, and a more complex shape — maybe an angled corner or bump-out. Typical timeline: 3–5 weeks from permit to final inspection.

In flat-lot Noe Valley, where rear yards are compact but level, a 300 sq ft Trex Enhance deck runs about $18,000–$24,000 installed. The lot is easy to work, access isn't a problem, and the footing depth required by SF's soils is predictable. Compare that to a similarly-sized deck on a sloped lot in [San Francisco's hillier neighborhoods](/service-areas/san-francisco) — the same square footage can cost $8,000–$12,000 more.

### Multi-Level Hillside Deck ($35,000–$60,000+)

Multi-level hillside decks are the most structurally complex composite deck projects in San Francisco. Twin Peaks, Bernal Heights, and the outer Sunset all have one thing in common: your backyard doesn't cooperate. Hillside decks require deeper footings, more structural steel or engineered lumber, longer post runs, and significantly more labor to frame safely.

A two-level deck on a 20% grade typically adds $10,000–$20,000 to what the same square footage would cost on flat ground. At 400–600 sq ft of total deck surface across two levels, you're looking at $38,000–$60,000+ installed. That range includes TimberTech or Fiberon decking, composite or aluminum railings on all open sides, and the structural engineering letter that SF DBI requires for elevated decks on hillside lots.

Timeline for multi-level hillside builds: 5–8 weeks. Footings alone can take a week when crews are working on a steep slope with limited equipment access. [Retaining walls](/services/retaining-walls) are sometimes part of this scope when the grade beneath the deck needs stabilization before framing can begin.

### Deck with Pergola and Lighting ($25,000–$50,000)

Adding a pergola and lighting to a composite deck typically costs $10,000–$23,000 more than the base deck alone. A pergola (a freestanding or attached overhead structure providing partial shade) adds $8,000–$18,000 to a standard deck depending on size, material, and whether it's carrying any load. Add LED recessed lighting in the decking boards and step lights, and you're adding another $2,000–$5,000 for materials and a licensed electrician.

A 450 sq ft deck with an attached pergola and LED lighting in the Sunset — where fog makes the outdoor season shorter and homeowners want every usable hour — runs $35,000–$50,000. The fog belt also makes material choice matter more here: TimberTech AZEK's 50-year fade warranty is worth the premium when your deck sees moisture 200 days a year.

### Railing-Only Replacement ($3,000–$8,000)

A railing-only replacement is a legitimate, cost-effective option when your deck structure is sound but your wood railings are rotted, splitting, or non-compliant with current code.

Aluminum cable railings run $150–$250 per linear foot installed. Composite railings (Trex Signature, TimberTech RadianceRail) run $120–$200 per linear foot. A standard 40-linear-foot railing replacement lands at $5,000–$8,000. This is a half-day to two-day job for an experienced crew. If you're not sure whether your deck structure qualifies for a railing-only fix, that's exactly the kind of thing a free site visit resolves — we'll tell you honestly if the framing is worth keeping.

## What Drives Composite Deck Costs in San Francisco

### Material Selection (Trex, TimberTech, Fiberon)

Material choice is one of the biggest levers in composite deck pricing in San Francisco. Composite decking isn't a commodity — there's a meaningful quality gap between manufacturers and product lines. Here's how the major brands compare:

| Material | Installed Cost | Fade/Stain Warranty | Best For |
|---|---|---|---|
| Trex Enhance | $10–$13/sq ft | 25 years | Budget-conscious builds, inland lots |
| Trex Transcend | $14–$18/sq ft | 25 years | Most SF neighborhoods |
| TimberTech AZEK | $18–$22/sq ft | 50 years | Coastal / fog belt (Sunset, Richmond, Pacifica) |
| Fiberon Paramount | $16–$20/sq ft | 50 years | Value premium, hillside builds |
| TimberTech Legacy | $12–$15/sq ft | 25 years | Mid-range with solid track record |

The coastal weather durability difference matters specifically in San Francisco. The fog belt — the Sunset, the Richmond, [Pacifica's](/service-areas/pacifica) Linda Mar and Rockaway neighborhoods, [Sausalito](/service-areas/sausalito) waterfront — puts decking through cycles of moisture and UV that chew through cheaper composites faster than the manufacturer's warranty suggests. TimberTech AZEK's polymer-capped core genuinely holds up better in that environment. We've seen Trex Enhance boards show surface cracking within 8 years on a west-facing Sunset deck. We haven't seen that with AZEK.

### Site Access and Demolition

Site access is a cost driver that surprises almost every San Francisco homeowner budgeting a composite deck for the first time.

In most Bay Area suburbs, a contractor parks a truck in the driveway and wheels materials to the backyard. In San Francisco, that rarely happens. Narrow lots, locked side gates, shared driveways, and homes that back up to other homes mean materials often get hand-carried through the house or over fences. That adds labor. Parking a debris bin on a Bernal Heights or Noe Valley street requires a street-use permit ($200–$400) and isn't always possible. Some projects require a crane or materials lift — add $1,500–$3,500 for that equipment day.

Demolition of an existing wood deck adds $2,000–$6,000 depending on size and access. If the old deck is elevated and post-removal requires shoring, costs increase.

### Structural Requirements (Hillside, Multi-Level, Elevated)

Hillside structural requirements can add $5,000–$15,000+ to composite deck costs in San Francisco compared to flat-lot builds.

Any deck elevated more than 30 inches off grade in San Francisco triggers a structural engineering review — separate from the DBI permit. That review costs $1,500–$4,000 depending on complexity and typically requires stamped drawings. Hillside lots in Twin Peaks, Bernal Heights, and the southern neighborhoods need deeper concrete piers (often 3–4 feet below grade, sometimes helical piers if the soil is unstable). Each pier adds $400–$900 over a standard footing. A hillside deck needing 8 piers vs. 4 standard footings adds $3,000–$4,000 before a single board goes down.

Multi-level builds also require intermediate landings, stairs, and handrails on every level — all of which need to meet current IRC (International Residential Code) requirements as enforced by DBI. SF's clay-heavy soils are also a factor: they shift seasonally, which is why [concrete foundation work](/services/concrete-foundations) and footing specs for elevated decks here aren't the same as they are in the East Bay.

### SF DBI Permits (Decks Over 30 Inches)

Any composite deck in San Francisco that rises more than 30 inches above grade requires a building permit from SF DBI — full stop.

At or below 30 inches, you may be exempt from a permit, but setback requirements and HOA rules still apply. The DBI permit process for a standard deck:

- **Permit fee:** $800–$2,500 depending on project valuation
- **Plan check / review:** $500–$1,500
- **Inspections:** Included in permit fee, but require scheduling (add 1–2 weeks to timeline)
- **Total permit cost:** $1,500–$4,500 for most residential deck projects

Timeline: DBI plan check typically runs 4–8 weeks for an over-the-counter permit on a straightforward deck, longer if your project requires structural review or goes into the back-check queue.

Contractors who quote you a deck without mentioning permits are either doing the work without one (your liability when you sell) or they haven't built enough SF decks to know the threshold. An unpermitted deck is a real problem at resale — we've seen buyers' attorneys flag them during escrow and kill deals. For context on how permits interact with broader renovation budgets, the [SF home remodel cost guide](/blog/home-remodel-cost-san-francisco-2026) covers DBI fees across project types.

### Add-Ons: Pergolas, Lighting, Railings

Each add-on carries a real, predictable cost impact on your total composite deck price:

- **Attached pergola (12×16 ft):** $8,000–$14,000 installed, aluminum or wood structure
- **Freestanding pergola:** $10,000–$18,000 (requires its own footings)
- **LED deck lighting (recessed in boards):** $1,500–$3,500 for materials + licensed electrician
- **Step lighting:** $300–$800 depending on number of steps
- **Gas line for fire feature:** $2,000–$4,500 depending on distance to meter and permit
- **Composite vs. aluminum railings:** $50–$100/linear ft difference in material cost

## Hidden Costs Most Contractors Don't Tell You About

These costs show up after demo starts. Budget for them before you sign a contract, not after.

**1. Dry rot at the ledger board ($800–$4,000).**
The ledger board connects the deck structurally to your house. On older SF homes — particularly pre-1960 Doelger homes in the Sunset or Victorian-era homes in Noe Valley — improper flashing over decades allows water behind the ledger, rotting both the board and the house framing behind it. We find [dry rot at deck ledger boards](/services/exterior-repairs) on roughly 30% of our SF deck replacements. Fixing it isn't optional — a failed ledger board connection is a deck collapse waiting to happen.

**2. Undersized existing footings ($1,200–$3,500).**
If you're replacing an old deck, the original footings may not meet current SF code for the new structure — especially if the original deck was unpermitted. New footings mean excavation, concrete, and cure time. This is particularly common in [Daly City's](/service-areas/daly-city) Westlake Doelger homes and older [Oakland](/service-areas/oakland) Craftsman bungalows where decks were added informally decades ago.

**3. Inadequate drainage ($500–$2,000).**
SF's clay-heavy soil doesn't drain well. If water pools under or around your deck, you need French drains, gravel beds, or re-graded soil before the new structure goes in. Ignore this and you'll have standing water accelerating post rot within 5 years.

**4. Electrical panel capacity ($500–$3,000).**
Adding deck lighting or a hot tub circuit sometimes reveals your panel is already at capacity. A sub-panel addition or breaker upgrade is a separate cost from the deck itself. This comes up regularly in pre-1970 homes across [Berkeley](/service-areas/berkeley) and [San Francisco](/service-areas/san-francisco) where original panels weren't sized for modern outdoor electrical loads.

**5. HOA architectural review fees ($300–$1,500).**
Some SF condos and planned developments require HOA approval before any exterior work. The review process can take 4–12 weeks and sometimes requires a fee plus architect-stamped drawings.

**6. Gas line extension for fire features ($2,000–$4,500).**
Running a gas line from your meter to the deck — properly permitted through SF DBI and PG&E — is a separate scope that most composite deck quotes don't include.

**7. Old deck fastener corrosion and structural damage ($600–$2,500).**
If you're doing a board-only replacement rather than a full rebuild, corroded joist hangers and hardware embedded in older framing often need full replacement once exposed. Stainless or hot-dipped galvanized hardware is required for any new composite install near the coast — standard zinc hardware corrodes fast in the fog belt.

## Real Project Examples from 500+ Bay Area Projects

These aren't approximations. These are actual project scopes from our [composite deck construction](/services/composite-decks) work in San Francisco neighborhoods.

**Project 1: 320 sq ft Trex Enhance deck, Noe Valley**
Scope: Remove existing wood deck (310 sq ft), install 320 sq ft Trex Enhance Naturals composite decking on existing pressure-treated framing (framing passed inspection), new Trex Signature aluminum railing (42 linear ft), hidden fasteners throughout. Lot is flat, rear-yard access via side gate. DBI permit not required (deck under 30 inches). Dry rot found at one post base — post and footing replaced.
**Total: $22,000. Timeline: 3 weeks.**

**Project 2: 600 sq ft TimberTech Pro Legacy multi-level deck, Bernal Heights**
Scope: Demo and remove existing two-level wood deck (500 sq ft). Install new two-level TimberTech Pro Legacy composite deck (600 sq ft total), new helical piers on downhill side due to unstable fill soil, structural engineering required, TimberTech cable railing system (88 linear ft), DBI permit, two sets of stairs with code-compliant handrails, LED step lighting. Crane required for material delivery over fence on downhill side.
**Total: $48,000. Timeline: 7 weeks (including DBI permit review).**

**Project 3: 450 sq ft Fiberon Paramount deck with pergola and lighting, outer Sunset**
Scope: New construction on bare concrete slab (no demo). 450 sq ft Fiberon Paramount composite deck with grooved boards and hidden fasteners, 14×16 ft attached aluminum pergola, recessed LED lighting in deck boards (12 fixtures), step lighting (6 fixtures), electrical sub-panel circuit added for lighting load, composite railings (60 linear ft), DBI permit. Client chose Fiberon Paramount for the 50-year warranty given the fog exposure on their west-facing yard.
**Total: $39,000. Timeline: 5 weeks.**

You can see the full scope of [our composite deck projects](/gallery) in the project gallery. The gallery is filterable by project type and neighborhood.

## How to Budget for Your Composite Deck in San Francisco

**Get 2–3 estimates from licensed Class B contractors.** Not handymen, not unlicensed crews. Deck structural failures cause injuries and create liability — and unpermitted decks create problems when you sell. Ask each bidder for their CA license number and verify it at the CSLB (Contractors State License Board) website.

**Compare line by line, not total by total.** A $5,000 gap between two composite deck bids usually means one contractor excluded demolition, permits, or electrical. Ask every bidder to break out: demo, permit fees, materials (with brand and product line specified), framing, decking, railings, lighting, and contingency. If a bid lists "composite decking — allowance," that's a red flag. You want a specific product name and price.

**Budget a 10% contingency for hidden damage.** Every SF deck replacement we've done has revealed at least one surprise — usually [dry rot at deck ledger boards](/services/exterior-repairs), corroded hardware, or drainage issues under the slab. Ten percent on a $25,000 project is $2,500. That's a reasonable reserve, not padding. The [home remodel cost guide for San Francisco](/blog/home-remodel-cost-san-francisco-2026) covers contingency budgeting in more detail if you're planning multiple projects at once.

**Understand the per-square-foot math — but don't over-rely on it.** Composite deck pricing in SF runs $50–$120+ per square foot installed. The range is wide because site conditions and materials vary more than square footage alone captures. A 300 sq ft flat-lot Trex deck in Noe Valley and a 300 sq ft hillside TimberTech deck in Twin Peaks are not the same project.

**Ask about warranty — yours and theirs.** Composite manufacturers offer 25–50 year fade and stain warranties. Your contractor should offer a workmanship warranty on the installation itself. We back every deck we build with a **5-year workmanship warranty in writing**. That covers structural integrity, fastener failure, and installation defects — not manufacturer material issues, which are handled directly through the product warranty.

**Here's what we do differently.** We provide fixed-price written estimates with no allowances after a free site visit. Every line item is specified: the exact decking product, the railing system, the hardware spec, the permit cost, and the demo scope. No placeholder numbers. No "allowance for materials TBD." You know the number before we start — and it doesn't change unless you change the scope. We're a licensed [Class B contractor](/about) (CA License #1132983) with 12+ years building decks across [31 cities in the Bay Area](/service-areas).

## Frequently Asked Questions

### How much does a composite deck cost in San Francisco in 2026?

Composite deck cost in San Francisco runs $15,000–$60,000+ for most residential projects. A standard 300 sq ft single-level deck typically lands at $15,000–$35,000 installed. Multi-level hillside builds in neighborhoods like Bernal Heights or Twin Peaks push to $35,000–$60,000+. SF pricing runs 25–40% above national averages due to permits, steep lots, and access challenges.

### Does a composite deck in SF require a permit from DBI?

Yes — any deck more than 30 inches above grade in San Francisco requires a building permit from SF DBI (San Francisco Department of Building Inspection). Permit and plan-check fees typically add $1,500–$4,500 to your total project cost. Decks at or below 30 inches may be exempt from a permit, but setback and HOA rules still apply regardless of height.

### How does Trex compare to TimberTech AZEK for a San Francisco deck?

Trex Transcend ($14–$18/sq ft installed) is a solid choice for most SF neighborhoods, with a 25-year fade warranty. TimberTech AZEK ($18–$22/sq ft) carries a 50-year warranty and a polymer-capped core that outperforms in high-moisture environments — making it a better fit for fog-belt locations like the Sunset, Richmond, or coastal Pacifica. The $4–$6/sq ft premium is worth it if your deck faces west or sits in persistent fog.

### What hidden costs should I budget for when replacing a deck on an older SF home?

The most common hidden costs on SF deck replacements are dry rot at the ledger board ($800–$4,000), undersized original footings ($1,200–$3,500), and inadequate drainage under the deck ($500–$2,000). Pre-1960 Doelger homes in the Sunset and Victorian-era homes in Noe Valley are especially prone to ledger rot from decades of flashing failures. Budget a 10% contingency on top of your base estimate.

### How long does it take to build a composite deck in San Francisco?

A standard 300 sq ft composite deck in SF takes 3–5 weeks from permit to final inspection. Multi-level hillside decks run 5–8 weeks, largely because helical piers, structural engineering review, and SF DBI permit processing add time before framing can begin. DBI plan check alone typically takes 4–8 weeks for a straightforward over-the-counter permit.

### Can I add a pergola to my composite deck, and how much does it add to the cost?

Yes — an attached pergola adds $8,000–$14,000 to a composite deck project; a freestanding pergola adds $10,000–$18,000 (it requires its own footings). A 450 sq ft Fiberon Paramount deck with an attached aluminum pergola and LED lighting in the outer Sunset runs approximately $39,000 total. A pergola that carries any structural load may also require its own DBI permit review.

### What should I look for in a composite deck contractor in the Bay Area?

Look for a licensed Class B contractor with a verifiable CA license number (check at the CSLB website), experience with SF DBI permits, and a written workmanship warranty — not just the manufacturer's material warranty. Ask for itemized bids with specific product names, not "composite decking — allowance." Any bid that omits demolition cost, permit fees, or electrical should be questioned.

## Ready to Know What Your Specific Deck Will Cost?

Every composite deck cost in San Francisco is different — your lot grade, your access, your existing structure, and your material preferences all affect the final number. The only way to give you an accurate figure is to walk the site, evaluate the conditions, and put it in writing.

We provide detailed, line-item estimates after a free site visit — no allowances, no surprises. CA License #1132983. 12+ years. [500+ Bay Area projects](/about). 5-year workmanship warranty in writing on every build.
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
