"use client";

import { motion } from "framer-motion";

const NAVY_DEEP = "hsl(211,100%,12%)";

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── UPDATE THESE before going live ──────────────────────────────────────────
const LEGAL_NAME    = "COR Enterprise BV";
const ADDRESS       = "EEG Boulevard, Kralendijk, Caribbean Netherlands";
const CONTACT_EMAIL = "info@kiteboardingbonaire.com";
const LAST_UPDATED  = "April 2026";
// ─────────────────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="border-t-2 border-foreground pt-10 pb-12">
      <h2 className="font-display font-black text-foreground uppercase tracking-tighter mb-6 text-[clamp(20px,2.5vw,30px)] leading-[0.95]">
        {title}
      </h2>
      <div className="space-y-4 text-foreground/80 font-body text-base leading-relaxed max-w-3xl">
        {children}
      </div>
    </motion.div>
  );
}

export default function Privacy() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: NAVY_DEEP }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-6 block text-accent">Legal</motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter text-[clamp(48px,9vw,120px)] leading-[0.95]">
              Privacy<br />Policy
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 font-body text-sm mt-6">
              Last updated: {LAST_UPDATED}
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>

            {/* Intro */}
            <motion.p variants={fadeUp} className="text-foreground font-body text-lg leading-relaxed mb-16 max-w-3xl">
              {LEGAL_NAME} operates Kiteboarding Bonaire and the website kiteboardingbonaire.com. This policy explains what personal data we collect, why we collect it, and how we handle it. We are subject to Dutch law and the General Data Protection Regulation (GDPR) as a special municipality of the Netherlands.
            </motion.p>

            <Section title="Who We Are">
              <p>{LEGAL_NAME}</p>
              <p>{ADDRESS}</p>
              <p>
                For any privacy-related questions or requests, contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline hover:text-accent/70">{CONTACT_EMAIL}</a>.
              </p>
            </Section>

            <Section title="What Data We Collect">
              <p>We collect personal data only when you actively provide it to us. This includes:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "Name and email address when you subscribe to our newsletter through the website footer or Trips page.",
                  "Name, email address and message content when you submit a contact form on the Info page.",
                  "Booking details including name, contact information and payment data when you make a reservation through Viking Bookings.",
                  "Usage data such as pages visited and time on site, collected automatically through Google Analytics if you accept analytics cookies.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 font-black mt-0.5">—</span>{item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Why We Collect It">
              <ul className="space-y-2">
                {[
                  "Newsletter emails are used to send updates about lessons, trips, and events at Kiteboarding Bonaire. You can unsubscribe at any time using the link in every email.",
                  "Contact form submissions are used solely to respond to your inquiry. We do not add you to any mailing list without your consent.",
                  "Booking data is processed by Viking Bookings to manage your reservation. We use it to confirm and communicate about your session.",
                  "Analytics data is used to understand how visitors use our website so we can improve it. This data is anonymized and never linked to your personal identity.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 font-black mt-0.5">—</span>{item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Who We Share It With">
              <p>We do not sell your personal data. We share it only with the third-party services that help us operate:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "Brevo (Sendinblue) — email newsletter platform. Your name and email are stored on their servers to send our newsletter. Brevo is GDPR compliant.",
                  "Viking Bookings — online booking platform. Processes reservation and payment data on our behalf.",
                  "Web3Forms — contact form processing. Receives and forwards contact form submissions to our email. Data is not stored long-term.",
                  "Google Analytics — website analytics. Collects anonymized usage data if you accept analytics cookies. Google is GDPR compliant.",
                  "Google Business — our business profile on Google. If you leave a review, that data is governed by Google's own privacy policy.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 font-black mt-0.5">—</span>{item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Cookies">
              <p>Our website uses the following types of cookies:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "Essential cookies: required for the website and booking system to function. These cannot be disabled.",
                  "Analytics cookies: used by Google Analytics to understand how visitors use our site. These are only set with your consent.",
                  "Third-party cookies: the Viking Bookings booking widget may set its own session cookies when you interact with it. These are governed by Viking Bookings' privacy policy.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 font-black mt-0.5">—</span>{item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">You can manage your cookie preferences at any time using the cookie settings button at the bottom of this page.</p>
            </Section>

            <Section title="How Long We Keep Your Data">
              <ul className="space-y-2">
                {[
                  "Newsletter subscribers: until you unsubscribe.",
                  "Contact form submissions: until your inquiry is resolved, then deleted.",
                  "Booking data: retained for as long as legally required for financial records (7 years under Dutch law).",
                  "Analytics data: retained for 26 months, then automatically deleted by Google.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 font-black mt-0.5">—</span>{item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Your Rights">
              <p>Under GDPR you have the right to:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "Access the personal data we hold about you.",
                  "Correct any inaccurate data.",
                  "Request deletion of your data (right to be forgotten).",
                  "Object to or restrict how we process your data.",
                  "Withdraw consent at any time without affecting the lawfulness of prior processing.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 font-black mt-0.5">—</span>{item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                To exercise any of these rights, email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline hover:text-accent/70">{CONTACT_EMAIL}</a>.
                We will respond within 30 days.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                We may update this policy from time to time. The date at the top of this page shows when it was last revised. Continued use of our website after changes are posted means you accept the updated policy.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                For questions about this privacy policy or how we handle your data, contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline hover:text-accent/70">{CONTACT_EMAIL}</a>.
              </p>
            </Section>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
