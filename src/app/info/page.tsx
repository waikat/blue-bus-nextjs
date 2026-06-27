"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, CheckCircle, AlertCircle } from "lucide-react";

// Design system colors
const OCEAN = "hsl(213,85%,38%)";
const OCEAN_DEEP = "hsl(213,85%,22%)";
const CYAN = "hsl(186,100%,42%)";
const SAND = "hsl(42,35%,97%)";
const INK = "hsl(0,0%,10%)";

const WHATSAPP_URL = "https://wa.me/5997015483?text=Hi!%20I%20have%20a%20question%20about%20Kiteboarding%20Bonaire";
const WEB3FORMS_KEY = "c6c12fda-3cd9-49b7-a3e8-fc659e870c9c";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

const inquiryTypes = ["Work with us (instructor / staff)", "Dealer or supplier", "Partnership or collaboration", "Press or media", "Other"];

const faqGroups = [
  {
    group: "Getting Started",
    questions: [
      { q: "Why should I learn at Kiteboarding Bonaire?", a: "We are the only official IKO kite center in Bonaire and have been certified since 2001. Every instructor has completed professional IKO training and holds a recognized international certification. We also have the best spot on the island and we've been here long enough to know it better than anyone." },
      { q: "Do I need to know how to swim?", a: "Yes. Basic swimming skills are required for safety. You should be comfortable in open water above your head." },
      { q: "What is the minimum age?", a: "We generally start from around 10 years old. All students must be able to swim and be comfortable in open water. If you're not sure about your child, get in touch and we'll talk it through." },
      { q: "How many lessons will it take to learn?", a: "On average, most students are riding independently within 3 to 5 days. It depends on your weight, fitness, and whether you have previous board or water sports experience. The more background you bring, the faster you progress." },
    ],
  },
  {
    group: "The Spot and Conditions",
    questions: [
      { q: "When is the best time to come?", a: "Bonaire has around 300 wind days a year, so the honest answer is almost any time. The windy season runs from mid-December through end of August, with average winds of 14 to 21 knots. May, June and July tend to be the strongest months, with averages between 17 and 25 knots." },
      { q: "What size kite should I bring?", a: "It's hard to predict weeks ahead. We recommend checking Windguru or Windfinder the week before your trip. They're usually accurate enough to plan around. Our advice: bring everything you can. You never know when conditions are perfect for a different size." },
      { q: "Can I practice on my own at Atlantis Beach?", a: "Only if you can ride upwind confidently. The launching area is tight and the wind is offshore, which means kiting downwind takes you straight out to sea. The only way back is a rescue boat from the school. If you need lessons, we'll get you riding upwind faster than you'd expect." },
      { q: "How do I get to the spot?", a: "There is no public transport to Atlantis Beach. We recommend renting a car, scooter or bicycle. There are plenty of rental options in Kralendijk. Ask us if you need recommendations." },
    ],
  },
  {
    group: "Gear and Equipment",
    questions: [
      { q: "What's included in the lesson price?", a: "Everything. Kite, board, harness, helmet, vest, IKO certified instructor, radio helmet communication and boat support. The only extra is the mandatory STINAPA Bonaire National Park tag, purchased separately at stinapa.bonairenaturefee.org." },
      { q: "Can I store my gear at the school?", a: "Yes. We offer locker rentals by the day, week or month. One locker fits up to two kites and one board." },
      { q: "Can I buy kite gear from you?", a: "Yes. We carry the latest gear at the school and at our retail partner in the center of Kralendijk. Stock is limited so contact us in advance if you're planning to buy." },
    ],
  },
  {
    group: "Practicalities",
    questions: [
      { q: "What are your opening hours?", a: "We're at the beach every day the wind allows, from 9am to 5pm. Teaching slots vary by season. Call us on +599 701 5483 or WhatsApp if you want to confirm we'll be there." },
      { q: "Is there a bathroom at the beach?", a: "Not at the spot itself. The nearest facilities are about 8km away, so plan accordingly before you head out." },
    ],
  },
];

