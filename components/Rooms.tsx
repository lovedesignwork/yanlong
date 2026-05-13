import { ROOMS, ROOM_OCCASIONS } from "@/lib/content";

export function Rooms() {
  return (
    <section style={{ padding: "140px 0", background: "var(--paper-2)" }}>
      <div className="container-maison">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2
            className="h2-section"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 84,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Private{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              Dining
            </em>
          </h2>
        </div>

        {/* Room Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            marginBottom: 64,
            maxWidth: 900,
            margin: "0 auto 64px",
          }}
        >
          {/* Boutique Rooms Card */}
          <div
            style={{
              background: "var(--paper)",
              padding: "40px 36px",
              borderRadius: 4,
              border: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 48,
                fontWeight: 300,
                color: "var(--gold)",
                marginBottom: 8,
              }}
            >
              3
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: "var(--ink)",
                marginBottom: 16,
                letterSpacing: "0.01em",
              }}
            >
              Boutique Rooms
            </h3>
            <div
              style={{
                fontSize: 15,
                color: "var(--ink-soft)",
                lineHeight: 1.7,
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--ink)" }}>Capacity:</strong> 10
                guests each
              </div>
              <div>
                <strong style={{ color: "var(--ink)" }}>Min. Spend:</strong>{" "}
                ฿7,500 – 9,000
              </div>
            </div>
          </div>

          {/* Grand Room Card */}
          <div
            style={{
              background: "var(--paper)",
              padding: "40px 36px",
              borderRadius: 4,
              border: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 48,
                fontWeight: 300,
                color: "var(--gold)",
                marginBottom: 8,
              }}
            >
              1
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: "var(--ink)",
                marginBottom: 16,
                letterSpacing: "0.01em",
              }}
            >
              Grand Room
            </h3>
            <div
              style={{
                fontSize: 15,
                color: "var(--ink-soft)",
                lineHeight: 1.7,
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--ink)" }}>Capacity:</strong> Up to
                50 guests
              </div>
              <div>
                <strong style={{ color: "var(--ink)" }}>Min. Spend:</strong>{" "}
                ฿30,000
              </div>
            </div>
          </div>
        </div>

        {/* Occasions */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
          }}
        >
          <div
            style={{
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-soft)",
              marginBottom: 16,
            }}
          >
            Perfect For
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {ROOM_OCCASIONS.map((occasion) => (
              <span
                key={occasion}
                style={{
                  fontSize: 17,
                  color: "var(--ink)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-serif)",
                }}
              >
                {occasion}
              </span>
            ))}
          </div>
        </div>

        {/* Room Images Grid */}
        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          {ROOMS.map((r) => (
            <div
              key={r.name}
              style={{
                overflow: "hidden",
                position: "relative",
                borderRadius: 4,
              }}
            >
              <div style={{ aspectRatio: "3 / 2", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.image}
                  alt={r.name}
                  className="editorial-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  padding: "20px 0 0",
                }}
              >
                <h4
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  {r.name}
                </h4>
                <span
                  style={{
                    fontSize: 14,
                    color: "var(--ink-soft)",
                  }}
                >
                  {r.capacity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
