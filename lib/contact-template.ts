/**
 * Email templates for general contact form submissions.
 * Maison editorial voice — sharp typography, gold + aubergine accents.
 */

export type ContactData = {
  inquiryType: string;     // "General Inquiry" | "Private Function" | etc.
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  subject?: string;
  message: string;
  submittedAt: string;     // ISO timestamp
};

const fmt = (label: string, value?: string | null) =>
  value && value.trim() ? `${label.padEnd(14)}${value}` : "";

export function contactToText(d: ContactData): string {
  const lines = [
    "YAN LONG MAISON  ·  CONTACT REQUEST",
    "─────────────────────────────────────────────",
    "",
    "INQUIRY",
    fmt("Type:", d.inquiryType),
    fmt("Subject:", d.subject),
    "",
    "FROM",
    fmt("Name:", d.fullName),
    fmt("Email:", d.email),
    fmt("Phone:", d.phone),
    fmt("Country:", d.country),
    "",
    "MESSAGE",
    `  ${d.message.replace(/\n/g, "\n  ")}`,
    "",
    "─────────────────────────────────────────────",
    `Submitted ${new Date(d.submittedAt).toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })} ICT`,
    "Royal Phuket City Hotel · Phuket Old Town",
  ];
  return lines.filter(Boolean).join("\n");
}

export function contactToHtml(d: ContactData): string {
  const row = (k: string, v?: string | null) =>
    v && v.trim()
      ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(33,28,26,.12);font-family:'Inter',sans-serif;font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#aa8c30;width:140px;vertical-align:top">${k}</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(33,28,26,.12);font-family:Georgia,serif;font-style:italic;font-size:18px;color:#211c1a;line-height:1.45">${escape(v)}</td>
        </tr>`
      : "";

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5efe3;font-family:Georgia,serif;color:#211c1a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe3">
    <tr><td align="center" style="padding:48px 16px">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#f5efe3">

        <!-- Header -->
        <tr><td style="padding:0 0 32px 0;text-align:center;border-bottom:1px solid rgba(33,28,26,.15)">
          <div style="font-family:Georgia,serif;font-size:36px;color:#5b1e5a;letter-spacing:.04em;font-weight:400">Yan Long</div>
          <div style="font-family:Georgia,serif;font-style:italic;font-size:14px;color:#211c1a;letter-spacing:.4em;margin-top:8px">YAN · LONG · MAISON</div>
          <div style="font-family:'Inter',sans-serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#8a8278;margin-top:18px">Royal Phuket City Hotel · Phuket Old Town</div>
        </td></tr>

        <!-- Title -->
        <tr><td style="padding:40px 0 8px 0">
          <div style="font-family:'Inter',sans-serif;font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:#aa8c30;margin-bottom:14px">— New Contact Request —</div>
          <div style="font-family:Georgia,serif;font-weight:300;font-size:42px;line-height:1.1;letter-spacing:-.01em;color:#211c1a">
            <em style="color:#5b1e5a;font-style:italic">${escape(d.fullName)}</em>
          </div>
          <div style="font-family:Georgia,serif;font-style:italic;font-size:22px;color:#aa8c30;margin-top:8px">
            ${escape(d.inquiryType)}${d.subject ? ` · ${escape(d.subject)}` : ""}
          </div>
        </td></tr>

        <!-- Detail table -->
        <tr><td style="padding:36px 0 0 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td colspan="2" style="padding:18px 0 8px 0;font-family:'Inter',sans-serif;font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:#aa8c30;border-top:1px solid rgba(33,28,26,.15)">From</td></tr>
            ${row("Full Name", d.fullName)}
            ${row("Email", `<a href="mailto:${escape(d.email)}" style="color:#5b1e5a;text-decoration:none">${escape(d.email)}</a>`)}
            ${row("Phone", `<a href="tel:${escape(d.phone)}" style="color:#5b1e5a;text-decoration:none">${escape(d.phone)}</a>`)}
            ${row("Country", d.country)}

            <tr><td colspan="2" style="padding:28px 0 8px 0;font-family:'Inter',sans-serif;font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:#aa8c30">Inquiry</td></tr>
            ${row("Type", d.inquiryType)}
            ${row("Subject", d.subject)}

            <tr><td colspan="2" style="padding:28px 0 8px 0;font-family:'Inter',sans-serif;font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:#aa8c30">Message</td></tr>
            <tr><td colspan="2" style="padding:18px 24px;background:rgba(91,30,90,0.04);border-left:2px solid #5b1e5a;font-family:Georgia,serif;font-size:18px;color:#211c1a;line-height:1.65;white-space:pre-wrap">${escape(d.message)}</td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:48px 0 0 0">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr><td style="background:#5b1e5a;padding:14px 26px">
              <a href="mailto:${escape(d.email)}?subject=Re:%20${encodeURIComponent(d.inquiryType)}" style="font-family:'Inter',sans-serif;font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:#f5efe3;text-decoration:none">Reply to Sender →</a>
            </td>
            <td style="width:14px"></td>
            <td style="background:#aa8c30;padding:14px 26px">
              <a href="tel:${escape(d.phone)}" style="font-family:'Inter',sans-serif;font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:#f5efe3;text-decoration:none">Call Sender →</a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:64px 0 0 0;border-top:1px solid rgba(33,28,26,.15);margin-top:48px">
          <div style="font-family:'Inter',sans-serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#8a8278;line-height:1.6">
            Submitted ${new Date(d.submittedAt).toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })} ICT<br/>
            yanlongphuket.com · 061-172-9697 · LINE @yanlong
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
