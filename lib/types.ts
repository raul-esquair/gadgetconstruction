export interface Service {
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
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
