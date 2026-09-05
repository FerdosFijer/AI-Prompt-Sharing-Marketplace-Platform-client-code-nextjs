// src/components/PromptCard.jsx
"use client";

import React from "react";
import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import { Eye, Copy, Lock, Hashtag, Sparkles } from "@gravity-ui/icons";

export default function PromptCard({ prompt }) {
  const { _id,  title, description, category, aiTool, difficulty, visibility, thumbnail, copyCount = 0,} = prompt || {};

  const isPrivate = visibility === "private";

  return (
    <Card className="bg-[#0B0F19] border border-gray-800 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-300 shadow-xl">
      {/* Header Section: Image, Badges, Title & Description */}
      <Card.Header className="flex-col items-start gap-3 p-0 mb-3">
        {/* Thumbnail Image */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#121827] flex items-center justify-center border border-gray-800">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title || "Prompt Thumbnail"}
              className="w-full h-full object-cover"
            />
          ) : (
            <Sparkles className="w-10 h-10 text-purple-400/50" />
          )}
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          {aiTool && (
            <Chip
              size="sm"
              variant="flat"
              className="bg-purple-900/40 text-purple-300 font-semibold uppercase text-[10px] tracking-wider border border-purple-500/20"
            >
              {aiTool}
            </Chip>
          )}

          {difficulty && (
            <Chip
              size="sm"
              variant="flat"
              className="bg-gray-800/80 text-gray-300 font-semibold uppercase text-[10px] tracking-wider border border-gray-700"
            >
              {difficulty}
            </Chip>
          )}

          {isPrivate && (
            <Chip
              size="sm"
              variant="flat"
              className="bg-red-950/50 text-red-400 font-semibold uppercase text-[10px] tracking-wider border border-red-800/40 flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-red-400" />
              <span>Premium</span>
            </Chip>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 mt-1">
          <Card.Title className="text-lg font-bold text-white tracking-tight line-clamp-1">
            {title}
          </Card.Title>
          <Card.Description className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </Card.Description>
        </div>
      </Card.Header>

      {/* Content Section: Category & Stats */}
      <Card.Content className="p-0 space-y-3 mb-4">
        {category && (
          <div className="flex items-center gap-1.5 text-xs text-purple-400 font-medium tracking-wide uppercase">
            <Hashtag className="w-3.5 h-3.5" />
            <span>{category}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800/60">
          <div className="flex items-center gap-1.5">
            <Copy className="w-3.5 h-3.5 text-gray-500" />
            <span>{copyCount} copies</span>
          </div>
          <span className="text-[11px] text-gray-500 capitalize">{visibility}</span>
        </div>
      </Card.Content>

      {/* Footer Section: View Details Link */}
      <Card.Footer className="p-0">
        <Link
          href={`/prompts/${_id}`}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-xl transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 text-sm"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
}