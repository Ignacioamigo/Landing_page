import { Layers, Workflow, DollarSign } from "lucide-react";
import { Container } from "@/components/ui/container";

const PILLARS = [
  {
    icon: Layers,
    title: "The AI Ecosystem",
    description:
      "The exact tools you need — and the ones to ignore. Stop wasting hours comparing apps and start shipping with a lean, battle-tested stack.",
  },
  {
    icon: Workflow,
    title: "The 10-Min Workflow",
    description:
      "A repeatable process from prompt to published: scripting, visuals, voiceover, editing and scheduling — in under ten minutes per video.",
  },
  {
    icon: DollarSign,
    title: "Real Monetization",
    description:
      "How to turn this skill into a real income stream in today's market: offers that convert, outreach that works, and pricing that scales.",
  },
];

export function Value() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="what-youll-learn">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            What you&apos;ll learn
          </p>
          <h2
            id="what-youll-learn"
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Three pillars. <span className="gradient-text">Zero fluff.</span>
          </h2>
          <p className="mt-4 text-muted sm:text-lg">
            Everything you need to go from zero to consistently shipping viral
            AI videos — delivered in a 60-minute live session.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, description }, i) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent">
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-5 text-xs font-semibold text-muted">
                Pillar {i + 1}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
