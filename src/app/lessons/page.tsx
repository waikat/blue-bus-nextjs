"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Plus, Minus } from "lucide-react";
import BookingModal from "@/components/BookingModal";

import lessonsHero  from "@/assets/lessons-hero.jpg";
import lessonAction from "@/assets/lesson-action.jpg";
import lessonBeach  from "@/assets/lesson-beach.jpg";
import lessonSmile  from "@/assets/lesson-smile.jpg";
import photoInstructionWater from "@/assets/photo-instruction-water.jpg";
import photoBoatSupport from "@/assets/photo-boat-support.jpg";
import instructor1  from "@/assets/instructor-1.jpg";
import instructor2  from "@/assets/instructor-2.jpg";
import instructor3  from "@/assets/instructor-3.jpg";
import instructor4  from "@/assets/instructor-4.jpg";
import ikoLogo      from "@/assets/iko-center.png";

// ─── DESIGN SYSTEM ────────────────────────────────────────────────────────────
// Unified across home, lessons, rentals, trips, about, forecast, info
const OCEAN       = "hsl(213,85%,38%)";
const OCEAN_DEEP  = "hsl(213,85%,22%)";
const CYAN        = "hsl(186,100%,42%)";
const SAND        = "hsl(42,35%,97%)";
const INK         = "hsl(0,0%,10%)";

// ─── ANIMATIONS ───────────────────────────────────────────────────────────────
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

// ─── DATA ─────────────────────────────────────────────────────────────────────
const BEGINNER_ID = "g370000000b0000000c022b3d";

type Pkg = {
  name: string; sessions: string; price: string;
  perPerson?: string; badge?: string; outcome: string;
  detail: string; vikingId: string; featured?: boolean;
  photo: string; photoPosition?: string;
};

const PACKAGES: Record<string, Pkg[]> = {
  "beginner-solo": [
    { name: "First Lesson", sessions: "1 session · 3 hours", price: "\$290", outcome: "IKO Level 1", vikingId: "37000000040000005a124865", detail: "Theory, safety, and your first real time flying a kite on the beach. Day one looks exactly like this.", photo: lessonBeach.src, photoPosition: "object-top" },
    { name: "Block of 3",   sessions: "1×3h + 2×2h",        price: "\$670", outcome: "IKO Level 2",            badge: "Most Popular", featured: true, vikingId: "370000001f000000c4c250e2", detail: "Waterstart. First rides. The moment you actually feel it click.", photo: photoInstructionWater.src, photoPosition: "object-center" },
    { name: "Block of 5",   sessions: "1×3h + 4×2h",        price: "\$995", outcome: "Toward IKO Level 3", vikingId: "3700000029000000b9651037", detail: "Board starts, upwind, speed control. Ride independently anywhere in the world.", photo: photoBoatSupport.src, photoPosition: "object-center" },
  ],
  "beginner-duo": [
    { name: "First Lesson", sessions: "1 session · 3 hours", price: "\$360",   perPerson: "\$180 per person", outcome: "IKO Level 1", vikingId: "37000000050000003f75f4dd", detail: "Theory, safety, first flights. Learn it together. You rest while your partner flies.", photo: lessonBeach.src, photoPosition: "object-top" },
    { name: "Block of 3",   sessions: "1×3h + 2×2h",        price: "\$950",   perPerson: "\$475 per person", outcome: "IKO Level 2",   badge: "Best Value", featured: true, vikingId: "3700000028000000dc02ac8f", detail: "Waterstart by session three. Shared kite, shared stoke, same result.", photo: photoInstructionWater.src, photoPosition: "object-center" },
    { name: "Block of 5",   sessions: "1×3h + 4×2h",        price: "\$1,540", perPerson: "\$770 per person", outcome: "Toward IKO Level 3", vikingId: "3700000020000000332a184a", detail: "Zero to riding for both of you. Board starts, upwind, independent.", photo: photoBoatSupport.src, photoPosition: "object-center" },
  ],
  "intermediate-solo": [
    { name: "Single Session", sessions: "1 session · 2 hours", price: "\$225",   outcome: "Goal-based",    vikingId: "3700000007000000b4bdfd77", detail: "Two hours on what you actually want to fix. Jumps, transitions, upwind. You set it.", photo: lessonAction.src, photoPosition: "object-center" },
    { name: "Block of 3",     sessions: "3 × 2 hours",         price: "\$675",   outcome: "IKO Level 4 to 5", badge: "Most Popular", featured: true, vikingId: "3700000002000000864d2340", detail: "Goals set before session one. Progress reviewed after each. Real coaching, real results.", photo: photoInstructionWater.src, photoPosition: "object-center" },
    { name: "Block of 5",     sessions: "5 × 2 hours",         price: "\$1,125", outcome: "IKO Level 5",   vikingId: "3700000007000000b4bdfd77", detail: "Five sessions. Enough to genuinely transform your riding in Bonaire's trade winds.", photo: photoBoatSupport.src, photoPosition: "object-center" },
  ],
  "intermediate-duo": [
    { name: "Single Session", sessions: "1 session · 3 hours", price: "\$295",   perPerson: "\$148 per person", outcome: "Goal-based",    vikingId: "37000000050000003f75f4dd", detail: "Three hours for both of you. Best when you're at a similar level.", photo: lessonBeach.src, photoPosition: "object-center" },
    { name: "Block of 3",     sessions: "3 × 2 hours",         price: "\$885",   perPerson: "\$443 per person", outcome: "IKO Level 4 to 5", badge: "Best Value", featured: true, vikingId: "g370000000f0000005b9549b2", detail: "You learn as much watching your partner as you do on the kite.", photo: photoInstructionWater.src, photoPosition: "object-center" },
    { name: "Block of 5",     sessions: "5 × 2 hours",         price: "\$1,475", perPerson: "\$738 per person", outcome: "IKO Level 5",   vikingId: "370000001000000092d233ba", detail: "Five sessions. Real transformation for two, not just marginal gains.", photo: photoBoatSupport.src, photoPosition: "object-center" },
  ],
};

