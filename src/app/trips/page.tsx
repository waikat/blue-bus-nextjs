"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import brazilTrip from "@/assets/brazil-trip.jpg";

const WHATSAPP_SAFARI = "https://wa.me/5997015483?text=Hi!%20I'm%20interested%20in%20your%20kite%20safaris";
const NAVY_DEEP       = "hsl(211,100%,12%)";
const BREVO_API_KEY   = "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";
const BREVO_LIST_ID   = 3;

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const brazilGroups = [
  { id: "brazil-2026-group-1", label: "First Group",  dates: "19 – 26 September 2026", duration: "8 days",  spotsLeft: 8, price: "$2,200", priceNote: "single room · per person", status: "Booking Open" },
  { id: "brazil-2026-group-2", label: "Second Group", dates: "1 – 11 October 2026",    duration: "11 days", spotsLeft: 8, price: "$3,200", priceNote: "single room · per person", status: "Booking Open" },
];

function SafariNotifyForm() {
  const [name,   setName]   = useState("");
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
        body: JSON.stringify({ email: email.trim(), attributes: { FIRSTNAME: name.trim() }, listIds: [BREVO_LIST_ID], updateEnabled: true }),
      });
      if (res.ok || res.status === 204 || res.status === 400) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-2 border-accent p-6">
        <p className="font-display font-black text-accent uppercase tracking-widest text-sm mb-1">You're on the list.</p>
        <p className="text-white/70 font-body text-sm">We'll reach out as soon as details are confirmed.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-white/20 text-white placeholder-white/30 font-body text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" style={{ background: "rgba(255,255,255,0.06)" }} />
      <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border-2 border-white/20 text-white placeholder-white/30 font-body text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" style={{ background: "rgba(255,255,255,0.06)" }} />
      <button type="submit" disabled={status === "loading"} className="w-full font-display font-black py-4 uppercase tracking-widest text-sm border-2 border-accent bg-accent text-white hover:brightness-110 transition-all disabled:opacity-50">
        {status === "loading" ? "Sending..." : "Notify Me →"}
      </button>
      <AnimatePresence>
        {status === "error" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 font-body text-xs">
            Something went wrong. Try again or WhatsApp us directly.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function TripsPage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex items-end justify-start overflow-hidden" style={{ minHeight: "70vh" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${brazilTrip.src})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,18,40,0.88) 0%, rgba(5,18,40,0.4) 60%, rgba(5,18,40,0.2) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,18,40,0.92) 0%, transparent 55%)" }} />
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 max-w-7xl w-full mx-auto pb-16 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-6 block">Beyond Bonaire</motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter text-[clamp(56px,11vw,150px)] leading-[0.95]">
              Kite<br />Safaris
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 font-body text-sm md:text-base uppercase tracking-[0.22em] mt-6 max-w-sm">
              Small groups. Expert guides. The world's best spots.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
      </section>

      {/* ── BRAZIL TRIP ──────────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block">Next adventure</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter mb-4 text-[clamp(40px,7vw,96px)] leading-[0.95]">
              Brazil Kite Safari<br />2026
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 font-display font-black text-base uppercase tracking-wider mb-12">
              Jericoacoara. Preá. Tatajuba. Barra Grande.
            </motion.p>

            <motion.div variants={fadeUp} className="relative overflow-hidden mb-12 border-2 border-foreground" style={{ height: "clamp(240px, 45vw, 560px)" }}>
              <img src={brazilTrip.src} alt="Brazil Kite Safari" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <p className="text-white/70 font-body text-sm uppercase tracking-widest">All inclusive. Max 8 riders per group. By Kiteboarding Bonaire KBB.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
              <motion.div variants={fadeUp}>
                <p className="text-foreground font-body text-lg leading-relaxed mb-4">
                  The northeast of Brazil is one of the most consistent kite destinations on earth. Flat lagoons, warm water, side-shore trade winds that blow for months on end. We've been running this trip for years and it never gets old.
                </p>
                <p className="text-foreground/70 font-body text-base leading-relaxed">
                  Moving between some of the world's best kite spots. Different terrain, different conditions, different energy every day. We handle everything: transfers, accommodation, daily sessions, guide and support.
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <div className="border-t-2 border-foreground">
                  {[
                    { label: "Group size", value: "Max 8 riders" },
                    { label: "Level",      value: "Intermediate to advanced" },
                    { label: "Includes",   value: "Accommodation, transfers, guide & support" },
                    { label: "Price",      value: "From $2,200 per person" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-baseline justify-between py-4 border-b-2 border-foreground gap-4">
                      <span className="font-display font-black text-xs uppercase tracking-widest text-foreground flex-shrink-0">{row.label}</span>
                      <span className="font-display font-black text-base text-foreground/60 text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.p variants={fadeUp} className="category-label mb-6 block">Choose your group</motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">
              {brazilGroups.map((group, i) => (
                <motion.div key={group.id} variants={fadeUp} className={`p-8 flex flex-col ${i === 0 ? "border-b-2 md:border-b-0 md:border-r-2 border-foreground" : ""}`} style={{ background: i === 1 ? NAVY_DEEP : "white" }}>
                  <div className="flex items-start justify-between mb-6">
                    <span className={`text-xs font-display font-black uppercase tracking-widest px-3 py-1 ${i === 1 ? "bg-accent text-white" : "bg-foreground text-background"}`}>{group.status}</span>
                    <span className={`text-xs font-display font-black uppercase tracking-wider ${i === 1 ? "text-white/70" : "text-foreground/50"}`}>{group.spotsLeft} spots left</span>
                  </div>
                  <h3 className={`font-display font-black uppercase tracking-tighter mb-1 text-[clamp(24px,3vw,36px)] leading-[0.95] ${i === 1 ? "text-white" : "text-foreground"}`}>{group.label}</h3>
                  <p className={`font-body text-sm mb-1 ${i === 1 ? "text-white/70" : "text-foreground/60"}`}>{group.dates}</p>
                  <p className={`font-body text-xs uppercase tracking-wider mb-6 ${i === 1 ? "text-white/50" : "text-foreground/30"}`}>{group.duration}</p>
                  <div className="mt-auto">
                    <span className={`font-display font-black leading-none block mb-1 text-[clamp(40px,4vw,56px)] ${i === 1 ? "text-white" : "text-foreground"}`}>{group.price}</span>
                    <p className={`text-xs font-body mb-6 ${i === 1 ? "text-white/50" : "text-foreground/40"}`}>{group.priceNote}</p>
                    <Link href={`/trips/${group.id}`} className={`w-full inline-block text-center font-display font-black py-4 uppercase tracking-widest text-sm border-2 transition-all ${i === 1 ? "bg-accent text-white border-accent hover:brightness-110" : "bg-foreground text-background border-foreground hover:bg-foreground/80"}`}>
                      View Full Details →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COMING SOON ──────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="mb-16">
              <motion.p variants={fadeUp} className="category-label mb-4 text-accent">Coming soon</motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter text-[clamp(36px,7vw,96px)] leading-[0.95]">
                Secret<br />Caribbean Spot
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 border-t-2 border-white/15 pt-12">
              <motion.div variants={fadeUp}>
                <p className="text-white font-body text-lg leading-relaxed mb-4">
                  We're planning something special. An exclusive kite safari to a hidden Caribbean gem.
                </p>
                <p className="text-white/70 font-body text-base leading-relaxed">
                  Limited to 8 riders. Dates and destination revealed to registered interest only. Drop your email and we'll reach out first when details are confirmed.
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <p className="font-display font-black text-white uppercase tracking-widest text-xs mb-6">Register your interest</p>
                <SafariNotifyForm />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY JOIN ─────────────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block">Why join our safaris?</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter mb-16 text-[clamp(36px,6vw,72px)] leading-[0.95]">
              Everything taken<br />care of
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-2 border-foreground">
              {[
                { label: "Expert guides", title: "We Know These Spots",  desc: "Local knowledge and 20+ years of kite safari experience. We've been to these places enough times to know exactly where to go and when." },
                { label: "Small groups",  title: "Max 8 Riders",         desc: "We keep groups small on purpose. Personalized attention, flexible sessions, and the kind of trip that feels like riding with friends — not a crowd." },
                { label: "All inclusive", title: "Nothing to Organize",  desc: "Accommodation, transfers, guide and support are all included. Show up with your kite stoke. We handle the rest." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className={`py-10 border-b-2 border-foreground ${i > 0 ? "md:border-l-2 md:pl-10" : ""} ${i < 2 ? "md:pr-10" : ""}`}>
                  <p className="category-label mb-4">{item.label}</p>
                  <h3 className="font-display font-black text-foreground uppercase tracking-tighter mb-4 text-[clamp(20px,2.2vw,28px)] leading-[0.95]">{item.title}</h3>
                  <p className="text-foreground/70 font-body text-base leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <h2 className="font-display font-black text-white uppercase tracking-tighter mb-4 text-[clamp(40px,7vw,96px)] leading-[0.95]" style={{ letterSpacing: "-0.01em" }}>
            Ready for Your<br />Next Adventure?
          </h2>
          <p className="text-white/70 font-body mb-10 uppercase tracking-[0.2em] text-sm">Get in touch to discuss custom trips or join our next safari</p>
          <a href={WHATSAPP_SAFARI} target="_blank" rel="noopener noreferrer" className="btn-cyan text-base w-full sm:w-auto inline-block">WhatsApp Us</a>
        </div>
      </section>

    </div>
  );
}
