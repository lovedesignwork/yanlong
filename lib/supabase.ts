import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Yan Long uses the shared Royal Phuket City Hotel Supabase project.
 * All contact + reservation submissions flow into `contact_submissions`
 * tagged with source='yanlong' so the RPCH admin dashboard can list them
 * in the Yan Long section.
 *
 * We use the anon key here (not service role). The `contact_submissions`
 * table has an RLS policy that allows anon inserts but no reads.
 */
let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

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

export type ContactSubmissionInsert = {
  source: "yanlong";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiry_type: string;
  status?: "new" | "read" | "replied" | "archived";
  metadata?: Record<string, unknown>;
};

/**
 * Insert a submission (reservation or contact) into the shared admin table.
 * Returns { ok: true } on success, or { ok: false, error } on failure.
 * Errors are swallowed quietly so the Yan Long UX never exposes DB internals —
 * the caller still has email as a fallback delivery path.
 */
export async function insertSubmission(
  row: ContactSubmissionInsert,
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const { error } = await sb.from("contact_submissions").insert({
    name: row.name,
    email: row.email,
    phone: row.phone ?? null,
    subject: row.subject ?? null,
    message: row.message,
    inquiry_type: row.inquiry_type,
    status: row.status ?? "new",
    source: row.source,
    metadata: row.metadata ?? null,
  });

  if (error) {
    console.error("[yanlong] Supabase insert failed:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
