# Gadget Construction — Project Guide

## What This Is

Website for **Gadget Construction Inc.**, a Class B general contractor serving 31 cities across 6 Bay Area counties (CSLB #1132983). Built with Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript. Deployed via Netlify from GitHub (`raul-esquair/gadgetconstruction`).

## Business Context

- **Owner:** Osmin Bernal
- **Founded:** 2014 (12+ years)
- **Projects:** 500+ completed
- **Phone:** (628) 233-3589
- **License:** CA #1132983
- **Warranty:** 5-year workmanship
- **Service area:** 31 cities across Marin, Contra Costa, Alameda, San Francisco, San Mateo, and Santa Clara counties
- **Services:** Concrete Foundations, Structural Repairs, Retaining Walls, Complete Remodels, Composite Decks, Exterior Repairs
- **Site URL:** https://gadgetconstructionsf.com
- **Tagline:** "Built Right. On Time. Guaranteed."

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build — must pass with 0 errors before committing
npm run lint     # ESLint check
npm run blur:gen # Regenerate lib/blur-map.json after adding/changing images
npm run check:schedule  # 72 assertions on review-request cadence, templates, settings validation (no DB needed)
npm run db:generate     # New drizzle/*.sql migration from lib/db/schema.ts (no DB needed)
npm run db:migrate      # Apply migrations — reads .env (DIRECT_URL, else DATABASE_URL)
```

`prebuild` runs `blur:gen` automatically, so `npm run build` always has a current blur map.

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
- **Supabase Postgres + Drizzle ORM** (`postgres` driver) — only the review-request system touches it; see "Review Request System"
- **class-variance-authority + @radix-ui/react-slot** (shadcn button dependency, installed but only used by `components/ui/shadcn-button.tsx` if present)

### File Structure

```
app/                              # Pages (App Router)
  layout.tsx                      # Root layout — fonts, header, footer, EstimateModalProvider, skip-to-content
  page.tsx                        # Homepage (with HowTo schema, context-aware urgency badge)
  globals.css                     # Design tokens, keyframes, base styles, btn-concrete, overflow-x:clip
  opengraph-image.tsx             # Dynamic OG image (1200x630, logo + CTA + credentials)
  sitemap.ts                      # Auto-generated sitemap for all 57 routes with priority tiers
  robots.ts                       # Robots.txt (allows all, blocks /api/, points to sitemap)
  about/page.tsx
  contact/page.tsx
  gallery/page.tsx                # Filterable project portfolio
  blog/page.tsx
  blog/[slug]/page.tsx
  services/page.tsx               # Services hub
  services/*/page.tsx             # 6 individual service pages (roofing retired 2026-09-09; ADU → structural-repairs 2026-09-11)
  service-areas/page.tsx          # Service areas hub (31 cities grouped by county)
  service-areas/[city]/page.tsx   # 31 individual city SEO pages (with FAQ schema)
  api/contact/route.ts            # Form submission endpoint
  api/review-requests/dispatch/   # Bearer-protected cron endpoint — sends due review emails
  api/review-requests/health/     # Bearer-protected health check (counts only) — polled daily by GitHub Actions
  (bare)/                         # Route group: pages with no site chrome (layout cancels main's header padding)
    feedback/                     # Reputation page: 4 faces → Google review or private form (+ its own OG card)
    unsubscribe/                  # Review-email opt-out (POST-only confirm button)
    dashboard/                    # Password-gated review-request manager; login/ + (app)/ (gated layout) + (app)/settings/ (Osmin's settings pane)

netlify/functions/
  review-dispatch.mts             # Scheduled 17:00 UTC → POSTs /api/review-requests/dispatch

drizzle/                          # Committed SQL migrations + drizzle-kit snapshots

components/
  ui/                             # Primitives
    Button.tsx                    # Polymorphic (button/link/a), 4 variants, btn-concrete
    Container.tsx                 # Max-width wrapper (default 7xl, narrow 4xl)
    SectionWrapper.tsx            # Section with bg variants (white/light/dark/gradient)
    Card.tsx, Badge.tsx           # Basic UI elements
    FormField.tsx                 # Input/textarea/select with validation
    BareLogo.tsx                  # Centred dark logo for bare routes (no site header)
    MultiStepForm.tsx             # 3-step progressive form with directional transitions (6 service options)
    BBBBadge.tsx                  # Static BBB "Accredited Business" mark → BBB profile (TrustBar, Footer, About). BBBSeal.tsx is the live grade seal, now /lp/* only
    EstimateModal.tsx             # Context provider + spring-driven sheet (drag-to-dismiss) + EstimateButton
    AnimateOnScroll.tsx           # Binary scroll-trigger wrapper (uses useInView)
    RevealOnScroll.tsx            # Scroll-POSITION-linked animation (subscribes to lib/scroll-driver)
    StatsCounter.tsx              # Animated count-up on scroll
    BeforeAfter.tsx               # Draggable image comparison slider (pointer capture + momentum)
  sections/                       # Full-width page sections
    Hero.tsx                      # Hero with bg image, Ken Burns, stagger, parallax (desktop only), imageAlt prop for SEO
    HeroCTA.tsx                   # Client wrapper for modal trigger in server Hero
    HeroEstimateForm.tsx          # Homepage hero's desktop CTA: inline two-step form card (SSR'd, no modal)
    SectionCTA.tsx                # Client wrapper for modal trigger in server sections
    PageHeader.tsx                # Reusable dark page header for non-hero pages (extends behind transparent header)
    TrustBar.tsx                  # Marquee conveyor belt: 5 animated stats + BBB Accredited badge (slides up from bottom)
    ServicesGrid.tsx              # Bento grid desktop + stacking cards mobile
    WhyChooseUs.tsx               # 6 differentiator cards with bg image
    DifferentiationSection.tsx    # Problem vs. Solution comparison rows (bubble animation)
    ProcessSteps.tsx              # 5-step timeline (horizontal desktop, vertical mobile); optional backgroundImage → dark variant with desktop parallax (homepage only)
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
    ServiceGuides.tsx             # Curated blog guides module on each service page
  layout/
    Header.tsx                    # Transparent→white header, dark mobile menu, estimate button pop-in
    Footer.tsx                    # 4-column footer with white logo + license bar
    MobileBottomBar.tsx           # Scroll-aware sticky CTA (appears when hero CTAs leave viewport)
  seo/
    JsonLd.tsx                    # Structured data (LocalBusiness, Service, FAQ, Article, Breadcrumb, HowTo)
    Breadcrumbs.tsx               # Visual breadcrumbs + BreadcrumbList schema
  analytics/
    PhoneClickTracker.tsx         # One delegated listener → phone_click for every tel: link

lib/                              # Data & utilities
  constants.ts                    # COMPANY, SERVICES, NAV_LINKS, TESTIMONIALS, DIFFERENTIATORS, PROCESS_STEPS, STATS, TRUST_BAR_ITEMS
  types.ts                        # TypeScript interfaces (Service, Testimonial, BlogPost, CityData, etc.)
  services-data.ts                # SERVICE_PAGES — full copy for each service page
  service-areas-data.ts           # SERVICE_AREAS — 31 cities with tier, county, FAQs, content
  blog-data.ts                    # BLOG_POSTS array (3 seed posts)
  gallery-data.ts                 # GALLERY_PROJECTS + PROJECT_CATEGORIES (14 projects, all real images)
  about-data.ts                   # FOUNDER_STORY, VALUES, CREDENTIALS
  contact-data.ts                 # CONTACT_COPY
  pricing-data.ts                 # SERVICE_PRICING by service slug
  metadata.ts                     # generatePageMetadata() helper (supports ogType, publishedTime)
  seo/entities.ts                 # Canonical schema.org entity IDs + the owner Person object
  service-guides.ts               # Curated service slug → blog post slugs (internal linking)
  spring.ts                       # Apple-style springs (damping/response), project(), rubberband(), VelocityTracker
  scroll-driver.ts                # ONE shared scroll listener + rAF for the page, read/write batched
  button-styles.ts                # Shared button base/variant/size classes (Button + EstimateButton)
  blur.ts                         # blurProps() helper for next/image placeholders
  blur-map.json                   # Auto-generated path → base64 blur lookup (npm run blur:gen)
  utils.ts                        # cn() helper + getBookingUrgency() + prefersReducedTransparency()
  track.ts                        # track() → GA4 funnel events; no-op until NEXT_PUBLIC_GA_MEASUREMENT_ID is set
  logo-base64.ts                  # White logo as base64 constant (used by OG image)
  bare-routes.ts                  # isBareRoute() — which paths hide Header/Footer/MobileBottomBar
  db/                             # getDb() (lazy) + schema.ts (3 review tables + review_settings, RLS on)
  reviews/                        # schedule.ts + dates.ts + settings.ts + emails.ts (pure), queries.ts, dispatch.ts
  auth/                           # Dashboard session: HMAC-signed cookie, single shared password
  actions/                        # Server Actions: dashboard auth, review requests, feedback, unsubscribe

hooks/
  useInView.ts                    # IntersectionObserver hook (binary trigger, fires once)
  useReducedMotion.ts             # prefers-reduced-motion via useSyncExternalStore (tracks live changes)

content/                          # Editorial pipeline data (not shipped to production)
  post-queue.json                 # 10 briefs (status: queued → drafted → published)
  proposed-briefs.json            # Staging from /next-content-batch (normally [])
  refresh-briefs.json             # Refresh briefs parked for manual handling (drafter can't do in-place refreshes)
  proposed-briefs-summary.md      # Human-readable proposal summary
  site-inventory.json             # Auto-generated, 48 URLs for internal linking
  style-reference.md              # Voice guide for AI drafting passes

scripts/                          # CLI tools (Node + Python)
  generate-post.ts                # Friday draft pipeline (Claude + OpenAI + Resend + gh)
  build-site-inventory.ts         # Rebuilds site-inventory.json
  fetch-gsc-data.ts               # Google Search Console search performance client
  gsc-index-coverage.ts           # Sitemap stats + per-URL inspection (PASS/NEUTRAL + reason)
  propose-next-batch.ts           # /next-content-batch implementation
  migrate-proposed-briefs.mjs     # proposed-briefs.json → post-queue.json (both merge paths)
  resubmit-sitemap.ts             # Re-queue the sitemap in GSC after each publish
  submit-indexnow.ts              # Push new URLs to IndexNow (Bing/Yandex)
  generate-blur-map.mjs           # Builds lib/blur-map.json from public/images
  generate-month1-doc.py          # Reference impl for month-1 client doc

.claude/skills/                   # Claude Code slash-command skills
  monthly-seo-doc/                # /monthly-seo-doc → client .docx
  next-content-batch/             # /next-content-batch → propose 4 new briefs
  google-ads/                     # /google-ads → load status doc + iterate on campaigns
  ads-recap-pdf/                  # /ads-recap-pdf → client-facing PDF recap of the ads session (keeps reports/ history)

.github/workflows/                # Automation
  auto-propose-batch.yml          # Tue 16:00 UTC — propose next batch if queue is low
  auto-merge-proposals.yml        # Fri 07:00 UTC — auto-merge pending proposal PRs
  merge-proposed-briefs.yml       # On proposed-briefs.json change — migrate to queue (human merges only)
  weekly-draft.yml                # Fri 16:00 UTC — AI draft + PR + email
  auto-merge-drafts.yml           # Sun 23:00 PT — auto-merge pending drafts
  weekly-publish.yml              # Mon 14:00 UTC — Netlify rebuild + sitemap resubmit + IndexNow
  gsc-report.yml                  # Manual — 90-day search performance report
  gsc-index-coverage.yml          # Manual — sitemap stats + per-URL index inspection
  review-system-health.yml        # Daily 18:00 UTC — review-system health check, emails raul@esquair.com on failure

public/images/
  logo.png                        # Company logo — dark version (for white backgrounds)
  logo-white.png                  # Company logo — white version (for dark backgrounds, footer, OG image)
  hero-foundation-crew.jpg        # Homepage hero (Gadget crew tying rebar in a foundation trench; lightly AI-enhanced)
  structural-repairs.jpg          # Structural repairs bento card (rebar set under an existing footing, 1672×941)
  complete-remodel.jpg            # Remodel service card image (bento grid)
  composite-decks.jpg             # Deck service card image (bento grid)
  concrete-foundations.jpg        # Foundation service card image (bento grid)
  retaining-walls.jpg             # Retaining wall service card image (bento grid)
  composite-decks-hero.jpg        # Composite decks service page hero
  structural-repairs-hero.jpg     # Structural repairs hero POSTER — first frame of the hero video (sheathing tear-off)
  retaining-walls-hero.jpg        # Retaining walls service page hero
  concrete-foundations-hero.jpg   # Concrete foundations service page hero (renamed from concrete-foundations.jpg)
  complete-remodel-hero.jpg       # Complete remodel service page hero
  structural-header-before.jpg    # Homepage + structural-repairs slider: rotted door header (warped onto the after's frame)
  structural-header-after.jpg     # Same opening with a new engineered header (1410×1057, 4:3)
  deck-stairs-before.jpg          # Homepage + composite-decks slider: bare stucco wall over a raised patio (1086×1448, 3:4)
  deck-stairs-after.jpg           # Same wall with a second-story composite deck + stairs (also a deck gallery project)
  process-rebar-bg.jpg            # Homepage "How It Works" background (rebar cage in a wall form, under an 85% scrim)
  stucco-wide-before.jpg          # Re-stucco before: wire lath & building paper (/lp/stucco-repair slider)
  stucco-wide-after.jpg           # Re-stucco after: finished stucco wall (also exterior-repairs hero)
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

public/videos/
  structural-repairs-hero-{1920,1280}.{webm,mp4}  # Structural repairs hero loop (AV1 + H.264, 4.3s, muted, ~0.6–2.3MB)
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

**To add a new service:** Add to `SERVICES` in constants.ts, add entry to `SERVICE_PAGES` in services-data.ts, add pricing to `SERVICE_PRICING`, create `app/services/[slug]/page.tsx`, and add its review-email phrase to `PROJECT_PHRASES` in `lib/reviews/emails.ts`.

**To add a new blog post:** Two paths —
  1. **Automated (preferred):** The Friday `weekly-draft.yml` workflow picks up the next `status: "queued"` brief from `content/post-queue.json`, generates the full post with featured image, opens a PR. To add a new topic, invoke `/next-content-batch` (proposes 4 new briefs) or edit `post-queue.json` directly with a manually-written brief.
  2. **Manual:** Append to `BLOG_POSTS` in `lib/blog-data.ts`. Set `date` to a past date to publish immediately, or a future Monday to schedule. Must include `faqs` field if you want FAQPage schema. **Must include `metaTitle` (<=60 chars)** — see the SERP-title gotcha below. Static params auto-generate the route.

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

The modal triggers from: header CTA button, mobile bottom bar, hero CTA, and all section CTAs. On the homepage, desktop never gets the modal from the hero — the hero *is* the form; the header button only pops in once that form has scrolled away.

**Attribution:** `open(trigger, { source })`. `source` is a label like `"Header button"`; the form posts it with `page` and the lead email shows it as a **Source** row. Give every new trigger a `source` (`EstimateButton` takes it as a prop; inline `MultiStepForm`s take it directly), or its leads arrive as a generic "Estimate button".

**Two-step form (homepage only):** `MultiStepForm twoStep` runs service → contact, skipping timeline/budget. Tapping a service advances by itself (Continue only reappears after Back). Height is trimmed for the hero: no "Step N of 2" line (the progress bar says it; an `sr-only` live region reads it to screen readers), and name + phone share a row. Its progress bar is compact and centred, with a forward nudge on step 1: a red glint runs along the connector (`step-glint`) and the "2" pings as it lands (`step-ping`). Both are keyframes in globals.css sharing one 3.2s cycle so the ping always meets the glint, with a rest at the end so it reads as a gesture. They unmount on step 2, where the connector fills via `scale-x` instead. As `animate-[…]` utilities they fall under the global reduced-motion kill switch, and their resting state is `opacity-0`, so reduced motion shows a plain static bar. The optional message box stays — the owner wanted the extra detail. In the hero card, step 1 is ~370px and step 2 ~475px; the card grows evenly about its centre and the headline doesn't move. Everything on `/` uses it — hero card, `CTABlock twoStep`, and the modal (`EstimateModalProvider` sets it from `pathname === "/"` and keys the form on it, since step N means a different step in each mode). Every other page keeps the 3-step form.

### Animation System (Four Layers)

**Layer 1: Hero Stagger + Parallax (`Hero.tsx`)**
- Hero is a client component with `useState` for load trigger
- Entrance arms on a **double `requestAnimationFrame`, never a timer**. The `<h1>` is the LCP element and Chrome does not count an `opacity: 0` element as painted, so every ms of arming delay is a ms of LCP. A `setTimeout(100)` here previously cost ~100ms for nothing.
- Elements stagger in on page load: urgency badge (0ms) → headline (60ms) → subheadline/highlights (160ms) → aside (200ms) → CTA (260ms), each 700ms. Keep the cascade short for the same LCP reason.
- Homepage-only props (all opt-in, other heroes are untouched): `headlineClassName` (merged over the size scale via `cn`), `highlights` (checkmark list in place of the subheadline), `aside` (right-hand column at `lg+`; the CTA button then renders below `lg` only).
- **With an `aside`, `data-hero-cta` moves to the whole grid.** The header pop-in and `MobileBottomBar` watch the first `[data-hero-cta]` and test `bottom < 0`. Put it on an element that is `display:none` at some breakpoint and it reports `bottom: 0` forever, so they never appear.
- Uses blur-to-sharp transition (`blur-[2px]` → `blur-0`) for cinematic feel
- Hero background image has Ken Burns effect (`@keyframes ken-burns`, 20s cycle)
- **Parallax** (desktop only, `md:` and up): background moves at 0.3x scroll speed via `requestAnimationFrame`. `scale(1.1)` buffer prevents edge reveal. Disabled on mobile to avoid image cutoff.
- **Mid-page parallax** (`ParallaxBackground` in `ProcessSteps.tsx`, the homepage "How It Works" photo): a section below the fold can't key off `scrollY`, so it shifts by 0.25× the distance from the section's centre to the viewport's centre. It runs on `lib/scroll-driver.ts`, gated by an IntersectionObserver, and sizes its own bleed (`top`/`bottom` = −0.25 × (viewport + section height) / 2) so no edge ever shows, instead of a fixed `scale`. Desktop only and off under reduced motion, like the Hero — main-thread parallax judders against iOS momentum scrolling.
- Hero pulls up behind transparent header with `-mt-20 md:-mt-24` + extra top padding (`pt-28 md:pt-36`)
- Mobile hero height: `min-h-[85vh]`, desktop: `min-h-[80vh]`
- **`backgroundVideo`** (optional, `HeroVideoSource[]`) layers a muted looping `<video>` over `backgroundImage`, which stays the first paint and the fallback. The video is **client-only** (`useSyncExternalStore` with a `false` server snapshot), so it's absent from the SSR HTML and can't compete with the `<h1>` for LCP. It isn't mounted at all under `prefers-reduced-motion` or Save-Data; it fades in on `playing`, so a refused autoplay (iOS Low Power Mode) leaves the still showing; and an IntersectionObserver pauses it off-screen. Ken Burns is dropped from the still when a video is set. Use the video's first frame as `backgroundImage` so the fade-in doesn't jump. Order `<source>`s with `media` first, AV1 WebM before H.264 MP4 at each size (Safari without AV1 hardware falls through to the MP4).
- **Encoding a hero loop** (only `/services/structural-repairs` has one): never ship camera/AI-tool output directly — the source was 17 MB 10-bit HEVC, which Chrome and Firefox mostly can't play. Crossfade the last 0.75s into the first 0.75s so the loop has no seam, drop audio, and encode both codecs at 1920 and 1280: `ffmpeg -i in.mp4 -filter_complex "[0:v]trim=0.75:END,setpts=PTS-STARTPTS[m];[0:v]trim=0:0.75,setpts=PTS-STARTPTS[h];[m][h]xfade=transition=fade:duration=0.75:offset=END-1.5,scale=W:-2:flags=lanczos,format=yuv420p[v]" -map "[v]" -an` then `-c:v libsvtav1 -crf 38 -preset 6` for `.webm`, and `-c:v libx264 -preset slow -crf 25 -profile:v high -level:v 4.0 -movflags +faststart` for `.mp4` (level 3.1 at 1280). The poster is the source frame at 0.75s through sharp mozjpeg q78.

**Layer 2: Scroll-Position-Linked (`RevealOnScroll.tsx`) — PRIMARY SYSTEM**
- Animation progress is **proportional to scroll position**, not binary on/off
- Subscribes to **`lib/scroll-driver.ts`** — one scroll listener and one rAF for the entire page. Each subscriber supplies a `measure()` (layout reads only) and an `apply()` (style writes only); the driver runs *every* subscriber's reads before *any* writes. Do not add a per-component `window.addEventListener("scroll", ...)`; 20 reveals each interleaving `getBoundingClientRect()` with a style write forced 20 layout recalcs per frame.
- `measure()` returning `null` means "no write needed this frame" — it does NOT unsubscribe. Ending a subscription is always explicit.
- Travel zone = **65% of viewport height** — element animates from bottom edge to just above center
- Progress mapped through `easeOutExpo` curve for natural deceleration
- **One-way only** — once progress hits 100%, element locks via `locked.current = true` and scroll listener disconnects. Scrolling back up does NOT reverse the animation.
- IntersectionObserver gates the scroll listener — only elements currently in viewport cost CPU per frame
- Animation types: `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-up`, `scale-rotate`, `bubble` (elastic overshoot — easeOutBack with subtle single-bounce settle)

**Layer 3: Binary Trigger (`AnimateOnScroll.tsx` + `useInView.ts`)**
- Simpler system for section headings and non-grid content
- IntersectionObserver fires once → CSS transition plays
- Used for: section headings, service area section, founder story

**Layer 4: Springs (`lib/spring.ts`) — anything the user can touch**
- CSS transitions and `@keyframes` cannot be grabbed and reversed mid-flight: they animate on a fixed schedule from a fixed start. Springs animate from the *current* value and carry velocity, which is what makes an animation interruptible.
- Two parameters, per Apple: **damping** (1.0 = critically damped, no overshoot) and **response** (roughly seconds to target — NOT a duration; a spring has none). Presets: `SPRING_MOVE` (1.0/0.4), `SPRING_SHEET` (0.8/0.3), `SPRING_FLICK` (0.85/0.35).
- **Bounce only when the gesture carried momentum.** Overshoot on a flicked card feels right; overshoot on a menu that just faded in looks cheap.
- `springTo()` returns a handle whose `stop()` reports live **value and velocity** — re-target by starting a new spring from both, never from the logical target, or you get a visible jump and a velocity "brick wall".
- `project(velocity)` gives the resting point of a flick (iOS deceleration, exponential-decay form — *not* the textbook `v²/2a`). Pick the snap target from the projection, then hand the release velocity to the spring, so there is no seam between dragging and animating.
- `VelocityTracker` keeps a ~100ms position history; older samples make a flick read as a slow drag.
- Used by: `BeforeAfter` (drag + momentum), `EstimateModal` (open/close + drag-to-dismiss).

**Performance rules:**
- Only animate `transform` and `opacity` (GPU-composited)
- `will-change-[opacity,transform]` on all animated elements
- `{ passive: true }` on all scroll listeners
- `requestAnimationFrame` for scroll-linked updates
- **Never read layout in the same loop that writes styles.** Read all, then write all (see `lib/scroll-driver.ts`).
- `prefers-reduced-motion` respected in all animation hooks, and via a global `[class*="animate-"] { animation: none }` rule in globals.css that catches every Tailwind `animate-*` utility including arbitrary ones
- Use `transition-[opacity,transform]`, never `transition-all` — the latter animates layout properties too

**Key learnings:**
- `intersectionRatio` doesn't work for position-linked animations on small elements (ratio jumps 0→1 instantly). Use `getBoundingClientRect()` instead.
- When rendering both desktop and mobile versions of a component (e.g., ProcessSteps), put the `ref` on an always-visible wrapper div, not on a `hidden md:block` div — hidden elements don't trigger IntersectionObserver.
- 65% viewport travel zone is the professional standard. 40% feels rushed.
- **`prefers-reduced-motion` must never disable direct manipulation.** It means the interface does not move of its own accord — it does not mean the user cannot move things. Suppress entrance/exit transforms and ambient loops; always keep 1:1 drag tracking. Getting this wrong made the modal's drag-to-dismiss silently dead for anyone with the setting on.
- **A pointer-capture drag surface must not contain a clickable control.** `setPointerCapture` retargets `pointerup` to the capturing element, so the browser fires the `click` there and a button *inside* it can never activate. Make the button a sibling. This is what broke the modal's X.
- **Lazy-mounted content inside an animating container resizes it mid-animation.** `EstimateModal` mounts its form on `requestIdleCallback` rather than on first open, because a `440px` placeholder swapping for the real form during the open spring produced a visible judder on the first open only.

### TrustBar — Marquee Conveyor Belt

5 animated stats and the BBB badge in a continuous horizontal scroll:
- **12+ Years** · **500+ Projects** · **5.0★ Star Rated** · **BBB Accredited Business** · **0 Surprise Bills** · **100% Client Satisfaction**
- Array doubled (`[...ITEMS, ...ITEMS]`) for seamless loop
- CSS `@keyframes marquee` translates -50% over time
- Speed: 10s on mobile, 18s on desktop (raised from 8s/15s when the badge widened the belt, to keep roughly the same pixel speed)
- **BBB badge** (2026-09-11) is the static "Accredited Business" mark (`components/ui/BBBBadge.tsx`, `/images/bbb-accredited.webp`, shared with the Footer and About page) linking to the BBB profile — deliberately *not* BBB's live seal image, which renders the current letter grade (A-). The loop's second copy is `aria-hidden` and `tabIndex={-1}` so the link exists once for keyboard and screen-reader users. The image needs `max-w-none`: preflight's `img { max-width: 100% }` lets the flex belt shrink its slot to the padding and the badge overlaps the next stat. It replaced the separate BBB strip that sat between the hero and the TrustBar on the homepage.
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
- **6 service options** in 2-column grid: Exterior Repairs, Retaining Walls, Complete Remodel, Composite Decks, Structural Repairs, Concrete Foundations & Slabs
- Step transitions animate with directional slide (forward = slide right, back = slide left)
- 150ms fade-out, content swaps, fades in from opposite direction
- Progress bar with numbered circles
- Used in both `CTABlock` (inline) and `EstimateModal` (popup)
- Collects: service, timeline, scope, name, phone, email, message

### Services Bento Grid (Desktop) + Stacking Cards (Mobile)

**Desktop (`sm:` and up):** Asymmetric bento layout:
- 2 large "Featured Service" cards (Complete Remodel + Structural Repairs) spanning 2 columns
- 4 compact cards (Foundations, Retaining Walls, Decks, Exterior Repairs) in a row
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

## Review Request System

Automated post-job review requests, ported 2026-09-12 from the Lamorinda Pavers site (`~/Desktop/lamorindapaving`, repo `raul-esquair/lamorindapavers`), where it has run in production since 2026-08-23. Gadget has **3 Google reviews against 500+ projects** — this is the review drive the hero's social proof is waiting on.

### Flow
1. After a job wraps, a customer is added at `/dashboard`.
2. A daily cron sends up to 3 emails from Osmin — by default touches at `startAt` + **0 / 5 / 14** days. Osmin can change the count, the gaps and the wording at `/dashboard/settings` (see "Settings pane").
3. The customer clicks a face on `/feedback?t=<token>` → **kill switch** (`markResponded`) stops the rest. It fires on the face *click*, not a form submit — most happy customers go straight to Google and never come back.
4. 3–4 faces → Google review CTA. 1–2 faces → a private form that emails the alert addresses from settings (else `CONTACT_EMAIL`) and pushes ntfy at priority 5.

### ⚑ Decisions already made — do NOT re-open without asking
1. **Review gating is intentional.** 1–2 faces never see the Google link. This breaks Google's review policy and is covered by the FTC consumer-reviews rule (16 CFR 465); enforcement would land on the Google Business Profile. Raul chose it on 2026-09-12 after the risk was laid out, matching Lamorinda. Reverting is one line in `app/(bare)/feedback/FeedbackPageContent.tsx`: `value >= 3 ? "review" : "form"` → `"review"` (the review screen already offers the private channel). A business decision, not a bug — don't change it silently in either direction.
2. **Supabase, not Neon** (Lamorinda uses Neon). Same Drizzle schema; the driver is `postgres` (postgres-js) over Supabase's **transaction pooler**. `prepare: false` is mandatory there, `max: 1` per function instance.
3. **Emails are from Osmin in the first person** (`Osmin Bernal <osmin@gadgetconstructionsf.com>`), deliberately plain — no logo banner, no buttons. They read as one person writing to another, which converts better and filters less. Replies go to the reply-to address set in settings, else `REVIEW_REPLY_TO`, else `CONTACT_EMAIL`.
4. **Email only.** Lamorinda's research: SMS as touch 1 converts ~3–5× better, but needs Twilio + A2P 10DLC registration + TCPA consent. Deferred.
5. **No login rate limiting.** Serverless instances don't share memory, so a counter is bypassed by parallel requests. A fixed 600ms per attempt plus a long random password is the mitigation. Don't make the password memorable.
6. **Leads persistence and Lamorinda's SMS/appointment tables were left behind.** Only the three review tables exist (plus `review_settings`, added 2026-09-13).

### Cadence (`lib/reviews/schedule.ts`)
**Pure — no database imports** — so the rules deciding who gets emailed are testable in isolation (`npm run check:schedule`, 72 assertions). Keep it that way. The cadence is a `Cadence` parameter (`emailCount`, `gapDays`, `skipWeekends`), never a module constant, because it comes from the settings row.
- Finished **today** → `startAt` today (Osmin is marking it complete at the walkthrough, peak satisfaction). The daily cron caps how literal that is: a job added after the 10am run goes out the next morning.
- Finished any other recent day → `completedAt + 2`, clamped so nothing is scheduled into the past.
- Older than 14 days (`BACKFILL_THRESHOLD_DAYS`) or no date → tomorrow, so importing past customers doesn't fire every touch at once.
- All dates are `YYYY-MM-DD` strings in `America/Los_Angeles` (`lib/reviews/dates.ts`), never `Date` objects — the cron runs on UTC.
- **Each gap counts from the day the previous email actually went out** (`nextTouch()`), not from `startAt` (changed 2026-09-13). With offsets from `startAt`, anything that delayed an email — a pause, the batch cap, a skipped weekend — made the next one due immediately, so two emails landed a day apart. Now a delay can push the whole sequence later but never squeeze it. For on-time sends the dates are identical to the old 0 / 5 / 14.
- **Skip weekends:** `isSendDay()` blocks Saturday and Sunday entirely (an overdue Thursday email still waits for Monday), and `nextSendDay()` shifts due dates for display.

### Idempotency (do not weaken)
- `review_touches` has a **unique index on `(request_id, n)`** — a duplicate send is impossible at the database level.
- `dispatch.ts` **claims the touch before sending.** A crash mid-run costs one missed email (invisible, recoverable); recording after the send would risk a double send. Don't "fix" the order.
- `findDueRequests` returns **at most one touch per request per run**, and each gap counts from the real previous send, so an overdue sequence catches up with its full spacing.
- **Batch cap** `REVIEW_BATCH_LIMIT` (default 8/run) — a domain that normally sends a handful of emails suddenly sending 40 looks compromised. Also keeps the run inside Netlify's 30s scheduled-function limit. With 500+ past customers, a backfill drains at 8/day by design. Review *recency* matters for local ranking, so a steady trickle beats a burst followed by silence.
- `email_suppressions` is keyed by **email, not request** — an unsubscribe outlives the request it came from.
- Missing `RESEND_API_KEY` returns **before** any touch is claimed.
- `dryRun` is a true no-op: it neither claims touches nor closes completed sequences. Lamorinda's `dispatch.ts` still closes sequences on a dry run; port the fix back on the next sync.

### Cron
`netlify/functions/review-dispatch.mts`, daily **17:00 UTC** (10am PDT / 9am PST). Scheduled functions can't be invoked by URL and time out at 30s, so it's a thin trigger that POSTs to `/api/review-requests/dispatch`, where the logic lives and which *can* be run by hand. Scheduled functions only run on the published deploy, never previews.
```bash
curl -H "Authorization: Bearer $CRON_SECRET" "https://gadgetconstructionsf.com/api/review-requests/dispatch?dryRun=1"
```

### Health check + alerts (`.github/workflows/review-system-health.yml`)
Daily at **18:00 UTC**, an hour after the send, GitHub Actions calls `/api/review-requests/health` (same `CRON_SECRET` bearer). If the check fails, it **emails raul@esquair.com** through Resend: GitHub's own failure emails only reach the workflow owner's account. If the alert step itself fails, that GitHub email is the fallback. The health endpoint flags the failures that are otherwise silent, where the site looks fine while customers stop getting emails:
- **Database unreachable** (503) — usually a paused Supabase project (restorable from the dashboard for a year) or a stale `DATABASE_URL`.
- **`RESEND_API_KEY` or `CONTACT_EMAIL` missing on Netlify.**
- **The send isn't running** — touches overdue *and* nothing sent in 26h. Overdue alone is normal mid-backfill (the batch cap drains it), so both conditions are required.
- **Resend rejecting sends** — touches claimed in the last 26h with no Resend id. The claim-before-send order means those customers skip that email for good.

The "send isn't running" detector stays quiet when silence is expected: sending paused from the dashboard, today a skipped weekend day, or sending resumed inside the 26h window. A pause is reported as `checks.paused` but never alerts — it's Osmin's call. (Nothing flags a pause left on for weeks; the dashboard's amber banner is the only reminder.)

It also keeps Supabase awake with real queries every day, which is why a separate keep-alive ping was rejected: a REST-root ping may not even count as database activity. Three tries, 20s apart, before alerting, so a cold start doesn't send a false alarm. Test delivery with **Actions → Review system health check → Run workflow → "Send the alert email even if the check passes"**. All four detectors were verified against the real database with seeded data on 2026-09-12.
- ⚠️ **Public repo, public logs.** The endpoint returns counts and generic messages only; raw DB errors go to the Netlify function log. Never add customer data to it.
- ⚠️ **GitHub disables scheduled workflows in a public repo after 60 days with no commits.** The weekly blog pipeline keeps the repo active today. If that ever stops, re-enable the workflow from the Actions tab.
- Needs the **`CRON_SECRET` GitHub Actions secret** (same value as Netlify's); `RESEND_API_KEY` was already there. A missing secret fails the check and triggers an alert saying so.

### `/feedback` page
- **Statically generated** (build shows ○). The `?t=` token is read client-side via `useSearchParams` so the page stays on the CDN — no database round trip before first paint on a phone. Keep it ○.
- `noindex, nofollow` and absent from `app/sitemap.ts`. Deliberately **not** in `robots.ts` disallow — a blocked URL can't be crawled, so Google would never see the noindex.
- Faces are hand-drawn SVG (emoji differ per device): flat filled circles — red / yellow / light green / dark green — with dark `#1F2937` features, so they read on white and on the dark OG card alike. Always in color, not grey-until-hover (hover is dead on touch). The colors, `FEATURES` and `MOUTHS` are **duplicated** in `opengraph-image.tsx` as data URIs — change one, change both.
- The OG card matters: the link gets texted, so the iMessage/WhatsApp preview is the first thing a customer sees. It uses `LOGO_WHITE_BASE64` (not a disk read — see the Netlify OG gotcha). Messaging apps cache previews hard; append `?v=N` to force a fresh one.
- No framer-motion (zero-animation-libraries rule): each screen enters with the existing `fade-in-up` keyframe via `animate-[…]`, so the global reduced-motion rule removes it. Focus moves to each new screen's `<h1>`.

### Bare routes (`lib/bare-routes.ts`)
`isBareRoute()` is the single list of paths that hide Header, Footer and MobileBottomBar: `/lp/*`, `/feedback`, `/unsubscribe`, `/dashboard/*`. It replaced three separate `/lp/` checks. The `(bare)` route group's layout applies `-mt-20 md:-mt-24` to cancel `<main>`'s header padding (`app/lp/layout.tsx` does the same). A bare page must render its own logo (`BareLogo`), or it reads as a phishing form.

### Settings pane (`/dashboard/settings`, added 2026-09-13)
Built after competitor research across NiceJob, Jobber, Housecall Pro, ServiceTitan, Birdeye, GatherUp, Grade.us, BrightLocal and others. What Osmin controls:
- **Pause all sending** — one switch, saves instantly (separate from the form so it can't wait on Save or be discarded with other edits). Due emails are held, never skipped. `dispatch.ts` reads settings first on every run and **throws rather than guessing** if it can't, because guessing "not paused" would send what he paused.
- **Emails per customer** (1–3) and **days between them** (2–30 each; the floor is NiceJob's minimum spacing).
- **Skip weekends.**
- **Email wording** — subject + body per email, with `{first_name}`, `{project}`, `{when_finished}` fields, live preview, "Send test" (sends the *unsaved* text, `[Test]` subject, empty token so links go to the bare `/feedback` and `/unsubscribe`) and "Reset to the original wording". The feedback link, signature, license line and unsubscribe footer are added by `renderReviewEmail()` and are not editable. Unknown `{fields}` are rejected on save.
- **Repeat customers** — "don't ask again within" off / 3 / 6 (default) / 12 months. Checked when a customer is added (`addReviewRequest`); the form offers "Add anyway". An address that already has an active sequence also warns. An unsubscribed address is refused outright.
- **Reply-to address** and **unhappy-customer alert addresses** (up to 3). Blank = the env defaults. `submitFeedback` falls back to `CONTACT_EMAIL` if the settings read fails — that alert must always go somewhere.

Deliberately **not** exposed: the 8/day batch cap (deliverability + the 30s function limit), send time of day (one daily cron), SMS, review-site rotation, A/B tests, and who sees the Google button (the gating decision above stays a code change).

Storage is one `review_settings` row (`id = 'default'`), RLS on. **Every column except `paused` is nullable and null means "the default in code"** (`DEFAULT_SETTINGS` in `lib/reviews/settings.ts`). Templates are stored only when they differ from `DEFAULT_TEMPLATES`, so improving the default copy in code still reaches any email he never edited. No row = launch behaviour. `lib/reviews/settings.ts` is pure and shared by the page (inline errors) and the Server Action (`lib/actions/review-settings.ts`), which re-validates. Changes apply from the next send, including customers already mid-sequence.

### Dashboard auth (`lib/auth/`)
One shared password → HMAC-signed, httpOnly cookie `gc_dashboard` (14 days). No user table. **Every Server Action re-checks the session itself** (`dashboardAuthError()` in `lib/auth/guard.ts` — kept out of the `"use server"` files, where every export becomes a callable endpoint) — the layout gate protects the page, but Server Actions are independently reachable endpoints.

### Database (Supabase)
- `lib/db/index.ts` → `getDb()`, **lazy on purpose**: `npm run build` succeeds with zero env vars (verified), because resolving the connection at import time would fail every static page's build.
- **Every table calls `.enableRLS()`.** Supabase exposes `public` through its Data API, and the anon key is public by design — a table without RLS is readable and writable by anyone. RLS on with no policies closes the Data API; the app connects as `postgres`, which owns the tables and bypasses RLS. **Any new table needs the same call.**
- Migrations are committed in `drizzle/`. `db:migrate` prefers `DIRECT_URL` (session pooler, port 5432) for DDL. `0001_review_settings` was applied to production on 2026-09-13, ahead of the code that reads it.
- ⚠️ **Never run two queries concurrently** (`Promise.all`). With `max: 1`, postgres-js pipelines them on the one connection, and Supavisor's transaction mode **hangs** on pipelined queries — the call never resolves and every later query on that instance queues behind it. Verified 2026-09-13: three parallel selects hung past 8s; the same three sequentially took ~40ms (a pool of 3 also worked). Production is safe with sequential code because a function instance serves one request at a time, but `next dev` serves concurrent requests from one process, so two tabs loading dashboard pages at once can wedge the dev server — restart it if dashboard pages hang.
- `.env` values must be **double-quoted** — connection strings can contain `&`, which breaks `source .env` in zsh.
- ⚠️ **Free-tier Supabase projects pause after ~7 days without database activity.** The daily send and the daily health check both run real queries; if it pauses anyway, the health check alerts. Supabase Pro (~$25/mo) never pauses.
- ⚠️ **Deploy previews share the production database** (one `DATABASE_URL`). Previews can't fire the cron and the dashboard is password-gated, but a preview can read and write real customer data.

### Environment variables (Netlify — mark secret, scope to Functions)
`DATABASE_URL` (Supabase transaction pooler, port 6543), `DASHBOARD_PASSWORD` (24+ random chars — store it before marking secret, the flag is irreversible), `DASHBOARD_SESSION_SECRET` (`openssl rand -hex 32`), `CRON_SECRET`. Already set: `RESEND_API_KEY`, `CONTACT_EMAIL`, `NTFY_TOPIC`. Optional: `REVIEW_REPLY_TO`, `REVIEW_BATCH_LIMIT`. Local `.env` additionally wants `DIRECT_URL` for migrations.

### Owner guide (`Gadget-Construction-Review-System-Guide.pdf`)
A 7-page plain-language PDF for Osmin, made 2026-09-13: what the system does, what customers see (real screenshots), the unhappy path, how to add customers, then **three tick-box decisions on page 6** (who sees the Google button, whether the wording in his name is right, where replies go), and the emails word for word. It deliberately omits the dashboard password ("sent separately"). The PDF sits in the repo root untracked, like the other client PDFs. The source is in `scripts/review-guide/`, kept on purpose because Lamorinda's equivalent was lost with a session scratchpad:
```bash
node scripts/review-guide/shoot.mjs    # re-screenshot the live /feedback page
npx tsx scripts/review-guide/build.ts  # rebuild the PDF
```
- `build.ts` fills `guide.html` with the output of the real `renderReviewEmail()` using the **default** templates, so reword `DEFAULT_TEMPLATES` in `lib/reviews/emails.ts` and the guide follows on the next build. It does not read the database: once Osmin edits the wording in settings, the guide's "emails word for word" pages no longer match what goes out. Email 1's second line now reads "We finished {project} {when_finished}." (was "We wrapped up … today" / "… and I wanted to follow up"), so the current PDF is slightly out of date.
- `shoot.mjs` and `build.ts` drive headless Chrome through `cdp.mjs`, a ~60-line DevTools-protocol client on Node's built-in `WebSocket`, not Puppeteer. `shoot.mjs` loads `/feedback` **without** a `?t=` token, so clicking faces writes nothing to the database. Keep it that way.
- The Google policy quote on page 6 ("selectively solicit positive reviews from customers") was checked against the live policy page on 2026-09-13. Google dropped that line in 2022 and later restored it, so re-check before reusing it.

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
- `app/sitemap.ts` — auto-generated sitemap for all 57 routes, with priority tiers by page type and city tier
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
- **Homepage hero has ONE action** (2026-09-11). Desktop: the two-step form inline on the right, submitting in place — no modal. Mobile/tablet (below `lg`): a single full-width "Get Free Quote" button that opens the modal, because there's no room for the form. The modal is reserved for after the visitor scrolls out of the hero. The phone number was removed from the hero on purpose, to avoid decision fatigue — it stays in the header, the mobile bottom bar and the modal. The hero is deliberately sparse: badge, headline, three checkmarks, form. The license line and review line were tried and removed for focus. Do not add a second hero CTA or more hero copy back.
- **Hero headline names the work and the place** — "Bay Area Foundations, Remodels & Repairs — Without the Contractor Nightmares". The old pain-only headline never said what Gadget builds; a searcher could not tell above the fold.
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

- **Review request system — LIVE since 2026-09-13 (PR #33).** Supabase is migrated with RLS verified. The Netlify env vars and the `CRON_SECRET` GitHub secret are set, Netlify schedules `review-dispatch` at `0 17 * * *`, and the prod dry run and health check pass. The test-alert workflow run succeeded and Resend accepted the email to raul@esquair.com. **End-to-end test passed 2026-09-13:** Raul added himself at `/dashboard` → a manual real dispatch sent touch 1 (Resend-confirmed) → he clicked a face → the request went `stopped / responded` with nothing further due. It recorded rating 3 (Happy) although he meant Delighted: the two sit side by side on a phone and the first tap wins by design. A controlled click on Delighted on the live site recorded 4, so the mapping is correct. Still open:
  1. **Reply-to inbox.** Review-email replies go to `CONTACT_EMAIL` unless an address is set in `/dashboard/settings` (or `REVIEW_REPLY_TO`). Confirm that's somewhere Osmin actually reads — the unhappy-customer alert lands there too unless he sets alert addresses. Also confirm who is subscribed to `NTFY_TOPIC`.
  2. **Osmin sign-off**: on review gating (see decision 1 there — the risk lands on *his* Business Profile), on emails going out in his name and voice, and on the promises the pages make for him ("He'll get back to you himself").
  3. **Phone check of the texted link**: the `/feedback` OG preview in iMessage, and that the Google button opens the review composer for a signed-in user.
  4. **Onboarding Osmin**: dashboard URL + password (send the password separately; the guide omits it), who enters finished jobs, and whether to backfill past customers (drains at 8/day). The owner guide PDF is ready (see "Owner guide"). Walking him through its page 6 settles items 1 and 2 above.
  5. Raul's test row stays in `review_requests` (stopped, harmless). Delete it before quoting response-rate stats from the dashboard.
- **Structural Repairs follow-ups (from the ADU retirement, 2026-09-11):**
  - **Photos are done.** Bento card: rebar set under an existing footing (2026-09-11). Service hero: a looping video of the crew pulling rotted sheathing (source kept in `~/Desktop/Gadget Construction Assets/`). The card is an underpinning shot — underpinning is structural repair.
  - **Gallery — started.** The page's `ServiceGallery` shows the door-header before/after slider (`HEADER_REPLACEMENT`) with the project tiles centred under it. The first structural project (`bay-area-sliding-door-header-replacement`, the after photo) is live on `/gallery` behind a new "Structural" filter. More structural photos are still wanted.
  - **Owner sign-off.** Osmin should confirm the scope (joists, beams/posts, sill plates, bearing-wall removal, pest-report Section 1 work, house-over-garage moment frames), that Gadget coordinates an outside structural engineer rather than engineering in-house, and the `SERVICE_PRICING["structural-repairs"]` ranges.
  - **Off-site.** Swap ADU for structural repair in the Google Business Profile service list and on Yelp, Houzz, BuildZoom, Angi. In GSC, request indexing for `/services/structural-repairs`, and URL-inspect `/services` so the ADU redirect is picked up.
  - **No framing posts yet.** `SERVICE_GUIDES["structural-repairs"]` borrows the two underpinning posts plus the dry-rot-cost and foundation-signs posts. A framing brief (sagging floors, pest-report Section 1 repairs, bearing-wall removal cost) is the obvious next `/next-content-batch` topic.
- **Roofing retirement — off-site cleanup (owner/agency, not code).** The site is done (PR #29, live 2026-09-11). Still outstanding: remove roofing from the Google Business Profile service list and from Yelp, Houzz, BuildZoom, Angi and any other directory; in GSC, run URL Inspection on `/services` → Request indexing so Google picks up the redirect sooner. The Google Ads plan never included roofing, so ads need nothing.
- **Homepage hero follow-ups (from PR #30, 2026-09-11):**
  - **Owner sign-off still owed.** Osmin hasn't confirmed (a) that homepage leads may arrive without timeline/budget — the two-step form only collects service + contact details + an optional message; and (b) the hero checkmark "5-year workmanship warranty". `google-ads-campaign-plan.md` says workmanship-warranty wording was stripped from the ad landing pages "per client direction", which conflicts with the homepage, `COMPANY.warranty` and `STATS`. Resolve which is true before anyone copies the claim further.
  - **GA4 not configured.** The funnel events in `lib/track.ts` are a no-op until a GA4 property exists and `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Netlify. Until then, the only homepage measurement is the **Source** row in each lead email.
  - **Escape user input in the lead email** — `app/api/contact/route.ts` puts name/phone/email/service/timeline/scope/message into the Resend HTML raw, and into the ntfy `Title` header. Only the new Source row uses `escapeHtml()`. It was spun off as a separate task and is not done.
  - **Social proof is the next hero lever, and it's off-site.** `COMPANY.reviewCount` is **3** against 500+ projects. Don't put a star rating in the hero until there are ~25+ Google reviews. A review drive among past clients is the ask.
  - **BBB rating is "A-"**. The site mostly no longer shows it: the TrustBar, Footer and About page use the static Accredited mark (`BBBBadge`). The live seal (`BBBSeal.tsx`) still renders the grade in `LpTrustStrip` on the `/lp/*` ad landing pages, and the BBB profile itself shows it. Getting to A+ is usually an unanswered complaint or an incomplete profile. The BBB profile also lists **"Years in Business: 1"** (accredited 2026-04-16), which contradicts the site's 12+ years — fix it in BBB's business portal.
- **Google Ads conversions only fire from the `/lp/*` forms** (`LpQuickForm`, live since 2026-04). The homepage and every other `MultiStepForm` send none, so an ad visitor who navigates off the LP and converts elsewhere isn't counted. Firing the same label from `MultiStepForm` would be correct attribution, but it changes what Smart Bidding optimizes on, so it's a deliberate decision for a `/google-ads` session — not a drive-by fix.
- **Pre-existing lint failures** — `react-hooks/set-state-in-effect` in `Header.tsx`, `MobileBottomBar.tsx` and `CTABlockForm.tsx`, plus an unused `Button` import in `Header.tsx`. `npm run lint` fails on `main` because of these; `npm run build` is unaffected.
- **Header phone number wraps onto three lines at ~1024px** (the desktop nav is too crowded at that width).
- **Google Business Profile** — optimize for local SEO, ensure NAP consistency with site
- **Service-specific testimonials** — removed from service pages pending hyper-relevant reviews per service category
- **Exterior repairs hero image** — service page and `/lp/exterior-repairs` use `/images/stucco-wide-after.jpg` (a real job, but still scaffolded). Swap `backgroundImage` on `app/services/exterior-repairs/page.tsx:76` when a clean finished-exterior photo is available.
- **Gallery photos for exterior repairs** — no gallery entries tagged `categorySlug: "exterior-repairs"` yet. When added, the ServiceGallery will auto-populate on the page.

## What's Done (Recently Completed)

- **ADU retired, Structural Repairs added in its slots (2026-09-11)** — the owner wanted a service closer to the work Gadget actually does. `/services/adu-construction` became `/services/structural-repairs` (new copy, 6 scope items, 5-step process, 8 FAQs, 9 pricing rows); the old URL and the ADU blog guide permanently redirect to `/services` and `/blog` in `next.config.ts` (the hub, not the new page — an ADU searcher dropped on a repair page is worse than a list). Structural Repairs took ADU's position in `SERVICES`, the large bento card, the form option (`HardHat` icon), the schema `Offer`, `knowsAbout`, the gallery page's service links, and 24 city `topServices` entries. Across 28 city pages every ADU FAQ, meta description, subheadline, intro line, and constructionInsight was rewritten — mostly into city-specific structural FAQs — with FAQ counts unchanged. The ADU blog post, its image, the 3 ADU gallery projects and their photos are deleted; five in-body blog references were rewritten, three now linking to the new service. The drafting pipeline's voice sample (`content/style-reference.md`) and image-prompt service list no longer mention ADUs (or roofing, which had survived there). Structural Repairs covers the whole load path — underpinning included, not just framing — while surface dry rot stays on Exterior Repairs.
- **Homepage hero CRO pass (2026-09-11)** — new headline naming services + region (a no-break space before the em dash so it never starts a line); subheadline paragraph → 3 checkmark proof points; trust line, review line, phone link and scroll chevron removed; the CTA is an inline two-step form card on desktop (`HeroEstimateForm` via `Hero aside`) and a full-width "Get Free Quote" modal button below `lg`. The homepage's form is two-step everywhere (hero, modal, CTA block). Headline sizes: 26px mobile / 40px `lg` / 48px `xl` — 4 lines at every width, and at 1440×900 the whole hero is 720px. An interim version that used six service chips to open the modal was replaced the same day. Measurement shipped alongside: every lead email now carries a Source row (which trigger + page), and GA4 funnel events (`estimate_open`, `estimate_step`, `generate_lead`, `phone_click`) fire once `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Netlify. Events go to GA4 only, never the Ads tag, so Smart Bidding's inputs are unchanged.

- **New homepage hero (2026-09-11)** — `/images/hero-foundation-crew.jpg` replaces the interim dusk-deck placeholder that stood in after roofing was retired. It is a real Gadget job photo of the crew tying rebar in a foundation trench, lightly enhanced in ChatGPT. Converted from a 3.0 MB PNG to a 370 KB mozjpeg (the hero `<h1>` is the LCP element). Desktop crop puts the red-shirted worker right of the headline; the mobile portrait crop centers the rebar trench and cuts him off at the edge.

- **Roofing retired as a service (2026-09-09)** — the owner pulled roofing from the business, so it came out of the site entirely. Removed: `/services/roofing` (permanent redirect → `/services` via `next.config.ts`, because the URL was indexed; Next.js answers `permanent: true` with a **308**, which Google treats exactly like a 301), the `Roofing` entry in `SERVICES`, its `SERVICE_PAGES` block, `SERVICE_PRICING.roofing`, the `roofing` gallery category and its one project, the roofing option in `MultiStepForm`, the roofing `Offer` in `localBusinessSchema()`, and `"Roofing"` from `knowsAbout` in `lib/seo/entities.ts`. `exterior-repairs` took roofing's slot in the `ServicesGrid` bento (it had never been in the grid), which keeps the 2-large + 4-compact layout intact. Across the 31 city pages: 21 `topServices` entries, 10 roofing FAQs, 17 meta descriptions/hero subheadlines, and 11 body passages were purged or rewritten — Sausalito got a replacement salt-air FAQ so it stayed at its tier-3 floor of 3. Three blog posts had `/services/roofing` links repointed to `/services/exterior-repairs`. Seven images deleted. Shipped in PR #29 (merged + live 2026-09-11). Roof language now survives only as architectural context (kickout flashing, rooflines, roof trusses, Eichler flat roofs), which is correct for the dry-rot content and reads as expertise, not as a service offer.

- **SERP titles fixed sitewide + in the pipeline (2026-09-08)** — new optional `BlogPost.metaTitle` and `generatePageMetadata({ titleAbsolute })` decouple the Google title from the on-page H1; all 15 posts rewritten to 47-57 chars. The pipeline was writing the defect: briefs already carried a `metaTitle` that `generate-post.ts` never read, and the proposal prompt never capped its length. Critique pass now emits a `<meta_title>` block under 60-char rules, `resolveMetaTitle()` owns the fallback chain (critique line → brief's metaTitle → shortest over-length candidate → omit), `propose-next-batch.ts` caps at 60, and the draft PR body prints the title with its character count. PR #27. Driven by GSC: the blog earned 69% of impressions but converted at 0.3-0.7% CTR against ~2.5-5% par for its positions, while the homepage sat at par.
- **Apple fluid-interface pass (2026-08-28)** — audited every animated surface against Apple's *Designing Fluid Interfaces* rules. New `lib/spring.ts` (hand-written, no dependency, per the zero-animation-libraries rule), `lib/scroll-driver.ts` (one shared scroll loop, read/write batched), `lib/button-styles.ts`, `hooks/useReducedMotion.ts`. `BeforeAfter` rebuilt on Pointer Events with capture, grab offset, `touch-pan-y` and momentum; `EstimateModal` rebuilt as an interruptible spring-driven sheet with trigger-anchored `transform-origin`, focus trap/restore and drag-to-dismiss; the 150ms step gate removed from `MultiStepForm`; Hero entrance re-armed on rAF and shortened for LCP; four `max-h` collapses converted to `grid-rows`; size-specific tracking/leading added to the type scale; header made translucent chrome; `prefers-reduced-motion` extended to the four unguarded ambient loops, plus new `prefers-reduced-transparency` and `prefers-contrast` support. Deleted 70 lines of unreferenced scroll-timeline CSS and the dead `--font-size-*` tokens. All eight areas verified manually in the browser. Branch `fluid-interface-pass`.
- **Native CSS scroll-timeline was deliberately NOT adopted** — the deleted `.scroll-reveal-*` block used `animation-timeline: view()`, which runs on the compositor and would outperform the JS driver. It was removed rather than wired up because its `entry 0% cover 25%` range would change the feel of every reveal on the site, and the 65% travel zone is a documented deliberate choice. Revisit as a design decision, not a cleanup.
- **Founder story → "rooted in place" pivot** — About page's `FounderStory` section now opens with an SF skyline shot from a Bay Area hilltop (`/images/about-sf-skyline.jpg`, 685KB) instead of a logo placeholder. Heading: `Twelve Years. 31 Cities. One Backyard.` Three paragraphs name specific neighborhoods (Sunset, Berkeley hillsides, Daly City), housing stock by architect (Eichler, Doelger), and the SF permit authority (DBI). Component now consumes `FOUNDER_STORY` from `lib/about-data.ts` (previously had divergent hardcoded copy). The `image: { src, alt }` field is now part of FOUNDER_STORY.
- **Exterior repairs service page** — `/services/exterior-repairs` covers dry rot, stucco, and siding as three subservices on one URL. 1,400+ words, 6-item scope, 5-step process, 4 differentiators, 8 FAQs, itemized pricing. Uses a custom `multiServiceGraphSchema()` helper that emits a `@graph` with three separate `Service` nodes (Dry Rot Repair, Stucco Repair, Siding Installation) per 2026 SEO research. Exterior Repairs is now the 7th entry in `SERVICES`.
- **31 city cross-linking to exterior-repairs** — every city page links into the new service with varied anchor text via the new optional `serviceAnchors?: Partial<Record<string, string>>` field on `CityData`. Examples: "Doelger Home Stucco & Dry Rot Repair" (Daly City), "Eichler T1-11 Siding & Exterior Repair" (Menlo Park), "Craftsman Home Dry Rot & Siding Repair" (Berkeley). Rendered by `CityServices` in CityPageContent.tsx.
- **12 hyper-local exterior-repair paragraphs** — new `CityExteriorRepairsContext` component renders a unique ~80-word paragraph on 12 priority cities (SF, Daly City, Pacifica, Sausalito, Mill Valley, San Rafael, San Anselmo, Berkeley, Oakland, Palo Alto, Menlo Park, San Jose). Only renders when `CityData.exteriorRepairsContext` field is populated. E-E-A-T Experience signal per 2026 Helpful Content update.
- **Blog featured images** — all 3 existing posts have real architectural/editorial featured images (remodel cost, foundation signs, and an ADU guide since retired). New blog detail hero layout: centered category · date · reading time meta line, big centered H1, featured image attached seamlessly to the dark canvas (no card chrome, `aspect-[3/2]`). Legacy `PageHeader` still used elsewhere.
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
- **Content batch proposal skill** — `/next-content-batch` invokes `scripts/propose-next-batch.ts`. Pulls 90 days of Google Search Console data, reads existing queue + published posts + services + cities + Google Ads keyword plan, calls Claude Opus 4.7 to propose 4 new briefs (mix of new posts and refreshes if GSC data supports). Writes to `content/proposed-briefs.json` + summary, opens PR for review. On merge, the briefs migrate into `post-queue.json` with `status: "queued"` via `scripts/migrate-proposed-briefs.mjs` — called by `merge-proposed-briefs.yml` for a human merge, or inline by `auto-merge-proposals.yml` for a bot merge. Cost: ~$0.50-$1.50 per batch.
- **10-post SEO content plan locked** — `content/post-queue.json` contains 10 detailed briefs for Weeks 1-10 (2026-04-27 through 2026-06-29). Primary focus: composite decks (4 posts), exterior repairs (4 posts), foundation underpinning (1 post), coastal cluster hub (1 post). Geographic mix per Option B: SF-anchored + Bay Area-wide + hyper-local. All briefs have complete outline, keywords, internal links, must-includes, CTA.
- **Service pages regionalized** — all 6 service pages rewritten from SF-only to Bay Area (31 cities, 6 counties). Meta titles, headlines, intros, scope, differentiators, FAQs, pricing headings all updated. SF details preserved as anchor, supplemented with Marin, East Bay, Peninsula, South Bay references.
- **Service page variety pass** — headlines, CTA text, intro openers, FAQ order, testimonial headings, and process step titles diversified across all 6 pages to avoid template feel
- **All 6 service card images** — bento grid now has real photos for every service including concrete foundations
- **All service page hero images** — composite decks, retaining walls, concrete foundations, complete remodel, and exterior repairs pages all have real hero background images (structural repairs has a looping hero video with a poster still) with SEO alt text (via `imageAlt` prop on Hero component)
- **Before/after sliders** — two pairs in `lib/gallery-data.ts` (2026-09-11): `HEADER_REPLACEMENT` (4:3, homepage + `/services/structural-repairs`; it replaced the re-stucco pair) and `DECK_STAIRS` (portrait 3:4, homepage + `/services/composite-decks`). The homepage shows both side by side at `md+` in a `16fr_9fr` grid, which is the ratio that makes a 4:3 and a 3:4 frame the same height; below `md` they stack. `BeforeAfter` takes `portrait` and `sizes`; `ServiceGallery` takes an optional `beforeAfter` pair, narrows a portrait slider to `max-w-md`, and centres a partial last row of project tiles under it. The two shots were taken from slightly different spots, so the before was warped onto the after with a SIFT + RANSAC homography (OpenCV) and both cropped to the shared frame. Do the same for any new pair — unaligned photos visibly jump at the divider.
- **BeforeAfter clipPath fix** — uses `clipPath: inset()` instead of `width` for pixel-perfect image alignment
- **Homepage pixelation reveal** — GallerySection before/after slider pixelates into view via scroll-linked SVG filter (direct DOM manipulation for smoothness)
- **Interactive county explorer** — ServiceArea component now has clickable county badges that expand a panel with city grid, staggered fade-in, and links to city pages
- **Bubble animation** — DifferentiationSection rows use `bubble` RevealOnScroll type (easeOutBack single-overshoot settle)
- **All gallery projects have real images** — 12 projects across 4 categories: 3 remodels (kitchen, bathroom, kitchen island), 3 foundations (rebar, slab prep, garage compaction), 3 retaining walls (steps, landscaped, rebar/formwork), 4 composite decks. (The 3 ADU projects were removed with the service on 2026-09-11.) All placeholder entries removed.
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

### Full weekly cadence (all phases automated, human review optional)

```
Tuesday  16:00 UTC  (~9am PDT)  → auto-propose-batch.yml    — if queue runway ≤ 4, AI proposes 4 new briefs, opens proposal PR, emails
Tue-Thu                          → human review window for  — edit, merge, or close the proposal PR
                                    proposal PR (optional)
Friday   07:00 UTC  (~11pm Thu) → auto-merge-proposals.yml  — squash-merges any still-open proposals/* PR,
                                    then runs the migration itself → briefs land in post-queue.json as "queued"
Friday   16:00 UTC  (~9am PDT)  → weekly-draft.yml          — AI drafts next queued post, opens draft PR, emails review copy
Fri-Sun                          → human review window for   — edit, merge, or close the draft PR
                                    draft PR (optional)
Sunday   07:00 UTC  (~11pm PT)  → auto-merge-drafts.yml     — squash-merges any still-open drafts/* PR
Monday   14:00 UTC  (~7am PDT)  → weekly-publish.yml        — triggers Netlify rebuild; posts with date<=today go live
Tuesday  16:00 UTC              → back to the top
```

**Default-yes contract for both review stages:**
- Leave PR open past the deadline → implicit approval (auto-merges on schedule)
- Close PR → explicit rejection (nothing happens; next cycle may re-propose or re-draft)
- Edit PR → your edits captured; still auto-merges unless closed

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

Run monthly when queue is low (or automatically — see below). `.claude/skills/next-content-batch/SKILL.md` + `scripts/propose-next-batch.ts`. Pulls 90 days of GSC data via service-account auth, combines with post-queue + published posts + services + ads plan, calls Claude Opus 4.7 (default — override with `MODEL=claude-sonnet-4-6`) to propose 4 briefs. Opens `proposals/content-batch-<date>` PR. On merge, `scripts/migrate-proposed-briefs.mjs` migrates briefs from `content/proposed-briefs.json` into `content/post-queue.json`. Scheduled dates are clamped to today, so a stalled queue can't emit briefs dated in the past.

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
| `GSC_PROPERTY_URL` | weekly-publish | Search Console property id for the sitemap resubmit — must be `sc-domain:gadgetconstructionsf.com` |
| `CRON_SECRET` | review-system-health | Bearer for `/api/review-requests/health` — same value as the Netlify variable |
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
  refresh-briefs.json          # refresh briefs held back from the queue for manual handling
  proposed-briefs-summary.md   # human-readable summary for the proposal PR
  site-inventory.json          # auto-generated list of 48 linkable URLs
  style-reference.md           # voice guide loaded by the drafting passes

scripts/
  generate-post.ts             # Friday draft pipeline
  build-site-inventory.ts      # rebuilds site-inventory.json from repo state
  fetch-gsc-data.ts            # Search Console API client
  propose-next-batch.ts        # /next-content-batch implementation
  migrate-proposed-briefs.mjs  # proposed-briefs.json → post-queue.json (shared by both merge paths)
  generate-month1-doc.py       # reference impl for month-1 client doc (superseded by skill)

.claude/skills/
  monthly-seo-doc/             # /monthly-seo-doc skill
  next-content-batch/          # /next-content-batch skill

.github/workflows/
  weekly-draft.yml             # Fri 16:00 UTC — AI draft + PR + email
  auto-merge-drafts.yml        # Sun 23:00 PT — merge any open drafts/* PR
  weekly-publish.yml           # Mon 14:00 UTC — Netlify rebuild
  merge-proposed-briefs.yml    # on push to proposed-briefs.json — migrate to queue (human merges only)
```

### GSC diagnostic tooling

Two manual workflows for ad-hoc analysis of Google Search Console state. Both use the same `GSC_SERVICE_ACCOUNT_JSON_BASE64` secret and the Domain property `sc-domain:gadgetconstructionsf.com`.

| Workflow | Script | What it answers |
|---|---|---|
| `gsc-report.yml` | `scripts/fetch-gsc-data.ts` | 90-day search performance: top queries, top pages, close-to-page-1 opportunities, low-CTR pages. Pulls *only pages that earned ≥1 impression* — does NOT tell you what's indexed. |
| `gsc-index-coverage.yml` | `scripts/gsc-index-coverage.ts` | Per-URL inspection of every URL in the live sitemap: indexed vs. not, plus coverage state (`Submitted and indexed`, `URL is unknown to Google`, `Crawled - currently not indexed`, etc.). Plus sitemap submission stats. Use when you need to know what Google *knows about*, not what it *ranks*. |

Run either with `gh workflow run <name> --ref main`. Both upload a JSON artifact. Download with `gh run download <run-id> -n <artifact-name> -D .gsc-report/`. The `.gsc-report/` directory is gitignored.

The two reports answer fundamentally different questions and people conflate them constantly:
- **"Why am I only seeing 3 pages in GSC?"** → could mean *only 3 are indexed* (use index-coverage) or *only 3 have earned an impression yet* (use performance). Always ask which.
- **"Why isn't my new page ranking?"** → if it's not in the index-coverage report as `PASS`, it's not indexed yet and ranking is moot. Check coverage *before* ranking.

The performance report has an `opportunities` block (close-to-page-1, low-CTR, impressions-no-clicks) that's only meaningful once the site has meaningful index coverage. On a young site with <10 indexed pages, those buckets will all be empty — not because there are no opportunities, but because there's no data to surface them yet.

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
- **64 routes** (homepage + about + contact + gallery + blog listing + 14 blog posts + services hub + 6 service pages + 5 landing pages + service areas hub + 31 city pages + API route + sitemap.xml + robots.txt + opengraph-image, plus the review system's 7: /feedback + its OG image, /unsubscribe, /dashboard, /dashboard/login, /api/review-requests/dispatch, /api/review-requests/health — none of them in the sitemap)

## Key Gotchas

- **Phone photos carry an EXIF orientation tag, and only some tools honour it.** Five images in `public/images` (`dry-rot-hero`, `stucco-hero`, `siding-hero`, `dry-rot-before`, `dry-rot-after`) are stored landscape with orientation `6`, meaning a viewer is expected to rotate them 90° to display them upright and portrait. `next/image` honours the tag, so the rendered photo has always been correct — and `scripts/optimize-images.ts` already calls `.rotate()`. `scripts/generate-blur-map.mjs` did **not**, so it built every placeholder from the unrotated pixels and painted a landscape blur under a portrait photo — a sideways smear that snapped upright on load. Fixed 2026-09-09 by piping through `sharp(raw).rotate()` before `getPlaiceholder`. Any new tool that reads these files directly needs the same `.rotate()`, and any new phone photo added to `public/images` inherits the same tag. Check with `sharp(f).metadata().orientation` — anything other than `1` or undefined needs rotating before you measure or sample it.
- **ADU construction is retired — do not reintroduce it.** Same rules as roofing below: no service page, `SERVICES` entry, form option, schema `Offer`, gallery category, or copy that says Gadget builds ADUs, garage conversions, JADUs, or backyard units. `/services/adu-construction` and `/blog/adu-construction-san-francisco-guide` are permanent redirects in `next.config.ts` — keep them. The site ranked for ADU terms, so a `/next-content-batch` proposal can still chase an ADU query from GSC data; reject it. Structural Repairs took ADU's slots and covers the load path from the footing up — **underpinning is a structural repair**, not only a foundation service (Raul, 2026-09-11). The page leads its scope with underpinning, carries two per-pier/project pricing rows and a diagnostic FAQ ("underpinning or just new posts?"), and its guides module links the underpinning cost and timeline posts — its figures ($2,000–$4,500 per pier, $15,000–$50,000+ per project, 1–3 weeks on site) are copied from those posts, so change them together. The cost post owns the "underpinning cost" query: keep the service page's underpinning copy diagnostic rather than writing a second cost breakdown, and check which page the ads underpinning ad group lands on before changing either. Trim/siding rot belongs on Exterior Repairs.
- **`next build` type-checks every `.ts`/`.mts` file in the repo, untracked ones included** (`tsconfig.json` includes `**/*.ts`). A half-finished script in `scripts/` that doesn't type-check breaks your local `npm run build` even though it was never committed. Run `npx tsc --noEmit -p .` after adding one.
- **Scripts that import from `@/lib` must be `.ts` with a `main()` wrapper.** tsx runs `.ts` as CommonJS here (no `"type": "module"`), so top-level `await` fails with "not supported with the cjs output format". Renaming to `.mts` doesn't help: ESM then can't see the named exports of the CommonJS-transpiled lib files ("does not provide an export named 'COMPANY'"). Use `__dirname`, not `import.meta.url`. Plain `.mjs` scripts that don't import lib (like `scripts/review-guide/shoot.mjs`) can use top-level await.
- **`/feedback` gates reviews on purpose** — 1–2 faces never see the Google link. It carries Google-policy and FTC exposure and was chosen deliberately; see "Review Request System" → decision 1 before touching the routing in either direction.
- **New Supabase tables need `.enableRLS()`** — the `public` schema is exposed through Supabase's Data API with a public anon key. And keep `prepare: false` on the `postgres` client; the transaction pooler can't hold prepared statements.
- **A new chrome-less page goes in `lib/bare-routes.ts`** — not a fresh `pathname` check in Header, Footer and MobileBottomBar, which is how the `/lp/` rule used to be copied three times.
- **Review emails key their copy off `PROJECT_PHRASES` in `lib/reviews/emails.ts`** (SERVICES slug → "your new deck"). Add a service there when you add one to `SERVICES`, or its customers get the generic "your project".
- **Roofing is retired — do not reintroduce it.** No service page, no `SERVICES` entry, no form option, no schema `Offer`, no gallery category. `/services/roofing` is a permanent redirect in `next.config.ts`; deleting that redirect resurrects a 404 on a URL Google has indexed. Roof *vocabulary* is still correct where a roof is the cause of an exterior-repair problem (kickout flashing, roof-to-wall transitions, fascia) or where it describes the architecture (Eichler flat roofs, Victorian rooflines) — that copy is deliberate and should stay. What must never come back is roofing framed as work Gadget sells. The content pipeline is mostly covered: `propose-next-batch.ts` builds its service list from `SERVICES`, which no longer has roofing. But it also feeds the model 90 days of GSC queries, and the site ranked for roofing terms, so a proposal can still chase a roofing query — reject any proposal PR that does.
- **Domain is `gadgetconstructionsf.com`** NOT `gadgetconstruction.com` — all URLs, schemas, sitemap, OG must use the SF version
- **`overflow-x: clip`** (not `hidden`) on html/main — `hidden` breaks `position: sticky` on mobile stacking cards
- **Parallax is desktop-only** — `scale(1.1)` causes image cutoff on mobile viewports
- **`EstimateButton` and `Button` share `lib/button-styles.ts`** — they are still separate components (one polymorphic/server, one a client modal trigger) but both compose `BUTTON_BASE` / `BUTTON_VARIANTS` / `BUTTON_SIZES`. They had silently drifted: the primary CTA on the site was missing the press feedback the secondary one had. Change styling in `lib/button-styles.ts` so it lands on both, never in one component.
- **Never use `max-h-[X] / max-h-0` to expand a panel** — it transitions the *cap*, not the content, so the panel appears to snap open then linger for the rest of the duration, and anything taller than the cap is silently clipped (FAQ answers over 384px and county panels over 600px were being cut off). Use `grid` + `grid-rows-[0fr] → grid-rows-[1fr]` with an inner `min-h-0 overflow-hidden` child, which animates to the content's real height.
- **A collapsing panel needs content to collapse.** Clearing state on close makes the content vanish instantly while an empty box animates shut — the enter is animated and the exit is not. Retain the last value through the exit (see `renderedCounty` in `ServiceArea.tsx`).
- **Tracking and leading belong to the SIZE, not the element.** They live in the `--text-*--letter-spacing` / `--text-*--line-height` theme variables in globals.css, so every `text-*` utility carries the right values with no per-component classes. Do not add a blanket `letter-spacing` — a single fixed value is wrong somewhere on the scale by definition. (Tailwind v4's namespace is `--text-*`; the old `--font-size-*` tokens matched nothing and generated no CSS.)
- **Translucent chrome is guarded three ways** — `supports-[backdrop-filter]` for browsers that can't blur, plus `prefers-reduced-transparency` and `prefers-contrast: more` to go solid. Any new `backdrop-blur` surface needs an opaque background under those two queries; the global rule in globals.css only removes the blur, it can't invent a background. The modal sets its blur from JS, so it calls `prefersReducedTransparency()` from `lib/utils.ts` itself.
- **`RevealOnScroll` breaks `position: sticky`** — it wraps children in a div that disrupts the sticky parent relationship. Use inline `IntersectionObserver` instead (see `StickyCard` in ServicesGrid.tsx)
- **iOS Safari ignores `user-scalable=no`** since iOS 10 — don't try to prevent zoom via viewport meta. Use CSS overflow clipping instead.
- **OG image on Netlify** — `fs.readFile` and `process.cwd()` don't work in serverless. Embed assets as base64 constants or fetch via absolute URL.
- **Service pages are regionalized to "Bay Area"** — NOT "San Francisco." All meta titles, headlines, intros, FAQs, and pricing headings say "Bay Area" / "31 cities" / "6 counties." SF is kept as the anchor with specific neighborhoods, but supplemented with Marin, East Bay, Peninsula, South Bay references. Do NOT revert to SF-only framing.
- **Service page variety** — each page has unique headline structure, CTA text, intro opener, FAQ lead question, and testimonial heading. Do NOT use the same pattern across all 6 pages.
- **Testimonials removed from service pages** — intentionally removed pending hyper-relevant per-service reviews. Do NOT re-add generic testimonials.
- **BeforeAfter uses `clipPath`** not `width` — `clipPath: inset(0 X% 0 0)` keeps both images at full container width so `object-cover` crops them identically. Using `width` causes misaligned crops.
- **CallRail uses DNI (dynamic number insertion) via JS** — the real business number `(628) 233-3589` stays in the source code (JSX, JSON-LD schema, OG image, everywhere). The CallRail swap.js script in root layout swaps the displayed number per-visitor based on traffic source. Do NOT replace the business number with a tracking number in source — CallRail's dashboard owns the mapping. ⚠️ **The number changed on 2026-08-24 from (650) 771-5817. CallRail's swap pool and every off-site listing must be updated to match, or call attribution breaks and NAP consistency (a local-ranking signal) is broken across the web.** If a new CallRail company ID is needed, swap only the `src` URL in `app/layout.tsx`.
- **Email sender must be verified in Resend** — all blog draft emails use `estimates@gadgetconstructionsf.com` because that domain/sender is already verified in Resend for the contact form. Sending from an unverified address (like `drafts@...`) would fail.
- **Blog `<title>` comes from `metaTitle`, not `title` — keep it <=60 chars.** `title` is the on-page H1 and runs long by design; `metaTitle` is the SERP title. The blog route passes `post.metaTitle ?? post.title` and sets `titleAbsolute`, which wraps it in `{ absolute }` so it **bypasses the root layout's `%s | Gadget Construction Inc.` template**. That suffix is 27 chars and Google truncates around 60, so appending it spends a third of the budget on branding no searcher sees. Every post shipped 82-129 chars until 2026-09-08; all 15 are now 47-57. A new post without a `metaTitle` silently reverts to the old broken behaviour — the field is optional in the type only so the fallback is safe, not because it is optional in practice. Lead with the primary keyword; keep near-sibling posts (cost vs. timeline vs. comparison) distinguishable. Same fix shipped to lamorindapavers PR #42, where `titleAbsolute` is set unconditionally instead of gated — collapse that divergence next time the engines are synced.
- **Blog posts use `isPublished()` filter** — future-dated posts exist in `BLOG_POSTS` array but don't appear on `/blog`, at their detail route (404), or in the sitemap until their `date` arrives. This enables pre-writing + scheduled publishing. Always import `isPublished` or `getPublishedPosts` from `lib/blog-data.ts`, never iterate `BLOG_POSTS` directly in user-facing routes.
- **gpt-image-1 hallucinates numeric ranges with duplicate currency symbols** — `$15K-$60K` format caused a failed render ("$15K-600K"). The image prompt generator system prompt enforces: single hero number preferred over range, if range then single `$` sign only (`$15K-60K`), no trailing `+`, wrap exact text in single quotes.
- **Force push on `drafts/` branches** — `generate-post.ts` uses `git push --force` because any unmerged draft is considered abandoned and overwritten on rerun. If you want to preserve a draft, merge it before rerunning the workflow.
- **Auto-merge contract** — leave a drafts/* PR open past Sunday 23:00 PT = implicit approval (Monday publish). Close PR = explicit rejection (brief stays `queued` on main, re-drafts next Friday). Do NOT leave PRs open with intent to revisit later unless you mean to ship them.
- **FAQ rich results restricted to health/gov since 2023** — the `faqSchema()` still ships because it captures People Also Ask + LLM answer-engine citation (ChatGPT, Perplexity, Google AI Overviews), NOT because we expect the old FAQ rich result display. Keep generating FAQ blocks anyway.
- **Internal linking target: 12-20 links per 2,500-word post** — the SEO critique pass enforces this. Briefs specify 3-5 required links; critique pass adds 8-15 more from the site inventory. Anchor text diversification: <25% exact-match. Top 30% of page gets at least 3 links.
- **The IndexNow key file in `public/` must stay in sync with `scripts/submit-indexnow.ts`** — IndexNow verifies ownership by fetching `https://gadgetconstructionsf.com/<key>.txt` and matching its contents to the submitted key. Rename or delete that file and every submission silently fails. Google does not consume IndexNow at all; this is a Bing/Yandex accelerator only.
- **Blog author is an `@id` reference, not an inline object** — `articleSchema()` emits `author: { "@id": OWNER_ID }`, and the full Person is defined once per page inside `localBusinessSchema().founder`. That resolves only because the LocalBusiness block renders on every page from the root layout. If a page ever drops it, its author reference dangles.
- **`lib/blur-map.json` ships in the client bundle** — Hero, ServicesGrid, BeforeAfter, gallery, WhyChooseUs and ServicePageContent are client components, so importing `blurProps` pulls the whole ~28KB map into client JS. That cost is paid once (shared chunk) as soon as any client component uses it, so wiring the remaining images is free. If it ever needs trimming, pass `blurDataURL` down from server parents instead.
- **A `GITHUB_TOKEN` push does NOT trigger push-triggered workflows** — GitHub suppresses it to prevent recursion. `auto-merge-proposals.yml` squash-merges the weekly proposal PR with the default token, so `merge-proposed-briefs.yml` (trigger: `push` on `content/proposed-briefs.json`) never fired for a bot merge. Six proposal PRs merged between 2026-05-15 and 2026-08-23 with zero briefs reaching the queue; `weekly-draft.yml` then logged "No queued posts remaining. Skipping draft generation." and exited **green** every Friday for eight weeks. Nothing alerted because every workflow reported success. Fixed by having `auto-merge-proposals.yml` run `scripts/migrate-proposed-briefs.mjs` inline after merging. Anywhere else in this repo where one workflow's push is meant to wake another, the same rule applies — do the work inline or use a PAT.
- **`scheduledDate` on a brief becomes the post's publish date** — a brief whose date has already passed publishes the moment its draft PR merges, skipping the review window entirely. `migrate-proposed-briefs.mjs` reassigns consecutive Monday slots at least 6 days out at migration time, and `propose-next-batch.ts` clamps its date cursor to today.
- **`generate-post.ts` has no refresh path** — a brief with `action: "refresh"` would be drafted as a brand-new post at `<original-slug>-refresh`, cannibalizing the page it was meant to update. `migrate-proposed-briefs.mjs` quarantines those into `content/refresh-briefs.json` instead of queueing them. Handle refreshes by editing the existing post in `lib/blog-data.ts`.
- **Do NOT edit `content/proposed-briefs.json` on main manually** — the `merge-proposed-briefs.yml` workflow watches it and will try to migrate whatever's there into the queue. Edit only through `/next-content-batch` PRs.
- **`featuredImage` field is required for blog hero to render correctly** — the Friday pipeline auto-populates it. Manually-added posts need it too, or the `app/blog/[slug]/page.tsx` hero falls back to text-only.
- **GSC property is a Domain property — siteUrl must be `sc-domain:gadgetconstructionsf.com`** — NOT `https://gadgetconstructionsf.com/`. Using the URL-prefix form returns 403 "User does not have sufficient permission for site" even when the service account is added with Full permission on the actual property. The 403 message is misleading; it really means "this exact URL is not a property the SA can access." If you see that error, run `searchconsole.sites.list()` first to confirm what the SA actually has — for this project it's only the Domain form. The service account is `seo-proposal-bot@gadget-construction-seo.iam.gserviceaccount.com` in GCP project `gadget-construction-seo` (`172973380457`). Search Console API must be enabled on that GCP project — that's a separate prerequisite from the SA having Search Console permission.
- **Multiline shell strings inside `run: \|` need full indentation** — in GitHub Actions workflows, every body line of a `run: \|` literal block must stay at or above the block's indent, *including content lines inside double-quoted shell strings* (e.g., the body of `gh pr comment "$pr" --body "..."`). An un-indented line silently terminates the literal block; YAML then fails to parse the rest. GitHub still registers the workflow as `active` but with **zero triggers**, so schedules never fire and pushes log 0-second startup_failures with the file path as the display name. This is exactly what kept `auto-merge-drafts.yml` and `auto-merge-proposals.yml` from running between April 19 and April 29. When copying that pattern, indent the entire comment body to match the surrounding shell.
