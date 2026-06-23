import { FAQS } from "@/lib/seo";

/**
 * Visible FAQ section. The on-page copy mirrors the FAQPage JSON-LD exactly,
 * so AI answer engines (ChatGPT, Gemini, Perplexity, AI Overviews) can quote
 * self-contained, ~30–50 word answers. Each item has a persistent anchor ID.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      style={{ padding: "140px 0", background: "var(--paper)" }}
    >
      <div className="container-maison">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            className="kicker"
            style={{
              marginBottom: 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 44,
                height: 1,
                background: "var(--gold)",
              }}
            />
            Good to Know
            <span
              style={{
                display: "inline-block",
                width: 44,
                height: 1,
                background: "var(--gold)",
              }}
            />
          </div>
          <h2
            id="faq-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 64,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Frequently asked{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              questions
            </em>
          </h2>
        </div>

        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            display: "grid",
            gap: 0,
          }}
        >
          {FAQS.map((f, i) => {
            const slug = f.q
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            return (
              <div
                key={slug}
                id={`faq-${slug}`}
                style={{
                  padding: "32px 0",
                  borderTop: i === 0 ? "1px solid var(--line)" : "none",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 26,
                    fontWeight: 400,
                    lineHeight: 1.3,
                    color: "var(--ink)",
                    marginBottom: 14,
                  }}
                >
                  {f.q}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: "var(--ink-soft)",
                    letterSpacing: "0.01em",
                    maxWidth: 720,
                  }}
                >
                  {f.a}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
