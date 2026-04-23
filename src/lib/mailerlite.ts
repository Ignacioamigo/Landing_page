/**
 * MailerLite Subscribers API (v2 — REST / connect.mailerlite.com).
 * Docs: https://developers.mailerlite.com/docs/subscribers
 *
 * Server-side only. Never import from client components.
 */

const BASE_URL = "https://connect.mailerlite.com/api";

type SubscriberResult =
  | { ok: true; created: boolean }
  | { ok: false; error: string; status?: number };

/**
 * Creates or updates a subscriber in MailerLite and optionally adds them to a
 * group. Uses `upsert` semantics: if the email already exists the subscriber
 * fields are updated and it is re-added to the group without creating a
 * duplicate.
 */
export async function upsertSubscriber(input: {
  email: string;
  firstName: string;
  groupId?: string;
}): Promise<SubscriberResult> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "MAILERLITE_API_KEY is not configured" };
  }

  const body: Record<string, unknown> = {
    email: input.email,
    fields: { name: input.firstName },
  };

  if (input.groupId) {
    body.groups = [input.groupId];
  }

  try {
    const res = await fetch(`${BASE_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: text || res.statusText, status: res.status };
    }

    // 201 = new subscriber, 200 = existing subscriber updated.
    return { ok: true, created: res.status === 201 };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown MailerLite error";
    return { ok: false, error: message };
  }
}
