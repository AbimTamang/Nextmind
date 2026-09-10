"use client";

import { colors, heroWash, borderSoft } from "@/lib/theme";
import { contact } from "@/lib/contact";

export default function TermsContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Header */}
      <section className="px-6 pt-16 pb-12 text-center" style={{ background: heroWash }}>
        <div className="mx-auto max-w-3xl">
          <span
            className="inline-block rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-4"
            style={{ background: `${colors.teal}18`, color: colors.tealInk }}
          >
            Terms & Conditions
          </span>
          <h1
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: colors.navy }}
          >
            Terms of Service
          </h1>
          <p className="mt-4 text-base sm:text-lg" style={{ color: colors.body }}>
            Last updated: September 2026. Please read these terms carefully before enrolling in or using Next Minds services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-10 text-[15px] leading-relaxed" style={{ color: colors.body }}>
          <div>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.navy }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing our website, submitting an inquiry, enrolling in any training course, or using our LMS platform, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </div>

          <div className="pt-6" style={{ borderTop: `1px solid ${borderSoft}` }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.navy }}>
              2. Course Enrollment and Admissions
            </h2>
            <p className="mb-2">
              Admission into Next Minds courses is subject to availability, eligibility verification, and completion of the enrollment process:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Students must provide accurate personal, educational, and contact details during enrollment.</li>
              <li>Batch timings and instructor assignments may be subject to operational scheduling adjustments with prior notification.</li>
              <li>Next Minds reserves the right to decline or cancel enrollment if code-of-conduct standards are violated.</li>
            </ul>
          </div>

          <div className="pt-6" style={{ borderTop: `1px solid ${borderSoft}` }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.navy }}>
              3. Intellectual Property
            </h2>
            <p>
              All course materials, lectures, documentation, code exercises, and curricula provided by Next Minds Infosys are the intellectual property of Next Minds. Unauthorized redistribution, copying, or commercial exploitation is strictly prohibited.
            </p>
          </div>

          <div className="pt-6" style={{ borderTop: `1px solid ${borderSoft}` }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.navy }}>
              4. Code of Conduct
            </h2>
            <p>
              Students and participants are expected to maintain professional conduct towards instructors, staff, and fellow peers. Any harassment, academic dishonesty, or disruptive behavior may lead to immediate termination of access without refund.
            </p>
          </div>

          <div className="pt-6" style={{ borderTop: `1px solid ${borderSoft}` }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.navy }}>
              5. Contact Information
            </h2>
            <p>
              For inquiries regarding terms, enrollments, or policies, please contact us at{" "}
              <a href={`mailto:${contact.email}`} className="font-semibold underline" style={{ color: colors.blueInk }}>
                {contact.email}
              </a>{" "}
              or visit our office at {contact.address.full}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
