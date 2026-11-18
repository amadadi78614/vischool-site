import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/Live";
import { SITE, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Foundation Phase School in Mbombela (Grade RR – 3)`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Valencia Islamic School is a registered Foundation Phase school in Valencia Park, Mbombela. CAPS curriculum for Grade RR to Grade 3, with optional Islamic Studies. Admissions open.",
  keywords: ["Valencia Islamic School", "Foundation Phase school Mbombela", "Grade R Nelspruit", "Grade 1 Mbombela", "Islamic school Nelspruit", "CAPS school Valencia Park"],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: "Foundation Phase (Grade RR – 3) in Valencia Park, Mbombela. CAPS curriculum with optional Islamic Studies.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#fbf7ef", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  image: `${SITE.url}/og.png`,
  email: SITE.email,
  telephone: SITE.phoneIntl,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.street}, ${SITE.address.suburb}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.province,
    postalCode: SITE.address.postalCode,
    addressCountry: "ZA",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:30", closes: "14:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:30", closes: "14:00" },
  ],
  description: `Foundation Phase school (Grade RR – 3) at ${fullAddress}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body className="min-h-svh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
