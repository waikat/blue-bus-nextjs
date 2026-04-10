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

export const metadata: Metadata = {
  title: "Kiteboarding Bonaire | The Original Blue Bus Since 2001",
  description: "Kiteboarding Bonaire - The Original Blue Bus since 2001. IKO certified kitesurfing lessons, rentals, and kite safaris in Bonaire, Caribbean.",
  openGraph: {
    title: "Kiteboarding Bonaire | The Original Blue Bus",
    description: "Learn kitesurfing in paradise. IKO certified school with 20+ years experience on Bonaire's Atlantis Beach.",
    type: "website",
    url: "https://kiteboardingbonaire.com",
    images: [{ url: "https://kiteboardingbonaire.com/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiteboarding Bonaire | The Original Blue Bus",
    description: "Learn kitesurfing in paradise. IKO certified school with 20+ years experience on Bonaire's Atlantis Beach.",
    images: ["https://kiteboardingbonaire.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.gif",
    shortcut: "/favicon.gif",
    apple: "/favicon.gif",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${raleway.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
