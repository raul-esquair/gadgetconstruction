import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, X, Sun, Droplets, Palette, Timer, ShieldCheck, Hammer, Phone } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { COMPANY } from "@/lib/constants";
import { SERVICE_PRICING } from "@/lib/pricing-data";
import Container from "@/components/ui/Container";
import JsonLd, { serviceSchema } from "@/components/seo/JsonLd";
import { EstimateButton } from "@/components/ui/EstimateModal";
import FAQSection from "@/components/sections/FAQSection";
import LpHeader from "@/components/lp/LpHeader";
import LpHero from "@/components/lp/LpHero";
import LpTrustStrip from "@/components/lp/LpTrustStrip";
import LpFooter from "@/components/lp/LpFooter";
import LpFinalCTA from "@/components/lp/LpFinalCTA";

export const metadata: Metadata = generatePageMetadata({
  title: "Composite Decks — Bay Area Deck Builder | Trex, TimberTech & Fiberon",
  description:
    "Certified Trex, TimberTech & Fiberon installer. Composite decks built for Bay Area fog and salt air — zero staining, zero rot, 25+ year lifespan. Free design consultation. CA License #1132983.",
  path: "/lp/composite-decks",
  noindex: true,
});

const BRANDS = ["Trex", "TimberTech", "Fiberon", "Deckorators", "AZEK"];

const COMPARISON = [
  {
    dimension: "Lifespan",
    wood: "7–12 years (coastal Bay Area)",
    composite: "25–50+ years",
  },
  {
    dimension: "Annual Maintenance",
    wood: "Stain / seal every 1–2 years ($500–$1,500)",
    composite: "Soap and water — that's it",
  },
  {
    dimension: "Splinters & Warping",
    wood: "Common after 3–5 years in fog",
    composite: "Never",
  },
  {
    dimension: "Color Fade",
    wood: "Significant — needs repainting",
    composite: "25-year fade warranty",
  },
  {
    dimension: "Upfront Cost",
    wood: "Lower",
    composite: "20–40% higher",
  },
  {
    dimension: "10-Year Total Cost",
    wood: "Often exceeds composite after maintenance",
    composite: "Lower — you pay once",
  },
];

const GALLERY = [
  {
    src: "/images/gallery-composite-deck-pergola.jpg",
    alt: "Composite deck with pergola and LED lighting — Bay Area deck build by Gadget Construction",
    caption: "Pergola + LED lighting",
  },
  {
    src: "/images/gallery-composite-deck-spa.jpg",
    alt: "Composite spa deck with hot tub and privacy screens built in the San Francisco Bay Area",
    caption: "Spa deck with privacy screens",
  },
  {
    src: "/images/gallery-composite-deck-firepit.jpg",
    alt: "Composite entertainer's deck with built-in fire pit — Bay Area installation",
    caption: "Entertainer's deck with fire pit",
  },
  {
    src: "/images/gallery-composite-deck-railing.jpg",
    alt: "Wraparound composite deck with modern railing system — Bay Area build by Gadget Construction",
    caption: "Wraparound deck with modern railing",
  },
];

