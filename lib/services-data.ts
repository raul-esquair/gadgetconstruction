import type { FAQ, ProcessStep, Differentiator } from "./types";

export interface ServicePageData {
  slug: string;
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  intro: {
    heading: string;
    paragraphs: string[];
  };
  scope: {
    heading: string;
    description: string;
    items: { title: string; description: string }[];
  };
  process: ProcessStep[];
  differentiators: Differentiator[];
  faqs: FAQ[];
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  "concrete-foundations": {
    slug: "concrete-foundations",
    hero: {
      headline: "Concrete Foundations & Slabs — Engineered for Earthquake Country",
      subheadline:
        "The Bay Area's seismic faults, diverse soil conditions, and steep terrain demand foundations that are engineered — not just poured. We build the kind you never have to think about again.",
      ctaText: "Schedule a Free Site Assessment",
    },
    intro: {
      heading: "Your Home Is Only as Strong as What It Sits On",
      paragraphs: [
        "A crack in your foundation isn't cosmetic. It's structural. And in earthquake country, structural means everything. The Bay Area sits between the San Andreas and Hayward faults — from SF and Marin to Oakland, Berkeley, and down the Peninsula. The combination of seismic zones, expansive clay soil, and steep grades creates conditions that punish shortcuts. The foundation your home sits on needs to account for all of it.",
        "Maybe you've noticed cracks spreading across your garage floor. Doors that used to close fine are sticking. The floor in your hallway has a slope that wasn't there five years ago. These aren't just old-house quirks — they're your foundation telling you something.",
        "With 12+ years and 500+ projects behind us, we've seen what the Bay Area's ground does to shortcuts. We understand that soil conditions in SF's Sunset are different from Bernal Heights, that Oakland's hills have different challenges than the flat lots in Concord, and that Marin's canyon-side homes face unique drainage demands. Every foundation we build is engineered to meet or exceed California's strict seismic codes — because close enough isn't good enough when the ground starts moving.",
      ],
    },
    scope: {
      heading: "Our Concrete Foundation & Slab Services",
      description:
        "Every project starts with a site assessment. We evaluate your soil, your slope, and your structure before we recommend a solution — not after.",
      items: [
        {
          title: "New Residential Foundations",
          description:
            "Engineered for your specific lot — soil tested, seismically compliant, built to outlast the home above it.",
        },
        {
          title: "Foundation Repair & Leveling",
          description:
            "Crack repair, mudjacking, pier installation, and full releveling for settling or shifting foundations.",
        },
        {
          title: "Slab-on-Grade Construction",
          description:
            "Precision-poured concrete slabs for garages, additions, and ground-floor living spaces.",
        },
        {
          title: "Seismic Bolting & Cripple Wall Bracing",
          description:
            "Anchor your home to its foundation. Brace cripple walls. Qualify for California's Brace + Bolt grant program (up to $3,000).",
        },
        {
          title: "Concrete Flatwork",
          description:
            "Driveways, walkways, patios, and steps — poured and finished to last in the Bay Area's wet climate.",
        },
      ],
    },
    process: [
      {
        number: 1,
        title: "Site Assessment",
        description:
          "We inspect your existing foundation, evaluate soil conditions, and identify exactly what needs to happen.",
      },
      {
        number: 2,
        title: "Engineering & Estimate",
        description:
          "You get a detailed, written estimate with engineering specs — no vague line items, no mystery math.",
      },
      {
        number: 3,
        title: "Permits & Prep",
        description:
          "We pull all permits through your local building department and prep the site. You don't touch a single form.",
      },
      {
        number: 4,
        title: "Excavation & Pour",
        description:
          "Excavation, forming, rebar placement, and pour — done by our crew, on our timeline, with daily site cleanup.",
      },
      {
        number: 5,
        title: "Inspection & Walkthrough",
        description:
          "City inspection, final walkthrough with you, and a 5-year workmanship warranty in writing.",
      },
    ],
    differentiators: [
      {
        icon: "ShieldCheck",
        title: "Seismic-Compliant Engineering",
        description:
          "Every foundation we build meets or exceeds California's seismic codes. No shortcuts, no exceptions.",
      },
      {
        icon: "FileCheck",
        title: "Full Permit Handling",
        description:
          "We manage the entire permit process with your local building department — SF's DBI, Marin's CDA, Oakland's Planning & Building, and every jurisdiction in between.",
      },
      {
        icon: "Microscope",
        title: "Soil-Specific Design",
        description:
          "We don't guess. We assess your lot's soil type and design your foundation accordingly.",
      },
      {
        icon: "ShieldCheck",
        title: "5-Year Workmanship Warranty",
        description:
          "Every pour, every repair, every bolt — backed by our written 5-year warranty.",
      },
    ],
    faqs: [
      {
        question:
          "How much does a concrete foundation cost in the Bay Area?",
        answer:
          "Foundation costs vary significantly based on scope and location. Simple crack repairs can start around $3,000–$5,000. Seismic bolting typically runs $5,000–$15,000. A full foundation replacement for a single-family home can range from $30,000 to $100,000+ depending on lot conditions, access, and structural requirements. We provide detailed, itemized estimates after a site assessment — no ballpark guesses.",
      },
      {
        question: "How long does a foundation project take?",
        answer:
          "Seismic bolting and minor repairs typically take 3–5 days of on-site work. A full foundation replacement can take 3–6 weeks depending on the size of the home, permit timeline, and site conditions. We give you a specific timeline before work begins — and we stick to it. 94% of our projects finish on or ahead of schedule.",
      },
      {
        question: "Do I need a permit for foundation work?",
        answer:
          "Yes. Most foundation work requires a building permit — including new foundations, foundation replacements, and seismic retrofits. Permit processes vary by city: SF uses DBI, Marin has the Community Development Agency, and each East Bay and Peninsula jurisdiction has its own department. We handle the entire permit process for you regardless of which city your project is in.",
      },
      {
        question: "What are the signs my foundation needs repair?",
        answer:
          "Watch for: cracks in walls or floors (especially diagonal cracks near windows and doors), doors and windows that stick or won't close properly, uneven or sloping floors, gaps between walls and ceilings, and water intrusion in your basement or crawl space. If you notice any of these, it's worth getting a professional assessment — most foundation problems get worse and more expensive over time.",
      },
      {
        question:
          "What is the Brace + Bolt program and do I qualify?",
        answer:
          "Brace + Bolt is a California Earthquake Authority program that provides grants of up to $3,000 to help homeowners seismically retrofit their homes. Eligible homes are typically older wood-frame houses with cripple wall or unbolted foundations — common across the Bay Area, especially in SF, Oakland, Berkeley, and older Marin neighborhoods. We can assess your eligibility during a free site visit and handle the entire retrofit process if you qualify.",
      },
      {
        question:
          "What makes Bay Area foundations different from other regions?",
        answer:
          "Three things: seismic activity, soil conditions, and terrain. The Bay Area sits between the San Andreas and Hayward faults, so seismic compliance is critical everywhere from SF to Oakland to San Jose. Many areas have expansive clay soil that shifts with moisture — SF's Sunset and Richmond, Marin's low-lying areas, and parts of the East Bay are particularly affected. And the hills across the region create slope and drainage challenges that flat-lot contractors don't deal with. We've been building in these conditions for 12+ years across 31 cities.",
      },
    ],
  },

