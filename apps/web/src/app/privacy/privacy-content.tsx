"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  Lock,
  FileText,
  Eye,
  Database,
  Cookie,
  UserCheck,
  Mail,
  Printer,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { colors, heroWash, borderSoft, gradient } from "@/lib/theme";
import { contact, mailtoHref } from "@/lib/contact";

interface Section {
  id: string;
  title: string;
  icon: typeof Shield;
  summary: string;
  content: React.ReactNode;
}

export default function PrivacyContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const sections: Section[] = [
    {
      id: "overview",
      title: "1. Overview & Scope",
      icon: Shield,
      summary: "Who we are, what this policy governs, and our core commitment to privacy.",
      content: (
        <div className="space-y-4">
          <p>
            Welcome to <strong>Next Minds Infosys</strong> (&quot;Next Minds&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are a leading IT training institute based in Kathmandu, Nepal, dedicated to empowering students, professionals, and organizations with cutting-edge technology education, hands-on mentorship, and career acceleration.
          </p>
          <p>
            This Privacy Policy details how we collect, process, disclose, and safeguard your personal information when you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Visit our public website (<code className="text-sm px-1.5 py-0.5 rounded bg-slate-100 font-mono">nextmindsinfosys.com</code>) or any associated subdomains.</li>
            <li>Inquire about or enroll in our professional training courses or enterprise programs.</li>
            <li>Access our Learning Management System (LMS) portal as a registered student or instructor.</li>
            <li>Communicate with our admission counselors, mentors, or support representatives via phone, email, or WhatsApp.</li>
          </ul>
          <p>
            By accessing our platform or providing personal information, you acknowledge that you have read and understood the practices described herein.
          </p>
        </div>
      ),
    },
    {
      id: "collection",
      title: "2. Information We Collect",
      icon: Database,
      summary: "The categories of personal data collected directly from you or automatically.",
      content: (
        <div className="space-y-4">
          <p>
            We only collect personal information that is reasonably necessary to fulfill your educational goals, provide administrative support, and manage your student journey.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="rounded-xl border p-4.5 bg-slate-50/50" style={{ borderColor: borderSoft }}>
              <div className="flex items-center gap-2 font-bold mb-2" style={{ color: colors.navy }}>
                <UserCheck size={18} className="text-nm-teal-ink" />
                <span>Directly Provided Data</span>
              </div>
              <ul className="text-sm space-y-1.5 text-slate-600 list-disc pl-4">
                <li>Full name, primary email, and telephone number</li>
                <li>Educational qualifications and current career status</li>
                <li>Desired course, skill preferences, and batch schedules</li>
                <li>Billing address and transaction verification details</li>
                <li>Direct inquiries and counseling messages</li>
              </ul>
            </div>
            <div className="rounded-xl border p-4.5 bg-slate-50/50" style={{ borderColor: borderSoft }}>
              <div className="flex items-center gap-2 font-bold mb-2" style={{ color: colors.navy }}>
                <FileText size={18} className="text-nm-teal-ink" />
                <span>Academic &amp; Portal Data</span>
              </div>
              <ul className="text-sm space-y-1.5 text-slate-600 list-disc pl-4">
                <li>LMS portal login credentials (securely hashed)</li>
                <li>Course attendance, assignment submissions, and progress</li>
                <li>Cap-stone project repositories and mentor reviews</li>
                <li>Batch interactions and discussion contributions</li>
                <li>Course completion and certification records</li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl border p-4.5 bg-slate-50/50" style={{ borderColor: borderSoft }}>
            <div className="flex items-center gap-2 font-bold mb-2" style={{ color: colors.navy }}>
              <Eye size={18} className="text-nm-teal-ink" />
              <span>Technical &amp; Automated Logs</span>
            </div>
            <p className="text-sm text-slate-600">
              When you browse our platform, our servers automatically log standard network metadata, including your IP address, browser type and version, language settings, operating system, referring pages, device identifiers, and timestamped activity logs for diagnostic and fraud prevention purposes.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "usage",
      title: "3. How We Use Your Information",
      icon: CheckCircle2,
      summary: "Purposes for which your personal data is utilized.",
      content: (
        <div className="space-y-4">
          <p>We process your personal information strictly for legitimate institutional purposes:</p>
          <div className="space-y-3">
            {[
              {
                title: "Educational Delivery & LMS Access",
                desc: "Provisioning student portals, organizing batches, tracking syllabus progress, reviewing assignments, and conducting virtual or classroom sessions.",
              },
              {
                title: "Certification & Credential Verification",
                desc: "Issuing authenticated completion certificates and providing verification mechanisms for hiring partners and prospective employers.",
              },
              {
                title: "Student Support & Academic Mentorship",
                desc: "Resolving technical issues, answering curriculum questions, and offering personalized 1-on-1 career assistance.",
              },
              {
                title: "Administrative & Billing Management",
                desc: "Generating fee invoices, recording tuition receipts, confirming installment schedules, and maintaining internal audit trails.",
              },
              {
                title: "Institutional Announcements",
                desc: "Sending critical batch reminders, holiday schedules, class cancellations, or new workshop invitations. You may opt out of non-essential notices at any time.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5"
                  style={{ background: `${colors.teal}1a`, color: colors.tealInk }}
                >
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: colors.navy }}>
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "4. Cookies & Tracking Technologies",
      icon: Cookie,
      summary: "How we utilize session tokens, cookies, and privacy-respecting analytics.",
      content: (
        <div className="space-y-4">
          <p>
            Our website utilizes minimal, purpose-driven cookies to provide a reliable user experience:
          </p>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: borderSoft }}>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b font-semibold" style={{ borderColor: borderSoft, color: colors.navy }}>
                <tr>
                  <th className="p-3">Category</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-600" style={{ borderColor: borderSoft }}>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Essential / Auth Cookies</td>
                  <td className="p-3">Maintains authenticated sessions for students and staff via Better-Auth.</td>
                  <td className="p-3">Session / 30 Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Preference Cookies</td>
                  <td className="p-3">Remembers UI preferences, filter selections, and layout states.</td>
                  <td className="p-3">1 Year</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Performance Analytics</td>
                  <td className="p-3">Measures anonymous traffic trends and page load performance.</td>
                  <td className="p-3">Configurable</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500">
            You can configure your browser settings to decline cookies; however, authentication and student portal access require essential cookies to operate.
          </p>
        </div>
      ),
    },
    {
      id: "sharing",
      title: "5. Third-Party Sharing & Data Transfers",
      icon: Lock,
      summary: "We never sell your data. Here is how trusted service providers support us.",
      content: (
        <div className="space-y-4">
          <div
            className="rounded-xl p-4 border flex items-center gap-3.5 bg-emerald-50/60"
            style={{ borderColor: "#a7f3d0" }}
          >
            <ShieldCheck size={26} className="text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-emerald-950">Our Absolute Guarantee</h4>
              <p className="text-xs text-emerald-800">
                Next Minds Infosys does <strong>not sell, rent, monetize, or trade</strong> your personal information or student profiles to data brokers or third-party marketers.
              </p>
            </div>
          </div>
          <p>
            We engage carefully vetted cloud infrastructure providers to operate our platform under strict confidentiality agreements:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
            <li>
              <strong>Hosting &amp; Cloud Storage:</strong> High-performance server infrastructure and Amazon Web Services (AWS S3) for secure media asset storage.
            </li>
            <li>
              <strong>Transactional Email:</strong> Encrypted SMTP relays for critical account verifications, password resets, and enrollment confirmations.
            </li>
            <li>
              <strong>Hiring Partners (With Explicit Consent):</strong> If you participate in our career placement program, your resume and capstone portfolio will only be shared with prospective employers upon your explicit approval.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "security",
      title: "6. Data Security & Retention",
      icon: Shield,
      summary: "How we safeguard your information and how long it is maintained.",
      content: (
        <div className="space-y-4">
          <p>
            We implement comprehensive technical and organizational safeguards to protect your personal information:
          </p>
          <div className="grid gap-3 sm:grid-cols-3 pt-1">
            <div className="rounded-xl border p-4 bg-white" style={{ borderColor: borderSoft }}>
              <div className="text-nm-teal-ink font-bold text-sm mb-1">Encrypted Transit</div>
              <p className="text-xs text-slate-500">
                All communications across our domain are encrypted via TLS 1.3 / HTTPS.
              </p>
            </div>
            <div className="rounded-xl border p-4 bg-white" style={{ borderColor: borderSoft }}>
              <div className="text-nm-teal-ink font-bold text-sm mb-1">Hashed Credentials</div>
              <p className="text-xs text-slate-500">
                Passwords are salted and hashed with modern cryptographic standards.
              </p>
            </div>
            <div className="rounded-xl border p-4 bg-white" style={{ borderColor: borderSoft }}>
              <div className="text-nm-teal-ink font-bold text-sm mb-1">Role-Based Access</div>
              <p className="text-xs text-slate-500">
                Administrative privileges are strictly restricted on a least-privilege basis.
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-600 pt-2">
            <strong>Retention Period:</strong> We retain student profiles, academic histories, and certificates indefinitely so that your graduation status and certificate credentials remain verifiable by employers throughout your career. Financial records are retained in compliance with local tax regulations.
          </p>
        </div>
      ),
    },
    {
      id: "rights",
      title: "7. Your Rights & Choices",
      icon: UserCheck,
      summary: "Your legal rights regarding access, updates, and data deletion.",
      content: (
        <div className="space-y-4">
          <p>As a student, applicant, or visitor, you possess the following rights:</p>
          <div className="space-y-2.5">
            {[
              { label: "Right to Access", desc: "Request a digital copy of all personal records we hold about you." },
              { label: "Right to Rectification", desc: "Update or correct outdated or incomplete personal details through your student profile or support." },
              { label: "Right to Erasure", desc: "Request deletion of non-essential records (subject to academic certification recordkeeping requirements)." },
              { label: "Right to Restrict Processing", desc: "Opt out of promotional emails, newsletters, or career matchmaking programs." },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={16} className="text-nm-teal-ink mt-0.5 shrink-0" />
                <span>
                  <strong>{r.label}:</strong> {r.desc}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 pt-2">
            To exercise any of these rights, please email our privacy desk at{" "}
            <a href={mailtoHref} className="font-semibold underline text-nm-blue-ink">
              {contact.email}
            </a>
            . We process legitimate requests within 5 business days.
          </p>
        </div>
      ),
    },
    {
      id: "contact-officer",
      title: "8. Data Privacy Desk & Contact",
      icon: Mail,
      summary: "Reach our privacy and student grievance team directly.",
      content: (
        <div className="space-y-4">
          <p>
            If you have questions, feedback, or concerns regarding our privacy practices, our team is readily available to assist you:
          </p>
          <div className="rounded-2xl border p-5 bg-gradient-to-br from-slate-50 to-teal-50/20" style={{ borderColor: borderSoft }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm">
                  <Mail size={16} className="text-nm-teal-ink shrink-0" />
                  <a href={mailtoHref} className="font-semibold hover:underline" style={{ color: colors.navy }}>
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone size={16} className="text-nm-teal-ink shrink-0" />
                  <a href={`tel:${contact.phoneE164}`} className="hover:underline text-slate-700">
                    {contact.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <MapPin size={16} className="text-nm-teal-ink shrink-0" />
                  <span className="text-slate-700">{contact.address.full}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start sm:items-end gap-3 border-t sm:border-t-0 sm:border-l pt-3 sm:pt-0 sm:pl-4" style={{ borderColor: borderSoft }}>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-transform active:scale-95"
                  style={{ background: gradient }}
                >
                  <Sparkles size={16} />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="text-xs font-semibold hover:underline flex items-center gap-1"
                  style={{ color: colors.tealInk }}
                >
                  Visit Contact Page <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Filter sections when user types into the search box
  const filteredSections = searchQuery.trim()
    ? sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sections;

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative px-6 pt-16 pb-14 text-center border-b" style={{ background: heroWash, borderColor: borderSoft }}>
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase mb-4" style={{ background: `${colors.teal}18`, color: colors.tealInk }}>
            <ShieldCheck size={14} />
            Institutional Trust &amp; Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: colors.navy }}>
            Next Minds Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg" style={{ color: colors.body }}>
            Transparency, security, and student trust form the cornerstone of Next Minds Infosys. Here is exactly how we handle and protect your information.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium" style={{ color: colors.muted }}>
            <span className="flex items-center gap-1">
              <strong>Last Updated:</strong> September 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <strong>Applies to:</strong> All Students, Applicants &amp; Visitors
            </span>
            <span>•</span>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-white hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              style={{ borderColor: borderSoft, color: colors.navy }}
            >
              <Printer size={13} />
              Print / Save PDF
            </button>
          </div>
        </div>
      </section>

      {/* At-a-Glance Highlights Grid */}
      <section className="px-6 py-10 border-b bg-slate-50/40" style={{ borderColor: borderSoft }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Zero Data Selling",
                desc: "We never monetize or sell student information to external brokers or advertisers.",
                accent: colors.teal,
              },
              {
                icon: Lock,
                title: "Encrypted & Secure",
                desc: "Enterprise-grade TLS 1.3 encryption, salted password hashes, and AWS S3 storage.",
                accent: colors.blue,
              },
              {
                icon: UserCheck,
                title: "Student-First Purpose",
                desc: "Data is collected strictly to run training batches, issue certificates, and support your career.",
                accent: "#6366f1",
              },
              {
                icon: FileText,
                title: "Full Control & Rights",
                desc: "Access your records, update profile data, or request account removal at any time.",
                accent: colors.green,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border bg-white p-5 shadow-2xs transition-all hover:shadow-md"
                style={{ borderColor: borderSoft }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${card.accent}16`, color: card.accent }}
                >
                  <card.icon size={20} />
                </div>
                <h3 className="font-bold text-sm mb-1.5" style={{ color: colors.navy }}>
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: colors.muted }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area: Sidebar + Policy Sections */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
            {/* Left Column: Sticky Table of Contents & Quick Help */}
            <aside className="space-y-6">
              <div
                className="sticky top-24 rounded-2xl border p-5 bg-white shadow-2xs space-y-5"
                style={{ borderColor: borderSoft }}
              >
                {/* Search Bar */}
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search policy..."
                    className="w-full rounded-xl border pl-9 pr-3.5 py-2 text-xs outline-none transition-all focus:border-nm-teal"
                    style={{ borderColor: borderSoft }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Section Navigation */}
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-2.5 px-2" style={{ color: colors.mutedSoft }}>
                    Table of Contents
                  </div>
                  <nav className="space-y-1">
                    {sections.map((s) => {
                      const Icon = s.icon;
                      const isCurrent = activeSection === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => scrollToSection(s.id)}
                          className="w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition-all cursor-pointer"
                          style={{
                            backgroundColor: isCurrent ? `${colors.teal}12` : "transparent",
                            color: isCurrent ? colors.tealInk : colors.body,
                          }}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <Icon size={14} className={isCurrent ? "text-nm-teal-ink" : "text-slate-400"} />
                            <span className="truncate">{s.title.replace(/^\d+\.\s*/, "")}</span>
                          </span>
                          <ChevronRight size={12} className={isCurrent ? "opacity-100" : "opacity-30"} />
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Need Help Box */}
                <div
                  className="rounded-xl border p-4 bg-slate-50 text-xs space-y-2"
                  style={{ borderColor: borderSoft }}
                >
                  <div className="font-bold flex items-center gap-1.5" style={{ color: colors.navy }}>
                    <Mail size={14} className="text-nm-teal-ink" />
                    <span>Have Questions?</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    Contact our student privacy officer for any clarification or data requests.
                  </p>
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-1 font-bold text-nm-teal-ink hover:underline pt-1"
                  >
                    Email Privacy Desk <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Policy Document */}
            <main className="space-y-12">
              {filteredSections.length === 0 ? (
                <div className="rounded-2xl border p-10 text-center space-y-3" style={{ borderColor: borderSoft }}>
                  <Search size={32} className="mx-auto text-slate-300" />
                  <h3 className="font-bold text-base" style={{ color: colors.navy }}>
                    No matching clauses found
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    We couldn&apos;t find any sections matching &quot;{searchQuery}&quot;. Try searching for general terms like &quot;cookies&quot;, &quot;security&quot;, or &quot;rights&quot;.
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="rounded-xl px-4 py-2 text-xs font-bold text-white mt-2"
                    style={{ background: gradient }}
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                filteredSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <article
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-24 rounded-2xl border bg-white p-6 sm:p-8 shadow-2xs space-y-4"
                      style={{ borderColor: borderSoft }}
                    >
                      <div className="flex items-start justify-between gap-4 border-b pb-4" style={{ borderColor: borderSoft }}>
                        <div>
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1"
                            style={{ color: colors.tealInk }}
                          >
                            <Icon size={14} />
                            Policy Section
                          </span>
                          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: colors.navy }}>
                            {section.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            {section.summary}
                          </p>
                        </div>
                      </div>

                      <div className="text-[14.5px] leading-relaxed text-slate-700">
                        {section.content}
                      </div>
                    </article>
                  );
                })
              )}

              {/* Bottom Quick Links */}
              <div className="rounded-2xl border p-6 sm:p-8 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: borderSoft }}>
                <div>
                  <h3 className="font-bold text-base" style={{ color: colors.navy }}>
                    Looking for our Terms &amp; Conditions?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Review rules regarding course admissions, fee structures, and code of conduct.
                  </p>
                </div>
                <Link
                  href="/terms"
                  className="rounded-xl border px-4 py-2 text-xs font-bold transition-colors hover:bg-white shrink-0"
                  style={{ borderColor: borderSoft, color: colors.navy }}
                >
                  View Terms of Service →
                </Link>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