const SCOPE_ITEMS = [
  {
    icon: Hammer,
    title: "Trex & TimberTech Composite Decks",
    body: "Premium capped composite boards with 25-year manufacturer fade and stain warranties. Available in dozens of colors and grain patterns.",
  },
  {
    icon: Sun,
    title: "Multi-Level Decks & Hillside Builds",
    body: "Tiered designs for Bay Area sloped backyards — Marin hillsides, Oakland hills, Peninsula grades. We turn unusable slopes into outdoor living space.",
  },
  {
    icon: Palette,
    title: "Pergolas, Railings & LED Lighting",
    body: "Integrated pergolas, cable rail, glass panel railing, LED post caps, step lights, and under-rail lighting — extend your outdoor living into the evening.",
  },
  {
    icon: ShieldCheck,
    title: "Structural Foundation & Framing",
    body: "Proper footings, pressure-treated framing, and code-compliant structural engineering. Your deck will still be flat and level in 25 years.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: Droplets,
    title: "Built for Bay Area Weather",
    body: "We spec materials specifically for the Bay Area's fog, salt air, and moisture cycling — from Pacifica coast to SF Sunset to inland San Mateo. Your deck won't swell, warp, or delaminate.",
  },
  {
    icon: Timer,
    title: "Zero Maintenance Forever",
    body: "No staining, sealing, or sanding. Ever. Composite decks clean up with soap and water. Get your weekends back.",
  },
  {
    icon: ShieldCheck,
    title: "25-Year Manufacturer Warranty",
    body: "Composite boards from Trex, TimberTech, and Fiberon ship with 25-year fade and stain warranties — backed by the manufacturers themselves. We register every install in your name.",
  },
  {
    icon: Palette,
    title: "Fixed-Price Design Consultation",
    body: "Free on-site design visit. We walk your yard, discuss material options and colors, and give you a fixed-price quote — so you know exactly what you're paying before anything starts.",
  },
];

const PROCESS = [
  {
    title: "Free On-Site Design Consultation",
    body: "We visit your property, measure the space, discuss your vision and how you want to use the deck. We bring sample boards so you can see and feel the composite options in your actual light and yard.",
  },
  {
    title: "Custom Design & Fixed-Price Estimate",
    body: "A detailed plan with dimensions, materials, railings, lighting, and a fixed-price quote — so you know exactly what you're getting and exactly what it costs.",
  },
  {
    title: "Permits & Scheduling",
    body: "We pull the building permit through your local building department and lock in your build date. You don't touch a form.",
  },
  {
    title: "Build",
    body: "Footings, framing, decking, railings, lighting, and finishing — typically completed in 1–3 weeks for a standard single-level deck. Multi-level and pergola builds take longer.",
  },
  {
    title: "Final Walkthrough",
    body: "We walk the deck with you, ensure every detail is right, and hand over your manufacturer warranty paperwork — registered in your name with Trex, TimberTech, or Fiberon.",
  },
];

const FAQS = [
  {
    question: "How much does a composite deck cost in the Bay Area?",
    answer:
      "A standard 300-square-foot composite deck in the Bay Area typically costs $15,000–$35,000 including materials, labor, railings, and permits. Multi-level decks, pergolas, built-in lighting, and premium materials can push costs to $40,000–$60,000+. Costs vary slightly by city and site access. We provide detailed estimates with material selections so you can adjust scope and budget before committing.",
  },
  {
    question: "Composite vs wood — what's the real difference in the Bay Area?",
    answer:
      "Upfront cost: composite is 20–40% more expensive than pressure-treated wood. Lifetime cost: composite wins by a wide margin. Wood decks in the Bay Area's coastal climate need staining every 1–2 years ($500–$1,500 each time), plus board replacement as they rot and warp in the fog and salt air. Composite needs virtually zero maintenance and lasts 25–50 years. Most homeowners break even on cost within 5–7 years — and never have to spend another weekend staining their deck.",
  },
  {
    question: "How long does a composite deck last?",
    answer:
      "Premium composite decking from Trex Transcend, TimberTech Pro, and Fiberon Goodlife lines comes with 25-year fade and stain warranties. The structural lifespan is 50+ years with proper installation. In the Bay Area's marine climate, a well-built composite deck will outlast 3–4 generations of wood decks.",
  },
  {
    question: "Do I need a permit to build a deck?",
    answer:
      "In most Bay Area cities, decks attached to the house, decks over 30 inches above grade, and any deck with structural footings require a building permit. Permit processes vary by jurisdiction — SF's DBI, Marin's Community Development Agency, and each Peninsula, East Bay, and South Bay city have their own procedures. We handle the full permit process for every city we serve.",
  },
  {
    question: "Which composite brand do you recommend?",
    answer:
      "We install Trex, TimberTech, Fiberon, and Deckorators depending on your budget, color preferences, and style. Trex Transcend and TimberTech AZEK offer the most premium looks and longest warranties. TimberTech EDGE Prime+ and Fiberon Concordia are mid-range options with excellent value. We bring sample boards to your design consultation so you can see and feel the differences in your actual yard light.",
  },
  {
    question: "Do you build decks outside of San Francisco?",
    answer:
      "Yes. We serve 31 cities across Marin, San Francisco, San Mateo, Alameda, Contra Costa, and Santa Clara counties. Coastal cities like Sausalito, Pacifica, and Daly City have the same fog and salt-air challenges as SF — composite is especially smart in those areas. We also build throughout the Peninsula, East Bay, and South Bay.",
  },
  {
    question: "Can you build a deck on a sloped or hillside lot?",
    answer:
      "Yes — multi-level decks are one of our specialties. Marin hillsides, Oakland/Berkeley hills, and the Peninsula all have sloped lots where a simple single-level deck won't work. We design tiered decks with proper structural engineering that turn unusable slopes into usable outdoor living space.",
  },
];

