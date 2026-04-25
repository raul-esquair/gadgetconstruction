import type { Metadata } from "next";
import {
  Hammer,
  Palette,
  Home,
  Building2,
  AppWindow,
  Layers,
  Search,
  ClipboardCheck,
  Construction,
  Eye,
  Droplets,
  AlertTriangle,
  Phone,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICE_PRICING } from "@/lib/pricing-data";
import Container from "@/components/ui/Container";
import JsonLd, { serviceSchema } from "@/components/seo/JsonLd";
import FAQSection from "@/components/sections/FAQSection";
import LpHeader from "@/components/lp/LpHeader";
import LpHero from "@/components/lp/LpHero";
import LpTrustStrip from "@/components/lp/LpTrustStrip";
import LpFooter from "@/components/lp/LpFooter";
import LpFinalCTA from "@/components/lp/LpFinalCTA";

export const metadata: Metadata = generatePageMetadata({
  title: "Stucco Repair, Bay Area — Crack Patching to Full Re-Stucco | Free Inspection",
  description:
    "Bay Area stucco repair specialists. Three-coat re-stucco only — no acrylic-finish shortcuts. We diagnose patch vs re-coat vs tear-off, color and texture matched. Free moisture probe before quoting. CA Lic #1132983.",
  path: "/lp/stucco-repair",
  noindex: true,
});

const SCOPE_ITEMS = [
  {
    icon: Hammer,
    title: "Hairline Crack Patching",
    body: "Cosmetic and minor structural cracks — color-matched, re-textured, and sealed against future water entry. Most patches done same day.",
  },
  {
    icon: Palette,
    title: "Section Re-Coat",
    body: "New finish coat over sound existing scratch and brown layers. The fix when the substrate is solid but the surface is failing.",
  },
  {
    icon: Home,
    title: "Full Re-Stucco — Single Elevation",
    body: "Tear-off, new lath, new weather-resistive barrier (WRB), three-coat system. The right call when the substrate is compromised on one wall.",
  },
  {
    icon: Building2,
    title: "Whole-House Re-Stucco",
    body: "Complete exterior re-stucco for homes 30+ years old or after major water damage. Three-coat traditional system with proper flashing at every penetration.",
  },
  {
    icon: AppWindow,
    title: "Window & Door Stucco Closure",
    body: "Stucco patching around new window installs and door replacements — color and texture matched to your existing finish.",
  },
  {
    icon: Layers,
    title: "EIFS / Synthetic Finish Repair",
    body: "Modern EIFS systems with synthetic acrylic finish coats. We diagnose and repair without needing to tear out the entire wall.",
  },
  {
    icon: Search,
    title: "Moisture Investigation",
    body: "Probe-only diagnostic service if you're not sure what's wrong. $250 flat, credited toward repair if you proceed. We show you the data, not just our opinion.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: ClipboardCheck,
    title: "We Diagnose, Then Quote",
    body: "Most contractors over-spec because re-stucco pays better than a $400 patch. We probe-test, photograph the substrate, and tell you whether you actually need a patch or full re-stucco. Honest scope, every time.",
  },
  {
    icon: Construction,
    title: "Three-Coat System Only",
    body: "We don't do acrylic-finish shortcuts. Real wire lath, scratch coat, brown coat, finish coat — with proper cure times between layers. The way stucco was built to last 50 years.",
  },
  {
    icon: Eye,
    title: "Color & Texture Match Guaranteed",
    body: "Bay Area stucco varies — Spanish-style smooth, dash, sand finish, lace, swirl. We sample your existing texture and color before mixing the finish coat. No mismatched patches.",
  },
  {
    icon: Droplets,
    title: "Free Moisture Probe Before Quoting",
    body: "We bring a moisture meter and borescope to every inspection. You see whether the framing behind your stucco is dry or already rotting — before any work starts.",
  },
];

const PROCESS = [
  {
    title: "Free On-Site Inspection",
    body: "We come out within 48 hours. Moisture meter, borescope, photographed cracks. You see the data before any quote.",
  },
  {
    title: "Diagnostic Quote",
    body: "Patch, re-coat, or tear-off — we tell you exactly what your wall needs and why. Itemized fixed-price quote, no open-ended estimates.",
  },
  {
    title: "Color & Texture Match",
    body: "We sample your existing finish and mix the new color in advance. If it's a section repair, you'll approve the match before we start application.",
  },
  {
    title: "Three-Coat Application",
    body: "Scratch coat, brown coat, finish coat — applied with proper cure times between layers. We don't rush the cure. Permitted when required.",
  },
  {
    title: "Final Walkthrough",
    body: "We walk the wall with you, verify color, texture, and seal around windows and doors. We don't leave until you're satisfied.",
  },
];

