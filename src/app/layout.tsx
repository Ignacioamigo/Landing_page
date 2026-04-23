import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ModalProvider } from "@/components/lead-modal/modal-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free AI Video Masterclass — Create Viral AI Videos in 10 Minutes",
    template: "%s | AI Video Masterclass",
  },
  description:
    "Join the exact step-by-step system used to build a 17k+ audience. Register to unlock the tools, prompts and automated workflows that create viral AI videos in under 10 minutes.",
  keywords: [
    "AI video",
    "Sora",
    "Runway",
    "Kling",
    "Midjourney",
    "AI masterclass",
    "faceless video",
    "viral AI videos",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Free AI Video Masterclass",
    description:
      "Create viral AI videos in under 10 minutes — without showing your face. Free live masterclass.",
    siteName: "AI Video Masterclass",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Video Masterclass",
    description:
      "Create viral AI videos in under 10 minutes — without showing your face.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent/40">
        <ModalProvider>{children}</ModalProvider>

        {PIXEL_ID ? (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        ) : null}
      </body>
    </html>
  );
}
