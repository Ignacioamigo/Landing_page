"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/lead-modal/cta-button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-radial pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Free AI Video Masterclass
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-[40px] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            How to Create{" "}
            <span className="gradient-text">Viral AI Videos</span>
            <br className="hidden sm:block" /> in Under 10 Minutes
            <span className="block text-muted text-[28px] font-medium sm:mt-3 sm:text-3xl md:text-4xl">
              (Without Showing Your Face)
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Join the exact step-by-step system used to build a{" "}
            <span className="font-medium text-foreground">17k+ audience</span>.
            Register to unlock the tools, prompts and automated workflows.
          </p>

          <div className="mt-9 flex w-full max-w-md flex-col items-center gap-3">
            <CtaButton size="xl" fullWidth source="hero" />
            <p className="flex items-center gap-2 text-xs text-muted">
              <Users className="h-3.5 w-3.5" />
              Free · No credit card · Instant bonus:{" "}
              <span className="text-foreground">50 AI prompts PDF</span>.
            </p>
          </div>
        </motion.div>

        {/* Hero video */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-14 max-w-4xl"
        >
          <HeroVideo />
        </motion.div>
      </Container>
    </section>
  );
}

const WISTIA_VIDEO_ID = "jwgv1a5qf9";

function HeroVideo() {
  return (
    <>
      {/* Video-specific Wistia module (player.js is loaded globally in layout) */}
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_VIDEO_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      {/* Swatch style: blurred thumbnail while the player initialises */}
      <style>{`
        wistia-player[media-id='${WISTIA_VIDEO_ID}']:not(:defined) {
          background: center / contain no-repeat
            url('https://fast.wistia.com/embed/medias/${WISTIA_VIDEO_ID}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}</style>

      <div className="overflow-hidden rounded-2xl border border-border glow">
        <wistia-player
          media-id={WISTIA_VIDEO_ID}
          aspect={1.7777777777777777}
          style={{ display: "block", width: "100%" }}
        />
      </div>
    </>
  );
}