  "retaining-walls": {
    slug: "retaining-walls",
    hero: {
      headline: "Retaining Walls That Hold — From Marin to the Peninsula",
      subheadline:
        "When your hillside lot needs structure, you need more than a wall. You need engineering that accounts for the soil, slope, and seismic demands of your specific site.",
      ctaText: "Get a Free Slope Assessment",
    },
    intro: {
      heading: "Holding Ground in a Region That Moves",
      paragraphs: [
        "If your yard is sliding, your driveway is cracking at the edges, or your hillside lot looks a little different after every rainy season — you're not imagining things. The Bay Area's terrain doesn't stay put. From Marin's canyon-carved slopes to SF's steep grades and the East Bay hills above Oakland and Berkeley, gravity is constantly working against your property.",
        "A properly engineered retaining wall isn't just a landscaping feature. It's a structural system that redirects soil pressure, manages water drainage, and protects your home's foundation from the forces pushing against it. Get it wrong and you're looking at failure within a few years — and a repair bill that dwarfs what the original wall would have cost.",
        "We've built retaining walls on Twin Peaks slopes in SF, hillside lots in Mill Valley and Sausalito, Berkeley Hills properties, and Peninsula backyards where a 15-foot grade change is just a normal Tuesday. Across 6 counties and over a decade of hillside work, one thing hasn't changed: every wall we build is engineered for the specific soil and load conditions on your lot.",
      ],
    },
    scope: {
      heading: "Our Retaining Wall Services",
      description:
        "We design, permit, and build retaining wall systems that solve the real problem — not just the visible one.",
      items: [
        {
          title: "Poured Concrete Retaining Walls",
          description:
            "Maximum strength for high-load applications. Engineered, reinforced, and built to handle the Bay Area's most demanding slopes.",
        },
        {
          title: "Concrete Block (CMU) Walls",
          description:
            "Versatile, cost-effective, and available with veneers for a finished look. Ideal for moderate height and load requirements.",
        },
        {
          title: "Stone & Masonry Walls",
          description:
            "Natural stone or manufactured veneer over structural cores — for homeowners who want engineered strength with a refined aesthetic.",
        },
        {
          title: "Drainage System Integration",
          description:
            "French drains, weep holes, and gravel backfill designed into every wall. Because water behind a retaining wall is how retaining walls fail.",
        },
        {
          title: "Hillside Stabilization",
          description:
            "Terracing, soldier pile systems, and multi-tier walls for steep lots that need more than a single structure.",
        },
      ],
    },
    process: [
      {
        number: 1,
        title: "Site Evaluation",
        description:
          "We assess the slope, soil type, drainage patterns, and load requirements on your specific lot.",
      },
      {
        number: 2,
        title: "Engineering & Design",
        description:
          "A wall designed for your exact conditions — height, load, drainage, and aesthetic preferences included.",
      },
      {
        number: 3,
        title: "Permits",
        description:
          "Walls over 4 feet typically require a permit. We handle the full permitting process with your local building department.",
      },
      {
        number: 4,
        title: "Wall Construction & Drainage",
        description:
          "Excavation, foundation, drainage, wall construction, and backfill — done right, done on schedule.",
      },
      {
        number: 5,
        title: "Final Inspection",
        description:
          "City inspection, final walkthrough, and your 5-year workmanship warranty.",
      },
    ],
    differentiators: [
      {
        icon: "Ruler",
        title: "Engineered for Your Slope",
        description:
          "No cookie-cutter walls. Every design accounts for your lot's specific grade, soil, and load — whether you're in Marin, SF, or the East Bay.",
      },
      {
        icon: "Droplets",
        title: "Drainage Built In",
        description:
          "Integrated drainage is non-negotiable. Water pressure is the #1 cause of retaining wall failure.",
      },
      {
        icon: "FileCheck",
        title: "Full Permit Handling",
        description:
          "Walls over 4 feet need permits. We manage the paperwork and inspections with every jurisdiction we serve.",
      },
      {
        icon: "ShieldCheck",
        title: "5-Year Warranty",
        description:
          "Structural integrity guaranteed in writing. We build walls that stay walls.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my property needs a retaining wall?",
        answer:
          "If you're seeing soil erosion on a slope, your yard is creeping downhill, your driveway or patio is cracking from lateral pressure, or water is pooling against your foundation after rain — those are signs. Any hillside lot with a grade change of 3 feet or more typically benefits from a retaining wall. We do free site evaluations to tell you exactly what's happening and whether a wall is the right fix.",
      },
      {
        question: "How much does a retaining wall cost in the Bay Area?",
        answer:
          "It depends on height, length, material, and site access. Across the Bay Area, expect roughly $200–$500 per linear foot for a standard 4-foot concrete block wall, including drainage. Taller walls, poured concrete, and difficult hillside access — common in Marin, SF, and the East Bay hills — can push costs higher. Hillside stabilization projects with tiered walls or soldier piles can range from $15,000 to $60,000+. We provide exact estimates after a site assessment.",
      },
      {
        question: "Do I need a permit for a retaining wall?",
        answer:
          "In most Bay Area jurisdictions, retaining walls over 4 feet in height (measured from the bottom of the footing to the top of the wall) require a building permit. Walls near property lines or in certain zoning areas may have additional requirements. Permit processes vary by city — SF's DBI, Marin's Community Development Agency, and each Peninsula and East Bay jurisdiction have their own procedures. We handle all permitting regardless of which city your project is in.",
      },
      {
        question: "How long does a retaining wall last?",
        answer:
          "A properly engineered and built concrete retaining wall should last 50–100 years. The key factors are drainage (water pressure behind the wall is the #1 cause of failure), foundation depth, and reinforcement. Timber walls have a shorter lifespan of 15–25 years. Every wall we build includes integrated drainage to maximize longevity.",
      },
      {
        question: "What causes retaining walls to fail?",
        answer:
          "The top three causes: poor drainage (water builds up behind the wall and creates hydrostatic pressure), inadequate foundation depth, and undersized design (the wall isn't engineered for the actual load it's holding). Cheap, un-engineered walls fail the fastest. We design every wall for the specific conditions on your lot — not based on a generic formula.",
      },
      {
        question: "Do you build retaining walls outside of San Francisco?",
        answer:
          "Yes. We serve 31 cities across Marin, San Francisco, San Mateo, Alameda, Contra Costa, and Santa Clara counties. Some of our most demanding retaining wall projects are in Marin — Mill Valley, Sausalito, and Tiburon have steep hillside lots that require serious structural engineering. We also build throughout the Peninsula and East Bay hills.",
      },
    ],
  },

