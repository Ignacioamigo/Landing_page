import { NextResponse, type NextRequest } from "next/server";
import { leadApiSchema } from "@/lib/schemas";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendLeadEvent } from "@/lib/meta-capi";
import { upsertSubscriber } from "@/lib/mailerlite";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string | undefined {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return req.headers.get("x-real-ip") ?? undefined;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadApiSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { firstName, email, eventId, fbp, fbc, pagePath } = parsed.data;
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const eventSourceUrl =
    pagePath ?? request.headers.get("referer") ?? request.nextUrl.origin;

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error: dbError } = await supabase
      .from("leads")
      .upsert(
        {
          email,
          first_name: firstName,
          source: "masterclass-landing",
          fbp: fbp ?? null,
          fbc: fbc ?? null,
          ip: ip ?? null,
          user_agent: userAgent ?? null,
          page_url: eventSourceUrl,
          last_event_id: eventId,
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.warn("[Supabase] Upsert failed:", dbError.message);
    }
  } else {
    console.warn("[Supabase] Not configured — skipping DB insert.");
  }

  // Subscribe to MailerLite. Runs in parallel with CAPI to keep latency low.
  const groupId = process.env.MAILERLITE_GROUP_ID || undefined;

  const [capi, ml] = await Promise.all([
    sendLeadEvent({
      email,
      firstName,
      eventId,
      eventSourceUrl,
      clientIpAddress: ip,
      clientUserAgent: userAgent,
      fbp,
      fbc,
    }),
    upsertSubscriber({ email, firstName, groupId }),
  ]);

  if (!capi.ok) {
    console.warn("[CAPI] Lead event failed:", capi.error);
  }

  if (!ml.ok) {
    console.warn("[MailerLite] Subscriber upsert failed:", ml.error);
  }

  return NextResponse.json({ ok: true });
}
