import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { abs } from "@/lib/seo";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    { url: abs("/blog"), changeFrequency: "weekly", priority: 0.8 },
    ...(await getPublishedPosts()).map(post => ({ url: abs(`/blog/${post.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
