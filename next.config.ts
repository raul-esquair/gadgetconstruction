import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80, 85],
  },
  experimental: {
    inlineCss: true,
  },
  // Retired services. Their URLs were indexed, so send the equity to the
  // hubs rather than serving a 404. ADU gets the hub, not structural-repairs:
  // an ADU searcher landing on a repair page is a worse outcome than a list.
  async redirects() {
    return [
      {
        source: "/services/roofing",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/adu-construction",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/blog/adu-construction-san-francisco-guide",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
