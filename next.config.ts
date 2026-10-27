import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep article metadata in the initial head for crawlers and social previews.
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
