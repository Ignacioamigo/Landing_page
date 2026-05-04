import { NextResponse, type NextRequest } from "next/server";
import { verifyMagicLink } from "@/lib/magic-link";

export const runtime = "nodejs";

/**
 * GET /access?e=<base64email>&exp=<timestamp>&sig=<hmac>
 *
 * Validates the magic link, sets the ugc_access cookie, and redirects
 * the user to /thank-you. If the link is invalid or expired, redirects
 * back to the homepage.
 */
export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;

  const e   = searchParams.get("e")   ?? "";
  const exp = searchParams.get("exp") ?? "";
  const sig = searchParams.get("sig") ?? "";

  if (!verifyMagicLink(e, exp, sig)) {
    // Link invalid or expired — send back to homepage.
    return NextResponse.redirect(new URL("/?access=expired", origin));
  }

  // Valid link → grant access by setting the same cookie the form flow uses.
  const response = NextResponse.redirect(new URL("/thank-you", origin));
  response.cookies.set("ugc_access", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
