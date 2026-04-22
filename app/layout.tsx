import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Yan Long · Maison — Authentic Chinese Restaurant in Phuket Old Town",
  description:
    "Yan Long is an authentic Chinese house in Phuket Old Town. Szechwan, Cantonese, Peking — by way of a state kitchen in Chengdu, 1998. Reservations: 061-172-9697.",
  keywords: [
    "Chinese restaurant Phuket",
    "Yan Long",
    "Peking Duck Phuket",
    "Royal Phuket City Hotel",
    "Phuket Old Town dining",
    "Chinese fine dining Thailand",
  ],
  openGraph: {
    title: "Yan Long · Maison",
    description:
      "An authentic Chinese house in Phuket Old Town. Food well told.",
    type: "website",
    locale: "en_US",
  },
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
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
