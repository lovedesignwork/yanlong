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
            src="/images/CU04_couple_wineglass_silk_P.jpg"
            alt="A couple toasting in the Silk Room at Yan Long"
            className="editorial-img"
          />
        </div>

        <div>
          <div className="kicker" style={{ marginBottom: 20 }}>
            Authentic Recipes
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
