import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ) => ({ url: abs(path), lastModified: now, changeFrequency, priority });

  return [
    page("/", 1.0, "weekly"),
    page("/menu", 0.9, "weekly"),
    page("/reserve", 0.9, "monthly"),
    page("/rooms", 0.8, "monthly"),
    page("/atelier", 0.7, "monthly"),
    page("/contact", 0.7, "monthly"),
  ];
}
