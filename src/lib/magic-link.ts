/**
 * HMAC-signed magic links for accessing the private /thank-you page.
 *
 * Token anatomy: /access?e=<base64url(email)>&exp=<unix_timestamp>&sig=<hmac_hex>
 *
 * The signature covers `email:exp`, so it cannot be forged without the secret.
 * Server-side only — never import from client components.
 */

import { createHmac, timingSafeEqual } from "crypto";

/** 30-day validity. Adjust to taste. */
const TTL_SECONDS = 60 * 60 * 24 * 30;

function getSecret(): string {
  const secret = process.env.MAGIC_LINK_SECRET;
  if (!secret) {
    throw new Error(
      "MAGIC_LINK_SECRET env variable is not set. Add it to .env.local and Vercel."
    );
  }
  return secret;
}

function sign(email: string, exp: number): string {
  return createHmac("sha256", getSecret())
    .update(`${email}:${exp}`)
    .digest("hex");
}

/** Returns the full magic-link URL to embed in the email. */
export function generateMagicLink(email: string, baseUrl: string): string {
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const e = Buffer.from(email).toString("base64url");
  const sig = sign(email, exp);
  return `${baseUrl}/access?e=${e}&exp=${exp}&sig=${sig}`;
}

/** Returns true if the params are valid and not expired. */
export function verifyMagicLink(
  e: string,
  exp: string,
  sig: string
): boolean {
  try {
    const expNum = parseInt(exp, 10);
    if (isNaN(expNum) || Math.floor(Date.now() / 1000) > expNum) return false;

    const email = Buffer.from(e, "base64url").toString("utf8");
    const expected = sign(email, expNum);

    // Constant-time comparison to prevent timing attacks.
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}
