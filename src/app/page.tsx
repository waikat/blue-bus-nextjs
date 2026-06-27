"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import WeatherModal from "@/components/WeatherModal";
import lessonsHero    from "@/assets/lessons-hero.jpg";
import atlantisPhoto  from "@/assets/community-photo.jpg";
import ikoPhoto       from "@/assets/Iko-instructors.jpg";
import boatPhoto      from "@/assets/rescue-boats.jpg";
import flatWaterPhoto from "@/assets/Flat-water-2.jpg";
import chillPhoto     from "@/assets/chill-area-a.jpg";

const GOOGLE_REVIEWS_URL     = "https://g.page/r/CSyJMvsyaLAJEBE/review";
const BOOKING_ALL_LESSONS_ID = "g370000000b0000000c022b3d";

const OCEAN      = "hsl(213,85%,38%)";
const OCEAN_DEEP = "hsl(213,85%,22%)";
const CYAN       = "hsl(186,100%,42%)";
const SAND       = "hsl(42,35%,97%)";

// Hero entrance only — everything else is a simple opacity fade
const heroReveal = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
};

const testimonials = [
  {
    name:    "Dominik Eggenschwiler",
    flag:    "🇨🇭",
    country: "Switzerland",
    quote:   "Owner Rommel goes above and beyond, ensuring every guest feels cared for. With rescue boats always on hand, you can kite with confidence. You might even get the chance to kite alongside playful dolphins.",
  },
  {
    name:    "Jenna Vreugdenhil",
    flag:    "🇳🇱",
    country: "Netherlands",
    quote:   "Absolutely loved taking classes here. I was lucky enough to have Rommel as my instructor and had such a great time with him. Aside from having genuine fun, my confidence grew thanks to his super helpful instructions.",
  },
  {
    name:    "Elena Ribot",
    flag:    "🇪🇸",
    country: "Spain",
    quote:   "Within 5 lessons I could kite independently. I had little experience and was quite scared. The atmosphere is great, everyone helps each other and they have a dedicated rescue service. Thank you Kiteboarding Bonaire!",
  },
];

