import type { Metadata } from "next";
import Image from "next/image";
import {
  Search,
  Hammer,
  MapPin,
  DollarSign,
  DoorOpen,
  AppWindow,
  Home,
  Building2,
  Construction,
  Palette,
  Layers,
  Phone,
  AlertTriangle,
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
  title: "Dry Rot Repair — Bay Area Specialists | Free Inspection",
  description:
    "Bay Area dry rot repair specialists. We trace the water source, sister-and-replace structural framing, and rebuild it right. Free inspection, fixed-price quotes, response in minutes. CA Lic #1132983.",
  path: "/lp/dry-rot-repair",
  noindex: true,
});

const SCOPE_ITEMS = [
  {
    icon: DoorOpen,
    title: "Door Frames & Thresholds",
    body: "Front entries, garage side-doors, slider tracks where water has pooled and rotted out the jamb or sill plate.",
  },
  {
    icon: AppWindow,
    title: "Window Sills & Casings",
    body: "Single-pane and dual-pane, single sills to full-frame replacement. We match existing trim profiles.",
  },
  {
    icon: Home,
    title: "Fascia Boards & Rake Boards",
    body: "Full runs along the roofline, including soffit and freeze blocking behind. We address gutter overflow at the same time.",
  },
  {
    icon: Building2,
    title: "Bay Window Structural Framing",
    body: "Like the project shown above — full demo, sister-joist, re-sheathe, re-flash, weatherproof, finish. Permitted when required.",
  },
  {
    icon: Construction,
    title: "Deck Posts, Beams & Ledger Boards",
    body: "Including hidden ledger rot behind the house attachment — the most dangerous failure point in any deck.",
  },
  {
    icon: Palette,
    title: "Siding & Trim",
    body: "T1-11, fiber cement, redwood, shingle, board-and-batten — matched to your existing siding pattern and paint.",
  },
  {
    icon: Layers,
    title: "Sub-Floor & Joist Repair",
    body: "When rot has spread inside from a leaking shower pan, window, or roof — we open the floor, replace, and re-seal.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: Search,
    title: "We Trace the Water, Not Just the Damage",
    body: "Every repair starts with finding where the water came in — failed flashing, cracked caulk, missing kick-out diverter, clogged gutter. If we don't fix the source, the rot comes back.",
  },
  {
    icon: Hammer,
    title: "Sister-and-Replace, Not Wood Filler",
    body: "DIY-style epoxy and wood filler is a 6-month fix. We cut back to sound wood, sister new pressure-treated framing, and rebuild structurally. Your repair lasts decades, not seasons.",
  },
  {
    icon: MapPin,
    title: "We Know Bay Area Housing Stock",
    body: "Sunset stuccos, Marina bay windows, Eichler post-and-beam, Berkeley craftsmans, Doelger tract homes — each has its own dry rot patterns. We've seen yours before.",
  },
  {
    icon: DollarSign,
    title: "Fixed-Price Quotes After Demo",
    body: "Most dry rot quotes are \"we'll see what we find.\" We give you a not-to-exceed cap before demo starts, and a true fixed price within 24 hours of opening the wall.",
  },
];

const PROCESS = [
  {
    title: "Free On-Site Inspection",
    body: "We come out within 48 hours. Probe-tested, photographed, moisture-metered. You see the data — not just our opinion.",
  },
  {
    title: "Not-to-Exceed Quote",
    body: "Before any demo, you know your cap. No open-ended estimates, no \"we'll bill what we find.\" You decide whether to proceed with full information.",
  },
  {
    title: "Demo & Diagnosis",
    body: "We open the wall, photograph what we find, and hand you the fixed price. If it's worse than expected, we stop and call you before continuing.",
  },
  {
    title: "Repair & Rebuild",
    body: "Sister framing, new sheathing, flashing, weather barrier, finish. We don't leave a job until it looks like nothing ever happened.",
  },
  {
    title: "Final Walk-Through",
    body: "We walk the repair with you, verify every detail, and don't leave until you're satisfied that the rot is gone, the framing is sound, and the finish matches.",
  },
];

