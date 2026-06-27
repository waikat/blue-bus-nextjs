"use client";

import { motion } from "framer-motion";

// Design system colors
const OCEAN = "hsl(213,85%,38%)";
const OCEAN_DEEP = "hsl(213,85%,22%)";
const CYAN = "hsl(186,100%,42%)";
const SAND = "hsl(42,35%,97%)";
const INK = "hsl(0,0%,10%)";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

const LEGAL_NAME = "COR Enterprise BV";
const CONTACT_EMAIL = "info@kiteboardingbonaire.com";
const LAST_UPDATED = "April 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="pt-12 pb-12"
      style={{ borderTop: `2px solid ${INK}` }}
    >
      <h2
        className="font-black uppercase tracking-tighter mb-6"
        style={{
          fontSize: "clamp(20px, 2.5vw, 32px)",
          lineHeight: 0.88,
          color: INK,
        }}
      >
        {title}
      </h2>
      <div className="space-y-4" style={{ color: "rgba(0,0,0,0.75)" }}>
        {children}
      </div>
    </motion.div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3 mt-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          <span className="font-display font-black flex-shrink-0 mt-0.5" style={{ color: CYAN }}>
            {i + 1}.
          </span>
          <span className="font-body text-[15px] leading-[1.6]">{item}</span>
        </li>
      ))}
    </ol>
  );
}

const damageCharges = [
  { item: "Twin tip board loss", charge: "$500" },
  { item: "Surfboard loss", charge: "$800" },
  { item: "Foil board loss", charge: "$1,000" },
  { item: "Bar loss", charge: "$350" },
  { item: "Harness loss", charge: "$150" },
  { item: "Helmet loss", charge: "$100" },
  { item: "Life jacket loss", charge: "$75" },
  { item: "Ripped kite", charge: "$700" },
  { item: "Hole in kite", charge: "$200" },
  { item: "Total kite loss (kiter negligence)", charge: "$1,000" },
];

const cancellationRows = [
  { timing: "More than 7 days before", fee: "No fee", note: "Full refund" },
  { timing: "Within 48 hours", fee: "$100", note: "Partial refund" },
  { timing: "Within 12 hours", fee: "$150", note: "No refund on remainder" },
  { timing: "No-show", fee: "Full price", note: "No refund" },
];

