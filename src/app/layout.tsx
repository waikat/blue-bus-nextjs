import type { Metadata } from "next";
import { Outfit, Raleway } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const BASE_URL = "https://www.kiteboardingbonaire.com";
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kiteboarding Bonaire | The Blue Bus — IKO Kite School Since 2001",
    template: "%s | Kiteboarding Bonaire",
  },
  description:
    "Bonaire's original kiteboarding school since 2001. IKO certified kitesurf lessons, gear rentals, and kite safaris at Atlantis Beach. 300+ wind days a year.",
  keywords: [
    "kiteboarding Bonaire",
    "kitesurf lessons Bonaire",
    "kite school Bonaire",
    "IKO certified Bonaire",
    "Atlantis Beach Bonaire",
    "The Blue Bus Bonaire",
    "kitesurfing Caribbean",
    "kite rentals Bonaire",
    "learn to kitesurf Bonaire",
  ],
  authors: [{ name: "Kiteboarding Bonaire" }],
  creator: "Kiteboarding Bonaire",
  publisher: "Kiteboarding Bonaire",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Kiteboarding Bonaire",
    title: "Kiteboarding Bonaire | The Blue Bus — IKO Kite School Since 2001",
    description:
      "Bonaire's original kiteboarding school since 2001. IKO certified kitesurf lessons, gear rentals, and kite safaris at Atlantis Beach.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kiteboarding Bonaire — Atlantis Beach, The Blue Bus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiteboarding Bonaire | The Blue Bus — IKO Kite School Since 2001",
    description:
      "Bonaire's original kiteboarding school since 2001. IKO certified kitesurf lessons, gear rentals, and kite safaris at Atlantis Beach.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.gif",
    shortcut: "/favicon.gif",
    apple: "/favicon.gif",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Kiteboarding Bonaire — The Blue Bus",
  description:
    "Bonaire's original IKO certified kiteboarding school since 2001. Kitesurf lessons, gear rentals, and kite safaris at Atlantis Beach.",
  url: BASE_URL,
  telephone: "+5997015483",
  email: "info@kiteboardingbonaire.com",
  foundingDate: "2001",
  image: OG_IMAGE,
  logo: `${BASE_URL}/favicon.gif`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Atlantis Beach",
    addressLocality: "Kralendijk",
    addressRegion: "Bonaire",
    addressCountry: "BQ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.066,
    longitude: -68.282,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
    ],
    opens: "09:00",
    closes: "17:00",
  },
  sameAs: [
    "https://www.instagram.com/kiteboardingbonaire",
    "https://g.page/r/CSyJMvsyaLAJEBE",
  ],
  hasMap: "https://maps.google.com/?q=Atlantis+Beach+Bonaire",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "100",
    bestRating: "5",
  },
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} ${raleway.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* STINAPA bar — sitewide, thin, unobtrusive */}
        <div
          className="w-full flex items-center justify-center px-4 py-1.5"
          style={{ background: "hsl(213,85%,30%)", borderBottom: "1px solid rgba(255,255,255,0.10)" }}
        >
          <p className="font-body text-[11px] text-white/70 text-center">
            A mandatory STINAPA Bonaire National Park fee is required before entering the water.{" "}
            <a
              href="https://stinapa.bonairenaturefee.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:text-white/90 transition-opacity"
            >
              Purchase online
            </a>
          </p>
        </div>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
