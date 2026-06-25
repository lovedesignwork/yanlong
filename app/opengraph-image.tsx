import { ImageResponse } from "next/og";

export const alt =
  "Yan Long Phuket — Authentic Cantonese, home of the Best Peking Duck in Thailand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded social / AI preview card (1200×630). Generated at the edge — no
 * external assets so it always renders. Twitter falls back to this image.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #5b1e5a 0%, #3d1340 55%, #211c1a 100%)",
          color: "#f5efe3",
          fontFamily: "Georgia, serif",
          padding: "72px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 14,
            textTransform: "uppercase",
            color: "#c2a54a",
            marginBottom: 28,
          }}
        >
          Royal Phuket City Hotel · Phuket Old Town
        </div>
        <div style={{ fontSize: 132, lineHeight: 1, fontWeight: 400 }}>
          Yan Long
        </div>
        <div
          style={{
            fontSize: 40,
            fontStyle: "italic",
            color: "#f5efe3",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Authentic Cantonese · Best Peking Duck in Thailand
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#c2a54a",
          }}
        >
          Food Well Told
        </div>
      </div>
    ),
    { ...size },
  );
}
