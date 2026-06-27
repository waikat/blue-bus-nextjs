import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "FAQ & Policies | Kiteboarding Bonaire",
  description: "Everything you need to know before your kitesurf lesson or rental in Bonaire. Cancellation policy, what's included, minimum age, best wind season, and contact form.",
  alternates: { canonical: "https://www.kiteboardingbonaire.com/info" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
