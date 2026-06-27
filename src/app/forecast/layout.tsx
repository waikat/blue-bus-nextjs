import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Live Wind Forecast Bonaire | Atlantis Beach Kite Conditions",
  description: "Live wind speed, direction, and 7-day forecast for Atlantis Beach, Bonaire. Powered by our Tempest station on the beach. Updated every 5 minutes.",
  alternates: { canonical: "https://www.kiteboardingbonaire.com/forecast" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
