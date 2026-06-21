"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import WeatherModal from "@/components/WeatherModal";
import { useLiveWind } from "@/hooks/useLiveWind";
import lessonsHero  from "@/assets/lessons-hero.jpg";
import beachSetup   from "@/assets/beach-setup.jpg";
import lessonAction from "@/assets/lesson-action.jpg";
import beachBriefing from "@/assets/photo-beach-briefing.jpg";
import atlantisPhoto from "@/assets/bento-trips.jpg";

const GOOGLE_REVIEWS_URL    = "https://g.page/r/CSyJMvsyaLAJEBE/review";
const BOOKING_ALL_LESSONS_ID = "g370000000b0000000c022b3d";

const testimonials = [
  { name: "Dominik Eggenschwiler", flag: "🇨🇭", country: "Switzerland", quote: "Owner Rommel goes above and beyond, ensuring every guest feels cared for. With rescue boats always on hand, you can kite with confidence. You might even get the chance to kite alongside playful dolphins." },
  { name: "Jenna Vreugdenhil",     flag: "🇳🇱", country: "Netherlands", quote: "Absolutely loved taking classes here. I was lucky enough to have Rommel as my instructor and had such a great time with him. Aside from having genuine fun, my confidence grew thanks to his super helpful instructions." },
  { name: "Elena Ribot",           flag: "🇪🇸", country: "Spain",       quote: "Within 5 lessons I could kite independently. I had little experience and was quite scared. The atmosphere is great, everyone helps each other and they have a dedicated rescue service. Thank you Kiteboarding Bonaire!" },
  { name: "Ella",                  flag: "🌍",  country: "Local Guide",  quote: "I love coming down to this area and watching the boarders. There are often world-class ones here. The community seems very friendly. One of the instructors came over and we chatted and watched for a while. So much fun." },
  { name: "Robert",                flag: "🇳🇱", country: "Nederland",   quote: "Prachtige locatie en hele vriendelijke mensen, mooi groot strand. Met alle geduld en aandacht werden de lessen gegeven. Absolute aanrader om hier je lessen te gaan nemen of lekker bezig te gaan op het water!" },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);
  const wind = useLiveWind();

  return (
    <div style={{ background: "#F8F6F1" }}>

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[100vh] flex items-end">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src="/videos/hero_hyperlapse3.mp4" />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.88) 80%, rgba(0,0,0,0.92) 100%)"
        }} />
        <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-10 md:pb-14">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase"
              style={{ fontSize: "clamp(80px, 14.5vw, 200px)", lineHeight: 0.86, letterSpacing: "-0.02em", marginBottom: "0.25em" }}>
              THE<br />BLUE BUS
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-white/70 text-sm uppercase tracking-[0.25em] mb-8">
              Est. 2001 — Bonaire, Caribbean Netherlands
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button onClick={() => setBookingOpen(true)} className="btn-cyan">Book a Lesson</button>
              <Link href="/about" className="btn-outline-white">Our Story</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section style={{ background: "#F8F6F1" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0 items-stretch">

            {/* Left — headline */}
            <div className="md:col-span-7 md:pr-16 flex flex-col justify-center">
              <motion.p variants={fadeUp} className="category-label mb-4">Bonaire&apos;s original kite school</motion.p>
              <motion.h2 variants={fadeUp}
                className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(36px, 4vw, 58px)", lineHeight: 0.91 }}>
                Learn to fly.<br />Find the wind.<br />Keep coming back.
              </motion.h2>
            </div>

            {/* Right — body then stats, natural gap not justify-between */}
            <div className="md:col-span-5 md:pl-14 flex flex-col gap-10 justify-center">
              <motion.p variants={fadeUp}
                className="font-body text-base md:text-lg leading-relaxed"
                style={{ color: "rgba(0,0,0,0.78)" }}>
                Since 2001, we have been on the same beach with the same mission. Get people on the water safely, confidently, and with a smile that sticks around for the rest of their life.
              </motion.p>
              <motion.div variants={fadeUp}
                className="grid grid-cols-3 gap-4 pt-8"
                style={{ borderTop: "1px solid rgba(0,0,0,0.09)" }}>
                {[
                  { val: "300+", label: "Wind days\nper year" },
                  { val: "IKO",  label: "Certified\ncenter" },
                  { val: "5.0",  label: "Google\nreviews" },
                ].map((s) => (
                  <div key={s.val}>
                    <p className="font-display font-black text-foreground text-4xl leading-none mb-1.5">{s.val}</p>
                    <p className="font-body text-[11px] uppercase tracking-wide"
                      style={{ whiteSpace: "pre-line", color: "rgba(0,0,0,0.50)" }}>{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* LESSONS SPLIT */}
      <section className="flex flex-col md:flex-row" style={{ minHeight: "580px" }}>
        <div className="relative w-full md:w-1/2 overflow-hidden" style={{ minHeight: "380px" }}>
          <img src={lessonsHero.src} alt="Kitesurf lesson at Atlantis Beach Bonaire" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center px-10 md:px-16 py-16"
          style={{ background: "hsl(211,100%,14%)" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ maxWidth: "480px", width: "100%" }}>
            <motion.p variants={fadeUp} className="category-label mb-5">Lessons</motion.p>
            <motion.h2 variants={fadeUp}
              className="font-display font-black text-white uppercase tracking-tighter mb-6"
              style={{ fontSize: "clamp(36px, 3.5vw, 56px)", lineHeight: 0.93 }}>
              From zero<br />to riding<br />in 3 days.
            </motion.h2>
            <motion.p variants={fadeUp}
              className="font-body text-white/70 text-base leading-relaxed mb-10">
              IKO-certified lessons for all levels. Small groups, rescue boats on the water, and instructors who genuinely love what they do.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/lessons" className="btn-cyan">View Lessons & Prices</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PHOTO TRIO + RENTALS */}
      <section style={{ background: "#F8F6F1" }} className="pt-20 md:pt-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <div className="grid grid-cols-3 gap-4 md:gap-5">
            {[
              { src: beachSetup.src,    alt: "Beach setup at Atlantis", delay: 0,    offset: false },
              { src: lessonAction.src,  alt: "Kiteboarding lesson",     delay: 0.1,  offset: true  },
              { src: beachBriefing.src, alt: "Beach briefing KBB",      delay: 0.18, offset: false },
            ].map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: p.offset ? 50 : 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: p.delay, ease: [0.16,1,0.3,1] as const }}
                className={`relative overflow-hidden rounded-lg ${p.offset ? "mt-10 md:mt-16" : ""}`}
                style={{ aspectRatio: "3/4" }}>
                <img src={p.src} alt={p.alt} className="absolute inset-0 w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 pb-20 md:pb-28"
            style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "2rem" }}>
            <div>
              <p className="category-label mb-2">Also available</p>
              <h3 className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>Premium gear rentals</h3>
            </div>
            <Link href="/rentals" className="btn-outline-dark flex-shrink-0">Rent Equipment</Link>
          </div>
        </div>
      </section>

      {/* ATLANTIS BEACH */}
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
                style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 0.91 }}>
                Atlantis Beach.<br />Best flat water<br />on the planet.
              </motion.h2>
            </div>
            <div>
              <motion.p variants={fadeUp}
                className="font-body text-white/80 text-base md:text-lg leading-relaxed mb-8">
                Consistent trade winds, warm flat water, an offshore reef keeping the chop down. We have called this beach home for over 20 years and we never plan to leave.
              </motion.p>
              <motion.div variants={fadeUp}>
                <button onClick={() => setWeatherOpen(true)} className="btn-outline-white">
                  Live Wind Forecast
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS — 3 static cols desktop, scroll mobile */}
      <section style={{ background: "#F8F6F1" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="category-label mb-3">Real reviews from Google</p>
              <h2 className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(34px, 5vw, 64px)", lineHeight: 0.91 }}>
                Stories from<br />the water
              </h2>
            </div>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer"
              className="btn-cyan inline-flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
              <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-white fill-white" />)}</div>
              5.0 on Google
            </a>
          </div>

          {/* Desktop: 3 static cols */}
          <div className="hidden md:grid grid-cols-3 gap-5">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col justify-between p-7"
                style={{ background: "#EFECEA", borderRadius: "6px" }}>
                <div>
                  <div className="flex gap-0.5 mb-5">{[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 text-accent fill-current" />)}</div>
                  <p className="font-body text-sm leading-relaxed italic mb-6"
                    style={{ color: "rgba(0,0,0,0.78)" }}>&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                  <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center font-display font-black text-background text-xs flex-shrink-0">{t.name[0]}</div>
                  <div>
                    <p className="font-display font-black text-xs text-foreground uppercase tracking-tight">{t.name}</p>
                    <p className="font-body text-xs" style={{ color: "rgba(0,0,0,0.55)" }}>{t.flag} {t.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory -mx-8 px-8">
            {testimonials.map((t, i) => (
              <div key={i} className="snap-start flex-shrink-0 flex flex-col justify-between p-6"
                style={{ width: "80vw", background: "#EFECEA", borderRadius: "6px" }}>
                <div>
                  <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 text-accent fill-current" />)}</div>
                  <p className="font-body text-sm leading-relaxed italic mb-5"
                    style={{ color: "rgba(0,0,0,0.78)" }}>&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                  <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center font-display font-black text-background text-xs flex-shrink-0">{t.name[0]}</div>
                  <div>
                    <p className="font-display font-black text-xs text-foreground uppercase tracking-tight">{t.name}</p>
                    <p className="font-body text-xs" style={{ color: "rgba(0,0,0,0.55)" }}>{t.flag} {t.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "hsl(211,100%,16%)" }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="category-label mb-3">Ready to ride?</p>
              <h2 className="font-display font-black text-white uppercase tracking-tighter"
                style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.91 }}>
                Book your<br />lesson today.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button onClick={() => setBookingOpen(true)} className="btn-cyan">Book a Lesson</button>
              <Link href="/rentals" className="btn-outline-white text-center">Rent Equipment</Link>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} productId={BOOKING_ALL_LESSONS_ID} />
      <WeatherModal open={weatherOpen} onOpenChange={setWeatherOpen} />
    </div>
  );
}
