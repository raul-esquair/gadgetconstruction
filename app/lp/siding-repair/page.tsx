import type { Metadata } from "next";
import {
  Hammer,
  Palette,
  Home,
  Building2,
  Layers,
  Construction,
  Shield,
  Eye,
  ClipboardCheck,
  PaintBucket,
  Search,
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
  title: "Bay Area Siding Repair — Eichler T1-11, Doelger, Hardie & Redwood | Free Inspection",
  description:
    "Bay Area siding repair specialists. We work with your original siding type — T1-11, redwood, fiber cement, shingle, board-and-batten. Tear-off includes housewrap and flashing inspection. Paint match included. CA Lic #1132983.",
  path: "/lp/siding-repair",
  noindex: true,
});

const SCOPE_ITEMS = [
  {
    icon: Hammer,
    title: "Single Board Replacement",
    body: "T1-11, redwood, fiber cement, lap siding — single damaged or rotted board removed and replaced, pattern-matched, ready for paint.",
  },
  {
    icon: Palette,
    title: "Section Repair with Paint Match",
    body: "Multi-board section repair with full pattern continuity and Sherwin-Williams or Benjamin Moore color match. Looks like nothing happened.",
  },
  {
    icon: Home,
    title: "Single Wall Re-Side",
    body: "Full tear-off of one elevation, new Tyvek HomeWrap, flashing inspection at every penetration, new siding to match the rest of the house.",
  },
  {
    icon: Building2,
    title: "Whole-House Re-Side",
    body: "Complete exterior re-side — full tear-off, new housewrap, new flashing at every window/door/vent, new siding system. The right call when 30+ years old.",
  },
  {
    icon: Layers,
    title: "Eichler T1-11 Vertical Siding",
    body: "Peninsula specialty — Palo Alto, Mountain View, Sunnyvale, parts of SF Sunset. Original T1-11 plywood vertical-grain pattern, matched and replaced like-for-like.",
  },
  {
    icon: Construction,
    title: "Doelger & Craftsman Horizontal Lap",
    body: "SF Sunset Doelger tract homes, Berkeley craftsmans, Oakland hills lap-and-shingle. We know the original profiles and source material to match.",
  },
  {
    icon: Shield,
    title: "Asbestos Siding Removal",
    body: "Pre-1980 homes often have asbestos shingle siding. We're certified to handle removal, containment, and disposal per Bay Area regulations — and replace with modern fiber cement or wood.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: Eye,
    title: "We Match Your Siding Type",
    body: "Most contractors push you to switch to fiber cement because it's cheaper for them to install. We work with your original siding — T1-11, redwood, cedar shingle, board-and-batten, lap. If the original system was right for your home, we keep it.",
  },
  {
    icon: ClipboardCheck,
    title: "Repair vs Replacement — Both Quoted",
    body: "We give you the cost of fixing one wall and the cost of re-siding the whole house, side-by-side. You decide based on your timeline, budget, and how long you plan to stay in the home.",
  },
  {
    icon: PaintBucket,
    title: "Paint Match Included",
    body: "Sherwin-Williams or Benjamin Moore color match included in every quote. You can paint yourself or have our crew handle it as a separate scope.",
  },
  {
    icon: Search,
    title: "Tear-Off Inspects What's Behind",
    body: "Every tear-off includes a housewrap and flashing inspection. We open the wall, photograph what we find, and address moisture damage or dry rot before the new siding goes on. No covering up problems.",
  },
];

const PROCESS = [
  {
    title: "Free On-Site Inspection",
    body: "We come out within 48 hours. Identify your siding type, assess scope of damage, photograph everything, probe-test for moisture behind the wall.",
  },
  {
    title: "Repair vs Replacement Quote",
    body: "Both options priced side-by-side. We tell you which one we'd recommend and why — based on your siding age, damage extent, and how long you plan to stay.",
  },
  {
    title: "Material Order & Paint Match",
    body: "We source matching siding (T1-11, redwood, fiber cement, etc.) and pull a paint sample for color match. Materials in hand before we start tear-off.",
  },
  {
    title: "Tear-Off & Install",
    body: "Selective tear-off, housewrap and flashing inspection, structural repair if needed, new siding install. Permitted when required.",
  },
  {
    title: "Final Walkthrough",
    body: "We walk the wall with you, verify the pattern matches, check the paint match, and confirm every flashing detail. We don't leave until it looks like nothing ever happened.",
  },
];

