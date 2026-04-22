import { STATS } from "@/lib/content";

export function Stats() {
  return (
    <div className="container-maison">
      <div
        className="grid-stats"
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "32px 0",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          marginTop: 80,
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "0 28px",
              borderLeft: i === 0 ? "none" : "1px solid var(--line)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 56,
                color: "var(--aubergine)",
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              {s.n}
              {"suffix" in s && s.suffix && (
                <em
                  style={{ fontStyle: "italic", color: "var(--gold)" }}
                >
                  {s.suffix}
                </em>
              )}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                letterSpacing: "0.3em",
                color: "var(--mute)",
                textTransform: "uppercase",
                marginTop: 10,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
