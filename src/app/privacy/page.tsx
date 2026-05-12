import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const year = new Date().getFullYear();

  return (
    <main className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: January {year}</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3">
            <p>
              AI Video Masterclass (&ldquo;we&rdquo;, &ldquo;our&rdquo;) is committed to protecting
              your personal data. This policy explains what we collect, why, and
              how you can control it.
            </p>

            <h2>1. Data we collect</h2>
            <p>
              When you register for the free masterclass we collect your first
              name and email address. We may also collect your IP address,
              browser user agent, and Meta Pixel cookies (<code>_fbp</code>,{" "}
              <code>_fbc</code>) for advertising attribution purposes.
            </p>

            <h2>2. How we use your data</h2>
            <p>
              We use your data to send you access to the masterclass, deliver
              the 50 AI Prompts PDF, and send follow-up emails related to the
              course. We use Meta Conversions API to measure the effectiveness
              of our advertising campaigns.
            </p>

            <h2>3. Email communications</h2>
            <p>
              By registering you agree to receive emails about the masterclass
              and related content. You can unsubscribe at any time using the
              link at the bottom of any email.
            </p>

            <h2>4. Data sharing</h2>
            <p>
              We do not sell your personal data. We share data with the
              following processors: MailerLite (email delivery), Supabase
              (database), and Meta Platforms (advertising attribution).
            </p>

            <h2>5. Data retention</h2>
            <p>
              We retain your data for as long as you are subscribed to our
              email list. You can request deletion at any time by emailing{" "}
              <a
                href="mailto:hello@notfilmedai.com"
                className="text-accent hover:underline"
              >
                hello@notfilmedai.com
              </a>
              .
            </p>

            <h2>6. Your rights</h2>
            <p>
              Under GDPR and applicable law you have the right to access,
              rectify, or delete your personal data, as well as the right to
              restrict or object to processing. To exercise these rights,
              contact us at{" "}
              <a
                href="mailto:hello@notfilmedai.com"
                className="text-accent hover:underline"
              >
                hello@notfilmedai.com
              </a>
              .
            </p>

            <h2>7. Cookies</h2>
            <p>
              We use the Meta Pixel which sets cookies to measure ad
              performance. You can opt out via the Meta Ad Preferences or by
              disabling cookies in your browser settings.
            </p>

            <h2>8. Contact</h2>
            <p>
              Questions about this policy? Email us at{" "}
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