  "complete-remodel": {
    slug: "complete-remodel",
    hero: {
      headline: "Full-Service Home Remodeling — Zero Stress, Zero Surprises",
      subheadline:
        "You've been thinking about this remodel for months. Maybe years. We're the contractor your neighbors wish they'd hired first — serving 31 cities across the Bay Area.",
      ctaText: "Get Your Free Remodel Estimate",
    },
    intro: {
      heading: "Your Home Deserves Better Than a Horror Story",
      paragraphs: [
        "You've heard them. The kitchen remodel that took eight months instead of three. The contractor who cashed the deposit and disappeared. The budget that doubled before the drywall went up. These stories are so common across the Bay Area that a lot of homeowners just live with the kitchen that doesn't work and the bathroom from 1970 — because the alternative sounds worse.",
        "It doesn't have to be that way. A remodel should be exciting, not exhausting. You should know exactly what it costs before it starts, exactly how long it will take, and exactly who to call when you have a question. That's not a radical concept — it's just how Gadget Construction operates.",
        "Over 12 years and 500+ projects, we've remodeled homes across 31 Bay Area cities — from 1920s Victorians in SF's Mission District to Craftsman bungalows in Berkeley, hillside homes in Mill Valley, Eichlers in Palo Alto, and mid-century ranches across the Peninsula. We know the quirks of Bay Area housing stock. We know which walls are load-bearing before we open them up. And we know how to navigate the permit process in every jurisdiction we serve.",
      ],
    },
    scope: {
      heading: "Our Remodeling Services",
      description:
        "From a single room refresh to a whole-home transformation — we handle every phase so you don't have to juggle multiple contractors.",
      items: [
        {
          title: "Kitchen Remodels",
          description:
            "Layout redesigns, custom cabinetry, countertops, appliance installation, plumbing, and electrical — from demo to final detail.",
        },
        {
          title: "Bathroom Remodels",
          description:
            "Tile work, fixtures, vanities, showers, tubs, and waterproofing — built to handle daily use for decades.",
        },
        {
          title: "Whole-Home Renovations",
          description:
            "Coordinated, phased renovations that transform your entire home while keeping disruption manageable.",
        },
        {
          title: "Room Additions",
          description:
            "Expand your footprint with a new bedroom, office, or living area — structurally integrated with your existing home.",
        },
        {
          title: "Structural Modifications",
          description:
            "Load-bearing wall removal, floor plan reconfiguration, header and beam installation — the heavy lifting that opens up your space.",
        },
        {
          title: "Title 24 & Energy Upgrades",
          description:
            "California's energy code compliance — insulation, windows, HVAC, and lighting upgrades that meet current requirements.",
        },
      ],
    },
    process: [
      {
        number: 1,
        title: "Design Consultation",
        description:
          "We walk your home, listen to what you want, and discuss what's realistic for your space and budget.",
      },
      {
        number: 2,
        title: "Detailed Estimate",
        description:
          "A written, itemized estimate — every line item explained so you know exactly what you're paying for.",
      },
      {
        number: 3,
        title: "Permits & Scheduling",
        description:
          "We handle all permits with your local building department, schedule inspections, and lock in your project timeline.",
      },
      {
        number: 4,
        title: "Demo to Finishing",
        description:
          "Demo, framing, plumbing, electrical, finishing — with weekly photo updates and a clean site every day.",
      },
      {
        number: 5,
        title: "Final Walkthrough",
        description:
          "We walk every room together. You create a punch list. We don't consider it done until you do.",
      },
    ],
    differentiators: [
      {
        icon: "DollarSign",
        title: "Fixed-Price Contracts",
        description:
          "The price we quote is the price you pay. If something changes, we discuss it with you before any work happens.",
      },
      {
        icon: "Clock",
        title: "Realistic Timelines",
        description:
          "We don't promise six weeks when we know it's ten. You get an honest timeline — and we hit it.",
      },
      {
        icon: "FileCheck",
        title: "Bay Area Permit Experts",
        description:
          "We navigate permitting across 31 cities and 6 counties. Your permits get handled correctly the first time, regardless of jurisdiction.",
      },
      {
        icon: "MessageSquare",
        title: "Weekly Photo Updates",
        description:
          "You'll see exactly what's happening at your home, every week, whether you're there or not.",
      },
    ],
    faqs: [
      {
        question: "How much does a home remodel cost in the Bay Area?",
        answer:
          "The Bay Area is one of the most expensive remodeling markets in the country. A mid-range kitchen remodel typically runs $75,000–$150,000. A bathroom remodel ranges from $30,000–$75,000. Whole-home renovations generally cost $200–$450+ per square foot depending on the scope, finishes, and structural work involved. Costs can vary by city and home type. We provide detailed estimates with every line item explained — no vague allowances.",
      },
      {
        question: "How long does a full home remodel take?",
        answer:
          "A kitchen remodel typically takes 8–14 weeks of on-site work. A full bathroom runs 6–10 weeks. A whole-home renovation can take 4–8 months depending on scope. Add 4–12 weeks for permit processing before construction starts — timelines vary by jurisdiction (SF's DBI tends to be longest). We give you a city-specific timeline during the estimate phase and provide weekly updates throughout construction.",
      },
      {
        question: "Do I need to move out during a remodel?",
        answer:
          "It depends on the scope. For a kitchen or bathroom remodel, most homeowners stay in the home — we isolate the work area with dust barriers and maintain a clean site daily. For whole-home renovations involving structural work, temporary relocation is usually recommended for comfort and safety. We'll advise you based on your specific project.",
      },
      {
        question: "How do I know if a wall is load-bearing?",
        answer:
          "Don't guess — this is one area where getting it wrong can be catastrophic. Load-bearing walls carry the weight of the structure above them down to the foundation. In older Bay Area homes — Victorians, Edwardians, Craftsmans, and early ranches — it's not always obvious which walls are structural. We assess your home's framing before recommending any wall removals and install proper headers and beams when load-bearing walls need to come out.",
      },
      {
        question: "What permits do I need for a remodel?",
        answer:
          "Most remodeling work requires permits — including electrical, plumbing, structural changes, and anything that alters the building's footprint or use. Even cosmetic kitchen remodels often trigger permit requirements if you're moving plumbing or electrical. Permit processes vary by city across the Bay Area. We handle the full permit process from application to final inspection in every jurisdiction we serve.",
      },
      {
        question: "Can you work with my architect or designer?",
        answer:
          "Absolutely. We regularly collaborate with architects and interior designers throughout the Bay Area. If you don't have one, we can recommend trusted professionals we've worked with. Either way, we build to spec and communicate clearly with everyone on the project team.",
      },
    ],
  },

