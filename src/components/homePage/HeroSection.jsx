"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Magnifier, ArrowRight, Sparkles } from "@gravity-ui/icons";

const TRENDING_TAGS = [
  "#SEO Optimize",
  "#React Component",
  "#Copywriter",
  "#Midjourney V6",
  "#Gemini Code Helper",
  "#Claude Architect",
];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/prompts?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center bg-[#050611] px-4 py-8 sm:px-6 sm:py-12 lg:py-14 text-center overflow-hidden">
      {/* Dynamic Glow Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[260px] sm:h-[300px] sm:w-[480px] rounded-full bg-gradient-to-tr from-purple-600/20 via-cyan-500/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl w-full">
        {/* Top Badge */}
        <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/20 px-3 py-1 text-[11px] sm:text-xs text-purple-300 backdrop-blur-xl shadow-lg shadow-purple-900/20">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span className="font-bold text-white text-[11px] tracking-tight">
            AI<span className="text-cyan-400">verse</span>
          </span>
          <span className="text-purple-500/60 font-light">|</span>
          <span>The Ultimate Prompt Hub</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold tracking-tight text-white xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-snug">
          Unlock the True Potential of <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Generative AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-default-400/90 px-2 sm:px-0">
          Discover, bookmark, and run engineering-grade prompts for ChatGPT,
          Gemini, Claude, and Midjourney. Boost your productivity today.
        </p>

        {/* Full-Width Clean Search Bar */}
        <form onSubmit={handleSearch} className="mx-auto mt-6 sm:mt-7 max-w-xl w-full">
          <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-xl transition-all focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/20 shadow-2xl gap-2">
            <Magnifier className="h-4 w-4 text-default-400 ml-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search by title, tag, or AI tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-default-500/80 border-none outline-none focus:outline-none focus:ring-0"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-purple-600 text-white font-medium hover:bg-purple-500 shrink-0 px-5 py-2 rounded-xl transition-all shadow-md shadow-purple-900/30"
            >
              Explore
            </Button>
          </div>
        </form>

        {/* Trending Tags Section */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <span className="text-[11px] sm:text-xs text-default-500 font-medium tracking-wide">Trending:</span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-xl">
            {TRENDING_TAGS.map((tag) => (
              <Link
                key={tag}
                href={`/prompts?tag=${encodeURIComponent(tag.replace("#", ""))}`}
                className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] sm:text-xs text-default-300 transition-all hover:border-purple-500/40 hover:bg-purple-950/40 hover:text-purple-200 hover:shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="mt-6 sm:mt-8">
          <Button
            as={Link}
            href="/prompts"
            size="md"
            className="bg-purple-600 font-medium text-white hover:bg-purple-500 shadow-lg shadow-purple-900/50 text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all hover:scale-[1.02]"
            endContent={<ArrowRight className="h-4 w-4" />}
          >
            Explore All Prompts
          </Button>
        </div>
      </div>
    </section>
  );
}