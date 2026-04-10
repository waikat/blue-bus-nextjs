"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChevronDown } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import lessonsHero           from "@/assets/lessons-hero.jpg";
import ikoLogo               from "@/assets/iko-center.png";
import lessonAction          from "@/assets/lesson-action.jpg";
import photoInstructionWater from "@/assets/photo-instruction-water.jpg";
import photoBoatSupport      from "@/assets/photo-boat-support.jpg";
import photoGearUp           from "@/assets/photo-gear-up.jpg";

const WHATSAPP_URL = "https://wa.me/5997015483?text=Hi!%20I'm%20interested%20in%20kite%20lessons%20at%20Bonaire";
const NAVY_DEEP    = "hsl(211,100%,12%)";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } } };

const packages = [
  {
    name: "Single Session", price: "$225", duration: "1 session · 2 hours", goal: "Custom to Your Level", goalUrl: "https://www.ikointl.com/courses",
    features: ["Tailored to your exact goals and pace", "Beginners: Safety & first water flights", "Riders: Refreshers or specific skills", "IKO certified instructor"],
    longDesc: "A completely flexible 2-hour session. Whether it is your very first day flying a kite, a quick refresher after a break, or you want to work on a specific new trick, we adapt the session exactly to your goals and pace.",
    featured: false, vikingId: "g37000000050000003f75f4dd",
  },
  {
    name: "Block of 3", price: "$645", duration: "3 sessions · 2h each", goal: "IKO Level 2 — Intermediate", goalUrl: "https://www.ikointl.com/course/kiteboarder/intermediate",
    features: ["Full beginner progression path", "Body dragging and water relaunch", "First waterstart attempts", "First independent rides"],
    longDesc: "The ideal package to get you past the initial learning curve. By session two, you are doing water starts. By session three, you are taking your first real rides on the board.",
    featured: true, vikingId: "g37000000050000003f75f4dd", badge: "Most Popular",
  },
  {
    name: "Block of 5", price: "$1,065", duration: "5 sessions · 2h each", goal: "Working toward IKO Level 3", goalUrl: "https://www.ikointl.com/course/kiteboarder/independent",
    features: ["Complete zero-to-hero journey", "Board starts and upwind riding", "Speed control and transitions", "Most students reach IKO Level 3"],
    longDesc: "The ultimate beginner path. We focus heavily on board skills, riding upwind, and becoming a self-sufficient kiteboarder so you can safely rent gear anywhere in the world.",
    featured: false, vikingId: "g37000000050000003f75f4dd",
  },
];

const duoPackages = [
  {
    name: "Single Session", price: "$350", perPerson: "$175 pp", duration: "1 session · 2 hours", goal: "Custom to Your Levels", goalUrl: "#",
    features: ["Tailored to your exact goals and pace", "Beginners: Safety & first water flights", "Riders: Refreshers or specific skills", "IKO certified instructor"],
    longDesc: "A completely flexible 2-hour shared session. Perfect for two beginners wanting an introduction, or two riders wanting a refresher. You will share one kite, learning from each other's water time at your own pace.",
    featured: false, vikingId: "g3700000008000000e2ad9e2f",
  },
  {
    name: "Block of 3", price: "$899", perPerson: "$450 pp", duration: "3 sessions · 2h each", goal: "Progress together", goalUrl: "#",
    features: ["Full beginner progression path", "Body dragging and water relaunch", "First waterstart attempts", "First independent rides"],
    longDesc: "Progress into water starts as a team. Sharing the kite gives you crucial rest time and allows you to learn from your partner's mistakes and successes.",
    featured: true, vikingId: "g3700000008000000e2ad9e2f", badge: "Best Value",
  },
  {
    name: "Block of 5", price: "$1,499", perPerson: "$750 pp", duration: "5 sessions · 2h each", goal: "Ride independently", goalUrl: "#",
    features: ["Complete zero-to-hero journey", "Board starts and upwind riding", "Speed control and transitions", "Most students reach IKO Level 3"],
    longDesc: "A complete journey for two. By the end of this block, both riders should have the skills to ride independently, control speed, and potentially ride upwind.",
    featured: false, vikingId: "g3700000008000000e2ad9e2f",
  },
];

const included = [
  "IKO certified instructor every session",
  "All equipment — kite, board, harness, helmet, vest",
  "Radio helmet communication with your instructor",
  "Boat support on the water throughout",
  "Full safety briefing before every session",
  "IKO certification card upon completion",
];

