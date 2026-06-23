import type { Metadata } from "next";
import { Feature } from "@/components/Feature";
import { Atelier } from "@/components/Atelier";
import { Stats } from "@/components/Stats";
import { Reserve } from "@/components/Reserve";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The Atelier — Bold Flavors, Authentic Recipes",
  description:
    "The kitchen at Yan Long. Authentic Cantonese cooking and the Best Peking Duck in Thailand, crafted with care. Three quiet inheritances: wok hei, the hand, and patience.",
  alternates: { canonical: "/atelier" },
};

export default function AtelierPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Food Well Told", path: "/atelier" },
        ])}
      />
      <section style={{ padding: "120px 0 40px" }}>
        <div className="container-maison" style={{ textAlign: "center" }}>
          <div
            className="kicker"
            style={{
              marginBottom: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 44,
                height: 1,
                background: "var(--gold)",
              }}
            />
            Food Well Told
          </div>
          <h1
            className="h1-hero"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 112,
              lineHeight: 0.96,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              maxWidth: 1000,
              margin: "0 auto",
            }}
          >
            Bold{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              flavors,
            </em>
            <br />
            authentic{" "}
            <span style={{ color: "var(--gold)" }}>recipes.</span>
          </h1>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "var(--mute)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginTop: 24,
              fontWeight: 500,
            }}
          >
            — The Kitchen at Yan Long —
          </div>
          <p
            style={{
              maxWidth: 720,
              margin: "32px auto 0",
              fontSize: 19,
              fontStyle: "italic",
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            We honor the rich traditions of Chinese cuisine by using authentic
            cooking methods passed down through generations. From wok-fired
            stir-fries to slow-simmered broths and our signature Peking duck —
            roasted to perfection for crispy skin and tender meat — every plate
            preserves the true flavors of classic Chinese heritage.
          </p>
        </div>
      </section>

      <Stats />
      <Feature />
      <Atelier />
      <Reserve />
    </>
  );
}
