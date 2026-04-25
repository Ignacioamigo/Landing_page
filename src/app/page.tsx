import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { UgcShowcase } from "@/components/sections/ugc-showcase";
import { Bonus } from "@/components/sections/bonus";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <main className="flex-1">
      <Hero />
      <SocialProof />
      <UgcShowcase />
      <Bonus />
      <FinalCta />
      <Footer />
    </main>
  );
}
