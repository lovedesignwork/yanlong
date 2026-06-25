import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow everyone, including AI crawlers (GPTBot, ClaudeBot,
      // PerplexityBot, Google-Extended, etc.) — full citation visibility.
      // Block only non-indexable surfaces.
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/_next/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
