import type { Metadata } from "next";
import { Reserve } from "@/components/Reserve";
import { BookingForm } from "@/components/BookingForm";
import { HOUSE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reserve a Table — Yan Long · Maison",
  description: `Reserve a table at Yan Long, Royal Phuket City Hotel. Concierge ${HOUSE.phone} · LINE ${HOUSE.line}.`,
};

export default function ReservePage() {
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
            La Réservation · Visit
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
            Book a{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--aubergine)",
                fontWeight: 400,
              }}
            >
              table
            </em>
            <br />
            at <span style={{ color: "var(--gold)" }}>Yan Long.</span>
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
            — Reservations · Walk-ins Welcome —
          </div>
          <p
            style={{
              maxWidth: 640,
              margin: "32px auto 0",
              fontSize: 19,
              fontStyle: "italic",
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Tell us when you would like to dine and how many guests will join
            you. Our concierge will confirm by email or phone within two hours.
          </p>
        </div>
      </section>

      {/* ============================ FORM ============================ */}
      <section
        id="book"
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
            {/* Sidebar — concierge details */}
            <aside
              style={{
                position: "sticky",
                top: 140,
                paddingRight: 24,
                borderRight: "1px solid var(--line)",
              }}
            >
              <div className="kicker" style={{ marginBottom: 18 }}>
                Direct Concierge
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
                Prefer to call?
              </h3>
              <div style={{ display: "grid", gap: 22, marginBottom: 36 }}>
                <Detail k="Phone" v={HOUSE.phone} href={`tel:${HOUSE.phone.replace(/-/g, "")}`} />
                <Detail k="LINE" v={HOUSE.line} />
                <Detail k="Hours" v={HOUSE.hours.daily} />
                <Detail k="Last Order" v="8:00 PM" />
                <Detail k="Address" v={`${HOUSE.address.line1}\n${HOUSE.address.line2}`} />
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
                Walk-ins welcome, should there be a seat. Private rooms confirmed
                within two hours of request.
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
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FOOTER PANEL ============================ */}
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
