"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NAVY_DEEP    = "hsl(211,100%,12%)";
const WHATSAPP_URL = "https://wa.me/5997015483?text=Hi!%20I%20have%20a%20question%20about%20Kiteboarding%20Bonaire";

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: NAVY_DEEP }}>

      {/* ── MAIN ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-16 py-28">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-2xl mx-auto">

          <motion.span variants={fadeUp} className="font-display font-black text-white/5 select-none block leading-none" style={{ fontSize: "clamp(140px, 30vw, 320px)" }}>
            404
          </motion.span>

          <motion.div variants={fadeUp} className="-mt-8 md:-mt-16 relative z-10">
            <p className="category-label mb-6 block text-accent">Page not found</p>
            <h1 className="font-display font-black text-white uppercase tracking-tighter mb-6 text-[clamp(36px,6vw,72px)] leading-[0.95]">
              The wind took<br />this page.
            </h1>
            <p className="text-white/70 font-body text-base leading-relaxed mb-12 max-w-md mx-auto">
              Whatever you were looking for isn't here. Head back to the beach and we'll get you sorted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-cyan text-base w-full sm:w-auto">Back to Home</Link>
              <Link href="/lessons" className="btn-outline-white text-base w-full sm:w-auto">View Lessons</Link>
            </div>
            <p className="text-white/40 font-body text-sm mt-10">
              Still lost?{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/70">WhatsApp us</a>.
            </p>
          </motion.div>

        </motion.div>
      </div>

      <div className="h-[3px] bg-accent" />

    </div>
  );
}
