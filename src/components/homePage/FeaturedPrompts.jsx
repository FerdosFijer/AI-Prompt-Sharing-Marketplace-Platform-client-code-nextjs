"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Eye, 
  ArrowRight, 
  Sparkles, 
  User, 
  Copy, 
  Star, 
  Lock, 
  Tag 
} from "lucide-react";

const FEATURED_PROMPTS = [
  {
    id: 1,
    title: "Optimized React Tailwind Code Builder",
    description:
      "Generates production-grade, responsive React components using modern Tailwind styling structures.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    model: "CHATGPT",
    level: "INTERMEDIATE",
    isPremium: false,
    tag: "# CODING",
    author: "Prompt Engineer Cre...",
    copies: 172,
    rating: 3.3,
  },
  {
    id: 2,
    title: "check",
    description: "check Des",
    image: null, // Fallback placeholder UI
    model: "CHATGPT",
    level: "BEGINNER",
    isPremium: false,
    tag: "# CODING",
    author: "user",
    copies: 8,
    rating: 4.3,
  },
  {
    id: 3,
    title: "check 01",
    description: "check Des 01",
    image: null,
    model: "CHATGPT",
    level: "INTERMEDIATE",
    isPremium: true,
    tag: "# CODING",
    author: "admin01",
    copies: 3,
    rating: 4.0,
  },
];

export default function FeaturedPrompts() {
  return (
    <section className="relative w-full bg-[#050611] px-4 py-12 sm:px-6 sm:py-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Handpicked
            </span>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              Featured Prompts
            </h2>
          </div>

          {/* Top-Right Navigation Link */}
          <Link
            href="/prompts"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-400 transition-all hover:text-purple-300"
          >
            View all prompts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Prompts Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {FEATURED_PROMPTS.map((prompt) => (
            <div
              key={prompt.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#090b1e]/60 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-950/20"
            >
              <div>
                {/* Banner / Image Area */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden rounded-xl border border-white/5 bg-[#070817] flex items-center justify-center">
                  {prompt.image ? (
                    <Image
                      src={prompt.image}
                      alt={prompt.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-purple-400/50">
                      <Sparkles className="h-8 w-8" />
                    </div>
                  )}
                </div>

                {/* Badge Pills Row */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-purple-500/30 bg-purple-950/30 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-purple-300">
                    {prompt.model}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-default-300">
                    {prompt.level}
                  </span>
                  {prompt.isPremium && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-950/40 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-rose-400">
                      <Lock className="h-2.5 w-2.5" />
                      PREMIUM
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-3 text-base font-bold text-white line-clamp-1">
                  {prompt.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-default-400/80 line-clamp-2 min-h-[36px]">
                  {prompt.description}
                </p>

                {/* Category Tag */}
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400">
                  <Tag className="h-3 w-3" />
                  <span>{prompt.tag}</span>
                </div>
              </div>

              {/* Bottom Footer Info & Action */}
              <div className="mt-6">
                {/* Author & Stats Row */}
                <div className="flex items-center justify-between text-xs text-default-400 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-default-500" />
                    <span className="truncate max-w-[120px]">{prompt.author}</span>
                  </div>

                  <div className="flex items-center gap-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Copy className="h-3.5 w-3.5 text-default-500" />
                      {prompt.copies}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      {prompt.rating}
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  href={`/prompts/${prompt.id}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-900/40 transition-all hover:bg-purple-500 hover:scale-[1.01]"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}