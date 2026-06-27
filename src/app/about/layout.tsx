import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About The Blue Bus | Kiteboarding Bonaire Since 2001",
  description: "The story of Kiteboarding Bonaire and The Blue Bus. Bonaire's original kite school since 2001. Meet Rommel, Carlos, and the instructors who live on this beach.",
  alternates: { canonical: "https://www.kiteboardingbonaire.com/about" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
