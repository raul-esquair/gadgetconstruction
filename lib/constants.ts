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
  serviceArea: "San Francisco & the Bay Area",
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
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Areas", href: "/service-areas" },
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
    name: "Cindy Olander",
    projectType: "General Construction",
    quote:
      "We had a great experience with Osmin and his team at Gadget Construction. He was a great communicator, arrived on time, kept the area clean, and completed the job early. His quality of work is high, and we are very happy with the work. We plan to use his company again in the near future.",
    rating: 5,
    location: "Bay Area, CA",
  },
  {
    name: "Srinivas Ketavarapu",
    projectType: "Exterior Repairs",
    quote:
      "The team from Gadget worked on a project at our house which involved repairing a window that had dry rot and had been the source of water leaks in rain. They did an outstanding job from end to end — they went through the permit process, did high quality work on the schedule that was promised (which is amazing for a contractor) and also took care of getting the inspection completed for the permit. They identified other areas of dry rot in windows and the roof and again, did a very good job of getting that work done with high quality and on time. I would highly recommend Gadget.",
    rating: 5,
    location: "Bay Area, CA",
  },
  {
    name: "Reeta Prasad",
    projectType: "Bathroom Remodel",
    quote:
      "We recently had our bathroom remodeled, and the experience was fantastic. The team was professional, always on time, and kept us updated throughout the process. The tile work and fixtures look amazing, and the project was completed within the promised timeline and budget. They left the space spotless each day, which we really appreciated. Highly recommend this company for anyone considering a bathroom remodel!",
    rating: 5,
    location: "Bay Area, CA",
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
