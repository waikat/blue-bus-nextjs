import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kiteboard Gear Rentals Bonaire | Premium Equipment at Atlantis Beach",
  description: "Rent premium kiteboarding gear at Atlantis Beach, Bonaire. Standard, premium, and foil sets. Half-day from $80. No luggage needed — we have it all.",
  alternates: { canonical: "https://www.kiteboardingbonaire.com/rentals" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
