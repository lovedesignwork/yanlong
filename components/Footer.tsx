import Image from "next/image";
import { HOUSE } from "@/lib/content";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "50px 0 32px",
      }}
    >
      <div
        className="container-maison"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <Image
          src="/yan-long-logo.png"
          alt="Yan Long"
          width={120}
          height={48}
          style={{ objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "rgba(245,239,227,0.5)",
            textTransform: "uppercase",
          }}
        >
          © {new Date().getFullYear()} Yan Long Phuket · Royal Phuket City Hotel · Food Well Told
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "rgba(245,239,227,0.5)",
            textTransform: "uppercase",
          }}
        >
          Facebook · Instagram · LINE {HOUSE.line}
        </span>
      </div>
    </footer>
  );
}