const SERVICES = [
  { tag: "For riders who already ride", title: "Coaching session",    desc: "Two hours on what you actually want to fix. Technique, jumps, transitions. Your call.", price: "\$185", duration: "2 hrs", vikingId: "g370000000a00000069659785" },
  { tag: "Unique to Bonaire",           title: "Beach support",       desc: "You ride. We launch and land. Bring your own gear, bring your own skills.", price: "\$130", duration: "2 hrs", vikingId: "g370000000a00000069659785" },
  { tag: "IKO Affiliated Center",       title: "IKO certification",   desc: "Already riding without an official card? We evaluate and certify you at the right level. Level 3 required to rent gear worldwide.", price: "\$200", duration: "1.5 hrs", vikingId: "g370000000a00000069659785" },
];

const INSTRUCTORS = [
  { photo: instructor1.src, name: "Linda",  tag: "IKO Certified Instructor" },
  { photo: instructor2.src, name: "Can",    tag: "IKO Certified Instructor" },
  { photo: instructor3.src, name: "Jaco",   tag: "IKO Certified Instructor" },
  { photo: instructor4.src, name: "Andre",  tag: "IKO Certified Instructor" },
];

const INCLUDED = [
  { title: "IKO certified instructor", sub: "Every session, no exceptions." },
  { title: "All equipment",            sub: "Kite, board, harness, helmet, vest." },
  { title: "Boat support",             sub: "In the water throughout every session." },
  { title: "Safety briefing",          sub: "Before you touch the water, every time." },
  { title: "IKO certification card",   sub: "When you complete your level." },
];