const cancellationPolicy = [
  { timing: "More than 7 days before", fee: "No fee", note: "Full refund" },
  { timing: "Within 48 hours", fee: "$100", note: "Partial refund" },
  { timing: "Within 12 hours", fee: "$150", note: "No refund on remainder" },
  { timing: "No-show", fee: "Full price", note: "No refund" },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid rgba(0,0,0,0.1)` }} className="cursor-pointer group">
      <div className="flex items-center justify-between py-6 gap-6" onClick={() => setOpen(!open)}>
        <h3
          className="font-display font-black uppercase tracking-tighter transition-colors"
          style={{
            fontSize: "clamp(14px, 1.5vw, 18px)",
            color: open ? CYAN : INK,
          }}
        >
          {q}
        </h3>
        <div
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center transition-colors"
          style={{
            border: `2px solid ${open ? CYAN : "rgba(0,0,0,0.15)"}`,
            background: open ? CYAN : "transparent",
          }}
        >
          {open ? <Minus className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5" style={{ color: INK }} />}
        </div>
      </div>
      {open && (
        <div className="pb-6 pr-14" onClick={(e) => e.stopPropagation()}>
          <p className="font-body text-[15px] leading-[1.6]" style={{ color: "rgba(0,0,0,0.75)" }}>
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display font-black text-[11px] uppercase tracking-widest block mb-3" style={{ color: INK }}>
      {children}
    </span>
  );
}

const inputClass = "w-full px-5 py-4 border-2 bg-white text-[15px] placeholder:text-opacity-30 focus:outline-none transition-colors font-body";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [inquiryType, setInquiryType] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", `KBB Inquiry: ${inquiryType || "General"}`);
    formData.append("from_name", "Kiteboarding Bonaire Website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
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
      <div>
        <FieldLabel>Inquiry Type</FieldLabel>
        <div className="relative">
          <select
            name="inquiry_type"
            required
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className={inputClass}
            style={{ borderColor: "rgba(0,0,0,0.15)", color: INK }}
          >
            <option value="" disabled>
              Select inquiry type
            </option>
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(0,0,0,0.3)" }}>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FieldLabel>Your Name</FieldLabel>
          <input type="text" name="name" required placeholder="Your full name" className={inputClass} style={{ borderColor: "rgba(0,0,0,0.15)", color: INK }} />
        </div>
        <div>
          <FieldLabel>Email Address</FieldLabel>
          <input type="email" name="email" required placeholder="you@example.com" className={inputClass} style={{ borderColor: "rgba(0,0,0,0.15)", color: INK }} />
        </div>
      </div>

      <div>
        <FieldLabel>Message</FieldLabel>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us what you have in mind..."
          className={`${inputClass} resize-none`}
          style={{ borderColor: "rgba(0,0,0,0.15)", color: INK }}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "sending" || status === "success"}
          className="font-display font-black uppercase tracking-widest px-8 py-4 text-[11px] disabled:opacity-60 disabled:cursor-not-allowed mb-5"
          style={{ background: CYAN, color: "#fff", border: "none" }}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <div className="flex items-start gap-3 p-4 border-2 bg-emerald-50" style={{ borderColor: "#c1fae8" }}>
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-black text-[13px] uppercase tracking-wide" style={{ color: "#047857" }}>
                Message sent
              </p>
              <p className="font-body text-[14px] mt-1" style={{ color: "#059669" }}>
                We'll get back to you within 1 to 2 business days.
              </p>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-start gap-3 p-4 border-2 bg-red-50" style={{ borderColor: "#fecaca" }}>
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-black text-[13px] uppercase tracking-wide" style={{ color: "#b91c1c" }}>
                Something went wrong
              </p>
              <p className="font-body text-[14px] mt-1" style={{ color: "#ef4444" }}>
                Try{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline">
                  WhatsApp
                </a>{" "}
                instead. We reply faster there.
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="font-body text-[13px] border-t pt-6" style={{ color: "rgba(0,0,0,0.5)", borderColor: "rgba(0,0,0,0.1)" }}>
        For urgent matters,{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: CYAN }} className="underline">
          WhatsApp us directly
        </a>
        . We reply faster there.
      </p>
    </form>
  );
}

export default function Info() {
  return (
    <div style={{ background: SAND }}>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section style={{ background: OCEAN_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-6" style={{ color: CYAN }}>
              Everything You Need to Know
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-black text-white uppercase tracking-tighter mb-6 text-[clamp(52px,9vw,120px)] leading-[0.88]">
              FAQ &<br />Policies
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 font-body text-[15px]">
              Can't find what you're looking for?{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: CYAN }} className="underline hover:opacity-80">
                WhatsApp us directly
              </a>
              .
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ GROUPS ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
              Common questions
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-black uppercase tracking-tighter mb-16"
              style={{
                fontSize: "clamp(32px, 4.5vw, 60px)",
                lineHeight: 0.88,
                color: INK,
              }}
            >
              Frequently Asked<br />Questions
            </motion.h2>
            <div className="max-w-3xl mx-auto space-y-12">
              {faqGroups.map((group, gi) => (
                <motion.div key={gi} variants={fadeUp}>
                  <p className="font-display font-black uppercase tracking-widest text-[12px] mb-2" style={{ color: CYAN }}>
                    {group.group}
                  </p>
                  <div style={{ borderTop: `1px solid rgba(0,0,0,0.1)` }}>
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

      {/* ── CANCELLATION POLICY ────────────────────────────────────────── */}
      <section style={{ background: OCEAN_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto">
            <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
              Good to know
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-black text-white uppercase tracking-tighter mb-4"
              style={{
                fontSize: "clamp(32px, 4.5vw, 60px)",
                lineHeight: 0.88,
              }}
            >
              Cancellation Policy
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/75 font-body text-[15px] mb-10 leading-[1.7]">
              We understand that plans change. Refunds are processed within 7 business days of your request.
            </motion.p>
            <motion.div variants={fadeUp} className="border-2 overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              <div className="grid grid-cols-3" style={{ background: OCEAN }}>
                <div className="p-4 font-display font-black text-[11px] uppercase tracking-widest text-white/70">When you cancel</div>
                <div className="p-4 font-display font-black text-[11px] uppercase tracking-widest text-white/70 text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                  Fee
                </div>
                <div className="p-4 font-display font-black text-[11px] uppercase tracking-widest text-white/70" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                  Refund
                </div>
              </div>
              {cancellationPolicy.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                  }}
                >
                  <div className="p-4 font-body text-[14px] text-white/80">{row.timing}</div>
                  <div className="p-4 text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="font-display font-black text-[15px]" style={{ color: row.fee === "No fee" ? CYAN : "#fff" }}>
                      {row.fee}
                    </span>
                  </div>
                  <div className="p-4 font-body text-[14px] text-white/80" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                    {row.note}
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-[13px] text-white/70 font-body mt-4">
              Wind-related cancellations are always fully rescheduled at no cost. If we call off a session due to conditions, you pay nothing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              <div className="md:sticky md:top-28 md:self-start">
                <motion.p variants={fadeUp} className="font-display font-black uppercase tracking-widest text-[12px] mb-4" style={{ color: CYAN }}>
                  Formal inquiries
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="font-black uppercase tracking-tighter mb-8"
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 60px)",
                    lineHeight: 0.88,
                    color: INK,
                  }}
                >
                  Get in<br />Touch
                </motion.h2>
                <motion.p variants={fadeUp} className="font-body text-[15px] leading-[1.7] mb-5" style={{ color: "rgba(0,0,0,0.7)" }}>
                  For partnerships, press, job applications, dealer inquiries or anything that needs a proper conversation. Use this form.
                </motion.p>
                <motion.p variants={fadeUp} className="font-body text-[15px] leading-[1.7]" style={{ color: "rgba(0,0,0,0.7)" }}>
                  For lessons, rentals and quick questions, WhatsApp is always faster.
                </motion.p>
              </div>

              <motion.div variants={fadeUp}>
                <ContactForm />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section style={{ background: OCEAN }} className="py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto px-8 sm:px-14 lg:px-20">
          <h2 className="font-black text-white uppercase tracking-tighter mb-6" style={{ fontSize: "clamp(36px, 6vw, 80px)", lineHeight: 0.88 }}>
            Still Have<br />Questions?
          </h2>
          <p className="text-white/75 font-body text-[15px] mb-10">
            The fastest way to reach us is WhatsApp. We're on the beach every day and usually reply within the hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-black uppercase tracking-widest px-8 py-4 text-[11px]"
              style={{ background: CYAN, color: "#fff", border: "none" }}
            >
              WhatsApp Us
            </a>
            <a
              href="/lessons"
              className="font-display font-black uppercase tracking-widest px-8 py-4 text-[11px]"
              style={{ background: "transparent", color: "#fff", border: `2px solid ${CYAN}` }}
            >
              View Lessons
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
