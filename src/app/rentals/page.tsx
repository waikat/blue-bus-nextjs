"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import rentalsHero from "@/assets/rentals-hero.jpg";

const WHATSAPP_URL      = "https://wa.me/5997015483?text=Hi!%20I'm%20interested%20in%20equipment%20rentals%20at%20Bonaire";
const VIKING_RENTALS_ID = "g37000000040000005a124865";
const NAVY_DEEP         = "hsl(211,100%,12%)";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } } };

type Duration = "half" | "full";

const tiers = [
  { name: "Standard", tagline: "Reliable freeride gear", desc: "Great condition, regularly serviced. Everything you need for a solid session.", featured: false, badge: null as string | null, rows: [{ product: "Complete set", half: "$80",  full: "$120", note: "Kite + bar + board + harness" }, { product: "Kite + Bar", half: "$60", full: "$90", note: "Bring your own board" }, { product: "Board only", half: "$25", full: "$40", note: "Twintip or directional" }] },
  { name: "Premium",  tagline: "Top-of-line gear",       desc: "Latest models, premium brands. +$20 per session over Standard.",             featured: true,  badge: "Most Popular" as string | null, rows: [{ product: "Complete set", half: "$100", full: "$145", note: "Kite + bar + board + harness" }, { product: "Kite + Bar", half: "$80", full: "$115", note: "Bring your own board" }, { product: "Board only", half: "$45", full: "$65", note: "Twintip or directional" }] },
  { name: "Foil",     tagline: "Experienced foilers only", desc: "Assessment required before rental. Ask us on the beach or via WhatsApp.",  featured: false, badge: null as string | null, rows: [{ product: "Foil complete set", half: "$100", full: "$140", note: "Wing + bar + foilboard" }, { product: "Foilboard only", half: "$50", full: "$75", note: "Own wing and bar" }] },
];

const bundles = [
  { sessions: "1 session",   price: "$80",  per: "$80 / session",  savings: "",          popular: false, best: false },
  { sessions: "3 sessions",  price: "$225", per: "$75 / session",  savings: "Save $15",  popular: true,  best: false },
  { sessions: "5 sessions",  price: "$360", per: "$72 / session",  savings: "Save $40",  popular: false, best: false },
  { sessions: "10 sessions", price: "$680", per: "$68 / session",  savings: "Save $120", popular: false, best: true  },
];

function TierCard({ tier, duration, onBook }: { tier: typeof tiers[0]; duration: Duration; onBook: () => void }) {
  const isFeatured = tier.featured;
  const mainRow    = tier.rows[0];
  const mainPrice  = duration === "half" ? mainRow.half : mainRow.full;
  return (
    <div className="relative flex flex-col w-full h-full border-2 border-foreground transition-all duration-300" style={{ background: isFeatured ? NAVY_DEEP : "white" }}>
      {tier.badge && (
        <div className="absolute -top-px left-0 right-0 flex justify-center">
          <span className="bg-accent text-white font-display font-black text-xs uppercase tracking-widest px-4 py-1.5 whitespace-nowrap">{tier.badge}</span>
        </div>
      )}
      <div className={`p-8 md:p-10 flex flex-col flex-1 ${tier.badge ? "pt-10" : ""}`}>
        <div className="mb-6">
          <p className={`category-label mb-2 ${isFeatured ? "text-accent" : ""}`}>{tier.tagline}</p>
          <h3 className={`font-display font-black text-2xl md:text-3xl uppercase tracking-tighter ${isFeatured ? "text-white" : "text-foreground"}`}>{tier.name}</h3>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={mainPrice} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="mb-1">
            <span className={`font-display font-black leading-none text-[clamp(48px,5vw,72px)] ${isFeatured ? "text-white" : "text-foreground"}`}>{mainPrice}</span>
          </motion.div>
        </AnimatePresence>
        <p className={`text-xs font-body font-bold uppercase tracking-wider mb-8 ${isFeatured ? "text-accent" : "text-foreground/50"}`}>
          Complete set. {duration === "half" ? "Half day 3-4h" : "Full day 5-8h"}.
        </p>
        <div className={`flex-1 border-t pt-6 space-y-5 mb-8 ${isFeatured ? "border-white/10" : "border-foreground/10"}`}>
          {tier.rows.map((row, i) => (
            <div key={i} className="flex items-start justify-between gap-4">
              <div>
                <p className={`text-sm font-body font-bold ${isFeatured ? "text-white" : "text-foreground"}`}>{row.product}</p>
                <p className={`text-xs font-body mt-0.5 ${isFeatured ? "text-white/70" : "text-foreground/60"}`}>{row.note}</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.span key={duration + i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} className={`font-display font-black text-xl flex-shrink-0 ${isFeatured ? "text-white" : "text-foreground"}`}>
                  {duration === "half" ? row.half : row.full}
                </motion.span>
              </AnimatePresence>
            </div>
          ))}
        </div>
        <button onClick={onBook} className={`w-full inline-block text-center font-display font-black py-4 uppercase tracking-widest transition-all text-sm border-2 ${isFeatured ? "bg-accent text-white border-accent hover:brightness-110" : "bg-foreground text-background border-foreground hover:bg-foreground/80"}`}>
          Reserve Gear
        </button>
      </div>
    </div>
  );
}

