"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "./BookingModal";
import WeatherModal from "./WeatherModal";
import WindWidget from "./WindWidget";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/Kiteboarding-bonaire-logo.gif";
import { getLocaleFromPathname, t } from "@/i18n/config";

interface HeaderProps {
  onWeatherClick: () => void;
  weatherOpen: boolean;
  setWeatherOpen: (open: boolean) => void;
}

// Match the footer's navy exactly so header + footer bookend the page
const HEADER_BG = "hsl(211,100%,12%)";

export default function Header({ onWeatherClick, weatherOpen, setWeatherOpen }: HeaderProps) {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const tr = t(locale);

  const navLinks = [
    { label: tr.nav.lessons, href: locale === "en" ? "/lessons"  : "/nl/lessen"   },
    { label: tr.nav.rentals, href: locale === "en" ? "/rentals"  : "/nl/verhuur"  },
    { label: tr.nav.trips,   href: locale === "en" ? "/trips"    : "/nl/reizen"   },
    { label: tr.nav.about,   href: locale === "en" ? "/about"    : "/nl/over-ons" },
    { label: "Blog",         href: "/blog" },
  ];

  const homeHref = locale === "en" ? "/" : "/nl";
  const isHomePage = pathname === "/" || pathname === "/nl";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* STINAPA bar — homepage only */}
      {isHomePage && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-1.5 ${
            scrolled ? "h-0 opacity-0 overflow-hidden py-0" : "opacity-100"
          }`}
          style={{ background: "linear-gradient(90deg, #4caf50, #f5c518, #e8643c)", color: "#1a1a1a" }}
        >
          <p className="text-center font-body font-bold text-[10px] sm:text-xs uppercase tracking-wide">
            {tr.stinapa.text}{" "}
            <a href="https://stinapa.bonairenaturefee.org/" target="_blank" rel="noopener noreferrer"
              className="underline decoration-2 underline-offset-2 hover:opacity-70 transition-opacity">
              {tr.stinapa.link}
            </a>
          </p>
        </div>
      )}

      {/* ── MAIN HEADER — deep navy to match the footer ───────────────
            Taller bar, bigger logo, more present nav. */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isHomePage && !scrolled ? "top-7 md:top-8" : "top-0"
        }`}
        style={{ background: HEADER_BG }}
      >
        {/* Single row: logo | nav (centre) | right cluster */}
        <div className="flex items-center h-20 md:h-[88px] px-5 md:px-8 lg:px-12">

          {/* Logo — bumped from h-9/h-11 to h-14/h-16 so it actually anchors the bar */}
          <Link href={homeHref} aria-label="Kiteboarding Bonaire Home" className="flex-shrink-0 flex items-center">
            <img src={logo.src} alt="KBB" className="h-14 md:h-16 w-auto" />
          </Link>

          {/* Nav — absolutely centred. Active state is a cyan block over the text. */}
          <nav
            className="hidden md:flex items-center gap-2 lg:gap-3 absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 lg:px-4 py-2 font-display font-black text-[15px] uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-200 ${
                    active ? "text-white" : "text-white hover:text-accent"
                  }`}
                >
                  {/* Cyan block sits BEHIND the text on the active route.
                      Sharp corners, no border-radius — matches the site's "intentional, blocky" voice. */}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10"
                      style={{ background: "hsl(186,100%,42%)" }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right cluster: lang | wind | book */}
          <div className="hidden md:flex items-center gap-4 ml-auto flex-shrink-0">
            <LanguageSwitcher className="text-white/80 hover:text-accent" />
            <div className="w-px h-5 bg-white/20" />
            <div className="text-white/85">
              <WindWidget onClick={onWeatherClick} />
            </div>
            <div className="w-px h-5 bg-white/20" />
            <button
              onClick={() => setBookingOpen(true)}
              className="btn-cyan"
            >
              {tr.nav.bookNow}
            </button>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-3 ml-auto">
            <LanguageSwitcher className="text-white/80" />
            <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen
                ? <X className="w-6 h-6 text-white" />
                : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay — same navy as the bar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
            style={{ background: HEADER_BG }}
          >
            <button className="absolute top-5 right-5 p-2" onClick={() => setMobileOpen(false)}>
              <X className="w-8 h-8 text-white" />
            </button>
            <Link href={homeHref} className="mb-4" onClick={() => setMobileOpen(false)}>
              <img src={logo.src} alt="KBB" className="h-16 w-auto" />
            </Link>
            {navLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="w-full">
                <Link
                  href={link.href}
                  className={`block w-full text-center py-4 font-display font-black text-3xl uppercase tracking-[0.1em] transition-colors ${
                    pathname === link.href ? "text-accent" : "text-white"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              onClick={() => { setMobileOpen(false); setBookingOpen(true); }}
              className="mt-6 font-display font-black text-lg uppercase tracking-widest px-10 py-4 text-white"
              style={{ background: "hsl(186,100%,42%)" }}
            >
              {tr.nav.bookNow}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <WeatherModal open={weatherOpen} onOpenChange={setWeatherOpen} />
    </>
  );
}
