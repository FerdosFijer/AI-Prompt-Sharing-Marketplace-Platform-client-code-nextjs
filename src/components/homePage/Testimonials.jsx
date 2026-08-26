"use client";

import React from "react";
import Image from "next/image";

const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote:
      '"Aiverse completely changed how I interact with Claude. The prompts are highly refined and save me hours every day."',
    name: "Sarah Connor",
    role: "Content Strategist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    quote:
      '"I found an incredible prompt that debugs React code and writes unit tests in seconds. Simply amazing!"',
    name: "Alex Rivera",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    quote:
      '"The Midjourney prompts here are pure gold. The parameters and keywords are so detailed. Highly recommend!"',
    name: "Elena Rostova",
    role: "Digital Artist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full bg-[#050611] px-4 py-12 sm:px-6 sm:py-16 text-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Category Badge */}
        <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-purple-400 uppercase">
          Testimonials
        </span>

        {/* Section Heading */}
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
          What Users Say
        </h2>

        {/* 3-Column Testimonials Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#090b1e]/60 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-900/10"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex gap-1 text-amber-500 text-xs">
                  {"★".repeat(5)}
                </div>

                {/* Review Text */}
                <p className="mt-4 text-xs sm:text-sm italic leading-relaxed text-default-300/90">
                  {item.quote}
                </p>
              </div>

              {/* User Info */}
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-purple-500/30">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-default-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}