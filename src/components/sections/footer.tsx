import { Container } from "@/components/ui/container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-10 text-sm text-muted">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© {year} AI Video Masterclass. All rights reserved.</p>
        <nav className="flex gap-6">
          <a
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </a>
          <a
            href="mailto:support@example.com"
            className="transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </nav>
      </Container>
    </footer>
  );
}
