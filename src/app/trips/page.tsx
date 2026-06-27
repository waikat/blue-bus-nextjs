"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import brazilTrip from "@/assets/brazil-trip.jpg";

const WHATSAPP_SAFARI = "https://wa.me/5997015483?text=Hi!%20I'm%20interested%20in%20your%20kite%20safaris";

// Design system colors
const OCEAN = "hsl(213,85%,38%)";
const OCEAN_DEEP = "hsl(213,85%,22%)";
const CYAN = "hsl(186,100%,42%)";
const SAND = "hsl(42,35%,97%)";
const INK = "hsl(0,0%,10%)";

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const brazilGroups = [
  { id: "brazil-2026-group-1", label: "First Group", dates: "19 – 26 September 2026", duration: "8 days", spotsLeft: 8, price: "$2,200", priceNote: "single room, per person", status: "Booking Open" },
  { id: "brazil-2026-group-2", label: "Second Group", dates: "1 – 11 October 2026", duration: "11 days", spotsLeft: 8, price: "$3,200", priceNote: "single room, per person", status: "Booking Open" },
];

export default function TripsPage() {
  return (
    <div style={{ background: SAND }}>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative flex items-end justify-start overflow-hidden" style={{ minHeight: "70vh" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${brazilTrip.src})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(21,40,70,0.88) 0%, rgba(21,40,70,0.4) 60%, rgba(21,40,70,0.2) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,40,70,0.92) 0%, transparent 55%)" }} />
        <div className="relative z-10 px-8 sm:px-14 lg:px-20 max-w-7xl w-full mx-auto pb-16 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-6" style={{ color: CYAN }}>
              Beyond Bonaire
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-black text-white uppercase tracking-tighter text-[clamp(52px,9vw,120px)] leading-[0.88]">
              Kite<br />Safaris
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 font-body text-[15px] leading-[1.6] mt-6 max-w-[500px]">
              Small groups. Expert guides. The world's best wind spots.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── BRAZIL TRIP ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
              Next adventure
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-black text-[hsl(0,0%,10%)] uppercase tracking-tighter mb-4 text-[clamp(32px,4.5vw,60px)] leading-[0.88]">
              Brazil Kite Safari<br />2026
            </motion.h2>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[11px] mb-12" style={{ color: "rgba(0,0,0,0.55)" }}>
              Jericoacoara. Preá. Tatajuba. Barra Grande.
            </motion.p>

            <motion.div variants={fadeUp} className="relative overflow-hidden mb-12 rounded-[12px]" style={{ height: "clamp(240px, 45vw, 560px)" }}>
              <img src={brazilTrip.src} alt="Brazil Kite Safari" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <p className="text-white/75 font-body text-[13px] uppercase tracking-widest">All inclusive. Max 8 riders per group. By Kiteboarding Bonaire.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16">
              <motion.div variants={fadeUp}>
                <p className="text-[hsl(0,0%,10%)] font-body text-[15px] leading-[1.7] mb-4">
                  Northeast Brazil is one of the most consistent kite destinations on earth. Flat lagoons, warm water, steady trade winds for months. We've been running this trip for years and it never gets old.
                </p>
                <p className="text-[hsl(0,0%,10%)]/70 font-body text-[15px] leading-[1.7]">
                  Moving between the world's best kite spots. Different terrain every day. Different conditions. Different energy. We handle transfers, accommodation, daily sessions, guides, and support.
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <div style={{ borderTop: `2px solid ${INK}` }}>
                  {[
                    { label: "Group size", value: "Max 8 riders" },
                    { label: "Level", value: "Intermediate to advanced" },
                    { label: "Includes", value: "Accommodation, transfers, guide, support" },
                    { label: "Price", value: "From $2,200 per person" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-baseline justify-between py-4" style={{ borderBottom: `2px solid ${INK}` }}>
                      <span className="font-display font-black text-[11px] uppercase tracking-widest text-[hsl(0,0%,10%)] flex-shrink-0">{row.label}</span>
                      <span className="font-display font-black text-[15px] text-[hsl(0,0%,10%)]/60 text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-8" style={{ color: CYAN }}>
              Choose your group
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
              {brazilGroups.map((group, i) => (
                <motion.div
                  key={group.id}
                  variants={fadeUp}
                  className="p-8 md:p-10 flex flex-col rounded-[12px]"
                  style={{
                    background: i === 1 ? OCEAN_DEEP : "#fff",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="text-[10px] font-display font-black uppercase tracking-[0.12em] px-3 py-1"
                      style={{
                        background: i === 1 ? CYAN : INK,
                        color: i === 1 ? "#fff" : "#fff",
                      }}
                    >
                      {group.status}
                    </span>
                    <span
                      className="text-[11px] font-display font-black uppercase tracking-widest"
                      style={{ color: i === 1 ? "rgba(255,255,255,0.70)" : "rgba(0,0,0,0.50)" }}
                    >
                      {group.spotsLeft} spots
                    </span>
                  </div>
                  <h3
                    className="font-display font-black uppercase tracking-tighter mb-2 text-[clamp(24px,3vw,36px)] leading-[0.88]"
                    style={{ color: i === 1 ? "#fff" : INK }}
                  >
                    {group.label}
                  </h3>
                  <p
                    className="font-body text-[14px] mb-1"
                    style={{ color: i === 1 ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.70)" }}
                  >
                    {group.dates}
                  </p>
                  <p
                    className="font-body text-[12px] uppercase tracking-widest mb-6"
                    style={{ color: i === 1 ? "rgba(255,255,255,0.50)" : "rgba(0,0,0,0.40)" }}
                  >
                    {group.duration}
                  </p>
                  <div className="mt-auto">
                    <span
                      className="font-display font-black leading-none block mb-2 text-[clamp(40px,4vw,56px)]"
                      style={{ color: i === 1 ? "#fff" : INK }}
                    >
                      {group.price}
                    </span>
                    <p
                      className="text-[12px] font-body mb-6"
                      style={{ color: i === 1 ? "rgba(255,255,255,0.50)" : "rgba(0,0,0,0.40)" }}
                    >
                      {group.priceNote}
                    </p>
                    <Link
                      href={`/trips/${group.id}`}
                      className="w-full inline-block text-center font-display font-black py-4 uppercase tracking-widest text-[11px] rounded-none transition-all"
                      style={{
                        background: i === 1 ? CYAN : INK,
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      View Full Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY JOIN ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: OCEAN_DEEP }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
              Why join us?
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-black text-white uppercase tracking-tighter mb-12 text-[clamp(32px,4.5vw,60px)] leading-[0.88]">
              Everything<br />taken care of
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {[
                { label: "Expert guides", title: "20+ years of experience", desc: "We know these spots. Local knowledge, timing, conditions. You focus on riding. We handle the rest." },
                { label: "Small groups", title: "Max 8 riders", desc: "Personalized attention. Flexible sessions. It feels like riding with friends, not a crowd." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-white rounded-[12px] p-8 md:p-10" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
                  <p className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
                    {item.label}
                  </p>
                  <h3 className="font-display font-black text-[hsl(0,0%,10%)] uppercase tracking-tighter mb-4 text-[clamp(24px,3vw,36px)] leading-[0.88]">
                    {item.title}
                  </h3>
                  <p className="font-body text-[15px] text-[hsl(0,0%,10%)]/70 leading-[1.6]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 text-center" style={{ background: OCEAN }}>
        <div className="max-w-3xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-black text-white uppercase tracking-tighter mb-6 text-[clamp(52px,9vw,120px)] leading-[0.88]">
              Ready for<br />your next<br />adventure?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/75 font-body text-[15px] leading-[1.6] uppercase tracking-widest mb-10">
              Get in touch to discuss custom trips or join our next safari
            </motion.p>
            <motion.div variants={fadeUp}>
              <a
                href={WHATSAPP_SAFARI}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-black uppercase tracking-widest px-8 py-4 inline-block text-[11px] rounded-none transition-all"
                style={{ background: CYAN, color: "#fff", border: "none" }}
              >
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
