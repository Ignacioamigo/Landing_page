# AI Video Masterclass — Landing Page

High-conversion, dark-mode landing page for the free **AI Video Masterclass**.
Built to feed a Facebook/Instagram Ads funnel and be fast enough to retain
mobile traffic (target: LCP < 2.5s, TBT < 200ms on 4G).

## Stack

- **Framework**: Next.js 16 (App Router, RSC, Turbopack)
- **UI**: Tailwind CSS v4 + custom design tokens (Shadcn-style primitives)
- **Typography**: Space Grotesk (display) + Inter (body) via `next/font`
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Backend**: Next.js Route Handlers
- **Database**: Supabase (Postgres, service-role key server-side)
- **Tracking**: Meta Pixel (client) + Conversions API (server), dedup'd by `event_id`

## Getting started

```bash
cp .env.example .env.local
# fill in the values, then:
npm install
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

See [`.env.example`](./.env.example). The minimum to get the form working:

| Variable                       | Purpose                                            |
| ------------------------------ | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Canonical URL for metadata / OG tags               |
| `NEXT_PUBLIC_SUPABASE_URL`     | Supabase project URL                               |
| `SUPABASE_SERVICE_ROLE_KEY`    | Server-only key used by the API route              |
| `NEXT_PUBLIC_META_PIXEL_ID`    | Meta Pixel ID (client-side tracking)               |
| `META_CAPI_ACCESS_TOKEN`       | Conversions API token (server-side tracking)       |
| `META_CAPI_TEST_EVENT_CODE`    | (optional) Test events code during QA              |

## Supabase setup

1. Create a new Supabase project.
2. In the SQL editor, run [`supabase/migrations/0001_create_leads.sql`](./supabase/migrations/0001_create_leads.sql).
3. Copy the **Project URL** into `NEXT_PUBLIC_SUPABASE_URL` and the **service_role** key into `SUPABASE_SERVICE_ROLE_KEY`.

The migration creates a `public.leads` table with RLS enabled and a "deny-all"
policy for anon / authenticated users — writes happen only through the service
role key used by the Next.js API route.

## Tracking model

### Client (Meta Pixel)

- `PageView` fires on mount of the root layout.
- `Lead` fires **only after** the API route returns `200`, using the same
  `event_id` returned from the client for deduplication.

### Server (Meta Conversions API)

- `POST /api/lead`
  1. Validates input with Zod.
  2. Upserts the lead into Supabase (`onConflict: email`).
  3. Sends `Lead` to the Conversions API with SHA-256 hashed email + first name
     and client IP / UA / `_fbp` / `_fbc` cookies for match quality.
  4. Returns `{ ok: true }` even if CAPI fails (lead is saved; CAPI errors are
     logged server-side and do not block the user).

### Dedup

The modal generates a `uuid` `event_id` on submit, passes it to the server and
then re-uses the same `event_id` for `fbq("track", "Lead", {}, { eventID })`.
Meta will keep the first one it receives and discard the duplicate.

## Project structure

```
src/
  app/
    api/lead/route.ts      # Lead API (Supabase + CAPI)
    globals.css            # Design tokens + Tailwind layer
    layout.tsx             # Fonts, Pixel, Modal provider, metadata
    page.tsx               # Landing page composition
  components/
    lead-modal/            # Modal + CTA button + provider
    sections/              # Hero, SocialProof, Value, Bonus, FinalCta, Footer
    ui/                    # Button, Container
  lib/
    meta-capi.ts           # Conversions API helper
    schemas.ts             # Zod schemas (client + server)
    supabase/server.ts     # Server-only Supabase client
    utils.ts               # cn() + event_id helper
supabase/
  migrations/0001_create_leads.sql
```

## Performance notes

- Assets are deliberately minimal: the hero uses a CSS-only video placeholder.
  Replace it with a `<Mux>` or Vimeo embed when the final asset is ready.
- Fonts are loaded via `next/font` (no FOIT, no CLS, no external request).
- The Pixel script uses `strategy="afterInteractive"` to avoid blocking FCP.
- All interactive sections that use Framer Motion are `"use client"` leaves;
  the rest of the tree is a Server Component by default.
- Respect `prefers-reduced-motion`.

## Deploying

1. Push the repo to GitHub.
2. Import into Vercel; set the env vars above.
3. (Recommended) Put the domain behind Cloudflare with TLS 1.3 only.

## Next steps / TODO

- [ ] Replace the `<VideoPlaceholder />` with a real Mux/Vimeo embed.
- [ ] Add `/privacy` and `/terms` pages (linked in the footer).
- [ ] Hook the `/api/lead` route to a transactional email platform to send the
      50-prompts PDF + the 96-hour email sequence (e.g. Resend, Postmark, or a
      Supabase Edge Function that calls ActiveCampaign/Brevo/MailerLite).
- [ ] Add Lighthouse-based CI (`@vercel/analytics` + `next build --profile`).
