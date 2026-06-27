import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kite Safaris | Brazil 2026 & Caribbean Trips — Kiteboarding Bonaire",
  description: "Small group kite safaris to Brazil and secret Caribbean spots. Max 8 riders, all inclusive. Led by Kiteboarding Bonaire. Brazil 2026 spots open now.",
  alternates: { canonical: "https://www.kiteboardingbonaire.com/trips" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
