"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import WeatherModal from "@/components/WeatherModal";
import { useLiveWind } from "@/hooks/useLiveWind";
import lessonsHero   from "@/assets/lessons-hero.jpg";
import beachSetup    from "@/assets/beach-setup.jpg";
import lessonAction  from "@/assets/lesson-action.jpg";
import beachBriefing from "@/assets/photo-beach-briefing.jpg";
import atlantisPhoto from "@/assets/bento-trips.jpg";

const GOOGLE_REVIEWS_URL     = "https://g.page/r/CSyJMvsyaLAJEBE/review";
const BOOKING_ALL_LESSONS_ID = "g370000000b0000000c022b3d";

const testimonials = [
  { name: "Dominik Eggenschwiler", flag: "🇨🇭", country: "Switzerland",  quote: "Owner Rommel goes above and beyond, ensuring every guest feels cared for. With rescue boats always on hand, you can kite with confidence. You might even get the chance to kite alongside playful dolphins." },
  { name: "Jenna Vreugdenhil",     flag: "🇳🇱", country: "Netherlands",  quote: "Absolutely loved taking classes here. I was lucky enough to have Rommel as my instructor and had such a great time with him. Aside from having genuine fun, my confidence grew thanks to his super helpful instructions." },
  { name: "Elena Ribot",           flag: "🇪🇸", country: "Spain",         quote: "Within 5 lessons I could kite independently. I had little experience and was quite scared. The atmosphere is great, everyone helps each other and they have a dedicated rescue service. Thank you Kiteboarding Bonaire!" },
  { name: "Ella",                  flag: "🌍",  country: "Local Guide",   quote: "I love coming down to this area and watching the boarders. There are often world-class ones here. The community seems very friendly. One of the instructors came over and we chatted and watched for a while. So much fun." },
  { name: "Robert",                flag: "🇳🇱", country: "Nederland",     quote: "Prachtige locatie en hele vriendelijke mensen, mooi groot strand. Met alle geduld en aandacht werden de lessen gegeven. Absolute aanrader om hier je lessen te gaan nemen of lekker bezig te gaan op het water!" },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);
  const wind = useLiveWind();

  return (
    <div style={{ background: "#F8F6F1" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[100vh] flex items-end">
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero_hyperlapse3.mp4" />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.88) 80%, rgba(0,0,0,0.92) 100%)"
        }} />
        <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-10 md:pb-14">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-white uppercase"
              style={{ fontSize: "clamp(80px,14.5vw,200px)", lineHeight: 0.86, letterSpacing: "-0.02em", marginBottom: "0.25em" }}
            >
              THE<br />BLUE BUS
            </motion.h1>
            <motion.p variants={fadeUp}
              className="font-body text-white uppercase tracking-[0.25em] mb-8 text-sm"
              style={{ color: "rgba(255,255,255,0.78)" }}>
              Est. 2001 — Bonaire, Caribbean Netherlands
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              {/* 0px radius — no rounding anywhere */}
              <button
                onClick={() => setBookingOpen(true)}
                className="font-display font-black text-sm uppercase tracking-widest px-10 py-4 text-white transition-all duration-200 hover:brightness-110"
                style={{ background: "hsl(186,100%,42%)", borderRadius: 0 }}
              >
                Book a Lesson
              </button>
              <Link
                href="/about"
                className="font-display font-black text-sm uppercase tracking-widest px-10 py-4 text-white transition-all duration-200 hover:bg-white/15"
                style={{ border: "2px solid rgba(255,255,255,0.70)", borderRadius: 0 }}
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#F8F6F1" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0 items-start">

            <div className="md:col-span-7">
              <motion.p variants={fadeUp} className="category-label mb-4">
                Bonaire&apos;s original kite school
              </motion.p>
              <motion.h2 variants={fadeUp}
                className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(42px,6.5vw,92px)", lineHeight: 0.91 }}>
                Learn to fly.<br />Find the wind.<br />Keep coming back.
              </motion.h2>
            </div>

            <div className="md:col-span-5 md:pl-14 md:pt-24">
              <motion.p variants={fadeUp}
                className="font-body text-base md:text-lg leading-relaxed mb-10"
                style={{ color: "rgba(0,0,0,0.78)" }}>
                Since 2001, we have been on the same beach with the same mission. Get people on the water safely, confidently, and with a smile that sticks around for the rest of their life.
              </motion.p>
              {/* Stats — no divider line */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { val: "300+", label: "Wind days\nper year" },
                  { val: "IKO",  label: "Certified\ncenter" },
                  { val: "5.0",  label: "Google\nreviews" },
                ].map((s) => (
                  <div key={s.val}>
                    <p className="font-display font-black text-foreground text-4xl leading-none mb-1.5">{s.val}</p>
                    <p className="font-body text-[11px] uppercase tracking-wide"
                      style={{ color: "rgba(0,0,0,0.60)", whiteSpace: "pre-line" }}>{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LESSONS SPLIT ────────────────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row" style={{ minHeight: "580px" }}>
        <div className="relative w-full md:w-1/2 overflow-hidden" style={{ minHeight: "380px" }}>
          <img src={lessonsHero.src} alt="Kitesurf lesson at Atlantis Beach Bonaire"
            className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-16 md:py-20"
          style={{ background: "hsl(211,100%,14%)" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-5" style={{ color: "hsl(186,100%,42%)" }}>
              IKO Certified · Since 2001
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="font-display font-black text-white uppercase tracking-tighter mb-6"
              style={{ fontSize: "clamp(34px,4.5vw,62px)", lineHeight: 0.91 }}>
              Learn to kite<br />on Bonaire&apos;s<br />perfect flat water.
            </motion.h2>
            <motion.p variants={fadeUp}
              className="font-body leading-relaxed mb-10"
              style={{ fontSize: 16, color: "rgba(255,255,255,0.78)" }}>
              Radio helmets. Boat support. IKO certified instructors. Max 2 students per instructor.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/lessons"
                className="font-display font-black text-sm uppercase tracking-widest px-10 py-4 text-white transition-all hover:brightness-110"
                style={{ background: "hsl(186,100%,42%)", borderRadius: 0 }}>
                View Lessons
              </Link>
              <button onClick={() => setBookingOpen(true)}
                className="font-display font-black text-sm uppercase tracking-widest px-10 py-4 text-white transition-all hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.50)", borderRadius: 0 }}>
                Book Now
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PHOTO TRIO + RENTALS ─────────────────────────────────────────────── */}
      <section style={{ background: "#F8F6F1" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <div className="grid grid-cols-3 gap-5 items-end">
            {[
              { src: beachSetup.src,    alt: "Gear setup at Atlantis Beach",        offset: false },
              { src: lessonAction.src,  alt: "Kite lesson in action on the water",   offset: true  },
              { src: beachBriefing.src, alt: "Pre-lesson beach briefing with instructor", offset: false },
            ].map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                /* no rounded corners — photos are raw */
                className={`relative overflow-hidden ${p.offset ? "mt-10 md:mt-16" : ""}`}
                style={{ aspectRatio: "3/4" }}>
                <img src={p.src} alt={p.alt}
                  className="absolute inset-0 w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>

          {/* Rentals strip — no divider line */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-14 pb-0">
            <div>
              <p className="category-label mb-2">Also available</p>
              <h3 className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(28px,4vw,52px)" }}>
                Premium gear rentals
              </h3>
            </div>
            {/* No rounded-full — matches DNA */}
            <Link href="/rentals"
              className="inline-block font-display font-black text-sm uppercase tracking-widest px-8 py-3.5 border-2 border-foreground text-foreground transition-all duration-200 hover:bg-foreground hover:text-background flex-shrink-0"
              style={{ borderRadius: 0 }}>
              Rent Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* ── ATLANTIS BEACH ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "hsl(211,100%,14%)" }}>
        <img src={atlantisPhoto.src} alt="Atlantis Beach Bonaire kite spot"
          className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 py-20 md:py-28">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <motion.p variants={fadeUp} className="category-label mb-5">Where we ride</motion.p>
              <motion.h2 variants={fadeUp}
                className="font-display font-black text-white uppercase tracking-tighter"
                style={{ fontSize: "clamp(40px,5.5vw,76px)", lineHeight: 0.91 }}>
                Atlantis Beach.<br />Best flat water<br />on the planet.
              </motion.h2>
            </div>
            <div>
              <motion.p variants={fadeUp}
                className="font-body text-base md:text-lg leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.78)" }}>
                Consistent trade winds, warm flat water, an offshore reef keeping the chop down. We have called this beach home for over 20 years and we never plan to leave.
              </motion.p>
              <motion.div variants={fadeUp}>
                {/* No rounded-full */}
                <button onClick={() => setWeatherOpen(true)}
                  className="inline-block font-display font-black text-sm uppercase tracking-widest px-8 py-3.5 border text-white transition-all duration-200 hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.40)", borderRadius: 0 }}>
                  Live Wind Forecast
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#F8F6F1" }} className="py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="px-8 sm:px-14 lg:px-20 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="category-label mb-3">Real reviews from Google</p>
              <h2 className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(34px,5vw,64px)", lineHeight: 0.91 }}>
                Stories from<br />the water
              </h2>
            </div>
            {/* No rounded-full */}
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-display font-black text-xs uppercase tracking-widest px-6 py-3 border text-foreground hover:border-foreground transition-all self-start sm:self-auto flex-shrink-0"
              style={{ borderColor: "rgba(0,0,0,0.25)", borderRadius: 0 }}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-accent fill-current" />)}
              </div>
              5.0 on Google
            </a>
          </div>

          <div className="flex gap-5 overflow-x-auto px-8 sm:px-14 lg:px-20 pb-4 hide-scrollbar snap-x snap-mandatory">
            {testimonials.map((t, i) => (
              /* No rounded-2xl — sharp cards match DNA */
              <div key={i}
                className="snap-start flex-shrink-0 w-[300px] md:w-[340px] flex flex-col justify-between p-7"
                style={{ background: "#fff", boxShadow: "0 1px 16px rgba(0,0,0,0.06)", borderRadius: 0 }}>
                <div>
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 text-accent fill-current" />)}
                  </div>
                  <p className="font-body text-sm leading-relaxed italic mb-5"
                    style={{ color: "rgba(0,0,0,0.78)" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                {/* No inner borderTop line */}
                <div className="flex items-center gap-3 pt-4">
                  <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center font-display font-black text-background text-xs flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-black text-xs text-foreground uppercase tracking-tight">{t.name}</p>
                    <p className="font-body text-xs" style={{ color: "rgba(0,0,0,0.60)" }}>
                      {t.flag} {t.country}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Leave a review — no rounded corners */}
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer"
              className="snap-start flex-shrink-0 w-[180px] flex flex-col items-center justify-center gap-3 p-7 border border-dashed hover:border-accent hover:bg-accent/5 transition-all group"
              style={{ borderColor: "rgba(0,0,0,0.18)", borderRadius: 0 }}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-current text-foreground/20 group-hover:text-accent transition-colors" />
                ))}
              </div>
              <p className="font-display font-black text-[11px] uppercase tracking-widest text-center transition-colors"
                style={{ color: "rgba(0,0,0,0.60)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(0,0,0,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,0,0,0.60)")}>
                Leave a review
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section style={{ background: "hsl(211,100%,16%)" }} className="pt-20 md:pt-24 pb-0 relative">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 pb-20 md:pb-28">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div>
              <p className="category-label mb-4">Ready to ride?</p>
              <h2 className="font-display font-black text-white uppercase tracking-tighter"
                style={{ fontSize: "clamp(38px,6vw,84px)", lineHeight: 0.91 }}>
                Book your<br />lesson today.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
              {/* No rounded corners */}
              <button onClick={() => setBookingOpen(true)}
                className="font-display font-black text-sm uppercase tracking-widest px-10 py-4 text-white transition-all duration-200 hover:brightness-110 whitespace-nowrap"
                style={{ background: "hsl(186,100%,42%)", borderRadius: 0 }}>
                Book a Lesson
              </button>
              <Link href="/rentals"
                className="font-display font-black text-sm uppercase tracking-widest px-10 py-4 text-white transition-all duration-200 hover:bg-white/10 whitespace-nowrap text-center"
                style={{ border: "2px solid rgba(255,255,255,0.45)", borderRadius: 0 }}>
                Rent Equipment
              </Link>
            </div>
          </div>
        </div>

        {/* Wave — decorative, not a divider line */}
        <div className="w-full overflow-hidden" style={{ marginBottom: "-3px" }}>
          <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "72px" }}>
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
              fill="hsl(211,100%,12%)" />
          </svg>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} productId={BOOKING_ALL_LESSONS_ID} />
      <WeatherModal open={weatherOpen} onOpenChange={setWeatherOpen} />
    </div>
  );
}
