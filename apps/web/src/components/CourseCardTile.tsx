import Link from "next/link";
import { colors, gradient } from "@/lib/theme";
import type { CourseCard } from "@/db/queries";

export function CourseCardTile({
  course,
  onEnroll,
}: {
  course: CourseCard;
  onEnroll: (course: CourseCard) => void;
}) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white pl-5 pr-6 py-6"
      style={{ border: `1px solid ${colors.border}` }}
    >
      <span
        className="absolute inset-y-0 left-0 w-1"
        style={{ background: course.color }}
        aria-hidden
      />

      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="text-[13px] font-semibold" style={{ color: course.color }}>
          {course.category}
        </span>
        {course.badge && (
          <span
            className="rounded-full px-2.5 py-1 text-[11.5px] font-bold"
            style={{ background: `${course.color}14`, color: course.color }}
          >
            {course.badge}
          </span>
        )}
      </div>

      <Link href={`/courses/${course.slug}`} className="mb-2 block w-fit">
        <h3
          className="font-display text-[19px] font-bold leading-snug transition-colors group-hover:opacity-80"
          style={{ color: colors.navy }}
        >
          {course.title}
        </h3>
      </Link>

      <p className="mb-5 text-[14px] leading-relaxed" style={{ color: colors.body }}>
        {course.shortDesc}
      </p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {course.tools.slice(0, 3).map((tool) => (
          <span
            key={tool}
            className="rounded-md px-2 py-1 text-[12px] font-medium"
            style={{ background: "#F5F7FA", color: colors.navy }}
          >
            {tool}
          </span>
        ))}
      </div>

      <div
        className="mt-auto flex items-center justify-between border-t pt-4 text-[13.5px]"
        style={{ borderColor: colors.border, color: colors.body }}
      >
        <span>
          {course.duration} · {course.level}
        </span>
        <span className="font-bold" style={{ color: colors.navy }}>
          Rs {course.price.toLocaleString()}
        </span>
      </div>

      <div className="mt-5 flex gap-2.5">
        <Link
          href={`/courses/${course.slug}`}
          className="flex-1 rounded-xl border-[1.5px] px-4 py-2.5 text-center text-[13.5px] font-semibold transition-colors hover:bg-nm-teal/10"
          style={{ borderColor: colors.border, color: colors.navy }}
        >
          View details
        </Link>
        <button
          type="button"
          onClick={() => onEnroll(course)}
          className="flex-1 rounded-xl px-4 py-2.5 text-[13.5px] font-bold text-white transition-transform active:scale-95"
          style={{ background: gradient }}
        >
          Enroll now
        </button>
      </div>
    </div>
  );
}
