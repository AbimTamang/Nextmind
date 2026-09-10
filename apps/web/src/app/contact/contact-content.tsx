"use client";

import { useState } from "react";
import { contact, directionsHref, mapEmbedHref } from "@/lib/contact";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { borderSoft, colors, gradient, heroWash } from "@/lib/theme";
import { contactSchema, type ContactInput, type ContactFormValues } from "@/lib/schemas";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "Address", value: contact.address.full, href: contact.maps.place },
  { icon: Phone, label: "Phone", value: contact.phoneDisplay, href: `tel:${contact.phoneE164}` },
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Clock, label: "Hours", value: contact.hours, href: null },
];

const inputStyle = {
  border: `1px solid ${colors.border}`,
  backgroundColor: "#f8f8fd",
  color: colors.navy,
};

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", courseInterest: "", message: "" },
  });

  // The "Subject" select maps onto the courseInterest column.
  const subject = useWatch({ control, name: "courseInterest" });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      reset();
      setSent(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    }
  });

  const focus = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = colors.teal;
  };
  const blur = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = colors.border;
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: "#fbfbfd" }}>
      <section
        className="border-b px-6 py-12 sm:py-16 text-center"
        style={{ background: heroWash, borderColor: borderSoft }}
      >
        <div className="mx-auto max-w-[1240px]">
          <p
            className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em]"
            style={{ color: colors.tealInk }}
          >
            Contact us
          </p>
          <h1
            className="font-display text-3xl font-bold sm:text-4xl"
            style={{ color: colors.navy }}
          >
            Contact
          </h1>
          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: colors.body }}
          >
            Let&apos;s start a conversation
          </p>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-9 text-center">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: colors.tealInk }}>Get in touch</p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: colors.navy }}>Contact &amp; Join Together</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6" style={{ color: colors.muted }}>
              We&apos;re here to help you take the next step. Reach out to our team and we&apos;ll get back to you shortly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((c) => {
              const cardContent = (
                <div
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-[0_8px_30px_rgba(0,189,184,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_38px_rgba(0,189,184,0.28)]"
                  style={{ background: gradient }}
                >
                  <div>
                    <div className="mb-3.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <c.icon size={20} aria-hidden="true" />
                    </div>
                    <div className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/80">
                      {c.label}
                    </div>
                    <div className="mt-1.5 text-[13px] font-semibold leading-relaxed text-white">
                      {c.value}
                    </div>
                  </div>
                </div>
              );

              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block h-full"
                >
                  {cardContent}
                </a>
              ) : (
                <div key={c.label} className="h-full">
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="enquiry" className="px-6 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[260px] overflow-hidden bg-gradient-to-br from-teal-500 to-blue-600 p-8 text-white sm:min-h-[330px] sm:p-10">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-100">Start a conversation</p>
            <h2 className="max-w-xs font-display text-2xl font-bold sm:text-3xl">Chat With Live!</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">
              Have a question? Our team is ready to help you find the right path.
            </p>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 bg-white px-5 py-3 text-xs font-bold text-teal-600 transition-transform hover:-translate-y-0.5">
              Chat on WhatsApp <span aria-hidden="true">-&gt;</span>
            </a>
            <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full border-[24px] border-white/10" aria-hidden="true" />
          </div>

          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-teal-600">Contact us</p>
            <h2 className="font-display text-2xl font-bold text-navy-800 sm:text-3xl">Reach &amp; Get In Touch With Us!</h2>
            <p className="mt-3 text-sm text-gray-500">Send us a message and we&apos;ll be in touch soon.</p>

            {sent ? (
              <div
                className="mt-6 border border-gray-100 bg-white p-12 text-center"
                style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}
              >
                <CheckCircle2 size={44} className="mx-auto mb-4 text-nm-teal-ink" aria-hidden="true" />
                <h3 className="font-bold text-xl mb-2" style={{ color: colors.navy }}>
                  Message Sent!
                </h3>
                <p style={{ color: colors.muted }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-3" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(
                    [
                      { key: "name", label: "Full Name", type: "text", ph: "Your name" },
                      { key: "email", label: "Email", type: "email", ph: "your@email.com" },
                    ] as const
                  ).map((f) => (
                    <div key={f.key}>
                      <label
                        className="sr-only"
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.ph}
                        {...register(f.key)}
                        className="w-full px-4 py-3 text-xs outline-none transition-all placeholder:text-gray-400"
                        style={inputStyle}
                        onFocus={focus}
                      />
                      {errors[f.key] && (
                        <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                          {errors[f.key]?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label
                    className="sr-only"
                  >
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+977-98XXXXXXXX"
                    {...register("phone")}
                    className="w-full px-4 py-3 text-xs outline-none transition-all placeholder:text-gray-400"
                    style={inputStyle}
                    onFocus={focus}
                  />
                </div>

                <div>
                  <label
                    className="sr-only"
                  >
                    Subject
                  </label>
                  <select
                    {...register("courseInterest")}
                    className="w-full appearance-none px-4 py-3 text-xs outline-none transition-all cursor-pointer"
                    style={{
                      ...inputStyle,
                      color: subject ? colors.navy : colors.muted,
                    }}
                    onFocus={focus}
                    onBlur={blur}
                  >
                    <option value="">Select a subject</option>
                    <option>Course Enquiry</option>
                    <option>Enrollment Help</option>
                    <option>Enterprise Training</option>
                    <option>Scholarship / Financial Aid</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    className="sr-only"
                  >
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us what's on your mind…"
                    {...register("message")}
                    className="w-full resize-none px-4 py-3 text-xs outline-none transition-all placeholder:text-gray-400"
                    style={inputStyle}
                    onFocus={focus}
                  />
                </div>

                {submitError && (
                  <p className="text-sm" style={{ color: "#dc2626" }}>
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-teal-500 px-7 py-3 text-[11px] font-bold text-white transition-all hover:bg-teal-600 active:scale-[0.98]"
                  style={{ background: gradient, boxShadow: `0 4px 20px ${colors.teal}40` }}
                >
                  Send Message <Send size={13} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 pb-0">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <iframe src={mapEmbedHref} title="Next Minds Infosys on Google Maps" className="block h-[280px] w-full border-0 sm:h-[360px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border-t border-gray-100 py-3 text-xs font-bold text-teal-600 hover:bg-gray-50">
            <MapPin size={14} aria-hidden="true" /> Get directions
          </a>
        </div>
      </section>
    </div>
  );
}
