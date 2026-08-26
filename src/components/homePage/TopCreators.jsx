"use client";

import React from "react";
import Image from "next/image";
import { Award } from "lucide-react";

const CREATORS_DATA = [
  {
    id: 1,
    name: "PromptMaster",
    role: "Senior Engineer",
    promptsCount: 42,
    copiesCount: 1240,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "CreativeAI",
    role: "Art Director",
    promptsCount: 28,
    copiesCount: 980,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "GeminiWiz",
    role: "Writer & Marketer",
    promptsCount: 35,
    copiesCount: 850,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
];

export default function TopCreators() {
  return (
    <section className="relative w-full bg-[#050611] px-4 py-12 sm:px-6 sm:py-16 text-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Category Tag */}
        <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-purple-400 uppercase">
          Showcase
        </span>

        {/* Section Title */}
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
          Top Prompt Creators
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-default-400/90">
          Engage with community leaders pioneering advanced prompt structures.
        </p>

        {/* Creators Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CREATORS_DATA.map((creator) => (
            <div
              key={creator.id}
              className="group relative flex flex-col items-center rounded-2xl border border-white/[0.07] bg-[#090b1e]/60 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-900/10"
            >
              {/* Profile Avatar with Verified Badge */}
              <div className="relative">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-purple-500/40 p-0.5">
                  <Image
                    src={creator.avatar}
                    alt={creator.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white shadow-md">
                  <Award className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* User Info */}
              <h3 className="mt-4 text-base sm:text-lg font-bold text-white">
                {creator.name}
              </h3>
              <p className="mt-0.5 text-xs text-default-400">
                {creator.role}
              </p>

              {/* Stats Divider Line */}
              <div className="mt-6 w-full border-t border-white/5" />

              {/* Creator Stats */}
              <div className="mt-4 flex w-full justify-around text-center">
                <div>
                  <span className="block text-base sm:text-lg font-extrabold text-white">
                    {creator.promptsCount}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-default-500 font-semibold">
                    Prompts
                  </span>
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-extrabold text-white">
                    {creator.copiesCount}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-default-500 font-semibold">
                    Copies
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}