const advancedServices = [
  { label: "For riders who already ride", title: "Coaching Session", desc: "2 hours of focused skill refinement. Technique work, progression drills, riding in different conditions.", price: "$185", priceNote: "per 2-hour session", cta: "Book Coaching →", vikingId: "g370000000a00000069659785", dark: true, tag: null },
  { label: "Unique to Bonaire", title: "Beach Support", desc: "You ride independently, we handle the launch and land. Bring your own gear and skills.", price: "$90", priceNote: "no instructor included", cta: "Book Beach Support →", vikingId: "g370000000a00000069659785", dark: false, tag: null },
  { label: "IKO Riding Certification", title: "Get Your IKO vCard", desc: "Already riding but no official IKO card? We observe you on the water and certify you at the correct level (1–4). Level 3 is required to rent gear at most shops worldwide.", price: null, priceNote: null, cta: "Book Evaluation →", vikingId: "g370000000a00000069659785", dark: true, tag: "IKO Affiliated Center" },
];

const faqs = [
  { q: "Do I need to know how to swim?", a: "Yes. You should be comfortable in open water above your head." },
  { q: "What if there's no wind on my lesson day?", a: "We reschedule to the next windy day at no extra cost. Bonaire has 300+ wind days a year. This is rare, but when it happens we take care of it." },
  { q: "How many sessions to ride independently?", a: "IKO estimates around 14 hours on average from scratch, roughly 7 of our 2-hour sessions. Some go faster, some slower. Every session builds real, measurable skills.", link: { label: "See IKO progression levels ↗", href: "https://www.ikointl.com/courses", external: true } },
  { q: "What is the minimum age?", a: "Around 10 years old. All younger students must swim confidently in open water. Get in touch if you're not sure." },
  { q: "What's included in the price?", a: "Everything — kite, board, harness, helmet, vest, IKO certified instructor, radio helmet, boat support and safety briefing. The only extra is the mandatory STINAPA park tag, purchased separately." },
  { q: "What's the cancellation policy?", a: "Free cancellation up to 48 hours before your lesson.", link: { label: "View full cancellation policy ↗", href: "/info", external: false } },
  { q: "What is an IKO Riding Level Evaluation?", a: "If you already know how to kite but don't have an official IKO card, we can evaluate your riding and certify you at the appropriate level (Level 1–4). Most rental shops worldwide require Level 3. Get in touch to arrange an evaluation session." },
];

const photoStrip = [
  { src: photoInstructionWater.src, alt: "Instructor guiding student in the water",     pos: "object-center" },
  { src: photoBoatSupport.src,      alt: "KBB boat support on the water",               pos: "object-center" },
  { src: photoGearUp.src,           alt: "Instructor fitting student harness on beach",  pos: "object-center" },
];

