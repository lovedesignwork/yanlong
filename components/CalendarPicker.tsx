"use client";

/**
 * CalendarPicker — custom month-view date picker.
 *
 * Yan Long editorial design system:
 * - Sharp corners (no border-radius)
 * - Hairline borders, parchment background, ink text
 * - Cormorant Garamond italic month/year title
 * - Inter caps for weekday headers and labels
 * - Aubergine selected, gold today-ring, parchment-2 available
 *
 * No third-party calendar libraries.
 */

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

type Props = {
  /** Form field name — submits as ISO YYYY-MM-DD */
  name: string;
  /** Initial selected date (ISO YYYY-MM-DD). Defaults to today. */
  defaultValue?: string;
  /** Earliest selectable date (ISO YYYY-MM-DD). Defaults to today. */
  minDate?: string;
  /** Optional callback when date changes */
  onChange?: (iso: string) => void;
  /** Required attribute on the hidden input */
  required?: boolean;
  /** Display style for the trigger button (matches form input styling) */
  triggerStyle?: React.CSSProperties;
};

function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function parseISO(iso: string): Date | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatLong(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarPicker({
  name,
  defaultValue,
  minDate,
  onChange,
  required,
  triggerStyle,
}: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hydrate on client to avoid SSR/CSR timezone mismatch
  useEffect(() => {
    const initial = defaultValue || todayISO();
    setSelected(initial);
    const parsed = parseISO(initial);
    if (parsed) setViewMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
    setHydrated(true);
  }, [defaultValue]);

  // Click outside to close
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const minISO = minDate || todayISO();
  const minD = parseISO(minISO) ?? new Date();
  minD.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = parseISO(selected);

  function handleSelect(d: Date) {
    const iso = formatISO(d);
    setSelected(iso);
    onChange?.(iso);
    setOpen(false);
  }

  function shiftMonth(delta: number) {
    setViewMonth(
      (m) => new Date(m.getFullYear(), m.getMonth() + delta, 1),
    );
  }

  // Build the grid for current viewMonth
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekday = firstDayOfMonth.getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: ({ day: number; date: Date } | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, date: new Date(year, month, d) });
  }

  const triggerLabel = hydrated && selectedDate
    ? formatLong(selectedDate)
    : "Choose a date";

  const defaultTriggerStyle: React.CSSProperties = {
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
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={selected}
        required={required}
      />

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        style={{ ...defaultTriggerStyle, ...triggerStyle }}
        suppressHydrationWarning
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>{triggerLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color: "var(--aubergine)", flexShrink: 0 }}
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>

      {/* Popover calendar */}
      {open && (
        <div
          role="dialog"
          aria-label="Choose a date"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            zIndex: 100,
            width: 360,
            background: "var(--paper)",
            border: "1px solid var(--line)",
            padding: "28px 24px 22px",
            boxShadow: "0 16px 48px rgba(33,28,26,0.16)",
          }}
        >
          {/* Editorial kicker */}
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 9,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            — Choose Your Date —
          </div>

          {/* Header — Cormorant italic month/year */}
          <div
            style={{
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 16,
              borderBottom: "1px solid var(--line)",
            }}
          >
            <NavButton
              onClick={() => shiftMonth(-1)}
              ariaLabel="Previous month"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </NavButton>

            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 26,
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.005em",
              }}
            >
              {MONTHS[month]}{" "}
              <span style={{ color: "var(--aubergine)" }}>{year}</span>
            </div>

            <NavButton onClick={() => shiftMonth(1)} ariaLabel="Next month">
              <ChevronRight size={18} strokeWidth={1.5} />
            </NavButton>
          </div>

          {/* Weekday headers — Inter caps */}
          <div
            style={{
              marginBottom: 6,
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 2,
              textAlign: "center",
            }}
          >
            {WEEKDAYS.map((w) => (
              <div
                key={w}
                style={{
                  padding: "6px 0",
                  fontFamily: "var(--font-sans)",
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                }}
              >
                {w.slice(0, 1)}
              </div>
            ))}
          </div>

          {/* Day grid — sharp square cells */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 2,
            }}
          >
            {cells.map((cell, i) => {
              if (!cell) return <div key={`e-${i}`} style={{ height: 42 }} />;
              const cellDate = new Date(cell.date);
              cellDate.setHours(0, 0, 0, 0);
              const isPast = cellDate < minD;
              const isToday = isSameDay(cellDate, today);
              const isSelected =
                !!selectedDate && isSameDay(cellDate, selectedDate);

              return (
                <DayButton
                  key={cell.day}
                  day={cell.day}
                  isPast={isPast}
                  isToday={isToday}
                  isSelected={isSelected}
                  onClick={() => handleSelect(cellDate)}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
            }}
          >
            <LegendItem
              swatchStyle={{
                background: "var(--paper-2)",
                border: "1px solid var(--line)",
              }}
              label="Available"
            />
            <LegendItem
              swatchStyle={{ background: "var(--aubergine)" }}
              label="Selected"
            />
            <LegendItem
              swatchStyle={{
                background: "transparent",
                boxShadow: "inset 0 0 0 1px var(--gold)",
              }}
              label="Today"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function NavButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 32,
        height: 32,
        background: "transparent",
        border: "1px solid var(--line)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--ink-soft)",
        transition: "all 200ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--aubergine)";
        e.currentTarget.style.color = "var(--paper)";
        e.currentTarget.style.borderColor = "var(--aubergine)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--ink-soft)";
        e.currentTarget.style.borderColor = "var(--line)";
      }}
    >
      {children}
    </button>
  );
}

function DayButton({
  day,
  isPast,
  isToday,
  isSelected,
  onClick,
}: {
  day: number;
  isPast: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  let bg = "var(--paper-2)";
  let color = "var(--ink)";
  let fontWeight: React.CSSProperties["fontWeight"] = 400;
  const ringStyle: React.CSSProperties = {};

  if (isSelected) {
    bg = "var(--aubergine)";
    color = "var(--paper)";
    fontWeight = 500;
  } else if (isPast) {
    bg = "transparent";
    color = "var(--mute)";
  }

  if (isToday && !isSelected) {
    // Gold inset ring around today
    ringStyle.boxShadow = "inset 0 0 0 1.5px var(--gold)";
  }

  const baseStyle: React.CSSProperties = {
    width: "100%",
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: bg,
    color: color,
    fontFamily: "var(--font-sans)",
    fontSize: 13,
    fontWeight,
    letterSpacing: "0.02em",
    border: "none",
    borderRadius: 0,
    cursor: isPast ? "not-allowed" : "pointer",
    transition: "all 150ms",
    opacity: isPast ? 0.5 : 1,
    ...ringStyle,
  };

  return (
    <button
      type="button"
      disabled={isPast}
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!isPast && !isSelected) {
          e.currentTarget.style.background = "var(--aubergine)";
          e.currentTarget.style.color = "var(--paper)";
          if (isToday) {
            e.currentTarget.style.boxShadow = "inset 0 0 0 1.5px var(--gold)";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!isPast && !isSelected) {
          e.currentTarget.style.background = "var(--paper-2)";
          e.currentTarget.style.color = "var(--ink)";
          if (isToday) {
            e.currentTarget.style.boxShadow = "inset 0 0 0 1.5px var(--gold)";
          }
        }
      }}
    >
      {day}
    </button>
  );
}

function LegendItem({
  swatchStyle,
  label,
}: {
  swatchStyle: React.CSSProperties;
  label: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 10,
          height: 10,
          ...swatchStyle,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 9,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--mute)",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}
