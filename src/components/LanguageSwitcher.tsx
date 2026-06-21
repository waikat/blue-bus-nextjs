"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { switchLocalePath, getLocaleFromPathname } from "@/i18n/config";

const FLAGS: Record<string, string> = {
  en: "🇬🇧",
  nl: "🇳🇱",
};

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const switchPath = switchLocalePath(pathname);
  const targetLocale = locale === "en" ? "nl" : "en";

  return (
    <Link
      href={switchPath}
      className={`flex items-center gap-1.5 font-display font-black text-xs uppercase tracking-widest transition-colors hover:text-accent ${className}`}
      aria-label={locale === "en" ? "Switch to Dutch" : "Switch to English"}
    >
      <span className="text-base leading-none">{FLAGS[targetLocale]}</span>
      <span>{targetLocale.toUpperCase()}</span>
    </Link>
  );
}