  "composite-decks": {
    slug: "composite-decks",
    hero: {
      headline: "Composite Decks Built for Fog, Salt Air & Zero Maintenance",
      subheadline:
        "The Bay Area's marine layer, salt air, and constant moisture cycling destroy wood decks in a few years. Composite gives you the look of real wood with none of the rot, splinters, or annual staining.",
      ctaText: "Design Your Dream Deck — Free Consultation",
    },
    intro: {
      heading: "Outdoor Living That Actually Lasts on the Coast",
      paragraphs: [
        "You want a deck. A place to have coffee in the morning, grill on the weekend, or just sit outside and enjoy the view. The problem is, the Bay Area's coastal climate is brutal on wood. From Sausalito and Pacifica to SF and the Peninsula, the marine layer, salt air, constant moisture cycling, and temperature swings warp, crack, and rot traditional lumber faster than almost anywhere in California.",
        "That's why we build with composite. Brands like Trex and TimberTech have engineered decking materials that look and feel like real wood but won't rot, splinter, warp, or fade. No annual staining. No pressure washing every spring. No replacing boards every few years. You build it once and enjoy it for 25+ years.",
        "From Marin's hillside homes to SF's tight lot lines to Peninsula backyards in Burlingame, San Carlos, and Palo Alto — we've designed and built composite decks for every type of property the Bay Area throws at us. Whether you want a simple single-level patio deck or a multi-tier outdoor living space with built-in lighting and pergola, we build it to last.",
      ],
    },
    scope: {
      heading: "Our Composite Deck Services",
      description:
        "Every deck we build is custom-designed for your space, your lot, and your lifestyle.",
      items: [
        {
          title: "Trex & TimberTech Composite Decks",
          description:
            "Premium composite boards with 25-year manufacturer warranties — available in dozens of colors and grain patterns.",
        },
        {
          title: "Multi-Level Decks",
          description:
            "Tiered designs that work with the Bay Area's sloped backyards — creating usable outdoor space on terrain that would otherwise go to waste.",
        },
        {
          title: "Pergolas & Shade Structures",
          description:
            "Integrated pergolas, shade sails, and overhead structures for sunny days when you want cover from the heat.",
        },
        {
          title: "Railing Systems",
          description:
            "Cable rail, glass panel, and composite rail systems — code-compliant and designed to complement your deck aesthetic.",
        },
        {
          title: "Deck Lighting",
          description:
            "Integrated LED post caps, step lights, and under-rail lighting — extend your outdoor living into the evening.",
        },
      ],
    },
    process: [
      {
        number: 1,
        title: "Design Consultation",
        description:
          "We visit your property, measure the space, discuss your vision, and present material and color options.",
      },
      {
        number: 2,
        title: "Custom Design & Estimate",
        description:
          "A detailed plan with dimensions, materials, and a fixed-price quote — so you know exactly what you're getting.",
      },
      {
        number: 3,
        title: "Permits",
        description:
          "We pull the building permit through your local building department and handle all required documentation.",
      },
      {
        number: 4,
        title: "Build",
        description:
          "Foundation, framing, decking, railings, and finishing — typically completed in 1–3 weeks.",
      },
      {
        number: 5,
        title: "Final Walkthrough",
        description:
          "We walk the deck with you, ensure every detail is right, and hand over your warranty paperwork.",
      },
    ],
    differentiators: [
      {
        icon: "Droplets",
        title: "Built for Bay Area Weather",
        description:
          "We spec materials specifically for the Bay Area's fog, salt air, and moisture cycling — from the coast to inland valleys.",
      },
      {
        icon: "Timer",
        title: "Zero Maintenance",
        description:
          "No staining, sealing, or sanding — ever. Composite decks clean up with soap and water.",
      },
      {
        icon: "Shield",
        title: "25-Year Manufacturer Warranty",
        description:
          "Plus our 5-year workmanship warranty. Your deck is covered from every angle.",
      },
      {
        icon: "Palette",
        title: "Dozens of Color Options",
        description:
          "Match your home's exterior, complement your landscape, or go bold — the options are wide open.",
      },
    ],
    faqs: [
      {
        question:
          "How much does a composite deck cost in the Bay Area?",
        answer:
          "A standard 300-square-foot composite deck in the Bay Area typically costs $15,000–$35,000 including materials, labor, railings, and permits. Multi-level decks, pergolas, built-in lighting, and premium materials can push costs to $40,000–$60,000+. Costs vary slightly by city and site access. We provide detailed estimates with material selections so you can adjust scope and budget before committing.",
      },
      {
        question: "Composite vs. wood — what's the real difference?",
        answer:
          "Upfront cost: composite is 20–40% more expensive than pressure-treated wood. Lifetime cost: composite wins by a wide margin. Wood decks in the Bay Area's coastal climate need staining every 1–2 years ($500–$1,500 each time), plus board replacement as they rot and warp. Composite needs virtually zero maintenance and lasts 25–50 years. Most homeowners break even on cost within 5–7 years — and never have to spend another weekend staining their deck.",
      },
      {
        question: "How long does a composite deck last?",
        answer:
          "Premium composite decking (Trex Transcend, TimberTech Pro) comes with 25-year fade and stain warranties. The structural lifespan is 50+ years with proper installation. In the Bay Area's marine climate, a well-built composite deck will outlast 3–4 generations of wood decks.",
      },
      {
        question: "Do I need a permit to build a deck?",
        answer:
          "In most Bay Area cities, decks attached to the house, decks over 30 inches above grade, and any deck with structural footings require a building permit. Permit processes vary by jurisdiction — SF's DBI, Marin's Community Development, and each Peninsula and South Bay city have their own procedures. We handle the full permit process for every city we serve.",
      },
      {
        question: "Do you build decks outside of San Francisco?",
        answer:
          "Yes. We serve 31 cities across Marin, San Francisco, San Mateo, Alameda, Contra Costa, and Santa Clara counties. Coastal cities like Sausalito, Pacifica, and Daly City have the same fog and salt-air challenges as SF — composite is especially smart in those areas. We also build throughout the Peninsula and South Bay.",
      },
    ],
  },