const FAQS = [
  { q: "Do I need to know how to swim?",             a: "Yes. Open water above your head. Beyond that, nothing else required." },
  { q: "Why is the first beginner session 3 hours?", a: "Theory and safety take real time. A rushed foundation creates bad habits on the water. Three hours means you arrive at session two ready to move, not catching up." },
  { q: "What if there's no wind?",                   a: "We reschedule. No charge. Bonaire has 300+ wind days a year. This rarely happens, but when it does, we sort it." },
  { q: "How many sessions to ride independently?",   a: "IKO estimates around 14 hours from scratch. Our Block of 5 covers that for most students. Every session builds something real.", link: { label: "See IKO progression levels", href: "https://www.ikointl.com/courses" } },
  { q: "Minimum age?",                               a: "Around 10. Younger kids need to be strong, confident swimmers. Reach out and we'll talk through it, every kid is different." },
  { q: "What's actually included?",                  a: "Everything. Your instructor brings the kite, board, harness, helmet, vest. We have the boat support covered. The only thing you buy separately is the STINAPA Bonaire National Park tag, which supports the marine reserve you're about to ride in." },
  { q: "What languages do you speak?",               a: "English, French, Spanish, Dutch and Papiamentu between the team. One of them speaks yours." },
  { q: "Can I reach IKO Level 5?",                   a: "Yes. All our intermediate sessions can be built toward Level 5 advancement. Just let us know what you're working toward when you book, and we'll structure it for that." },
  { q: "Cancellation policy?",                       a: "Free cancellation up to 48 hours before your lesson.", link: { label: "View full policy", href: "/info" } },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function FaqRow({ q, a, link, light = false }: { q: string; a: string; link?: { label: string; href: string }; light?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} className="cursor-pointer group py-5"
      style={{ borderBottom: `1px solid ${light ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}` }}>
      <div className="flex items-start justify-between gap-8">
        <p className="font-body transition-colors"
          style={{ fontSize: 15, lineHeight: 1.6, color: light ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.75)" }}>
          {q}
        </p>
        <div className={`w-7 h-7 flex-shrink-0 flex items-center justify-center border transition-colors mt-0.5 ${open ? "border-accent bg-accent" : light ? "border-white/20 group-hover:border-accent" : "border-black/20 group-hover:border-accent"}`}>
          {open ? <Minus className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5" style={{ color: light ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }} />}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pt-3 pb-1 font-body leading-relaxed pr-10"
              style={{ fontSize: 14, color: light ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.50)" }}>
              {a}{link && <a href={link.href} className="text-accent underline ml-1 hover:text-accent/70" onClick={e => e.stopPropagation()}>{link.label}</a>}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PkgCard({ pkg, onBook }: { pkg: Pkg; onBook: () => void }) {
  const f = !!pkg.featured;
  return (
    <motion.div variants={fadeIn} className="relative flex flex-col overflow-hidden"
      style={{
        background:   "#fff",
        borderRadius: 12,
        boxShadow:    f
          ? "0 4px 16px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(0,0,0,0.05)"
          : "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)",
      }}>

      {/* Label bar: OCEAN blue, small text, 11px */}
      <div className="flex items-center justify-between px-5 py-3"
        style={{ background: f ? CYAN : OCEAN }}>
        <span className="font-display font-black uppercase tracking-widest text-white"
          style={{ fontSize: 11 }}>{pkg.outcome}</span>
        {pkg.badge && (
          <span className="font-display font-black uppercase tracking-widest px-2.5 py-1 text-white"
            style={{ fontSize: 10, background: "rgba(255,255,255,0.22)" }}>{pkg.badge}</span>
        )}
      </div>

      {/* Photo: 240px height */}
      <div className="relative overflow-hidden" style={{ height: 240 }}>
        <img src={pkg.photo} alt={pkg.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${pkg.photoPosition ?? "object-center"}`} />
      </div>

      {/* Body: white */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="font-display font-black uppercase tracking-tight"
            style={{ fontSize: 15, color: INK }}>{pkg.name}</p>
          <p className="font-body flex-shrink-0"
            style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", marginTop: 2 }}>{pkg.sessions}</p>
        </div>

        {/* Price — Subheading scale clamp(28px,3.8vw,48px) */}
        <span className="font-display font-black leading-none mb-1"
          style={{ fontSize: "clamp(28px,3.8vw,48px)", letterSpacing: "-0.03em", color: INK }}>
          {pkg.price}
        </span>
        {pkg.perPerson && (
          <p className="font-body mb-3" style={{ fontSize: 13, color: CYAN, fontWeight: 700 }}>
            {pkg.perPerson}
          </p>
        )}

        <p className="font-body leading-relaxed flex-1 mb-5"
          style={{ fontSize: 14, color: "rgba(0,0,0,0.72)", lineHeight: 1.6 }}>
          {pkg.detail}
        </p>

        {/* CTA */}
        <button onClick={onBook}
          className="w-full font-display font-black uppercase tracking-widest py-4 transition-all"
          style={{
            fontSize:   11,
            background: f ? CYAN : OCEAN,
            color:      "#fff",
            border:     "none",
            borderRadius: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.opacity = "0.88";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}>
          Book this package
        </button>
      </div>
    </motion.div>
  );
}

function ToggleSwitch({
  leftLabel, rightLabel,
  leftSub,   rightSub,
  value,     onChange,
}: {
  leftLabel: string; rightLabel: string;
  leftSub?:  string; rightSub?:  string;
  value:     boolean;
  onChange:  (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Left label */}
      <button onClick={() => onChange(false)}
        className="text-right transition-all duration-200"
        style={{ minWidth: 100 }}>
        <span className="font-display font-black uppercase tracking-widest block transition-colors duration-200"
          style={{ fontSize: 12, color: !value ? INK : "rgba(0,0,0,0.35)" }}>
          {leftLabel}
        </span>
        {leftSub && (
          <span className="font-body block mt-0.5 transition-colors duration-200"
            style={{ fontSize: 12, color: !value ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.28)" }}>
            {leftSub}
          </span>
        )}
      </button>

      {/* Toggle track — smaller, tighter */}
      <button
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className="flex-shrink-0 relative transition-colors duration-300"
        style={{
          width:        50,
          height:       28,
          borderRadius: 4,
          background:   value ? CYAN : OCEAN,
          border:       "none",
          cursor:       "pointer",
          outline:      "none",
        }}>
        {/* Thumb */}
        <div className="absolute"
          style={{
            top:          3,
            left:         value ? 26 : 3,
            width:        22,
            height:       22,
            borderRadius: 2,
            background:   "#fff",
            boxShadow:    "0 2px 6px rgba(0,0,0,0.25)",
            transition:   "left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }} />
      </button>

      {/* Right label */}
      <button onClick={() => onChange(true)}
        className="text-left transition-all duration-200"
        style={{ minWidth: 100 }}>
        <span className="font-display font-black uppercase tracking-widest block transition-colors duration-200"
          style={{ fontSize: 12, color: value ? INK : "rgba(0,0,0,0.35)" }}>
          {rightLabel}
        </span>
        {rightSub && (
          <span className="font-body block mt-0.5 transition-colors duration-200"
            style={{ fontSize: 12, color: value ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.28)" }}>
            {rightSub}
          </span>
        )}
      </button>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LessonsPage() {
  const [level,     setLevel]     = useState<"beginner" | "intermediate">("beginner");
  const [format,    setFormat]    = useState<"solo" | "duo">("solo");
  const [bookingId, setBookingId] = useState<string | null>(null);

  const pkgKey   = `${level}-${format}` as keyof typeof PACKAGES;
  const packages = PACKAGES[pkgKey];

  function scrollToPackages() {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={{ background: SAND }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex items-end" style={{ minHeight: "100vh" }}>
        <img src={lessonsHero.src} alt="Kitesurfing lessons Bonaire"
          className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.45) 55%, hsla(213,85%,12%,0.80) 78%, hsla(213,85%,22%,0.95) 100%)" }} />
        <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 pb-14 md:pb-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeIn} className="category-label mb-6" style={{ color: CYAN, fontSize: 12 }}>
              Bonaire's original kite school · Since 2001
            </motion.p>
            <motion.div variants={fadeIn} style={{ overflow: "hidden", marginRight: "-2rem" }}>
              <h1 className="font-display font-black text-white uppercase"
                style={{ fontSize: "clamp(52px,9vw,120px)", lineHeight: 0.84, letterSpacing: "-0.03em" }}>
                Kitesurf<br />Lessons
              </h1>
            </motion.div>
            <motion.p variants={fadeIn} className="font-body mt-5 mb-10"
              style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", letterSpacing: "0.02em" }}>
              The same instructors. The same beach. The real Caribbean trade winds.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <button onClick={() => { setLevel("beginner"); scrollToPackages(); }} 
                className="font-display font-black uppercase tracking-widest px-6 py-4 transition-all"
                style={{ fontSize: 11, background: CYAN, color: "#fff", border: "none", borderRadius: 0 }}>
                I'm a beginner
              </button>
              <button onClick={() => { setLevel("intermediate"); scrollToPackages(); }}
                className="font-display font-black uppercase tracking-widest px-6 py-4 transition-all"
                style={{ fontSize: 11, background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.40)", borderRadius: 0 }}>
                I already ride
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATEMENT + STATS (UNIFIED) ───────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, " + OCEAN_DEEP + " 0%, #071e38 60%, #0a2848 100%)" }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="px-8 sm:px-14 lg:px-20 py-12 md:py-16">
          
          {/* Statement — centered, clear hierarchy */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <h2 className="font-display font-black text-white uppercase"
              style={{ fontSize: "clamp(32px,4.5vw,60px)", lineHeight: 0.88, letterSpacing: "-0.03em" }}>
              Most people arrive scared.
            </h2>
            <h2 className="font-display font-black uppercase mt-2"
              style={{ fontSize: "clamp(32px,4.5vw,60px)", lineHeight: 0.88, letterSpacing: "-0.03em", color: CYAN }}>
              Every single one leaves hooked.
            </h2>
          </div>

          {/* Stats Grid — balanced, clean */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            {[
              { num: "300+",  label: "Wind days a year" },
              { num: "15 to 26",  label: "Steady trade winds" },
              { num: "27°C",  label: "Year round water" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn}
                className="flex flex-col items-center">
                <span className="font-display font-black text-white block"
                  style={{ fontSize: "clamp(32px,3.5vw,56px)", lineHeight: 0.85, letterSpacing: "-0.04em" }}>
                  {stat.num}
                </span>
                <p className="font-display font-black uppercase tracking-widest mt-2"
                  style={{ fontSize: 9, color: "rgba(255,255,255,0.55)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>



      {/* ── TWO PATHS ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 0, background: OCEAN_DEEP }}>
        {/* Beginner */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative overflow-hidden flex flex-col justify-end cursor-pointer group"
          style={{ minHeight: "clamp(480px,58vw,720px)" }}
          onClick={() => { setLevel("beginner"); scrollToPackages(); }}>
          <img src={lessonBeach.src} alt="Beginner kitesurf lesson Bonaire"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.68) 40%, rgba(0,0,0,0.18) 75%, rgba(0,0,0,0) 100%)" }} />
          <div className="relative z-10 p-8 md:p-12">
            <p className="category-label mb-4" style={{ color: CYAN, fontSize: 12 }}>Never done it before?</p>
            <h2 className="font-display font-black text-white uppercase"
              style={{ fontSize: "clamp(28px,3.8vw,48px)", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              Day one:<br />kite in the air.<br />Most people<br />don't expect that.
            </h2>
            <p className="font-body mt-4 mb-6"
              style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
              Your first session is 3 hours of theory, safety, and real time with a kite. By session three, most students hit their first waterstart.
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="font-display font-black text-white"
                style={{ fontSize: "clamp(28px,3.2vw,48px)", letterSpacing: "-0.03em" }}>From \$290</span>
              <span className="font-display font-black text-white uppercase tracking-widest py-3 px-6"
                style={{ fontSize: 11, background: CYAN, borderRadius: 0 }}>Beginner packages</span>
            </div>
          </div>
        </motion.div>

        {/* Intermediate */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          className="relative overflow-hidden flex flex-col justify-end cursor-pointer group"
          style={{ minHeight: "clamp(480px,58vw,720px)" }}
          onClick={() => { setLevel("intermediate"); scrollToPackages(); }}>
          <img src={lessonAction.src} alt="Intermediate kitesurfing Bonaire"
            className="absolute inset-0 w-full h-full object-cover object-bottom transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.68) 40%, rgba(0,0,0,0.18) 75%, rgba(0,0,0,0) 100%)" }} />
          <div className="relative z-10 p-8 md:p-12">
            <p className="category-label mb-4" style={{ color: CYAN, fontSize: 12 }}>Already riding?</p>
            <h2 className="font-display font-black text-white uppercase"
              style={{ fontSize: "clamp(28px,3.8vw,48px)", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              Bonaire's trade winds<br />will do things to your<br />riding that flat water<br />never could.
            </h2>
            <p className="font-body mt-4 mb-6"
              style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
              Flat water, 15 to 26 knots, steady east trade winds. Two hours with one of our instructors and you leave with something real.
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="font-display font-black text-white"
                style={{ fontSize: "clamp(28px,3.2vw,48px)", letterSpacing: "-0.03em" }}>From \$225</span>
              <span className="font-display font-black text-white uppercase tracking-widest py-3 px-6"
                style={{ fontSize: 11, background: "transparent", border: "1.5px solid rgba(255,255,255,0.40)", borderRadius: 0 }}>
                Intermediate packages
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── STUDENT SMILE PHOTO ─────────────────────────────────────────── */}
      <div style={{ background: SAND, overflow: "hidden" }}>
        <img
          src={lessonSmile.src}
          alt="Student and instructor on the KBB boat after a lesson"
          className="w-full object-cover block"
          style={{ height: "clamp(380px,50vw,660px)", objectPosition: "center 35%" }}
        />
      </div>

      {/* ── PACKAGES SECTION ──────────────────────────────────────────────
          Redesigned: smaller toggle, cards immediately visible, unified scale
      ──────────────────────────────────────────────────────────────────── */}
      <section id="packages" style={{ background: SAND, position: "relative", overflow: "hidden" }} className="py-20 md:py-28">

        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>

            {/* Header — centered */}
            <motion.div variants={fadeIn} className="text-center mb-8 relative">
              <div className="relative z-10 py-6">
                <p className="category-label mb-3" style={{ fontSize: 12, color: CYAN }}>Choose your package</p>
                <h2 className="font-display font-black uppercase"
                  style={{ fontSize: "clamp(32px,4.5vw,60px)", lineHeight: 0.89, letterSpacing: "-0.02em", color: INK }}>
                  Flexible sessions.<br />Real progression.
                </h2>
              </div>
            </motion.div>

            {/* Toggles — inside card for differentiation */}
            <motion.div variants={fadeIn} className="mb-8 flex justify-center">
              <div className="inline-flex flex-col gap-4 px-8 py-6"
                style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)", borderRadius: 12 }}>
                
                <div className="flex gap-12 justify-center">
                  {/* Level toggle */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-body"
                      style={{ fontSize: 11, color: "rgba(0,0,0,0.55)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      Your level
                    </p>
                    <ToggleSwitch
                      leftLabel="Beginner"
                      rightLabel="Intermediate"
                      value={level === "intermediate"}
                      onChange={v => setLevel(v ? "intermediate" : "beginner")}
                    />
                  </div>

                  {/* Format toggle */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-body"
                      style={{ fontSize: 11, color: "rgba(0,0,0,0.55)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      Solo or duo
                    </p>
                    <ToggleSwitch
                      leftLabel="Solo"
                      rightLabel="Duo"
                      value={format === "duo"}
                      onChange={v => setFormat(v ? "duo" : "solo")}
                    />
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Cards — IMMEDIATELY VISIBLE after toggle */}
            <AnimatePresence mode="wait">
              <motion.div key={pkgKey}
                initial="hidden" animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={stagger}>
                {/* Desktop: 3-col grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-5 items-stretch">
                  {packages.map((pkg, i) => (
                    <PkgCard key={i} pkg={pkg} onBook={() => setBookingId(pkg.vikingId)} />
                  ))}
                </div>
                {/* Mobile: horizontal scroll */}
                <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-8 px-8 hide-scrollbar">
                  {packages.map((pkg, i) => (
                    <div key={i} className="flex-shrink-0 snap-center" style={{ width: "85vw" }}>
                      <PkgCard pkg={pkg} onBook={() => setBookingId(pkg.vikingId)} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.p variants={fadeIn} className="font-body mt-8 text-center"
              style={{ fontSize: 13, color: "rgba(0,0,0,0.60)" }}>
              {level === "beginner"
                ? <><>IKO estimates ~14 hours to reach independent rider level. </><a href="https://www.ikointl.com/courses" target="_blank" rel="noopener noreferrer" className="text-accent underline">See IKO levels</a></>
                : "Single sessions also qualify for IKO Level 5 advancement. Tell us before your session."}
            </motion.p>

            {/* IKO — moved to bottom */}
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-2 mt-6">
              <img src={ikoLogo.src} alt="IKO Kite Center" className="h-6 w-auto" style={{ opacity: 0.55 }} />
              <a href="https://www.ikointl.com/" target="_blank" rel="noopener noreferrer"
                className="font-body text-accent underline hover:text-accent/70" style={{ fontSize: 13 }}>
                What is IKO?
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ────────────────────────────────────────────── */}
      <section style={{ background: OCEAN_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 mb-16 md:mb-20">
              <motion.div variants={fadeIn} className="md:col-span-5 md:pr-16">
                <p className="category-label mb-5" style={{ color: CYAN, fontSize: 12 }}>Every lesson includes</p>
                <h2 className="font-display font-black text-white uppercase"
                  style={{ fontSize: "clamp(32px,4.5vw,60px)", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
                  We bring<br />everything.<br />You show up.
                </h2>
              </motion.div>

              <motion.div variants={fadeIn} className="md:col-span-7 mt-10 md:mt-0 flex flex-col gap-0">
                {INCLUDED.map((item, i) => (
                  <div key={i} className="flex items-start gap-5 py-4"
                    style={{ borderTop: i === 0 ? "1px solid rgba(255,255,255,0.10)" : undefined, borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
                    <div>
                      <p className="font-display font-black text-white uppercase tracking-tight"
                        style={{ fontSize: 14 }}>{item.title}</p>
                      <p className="font-body mt-1"
                        style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{item.sub}</p>
                    </div>
                  </div>
                ))}

                <p className="font-body mt-6"
                  style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                  Between our instructors we speak <strong className="text-white font-medium">English, Spanish, Dutch and Papiamentu</strong>. One of them speaks yours.
                </p>
                <p className="font-body mt-3" style={{ fontSize: 13, color: "rgba(255,255,255,0.60)" }}>
                  Only extra: <a href="https://stinapa.bonairenaturefee.org/" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/70">STINAPA Bonaire National Park tag</a>{" "}purchased separately before your session.
                </p>
              </motion.div>
            </div>

            {/* Plus, on the house */}
            <motion.div variants={fadeIn}>
              <p className="category-label mb-8 block text-center" style={{ color: "rgba(255,255,255,0.60)", fontSize: 12 }}>
                Plus, on the house
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 1 }}>
                <div className="flex flex-col justify-between p-10 md:p-12"
                  style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div>
                    <p className="font-display font-black text-white uppercase"
                      style={{ fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
                      Free WiFi
                    </p>
                    <p className="font-body mt-4"
                      style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                      Strong signal across the whole beach. Tag us when you ride at @kiteboardingbonaire.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-10 md:p-12"
                  style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div>
                    <p className="font-display font-black text-white uppercase"
                      style={{ fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
                      Chill Area
                    </p>
                    <p className="font-body mt-4"
                      style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                      Hammocks, shade sails, painted picnic tables right behind the Blue Bus. Students, locals, the whole kite community.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section style={{ background: SAND }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeIn} className="mb-12">
              <p className="category-label mb-4" style={{ fontSize: 12, color: CYAN }}>Already riding on your own?</p>
              <h2 className="font-display font-black uppercase"
                style={{ fontSize: "clamp(32px,4.5vw,60px)", lineHeight: 0.88, letterSpacing: "-0.02em", color: INK }}>
                We have options<br />for that too.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SERVICES.map((s, i) => (
                <motion.div key={i} variants={fadeIn} className="flex flex-col p-6"
                  style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)" }}>
                  <p className="category-label mb-3 block" style={{ fontSize: 12, color: CYAN }}>{s.tag}</p>
                  <h3 className="font-display font-black uppercase tracking-tight mb-3"
                    style={{ fontSize: 15, lineHeight: 1.1, color: INK }}>{s.title}</h3>
                  <p className="font-body leading-relaxed flex-1 mb-6"
                    style={{ fontSize: 14, color: "rgba(0,0,0,0.72)", lineHeight: 1.6 }}>{s.desc}</p>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <span className="font-display font-black leading-none"
                        style={{ fontSize: "clamp(28px,2.5vw,48px)", letterSpacing: "-0.02em", color: INK }}>{s.price}</span>
                      <span className="font-body ml-2" style={{ fontSize: 12, color: "rgba(0,0,0,0.60)" }}>{s.duration}</span>
                    </div>
                    <button onClick={() => setBookingId(s.vikingId)}
                      className="font-display font-black uppercase tracking-widest px-4 py-2 transition-all"
                      style={{ fontSize: 11, background: OCEAN, color: "#fff", border: "none", borderRadius: 0 }}>
                      Book
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INSTRUCTORS ───────────────────────────────────────────────── */}
      <section style={{ background: SAND, borderTop: "1px solid rgba(0,0,0,0.06)" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeIn} className="mb-12">
              <p className="category-label mb-4" style={{ fontSize: 12, color: CYAN }}>Real instructors. Real names.</p>
              <h2 className="font-display font-black uppercase"
                style={{ fontSize: "clamp(32px,4vw,60px)", lineHeight: 0.88, letterSpacing: "-0.02em", color: INK }}>
                They've been on this beach<br />a while.
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {INSTRUCTORS.map((inst, i) => (
                <motion.div key={i} variants={fadeIn} className="flex flex-col">
                  <div className="overflow-hidden" style={{ aspectRatio: "3/4", borderRadius: 12 }}>
                    <img src={inst.photo} alt={inst.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                  </div>
                  <div className="pt-3">
                    <p className="font-display font-black text-foreground uppercase tracking-tight"
                      style={{ fontSize: 15, color: INK }}>{inst.name}</p>
                    <p className="category-label mt-1 block" style={{ fontSize: 10, color: CYAN }}>{inst.tag}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeIn} className="font-body mt-10"
              style={{ fontSize: 14, color: "rgba(0,0,0,0.72)" }}>
              Want to know more about the team?{" "}
              <a href="/about" className="text-accent underline hover:text-accent/70">Read their stories on the About page</a>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section style={{ background: SAND, borderTop: "1px solid rgba(0,0,0,0.06)" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <motion.div variants={fadeIn} className="md:col-span-4 md:pr-16 md:sticky md:top-28 md:self-start">
                <p className="category-label mb-4" style={{ fontSize: 12, color: CYAN }}>Good to know</p>
                <h2 className="font-display font-black uppercase mb-5"
                  style={{ fontSize: "clamp(28px,3.8vw,48px)", lineHeight: 0.88, letterSpacing: "-0.02em", color: INK }}>
                  Common<br />questions
                </h2>
                <p className="font-body leading-relaxed" style={{ fontSize: 14, color: "rgba(0,0,0,0.72)" }}>
                  Still have questions?{" "}
                  <a href="https://wa.me/5997015483?text=Hi!%20I'd%20like%20to%20know%20more%20about%20kite%20lessons%20in%20Bonaire" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/70">WhatsApp us</a>
                  {" "}or check the{" "}
                  <a href="/info" className="text-accent underline hover:text-accent/70">full FAQ</a>.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="md:col-span-8 mt-12 md:mt-0"
                style={{ borderTop: "1px solid rgba(0,0,0,0.09)" }}>
                {FAQS.map((f, i) => <FaqRow key={i} q={f.q} a={f.a} link={(f as any).link} />)}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: SAND, borderTop: "1px solid rgba(0,0,0,0.06)" }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-12 gap-0 items-end">
            <motion.div variants={fadeIn} className="md:col-span-7 md:pr-16">
              <p className="category-label mb-5" style={{ fontSize: 12, color: CYAN }}>Atlantis Beach · Kralendijk · Every day from 9am</p>
              <h2 className="font-display font-black uppercase"
                style={{ fontSize: "clamp(52px,9vw,120px)", lineHeight: 0.84, letterSpacing: "-0.03em", color: INK }}>
                Come<br />find us.
              </h2>
              <p className="font-body mt-5"
                style={{ fontSize: 15, color: "rgba(0,0,0,0.72)", lineHeight: 1.7 }}>
                Wind permitting, and in Bonaire, the wind usually permits.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="md:col-span-5 flex flex-col gap-3 mt-12 md:mt-0 md:pb-2">
              <a href="#packages" className="font-display font-black uppercase tracking-widest px-6 py-4 text-center transition-all"
                style={{ fontSize: 11, background: CYAN, color: "#fff", border: "none", borderRadius: 0 }}>
                View packages
              </a>
              <a href="https://wa.me/5997015483?text=Hi!%20I'd%20like%20to%20know%20more%20about%20kite%20lessons%20in%20Bonaire" target="_blank" rel="noopener noreferrer" 
                className="font-display font-black uppercase tracking-widest px-6 py-4 text-center transition-all"
                style={{ fontSize: 11, background: "transparent", color: INK, border: "1.5px solid " + INK, borderRadius: 0 }}>
                WhatsApp us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <BookingModal
        open={!!bookingId}
        onOpenChange={v => { if (!v) setBookingId(null); }}
        productId={bookingId ?? undefined}
      />
    </div>
  );
}
