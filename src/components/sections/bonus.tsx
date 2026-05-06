"use client";

import { motion } from "framer-motion";
import { Download, Gift } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/lead-modal/cta-button";

export function Bonus() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="bonus">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_50%,rgba(59,130,246,0.10)_0%,rgba(9,9,11,0)_70%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-2">
              <Gift className="h-3.5 w-3.5" />
              Free Bonus
            </div>

            <h2
              id="bonus"
              className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl"
            >
              50 AI Video Prompts <br />
              <span className="gradient-text">for UGC Creators</span>
            </h2>

            <p className="mt-5 text-muted sm:text-lg">
              A curated prompt library — the exact formulas behind the
              highest-performing videos — delivered as a PDF to your inbox the
              moment you register for the class.
            </p>

            <ul className="mt-6 space-y-3 text-[15px] text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Categorized by niche (faceless, product, cinematic, comedy).
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Optimized for UGC, brand content and faceless videos.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Copy &amp; paste ready — no editing required.
              </li>
            </ul>

            <div className="mt-8 max-w-sm">
              <CtaButton size="lg" fullWidth source="bonus">
                Claim the Bonus + Masterclass
              </CtaButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -4 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm"
          >
            <MockupBook />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/** Lightweight CSS 3D mockup of a PDF/booklet cover. */
function MockupBook() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-accent/30 to-accent-2/30 blur-3xl"
      />

      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-2 via-surface to-background shadow-2xl">
        {/* Spine */}
        <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-accent-2 to-accent" />

        <div className="flex h-full flex-col justify-between p-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
              Free PDF · 2026 Edition
            </p>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight">
              50 AI Video Prompts
            </h3>
            <p className="mt-2 text-sm text-muted">
              For UGC &amp; AI video creators.
            </p>
          </div>

          <div
            aria-hidden
            className="relative h-32 w-full overflow-hidden rounded-xl border border-border bg-background/60"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.35),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.4),transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Download className="h-8 w-8 text-foreground/80" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted">
            <span>AI Video Masterclass</span>
            <span>50 Prompts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