export default function Terms() {
  return (
    <div style={{ background: SAND }}>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section style={{ background: OCEAN_DEEP }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p
              variants={fadeUp}
              className="font-display font-black uppercase tracking-widest text-[12px] mb-6"
              style={{ color: CYAN }}
            >
              Legal
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-black text-white uppercase tracking-tighter text-[clamp(52px,9vw,120px)] leading-[0.88]"
            >
              Terms and<br />Conditions
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/75 font-body text-[15px] mt-6"
            >
              Last updated: {LAST_UPDATED}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p
              variants={fadeUp}
              className="font-body text-[15px] leading-[1.7] mb-16 max-w-3xl"
              style={{ color: INK }}
            >
              These terms and conditions apply to all lessons, rentals, and services provided by {LEGAL_NAME} at Atlantis Beach, Kralendijk, Bonaire. By booking or participating in any activity with us, you agree to these terms.
            </motion.p>

            <Section title="The Service">
              <p>Kiteboarding Bonaire provides kiteboarding lessons, equipment rentals, beach support, and kite safari trips. All lessons are conducted by IKO certified instructors. All rentals are subject to the rental agreement below.</p>
              <p>Minimum age for participation is 10 years old. All participants must be able to swim comfortably in open water above their head. Participation by minors requires a parent or legal guardian to sign the liability waiver.</p>
            </Section>

            <Section title="Bookings and Payment">
              <p>Bookings are made through our Viking Bookings platform. Payment is required at the time of booking to secure your spot. Prices are listed in US dollars.</p>
              <p>For kite safaris, a payment plan applies: 30% deposit at booking, 35% due within 30 days, and the remaining 35% due within 60 days of booking.</p>
            </Section>

            <Section title="Cancellation Policy">
              <p>We understand that plans change. The following cancellation fees apply to lesson and rental bookings:</p>
              <div className="border-2 overflow-hidden mt-6" style={{ borderColor: INK }}>
                <div className="grid grid-cols-3" style={{ background: INK }}>
                  <div className="p-4 font-display font-black text-[11px] uppercase tracking-widest text-white">When you cancel</div>
                  <div className="p-4 font-display font-black text-[11px] uppercase tracking-widest text-white text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.2)" }}>
                    Fee
                  </div>
                  <div className="p-4 font-display font-black text-[11px] uppercase tracking-widest text-white" style={{ borderLeft: "1px solid rgba(255,255,255,0.2)" }}>
                    Refund
                  </div>
                </div>
                {cancellationRows.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 border-t"
                    style={{
                      borderColor: "rgba(0,0,0,0.1)",
                      background: i % 2 === 0 ? "#fff" : "hsl(42,35%,98%)",
                    }}
                  >
                    <div className="p-4 font-body text-[14px]" style={{ color: "rgba(0,0,0,0.8)" }}>
                      {row.timing}
                    </div>
                    <div className="p-4 text-center border-l border-black/10">
                      <span className="font-display font-black text-[15px]" style={{ color: row.fee === "No fee" ? CYAN : INK }}>
                        {row.fee}
                      </span>
                    </div>
                    <div className="p-4 font-body text-[14px] border-l border-black/10" style={{ color: "rgba(0,0,0,0.8)" }}>
                      {row.note}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4">Wind-related cancellations are always fully rescheduled at no cost. If we cancel a session due to conditions, you pay nothing and we find the next available slot.</p>
            </Section>

            <Section title="STINAPA National Park Tag">
              <p>Kitesurfing at Atlantis Beach requires a valid STINAPA Bonaire National Park tag. This is a mandatory government fee and is not included in lesson or rental prices. It is the sole responsibility of the participant to purchase this tag before entering the water.</p>
              <p>
                Tags can be purchased at{" "}
                <a href="https://stinapa.bonairenaturefee.org" style={{ color: CYAN }} className="underline hover:opacity-80">
                  stinapa.bonairenaturefee.org
                </a>
                .
              </p>
            </Section>

            <Section title="Liability Release and Assumption of Risk">
              <p>All participants are required to sign a Liability Release Waiver before their first session. The following terms form the basis of that waiver:</p>
              <NumberedList
                items={[
                  "I acknowledge that kiteboarding is an action sport and recreational activity involving travel in three dimensions and is subject to mishap and injury.",
                  "I hereby release and discharge Kiteboarding Bonaire and their officers, directors, agents, employees, instructors, and owners of equipment and land used for kiteboarding activities from any and all liability, claims, demands, or causes of action for injuries, disability, death, or damages arising out of my participation in kiteboarding activities, including losses caused by the negligence of the released parties.",
                  "I understand that kiteboarding has inherent dangers that no amount of care, caution, instruction, or expertise can totally eliminate. I expressly and voluntarily assume all risk of death or personal injury sustained while participating in kiteboarding activities whether or not caused by the negligence of the released parties.",
                  "I agree that I will not sue or make a claim against the released parties for damages or losses sustained as a result of my participation in kiteboarding activities.",
                  "I agree to indemnify and hold the released parties harmless from all claims, judgments, and costs, including attorneys fees, incurred in connection with any action brought as a result of my participation in kiteboarding activities.",
                  "I will take full responsibility for any injury I may suffer or inflict upon others or their property as a result of engaging in kiteboarding activities.",
                  "I agree to operate kiteboarding equipment in a reasonable and safe manner so as not to endanger persons or property.",
                  "This release shall remain in full force and effect for as long as I engage in kiteboarding activities connected to the released parties.",
                  "I confirm that I am at least 18 years of age, or that as the parent or legal guardian I waive and release any and all legal rights that may accrue to me or my minor child as a result of any injury suffered while engaging in kiteboarding activities.",
                ]}
              />
            </Section>

            <Section title="Rental Equipment Agreement">
              <p>The following terms apply to all equipment rentals from Kiteboarding Bonaire:</p>
              <NumberedList
                items={[
                  "The customer is 100% responsible for all rented equipment from the moment of pickup until return.",
                  "All equipment must be inspected together with a Kiteboarding Bonaire employee before use. Any pre-existing damage must be noted at this time.",
                  "Rental prices are based on half-day (under 4 hours) or full-day (4 hours or more) rates.",
                  "All equipment must be returned before 17:00, dry and repacked to the Kite Bus manager.",
                  "Equipment must be returned in the same condition it was received. Kiteboarding Bonaire reserves the right to charge repair or replacement costs for any damage beyond normal wear.",
                ]}
              />

              <p className="mt-6 mb-4 font-body text-[15px]">In the event of loss or damage, the following charges apply:</p>
              <div className="border-2 overflow-hidden" style={{ borderColor: INK }}>
                <div className="grid grid-cols-2" style={{ background: INK }}>
                  <div className="p-4 font-display font-black text-[11px] uppercase tracking-widest text-white">Item</div>
                  <div className="p-4 font-display font-black text-[11px] uppercase tracking-widest text-white border-l border-white/20">
                    Charge
                  </div>
                </div>
                {damageCharges.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 border-t"
                    style={{
                      borderColor: "rgba(0,0,0,0.1)",
                      background: i % 2 === 0 ? "#fff" : "hsl(42,35%,98%)",
                    }}
                  >
                    <div className="p-4 font-body text-[14px]" style={{ color: "rgba(0,0,0,0.8)" }}>
                      {row.item}
                    </div>
                    <div className="p-4 font-display font-black text-[15px] border-l border-black/10" style={{ color: INK }}>
                      {row.charge}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4">To rent equipment you must be a competent kitesurfer assessed by a Kiteboarding Bonaire employee, or hold an IKO Level 4 certification or higher.</p>
            </Section>

            <Section title="Governing Law">
              <p>Bonaire is a special municipality of the Netherlands. These terms are governed by Dutch law. Any disputes that cannot be resolved directly with us may be brought before the competent court in the Netherlands.</p>
            </Section>

            <Section title="Contact">
              <p>
                For questions about these terms, contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: CYAN }} className="underline hover:opacity-80">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Section>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