export default function CompositeDecksLpPage() {
  const pricing = SERVICE_PRICING["composite-decks"];

  return (
    <>
      <JsonLd
        data={serviceSchema(
          "Composite Deck Installation",
          "Trex, TimberTech, and Fiberon certified composite deck builder serving 31 cities across the Bay Area. Multi-level decks, pergolas, railings, and LED lighting. Licensed Class B contractor (CA #1132983). 25-year manufacturer fade and stain warranty on premium composite boards.",
          "$15,000–$60,000+",
        )}
      />

      <LpHeader />

      <LpHero
        eyebrow="Trex · TimberTech · Fiberon Certified"
        headline={
          <>
            Have a Deck{" "}
            <span className="underline decoration-accent-orange decoration-4 underline-offset-[6px]">
              You
            </span>{" "}
            Can Be Proud Of
          </>
        }
        subheadline="Bay Area composite deck builder — Trex, TimberTech, and Fiberon certified. Zero staining, zero splinters, zero rot in fog and salt air. Free on-site design consultation with sample boards in your yard. CA Lic #1132983."
        trustPoints={[
          "Free on-site design consultation",
          "Fixed-price quote — no surprise change orders",
          "Trex, TimberTech & Fiberon certified installer",
          "25-year manufacturer fade & stain warranty",
        ]}
        backgroundImage="/images/composite-decks-hero.jpg"
        imageAlt="Multi-level composite deck with stepped design attached to a residential home in the San Francisco Bay Area"
        service="composite-decks"
        formHeading="Get a Free Design Consultation"
        formSubtext="Takes under 20 seconds. We bring sample boards to your yard."
        formCtaText="Get My Free Consultation"
      />

      <LpTrustStrip hideWarranty />

      {/* Brand strip */}
      <section className="bg-white py-8 border-b border-neutral-200">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8">
            <span className="text-xs font-heading font-semibold uppercase tracking-wider text-neutral-400">
              Certified Installer Of
            </span>
            <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
              {BRANDS.map((brand) => (
                <li
                  key={brand}
                  className="px-4 py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-primary font-heading font-bold text-sm md:text-base tracking-wide"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Educational — why wood doesn't last */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Why Wood Decks Don&apos;t Last in the Bay Area
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-6 text-secondary leading-relaxed text-base md:text-lg">
              Pressure-treated lumber and redwood look great for three or four years. Then the Bay Area climate goes to work — and the maintenance treadmill starts.
            </p>
            <p className="mt-4 text-secondary leading-relaxed text-base md:text-lg">
              Pacifica and Sausalito decks take wind-driven rain straight off the Pacific that finds every grain crack and forces water into the board. Marin and Berkeley shaded backyards stay damp from morning fog through afternoon — ideal conditions for mold, mildew, and slow rot under your stain. SF Sunset and Daly City sit in the fog belt where boards get wet every morning and dry every afternoon — cyclic moisture stress that no stain fully holds back. South-facing Peninsula decks bake under summer sun, opening the wood grain and accelerating UV breakdown of every coating you put on top.
            </p>
            <p className="mt-4 text-secondary leading-relaxed text-base md:text-lg">
              The issue isn&apos;t the wood itself — it&apos;s that wood was never designed for this climate. Capped composite was. Polymer boards from Trex, TimberTech, and Fiberon don&apos;t absorb water, don&apos;t cup or warp under cyclic moisture, and don&apos;t break down under UV. The right product simply outlasts the climate.
            </p>
          </div>
        </Container>
      </section>

      {/* Why composite vs wood */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Composite vs. Wood — In Bay Area Weather
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Wood decks look great for the first few years. Fog, salt air, and moisture cycling shorten that timeline more than most homeowners expect. Here's how the two stack up in the climate you actually live in.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="hidden md:grid grid-cols-[1.2fr_1.5fr_1.5fr] gap-4 px-6 pb-3 text-xs font-heading font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200">
              <div />
              <div className="flex items-center gap-2">
                <X size={14} className="text-neutral-400" />
                Pressure-Treated Wood
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-accent-orange" />
                Composite (Trex / TimberTech / Fiberon)
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden mt-3">
              {COMPARISON.map((row, i) => (
                <div
                  key={row.dimension}
                  className={`grid grid-cols-1 md:grid-cols-[1.2fr_1.5fr_1.5fr] gap-3 md:gap-4 p-5 md:p-6 ${
                    i !== COMPARISON.length - 1 ? "border-b border-neutral-200" : ""
                  }`}
                >
                  <div className="font-heading font-bold text-primary">{row.dimension}</div>
                  <div className="text-secondary text-sm md:text-base">
                    <span className="md:hidden text-xs font-heading font-bold uppercase tracking-wider text-neutral-400 block mb-1">Wood</span>
                    {row.wood}
                  </div>
                  <div className="text-primary text-sm md:text-base font-medium">
                    <span className="md:hidden text-xs font-heading font-bold uppercase tracking-wider text-accent-orange block mb-1">Composite</span>
                    {row.composite}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Decision Diagnostic — Which Composite Line? */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Which Composite Line Fits Your Project?
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Composite isn&apos;t one product — it&apos;s three tiers across multiple manufacturers, each tuned to a different budget and aesthetic. Here&apos;s how to think about it before your design consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-orange mb-2">Entry-Level</div>
              <h3 className="text-xl font-heading font-bold text-primary">Solid-Color Capped Composite</h3>
              <div className="mt-1 text-sm font-heading font-semibold text-secondary">~$8–$12 / sq ft material</div>
              <p className="mt-3 text-secondary text-sm leading-relaxed">
                Brands: <span className="font-heading font-semibold text-primary">Trex Enhance, TimberTech EDGE Prime+, Fiberon Sanctuary.</span>
              </p>
              <p className="mt-3 text-secondary text-sm leading-relaxed">
                Capped on 3 sides for moisture protection. Solid colors — no streaking. Best for budget-conscious replacements where the deck is the destination, not the focal point. 25-year fade &amp; stain warranty.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-orange mb-2">Mid-Range</div>
              <h3 className="text-xl font-heading font-bold text-primary">Multi-Tonal Capped Composite</h3>
              <div className="mt-1 text-sm font-heading font-semibold text-secondary">~$12–$18 / sq ft material</div>
              <p className="mt-3 text-secondary text-sm leading-relaxed">
                Brands: <span className="font-heading font-semibold text-primary">Trex Select, TimberTech AZEK Vintage, Fiberon Concordia.</span>
              </p>
              <p className="mt-3 text-secondary text-sm leading-relaxed">
                Fully capped (4-side) with realistic wood-grain streaking. Most popular tier for Bay Area builds. Wider color palette with weathered and natural finishes. 25-year fade &amp; stain warranty.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-orange mb-2">Premium</div>
              <h3 className="text-xl font-heading font-bold text-primary">Full-PVC / Tropical Hardwood Look</h3>
              <div className="mt-1 text-sm font-heading font-semibold text-secondary">~$18–$28 / sq ft material</div>
              <p className="mt-3 text-secondary text-sm leading-relaxed">
                Brands: <span className="font-heading font-semibold text-primary">Trex Transcend, TimberTech AZEK Harvest, Fiberon Paramount.</span>
              </p>
              <p className="mt-3 text-secondary text-sm leading-relaxed">
                Cellular PVC or premium polymer with deep multi-tonal grain — visually closest to ipe or mahogany. Coolest underfoot in summer sun. Best for entertaining decks where the deck is the design centerpiece. 50-year structural warranty available.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            We bring sample boards from all three tiers to your free design consultation. You see and feel the actual finishes in your specific yard light before you commit to anything.
          </p>
        </Container>
      </section>

      {/* What We Build */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              What We Build
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {SCOPE_ITEMS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 md:gap-5 p-6 md:p-7 bg-neutral-50 border border-neutral-200 rounded-2xl">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-accent-orange/10 text-accent-orange flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary">{title}</h3>
                  <p className="mt-2 text-secondary text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Recent Bay Area Deck Projects
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {GALLERY.map((item) => (
              <figure key={item.src} className="group rounded-2xl overflow-hidden bg-white border border-neutral-200">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="p-4 text-sm font-heading font-semibold text-primary">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="text-center mt-10">
            <EstimateButton size="lg">
              Design Your Deck — Free Consultation
            </EstimateButton>
          </div>
        </Container>
      </section>

      {/* Why Us */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Why Bay Area Homeowners Choose Gadget
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-7">
                <div className="w-11 h-11 rounded-xl bg-accent-orange/10 text-accent-orange flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-heading font-bold text-primary">{title}</h3>
                <p className="mt-2 text-secondary text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What Other Deck Builders Get Wrong */}
      <section className="bg-primary py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading leading-tight" style={{ color: "#ffffff" }}>
              What Other Deck Builders Get Wrong
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-white/80 leading-relaxed">
              Composite decks have specific install requirements that wood-deck framers miss. We&apos;ve replaced enough failing &quot;composite&quot; decks built by other contractors to know exactly where the corners get cut.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            <div className="bg-neutral-50 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-red">The Shortcut</div>
              <p className="mt-2 font-heading font-bold text-primary text-lg">Wood-deck joist spacing on a composite build</p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Frames the deck at 16–24&quot; on-center like a wood deck. Composite boards flex under load — at that spacing you get a bouncy, sagging floor within a year. And it voids your manufacturer warranty.
              </p>
              <div className="mt-5 text-xs font-heading font-bold uppercase tracking-wider text-accent-orange">What We Do Instead</div>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Frame at 12–16&quot; OC depending on board profile and span — exactly to manufacturer spec. Diagonal layouts framed at 12&quot; OC. Solid floor that stays flat and rigid for the life of the deck.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-red">The Shortcut</div>
              <p className="mt-2 font-heading font-bold text-primary text-lg">No flashing at the house attachment</p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Bolts the ledger board straight to the siding without a kick-out diverter or step-flashing. Water rolls off the deck, behind the ledger, into the wall. Invisible rot for years — until the deck pulls away from the house.
              </p>
              <div className="mt-5 text-xs font-heading font-bold uppercase tracking-wider text-accent-orange">What We Do Instead</div>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Cut back the siding, install peel-and-stick membrane behind a continuous Z-flashing, then bolt the ledger over the flashing with structural lags into the rim joist. Water drains away from the house, not into it.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-red">The Shortcut</div>
              <p className="mt-2 font-heading font-bold text-primary text-lg">Mid-project board substitution</p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Quotes you premium boards (Trex Transcend, TimberTech AZEK Harvest) at the design visit. Delivers entry-level boards (Enhance, EDGE Prime+) when you&apos;re not looking. You don&apos;t notice until installed and warranty paperwork shows the wrong product.
              </p>
              <div className="mt-5 text-xs font-heading font-bold uppercase tracking-wider text-accent-orange">What We Do Instead</div>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Material specifications on every quote — manufacturer, line name, color, board count. You verify the delivery against the spec sheet before install. Manufacturer warranty registered in your name with serial-traced product.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-red">The Shortcut</div>
              <p className="mt-2 font-heading font-bold text-primary text-lg">Skipping the manufacturer fastener spec</p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Uses exposed deck screws on systems designed for hidden fasteners. Or wrong-pitch screws that mushroom the cap. Or non-stainless screws that rust-stain the boards within a season. Each one voids the manufacturer warranty.
              </p>
              <div className="mt-5 text-xs font-heading font-bold uppercase tracking-wider text-accent-orange">What We Do Instead</div>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Brand-specific hidden-fastener systems (Trex Hideaway, TimberTech CONCEALoc, Fiberon Stowaway) where the system supports them. Stainless screws and color-matched plug fasteners on perimeter and stair noses. Warranty stays valid for the full 25 or 50 years.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Bay Area Composite Deck Pricing
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Every project gets an itemized, fixed-price estimate after your free design consultation. Ranges below are typical for the Bay Area.
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            {pricing.map((row, i) => (
              <div
                key={row.service}
                className={`grid grid-cols-1 md:grid-cols-[1.5fr_auto] gap-2 md:gap-6 items-center p-5 md:p-6 ${
                  i !== pricing.length - 1 ? "border-b border-neutral-200" : ""
                }`}
              >
                <div>
                  <div className="font-heading font-semibold text-primary">{row.service}</div>
                  {row.note && (
                    <div className="text-xs text-neutral-400 mt-1">{row.note}</div>
                  )}
                </div>
                <div className="font-heading font-bold text-accent-orange text-lg md:text-xl whitespace-nowrap">
                  {row.range}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              How It Works — 5 Steps From Call to Finished Deck
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {PROCESS.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-5 md:gap-6 p-5 md:p-6 bg-neutral-50 border border-neutral-200 rounded-2xl"
              >
                <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-accent-orange text-white font-heading font-bold text-lg flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary text-lg">{step.title}</h3>
                  <p className="mt-1 text-secondary text-sm md:text-base leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FAQSection faqs={FAQS} heading="Composite Decks — Frequently Asked Questions" background="light" />

      {/* Service Area */}
      <section className="bg-white py-10 md:py-14 border-t border-neutral-200">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 max-w-4xl mx-auto">
            <div className="shrink-0 w-14 h-14 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center">
              <Phone size={24} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">
                Building Decks Across 31 Bay Area Cities
              </h2>
              <p className="mt-2 text-secondary leading-relaxed">
                Marin · San Francisco · Alameda · Contra Costa · San Mateo · Santa Clara. We design and build for the specific challenges of where you live — hillside multi-level builds for Mill Valley, Oakland Hills, and Berkeley grades; wind-resistant designs with reinforced railings for Pacifica and Sausalito coastal lots; small-yard maximization with privacy screening for SF Sunset and the Mission; large entertaining decks with built-in pergolas, fire pits, and outdoor kitchens for Peninsula backyards in Burlingame, San Carlos, and Palo Alto. Every build accounts for your microclimate — coastal salt air, hillside drainage, fog-belt cycling, or summer sun exposure.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LpFinalCTA
        heading="Ready for the Deck You've Been Picturing?"
        subtext="Free on-site design consultation with sample boards in your actual yard light. Fixed-price quote. Typical install in 1–3 weeks. We respond in minutes."
        bullets={[
          "Free design consultation at your property",
          "Sample boards so you see colors in your light",
          "Fixed-price quote — no hidden allowances",
          "Certified Trex, TimberTech & Fiberon installer",
        ]}
        service="composite-decks"
        formCtaText="Get My Free Consultation"
      />

      <LpFooter hideWarranty />
    </>
  );
}
