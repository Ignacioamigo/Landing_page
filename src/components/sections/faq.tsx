"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";

const FAQS = [
  {
    q: "Is this class really free?",
    a: "Yes, 100% free. No credit card, no hidden fee. You register with your email and get instant access to the full session plus the 50 AI Prompts PDF.",
  },
  {
    q: "Do I need any experience with AI or video editing?",
    a: "None at all. The class is built for complete beginners. If you can copy and paste a prompt, you can follow along and create your first video the same day.",
  },
  {
    q: "How long is the masterclass?",
    a: "Around 60 minutes. It's recorded so you can watch at your own pace, pause, and rewind as many times as you need.",
  },
  {
    q: "Is it live or pre-recorded?",
    a: "It's a recorded session — available to watch immediately after you register. No need to wait for a scheduled date.",
  },
  {
    q: "What tools do I need?",
    a: "We cover the full stack inside the class — Sora, Runway, ElevenLabs, Kling and more. Most have free tiers so you can start without spending anything.",
  },
  {
    q: "Will I be able to make money with this?",
    a: "The third pillar of the class covers exactly that: how to land brand deals, set your rates and build a client pipeline. Several students have landed their first paid deal within 10 days.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="faq-title">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            FAQ
          </p>
          <h2
            id="faq-title"
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Still have{" "}
            <span className="gradient-text">questions?</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-border">
          {FAQS.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-display text-[16px] font-semibold leading-snug">
                  {faq.q}
                </span>
                <span
                  className="shrink-0 text-muted transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>

              {open === i && (
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
