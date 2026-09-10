"use client";

import Link from "next/link";
import { successStories, testimonials } from "@/data/courses";
import { borderSoft, colors, gradient, heroWash } from "@/lib/theme";
import { BookOpen, Star, Target, UserRound, Wallet } from "lucide-react";

// ─── Stats ────────────────────────────────────────────────────────────────────

const placementStats = [
  { n: "3,000+", l: "Total Graduates", c: colors.teal },
  { n: "82%", l: "Placement Rate", c: colors.blue },
  { n: "NPR 60K+", l: "Avg Starting Salary", c: colors.green },
  { n: "200+", l: "Hiring Partners", c: "#f4a44a" },
];

const ratingStats = [
  { n: "4.9/5", l: "Average Rating" },
  { n: "3,000+", l: "Reviews" },
  { n: "98%", l: "Would Recommend" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function StoriesPage() {
  const testimonialsDoubled = [...testimonials, ...testimonials];

  return (
    <>
      <div className="pt-16 min-h-screen" style={{ backgroundColor: colors.bg }}>

        {/* ── Hero ── */}
        <section
          className="border-b px-6 py-20"
          style={{ background: heroWash, borderColor: borderSoft }}
        >
          <div className="max-w-[1240px] mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-6"
              style={{
                backgroundColor: `${colors.teal}18`,
                borderColor: `${colors.teal}40`,
                color: colors.tealInk,
              }}
            >
              Success Stories &amp; Testimonials
            </div>
            <h1
              className="font-display font-bold mb-4"
              style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: colors.navy }}
            >
              Real People.{" "}
              <span className="nm-gradient-text">Real Careers.</span>
            </h1>
            <p
              className="text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ color: colors.body }}
            >
              From beginners to employed IT professionals — meet the graduates
              who changed their lives through Next Minds, and hear what they
              have to say.
            </p>

            {/* Rating stats */}
            <div className="flex justify-center gap-8 sm:gap-12">
              {ratingStats.map((s) => (
                <div key={s.l}>
                  <div className="font-display font-bold text-2xl sm:text-3xl" style={{ color: colors.navy }}>
                    {s.n}
                  </div>
                  <div className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: colors.muted }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Placement stats bar ── */}
        <section
          className="py-10 px-6 border-b"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {placementStats.map((s) => (
              <div
                key={s.l}
                className="rounded-2xl p-5 text-center"
                style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}` }}
              >
                <div className="font-display text-3xl font-bold mb-1" style={{ color: s.c }}>
                  {s.n}
                </div>
                <div className="text-xs" style={{ color: colors.muted }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Success Story Cards ── */}
        <section className="py-20 px-6">
          <div className="max-w-[1240px] mx-auto">
            <div className="mb-12 text-center">
              <h2
                className="font-display font-bold mb-3"
                style={{ fontSize: "clamp(1.6rem,3vw,2.5rem)", color: colors.navy }}
              >
                Graduate Spotlights
              </h2>
              <p style={{ color: colors.muted }}>
                Meet the alumni who turned their learning into a career.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((s) => (
                <div
                  key={s.id}
                  className="rounded-3xl overflow-hidden transition-all hover:-translate-y-1.5"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    boxShadow: "0 2px 12px rgba(13,45,82,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${colors.teal}40`;
                    e.currentTarget.style.boxShadow = "0 16px 50px rgba(13,45,82,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(13,45,82,0.06)";
                  }}
                >
                  <div className="p-6 pb-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${colors.teal}20, ${colors.blue}20)`,
                        }}
                      >
                        <UserRound size={24} aria-hidden="true" className="text-nm-teal" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold" style={{ color: colors.navy }}>
                          {s.name}
                        </h3>
                        <p className="text-xs" style={{ color: colors.teal }}>
                          {s.role}
                        </p>
                        <p className="text-xs" style={{ color: colors.muted }}>
                          {s.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <div
                      className="flex items-center gap-2 mb-4 p-3 rounded-xl"
                      style={{ backgroundColor: colors.surface }}
                    >
                      <div className="text-center flex-1">
                        <div
                          className="text-xs mb-0.5 uppercase font-bold tracking-wide"
                          style={{ color: colors.muted }}
                        >
                          Before
                        </div>
                        <div className="text-xs font-semibold" style={{ color: colors.body }}>
                          {s.before}
                        </div>
                      </div>
                      <div className="text-xl flex-shrink-0" style={{ color: colors.teal }}>
                        →
                      </div>
                      <div className="text-center flex-1">
                        <div
                          className="text-xs mb-0.5 uppercase font-bold tracking-wide"
                          style={{ color: colors.muted }}
                        >
                          After
                        </div>
                        <div className="text-xs font-semibold" style={{ color: colors.navy }}>
                          {s.after}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: `${colors.green}15`, color: colors.green }}
                      >
                        <Wallet size={14} aria-hidden="true" className="inline mr-1.5 -mt-0.5" />
                        {s.salary}
                      </span>
                      <span
                        className="text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: `${colors.teal}10`, color: colors.teal }}
                      >
                        <BookOpen size={14} aria-hidden="true" className="inline mr-1.5 -mt-0.5" />
                        {s.course}
                      </span>
                    </div>

                    <blockquote
                      className="text-sm leading-relaxed italic"
                      style={{ color: colors.body }}
                    >
                      &quot;{s.quote}&quot;
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials Grid ── */}
        <section className="py-20 px-6" style={{ backgroundColor: colors.surface }}>
          <div className="max-w-[1240px] mx-auto">
            <div className="mb-12 text-center">
              <h2
                className="font-display font-bold mb-3"
                style={{ fontSize: "clamp(1.6rem,3vw,2.5rem)", color: colors.navy }}
              >
                What Our <span style={{ color: colors.teal }}>Students Say</span>
              </h2>
              <p style={{ color: colors.muted }}>
                Over 3,000 students have passed through our doors. Here&apos;s what a few of
                them have to say.
              </p>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
              {testimonialsDoubled.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="break-inside-avoid mb-5 rounded-2xl p-5 transition-all hover:-translate-y-0.5 inline-block w-full"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    boxShadow: "0 2px 8px rgba(13,45,82,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${colors.teal}40`;
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(13,45,82,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,45,82,0.05)";
                  }}
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={15} aria-hidden="true" className="fill-warning text-warning" />
                    ))}
                  </div>
                  <blockquote
                    className="text-sm leading-relaxed mb-4 italic"
                    style={{ color: colors.body }}
                  >
                    &quot;{t.quote}&quot;
                  </blockquote>
                  <div
                    className="flex items-center gap-3 border-t pt-3"
                    style={{ borderColor: colors.border }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors.teal}20, ${colors.blue}20)`,
                      }}
                    >
                      <UserRound size={24} aria-hidden="true" className="text-nm-teal" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: colors.navy }}>
                        {t.name}
                      </div>
                      <div className="text-xs" style={{ color: colors.muted }}>
                        {t.role} · {t.course}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Target size={44} aria-hidden="true" className="mx-auto mb-4 text-nm-teal-ink" />
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: colors.navy }}>
              Your story starts here.
            </h2>
            <p className="text-lg mb-8" style={{ color: colors.muted }}>
              Join 3,000+ graduates who turned their learning into a career.
            </p>
            <Link
              href="/courses"
              className="font-bold px-8 py-4 rounded-xl text-white inline-block"
              style={{ background: gradient }}
            >
              Browse Courses →
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
