import { HOUSE, RESERVATION_ROWS, SIGNATURE_PLATES } from "@/lib/content";

export function Reserve() {
  return (
    <section
      style={{
        padding: "160px 0",
        background: "var(--aubergine)",
        color: "var(--paper)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="container-maison grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 80,
          alignItems: "start",
          position: "relative",
        }}
      >
        <div>
          <div
            className="kicker"
            style={{ marginBottom: 24 }}
          >
            Reservations
          </div>
          <h2
            className="h2-reserve"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 104,
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              marginBottom: 32,
              color: "var(--paper)",
            }}
          >
            Book a{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--gold)",
                fontWeight: 400,
              }}
            >
              table
            </em>
            <br />
            at Yan Long.
          </h2>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.6,
              color: "rgba(245,239,227,0.75)",
              fontStyle: "italic",
              fontWeight: 300,
              maxWidth: 540,
            }}
          >
            Let us take you on a journey of taste and tradition. Book your
            table now and enjoy the finest authentic Chinese cuisine in Phuket
            — served on the first floor of the Royal Phuket City Hotel.
          </p>

          <div style={{ marginTop: 40, maxWidth: 540 }}>
            {RESERVATION_ROWS.map((r) => (
              <div
                key={r.k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(245,239,227,0.2)",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    paddingTop: 4,
                  }}
                >
                  {r.k}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    fontWeight: 400,
                    color: "var(--paper)",
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                    letterSpacing: "0.01em",
                  }}
                >
                  {r.v}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={`tel:${HOUSE.phone.replace(/-/g, "")}`} className="btn btn-g">
              Call · {HOUSE.phone}
            </a>
          </div>
        </div>

        <div
          style={{
            background: "rgba(245,239,227,0.06)",
            border: "1px solid rgba(245,239,227,0.18)",
            padding: "44px 40px",
          }}
        >
          <div
            style={{
              aspectRatio: "4 / 3",
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SIGNATURE_PLATES[0].image}
              alt="Peking Duck — Best in Thailand"
              className="editorial-img"
            />
          </div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 36,
              fontStyle: "italic",
              fontWeight: 400,
              marginBottom: 12,
              color: "var(--paper)",
            }}
          >
            Peking Duck, House Specialty.
          </h3>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "var(--gold)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: 28,
              fontWeight: 500,
            }}
          >
            {HOUSE.award}
          </div>
          <p
            style={{
              color: "rgba(245,239,227,0.7)",
              fontStyle: "italic",
              fontSize: 17,
              marginBottom: 28,
              lineHeight: 1.6,
            }}
          >
            Brined and air-dried for two days, then roasted to perfection —
            crispy skin, tender meat. Pre-order recommended; advance notice of
            forty-five minutes from the kitchen.
          </p>
          <a href={`tel:${HOUSE.phone.replace(/-/g, "")}`} className="btn btn-g">
            Pre-order the Duck →
          </a>
        </div>
      </div>
    </section>
  );
}
