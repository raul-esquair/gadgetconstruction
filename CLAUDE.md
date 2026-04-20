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
- **Services:** Concrete Foundations, Retaining Walls, Complete Remodels, Composite Decks, Roofing, ADU Construction, Exterior Repairs
- **Site URL:** https://gadgetconstructionsf.com
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
- **class-variance-authority + @radix-ui/react-slot** (shadcn button dependency, installed but only used by `components/ui/shadcn-button.tsx` if present)

### File Structure

```
app/                              # Pages (App Router)
  layout.tsx                      # Root layout — fonts, header, footer, EstimateModalProvider, skip-to-content
  page.tsx                        # Homepage (with HowTo schema, context-aware urgency badge)
  globals.css                     # Design tokens, keyframes, base styles, btn-concrete, overflow-x:clip
  opengraph-image.tsx             # Dynamic OG image (1200x630, logo + CTA + credentials)
  sitemap.ts                      # Auto-generated sitemap for all 51 routes with priority tiers
  robots.ts                       # Robots.txt (allows all, blocks /api/, points to sitemap)
  about/page.tsx
  contact/page.tsx
  gallery/page.tsx                # Filterable project portfolio
  blog/page.tsx
  blog/[slug]/page.tsx
  services/page.tsx               # Services hub
  services/*/page.tsx             # 6 individual service pages
  service-areas/page.tsx          # Service areas hub (31 cities grouped by county)
  service-areas/[city]/page.tsx   # 31 individual city SEO pages (with FAQ schema)
  api/contact/route.ts            # Form submission endpoint

components/
  ui/                             # Primitives
    Button.tsx                    # Polymorphic (button/link/a), 4 variants, btn-concrete
    Container.tsx                 # Max-width wrapper (default 7xl, narrow 4xl)
    SectionWrapper.tsx            # Section with bg variants (white/light/dark/gradient)
    Card.tsx, Badge.tsx           # Basic UI elements
    FormField.tsx                 # Input/textarea/select with validation
    MultiStepForm.tsx             # 3-step progressive form with directional transitions (7 service options)
    EstimateModal.tsx             # Context provider + modal + EstimateButton component
    AnimateOnScroll.tsx           # Binary scroll-trigger wrapper (uses useInView)
    RevealOnScroll.tsx            # Scroll-POSITION-linked animation (proportional to scroll)
    StatsCounter.tsx              # Animated count-up on scroll
    BeforeAfter.tsx               # Draggable image comparison slider
  sections/                       # Full-width page sections
    Hero.tsx                      # Hero with bg image, Ken Burns, stagger, parallax (desktop only), imageAlt prop for SEO
    HeroCTA.tsx                   # Client wrapper for modal trigger in server Hero
    SectionCTA.tsx                # Client wrapper for modal trigger in server sections
    PageHeader.tsx                # Reusable dark page header for non-hero pages (extends behind transparent header)
    TrustBar.tsx                  # Marquee conveyor belt with 5 animated stats (slides up from bottom)
    ServicesGrid.tsx              # Bento grid desktop + stacking cards mobile
    WhyChooseUs.tsx               # 6 differentiator cards with bg image
    DifferentiationSection.tsx    # Problem vs. Solution comparison rows (bubble animation)
    ProcessSteps.tsx              # 5-step timeline (horizontal desktop, vertical mobile)
    GallerySection.tsx            # Homepage before/after slider with pixelation scroll-reveal
    TestimonialsSection.tsx       # 3 testimonial cards
    ServiceArea.tsx               # Interactive "31 Cities" section — clickable counties expand city panels
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
    Header.tsx                    # Transparent→white header, dark mobile menu, estimate button pop-in
    Footer.tsx                    # 4-column footer with white logo + license bar
    MobileBottomBar.tsx           # Scroll-aware sticky CTA (appears when hero CTAs leave viewport)
  seo/
    JsonLd.tsx                    # Structured data (LocalBusiness, Service, FAQ, Article, Breadcrumb, HowTo)
    Breadcrumbs.tsx               # Visual breadcrumbs + BreadcrumbList schema

lib/                              # Data & utilities
  constants.ts                    # COMPANY, SERVICES, NAV_LINKS, TESTIMONIALS, DIFFERENTIATORS, PROCESS_STEPS, STATS, TRUST_BAR_ITEMS
  types.ts                        # TypeScript interfaces (Service, Testimonial, BlogPost, CityData, etc.)
  services-data.ts                # SERVICE_PAGES — full copy for each service page
  service-areas-data.ts           # SERVICE_AREAS — 31 cities with tier, county, FAQs, content
  blog-data.ts                    # BLOG_POSTS array (3 seed posts)
  gallery-data.ts                 # GALLERY_PROJECTS + PROJECT_CATEGORIES (18 projects, 4 with real images)
  about-data.ts                   # FOUNDER_STORY, VALUES, CREDENTIALS
  contact-data.ts                 # CONTACT_COPY
  pricing-data.ts                 # SERVICE_PRICING by service slug
  metadata.ts                     # generatePageMetadata() helper (supports ogType, publishedTime)
  utils.ts                        # cn() helper + getBookingUrgency() context-aware season text
  logo-base64.ts                  # White logo as base64 constant (used by OG image)

hooks/
  useInView.ts                    # IntersectionObserver hook (binary trigger, fires once)

content/                          # Editorial pipeline data (not shipped to production)
  post-queue.json                 # 10 briefs (status: queued → drafted → published)
  proposed-briefs.json            # Staging from /next-content-batch (normally [])
  proposed-briefs-summary.md      # Human-readable proposal summary
  site-inventory.json             # Auto-generated, 48 URLs for internal linking
  style-reference.md              # Voice guide for AI drafting passes

scripts/                          # CLI tools (Node + Python)
  generate-post.ts                # Friday draft pipeline (Claude + OpenAI + Resend + gh)
  build-site-inventory.ts         # Rebuilds site-inventory.json
  fetch-gsc-data.ts               # Google Search Console client
  propose-next-batch.ts           # /next-content-batch implementation
  generate-month1-doc.py          # Reference impl for month-1 client doc

.claude/skills/                   # Claude Code slash-command skills
  monthly-seo-doc/                # /monthly-seo-doc → client .docx
  next-content-batch/             # /next-content-batch → propose 4 new briefs

.github/workflows/                # Automation
  weekly-draft.yml                # Fri 16:00 UTC — AI draft + PR + email
  auto-merge-drafts.yml           # Sun 23:00 PT — auto-merge pending drafts
  weekly-publish.yml              # Mon 14:00 UTC — Netlify rebuild
  auto-propose-batch.yml          # Tue 16:00 UTC — propose next batch if queue is low
  merge-proposed-briefs.yml       # On proposed-briefs.json change — migrate to queue

public/images/
  logo.png                        # Company logo — dark version (for white backgrounds)
  logo-white.png                  # Company logo — white version (for dark backgrounds, footer, OG image)
  hero-bg.jpg                     # Homepage hero (crew on roof)
  why-choose-us-bg.jpg            # WhyChooseUs section background (finished roof)
  adu-construction.jpg            # ADU service card image (bento grid)
  complete-remodel.jpg            # Remodel service card image (bento grid)
  composite-decks.jpg             # Deck service card image (bento grid)
  concrete-foundations.jpg        # Foundation service card image (bento grid)
  roofing.jpg                     # Roofing service card image (bento grid)
  retaining-walls.jpg             # Retaining wall service card image (bento grid)
  composite-decks-hero.jpg        # Composite decks service page hero
  roofing-hero.jpg                # Roofing service page hero
  adu-construction-hero.jpg       # ADU construction service page hero
  retaining-walls-hero.jpg        # Retaining walls service page hero
  concrete-foundations-hero.jpg   # Concrete foundations service page hero (renamed from concrete-foundations.jpg)
  complete-remodel-hero.jpg       # Complete remodel service page hero
  roofing-before.jpg              # Before/after: gazebo roof before replacement
  roofing-after.jpg               # Before/after: gazebo roof after replacement
  gallery-composite-deck-pergola.jpg  # Gallery: deck with pergola & LED lighting
  gallery-composite-deck-spa.jpg      # Gallery: spa deck with hot tub & privacy screens
  gallery-composite-deck-railing.jpg  # Gallery: wraparound deck with railing
  gallery-composite-deck-firepit.jpg  # Gallery: entertainer's deck with fire pit
  gallery-retaining-wall-steps.jpg    # Gallery: concrete wall with redwood staircase & pavers
  gallery-retaining-wall-landscaped.jpg # Gallery: concrete wall with fence & gravel landscaping
  gallery-retaining-wall-rebar.jpg    # Gallery: hillside retaining wall rebar & formwork
  gallery-foundation-rebar.jpg       # Gallery: rebar grid layout for new foundation
  gallery-foundation-slab-prep.jpg   # Gallery: residential slab with rebar & formwork
  gallery-foundation-garage-prep.jpg # Gallery: garage subgrade compaction
  gallery-remodel-kitchen.jpg        # Gallery: white cabinet kitchen remodel
  gallery-remodel-bathroom.jpg       # Gallery: marble tile bathroom remodel
  gallery-remodel-kitchen-island.jpg # Gallery: butcher block island kitchen remodel
  gallery-adu-insulation.jpg         # Gallery: ADU insulation installation
  gallery-adu-framing.jpg            # Gallery: two-story ADU framing phase
  gallery-adu-housewrap.jpg          # Gallery: ADU Tyvek housewrap installation
  gallery-roofing-shingles.jpg       # Gallery: architectural shingles on modern home
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

**To add a new blog post:** Two paths —
  1. **Automated (preferred):** The Friday `weekly-draft.yml` workflow picks up the next `status: "queued"` brief from `content/post-queue.json`, generates the full post with featured image, opens a PR. To add a new topic, invoke `/next-content-batch` (proposes 4 new briefs) or edit `post-queue.json` directly with a manually-written brief.
  2. **Manual:** Append to `BLOG_POSTS` in `lib/blog-data.ts`. Set `date` to a past date to publish immediately, or a future Monday to schedule. Must include `faqs` field if you want FAQPage schema. Static params auto-generate the route.

**To add a new city:** Add to `SERVICE_AREAS` in service-areas-data.ts with tier (1/2/3), county, FAQs, and content. Static params auto-generate the route.

**To add a gallery project:** Add to `GALLERY_PROJECTS` in gallery-data.ts with categorySlug matching a service slug. Include `image` path for real photos. Optional `imagePosition` (e.g., `"center 70%"`) controls `object-position` for tall/portrait images that need custom cropping. All service pages pass `categorySlug` to `ServiceGallery`, so new gallery images auto-appear on both the gallery page and the matching service page.

**To add a service image to the bento grid:** Add to `SERVICE_IMAGES` map in ServicesGrid.tsx. Also add descriptive SEO alt text to `SERVICE_IMAGE_ALT` map.

**To add a hero image to a service page:** Pass `backgroundImage` and `imageAlt` props to the `<Hero>` component in the service page file.

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

**Layer 1: Hero Stagger + Parallax (`Hero.tsx`)**
- Hero is a client component with `useState` for load trigger
- Elements stagger in on page load: urgency badge (0ms) → headline (150ms) → subheadline (350ms) → CTA (550ms) → trust line (700ms)
- Uses blur-to-sharp transition (`blur-[2px]` → `blur-0`) for cinematic feel
- Hero background image has Ken Burns effect (`@keyframes ken-burns`, 20s cycle)
- **Parallax** (desktop only, `md:` and up): background moves at 0.3x scroll speed via `requestAnimationFrame`. `scale(1.1)` buffer prevents edge reveal. Disabled on mobile to avoid image cutoff.
- Hero pulls up behind transparent header with `-mt-20 md:-mt-24` + extra top padding (`pt-28 md:pt-36`)
- Mobile hero height: `min-h-[85vh]`, desktop: `min-h-[80vh]`

**Layer 2: Scroll-Position-Linked (`RevealOnScroll.tsx`) — PRIMARY SYSTEM**
- Animation progress is **proportional to scroll position**, not binary on/off
- Uses `getBoundingClientRect()` on each scroll frame to calculate element's exact position
- Travel zone = **65% of viewport height** — element animates from bottom edge to just above center
- Progress mapped through `easeOutExpo` curve for natural deceleration
- **One-way only** — once progress hits 100%, element locks via `locked.current = true` and scroll listener disconnects. Scrolling back up does NOT reverse the animation.
- IntersectionObserver gates the scroll listener — only elements currently in viewport cost CPU per frame
- Animation types: `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-up`, `scale-rotate`, `bubble` (elastic overshoot — easeOutBack with subtle single-bounce settle)

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
- **Slides up from bottom** on scroll entry (`translate-y-10 → translate-y-0`, 1000ms) for parallax feel

### Mobile Bottom Bar

`MobileBottomBar` is scroll-aware:
- **Hidden on page load** — hero CTAs are already visible
- **Slides up** when hero CTAs scroll out of viewport (detected via `data-hero-cta` attribute on Hero's CTA wrapper)
- **Slides back down** if user scrolls back to hero
- **Hidden on `/contact` page** entirely
- **On pages without a hero** — shows immediately

### Header — Transparent-to-White with Scroll Detection

The header has three visual states controlled by scroll position and page type:

**Transparent state** (hero/PageHeader pages, before scroll):
- `bg-transparent` with white logo (`logo-white.png`), white nav text, white hamburger
- Detected via `[data-hero-cta]` or `[data-page-header]` in the DOM
- Re-checks on route change via `usePathname()` dependency

**Solid state** (after scrolling 100px, or pages without dark top section):
- `bg-white` with colored logo, dark nav text, shadow
- 700ms transition with `cubic-bezier(0.16,1,0.3,1)` easing

**Estimate button pop-in** (desktop only):
- Hidden (`opacity-0 scale-95`) when hero CTAs are in viewport
- Fades/scales in when user scrolls past hero CTAs (`data-hero-cta` sentinel)

**Desktop services panel:**
- Full-width panel that expands from header, transparent-aware
- Service links scale up 10% on hover (`hover:scale-110`)
- 300ms close delay with timer ref, invisible bridge div for hover zone

**Hamburger ↔ X** toggle: 3 spans with rotate/translate transitions, color-aware (white on dark, dark on white)

### Mobile Menu — Full-Screen Takeover

Premium mobile menu with two visual modes:

**Dark mode** (at top of hero pages, `menuIsDark = hasHero && !isScrolled`):
- `bg-primary` full-screen, white logo, white nav text
- Header background also goes dark to blend seamlessly

**Light mode** (scrolled down or non-hero pages):
- `bg-white` full-screen, colored logo, dark nav text

**Shared behaviors:**
- Red accent line sweeps across top on open (1000ms)
- Nav items stagger in at 80ms intervals with 700ms duration, `translate-y-6` entrance
- Each item has a hidden red dash that slides out on hover (`w-0 → w-6`)
- Services submenu has red border accent (`border-l-2 border-accent-orange/20`), items slide in from left
- Bottom CTA area with phone + estimate button, separated by themed divider
- License badge fades in last (900ms delay) as credibility anchor

### Multi-Step Form

3-step progressive form: Service Selection → Timeline/Budget → Contact Info
- **7 service options** in 2-column grid: Exterior Repairs, Retaining Walls, Complete Remodel, Composite Decks, Roofing, ADU Construction, Concrete Foundations & Slabs (spans full width as last odd item)
- Step transitions animate with directional slide (forward = slide right, back = slide left)
- 150ms fade-out, content swaps, fades in from opposite direction
- Progress bar with numbered circles
- Used in both `CTABlock` (inline) and `EstimateModal` (popup)
- Collects: service, timeline, scope, name, phone, email, message

### Services Bento Grid (Desktop) + Stacking Cards (Mobile)

**Desktop (`sm:` and up):** Asymmetric bento layout:
- 2 large "Featured Service" cards (Complete Remodel + ADU) spanning 2 columns
- 4 compact cards (Foundations, Retaining Walls, Decks, Roofing) in a row
- `SERVICE_IMAGES` map has real photos for all 6 services; `SERVICE_IMAGE_ALT` provides SEO alt text
- Large cards slide in from left/right, compact cards scale up via `RevealOnScroll`

**Mobile (`sm:hidden`):** Sticky stacking card effect:
- Each card uses `position: sticky` with increasing `top` (80px header + 48px per card)
- Higher `z-index` on each successive card so they stack on top
- Service name at top of card (visible in 48px peek area when covered)
- Each card has its own `IntersectionObserver` via `StickyCard` component for fade-up animation
- `RevealOnScroll` wrapper was removed because it breaks `position: sticky`
- All cards scroll out of view together when section ends
- **Key learning:** `position: sticky` requires the sticky element to be a direct child of the scroll container. Wrapping in `RevealOnScroll` (which adds a wrapper div) breaks stacking.
- **Key learning:** `transition-all` on sticky cards causes visible lag — the browser transitions sticky positioning changes over the duration instead of snapping. Use `transition-[opacity,transform]` to scope transitions to only the animated properties.
- **Key learning:** Artificial stagger delays (`transitionDelay: index * Nms`) on cards with individual IntersectionObservers cause the last cards to appear laggy on fast scroll — all observers fire nearly simultaneously, making the delay obvious. Natural scroll timing provides sufficient stagger without any delay.

### Service Area Pages — 3 Tiers

31 city pages with content depth varying by market tier:
- **Tier 1 (Flagship):** Mill Valley, San Rafael, Berkeley, Oakland, San Francisco, Palo Alto, San Jose — deepest content, 6 FAQs, full housing stock details
- **Tier 2 (Market):** Richmond, Concord, Daly City, South SF, Burlingame, Hillsborough, Foster City, San Carlos, Pacifica, Woodside, Atherton, Menlo Park, Los Altos, Mountain View, Sunnyvale, Santa Clara, Cupertino — solid content, 3-4 FAQs
- **Tier 3 (Presence):** San Anselmo, Sausalito, Tiburon, Fairfax, Millbrae, San Bruno, Belmont — concise, 3 FAQs

All pages have unique hyper-local content (NOT template swaps with city names). Each addresses that city's specific housing stock, terrain, soil, permit authority, and construction angles.

Helper functions: `getCitiesByCounty()`, `getCityBySlug()`, `getNeighboringCities()`

## SEO

Audited against 2026 Google standards (April 2026). All critical items addressed.

### Metadata & OG
- Every page exports `metadata` using `generatePageMetadata()` from `lib/metadata.ts`
- `generatePageMetadata()` supports `ogType` ("website" or "article") and `publishedTime`
- Blog posts use `og:type: "article"` with `publishedTime` for Google Discover
- Dynamic OG image (`app/opengraph-image.tsx`) — 1200x630 with logo, tagline, CTA, credentials. Logo embedded as base64 via `lib/logo-base64.ts`
- All URLs use `gadgetconstructionsf.com` (the actual live domain)

### Structured Data (JSON-LD)
- `LocalBusiness` (GeneralContractor) on every page via root layout
- `Service` schema with `priceRange` on all 6 service pages
- `FAQPage` schema on service pages AND city pages (130+ FAQs)
- `Article` schema on blog posts
- `BreadcrumbList` on all pages with breadcrumbs
- `HowTo` schema for 5-step process on homepage
- 33 FAQ entries across service pages

### Crawlability
- `app/sitemap.ts` — auto-generated sitemap for all 51 routes, with priority tiers by page type and city tier
- `app/robots.ts` — allows all crawling, blocks `/api/`, points to sitemap
- Self-referencing canonical URLs on all pages

### Image Optimization
- `next.config.ts` configured with `formats: ["image/avif", "image/webp"]`
- Next.js `<Image>` component used everywhere with proper `sizes`, `priority`, `alt`

### Accessibility
- Skip-to-content link in root layout (`sr-only`, visible on focus)
- `id="main-content"` on `<main>` element
- All forms have proper labels, aria attributes
- `prefers-reduced-motion` respected in all animation hooks

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
- **Hero height:** `min-h-[85vh] md:min-h-[80vh]` — taller on mobile to prevent content cutoff
- **Grids:** Typically `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **CTABlock and ContactForm:** Switch to 2-column at `md:` breakpoint (768px), not `lg:`

