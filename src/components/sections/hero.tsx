"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, Users } from "lucide-react";
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
              Limited seats. Instant bonus:{" "}
              <span className="text-foreground">50 AI prompts</span>.
            </p>
          </div>
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-14 max-w-4xl"
        >
          <VideoPlaceholder />
        </motion.div>
      </Container>
    </section>
  );
}

function VideoPlaceholder() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface glow">
      <div className="relative aspect-video w-full bg-gradient-to-br from-surface-2 via-surface to-background">
        {/* Decorative glow */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.25)_0%,transparent_60%)]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Play preview"
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_10px_40px_-8px_rgba(139,92,246,0.8)] transition-transform duration-300 hover:scale-110 sm:h-24 sm:w-24"
          >
            <Play className="ml-1 h-8 w-8 fill-current sm:h-10 sm:w-10" />
          </button>
          <p className="text-xs uppercase tracking-widest text-muted">
            Watch the 60-second preview
          </p>
        </div>

        {/* Mute toggle (visual placeholder for autoplay-muted video) */}
        <div className="absolute bottom-4 right-4 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[11px] font-medium text-muted backdrop-blur">
          Tap to unmute
        </div>
      </div>
    </div>
  );
}