// 4 reasons to choose KBB
const WHY_KBB = [
  {
    src:   ikoPhoto.src,
    alt:   "IKO certified instructors at Kiteboarding Bonaire",
    label: "IKO Certified",
    desc:  "Every instructor holds an international IKO certification. Your safety and progression are in the right hands.",
  },
  {
    src:   boatPhoto.src,
    alt:   "Rescue boat at Atlantis Beach Bonaire",
    label: "Boat Support",
    desc:  "Our rescue boat is in the water every session. You focus on flying. We handle the rest.",
  },
  {
    src:   flatWaterPhoto.src,
    alt:   "Atlantis Beach flat water kite spot Bonaire",
    label: "Best Flat Water",
    desc:  "Consistent trade winds, warm flat water, no chop. One of the best kite spots on the planet.",
  },
  {
    src:   chillPhoto.src,
    alt:   "Chill area at Kiteboarding Bonaire Blue Bus",
    label: "Chill Area",
    desc:  "Hammocks, shade sails, painted furniture behind the Blue Bus. Where the community lives, before, after, and between sessions.",
  },
];

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);

  return (
    <div style={{ background: SAND }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[100svh] flex items-end">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero_hyperlapse3.mp4"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.45) 55%, hsla(213,85%,12%,0.80) 78%, hsla(213,85%,22%,0.95) 100%)"
        }} />
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pb-10 md:pb-16">
          <motion.h1
            custom={0} initial="hidden" animate="visible" variants={heroReveal}
            className="font-display font-black text-white uppercase"
            style={{ fontSize: "clamp(52px,9vw,120px)", lineHeight: 0.88, letterSpacing: "-0.02em", marginBottom: "0.2em" }}
          >
            THE<br />BLUE BUS
          </motion.h1>
          <motion.p
            custom={1} initial="hidden" animate="visible" variants={heroReveal}
            className="font-body uppercase tracking-[0.22em] mb-8 text-xs sm:text-sm"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Est. 2001 — Bonaire, Caribbean Netherlands
          </motion.p>
          <motion.div
            custom={2} initial="hidden" animate="visible" variants={heroReveal}
            className="flex flex-wrap gap-3"
          >
            <button onClick={() => setBookingOpen(true)} className="btn-cyan">
              Book a Lesson
            </button>
            <Link href="/about" className="btn-outline-white">
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────────────────── */}
      <section style={{ background: SAND }} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
          >
            {/* Left — heading, top-aligned */}
            <div className="md:col-span-7">
              <p className="category-label mb-4">Bonaire&apos;s original kite school</p>
              <h2
                className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(36px,5.5vw,72px)", lineHeight: 0.91 }}
              >
                Learn to fly.<br />Find the wind.<br />Keep coming back.
              </h2>
            </div>

            {/* Right — body + stats, top-aligned with left */}
            <div className="md:col-span-5">
              <p
                className="font-body text-base md:text-lg leading-relaxed mb-10"
                style={{ color: "rgba(0,0,0,0.72)" }}
              >
                Since 2001, we have been on the same beach with the same mission. Get people on the water safely, confidently, and with a smile that sticks around for the rest of their life.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10">
                {[
                  { val: "20+",  label: "Years in\nbusiness"   },
                  { val: "IKO",  label: "Certified\ncenter"     },
                  { val: "300+", label: "Wind days\nper year"   },
                ].map((s) => (
                  <div key={s.val}>
                    <p className="font-display font-black text-foreground text-3xl md:text-4xl leading-none mb-1.5">{s.val}</p>
                    <p className="font-body text-[11px] uppercase tracking-wide"
                      style={{ color: "rgba(0,0,0,0.55)", whiteSpace: "pre-line" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LESSONS SPLIT ────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        className="flex flex-col md:flex-row"
        style={{ minHeight: "520px" }}
      >
        <div className="relative w-full md:w-1/2 overflow-hidden" style={{ minHeight: "320px" }}>
          <img
            src={lessonsHero.src}
            alt="Kitesurf lesson at Atlantis Beach Bonaire"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Soft top fade — bridges from sand above into the photo */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: 100,
              background: "linear-gradient(to bottom, hsl(42,35%,97%) 0%, rgba(248,246,241,0) 100%)",
            }}
          />
          {/* Soft bottom fade removed — picture ends clean */}
        </div>
        <div
          className="relative w-full md:w-1/2 flex flex-col justify-center px-8 md:px-14 py-14 md:py-20"
          style={{ background: OCEAN_DEEP }}
        >
          <p className="category-label mb-4" style={{ color: CYAN }}>
            IKO Certified · Since 2001
          </p>
          <h2
            className="font-display font-black text-white uppercase tracking-tighter mb-5"
            style={{ fontSize: "clamp(30px,4vw,56px)", lineHeight: 0.91 }}
          >
            Learn to kite<br />on Bonaire&apos;s<br />perfect flat water.
          </h2>
          <p className="font-body leading-relaxed mb-8" style={{ fontSize: 16, color: "rgba(255,255,255,0.75)" }}>
            IKO certified instructors. Boat support. Max 2 students per instructor.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/lessons" className="btn-cyan">View Lessons</Link>
            <button onClick={() => setBookingOpen(true)} className="btn-outline-white">Book Now</button>
          </div>
        </div>
      </motion.section>

      {/* ── WHY KBB — 3 reasons with photo + label ───────────────────────────── */}
      <section style={{ background: SAND }} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mb-10"
          >
            <p className="category-label mb-3">Why choose us</p>
            <h2
              className="font-display font-black text-foreground uppercase tracking-tighter"
              style={{ fontSize: "clamp(28px,4vw,52px)", lineHeight: 0.91 }}
            >
              What makes the difference.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {WHY_KBB.map((item, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden"
                style={{
                  background:   "#fff",
                  borderRadius: 12,
                  boxShadow:    "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)",
                }}
              >
                {/* Photo with Ocean Blue label bar */}
                <div className="relative overflow-hidden" style={{ height: 280 }}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 px-5 py-3"
                    style={{ background: OCEAN }}
                  >
                    <p
                      className="font-display font-black text-white uppercase tracking-widest"
                      style={{ fontSize: 11 }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
                {/* Description */}
                <div className="px-5 py-5 flex-1">
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "rgba(0,0,0,0.68)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Rentals strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-14 pt-10 border-t border-black/10">
            <div>
              <p className="category-label mb-2">Also available</p>
              <h3
                className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(26px,3.5vw,48px)" }}
              >
                Premium gear rentals
              </h3>
            </div>
            <Link href="/rentals" className="btn-outline-dark flex-shrink-0">
              Rent Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* ── ATLANTIS BEACH ───────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        className="relative overflow-hidden"
        style={{ background: OCEAN }}
      >
        <img
          src={atlantisPhoto.src}
          alt="Atlantis Beach Bonaire kite spot"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <p className="category-label mb-4" style={{ color: CYAN }}>Where we ride</p>
              <h2
                className="font-display font-black text-white uppercase tracking-tighter"
                style={{ fontSize: "clamp(36px,5vw,68px)", lineHeight: 0.91 }}
              >
                Atlantis Beach.<br />Best flat water<br />on the planet.
              </h2>
            </div>
            <div>
              <p
                className="font-body text-base md:text-lg leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.80)" }}
              >
                Consistent trade winds, warm flat water, an offshore reef keeping the chop down. We have called this beach home for over 20 years and we never plan to leave.
              </p>
              <button onClick={() => setWeatherOpen(true)} className="btn-outline-white">
                Live Wind Forecast
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section style={{ background: SAND }} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="mb-10">
            <p className="category-label mb-3">Real reviews from Google</p>
            <h2
              className="font-display font-black text-foreground uppercase tracking-tighter"
              style={{ fontSize: "clamp(30px,4.5vw,58px)", lineHeight: 0.91 }}
            >
              Stories from<br />the water
            </h2>
          </div>

          {/* 4-card grid — 3 reviews + Leave a Review CTA. All equal dimensions. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col justify-between p-6"
                style={{
                  background:   "#fff",
                  borderRadius: 12,
                  boxShadow:    "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 text-accent fill-current" />)}
                  </div>
                  <p
                    className="font-body text-sm leading-relaxed italic mb-5"
                    style={{ color: "rgba(0,0,0,0.72)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06]">
                  <div
                    className="w-9 h-9 flex items-center justify-center font-display font-black text-white text-sm flex-shrink-0"
                    style={{ background: OCEAN, borderRadius: "50%" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-black text-xs text-foreground uppercase tracking-tight">{t.name}</p>
                    <p className="font-body text-xs" style={{ color: "rgba(0,0,0,0.55)" }}>{t.flag} {t.country}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Leave a Review — matching card, Ocean Blue */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-4 p-6 transition-opacity group hover:opacity-90"
              style={{ background: OCEAN, borderRadius: 12 }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-5 h-5 fill-current text-white" />
                ))}
              </div>
              <p className="font-display font-black text-sm uppercase tracking-widest text-center text-white leading-tight">
                Leave a review
              </p>
              <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
                <span className="font-body text-xs uppercase tracking-widest">on Google</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section style={{ background: OCEAN_DEEP }} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div>
              <p className="category-label mb-4" style={{ color: CYAN }}>Ready to ride?</p>
              <h2
                className="font-display font-black text-white uppercase tracking-tighter"
                style={{ fontSize: "clamp(36px,5.5vw,76px)", lineHeight: 0.91 }}
              >
                Book your<br />lesson today.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
              <button onClick={() => setBookingOpen(true)} className="btn-cyan whitespace-nowrap">
                Book a Lesson
              </button>
              <Link href="/rentals" className="btn-outline-white whitespace-nowrap text-center">
                Rent Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} productId={BOOKING_ALL_LESSONS_ID} />
      <WeatherModal open={weatherOpen} onOpenChange={setWeatherOpen} />
    </div>
  );
}
