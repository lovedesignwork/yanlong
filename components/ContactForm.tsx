"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  submitContact,
  type ContactActionState,
} from "@/app/actions/contact";
import CountryPhoneSelector from "./CountryPhoneSelector";

const initialState: ContactActionState = {
  ok: false,
  message: "",
};

const INQUIRY_TYPES = [
  "General Inquiry",
  "Private Function & Events",
  "Wedding & Special Occasions",
  "Corporate · Group Booking",
  "Press & Media",
  "Partnership",
  "Feedback & Suggestions",
  "Other",
] as const;

export function ContactForm() {
  const [state, formAction, pending] = useActionState<
    ContactActionState,
    FormData
  >(submitContact, initialState);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.ok && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state.ok]);

  if (state.ok) {
    return (
      <div ref={successRef} style={successWrap}>
        <div className="kicker" style={{ marginBottom: 18 }}>
          Message Sent · Merci
        </div>
        <h3 style={successHead}>
          Thank you. Your{" "}
          <em style={{ fontStyle: "italic", color: "var(--aubergine)" }}>
            message
          </em>{" "}
          is on its way.
        </h3>
        <p style={successBody}>{state.message}</p>
        <div
          style={{
            marginTop: 36,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a href="/menu" className="btn btn-o">
            View the Menu
          </a>
          <a href="/reserve" className="btn btn-p">
            Reserve a Table
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate style={{ display: "block" }}>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />

      {/* ============================================================ */}
      {/* SECTION 01 — INQUIRY */}
      {/* ============================================================ */}
      <Section kicker="01 — Inquiry" title="What can we help you with?">
        <div style={duoGrid}>
          <Field label="Inquiry Type">
            <select
              name="inquiryType"
              defaultValue={INQUIRY_TYPES[0]}
              style={inputStyle}
            >
              {INQUIRY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Subject" hint="Optional">
            <input
              type="text"
              name="subject"
              placeholder="e.g. Birthday for 12 guests"
              style={inputStyle}
            />
          </Field>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* SECTION 02 — YOU */}
      {/* ============================================================ */}
      <Section kicker="02 — You" title="How shall we reach you?">
        <div style={duoGrid}>
          <Field label="Full Name" error={state.errors?.fullName}>
            <input
              type="text"
              name="fullName"
              required
              autoComplete="name"
              placeholder="Mr. or Ms. ___"
              style={inputStyle}
            />
          </Field>
          <Field label="Email" error={state.errors?.email}>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              style={inputStyle}
            />
          </Field>
          <Field label="Phone" error={state.errors?.phone}>
            <CountryPhoneSelector
              name="phone"
              required
              defaultCountry="TH"
              ariaInvalid={!!state.errors?.phone}
            />
          </Field>
          <Field label="Country" hint="Optional">
            <input
              type="text"
              name="country"
              autoComplete="country-name"
              placeholder="Thailand, France, Japan…"
              style={inputStyle}
            />
          </Field>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* SECTION 03 — MESSAGE */}
      {/* ============================================================ */}
      <Section kicker="03 — Message" title="Tell us more.">
        <Field
          label="Your Message"
          error={state.errors?.message}
          hint="At least a few sentences — the more context, the better we can help."
          full
        >
          <textarea
            name="message"
            rows={8}
            required
            placeholder="Hello Yan Long team,&#10;&#10;I am writing to enquire about…"
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: 200,
              lineHeight: 1.6,
            }}
          />
        </Field>
      </Section>

      {/* ============================================================ */}
      {/* SUBMIT */}
      {/* ============================================================ */}
      <div style={{ marginTop: 56 }}>
        {!state.ok && state.message && (
          <div style={errorBanner}>{state.message}</div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            paddingTop: 32,
            borderTop: "1px solid var(--line)",
            flexWrap: "wrap",
          }}
        >
          <p style={fineprint}>
            By submitting, you agree to be contacted by Yan Long. We do not
            share your details and will reply within one business day.
          </p>
          <button
            type="submit"
            disabled={pending}
            className="btn btn-p"
            style={{
              minWidth: 240,
              padding: "18px 32px",
              opacity: pending ? 0.6 : 1,
            }}
          >
            {pending ? "Sending …" : "Send Message →"}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ===================== Layout primitives ===================== */

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={sectionWrap}>
      <div style={{ marginBottom: 32 }}>
        <div className="kicker" style={{ marginBottom: 14 }}>
          {kicker}
        </div>
        <h3 style={sectionTitle}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  hint,
  children,
  full,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <div style={fieldHead}>
        <label style={fieldLabel}>{label}</label>
      </div>
      {children}
      {(hint || error) && (
        <div
          style={{
            marginTop: 8,
            fontFamily: "var(--font-sans)",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: error ? "var(--aubergine)" : "var(--mute)",
            fontWeight: error ? 500 : 400,
          }}
        >
          {error ?? hint}
        </div>
      )}
    </div>
  );
}

/* ===================== Styles ===================== */

const sectionWrap: React.CSSProperties = {
  paddingBottom: 56,
  marginBottom: 56,
  borderBottom: "1px solid var(--line)",
};

const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
  fontSize: 36,
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
};

const duoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 18px",
  background: "var(--paper)",
  border: "1px solid var(--line)",
  borderRadius: 0,
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  fontWeight: 400,
  letterSpacing: "0.01em",
  color: "var(--ink)",
  outline: "none",
  transition: "border-color 200ms",
  appearance: "none",
};

const fieldHead: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10,
};

const fieldLabel: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 10,
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "var(--ink-soft)",
  fontWeight: 500,
};

const errorBanner: React.CSSProperties = {
  background: "rgba(91,30,90,0.08)",
  borderLeft: "2px solid var(--aubergine)",
  padding: "16px 20px",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: "0.01em",
  color: "var(--aubergine)",
  marginBottom: 24,
};

const fineprint: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 12,
  fontWeight: 400,
  color: "var(--mute)",
  maxWidth: 440,
  lineHeight: 1.55,
  letterSpacing: "0.01em",
};

const successWrap: React.CSSProperties = {
  textAlign: "center",
  padding: "80px 32px",
  background: "var(--paper-2)",
  border: "1px solid var(--line)",
};

const successHead: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontWeight: 300,
  fontSize: 56,
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  marginBottom: 24,
};

const successBody: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 16,
  color: "var(--ink-soft)",
  maxWidth: 560,
  margin: "0 auto",
  lineHeight: 1.65,
  fontWeight: 400,
  letterSpacing: "0.01em",
};
