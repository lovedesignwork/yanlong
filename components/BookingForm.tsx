"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  submitReservation,
  type ReserveActionState,
} from "@/app/actions/reserve";
import CountryPhoneSelector from "./CountryPhoneSelector";
import CalendarPicker from "./CalendarPicker";

const initialState: ReserveActionState = {
  ok: false,
  message: "",
};

const ROOMS = [
  "No preference",
  "La Grande Salle · Main Dining",
  "La Salle Privée · Private Room",
  "Le Salon de Cérémonie · Ceremony Hall",
] as const;

const OCCASIONS = [
  "—",
  "Birthday",
  "Anniversary",
  "Business Dinner",
  "Family Reunion",
  "Wedding / Engagement",
  "Lunar New Year",
  "Other",
] as const;

/**
 * Continuous time slots — restaurant operates 11:00 AM to 8:00 PM (last order)
 * as a single window. Every 30 minutes from 11:00 to 20:00.
 */
const TIME_SLOTS: string[] = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00",
];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function BookingForm() {
  const [state, formAction, pending] = useActionState<ReserveActionState, FormData>(
    submitReservation,
    initialState,
  );

  const [time, setTime] = useState<string>("19:00");
  // Date is set on client only to avoid SSR/CSR timezone mismatch.
  const [date, setDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);

  // Initialize date on client to today (avoids hydration mismatch)
  useEffect(() => {
    const t = todayISO();
    setDate(t);
    setMinDate(t);
  }, []);

  // Scroll to success message
  useEffect(() => {
    if (state.ok && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state.ok]);

  if (state.ok) {
    return (
      <div ref={successRef} style={successWrap}>
        <div className="kicker" style={{ marginBottom: 18 }}>
          Reservation Sent · Merci
        </div>
        <h3 style={successHead}>
          Thank you. We have your{" "}
          <em style={{ fontStyle: "italic", color: "var(--aubergine)" }}>
            request.
          </em>
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
          <a href="tel:0611729697" className="btn btn-p">
            Call · 061-172-9697
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
      {/* SECTION 1 — DATE, TIME, GUESTS */}
      {/* ============================================================ */}
      <Section kicker="01 — Date & Party" title="When, and how many?">
        <p style={hoursNote}>
          We are open <strong>daily, 11:00 — 20:00</strong> (last order at
          8:00 PM).
        </p>
        <div style={triGrid}>
          <Field label="Date" error={state.errors?.date} hint="Today onwards">
            <CalendarPicker
              name="date"
              required
              defaultValue={date}
              minDate={minDate}
              onChange={setDate}
            />
          </Field>

          <Field label="Time" error={state.errors?.time} hint="11:00 — 20:00">
            <select
              name="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={inputStyle}
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Guests" error={state.errors?.guests} hint="1 — 20">
            <input
              type="number"
              name="guests"
              required
              min={1}
              max={100}
              defaultValue={2}
              style={inputStyle}
            />
          </Field>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* SECTION 3 — GUEST INFO */}
      {/* ============================================================ */}
      <Section kicker="02 — Guest" title="Whose name shall we put on the table?">
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
      {/* SECTION 4 — PREFERENCES */}
      {/* ============================================================ */}
      <Section
        kicker="03 — Preferences"
        title="Anything we should know?"
      >
        <div style={duoGrid}>
          <Field label="Room Preference">
            <select name="room" defaultValue={ROOMS[0]} style={inputStyle}>
              {ROOMS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Occasion">
            <select name="occasion" defaultValue={OCCASIONS[0]} style={inputStyle}>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div style={{ marginTop: 28 }}>
          <Field
            label="Special Requests"
            hint="Allergies · accessibility · seating · birthday cake · anything"
            full
          >
            <textarea
              name="requests"
              rows={5}
              placeholder="Window seat, vegetarian options for two guests, peanut allergy…"
              style={{ ...inputStyle, resize: "vertical", minHeight: 120, lineHeight: 1.55 }}
            />
          </Field>
        </div>
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
            By submitting, you agree to be contacted by Yan Long to confirm or
            adjust the booking. We do not share your details.
          </p>
          <button
            type="submit"
            disabled={pending}
            className="btn btn-p"
            style={{ minWidth: 280, padding: "18px 32px", opacity: pending ? 0.6 : 1 }}
          >
            {pending ? "Sending …" : "Send Reservation Request →"}
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

const hoursNote: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  color: "var(--ink-soft)",
  letterSpacing: "0.01em",
  lineHeight: 1.55,
  marginBottom: 28,
  paddingBottom: 24,
  borderBottom: "1px solid var(--line)",
};

const triGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.4fr 1fr 0.8fr",
  gap: 24,
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
  fontSize: 64,
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
