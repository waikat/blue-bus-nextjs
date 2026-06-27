"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import brazilTrip from "@/assets/brazil-trip.jpg";

const WHATSAPP_SAFARI = "https://wa.me/5997015483?text=Hi!%20I'm%20interested%20in%20the%20Brazil%20Kite%20Safari%202026";

// Design system colors
const OCEAN = "hsl(213,85%,38%)";
const OCEAN_DEEP = "hsl(213,85%,22%)";
const CYAN = "hsl(186,100%,42%)";
const SAND = "hsl(42,35%,97%)";
const INK = "hsl(0,0%,10%)";

// Animations
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

const trips = {
  "brazil-2026-group-1": {
    group: "First Group",
    title: "Brazil Kite Safari 2026",
    dates: "19 – 26 September 2026",
    duration: "8 days",
    spots: 8,
    price: "$2,200",
    philosophy: "The best expeditions are built on group chemistry, mutual respect, and shared passion for the wind. Where wind guides us and ocean connects us. It's the freedom of the ride and the people you share it with.",
    meetingNote: "Official start Sep 19 at 10:00 AM at Magna Praia Hotel, Fortaleza (Beira Mar). Recommended arrival Sep 18. Airport transfer from FOR available on request.",
    route: ["Fortaleza", "Jericoacoara", "Guriú", "Preá", "Tatajuba", "Barra Grande", "Macapá"],
    days: [
      { label: "Sep 19", title: "Start of the Expedition. Fortaleza.", items: ["Official start 10:00 AM at Magna Praia Hotel.", "4x4 Toyota Hilux transfers depart for Jericoacoara.", "Arrive in Jericoacoara, check-in at boutique hotel.", "Sunset ritual at the famous Jeri dunes."] },
      { label: "Sep 20", title: "Jericoacoara and Guriú", items: ["Adventurous buggy ride across the dunes to Guriú.", "Legendary river mouth with perfect flat water.", "Strong wind acceleration, ideal for progression.", "Ride amongst mangroves and dunes."] },
      { label: "Sep 21", title: "Preá Session", items: ["Morning buggy transfer to Preá.", "Full day kitesurfing at one of the world's windiest spots.", "Consistent strong winds, perfect for big air.", "Unforgettable sunset downwind ride back to Jericoacoara."] },
      { label: "Sep 22", title: "Tatajuba and Journey to Barra Grande", items: ["Morning check-out from Jericoacoara.", "Kite session at Tatajuba Lagoon, flat water paradise.", "Relaxed lunch by the water.", "Afternoon 4x4 transfer to Pousada BGK."] },
      { label: "Sep 23", title: "Barra Grande and Pousada BGK", items: ["Relaxed kitesurfing in front of Pousada BGK.", "Watch local world champions training in their home spot.", "Enjoy the unique atmosphere of Barra Grande's main spot.", "Unforgettable sunset session as the sun goes down."] },
      { label: "Sep 24", title: "Macapá. The Crown Jewel.", items: ["The most anticipated spot of the entire expedition.", "Breathtaking landscape of sandbars and pristine nature.", "Steady wind and flat water lagoons for endless progression.", "A full day of pure kiteboarding bliss in paradise."] },
      { label: "Sep 25", title: "Downwind to the Lagoon", items: ["Scenic downwind from Barra Grande to the lagoon.", "Perfect flat water surrounded by amazing mangroves.", "Return to BGK by traditional donkey cart along the beach.", "The final kite session of the expedition."] },
      { label: "Sep 26", title: "Departure", items: ["Final breakfast at Pousada BGK.", "Private 4x4 transfer to Fortaleza International Airport (FOR).", "Comfortable return trip, approximately 4 to 5 hours.", "See you on the next adventure!"] },
    ],
    included: ["7 nights accommodation in selected hotels and pousadas", "Daily breakfast, water and snacks during sessions", "4x4 Toyota Hilux transfers with experienced drivers", "Professional kite guide and on-water support", "FII Conservation Fee (Jericoacoara National Park)", "Buggy transfers within Jericoacoara"],
    notIncluded: ["International flights to Brazil", "Kitesurf equipment (kite, board, harness, wetsuit)", "Lunches and dinners", "Personal travel insurance — mandatory", "Alcoholic beverages and personal expenses", "Medical assistance or evacuation costs"],
    paymentPlan: ["30% Deposit to secure your spot", "35% due within 30 days", "35% due within 60 days"],
    arrival: [
      { label: "Recommended", title: "Fly to Fortaleza (FOR)", desc: "Arrive September 18, one day before departure. Meet at Magna Praia Hotel, Fortaleza Beira Mar. 4x4 transfers leave at 10:00 AM sharp on Sep 19." },
      { label: "Airport help", title: "Transfer from FOR", desc: "We can arrange airport transfer from FOR to the hotel. Send us your flight details after booking." },
    ],
  },
  "brazil-2026-group-2": {
    group: "Second Group",
    title: "Brazil Kite Safari 2026",
    dates: "1 – 11 October 2026",
    duration: "11 days",
    spots: 8,
    price: "$3,200",
    philosophy: "A true kitesurf expedition is more than just riding. It's the journey, connection with nature, and shared stoke of discovering new horizons. We take you off the beaten path to spots where wind is constant and crowds are nonexistent.",
    meetingNote: "Recommended: fly direct to Jericoacoara (JJD). 4x4 transfers will take the group directly to Barra Grande. Alternative: fly to Fortaleza (FOR), approximately 7 hours drive to Barra Grande.",
    route: ["Barra Grande", "Parnaíba Delta", "Macapá", "Tatajuba", "Jericoacoara", "Guriú", "Preá", "Jeri Lagoons"],
    days: [
      { label: "Day 1", title: "Arrival and Welcome. Barra Grande.", items: ["Arrival and 4x4 transfers to Barra Grande.", "Check-in at the legendary Pousada BGK.", "Sunset session right in front of the pousada.", "Welcome drink and group briefing."] },
      { label: "Day 2", title: "Barra Grande Lagoons", items: ["Exploring the hidden lagoons around Barra Grande.", "Perfect flat water for progression.", "Downwind sessions through the mangroves.", "Relaxing beach vibes in the evening."] },
      { label: "Day 3", title: "Parnaíba Delta Adventure", items: ["Full day adventure to the Parnaíba Delta.", "Unique landscape of river islands and dunes.", "Remote kite locations accessible only by boat.", "Nature and wildlife exploration."] },
      { label: "Day 4", title: "Macapá Expedition", items: ["Full day kitesurf trip to Macapá.", "World-renowned flat water paradise.", "Perfect conditions for freestyle and progression.", "Stunning natural beauty and sandbars."] },
      { label: "Day 5", title: "Journey to Tatajuba", items: ["Morning kite session in Barra Grande.", "Afternoon 4x4 transfer to Tatajuba.", "Relax and enjoy the remote atmosphere.", "Immersive nature experience."] },
      { label: "Day 6", title: "Tatajuba Exploration", items: ["Full day kitesurfing in the lagoon.", "Surrounded by vast desert landscapes.", "Perfect flat water for progression.", "Sunset session in the wild."] },
      { label: "Day 7", title: "Arrival in Jericoacoara", items: ["Transfer to Jericoacoara.", "Check-in at our boutique hotel.", "Sunset ritual at the famous Jeri dunes.", "Evening exploration of the vibrant village."] },
      { label: "Day 8", title: "Guriú Downwind", items: ["Legendary downwind trip from Jeri to Guriú.", "Riding through the famous river mouth.", "Explore the mangrove channels.", "Unique mix of river and ocean riding."] },
      { label: "Day 9", title: "Preá Session", items: ["Full day kitesurfing at the world-famous Preá Beach.", "Consistent strong winds and endless ocean.", "Perfect for downwinders and freeride.", "Authentic fishing village atmosphere."] },
      { label: "Day 10", title: "Jeri Lagoons", items: ["Exploring the crystal clear lagoons around Jeri.", "Relaxing at the famous Paradise Lagoon.", "Swimming and unwinding in fresh water.", "Optional sunset session at the dunes."] },
      { label: "Day 11", title: "Departure", items: ["Transfer to Jericoacoara (JJD) or Fortaleza (FOR) Airport.", "End of the Kite Expedition Tour 2026.", "See you on the next adventure!"] },
    ],
    included: ["Accommodation: BGK (4 nights), Tatajuba (2 nights), Jericoacoara (3 nights)", "Daily breakfast, water and snacks during sessions", "Professional 4x4 Toyota Hilux transfers", "Buggy transfers in Jericoacoara", "Professional kitesurf guide and on-water support", "FII Conservation Fee"],
    notIncluded: ["International flights to Brazil", "Kitesurf equipment (kite, board, harness, wetsuit)", "Lunches and dinners", "Personal travel insurance — mandatory", "Alcoholic beverages and personal expenses", "Medical assistance or evacuation costs"],
    paymentPlan: ["30% Deposit to secure your spot", "35% due within 30 days", "35% due within 60 days"],
    arrival: [
      { label: "Recommended", title: "Fly to Jericoacoara (JJD)", desc: "Direct flights available from major Brazilian hubs. 4x4 transfers take you straight to Barra Grande on arrival. Simplest option, no long drive." },
      { label: "Alternative", title: "Fly to Fortaleza (FOR)", desc: "4x4 transfer from Fortaleza to Barra Grande, approximately 7 hours. Coordinate with us for pickup." },
    ],
  },
};

