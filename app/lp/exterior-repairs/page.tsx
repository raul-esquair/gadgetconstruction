import type { Metadata } from "next";
import { CheckCircle2, AlertTriangle, Droplets, Hammer, Search, FileCheck, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { COMPANY } from "@/lib/constants";
import { SERVICE_PRICING } from "@/lib/pricing-data";
import Container from "@/components/ui/Container";
import JsonLd, { multiServiceGraphSchema } from "@/components/seo/JsonLd";
import { EstimateButton } from "@/components/ui/EstimateModal";
import FAQSection from "@/components/sections/FAQSection";
import LpHeader from "@/components/lp/LpHeader";
import LpHero from "@/components/lp/LpHero";
import LpTrustStrip from "@/components/lp/LpTrustStrip";
import LpFooter from "@/components/lp/LpFooter";
import LpFinalCTA from "@/components/lp/LpFinalCTA";

const pageUrl = `${COMPANY.url}/lp/exterior-repairs`;

export const metadata: Metadata = generatePageMetadata({
  title: "Dry Rot, Stucco & Siding Repair — Bay Area | Free Inspection",
  description:
    "Licensed Class B contractor (CA #1132983). Dry rot removal, stucco repair, Hardie board & wood siding across 31 Bay Area cities. Fixed-price quotes. 5-year warranty. Free inspection — we respond in minutes.",
  path: "/lp/exterior-repairs",
  noindex: true,
});

const SERVICES_NAV = [
  { id: "dry-rot", label: "Dry Rot" },
  { id: "stucco", label: "Stucco" },
  { id: "siding", label: "Siding" },
];

const DRY_ROT_SCOPE = [
  "Full water-intrusion assessment — we find where water is actually getting in",
  "Removal of every rotted piece of wood, no paint-over patches",
  "Sister-framing with pressure-treated or kiln-dried lumber",
  "New weather-resistive barrier, kickout flashing, and sealing",
  "Replacement siding, trim, or stucco color-matched to existing",
];

const STUCCO_SCOPE = [
  "Hairline crack patching and spot repair with texture matching",
  "Elevation re-coat (one wall) over sound existing stucco",
  "Full three-coat re-stucco — new WRB, wire lath, scratch, brown, color",
  "Works on Doelger homes, Victorians, Edwardians, mid-century SF rowhouses",
  "Color-coat specialist for blending new work with weathered stucco",
];

const SIDING_SCOPE = [
  "James Hardie fiber cement — fire-rated, zero rot, 30+ year lifespan",
  "LP SmartSide composite — wood look, fiber cement durability",
  "Cedar, redwood, and clapboard — period-correct for Victorians and Craftsmans",
  "Full removal, new WRB, rainscreen or furring strips where needed",
  "Color-matched paint or factory pre-finished panels",
];

const DIFFERENTIATORS = [
  {
    icon: Search,
    title: "We Fix the Cause, Not the Symptom",
    body: "Every exterior repair starts with finding where water is actually getting in. Patch the stucco crack without finding the failed kickout flashing above it and the damage is back in 18 months. We don't work that way.",
  },
  {
    icon: FileCheck,
    title: "Licensed Class B + Full Permit Handling",
    body: "CA License #1132983. We handle permits through SF's DBI, Marin's CDA, Oakland's Planning & Building, and every Peninsula and South Bay jurisdiction we serve. You don't file a single form.",
  },
  {
    icon: MapPin,
    title: "Bay Area-Specific Experience",
    body: "500+ projects across 31 cities. We know what fog does to Sunset Doelgers, what salt air does to Pacifica homes, what wind-driven rain does to Marin hillside siding. Not generic advice.",
  },
  {
    icon: ShieldCheck,
    title: "Fixed-Price + 5-Year Workmanship Warranty",
    body: "Every repair priced up front. No mystery allowances. Every elevation and every nail backed by our written 5-year workmanship warranty.",
  },
];

const PROCESS = [
  {
    title: "Free On-Site Inspection",
    body: "We walk the entire envelope of your home — every wall, window, door, fascia, and roof edge. We probe suspect areas and photograph every finding. You get a written report, not a verbal guess.",
  },
  {
    title: "Written Scope & Fixed-Price Estimate",
    body: "Every repair itemized with a fixed price. No 'allowances' that balloon mid-project. You know exactly what you're paying before we start.",
  },
  {
    title: "Permits & Scheduling",
    body: "Full re-stucco and large siding replacements typically trigger a permit in most Bay Area jurisdictions. We pull them. You don't touch a form.",
  },
  {
    title: "Repair & Weatherproofing",
    body: "We work in the right sequence: remove damage, replace framing and sheathing, install WRB and flashing, then re-clad. Every layer matters — skip one and the next leak is a year away.",
  },
  {
    title: "Walkthrough & 5-Year Warranty",
    body: "We walk the finished work with you. You don't sign off until every punch-list item is done. Every repair backed by our written 5-year workmanship warranty.",
  },
];

const FAQS = [
  {
    question: "How do I know if it's dry rot or termite damage?",
    answer:
      "Dry rot is caused by water and a wood-decaying fungus. It turns wood soft, spongy, and crumbly — often with visible cracked or cubical patterns. Termite damage usually shows hollow galleries running with the grain, sometimes with mud tubes on the outside. In Bay Area homes the two frequently occur together: water damage creates softened wood, which termites then exploit. We inspect for both during every exterior repair project and coordinate with licensed pest control if termite treatment is needed before we rebuild.",
  },
  {
    question: "Do I need a permit for stucco repair in San Francisco or the Bay Area?",
    answer:
      "Small crack patching and localized stucco repair typically do not require a permit. Full re-stucco of one or more elevations, or any work that disturbs the weather-resistive barrier behind the stucco, generally does require a building permit — in SF (DBI), Oakland, Berkeley, and most Peninsula and Marin jurisdictions. We pull permits for every job where they're required and handle all city inspections. If you're unsure, we clarify permit requirements during the estimate.",
  },
  {
    question: "How much does exterior repair cost in the Bay Area?",
    answer:
      "Small dry rot patches typically run $800–$2,500. Whole-wall dry rot with framing replacement runs $4,000–$12,000. Stucco crack patching starts around $400–$1,500. A full re-stucco of one elevation runs $4,000–$9,000; a whole-house re-stucco runs $15,000–$35,000. Hardie board siding averages $14–$22 per square foot installed; wood siding runs $10–$16 per square foot. Every project gets an itemized, fixed-price estimate after inspection — no vague allowances.",
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
    question: "What happens if you find more damage once you open up the wall?",
    answer:
      "We include a contingency for typical surprise findings in every estimate — about 10–15% depending on the home's age. If we open a wall and find significantly more rotted framing than the inspection suggested, we stop, photograph the finding, and give you a written change order before doing any additional work. You approve (or decline) in writing. We never surprise you with a bigger bill at the end of the job.",
  },
  {
    question: "How long does an exterior repair project take?",
    answer:
      "Small dry rot or stucco patches typically take 1–3 days. Whole-elevation stucco re-coat or siding replacement usually runs 1–2 weeks. Full-house re-stucco or complete re-siding typically takes 2–4 weeks depending on size and weather. We give you a specific timeline with the estimate and update you weekly. 94% of our projects finish on or ahead of schedule.",
  },
];

interface ServiceSectionProps {
  id: string;
  pill: string;
  heading: string;
  pain: string;
  scope: string[];
  pricingBlurb: string;
  ctaText: string;
  isAlt?: boolean;
}

function ServiceSection({ id, pill, heading, pain, scope, pricingBlurb, ctaText, isAlt = false }: ServiceSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-36 py-14 md:py-20 ${isAlt ? "bg-neutral-50" : "bg-white"}`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-heading font-semibold uppercase tracking-wider mb-4">
              <AlertTriangle size={13} />
              {pill}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              {heading}
            </h2>
            <p className="mt-4 text-base md:text-lg text-secondary leading-relaxed">
              {pain}
            </p>
            <div className="mt-5 flex items-start gap-2.5 p-4 rounded-xl bg-neutral-900 text-white">
              <Droplets size={18} className="text-accent-orange shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed" style={{ color: "#ffffff" }}>
                <span className="font-heading font-semibold">Pricing: </span>
                <span className="text-white/80">{pricingBlurb}</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-heading font-bold uppercase tracking-wider text-neutral-400 mb-4">
              What we do
            </h3>
            <ul className="space-y-3">
              {scope.map((item) => (
                <li key={item} className="flex items-start gap-3 text-secondary">
                  <CheckCircle2 size={20} className="text-accent-orange shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <EstimateButton size="md">
                {ctaText}
              </EstimateButton>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-primary text-primary font-heading font-semibold text-base hover:bg-primary hover:text-white transition-all"
              >
                Or call {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function ExteriorRepairsLpPage() {
  const pricing = SERVICE_PRICING["exterior-repairs"];

  return (
    <>
      <JsonLd
        data={multiServiceGraphSchema({
          pageUrl,
          services: [
            {
              id: "dry-rot-repair",
              name: "Dry Rot Repair",
              serviceType: "Dry Rot Repair",
              description:
                "Dry rot removal and framing replacement for Bay Area homes — window sills, fascia, trim, sheathing, and sister-framing. Licensed Class B contractor, 5-year warranty.",
              priceRange: "$800–$12,000",
            },
            {
              id: "stucco-repair",
              name: "Stucco Repair & Re-Stucco",
              serviceType: "Stucco Repair",
              description:
                "Stucco crack patching, color-coat matching, elevation re-coats, and full three-coat re-stucco across the San Francisco Bay Area. Permits handled.",
              priceRange: "$400–$35,000",
            },
            {
              id: "siding-installation",
              name: "Siding Installation & Replacement",
              serviceType: "Siding Installation",
              description:
                "Hardie board (fiber cement), wood, cedar, and composite siding installation and replacement for Bay Area homes. Full removal, flashing, and finish.",
              priceRange: "$10–$22/sq ft installed",
            },
          ],
        })}
      />

      <LpHeader />

      <LpHero
        eyebrow="Dry Rot · Stucco · Siding"
        headline="Bay Area Dry Rot, Stucco & Siding Repair — Done Right the First Time"
        subheadline="Fog and salt air don't stay outside forever. Catch exterior damage early and your home stays watertight for 30+ years. Wait and you're rebuilding framing."
        trustPoints={[
          "Free on-site inspection with written report",
          "Fixed-price quotes — no surprise change orders",
          "Full permit handling across 31 Bay Area cities",
          "5-year workmanship warranty in writing",
        ]}
        backgroundImage="/images/why-choose-us-bg.jpg"
        imageAlt="Finished residential exterior in the San Francisco Bay Area after dry rot repair and siding work by Gadget Construction"
        service="exterior-repairs"
        formHeading="Get a Free Inspection"
        formSubtext="Takes under 20 seconds. We respond in minutes."
        formCtaText="Get My Free Inspection"
      />

      <LpTrustStrip />

      {/* Anchor nav */}
      <nav
        aria-label="Services on this page"
        className="bg-white border-b border-neutral-200 sticky top-16 md:top-20 z-30"
      >
        <Container>
          <ul className="flex items-center justify-center gap-2 md:gap-4 py-3 overflow-x-auto">
            {SERVICES_NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 text-primary text-sm font-heading font-semibold hover:bg-accent-orange hover:text-white transition-colors whitespace-nowrap"
                >
                  {item.label} Repair
                  <ArrowRight size={14} />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <ServiceSection
        id="dry-rot"
        pill="Catch it early"
        heading="Dry Rot Repair — Find the Cause, Not Just the Damage"
        pain="By the time you see dry rot on the outside — soft wood near a window sill, crumbling fascia, blistering paint — it has been rotting for months behind the wall. The $800 patch you should have done two years ago is now a $12,000 framing rebuild. We find where the water is getting in first, then rebuild."
        scope={DRY_ROT_SCOPE}
        pricingBlurb="$800 for single-sill patches. $4,000–$12,000 for whole-wall rebuilds with new framing and sheathing."
        ctaText="Get a Free Dry Rot Inspection"
      />

      <ServiceSection
        id="stucco"
        pill="From hairline to re-coat"
        heading="Stucco Repair — Crack Patching to Full Three-Coat Re-Stucco"
        pain="Stucco cracks aren't cosmetic. They're water entry points. The hairline you ignored last rainy season is the reason your framing is soft this year. And when stucco fails behind the surface, patching doesn't fix it — only a proper three-coat re-stucco does. We diagnose which one you actually need."
        scope={STUCCO_SCOPE}
        pricingBlurb="Crack patching from $400. Whole-elevation re-coat $4,000–$9,000. Full-house re-stucco $15,000–$35,000."
        ctaText="Get a Free Stucco Estimate"
        isAlt
      />

      <ServiceSection
        id="siding"
        pill="30+ year siding"
        heading="Siding — Hardie Board, Wood & Composite"
        pain="Wood siding in Bay Area fog and salt air needs repainting every 5–8 years. Eventually it rots from the inside — by the time you see the damage it's already in the sheathing behind it. The right siding installed right lasts 30+ years with nearly zero maintenance."
        scope={SIDING_SCOPE}
        pricingBlurb="Hardie board $14–$22/sq ft installed. Wood and cedar $10–$16/sq ft installed. Whole-house siding replacement $18,000–$60,000+."
        ctaText="Get a Free Siding Estimate"
      />

      {/* Why Us */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Why Homeowners Trust Gadget Construction
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-7">
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
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Exterior Repair Costs in the Bay Area
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Every project gets an itemized, fixed-price estimate after on-site inspection. Ranges below are typical for the Bay Area — your exact number depends on scope, access, and home age.
            </p>
          </div>
          <div className="max-w-4xl mx-auto border border-neutral-200 rounded-2xl overflow-hidden">
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
          <div className="text-center mt-8">
            <EstimateButton size="lg">
              Get My Fixed-Price Quote
            </EstimateButton>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Our Process — 5 Steps From Call to Warranty
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {PROCESS.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-5 md:gap-6 p-5 md:p-6 bg-white border border-neutral-200 rounded-2xl"
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

      <FAQSection faqs={FAQS} heading="Exterior Repair — Frequently Asked Questions" background="white" />

      {/* Service Area */}
      <section className="bg-white py-10 md:py-14 border-t border-neutral-200">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 max-w-4xl mx-auto">
            <div className="shrink-0 w-14 h-14 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center">
              <Hammer size={24} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">
                Serving 31 Cities Across 6 Bay Area Counties
              </h2>
              <p className="mt-2 text-secondary leading-relaxed">
                Marin · San Francisco · Alameda · Contra Costa · San Mateo · Santa Clara. Same-week dispatch to most Bay Area cities for inspection. SF Doelgers, Victorians, Craftsman bungalows, Eichlers, Peninsula ranches, Marin hillside homes — we know what water damage looks like in your specific neighborhood.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LpFinalCTA
        heading="Catch the Damage Before It Hits Your Framing"
        subtext="Every week you wait, water is moving deeper into your wall. Free on-site inspection takes 30 minutes. Written report same day. We respond in minutes."
        bullets={[
          "Free on-site inspection with full written report",
          "Fixed-price quote — no hidden allowances",
          "Licensed Class B, fully insured, 5-year warranty",
          "Same-week scheduling across the Bay Area",
        ]}
        service="exterior-repairs"
        formCtaText="Get My Free Inspection"
      />

      <LpFooter />
    </>
  );
}
