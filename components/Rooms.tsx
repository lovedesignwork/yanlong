import { ROOMS } from "@/lib/content";

export function Rooms() {
  return (
    <section
      style={{ padding: "140px 0", background: "var(--paper-2)" }}
    >
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

        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {ROOMS.map((r) => (
            <div
              key={r.name}
              style={{
                aspectRatio: "6 / 4",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.image}
                alt={r.name}
                className="editorial-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