type TripId = keyof typeof trips;

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  useEffect(() => {
    if (!slug || !(slug in trips)) {
      router.replace("/trips");
    }
  }, [slug, router]);

  if (!slug || !(slug in trips)) return null;

  const trip = trips[slug as TripId];

  return (
    <div style={{ background: SAND }}>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "60vh", background: OCEAN_DEEP }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${brazilTrip.src})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(21,40,70,0.88) 0%, rgba(21,40,70,0.4) 60%, rgba(21,40,70,0.2) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,40,70,0.92) 0%, transparent 55%)" }} />
        <div className="relative z-10 px-8 sm:px-14 lg:px-20 max-w-7xl w-full mx-auto pb-16 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-6" style={{ color: CYAN }}>
              {trip.group} · {trip.dates}
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-black text-white uppercase tracking-tighter text-[clamp(52px,9vw,120px)] leading-[0.88] mb-4">
              {trip.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 font-body text-[15px] leading-[1.6] max-w-[500px]">
              {trip.duration} · {trip.route.join(", ")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16">
              <motion.div variants={fadeUp}>
                <p className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
                  Philosophy
                </p>
                <p className="font-body text-[15px] text-[hsl(0,0%,10%)]/75 leading-[1.7]">{trip.philosophy}</p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <p className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
                  What to know
                </p>
                <div style={{ borderTop: `2px solid ${INK}` }}>
                  {[
                    { label: "Duration", value: trip.duration },
                    { label: "Group size", value: `Max ${trip.spots} riders` },
                    { label: "Level", value: "Intermediate to advanced" },
                    { label: "Price", value: trip.price + " per person" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-baseline justify-between py-4" style={{ borderBottom: `2px solid ${INK}` }}>
                      <span className="font-display font-black text-[11px] uppercase tracking-widest text-[hsl(0,0%,10%)]">{row.label}</span>
                      <span className="font-display font-black text-[15px] text-[hsl(0,0%,10%)]/60">{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DAY BY DAY ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: OCEAN_DEEP }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
              Day by day
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-black text-white uppercase tracking-tighter text-[clamp(32px,4.5vw,60px)] leading-[0.88] mb-12">
              The Expedition
            </motion.h2>
            <div className="space-y-0" style={{ borderTop: `2px solid rgba(255,255,255,0.10)` }}>
              {trip.days.map((day, i) => (
                <motion.div key={i} variants={fadeUp} className="border-b-2 border-white/10 py-8">
                  <div className="flex items-start gap-8 mb-4">
                    <span className="font-display font-black text-white text-[clamp(18px,2vw,28px)] leading-none flex-shrink-0" style={{ minWidth: "80px" }}>
                      {day.label}
                    </span>
                    <h3 className="font-display font-black text-white uppercase tracking-tighter text-[clamp(18px,2.5vw,32px)] leading-[0.88]">
                      {day.title}
                    </h3>
                  </div>
                  <ul className="ml-24 space-y-2">
                    {day.items.map((item, j) => (
                      <li key={j} className="font-body text-white/75 text-[14px] leading-[1.6] flex items-start gap-3">
                        <span style={{ color: CYAN }} className="flex-shrink-0 mt-1">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              <motion.div variants={fadeUp}>
                <p className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
                  We take care of
                </p>
                <h3 className="font-black text-[hsl(0,0%,10%)] uppercase tracking-tighter text-[clamp(28px,3.8vw,48px)] leading-[0.88] mb-6">
                  Included
                </h3>
                <ul className="space-y-3">
                  {trip.included.map((item, i) => (
                    <li key={i} className="font-body text-[15px] text-[hsl(0,0%,10%)]/70 leading-[1.6] flex items-start gap-3">
                      <span style={{ color: CYAN }} className="flex-shrink-0 mt-1 font-black">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeUp}>
                <p className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
                  You bring
                </p>
                <h3 className="font-black text-[hsl(0,0%,10%)] uppercase tracking-tighter text-[clamp(28px,3.8vw,48px)] leading-[0.88] mb-6">
                  Not Included
                </h3>
                <ul className="space-y-3">
                  {trip.notIncluded.map((item, i) => (
                    <li key={i} className="font-body text-[15px] text-[hsl(0,0%,10%)]/70 leading-[1.6] flex items-start gap-3">
                      <span style={{ color: INK }} className="flex-shrink-0 mt-1 font-black">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PAYMENT PLAN ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: OCEAN }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
              Flexible booking
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-black text-white uppercase tracking-tighter text-[clamp(32px,4.5vw,60px)] leading-[0.88] mb-12">
              Payment Plan
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trip.paymentPlan.map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-white/10 rounded-[12px] p-8">
                  <span className="font-display font-black text-white text-[clamp(32px,4vw,56px)] leading-none block mb-4">{i + 1}.</span>
                  <p className="font-body text-white/75 text-[15px] leading-[1.6]">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MANDATORY INSURANCE ───────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <motion.div variants={fadeUp}>
              <p className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
                Safety first
              </p>
              <h2 className="font-black text-[hsl(0,0%,10%)] uppercase tracking-tighter text-[clamp(32px,4.5vw,60px)] leading-[0.88]">
                Mandatory<br />Insurance
              </h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <ul className="space-y-4">
                {[
                  "All participants MUST hold valid travel insurance covering kitesurfing and water sports in Brazil.",
                  "Standard travel insurance does NOT cover this activity. Check your policy.",
                  "Required for access to private hospitals in Brazil.",
                  "Proof of insurance must be provided before the trip departs.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-[15px] text-[hsl(0,0%,10%)]/70 leading-[1.6]">
                    <span style={{ color: CYAN }} className="flex-shrink-0 mt-1">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ARRIVAL LOGISTICS ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: OCEAN_DEEP }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
              Getting there
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-black text-white uppercase tracking-tighter text-[clamp(32px,4.5vw,60px)] leading-[0.88] mb-8">
              Arrival Logistics
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/75 text-[15px] leading-[1.7] mb-12 max-w-2xl">
              {trip.meetingNote}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {trip.arrival.map((option, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <p className="font-display font-black uppercase tracking-widest text-[12px] mb-3" style={{ color: CYAN }}>
                    {option.label}
                  </p>
                  <h3 className="font-black text-white uppercase tracking-tighter text-[clamp(20px,2.5vw,32px)] leading-[0.88] mb-4">
                    {option.title}
                  </h3>
                  <p className="font-body text-white/75 text-[15px] leading-[1.6]">{option.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 text-center" style={{ background: OCEAN }}>
        <div className="max-w-3xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-6" style={{ color: CYAN }}>
              {trip.spots} spots remaining · {trip.duration}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-black text-white uppercase tracking-tighter mb-10 text-[clamp(52px,9vw,120px)] leading-[0.88]">
              Ready to ride?
            </motion.h2>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_SAFARI}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-black uppercase tracking-widest px-8 py-4 rounded-none transition-all text-[11px] inline-block"
                style={{ background: CYAN, color: "#fff", border: "none" }}
              >
                Reserve Your Spot
              </a>
              <Link
                href="/trips"
                className="font-display font-black uppercase tracking-widest px-8 py-4 rounded-none transition-all text-[11px]"
                style={{ background: "transparent", color: "#fff", border: `2px solid ${CYAN}` }}
              >
                Back to Trips
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
