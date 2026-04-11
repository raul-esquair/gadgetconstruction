import type { Service, Testimonial, ProcessStep, Differentiator, Stat } from "./types";

export const COMPANY = {
  name: "Gadget Construction Inc.",
  shortName: "Gadget Construction",
  phone: "(628) 233-3589",
  phoneHref: "tel:+16282333589",
  tagline: "Built Right. On Time. Guaranteed.",
  license: "1132983",
  founded: 2014,
  projectsCompleted: "500+",
  warranty: "5-Year Workmanship Warranty",
  serviceArea: "San Francisco & the Peninsula",
  rating: 5.0,
  reviewCount: 3,
  url: "https://gadgetconstruction.com",
} as const;

export const SERVICES: Service[] = [
  {
    name: "Concrete Foundations & Slabs",
    slug: "concrete-foundations",
    shortDescription:
      "Engineered for SF's seismic demands and soil conditions",
    icon: "Landmark",
    metaTitle:
      "Concrete Foundations & Slabs in San Francisco, CA | Gadget Construction",
    metaDescription:
      "Expert concrete foundation and slab work in San Francisco. Seismic-compliant engineering, full permit handling, 5-year warranty. Free estimates. CA Lic #1132983.",
  },
  {
    name: "Retaining Walls",
    slug: "retaining-walls",
    shortDescription:
      "Structural solutions for San Francisco's steepest terrain",
    icon: "Layers",
    metaTitle:
      "Retaining Walls in San Francisco, CA | Gadget Construction",
    metaDescription:
      "Professional retaining wall construction in San Francisco. Engineered for hillside lots with integrated drainage. Free estimates. CA Lic #1132983.",
  },
  {
    name: "Complete Remodel",
    slug: "complete-remodel",
    shortDescription:
      "Transform your space without the stress, delays, or budget surprises",
    icon: "Hammer",
    metaTitle:
      "Home Remodeling in San Francisco, CA | Gadget Construction",
    metaDescription:
      "Full-service home remodeling in San Francisco. Kitchen, bathroom, whole-home renovations. Transparent pricing, permit handling, 5-year warranty. Free estimates.",
  },
  {
    name: "Composite Decks",
    slug: "composite-decks",
    shortDescription:
      "Low-maintenance outdoor living built to handle the fog",
    icon: "Fence",
    metaTitle:
      "Composite Decks in San Francisco, CA | Gadget Construction",
    metaDescription:
      "Composite deck building in San Francisco. Trex & TimberTech installations built for SF's marine climate. Free estimates. CA Lic #1132983.",
  },
  {
    name: "Roofing",
    slug: "roofing",
    shortDescription:
      "Weather-tight protection installed right the first time",
    icon: "Home",
    metaTitle:
      "Roofing Contractor in San Francisco, CA | Gadget Construction",
    metaDescription:
      "Trusted roofing contractor in San Francisco. Re-roofing, repairs, new construction on steep-pitch Victorian and Edwardian homes. Free estimates. CA Lic #1132983.",
  },
  {
    name: "ADU Construction",
    slug: "adu-construction",
    shortDescription:
      "Add living space, rental income, or property value to your lot",
    icon: "Building2",
    metaTitle:
      "ADU Construction in San Francisco, CA | Gadget Construction",
    metaDescription:
      "ADU contractor in San Francisco. Detached units, garage conversions, in-law suites. Full DBI permit handling. Free estimates. CA Lic #1132983.",
  },
];

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "You Call, We Listen",
    description:
      "Tell us about your project. We'll ask the right questions and schedule a free site visit.",
  },
  {
    number: 2,
    title: "Site Visit & Estimate",
    description:
      "We measure, assess, and deliver a detailed written estimate — typically within 48 hours.",
  },
  {
    number: 3,
    title: "Contract & Permits",
    description:
      "Once you approve, we handle all permits and paperwork with SF DBI.",
  },
  {
    number: 4,
    title: "Construction",
    description:
      "Our crew gets to work. You get weekly updates with photos.",
  },
  {
    number: 5,
    title: "Final Walkthrough",
    description:
      "We walk the project together. You don't sign off until you're 100% satisfied.",
  },
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: "FileCheck",
    title: "We Handle Every Permit",
    description:
      "SF's building department is notoriously complex. We navigate DBI so you don't have to.",
  },
  {
    icon: "ShieldCheck",
    title: "5-Year Workmanship Warranty",
    description:
      "If something's not right, we come back and fix it. Period.",
  },
  {
    icon: "DollarSign",
    title: "Transparent Pricing",
    description:
      "Detailed, written estimates before work begins. The price we quote is the price you pay.",
  },
  {
    icon: "MessageSquare",
    title: "Weekly Progress Updates",
    description:
      "You'll never wonder what's happening with your project. Photos and updates every week.",
  },
  {
    icon: "Sparkles",
    title: "Clean Sites, Every Day",
    description:
      "We respect your home. Tools stored, debris cleared, property protected — daily.",
  },
  {
    icon: "Users",
    title: "One Team, Start to Finish",
    description:
      "No subcontractor roulette. The crew you meet is the crew that builds.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Michael R.",
    projectType: "Complete Remodel",
    quote:
      "Gadget Construction transformed our 1940s Sunset District home into exactly what we envisioned. They handled everything — permits, inspections, the works. The crew showed up on time every single day and left the site spotless. We couldn't be happier with the result.",
    rating: 5,
    location: "Sunset District, SF",
  },
  {
    name: "Sarah & David L.",
    projectType: "Concrete Foundation",
    quote:
      "After the last earthquake, we knew our foundation needed work. Gadget Construction came out the next day, explained everything in plain English, and gave us a detailed estimate. The work was done on schedule and on budget. We sleep better at night now.",
    rating: 5,
    location: "Bernal Heights, SF",
  },
  {
    name: "Jennifer K.",
    projectType: "Composite Deck",
    quote:
      "We wanted a deck that could handle San Francisco weather without constant maintenance. Gadget Construction recommended composite and walked us through every option. Six months in and it still looks brand new. Best investment we've made in this house.",
    rating: 5,
    location: "Noe Valley, SF",
  },
];

export const STATS: Stat[] = [
  { value: "12", label: "Years in Business", suffix: "+" },
  { value: "500", label: "Projects Completed", suffix: "+" },
  { value: "5.0", label: "Google Rating", suffix: "★" },
  { value: "5", label: "Year Warranty", suffix: "-Yr" },
];

export const TRUST_BAR_ITEMS = [
  { icon: "Award", text: "CA License #1132983" },
  { icon: "Calendar", text: "12+ Years in Business" },
  { icon: "Briefcase", text: "500+ Projects Completed" },
  { icon: "Star", text: "5-Star Rated" },
  { icon: "Shield", text: "Bonded & Insured" },
];
