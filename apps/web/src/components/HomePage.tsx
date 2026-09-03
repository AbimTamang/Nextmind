"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { testimonials } from "@/data/courses";
import type { CourseCard } from "@/db/queries";
import { stats } from "@/lib/stats";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  borderSoft,
  colors,
  ctaBody,
  ctaEyebrow,
  ctaGradient,
  gradient,
  heroWash,
  statGradient,
} from "@/lib/theme";
import { CourseCardTile } from "./CourseCardTile";
import EnrollModal from "./EnrollModal";
import {
  Briefcase,
  GraduationCap,
  Handshake,
  Rocket,
  Star,
  Target,
  UserCog,
  Zap,
} from "lucide-react";
import LogosMarquee from "./LogosMarque";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tools = [
  "React",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "Figma",
  "Kubernetes",
  "MongoDB",
  "TypeScript",
  "TensorFlow",
  "Google Ads",
  "Selenium",
  "Kali Linux",
  "Jenkins",
  "Next.js",
  "PostgreSQL",
];

const rotatingWords = [
  "Full Stack",
  "Digital Marketing",
  "Cyber Security",
  "DevOps",
  "Data Science",
  "UI/UX Design",
];

/** Decorative stand-ins for student faces beside the rating. */
const avatarTints = ["#00c29a", "#0095de", "#6dd3c0", "#ee9748"];

const stripStats = [
  { n: stats.studentsTrained, l: "Students Trained", icon: GraduationCap, c: colors.teal },
  { n: stats.placementRate, l: "Placement Rate", icon: Briefcase, c: colors.blue },
  { n: stats.hiringPartners, l: "Hiring Partners", icon: Handshake, c: colors.green },
  { n: stats.instructors, l: "Expert Instructors", icon: UserCog, c: "#f4a44a" },
];

const processSteps = [
  {
    icon: Target,
    title: "Choose Your Course",
    desc: "Browse programs and book a free 30-min counselling session with our advisors.",
  },
  {
    icon: Zap,
    title: "Learn & Build",
    desc: "Live classes, real-world projects, and mentorship from active industry professionals.",
  },
  {
    icon: Rocket,
    title: "Get Placed",
    desc: "Strong portfolio, interview prep, and direct referrals to our 50+ hiring partners.",
  },
];

