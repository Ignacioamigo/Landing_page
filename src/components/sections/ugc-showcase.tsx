import Script from "next/script";
import { Container } from "@/components/ui/container";

const UGC_VIDEOS: { id: string; aspect: number; paddingTop: string; label: string }[] = [
  { id: "tgg2ls6vfl", aspect: 0.5714285714285714, paddingTop: "175.0%",   label: "Use case 1" },
  { id: "r4chtvy1xn", aspect: 0.5625,             paddingTop: "177.78%",  label: "Use case 2" },
  { id: "977tr6a9h7", aspect: 0.5564142194744977, paddingTop: "179.72%",  label: "Use case 3" },
  { id: "91yjm13prw", aspect: 0.5590062111801242, paddingTop: "178.89%",  label: "Use case 4" },
  { id: "3rggfn5lk9", aspect: 0.5625,             paddingTop: "177.78%",  label: "Use case 5" },
  { id: "9gwshdutsc", aspect: 0.5625,             paddingTop: "177.78%",  label: "Use case 6" },
];

export function UgcShowcase() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="ugc-showcase-title">
      {/* Load each video-specific Wistia module (player.js is global in layout) */}
      {UGC_VIDEOS.map(({ id }) => (
        <Script
          key={id}
          src={`https://fast.wistia.com/embed/${id}.js`}
          strategy="afterInteractive"
          type="module"
        />
      ))}

      {/* Swatch styles for all videos — blurred thumbnail while player initialises */}
      <style>{UGC_VIDEOS.map(({ id, paddingTop }) => `
        wistia-player[media-id='${id}']:not(:defined) {
          background: center / contain no-repeat
            url('https://fast.wistia.com/embed/medias/${id}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: ${paddingTop};
        }
      `).join("")}</style>

      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Real examples
          </p>
          <h2
            id="ugc-showcase-title"
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl"
          >
            UGC videos{" "}
            <span className="gradient-text">made by the agency</span>
          </h2>
          <p className="mt-4 text-muted sm:text-lg">
            Real use cases. Vertical videos ready for Instagram Reels, TikTok
            and YouTube Shorts.
          </p>
        </div>

        {/* Horizontal scroll on all screen sizes */}
        <div
          className="mt-12 flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {UGC_VIDEOS.map(({ id, aspect, label }) => (
            <article
              key={id}
              className="shrink-0 overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              style={{ scrollSnapAlign: "start", width: "clamp(220px, 38vw, 320px)" }}
            >
              <wistia-player
                media-id={id}
                aspect={aspect}
                style={{ display: "block", width: "100%" }}
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