## CRO Decisions Made

These were research-backed decisions — don't revert without reason:

- **Multi-step form** over single-step (80-120% more form fills per contractor CRO data)
- **Modal estimate form** triggered from header/hero/sections — keeps visitor on the page that built their trust
- **"Minutes" not "24 hours"** response time promise (15-22% conversion lift)
- **Urgency badge** on hero — context-aware via `getBookingUrgency()` in `lib/utils.ts`, auto-updates by season/year
- **3 CTAs max on homepage** (hero, after testimonials, CTABlock) — reduced from 5 to lower cognitive load
- **TrustBar as marquee** not static — adds visual energy + fits 5 stats without taking vertical space
- **Pricing ranges on service pages** (10-20% conversion lift vs. no pricing)
- **"Why Us vs Others" differentiation section** using anti-contractor framework
- **Service area CTA links to /service-areas** hub page (drives SEO traffic) instead of estimate modal
- **Gallery button links to /gallery** page instead of contact form (fixes expectation mismatch)

## Cognitive Load Decisions

- **WhyChooseUs moved from homepage to About page** — homepage had too many trust sections back-to-back
- **Section heading styles varied** — not every section uses centered heading + orange underline. Differentiation and Gallery use left-aligned eyebrow tags.
- **Homepage sections (current order):** Hero → TrustBar → Services (bento) → Differentiation (bubble animation) → Process → Gallery (before/after slider with pixelation reveal) → Testimonials → Service Area (interactive county explorer) → CTABlock
- **"Home" removed from nav** — logo handles navigation home