const FAQS = [
  {
    question: "Why does stucco crack in the first place?",
    answer:
      "Three main causes in the Bay Area: (1) Foundation movement — clay soil expansion in winter, contraction in summer pulls walls apart slightly. (2) Building movement — seismic activity, even small tremors. (3) Aging caulk and flashing — once the seals around windows fail, water gets behind the stucco and accelerates cracking. Hairline cracks are normal in 30+ year old stucco. The question is whether they're letting water in — that's what we test for.",
  },
  {
    question: "Is patching enough or do I need a full re-coat?",
    answer:
      "Depends on three things: how many cracks, how wide they are, and what's behind them. Hairline cracks (less than 1/16 inch) on stucco less than 30 years old usually need patching only — $400–$800 for an entire elevation. Cracks wider than 1/8 inch, multiple cracks, or any sign of moisture behind the stucco usually means re-coat or tear-off. We probe-test before quoting so you're not guessing.",
  },
  {
    question: "How do you match the existing texture and color?",
    answer:
      "Texture: we identify your finish (smooth, dash, sand, lace, swirl, or one of the variations) and replicate the application technique. Color: we either match to your existing pigment with a sample from a hidden spot, or apply a full elevation re-coat so the new color is uniform across the whole wall. You can't perfectly color-match a 30-year-old sun-faded stucco panel-by-panel — that's why we recommend full elevation re-coats when patches would be visible.",
  },
  {
    question: "How long until I can paint or seal it?",
    answer:
      "New three-coat stucco needs 28–30 days to fully cure before painting or sealing. Patches and re-coats need 7–14 days depending on weather and humidity. We let you know exactly when you can paint based on your specific job. Painting too early traps moisture in the stucco and causes finish failure within 1–2 years.",
  },
  {
    question: "Do you do whole-house re-stucco?",
    answer:
      "Yes — that's a significant portion of our stucco work. Three-coat traditional system, new wire lath, new weather-resistive barrier (WRB), proper flashing around all openings (windows, doors, vents, hose bibs). Typical cost for a 1,500–2,500 sq ft exterior: $12,000–$30,000. Takes 3–5 weeks depending on home size and weather.",
  },
  {
    question: "Will my homeowner's insurance cover stucco repair?",
    answer:
      "Sometimes. Insurance covers sudden water events (storm damage, fallen tree breaking the wall) but not gradual moisture intrusion or normal wear. The exception: if a covered event caused the crack — for example, a windstorm broke a tree branch that hit the wall — your insurance often covers the resulting stucco damage. We can document the cause and timeline for your adjuster if there's a coverage angle.",
  },
];

