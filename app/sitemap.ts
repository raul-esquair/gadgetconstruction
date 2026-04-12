import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SERVICE_AREAS } from "@/lib/service-areas-data";

const BASE_URL = "https://gadgetconstruction.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/gallery`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/service-areas`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const cityPages: MetadataRoute.Sitemap = SERVICE_AREAS.map((city) => ({
    url: `${BASE_URL}/service-areas/${city.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: city.tier === 1 ? 0.8 : city.tier === 2 ? 0.7 : 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...cityPages];
}
