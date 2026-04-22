import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/content";

export function Nav() {
  return (
    <nav
      style={{
        padding: "20px 0",
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(245,239,227,0.95)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div
        className="container-maison"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* ============ LEFT — LOGO ============ */}
        <Link
          href="/"
          aria-label="Yan Long — Home"
          style={{
            display: "block",
            lineHeight: 0,
            justifySelf: "start",
          }}
        >
          <Image
            src="/yan-long-logo.png"
            alt="Yan Long Chinese Restaurant"
            width={1024}
            height={256}
            priority
            style={{
              height: 48,
              width: "auto",
              display: "block",
            }}
          />
        </Link>

        {/* ============ MIDDLE — MENU ============ */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: 36,
            justifyContent: "center",
            justifySelf: "center",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--ink-soft)",
                transition: "color 200ms",
                fontWeight: 500,
              }}
              className="hover-aubergine"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* ============ RIGHT — RESERVE ============ */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            justifySelf: "end",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Link href="/reserve" className="btn btn-p">
            Reserve
          </Link>
        </div>
      </div>

      <style>{`
        .hover-aubergine:hover { color: var(--aubergine) !important; }
      `}</style>
    </nav>
  );
}