export default function RentalsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [duration,    setDuration]    = useState<Duration>("half");
  const [activeCard,  setActiveCard]  = useState(1); // start on featured (Premium)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] md:min-h-[75vh] overflow-hidden flex items-center justify-center text-center">
        <img src={rentalsHero.src} alt="Kitesurfing equipment rentals at Atlantis Beach, Bonaire" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#051228E0] via-[#05122859] to-[#05122833]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051228EB] to-transparent h-[55%] mt-auto" />
        <div className="relative z-10 px-6 sm:px-10 max-w-4xl mx-auto w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-8 block text-accent">Premium gear. No luggage needed.</motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter mb-6 text-[clamp(40px,8vw,120px)] leading-[0.87]">Ride the Best<br />Gear on Bonaire</motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 font-body text-sm md:text-base uppercase tracking-[0.22em] mb-12 mx-auto max-w-[400px]">No luggage. No stress. Just wind and water.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <a href="#pricing" className="btn-cyan text-base">View Pricing</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-white text-base">Ask Us Anything</a>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
      </section>

      {/* ── STATEMENT ────────────────────────────────────────────────── */}
      <section className="bg-background py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="category-label mb-3">Show up. Ride. Leave the rest to us.</p>
              <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(22px,4vw,52px)] leading-[0.88]">No shipping. No baggage fees.<br />No wasted sessions.</h2>
            </div>
            <a href="#pricing" className="btn-outline-dark text-sm self-start md:self-auto flex-shrink-0">See Pricing</a>
          </div>
        </div>
      </section>

      {/* ── WHO CAN RENT ─────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-6 block text-accent">Who can rent?</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter mb-16 text-[clamp(32px,5vw,72px)] leading-[0.87]">Rentals are for<br />competent riders only</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
              {[
                { label: "IKO Card (Level 4+)", title: "Show us your card",     desc: "You're on the water immediately. No assessment needed." },
                { label: "Can ride upwind",     title: "Free beach assessment", desc: "20 minutes on the beach with one of our team. If you can ride, you rent." },
                { label: "Still learning?",     title: "Book a lesson first",   desc: "Come back after your course and get a rental discount on your next visit." },
              ].map((path, i) => (
                <div key={i} className={`pt-8 pb-10 md:pr-8 ${i > 0 ? "md:border-l md:border-white/10 md:pl-8" : ""}`}>
                  <p className="category-label mb-3">{path.label}</p>
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-tighter mb-3">{path.title}</h3>
                  <p className="text-white/70 font-body text-sm leading-relaxed">{path.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <motion.section id="pricing" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <p className="category-label mb-4 block">Transparent pricing. No hidden fees.</p>
            <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(36px,6vw,72px)] leading-[0.87]">Choose Your Gear</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="flex justify-center mb-12">
            <div className="inline-flex border-2 border-foreground bg-background p-0.5">
              <button onClick={() => setDuration("half")} className={`px-5 py-3 sm:px-7 sm:py-3 text-[10px] sm:text-xs font-display font-black uppercase tracking-widest transition-all duration-300 ${duration === "half" ? "bg-foreground text-background" : "text-foreground/50 hover:bg-foreground/5 hover:text-foreground"}`}>Half Day (3-4h)</button>
              <button onClick={() => setDuration("full")} className={`px-5 py-3 sm:px-7 sm:py-3 text-[10px] sm:text-xs font-display font-black uppercase tracking-widest transition-all duration-300 ${duration === "full" ? "bg-foreground text-background" : "text-foreground/50 hover:bg-foreground/5 hover:text-foreground"}`}>Full Day (5-8h)</button>
            </div>
          </motion.div>

          {/* Desktop tier cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-0 pb-16 items-stretch">
            {tiers.map((tier, i) => (
              <div key={i} className="flex w-full h-full pt-6">
                <TierCard tier={tier} duration={duration} onBook={() => setBookingOpen(true)} />
              </div>
            ))}
          </div>

          {/* Mobile tier cards with arrows + dots */}
          <div className="md:hidden pb-6">
            <div className="relative pt-6">
              <AnimatePresence mode="wait">
                <motion.div key={`${duration}-${activeCard}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="px-1">
                  <TierCard tier={tiers[activeCard]} duration={duration} onBook={() => setBookingOpen(true)} />
                </motion.div>
              </AnimatePresence>
              <button onClick={() => setActiveCard((c) => (c - 1 + tiers.length) % tiers.length)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-foreground text-background flex items-center justify-center z-10" aria-label="Previous tier">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setActiveCard((c) => (c + 1) % tiers.length)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-foreground text-background flex items-center justify-center z-10" aria-label="Next tier">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              {tiers.map((_, i) => (
                <button key={i} onClick={() => setActiveCard(i)} className={`transition-all duration-300 ${i === activeCard ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-foreground/30"}`} aria-label={`Tier ${i + 1}`} />
              ))}
            </div>
            <p className="text-center text-foreground/50 font-body text-xs mt-3 uppercase tracking-widest">{activeCard + 1} of {tiers.length}</p>
          </div>

          <motion.p variants={fadeUp} className="text-xs text-foreground/60 font-body mt-2 text-center max-w-2xl mx-auto">
            Free kite swap included every session. Foil rental requires a brief beach assessment.
          </motion.p>
        </div>
      </motion.section>

      {/* ── SESSION BUNDLES ───────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block text-accent text-center">Book multiple sessions and save</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter text-center mb-4 text-[clamp(28px,4vw,56px)] leading-[0.9]">Session Bundles</motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 font-body text-sm text-center mb-12">Based on half-day complete set rate. Use them flexibly across your stay.</motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-white/20">
              {bundles.map((bundle, i) => (
                <div key={i} className={`p-6 md:p-8 text-center relative ${i < bundles.length - 1 ? "border-b-2 md:border-b-0 md:border-r-2 border-white/20" : ""}`} style={{ background: bundle.popular || bundle.best ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)" }}>
                  {(bundle.popular || bundle.best) && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white font-display font-black text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1 whitespace-nowrap z-10">
                      {bundle.popular ? "Popular" : "Best Value"}
                    </span>
                  )}
                  <p className="font-display font-black text-xs uppercase tracking-widest mb-3 mt-2 text-white/70">{bundle.sessions}</p>
                  <p className="text-3xl md:text-5xl font-display font-black mb-1 text-white">{bundle.price}</p>
                  <p className="text-xs font-body text-white/70">{bundle.per}</p>
                  {bundle.savings && <p className="text-accent text-xs font-bold uppercase tracking-wider mt-4">{bundle.savings}</p>}
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 text-center">
              <button onClick={() => setBookingOpen(true)} className="btn-cyan text-base inline-block">Book a Bundle</button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── USPs ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">
            <motion.div variants={fadeUp} className="p-10 md:p-14 md:border-r-2 border-foreground">
              <p className="category-label mb-5">Free with every session</p>
              <h3 className="font-display font-black text-foreground uppercase tracking-tighter mb-4 text-[clamp(24px,3vw,40px)] leading-[0.9]">Free Kite Swap</h3>
              <p className="text-foreground/70 font-body text-base leading-relaxed mb-6">Wind picking up? Dropped? We swap your kite size for free during your session. No charge, no questions asked.</p>
              <p className="text-accent font-display font-black text-xs uppercase tracking-widest">Most schools charge for this. We don't.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-10 md:p-14 border-t-2 md:border-t-0 border-foreground">
              <p className="category-label mb-5">Rental credit</p>
              <h3 className="font-display font-black text-foreground uppercase tracking-tighter mb-4 text-[clamp(24px,3vw,40px)] leading-[0.9]">Try Before You Buy</h3>
              <p className="text-foreground/70 font-body text-base leading-relaxed mb-6">Love the gear you rented? We deduct your last rental session from the purchase price. Ask us about current stock on the beach.</p>
              <p className="text-accent font-display font-black text-xs uppercase tracking-widest">Rental credit applied to purchase.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-black text-white uppercase tracking-tighter mb-4 text-[clamp(40px,7vw,96px)] leading-[0.88]">Ready to Ride?</h2>
          <p className="text-white/70 font-body mb-10 uppercase tracking-[0.2em] text-sm">Reserve your gear. Hit the water tomorrow.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setBookingOpen(true)} className="btn-cyan text-base">Reserve Your Gear</button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-white text-base">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} title="Reserve Gear" productId={VIKING_RENTALS_ID} />
    </>
  );
}
