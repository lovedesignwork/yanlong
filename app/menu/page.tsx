import type { Metadata } from "next";
import { Collection } from "@/components/Collection";
import { Reserve } from "@/components/Reserve";

export const metadata: Metadata = {
  title: "Menu — Yan Long · Authentic Chinese in Phuket",
  description:
    "From classic dim sum to slow-simmered broths and rich stir-fries — and our signature Peking duck, Best in Thailand. Authentic Chinese flavors, crafted with care.",
};

export default function MenuPage() {
  return (
    <>
      <section style={{ padding: "120px 0 60px" }}>
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
            Our Menu
            <span
              style={{
                display: "inline-block",
                width: 44,
                height: 1,
                background: "var(--gold)",
              }}
            />
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
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            Authentic{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              Chinese
            </em>{" "}
            <span style={{ color: "var(--gold)" }}>flavors,</span>
            <br />
            crafted with care.
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
            — Food Well Told —
          </div>
          <p
            style={{
              maxWidth: 680,
              margin: "32px auto 0",
              fontSize: 19,
              fontStyle: "italic",
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            From the comforting warmth of hand-folded dim sum to our signature
            Peking duck — the Best in Thailand — every plate celebrates authentic
            Cantonese tradition. Crafted with fresh local ingredients, served with
            care. The full carte is presented at table.
          </p>
        </div>
      </section>

      <Collection
        heading={
          <>
            Six{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              signatures,
            </em>
            <br />
            from one kitchen.
          </>
        }
        note="A selection from our printed menu — Cantonese and Peking traditions served from the first floor of the Royal Phuket City Hotel in Phuket Old Town."
      />

      <Reserve />
    </>
  );
}
