import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const year = new Date().getFullYear();

  return (
    <main className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: January {year}</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3">
            <p>
              By accessing the AI Video Masterclass website and registering for
              the free class, you agree to these Terms of Service. Please read
              them carefully.
            </p>

            <h2>1. The free masterclass</h2>
            <p>
              The masterclass is provided free of charge. Access is granted upon
              registration with a valid email address. We reserve the right to
              revoke access at any time for violation of these terms.
            </p>

            <h2>2. Intellectual property</h2>
            <p>
              All content — including videos, PDFs, prompts, and written
              materials — is the property of AI Video Masterclass. You may not
              reproduce, redistribute, or resell any part of the content without
              prior written permission.
            </p>

            <h2>3. Acceptable use</h2>
            <p>
              You agree not to use the masterclass content for unlawful
              purposes, to harass others, or to distribute the content to third
              parties without authorisation.
            </p>

            <h2>4. Disclaimer</h2>
            <p>
              Results shown in testimonials are not typical and are not
              guaranteed. Income and growth results depend on individual effort,
              experience, and market conditions. The masterclass is provided for
              educational purposes only.
            </p>

            <h2>5. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, AI Video Masterclass shall
              not be liable for any indirect, incidental, or consequential
              damages arising from your use of the content.
            </p>

            <h2>6. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the
              site after changes are posted constitutes your acceptance of the
              new terms.
            </p>

            <h2>7. Contact</h2>
            <p>
              Questions about these terms? Email us at{" "}
              <a
                href="mailto:hello@notfilmedai.com"
                className="text-accent hover:underline"
              >
                hello@notfilmedai.com
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
