import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Authentic Cantonese in Phuket Old Town`,
    short_name: "Yan Long",
    description:
      "Authentic Cantonese restaurant in Phuket Old Town, home of the Best Peking Duck in Thailand. Royal Phuket City Hotel.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe3",
    theme_color: "#5b1e5a",
    icons: [
      {
        src: "/faviconyanlong.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
