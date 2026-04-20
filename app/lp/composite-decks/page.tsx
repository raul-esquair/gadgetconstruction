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
    title: "Double Warranty Coverage",
    body: "25-year manufacturer warranty on the decking itself, plus our 5-year workmanship warranty on every cut, screw, and railing connection. Both in writing.",
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
    title: "Final Walkthrough & Warranty",
    body: "We walk the deck with you, ensure every detail is right, and hand over your warranty paperwork — manufacturer + Gadget Construction workmanship warranty, both in writing.",
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
          "Trex, TimberTech, and Fiberon certified composite deck builder serving 31 cities across the Bay Area. Multi-level decks, pergolas, railings, and LED lighting. Licensed Class B contractor (CA #1132983). 5-year workmanship warranty plus 25-year manufacturer warranty.",
          "$15,000–$60,000+",
        )}
      />

      <LpHeader />

      <LpHero
        eyebrow="Trex · TimberTech · Fiberon Certified"
        headline="Composite Decks Built to Last 25+ Years in the Bay Area"
        subheadline="Trex, TimberTech, and Fiberon certified installer. Zero staining, zero splinters, zero wood rot in fog and salt air. Free design consultation with a fixed-price quote."
        trustPoints={[
          "Free on-site design consultation",
          "Fixed-price quote — no surprise change orders",
          "Trex, TimberTech & Fiberon certified installer",
          "5-year workmanship + 25-year manufacturer warranty",
        ]}
        backgroundImage="/images/composite-decks-hero.jpg"
        imageAlt="Multi-level composite deck with stepped design attached to a residential home in the San Francisco Bay Area"
        service="composite-decks"
        formHeading="Get a Free Design Consultation"
        formSubtext="Takes under 20 seconds. We bring sample boards to your yard."
        formCtaText="Get My Free Consultation"
      />

      <LpTrustStrip />

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
                Marin · San Francisco · Alameda · Contra Costa · San Mateo · Santa Clara. Coastal towns (Sausalito, Pacifica, Daly City), hillside communities (Mill Valley, Berkeley Hills, Oakland Hills), and Peninsula backyards (Burlingame, San Carlos, Palo Alto) — we build composite decks that handle the specific microclimate where you live.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LpFinalCTA
        heading="Ready for a Deck That Lasts 25+ Years?"
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

      <LpFooter />
    </>
  );
}
