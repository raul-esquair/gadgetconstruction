import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80, 85],
  },
  experimental: {
    inlineCss: true,
  },
  // Roofing was retired as a service. The URL was indexed, so send its
  // equity to the services hub rather than serving a 404.
  async redirects() {
    return [
      {
        source: "/services/roofing",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
