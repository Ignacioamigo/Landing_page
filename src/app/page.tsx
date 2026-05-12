import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Value } from "@/components/sections/value";
import { UgcShowcase } from "@/components/sections/ugc-showcase";
import { Bonus } from "@/components/sections/bonus";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <main className="flex-1">
      <Hero />
      <SocialProof />
      <Value />
      <UgcShowcase />
      <Testimonials />
      <Bonus />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
