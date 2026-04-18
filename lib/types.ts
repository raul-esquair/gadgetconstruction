export interface Service {
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Testimonial {
  name: string;
  projectType: string;
  quote: string;
  rating: number;
  location?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: string;
  relatedService?: string;
  readingTime: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface Differentiator {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface CityData {
  slug: string;
  name: string;
  county: string;
  tier: 1 | 2 | 3;
  population: string;
  medianHomeValue: string;
  permitAuthority: string;
  heroHeadline: string;
  heroSubheadline: string;
  intro: string[];
  constructionInsight: {
    heading: string;
    description: string;
  };
  housingStock: string;
  topServices: string[]; // slugs from SERVICES
  neighboringCities: string[]; // slugs of nearby cities
  faqs: FAQ[];
  metaDescription: string;
}
