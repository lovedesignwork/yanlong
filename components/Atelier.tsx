import { PILLARS } from "@/lib/content";

export function Atelier() {
  return (
    <section style={{ padding: "160px 0" }}>
      <div
        className="container-maison grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "4 / 5",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1400&q=85"
            alt="The atelier table setting"
            className="editorial-img"
          />
          <span
            style={{
              position: "absolute",
              bottom: 28,
              left: 28,
              background: "var(--paper)",
              padding: "14px 18px",
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "var(--aubergine)",
              textTransform: "uppercase",
              fontWeight: 500,
              borderLeft: "2px solid var(--gold)",
            }}
          >
            The Atelier · since 2019
          </span>
        </div>

        <div>
          <div className="kicker" style={{ marginBottom: 20 }}>
            L'Atelier · Bold Flavors, Authentic Recipes
          </div>
          <h2
            className="h2-section"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 84,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: 36,
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
              quiet
            </em>
            <br />
            inheritances.
          </h2>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.65,
              color: "var(--ink-soft)",
              marginBottom: 20,
              fontWeight: 300,
            }}
          >
            We honor the rich traditions of Chinese cuisine by using authentic
            cooking methods passed down through generations. Every Chinese
            kitchen keeps a handful of inherited gestures. Ours are three: the
            breath — <em>wok hei</em> — the split-second alchemy of fire and
            oil; the hand, folding; and patience: a duck, brined and air-dried
            for two days before it is ever touched.
          </p>

          <div
            style={{
              marginTop: 44,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
              paddingTop: 36,
              borderTop: "1px solid var(--line)",
            }}
          >
            {PILLARS.map((p, i) => (
              <div key={p.en}>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 40,
                    fontWeight: 300,
                    color: "var(--gold)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: 14,
                  }}
                >
                  0{i + 1}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 24,
                    color: "var(--aubergine)",
                    fontWeight: 400,
                    marginBottom: 8,
                  }}
                >
                  {p.en}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    color: "var(--ink-soft)",
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  {p.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
