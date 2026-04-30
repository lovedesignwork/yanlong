"use server";

import { sendEmail } from "@/lib/email";
import { insertSubmission } from "@/lib/supabase";
import {
  reservationToHtml,
  reservationToText,
  type ReservationData,
} from "@/lib/reservation-template";

export type ReserveActionState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<keyof ReservationData, string>>;
};

/**
 * Recipient list — every reservation goes to BOTH the restaurant inbox and
 * the marketing inbox. Override via env var (comma-separated) if needed.
 */
const RESERVATION_TO_DEFAULT = [
  "yanlong@royalphuketcity.com",
  "marketing@royalphuketcity.com",
];

const RESERVATION_TO: string[] = (
  process.env.RESERVATION_TO ?? RESERVATION_TO_DEFAULT.join(",")
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const RESERVATION_BCC = process.env.RESERVATION_BCC
  ?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** Derive lunch/dinner label from a HH:MM time string. */
function deriveService(time: string): string {
  if (!time) return "Reservation";
  const [h] = time.split(":").map(Number);
  if (h < 15) return "Lunch";
  if (h < 17) return "Afternoon";
  return "Dinner";
}

export async function submitReservation(
  _prev: ReserveActionState,
  formData: FormData,
): Promise<ReserveActionState> {
  // Honeypot — if a bot fills `website`, silently succeed
  if (str(formData, "website")) {
    return { ok: true, message: "Thank you. We will be in touch shortly." };
  }

  const data: ReservationData = {
    date: str(formData, "date"),
    time: str(formData, "time"),
    // Service is no longer collected — derive from time of day for the email.
    service: deriveService(str(formData, "time")),
    guests: str(formData, "guests"),
    fullName: str(formData, "fullName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    country: str(formData, "country") || undefined,
    room: str(formData, "room") || undefined,
    occasion: str(formData, "occasion") || undefined,
    requests: str(formData, "requests") || undefined,
    submittedAt: new Date().toISOString(),
  };

  const errors: Partial<Record<keyof ReservationData, string>> = {};
  if (!data.date) errors.date = "Please choose a date";
  if (!data.time) errors.time = "Please choose a time";
  if (!data.guests || Number(data.guests) < 1)
    errors.guests = "Please enter party size";
  if (!data.fullName) errors.fullName = "Please enter your name";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email";
  if (!data.phone) errors.phone = "Please enter a phone number";

  // Date must be today or future
  if (data.date) {
    const picked = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (picked < today) errors.date = "Date must be today or later";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please complete the required fields.",
      errors,
    };
  }

  const dateLong = new Date(data.date).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const subject = `New reservation — ${data.fullName} · ${data.guests} guests · ${dateLong} · ${data.time}`;

  // 1. Write to the shared admin database (RPCH admin picks it up from here).
  const messageForAdmin = [
    `Reservation: ${data.service} on ${dateLong} at ${data.time}`,
    `Guests: ${data.guests}`,
    data.occasion ? `Occasion: ${data.occasion}` : "",
    data.room ? `Seating preference: ${data.room}` : "",
    data.requests ? `\nSpecial requests:\n${data.requests}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const dbResult = await insertSubmission({
    source: "yanlong",
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    subject,
    message: messageForAdmin,
    inquiry_type: "reservation",
    status: "new",
    metadata: {
      restaurant: "yanlong",
      date: data.date,
      dateLong,
      time: data.time,
      service: data.service,
      guests: data.guests,
      country: data.country,
      room: data.room,
      occasion: data.occasion,
      requests: data.requests,
    },
  });

  // 2. Email as a backup channel (fires whenever RESEND_API_KEY is set).
  const emailResult = await sendEmail({
    to: RESERVATION_TO,
    bcc: RESERVATION_BCC || undefined,
    replyTo: data.email,
    subject,
    html: reservationToHtml(data),
    text: reservationToText(data),
  });

  // Success if EITHER channel delivered. DB is primary, email is backup.
  if (!dbResult.ok && !emailResult.ok) {
    return {
      ok: false,
      message:
        "We could not send your request automatically. Please call 061-172-9697 — apologies for the inconvenience.",
    };
  }

  return {
    ok: true,
    message:
      "Thank you. Your reservation request has been sent to our concierge — we will confirm by email or phone within two hours.",
  };
}

