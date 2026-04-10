"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import aboutHero      from "@/assets/About-us.jpg";
import rommelPhoto    from "@/assets/rommel-rivas.jpg";
import carlosPhoto    from "@/assets/carlos-lilue.jpg";
import instructor1    from "@/assets/instructor-1.jpg";
import instructor2    from "@/assets/instructor-2.jpg";
import instructor3    from "@/assets/instructor-3.jpg";
import instructor4    from "@/assets/instructor-4.jpg";
import communityPhoto from "@/assets/community-photo.jpg";
import beachSetup     from "@/assets/beach-setup.jpg";
import CrewPhoto      from "@/assets/crew.jpg";

const NAVY_DEEP = "hsl(211,100%,12%)";
const NAVY_MID  = "hsl(211,100%,16%)";

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function PhotoSlot({ height = 480, label = "Photo coming soon", hint, dark = true }: { height?: number; label?: string; hint?: string; dark?: boolean }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden" style={{ minHeight: height, background: dark ? NAVY_DEEP : "hsl(210,15%,96%)" }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="relative z-10 text-center px-6">
        <div className="w-12 h-12 border border-accent/30 flex items-center justify-center mx-auto mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent/50">
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        {label && <p className={`font-display font-black text-xs uppercase tracking-widest mb-1 ${dark ? "text-white/25" : "text-foreground/25"}`}>{label}</p>}
        {hint  && <p className={`font-body text-[10px] ${dark ? "text-white/20" : "text-foreground/20"}`}>{hint}</p>}
      </div>
    </div>
  );
}

const people = [
  {
    name:  "Rommel Rivas",
    role:  "Owner, The Blue Bus",
    bio:   "Kiter, Venezuelan, Bonaire local. He took the keys of the Blue Bus in 2016 and never looked back. First one on the beach, last one to leave.",
    photo: rommelPhoto.src,
    hint:  "rommel-rivas.jpg",
    dark:  true,
  },
  {
    name:  "Carlos Lilue",
    role:  "Operations",
    bio:   "The one who makes the beach happen every day. Bus, boat, tents, chairs. Carlos sets up the world so everyone else can enjoy it.",
    photo: carlosPhoto.src,
    hint:  "carlos-lilue.jpg",
    dark:  false,
  },
];

