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
  // SPIKE, deploy preview only: never merge. Proxies /dashboard to the Esquair
  // client hub to test Server Actions and cookies through a rewrite.
  // beforeFiles so it wins over this site's own /dashboard.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/dashboard", destination: "https://esquair-crm.vercel.app/dashboard" },
        { source: "/dashboard/:path*", destination: "https://esquair-crm.vercel.app/dashboard/:path*" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
