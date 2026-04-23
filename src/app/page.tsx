import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Value } from "@/components/sections/value";
import { Bonus } from "@/components/sections/bonus";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <main className="flex-1">
      <Hero />
      <SocialProof />
      <Value />
      <Bonus />
      <FinalCta />
      <Footer />
    </main>
  );
}
