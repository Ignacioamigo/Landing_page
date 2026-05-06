"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const TESTIMONIALS = [
  {
    quote:
      "I posted my first AI UGC video 3 days after the masterclass. It hit 80k views in a week. I had zero experience before this.",
    name: "Daniela M.",
    tag: "First video · 80k views",
  },
  {
    quote:
      "Landed a €400 brand deal within 10 days of finishing the class. The outreach template alone was worth it.",
    name: "Carlos R.",
    tag: "€400 brand deal · 10 days",
  },
  {
    quote:
      "I was spending 4 hours per video. Now it takes me 15 minutes. This workflow changed everything about how I create content.",
    name: "Sophie L.",
    tag: "4h → 15min per video",
  },
  {
    quote:
      "As someone who is camera-shy, knowing I can build a full content business without showing my face was life-changing.",
    name: "Marcos T.",
    tag: "Faceless creator",
  },
  {
    quote:
      "The prompt library alone saved me weeks of trial and error. Every video I make now starts from one of those templates.",
    name: "Alicia V.",
    tag: "Uses the prompt PDF daily",
  },
  {
    quote:
      "I was skeptical. Then I made €1,200 in my first month doing AI UGC for local brands. This is the real deal.",
    name: "Julien K.",
    tag: "€1,200 first month",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="testimonials-title">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Real results
          </p>
          <h2
            id="testimonials-title"
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl"
          >
            People who{" "}
            <span className="gradient-text">already did this</span>
          </h2>
          <p className="mt-4 text-muted sm:text-lg">
            Community of 500+ creators already using this system.
          </p>
        </div>

        <div
          className="mt-12 flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
              className="shrink-0 rounded-2xl border border-border bg-surface p-6"
              style={{ scrollSnapAlign: "start", width: "clamp(260px, 75vw, 340px)" }}
            >
              <p className="text-[15px] leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold">{t.name}</p>
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  {t.tag}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
