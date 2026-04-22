"use client";

/**
 * CountryPhoneSelector — flag + dial-code dropdown + national number input.
 * Maison-styled: sharp corners, aubergine focus, Inter font, parchment background.
 *
 * Pattern adapted from the Royal Phuket City Hotel ContactForm.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getCountryCallingCode,
  parsePhoneNumber,
} from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const COUNTRIES: { code: Country; name: string }[] = [
  { code: "TH", name: "Thailand" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "ID", name: "Indonesia" },
  { code: "VN", name: "Vietnam" },
  { code: "PH", name: "Philippines" },
  { code: "IN", name: "India" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "RU", name: "Russia" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "NZ", name: "New Zealand" },
  { code: "HK", name: "Hong Kong" },
  { code: "TW", name: "Taiwan" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "KH", name: "Cambodia" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "HR", name: "Croatia" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "EG", name: "Egypt" },
  { code: "FI", name: "Finland" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "KW", name: "Kuwait" },
  { code: "LA", name: "Laos" },
  { code: "MV", name: "Maldives" },
  { code: "MM", name: "Myanmar" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "ZA", name: "South Africa" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
];

interface Props {
  /** Hidden input name — the full E.164 number is submitted with the form */
  name: string;
  /** Initial country (ISO-2). Defaults to TH for Phuket restaurant. */
  defaultCountry?: Country;
  required?: boolean;
  /** Initial value to hydrate from (full E.164 string) */
  defaultValue?: string;
  /** Optional aria-error for keyed validation */
  ariaInvalid?: boolean;
}

export default function CountryPhoneSelector({
  name,
  defaultCountry = "TH",
  required = false,
  defaultValue = "",
  ariaInvalid = false,
}: Props) {
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Hydrate from defaultValue once on client
  useEffect(() => {
    if (defaultValue) {
      try {
        const parsed = parsePhoneNumber(defaultValue);
        if (parsed?.country) {
          setCountry(parsed.country);
          setPhoneNumber(parsed.nationalNumber || "");
        }
      } catch {
        // ignore parse errors
      }
    }
    setHydrated(true);
  }, [defaultValue]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const buildFullNumber = useCallback(
    (countryCode: Country, phone: string): string => {
      if (!phone) return "";
      const dial = getCountryCallingCode(countryCode);
      const clean = phone.replace(/\D/g, "");
      return `+${dial}${clean}`;
    },
    [],
  );

  const handleCountryChange = useCallback((c: Country) => {
    setCountry(c);
    setIsOpen(false);
    setSearchQuery("");
  }, []);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCountryCallingCode(c.code).includes(searchQuery),
  );

  const FlagComponent = flags[country];
  const dialCode = hydrated ? getCountryCallingCode(country) : "66";

  return (
    <div
      style={{
        display: "flex",
        background: "var(--paper)",
        border: `1px solid ${ariaInvalid ? "var(--aubergine)" : "var(--line)"}`,
        position: "relative",
      }}
    >
      {/* Hidden field — actual value submitted to server action */}
      <input
        type="hidden"
        name={name}
        value={buildFullNumber(country, phoneNumber)}
      />

      {/* Country selector button */}
      <div ref={dropdownRef} style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setIsOpen((s) => !s)}
          aria-label="Select country code"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 14px",
            height: "100%",
            minHeight: 53,
            minWidth: 110,
            background: "transparent",
            border: "none",
            borderRight: "1px solid var(--line)",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            color: "var(--ink)",
            transition: "background 200ms",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(91,30,90,0.04)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {FlagComponent && (
            <span
              style={{
                width: 22,
                height: 16,
                overflow: "hidden",
                display: "inline-block",
                flexShrink: 0,
                border: "1px solid var(--line)",
              }}
            >
              <FlagComponent title={country} />
            </span>
          )}
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: "var(--ink-soft)",
              fontWeight: 500,
            }}
            suppressHydrationWarning
          >
            +{dialCode}
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              color: "var(--mute)",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 1px)",
              left: -1,
              width: 320,
              maxHeight: 360,
              background: "var(--paper)",
              border: "1px solid var(--line)",
              boxShadow: "0 12px 40px rgba(33,28,26,0.12)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: 12,
                borderBottom: "1px solid var(--line)",
              }}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country…"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "var(--ink)",
                  outline: "none",
                  borderRadius: 0,
                }}
              />
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {filteredCountries.length === 0 ? (
                <div
                  style={{
                    padding: "16px 18px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: "var(--mute)",
                    fontStyle: "italic",
                  }}
                >
                  No country matches "{searchQuery}"
                </div>
              ) : (
                filteredCountries.map((c) => {
                  const Flag = flags[c.code];
                  const active = country === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleCountryChange(c.code)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 16px",
                        background: active
                          ? "rgba(91,30,90,0.08)"
                          : "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "var(--font-sans)",
                        transition: "background 100ms",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = active
                          ? "rgba(91,30,90,0.12)"
                          : "rgba(91,30,90,0.04)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = active
                          ? "rgba(91,30,90,0.08)"
                          : "transparent")
                      }
                    >
                      {Flag && (
                        <span
                          style={{
                            width: 22,
                            height: 16,
                            overflow: "hidden",
                            display: "inline-block",
                            flexShrink: 0,
                            border: "1px solid var(--line)",
                          }}
                        >
                          <Flag title={c.name} />
                        </span>
                      )}
                      <span
                        style={{
                          flex: 1,
                          fontSize: 14,
                          color: active ? "var(--aubergine)" : "var(--ink)",
                          fontWeight: active ? 500 : 400,
                        }}
                      >
                        {c.name}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "var(--mute)",
                          fontWeight: 400,
                        }}
                      >
                        +{getCountryCallingCode(c.code)}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phone number input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="89 123 4567"
        required={required}
        autoComplete="tel-national"
        aria-invalid={ariaInvalid || undefined}
        style={{
          flex: 1,
          padding: "16px 18px",
          background: "transparent",
          border: "none",
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          fontWeight: 400,
          letterSpacing: "0.01em",
          color: "var(--ink)",
          outline: "none",
          minWidth: 0,
        }}
      />
    </div>
  );
}