const instructors = [
  { name: "Linda",  hint: "instructor-1.jpg", photo: instructor1.src },
  { name: "Can",    hint: "instructor-2.jpg", photo: instructor2.src },
  { name: "Jaco",   hint: "instructor-3.jpg", photo: instructor3.src },
  { name: "Andre",  hint: "instructor-4.jpg", photo: instructor4.src },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex items-end justify-start overflow-hidden" style={{ minHeight: "80vh" }}>
        <img src={aboutHero.src} alt="Kiteboarding Bonaire" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,18,40,0.88) 0%, rgba(5,18,40,0.3) 60%, rgba(5,18,40,0.15) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,18,40,0.95) 0%, transparent 55%)" }} />
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 max-w-7xl w-full mx-auto pb-16 md:pb-28">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-6 block">Est. 2001, Bonaire</motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter text-[clamp(56px,12vw,160px)] leading-[0.85]">
              The<br />Blue Bus
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 font-body uppercase tracking-[0.25em] mt-8 text-[clamp(11px,1.2vw,14px)]">
              The original. Still here. Still flying.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
      </section>

      {/* ── THE SOUL ─────────────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="category-label mb-8 block">Who we are</motion.p>
            <motion.p variants={fadeUp} className="font-body text-foreground leading-relaxed mb-6 text-[clamp(20px,2.5vw,28px)]" style={{ lineHeight: 1.4 }}>
              We are kiters who happen to run a school. Not the other way around.
            </motion.p>
            <motion.p variants={fadeUp} className="text-foreground/80 font-body text-lg leading-relaxed mb-4">
              Roan Jaspers put the first kite in the air on Atlantis Beach in 2001. Nobody had done it before in the Caribbean. In 2016, Rommel Rivas took the keys of the Blue Bus. Not as a businessman taking over an opportunity, but as a rider who had been part of this community for years and couldn't imagine it going anywhere else.
            </motion.p>
            <motion.p variants={fadeUp} className="text-foreground/80 font-body text-lg leading-relaxed">
              What has never changed in 25 years is the reason people show up. The wind. The water. The feeling you get when Atlantis Beach comes into view and the kites are already in the air.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── NUMBERS ──────────────────────────────────────────────────── */}
      <section style={{ background: NAVY_MID }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { num: "2001", label: "First kite school on Bonaire" },
              { num: "25+",  label: "Years on the same beach" },
              { num: "10K+", label: "Students from around the world" },
              { num: "50+",  label: "Countries represented" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center py-8 px-4">
                <span className="font-display font-black text-white leading-none mb-2 text-[clamp(28px,4vw,52px)]">{s.num}</span>
                <span className="text-white/60 font-body text-[10px] md:text-xs uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY PHOTO ──────────────────────────────────────────── */}
      <div style={{ height: "clamp(300px, 50vw, 600px)", overflow: "hidden" }}>
        <img src={communityPhoto.src} alt="KBB Community" className="w-full h-full object-cover" />
      </div>

      {/* ── THE KBB FAMILY ───────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16">
            <motion.p variants={fadeUp} className="category-label mb-4 block">The people on the beach</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(36px,6vw,80px)] leading-[0.87]">
              The KBB Family
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">
            {people.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`flex flex-col ${i === 0 ? "border-b-2 md:border-b-0 md:border-r-2 border-foreground" : ""}`}
              >
                <div className="relative overflow-hidden" style={{ height: "clamp(260px, 32vw, 440px)" }}>
                  {person.photo
                    ? <img src={person.photo} alt={person.name} className="w-full h-full object-cover object-top" />
                    : <PhotoSlot height={9999} label={person.name} hint={person.hint} dark={person.dark} />
                  }
                </div>
                <div className="p-8 flex flex-col" style={{ background: person.dark ? NAVY_DEEP : "white" }}>
                  <p className={`category-label mb-2 ${person.dark ? "text-accent" : ""}`}>{person.role}</p>
                  <h3 className={`font-display font-black uppercase tracking-tighter mb-4 text-[clamp(22px,2.8vw,36px)] leading-[0.9] ${person.dark ? "text-white" : "text-foreground"}`}>
                    {person.name}
                  </h3>
                  <p className={`font-body text-base leading-relaxed ${person.dark ? "text-white/80" : "text-foreground/80"}`}>
                    {person.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <img src={beachSetup.src} alt="Daily beach setup at Atlantis Beach" className="w-full object-cover border-2 border-t-0 border-foreground" style={{ height: "clamp(180px, 25vw, 320px)" }} />

          <div className="border-2 border-t-0 border-foreground">
            <div className="p-8 md:p-10" style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div>
                  <p className="category-label mb-3">IKO Certified</p>
                  <h3 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(22px,3vw,44px)] leading-[0.9]">The Instructors</h3>
                </div>
                <p className="text-foreground/70 font-body text-base leading-relaxed">
                  Riders first, instructors second. They push the boat in and out of the water every session because they want you on the water as much as you do. Dutch, English, Spanish, Papiamentu. They speak your language.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {instructors.map((instructor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex flex-col"
                  style={{ borderRight: i < instructors.length - 1 ? "2px solid hsl(0,0%,7%)" : undefined }}
                >
                  <div style={{ height: "clamp(160px, 20vw, 280px)", overflow: "hidden" }}>
                    {instructor.photo
                      ? <img src={instructor.photo} alt={instructor.name} className="w-full h-full object-cover object-top" />
                      : <PhotoSlot height={9999} label="" hint={instructor.hint} dark={false} />
                    }
                  </div>
                  <div className="px-5 py-4 bg-background" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                    <p className="font-display font-black text-foreground/60 text-xs uppercase tracking-widest">{instructor.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KITEMANERA ───────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <motion.p variants={fadeUp} className="category-label mb-6 block text-accent">Part of the story</motion.p>
              <motion.p variants={fadeUp} className="text-white font-body text-lg leading-relaxed mb-5">
                In 2014 the Venezuelan Kite Mafia had an idea. Gather the whole kite community on Atlantis Beach, costumes mandatory, rules optional. Seventy people showed up. The Kitemanera was born.
              </motion.p>
              <motion.p variants={fadeUp} className="text-white/70 font-body text-base leading-relaxed mb-8">
                It wasn't an event. It was proof of what this place is when everyone shows up together. That same spirit lives in everything we do here, every day.
              </motion.p>
              <motion.p variants={fadeUp} className="text-accent font-display font-black text-xs uppercase tracking-widest">
                Kitemanera is coming back. Atlantis Beach, Bonaire.
              </motion.p>
            </div>
            <motion.div variants={fadeUp} className="border-2 border-white/20 overflow-hidden" style={{ height: "clamp(220px, 28vw, 380px)" }}>
              <img src={CrewPhoto.src} alt="Kitemanera community event at Atlantis Beach" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="font-display font-black text-white uppercase tracking-tighter mb-4 text-[clamp(40px,7vw,96px)] leading-[0.88]" style={{ letterSpacing: "-0.01em" }}>
            Find Us<br />at the Beach
          </h2>
          <p className="text-white/70 font-body mb-10 uppercase tracking-[0.2em] text-sm">
            Atlantis Beach, Bonaire. Every day from 9am.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lessons" className="btn-cyan text-base w-full sm:w-auto">Book a Lesson</Link>
            <a href="https://wa.me/5997015483?text=Hi!%20I'd%20like%20to%20know%20more%20about%20Kiteboarding%20Bonaire" target="_blank" rel="noopener noreferrer" className="btn-outline-white text-base w-full sm:w-auto">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