  "exterior-repairs": {
    slug: "exterior-repairs",
    hero: {
      headline: "Dry Rot, Stucco & Siding Repair Across the Bay Area",
      subheadline:
        "Fog, salt air, and wind-driven rain don't stay outside forever. Catch exterior damage early and your home stays watertight for decades. Wait too long and you're rebuilding framing.",
      ctaText: "Get a Free Exterior Inspection",
    },
    intro: {
      heading: "Your Home's First Line of Defense",
      paragraphs: [
        "The Bay Area is one of the hardest climates in the country on a home's exterior. Fog rolls in from the Pacific every afternoon. Coastal moisture settles into every seam. Wind-driven rain hits siding from angles a flat-lot home in Arizona will never see. Salt air eats fasteners and finishes. And most homes here are 50 to 120 years old — built with details that don't meet modern water-management standards.",
        "What starts as a cosmetic issue — a hairline stucco crack, a soft spot near a window sill, paint peeling on one wall — is almost never just cosmetic. Water is getting in somewhere. By the time damage shows up on the outside, framing behind the wall has usually been rotting for months or years. The $800 patch job you should have done two years ago is now a $12,000 sister-framing rebuild.",
        "Gadget Construction treats exterior repair as a systems problem, not a patching job. We find where the water is coming in, cut out every piece of rotted wood, replace framing and sheathing where needed, install proper weather-resistive barrier and flashing, then re-clad with stucco, Hardie board, or wood siding — built to last another 30 years. 12+ years, 500+ projects, 31 Bay Area cities across 6 counties. Licensed Class B (CA #1132983). 5-year workmanship warranty on every repair.",
      ],
    },
    scope: {
      heading: "What We Fix",
      description:
        "Three connected problems — dry rot, failing stucco, and aging siding — that share a common cause: water getting past your home's exterior. We fix the cause, not just the visible damage.",
      items: [
        {
          title: "Dry Rot Repair",
          description:
            "Window sills, fascia, trim, sheathing, and framing — we cut out every rotted piece and sister in new pressure-treated or kiln-dried lumber. No paint-over patches that come back in 18 months.",
        },
        {
          title: "Stucco Patching & Crack Repair",
          description:
            "Sealing hairline cracks, spot patching, and color-coat matching on existing stucco walls. Works best when the underlying system is sound.",
        },
        {
          title: "Full Re-Stucco",
          description:
            "Complete removal down to framing, new weather-resistive barrier, wire lath, and a proper three-coat stucco system. The only real fix when stucco has failed behind the surface.",
        },
        {
          title: "Hardie Board & Fiber Cement Siding",
          description:
            "James Hardie installation and replacement — the Bay Area's most durable siding for fog, salt air, and fire zones. Full removal, proper flashing, color-matched finish.",
        },
        {
          title: "Wood & Cedar Siding",
          description:
            "Clapboard, tongue-and-groove, T1-11, cedar shake, and redwood siding — installed or replaced to match your home's architectural style.",
        },
        {
          title: "Composite & Engineered Siding",
          description:
            "LP SmartSide, Diamond Kote, and composite options for homeowners who want wood's look with fiber cement's durability.",
        },
      ],
    },
    process: [
      {
        number: 1,
        title: "Full Exterior Inspection",
        description:
          "We walk the entire envelope of your home — every wall, window, door, fascia, and roof edge. We probe suspect areas for rot and photograph every finding. You get a written report, not a verbal guess.",
      },
      {
        number: 2,
        title: "Written Scope & Fixed-Price Estimate",
        description:
          "Every repair itemized with a fixed price. No 'allowances' that balloon mid-project. No change orders unless we open a wall and find additional damage you agreed to inspect for.",
      },
      {
        number: 3,
        title: "Permits & Scheduling",
        description:
          "Full re-stucco and large siding replacements typically trigger a permit in most Bay Area jurisdictions. We pull them. You don't touch a form.",
      },
      {
        number: 4,
        title: "Repair & Weatherproofing",
        description:
          "We work in the right sequence: remove damage, replace framing and sheathing, install weather-resistive barrier and flashing, then re-clad. Every layer matters — skip one and the next leak is a year away.",
      },
      {
        number: 5,
        title: "Final Walkthrough & 5-Year Warranty",
        description:
          "We walk the finished work with you. You don't sign off until every punch-list item is done. Every repair is backed by our written 5-year workmanship warranty.",
      },
    ],
    differentiators: [
      {
        icon: "Search",
        title: "We Fix the Cause, Not the Symptom",
        description:
          "Every exterior repair starts with finding where water is actually getting in. Patch the stucco crack without finding the failed kickout flashing above it, and the damage is back in 18 months. We don't work that way.",
      },
      {
        icon: "FileCheck",
        title: "Licensed Class B + Full Permit Handling",
        description:
          "CA License #1132983. We handle the permit process in SF's DBI, Marin's CDA, Oakland's Planning & Building, and every Peninsula and South Bay jurisdiction we serve. You don't file a single form.",
      },
      {
        icon: "MapPin",
        title: "Bay Area-Specific Experience",
        description:
          "We know what fog does to Sunset Doelgers, what salt air does to Pacifica homes, what rain-driven wind does to Marin hillside siding. 500+ projects across 31 cities — not generic advice.",
      },
      {
        icon: "ShieldCheck",
        title: "5-Year Workmanship Warranty",
        description:
          "Every repair, every elevation, every nail. Backed by our written warranty. If something fails, we come back and fix it.",
      },
    ],
    faqs: [
      {
        question: "How do I know if it's dry rot or termite damage?",
        answer:
          "Dry rot is caused by water and a wood-decaying fungus (Serpula lacrymans and related species). It turns wood soft, spongy, and crumbly — often with visible cracked or cubical patterns. Termite damage usually shows hollow galleries running with the grain, sometimes with mud tubes on the outside. In Bay Area homes, the two frequently occur together: water damage creates softened wood, which termites then exploit. We inspect for both during every exterior repair project and coordinate with licensed pest control if termite treatment is needed before we rebuild.",
      },
      {
        question: "Do I need a permit for stucco repair in San Francisco or the Bay Area?",
        answer:
          "Small crack patching and localized stucco repair typically do not require a permit. Full re-stucco of one or more elevations, or any work that disturbs the weather-resistive barrier behind the stucco, generally does require a building permit — in SF (DBI), Oakland, Berkeley, and most Peninsula and Marin jurisdictions. We pull permits for every job where they're required and handle all city inspections. If you're unsure, we clarify permit requirements during the estimate.",
      },
      {
        question: "How much does exterior repair cost in the Bay Area?",
        answer:
          "Costs vary widely by scope. Small dry rot patches (single window sill or piece of trim) typically run $800–$2,500. Whole-wall dry rot with framing replacement runs $4,000–$12,000. Stucco crack patching starts around $400–$1,500. A full re-stucco of one elevation runs $4,000–$9,000; a whole-house re-stucco runs $15,000–$35,000. Hardie board siding averages $14–$22 per square foot installed; wood siding runs $10–$16 per square foot. Every project gets an itemized, fixed-price estimate after inspection — no vague allowances.",
      },
      {
        question: "Will you match my existing stucco texture and color?",
        answer:
          "Yes — on patch and spot-repair jobs. We match texture (smooth, sand, dash, lace, Santa Barbara, etc.) and work with a color-coat specialist to blend new work with weathered existing stucco. Perfect matches are hard when stucco is more than 10–15 years old because UV and weather change the color over time; in those cases we usually recommend color-coating the full elevation to avoid a visible patch. We discuss the tradeoff during estimate.",
      },
      {
        question: "What's the best siding for San Francisco's fog and salt air?",
        answer:
          "For most Bay Area homes, fiber cement (James Hardie board) is the strongest performer. It doesn't rot, doesn't warp, is non-combustible (important in fire-risk zones across Marin, the East Bay hills, and the Peninsula), and holds paint far better than wood in fog conditions. Wood siding — cedar, redwood, clapboard — is period-correct on older homes and performs well when properly maintained, but requires repainting every 5–8 years in coastal conditions. Composite siding (LP SmartSide) is a middle ground. We recommend based on your home's architectural style, location, and maintenance tolerance.",
      },
      {
        question: "Can you repair stucco on Doelger homes, SF rowhouses, or Victorians?",
        answer:
          "Yes. Doelger homes (built in the 1930s–1950s across SF's Sunset, Westlake in Daly City, and parts of Pacifica) often have stucco over shiplap sheathing — a construction detail that fails predictably at windows and roof edges. Victorian and Edwardian homes frequently have later stucco applied over the original lath-and-plaster or wood siding, which creates its own set of water intrusion risks. We've worked on all of these construction types across SF, Daly City, Pacifica, and the Avenues, and know where the failure points hide.",
      },
      {
        question: "How long does an exterior repair project take?",
        answer:
          "Small dry rot or stucco patches typically take 1–3 days. Whole-elevation stucco re-coat or siding replacement usually runs 1–2 weeks. Full-house re-stucco or a complete re-siding typically takes 2–4 weeks, depending on size and weather. We give you a specific timeline with the estimate and update you weekly. 94% of our projects finish on or ahead of schedule.",
      },
      {
        question: "What happens if you find more damage once you open up the wall?",
        answer:
          "We include a contingency for typical surprise findings in every estimate — about 10–15% depending on the home's age. If we open a wall and find significantly more rotted framing than the inspection suggested, we stop, photograph the finding, and give you a written change order before doing any additional work. You approve (or decline) in writing. We never surprise you with a bigger bill at the end of the job.",
      },
    ],
  },

