/**
 * Resend — transactional + scheduled email sender for the full 4-email sequence.
 * Server-side only. Never import from client components.
 *
 * Schedule (from registration time):
 *   Email 1 — immediate  — access link (rich HTML, delivered to inbox)
 *   Email 2 — +24 h      — reminder (plain text style)
 *   Email 3 — +48 h      — content breakdown (plain text style)
 *   Email 4 — +72 h      — last chance (plain text style)
 */

import { Resend } from "resend";
import { readFileSync } from "fs";
import { join } from "path";

type SendSequenceResult =
  | { ok: true }
  | { ok: false; error: string };

function loadTemplate(filename: string): string {
  return readFileSync(join(process.cwd(), "src/emails", filename), "utf-8");
}

function render(
  template: string,
  vars: { name: string; magicLink: string; unsubscribeUrl: string }
): string {
  return template
    .replace(/\{name\}/g, vars.name)
    .replace(/\{\$name\}/g, vars.name)
    .replace(/\{\$magic_link\}/g, vars.magicLink)
    .replace(/\{magic_link\}/g, vars.magicLink)
    .replace(/\{\$unsubscribe\}/g, vars.unsubscribeUrl)
    .replace(/\{unsubscribe\}/g, vars.unsubscribeUrl);
}

function hoursFromNow(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

export async function sendEmailSequence(input: {
  to: string;
  firstName: string;
  magicLink: string;
}): Promise<SendSequenceResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(apiKey);

  const from = "NotFilmedAI <hello@notfilmedai.com>";
  const unsubscribeUrl = `mailto:hello@notfilmedai.com?subject=Unsubscribe&body=Please%20remove%20me%20from%20your%20list`;

  const vars = {
    name: input.firstName,
    magicLink: input.magicLink,
    unsubscribeUrl,
  };

  const emails = [
    {
      // Email 1 — immediate: access link
      subject: `${input.firstName}, your access link is here`,
      html: render(loadTemplate("email-1-watch-now.plain.html"), vars),
      scheduledAt: undefined,
    },
    {
      // Email 2 — +4h: what's inside (strike while interest is hot)
      subject: "Here's exactly what's inside the free class",
      html: render(loadTemplate("email-2-reminder.plain.html"), vars),
      scheduledAt: hoursFromNow(4),
    },
    {
      // Email 3 — +24h: simple reminder
      subject: `${input.firstName}, did you get a chance to watch?`,
      html: render(loadTemplate("email-3-breakdown.plain.html"), vars),
      scheduledAt: hoursFromNow(24),
    },
    {
      // Email 4 — +72h: honest close (access removed in 24h = true, link expires at 96h)
      subject: "Removing free access in 24 hours",
      html: render(loadTemplate("email-4-last-chance.plain.html"), vars),
      scheduledAt: hoursFromNow(72),
    },
  ];

  const results = await Promise.allSettled(
    emails.map((email) =>
      resend.emails.send({
        from,
        to: input.to,
        subject: email.subject,
        html: email.html,
        ...(email.scheduledAt ? { scheduledAt: email.scheduledAt } : {}),
      })
    )
  );

  const failures = results
    .map((r, i) => {
      if (r.status === "rejected") return `Email ${i + 1}: ${r.reason}`;
      if (r.value.error) return `Email ${i + 1}: ${r.value.error.message}`;
      return null;
    })
    .filter(Boolean);

  if (failures.length > 0) {
    console.warn("[Resend] Some emails failed:", failures.join(" | "));
  }

  return { ok: true };
}