const FAQS = [
  {
    question: "How do I know if it's dry rot vs wet rot vs termite damage?",
    answer:
      "Press a screwdriver into the wood. Dry rot crumbles into cube-shaped pieces and feels dry/spongy. Wet rot is darker and stays soggy. Termites leave smooth tunnels with mud-like deposits along the surface. We bring a moisture meter and a borescope to every inspection so you don't have to guess — we show you what's there.",
  },
  {
    question: "Can I just use wood filler or epoxy?",
    answer:
      "For cosmetic spots smaller than a credit card, sometimes. For anything structural — door jambs, window sills, fascia, beams, posts — no. Filler doesn't fix the water source, and the rot continues spreading inside the wood you can't see. Within 6–12 months you're paying twice. The right fix is to remove the rotted wood, sister new framing, and seal the moisture entry point.",
  },
  {
    question: "What's the cost difference between repair and full replacement?",
    answer:
      "A localized repair is usually 30–50% of a full replacement. A door jamb repair might run $600 vs $2,000 for a new door installed. A window sill repair runs $300–$800 vs $1,500–$3,500 for a full window replacement. We'll quote both options when it's a close call so you can decide based on your timeline and budget.",
  },
  {
    question: "Will my homeowner's insurance cover dry rot?",
    answer:
      "Almost never. Insurance covers sudden water events (burst pipe, storm damage, fallen tree) — not gradual moisture intrusion, which is how dry rot starts. The exception is when dry rot is the consequence of a covered event — for example, rot behind a wall that flooded from a pipe burst. We can document the cause and timeline for your adjuster if there's a coverage angle.",
  },
  {
    question: "How long does a typical dry rot repair take?",
    answer:
      "Single door frame or sill: 1–2 days. Multi-window or fascia run: 3–5 days. Full bay window structural rebuild like the project shown above: 7–14 days including paint and finish. We give you a written timeline before we start and call you proactively if anything changes.",
  },
  {
    question: "What if you find more rot during demo than expected?",
    answer:
      "We stop, photograph it, and call you with the new scope and revised cost before continuing any work. Your not-to-exceed cap from the original quote still holds — anything beyond that requires your written approval. No surprise invoices, ever. This is the single most common reason homeowners get burned by other contractors, so we built our process to eliminate it.",
  },
];

