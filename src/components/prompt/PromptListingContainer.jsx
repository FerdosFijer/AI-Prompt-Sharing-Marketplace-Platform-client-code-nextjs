// src/components/prompt/PromptListingContainer.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PromptCard from "@/components/prompt/PromptCard";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

export default function PromptListingContainer({ prompts = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (sortBy && sortBy !== "Latest") params.set("sortBy", sortBy);
    else params.delete("sortBy");
    router.push(`${pathname}?${params.toString()}`);
  }, [sortBy, pathname, router]);

  const totalPages = Math.ceil(prompts.length / itemsPerPage) || 1;
  const paginatedPrompts = prompts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex-1 w-full space-y-6">
      {/* Top Sort Toolbar */}
      <div className="bg-[#0B0F19] border border-gray-800 rounded-2xl p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium px-2">Sort By:</span>
          {["Latest", "Most Popular", "Most Copied"].map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                sortBy === option
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      {paginatedPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedPrompts.map((prompt) => (
            <PromptCard key={prompt._id.toString()} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#0B0F19] rounded-2xl border border-gray-800">
          <p className="text-gray-400 text-sm">No prompts match your filter criteria.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-[#0B0F19] border border-gray-800 rounded-xl text-gray-400 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "bg-[#0B0F19] border border-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 bg-[#0B0F19] border border-gray-800 rounded-xl text-gray-400 hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}