import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kitesurf Lessons Bonaire | Beginner to Advanced — IKO Certified",
  description: "IKO certified kitesurf lessons at Atlantis Beach, Bonaire. Beginner packages from $290. Radio helmets, boat support, max 2 students per instructor. Book online.",
  alternates: { canonical: "https://www.kiteboardingbonaire.com/lessons" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
