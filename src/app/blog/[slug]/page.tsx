"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getPost, getRelatedPosts, type Section } from "@/content/blog/posts";

const NAVY_DEEP = "hsl(211,100%,12%)";

const CATEGORY_COLORS: Record<string, string> = {
  "Beginner":   "bg-accent text-white",
  "Technique":  "bg-primary text-white",
  "Safety":     "bg-foreground text-background",
  "Spot Guide": "bg-accent text-white",
  "Gear":       "bg-primary text-white",
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function RenderSection({ section }: { section: Section }) {
  switch (section.type) {
    case "intro":
      return (
        <p className="font-body text-foreground text-xl leading-relaxed mb-8 font-medium">
          {section.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="font-display font-black text-foreground uppercase tracking-tighter text-2xl md:text-3xl leading-[0.95] mt-12 mb-5">
          {section.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mb-6">
          {section.text}
        </p>
      );
    case "list":
      return (
        <ul className="space-y-3 mb-8">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 font-body text-foreground/80 text-base leading-relaxed">
              <span className="text-accent font-black flex-shrink-0 mt-1">—</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol className="space-y-4 mb-8">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-4 font-body text-foreground/80 text-base leading-relaxed">
              <span className="font-display font-black text-accent text-lg leading-none flex-shrink-0 mt-0.5">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div className="border-l-4 border-accent bg-accent/5 p-6 my-8">
          <p className="font-body text-foreground text-base leading-relaxed">
            <span className="font-display font-black text-accent uppercase tracking-widest text-xs block mb-2">Pro tip</span>
            {section.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const post = getPost(slug);
  const related = getRelatedPosts(slug);

  useEffect(() => {
    if (!post) router.replace("/blog");
  }, [post, router]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ background: NAVY_DEEP }} className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-accent transition-colors font-body text-sm uppercase tracking-widest mb-10">
                <ArrowLeft className="w-4 h-4" />
                All posts
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className={`font-display font-black text-xs uppercase tracking-widest px-3 py-1 ${CATEGORY_COLORS[post.category]}`}>
                {post.category}
              </span>
              <span className="text-white/40 font-body text-sm flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />{post.readTime} read
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display font-black text-white uppercase tracking-tighter text-[clamp(36px,6vw,80px)] leading-[0.92] mb-8">
              {post.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 font-body text-sm">
              {formatDate(post.date)} · Kiteboarding Bonaire
            </motion.p>
          </motion.div>
        </div>
        <div className="h-[3px] bg-accent mt-16" />
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {post.content.map((section, i) => (
              <motion.div key={i} variants={fadeUp}>
                <RenderSection section={section} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOOK CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="category-label mb-4">Ready to put this into practice?</p>
              <h2 className="font-display font-black text-white uppercase tracking-tighter text-[clamp(28px,4vw,52px)] leading-[0.95]">
                Book a lesson at<br />Atlantis Beach
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link href="/lessons" className="btn-cyan text-base w-full sm:w-auto text-center">View Lessons</Link>
              <a href="https://wa.me/5997015483" target="_blank" rel="noopener noreferrer" className="btn-outline-white text-base w-full sm:w-auto text-center">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED POSTS ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <p className="category-label mb-10 block">More from the blog</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-foreground">
              {related.map((rpost, i) => (
                <Link
                  key={rpost.slug}
                  href={`/blog/${rpost.slug}`}
                  className={`group flex flex-col p-8 hover:bg-muted transition-colors ${i < related.length - 1 ? "border-b-2 md:border-b-0 md:border-r-2 border-foreground" : ""}`}
                >
                  <span className={`inline-block self-start font-display font-black text-[10px] uppercase tracking-widest px-2.5 py-1 mb-6 ${CATEGORY_COLORS[rpost.category]}`}>
                    {rpost.category}
                  </span>
                  <h3 className="font-display font-black text-foreground uppercase tracking-tighter leading-[0.95] text-lg mb-4 group-hover:text-accent transition-colors flex-1">
                    {rpost.title}
                  </h3>
                  <span className="text-foreground/40 font-body text-xs mt-auto pt-4 border-t border-foreground/10">{formatDate(rpost.date)}</span>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/blog" className="btn-outline-dark text-sm inline-block">View All Posts</Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
