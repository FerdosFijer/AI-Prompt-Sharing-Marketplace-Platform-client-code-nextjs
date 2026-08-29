// src/components/prompt/PromptsFilter.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TextField, InputGroup } from "@heroui/react";
import { Magnifier, SlidersVertical } from "@gravity-ui/icons";

const AI_ENGINES = ["All", "ChatGPT", "Gemini", "Claude", "Midjourney", "Stable Diffusion", "Other"];
const CATEGORIES = ["All", "Coding", "Writing", "Marketing", "Graphics & Image", "Idea Generation", "System Assistant", "Other"];
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Pro"];

export function PromptsHeaderBar({ totalPrompts = 0 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (search) params.set("search", search);
    else params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  }, [search, pathname, router]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">CATALOG</span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Explore Prompts</h1>
        <p className="text-xs text-gray-400 mt-1">Showing {totalPrompts} verified AI prompts</p>
      </div>

      <div className="w-full sm:w-80">
        <TextField className="w-full">
          <InputGroup className="bg-[#0B0F19] border border-gray-800 rounded-xl overflow-hidden focus-within:border-purple-500">
            <InputGroup.Prefix className="pl-3 text-gray-500">
              <Magnifier className="w-4 h-4" />
            </InputGroup.Prefix>
            <InputGroup.Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompt, tag, tool..."
              className="w-full bg-transparent text-white placeholder-gray-500 px-3 py-2 text-xs focus:outline-none"
            />
          </InputGroup>
        </TextField>
      </div>
    </div>
  );
}

export function PromptsSidebarFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [aiTool, setAiTool] = useState(searchParams.get("aiTool") || "All");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "All");

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "All") params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setAiTool("All");
    setCategory("All");
    setDifficulty("All");
    router.push(pathname);
  };

  return (
    <aside className="w-full lg:w-64 bg-[#0B0F19] border border-gray-800 rounded-2xl p-4 shrink-0 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
          <SlidersVertical className="w-3.5 h-3.5 text-purple-400" />
          <span>Filters</span>
        </div>
        <button onClick={handleReset} className="text-[10px] text-gray-500 hover:text-purple-400 transition-colors">
          Reset all
        </button>
      </div>

      {/* AI ENGINE */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">AI Engine</h3>
        <div className="space-y-1">
          {AI_ENGINES.map((item) => {
            const isActive = aiTool.toLowerCase() === item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => {
                  setAiTool(item);
                  updateParam("aiTool", item);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-purple-950/60 text-purple-300 border border-purple-500/50"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* CATEGORY */}
      <div className="space-y-2 border-t border-gray-800/80 pt-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</h3>
        <div className="space-y-1">
          {CATEGORIES.map((item) => {
            const isActive = category.toLowerCase() === item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => {
                  setCategory(item);
                  updateParam("category", item);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-purple-950/60 text-purple-300 border border-purple-500/50"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* DIFFICULTY */}
      <div className="space-y-2 border-t border-gray-800/80 pt-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Difficulty</h3>
        <div className="space-y-1">
          {DIFFICULTIES.map((item) => {
            const isActive = difficulty.toLowerCase() === item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => {
                  setDifficulty(item);
                  updateParam("difficulty", item);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-purple-950/60 text-purple-300 border border-purple-500/50"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}