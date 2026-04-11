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
      headline: "Concrete Foundations & Slabs in San Francisco",
      subheadline:
        "San Francisco's hills, clay soil, and seismic activity demand foundations that are engineered — not just poured. We build the kind you never have to think about again.",
      ctaText: "Get Your Free Foundation Estimate",
    },
    intro: {
      heading: "Your Home Is Only as Strong as What It Sits On",
      paragraphs: [
        "A crack in your foundation isn't cosmetic. It's structural. And in earthquake country, structural means everything. San Francisco's unique combination of steep grades, expansive clay soil, and seismic zones creates conditions that punish shortcuts. The foundation your home sits on needs to account for all of it.",
        "Maybe you've noticed cracks spreading across your garage floor. Doors that used to close fine are sticking. The floor in your hallway has a slope that wasn't there five years ago. These aren't just old-house quirks — they're your foundation telling you something.",
        "Gadget Construction has been pouring, repairing, and replacing foundations across San Francisco for over 12 years. We understand the soil conditions in the Sunset are different from Bernal Heights. We know which neighborhoods sit on bedrock and which ones sit on fill. And we engineer every foundation to meet or exceed California's strict seismic codes — because close enough isn't good enough when the ground starts moving.",
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
            "Driveways, walkways, patios, and steps — poured and finished to last in San Francisco's wet climate.",
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
          "We pull all permits through SF DBI and prep the site. You don't touch a single form.",
      },
      {
        number: 4,
        title: "Construction",
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
        title: "Full SF DBI Permit Handling",
        description:
          "We manage the entire permit process with San Francisco's Department of Building Inspection.",
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
          "How much does a concrete foundation cost in San Francisco?",
        answer:
          "Foundation costs in SF vary significantly based on scope. Simple crack repairs can start around $3,000–$5,000. Seismic bolting typically runs $5,000–$15,000. A full foundation replacement for a single-family home can range from $30,000 to $100,000+ depending on lot conditions, access, and structural requirements. We provide detailed, itemized estimates after a site assessment — no ballpark guesses.",
      },
      {
        question: "How long does a foundation project take?",
        answer:
          "Seismic bolting and minor repairs typically take 3–5 days of on-site work. A full foundation replacement can take 3–6 weeks depending on the size of the home, permit timeline, and site conditions. We give you a specific timeline before work begins — and we stick to it. 94% of our projects finish on or ahead of schedule.",
      },
      {
        question: "Do I need a permit for foundation work in San Francisco?",
        answer:
          "Yes. Most foundation work in San Francisco requires a permit from the Department of Building Inspection (DBI). This includes new foundations, foundation replacements, and seismic retrofits. We handle the entire permit process for you — applications, plan submissions, and inspection scheduling.",
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
          "Brace + Bolt is a California Earthquake Authority program that provides grants of up to $3,000 to help homeowners seismically retrofit their homes. Eligible homes are typically older wood-frame houses with cripple wall or unbolted foundations. We can assess your eligibility during a free site visit and handle the entire retrofit process if you qualify.",
      },
      {
        question:
          "What makes San Francisco foundations different from other areas?",
        answer:
          "Three things: seismic activity, soil conditions, and terrain. SF sits near the San Andreas and Hayward faults, so seismic compliance is critical. Many neighborhoods have expansive clay soil that shifts with moisture — Sunset, Richmond, and Bayview are particularly affected. And the hills create slope and drainage challenges that flat-lot contractors don't deal with. We've been building in these conditions for 12+ years.",
      },
    ],
  },

  "retaining-walls": {
    slug: "retaining-walls",
    hero: {
      headline: "Retaining Walls in San Francisco — Built for Steep Terrain",
      subheadline:
        "When your hillside lot needs structure, you need more than a wall — you need engineering that accounts for SF's soil, slope, and seismic demands.",
      ctaText: "Get Your Free Retaining Wall Estimate",
    },
    intro: {
      heading: "Holding Ground in a City That Moves",
      paragraphs: [
        "If your yard is sliding, your driveway is cracking at the edges, or your hillside lot looks a little different after every rainy season — you're not imagining things. San Francisco's terrain doesn't stay put. Between the steep grades, clay soil, and seasonal rain, gravity is constantly working against your property.",
        "A properly engineered retaining wall isn't just a landscaping feature. It's a structural system that redirects soil pressure, manages water drainage, and protects your home's foundation from the forces pushing against it. Get it wrong and you're looking at failure within a few years — and a repair bill that dwarfs what the original wall would have cost.",
        "Gadget Construction has been building retaining walls across San Francisco's hills for over a decade. We've worked on Twin Peaks slopes, Potrero Hill switchbacks, and Bernal Heights backyards where a 15-foot grade change is just a normal Tuesday. Every wall we build is engineered for the specific soil and load conditions on your lot.",
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
            "Maximum strength for high-load applications. Engineered, reinforced, and built to handle SF's most demanding slopes.",
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
          "Walls over 4 feet in SF require a permit. We handle the full DBI process so you don't have to.",
      },
      {
        number: 4,
        title: "Construction",
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
          "No cookie-cutter walls. Every design accounts for your lot's specific grade, soil, and load.",
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
          "Walls over 4 feet need DBI permits. We manage the paperwork and inspections end to end.",
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
        question: "How much does a retaining wall cost in San Francisco?",
        answer:
          "Retaining wall costs depend on height, length, material, and site access. In San Francisco, expect roughly $200–$500 per linear foot for a standard 4-foot concrete block wall, including drainage. Taller walls, poured concrete, and difficult access can push costs higher. Hillside stabilization projects with tiered walls or soldier piles can range from $15,000 to $60,000+. We provide exact estimates after a site assessment.",
      },
      {
        question: "Do I need a permit for a retaining wall in San Francisco?",
        answer:
          "In San Francisco, retaining walls over 4 feet in height (measured from the bottom of the footing to the top of the wall) require a building permit from DBI. Walls near property lines or in certain zoning areas may have additional requirements. We handle all permitting and ensure your wall meets current code requirements.",
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
        question: "Can I build a retaining wall on the property line?",
        answer:
          "In San Francisco, retaining walls can generally be built up to the property line, but there are setback and drainage requirements depending on height and zoning. You'll also want to coordinate with your neighbor if the wall affects their property. We handle the code research and permitting for your specific situation.",
      },
    ],
  },

  "complete-remodel": {
    slug: "complete-remodel",
    hero: {
      headline: "Home Remodeling in San Francisco — Full-Service, Zero Stress",
      subheadline:
        "You've been thinking about this remodel for months. Maybe years. We're the contractor your neighbors wish they'd hired first.",
      ctaText: "Get Your Free Remodel Estimate",
    },
    intro: {
      heading: "Your Home Deserves Better Than a Horror Story",
      paragraphs: [
        "You've heard them. The kitchen remodel that took eight months instead of three. The contractor who cashed the deposit and disappeared. The budget that doubled before the drywall went up. These stories are so common in San Francisco that a lot of homeowners just live with the kitchen that doesn't work and the bathroom from 1970 — because the alternative sounds worse.",
        "It doesn't have to be that way. A remodel should be exciting, not exhausting. You should know exactly what it costs before it starts, exactly how long it will take, and exactly who to call when you have a question. That's not a radical concept — it's just how Gadget Construction operates.",
        "Over 12 years and 500+ projects, we've remodeled homes in every corner of San Francisco — from 1920s Victorians in the Mission to mid-century ranches in the Sunset. We know the quirks of old San Francisco housing stock. We know which walls are load-bearing before we open them up. And we know how to navigate SF's DBI permit process without losing months to paperwork.",
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
          "We handle SF DBI permits, schedule inspections, and lock in your project timeline.",
      },
      {
        number: 4,
        title: "Construction",
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
        title: "SF Permit Experts",
        description:
          "We navigate DBI's process daily. Your permits get handled correctly the first time.",
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
        question: "How much does a home remodel cost in San Francisco?",
        answer:
          "San Francisco is one of the most expensive remodeling markets in the country. A mid-range kitchen remodel typically runs $75,000–$150,000. A bathroom remodel ranges from $30,000–$75,000. Whole-home renovations generally cost $200–$450+ per square foot depending on the scope, finishes, and structural work involved. We provide detailed estimates with every line item explained — no vague allowances.",
      },
      {
        question: "How long does a full home remodel take in San Francisco?",
        answer:
          "A kitchen remodel typically takes 8–14 weeks of on-site work. A full bathroom runs 6–10 weeks. A whole-home renovation can take 4–8 months depending on scope. Add 4–12 weeks for SF DBI permit processing before construction starts. We give you a specific timeline during the estimate phase and provide weekly updates throughout construction.",
      },
      {
        question: "Do I need to move out during a remodel?",
        answer:
          "It depends on the scope. For a kitchen or bathroom remodel, most homeowners stay in the home — we isolate the work area with dust barriers and maintain a clean site daily. For whole-home renovations involving structural work, temporary relocation is usually recommended for comfort and safety. We'll advise you based on your specific project.",
      },
      {
        question: "How do I know if a wall is load-bearing?",
        answer:
          "Don't guess — this is one area where getting it wrong can be catastrophic. Load-bearing walls carry the weight of the structure above them down to the foundation. In older SF homes, it's not always obvious which walls are structural. We assess your home's framing before recommending any wall removals and install proper headers and beams when load-bearing walls need to come out.",
      },
      {
        question: "What permits do I need for a remodel in San Francisco?",
        answer:
          "Most remodeling work in SF requires permits from DBI — including electrical, plumbing, structural changes, and anything that alters the building's footprint or use. Even cosmetic kitchen remodels often trigger permit requirements if you're moving plumbing or electrical. We handle the full permit process from application to final inspection.",
      },
      {
        question: "Can you work with my architect or designer?",
        answer:
          "Absolutely. We regularly collaborate with architects and interior designers throughout San Francisco. If you don't have one, we can recommend trusted professionals we've worked with. Either way, we build to spec and communicate clearly with everyone on the project team.",
      },
    ],
  },

  "composite-decks": {
    slug: "composite-decks",
    hero: {
      headline: "Composite Decks in San Francisco — Built for the Fog",
      subheadline:
        "San Francisco's marine layer destroys wood decks in a few years. Composite gives you the look of real wood with none of the rot, splinters, or annual staining.",
      ctaText: "Get Your Free Deck Estimate",
    },
    intro: {
      heading: "Outdoor Living That Actually Lasts in San Francisco",
      paragraphs: [
        "You want a deck. A place to have coffee in the morning, grill on the weekend, or just sit outside and watch the fog roll in. The problem is, San Francisco's climate is brutal on wood. The marine layer, salt air, constant moisture cycling, and temperature swings warp, crack, and rot traditional lumber faster than almost anywhere in California.",
        "That's why we build with composite. Brands like Trex and TimberTech have engineered decking materials that look and feel like real wood but won't rot, splinter, warp, or fade. No annual staining. No pressure washing every spring. No replacing boards every few years. You build it once and enjoy it for 25+ years.",
        "Gadget Construction has been building composite decks across San Francisco for over a decade. We know how to work with the city's tight lot lines, steep backyards, and permitting requirements. Whether you want a simple single-level patio deck or a multi-tier outdoor living space with built-in lighting and pergola — we build it to last.",
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
            "Tiered designs that work with San Francisco's sloped backyards — creating usable outdoor space on terrain that would otherwise go to waste.",
        },
        {
          title: "Pergolas & Shade Structures",
          description:
            "Integrated pergolas, shade sails, and overhead structures for fog-free days when you want cover from the sun.",
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
          "We pull the building permit through SF DBI and handle all required documentation.",
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
        title: "Built for SF's Climate",
        description:
          "We spec materials specifically for San Francisco's fog, salt air, and moisture cycling.",
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
          "How much does a composite deck cost in San Francisco?",
        answer:
          "A standard 300-square-foot composite deck in San Francisco typically costs $15,000–$35,000 including materials, labor, railings, and permits. Multi-level decks, pergolas, built-in lighting, and premium materials can push costs to $40,000–$60,000+. We provide detailed estimates with material selections so you can adjust scope and budget before committing.",
      },
      {
        question: "Composite vs. wood — what's the real difference?",
        answer:
          "Upfront cost: composite is 20–40% more expensive than pressure-treated wood. Lifetime cost: composite wins by a wide margin. Wood decks in SF need staining every 1–2 years ($500–$1,500 each time), plus board replacement as they rot and warp. Composite needs virtually zero maintenance and lasts 25–50 years. Most homeowners break even on cost within 5–7 years — and never have to spend another weekend staining their deck.",
      },
      {
        question: "How long does a composite deck last?",
        answer:
          "Premium composite decking (Trex Transcend, TimberTech Pro) comes with 25-year fade and stain warranties. The structural lifespan is 50+ years with proper installation. In San Francisco's climate, a well-built composite deck will outlast 3–4 generations of wood decks.",
      },
      {
        question: "Do I need a permit to build a deck in San Francisco?",
        answer:
          "Yes. Decks attached to the house, decks over 30 inches above grade, and any deck with structural footings require a building permit from SF DBI. We handle the full permit process — application, plan submission, and inspection scheduling.",
      },
      {
        question: "How long does it take to build a deck?",
        answer:
          "Most residential composite deck projects take 1–3 weeks of on-site construction, depending on size, complexity, and site access. Add 4–8 weeks for SF DBI permit processing before construction begins. We schedule your build date when the permit is submitted so there's minimal gap.",
      },
    ],
  },

  roofing: {
    slug: "roofing",
    hero: {
      headline:
        "Roofing Contractor in San Francisco — Installed Right the First Time",
      subheadline:
        "A bad roofing job causes more damage than the leak itself. When you need roofing work in San Francisco, you need a crew that knows steep pitches, tight access, and fog-belt weather.",
      ctaText: "Get Your Free Roof Estimate",
    },
    intro: {
      heading: "Your Roof Doesn't Wait for a Convenient Time",
      paragraphs: [
        "A leaking roof doesn't send a calendar invite. It shows up as a dark stain on your ceiling at 11pm during a rainstorm. Or as mold in your attic that you didn't know about for two years. By the time you see the damage inside your home, the problem above it has been growing for months.",
        "San Francisco's roofing challenges are unique. The fog belt delivers constant moisture. Victorian and Edwardian homes have steep pitches and complex rooflines that require skill and precision to work on safely. Tight lot lines mean limited staging and access. And California's Title 24 cool roof requirements mean not just any material will pass inspection.",
        "Gadget Construction has been installing and repairing roofs across San Francisco for over a decade. We've worked on flat commercial roofs in SOMA and steep-pitch Victorians in Pacific Heights. We know which materials perform best in SF's microclimates, and we install them with the precision that steep, complex rooflines demand.",
      ],
    },
    scope: {
      heading: "Our Roofing Services",
      description:
        "From a single leak repair to a full tear-off and re-roof — we handle every type of roofing project in San Francisco.",
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
            "Seamless aluminum gutters, downspouts, and gutter guards to manage SF's seasonal rain.",
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
          "We pull the permit through SF DBI and order materials. Your build date gets scheduled.",
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
          "SF's Victorian and Edwardian homes have complex rooflines. We have the skill and safety protocols to work on them properly.",
      },
      {
        icon: "Droplets",
        title: "Fog-Belt Tested Materials",
        description:
          "We recommend materials proven to perform in SF's constant moisture cycling — not just what's cheapest.",
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
        question: "How much does a new roof cost in San Francisco?",
        answer:
          "A full re-roof for a typical San Francisco single-family home (1,200–1,800 sq ft of roof area) generally costs $15,000–$35,000 depending on material choice, roof complexity, number of layers to remove, and access conditions. Steep-pitch Victorian homes with complex rooflines cost more than simple ranch-style roofs. We provide itemized estimates after a free roof inspection.",
      },
      {
        question: "How long does a roof last in San Francisco?",
        answer:
          "Asphalt composition shingles: 20–30 years. Architectural shingles: 30–40 years. Metal roofing: 40–70 years. Tile: 50–100 years. SF's fog and moisture can shorten lifespan compared to drier climates, which is why material selection and proper ventilation matter here more than most places. We recommend materials suited specifically to your neighborhood's microclimate.",
      },
      {
        question: "How do I know if I need a new roof or just a repair?",
        answer:
          "Signs you need a full replacement: your roof is 20+ years old, you see widespread curling or missing shingles, there are multiple active leaks, or daylight is visible from the attic. If the damage is isolated to a small area and the rest of the roof is in good shape, a targeted repair may be all you need. We'll give you an honest assessment — we don't upsell replacements when a repair will do.",
      },
      {
        question: "What are Title 24 cool roof requirements?",
        answer:
          "California's Title 24 building energy code requires certain roof materials to meet solar reflectance and thermal emittance standards — essentially, the roof needs to reflect heat rather than absorb it. This applies to most re-roofing projects in SF. Non-compliant materials won't pass city inspection. We only install Title 24 compliant materials, so you won't have inspection issues.",
      },
      {
        question: "Do I need a permit to replace my roof?",
        answer:
          "Yes. A full re-roof in San Francisco requires a building permit from DBI. Repairs that don't exceed a certain scope may be exempt, but it's always safer to check. We handle all permit applications and inspection scheduling as part of every project.",
      },
    ],
  },

  "adu-construction": {
    slug: "adu-construction",
    hero: {
      headline:
        "ADU Construction in San Francisco — Add Space, Value & Income",
      subheadline:
        "California's ADU laws have made it easier than ever to build a backyard unit. But easier doesn't mean easy. You need a contractor who's done this before — not one figuring it out on your project.",
      ctaText: "Get Your Free ADU Estimate",
    },
    intro: {
      heading: "More Space. More Value. More Possibilities.",
      paragraphs: [
        "Maybe you need space for aging parents. Maybe you want rental income to offset your mortgage. Maybe your adult kid needs a place while they get on their feet. Or maybe you just want to add $200,000+ to your property value. Whatever the reason, an Accessory Dwelling Unit is one of the smartest investments a San Francisco homeowner can make right now.",
        "California's ADU laws (AB 881, SB 13, AB 68) have dramatically simplified the approval process. San Francisco has streamlined its own rules to encourage ADU development. But 'streamlined' in San Francisco still means navigating DBI permits, planning review, utility hookups, fire setbacks, and building code compliance. The paperwork alone stops most homeowners in their tracks.",
        "Gadget Construction handles the entire ADU process — from initial feasibility assessment through design, permitting, construction, and final inspection. We've built detached backyard units, garage conversions, and basement ADUs across San Francisco. We know what DBI is looking for, which designs get approved faster, and how to avoid the common mistakes that add months and thousands of dollars to ADU projects.",
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
          "Architectural plans, structural engineering, and Title 24 energy calcs — all prepared for DBI submittal.",
      },
      {
        number: 3,
        title: "Permits",
        description:
          "We submit to SF DBI and manage the plan review process. We know what they're looking for and how to get through review efficiently.",
      },
      {
        number: 4,
        title: "Construction",
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
        title: "DBI Permit Specialists",
        description:
          "We've navigated SF's ADU permit process dozens of times. We know what DBI wants and how to deliver it without delays.",
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
        question: "How much does an ADU cost to build in San Francisco?",
        answer:
          "ADU costs in San Francisco typically range from $150,000 to $400,000+ depending on type, size, and finishes. Garage conversions start around $100,000–$200,000. Detached new-construction ADUs run $250,000–$400,000+ for a fully finished unit. Costs include design, engineering, permits, site work, construction, and finishes. We provide detailed estimates with line-item breakdowns.",
      },
      {
        question: "How long does it take to build an ADU?",
        answer:
          "The full timeline from design to move-in is typically 10–16 months. That breaks down roughly as: design and engineering (1–2 months), DBI permit review (2–4 months), and construction (4–8 months depending on type and size). Garage conversions are on the faster end. New detached construction takes longer. We give you a specific timeline at the estimate phase.",
      },
      {
        question: "What size ADU can I build in San Francisco?",
        answer:
          "Under current California law, you can build a detached ADU up to 1,200 sq ft on most single-family lots in San Francisco, regardless of lot size or existing FAR. Junior ADUs (JADUs) can be up to 500 sq ft within your existing home. In many cases, you can build both a JADU and a detached ADU on the same lot. Setback and height requirements vary — we assess your specific lot during the feasibility visit.",
      },
      {
        question: "Can I rent out my ADU?",
        answer:
          "Yes. ADUs in San Francisco can be rented out as long-term rentals. Current market rates for a 1-bedroom ADU in SF range from $2,000 to $3,500+/month depending on location, size, and finishes. Note: ADUs in SF are currently subject to rent control and just-cause eviction protections. We recommend consulting a property management professional for current rental regulations.",
      },
      {
        question: "Do I need to provide parking for an ADU?",
        answer:
          "No. California law eliminates the parking requirement for ADUs in most cases, including when the ADU is within half a mile of public transit — which covers nearly all of San Francisco. Even if you convert your garage to an ADU, you are not required to replace the lost parking.",
      },
      {
        question: "Will an ADU increase my property value?",
        answer:
          "Yes. Studies show that a permitted ADU typically adds $200,000–$400,000+ to property value in the San Francisco market — often exceeding the construction cost. The rental income stream also improves your property's investment profile. A fully permitted, well-built ADU is one of the best ROI home improvements you can make in SF.",
      },
    ],
  },
};