export default function DryRotRepairLpPage() {
  const pricing = SERVICE_PRICING["dry-rot-repair"];

  return (
    <>
      <JsonLd
        data={serviceSchema(
          "Dry Rot Repair",
          "Bay Area dry rot repair specialists serving 31 cities across Marin, San Francisco, San Mateo, Santa Clara, Alameda, and Contra Costa counties. We trace water source, sister-and-replace structural framing, and finish to match. Door frames, window sills, fascia, bay windows, deck posts, beams, and sub-floor joists. Licensed Class B contractor (CA #1132983).",
          "$300–$25,000+",
        )}
      />

      <LpHeader />

      <LpHero
        eyebrow="Dry Rot Repair · Bay Area Specialists"
        headline="Stop Dry Rot Before It Eats Your House"
        subheadline="When paint bubbles, the wood underneath is already gone. Door frames, window sills, fascia, deck posts — we cut out the rot, trace the water source, and rebuild it right. CA Lic #1132983."
        trustPoints={[
          "Same-week inspections across the Bay Area",
          "We trace water source — not just patch the damage",
          "Sister-and-replace structural framing, not wood filler",
          "Itemized fixed-price quote — never an open-ended bill",
        ]}
        backgroundImage="/images/dry-rot-hero.jpg"
        imageAlt="Gadget Construction crew performing dry rot demolition on a San Francisco bay window — exposed rotted framing behind stucco, scaffolding in place, two-man crew with safety equipment"
        service="dry-rot-repair"
        formHeading="Get Your Free Dry Rot Inspection"
        formSubtext="Free on-site inspection. Fixed-price quote. Response in minutes."
        formCtaText="Schedule My Inspection"
      />

      <LpTrustStrip hideWarranty />

      {/* Educational — what dry rot actually is */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Why Dry Rot Spreads So Fast in Bay Area Homes
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-6 text-secondary leading-relaxed text-base md:text-lg">
              Dry rot is a wood-destroying fungus that thrives in damp, poorly ventilated spaces. Bay Area fog, single-pane windows, and aging exterior caulk give it a 12-month growing season. By the time you see paint bubbling or feel softness in a door frame, the fungus has often spread two to four feet into the framing behind it.
            </p>
            <p className="mt-4 text-secondary leading-relaxed text-base md:text-lg">
              Patching the surface only buys time — within a year, the rot returns. The real fix is to cut back to clean wood, replace the structural members, treat the surrounding area, and seal the water source that fed it in the first place.
            </p>
          </div>
        </Container>
      </section>

      {/* What we repair */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              What We Repair
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              From a single rotted sill to a full bay window rebuild — we handle it all.
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
              Why Bay Area Homeowners Choose Gadget for Dry Rot
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

      {/* Before / After proof */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Real Project — Before & After
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Bay window header rebuild on a Bay Area home. Rotted structural beam removed and sister-replaced with new pressure-treated framing. New window installed. Stucco closure to follow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            <figure className="rounded-2xl overflow-hidden bg-white border border-neutral-200">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/dry-rot-wide-before.jpg"
                  alt="Bay window header beam fully rotted and exposed during stucco demolition — full extent of structural water damage visible across the wall"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-red text-white text-xs font-heading font-bold uppercase tracking-wider">
                  Before
                </div>
              </div>
              <figcaption className="p-4 text-sm font-heading font-semibold text-primary">
                Header beam rotted across the full wall
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden bg-white border border-neutral-200">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/dry-rot-wide-after.jpg"
                  alt="Bay window header beam rebuilt with new pressure-treated lumber, wall containment installed, ready for stucco closure"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-heading font-bold uppercase tracking-wider">
                  After
                </div>
              </div>
              <figcaption className="p-4 text-sm font-heading font-semibold text-primary">
                New beam installed — ready for stucco closure
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden bg-white border border-neutral-200">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/dry-rot-before.jpg"
                  alt="Close-up of rotted bay window joists exposed during demolition — debris, water damage, and decayed framing visible inside the structural cavity"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-red text-white text-xs font-heading font-bold uppercase tracking-wider">
                  Before
                </div>
              </div>
              <figcaption className="p-4 text-sm font-heading font-semibold text-primary">
                Joists rotted from years of moisture intrusion
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden bg-white border border-neutral-200">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/dry-rot-after.jpg"
                  alt="New sister-joist framing installed and new dual-pane window in place — clean carpentry detail ready for sheathing and stucco closure"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-heading font-bold uppercase tracking-wider">
                  After
                </div>
              </div>
              <figcaption className="p-4 text-sm font-heading font-semibold text-primary">
                New sister-joists & window installed
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Bay Area Dry Rot Pricing — What You&apos;ll Actually Pay
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Final price depends on extent of hidden damage, access, and finish work. We give you a fixed price within 24 hours of demo.
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
                Dry rot spreads 6–12 inches per year once it&apos;s established in framing. A $600 sill repair today becomes a $4,000 wall rebuild in 24 months — and a $15,000 structural job after that. Catch it early.
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
              <span className="font-heading font-semibold text-primary">Includes:</span> labor, materials, and debris haul.
            </p>
            <p>
              <span className="font-heading font-semibold text-primary">Not included:</span> paint touch-up beyond the immediate repair, permits if required by your jurisdiction ($200–$600 typical), custom finish carpentry beyond standard trim profiles.
            </p>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              How It Works — 5 Steps From Call to Finished Repair
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

      <FAQSection faqs={FAQS} heading="Dry Rot Repair — Frequently Asked Questions" background="white" />

      {/* Service Area */}
      <section className="bg-white py-10 md:py-14 border-t border-neutral-200">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 max-w-4xl mx-auto">
            <div className="shrink-0 w-14 h-14 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center">
              <Phone size={24} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">
                We Repair Dry Rot Across 31 Bay Area Cities
              </h2>
              <p className="mt-2 text-secondary leading-relaxed">
                Marin · San Francisco · San Mateo · Santa Clara · Alameda · Contra Costa counties. From Mill Valley fog belt to San Jose hillsides — we know the moisture patterns specific to your neighborhood and the housing stock that's most prone to rot.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LpFinalCTA
        heading="Don't Wait Until It's Structural"
        subtext="Every month you wait, the rot spreads another foot. Free inspection, fixed-price quote, response in minutes."
        bullets={[
          "Same-week appointment, anywhere in the Bay Area",
          "Probe-tested moisture inspection — we show you the data",
          "Written fixed-price quote within 24 hours of demo",
          "Photo documentation of all hidden damage we find",
          "Licensed (CA #1132983), bonded, fully insured",
        ]}
        service="dry-rot-repair"
        formCtaText="Schedule My Free Inspection"
      />

      <LpFooter hideWarranty />
    </>
  );
}
