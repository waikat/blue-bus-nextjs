"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { switchLocalePath, getLocaleFromPathname } from "@/i18n/config";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const switchPath = switchLocalePath(pathname);

  return (
    <Link
      href={switchPath}
      className={`font-display font-black text-xs uppercase tracking-widest transition-colors hover:text-accent ${className}`}
      aria-label={locale === "en" ? "Switch to Dutch" : "Switch to English"}
    >
      {locale === "en" ? "NL" : "EN"}
    </Link>
  );
}
