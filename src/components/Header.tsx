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

interface HeaderProps {
  onWeatherClick: () => void;
  weatherOpen: boolean;
  setWeatherOpen: (open: boolean) => void;
}

const HEADER_BG = "hsl(213,85%,38%)";
const CYAN      = "hsl(186,100%,42%)";

const navLinks = [
  { label: "Lessons", href: "/lessons" },
  { label: "Rentals", href: "/rentals" },
  { label: "Trips",   href: "/trips"   },
  { label: "About",   href: "/about"   },
];

export default function Header({ onWeatherClick, weatherOpen, setWeatherOpen }: HeaderProps) {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* Main header — sits directly under the STINAPA bar in layout.tsx */}
      <header
        className="sticky top-0 left-0 right-0 z-40"
        style={{ background: HEADER_BG }}
      >
        <div className="flex items-center h-20 md:h-[88px] px-5 md:px-8 lg:px-12">

          {/* Logo */}
          <Link href="/" aria-label="Kiteboarding Bonaire Home" className="flex-shrink-0 flex items-center">
            <img src={logo.src} alt="Kiteboarding Bonaire" className="h-14 md:h-16 w-auto" />
          </Link>

          {/* Desktop nav — centred */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group px-3 lg:px-4 py-2 font-display font-black text-[15px] uppercase tracking-[0.14em] whitespace-nowrap text-white transition-colors duration-150"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 -z-10 transition-opacity duration-150 ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{ background: CYAN }}
                  />
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop right: wind widget + book now */}
          <div className="hidden md:flex items-center gap-4 ml-auto flex-shrink-0">
            <div className="text-white/85">
              <WindWidget onClick={onWeatherClick} />
            </div>
            <div className="w-px h-5 bg-white/20" />
            <button onClick={() => setBookingOpen(true)} className="btn-cyan">
              Book Now
            </button>
          </div>

          {/* Mobile right: menu toggle */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              className="p-3"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X className="w-6 h-6 text-white" />
                : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2"
            style={{ background: HEADER_BG }}
          >
            <button
              className="absolute top-5 right-5 p-3"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-7 h-7 text-white" />
            </button>

            <Link href="/" className="mb-6" onClick={() => setMobileOpen(false)}>
              <img src={logo.src} alt="Kiteboarding Bonaire" className="h-16 w-auto" />
            </Link>

            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    className={`block w-full text-center py-5 font-display font-black text-3xl uppercase tracking-[0.1em] transition-colors ${
                      active ? "text-accent" : "text-white"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              onClick={() => { setMobileOpen(false); setBookingOpen(true); }}
              className="mt-8 font-display font-black text-lg uppercase tracking-widest px-12 py-5 text-white"
              style={{ background: CYAN }}
            >
              Book Now
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-white/60"
            >
              <WindWidget onClick={() => { setMobileOpen(false); onWeatherClick(); }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <WeatherModal open={weatherOpen} onOpenChange={setWeatherOpen} />
    </>
  );
}
