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
            "Precision-poured concrete slabs for garages, ADUs, additions, and ground-floor living spaces.",
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

  roofing: {
    slug: "roofing",
    hero: {
      headline:
        "Bay Area Roofing Contractor — Installed Right the First Time",
      subheadline:
        "A bad roofing job causes more damage than the leak itself. From SF's Victorians to Marin's hillside homes and the East Bay's bungalows — you need a crew that knows steep pitches, tight access, and coastal weather.",
      ctaText: "Get Your Free Roof Estimate",
    },
    intro: {
      heading: "Your Roof Doesn't Wait for a Convenient Time",
      paragraphs: [
        "A leaking roof doesn't send a calendar invite. It shows up as a dark stain on your ceiling at 11pm during a rainstorm. Or as mold in your attic that you didn't know about for two years. By the time you see the damage inside your home, the problem above it has been growing for months.",
        "The Bay Area's roofing challenges are unique. The fog belt delivers constant moisture from Pacifica to Sausalito. Victorian and Edwardian homes in SF, Oakland, and Berkeley have steep pitches and complex rooflines that require skill and precision to work on safely. Tight lot lines across the region mean limited staging and access. And California's Title 24 cool roof requirements mean not just any material will pass inspection.",
        "Steep-pitch Victorians in SF. Hillside homes in Mill Valley and Tiburon. Craftsman bungalows in Oakland and Berkeley. Mid-century ranches across the Peninsula. Over 12 years, we've worked on every roof type the Bay Area has — and we know which materials perform best in each area's microclimate.",
      ],
    },
    scope: {
      heading: "Our Roofing Services",
      description:
        "From a single leak repair to a full tear-off and re-roof — we handle every type of roofing project across the Bay Area.",
      items: [
        {
          title: "Complete Re-Roofing",
          description:
            "Full tear-off and replacement with new underlayment, flashing, and roofing material — done right so it lasts 30+ years.",
        },
        {
          title: "Roof Repairs",
          description:
            "Leak detection, damaged shingle replacement, flashing repair, and emergency patching to stop damage before it spreads.",
        },
        {
          title: "New Construction Roofing",
          description:
            "Roofing for additions, ADUs, and new builds — coordinated with your project timeline.",
        },
        {
          title: "Gutter Installation & Repair",
          description:
            "Seamless aluminum gutters, downspouts, and gutter guards to manage the Bay Area's seasonal rain.",
        },
        {
          title: "Skylight Installation",
          description:
            "Bring natural light into dark rooms — properly flashed and sealed for zero-leak performance.",
        },
      ],
    },
    process: [
      {
        number: 1,
        title: "Free Roof Inspection",
        description:
          "We get on the roof, assess the damage and remaining lifespan, and give you an honest recommendation.",
      },
      {
        number: 2,
        title: "Detailed Estimate",
        description:
          "Material options, labor, timeline, and total cost — all in writing before you decide anything.",
      },
      {
        number: 3,
        title: "Permits & Material Order",
        description:
          "We pull the permit through your local building department and order materials. Your build date gets scheduled.",
      },
      {
        number: 4,
        title: "Installation",
        description:
          "Tear-off, underlayment, flashing, roofing material, and cleanup — typically 2–5 days for a residential re-roof.",
      },
      {
        number: 5,
        title: "Final Inspection",
        description:
          "City inspection and walkthrough with you. Your warranty paperwork and maintenance guide included.",
      },
    ],
    differentiators: [
      {
        icon: "ThermometerSun",
        title: "Title 24 Compliant",
        description:
          "We install cool roof materials that meet California's energy code requirements — no inspection surprises.",
      },
      {
        icon: "Mountain",
        title: "Steep-Pitch Specialists",
        description:
          "Victorians, Edwardians, and hillside homes across the Bay Area have complex rooflines. We have the skill and safety protocols to work on them properly.",
      },
      {
        icon: "Droplets",
        title: "Coastal-Climate Materials",
        description:
          "We recommend materials proven to perform in the Bay Area's constant moisture cycling — not just what's cheapest.",
      },
      {
        icon: "ShieldCheck",
        title: "5-Year Workmanship Warranty",
        description:
          "Plus manufacturer warranties of 30–50 years on materials. Your roof is protected.",
      },
    ],
    faqs: [
      {
        question: "How do I know if I need a new roof or just a repair?",
        answer:
          "Signs you need a full replacement: your roof is 20+ years old, you see widespread curling or missing shingles, there are multiple active leaks, or daylight is visible from the attic. If the damage is isolated to a small area and the rest of the roof is in good shape, a targeted repair may be all you need. We'll give you an honest assessment — we don't upsell replacements when a repair will do.",
      },
      {
        question: "How much does a new roof cost in the Bay Area?",
        answer:
          "A full re-roof for a typical Bay Area single-family home (1,200–1,800 sq ft of roof area) generally costs $15,000–$35,000 depending on material choice, roof complexity, number of layers to remove, and access conditions. Steep-pitch Victorians in SF, Oakland, and Berkeley with complex rooflines cost more than simple ranch-style roofs. We provide itemized estimates after a free roof inspection.",
      },
      {
        question: "How long does a roof last in the Bay Area?",
        answer:
          "Asphalt composition shingles: 20–30 years. Architectural shingles: 30–40 years. Metal roofing: 40–70 years. Tile: 50–100 years. The Bay Area's fog and coastal moisture can shorten lifespan compared to drier climates, which is why material selection and proper ventilation matter here more than most places. We recommend materials suited specifically to your neighborhood's microclimate.",
      },
      {
        question: "What are Title 24 cool roof requirements?",
        answer:
          "California's Title 24 building energy code requires certain roof materials to meet solar reflectance and thermal emittance standards — essentially, the roof needs to reflect heat rather than absorb it. This applies to most re-roofing projects across the Bay Area. Non-compliant materials won't pass city inspection. We only install Title 24 compliant materials, so you won't have inspection issues.",
      },
      {
        question: "Do I need a permit to replace my roof?",
        answer:
          "Yes. A full re-roof requires a building permit in virtually every Bay Area city. Permit processes vary — SF uses DBI, Marin and each Peninsula and East Bay city have their own building departments. Repairs that don't exceed a certain scope may be exempt, but it's always safer to check. We handle all permit applications and inspection scheduling as part of every project, in every city we serve.",
      },
    ],
  },

  "adu-construction": {
    slug: "adu-construction",
    hero: {
      headline:
        "ADU Construction — Add Space, Value & Income to Your Property",
      subheadline:
        "California's ADU laws have made it easier than ever to build a backyard unit. But easier doesn't mean easy. You need a contractor who's navigated the permit process in your city — not one figuring it out on your project.",
      ctaText: "Check What's Possible on Your Lot",
    },
    intro: {
      heading: "More Space. More Value. More Possibilities.",
      paragraphs: [
        "Maybe you need space for aging parents. Maybe you want rental income to offset your mortgage. Maybe your adult kid needs a place while they get on their feet. Or maybe you just want to add $200,000+ to your property value. Whatever the reason, an Accessory Dwelling Unit is one of the smartest investments a Bay Area homeowner can make right now.",
        "California's ADU laws (AB 881, SB 13, AB 68) have dramatically simplified the approval process statewide. But every city interprets these laws slightly differently. SF's DBI, Oakland's Planning & Building, Marin's Community Development, and each Peninsula and South Bay jurisdiction have their own review processes, timelines, and quirks. The paperwork alone stops most homeowners in their tracks.",
        "Gadget Construction handles the entire ADU process — from initial feasibility assessment through design, permitting, construction, and final inspection. We've built detached backyard units, garage conversions, and basement ADUs across 31 Bay Area cities in 6 counties. We know what each building department is looking for, which designs get approved faster, and how to avoid the common mistakes that add months and thousands of dollars to ADU projects.",
      ],
    },
    scope: {
      heading: "Our ADU Construction Services",
      description:
        "Full-service ADU design and build — we manage every phase so you get a finished, permitted unit without the chaos.",
      items: [
        {
          title: "Detached Backyard ADUs",
          description:
            "New standalone structures built in your backyard — from studio apartments to full 2-bedroom units up to 1,200 sq ft.",
        },
        {
          title: "Garage Conversions",
          description:
            "Transform your existing garage into a finished living space — often the fastest and most cost-effective ADU option.",
        },
        {
          title: "Basement Conversions",
          description:
            "Convert unused basement space into a legal, permitted dwelling unit with proper egress, ventilation, and waterproofing.",
        },
        {
          title: "Junior ADUs (JADUs)",
          description:
            "Up to 500 sq ft carved out of your existing home — an efficient option when lot space is limited.",
        },
        {
          title: "Full Design-Build",
          description:
            "We coordinate architecture, engineering, and construction under one roof — fewer handoffs, fewer delays, fewer surprises.",
        },
      ],
    },
    process: [
      {
        number: 1,
        title: "Feasibility Assessment",
        description:
          "We evaluate your lot, zoning, setbacks, and utility access to determine what type and size of ADU is possible.",
      },
      {
        number: 2,
        title: "Design & Engineering",
        description:
          "Architectural plans, structural engineering, and Title 24 energy calcs — all prepared for your city's building department.",
      },
      {
        number: 3,
        title: "Permits",
        description:
          "We submit to your local building department and manage the plan review process. We know what each jurisdiction looks for and how to get through review efficiently.",
      },
      {
        number: 4,
        title: "Full Build",
        description:
          "Foundation, framing, plumbing, electrical, HVAC, finishes — a complete build with weekly updates.",
      },
      {
        number: 5,
        title: "Final Inspection & Certificate of Occupancy",
        description:
          "All city inspections coordinated. You get a fully permitted, legal dwelling unit ready for move-in or rental.",
      },
    ],
    differentiators: [
      {
        icon: "FileCheck",
        title: "Multi-Jurisdiction Permit Experts",
        description:
          "We've navigated the ADU permit process in cities across 6 Bay Area counties. We know what each building department wants and how to deliver it without delays.",
      },
      {
        icon: "Wrench",
        title: "Full Design-Build",
        description:
          "Architecture, engineering, and construction managed by one team. Fewer handoffs mean fewer problems.",
      },
      {
        icon: "TrendingUp",
        title: "Value-Engineered",
        description:
          "We design for maximum livability and property value without over-building. Smart investments, not vanity projects.",
      },
      {
        icon: "ShieldCheck",
        title: "Fully Permitted & Legal",
        description:
          "Every ADU we build is fully permitted with a Certificate of Occupancy. No gray areas, no surprises at tax time.",
      },
    ],
    faqs: [
      {
        question: "What size ADU can I build on my property?",
        answer:
          "Under current California law, you can build a detached ADU up to 1,200 sq ft on most single-family lots, regardless of lot size or existing FAR. Junior ADUs (JADUs) can be up to 500 sq ft within your existing home. In many cases, you can build both a JADU and a detached ADU on the same lot. Setback and height requirements vary by city — we assess your specific lot and local rules during the feasibility visit.",
      },
      {
        question: "Can I rent out my ADU?",
        answer:
          "Yes. ADUs can be rented out as long-term rentals across the Bay Area. Market rates for a 1-bedroom ADU range from $1,800 to $3,500+/month depending on city, location, size, and finishes. Note: some cities like SF have additional rent control and just-cause eviction protections for ADUs. We recommend consulting a property management professional for your city's current rental regulations.",
      },
      {
        question: "Do I need to provide parking for an ADU?",
        answer:
          "No. California law eliminates the parking requirement for ADUs in most cases, including when the ADU is within half a mile of public transit. Even if you convert your garage to an ADU, you are not required to replace the lost parking. This applies across all Bay Area cities.",
      },
      {
        question: "Will an ADU increase my property value?",
        answer:
          "Yes. Studies show that a permitted ADU typically adds $200,000–$400,000+ to property value in the Bay Area market — often exceeding the construction cost. The rental income stream also improves your property's investment profile. A fully permitted, well-built ADU is one of the best ROI home improvements you can make in the current market.",
      },
      {
        question: "What does an ADU cost to build?",
        answer:
          "ADU costs across the Bay Area typically range from $150,000 to $400,000+ depending on type, size, finishes, and location. Garage conversions start around $100,000–$200,000. Detached new-construction ADUs run $250,000–$400,000+ for a fully finished unit. Costs include design, engineering, permits, site work, construction, and finishes. We provide detailed estimates with line-item breakdowns.",
      },
      {
        question: "How long does an ADU take from start to move-in?",
        answer:
          "The full timeline is typically 10–16 months. That breaks down roughly as: design and engineering (1–2 months), permit review (2–4 months depending on the city), and construction (4–8 months depending on type and size). Garage conversions are on the faster end. New detached construction takes longer. Some jurisdictions like Oakland and Berkeley have expedited ADU review. We give you a city-specific timeline at the estimate phase.",
      },
    ],
  },
};
