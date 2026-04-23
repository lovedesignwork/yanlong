import { ROOMS } from "@/lib/content";

export function Rooms() {
  return (
    <section
      style={{ padding: "140px 0", background: "var(--paper-2)" }}
    >
      <div className="container-maison">
        <div style={{ textAlign: "center", marginBottom: 70 }}>
          <div className="kicker" style={{ marginBottom: 18 }}>
            Private Dining
          </div>
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
            one kitchen.
          </h2>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "var(--mute)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginTop: 16,
              fontWeight: 500,
            }}
          >
            Private · Family · Ceremony
          </div>
        </div>

        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {ROOMS.map((r) => (
            <article
              key={r.name}
              style={{
                background: "var(--paper)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.image}
                  alt={r.name}
                  className="editorial-img"
                />
              </div>
              <div
                style={{
                  padding: "28px 28px 32px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 30,
                    fontWeight: 400,
                    fontStyle: "italic",
                    marginBottom: 10,
                  }}
                >
                  {r.name}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    marginBottom: 16,
                    fontWeight: 500,
                  }}
                >
                  {r.capacity}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--ink-soft)",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    flex: 1,
                  }}
                >
                  {r.description}
                </p>
                <div
                  style={{
                    marginTop: 18,
                    fontFamily: "var(--font-sans)",
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    color: "var(--aubergine)",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Explore →
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
