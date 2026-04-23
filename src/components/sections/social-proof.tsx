import { Container } from "@/components/ui/container";
import { TrendingUp } from "lucide-react";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const TOOLS = [
  "Sora",
  "Runway",
  "Kling",
  "Midjourney",
  "ElevenLabs",
  "Pika",
  "Luma",
  "Suno",
];

export function SocialProof() {
  return (
    <section
      aria-label="Social proof"
      className="border-y border-border bg-background/60 py-12 sm:py-14"
    >
      <Container>
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white">
              <InstagramGlyph className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                17,000<span className="gradient-text">+</span> followers
              </p>
              <p className="text-sm text-muted">
                A proven audience trusting this exact system
              </p>
            </div>
          </div>

          <div className="hidden h-14 w-px bg-border sm:block" />

          <div className="flex items-center gap-3 text-sm text-muted">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span>
              Used to publish viral faceless videos on Instagram &amp; TikTok
            </span>
          </div>
        </div>

        <div
          className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-label="Tools taught in the course"
        >
          <div className="flex w-max animate-marquee gap-12 pr-12">
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <div
                key={`${tool}-${i}`}
                className="flex items-center text-lg font-medium tracking-wide text-muted/70 sm:text-xl"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
