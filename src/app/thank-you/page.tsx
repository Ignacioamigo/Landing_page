import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
import { PixelViewContent } from "./pixel-view-content";
import { UgcShowcase } from "@/components/sections/ugc-showcase";
import { Testimonials } from "@/components/sections/testimonials";

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
        .ty-section > section {
          padding-top: 3rem !important;
          padding-bottom: 3rem !important;
        }
      `}</style>

      {/* Meta Pixel ViewContent — fires only for registered users */}
      <PixelViewContent />

      <main className="flex flex-col items-center bg-background pt-16 pb-4">
        <div className="w-full max-w-4xl px-4">
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

          {/* Video — aspect ratio reserved so player load never shifts layout */}
          <div className="overflow-hidden rounded-2xl border border-border glow"
               style={{ aspectRatio: "16/9", width: "100%" }}>
            <wistia-player
              media-id={WISTIA_VIDEO_ID}
              aspect={1.7777777777777777}
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>

          {/* Whop CTA */}
          <div className="mt-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Ready to start?
            </p>
            <h2 className="mb-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Get{" "}
              <span className="gradient-text">instant access</span>
            </h2>
            <a
              href="https://whop.com/checkout/plan_oYS51IWhG8H9q"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl px-10 py-4 font-bold text-white text-base sm:text-lg"
              style={{
                background: "linear-gradient(110deg,#3b82f6,#8b5cf6)",
                textDecoration: "none",
              }}
            >
              Join Now →
            </a>
          </div>

          {/* Locked classes */}
          <div className="mt-10 pb-4">
            <div className="mb-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Full program
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Everything unlocked with{" "}
                <span className="gradient-text">full access</span>
              </h2>
              <p className="mt-2 text-sm text-muted">
                This free class is just the beginning. Here&apos;s what&apos;s waiting for you inside.
              </p>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-3"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
              {[
                { num: "01", title: "Make Professional Videos for Brands", desc: "Full workflow from brief to final delivery." },
                { num: "02", title: "Build Your AI UGC Avatar", desc: "Your on-screen presence — no camera needed." },
                { num: "03", title: "Monetize Your Account from Day 1", desc: "Land clients and set your rates." },
                { num: "04", title: "From Zero to First Paycheck", desc: "The exact sequence to get paid before you feel ready." },
                { num: "05", title: "The Scroll-Stopper Formula", desc: "3-second hooks that make people forget they were swiping." },
                { num: "06", title: "You Speak, AI Delivers", desc: "Clone your voice — or invent one — and sync it to any face." },
                { num: "07", title: "Make Brands Come to You", desc: "The DM strategy that turns cold accounts into paying clients." },
                { num: "08", title: "Price Like a Pro", desc: "Stop charging hourly. Build packages clients can't say no to." },
                { num: "09", title: "The Viral B-Roll Playbook", desc: "AI-generated footage that looks like a $10K shoot." },
                { num: "10", title: "One Video, Ten Platforms", desc: "Repurpose once, distribute everywhere, get paid more." },
                { num: "11", title: "The Invisible Client Machine", desc: "Automate your pipeline so leads arrive while you sleep." },
                { num: "12", title: "Your First $5K Month", desc: "Reverse-engineer the number and hit it in 30 days." },
              ].map((cls) => (
                <div
                  key={cls.num}
                  className="class-card relative shrink-0 overflow-hidden rounded-xl border border-border bg-background p-5"
                  style={{ opacity: 0.65, scrollSnapAlign: "start", width: "clamp(260px, 72vw, 320px)" }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                      Class {cls.num}
                    </span>
                    <span
                      className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Locked
                    </span>
                  </div>

                  <p className="font-display text-[15px] font-bold leading-snug tracking-tight">
                    {cls.title}
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{cls.desc}</p>
                </div>
              ))}
            </div>

            {/* Bottom CTA repeat */}
            <div className="mt-10 text-center">
              <a
                href="https://whop.com/checkout/plan_oYS51IWhG8H9q"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl px-10 py-4 font-bold text-white text-base sm:text-lg"
                style={{
                  background: "linear-gradient(110deg,#3b82f6,#8b5cf6)",
                  textDecoration: "none",
                }}
              >
                Unlock All 12 Classes →
              </a>
            </div>
          </div>
        </div>

        <div className="ty-section">
          <Testimonials />
        </div>

        <div className="pb-8 text-center">
          <a
            href="https://whop.com/checkout/plan_oYS51IWhG8H9q"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl px-10 py-4 font-bold text-white text-base sm:text-lg"
            style={{
              background: "linear-gradient(110deg,#3b82f6,#8b5cf6)",
              textDecoration: "none",
            }}
          >
            Join Now →
          </a>
        </div>

        <div className="ty-section">
          <UgcShowcase />
        </div>

        <div className="pb-16 pt-2 text-center">
          <a
            href="https://whop.com/checkout/plan_oYS51IWhG8H9q"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl px-10 py-4 font-bold text-white text-base sm:text-lg"
            style={{
              background: "linear-gradient(110deg,#3b82f6,#8b5cf6)",
              textDecoration: "none",
            }}
          >
            Get Access Now →
          </a>
          <p className="mt-3 text-xs text-muted">
            Create content like this from day one.
          </p>
        </div>
      </main>
    </>
  );
}
