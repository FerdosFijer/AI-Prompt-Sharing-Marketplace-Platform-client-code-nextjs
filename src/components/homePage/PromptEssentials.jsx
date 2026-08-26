"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, BookOpen } from "lucide-react";

const ESSENTIALS_POINTS = [
  {
    id: 1,
    title: "Define the Persona:",
    description: 'Start by assigning a specific role e.g., "Act as a Senior UX Engineer".',
  },
  {
    id: 2,
    title: "Provide Clear Context:",
    description: "Supply background constraints, input schemas, and targeted output formats.",
  },
  {
    id: 3,
    title: "Iterative Refining:",
    description: "Toggle instructions for formatting (e.g. Markdown, JSON) to guide responses.",
  },
];

const JSON_CODE_EXAMPLE = `{
  "role": "Senior React Architect",
  "context": "Optimizing a landing page",
  "instructions": [
    "Use HSL variable colors",
    "Apply Glassmorphism cards",
    "Verify mobile responsiveness"
  ],
  "format": "Vanilla CSS + HTML",
  "temperature": 0.2
}`;

export default function PromptEssentials() {
  return (
    <section className="relative w-full bg-[#050611] px-4 py-12 sm:px-6 sm:py-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text & Features Column */}
          <div className="lg:col-span-7 text-left">
            {/* Category Tag */}
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Learn & Grow
            </span>

            {/* Title */}
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              Prompt Engineering Essentials
            </h2>

            {/* Description */}
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-default-400/90 max-w-xl">
              Writing high-performing prompts is a science. AI tools require structures that define
              context, role constraints, output formats, and temperature.
            </p>

            {/* Feature Points List */}
            <div className="mt-6 sm:mt-8 space-y-4">
              {ESSENTIALS_POINTS.map((point) => (
                <div key={point.id} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-default-300">
                    <strong className="text-white font-semibold">{point.title}</strong>{" "}
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/prompts/guides"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs sm:text-sm font-medium text-white shadow-lg shadow-purple-900/40 transition-all hover:bg-purple-500 hover:scale-[1.02]"
              >
                <BookOpen className="h-4 w-4" />
                Explore Guide Prompts
              </Link>
            </div>
          </div>

          {/* Right Code Block Box */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl border border-white/10 bg-[#070919] p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
              {/* Window Controls Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-[11px] text-default-500">
                  structured_prompt.json
                </span>
              </div>

              {/* JSON Code Area */}
              <pre className="mt-4 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed text-purple-300">
                <code>{JSON_CODE_EXAMPLE}</code>
              </pre>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}