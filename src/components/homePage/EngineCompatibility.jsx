"use client";

import React from "react";

const ENGINE_DATA = [
  {
    id: 1,
    title: "ChatGPT",
    subtitle: "GPT-4o / GPT-4",
    description:
      "Complex reasoning, detailed programming architectures, logic refinement.",
    titleColor: "text-emerald-400",
  },
  {
    id: 2,
    title: "Gemini",
    subtitle: "Gemini 1.5 Pro",
    description:
      "Ultra-long context windows, deep code analysis, Google Workspace syncing.",
    titleColor: "text-cyan-400",
  },
  {
    id: 3,
    title: "Claude",
    subtitle: "Claude 3.5 Sonnet",
    description:
      "Premium programmatic output, highly natural copywriting, markdown structuring.",
    titleColor: "text-amber-400",
  },
  {
    id: 4,
    title: "Midjourney",
    subtitle: "Midjourney v6",
    description:
      "Highly artistic rendering, aspect-ratio configuration, photo-realism parameters.",
    titleColor: "text-purple-400",
  },
];

export default function EngineCompatibility() {
  return (
    <section className="relative w-full bg-[#050611] px-4 py-12 sm:px-6 sm:py-16 text-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Category Badge */}
        <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-purple-400 uppercase">
          Multi-Platform
        </span>

        {/* Section Heading */}
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
          Engine Compatibility
        </h2>

        {/* Section Description */}
        <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm md:text-base text-default-400/90">
          Prompts on Aiverse are tailored for individual models to exploit distinct strengths.
        </p>

        {/* 4-Column Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {ENGINE_DATA.map((engine) => (
            <div
              key={engine.id}
              className="flex flex-col rounded-2xl border border-white/[0.07] bg-[#090b1e]/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-900/10"
            >
              <h3 className={`text-lg font-bold ${engine.titleColor}`}>
                {engine.title}
              </h3>
              <h4 className="mt-1 text-sm font-semibold text-white">
                {engine.subtitle}
              </h4>
              <p className="mt-3 text-xs leading-relaxed text-default-400/80">
                {engine.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}