"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { borderSoft, colors, ctaBody, ctaGradient, gradient, heroWash, statGradient } from "@/lib/theme";
import { stats as instituteStats } from "@/lib/stats";
import {
  Briefcase,
  Code2,
  Cpu,
  Globe,
  GraduationCap,
  Hammer,
  Handshake,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Rajesh Shrestha",
    role: "Founder & CEO",
    bio: "10+ years building Nepal's tech talent ecosystem. Ex-software engineer turned educator.",
    dept: "Leadership",
    icon: Sparkles,
    linkedin: "https://linkedin.com",
    email: "rajesh@nextminds.io",
  },
  {
    name: "Priya Tamang",
    role: "Head of Curriculum",
    bio: "Curriculum designer with a background in instructional design and 8 years in ed-tech.",
    dept: "Academics",
    icon: GraduationCap,
    linkedin: "https://linkedin.com",
    email: "priya@nextminds.io",
  },
  {
    name: "Suman Adhikari",
    role: "Lead Instructor — Cyber Security",
    bio: "Certified ethical hacker (CEH). Previously worked in enterprise security for Nepal Telecom.",
    dept: "Security",
    icon: ShieldCheck,
    linkedin: "https://linkedin.com",
    email: "suman@nextminds.io",
  },
  {
    name: "Anita Maharjan",
    role: "Lead Instructor — Data Science",
    bio: "Data scientist with 6 years at Leapfrog Technology. MSc in Data Analytics, NTU Singapore.",
    dept: "AI & Data",
    icon: Cpu,
    linkedin: "https://linkedin.com",
    email: "anita@nextminds.io",
  },
  {
    name: "Bikash Poudel",
    role: "Head of Career Services",
    bio: "Placement specialist, building our hiring-partner network across Nepal's IT sector.",
    dept: "Placements",
    icon: Briefcase,
    linkedin: "https://linkedin.com",
    email: "bikash@nextminds.io",
  },
  {
    name: "Samrita KC",
    role: "Lead Instructor — Full Stack",
    bio: "Full-stack developer and open-source contributor. MERN & Django specialist.",
    dept: "Software Eng",
    icon: Code2,
    linkedin: "https://linkedin.com",
    email: "samrita@nextminds.io",
  },
];

const values = [
  {
    icon: Target,
    title: "Outcome-Focused",
    desc: "We measure success by your job placement and salary growth — not just course completions.",
  },
  {
    icon: Hammer,
    title: "Hands-On First",
    desc: "Every concept is followed by a project. You leave with a portfolio, not just a certificate.",
  },
  {
    icon: Globe,
    title: "Nepal-Centered",
    desc: "Our curriculum is built for Nepal's tech market — teaching tools, frameworks, and companies that are hiring here.",
  },
  {
    icon: Handshake,
    title: "Accessible Education",
    desc: "EMI options, scholarships, and flexible schedules so nothing stops talented people from learning.",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Founded",
    desc: "Next Minds opens in New Baneshwor with 30 students and 2 courses.",
  },
  {
    year: "2020",
    title: "Online Launch",
    desc: "Pivoted to online delivery. 300+ students enrolled during the first virtual batch.",
  },
  {
    year: "2022",
    title: "1,000 Graduates",
    desc: "Reached 1,000 course completions. Placement rate crosses 82%.",
  },
  {
    year: "2023",
    title: "Enterprise Program",
    desc: "Launched corporate training. First 10 B2B clients onboarded within 6 months.",
  },
  {
    year: "2024",
    title: "AI Integration",
    desc: "All programs updated with AI & GenAI modules. AI-augmented teaching tools deployed.",
  },
  {
    year: "2025",
    title: "New Campus Expansion",
    desc: "Expanded to 4 full-time classrooms across all programs.",
  },
];

