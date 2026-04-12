# Gadget Construction — Project Guide

## What This Is

Website for **Gadget Construction Inc.**, a Class B general contractor serving 31 cities across 6 Bay Area counties (CSLB #1132983). Built with Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript. Deployed via Netlify from GitHub (`raul-esquair/gadgetconstruction`).

## Business Context

- **Owner:** Raul
- **Founded:** 2014 (12+ years)
- **Projects:** 500+ completed
- **Phone:** (628) 233-3589
- **License:** CA #1132983
- **Warranty:** 5-year workmanship
- **Service area:** 31 cities across Marin, Contra Costa, Alameda, San Francisco, San Mateo, and Santa Clara counties
- **Services:** Concrete Foundations, Retaining Walls, Complete Remodels, Composite Decks, Roofing, ADU Construction
- **Tagline:** "Built Right. On Time. Guaranteed."

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build — must pass with 0 errors before committing
npm run lint     # ESLint check
```

**Always run `npm run build` before committing.** The build catches TypeScript errors that dev mode doesn't.

## Architecture

### Tech Stack
- **Next.js 16** (App Router, Server Components by default)
- **React 19**
- **Tailwind CSS v4** (configured via `@theme inline` in globals.css, NOT tailwind.config.ts)
- **TypeScript** (strict)
- **Lucide React** (icons)
- **clsx + tailwind-merge** (via `cn()` helper in `lib/utils.ts`)
- **Zero animation libraries** — all animations use IntersectionObserver + scroll listeners + CSS

### File Structure

```
app/                              # Pages (App Router)
  layout.tsx                      # Root layout — fonts, header, footer, EstimateModalProvider
  page.tsx                        # Homepage
  globals.css                     # Design tokens, keyframes, base styles, btn-concrete
  about/page.tsx
  contact/page.tsx
  gallery/page.tsx                # Filterable project portfolio
  blog/page.tsx
  blog/[slug]/page.tsx
  services/page.tsx               # Services hub
  services/*/page.tsx             # 6 individual service pages
  service-areas/page.tsx          # Service areas hub (31 cities grouped by county)
  service-areas/[city]/page.tsx   # 31 individual city SEO pages
  api/contact/route.ts            # Form submission endpoint

components/
  ui/                             # Primitives
    Button.tsx                    # Polymorphic (button/link/a), 4 variants, btn-concrete
    Container.tsx                 # Max-width wrapper (default 7xl, narrow 4xl)
    SectionWrapper.tsx            # Section with bg variants (white/light/dark/gradient)
    Card.tsx, Badge.tsx           # Basic UI elements
    FormField.tsx                 # Input/textarea/select with validation
    MultiStepForm.tsx             # 3-step progressive form with directional transitions
    EstimateModal.tsx             # Context provider + modal + EstimateButton component
    AnimateOnScroll.tsx           # Binary scroll-trigger wrapper (uses useInView)
    RevealOnScroll.tsx            # Scroll-POSITION-linked animation (proportional to scroll)
    StatsCounter.tsx              # Animated count-up on scroll
    BeforeAfter.tsx               # Draggable image comparison slider
  sections/                       # Full-width page sections
    Hero.tsx                      # Hero with bg image, Ken Burns, staggered text reveal
    HeroCTA.tsx                   # Client wrapper for modal trigger in server Hero
    SectionCTA.tsx                # Client wrapper for modal trigger in server sections
    TrustBar.tsx                  # Marquee conveyor belt with 5 animated stats
    ServicesGrid.tsx              # Bento grid (2 large featured + 4 compact)
    WhyChooseUs.tsx               # 6 differentiator cards with bg image
    DifferentiationSection.tsx    # Problem vs. Solution comparison rows
    ProcessSteps.tsx              # 5-step timeline (horizontal desktop, vertical mobile)
    GallerySection.tsx            # Homepage gallery preview
    TestimonialsSection.tsx       # 3 testimonial cards
    ServiceArea.tsx               # "31 Cities" section with county badges
    CTABlock.tsx                  # Dark CTA with inline multi-step form
    FAQSection.tsx                # Accordion FAQ with JSON-LD schema
    PricingSection.tsx            # Service pricing rows
    StatsSection.tsx              # Full-width stats bar
    FounderStory.tsx              # About page founder narrative
    ContactForm.tsx               # Contact page form + sidebar
    ServicePageContent.tsx        # Service page sections (Intro, Scope, Differentiators, Gallery)
    CityPageContent.tsx           # City page sections (Intro, Insight, Services)
    NeighboringCities.tsx         # Cross-linking between nearby city pages
  layout/
    Header.tsx                    # Sticky header, animated hamburger↔X, services panel
    Footer.tsx                    # 4-column footer with license bar
    MobileBottomBar.tsx           # Scroll-aware sticky CTA (appears when hero CTAs leave viewport)
  seo/
    JsonLd.tsx                    # Structured data (LocalBusiness, Service, FAQ, Article, Breadcrumb)
    Breadcrumbs.tsx               # Visual breadcrumbs + BreadcrumbList schema

lib/                              # Data & utilities
  constants.ts                    # COMPANY, SERVICES, NAV_LINKS, TESTIMONIALS, DIFFERENTIATORS, PROCESS_STEPS, STATS, TRUST_BAR_ITEMS
  types.ts                        # TypeScript interfaces (Service, Testimonial, BlogPost, CityData, etc.)
  services-data.ts                # SERVICE_PAGES — full copy for each service page
  service-areas-data.ts           # SERVICE_AREAS — 31 cities with tier, county, FAQs, content
  blog-data.ts                    # BLOG_POSTS array (3 seed posts)
  gallery-data.ts                 # GALLERY_PROJECTS + PROJECT_CATEGORIES (16 projects)
  about-data.ts                   # FOUNDER_STORY, VALUES, CREDENTIALS
  contact-data.ts                 # CONTACT_COPY
  pricing-data.ts                 # SERVICE_PRICING by service slug
  metadata.ts                     # generatePageMetadata() helper
  utils.ts                        # cn() helper (clsx + tailwind-merge)

hooks/
  useInView.ts                    # IntersectionObserver hook (binary trigger, fires once)

public/images/
  logo.png                        # Company logo (transparent PNG, tight crop)
  hero-bg.jpg                     # Homepage hero (crew on roof)
  why-choose-us-bg.jpg            # WhyChooseUs section background (finished roof)
  adu-construction.jpg            # ADU service card image
  complete-remodel.jpg            # Remodel service card image
  composite-decks.jpg             # Deck service card image
  roofing.jpg                     # Roofing service card image
  retaining-walls.jpg             # Retaining wall service card image
```

### Data Flow

All content lives in `lib/` as typed constants. No CMS, no external APIs, no database.

- `SERVICES` array → ServicesGrid, Header dropdown, Footer, MultiStepForm, service pages
- `SERVICE_PAGES` record (keyed by slug) → individual service page content
- `SERVICE_AREAS` array → service area hub, city pages, `generateStaticParams()`
- `BLOG_POSTS` array → blog listing, `generateStaticParams()`
- `GALLERY_PROJECTS` array → gallery page with category filtering
- `SERVICE_PRICING` record → PricingSection on each service page
- `TESTIMONIALS`, `DIFFERENTIATORS`, `PROCESS_STEPS` → section components

**To add a new service:** Add to `SERVICES` in constants.ts, add entry to `SERVICE_PAGES` in services-data.ts, add pricing to `SERVICE_PRICING`, create `app/services/[slug]/page.tsx`.

**To add a new blog post:** Add to `BLOG_POSTS` in blog-data.ts. Static params auto-generate the route.

**To add a new city:** Add to `SERVICE_AREAS` in service-areas-data.ts with tier (1/2/3), county, FAQs, and content. Static params auto-generate the route.

**To add a gallery project:** Add to `GALLERY_PROJECTS` in gallery-data.ts with categorySlug matching a service slug.

**To add a service image to the bento grid:** Add to `SERVICE_IMAGES` map in ServicesGrid.tsx.

## Design System

### Colors (defined in globals.css `@theme inline`)

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#222222` | Headings, dark backgrounds, footer |
| `secondary` | `#444444` | Body text |
| `accent-red` | `#CC0000` | Brand accent — matches logo red |
| `accent-orange` | `#CC0000` | Same as red (was orange, rebranded to red to match logo) |
| `accent-orange-dark` | `#A30000` | Hover states |
| `neutral-50` to `neutral-700` | Grays | Backgrounds, borders, muted text |
| `metallic-light/mid/dark` | Silver grays | Concrete-texture CTA buttons |

**Important:** `accent-orange` token name is legacy — it's actually red (#CC0000) now. All components reference `accent-orange` classes but render as red. Do NOT add a separate orange color.

### Typography

- **Headings:** Montserrat (600, 700, 800) via `font-heading` class
- **Body:** Inter (400, 500, 600) via `font-body` class
- Both loaded with `next/font/google` and set as CSS variables

### Critical CSS Pattern — White Text on Dark Backgrounds

Global CSS sets heading color via `:where(h1-h6) { color: var(--color-primary) }`. Tailwind's `text-white` class does NOT reliably override this in Tailwind v4. **Always use inline style for white headings:**

```tsx
// WRONG — text-white gets overridden by global CSS
<h2 className="text-white">Heading</h2>

// CORRECT — inline style wins specificity
<h2 style={{ color: "#ffffff" }}>Heading</h2>
```

This is a known issue throughout the codebase. Every heading on a dark background uses `style={{ color: "#ffffff" }}`.

### Button Variants

```tsx
<Button variant="primary" />     // Concrete texture (metallic silver with SVG grain noise)
<Button variant="secondary" />   // Dark charcoal
<Button variant="outline" />     // Border only
<Button variant="ghost" />       // Text only
```

The `btn-concrete` CSS class in globals.css creates the metallic stone texture effect matching the logo's "GADGET" text. It uses SVG `feTurbulence` for grain, a multi-stop gradient for the metallic sheen, inner shadows for 3D depth, and text-shadow for a chiseled look.

All buttons have `hover:scale-[1.02] active:scale-[0.98]` micro-interactions.

## Key Patterns

### Estimate Modal (Global)

`EstimateModalProvider` wraps the entire app in `layout.tsx`. Any component can trigger the modal:

```tsx
// In a client component:
const { open } = useEstimateModal();
<button onClick={open}>Get Estimate</button>

// Or use the pre-built button:
import { EstimateButton } from "@/components/ui/EstimateModal";
<EstimateButton size="lg">Get Free Estimate</EstimateButton>
```

**For server components**, use wrapper components:
- `HeroCTA` — renders EstimateButton inside the Hero section
- `SectionCTA` — renders EstimateButton with centered layout for any section

The modal triggers from: header CTA button, mobile bottom bar, hero CTA, and all section CTAs.

### Animation System (Three Layers)

**Layer 1: Hero Stagger (`Hero.tsx`)**
- Hero is a client component with `useState` for load trigger
- Elements stagger in on page load: urgency badge (0ms) → headline (150ms) → subheadline (350ms) → CTA (550ms) → trust line (700ms)
- Uses blur-to-sharp transition (`blur-[2px]` → `blur-0`) for cinematic feel
- Hero background image has Ken Burns effect (`@keyframes ken-burns`, 20s cycle)

**Layer 2: Scroll-Position-Linked (`RevealOnScroll.tsx`) — PRIMARY SYSTEM**
- Animation progress is **proportional to scroll position**, not binary on/off
- Uses `getBoundingClientRect()` on each scroll frame to calculate element's exact position
- Travel zone = **65% of viewport height** — element animates from bottom edge to just above center
- Progress mapped through `easeOutExpo` curve for natural deceleration
- **One-way only** — once progress hits 100%, element locks via `locked.current = true` and scroll listener disconnects. Scrolling back up does NOT reverse the animation.
- IntersectionObserver gates the scroll listener — only elements currently in viewport cost CPU per frame
- Animation types: `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-up`, `scale-rotate`

**Layer 3: Binary Trigger (`AnimateOnScroll.tsx` + `useInView.ts`)**
- Simpler system for section headings and non-grid content
- IntersectionObserver fires once → CSS transition plays
- Used for: section headings, service area section, founder story

**Performance rules:**
- Only animate `transform` and `opacity` (GPU-composited)
- `will-change-[opacity,transform]` on all animated elements
- `{ passive: true }` on all scroll listeners
- `requestAnimationFrame` for scroll-linked updates
- `prefers-reduced-motion` respected in all animation hooks

**Key learnings:**
- `intersectionRatio` doesn't work for position-linked animations on small elements (ratio jumps 0→1 instantly). Use `getBoundingClientRect()` instead.
- When rendering both desktop and mobile versions of a component (e.g., ProcessSteps), put the `ref` on an always-visible wrapper div, not on a `hidden md:block` div — hidden elements don't trigger IntersectionObserver.
- 65% viewport travel zone is the professional standard. 40% feels rushed.

### TrustBar — Marquee Conveyor Belt

5 animated stats in a continuous horizontal scroll:
- **12+ Years** · **500+ Projects** · **5.0★ Star Rated** · **0 Surprise Bills** · **100% Client Satisfaction**
- Array doubled (`[...STATS, ...STATS]`) for seamless loop
- CSS `@keyframes marquee` translates -50% over time
- Speed: 8s on mobile, 15s on desktop
- Gradient fades on left/right edges
- Pauses on hover
- Numbers count up on first view via individual `StatItem` components with self-contained observers

### Mobile Bottom Bar

`MobileBottomBar` is scroll-aware:
- **Hidden on page load** — hero CTAs are already visible
- **Slides up** when hero CTAs scroll out of viewport (detected via `data-hero-cta` attribute on Hero's CTA wrapper)
- **Slides back down** if user scrolls back to hero
- **Hidden on `/contact` page** entirely
- **On pages without a hero** — shows immediately

### Header — Desktop Services Panel

The services dropdown is NOT a floating card — it's a **full-width panel that expands from the header itself**:
- Services button hover opens the panel, panel hover keeps it open
- 300ms close delay with timer ref prevents snap-shut when mouse travels between button and panel
- Invisible bridge div extends the hover zone between button and panel
- Nav items stagger in at 40ms intervals
- Animated hamburger ↔ X toggle on mobile (3 spans with rotate/translate transitions)

### Mobile Menu Behavior

- **Default (services collapsed):** Compact dropdown, auto-height, rounded bottom corners
- **Services expanded:** Stretches to full screen (`fixed bottom-0`)
- Nav items stagger in on open, instant fade on close
- Services submenu items slide in from left with 40ms stagger

### Multi-Step Form

3-step progressive form: Service Selection → Timeline/Budget → Contact Info
- Step transitions animate with directional slide (forward = slide right, back = slide left)
- 150ms fade-out, content swaps, fades in from opposite direction
- Progress bar with numbered circles
- Used in both `CTABlock` (inline) and `EstimateModal` (popup)
- Collects: service, timeline, scope, name, phone, email, message

### Services Bento Grid

Homepage services use an asymmetric bento layout:
- 2 large "Featured Service" cards (Complete Remodel + ADU) spanning 2 columns on desktop
- 4 compact cards (Foundations, Retaining Walls, Decks, Roofing) in a row
- `SERVICE_IMAGES` map in ServicesGrid.tsx controls which cards have real photos vs. logo placeholders
- Large cards slide in from left/right, compact cards scale up

### Service Area Pages — 3 Tiers

31 city pages with content depth varying by market tier:
- **Tier 1 (Flagship):** Mill Valley, San Rafael, Berkeley, Oakland, San Francisco, Palo Alto, San Jose — deepest content, 6 FAQs, full housing stock details
- **Tier 2 (Market):** Richmond, Concord, Daly City, South SF, Burlingame, Hillsborough, Foster City, San Carlos, Pacifica, Woodside, Atherton, Menlo Park, Los Altos, Mountain View, Sunnyvale, Santa Clara, Cupertino — solid content, 3-4 FAQs
- **Tier 3 (Presence):** San Anselmo, Sausalito, Tiburon, Fairfax, Millbrae, San Bruno, Belmont — concise, 3 FAQs

All pages have unique hyper-local content (NOT template swaps with city names). Each addresses that city's specific housing stock, terrain, soil, permit authority, and construction angles.

Helper functions: `getCitiesByCounty()`, `getCityBySlug()`, `getNeighboringCities()`

## SEO

- Every page exports `metadata` using `generatePageMetadata()` from `lib/metadata.ts`
- Root layout has `LocalBusiness` JSON-LD schema on every page
- Service pages have `Service` + `FAQPage` JSON-LD schemas
- Blog posts have `Article` JSON-LD schema
- City pages have `GeneralContractor` JSON-LD with city-specific `areaServed`
- Breadcrumbs component generates `BreadcrumbList` schema
- 130+ FAQ entries across city pages targeting "[service] + [city]" long-tail queries
- 33 FAQ entries across service pages

## Copywriting Rules

1. **Problem > Empathy > Solution > Proof** framework on every service page
2. **Specificity over generality** — "500+ projects" not "many projects"
3. **Pain-point-first** — name the homeowner's fear, then resolve it
4. **Hyper-local** — seismic codes, DBI permits, neighborhoods, fog, clay soil, fill soil, Eichler homes, Doelger homes
5. **No generic contractor language** — test every line: "Could any contractor say this? If yes, rewrite."
6. **Second person** — "you/your", not "our clients"
7. **Short sentences. No filler.** Contractions are fine.
8. **Response time:** "minutes" not "hours" or "days"
9. **Headline formula:** Garfinkel's pain-elimination framework — "Get Rid of [Problem] Once and For All"
10. **Anti-contractor messaging:** "We know contractors have a bad reputation. Here's what we do differently."

## Responsive Design

- **Mobile-first** Tailwind classes
- **Container:** `px-5 sm:px-6 lg:px-8` (20px mobile minimum)
- **Header:** `h-20 md:h-24` — main content has matching `pt-20 md:pt-24`
- **Mobile bottom bar spacer:** `h-16 md:hidden` at bottom of layout
- **Section padding:** `py-12 md:py-20` via SectionWrapper
- **Hero height:** `min-h-[70vh] md:min-h-[80vh]` — sized so trust bar is visible on first load
- **Grids:** Typically `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **CTABlock and ContactForm:** Switch to 2-column at `md:` breakpoint (768px), not `lg:`

## CRO Decisions Made

These were research-backed decisions — don't revert without reason:

- **Multi-step form** over single-step (80-120% more form fills per contractor CRO data)
- **Modal estimate form** triggered from header/hero/sections — keeps visitor on the page that built their trust
- **"Minutes" not "24 hours"** response time promise (15-22% conversion lift)
- **Urgency badge** on hero ("Limited availability — currently booking for Summer 2026")
- **3 CTAs max on homepage** (hero, after testimonials, CTABlock) — reduced from 5 to lower cognitive load
- **TrustBar as marquee** not static — adds visual energy + fits 5 stats without taking vertical space
- **Pricing ranges on service pages** (10-20% conversion lift vs. no pricing)
- **"Why Us vs Others" differentiation section** using anti-contractor framework
- **Service area CTA links to /service-areas** hub page (drives SEO traffic) instead of estimate modal
- **Gallery button links to /gallery** page instead of contact form (fixes expectation mismatch)

## Cognitive Load Decisions

- **WhyChooseUs moved from homepage to About page** — homepage had too many trust sections back-to-back
- **Section heading styles varied** — not every section uses centered heading + orange underline. Differentiation and Gallery use left-aligned eyebrow tags.
- **Homepage sections (current order):** Hero → TrustBar → Services (bento) → Differentiation → Process → Gallery → Testimonials → Service Area → CTABlock
- **"Home" removed from nav** — logo handles navigation home

## What's Pending

- **Founder story** — placeholder copy in about-data.ts, needs Raul's real story
- **Project photography** — many placeholder images, needs real before/after photos for gallery and service pages
- **Concrete foundations service image** — only service card without a real photo in the bento grid
- **Google reviews** — placeholder testimonials, needs real review text (currently 3 reviews at 5 stars — too few to embed a live widget)
- **Form backend** — API route logs to console, needs email service / CRM integration
- **Blog featured images** — placeholder divs, needs real images
- **Gallery project images** — all 16 projects use logo placeholders, need real project photos

## GitHub & Deployment

- **Repo:** `raul-esquair/gadgetconstruction` (public)
- **Branch:** `main`
- **Deployment:** Netlify (connected to GitHub repo)
- **Build command:** `npm run build`
- **51 total routes** (homepage + about + contact + gallery + blog listing + 3 blog posts + services hub + 6 service pages + service areas hub + 31 city pages + API route)
