import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Yan Long uses the shared Royal Phuket City Hotel Supabase project.
 * All reservations go to `yanlong_reservations` and all contact messages
 * go to `yanlong_contact_submissions`. Both tables are managed from the
 * RPCH admin dashboard in the Yan Long section.
 *
 * We use the anon key here (not service role). Both tables have RLS
 * policies that allow public INSERTs but no reads — the admin dashboard
 * reads via the service role client.
 */
let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error(
      `[supabase] Missing env vars — NEXT_PUBLIC_SUPABASE_URL=${!!url}, NEXT_PUBLIC_SUPABASE_ANON_KEY=${!!key}`,
    );
    return null;
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

// ----------------------------------------------------------------------------
// Reservations
// ----------------------------------------------------------------------------

export type ReservationInsert = {
  guest_name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  service?: string; // Lunch / Dinner / Afternoon
  occasion?: string;
  seating_preference?: string;
  country?: string;
  special_requests?: string;
};

export async function insertReservation(
  row: ReservationInsert,
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const { error } = await sb.from("yanlong_reservations").insert({
    guest_name: row.guest_name,
    email: row.email,
    phone: row.phone,
    date: row.date,
    time: row.time,
    guests: row.guests,
    service: row.service ?? null,
    occasion: row.occasion ?? null,
    seating_preference: row.seating_preference ?? null,
    country: row.country ?? null,
    special_requests: row.special_requests ?? null,
    status: "new",
  });

  if (error) {
    console.error("[yanlong] Reservation insert failed:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// ----------------------------------------------------------------------------
// Contact submissions
// ----------------------------------------------------------------------------

export type ContactInsert = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiry_type: string; // general | event | wedding | reservation
  inquiry_type_label?: string; // original label from the form
  country?: string;
};

export async function insertContact(
  row: ContactInsert,
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const { error } = await sb.from("yanlong_contact_submissions").insert({
    name: row.name,
    email: row.email,
    phone: row.phone ?? null,
    subject: row.subject ?? null,
    message: row.message,
    inquiry_type: row.inquiry_type,
    inquiry_type_label: row.inquiry_type_label ?? null,
    country: row.country ?? null,
    status: "new",
  });

  if (error) {
    console.error("[yanlong] Contact insert failed:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
