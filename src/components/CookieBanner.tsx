"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("kbb_cookie_consent");
    if (consent === null) {
      setShowBanner(true);
    } else if (consent === "granted") {
      updateConsent("granted");
    }
  }, []);

  const updateConsent = (status: "granted" | "denied") => {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        analytics_storage: status,
        ad_storage: status,
        ad_user_data: status,
        ad_personalization: status,
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem("kbb_cookie_consent", "granted");
    updateConsent("granted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("kbb_cookie_consent", "denied");
    updateConsent("denied");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 bg-slate-900/95 text-white backdrop-blur-md rounded-xl shadow-2xl border border-white/10 text-xs sm:text-sm">
      <p className="mb-3 text-white/80 leading-relaxed">
        We use cookies to measure website traffic and improve your experience. Read our{" "}
        <Link href="/privacy" className="underline hover:text-white transition-colors">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={handleDecline}
          className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors shadow-md"
        >
          Accept
        </button>
      </div>
    </div>
  );
}