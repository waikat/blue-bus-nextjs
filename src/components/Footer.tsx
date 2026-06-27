"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { WindCard } from "@/components/WindCard";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z" />
      <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor" stroke="none" />
    </svg>
  );
}

const NAVY     = "hsl(213,85%,28%)";
const CYAN     = "hsl(186,100%,42%)";
const WHATSAPP = "https://wa.me/5997015483?text=Hi!%20I'd%20like%20to%20know%20more%20about%20kite%20lessons%20in%20Bonaire";

const exploreLinks = [
  { label: "Lessons",   href: "/lessons"  },
  { label: "Rentals",   href: "/rentals"  },
  { label: "Trips",     href: "/trips"    },
  { label: "Live wind", href: "/forecast" },
  { label: "About",     href: "/about"    },
  { label: "FAQ",       href: "/info"     },
];

export default function Footer() {
  return (
    <footer style={{ background: NAVY }} className="relative overflow-hidden">

      {/* Ghost wordmark */}
      <div className="absolute -bottom-16 -left-6 select-none pointer-events-none" aria-hidden>
        <span
          className="font-display font-black uppercase block"
          style={{ fontSize: "clamp(180px,30vw,460px)", color: "rgba(255,255,255,0.03)", lineHeight: 0.82, letterSpacing: "-0.04em" }}
        >
          KB
        </span>
      </div>

      <div className="relative px-8 sm:px-14 lg:px-20 xl:px-28 pt-24 md:pt-32 pb-12">

        {/* Top: statement + CTAs */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 md:pb-20"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="md:col-span-7">
            <p className="font-display font-black uppercase mb-5"
              style={{ color: CYAN, fontSize: 11, letterSpacing: "0.18em" }}>
              The wind&rsquo;s already blowing
            </p>
            <h3 className="font-display font-black uppercase text-white"
              style={{ fontSize: "clamp(48px,7.5vw,116px)", lineHeight: 0.84, letterSpacing: "-0.03em" }}>
              Ride with<br /><span style={{ color: CYAN }}>us.</span>
            </h3>
          </div>

          <div className="md:col-span-5 flex flex-col justify-end gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-black uppercase tracking-widest px-7 py-5 text-center transition-opacity hover:opacity-90"
              style={{ background: CYAN, color: "#fff", fontSize: 13 }}
            >
              WhatsApp us
            </a>
            <Link
              href="/lessons"
              className="font-display font-black uppercase tracking-widest px-7 py-5 text-center transition-colors hover:bg-white/5"
              style={{ border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", fontSize: 13 }}
            >
              Book a lesson
            </Link>
          </div>
        </div>

        {/* Middle: info row */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 py-16">

          {/* Brand + social + wind card */}
          <div className="col-span-2 md:col-span-4">
            <p className="font-display font-black uppercase text-white mb-3"
              style={{ fontSize: 14, letterSpacing: "0.04em" }}>
              Kiteboarding Bonaire
            </p>
            <p className="font-body mb-7"
              style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
              Bonaire&rsquo;s original kite school. Since 2001. Atlantis Beach.
            </p>
            <div className="flex items-center gap-5 mb-8">
              {[
                { Icon: InstagramIcon, href: "https://instagram.com/kiteboardingbonaire", label: "Instagram" },
                { Icon: YoutubeIcon,   href: "#",                                         label: "YouTube"   },
              ].map(({ Icon, href, label }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label} className="text-white/75 hover:text-white transition-colors">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <WindCard />
          </div>

          {/* Quick links */}
          <div className="col-span-1 md:col-span-2">
            <p className="font-display font-black uppercase mb-5"
              style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em" }}>
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="font-body transition-colors hover:text-white"
                    style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-3">
            <p className="font-display font-black uppercase mb-5"
              style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em" }}>
              Find us
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MessageCircle className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: CYAN }} strokeWidth={1.75} />
                <a href={WHATSAPP} className="font-body transition-colors hover:text-white"
                  style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                  +599 701 5483
                  <span className="block mt-0.5" style={{ fontSize: 12, color: "rgba(255,255,255,0.60)" }}>
                    WhatsApp · daily 9–17
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: CYAN }} strokeWidth={1.75} />
                <a href="mailto:info@kiteboardingbonaire.com"
                  className="font-body transition-colors hover:text-white"
                  style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                  info@kiteboardingbonaire.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: CYAN }} strokeWidth={1.75} />
                <span className="font-body" style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                  Atlantis Beach, Kralendijk
                  <span className="block mt-0.5" style={{ fontSize: 12, color: "rgba(255,255,255,0.60)" }}>
                    Wind permitting — usually permits.
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-3">
            <p className="font-display font-black uppercase mb-5"
              style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em" }}>
              Stay in the wind
            </p>
            <p className="font-body mb-5"
              style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
              Trip dates, last-minute openings, swell calls.
            </p>
            <form className="flex flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="px-4 py-3.5 font-body bg-transparent text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.25)", fontSize: 14, borderRadius: 8 }}
              />
              <button type="submit"
                className="font-display font-black uppercase tracking-widest py-3.5 transition-opacity hover:opacity-90"
                style={{ background: "#fff", color: NAVY, fontSize: 11, borderRadius: 0 }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          <p className="font-body" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
            © 2026 Kiteboarding Bonaire · Wind permitting, always.
          </p>
          <div className="flex items-center gap-6">
            {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((l) => (
              <Link key={l.label} href={l.href}
                className="font-body hover:text-white transition-colors"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
