import type { Metadata } from "next";
import { Rooms } from "@/components/Rooms";
import { Reserve } from "@/components/Reserve";
import { JsonLd } from "@/components/JsonLd";
import { EditorialImage } from "@/components/EditorialImage";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Private Dining & Rooms",
  description:
    "Four private rooms for business hosting, family reunions and celebrations. 3 Boutique Rooms (10 pax) and 1 Grand Room (50 pax) at Yan Long, Royal Phuket City Hotel.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Dining Rooms", path: "/rooms" },
        ])}
      />
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
            Private Dining
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
            Four{" "}
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
            <span style={{ color: "var(--gold)" }}>one</span> kitchen.
          </h1>
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
            Perfect for business hosting, family reunions and birthday celebrations.
            Each room is dressed by the same hands and served by the same kitchen.
            Private rooms are confirmed within two hours of request.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginTop: 60,
              maxWidth: 900,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                overflow: "hidden",
                borderRadius: 4,
              }}
            >
              <EditorialImage
                src="/images/NEW/Private room1.jpg"
                alt="Private dining boutique room at Yan Long, Phuket Old Town"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                overflow: "hidden",
                borderRadius: 4,
              }}
            >
              <EditorialImage
                src="/images/NEW/Private room2.jpg"
                alt="Grand private dining room set for an event at Yan Long, Phuket"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          </div>
        </div>
      </section>

      <Rooms />
      <Reserve />
    </>
  );
}
