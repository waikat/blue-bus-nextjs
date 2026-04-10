"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import brazilTrip from "@/assets/brazil-trip.jpg";

const WHATSAPP_SAFARI = "https://wa.me/5997015483?text=Hi!%20I'm%20interested%20in%20the%20Brazil%20Kite%20Safari%202026";
const NAVY_DEEP = "hsl(211,100%,12%)";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const trips = {
  "brazil-2026-group-1": {
    group: "First Group", title: "Brazil Kite Safari 2026", dates: "19 – 26 September 2026", duration: "8 days", spots: 8,
    earlyBirdDeadline: "March 30, 2026",
    earlyBirdExpired: true,
    pricing: {
      earlyBird: { single: "$2,050", shared: "$1,950" },
      standard:  { single: "$2,200", sharedCouple: "$2,100" },
    },
    paymentPlan: ["30% Deposit to secure your spot", "35% due within 30 days", "35% due within 60 days"],
    meetingNote: "Official start Sep 19 at 10:00 AM at Magna Praia Hotel, Fortaleza (Beira Mar). Recommended arrival Sep 18. Airport transfer from FOR available on request.",
    route: ["Fortaleza", "Jericoacoara", "Guriú", "Preá", "Tatajuba", "Barra Grande", "Macapá"],
    philosophy: "We believe that the best expeditions are built on strong group chemistry, mutual respect, and shared passion for the wind. Where the wind guides us, and the ocean connects us. It's not just about the destination, but the freedom of the ride and the people you share it with.",
    days: [
      { label: "Sep 19", title: "Start of the Expedition. Fortaleza.",   items: ["Official start 10:00 AM at Magna Praia Hotel.", "4x4 Toyota Hilux transfers depart for Jericoacoara.", "Arrive in Jericoacoara, check-in at boutique hotel.", "Sunset ritual at the famous Jeri dunes."] },
      { label: "Sep 20", title: "Jericoacoara and Guriú",                items: ["Adventurous buggy ride across the dunes to Guriú.", "Legendary river mouth with perfect flat water.", "Strong wind acceleration, ideal for progression.", "Ride amongst mangroves and dunes."] },
      { label: "Sep 21", title: "Preá Session",                          items: ["Morning buggy transfer to Preá.", "Full day kitesurfing at one of the world's windiest spots.", "Consistent strong winds, perfect for big air.", "Unforgettable sunset downwind ride back to Jericoacoara."] },
      { label: "Sep 22", title: "Tatajuba and Journey to Barra Grande",  items: ["Morning check-out from Jericoacoara.", "Kite session at Tatajuba Lagoon, flat water paradise.", "Relaxed lunch by the water.", "Afternoon 4x4 transfer to Pousada BGK."] },
      { label: "Sep 23", title: "Barra Grande and Pousada BGK",          items: ["Relaxed kitesurfing in front of Pousada BGK.", "Watch local world champions training in their home spot.", "Enjoy the unique atmosphere of Barra Grande's main spot.", "Unforgettable sunset session as the sun goes down."] },
      { label: "Sep 24", title: "Macapá. The Crown Jewel.",              items: ["The most anticipated spot of the entire expedition.", "Breathtaking landscape of sandbars and pristine nature.", "Steady wind and flat water lagoons for endless progression.", "A full day of pure kiteboarding bliss in paradise."] },
      { label: "Sep 25", title: "Downwind to the Lagoon",                items: ["Scenic downwind from Barra Grande to the lagoon.", "Perfect flat water surrounded by amazing mangroves.", "Return to BGK by traditional donkey cart along the beach.", "The final kite session of the expedition."] },
      { label: "Sep 26", title: "Departure",                             items: ["Final breakfast at Pousada BGK.", "Private 4x4 transfer to Fortaleza International Airport (FOR).", "Comfortable return trip, approximately 4 to 5 hours.", "See you on the next adventure!"] },
    ],
    included:    ["7 nights accommodation in selected hotels and pousadas", "Daily breakfast, water and snacks during sessions", "4x4 Toyota Hilux transfers with experienced drivers", "Professional kite guide and on-water support", "FII Conservation Fee (Jericoacoara National Park)", "Buggy transfers within Jericoacoara"],
    notIncluded: ["International flights to Brazil", "Kitesurf equipment (kite, board, harness, wetsuit)", "Lunches and dinners", "Personal travel insurance — mandatory", "Alcoholic beverages and personal expenses", "Medical assistance or evacuation costs"],
    arrival: [
      { label: "Recommended",  title: "Fly to Fortaleza (FOR)", desc: "Arrive September 18, one day before departure. Meet at Magna Praia Hotel, Fortaleza Beira Mar. 4x4 transfers leave at 10:00 AM sharp on Sep 19." },
      { label: "Airport help", title: "Transfer from FOR",      desc: "We can arrange airport transfer from FOR to the hotel. Send us your flight details after booking." },
    ],
  },
  "brazil-2026-group-2": {
    group: "Second Group", title: "Brazil Kite Safari 2026", dates: "1 – 11 October 2026", duration: "11 days", spots: 8,
    earlyBirdDeadline: "March 30, 2026",
    earlyBirdExpired: true,
    pricing: {
      earlyBird: { single: "$2,950", shared: "$2,850" },
      standard:  { single: "$3,200", shared: "$3,050", couple: "$6,100 total" },
    },
    paymentPlan: ["30% Deposit to secure your spot", "35% due within 30 days", "35% due within 60 days"],
    meetingNote: "Recommended: fly direct to Jericoacoara (JJD). 4x4 transfers will take the group directly to Barra Grande. Alternative: fly to Fortaleza (FOR), approximately 7 hours drive to Barra Grande.",
    route: ["Barra Grande", "Parnaíba Delta", "Macapá", "Tatajuba", "Jericoacoara", "Guriú", "Preá", "Jeri Lagoons"],
    philosophy: "We believe that a true kitesurf expedition is more than just riding. It's about the journey, the connection with nature, and the shared stoke of discovering new horizons. We take you off the beaten path, to spots where the wind is constant and the crowds are nonexistent.",
    days: [
      { label: "Day 1",  title: "Arrival and Welcome. Barra Grande.", items: ["Arrival and 4x4 transfers to Barra Grande.", "Check-in at the legendary Pousada BGK.", "Sunset session right in front of the pousada.", "Welcome drink and group briefing."] },
      { label: "Day 2",  title: "Barra Grande Lagoons",               items: ["Exploring the hidden lagoons around Barra Grande.", "Perfect flat water for progression.", "Downwind sessions through the mangroves.", "Relaxing beach vibes in the evening."] },
      { label: "Day 3",  title: "Parnaíba Delta Adventure",           items: ["Full day adventure to the Parnaíba Delta.", "Unique landscape of river islands and dunes.", "Remote kite locations accessible only by boat.", "Nature and wildlife exploration."] },
      { label: "Day 4",  title: "Macapá Expedition",                  items: ["Full day kitesurf trip to Macapá.", "World-renowned flat water paradise.", "Perfect conditions for freestyle and progression.", "Stunning natural beauty and sandbars."] },
      { label: "Day 5",  title: "Journey to Tatajuba",                items: ["Morning kite session in Barra Grande.", "Afternoon 4x4 transfer to Tatajuba.", "Relax and enjoy the remote atmosphere.", "Immersive nature experience."] },
      { label: "Day 6",  title: "Tatajuba Exploration",               items: ["Full day kitesurfing in the lagoon.", "Surrounded by vast desert landscapes.", "Perfect flat water for progression.", "Sunset session in the wild."] },
      { label: "Day 7",  title: "Arrival in Jericoacoara",            items: ["Transfer to Jericoacoara.", "Check-in at our boutique hotel.", "Sunset ritual at the famous Jeri dunes.", "Evening exploration of the vibrant village."] },
      { label: "Day 8",  title: "Guriú Downwind",                    items: ["Legendary downwind trip from Jeri to Guriú.", "Riding through the famous river mouth.", "Explore the mangrove channels.", "Unique mix of river and ocean riding."] },
      { label: "Day 9",  title: "Preá Session",                      items: ["Full day kitesurfing at the world-famous Preá Beach.", "Consistent strong winds and endless ocean.", "Perfect for downwinders and freeride.", "Authentic fishing village atmosphere."] },
      { label: "Day 10", title: "Jeri Lagoons",                      items: ["Exploring the crystal clear lagoons around Jeri.", "Relaxing at the famous Paradise Lagoon.", "Swimming and unwinding in fresh water.", "Optional sunset session at the dunes."] },
      { label: "Day 11", title: "Departure",                         items: ["Transfer to Jericoacoara (JJD) or Fortaleza (FOR) Airport.", "End of the Kite Expedition Tour 2026.", "See you on the next adventure!"] },
    ],
    included:    ["Accommodation: BGK (4 nights), Tatajuba (2 nights), Jericoacoara (3 nights)", "Daily breakfast, water and snacks during sessions", "Professional 4x4 Toyota Hilux transfers", "Buggy transfers in Jericoacoara", "Professional kitesurf guide and on-water support", "FII Conservation Fee"],
    notIncluded: ["International flights to Brazil", "Kitesurf equipment (kite, board, harness, wetsuit)", "Lunches and dinners", "Personal travel insurance — mandatory", "Alcoholic beverages and personal expenses", "Medical assistance or evacuation costs"],
    arrival: [
      { label: "Recommended", title: "Fly to Jericoacoara (JJD)", desc: "Direct flights available from major Brazilian hubs. 4x4 transfers take you straight to Barra Grande on arrival. Simplest option, no long drive." },
      { label: "Alternative",  title: "Fly to Fortaleza (FOR)",   desc: "4x4 transfer from Fortaleza to Barra Grande, approximately 7 hours. Coordinate with us for pickup." },
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
  const isGroup2 = slug === "brazil-2026-group-2";

  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex items-end justify-start overflow-hidden" style={{ minHeight: "75vh" }}>
        <img src={brazilTrip.src} alt={trip.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,18,40,0.92) 0%, rgba(5,18,40,0.4) 60%, rgba(5,18,40,0.15) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,18,40,0.95) 0%, transparent 55%)" }} />
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 max-w-7xl w-full mx-auto pb-16 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block">{trip.group} · {trip.duration}</motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter text-[clamp(48px,9vw,120px)] leading-[0.95]">
              Brazil<br />Kite Safari<br />2026
            </motion.h1>
            <motion.p variants={fadeUp} className="text-accent font-display font-black text-sm uppercase tracking-widest mt-4 mb-3">{trip.dates}</motion.p>
            <motion.p variants={fadeUp} className="text-white/70 font-body text-xs md:text-sm uppercase tracking-[0.2em] max-w-md">{trip.route.join(" · ")}</motion.p>
          </motion.div>
        </div>
        <div className="absolute top-24 right-6 md:right-10 z-20 bg-accent px-4 py-2">
          <span className="font-display font-black text-white text-xs uppercase tracking-widest">{trip.spots} spots left</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <motion.p variants={fadeUp} className="category-label mb-4">Our philosophy</motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(28px,4vw,52px)] leading-[0.95]">
                More than<br />just riding
              </motion.h2>
            </div>
            <div className="md:col-span-8 md:border-l-2 border-foreground md:pl-12">
              <motion.p variants={fadeUp} className="text-foreground/70 font-body text-lg leading-relaxed">{trip.philosophy}</motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ROUTE ────────────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-6 block text-accent">The route</motion.p>
            <div className="flex flex-wrap items-center gap-3">
              {trip.route.map((city, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                  <span className="font-display font-black text-white uppercase tracking-tighter text-[clamp(14px,2.5vw,28px)]">{city}</span>
                  {i < trip.route.length - 1 && <span className="text-accent font-black text-xl">→</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DAY BY DAY ───────────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block">The itinerary</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter mb-16 text-[clamp(36px,5vw,64px)] leading-[0.95]">
              Day by Day
            </motion.h2>
            <div className="border-t-2 border-foreground">
              {trip.days.map((day, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5 }} className="grid grid-cols-12 gap-6 md:gap-12 py-8 md:py-10 border-b-2 border-foreground">
                  <div className="col-span-3 md:col-span-2 flex flex-col justify-start pt-1">
                    <span className="font-display font-black text-foreground/30 leading-none select-none block text-[clamp(18px,4vw,48px)]">{day.label}</span>
                  </div>
                  <div className="col-span-9 md:col-span-10">
                    <div className="w-8 h-[3px] bg-accent mb-4" />
                    <h3 className="font-display font-black text-foreground uppercase tracking-tighter mb-4 text-[clamp(16px,2vw,22px)] leading-[0.95]">{day.title}</h3>
                    <ul className="space-y-2">
                      {day.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-foreground/70 font-body text-sm leading-relaxed">
                          <span className="text-accent flex-shrink-0 font-black mt-0.5">—</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INCLUDED / NOT INCLUDED ──────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter mb-16 text-[clamp(32px,5vw,60px)] leading-[0.95]">
              What's included
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <motion.div variants={fadeUp} className="md:pr-16 mb-12 md:mb-0">
                <p className="category-label mb-6 text-accent">Included</p>
                <ul className="space-y-4">
                  {trip.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-base text-white/80">
                      <span className="text-accent flex-shrink-0 font-black mt-0.5">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeUp} className="md:border-l-2 border-white/20 md:pl-12">
                <p className="category-label mb-6 text-white/40">Not included</p>
                <ul className="space-y-4">
                  {trip.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-base text-white/60">
                      <span className="text-white/30 flex-shrink-0 font-black mt-0.5">—</span>{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block">Investment</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter mb-12 text-[clamp(32px,5vw,60px)] leading-[0.95]">
              Pricing & Booking
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground mb-0">
              <motion.div variants={fadeUp} className="p-8 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-foreground" style={{ background: trip.earlyBirdExpired ? "hsl(0,0%,97%)" : "white" }}>
                <div className="flex items-start justify-between mb-6">
                  <p className="category-label">Early Bird</p>
                  {trip.earlyBirdExpired
                    ? <span className="font-display font-black text-[10px] uppercase tracking-widest px-2 py-0.5 bg-foreground/10 text-foreground/50">Expired</span>
                    : <span className="font-display font-black text-[10px] uppercase tracking-widest px-2 py-0.5 bg-accent text-white">Until {trip.earlyBirdDeadline}</span>
                  }
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-foreground/50 font-body text-xs uppercase tracking-wider mb-1">Single Room</p>
                    <span className={`font-display font-black leading-none text-[clamp(36px,4vw,52px)] ${trip.earlyBirdExpired ? "text-foreground/25 line-through" : "text-foreground"}`}>{trip.pricing.earlyBird.single}</span>
                    <span className="text-foreground/30 font-body text-sm ml-2">/ person</span>
                  </div>
                  <div>
                    <p className="text-foreground/50 font-body text-xs uppercase tracking-wider mb-1">Shared Room</p>
                    <span className={`font-display font-black leading-none text-[clamp(36px,4vw,52px)] ${trip.earlyBirdExpired ? "text-foreground/25 line-through" : "text-foreground"}`}>{trip.pricing.earlyBird.shared}</span>
                    <span className="text-foreground/30 font-body text-sm ml-2">/ person</span>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="p-8 md:p-10" style={{ background: NAVY_DEEP }}>
                <div className="flex items-start justify-between mb-6">
                  <p className="category-label text-accent">Standard Price</p>
                  <span className="font-display font-black text-[10px] uppercase tracking-widest px-2 py-0.5 bg-accent text-white">Current</span>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-white/60 font-body text-xs uppercase tracking-wider mb-1">Single Room</p>
                    <span className="font-display font-black text-white leading-none text-[clamp(36px,4vw,52px)]">{trip.pricing.standard.single}</span>
                    <span className="text-white/60 font-body text-sm ml-2">/ person</span>
                  </div>
                  <div>
                    <p className="text-white/60 font-body text-xs uppercase tracking-wider mb-1">{isGroup2 ? "Shared Room" : "Couple / Shared Room"}</p>
                    <span className="font-display font-black text-white leading-none text-[clamp(36px,4vw,52px)]">
                      {isGroup2 ? (trip.pricing.standard as any).shared : (trip.pricing.standard as any).sharedCouple}
                    </span>
                    <span className="text-white/60 font-body text-sm ml-2">/ person</span>
                  </div>
                  {isGroup2 && (trip.pricing.standard as any).couple && (
                    <div>
                      <p className="text-white/60 font-body text-xs uppercase tracking-wider mb-1">Couple</p>
                      <span className="font-display font-black text-accent leading-none text-[clamp(36px,4vw,52px)]">{(trip.pricing.standard as any).couple}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
            <motion.div variants={fadeUp} className="border-2 border-t-0 border-foreground p-8 md:p-10">
              <p className="category-label mb-6">Payment Plan</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
                {trip.paymentPlan.map((step, i) => (
                  <div key={i} className={`flex items-start gap-3 ${i > 0 ? "md:pl-8 md:border-l-2 border-foreground" : ""}`}>
                    <span className="font-display font-black text-accent text-lg leading-none flex-shrink-0">{i + 1}.</span>
                    <p className="font-body text-base text-foreground/70">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── MANDATORY INSURANCE ──────────────────────────────────────── */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <motion.p variants={fadeUp} className="category-label mb-4">Safety first. No exceptions.</motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter text-[clamp(28px,4vw,52px)] leading-[0.95]">
                Mandatory<br />Insurance
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} className="md:border-l-2 border-white/20 md:pl-12">
              <ul className="space-y-4">
                {[
                  "All participants MUST hold valid travel insurance covering kitesurfing and water sports in Brazil.",
                  "Standard travel insurance does NOT cover this activity. Check your policy.",
                  "Required for access to private hospitals in Brazil.",
                  "Proof of insurance must be provided before the trip departs.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-base text-white/80">
                    <span className="text-accent flex-shrink-0 font-black mt-0.5">—</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ARRIVAL LOGISTICS ────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block">Getting there</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter mb-4 text-[clamp(32px,5vw,60px)] leading-[0.95]">
              Arrival Logistics
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/70 font-body text-base mb-16 max-w-2xl leading-relaxed">{trip.meetingNote}</motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t-2 border-foreground">
              {trip.arrival.map((option, i) => (
                <motion.div key={i} variants={fadeUp} className={`py-10 ${i > 0 ? "md:border-l-2 border-foreground md:pl-10 mt-8 md:mt-0" : "md:pr-12"}`}>
                  <p className="category-label mb-3">{option.label}</p>
                  <h3 className="font-display font-black text-foreground uppercase tracking-tighter mb-4 text-[clamp(18px,2vw,26px)] leading-[0.95]">{option.title}</h3>
                  <p className="text-foreground/70 font-body text-base leading-relaxed">{option.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="category-label mb-4 text-accent">{trip.group} · {trip.dates}</p>
              <div className="flex flex-wrap items-baseline gap-4 mb-3">
                <span className="font-display font-black text-white leading-none text-[clamp(48px,7vw,88px)]">{trip.pricing.standard.single}</span>
                <span className="text-white/70 font-body text-base">single room · per person</span>
              </div>
              <p className="text-white/60 font-body text-sm">{trip.spots} spots remaining · {trip.duration}</p>
            </div>
            <div className="flex flex-col gap-4 flex-shrink-0">
              <a href={WHATSAPP_SAFARI} target="_blank" rel="noopener noreferrer" className="btn-cyan text-base w-full sm:w-auto whitespace-nowrap text-center">
                Reserve Your Spot →
              </a>
              <Link href="/trips" className="btn-outline-white text-base w-full sm:w-auto whitespace-nowrap text-center">
                ← Back to Trips
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
