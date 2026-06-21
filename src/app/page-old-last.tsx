"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import WeatherModal from "@/components/WeatherModal";
import lessonsHero   from "@/assets/lessons-hero.jpg";
import beachBriefing from "@/assets/photo-beach-briefing.jpg";
import lessonAction  from "@/assets/lesson-action.jpg";
import beachSetup    from "@/assets/beach-setup.jpg";
import atlantisPhoto from "@/assets/bento-trips.jpg";

const GOOGLE_REVIEWS_URL     = "https://g.page/r/CSyJMvsyaLAJEBE/review";
const BOOKING_ALL_LESSONS_ID = "g370000000b0000000c022b3d";

const testimonials = [
  { name: "Dominik Eggenschwiler", flag: "🇨🇭", country: "Switzerland", quote: "Owner Rommel goes above and beyond, ensuring every guest feels cared for. With rescue boats always on hand, you can kite with confidence. You might even get the chance to kite alongside playful dolphins." },
  { name: "Jenna Vreugdenhil",     flag: "🇳🇱", country: "Netherlands", quote: "Absolutely loved taking classes here. I was lucky enough to have Rommel as my instructor and had such a great time with him. Aside from having genuine fun, my confidence grew thanks to his super helpful instructions." },
  { name: "Elena Ribot",           flag: "🇪🇸", country: "Spain",       quote: "Within 5 lessons I could kite independently. I had little experience and was quite scared. The atmosphere is great, everyone helps each other and they have a dedicated rescue service. Thank you Kiteboarding Bonaire!" },
  { name: "Ella",                  flag: "🌍",  country: "Local Guide",  quote: "I love coming down to this area and watching the boarders. There are often world-class ones here. The community seems very friendly. One of the instructors came over and we chatted and watched for a while. So much fun." },
  { name: "Robert",                flag: "🇳🇱", country: "Nederland",   quote: "Prachtige locatie en hele vriendelijke mensen, mooi groot strand. Met alle geduld en aandacht werden de lessen gegeven. Absolute aanrader om hier je lessen te gaan nemen of lekker bezig te gaan op het water!" },
];

const reasons = [
  { num: "01", title: "Safety First",       body: "IKO certified instructors, rescue boat on the water, radio in your helmet. Every session, no exceptions.", photo: beachBriefing.src, alt: "KBB instructor briefing students" },
  { num: "02", title: "Best Spot on Earth", body: "300+ wind days. Flat warm water. Steady trade winds. Atlantis Beach is why we built here and never left.",  photo: lessonAction.src,  alt: "Kitesurfers on Atlantis Beach Bonaire" },
  { num: "03", title: "Gear That Works",    body: "New equipment every season. Whatever your level, you ride on kit that performs.",                            photo: beachSetup.src,    alt: "Premium kiteboarding gear at The Blue Bus" },
];