function Hero({ courses }: { courses: CourseCard[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % rotatingWords.length);
        setVisible(true);
      }, 320);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, { opacity: 0, y: -12, duration: 0.5 })
        .from(headingRef.current, { opacity: 0, y: 24, duration: 0.7 }, "-=0.25")
        .from(textRef.current, { opacity: 0, y: 16, duration: 0.5 }, "-=0.35")
        .from(ctaRef.current, { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(reviewsRef.current, { opacity: 0, y: 10, duration: 0.4 }, "-=0.25")
        .from(imageRef.current, { opacity: 0, x: 40, duration: 0.8 }, "-=0.6");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-16"
      style={{ background: heroWash }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: gradient }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: `radial-gradient(circle, ${colors.blue}, transparent)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(${colors.teal} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_460px] gap-16 items-center">
          <div>
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold mb-8"
              style={{
                backgroundColor: `${colors.green}15`,
                border: `1px solid ${colors.green}40`,
                color: colors.green,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: colors.green }}
              />
              {`New Batches Starting ${nextIntakeLabel()} — Limited Seats`}
            </div>

            <h1
              ref={headingRef}
              className="font-display mb-6 font-extrabold leading-[1.05] tracking-[-1.2px]"
              style={{ fontSize: "clamp(34px,5.2vw,58px)", color: colors.navy }}
            >
              Learn
              <br />
              <span
                className="inline-block transition-all duration-300"
                style={{
                  color: colors.tealInk,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {rotatingWords[index]}
              </span>
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: statGradient }}
              >
                Lead Tomorrow
              </span>
            </h1>

            <p
              ref={textRef}
              className="text-lg leading-relaxed mb-10 max-w-[520px]"
              style={{ color: colors.body }}
            >
              Where your ambition meets opportunities. Nepal&apos;s most career focused IT training
              institute in person at New Baneshwor and live online.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/courses"
                className="min-h-[48px] inline-flex items-center rounded-xl border-[1.5px] border-nm-teal px-9 py-4 text-base font-semibold text-nm-teal-ink transition-all hover:bg-nm-teal/10 active:scale-95"
              >
                Explore courses
              </Link>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setModalOpen(true);
                }}
                className="inline-flex min-h-[48px] cursor-pointer items-center rounded-xl border-2 px-9 py-4 font-bold transition-all duration-200"
                style={{ borderColor: "#0396CA", color: "#0396CA" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0396CA";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#0396CA";
                }}
              >
                Book free counselling
              </Link>
            </div>

            <div ref={reviewsRef} className="flex flex-wrap items-center gap-2.5">
              <div className="flex">
                {avatarTints.map((c, i) => (
                  <div
                    key={c}
                    aria-hidden="true"
                    className="h-[30px] w-[30px] rounded-full border-2 border-white "
                    style={{ background: c, marginLeft: i === 0 ? 0 : -8 }}
                  />
                ))}
              </div>
              <div className="text-[13.5px] font-bold" style={{ color: colors.body }}>
                4.9{" "}
                <span className="font-semibold" style={{ color: colors.muted }}>
                  from 200+ reviews
                </span>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="hidden lg:block relative">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                height: "520px",
                border: `1px solid ${colors.border}`,
                boxShadow: "0 24px 64px rgba(13,45,82,0.12)",
              }}
            >
              <Image
                src="/assets/hero-campus.jpg"
                alt="Students collaborating at Next Minds campus"
                fill
                priority
                sizes="460px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(13,45,82,0.2) 0%, transparent 60%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <EnrollModal isOpen={modalOpen} onClose={() => setModalOpen(false)} courses={courses} />
    </section>
  );
}

function ToolsMarquee() {
  return (
    <div
      className="border-y overflow-hidden select-none py-3.5"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {[...tools, ...tools].map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="text-sm font-medium flex-shrink-0 flex items-center gap-4"
            style={{ color: colors.muted }}
          >
            <span style={{ color: colors.teal }}>◆</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(imageRef.current, { opacity: 0, x: -40, duration: 0.7 })
        .from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.4 }, "-=0.4")
        .from(headingRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(textRef.current, { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
        .from(buttonRef.current, { opacity: 0, y: 12, duration: 0.4 }, "-=0.3");
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="px-6 py-[70px]">
      <div className="mx-auto max-w-[1240px] grid lg:grid-cols-2 gap-12 items-center">
        <div ref={imageRef} className="relative">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              height: "360px",
              border: `1px solid ${colors.border}`,
              boxShadow: "0 24px 64px rgba(13,45,82,0.12)",
            }}
          >
            <Image
              src="/assets/hero-campus.jpg"
              alt="Next Minds team and students"
              fill
              sizes="600px"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <div
            ref={eyebrowRef}
            className="mb-2 text-[13px] font-bold uppercase tracking-[0.06em]"
            style={{ color: colors.tealInk }}
          >
            About Us
          </div>
          <h2
            ref={headingRef}
            className="font-display mb-5 font-extrabold tracking-[-0.6px]"
            style={{ fontSize: "clamp(24px,3.4vw,34px)", color: colors.navy }}
          >
            Nepal&apos;s most career-focused IT training institute
          </h2>
          <p
            ref={textRef}
            className="mb-8 text-[15.5px] leading-relaxed"
            style={{ color: colors.body }}
          >
            We&apos;ve helped thousands of students build real skills and land real jobs. Our
            instructors are active industry professionals, our curriculum is built around what
            employers actually need, and our hiring partners give every graduate a direct path into
            the workforce.
          </p>
          <div ref={buttonRef} className="inline-block">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border-[1.5px] border-nm-teal px-8 py-3.5 text-[15px] font-semibold text-nm-teal-ink transition-all hover:bg-nm-teal/10 active:scale-95"
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularCourses({ courses }: { courses: CourseCard[] }) {
  const [active, setActive] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseCard | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((c) => c.category)))],
    [courses],
  );
  const visible = active === "All" ? courses : courses.filter((c) => c.category === active);

  return (
    <section className="px-6 py-[70px]">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="mb-10 flex flex-wrap items-end justify-between gap-6"
          style={{ borderColor: colors.border }}
        >
          <div className="pb-6">
            <h2
              className="font-display font-extrabold tracking-[-0.6px]"
              style={{ fontSize: "clamp(26px,3.6vw,36px)", color: colors.navy }}
            >
              Find your path to a future-proof career
            </h2>
            <p className="mt-2 text-[15px]" style={{ color: colors.body }}>
              {courses.length} courses, built with hiring partners across {categories.length - 1}{" "}
              tracks.
            </p>
          </div>
          <Link
            href="/courses"
            className="flex-shrink-0 pb-6 text-[14.5px] font-bold"
            style={{ color: colors.tealInk }}
          >
            View all courses
          </Link>
        </div>

        <div className="mb-10 flex gap-7 overflow-x-auto">
          {categories.map((cat) => {
            const on = cat === active;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={on}
                className="relative flex-shrink-0 whitespace-nowrap pb-3 text-[14.5px] font-semibold transition-colors"
                style={{ color: on ? colors.navy : colors.body }}
              >
                {cat}
                <span
                  className="absolute inset-x-0 -bottom-px h-[2px] rounded-full transition-transform duration-300"
                  style={{
                    background: colors.teal,
                    transform: on ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {visible.map((course) => (
            <CourseCardTile
              key={course.id}
              course={course}
              onEnroll={(c) => {
                setSelectedCourse(c);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <EnrollModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        courses={selectedCourse ? [selectedCourse] : courses}
      />
    </section>
  );
}

function StatsStrip() {
  return (
    // A hairline band, not a panel: the design separates it from the hero with
    // rules top and bottom rather than a fill, so the eye reads it as a caption
    // to the hero rather than as its own section.
    <section className="border-y px-6 py-7" style={{ borderColor: borderSoft }}>
      <div className="mx-auto grid max-w-[1240px] gap-6 text-center [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
        {stripStats.map((s) => (
          <div key={s.l}>
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
  );
}

/** "Roshan Maharjan" -> "RM". Falls back to one letter for single-word names. */
function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Testimonials() {
  const [perView, setPerView] = useState(3);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const pageCount = Math.max(1, Math.ceil(testimonials.length / perView));
  const current = Math.min(page, pageCount - 1);

  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p + 1) % pageCount), 6000);
    return () => clearInterval(id);
  }, [pageCount]);

  const go = (dir: number) => setPage((p) => (p + dir + pageCount) % pageCount);

  return (
    <section className="px-6 py-[70px]" style={{ backgroundColor: "#f9fafb" }}>
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-9 flex flex-col items-center gap-2 text-center">
          <div
            className="text-[13px] font-bold uppercase tracking-[0.06em]"
            style={{ color: colors.tealInk }}
          >
            Student Stories
          </div>
          <h2
            className="font-display font-extrabold tracking-[-0.6px]"
            style={{ fontSize: "clamp(24px,3.4vw,34px)", color: colors.navy }}
          >
            What our students say
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex-shrink-0 px-2.5"
                  style={{ width: `${100 / perView}%` }}
                >
                  <div className="flex h-full flex-col items-center px-6 py-8 text-center">
                    <div className="relative mb-5 h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={t.photo}
                        alt={t.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div
                      className="font-display text-[18px] font-bold"
                      style={{ color: colors.navy }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="mb-4 text-[12px] font-semibold uppercase tracking-[0.05em]"
                      style={{ color: colors.mutedSoft }}
                    >
                      {t.role}
                    </div>

                    <p className="mb-5 text-sm leading-relaxed" style={{ color: colors.body }}>
                      "{t.quote}"
                    </p>

                    <div className="mt-auto flex gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={15}
                          aria-hidden="true"
                          className="fill-warning text-warning"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                aria-label="Previous testimonials"
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: `1.5px solid ${colors.border}`,
                  color: colors.navy,
                  backgroundColor: colors.card,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.teal;
                  e.currentTarget.style.color = colors.teal;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.color = colors.navy;
                }}
              >
                ←
              </button>

              <div className="flex gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to testimonial page ${i + 1}`}
                    onClick={() => setPage(i)}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: i === current ? "24px" : "8px",
                      background: i === current ? gradient : colors.border,
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next testimonials"
                onClick={() => go(1)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: `1.5px solid ${colors.border}`,
                  color: colors.navy,
                  backgroundColor: colors.card,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.teal;
                  e.currentTarget.style.color = colors.teal;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.color = colors.navy;
                }}
              >
                →
              </button>
            </div>
          )}
        </div>

        <div className="mt-9 text-center">
          <Link
            href="/testimonials"
            className="text-[14.5px] font-bold"
            style={{ color: colors.tealInk }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.blue;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.teal;
            }}
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="px-6 py-[70px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-16 text-center">
          <div
            className="mb-2 text-[13px] font-bold uppercase tracking-[0.06em]"
            style={{ color: colors.tealInk }}
          >
            The Process
          </div>
          <h2
            className="font-display font-extrabold tracking-[-0.6px]"
            style={{ fontSize: "clamp(24px,3.4vw,34px)", color: colors.navy }}
          >
            Your journey from{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradient }}>
              zero to hero
            </span>
          </h2>
        </div>

        <div className="relative grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          <div
            className="absolute top-8 hidden h-[2px] sm:block"
            style={{
              left: "calc(100% / 6)",
              right: "calc(100% / 6)",
              background: `linear-gradient(90deg, ${colors.border} 0%, ${colors.teal}40 50%, ${colors.border} 100%)`,
            }}
            aria-hidden
          />

          {processSteps.map((s, i) => (
            <div key={s.title} className="group relative text-center">
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-extrabold text-white grayscale transition-all duration-500 ease-out group-hover:scale-110 group-hover:grayscale-0"
                style={{
                  background: gradient,
                  boxShadow: `0 0 0 8px #fff, 0 10px 28px ${colors.teal}40`,
                }}
              >
                {i + 1}
              </div>
              <h3 className="mb-2 text-[17px] font-extrabold" style={{ color: colors.navy }}>
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-[1.55]" style={{ color: colors.muted }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ courses }: { courses: CourseCard[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    // Full-bleed in the design rather than an inset rounded card: the band runs
    // edge to edge so the page ends on a hard colour change into the footer.
    <section
      className="relative overflow-hidden px-6 py-[84px] text-white"
      style={{ background: ctaGradient }}
    >
      {/* Decorative glow, kept subtle so it doesn't fight the text */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[760px] text-center">
        <div
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.05em]"
          style={{ backgroundColor: "rgba(255,255,255,0.12)", color: ctaEyebrow }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {`${nextIntakeLabel()} batch — limited seats remaining`}
        </div>

        <h2
          className="font-display mb-4 font-extrabold leading-[1.15] tracking-[-0.8px]"
          style={{ fontSize: "clamp(28px,4.4vw,42px)" }}
        >
          Start your tech career today.
        </h2>

        <p
          className="mx-auto mb-9 max-w-[480px] text-[16px] leading-relaxed"
          style={{ color: ctaBody }}
        >
          Book a free 30-minute counselling session and find the perfect course for your goals.
        </p>

        <div className="flex flex-wrap justify-center gap-3.5">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-xl bg-white px-8 py-4 text-[15px] font-bold shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-95"
            style={{ color: colors.navyDeep }}
          >
            Book free counselling
          </button>
          <Link
            href="/courses"
            className="rounded-xl px-8 py-4 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}
          >
            Browse all courses
          </Link>
        </div>
      </div>

      <EnrollModal isOpen={modalOpen} onClose={() => setModalOpen(false)} courses={courses} />
    </section>
  );
}
/**
 * Next intake label, derived from today rather than hardcoded.
 *
 * The hero badge read "New Batches Starting August 2025" for roughly a year.
 * Deriving it means it can never go stale again: before the 20th we advertise
 * this month, after it the next one.
 */
function nextIntakeLabel() {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() + (now.getDate() >= 20 ? 1 : 0), 1);
  return target.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export default function HomePage({ courses }: { courses: CourseCard[] }) {
  return (
    <>
      <Hero courses={courses} />
      {/* The design places the stat band immediately under the hero, where it
            reads as a caption to it, and the tools marquee after. */}
      <StatsStrip />
      <ToolsMarquee />
      <AboutUs />
      <PopularCourses courses={courses} />
      <Testimonials />
      <LogosMarquee />
      <Process />
      <FinalCta courses={courses} />
    </>
  );
}