function FaqItem({ q, a, link }: { q: string; a: string; link?: { label: string; href: string; external: boolean } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cursor-pointer group" style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }} onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between py-6 gap-6">
        <h3 className={`font-display font-black text-base md:text-lg uppercase tracking-tighter transition-colors ${open ? "text-accent" : "text-foreground group-hover:text-accent"}`}>{q}</h3>
        <div className={`w-10 h-10 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${open ? "border-accent bg-accent" : "border-foreground/20 group-hover:border-accent"}`}>
          {open ? <Minus className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-foreground group-hover:text-accent" />}
        </div>
      </div>
      {open && (
        <div className="pb-6 pr-14">
          <p className="text-muted-foreground font-body text-base leading-relaxed">
            {a}
            {link && (
              <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="text-accent underline ml-1 hover:text-accent/70" onClick={(e) => e.stopPropagation()}>
                {link.label}
              </a>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

function LessonCard({ pkg, onBook }: { pkg: any; onBook: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`relative flex flex-col w-full h-full p-8 md:p-10 transition-all duration-300 md:border-y-2 md:first:border-l-2 md:last:border-r-2 md:border-x-0 border-2 border-foreground ${pkg.featured ? "md:scale-105 md:z-10 md:border-2" : "md:z-0"}`} style={{ background: pkg.featured ? NAVY_DEEP : "white" }}>
      {pkg.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="px-4 py-1.5 font-display font-black text-xs uppercase tracking-widest whitespace-nowrap bg-accent text-white shadow-lg">{pkg.badge}</span>
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <h3 className={`text-2xl font-display font-black uppercase tracking-tighter mb-1 ${pkg.featured ? "text-white" : "text-foreground"}`}>{pkg.name}</h3>
          <p className={`text-sm font-body ${pkg.featured ? "text-white/70" : "text-muted-foreground"}`}>{pkg.duration}</p>
        </div>
        <div className="mb-1">
          <span className={`font-display font-black leading-none ${pkg.featured ? "text-white" : "text-foreground"}`} style={{ fontSize: "clamp(48px, 5vw, 64px)" }}>{pkg.price}</span>
        </div>
        <div className="min-h-[24px] mb-6">
          {pkg.perPerson ? (
            <p className="text-accent font-display font-bold text-sm">{pkg.perPerson}</p>
          ) : (
            <a href={pkg.goalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-display font-black uppercase tracking-widest text-accent hover:text-accent/70 transition-colors">
              {pkg.goal} ↗
            </a>
          )}
        </div>
        <ul className="space-y-3 mb-6">
          {pkg.features.map((f: string, j: number) => (
            <li key={j} className={`flex items-start gap-3 text-sm font-body ${pkg.featured ? "text-white/70" : "text-foreground/80"}`}>
              <span className="text-accent mt-0.5 flex-shrink-0 font-black">—</span>{f}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-col justify-end pt-4">
        {pkg.longDesc && (
          <div className="mb-5">
            <button onClick={() => setExpanded(!expanded)} className={`text-[10px] sm:text-xs font-display font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors ${pkg.featured ? "text-white/70 hover:text-white" : "text-foreground/50 hover:text-foreground"}`}>
              {expanded ? "Hide Details" : "Read full details"}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className={`mt-4 text-sm font-body leading-relaxed border-l-2 border-accent pl-3 ${pkg.featured ? "text-white/80" : "text-foreground/80"}`}>{pkg.longDesc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <button onClick={onBook} className={`w-full inline-block text-center font-display font-black py-4 uppercase tracking-widest transition-all text-sm border-2 ${pkg.featured ? "bg-accent text-white border-accent hover:brightness-110" : "bg-foreground text-background border-foreground hover:bg-foreground/80"}`}>
          Book Now →
        </button>
      </div>
    </div>
  );
}

export default function LessonsPage() {
  const [lessonType, setLessonType] = useState<"solo" | "duo">("solo");
  const [bookingId,  setBookingId]  = useState<string | null>(null);
  const activePackages = lessonType === "solo" ? packages : duoPackages;

  function openBooking(id: string) { setBookingId(id); }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] md:min-h-[75vh] overflow-hidden flex items-center justify-center text-center">
        <img src={lessonsHero.src} alt="Learn to kitesurf in Bonaire with KBB" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#051228E0] via-[#05122859] to-[#05122833]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051228EB] to-transparent h-[55%] mt-auto" />
        <div className="relative z-10 px-6 sm:px-10 max-w-4xl mx-auto w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-8 block text-accent">IKO Certified School</motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter mb-6 text-[clamp(56px,10vw,140px)] leading-[0.87]">
              Learn to<br />Kitesurf
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 font-body text-sm md:text-base uppercase tracking-[0.22em] mb-12 mx-auto max-w-[400px]">
              Certified instructors. Radio helmets. Your pace.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <a href="#packages" className="btn-cyan text-base w-full sm:w-auto">View Packages</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-white text-base w-full sm:w-auto">Ask Us Anything</a>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
      </section>

      {/* ── INCLUDED ─────────────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block text-accent">Every lesson includes</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter mb-12 text-[clamp(36px,7vw,88px)] leading-[0.87]">
              No hidden extras.<br />Everything covered.
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 border border-white/15">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-5 px-6" style={{
                  borderBottom: i < included.length - 2 ? "1px solid rgba(255,255,255,0.12)" : i < included.length - 1 ? "1px solid rgba(255,255,255,0.12)" : undefined,
                  borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.12)" : undefined,
                }}>
                  <div className="w-[3px] bg-accent flex-shrink-0 self-stretch min-h-[20px]" />
                  <p className="text-white/80 font-body text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="border border-t-0 border-white/10 h-[clamp(180px,25vw,300px)] overflow-hidden">
              <img src={lessonAction.src} className="w-full h-full object-cover object-bottom" alt="Kitesurfing lesson in action in Bonaire" />
            </div>
            <div className="pt-6 border-t border-white/12">
              <p className="text-white/70 font-body text-sm">
                The only extra is the mandatory{" "}
                <a href="https://stinapa.bonairenaturefee.org/" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/70">STINAPA Bonaire National Park tag</a>
                , purchased separately before your session.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────────────────────── */}
      <motion.section id="packages" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="category-label mb-4 block">Flexible sessions & complete beginner paths. Max 2 students per instructor.</p>
              <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-[clamp(36px,6vw,72px)] leading-[0.87]">
                Choose Your Package
              </h2>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 pb-2">
              <img src={ikoLogo.src} alt="IKO Kite Center Certified" className="h-10 w-auto opacity-80" />
              <a href="https://www.ikointl.com/" target="_blank" rel="noopener noreferrer" className="text-accent font-body text-xs underline hover:text-accent/70 whitespace-nowrap">
                What is IKO? ↗
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center mb-10">
            <div className="inline-flex border-2 border-foreground bg-background p-0.5">
              <button onClick={() => setLessonType("solo")} className={`px-5 py-3 sm:px-7 sm:py-3 text-[10px] sm:text-xs font-display font-black uppercase tracking-widest transition-all duration-300 ${lessonType === "solo" ? "bg-foreground text-background" : "text-foreground/50 hover:bg-foreground/5 hover:text-foreground"}`}>
                Solo Lessons (1-on-1)
              </button>
              <button onClick={() => setLessonType("duo")} className={`px-5 py-3 sm:px-7 sm:py-3 text-[10px] sm:text-xs font-display font-black uppercase tracking-widest transition-all duration-300 ${lessonType === "duo" ? "bg-foreground text-background" : "text-foreground/50 hover:bg-foreground/5 hover:text-foreground"}`}>
                Duo Lessons (2-on-1)
              </button>
            </div>
          </motion.div>

          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-0 pb-10 md:pb-16 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar items-stretch">
            {activePackages.map((pkg, i) => (
              <div key={i} className="flex w-[85vw] md:w-auto flex-shrink-0 snap-center h-full">
                <LessonCard pkg={pkg} onBook={() => openBooking(pkg.vikingId)} />
              </div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="text-xs text-muted-foreground font-body mt-2 text-center max-w-2xl mx-auto">
            IKO estimates 14 hours on average to reach independent rider level from scratch.{" "}
            <a href="https://www.ikointl.com/courses" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/70">Learn more about IKO levels ↗</a>
          </motion.p>
        </div>
      </motion.section>

      {/* ── ALREADY RIDING ───────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 md:py-28">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <motion.div variants={fadeUp} className="md:pr-12 mb-12 md:mb-0 md:sticky md:top-28 md:self-start">
              <p className="category-label mb-4 text-accent">Already riding?</p>
              <h2 className="font-display font-black text-white uppercase tracking-tighter text-[clamp(24px,3vw,40px)] leading-[0.9]">
                Options for riders past the beginner stage
              </h2>
            </motion.div>
            <div className="md:col-span-2 col-divider-dark">
              {advancedServices.map((service, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                  style={{ background: service.dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)", borderBottom: i < advancedServices.length - 1 ? "1px solid rgba(255,255,255,0.1)" : undefined, borderTop: i === 0 ? "1px solid rgba(255,255,255,0.1)" : undefined }}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p className="category-label text-accent">{service.label}</p>
                      {service.tag && <span className="border border-accent/40 text-accent font-display font-black text-[10px] uppercase tracking-widest px-2 py-0.5">{service.tag}</span>}
                    </div>
                    <h3 className="font-display font-black text-white uppercase tracking-tighter mb-2 text-[clamp(20px,2.5vw,30px)] leading-[0.92]">{service.title}</h3>
                    <p className="text-white/60 font-body text-sm leading-relaxed">{service.desc}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
                    {service.price && (
                      <div className="text-right">
                        <span className="font-display font-black text-white leading-none text-[clamp(28px,3vw,40px)]">{service.price}</span>
                        <span className="text-white/70 font-body text-xs ml-2">{service.priceNote}</span>
                      </div>
                    )}
                    <button onClick={() => openBooking(service.vikingId)} className="inline-block font-display font-black py-3 px-6 uppercase tracking-widest text-xs border-2 transition-all whitespace-nowrap bg-accent text-white border-accent hover:brightness-110">
                      {service.cta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PHOTO STRIP ──────────────────────────────────────────────────── */}
      <div className="flex overflow-x-auto hide-scrollbar md:grid md:grid-cols-3 gap-0">
        {photoStrip.map((photo, i) => (
          <div key={i} className="flex-shrink-0 w-[85vw] md:w-auto h-[380px] md:h-[480px] overflow-hidden">
            <img src={photo.src} alt={photo.alt} className={`w-full h-full object-cover ${photo.pos} transition-transform duration-700 hover:scale-105`} />
          </div>
        ))}
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block text-center">Good to know</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter mb-16 text-center text-[clamp(32px,5vw,60px)] leading-[0.87]">
              Common Questions
            </motion.h2>
            <div className="max-w-3xl mx-auto border-t border-black/10">
              {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} link={(faq as any).link} />)}
            </div>
            <p className="text-sm text-muted-foreground font-body mt-12 max-w-3xl mx-auto text-center">
              More questions?{" "}
              <a href="/info" className="text-accent underline hover:text-accent/70">Full FAQ</a>{" "}or{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/70">WhatsApp us directly</a>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-black text-white uppercase tracking-tighter mb-4 text-[clamp(40px,7vw,96px)] leading-[0.88]" style={{ letterSpacing: "-0.01em" }}>
            Ready to Start?
          </h2>
          <p className="text-white/70 font-body mb-10 uppercase tracking-[0.2em] text-sm">Find us at Atlantis Beach. We'll take care of everything else.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <a href="#packages" className="btn-cyan text-base w-full sm:w-auto">View Packages</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-white text-base w-full sm:w-auto">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <BookingModal open={!!bookingId} onOpenChange={(v) => { if (!v) setBookingId(null); }} productId={bookingId ?? undefined} />
    </>
  );
}
