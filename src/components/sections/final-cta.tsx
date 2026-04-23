import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/lead-modal/cta-button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="final-cta">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_50%,rgba(139,92,246,0.18)_0%,rgba(9,9,11,0)_70%)]"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-surface p-10 text-center sm:p-14">
          <h2
            id="final-cta"
            className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Your next viral video is{" "}
            <span className="gradient-text">one click away.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted sm:text-lg">
            Save your seat for the free class and get the 50 AI Prompts PDF
            delivered instantly to your inbox.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton size="xl" className="w-full sm:w-auto" source="final-cta" />
          </div>
          <p className="mt-4 text-xs text-muted">
            100% secure. We don&apos;t spam. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}
