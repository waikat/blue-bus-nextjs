"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const CYAN = "hsl(186,100%,42%)";
const OCEAN = "hsl(213,85%,38%)";

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem("kbb-install-dismissed");
    if (dismissed) return;

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const timer = setTimeout(() => setShow(true), 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    setShow(false);
    localStorage.setItem("kbb-install-dismissed", "true");
  }

  async function handleInstall() {
    if (deferredPrompt && "prompt" in deferredPrompt) {
      (deferredPrompt as { prompt: () => void }).prompt();
    }
    dismiss();
  }

  if (!show) return null;

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-4"
      style={{ background: OCEAN }}
    >
      <button
        onClick={dismiss}
        className="absolute top-3 right-3 p-1"
        aria-label="Dismiss"
      >
        <X className="w-5 h-5 text-white/50" />
      </button>

      <p
        className="font-display font-black text-white uppercase tracking-widest mb-1"
        style={{ fontSize: 12 }}
      >
        Check wind daily
      </p>
      <p
        className="font-body text-white/70 mb-4"
        style={{ fontSize: 14 }}
      >
        {isIOS
          ? "Tap the share button, then \"Add to Home Screen\" for instant access."
          : "Add Kiteboarding Bonaire to your home screen for instant wind checks."}
      </p>

      {!isIOS && deferredPrompt ? (
        <button
          onClick={handleInstall}
          className="font-display font-black uppercase tracking-widest px-6 py-3 text-white"
          style={{ fontSize: 11, background: CYAN, border: "none", borderRadius: 0 }}
        >
          Add to Home Screen
        </button>
      ) : isIOS ? (
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-white/70 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <p className="font-body text-white/70" style={{ fontSize: 13 }}>
            Tap{" "}
            <span className="text-white font-bold">Share</span> then{" "}
            <span className="text-white font-bold">Add to Home Screen</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