const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);

  return (
    <div style={{ background: "#F8F6F1" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────
          Full viewport. Video bg. Text pinned bottom-left.
          Gradient: transparent top → hard dark bottom third.
          Font: as large as possible while staying in the dark zone.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[100vh] flex items-end">
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero_hyperlapse3.mp4"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.93) 100%)"
        }} />
        <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-12 md:pb-16">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 variants={fadeUp}
              className="font-display font-black text-white uppercase"
              style={{ fontSize: "clamp(72px, 13vw, 180px)", lineHeight: 0.88, letterSpacing: "-0.02em", marginBottom: "0.3em" }}
            >
              THE<br />BLUE BUS
            </motion.h1>
            <motion.p variants={fadeUp}
              className="font-body text-white/70 text-sm uppercase tracking-[0.22em] mb-8"
            >
              Est. 2001 — Bonaire, Caribbean Netherlands
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button onClick={() => setBookingOpen(true)} className="btn-cyan">Book a Lesson</button>
              <Link href="/about" className="btn-outline-white">Our Story</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────────────
          12-col grid. Headline spans 7 cols (700px at max container).
          Font size capped at 46px so "KEEP COMING BACK." fits on one line
          in a 636px column (700px minus 64px right padding).
          Right col: body text top, stats bottom — no justify-between.
      ──────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#F8F6F1" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">

            {/* Left col — 7/12 */}
            <div className="md:col-span-7 md:pr-16">
              <motion.p variants={fadeUp} className="category-label mb-5">Bonaire&apos;s original kite school</motion.p>
              <motion.h2 variants={fadeUp}
                className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(32px, 3.2vw, 46px)", lineHeight: 0.91 }}
              >
                Learn to fly.<br />Find the wind.<br />Keep coming back.
              </motion.h2>
            </div>

            {/* Right col — 5/12, subtle divider, stacked content */}
            <div className="md:col-span-5 md:pl-12 flex flex-col gap-8"
              style={{ borderLeft: "1px solid rgba(0,0,0,0.09)" }}>
              <motion.p variants={fadeUp}
                className="font-body text-base md:text-lg text-foreground/60 leading-relaxed">
                Since 2001, we have been on the same beach with the same mission. Get people on the water safely, confidently, and with a smile that sticks around for the rest of their life.
              </motion.p>
              <motion.div variants={fadeUp}
                className="grid grid-cols-3 gap-4 pt-6"
                style={{ borderTop: "1px solid rgba(0,0,0,0.09)" }}>
                {[
                  { val: "300+", label: "Wind days\nper year" },
                  { val: "IKO",  label: "Certified\ncenter"   },
                  { val: "5.0",  label: "Google\nreviews"     },
                ].map((s) => (
                  <div key={s.val}>
                    <p className="font-display font-black text-foreground leading-none mb-2"
                      style={{ fontSize: "clamp(26px, 2.2vw, 40px)" }}>{s.val}</p>
                    <p className="font-body text-[11px] text-foreground/40 uppercase tracking-wide leading-snug"
                      style={{ whiteSpace: "pre-line" }}>{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── LESSONS SPLIT ─────────────────────────────────────────────────────
          Left: photo fills 50% width.
          Right: dark panel. Content capped at 480px and centred horizontally
          inside the panel so it doesn't look lost on wide screens.
          Headline: 3.2vw capped at 52px — fits comfortably in ~480px text area.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row" style={{ minHeight: "580px" }}>
        <div className="relative w-full md:w-1/2 overflow-hidden" style={{ minHeight: "380px" }}>
          <img src={lessonsHero.src} alt="Kitesurf lesson at Atlantis Beach Bonaire"
            className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center px-10 py-16"
          style={{ background: "hsl(211,100%,14%)" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="w-full" style={{ maxWidth: "480px" }}>
            <motion.p variants={fadeUp} className="category-label mb-5">Lessons</motion.p>
            <motion.h2 variants={fadeUp}
              className="font-display font-black text-white uppercase tracking-tighter mb-6"
              style={{ fontSize: "clamp(34px, 3.2vw, 52px)", lineHeight: 0.93 }}
            >
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

      {/* ── THREE REASONS ─────────────────────────────────────────────────────
          Three tall photo cards. Photo fills card. Strong bottom gradient.
          Reason number ghosted top-left. Title + body anchored bottom.
          Rentals CTA strip below with items-center.
      ──────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#F8F6F1" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="mb-12">
            <motion.p variants={fadeUp} className="category-label mb-3">Why Kiteboarding Bonaire</motion.p>
            <motion.h2 variants={fadeUp}
              className="font-display font-black text-foreground uppercase tracking-tighter"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.91 }}>
              Three reasons<br />we&apos;re different.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {reasons.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4", borderRadius: "6px" }}
              >
                <img src={r.photo} alt={r.alt}
                  className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(5,18,40,0.97) 0%, rgba(5,18,40,0.55) 40%, rgba(5,18,40,0.08) 70%)"
                }} />
                {/* Ghost number top-left */}
                <p className="absolute top-6 left-6 font-display font-black text-white/20 leading-none select-none"
                  style={{ fontSize: "72px" }}>{r.num}</p>
                {/* Text anchored bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="w-8 h-[3px] mb-4" style={{ background: "hsl(186,100%,42%)" }} />
                  <h3 className="font-display font-black text-white uppercase tracking-tighter text-lg mb-2"
                    style={{ lineHeight: 0.95 }}>{r.title}</h3>
                  <p className="font-body text-white/70 text-sm leading-relaxed">{r.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rentals strip — items-center so button and text are on same axis */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 pt-8"
            style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <div>
              <p className="category-label mb-1">Also available</p>
              <h3 className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(24px, 3vw, 44px)" }}>
                Premium gear rentals
              </h3>
            </div>
            <Link href="/rentals" className="btn-outline-dark flex-shrink-0">Rent Equipment</Link>
          </div>
        </div>
      </section>

      {/* ── ATLANTIS BEACH ────────────────────────────────────────────────────
          Full-bleed photo at 100% opacity.
          Gradient left-to-right: dark left anchor for text, photo breathes right.
          Content max-w-lg so headline doesn't stretch too wide.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "65vh" }}>
        <img src={atlantisPhoto.src} alt="Atlantis Beach Bonaire kiteboarding spot"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "right center" }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(5,18,40,0.97) 0%, rgba(5,18,40,0.88) 35%, rgba(5,18,40,0.45) 65%, rgba(5,18,40,0.05) 100%)"
        }} />
        <div className="relative z-10 flex items-center"
          style={{ minHeight: "65vh" }}>
          <div className="max-w-7xl mx-auto w-full px-8 sm:px-14 lg:px-20 py-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ maxWidth: "520px" }}>
              <motion.p variants={fadeUp} className="category-label mb-5">Where we ride</motion.p>
              <motion.h2 variants={fadeUp}
                className="font-display font-black text-white uppercase tracking-tighter mb-6"
                style={{ fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 0.91 }}>
                Atlantis Beach.<br />Best flat water<br />on the planet.
              </motion.h2>
              <motion.p variants={fadeUp}
                className="font-body text-white/70 text-base md:text-lg leading-relaxed mb-10">
                Consistent trade winds, warm flat water, an offshore reef keeping the chop down. We have called this beach home for over 20 years and we never plan to leave.
              </motion.p>
              <motion.div variants={fadeUp}>
                <button onClick={() => setWeatherOpen(true)} className="btn-outline-white">
                  Live Wind Forecast
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────
          Desktop: 3 static equal-width columns. No scroll, no peeking 4th card.
          Mobile: horizontal snap scroll, 80vw cards.
          Header row: items-end so Google button baseline-aligns with headline.
          Cards: #EFECEA background — no border, no shadow.
      ──────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#F8F6F1" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="category-label mb-3">Real reviews from Google</p>
              <h2 className="font-display font-black text-foreground uppercase tracking-tighter"
                style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.91 }}>
                Stories from<br />the water
              </h2>
            </div>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer"
              className="btn-outline-dark inline-flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-accent fill-current" />)}
              </div>
              5.0 on Google
            </a>
          </div>

          {/* Desktop — 3 static cols */}
          <div className="hidden md:grid grid-cols-3 gap-5">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col justify-between p-7"
                style={{ background: "#EFECEA", borderRadius: "6px" }}>
                <div>
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 text-accent fill-current" />)}
                  </div>
                  <p className="font-body text-foreground/75 text-sm leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                  <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center font-display font-black text-background text-xs flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-black text-xs text-foreground uppercase tracking-tight">{t.name}</p>
                    <p className="font-body text-xs text-foreground/45">{t.flag} {t.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile — scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory -mx-8 px-8">
            {testimonials.map((t, i) => (
              <div key={i}
                className="snap-start flex-shrink-0 flex flex-col justify-between p-6"
                style={{ width: "80vw", background: "#EFECEA", borderRadius: "6px" }}>
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 text-accent fill-current" />)}
                  </div>
                  <p className="font-body text-foreground/75 text-sm leading-relaxed italic mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                  <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center font-display font-black text-background text-xs flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-black text-xs text-foreground uppercase tracking-tight">{t.name}</p>
                    <p className="font-body text-xs text-foreground/45">{t.flag} {t.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────
          Compact. Headline sized for a closing statement, not a hero.
          Buttons side by side on sm+.
      ──────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "hsl(211,100%,16%)" }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="category-label mb-3">Ready to ride?</p>
              <h2 className="font-display font-black text-white uppercase tracking-tighter"
                style={{ fontSize: "clamp(32px, 4.5vw, 64px)", lineHeight: 0.91 }}>
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