const FAQS = [
  {
    question: "Can you match my existing siding pattern?",
    answer:
      "Almost always, yes. T1-11 plywood vertical-grain (Eichler-style), redwood lap (Marin and Berkeley), fiber cement Hardie (modern installs), cedar shingle (Craftsman), board-and-batten (newer construction) — we have suppliers for all the common Bay Area siding types. The exception: very old custom-milled redwood or vintage asbestos shingle. For those, we'll source the closest available match and work with you on color blending.",
  },
  {
    question: "Repair vs full replacement — how do you decide?",
    answer:
      "Three factors: (1) extent of damage — if more than 30% of one elevation is failing, full re-side is usually cheaper than ongoing patches; (2) age — siding past 30 years old is often near end-of-life everywhere, not just where it's visible; (3) what's behind it — if the housewrap and flashing are also failing, you're better off doing the full system. We quote both and explain our recommendation.",
  },
  {
    question: "Do I need a permit for siding work?",
    answer:
      "Spot repairs and small section replacements typically don't need permits in most Bay Area cities. Whole-wall and whole-house re-sides usually do — and require a moisture barrier inspection by the building department. SF DBI, Marin Community Development, and each Peninsula and South Bay city have their own thresholds. We pull all required permits as part of the job.",
  },
  {
    question: "How long does whole-house siding take?",
    answer:
      "Typical 1,800 sq ft home: 2–4 weeks depending on weather and complexity. Tear-off and housewrap take 3–5 days. New siding install takes 7–14 days. Flashing, trim, and finish work add another 3–5 days. We give you a written timeline before starting and call you proactively if anything changes.",
  },
  {
    question: "Will you handle paint after install?",
    answer:
      "Yes — as a separate scope or bundled with the install. Our quote includes the paint color match (Sherwin-Williams or Benjamin Moore spec) at no extra cost. If you want our crew to also paint, that's typically $3–$8 per square foot depending on number of coats and prep. Many homeowners prime + paint themselves to save cost.",
  },
  {
    question: "What about asbestos siding from older homes?",
    answer:
      "Many pre-1980 Bay Area homes have asbestos cement shingle siding (often mistaken for slate or wood). It's safe when intact, but disturbing it during repair releases fibers — which is why most contractors won't touch it. We're certified for asbestos handling: containment, removal, and disposal per California regulations. We remove it safely and re-side with modern fiber cement or wood. Adds $8–$15 per square foot to the project depending on quantity.",
  },
];