  "structural-repairs": {
    slug: "structural-repairs",
    hero: {
      headline:
        "Get Rid of Sagging Floors and Rotted Framing Once and For All",
      subheadline:
        "When settling, rot, or termites reach the footings, joists, beams, and sill plates holding your house up, patching the surface only hides the problem. We shore it, cut out what failed, and rebuild the load path — permitted and inspected.",
      ctaText: "Book a Free Structural Inspection",
    },
    intro: {
      heading: "The Floor Isn't Supposed to Roll Like That",
      paragraphs: [
        "You feel it before you see it. The hallway dips toward the middle. A marble rolls to one corner of the kitchen. A door that closed fine five years ago now drags on the floor. Or the pest inspector on your sale came back with a Section 1 list — rotted sill plate, termite-eaten joists, a girder split along its length — and your escrow has a deadline.",
        "Most Bay Area homes were framed long before anyone wrote a modern seismic code. Victorians and Edwardians in SF, Craftsman bungalows in Berkeley and Oakland, Doelgers stacked over garages in the Sunset and Daly City, post-and-beam Eichlers and 1950s ranches down the Peninsula and into the South Bay. Decades of fog, slow plumbing leaks, subterranean termites, and a few serious earthquakes have worked on that wood. The damage sits where you don't look: in the crawlspace, behind the drywall, under the subfloor.",
        "Structural repair isn't a patch job. We shore the house, cut out the wood that stopped carrying its load, and rebuild the load path — underpinned footings, sistered joists, new girders and posts, pressure-treated sill plates, engineered beams — built to a licensed structural engineer's stamped design whenever the work calls for one. We pull the permit, pass the inspections, and back it with a 5-year workmanship warranty in writing. 12+ years, 500+ projects, 31 cities across 6 counties.",
      ],
    },
    scope: {
      heading: "Our Structural Repair Services",
      description:
        "Every job starts under the house or behind the wall. We find what's actually carrying the load — and what stopped carrying it — before we price anything.",
      items: [
        {
          title: "Foundation Underpinning",
          description:
            "When a footing has settled, we carry it down to soil that won't move — helical or push piers, or new concrete poured beneath the old footing — then stabilize or lift the house above it.",
        },
        {
          title: "Sagging Floor & Joist Repair",
          description:
            "Sister cracked or over-spanned joists, add a mid-span girder, and set new posts and piers in the crawlspace so the floor comes back toward level and stays there.",
        },
        {
          title: "Beam, Girder & Post Replacement",
          description:
            "Rotted, split, or undersized beams replaced under temporary shoring — sized for the loads your house carries today, not the ones it carried in 1925.",
        },
        {
          title: "Sill Plates & Termite-Damaged Framing",
          description:
            "Rot and termites go for the wood sitting on your foundation first — mudsills, rim joists, subfloor. We shore the wall, rebuild in pressure-treated lumber, re-anchor it to the concrete, and clear the Section 1 items on your pest report.",
        },
        {
          title: "Load-Bearing Wall Removal",
          description:
            "Open the kitchen to the living room without losing what held the second floor up. Engineered beam, posts carried down to footings that can take the load, fully permitted.",
        },
        {
          title: "House-Over-Garage Strengthening",
          description:
            "Living space over a wide garage opening is the weak story in an earthquake. Steel moment frames and plywood shear walls, installed to the engineer's design.",
        },
      ],
    },
    process: [
      {
        number: 1,
        title: "Crawlspace & Framing Inspection",
        description:
          "We get under the house, into the attic, and behind finishes where we need to. You get photos of what we found — not a guess from the driveway.",
      },
      {
        number: 2,
        title: "Engineering Where It's Needed",
        description:
          "Beam replacements, bearing-wall removal, and moment frames need calculations. We coordinate a licensed structural engineer and build to their stamped plans. Like-for-like repairs often don't need one.",
      },
      {
        number: 3,
        title: "Fixed-Price Estimate & Permit",
        description:
          "A line-item written estimate, then we pull the permit through your building department — SF DBI, Oakland, Berkeley, Marin CDA, or wherever your house is.",
      },
      {
        number: 4,
        title: "Shore, Cut Out, Rebuild",
        description:
          "Temporary shoring goes in first so nothing moves while the failed wood comes out. Then we rebuild the load path, with daily cleanup and one point of contact throughout.",
      },
      {
        number: 5,
        title: "Inspection & Written Warranty",
        description:
          "City framing inspection, a final walkthrough with you, and a 5-year workmanship warranty in writing — plus a permit sign-off you can hand to a buyer or an insurer.",
      },
    ],
    differentiators: [
      {
        icon: "Microscope",
        title: "We Find the Cause, Not Just the Crack",
        description:
          "A sagging floor can be a failed girder, a rotted post, or a settling footing. We trace it to the source so you pay for one repair, not three.",
      },
      {
        icon: "FileCheck",
        title: "Stamped Plans, Pulled Permits",
        description:
          "When a repair needs engineering, it gets engineering. Every structural job is permitted and inspected — no unpermitted work waiting to surface at your next sale.",
      },
      {
        icon: "Layers",
        title: "Foundation to Framing, One Crew",
        description:
          "If the problem started at the foundation, we fix that too. No passing you between a foundation company and a framer who each blame the other.",
      },
      {
        icon: "ShieldCheck",
        title: "5-Year Workmanship Warranty",
        description:
          "Every joist, beam, post, and sill plate we install — backed in writing for five years.",
      },
    ],
    faqs: [
      {
        question: "How much do structural repairs cost in the Bay Area?",
        answer:
          "It depends on what failed and how much of it. Replacing a single crawlspace post runs $500–$1,500. Sistering joists under a sagging floor typically costs $3,000–$12,000. A beam or girder replacement, including temporary shoring, runs $4,000–$15,000. Removing a load-bearing wall with an engineered beam is $10,000–$35,000 with engineering and permit. A steel moment frame at a garage opening runs $25,000–$75,000. We give you a fixed, line-item price after we've been under the house — not a ballpark over the phone.",
      },
      {
        question: "Is my sagging floor a foundation problem or a framing problem?",
        answer:
          "It can be either, and guessing wrong is expensive. If the floor dips in the middle of a room while the edges stay level, it's usually framing — an over-spanned joist, a failed girder, or a post that's rotted or sunk. If a whole side of the house has dropped, with diagonal cracks at the corners of doors and windows and cracked concrete below, the foundation is the more likely cause. We check both on the same visit, and we repair both, so there's no reason for us to sell you the wrong one.",
      },
      {
        question: "Do I need underpinning, or just new posts and piers?",
        answer:
          "It depends on what's moving. New posts and piers fix a floor that sags between its supports while the perimeter foundation stays put. Underpinning is for when the footing itself has settled — a whole corner or side has dropped, cracks run diagonally from the corners of doors and windows, and the concrete below is cracked or out of level. We carry the footing down to stable soil with helical or push piers ($2,000–$4,500 per pier; most homes need 4–16) or new concrete poured beneath it. A typical project runs $15,000–$50,000+ with engineering and permit, and takes 1–3 weeks on site once the permit is issued.",
      },
      {
        question: "Can you fix the Section 1 items on my pest report before escrow closes?",
        answer:
          "Yes. Section 1 items on a California termite report are active infestation or existing damage — often a rotted sill plate, termite-eaten joists, or decayed framing under a leaking bathroom. Buyers and lenders commonly want them repaired before close. We work straight from the report, give you a written price quickly, and schedule around your closing date. Treatment for live termites is done by a licensed pest control company; we handle the structural repair.",
      },
      {
        question: "Do I need a permit and an engineer for structural repairs?",
        answer:
          "Usually a permit, sometimes an engineer. Replacing a beam, removing a load-bearing wall, or adding a moment frame needs a building permit and, in most Bay Area cities, stamped structural calculations. Like-for-like replacement of a rotted joist or post is simpler, but many cities still want it permitted. SF DBI, Oakland, Berkeley, and every Marin, Peninsula, and South Bay department draws its own line. We tell you what your city requires before you sign anything.",
      },
      {
        question: "Can I remove a load-bearing wall to open up my kitchen?",
        answer:
          "Almost always — it's a question of engineering and cost, not possibility. The load that wall carried has to go somewhere: into a new beam (flush in the ceiling or dropped below it), down through posts, and onto footings that can take it. Expect $10,000–$35,000 in the Bay Area depending on the span and what's above it. It's often done as part of a kitchen or whole-home remodel, which saves you opening the same ceiling twice.",
      },
      {
        question: "My house sits over a garage. Is it a soft story?",
        answer:
          "Possibly. Living space over a wide garage opening is the classic weak story: there isn't enough wall at ground level to resist an earthquake's sideways shaking. The 1989 Loma Prieta quake showed what that looks like, most visibly in SF's Marina District. SF, Oakland, and Berkeley have mandatory soft-story programs for multi-unit wood buildings. Single-family homes aren't covered, but the physics is the same. A steel moment frame or new shear walls at the garage typically runs $25,000–$75,000, designed by a structural engineer.",
      },
      {
        question: "How long does a structural repair take?",
        answer:
          "Replacing a few posts or sistering a handful of joists takes 1–3 days on site. A sill plate run or a beam replacement usually takes 1–2 weeks. Load-bearing wall removal and garage moment frames take 2–4 weeks of construction, plus permit review time, which varies by city. We give you a written schedule before we start, and 94% of our projects finish on or ahead of it.",
      },
    ],
  },
};
