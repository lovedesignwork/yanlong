import Link from "next/link";
import { HOUSE } from "@/lib/content";

export function Hero() {
  return (
    <section style={{ padding: "80px 0 100px" }}>
      <div
        className="container-maison grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 6fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div>
          <div className="kicker kicker-rule" style={{ marginBottom: 28 }}>
            Yan Long · Royal Phuket City
          </div>
          <h1
            className="h1-hero"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 152,
              lineHeight: 0.96,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
            }}
          >
            Food
            <br />
            <em style={{ fontStyle: "italic", color: "var(--aubergine)", fontWeight: 400 }}>
              Well
            </em>
            <br />
            <span style={{ color: "var(--gold)" }}>Told.</span>
          </h1>

          <div
            style={{
              marginTop: 36,
              paddingTop: 28,
              borderTop: "1px solid var(--line)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                lineHeight: 1.45,
                color: "var(--ink)",
                fontStyle: "italic",
                fontWeight: 400,
                marginBottom: 14,
                maxWidth: 520,
              }}
            >
              An authentic Chinese restaurant in Phuket. Szechwan
              (South-Western China) style cuisine.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 16,
                letterSpacing: "0.02em",
                color: "var(--gold)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              "Authentic Flavors, Timeless Tradition."
            </p>
          </div>

          <div
            style={{
              marginTop: 44,
              display: "flex",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/reserve" className="btn btn-p">
              Reserve a Table
            </Link>
            <Link href="/menu" className="btn btn-o">
              View the Menu →
            </Link>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            aspectRatio: "4 / 5",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "var(--paper)",
              textTransform: "uppercase",
              background: "rgba(91,30,90,0.85)",
              padding: "10px 14px",
              zIndex: 2,
            }}
          >
            01 — Signature · Xiaolongbao
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1518983546435-91f8b87fe561?w=1400&q=85"
            alt="Xiaolongbao folded by hand"
            className="editorial-img"
          />
          <div
            style={{
              position: "absolute",
              bottom: -1,
              left: -1,
              right: -1,
              background: "var(--paper)",
              padding: "20px 24px",
              borderTop: "1px solid var(--gold)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              № 01 · The Signature
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 20,
                color: "var(--ink)",
              }}
            >
              Xiaolongbao, folded by hand each morning.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
