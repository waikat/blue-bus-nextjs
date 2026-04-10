"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, CheckCircle, AlertCircle } from "lucide-react";

const WHATSAPP_URL  = "https://wa.me/5997015483?text=Hi!%20I%20have%20a%20question%20about%20Kiteboarding%20Bonaire";
const NAVY_DEEP     = "hsl(211,100%,12%)";
const WEB3FORMS_KEY = "c6c12fda-3cd9-49b7-a3e8-fc659e870c9c";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } } };

function HeroPhoto() {
  return (
    <div className="absolute inset-0 bg-primary">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cursor-pointer group" style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }} onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between py-6 gap-6">
        <h3 className={`font-display font-black text-base md:text-lg uppercase tracking-tighter transition-colors ${open ? "text-accent" : "text-foreground group-hover:text-accent"}`}>
          {q}
        </h3>
        <div className={`w-10 h-10 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${open ? "border-accent bg-accent" : "border-foreground/20 group-hover:border-accent"}`}>
          {open ? <Minus className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-foreground group-hover:text-accent" />}
        </div>
      </div>
      {open && (
        <div className="pb-6 pr-14" onClick={(e) => e.stopPropagation()}>
          <p className="text-foreground/80 font-body text-base leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

const inquiryTypes = [
  "Work with us (instructor / staff)",
  "Dealer or supplier",
  "Partnership or collaboration",
  "Press or media",
  "Other",
];

const faqGroups = [
  {
    group: "Getting Started",
    questions: [
      { q: "Why should I learn at Kiteboarding Bonaire?", a: "We are the only official IKO kite center in Bonaire and have been certified since 2001. Every instructor has completed professional IKO training and holds a recognized international certification. We also have the best spot on the island and we've been here long enough to know it better than anyone." },
      { q: "Do I need to know how to swim?",              a: "Yes. Basic swimming skills are required for safety. You should be comfortable in open water above your head." },
      { q: "What is the minimum age?",                    a: "We generally start from around 10 years old. All students must be able to swim and be comfortable in open water. If you're not sure about your child, get in touch and we'll talk it through." },
      { q: "How many lessons will it take to learn?",     a: "On average, most students are riding independently within 3 to 5 days. It depends on your weight, fitness, and whether you have previous board or water sports experience. The more background you bring, the faster you progress." },
    ],
  },
  {
    group: "The Spot and Conditions",
    questions: [
      { q: "When is the best time to come?",              a: "Bonaire has around 300 wind days a year, so the honest answer is almost any time. The windy season runs from mid-December through end of August, with average winds of 14 to 21 knots. May, June and July tend to be the strongest months, with averages between 17 and 25 knots." },
      { q: "What size kite should I bring?",              a: "It's hard to predict weeks ahead. We recommend checking Windguru or Windfinder the week before your trip. They're usually accurate enough to plan around. Our advice: bring everything you can. You never know when conditions are perfect for a different size." },
      { q: "Can I practice on my own at Atlantis Beach?", a: "Only if you can ride upwind confidently. The launching area is tight and the wind is offshore, which means kiting downwind takes you straight out to sea. The only way back is a rescue boat from the school. If you need lessons, we'll get you riding upwind faster than you'd expect." },
      { q: "How do I get to the spot?",                   a: "There is no public transport to Atlantis Beach. We recommend renting a car, scooter or bicycle. There are plenty of rental options in Kralendijk. Ask us if you need recommendations." },
    ],
  },
  {
    group: "Gear and Equipment",
    questions: [
      { q: "What's included in the lesson price?", a: "Everything. Kite, board, harness, helmet, vest, IKO certified instructor, radio helmet communication and boat support. The only extra is the mandatory STINAPA Bonaire National Park tag, purchased separately at stinapa.bonairenaturefee.org." },
      { q: "Can I store my gear at the school?",   a: "Yes. We offer locker rentals by the day, week or month. One locker fits up to two kites and one board." },
      { q: "Can I buy kite gear from you?",        a: "Yes. We carry the latest gear at the school and at our retail partner in the center of Kralendijk. Stock is limited so contact us in advance if you're planning to buy." },
    ],
  },
  {
    group: "Practicalities",
    questions: [
      { q: "What are your opening hours?",      a: "We're at the beach every day the wind allows, from 9am to 5pm. Teaching slots vary by season. Call us on +599 701 5483 or WhatsApp if you want to confirm we'll be there." },
      { q: "Is there a bathroom at the beach?", a: "Not at the spot itself. The nearest facilities are about 8km away, so plan accordingly before you head out." },
    ],
  },
];

const cancellationPolicy = [
  { timing: "More than 7 days before", fee: "No fee",     note: "Full refund" },
  { timing: "Within 48 hours",         fee: "$100",       note: "Partial refund" },
  { timing: "Within 12 hours",         fee: "$150",       note: "No refund on remainder" },
  { timing: "No-show",                 fee: "Full price", note: "No refund" },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display font-black text-xs uppercase tracking-widest text-foreground block mb-3">
      {children}
    </span>
  );
}

const inputClass = "w-full px-5 py-4 border-2 border-foreground/15 bg-white text-foreground font-body text-sm placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors";

function ContactForm() {
  const [status,      setStatus]      = useState<"idle" | "sending" | "success" | "error">("idle");
  const [inquiryType, setInquiryType] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form     = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject",    `KBB Inquiry: ${inquiryType || "General"}`);
    formData.append("from_name",  "Kiteboarding Bonaire Website");
    try {
      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
        setInquiryType("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">

      {/* Inquiry type */}
      <div>
        <FieldLabel>Inquiry Type</FieldLabel>
        <div className="relative">
          <select
            name="inquiry_type"
            required
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled>Select inquiry type</option>
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/30">
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FieldLabel>Your Name</FieldLabel>
          <input type="text" name="name" required placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <FieldLabel>Email Address</FieldLabel>
          <input type="email" name="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      {/* Message */}
      <div>
        <FieldLabel>Message</FieldLabel>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us what you have in mind..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit + status */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "sending" || status === "success"}
          className="btn-cyan text-sm w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed mb-5"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <div className="flex items-start gap-3 p-4 border-2 border-emerald-200 bg-emerald-50">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-black text-sm text-emerald-700 uppercase tracking-wide">Message sent</p>
              <p className="font-body text-sm text-emerald-600 mt-1">We'll get back to you within 1 to 2 business days.</p>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-start gap-3 p-4 border-2 border-red-200 bg-red-50">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-black text-sm text-red-600 uppercase tracking-wide">Something went wrong</p>
              <p className="font-body text-sm text-red-500 mt-1">
                Try{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>
                {" "}instead. We reply faster there.
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-foreground/50 font-body text-xs border-t border-foreground/10 pt-6">
        For urgent matters,{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/70">
          WhatsApp us directly
        </a>
        . We reply faster there.
      </p>
    </form>
  );
}

export default function Info() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end justify-start overflow-hidden">
        <HeroPhoto />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,18,40,0.92) 0%, rgba(5,18,40,0.5) 60%, rgba(5,18,40,0.2) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,18,40,0.95) 0%, transparent 55%)" }} />
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 max-w-7xl w-full mx-auto pb-16 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-6 block">
              Everything You Need to Know
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter mb-6 text-[clamp(48px,9vw,120px)] leading-[0.95]">
              FAQ &<br />Policies
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 font-body max-w-md">
              Can't find what you're looking for?{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">
                WhatsApp us directly
              </a>.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
      </section>

      {/* ── FAQ GROUPS ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-4 block">Common questions</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter mb-16 text-[clamp(32px,5vw,64px)] leading-[0.95]">
              Frequently Asked<br />Questions
            </motion.h2>
            <div className="max-w-3xl mx-auto space-y-12">
              {faqGroups.map((group, gi) => (
                <motion.div key={gi} variants={fadeUp}>
                  <p className="category-label mb-2 block">{group.group}</p>
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                    {group.questions.map((faq, qi) => (
                      <FaqItem key={qi} q={faq.q} a={faq.a} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CANCELLATION POLICY ──────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto">
            <motion.p variants={fadeUp} className="category-label mb-4 block text-accent">Good to know</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter mb-4 text-[clamp(32px,5vw,64px)] leading-[0.95]">
              Cancellation Policy
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 font-body mb-10 leading-relaxed">
              We understand that plans change. Refunds are processed within 7 business days of your request.
            </motion.p>
            <motion.div variants={fadeUp} className="border-2 border-white/20 overflow-hidden">
              <div className="grid grid-cols-3 bg-primary">
                <div className="p-4 font-display font-black text-xs uppercase tracking-widest text-white/70">When you cancel</div>
                <div className="p-4 font-display font-black text-xs uppercase tracking-widest text-white/70 text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>Fee</div>
                <div className="p-4 font-display font-black text-xs uppercase tracking-widest text-white/70" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>Refund</div>
              </div>
              {cancellationPolicy.map((row, i) => (
                <div key={i} className="grid grid-cols-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent" }}>
                  <div className="p-4 font-body text-sm text-white/80">{row.timing}</div>
                  <div className="p-4 text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className={`font-display font-black text-lg ${row.fee === "No fee" ? "text-accent" : "text-white"}`}>{row.fee}</span>
                  </div>
                  <div className="p-4 font-body text-sm text-white/80" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>{row.note}</div>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-sm text-white/70 font-body mt-4">
              Wind-related cancellations are always fully rescheduled at no cost. If we call off a session due to conditions, you pay nothing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

              {/* Left */}
              <div className="md:sticky md:top-28 md:self-start">
                <motion.p variants={fadeUp} className="category-label mb-4 block">Formal inquiries</motion.p>
                <motion.h2 variants={fadeUp} className="font-display font-black text-foreground uppercase tracking-tighter mb-8 text-[clamp(32px,5vw,64px)] leading-[0.95]">
                  Get in<br />Touch
                </motion.h2>
                <motion.p variants={fadeUp} className="text-foreground/70 font-body text-base leading-relaxed mb-5">
                  For partnerships, press, job applications, dealer inquiries or anything that needs a proper conversation. Use this form.
                </motion.p>
                <motion.p variants={fadeUp} className="text-foreground/70 font-body text-base leading-relaxed">
                  For lessons, rentals and quick questions, WhatsApp is always faster.
                </motion.p>
              </div>

              {/* Right — form */}
              <motion.div variants={fadeUp}>
                <ContactForm />
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary text-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 max-w-2xl">
          <h2 className="font-display font-black text-white uppercase tracking-tighter mb-4 text-[clamp(36px,6vw,80px)] leading-[0.95]">
            Still Have<br />Questions?
          </h2>
          <p className="text-white/70 font-body mb-10">
            The fastest way to reach us is WhatsApp. We're on the beach every day and usually reply within the hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-cyan text-base w-full sm:w-auto">WhatsApp Us</a>
            <a href="/lessons" className="btn-outline-white text-base w-full sm:w-auto">View Lessons</a>
          </div>
        </div>
      </section>

    </div>
  );
}
