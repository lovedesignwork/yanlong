import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reserve } from "@/components/Reserve";
import { HOUSE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Yan Long Phuket",
  description: `Get in touch with Yan Long, Royal Phuket City Hotel. Concierge ${HOUSE.phone} · LINE ${HOUSE.line}. For private functions, weddings, press and general inquiries.`,
};

const PRIMARY_EMAIL = "yanlong@royalphuketcity.com";

export default function ContactPage() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section style={{ padding: "120px 0 40px" }}>
        <div className="container-maison" style={{ textAlign: "center" }}>
          <div
            className="kicker"
            style={{
              marginBottom: 20,
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
            Get in Touch
          </div>
          <h1
            className="h1-hero"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 112,
              lineHeight: 0.96,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              maxWidth: 1000,
              margin: "0 auto",
            }}
          >
            Stay in{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              touch
            </em>
            <br />
            with{" "}
            <span style={{ color: "var(--gold)" }}>Yan Long.</span>
          </h1>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "var(--mute)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginTop: 24,
              fontWeight: 500,
            }}
          >
            — Press · Private Functions · Weddings · General Inquiries —
          </div>
          <p
            style={{
              maxWidth: 640,
              margin: "32px auto 0",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 19,
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Whether you would like to host a celebration, write a feature on
            the kitchen, or simply share a thought after your last meal — we
            would love to hear from you.
          </p>
        </div>
      </section>

      {/* ============================ FORM ============================ */}
      <section
        id="form"
        style={{
          padding: "80px 0 140px",
          background: "var(--paper-2)",
          position: "relative",
        }}
      >
        <div className="container-maison">
          <div
            className="grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Sidebar */}
            <aside
              style={{
                position: "sticky",
                top: 140,
                paddingRight: 24,
                borderRight: "1px solid var(--line)",
              }}
            >
              <div className="kicker" style={{ marginBottom: 18 }}>
                Direct Lines
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 36,
                  fontWeight: 400,
                  lineHeight: 1.15,
                  marginBottom: 28,
                  color: "var(--ink)",
                }}
              >
                Reach us directly.
              </h3>
              <div style={{ display: "grid", gap: 22, marginBottom: 36 }}>
                <Detail
                  k="Email"
                  v={PRIMARY_EMAIL}
                  href={`mailto:${PRIMARY_EMAIL}`}
                />
                <Detail
                  k="Phone"
                  v={HOUSE.phone}
                  href={`tel:${HOUSE.phone.replace(/-/g, "")}`}
                />
                <Detail k="LINE" v={HOUSE.line} />
                <Detail k="Hours" v={HOUSE.hours.daily} />
                <Detail
                  k="Address"
                  v={`${HOUSE.address.line1}\n${HOUSE.address.line2}`}
                />
                <Detail k="Social" v="Facebook · Instagram" />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "var(--mute)",
                  lineHeight: 1.65,
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
              >
                For table reservations, please use our{" "}
                <a
                  href="/reserve"
                  style={{
                    color: "var(--aubergine)",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  booking form
                </a>
                . For all other inquiries, write to us here.
              </p>
            </aside>

            {/* Form */}
            <div
              style={{
                background: "var(--paper)",
                padding: "56px 56px",
                border: "1px solid var(--line)",
              }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ RESERVE PANEL ============================ */}
      <Reserve />
    </>
  );
}

function Detail({ k, v, href }: { k: string; v: string; href?: string }) {
  const valueEl = (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 15,
        fontWeight: 400,
        color: "var(--ink)",
        lineHeight: 1.5,
        whiteSpace: "pre-line",
        letterSpacing: "0.01em",
      }}
    >
      {v}
    </span>
  );
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: "var(--gold)",
          textTransform: "uppercase",
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {k}
      </div>
      {href ? (
        <a href={href} style={{ textDecoration: "none" }}>
          {valueEl}
        </a>
      ) : (
        valueEl
      )}
    </div>
  );
}
