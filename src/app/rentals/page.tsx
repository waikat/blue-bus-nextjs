"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "@/components/BookingModal";
import lessonAction from "@/assets/lesson-action.jpg";
import rentalsHero from "@/assets/rentals-hero.jpg";
import beachSetup from "@/assets/beach-setup.jpg";

const WHATSAPP_URL = "https://wa.me/5997015483?text=Hi!%20I'm%20interested%20in%20equipment%20rentals%20at%20Bonaire";
const VIKING_RENTALS_ID = "g37000000040000005a124865";

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

// ToggleSwitch Component (from lessons page)
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
    name: "Standard",
    tagline: "Reliable freeride gear",
    desc: "Great condition, regularly serviced. Everything you need for a solid session.",
    featured: false,
    rows: [
      { product: "Complete set", half: "$80", full: "$120", note: "Kite, bar, board, harness" },
      { product: "Kite and bar", half: "$60", full: "$90", note: "Bring your own board" },
      { product: "Board only", half: "$25", full: "$40", note: "Twintip or directional" },
    ],
  },
  {
    name: "Premium",
    tagline: "Top-of-line gear",
    desc: "Latest models, premium brands. Plus $20 per session over Standard.",
    featured: true,
    rows: [
      { product: "Complete set", half: "$100", full: "$145", note: "Kite, bar, board, harness" },
      { product: "Kite and bar", half: "$80", full: "$115", note: "Bring your own board" },
      { product: "Board only", half: "$45", full: "$65", note: "Twintip or directional" },
    ],
  },
  {
    name: "Foil",
    tagline: "Experienced foilers only",
    desc: "Assessment required before rental. Ask us on the beach or via WhatsApp.",
    featured: false,
    rows: [
      { product: "Foil complete set", half: "$100", full: "$140", note: "Wing, bar, foilboard" },
      { product: "Foilboard only", half: "$50", full: "$75", note: "Own wing and bar" },
    ],
  },
];

const bundles = [
  { sessions: "1 session", price: "$80", per: "$80 per session", savings: "", best: false },
  { sessions: "3 sessions", price: "$225", per: "$75 per session", savings: "Save $15", best: false },
  { sessions: "5 sessions", price: "$360", per: "$72 per session", savings: "Save $40", best: false },
  { sessions: "10 sessions", price: "$680", per: "$68 per session", savings: "Save $120", best: true },
];

