"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [weatherOpen, setWeatherOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Header
        onWeatherClick={() => setWeatherOpen(true)}
        weatherOpen={weatherOpen}
        setWeatherOpen={setWeatherOpen}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
