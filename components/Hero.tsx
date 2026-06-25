import Link from "next/link";
import Image from "next/image";

/**
 * Parchment-color halo so hero text stays legible against the photo.
 * Matches the parchment value (#f5efe3 / var(--paper)) used in the overlay
 * gradient — reads as a soft glow, not a hard drop-shadow.
 */
const PARCHMENT_HALO =
  "0 0 12px rgba(245,239,227,0.85), 0 0 28px rgba(245,239,227,0.65)";

const PARCHMENT_HALO_STRONG =
  "0 0 18px rgba(245,239,227,0.95), 0 0 36px rgba(245,239,227,0.85), 0 0 60px rgba(245,239,227,0.55)";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "100px 0 110px",
      }}
    >
      {/* ============ FULL-BLEED BACKGROUND IMAGE (LCP) ============ */}
      <Image
        src="/images/main-image.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center right",
          filter: "saturate(0.95) contrast(1.02)",
          zIndex: 0,
        }}
      />

      {/* Parchment fade — opaque enough on the left for text legibility,
          fully transparent on the right so the dining room photo dominates */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(245,239,227,0.96) 0%, rgba(245,239,227,0.92) 22%, rgba(245,239,227,0.55) 38%, rgba(245,239,227,0.12) 50%, rgba(245,239,227,0) 60%)",
          zIndex: 1,
        }}
      />

      {/* ============ TEXT CONTENT (LEFT) ============
          Parchment-glow text-shadow on every text element so the type stays
          legible where it sits over the image. The shadow color matches the
          gradient overlay (#f5efe3 / var(--paper)) so it reads as a soft halo
          rather than a drop-shadow. */}
      <div
        className="container-maison"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          // applies to every child unless overridden — soft parchment halo
          textShadow: PARCHMENT_HALO,
        }}
      >
        <div style={{ maxWidth: 580 }}>
          <div className="kicker kicker-rule" style={{ marginBottom: 28 }}>
            Yan Long · Royal Phuket City
          </div>
          <h1
            className="h1-hero"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 132,
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              // stronger halo for the giant headline
              textShadow: PARCHMENT_HALO_STRONG,
            }}
          >
            Food
            <br />
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              Well
            </em>{" "}
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
                maxWidth: 580,
                textShadow: PARCHMENT_HALO,
              }}
            >
              Authentic Cantonese cuisine in Phuket Old Town.
              <br />
              Home of the Best Peking Duck in Thailand.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 16,
                letterSpacing: "0.02em",
                color: "var(--gold)",
                fontStyle: "italic",
                fontWeight: 400,
                textShadow: PARCHMENT_HALO,
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
      </div>
    </section>
  );
}
