import type { Metadata } from "next";
import { Rooms } from "@/components/Rooms";
import { Reserve } from "@/components/Reserve";

export const metadata: Metadata = {
  title: "Private Dining & Rooms — Yan Long Phuket",
  description:
    "Three rooms, one kitchen. Private dining, celebrations, weddings and Lunar New Year at Yan Long, Royal Phuket City Hotel.",
};

export default function RoomsPage() {
  return (
    <>
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
            Private Dining
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
            Three{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              rooms,
            </em>
            <br />
            <span style={{ color: "var(--gold)" }}>one</span> kitchen.
          </h1>
          <p
            style={{
              maxWidth: 640,
              margin: "32px auto 0",
              fontSize: 19,
              fontStyle: "italic",
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            From a quiet table for two to a hundred-guest celebration. Each
            room is dressed by the same hands and served by the same kitchen.
            Private rooms are confirmed within two hours of request.
          </p>
        </div>
      </section>

      <Rooms />
      <Reserve />
    </>
  );
}
