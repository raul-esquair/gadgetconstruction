# Gadget Construction — Project Guide

## What This Is

Website for **Gadget Construction Inc.**, a Class B general contractor in San Francisco, CA (CSLB #1132983). Built with Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript.

## Business Context

- **Owner:** Raul
- **Founded:** 2014 (12+ years)
- **Projects:** 500+ completed
- **Phone:** (628) 233-3589
- **License:** CA #1132983
- **Warranty:** 5-year workmanship
- **Service area:** San Francisco & the Peninsula
- **Services:** Concrete Foundations, Retaining Walls, Complete Remodels, Composite Decks, Roofing, ADU Construction
- **Tagline:** "Built Right. On Time. Guaranteed."

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build — must pass with 0 errors before committing
npm run lint     # ESLint check
```

## Architecture

### Tech Stack
- **Next.js 16** (App Router, Server Components by default)
- **React 19**
- **Tailwind CSS v4** (configured via `@theme inline` in globals.css, NOT tailwind.config.ts)
- **TypeScript** (strict)
- **Lucide React** (icons)
- **clsx + tailwind-merge** (via `cn()` helper in `lib/utils.ts`)
- **Zero animation libraries** — all animations are CSS transitions + IntersectionObserver

### File Structure

```
app/                          # Pages (App Router)
  layout.tsx                  # Root layout — fonts, header, footer, modal provider
  page.tsx                    # Homepage
  globals.css                 # Design system tokens, keyframes, base styles
  about/page.tsx
  contact/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  services/page.tsx           # Services hub
  services/*/page.tsx         # 6 individual service pages
  api/contact/route.ts        # Form submission endpoint

components/
  ui/                         # Primitives — Button, Container, Card, FormField, etc.
  sections/                   # Full-width page sections — Hero, TrustBar, CTABlock, etc.
  layout/                     # Header, Footer, MobileBottomBar
  seo/                        # JsonLd, Breadcrumbs

lib/                          # Data & utilities
  constants.ts                # COMPANY, SERVICES, TESTIMONIALS, DIFFERENTIATORS, etc.
  types.ts                    # TypeScript interfaces
  services-data.ts            # SERVICE_PAGES — full copy for each service page
  blog-data.ts                # BLOG_POSTS array
  about-data.ts               # FOUNDER_STORY, VALUES, CREDENTIALS
  contact-data.ts             # CONTACT_COPY
  pricing-data.ts             # SERVICE_PRICING by slug
  metadata.ts                 # generatePageMetadata() helper
  utils.ts                    # cn() helper

hooks/
  useInView.ts                # IntersectionObserver hook for scroll animations
```

### Data Flow

All content lives in `lib/` as typed constants. Components import and render them. No CMS, no external APIs, no database.

- `SERVICES` array → ServicesGrid, Header dropdown, Footer links, MultiStepForm options
- `SERVICE_PAGES` record (keyed by slug) → individual service page content
- `BLOG_POSTS` array → blog listing + `generateStaticParams()` for static generation
- `TESTIMONIALS`, `DIFFERENTIATORS`, `PROCESS_STEPS` → section components
- `SERVICE_PRICING` record → PricingSection on each service page

**To add a new service:** Add to `SERVICES` in constants.ts, add entry to `SERVICE_PAGES` in services-data.ts, add pricing to `SERVICE_PRICING`, create `app/services/[slug]/page.tsx`.

**To add a new blog post:** Add to `BLOG_POSTS` in blog-data.ts. Static params auto-generate the route.

## Design System

### Colors (defined in globals.css `@theme inline`)

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#222222` | Headings, dark backgrounds, footer |
| `secondary` | `#444444` | Body text |
| `accent-red` | `#CC0000` | Brand accent — icons, underlines, highlights |
| `accent-orange` | `#CC0000` | Currently same as red (was orange, rebranded) |
| `accent-orange-dark` | `#A30000` | Hover states |
| `neutral-50` to `neutral-700` | Grays | Backgrounds, borders, muted text |
| `metallic-light/mid/dark` | Silver grays | Concrete-texture CTA buttons |

### Typography

- **Headings:** Montserrat (600, 700, 800) via `font-heading` class
- **Body:** Inter (400, 500, 600) via `font-body` class
- Both loaded with `next/font/google` and set as CSS variables

### Critical CSS Pattern — White Text on Dark Backgrounds

Global CSS sets heading color via `:where(h1-h6) { color: var(--color-primary) }`. Tailwind's `text-white` class does NOT reliably override this due to specificity. **Always use inline style for white headings:**

```tsx
// WRONG — text-white gets overridden
<h2 className="text-white">Heading</h2>

// CORRECT — inline style wins
<h2 style={{ color: "#ffffff" }}>Heading</h2>
```

### Button Variants

```tsx
<Button variant="primary" />     // Concrete texture (metallic silver with SVG grain)
<Button variant="secondary" />   // Dark charcoal
<Button variant="outline" />     // Border only
<Button variant="ghost" />       // Text only
```

The `btn-concrete` CSS class in globals.css creates the metallic texture effect matching the logo's "GADGET" text.

## Key Patterns

### Estimate Modal (Global)

`EstimateModalProvider` wraps the app in `layout.tsx`. Any component can trigger it:

```tsx
// In a client component:
const { open } = useEstimateModal();
<button onClick={open}>Get Estimate</button>

// Or use the pre-built button:
import { EstimateButton } from "@/components/ui/EstimateModal";
<EstimateButton size="lg">Get Free Estimate</EstimateButton>
```

The `HeroCTA` and `SectionCTA` components wrap this for server component usage.

### Animation System

Two layers, zero external deps:

1. **`useInView` hook** — IntersectionObserver that returns `{ ref, isInView }`. Respects `prefers-reduced-motion`. Fires once by default.

2. **`AnimateOnScroll` component** — Wraps any content with scroll-triggered entrance animation:
```tsx
<AnimateOnScroll animation="fade-up" delay={200}>
  <Card>...</Card>
</AnimateOnScroll>
```
Animation types: `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-up`

3. **Stagger pattern** — For grids, apply `useInView` to the container, then use `isInView` with index-based `transitionDelay` on each child. See ServicesGrid.tsx for the pattern.

Easing standard: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` or `cubic-bezier(0.16, 1, 0.3, 1)` for expo-out.

### Mobile Bottom Bar

`MobileBottomBar` is scroll-aware — hidden when hero CTAs are visible, slides up when they scroll out of view. Uses `data-hero-cta` attribute on the Hero's CTA wrapper as the scroll sentinel.

### Multi-Step Form

3-step progressive form: Service Selection → Timeline/Budget → Contact Info. Step transitions animate with directional slide (forward = right, back = left). Used in both `CTABlock` (inline) and `EstimateModal` (popup).

## SEO

- Every page exports `metadata` using `generatePageMetadata()` from `lib/metadata.ts`
- Root layout has `LocalBusiness` JSON-LD schema on every page
- Service pages have `Service` + `FAQPage` JSON-LD schemas
- Blog posts have `Article` JSON-LD schema
- Breadcrumbs component generates `BreadcrumbList` schema
- All service pages have unique meta title/description from `SERVICES` array

## Copywriting Rules

Copy follows these principles (established in Phase 2):

1. **Problem > Empathy > Solution > Proof** framework on every service page
2. **Specificity over generality** — "500+ projects" not "many projects"
3. **Pain-point-first** — name the homeowner's fear, then resolve it
4. **SF-specific** — seismic codes, DBI permits, neighborhoods, fog, clay soil
5. **No generic contractor language** — test every line: "Could any contractor say this? If yes, rewrite."
6. **Second person** — "you/your", not "our clients"
7. **Short sentences. No filler.** Contractions are fine.
8. **Response time:** "minutes" not "hours" or "days"

## Responsive Design

- **Mobile-first** Tailwind classes
- **Container:** `px-5 sm:px-6 lg:px-8` (20px mobile minimum)
- **Header:** `h-20 md:h-24` — main content has matching `pt-20 md:pt-24`
- **Mobile bottom bar spacer:** `h-16 md:hidden` at bottom of layout
- **Section padding:** `py-12 md:py-20` via SectionWrapper
- **Grids:** Typically `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

## What's Pending

- **Founder story** — placeholder copy in about-data.ts, needs Raul's real story
- **Project photography** — placeholder images throughout, needs real before/after photos
- **Google reviews** — placeholder testimonials, needs real review text (currently 3 reviews at 5 stars — too few to embed a live widget, using curated quotes instead)
- **Form backend** — API route logs to console, needs email service / CRM integration
- **Blog featured images** — placeholder divs, needs real images
