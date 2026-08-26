"use client";

import React from "react";
// Lucide icons work seamlessly without prop errors. Install with `npm i lucide-react` if needed.
import { Zap, ShieldCheck, Heart } from "lucide-react";

const BENEFITS_DATA = [
  {
    id: 1,
    title: "Production Ready",
    description:
      "Every prompt is thoroughly checked, curated, and optimized to run flawlessly on target engines without tweaking.",
    icon: Zap,
    iconBg: "bg-purple-950/40 border-purple-500/30 text-purple-400",
    glowColor: "group-hover:border-purple-500/40 group-hover:shadow-purple-900/20",
  },
  {
    id: 2,
    title: "Admin Moderation",
    description:
      "No spam or garbage templates. Our administrators approve prompts manually to guarantee highest community quality.",
    icon: ShieldCheck,
    iconBg: "bg-cyan-950/40 border-cyan-500/30 text-cyan-400",
    glowColor: "group-hover:border-cyan-500/40 group-hover:shadow-cyan-900/20",
  },
  {
    id: 3,
    title: "Premium Marketplace",
    description:
      "Support prompt engineers directly. Access private expert prompts with a single-click lifetime subscription upgrade.",
    icon: Heart,
    iconBg: "bg-rose-950/40 border-rose-500/30 text-rose-400",
    glowColor: "group-hover:border-rose-500/40 group-hover:shadow-rose-900/20",
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative w-full bg-[#050611] px-4 py-12 sm:px-6 sm:py-16 lg:py-20 text-center overflow-hidden">
      {/* Background Ambient Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Subtitle / Category Tag */}
        <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-purple-400 uppercase">
          Our Benefits
        </span>

        {/* Section Heading */}
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
          Why Choose Aiverse?
        </h2>

        {/* Section Description */}
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-default-400/90">
          We build the bridge between simple AI queries and high-yield prompt engineering.
        </p>

        {/* Benefits Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {BENEFITS_DATA.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={benefit.id}
                className={`group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#090b1e]/60 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${benefit.glowColor}`}
              >
                <div>
                  {/* Icon Badge */}
                  <div
                    className={`inline-flex items-center justify-center rounded-xl border p-3.5 transition-all ${benefit.iconBg}`}
                  >
                    <IconComponent className="h-6 w-6 stroke-[1.75]" />
                  </div>

                  {/* Benefit Title */}
                  <h3 className="mt-6 text-lg sm:text-xl font-bold tracking-tight text-white">
                    {benefit.title}
                  </h3>

                  {/* Benefit Description */}
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-default-400/80">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}