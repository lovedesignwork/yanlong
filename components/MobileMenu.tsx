"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, HOUSE } from "@/lib/content";

const EMAIL = "yanlong@royalphuketcity.com";
const TEL = HOUSE.phone.replace(/[^0-9+]/g, "");
const LINE_URL = "https://line.me/R/ti/p/@yanlong";

/**
 * Full-screen mobile navigation overlay (portal to document.body).
 * Editorial / luxury feel — big serif links, numbered index, gold accents,
 * primary CTA, quick-contact buttons, footer. Desktop shows the inline nav
 * instead (this toggle is hidden ≥769px via the `.nav-toggle` class).
 */
export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close whenever the route changes.
  useEffect(() => setIsOpen(false), [pathname]);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
    document.body.style.overflow = "";
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!isOpen}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        background:
          "linear-gradient(160deg, #5b1e5a 0%, #3d1340 55%, #211c1a 100%)",
        color: "var(--paper)",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
        pointerEvents: isOpen ? "auto" : "none",
        transition: "opacity 320ms ease, visibility 320ms ease",
      }}
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% -8%, rgba(170,140,48,0.20), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top bar — wordmark + close */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "26px 24px 0",
        }}
      >
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          aria-label="Yan Long — Home"
          style={{ display: "block", lineHeight: 0, textDecoration: "none" }}
        >
          <Image
            src="/yan-long-logo.png"
            alt="Yan Long Chinese Restaurant"
            width={1024}
            height={256}
            priority
            style={{ height: 48, width: "auto", display: "block" }}
          />
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
          style={{
            display: "inline-flex",
            padding: 8,
            marginRight: -8,
            background: "transparent",
            border: "none",
            color: "var(--paper)",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flex: 1,
          minHeight: 0,
          flexDirection: "column",
          padding: "40px 24px 36px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 22,
            fontFamily: "var(--font-sans)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          <span
            style={{
              height: 1,
              width: 36,
              background:
                "linear-gradient(90deg, var(--gold), transparent)",
            }}
          />
          Menu
        </div>

        {/* Links */}
        <nav aria-label="Mobile navigation" style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              borderTop: "1px solid rgba(245,239,227,0.14)",
            }}
          >
            {NAV_LINKS.map((l, i) => {
              const active = isActive(l.href);
              return (
                <li
                  key={l.href}
                  style={{ borderBottom: "1px solid rgba(245,239,227,0.14)" }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "20px 2px",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.2em",
                          color: active
                            ? "var(--gold)"
                            : "rgba(194,165,74,0.5)",
                        }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: 34,
                          lineHeight: 1.05,
                          letterSpacing: "-0.01em",
                          color: active
                            ? "var(--gold)"
                            : "rgba(245,239,227,0.92)",
                        }}
                      >
                        {l.label}
                      </span>
                    </span>
                    <ArrowIcon
                      color={active ? "var(--gold)" : "rgba(245,239,227,0.28)"}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Primary CTA */}
        <div style={{ marginTop: 32 }}>
          <Link
            href="/reserve"
            onClick={() => setIsOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              width: "100%",
              padding: "18px 24px",
              background: "var(--gold)",
              color: "#211c1a",
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Reserve a Table
            <ArrowIcon color="#211c1a" small />
          </Link>

          {/* Quick contact */}
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <a href={`tel:${TEL}`} style={quickBtn}>
              Call
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={quickBtn}
            >
              LINE
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            borderTop: "1px solid rgba(245,239,227,0.14)",
            paddingTop: 22,
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <a
              href={`tel:${TEL}`}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "rgba(245,239,227,0.6)",
                textDecoration: "none",
              }}
            >
              {HOUSE.phone}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "rgba(245,239,227,0.6)",
                textDecoration: "none",
              }}
            >
              {EMAIL}
            </a>
          </div>
          <p
            style={{
              margin: 0,
              textAlign: "right",
              fontFamily: "var(--font-sans)",
              fontSize: 9,
              lineHeight: 1.6,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(194,165,74,0.55)",
            }}
          >
            Phuket Old Town
            <br />
            Royal Phuket City Hotel
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mounted && createPortal(overlay, document.body)}

      {/* Toggle — hidden on desktop via `.nav-toggle` (see globals.css) */}
      <button
        type="button"
        className="nav-toggle"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        style={{
          padding: 8,
          marginRight: -8,
          background: "transparent",
          border: "none",
          color: "var(--ink)",
          cursor: "pointer",
        }}
      >
        <MenuIcon />
      </button>
    </>
  );
}

const quickBtn: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px 16px",
  border: "1px solid rgba(194,165,74,0.35)",
  color: "rgba(245,239,227,0.9)",
  fontFamily: "var(--font-sans)",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  textDecoration: "none",
};

/* ---------- Inline icons (no icon dependency) ---------- */

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ color, small }: { color: string; small?: boolean }) {
  const s = small ? 16 : 20;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
