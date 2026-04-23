"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Wind, Star, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import WeatherModal from "@/components/WeatherModal";
import { useLiveWind } from "@/hooks/useLiveWind";
import bentoLessons from "@/assets/bento-lessons.jpg";
import bentoTrips from "@/assets/bento-trips.jpg";
import bentoRentals from "@/assets/bento-rentals.jpg";
import { t } from "@/i18n/config";

const GOOGLE_REVIEWS_URL = "https://g.page/r/CSyJMvsyaLAJEBE/review";
const NAVY_DEEP = "hsl(211,100%,12%)";
const NAVY_MID  = "hsl(211,100%,16%)";
const BOOKING_ALL_LESSONS_ID = "g370000000b0000000c022b3d";

const nl = t("nl");

const testimonials = [
  { name: "Dominik Eggenschwiler", flag: "🇨🇭", country: "Zwitserland",  quote: "Eigenaar Rommel gaat verder dan verwacht en zorgt ervoor dat elke gast zich welkom voelt. Met reddingsboten altijd bij de hand kun je met vertrouwen kiten. Je kunt zelfs naast speelse dolfijnen kiten." },
  { name: "Jenna Vreugdenhil",     flag: "🇳🇱", country: "Nederland",    quote: "Ik vond het geweldig om hier lessen te nemen. Ik had het geluk Rommel als instructeur te hebben en had zo'n geweldige tijd met hem. Naast dat het echt leuk was, groeide mijn zelfvertrouwen dankzij zijn superhandige instructies." },
  { name: "Elena Ribot",           flag: "🇪🇸", country: "Spanje",       quote: "Binnen 5 lessen kon ik zelfstandig kiten. Ik had weinig ervaring en was best bang. De sfeer is geweldig, iedereen helpt elkaar en ze hebben een dedicated reddingsdienst. Bedankt Kiteboarding Bonaire!" },
  { name: "Ella",                  flag: "🌍", country: "Local Guide",   quote: "Ik kom graag naar dit gebied en kijk naar de boarders. Er zijn vaak wereldklasse rijders. De community lijkt erg vriendelijk. Een van de instructeurs kwam langs en we hebben even gepraat en gekeken. Zo leuk." },
  { name: "Robert",                flag: "🇳🇱", country: "Nederland",    quote: "Prachtige locatie en hele vriendelijke mensen, mooi groot strand. Met alle geduld en aandacht werden de lessen gegeven. Absolute aanrader om hier je lessen te gaan nemen of lekker bezig te gaan op het water!" },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function NLHomePage() {
  const [bookingOpen,  setBookingOpen]  = useState(false);
  const [weatherOpen,  setWeatherOpen]  = useState(false);
  const [activeReview, setActiveReview] = useState(1);
  const wind = useLiveWind();

  const prev = () => setActiveReview((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveReview((i) => (i + 1) % testimonials.length);
  const cards = [
    testimonials[(activeReview - 1 + testimonials.length) % testimonials.length],
    testimonials[activeReview],
    testimonials[(activeReview + 1) % testimonials.length],
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex items-center justify-center text-center min-h-[100vh]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src="/videos/hero_hyperlapse.mp4" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,18,40,0.62) 0%, rgba(5,18,40,0.42) 50%, rgba(5,18,40,0.88) 100%)" }} />
        <div className="relative z-10 px-6 sm:px-10 max-w-5xl mx-auto w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-accent font-display font-black text-xs uppercase tracking-[0.35em] mb-8">{nl.home.heroLabel}</motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter mb-8" style={{ fontSize: "clamp(58px, 11vw, 148px)", lineHeight: 0.95 }}>DE<br />BLAUWE BUS</motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 font-body text-sm md:text-base uppercase tracking-[0.22em] mb-12 mx-auto max-w-[400px]">{nl.home.heroSub1}<br />{nl.home.heroSub2}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => setBookingOpen(true)} className="btn-cyan text-sm w-full sm:w-auto">{nl.home.bookLesson}</button>
              <Link href="/nl/verhuur" className="btn-outline-white text-sm w-full sm:w-auto">{nl.home.rentEquipment}</Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────── */}
      <section style={{ background: NAVY_MID }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { val: nl.home.ikoCertified, sub: nl.home.ikoSub       },
              { val: nl.home.number1,      sub: nl.home.number1Sub    },
              { val: nl.home.est,          sub: nl.home.estSub        },
              { val: nl.home.fiveStar,     sub: nl.home.fiveStarSub   },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center text-center py-5 md:py-6 px-3">
                <span className="font-display font-black text-white text-xs md:text-sm uppercase tracking-widest mb-1">{b.val}</span>
                <span className="text-white/60 font-body text-[10px] md:text-xs uppercase tracking-wider">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO GRID ───────────────────────────────────────────────── */}
      <section className="bg-background py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
            <motion.p variants={fadeUp} className="category-label mb-3">{nl.home.explore}</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter leading-[0.95]" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>Alles wat<br />we doen</motion.h2>
          </motion.div>

          {/* Desktop bento */}
          <div className="hidden md:grid grid-cols-12 gap-0 border-2 border-foreground min-h-[600px]">
            <div className="col-span-7 row-span-2 border-r-2 border-foreground flex flex-col min-h-[600px]">
              <Link href="/nl/lessen" className="relative overflow-hidden group block h-full flex-1">
                <img src={bentoLessons.src} alt="Kitesurflessen Bonaire" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%)" }} />
                <div className="absolute bottom-0 left-0 p-8 z-10 w-full flex items-end justify-between">
                  <div>
                    <p className="category-label mb-2">{nl.home.ikoCertBento}</p>
                    <h3 className="font-display font-black text-white uppercase tracking-tighter leading-[0.95]" style={{ fontSize: "clamp(32px, 4vw, 60px)" }}>Leer<br />kitesurfen</h3>
                  </div>
                  <div className="w-12 h-12 border-2 border-white/70 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all flex-shrink-0 ml-6">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-span-5 border-b-2 border-foreground flex flex-col min-h-[300px]">
              <Link href="/nl/verhuur" className="relative overflow-hidden group block h-full flex-1">
                <img src={bentoRentals.src} alt="Kitesurfmateriaal verhuur Atlantis Beach, Bonaire" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.08) 60%)" }} />
                <div className="absolute bottom-0 left-0 p-6 z-10 w-full flex items-end justify-between">
                  <div>
                    <p className="category-label mb-1">{nl.home.premiumGear}</p>
                    <h3 className="font-display font-black text-white text-2xl uppercase tracking-tighter leading-[0.95]">{nl.home.rentGear}</h3>
                  </div>
                  <div className="w-10 h-10 border border-white/70 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-span-3 border-r-2 border-foreground flex flex-col min-h-[300px]">
              <button onClick={() => setWeatherOpen(true)} className="w-full h-full flex-1 bg-primary flex flex-col items-start justify-between p-6 hover:bg-primary/80 transition-colors text-left">
                <div className="w-full flex items-start justify-between">
                  <Wind className={`w-7 h-7 ${wind.isLoading ? "text-white/30 animate-pulse" : "text-accent"}`} />
                  <span className="text-accent text-xs font-body uppercase tracking-widest">{nl.home.forecastLink}</span>
                </div>
                <div>
                  <p className="font-display font-black text-white/70 text-xs uppercase tracking-widest mb-2">{nl.home.liveWind}</p>
                  {!wind.isLoading && !wind.error ? (
                    <>
                      <p className="font-display font-black text-white leading-none mb-1" style={{ fontSize: "clamp(40px, 4vw, 56px)" }}>{wind.speed}<span className="text-lg font-body font-normal text-white/70 ml-1">kts</span></p>
                      <p className="text-white/70 text-xs font-body uppercase tracking-wider">{wind.directionText}. Windstoot {wind.gust}kt.</p>
                    </>
                  ) : (
                    <div>
                      <p className="text-white/70 text-sm font-body uppercase tracking-wider mb-2">{wind.isLoading ? nl.home.loading : nl.home.stationOffline}</p>
                      {wind.error && <a href="https://www.windguru.cz/209061" target="_blank" rel="noreferrer" className="text-accent text-xs underline underline-offset-4 font-body" onClick={(e) => e.stopPropagation()}>{nl.home.checkWindguru}</a>}
                    </div>
                  )}
                </div>
              </button>
            </div>
            <div className="col-span-2 flex flex-col min-h-[300px]">
              <Link href="/nl/reizen" className="relative overflow-hidden group block h-full flex-1">
                <img src={bentoTrips.src} alt="Kite safaris en reizen" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%)" }} />
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <p className="category-label mb-1">{nl.home.beyondBonaire}</p>
                  <h3 className="font-display font-black text-white text-xl uppercase tracking-tighter leading-[0.95]">Reizen &<br />Safaris</h3>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile bento */}
          <div className="md:hidden border-2 border-foreground">
            {[
              { href: "/nl/lessen",  img: bentoLessons.src, label: nl.home.ikoCertified, title: "Leer te kiten",  h: "min-h-[280px]", alt: "Kitesurflessen Bonaire" },
              { href: "/nl/verhuur", img: bentoRentals.src, label: nl.home.premiumGear,  title: "Huur materiaal", h: "min-h-[200px]", alt: "Materiaal verhuur" },
              { href: "/nl/reizen",  img: bentoTrips.src,   label: nl.home.beyondBonaire,title: "Reizen & Safaris",h: "min-h-[180px]", alt: "Kite safaris" },
            ].map((card, i) => (
              <div key={card.href} className={i > 0 ? "border-t-2 border-foreground flex flex-col" : "flex flex-col"}>
                <Link href={card.href} className={`relative overflow-hidden group block flex-1 ${card.h}`}>
                  <img src={card.img} alt={card.alt} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-0 left-0 p-6 z-10">
                    <p className="category-label mb-1">{card.label}</p>
                    <h3 className="font-display font-black text-white text-2xl uppercase tracking-tighter">{card.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
            <div className="border-t-2 border-foreground flex flex-col">
              <button onClick={() => setWeatherOpen(true)} className="w-full min-h-[140px] flex-1 bg-primary flex items-center justify-between px-6 py-4 hover:bg-primary/80 transition-colors">
                <div className="text-left">
                  <p className="category-label mb-1">{nl.home.liveWind}</p>
                  {!wind.isLoading && !wind.error ? (
                    <p className="font-display font-black text-white text-4xl leading-none">{wind.speed}<span className="text-sm font-body font-normal text-white/70 ml-1">kts</span></p>
                  ) : (
                    <div>
                      <p className="text-white/70 text-sm font-body uppercase tracking-wider mb-1">{wind.isLoading ? nl.home.loading : "Offline"}</p>
                      {wind.error && <a href="https://www.windguru.cz/209061" target="_blank" rel="noreferrer" className="text-accent text-xs underline underline-offset-4 font-body" onClick={(e) => e.stopPropagation()}>{nl.home.checkWindguru}</a>}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Wind className={`w-7 h-7 ${wind.isLoading ? "text-white/30 animate-pulse" : "text-accent"}`} />
                  <span className="text-accent text-[10px] font-body uppercase tracking-widest">{nl.home.forecastLink}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATLANTIS BEACH ───────────────────────────────────────────── */}
      <section className="bg-primary py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-end">
            <div>
              <motion.p variants={fadeUp} className="category-label mb-6">{nl.home.whereWeRide}</motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter" style={{ fontSize: "clamp(48px, 8vw, 110px)", lineHeight: 0.95 }}>Atlantis<br />Beach</motion.h2>
            </div>
            <div className="col-divider-dark">
              <motion.p variants={fadeUp} className="text-white/80 font-body text-lg leading-relaxed mb-5">{nl.home.atlantisP1}</motion.p>
              <motion.p variants={fadeUp} className="text-white/70 font-body text-base leading-relaxed">{nl.home.atlantisP2}</motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY KBB ──────────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p className="category-label mb-4">{nl.home.whyKBB}</p>
              <h2 className="font-display font-black text-white uppercase tracking-tighter" style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.95 }}>Drie redenen waarom<br />wij anders zijn</h2>
            </div>
            <button onClick={() => setBookingOpen(true)} className="btn-cyan self-start md:self-auto flex-shrink-0">{nl.home.bookLesson2}</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            {[
              { number: "01", title: nl.home.reason01Title, desc: nl.home.reason01Desc },
              { number: "02", title: nl.home.reason02Title, desc: nl.home.reason02Desc },
              { number: "03", title: nl.home.reason03Title, desc: nl.home.reason03Desc },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }} className={`p-8 md:p-10 ${i > 0 ? "col-divider-dark-sm" : ""}`}>
                <p className="font-display font-black text-white/20 mb-4 select-none leading-none" style={{ fontSize: "clamp(64px, 8vw, 100px)" }}>{item.number}</p>
                <div className="w-10 h-[3px] bg-accent mb-5" />
                <h3 className="font-display font-black text-white uppercase tracking-tighter text-2xl leading-[0.95] mb-4">{item.title}</h3>
                <p className="text-white/70 font-body text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <p className="category-label mb-4 block">{nl.home.realReviews}</p>
            <h2 className="font-display font-black text-foreground uppercase tracking-tighter" style={{ fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 0.95 }}>Verhalen van<br />het water</h2>
          </div>
          <div className="hidden md:flex justify-center gap-6 items-center mb-16 min-h-[450px] py-4">
            {cards.map((t, idx) => {
              const isCenter = idx === 1;
              return (
                <motion.div layout key={t.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`relative flex flex-col transition-colors duration-300 ${isCenter ? "bg-white border-2 border-foreground shadow-2xl z-10 py-10 px-8 w-[400px]" : "bg-muted border border-foreground/10 py-8 px-6 opacity-60 w-[300px] scale-90"}`}>
                  <span className={`font-display font-black leading-none mb-4 select-none ${isCenter ? "text-accent text-6xl" : "text-foreground/30 text-5xl"}`}>"</span>
                  {isCenter && <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-accent fill-current" />)}</div>}
                  <p className={`font-body leading-relaxed italic flex-1 mb-8 ${isCenter ? "text-foreground text-lg" : "text-foreground/70 text-base"}`}>{t.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center font-display font-black text-sm flex-shrink-0 ${isCenter ? "bg-foreground text-background" : "bg-foreground/20 text-foreground/60"}`}>{t.name[0]}</div>
                    <div>
                      <span className={`font-display font-black text-sm uppercase tracking-tighter block ${isCenter ? "text-foreground" : "text-foreground/70"}`}>{t.name}</span>
                      <span className="text-xs text-foreground/50 font-body">{t.flag} {t.country}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="md:hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.div key={activeReview} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="bg-white border-2 border-foreground py-10 px-8">
                <span className="font-display font-black text-accent text-6xl leading-none block mb-4">"</span>
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-accent fill-current" />)}</div>
                <p className="text-foreground font-body text-lg leading-relaxed italic mb-8">{testimonials[activeReview].quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-foreground flex items-center justify-center font-display font-black text-background text-sm">{testimonials[activeReview].name[0]}</div>
                  <div>
                    <span className="font-display font-black text-sm text-foreground uppercase tracking-tighter block">{testimonials[activeReview].name}</span>
                    <span className="text-xs text-foreground/60 font-body">{testimonials[activeReview].flag} {testimonials[activeReview].country}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button onClick={prev} className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors" aria-label="Vorige review"><ChevronLeft className="w-5 h-5" /></button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveReview(i)} className={`transition-all duration-300 ${i === activeReview ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-foreground/30 hover:bg-foreground/60"}`} aria-label={`Review ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors" aria-label="Volgende review"><ChevronRight className="w-5 h-5" /></button>
          </div>
          <div className="flex justify-center mt-10">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border-2 border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors group">
              <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-accent fill-current" />)}</div>
              <span className="font-display font-black text-xs uppercase tracking-widest">{nl.home.googleReview}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div>
              <p className="category-label mb-5">{nl.home.atlantisLabel}</p>
              <h2 className="font-display font-black text-white uppercase tracking-tighter" style={{ fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 0.95 }}>Klaar om het<br />water op te gaan?</h2>
            </div>
            <div className="flex flex-col gap-4 flex-shrink-0">
              <button onClick={() => setBookingOpen(true)} className="btn-cyan text-base w-full sm:w-auto whitespace-nowrap">{nl.home.bookLessonCTA}</button>
              <Link href="/nl/verhuur" className="btn-outline-white text-base w-full sm:w-auto whitespace-nowrap text-center">{nl.home.rentEquipCTA}</Link>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} productId={BOOKING_ALL_LESSONS_ID} />
      <WeatherModal open={weatherOpen} onOpenChange={setWeatherOpen} />
    </>
  );
}
