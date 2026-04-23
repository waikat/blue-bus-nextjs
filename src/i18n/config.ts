import { translations, type Locale } from "./translations";

export const locales: Locale[] = ["en", "nl"];
export const defaultLocale: Locale = "en";

// URL slug mapping per locale
export const slugs: Record<Locale, Record<string, string>> = {
  en: {
    lessons:  "lessons",
    rentals:  "rentals",
    trips:    "trips",
    about:    "about",
    forecast: "forecast",
    info:     "info",
    privacy:  "privacy",
    terms:    "terms",
  },
  nl: {
    lessons:  "lessen",
    rentals:  "verhuur",
    trips:    "reizen",
    about:    "over-ons",
    forecast: "voorspelling",
    info:     "info",
    privacy:  "privacy",
    terms:    "algemene-voorwaarden",
  },
};

// Reverse map: given a NL slug, return the route key
export const nlSlugToKey: Record<string, string> = Object.fromEntries(
  Object.entries(slugs.nl).map(([key, slug]) => [slug, key])
);

// Get translation object for a locale
export function t(locale: Locale) {
  return translations[locale];
}

// Build a localized href
export function localePath(locale: Locale, route: keyof typeof slugs.en): string {
  if (locale === "en") return `/${slugs.en[route]}`;
  return `/nl/${slugs.nl[route]}`;
}

// Build home path
export function homeLocalePath(locale: Locale): string {
  return locale === "en" ? "/" : "/nl";
}

// Detect locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.startsWith("/nl")) return "nl";
  return "en";
}

// Switch locale — given current path, return same page in other locale
export function switchLocalePath(pathname: string): string {
  if (pathname.startsWith("/nl")) {
    // NL → EN
    const nlPath = pathname.replace(/^\/nl/, "") || "/";
    // Check if it's a known NL slug and map back to EN
    const segments = nlPath.split("/").filter(Boolean);
    if (segments.length === 0) return "/";
    const key = nlSlugToKey[segments[0]];
    if (key) {
      return `/${slugs.en[key as keyof typeof slugs.en]}${segments.slice(1).join("/") ? "/" + segments.slice(1).join("/") : ""}`;
    }
    return nlPath;
  } else {
    // EN → NL
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "/nl";
    const key = Object.entries(slugs.en).find(([, slug]) => slug === segments[0])?.[0];
    if (key) {
      return `/nl/${slugs.nl[key as keyof typeof slugs.nl]}${segments.slice(1).join("/") ? "/" + segments.slice(1).join("/") : ""}`;
    }
    return `/nl${pathname}`;
  }
}