export default function SidingRepairLpPage() {
  const pricing = SERVICE_PRICING["siding-repair"];

  return (
    <>
      <JsonLd
        data={serviceSchema(
          "Siding Repair and Replacement",
          "Bay Area siding repair specialists serving 31 cities across Marin, San Francisco, San Mateo, Santa Clara, Alameda, and Contra Costa counties. T1-11, fiber cement, redwood, cedar shingle, lap siding, and board-and-batten. Eichler and Doelger specialty. Asbestos siding removal certified. Every tear-off includes housewrap and flashing inspection. Paint match included. Licensed Class B contractor (CA #1132983).",
          "$200–$45,000+",
        )}
      />

      <LpHeader />

      <LpHero
        eyebrow="Siding Repair & Replacement · Bay Area Specialists"
        headline="Bay Area Siding Repair — From Eichler T1-11 to Doelger Horizontal to Modern Hardie"
        subheadline="Failing siding lets water in. Within 12 months, you've got dry rot in the framing behind it. We work with your original siding type, match paint and pattern, and include a flashing and housewrap inspection on every tear-off. CA Lic #1132983."
        trustPoints={[
          "We match your existing siding type — T1-11, redwood, fiber cement, shingle, board-and-batten",
          "Selective repair vs full replacement — both options quoted",
          "Paint match (Sherwin-Williams / Benjamin Moore) included in every quote",
          "Pre-1980 asbestos siding handled per Bay Area regulations",
        ]}
        backgroundImage="/images/siding-hero.jpg"
        imageAlt="Gadget Construction crew installing DuPont Tyvek HomeWrap on a Bay Area home during siding tear-off and replacement — proper moisture barrier behind new siding"
        service="siding-repair"
        formHeading="Get Your Free Siding Inspection"
        formSubtext="Free on-site inspection. Both repair and replacement options quoted."
        formCtaText="Schedule My Inspection"
      />

      <LpTrustStrip hideWarranty />

      {/* Educational — why Bay Area siding fails faster */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Why Bay Area Siding Fails Faster
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-6 text-secondary leading-relaxed text-base md:text-lg">
              Bay Area siding takes more abuse than most. Coastal salt air, fog cycling, and aging building paper let water past the siding into the wall cavity. By the time you see swelling, peeling paint, or visible rot, the housewrap and sheathing behind are usually compromised too.
            </p>
            <p className="mt-4 text-secondary leading-relaxed text-base md:text-lg">
              The right repair restores both layers — not just the visible siding. That&apos;s why we open the wall, inspect the housewrap and flashing, and fix what&apos;s broken before installing new siding. Cover up the moisture problem and you&apos;ll be paying for it again in 3 years.
            </p>
          </div>
        </Container>
      </section>

      {/* What we repair */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              What We Repair & Replace
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              From a single rotted board to a whole-house re-side — we handle all Bay Area siding systems.
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
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Why Bay Area Homeowners Choose Gadget for Siding
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
              Bay Area Siding Pricing — What You&apos;ll Actually Pay
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Final price depends on siding type, extent of tear-off, and finish work. We give you an itemized fixed-price quote after the on-site inspection.
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
                A $400 single board replacement today saves the $4,000 wall re-side that comes when water reaches the housewrap behind. Once the framing is wet, the scope multiplies fast — and dry rot doesn&apos;t pause for fog season.
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
              <span className="font-heading font-semibold text-primary">Includes:</span> labor, materials, debris haul, paint color match (Sherwin-Williams or Benjamin Moore), and housewrap/flashing inspection.
            </p>
            <p>
              <span className="font-heading font-semibold text-primary">Not included:</span> paint application beyond color spec, permits if required by your jurisdiction ($200–$600 typical), framing repair if dry rot is found behind the siding (separate scope, quoted at the same time).
            </p>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              How It Works — 5 Steps From Call to Finished Siding
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

      <FAQSection faqs={FAQS} heading="Siding Repair & Replacement — Frequently Asked Questions" background="white" />

      {/* Service Area */}
      <section className="bg-white py-10 md:py-14 border-t border-neutral-200">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 max-w-4xl mx-auto">
            <div className="shrink-0 w-14 h-14 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center">
              <Phone size={24} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">
                We Repair & Replace Siding Across 31 Bay Area Cities
              </h2>
              <p className="mt-2 text-secondary leading-relaxed">
                Marin · San Francisco · San Mateo · Santa Clara · Alameda · Contra Costa counties. Eichler tracts in Palo Alto and Mountain View, Doelger homes in the SF Sunset, Berkeley craftsmans, Marin redwood lap siding, modern Hardie installs across the Peninsula — we know the siding system specific to your neighborhood.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LpFinalCTA
        heading="Don&apos;t Wait Until Water&apos;s in the Wall"
        subtext="A small siding repair today saves the wall rebuild that comes after one wet winter. Free inspection — both repair and replacement options quoted, no pressure to upsell."
        bullets={[
          "Same-week inspection across the Bay Area",
          "Both repair and full replacement options quoted",
          "Paint match (Sherwin-Williams / Benjamin Moore) included",
          "Tear-off includes housewrap and flashing inspection",
          "Licensed (CA #1132983), bonded, fully insured",
        ]}
        service="siding-repair"
        formCtaText="Schedule My Free Inspection"
      />

      <LpFooter hideWarranty />
    </>
  );
}
