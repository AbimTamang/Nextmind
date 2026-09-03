"use client";

import Image from "next/image";
import partnersData from "@/data/partners.json";

interface Partner {
  name: string;
  Logos: string;
  type: string;
}

const partners = partnersData as Partner[];

export default function LogosMarquee() {
  return (
    <div className="overflow-hidden select-none py-10 bg-white">
      <div className="mx-auto mb-10 max-w-[1240px] px-6">
        <p className="text-center text-3xl font-bold uppercase tracking-[0.02em] text-muted">
          Trusted by hiring partners across Nepal
        </p>
      </div>
      <div
        className="flex items-center gap-14 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {[...partners, ...partners].map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="relative h-12 w-[130px] flex-shrink-0 transition-transform hover:scale-105"
          >
            <Image src={p.Logos} alt={p.name} fill sizes="130px" className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
