"use server";

import { sendEmail } from "@/lib/email";
import { insertSubmission } from "@/lib/supabase";
import {
  contactToHtml,
  contactToText,
  type ContactData,
} from "@/lib/contact-template";

/**
 * Map the Yan Long public form's inquiry type to the admin inquiry_type
 * enum (event / general / reservation / wedding). Anything unknown falls
 * back to 'general'.
 */
function mapInquiryType(raw: string): string {
  const v = raw.toLowerCase();
  if (v.includes("reserv")) return "reservation";
  if (v.includes("event") || v.includes("private") || v.includes("party"))
    return "event";
  if (v.includes("wedding") || v.includes("ceremony")) return "wedding";
  return "general";
}

export type ContactActionState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<keyof ContactData, string>>;
};

/**
 * Recipient list — every contact request goes to BOTH the restaurant inbox
 * and the marketing inbox. Override via env var (comma-separated) if needed.
 */
const CONTACT_TO_DEFAULT = [
  "yanlong@royalphuketcity.com",
  "marketing@royalphuketcity.com",
];

const CONTACT_TO: string[] = (
  process.env.CONTACT_TO ??
  process.env.RESERVATION_TO ??
  CONTACT_TO_DEFAULT.join(",")
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const CONTACT_BCC = process.env.CONTACT_BCC
  ?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  // Honeypot — silent success for bots
  if (str(formData, "website")) {
    return { ok: true, message: "Thank you. We will be in touch shortly." };
  }

  const data: ContactData = {
    inquiryType: str(formData, "inquiryType") || "General Inquiry",
    fullName: str(formData, "fullName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    country: str(formData, "country") || undefined,
    subject: str(formData, "subject") || undefined,
    message: str(formData, "message"),
    submittedAt: new Date().toISOString(),
  };

  const errors: Partial<Record<keyof ContactData, string>> = {};
  if (!data.fullName) errors.fullName = "Please enter your name";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email";
  if (!data.phone) errors.phone = "Please enter a phone number";
  if (!data.message || data.message.length < 10)
    errors.message = "Please write a message of at least 10 characters";

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please complete the required fields.",
      errors,
    };
  }

  const subject = `New contact — ${data.inquiryType} — ${data.fullName}`;

  // 1. Write to the shared admin database (RPCH admin picks it up from here).
  const dbResult = await insertSubmission({
    source: "yanlong",
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    subject: data.subject || data.inquiryType,
    message: data.message,
    inquiry_type: mapInquiryType(data.inquiryType),
    status: "new",
    metadata: {
      restaurant: "yanlong",
      inquiryTypeLabel: data.inquiryType,
      country: data.country,
    },
  });

  // 2. Email as a backup channel.
  const emailResult = await sendEmail({
    to: CONTACT_TO,
    bcc: CONTACT_BCC || undefined,
    replyTo: data.email,
    subject,
    html: contactToHtml(data),
    text: contactToText(data),
  });

  if (!dbResult.ok && !emailResult.ok) {
    return {
      ok: false,
      message:
        "We could not send your message automatically. Please call 061-172-9697 — apologies for the inconvenience.",
    };
  }

  return {
    ok: true,
    message:
      "Thank you. Your message has been sent to our team — we will reply within one business day.",
  };
}