## What's Pending

- **Founder story** — placeholder copy in about-data.ts, needs Raul's real story
- **Google Ads conversion tracking** — needs implementation on form submissions before ad campaigns go live (separate from CallRail which is now wired up for call attribution)
- **Google Business Profile** — optimize for local SEO, ensure NAP consistency with site
- **Service-specific testimonials** — removed from service pages pending hyper-relevant reviews per service category
- **Exterior repairs hero image** — service page currently uses `/images/why-choose-us-bg.jpg` as placeholder. Swap `backgroundImage` on `app/services/exterior-repairs/page.tsx:75` when a real photo is available.
- **Gallery photos for exterior repairs** — no gallery entries tagged `categorySlug: "exterior-repairs"` yet. When added, the ServiceGallery will auto-populate on the page.

## What's Done (Recently Completed)

- **Exterior repairs service page** — `/services/exterior-repairs` covers dry rot, stucco, and siding as three subservices on one URL. 1,400+ words, 6-item scope, 5-step process, 4 differentiators, 8 FAQs, itemized pricing. Uses a custom `multiServiceGraphSchema()` helper that emits a `@graph` with three separate `Service` nodes (Dry Rot Repair, Stucco Repair, Siding Installation) per 2026 SEO research. Exterior Repairs is now the 7th entry in `SERVICES`.
- **31 city cross-linking to exterior-repairs** — every city page links into the new service with varied anchor text via the new optional `serviceAnchors?: Partial<Record<string, string>>` field on `CityData`. Examples: "Doelger Home Stucco & Dry Rot Repair" (Daly City), "Eichler T1-11 Siding & Exterior Repair" (Menlo Park), "Craftsman Home Dry Rot & Siding Repair" (Berkeley). Rendered by `CityServices` in CityPageContent.tsx.
- **12 hyper-local exterior-repair paragraphs** — new `CityExteriorRepairsContext` component renders a unique ~80-word paragraph on 12 priority cities (SF, Daly City, Pacifica, Sausalito, Mill Valley, San Rafael, San Anselmo, Berkeley, Oakland, Palo Alto, Menlo Park, San Jose). Only renders when `CityData.exteriorRepairsContext` field is populated. E-E-A-T Experience signal per 2026 Helpful Content update.
- **ADU process rewrite** — ADU page now correctly reflects that Gadget receives approved plans from the homeowner's architect/designer. Gadget does NOT fabricate plan sets. New process: Feasibility Walk → Plan Review → Permit Submittal → Construction → Inspections & COO. Intro paragraph, scope items, "Full Design-Build" differentiator (→ "We Work With Your Designer"), and timeline FAQ all updated to remove design-build framing.
- **Blog featured images** — all 3 existing posts have real architectural/editorial featured images (remodel cost, foundation signs, ADU guide). New blog detail hero layout: centered category · date · reading time meta line, big centered H1, featured image attached seamlessly to the dark canvas (no card chrome, `aspect-[3/2]`). Legacy `PageHeader` still used elsewhere.
- **Blog hero animations** — `blueprint-grid` class (faint diagonal-drifting grid, 80s loop) + `hero-red-glow` class (breathing radial red accent, 6s loop, 18-42% opacity) in globals.css. Pure CSS, GPU-friendly, respects `prefers-reduced-motion`.
- **CallRail DNI installed** — dynamic number insertion via `<script src="cdn.callrail.com/companies/336423236/f892bb58a107202ac4c7/12/swap.js">` in root layout. Real business number (628) 233-3589 stays in source code; CallRail's JS swaps it per-visitor based on traffic source (organic, paid, GBP, direct). CallRail "Website pool" configured on their side. Every phone number on the site is attributed.
- **SearchAtlas dynamic optimization script** — third-party SEO script in root layout with `nowprocket` / `nitro-exclude` attributes preserved for cache-plugin compatibility.
- **Scheduled blog publishing** — blog posts filter via new `isPublished()` helper in lib/blog-data.ts (published when `date <= today`). Future-dated posts stay hidden from `/blog` listing, detail route (404s), and sitemap. Combined with `weekly-publish.yml` workflow (Monday 14:00 UTC) that triggers Netlify rebuild so posts auto-publish on their scheduled date without any manual action.
- **AI weekly draft pipeline** — complete automation that generates blog posts end-to-end. Details under "Content Automation Pipeline" section below. Friday 16:00 UTC workflow generates draft + image + opens PR + emails HTML preview + attaches image file.
- **Multi-pass SEO generation** — the draft generator uses TWO Claude calls: Pass 1 drafts from brief + style guide + voice anchors; Pass 2 runs SEO critique on the draft with a 48-URL site inventory, adds 12-20 contextual internal links with varied anchor text, restructures passages for LLM-chunk retrieval, and appends 5-7 FAQs with FAQPage schema. SEO notes logged to PR body for transparency.
- **Site inventory generator** — `scripts/build-site-inventory.ts` reads SERVICES + SERVICE_AREAS + BLOG_POSTS + static pages → emits `content/site-inventory.json` (48 URLs with titles/summaries/tags). Auto-runs at start of every `generate-post.ts` invocation.
- **Featured image generation via gpt-image-1** — the Friday pipeline calls OpenAI `gpt-image-1` at 1536x1024 medium quality using a Claude-generated image prompt (Haiku 4.5, using the exact system prompt ported from the n8n Feature Image Creator workflow). Saved to `public/images/blog-<slug>.png` and wired into `featuredImage` field. Cost: ~$0.05 per image.
- **Draft email delivery** — PR creation also sends an HTML email via Resend to `DRAFT_REVIEW_EMAILS` (currently `admin@esquair.com` and `info@gadgetconstructionsf.com`) from `estimates@gadgetconstructionsf.com`. Email includes: featured image rendered inline (via GitHub raw URL) AND attached as a real PNG file, metadata card, rendered markdown body, CTA button to PR.
- **Auto-merge safety net** — `auto-merge-drafts.yml` fires Sunday 23:00 PT (Monday 07:00 UTC), squash-merges any still-open `drafts/*` PR so posts land on main before the Monday publish rebuild. Contract: leave PR open = implicit approval, close PR = explicit rejection, edit PR = still auto-merges.
- **Monthly client doc skill** — `/monthly-seo-doc` invokes `.claude/skills/monthly-seo-doc/generate.py` (python-docx). Auto-detects the next 4 unpublished briefs, writes custom client rationale + target audience per post, produces `Gadget-Construction-SEO-Month-N.docx`. Filename pattern ignored by .gitignore (regenerable via skill).
- **Content batch proposal skill** — `/next-content-batch` invokes `scripts/propose-next-batch.ts`. Pulls 90 days of Google Search Console data, reads existing queue + published posts + services + cities + Google Ads keyword plan, calls Claude Opus 4.7 to propose 4 new briefs (mix of new posts and refreshes if GSC data supports). Writes to `content/proposed-briefs.json` + summary, opens PR for review. On merge, `merge-proposed-briefs.yml` workflow detects the file change and migrates briefs into `post-queue.json` with `status: "queued"`. Cost: ~$0.50-$1.50 per batch.
- **10-post SEO content plan locked** — `content/post-queue.json` contains 10 detailed briefs for Weeks 1-10 (2026-04-27 through 2026-06-29). Primary focus: composite decks (4 posts), exterior repairs (4 posts), foundation underpinning (1 post), coastal cluster hub (1 post). Geographic mix per Option B: SF-anchored + Bay Area-wide + hyper-local. All briefs have complete outline, keywords, internal links, must-includes, CTA.
- **Service pages regionalized** — all 6 service pages rewritten from SF-only to Bay Area (31 cities, 6 counties). Meta titles, headlines, intros, scope, differentiators, FAQs, pricing headings all updated. SF details preserved as anchor, supplemented with Marin, East Bay, Peninsula, South Bay references.
- **Service page variety pass** — headlines, CTA text, intro openers, FAQ order, testimonial headings, and process step titles diversified across all 6 pages to avoid template feel
- **All 6 service card images** — bento grid now has real photos for every service including concrete foundations
- **All 6 service page hero images** — composite decks, roofing, ADU, retaining walls, concrete foundations, and complete remodel pages all have real hero background images with SEO alt text (via `imageAlt` prop on Hero component)
- **Before/after slider** — roofing service page and homepage both use interactive BeforeAfter component with gazebo roof replacement photos
- **BeforeAfter clipPath fix** — uses `clipPath: inset()` instead of `width` for pixel-perfect image alignment
- **Homepage pixelation reveal** — GallerySection before/after slider pixelates into view via scroll-linked SVG filter (direct DOM manipulation for smoothness)
- **Interactive county explorer** — ServiceArea component now has clickable county badges that expand a panel with city grid, staggered fade-in, and links to city pages
- **Bubble animation** — DifferentiationSection rows use `bubble` RevealOnScroll type (easeOutBack single-overshoot settle)
- **All gallery projects have real images** — 16 projects across all 6 categories: 3 remodels (kitchen, bathroom, kitchen island), 3 foundations (rebar, slab prep, garage compaction), 3 retaining walls (steps, landscaped, rebar/formwork), 4 composite decks, 1 roofing (shingles), 3 ADUs (insulation, framing, housewrap). All placeholder entries removed.
- **ServiceGallery pulls real images** — all 6 service pages pass `categorySlug` to `ServiceGallery`, which filters `GALLERY_PROJECTS` for entries with images. Optional `imagePosition` field controls `object-position` for custom cropping.
- **Mobile stacking card lag fix** — `transition-all` replaced with `transition-[opacity,transform]` to prevent sticky positioning from being transitioned. Stagger delay removed — natural scroll timing handles card entrance sequencing.
- **Form backend connected** — Resend email delivery from `estimates@gadgetconstructionsf.com` with all 7 form fields, reply-to, tap-to-call. ntfy push notifications for instant mobile alerts on new leads. Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL`, `NTFY_TOPIC` (set in Netlify).
- **Google Ads campaign plan** — 28 keywords across 5 ad groups (dry rot, stucco, siding, decks, underpinning), 2 campaigns (urgent repairs + planned projects). Budget: $2,500–$4,000/month Search Ads + $500–$800/month LSAs. Word doc generated for client presentation.
- **SEO alt text system** — `SERVICE_IMAGE_ALT` map in ServicesGrid.tsx provides descriptive, keyword-rich alt text for bento grid images
- **Scroll restoration** — `history.scrollRestoration = "manual"` in root layout forces scroll-to-top on refresh
- **Testimonials removed from service pages** — pending hyper-relevant per-service reviews
- **Real testimonials** — Cindy Olander, Srinivas Ketavarapu, Reeta Prasad (replaced all placeholders)
- **Transparent header** — fades from transparent to white on scroll, route-aware
- **Premium mobile menu** — full-screen dark/light takeover with red carpet accent
- **Stacking service cards** — sticky cards on mobile with peek effect
- **Hero parallax** — desktop-only background scroll at 0.3x speed
- **TrustBar slide-up** — parallax entrance from bottom
- **Exterior Repairs** — added as 7th service option in estimate form
- **Full SEO audit** — sitemap, robots, OG image, FAQ schema on cities, HowTo schema, priceRange on services, WebP/AVIF, skip-to-content, corrected blog reading times
- **Domain corrected** — all URLs updated from gadgetconstruction.com to gadgetconstructionsf.com
- **Context-aware urgency badge** — auto-updates by season/year
- **PageHeader component** — reusable dark header for non-hero pages
- **Viewport overflow fix** — `overflow-x: clip` on html + main to prevent horizontal scroll from slide animations

## Content Automation Pipeline

Complete end-to-end pipeline for AI-generated blog posts. Runs on GitHub Actions with secrets for all external APIs. Never modify `content/post-queue.json` directly unless adding manually — the skills handle writes.

### Weekly cadence

```
Friday   16:00 UTC  (~9am PDT)  → weekly-draft.yml     — AI drafts next queued post, opens PR, emails review copy
Weekend              (~60 hrs)   → human review window  — edit, merge, or close the PR
Sunday   07:00 UTC  (~11pm PT)  → auto-merge-drafts.yml — squash-merges any still-open drafts/* PR
Monday   14:00 UTC  (~7am PDT)  → weekly-publish.yml   — triggers Netlify rebuild; posts with date<=today go live
```

### The Friday draft pipeline (`scripts/generate-post.ts`)

1. Rebuild site inventory (`scripts/build-site-inventory.ts` → `content/site-inventory.json`, 48 URLs)
2. Find next `status: "queued"` brief in `content/post-queue.json`
3. Load `content/style-reference.md` + 2 most-recent published posts as voice anchors
4. **Pass 1 (Sonnet 4.6):** draft full post from brief
5. **Pass 2 (Sonnet 4.6):** SEO critique + revision:
   - 12-20 contextual internal links with varied anchor text (<25% exact-match)
   - Passage-level self-containment (each H2 starts with a direct-answer sentence)
   - Keyword density audit, secondary keyword integration
   - 5-7 FAQ questions appended before CTA
   - Returns 3 XML-tagged outputs: `<revised_post>`, `<faqs>` JSON, `<seo_notes>`
6. **Image prompt (Haiku 4.5):** generates detailed visual prompt per the Gadget brand (charcoal + red, architectural/editorial aesthetic). Rules include: single hero number over range, single quotes around exact rendered text, no trailing `+` (gpt-image-1 hallucinates it as a digit).
7. **Image generation (gpt-image-1):** 1536x1024 medium-quality PNG. Saved to `public/images/blog-<slug>.png`.
8. Insert post into `lib/blog-data.ts` (at top of `BLOG_POSTS` array) with `featuredImage` and `faqs` fields populated
9. Flip brief status: `queued` → `drafted` in queue
10. `git push --force origin drafts/<slug>` (stale drafts always overwritten — unmerged = abandoned)
11. `gh pr create` with body containing SEO notes + review checklist + image preview
12. `resend.emails.send()` — HTML email with inline image render + PNG attachment to `DRAFT_REVIEW_EMAILS`

Cost per post: ~$0.27 (Sonnet draft $0.08 + Sonnet critique $0.14 + Haiku image prompt $0.001 + gpt-image-1 $0.04).

### The /monthly-seo-doc skill

Run monthly before client meetings. `.claude/skills/monthly-seo-doc/` contains `SKILL.md` (invocation instructions) and `generate.py` (python-docx builder). Auto-detects the next 4 unpublished briefs (by counting how many are already published), writes custom client-facing rationale + audience paragraphs matching the voice in `scripts/generate-month1-doc.py` (reference implementation), outputs `Gadget-Construction-SEO-Month-N.docx`.

### The /next-content-batch skill

Run monthly when queue is low (or automatically — see below). `.claude/skills/next-content-batch/SKILL.md` + `scripts/propose-next-batch.ts`. Pulls 90 days of GSC data via service-account auth, combines with post-queue + published posts + services + ads plan, calls Claude Opus 4.7 (default — override with `MODEL=claude-sonnet-4-6`) to propose 4 briefs. Opens `proposals/content-batch-<date>` PR. On merge, `merge-proposed-briefs.yml` migrates briefs from `content/proposed-briefs.json` into `content/post-queue.json`.

### Auto-trigger proposal when queue is low

`auto-propose-batch.yml` runs every Tuesday at 16:00 UTC. It counts briefs with `scheduledDate > today` in `post-queue.json`. If the runway drops to **4 weeks or fewer** AND no proposal PR is already open, it invokes `scripts/propose-next-batch.ts` automatically. Manual trigger via `gh workflow run auto-propose-batch.yml --ref main -f force=true` bypasses the threshold.

### Required GitHub Actions secrets

| Secret | Used by | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | weekly-draft, next-content-batch | Claude API (post drafting, SEO critique, image prompts, batch proposal) |
| `OPENAI_API_KEY` | weekly-draft | gpt-image-1 featured image generation |
| `RESEND_API_KEY` | weekly-draft | Send HTML review emails to admin@esquair.com + info@gadgetconstructionsf.com |
| `NETLIFY_BUILD_HOOK_URL` | weekly-publish | Triggers Netlify rebuild on Monday 07:00 UTC |
| `GSC_SERVICE_ACCOUNT_JSON_BASE64` | next-content-batch | Base64-encoded GCP service account JSON for Search Console API reads |
| `GITHUB_TOKEN` | all workflows | Auto-provided by GitHub Actions for gh CLI (branch push, PR create) |

### Brief schema (`content/post-queue.json`)

Each brief has: `slug`, `scheduledDate`, `status` (queued/drafted/published/proposed), `title`, `metaTitle`, `excerpt`, `primaryKeyword`, `secondaryKeywords[]`, `relatedService`, `targetWordCount`, `geoFocus`, `citiesReferenced[]`, `outline[{h2, h3[], notes}]`, `mustInclude[]`, `mustAvoid[]`, `internalLinks[{url, anchor}]`, `cta`. Proposed briefs from `/next-content-batch` also have `action: "new" | "refresh"`, optional `refreshesSlug`, and `proposalRationale`.

### Brief lifecycle

```
Proposed (content/proposed-briefs.json)
  → Queued (content/post-queue.json, status: queued)     ← after proposal PR merges
  → Drafted (status: drafted on drafts/<slug> branch)    ← after Friday draft PR created
  → Drafted on main                                      ← after manual merge OR Sunday auto-merge
  → Published                                            ← after Monday rebuild + scheduled date arrives
```

Editing published-post status back to "queued" triggers a regeneration on next Friday run. Closing a Friday PR without merging keeps the brief as queued on main, so it will re-draft next Friday with a new attempt.

### Key files

```
content/
  post-queue.json              # 10 briefs, manually edited or via /next-content-batch
  proposed-briefs.json         # staging for /next-content-batch output (normally empty [])
  proposed-briefs-summary.md   # human-readable summary for the proposal PR
  site-inventory.json          # auto-generated list of 48 linkable URLs
  style-reference.md           # voice guide loaded by the drafting passes

scripts/
  generate-post.ts             # Friday draft pipeline
  build-site-inventory.ts      # rebuilds site-inventory.json from repo state
  fetch-gsc-data.ts            # Search Console API client
  propose-next-batch.ts        # /next-content-batch implementation
  generate-month1-doc.py       # reference impl for month-1 client doc (superseded by skill)

.claude/skills/
  monthly-seo-doc/             # /monthly-seo-doc skill
  next-content-batch/          # /next-content-batch skill

.github/workflows/
  weekly-draft.yml             # Fri 16:00 UTC — AI draft + PR + email
  auto-merge-drafts.yml        # Sun 23:00 PT — merge any open drafts/* PR
  weekly-publish.yml           # Mon 14:00 UTC — Netlify rebuild
  merge-proposed-briefs.yml    # on push to proposed-briefs.json — migrate to queue
```

### Debugging the pipeline

- Check PR #N body for `## SEO Critique Pass Notes` section — documents what the critique pass changed vs. the initial draft
- Inspect workflow run logs via `gh run view <id> --log-failed` or `gh run view <id> --log`
- Manual trigger for testing: `gh workflow run weekly-draft.yml --ref main` (will draft whatever post is next queued)
- To regenerate a specific post from scratch: close any existing drafts/<slug> PR, delete remote branch, re-trigger the workflow (post status on main is still "queued" if PR never merged to main)

## GitHub & Deployment

- **Repo:** `raul-esquair/gadgetconstruction` (public)
- **Branch:** `main`
- **Live URL:** `https://gadgetconstructionsf.com`
- **Deployment:** Netlify (connected to GitHub repo, auto-deploys on push)
- **Build command:** `npm run build`
- **51+ routes** (homepage + about + contact + gallery + blog listing + 3 blog posts + services hub + 6 service pages + service areas hub + 31 city pages + API route + sitemap.xml + robots.txt + opengraph-image)

## Key Gotchas

- **Domain is `gadgetconstructionsf.com`** NOT `gadgetconstruction.com` — all URLs, schemas, sitemap, OG must use the SF version
- **`overflow-x: clip`** (not `hidden`) on html/main — `hidden` breaks `position: sticky` on mobile stacking cards
- **Parallax is desktop-only** — `scale(1.1)` causes image cutoff on mobile viewports
- **`EstimateButton` and `Button` are separate components** — both need changes applied independently (different `whitespace` rules, etc.)
- **`RevealOnScroll` breaks `position: sticky`** — it wraps children in a div that disrupts the sticky parent relationship. Use inline `IntersectionObserver` instead (see `StickyCard` in ServicesGrid.tsx)
- **iOS Safari ignores `user-scalable=no`** since iOS 10 — don't try to prevent zoom via viewport meta. Use CSS overflow clipping instead.
- **OG image on Netlify** — `fs.readFile` and `process.cwd()` don't work in serverless. Embed assets as base64 constants or fetch via absolute URL.
- **Service pages are regionalized to "Bay Area"** — NOT "San Francisco." All meta titles, headlines, intros, FAQs, and pricing headings say "Bay Area" / "31 cities" / "6 counties." SF is kept as the anchor with specific neighborhoods, but supplemented with Marin, East Bay, Peninsula, South Bay references. Do NOT revert to SF-only framing.
- **Service page variety** — each page has unique headline structure, CTA text, intro opener, FAQ lead question, and testimonial heading. Do NOT use the same pattern across all 6 pages.
- **Testimonials removed from service pages** — intentionally removed pending hyper-relevant per-service reviews. Do NOT re-add generic testimonials.
- **BeforeAfter uses `clipPath`** not `width` — `clipPath: inset(0 X% 0 0)` keeps both images at full container width so `object-cover` crops them identically. Using `width` causes misaligned crops.
- **CallRail uses DNI (dynamic number insertion) via JS** — the real business number `(628) 233-3589` stays in the source code (JSX, JSON-LD schema, OG image, everywhere). The CallRail swap.js script in root layout swaps the displayed number per-visitor based on traffic source. Do NOT replace `(628) 233-3589` with a tracking number in source — CallRail's dashboard owns the mapping. If a new CallRail company ID is needed, swap only the `src` URL in `app/layout.tsx`.
- **Email sender must be verified in Resend** — all blog draft emails use `estimates@gadgetconstructionsf.com` because that domain/sender is already verified in Resend for the contact form. Sending from an unverified address (like `drafts@...`) would fail.
- **Blog posts use `isPublished()` filter** — future-dated posts exist in `BLOG_POSTS` array but don't appear on `/blog`, at their detail route (404), or in the sitemap until their `date` arrives. This enables pre-writing + scheduled publishing. Always import `isPublished` or `getPublishedPosts` from `lib/blog-data.ts`, never iterate `BLOG_POSTS` directly in user-facing routes.
- **gpt-image-1 hallucinates numeric ranges with duplicate currency symbols** — `$15K-$60K` format caused a failed render ("$15K-600K"). The image prompt generator system prompt enforces: single hero number preferred over range, if range then single `$` sign only (`$15K-60K`), no trailing `+`, wrap exact text in single quotes.
- **Force push on `drafts/` branches** — `generate-post.ts` uses `git push --force` because any unmerged draft is considered abandoned and overwritten on rerun. If you want to preserve a draft, merge it before rerunning the workflow.
- **Auto-merge contract** — leave a drafts/* PR open past Sunday 23:00 PT = implicit approval (Monday publish). Close PR = explicit rejection (brief stays `queued` on main, re-drafts next Friday). Do NOT leave PRs open with intent to revisit later unless you mean to ship them.
- **FAQ rich results restricted to health/gov since 2023** — the `faqSchema()` still ships because it captures People Also Ask + LLM answer-engine citation (ChatGPT, Perplexity, Google AI Overviews), NOT because we expect the old FAQ rich result display. Keep generating FAQ blocks anyway.
- **Internal linking target: 12-20 links per 2,500-word post** — the SEO critique pass enforces this. Briefs specify 3-5 required links; critique pass adds 8-15 more from the site inventory. Anchor text diversification: <25% exact-match. Top 30% of page gets at least 3 links.
- **Do NOT edit `content/proposed-briefs.json` on main manually** — the `merge-proposed-briefs.yml` workflow watches it and will try to migrate whatever's there into the queue. Edit only through `/next-content-batch` PRs.
- **`featuredImage` field is required for blog hero to render correctly** — the Friday pipeline auto-populates it. Manually-added posts need it too, or the `app/blog/[slug]/page.tsx` hero falls back to text-only.
