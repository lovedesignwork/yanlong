import { SIGNATURE_PLATES, type Plate } from "@/lib/content";
import { EditorialImage } from "@/components/EditorialImage";

type Props = {
  plates?: Plate[];
  heading?: React.ReactNode;
  note?: string;
};

export function Collection({
  plates = SIGNATURE_PLATES,
  heading,
  note,
}: Props) {
  return (
    <section
      style={{
        padding: "140px 0",
        background: "var(--paper-2)",
        position: "relative",
      }}
    >
      <div className="container-maison">
        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "end",
            marginBottom: 60,
            paddingBottom: 20,
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 16 }}>
              The Menu
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
              {heading ?? (
                <>
                  Six{" "}
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "var(--aubergine)",
                      fontWeight: 400,
                    }}
                  >
                    signatures,
                  </em>
                  <br />
                  from{" "}
                  <span style={{ color: "var(--gold)" }}>one</span> kitchen.
                </>
              )}
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 400,
              color: "var(--ink-soft)",
              lineHeight: 1.65,
              maxWidth: 420,
              justifySelf: "end",
              letterSpacing: "0.01em",
            }}
          >
            {note ??
              "From classic dim sum to slow-simmered broths and rich, savory stir-fries — and our signature Peking duck, the Best in Thailand. Six plates that hold the breadth of our kitchen."}

          </p>
        </div>

        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 36,
            position: "relative",
          }}
        >
          {plates.map((p) => (
            <article
              key={p.no}
              style={{ background: "var(--paper)", overflow: "hidden" }}
            >
              <div
                className="plate-img"
                style={{
                  aspectRatio: "6 / 4",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {p.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      background: "var(--gold)",
                      color: "var(--paper)",
                      padding: "8px 12px",
                      fontFamily: "var(--font-sans)",
                      fontSize: 9,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      zIndex: 2,
                      fontWeight: 500,
                    }}
                  >
                    {p.badge}
                  </span>
                )}
                <EditorialImage
                  src={p.image}
                  alt={p.title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: "28px 28px 32px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 32,
                    fontWeight: 400,
                    fontStyle: "italic",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    marginBottom: 12,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--ink-soft)",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                  }}
                >
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
