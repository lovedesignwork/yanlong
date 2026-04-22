export function Feature() {
  return (
    <section style={{ padding: "140px 0", position: "relative" }}>
      <div className="container-maison">
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="kicker" style={{ marginBottom: 16 }}>
            Cover Story · The House
          </div>
          <h2
            className="h2-section"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            A house of authentic{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              Szechwan,
            </em>
            <br />
            in the heart of{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              Phuket Old Town.
            </em>
          </h2>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "var(--mute)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginTop: 20,
              fontWeight: 500,
            }}
          >
            — Food Well Told —
          </div>
        </div>

        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div style={{ padding: "0 40px" }}>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 56,
                lineHeight: 1.05,
                fontWeight: 400,
                marginBottom: 28,
                letterSpacing: "-0.01em",
              }}
            >
              "Renowned for serving the
              <br />
              <span style={{ color: "var(--gold)" }}>
                Best Peking Duck in Thailand.
              </span>
              "
            </h3>
            <p
              className="drop-cap"
              style={{
                fontSize: 19,
                lineHeight: 1.7,
                color: "var(--ink-soft)",
                marginBottom: 18,
                fontWeight: 300,
              }}
            >
              Yan Long Chinese Restaurant sits on the first floor of the
              prestigious Royal Phuket City Hotel, in the heart of Phuket Old
              Town. Our kitchen offers an authentic taste of China — an
              exquisite selection of traditional dishes, prepared by chefs who
              follow time-honored cooking methods passed down through
              generations.
            </p>
            <p
              style={{
                fontSize: 19,
                lineHeight: 1.7,
                color: "var(--ink-soft)",
                marginBottom: 18,
                fontWeight: 300,
              }}
            >
              From classic dim sum to slow-simmered broths and rich, savory
              stir-fries — and our signature Peking duck, roasted to perfection
              for crispy skin and tender meat — every plate is crafted with
              precision, preserving the true flavors of classic Chinese
              heritage.
            </p>
            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "var(--aubergine)",
                  fontWeight: 400,
                  marginBottom: 6,
                }}
              >
                The Kitchen at Yan Long
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Royal Phuket City Hotel · Phuket Old Town
              </div>
            </div>
          </div>
          <div
            className="gold-inset"
            style={{ aspectRatio: "4 / 5", overflow: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1525755662778-989d0524087e?w=1400&q=85"
              alt="The signature Peking Duck at Yan Long"
              className="editorial-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
