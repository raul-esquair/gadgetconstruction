import type { Service, Testimonial, ProcessStep, Differentiator, Stat } from "./types";

export const COMPANY = {
  name: "Gadget Construction Inc.",
  shortName: "Gadget Construction",
  phone: "(650) 771-5817",
  phoneHref: "tel:+16507715817",
  tagline: "Built Right. On Time. Guaranteed.",
  license: "1132983",
  founded: 2014,
  projectsCompleted: "500+",
  warranty: "5-Year Workmanship Warranty",
  serviceArea: "San Francisco & the Bay Area",
  rating: 5.0,
  reviewCount: 3,
  url: "https://gadgetconstructionsf.com",
  address: {
    street: "168 Hyde St. Apt. 301",
    city: "San Francisco",
    region: "CA",
    postalCode: "94102",
    country: "US",
    full: "168 Hyde St. Apt. 301, San Francisco, CA 94102",
  },
} as const;

export const SERVICES: Service[] = [
  {
    name: "Concrete Foundations & Slabs",
    slug: "concrete-foundations",
    shortDescription:
      "Engineered for the Bay Area's seismic demands and soil conditions",
    icon: "Landmark",
    image: "/images/concrete-foundations.jpg",
    metaTitle:
      "Concrete Foundations & Slabs in the Bay Area | Gadget Construction",
    metaDescription:
      "Expert concrete foundation and slab work across the San Francisco Bay Area. Seismic-compliant engineering, full permit handling, 5-year warranty. Serving 31 cities. CA Lic #1132983.",
  },
  {
    name: "Retaining Walls",
    slug: "retaining-walls",
    shortDescription:
      "Structural solutions for the Bay Area's steepest terrain",
    icon: "Layers",
    image: "/images/retaining-walls.jpg",
    metaTitle:
      "Retaining Walls in the San Francisco Bay Area | Gadget Construction",
    metaDescription:
      "Professional retaining wall construction across the Bay Area — from Marin's hillsides to SF and the Peninsula. Engineered drainage, full permits. CA Lic #1132983.",
  },
  {
    name: "Complete Remodel",
    slug: "complete-remodel",
    shortDescription:
      "Transform your space without the stress, delays, or budget surprises",
    icon: "Hammer",
    image: "/images/complete-remodel.jpg",
    metaTitle:
      "Home Remodeling in the San Francisco Bay Area | Gadget Construction",
    metaDescription:
      "Full-service home remodeling across the Bay Area. Kitchen, bathroom, whole-home renovations. Transparent pricing, permit handling, 5-year warranty. 31 cities served.",
  },
  {
    name: "Composite Decks",
    slug: "composite-decks",
    shortDescription:
      "Low-maintenance outdoor living built for coastal Bay Area weather",
    icon: "Fence",
    image: "/images/composite-decks.jpg",
    metaTitle:
      "Composite Decks in the San Francisco Bay Area | Gadget Construction",
    metaDescription:
      "Composite deck building across the Bay Area. Trex & TimberTech installations built for coastal fog and salt air. Serving 31 cities. CA Lic #1132983.",
  },
  {
    name: "Roofing",
    slug: "roofing",
    shortDescription:
      "Weather-tight protection installed right the first time",
    icon: "Home",
    image: "/images/roofing.jpg",
    metaTitle:
      "Roofing Contractor in the San Francisco Bay Area | Gadget Construction",
    metaDescription:
      "Trusted Bay Area roofing contractor. Re-roofing, repairs, and new construction — from Victorians to modern builds. Serving 31 cities. CA Lic #1132983.",
  },
  {
    name: "ADU Construction",
    slug: "adu-construction",
    shortDescription:
      "Add living space, rental income, or property value to your lot",
    icon: "Building2",
    image: "/images/adu-construction.jpg",
    metaTitle:
      "ADU Construction in the San Francisco Bay Area | Gadget Construction",
    metaDescription:
      "Bay Area ADU contractor serving 31 cities. Detached units, garage conversions, in-law suites. Full permit handling for every jurisdiction. CA Lic #1132983.",
  },
  {
    name: "Exterior Repairs",
    slug: "exterior-repairs",
    shortDescription:
      "Dry rot, stucco, and siding repair for Bay Area homes built to survive fog and salt air",
    icon: "Wrench",
    image: "/images/why-choose-us-bg.jpg",
    metaTitle:
      "Dry Rot, Stucco & Siding Repair in the Bay Area | Gadget Construction",
    metaDescription:
      "Expert exterior repairs across the San Francisco Bay Area — dry rot removal, stucco repair, and Hardie/wood/composite siding. Licensed Class B contractor. 5-year warranty. 31 cities served. CA Lic #1132983.",
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
      "Once you approve, we handle all permits and paperwork with your local building department.",
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
      "Bay Area building departments are notoriously complex. We navigate permits across all 31 cities we serve so you don't have to.",
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
