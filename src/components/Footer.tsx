"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/Kiteboarding-bonaire-logo.gif";

const BREVO_API_KEY = "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";
const BREVO_LIST_ID = 2;

const WHATSAPP_NUMBER = "+5997015483";
const WHATSAPP_URL    = `https://wa.me/5997015483?text=Hi!%20I'm%20interested%20in%20kitesurfing%20at%20Bonaire`;
const PHONE_NUMBER    = "+599 701 5483";
const EMAIL           = "info@kiteboardingbonaire.com";

const quickLinks = [
  { label: "Lessons",         href: "/lessons"  },
  { label: "Rentals",         href: "/rentals"  },
  { label: "Trips & Safaris", href: "/trips"    },
  { label: "Live Forecast",   href: "/forecast" },
  { label: "About Us",        href: "/about"    },
  { label: "FAQ & Policies",  href: "/info"     },
];

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const socialLinks = [
  { href: "https://www.instagram.com/kiteboardingbonaire/",            label: "Instagram", color: "hover:text-[#E4405F]", Icon: IconInstagram },
  { href: "https://www.youtube.com/channel/UCetyGj1HHc4_T3a60_LDRSQ", label: "YouTube",   color: "hover:text-[#FF0000]", Icon: IconYoutube   },
  { href: WHATSAPP_URL,                                                 label: "WhatsApp",  color: "hover:text-[#25D366]", Icon: () => <MessageCircle size={20} /> },
];

async function subscribeToBrevo(email: string): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (res.status === 201 || res.status === 204) {
      return { ok: true, message: "You're on the list!" };
    }

    const data = await res.json().catch(() => ({}));
    if ((data as any)?.code === "duplicate_parameter") {
      return { ok: true, message: "You're already subscribed!" };
    }

    return { ok: false, message: "Something went wrong. Try again." };
  } catch {
    return { ok: false, message: "Network error. Try again." };
  }
}

export default function Footer() {
  const [email,   setEmail]   = useState("");
  const [status,  setStatus]  = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const result = await subscribeToBrevo(email);
    setStatus(result.ok ? "success" : "error");
    setMessage(result.message);
    if (result.ok) setEmail("");
  }

  return (
    <footer className="bg-primary text-primary-foreground">

      {/* STINAPA Warning Bar */}
      <div style={{ background: "linear-gradient(90deg, #4caf50, #f5c518, #e8643c)", color: "#1a1a1a" }} className="py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-body font-bold text-sm uppercase tracking-wider">
            ⚠️ Mandatory STINAPA Nature Fee Required.{" "}
            <a href="https://stinapa.bonairenaturefee.org/" target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4 hover:opacity-70 transition-opacity">
              Purchase online at stinapa.bonairenaturefee.org
            </a>
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1: Logo and About */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img src={logo.src} alt="Kiteboarding Bonaire" className="h-16 w-auto" />
            </Link>
            <p className="text-primary-foreground/80 font-body text-sm mb-4 leading-relaxed">
              Bonaire's original kite school since 2001. IKO certified instructors, professional lessons and premium rental gear on Atlantis Beach.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 border-2 border-primary-foreground/30 flex items-center justify-center transition-all ${social.color} hover:border-current`}
                  aria-label={social.label}
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-display font-black text-sm uppercase tracking-widest mb-5 text-primary-foreground">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-primary-foreground/80 hover:text-accent transition-colors uppercase tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-1">
            <h3 className="font-display font-black text-sm uppercase tracking-widest mb-5 text-primary-foreground">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-primary-foreground/80 hover:text-[#25D366] transition-colors">
                  <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-body text-sm font-bold uppercase tracking-wide">WhatsApp</div>
                    <div className="font-body text-xs text-primary-foreground/70">{PHONE_NUMBER}</div>
                  </div>
                </a>
              </li>
              <li>
                <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-body text-sm font-bold uppercase tracking-wide">Phone</div>
                    <div className="font-body text-xs text-primary-foreground/70">{PHONE_NUMBER}</div>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-body text-sm font-bold uppercase tracking-wide">Email</div>
                    <div className="font-body text-xs text-primary-foreground/70 break-all">{EMAIL}</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-foreground/80">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-body text-sm font-bold uppercase tracking-wide">Location</div>
                    <div className="font-body text-xs text-primary-foreground/70">Atlantis Beach, Kralendijk, Bonaire</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours and Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-display font-black text-sm uppercase tracking-widest mb-5 text-primary-foreground">Hours</h3>
            <div className="text-primary-foreground/80 font-body text-sm mb-6">
              <p className="font-bold uppercase tracking-wide mb-1 text-primary-foreground">Daily</p>
              <p>9:00 AM to 5:00 PM</p>
              <p className="text-xs mt-1 text-primary-foreground/70">Wind permitting</p>
            </div>
            <h3 className="font-display font-black text-sm uppercase tracking-widest mb-4 text-primary-foreground">Stay Updated</h3>
            <p className="text-primary-foreground/80 font-body text-sm mb-4">
              Get news, trip updates and exclusive offers.
            </p>
            <form className="flex gap-2" onSubmit={handleNewsletter}>
              <label htmlFor="newsletter-email" className="sr-only">Your email</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="flex-1 px-4 py-2 bg-primary-foreground/10 border-2 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 font-body text-sm focus:outline-none focus:border-accent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-4 py-2 bg-accent hover:brightness-110 text-white font-display font-black text-sm uppercase border-2 border-accent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "..." : "Go"}
              </button>
            </form>
            {message && (
              <p className={`mt-2 font-body text-xs ${status === "success" ? "text-[#4ade80]" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/15">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 font-body text-xs">
              {`© ${new Date().getFullYear()} Kiteboarding Bonaire. All rights reserved.`}
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-primary-foreground/60 hover:text-accent transition-colors font-body text-xs uppercase tracking-wide">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-foreground/60 hover:text-accent transition-colors font-body text-xs uppercase tracking-wide">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
