"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "@/components/BookingModal";
import lessonAction from "@/assets/lesson-action.jpg";
import rentalsHero from "@/assets/rentals-hero.jpg";
import beachSetup from "@/assets/beach-setup.jpg";

const WHATSAPP_URL = "https://wa.me/5997015483?text=Hi!%20I'm%20interested%20in%20equipment%20rentals%20at%20Bonaire";
const VIKING_BUNDLE_ID = "3700000022000000b8e211e0"; // Bundle booking
const VIKING_RENTALS_ID = "g37000000040000005a124865"; // Fallback individual

// Design system colors
const OCEAN = "hsl(213,85%,38%)";
const OCEAN_DEEP = "hsl(213,85%,22%)";
const CYAN = "hsl(186,100%,42%)";
const SAND = "hsl(42,35%,97%)";
const INK = "hsl(0,0%,10%)";

// Animations (hero only)
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// All other sections: opacity fadeIn ONLY
const fadeInOnly = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } };

type Duration = "half" | "full";

// ToggleSwitch Component
function ToggleSwitch({
  leftLabel,
  rightLabel,
  value,
  onChange,
}: {
  leftLabel: string;
  rightLabel: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button onClick={() => onChange(false)} className="text-right transition-all duration-200" style={{ minWidth: 100 }}>
        <span className="font-black uppercase tracking-[0.12em] block transition-colors duration-200" style={{ fontSize: 12, color: !value ? INK : "rgba(0,0,0,0.35)" }}>
          {leftLabel}
        </span>
      </button>

      <button
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className="flex-shrink-0 relative transition-colors duration-300"
        style={{
          width: 50,
          height: 28,
          borderRadius: 4,
          background: value ? CYAN : OCEAN,
          border: "none",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <div
          className="absolute"
          style={{
            top: 3,
            left: value ? 26 : 3,
            width: 22,
            height: 22,
            borderRadius: 2,
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            transition: "left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </button>

      <button onClick={() => onChange(true)} className="text-left transition-all duration-200" style={{ minWidth: 100 }}>
        <span className="font-black uppercase tracking-[0.12em] block transition-colors duration-200" style={{ fontSize: 12, color: value ? INK : "rgba(0,0,0,0.35)" }}>
          {rightLabel}
        </span>
      </button>
    </div>
  );
}

const tiers = [
  {
    name: "Kites",
    tagline: "Complete kite sets",
    desc: "Kite and bar included. Ready to go.",
    featured: false,
    rows: [
      { product: "Kite set", half: "$80", full: "$100", note: "Includes kite and bar" },
    ],
  },
  {
    name: "Kite Only",
    tagline: "Kite and bar",
    desc: "Bring your own board.",
    featured: false,
    rows: [
      { product: "Kite rental", half: "$60", full: "$80", note: "Kite and bar only" },
    ],
  },
  {
    name: "Foils",
    tagline: "Hydrofoil rentals",
    desc: "Experience foiling on Atlantis Beach.",
    featured: false,
    rows: [
      { product: "Foil rental", half: "$100", full: "$140", note: "Includes foil board" },
    ],
  },
  {
    name: "Boards",
    tagline: "Twintips and directional",
    desc: "Bring your own kite.",
    featured: false,
    rows: [
      { product: "Board rental", half: "$25", full: "$40", note: "Twintip or directional" },
    ],
  },
  {
    name: "Storage",
    tagline: "Locker rentals",
    desc: "Safe storage for your gear.",
    featured: false,
    rows: [
      { product: "Locker per day", half: "$10", full: "$10", note: "" },
      { product: "Locker per week", half: "$60", full: "$60", note: "" },
      { product: "Locker per month", half: "$180", full: "$180", note: "" },
    ],
  },
];

export default function Rentals() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isDuration, setIsDuration] = useState(false);

  return (
    <div style={{ background: SAND }}>
      {/* Hero */}
      <section style={{ background: OCEAN_DEEP }} className="pt-8 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="category-label mb-4" style={{ color: CYAN }}>
                Rent quality gear
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="font-display font-black text-white uppercase tracking-tighter mb-6"
                style={{ fontSize: "clamp(44px,8vw,100px)", lineHeight: 0.95 }}
              >
                Rentals
              </motion.h1>
              <motion.p variants={fadeUp} className="font-body text-white/75 text-base leading-relaxed mb-8">
                Everything you need, nothing you have to carry. Half day or full day. Bring your own or rent the complete setup.
              </motion.p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="overflow-hidden rounded-lg">
              <img src={rentalsHero.src} alt="Rental gear at Bonaire" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Session Bundles */}
      <section style={{ background: SAND }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInOnly} className="mb-10">
            <p className="category-label mb-3" style={{ color: CYAN }}>
              Save 15 percent
            </p>
            <h2 className="font-display font-black text-foreground uppercase tracking-tighter" style={{ fontSize: "clamp(28px,4vw,52px)", lineHeight: 0.91 }}>
              Book a full package
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInOnly}
            className="p-8 md:p-12 mb-8"
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 4px 16px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(0,0,0,0.05)",
            }}
          >
            <p className="font-body text-foreground/70 text-base leading-relaxed mb-6">
              Book a complete rental package for the day and save 15 percent. Includes kite set, board, harness, and all the gear you need to make the most of your time at Atlantis Beach. Perfect for trips or extended visits.
            </p>
            <a
              href={`https://app.vikingbookings.com/widget/booking/${VIKING_BUNDLE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-display font-black text-sm uppercase tracking-widest rounded text-white transition-colors"
              style={{ background: OCEAN, cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = OCEAN_DEEP)}
              onMouseLeave={(e) => (e.currentTarget.style.background = OCEAN)}
            >
              Book a Bundle
            </a>
          </motion.div>
        </div>
      </section>

      {/* Individual Rentals */}
      <section style={{ background: SAND }} className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInOnly} className="mb-12">
            <p className="category-label mb-3" style={{ color: CYAN }}>
              Mix and match
            </p>
            <h2 className="font-display font-black text-foreground uppercase tracking-tighter mb-2" style={{ fontSize: "clamp(28px,4vw,52px)", lineHeight: 0.91 }}>
              Rent individually
            </h2>
            <p className="font-body text-foreground/60 text-base">Choose your own rental combination.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInOnly} className="mb-8 flex justify-center">
            <ToggleSwitch leftLabel="Half Day" rightLabel="Full Day" value={isDuration} onChange={setIsDuration} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInOnly}
                className="p-6 md:p-8 rounded-lg"
                style={{
                  background: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)",
                }}
              >
                <p className="category-label mb-2" style={{ color: CYAN }}>
                  {tier.tagline}
                </p>
                <h3 className="font-display font-black text-foreground uppercase tracking-tighter text-xl leading-tight mb-2">{tier.name}</h3>
                <p className="font-body text-foreground/60 text-sm mb-6">{tier.desc}</p>

                <div className="space-y-4">
                  {tier.rows.map((row, idx) => {
                    const price = isDuration ? row.full : row.half;
                    return (
                      <div key={idx} className="flex justify-between items-baseline gap-4">
                        <div>
                          <p className="font-display font-black text-foreground text-sm uppercase tracking-wide">{row.product}</p>
                          {row.note && <p className="font-body text-foreground/50 text-xs mt-0.5">{row.note}</p>}
                        </div>
                        <p className="font-display font-black text-foreground text-lg flex-shrink-0">{price}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: SAND }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInOnly} className="p-8 md:p-12 text-center rounded-lg" style={{ background: OCEAN_DEEP }}>
            <p className="category-label mb-4" style={{ color: CYAN }}>
              Questions?
            </p>
            <h2 className="font-display font-black text-white uppercase tracking-tighter mb-6" style={{ fontSize: "clamp(28px,4vw,52px)", lineHeight: 0.91 }}>
              Get in touch
            </h2>
            <p className="font-body text-white/75 text-base mb-8 max-w-2xl mx-auto">
              Not sure what you need? Message us on WhatsApp or send an email. We'll help you pick the right gear for your session.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 font-display font-black text-sm uppercase tracking-widest rounded text-black transition-colors" style={{ background: CYAN }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
              Message on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} title="Reserve Gear" productId={VIKING_RENTALS_ID} />
    </div>
  );
}
