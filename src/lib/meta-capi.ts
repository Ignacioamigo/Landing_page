import crypto from "node:crypto";

type LeadEventInput = {
  email: string;
  firstName: string;
  eventId: string;
  eventSourceUrl: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
};

function sha256(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

/**
 * Sends a `Lead` event through the Meta Conversions API (server-side).
 * Uses the same `eventId` as the browser Pixel event so Meta can deduplicate.
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 */
export async function sendLeadEvent(input: LeadEventInput): Promise<
  | { ok: true; response: unknown }
  | { ok: false; error: string; status?: number }
> {
  const pixelId = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;

  if (!pixelId || !accessToken) {
    return { ok: false, error: "Meta CAPI is not configured" };
  }

  const endpoint = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.eventSourceUrl,
        user_data: {
          em: sha256(input.email),
          fn: sha256(input.firstName),
          client_ip_address: input.clientIpAddress,
          client_user_agent: input.clientUserAgent,
          fbp: input.fbp,
          fbc: input.fbc,
        },
      },
    ],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: text || res.statusText, status: res.status };
    }

    const json = (await res.json().catch(() => ({}))) as unknown;
    return { ok: true, response: json };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown CAPI error";
    return { ok: false, error: message };
  }
}
