"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import aboutHero from "@/assets/About-us.jpg";
import rommelPhoto from "@/assets/rommel-rivas.jpg";
import carlosPhoto from "@/assets/carlos-lilue.jpg";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";
import instructor4 from "@/assets/instructor-4.jpg";
import communityPhoto from "@/assets/community-photo.jpg";
import beachSetup from "@/assets/beach-setup.jpg";
const OCEAN = "hsl(213,85%,38%)";
const OCEAN_DEEP = "hsl(213,85%,22%)";
const CYAN = "hsl(186,100%,42%)";
const SAND = "hsl(42,35%,97%)";
const INK = "hsl(0,0%,10%)";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const fadeInOnly = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } };
const people = [
  { name: "Rommel Rivas", role: "Owner, The Blue Bus", bio: "Kiter, Venezuelan, Bonaire local. He took the keys of the Blue Bus in 2016 and never looked back. First one on the beach, last one to leave.", photo: rommelPhoto.src, dark: true },
  { name: "Carlos Lilue", role: "Operations", bio: "The one who makes the beach happen every day. Bus, boat, tents, chairs. Carlos sets up the world so everyone else can enjoy it.", photo: carlosPhoto.src, dark: false },
];
const instructors = [
  { name: "Linda", photo: instructor1.src },
  { name: "Can", photo: instructor2.src },
  { name: "Jaco", photo: instructor3.src },
  { name: "Andre", photo: instructor4.src },
];
export default function AboutPage() {
  return (
    <div style={{ background: SAND }} className="min-h-screen">
      <section className="relative flex items-end justify-start overflow-hidden" style={{ minHeight: "70vh" }}>
        <img src={aboutHero.src} alt="Kiteboarding Bonaire" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 25%, rgba(7,17,31,0.65) 55%, rgba(7,17,31,0.93) 80%, rgba(7,17,31,1) 100%)" }} />
        <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-16 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-6" style={{ color: CYAN }}>Est. 2001, Bonaire</motion.p>
            <motion.h1 variants={fadeUp} className="font-black text-white uppercase tracking-tighter mb-6 text-[clamp(52px,9vw,120px)] leading-[0.88]">The<br />Blue Bus</motion.h1>
            <motion.p variants={fadeUp} className="font-body uppercase tracking-widest text-[12px] mb-10 max-w-[500px]" style={{ color: "rgba(255,255,255,0.75)" }}>The original. Still here. Still flying.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/lessons" className="font-display font-black uppercase tracking-widest px-8 py-4 text-[11px] rounded-none" style={{ background: CYAN, color: "#fff", border: "none" }}>Book a Lesson</Link>
              <a href="https://wa.me/5997015483" target="_blank" rel="noopener noreferrer" className="font-display font-black uppercase tracking-widest px-8 py-4 text-[11px] rounded-none" style={{ background: "transparent", color: "#fff", border: `2px solid ${CYAN}` }}>WhatsApp Us</a>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 md:py-28" style={{ background: OCEAN_DEEP }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-6" style={{ color: CYAN }}>Our Why</motion.p>
            <motion.h2 variants={fadeUp} className="font-black text-white uppercase tracking-tighter mb-12 text-[clamp(32px,4.5vw,60px)] leading-[0.88]">Kiteboarding is not<br />our job. It's our life.</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              <motion.div variants={fadeUp}>
                <p className="font-body text-[15px] leading-[1.7] text-white/85 mb-6">We live for the ocean, the wind, nature, and the freedom that comes from being on the water. Kiteboarding is a lifestyle. It's a call that transforms people, some come for the adventure in their holiday, others answer the call of their soul.</p>
                <p className="font-body text-[15px] leading-[1.7] text-white/75">We've seen people change for the better through the elements, through the freedom, through the sport. It touches every part of your life. That transformation is what we're part of, and that's why we do this.</p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <p className="font-body text-[15px] leading-[1.7] text-white/85 mb-6">KBB isn't the bus or the infrastructure. KBB is Atlantis. KBB is Bonaire. KBB is the locals who've been building this spot for years, and the visitors who fall in love with it and become part of the family.</p>
                <p className="font-body text-[15px] leading-[1.7] text-white/75">We believe in bringing joy, happiness, and the freedom of the water to as many people as we can. We grow the sport, we grow the community, we grow the KBB family. We're all in this together, since the beginning.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 md:py-28" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-16">
              <motion.div variants={fadeUp}>
                <p className="font-display font-black uppercase tracking-widest text-[12px] mb-6" style={{ color: CYAN }}>Our History</p>
                <h2 className="font-black uppercase tracking-tighter text-[clamp(32px,4.5vw,60px)] leading-[0.88]" style={{ color: INK }}>25 Years on<br />the Same Beach</h2>
              </motion.div>
              <motion.div variants={fadeUp}>
                <p className="font-body text-[15px] leading-[1.7] text-[rgba(0,0,0,0.75)] mb-6">Roan Jaspers put the first kite in the air on Atlantis Beach in 2001. Nobody had done it before in the Caribbean. In 2016, Rommel took the keys. Not as a businessman, but as a rider who had been part of this community and couldn't imagine it going anywhere else.</p>
                <p className="font-body text-[15px] leading-[1.7] text-[rgba(0,0,0,0.7)]">What hasn't changed in 25 years is why people show up. The wind. The water. The feeling when Atlantis Beach comes into view and the kites are already in the air.</p>
              </motion.div>
            </div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t-2" style={{ borderColor: INK }}>
              {[{ num: "2001", label: "First kite school on Bonaire" }, { num: "25+", label: "Years on the same beach" }, { num: "10K+", label: "Students worldwide" }, { num: "50+", label: "Countries represented" }].map((s) => (
                <div key={s.num}>
                  <p className="font-display font-black leading-none mb-3" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: INK }}>{s.num}</p>
                  <p className="font-display font-black text-[11px] uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.5)" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInOnly} className="overflow-hidden" style={{ height: "clamp(280px, 45vw, 560px)" }}>
        <img src={communityPhoto.src} alt="KBB Community at Atlantis Beach" className="w-full h-full object-cover" />
      </motion.div>
      <section className="py-20 md:py-28" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-16">
              <p className="font-display font-black uppercase tracking-widest text-[12px] mb-6" style={{ color: CYAN }}>The people on the beach</p>
              <h2 className="font-black uppercase tracking-tighter text-[clamp(32px,4.5vw,60px)] leading-[0.88]" style={{ color: INK }}>The KBB Family</h2>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {people.map((person) => (
                <div key={person.name} className="flex flex-col overflow-hidden rounded-[12px]" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
                  <div className="relative overflow-hidden" style={{ height: "clamp(260px, 30vw, 420px)" }}>
                    <img src={person.photo} alt={person.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-8 md:p-10" style={{ background: person.dark ? OCEAN_DEEP : "#fff" }}>
                    <p className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>{person.role}</p>
                    <h3 className="font-black uppercase tracking-tighter mb-4 text-[clamp(24px,3vw,36px)] leading-[0.88]" style={{ color: person.dark ? "#fff" : INK }}>{person.name}</h3>
                    <p className="font-body text-[15px] leading-[1.6]" style={{ color: person.dark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.75)" }}>{person.bio}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="overflow-hidden rounded-[12px] mb-16" style={{ height: "clamp(200px, 25vw, 380px)", boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
              <img src={beachSetup.src} alt="Daily beach setup at Atlantis Beach" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start mb-12">
                <div className="md:col-span-5">
                  <p className="font-display font-black uppercase tracking-widest text-[12px] mb-6" style={{ color: CYAN }}>IKO Certified</p>
                  <h3 className="font-black uppercase tracking-tighter text-[clamp(28px,3.5vw,48px)] leading-[0.88]" style={{ color: INK }}>The Instructors</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-body text-[15px] leading-[1.7] text-[rgba(0,0,0,0.75)]">Riders first, instructors second. They push the boat in and out of the water every session because they want you on the water as much as you do. Dutch, English, Spanish, Papiamentu. They speak your language.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {instructors.map((instructor, i) => (
                  <div key={i} className="flex flex-col overflow-hidden rounded-[12px]" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
                    <div style={{ height: "clamp(160px, 18vw, 260px)", overflow: "hidden" }}>
                      <img src={instructor.photo} alt={instructor.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="px-4 py-3 bg-white">
                      <p className="font-display font-black text-[11px] uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.65)" }}>{instructor.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 md:py-28 text-center" style={{ background: OCEAN }}>
        <div className="max-w-3xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-black text-white uppercase tracking-tighter mb-6 text-[clamp(52px,9vw,120px)] leading-[0.88]">Find Us<br />at the Beach</motion.h2>
            <motion.p variants={fadeUp} className="text-white/75 font-body text-[15px] uppercase tracking-widest mb-10">Atlantis Beach, Bonaire. Every day from 9am.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lessons" className="font-display font-black uppercase tracking-widest px-8 py-4 text-[11px] rounded-none" style={{ background: CYAN, color: "#fff", border: "none" }}>Book a Lesson</Link>
              <a href="https://wa.me/5997015483?text=Hi!%20I'd%20like%20to%20know%20more%20about%20Kiteboarding%20Bonaire" target="_blank" rel="noopener noreferrer" className="font-display font-black uppercase tracking-widest px-8 py-4 text-[11px] rounded-none" style={{ background: "transparent", color: "#fff", border: `2px solid ${CYAN}` }}>WhatsApp Us</a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