function TierCard({ tier, duration, onBook }: { tier: (typeof tiers)[0]; duration: Duration; onBook: () => void }) {
  const mainPrice = duration === "half" ? tier.rows[0].half : tier.rows[0].full;

  return (
    <div
      className={`flex flex-col h-full rounded-[12px] p-8 md:p-10 ${
        tier.featured ? "bg-[hsl(213,85%,22%)]" : "bg-white"
      }`}
      style={{
        boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)",
      }}
    >
      {/* Label and Name */}
      <div className="mb-8">
        <p className={`text-[12px] uppercase tracking-[0.12em] font-bold mb-2 ${tier.featured ? "text-[hsl(186,100%,42%)]" : "text-[hsl(186,100%,42%)]"}`}>
          {tier.tagline}
        </p>
        <h3 className={`text-[clamp(28px,3.8vw,48px)] font-black uppercase tracking-tighter leading-[0.88] ${tier.featured ? "text-white" : "text-[hsl(0,0%,10%)]"}`}>
          {tier.name}
        </h3>
      </div>

      {/* Price Animation */}
      <AnimatePresence mode="wait">
        <motion.div key={mainPrice} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mb-2">
          <div className={`text-[clamp(48px,5vw,72px)] font-black leading-none ${tier.featured ? "text-white" : "text-[hsl(0,0%,10%)]"}`}>
            {mainPrice}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className={`text-[11px] uppercase tracking-[0.12em] font-bold mb-8 ${tier.featured ? "text-[hsl(186,100%,42%)]" : "text-[hsl(0,0%,10%)]/50"}`}>
        Complete set. {duration === "half" ? "Half day 3-4h" : "Full day 5-8h"}.
      </p>

      {/* Product Rows */}
      <div className={`flex-1 border-t mb-8 pt-6 space-y-5 ${tier.featured ? "border-white/10" : "border-[hsl(0,0%,10%)]/10"}`}>
        {tier.rows.map((row, i) => (
          <div key={i} className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-[14px] font-bold ${tier.featured ? "text-white" : "text-[hsl(0,0%,10%)]"}`}>{row.product}</p>
              <p className={`text-[13px] mt-1 ${tier.featured ? "text-white/70" : "text-[hsl(0,0%,10%)]/60"}`}>{row.note}</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.span key={duration + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={`text-[21px] font-black flex-shrink-0 ${tier.featured ? "text-white" : "text-[hsl(0,0%,10%)]"}`}>
                {duration === "half" ? row.half : row.full}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={onBook}
        className={`w-full py-4 text-[11px] uppercase tracking-[0.12em] font-black rounded-none transition-all ${
          tier.featured
            ? "bg-[hsl(186,100%,42%)] text-white hover:brightness-110"
            : "bg-[hsl(0,0%,10%)] text-white hover:bg-[hsl(0,0%,10%)]/80"
        }`}
      >
        Reserve Gear
      </button>
    </div>
  );
}

export default function RentalsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [duration, setDuration] = useState<Duration>("half");

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] md:min-h-[75vh] overflow-hidden flex items-center justify-center">
        <video 
          src="/videos/hero_hyperlapse3.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,18,40,0.3)] via-[rgba(5,18,40,0.5)] to-[rgba(5,18,40,0.8)]" />

        <div className="relative z-10 px-8 sm:px-14 lg:px-20 max-w-4xl mx-auto w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[12px] uppercase tracking-[0.12em] font-bold text-[hsl(186,100%,42%)] mb-6 block">
              Gear for your Bonaire sessions
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-black text-white uppercase tracking-tighter mb-6 text-[clamp(40px,7vw,100px)] leading-[0.88]">
              Ride With Us
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-[15px] leading-[1.6] mb-10 mx-auto max-w-[500px]">
              Travel light. We handle everything. You focus on the water, the wind, the ocean. We take care of the rest.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setBookingOpen(true)} className="bg-[hsl(186,100%,42%)] text-white px-8 py-4 font-black text-[11px] uppercase tracking-[0.12em] rounded-none hover:brightness-110 transition-all">
                Reserve Now
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 font-black text-[11px] uppercase tracking-[0.12em] rounded-none hover:bg-white/10 transition-all"
              >
                Ask Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THIS IS OUR HOME (SPLIT LAYOUT) ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 0, background: SAND }}>
        {/* Photo Left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
          style={{ minHeight: "clamp(380px,50vw,600px)" }}
        >
          <img
            src={lessonAction.src}
            alt="Kiteboarding equipment ready for rental"
            className="w-full h-full object-cover transition-transform duration-700"
          />
        </motion.div>

        {/* Text Right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col justify-center p-8 md:p-12 lg:p-16"
          style={{ minHeight: "clamp(380px,50vw,600px)" }}
        >
          <p className="text-[12px] uppercase tracking-[0.12em] font-bold text-[hsl(186,100%,42%)] mb-5" style={{ color: CYAN }}>
            Our home
          </p>
          <h2
            className="font-black uppercase"
            style={{
              fontSize: "clamp(32px,4.5vw,60px)",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              color: INK,
            }}
          >
            This is where<br />we belong
          </h2>
          <p
            className="font-body leading-relaxed"
            style={{
              fontSize: 15,
              color: "rgba(0,0,0,0.75)",
              lineHeight: 1.7,
            }}
          >
            Bring your passion for the water. We bring the gear, the guidance, and our crew. Everything you need to feel the ocean like we do. This is our home, and we want it to be yours too.
          </p>
        </motion.div>
      </div>

      {/* ── WHO CAN RENT ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <img
          src={rentalsHero.src}
          alt="Kitesurfing equipment at Atlantis Beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(21,40,70,0.75)] via-[rgba(21,40,70,0.82)] to-[rgba(21,40,70,0.88)]" />

        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInOnly}>
            <div className="mb-12">
              <p className="text-[12px] uppercase tracking-[0.12em] font-bold text-[hsl(186,100%,42%)] mb-4">Who can rent?</p>
              <h2 className="text-[clamp(32px,4.5vw,60px)] font-black text-white uppercase tracking-tighter leading-[0.88]">We want everyone to ride</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "IKO Card Level 4+", title: "Show us your card", desc: "You are on the water immediately. No assessment needed. Your card says you are ready, we trust that." },
                { label: "Can ride upwind", title: "Free beach assessment", desc: "Twenty minutes with one of us. If you can ride, you rent. We are not gatekeepers, we just want to make sure it is real." },
                { label: "Still learning?", title: "Book a lesson first", desc: "Come back after your course. You will be ready then, and we will give you a discount on your rental because you trained with us." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-[12px] p-8 md:p-10 flex flex-col" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
                  <p className="text-[12px] uppercase tracking-[0.12em] font-bold text-[hsl(186,100%,42%)] mb-3">{item.label}</p>
                  <h3 className="text-[clamp(28px,3.8vw,48px)] font-black text-[hsl(0,0%,10%)] uppercase tracking-tighter leading-[0.88] mb-4">{item.title}</h3>
                  <p className="text-[15px] text-[hsl(0,0%,10%)]/75 leading-[1.6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-28 bg-[hsl(42,35%,97%)]">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInOnly} className="mb-12">
            <div className="text-center mb-10">
              <p className="text-[12px] uppercase tracking-[0.12em] font-bold text-[hsl(186,100%,42%)] mb-4">Transparent pricing</p>
              <h2 className="text-[clamp(32px,4.5vw,60px)] font-black text-[hsl(0,0%,10%)] uppercase tracking-tighter leading-[0.88]">Choose what works for you</h2>
            </div>

            {/* Duration Toggle */}
            <div className="mb-12 flex justify-center">
              <div className="inline-flex flex-col gap-4 px-8 py-6 rounded-[12px]" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
                <p className="text-center font-black uppercase tracking-[0.12em]" style={{ fontSize: 11, color: "rgba(0,0,0,0.55)" }}>
                  Session length
                </p>
                <ToggleSwitch leftLabel="Half Day" rightLabel="Full Day" value={duration === "full"} onChange={v => setDuration(v ? "full" : "half")} />
              </div>
            </div>
          </motion.div>

          {/* Tier Cards Grid */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInOnly} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
            {tiers.map((tier, i) => (
              <TierCard key={i} tier={tier} duration={duration} onBook={() => setBookingOpen(true)} />
            ))}
          </motion.div>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInOnly} className="text-[13px] text-[hsl(0,0%,10%)]/60 text-center">
            Free kite swap included every session. Foil rental requires a quick beach assessment.
          </motion.p>
        </div>
      </section>

      {/* ── SESSION BUNDLES ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <img
          src={beachSetup.src}
          alt="Kitesurfing at Atlantis Beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(21,40,70,0.75)] via-[rgba(21,40,70,0.82)] to-[rgba(21,40,70,0.88)]" />

        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInOnly}>
            <div className="text-center mb-12">
              <p className="text-[12px] uppercase tracking-[0.12em] font-bold text-[hsl(186,100%,42%)] mb-4">Stay longer, go deeper</p>
              <h2 className="text-[clamp(32px,4.5vw,60px)] font-black text-white uppercase tracking-tighter leading-[0.88] mb-4">Session bundles</h2>
              <p className="text-white/75 text-[15px] leading-[1.6]">The more time you spend here, the deeper it gets. Join our crew.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              {bundles.map((bundle, i) => (
                <div key={i} className="bg-white rounded-[12px] p-6 md:p-8 text-center relative flex flex-col" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
                  {bundle.best && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(186,100%,42%)] text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] rounded-none">
                      Best value
                    </div>
                  )}
                  <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[hsl(0,0%,10%)]/55 mb-3 mt-2">{bundle.sessions}</p>
                  <p className="text-[clamp(32px,4.5vw,60px)] font-black text-[hsl(0,0%,10%)] leading-none mb-1">{bundle.price}</p>
                  <p className="text-[13px] text-[hsl(0,0%,10%)]/60 mb-3">{bundle.per}</p>
                  {bundle.savings && <p className="text-[hsl(186,100%,42%)] text-[11px] font-black uppercase tracking-[0.12em]">{bundle.savings}</p>}
                </div>
              ))}
            </div>

            <div className="text-center">
              <button onClick={() => setBookingOpen(true)} className="bg-[hsl(186,100%,42%)] text-white px-8 py-4 font-black text-[11px] uppercase tracking-[0.12em] rounded-none hover:brightness-110 transition-all">
                Book a Bundle
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── USPs ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[hsl(42,35%,97%)]">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInOnly} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[12px] p-8 md:p-10" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
              <p className="text-[12px] uppercase tracking-[0.12em] font-bold text-[hsl(186,100%,42%)] mb-6">Every session, included</p>
              <h3 className="text-[clamp(28px,3.8vw,48px)] font-black text-[hsl(0,0%,10%)] uppercase tracking-tighter leading-[0.88] mb-4">Free kite swap</h3>
              <p className="text-[15px] text-[hsl(0,0%,10%)]/75 leading-[1.6]">
                Wind picks up? Wind dies? We swap your kite for free during your session. No charge, no questions. You focus on the ride, we handle the details.
              </p>
            </div>

            <div className="bg-white rounded-[12px] p-8 md:p-10" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
              <p className="text-[12px] uppercase tracking-[0.12em] font-bold text-[hsl(186,100%,42%)] mb-6">Fall in love with it</p>
              <h3 className="text-[clamp(28px,3.8vw,48px)] font-black text-[hsl(0,0%,10%)] uppercase tracking-tighter leading-[0.88] mb-4">Try before you buy</h3>
              <p className="text-[15px] text-[hsl(0,0%,10%)]/75 leading-[1.6]">
                Love the gear you rented? We deduct your last rental session from the purchase price. Ask us on the beach about what we have in stock. We want you to own what you love.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[hsl(213,85%,38%)] text-center">
        <div className="max-w-3xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInOnly}>
            <h2 className="text-[clamp(52px,9vw,120px)] font-black text-white uppercase tracking-tighter leading-[0.88] mb-6">Ready?</h2>
            <p className="text-white/75 text-[15px] leading-[1.6] uppercase tracking-[0.12em] mb-10">Reserve your gear. See you on the beach tomorrow.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setBookingOpen(true)} className="bg-[hsl(186,100%,42%)] text-white px-8 py-4 font-black text-[11px] uppercase tracking-[0.12em] rounded-none hover:brightness-110 transition-all">
                Reserve Your Gear
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 font-black text-[11px] uppercase tracking-[0.12em] rounded-none hover:bg-white/10 transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} title="Reserve Gear" productId={VIKING_RENTALS_ID} />
    </>
  );
}
