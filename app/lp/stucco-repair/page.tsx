import type { Metadata } from "next";
import Image from "next/image";
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
        headline="Don't Let a Hairline Crack Become a $9,000 Wall"
        subheadline="Once water gets behind cracked stucco, the framing rots in 6-12 months. We're Bay Area stucco repair specialists — we probe-test before we quote, three-coat repair only, color and texture matched to your existing finish. CA Lic #1132983."
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
              Bay Area homes see this faster than most. Mill Valley fog cycles wet the wall every morning and dry it by afternoon — repeated thermal stress on every hairline. Berkeley and Oakland hillsides sit on clay soil that swells in winter rain and shrinks in summer drought, pulling the framing two directions across the year. Daly City and Pacifica take wind-driven rain straight off the Pacific that finds any caulk gap. Eichler post-and-beam homes have horizontal trim joints that telegraph stress through the stucco above. Doelger tract homes from the 1950s used early generations of metal lath that&apos;s now corroded behind sound-looking finishes.
            </p>
            <p className="mt-4 text-secondary leading-relaxed text-base md:text-lg">
              Most cracks are fixable cheaply if caught early. The trick is knowing whether you need a patch, a re-coat, or a tear-off — and most contractors over-spec because re-stucco pays better than a $400 patch.
            </p>
          </div>
        </Container>
      </section>

      {/* Diagnostic — Patch, Re-Coat, or Tear-Off? */}
      <section className="bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Patch, Re-Coat, or Tear-Off? How to Tell.
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              The single biggest decision in stucco repair. Most contractors over-spec because re-stucco pays better — here are the visual cues we use before quoting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
            {/* Patch */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-orange mb-2">Option 1</div>
              <h3 className="text-xl font-heading font-bold text-primary">Hairline Patch</h3>
              <div className="mt-1 text-sm font-heading font-semibold text-secondary">$400–$1,200 / elevation</div>
              <p className="mt-4 text-secondary text-sm leading-relaxed">Right call when:</p>
              <ul className="mt-2 space-y-2 text-sm text-secondary">
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Cracks under 1/16 inch (thinner than a credit card edge)</span></li>
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Stucco less than 30 years old</span></li>
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>No staining or efflorescence around the cracks</span></li>
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Moisture meter reads dry behind the wall</span></li>
              </ul>
            </div>

            {/* Re-Coat */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-orange mb-2">Option 2</div>
              <h3 className="text-xl font-heading font-bold text-primary">Section Re-Coat</h3>
              <div className="mt-1 text-sm font-heading font-semibold text-secondary">$3,500–$8,000 / elevation</div>
              <p className="mt-4 text-secondary text-sm leading-relaxed">Right call when:</p>
              <ul className="mt-2 space-y-2 text-sm text-secondary">
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Multiple cracks across one wall, none deeper than 1/8 inch</span></li>
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Surface texture is failing but substrate sounds solid when tapped</span></li>
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Color is sun-faded and patches would be obvious</span></li>
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Moisture meter reads damp but framing is still sound</span></li>
              </ul>
            </div>

            {/* Tear-Off */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-orange mb-2">Option 3</div>
              <h3 className="text-xl font-heading font-bold text-primary">Full Tear-Off &amp; Re-Stucco</h3>
              <div className="mt-1 text-sm font-heading font-semibold text-secondary">$8,000–$30,000+</div>
              <p className="mt-4 text-secondary text-sm leading-relaxed">Right call when:</p>
              <ul className="mt-2 space-y-2 text-sm text-secondary">
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Cracks deeper than 1/8 inch, or staircase patterns indicating substrate movement</span></li>
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Stucco sounds hollow when tapped — delaminated from lath</span></li>
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>Active staining, mold, or soft spots — water has reached framing</span></li>
                <li className="flex items-start gap-2"><span className="text-accent-orange shrink-0">•</span><span>WRB or wire lath is failing (visible from edges, vents, fixtures)</span></li>
              </ul>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Not sure which one your wall needs? That&apos;s what the free moisture probe inspection is for. We bring a meter, a borescope, and 12+ years of stucco diagnosis — and we tell you the cheapest option that actually fixes it.
          </p>
        </Container>
      </section>

      {/* Before / After proof */}
      <section id="gallery" className="bg-white py-14 md:py-20 scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Option 3 in Practice — Real Project Before &amp; After
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Whole-elevation re-stucco on a Bay Area home. Old stucco torn off, new wire lath installed over Fortifiber JumboTex weather-resistive barrier, blue flashing tape sealed around new windows — then full three-coat application: scratch coat, brown coat, finish coat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto">
            <figure className="rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/stucco-wide-before.jpg"
                  alt="Bay Area home with stucco torn off and substrate fully prepped for re-stucco — Fortifiber JumboTex weather-resistive barrier installed over new wire lath, blue flashing tape sealing new vinyl window opening, scaffolding in place, ready for three-coat application"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-red text-white text-xs font-heading font-bold uppercase tracking-wider">
                  Before
                </div>
              </div>
              <figcaption className="p-4 text-sm font-heading font-semibold text-primary">
                Substrate prepped — WRB, wire lath, window flashing
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/stucco-wide-after.jpg"
                  alt="Same Bay Area home with three-coat stucco system fully applied over prepped substrate — smooth charcoal finish coat, integrated chimney clad in matching stucco, Gadget crew member finishing top corner detail from scaffolding"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-heading font-bold uppercase tracking-wider">
                  After
                </div>
              </div>
              <figcaption className="p-4 text-sm font-heading font-semibold text-primary">
                Three-coat finish applied — same wall, ready for paint
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Bay Area Stucco Systems */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary leading-tight">
              Bay Area Stucco Systems — What&apos;s Behind Your Wall
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-secondary leading-relaxed">
              Bay Area homes use three different stucco systems depending on when they were built. Each one has different repair approaches — and most contractors only know how to handle one or two of them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-orange mb-2">Pre-1985</div>
              <h3 className="text-xl font-heading font-bold text-primary">Traditional 3-Coat</h3>
              <p className="mt-3 text-secondary text-sm leading-relaxed">
                Wire lath over building paper, scratch coat, brown coat, finish coat. Built to last 50+ years when properly applied. Common in Marina-style flats, Sunset stuccos, 1920s Spanish revival, 1950s ranch homes.
              </p>
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed">
                <span className="font-heading font-semibold text-primary">Repair approach:</span> patch with matching cement-based finish, or full three-coat re-stucco when substrate is failing. Color sampling required for invisible patches.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-orange mb-2">1985–2000s</div>
              <h3 className="text-xl font-heading font-bold text-primary">One-Coat Synthetic</h3>
              <p className="mt-3 text-secondary text-sm leading-relaxed">
                Foam board over framing, fiberglass mesh, single thick coat of polymer-modified stucco, synthetic finish. Common in Bay Area tract homes built late 80s through early 2000s.
              </p>
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed">
                <span className="font-heading font-semibold text-primary">Repair approach:</span> mesh-and-patch for small areas with acrylic finish color match. Watch for delamination at cracks — these systems fail fast once water gets in.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-orange mb-2">1990–Today</div>
              <h3 className="text-xl font-heading font-bold text-primary">EIFS / Synthetic Acrylic</h3>
              <p className="mt-3 text-secondary text-sm leading-relaxed">
                Exterior Insulation and Finish System: foam insulation board, base coat with fiberglass reinforcement, acrylic finish. Common in modern renovations and infill construction across the Peninsula and South Bay.
              </p>
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed">
                <span className="font-heading font-semibold text-primary">Repair approach:</span> patch with matching base coat and acrylic finish. Critical to maintain the drainage path — barrier-EIFS without drainage is a known failure mode.
              </p>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Not sure which one your home has? Built before 1985 — almost certainly traditional 3-coat. Built 1985–2005 — likely one-coat synthetic. Modern build or addition — probably EIFS. We confirm during the inspection and repair to match.
          </p>
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

      {/* What Other Stucco Contractors Get Wrong */}
      <section className="bg-primary py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading leading-tight" style={{ color: "#ffffff" }}>
              What Other Stucco Contractors Get Wrong
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-accent-orange rounded-full" />
            <p className="mt-5 text-white/80 leading-relaxed">
              We know contractors have a bad reputation — and stucco specifically is a trade where shortcuts get sold as repairs. Here&apos;s what to watch for, and what we do instead.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            <div className="bg-neutral-50 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-red">The Shortcut</div>
              <p className="mt-2 font-heading font-bold text-primary text-lg">One-coat acrylic over old finish</p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Skim a synthetic acrylic finish over the cracked original — looks great for six months. Then the original cracks reflect through and water finds its way behind the new coat too.
              </p>
              <div className="mt-5 text-xs font-heading font-bold uppercase tracking-wider text-accent-orange">What We Do Instead</div>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Open the cracks, repair the substrate, and apply a real three-coat system over wire lath with proper cure time between layers. The fix that lasts decades, not seasons.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-red">The Shortcut</div>
              <p className="mt-2 font-heading font-bold text-primary text-lg">Quote without probe-testing</p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Walks the wall, points at cracks, gives you a number. Doesn&apos;t know whether the framing behind it is dry or already rotted — and you find out three weeks into the job when &quot;additional charges&quot; show up.
              </p>
              <div className="mt-5 text-xs font-heading font-bold uppercase tracking-wider text-accent-orange">What We Do Instead</div>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Free moisture meter and borescope inspection on every quote. You see whether the framing is dry, damp, or rotted before any number gets written down. No surprise change orders.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-red">The Shortcut</div>
              <p className="mt-2 font-heading font-bold text-primary text-lg">Color match by guess</p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Mixes finish coat to &quot;look close&quot; without sampling your existing color. Six months of UV exposure later, the patch is a different color than the rest of the wall — and the only fix is to re-coat the whole elevation.
              </p>
              <div className="mt-5 text-xs font-heading font-bold uppercase tracking-wider text-accent-orange">What We Do Instead</div>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Sample your existing finish from a hidden spot, match pigment in advance, and you approve the match before application. If the wall is too sun-faded, we recommend a full elevation re-coat instead of obvious patches.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6 md:p-7">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-accent-red">The Shortcut</div>
              <p className="mt-2 font-heading font-bold text-primary text-lg">Skip the cure time</p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Applies all three coats in two days, paints it the next week. Sealant traps moisture in the uncured stucco. Within 18 months: bubbling, peeling, finish failure — and a warranty fight.
              </p>
              <div className="mt-5 text-xs font-heading font-bold uppercase tracking-wider text-accent-orange">What We Do Instead</div>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Scratch coat 24–48 hour cure. Brown coat 7-day cure. Finish coat 28-day full cure before any paint or sealer. We tell you the timeline upfront and don&apos;t rush the cure to save a week.
              </p>
            </div>
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
