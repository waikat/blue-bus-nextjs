"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "./BookingModal";
import WeatherModal from "./WeatherModal";
import WindWidget from "./WindWidget";
import logo from "@/assets/Kiteboarding-bonaire-logo.gif";

const navLinks = [
  { label: "Lessons", href: "/lessons" },
  { label: "Rentals", href: "/rentals" },
  { label: "Trips",   href: "/trips"   },
  { label: "About",   href: "/about"   },
];

interface HeaderProps {
  onWeatherClick: () => void;
  weatherOpen: boolean;
  setWeatherOpen: (open: boolean) => void;
}

export default function Header({ onWeatherClick, weatherOpen, setWeatherOpen }: HeaderProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isHomePage = pathname === "/";

  return (
    <>
      {/* STINAPA utility bar — homepage only, compact on mobile */}
      {isHomePage && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-1.5 md:py-2 ${
            scrolled ? "h-0 opacity-0 overflow-hidden py-0" : "opacity-100"
          }`}
          style={{ background: "linear-gradient(90deg, #4caf50, #f5c518, #e8643c)", color: "#1a1a1a" }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-body font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wide leading-snug">
              ⚠️ Mandatory STINAPA Nature Fee Required.{" "}
              <a href="https://stinapa.bonairenaturefee.org/" target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-2 hover:opacity-70 transition-opacity">
                Purchase online
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Main nav */}
      <header className={`fixed left-0 right-0 z-40 bg-primary transition-all duration-300 ${isHomePage && !scrolled ? "top-7 md:top-8" : "top-0"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">

          <Link href="/" aria-label="Kiteboarding Bonaire Home">
            <img src={logo.src} alt="Kiteboarding Bonaire" className="h-10 md:h-14 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`font-display font-black text-sm uppercase tracking-[0.15em] transition-colors hover:text-accent ${pathname === link.href ? "text-accent" : "text-primary-foreground"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-primary-foreground">
              <WindWidget onClick={onWeatherClick} />
            </div>
            <button onClick={() => setBookingOpen(true)} className="btn-cyan text-sm py-2.5 px-6">Book Now</button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X className="w-6 h-6 text-primary-foreground" /> : <Menu className="w-6 h-6 text-primary-foreground" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center gap-6">
            <button className="absolute top-5 right-5 p-2" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="w-8 h-8 text-primary-foreground" />
            </button>
            <Link href="/" className="mb-4" onClick={() => setMobileOpen(false)}>
              <img src={logo.src} alt="Kiteboarding Bonaire" className="h-14 w-auto" />
            </Link>
            {navLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="w-full">
                <Link href={link.href} className={`block w-full text-center py-4 font-display font-black text-3xl uppercase tracking-[0.1em] transition-colors active:bg-white/10 ${pathname === link.href ? "text-accent" : "text-primary-foreground"}`} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} onClick={() => { setMobileOpen(false); setBookingOpen(true); }} className="btn-cyan mt-6 text-lg w-3/4 max-w-xs">
              Book Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <WeatherModal open={weatherOpen} onOpenChange={setWeatherOpen} />
    </>
  );
}