export default function StuccoRepairLpPage() {
  const pricing = SERVICE_PRICING["stucco-repair"];

  return (
    <>
      <JsonLd
        data={serviceSchema(
          "Stucco Repair",
          "Bay Area stucco repair specialists serving 31 cities across Marin, San Francisco, San Mateo, Santa Clara, Alameda, and Contra Costa counties. Three-coat traditional system only — no acrylic-finish shortcuts. Hairline crack patching, section re-coat, full re-stucco, whole-house re-stucco, EIFS repair. Color and texture match guaranteed. Licensed Class B contractor (CA #1132983).",
          "$200–$30,000+",
        )}
      />

      <LpHeader />

      <LpHero
        eyebrow="Stucco Repair · Bay Area Specialists"
        headline="Stucco Repair, Bay Area — Crack Patching to Full Re-Stucco"
        subheadline="Hairline cracks let water behind the lath in 6–12 months. We diagnose patch vs re-coat vs tear-off, three-coat repair only, color and texture matched. Free moisture probe of the substrate before quoting. CA Lic #1132983."
        trustPoints={[
          "Free moisture probe — we test the substrate, not just the surface",
          "Three-coat re-stucco only — no acrylic-finish shortcuts",
          "Color and texture matched to your existing finish",
          "Same-week inspections across the Bay Area",
        ]}
        backgroundImage="/images/stucco-hero.jpg"
        imageAlt="Gadget Construction crew on scaffolding performing stucco work on a Bay Area home — full window masking, plastic containment, professional setup for three-coat application"
        service="stucco-repair"
        formHeading="Get Your Free Stucco Inspection"
        formSubtext="Free on-site inspection. Fixed-price quote. Response in minutes."
        formCtaText="Schedule My Inspection"
      />

      <LpTrustStrip hideWarranty />

      {/* Educational — why stucco cracks */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Why Stucco Cracks in the Bay Area
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-6 text-secondary leading-relaxed text-base md:text-lg">
              Stucco is a three-layer system — scratch coat, brown coat, finish coat — applied over wire lath and a moisture barrier. When the system holds together, it lasts decades. When it cracks, water gets behind the finish coat and starts rotting the lath, the framing, and eventually the sheathing inside the wall.
            </p>
            <p className="mt-4 text-secondary leading-relaxed text-base md:text-lg">
              Bay Area homes see this faster than most because of fog, foundation movement on clay soil, and aging caulk around windows. Most cracks are fixable cheaply if caught early. The trick is knowing whether you need a patch, a re-coat, or a tear-off — and most contractors over-spec because re-stucco pays better than a $400 patch.
            </p>
          </div>
        </Container>
      </section>

      {/* What we repair */}
      <section id="scope" className="bg-neutral-50 py-14 md:py-20 scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              What We Repair
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              From a single hairline crack to a whole-house re-stucco — we handle it all.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {SCOPE_ITEMS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 md:gap-5 p-6 md:p-7 bg-white border border-neutral-200 rounded-2xl">
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

      {/* Why Gadget */}
      <section id="why-gadget" className="bg-white py-14 md:py-20 scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Why Bay Area Homeowners Choose Gadget for Stucco
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
      <section id="pricing" className="bg-neutral-50 py-14 md:py-20 scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Bay Area Stucco Pricing — What You&apos;ll Actually Pay
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Final price depends on extent of damage, access, and finish work. We give you an itemized fixed-price quote after the moisture probe inspection.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8 bg-accent-red/5 border-l-4 border-accent-red rounded-r-xl p-5 md:p-6 flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-accent-red/10 text-accent-red flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-primary text-base md:text-lg">
                Why waiting costs more
              </h3>
              <p className="mt-1 text-secondary text-sm md:text-base leading-relaxed">
                A $400 hairline patch this fall becomes a $9,000 wall rebuild after one wet winter — once water reaches the framing, the rot doesn&apos;t stop. Bay Area fog season is unforgiving on cracked stucco.
              </p>
            </div>
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

          <div className="max-w-4xl mx-auto mt-6 text-xs md:text-sm text-neutral-500 leading-relaxed space-y-1.5">
            <p>
              <span className="font-heading font-semibold text-primary">Includes:</span> labor, materials, debris haul, color and texture match.
            </p>
            <p>
              <span className="font-heading font-semibold text-primary">Not included:</span> exterior paint or sealer (recommended after 28-day cure on full re-stucco), permits if required by your jurisdiction ($200–$600 typical), framing repair if dry rot is found behind the stucco (separate scope, quoted at the same time).
            </p>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section id="process" className="bg-white py-14 md:py-20 scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              How It Works — 5 Steps From Call to Cured Stucco
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

      <div id="faq" className="scroll-mt-20">
        <FAQSection faqs={FAQS} heading="Stucco Repair — Frequently Asked Questions" background="white" />
      </div>

      {/* Service Area */}
      <section id="service-area" className="bg-white py-10 md:py-14 border-t border-neutral-200 scroll-mt-20">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 max-w-4xl mx-auto">
            <div className="shrink-0 w-14 h-14 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center">
              <Phone size={24} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">
                We Repair Stucco Across 31 Bay Area Cities
              </h2>
              <p className="mt-2 text-secondary leading-relaxed">
                Marin · San Francisco · San Mateo · Santa Clara · Alameda · Contra Costa counties. From Sunset stuccos to Marina-style facades to Peninsula ranch homes — we know the stucco systems and finish patterns specific to your neighborhood.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LpFinalCTA
        heading="Don&apos;t Wait for the First Wet Winter"
        subtext="The cracks you ignore today become wall damage by spring. Free moisture probe inspection — we tell you whether you need a patch or a full re-stucco, with no pressure to upsell."
        bullets={[
          "Same-week inspection across the Bay Area",
          "Free moisture probe of the substrate (not just the surface)",
          "Honest scope — we don't over-spec to inflate the quote",
          "Color and texture match included in every quote",
          "Licensed (CA #1132983), bonded, fully insured",
        ]}
        service="stucco-repair"
        formCtaText="Schedule My Free Inspection"
      />

      <LpFooter hideWarranty />
    </>
  );
}
