"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { posts } from "@/content/blog/posts";
import { ArrowUpRight } from "lucide-react";

const NAVY_DEEP = "hsl(211,100%,12%)";

const CATEGORY_COLORS: Record<string, string> = {
  "Beginner":   "bg-accent text-white",
  "Technique":  "bg-primary text-white",
  "Safety":     "bg-foreground text-background",
  "Spot Guide": "bg-accent text-white",
  "Gear":       "bg-primary text-white",
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="category-label mb-6 block">From the beach</motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter text-[clamp(56px,10vw,140px)] leading-[0.87]">
              The<br />Blog
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 font-body text-lg mt-6 max-w-xl leading-relaxed">
              Kitesurfing tips, spot guides, technique breakdowns and stories from Atlantis Beach.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent" />
      </section>

      {/* ── FEATURED POST ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="category-label mb-8 block">Latest post</p>
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-end">
            <div>
              <span className={`inline-block font-display font-black text-xs uppercase tracking-widest px-3 py-1 mb-6 ${CATEGORY_COLORS[featured.category]}`}>
                {featured.category}
              </span>
              <h2 className="font-display font-black text-foreground uppercase tracking-tighter leading-[0.92] group-hover:text-accent transition-colors text-[clamp(28px,4vw,52px)] mb-6">
                {featured.title}
              </h2>
              <div className="flex items-center gap-6 text-foreground/50 font-body text-sm mb-8">
                <span>{formatDate(featured.date)}</span>
                <span>{featured.readTime} read</span>
              </div>
              <div className="flex items-center gap-3 font-display font-black text-sm uppercase tracking-widest text-accent group-hover:gap-5 transition-all">
                Read article
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-foreground/70 font-body text-lg leading-relaxed">{featured.excerpt}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ALL POSTS GRID ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-foreground"
          >
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                variants={fadeUp}
                className={`${i % 3 !== 2 ? "md:border-r-2 border-foreground" : ""} ${i < rest.length - 3 ? "border-b-2 border-foreground" : ""} ${i >= rest.length - (rest.length % 3 || 3) ? "" : ""}`}
              >
                <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full p-8 hover:bg-muted transition-colors">
                  <span className={`inline-block self-start font-display font-black text-[10px] uppercase tracking-widest px-2.5 py-1 mb-6 ${CATEGORY_COLORS[post.category]}`}>
                    {post.category}
                  </span>
                  <h3 className="font-display font-black text-foreground uppercase tracking-tighter leading-[0.95] text-xl mb-4 group-hover:text-accent transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-foreground/60 font-body text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-foreground/10">
                    <span className="text-foreground/40 font-body text-xs">{formatDate(post.date)}</span>
                    <span className="text-foreground/40 font-body text-xs">{post.readTime} read</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW TO ADD A POST ────────────────────────────────────────── */}
      {/* 
        TO ADD A NEW BLOG POST:
        1. Open src/content/blog/posts.ts
        2. Add a new object to the posts array following the same structure
        3. Set a unique slug (this becomes the URL: /blog/your-slug)
        4. Save the file — the post appears automatically on the blog and in the grid
        No other changes needed.
      */}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-black text-white uppercase tracking-tighter mb-4 text-[clamp(32px,5vw,64px)] leading-[0.95]">
            Ready to Get on the Water?
          </h2>
          <p className="text-white/70 font-body mb-10 text-sm uppercase tracking-[0.2em]">
            Atlantis Beach. Every day from 9am.
          </p>
          <Link href="/lessons" className="btn-cyan text-base inline-block">Book a Lesson</Link>
        </div>
      </section>

    </div>
  );
}
