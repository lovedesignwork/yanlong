/**
 * Email transport. Uses Resend in production, falls back to console.log in dev
 * when RESEND_API_KEY is missing — so the form is testable out of the box.
 */
import { Resend } from "resend";

export type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  bcc?: string | string[];
};

export type SendResult =
  | { ok: true; id?: string; transport: "resend" | "console" }
  | { ok: false; error: string; transport: "resend" | "console" };

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESERVATION_FROM ?? "Yan Long <onboarding@resend.dev>";

  // Dev fallback — log to terminal so the form is fully testable without an API key
  if (!apiKey || apiKey.startsWith("re_xxxx")) {
    console.log("\n========== [email:dev-fallback] ==========");
    console.log(`From:    ${from}`);
    console.log(`To:      ${Array.isArray(args.to) ? args.to.join(", ") : args.to}`);
    if (args.bcc) console.log(`BCC:     ${Array.isArray(args.bcc) ? args.bcc.join(", ") : args.bcc}`);
    if (args.replyTo) console.log(`ReplyTo: ${args.replyTo}`);
    console.log(`Subject: ${args.subject}`);
    console.log("------------------------------------------");
    console.log(args.text);
    console.log("==========================================\n");
    return { ok: true, transport: "console" };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: args.to,
      subject: args.subject,
      html: args.html,
      text: args.text,
      replyTo: args.replyTo,
      bcc: args.bcc,
    });

    if (result.error) {
      return { ok: false, error: result.error.message, transport: "resend" };
    }
    return { ok: true, id: result.data?.id, transport: "resend" };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Unknown email error";
    return { ok: false, error, transport: "resend" };
  }
}
