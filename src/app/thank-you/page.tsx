import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
import { PixelViewContent } from "./pixel-view-content";

export const metadata: Metadata = {
  title: "You're in — Watch the class",
  robots: { index: false, follow: false }, // keep the page out of search engines
};

const WISTIA_VIDEO_ID = "huf4dbmnnw";

export default async function ThankYouPage() {
  // Gate: only users who submitted the form have the httpOnly cookie.
  const cookieStore = await cookies();
  if (!cookieStore.get("ugc_access")) {
    redirect("/");
  }

  return (
    <>
      {/* Wistia scripts */}
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_VIDEO_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      {/* Swatch placeholder while player loads */}
      <style>{`
        wistia-player[media-id='${WISTIA_VIDEO_ID}']:not(:defined) {
          background: center / contain no-repeat
            url('https://fast.wistia.com/embed/medias/${WISTIA_VIDEO_ID}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}</style>

      {/* Meta Pixel ViewContent — fires only for registered users */}
      <PixelViewContent />

      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              You&apos;re registered
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Watch the{" "}
              <span className="gradient-text">free masterclass</span>
            </h1>
            <p className="mt-3 text-muted sm:text-lg">
              Your seat is confirmed. Watch the full session below.
            </p>
          </div>

          {/* Video */}
          <div className="overflow-hidden rounded-2xl border border-border glow">
            <wistia-player
              media-id={WISTIA_VIDEO_ID}
              aspect={1.7777777777777777}
              style={{ display: "block", width: "100%" }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
