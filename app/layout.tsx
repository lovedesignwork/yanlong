import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  restaurantSchema,
  websiteSchema,
  menuSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yan Long — Authentic Chinese Restaurant in Phuket Old Town",
    template: "%s · Yan Long Phuket",
  },
  description:
    "Yan Long is an authentic Cantonese restaurant in Phuket Old Town, home of the Best Peking Duck in Thailand. First floor, Royal Phuket City Hotel. Open daily 11:00–22:00. Reservations: 061-172-9697.",
  applicationName: SITE_NAME,
  keywords: [
    "Chinese restaurant Phuket",
    "Yan Long",
    "Peking Duck Phuket",
    "Best Peking Duck Thailand",
    "Cantonese restaurant Phuket Old Town",
    "dim sum Phuket",
    "Royal Phuket City Hotel restaurant",
    "Chinese fine dining Thailand",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yan Long Phuket — Best Peking Duck in Thailand",
    description:
      "An authentic Cantonese house in Phuket Old Town. Home of the Best Peking Duck in Thailand. Food well told.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/NEW/Peking Duck.jpg",
        width: 1200,
        height: 630,
        alt: "Peking Duck at Yan Long Phuket — Best in Thailand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yan Long Phuket — Best Peking Duck in Thailand",
    description:
      "Authentic Cantonese restaurant in Phuket Old Town. Royal Phuket City Hotel. Open daily.",
    images: ["/images/NEW/Peking Duck.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <JsonLd
          data={[
            restaurantSchema(),
            websiteSchema(),
            menuSchema(),
            faqSchema(),
          ]}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