// Was 3,000+ graduates / 200+ partners here against 1,200+ students / 50+
// partners on the homepage. Same source now, so the pages cannot disagree.
const aboutStats = [
  { n: instituteStats.studentsTrained, l: "Students Trained", c: colors.teal },
  { n: "8+", l: "IT Courses", c: colors.blue },
  { n: instituteStats.placementRate, l: "Placement Rate", c: colors.green },
  { n: instituteStats.hiringPartners, l: "Hiring Partners", c: "#f4a44a" },
];

/** "Rajesh Shrestha" -> "RS". Stands in until real team photos are supplied. */
function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-2 text-[13px] font-bold uppercase tracking-[0.06em]"
      style={{ color: colors.tealInk }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ── Hero — runs on mount, no ScrollTrigger ── */
      gsap.from(".about-hero-eyebrow", {
        opacity: 0,
        y: 18,
        duration: 0.55,
        ease: "power3.out",
      });
      gsap.from(".about-hero-h1", {
        opacity: 0,
        y: 28,
        duration: 0.65,
        delay: 0.12,
        ease: "power3.out",
      });
      gsap.from(".about-hero-sub", {
        opacity: 0,
        y: 20,
        duration: 0.55,
        delay: 0.24,
        ease: "power3.out",
      });

      /* ── Stats bar — stagger in ── */
      gsap.from(".about-stat", {
        scrollTrigger: { trigger: ".about-stats-bar", start: "top 88%" },
        opacity: 0,
        y: 22,
        stagger: 0.1,
        duration: 0.55,
        ease: "power2.out",
      });

      /* ── Mission copy — slide from left ── */
      gsap.from(".about-mission-copy", {
        scrollTrigger: { trigger: ".about-mission-copy", start: "top 85%" },
        opacity: 0,
        x: -36,
        duration: 0.65,
        ease: "power2.out",
      });

      /* ── Values cards — pop up with spring feel ── */
      gsap.from(".about-value-card", {
        scrollTrigger: { trigger: ".about-values-grid", start: "top 85%" },
        opacity: 0,
        y: 30,
        scale: 0.96,
        stagger: 0.1,
        duration: 0.55,
        ease: "back.out(1.4)",
      });

      /* ── Timeline rows — alternate left/right slide ── */
      document.querySelectorAll(".about-timeline-row").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          opacity: 0,
          x: i % 2 === 0 ? -40 : 40,
          duration: 0.55,
          ease: "power2.out",
        });
      });

      /* ── Team section header ── */
      gsap.fromTo(
        ".about-team-header",
        { opacity: 0, y: 22 },
        {
          scrollTrigger: { trigger: ".about-team-header", start: "top 88%", once: true },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "all",
        }
      );

      /* ── Team cards — stagger up with spring pop ── */
      gsap.fromTo(
        ".about-team-card",
        { opacity: 0, y: 36, scale: 0.94 },
        {
          scrollTrigger: { trigger: ".about-team-grid", start: "top 85%", once: true },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "back.out(1.2)",
          clearProps: "all",
        }
      );

      /* ── Team avatars pop ── */
      gsap.fromTo(
        ".about-team-avatar-inner",
        { scale: 0.75, opacity: 0, rotate: -8 },
        {
          scrollTrigger: { trigger: ".about-team-grid", start: "top 85%", once: true },
          scale: 1,
          opacity: 1,
          rotate: 0,
          stagger: 0.08,
          duration: 0.65,
          delay: 0.1,
          ease: "back.out(1.4)",
          clearProps: "all",
        }
      );

      /* ── CTA ── */
      gsap.from(".about-cta-inner", {
        scrollTrigger: { trigger: ".about-cta-inner", start: "top 88%" },
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: rootRef }
  );

  return (
    <>
      <div ref={rootRef} className="min-h-screen pt-16" style={{ backgroundColor: colors.bg }}>
        {/* ── Hero ── */}
        <section className="px-6 py-16" style={{ background: heroWash }}>
          <div className="mx-auto max-w-[900px] text-center">
            <div className="about-hero-eyebrow">
              <Eyebrow>Our Story</Eyebrow>
            </div>
            <h1
              className="about-hero-h1 font-display mb-4.5 font-extrabold leading-[1.1] tracking-[-0.9px]"
              style={{ fontSize: "clamp(28px,4.6vw,44px)", color: colors.navy }}
            >
              We&apos;re building Nepal&apos;s next generation of IT talent
            </h1>
            <p
              className="about-hero-sub mx-auto max-w-[640px] text-base leading-[1.6]"
              style={{ color: colors.body }}
            >
              Since 2018, Next Minds Infosys has been on a single mission: make world-class IT
              education accessible to every ambitious Nepali — regardless of background, location,
              or prior experience.
            </p>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section
          className="about-stats-bar border-y px-6 py-7"
          style={{ borderColor: borderSoft }}
        >
          <div className="mx-auto grid max-w-[1000px] gap-6 text-center [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
            {aboutStats.map((s) => (
              <div key={s.l} className="about-stat">
                <div
                  className="bg-clip-text font-extrabold tracking-[-0.5px] text-transparent"
                  style={{ fontSize: "clamp(24px,3vw,32px)", backgroundImage: statGradient }}
                >
                  {s.n}
                </div>
                <div className="mt-1 text-[13px] font-semibold" style={{ color: colors.muted }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="px-6 py-[70px]">
          <div className="mx-auto grid max-w-[1100px] items-start gap-11 lg:grid-cols-[1fr_1fr]">
            <div className="about-mission-copy">
              <Eyebrow>Our Mission</Eyebrow>
              <h2
                className="font-display mb-4.5 font-extrabold leading-[1.15] tracking-[-0.6px]"
                style={{ fontSize: "clamp(24px,3.2vw,32px)", color: colors.navy }}
              >
                Practical skills. Real jobs. Measurable impact.
              </h2>
              <p className="mb-4 text-[15px] leading-[1.65]" style={{ color: colors.body }}>
                Nepal has no shortage of bright minds — it has a shortage of practical IT education
                that connects theory to real industry work. We built Next Minds to close that gap.
              </p>
              <p className="text-[15px] leading-[1.65]" style={{ color: colors.body }}>
                Every course is taught by working professionals, grounded in real projects, and
                backed by our placement team — because a certificate without a career path is just
                paper.
              </p>
            </div>

            <div className="about-values-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="about-value-card rounded-2xl p-5"
                  style={{ backgroundColor: colors.surface }}
                >
                  <div
                    className="mb-3.5 flex h-[38px] w-[38px] items-center justify-center rounded-[10px]"
                    style={{ background: gradient }}
                  >
                    <v.icon size={19} aria-hidden="true" className="text-white" />
                  </div>
                  <h3 className="mb-1.5 text-[15px] font-extrabold" style={{ color: colors.navy }}>
                    {v.title}
                  </h3>
                  <p className="text-[13px] leading-[1.5]" style={{ color: colors.muted }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="px-6 py-[70px]" style={{ backgroundColor: colors.surface }}>
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-11 text-center">
              <Eyebrow>Timeline</Eyebrow>
              <h2
                className="font-display font-extrabold tracking-[-0.6px]"
                style={{ fontSize: "clamp(24px,3.4vw,34px)", color: colors.navy }}
              >
                How we got here
              </h2>
            </div>
            <div className="flex flex-col">
              {timeline.map((t) => (
                <div
                  key={t.year}
                  className="about-timeline-row grid gap-6 py-5 [grid-template-columns:64px_1fr] sm:[grid-template-columns:80px_1fr]"
                  style={{ borderBottom: `1px solid ${colors.border}` }}
                >
                  <div className="text-xl font-extrabold" style={{ color: colors.tealInk }}>
                    {t.year}
                  </div>
                  <div>
                    <div
                      className="mb-1 text-[15.5px] font-extrabold"
                      style={{ color: colors.navy }}
                    >
                      {t.title}
                    </div>
                    <div className="text-[13.5px] leading-[1.5]" style={{ color: colors.muted }}>
                      {t.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="about-team-section px-6 py-20 border-b" style={{ backgroundColor: "#fbfbfd", borderColor: borderSoft }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="about-team-header mb-14 text-center">
              <Eyebrow>Leadership &amp; Instructors</Eyebrow>
              <h2
                className="font-display font-extrabold tracking-[-0.6px] mb-3"
                style={{ fontSize: "clamp(24px,3.4vw,36px)", color: colors.navy }}
              >
                People behind Next Minds
              </h2>
              <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed" style={{ color: colors.muted }}>
                Industry veterans, certified engineers, and career mentors dedicated to turning ambition into thriving tech careers.
              </p>
            </div>

            <div className="about-team-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => {
                const IconComp = m.icon;
                return (
                  <div
                    key={m.name}
                    className="about-team-card group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2"
                    style={{
                      backgroundColor: colors.card,
                      border: `1px solid ${colors.border}`,
                      boxShadow: "0 4px 20px rgba(13,45,82,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${colors.teal}45`;
                      e.currentTarget.style.boxShadow = "0 20px 48px rgba(13,45,82,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,45,82,0.05)";
                    }}
                  >
                    {/* Top gradient accent line on hover */}
                    <div
                      className="absolute top-0 left-6 right-6 h-[3px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: gradient }}
                    />

                    <div>
                      {/* Avatar with double ring and badge */}
                      <div className="relative mx-auto mb-5 w-24 h-24">
                        <div
                          className="about-team-avatar-inner flex h-24 w-24 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-[0_8px_24px_rgba(0,189,184,0.22)] transition-transform duration-300 group-hover:scale-105"
                          style={{ background: gradient }}
                          aria-hidden="true"
                        >
                          {initialsOf(m.name)}
                        </div>
                        <span
                          className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100 transition-transform duration-300 group-hover:rotate-12"
                          style={{ color: colors.tealInk }}
                        >
                          <IconComp size={16} aria-hidden="true" />
                        </span>
                      </div>

                      {/* Header info */}
                      <div className="text-center mb-3">
                        <h3
                          className="font-display text-lg font-bold transition-colors duration-200 group-hover:text-nm-teal"
                          style={{ color: colors.navy }}
                        >
                          {m.name}
                        </h3>
                        <div
                          className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: `${colors.teal}14`,
                            color: colors.tealInk,
                            border: `1px solid ${colors.teal}30`,
                          }}
                        >
                          {m.role}
                        </div>
                      </div>

                      {/* Bio */}
                      <p
                        className="text-[13px] leading-relaxed text-center px-1 mb-5"
                        style={{ color: colors.muted }}
                      >
                        {m.bio}
                      </p>
                    </div>

                    {/* Card Footer: Department & Socials */}
                    <div
                      className="flex items-center justify-between border-t pt-4 mt-auto"
                      style={{ borderColor: colors.border }}
                    >
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: colors.muted }}
                      >
                        {m.dept}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name}'s LinkedIn`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-nm-teal hover:bg-slate-100 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
                          </svg>
                        </a>
                        <a
                          href={`mailto:${m.email}`}
                          aria-label={`Email ${m.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-nm-teal hover:bg-slate-100 transition-colors"
                        >
                          <Mail size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-6 py-[70px] text-white" style={{ background: ctaGradient }}>
          <div className="about-cta-inner mx-auto max-w-[700px] text-center">
            <h2
              className="font-display mb-3 font-extrabold tracking-[-0.6px]"
              style={{ fontSize: "clamp(24px,3.6vw,32px)" }}
            >
              Ready to start your journey?
            </h2>
            <p className="mb-7 text-[15px]" style={{ color: ctaBody }}>
              Explore our courses or reach out — we&apos;re happy to help you find the right path.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/courses"
                className="rounded-xl bg-white px-7 py-3.5 text-[15px] font-bold"
                style={{ color: colors.navyDeep }}
              >
                Browse Courses
              </Link>
              <Link
                href="/contact"
                className="rounded-xl px-7 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.3)" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
