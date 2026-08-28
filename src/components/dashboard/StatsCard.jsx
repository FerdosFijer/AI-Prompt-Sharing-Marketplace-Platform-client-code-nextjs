"use client";

import React from "react";
import { Card } from "@heroui/react";

/**
 * Single Stat Card Component (HeroUI v3 Compound Component API)
 */
export function StatsCard({ title, value, icon, color = "purple" }) {
  const colorVariants = {
    purple: {
      bg: "bg-purple-950/40",
      text: "text-purple-400",
      border: "border-purple-500/20",
    },
    cyan: {
      bg: "bg-cyan-950/40",
      text: "text-cyan-400",
      border: "border-cyan-500/20",
    },
    emerald: {
      bg: "bg-emerald-950/40",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    amber: {
      bg: "bg-amber-950/40",
      text: "text-amber-400",
      border: "border-amber-500/20",
    },
    rose: {
      bg: "bg-rose-950/40",
      text: "text-rose-400",
      border: "border-rose-500/20",
    },
    blue: {
      bg: "bg-blue-950/40",
      text: "text-blue-400",
      border: "border-blue-500/20",
    },
  };

  const selectedColor = colorVariants[color] || colorVariants.purple;

  return (
    <Card
      variant="transparent"
      className="border border-white/10 bg-[#090b1e]/70 backdrop-blur-xl shadow-xl hover:border-white/20 transition-all rounded-2xl"
    >
      <Card.Content className="flex flex-row items-center gap-4 p-5">
        {/* Icon Badge */}
        {icon && (
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${selectedColor.border} ${selectedColor.bg} ${selectedColor.text}`}
          >
            {React.cloneElement(icon, { className: "h-5 w-5" })}
          </div>
        )}

        {/* Text Content */}
        <div className="flex flex-col gap-0.5">
          <Card.Description className="text-[11px] font-bold uppercase tracking-wider text-default-400 p-0 m-0">
            {title}
          </Card.Description>
          <Card.Title className="text-2xl font-extrabold text-white tracking-tight p-0 m-0">
            {value ?? 0}
          </Card.Title>
        </div>
      </Card.Content>
    </Card>
  );
}

/**
 * Reusable Dashboard Stats Container Component
 * Pass any array of items to feed the component dynamically.
 */
export default function DashboardStats({ stats = [], isLoading = false, className = "" }) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            variant="transparent"
            className="h-24 rounded-2xl border border-white/5 bg-[#090b1e]/40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!stats.length) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
      {stats.map((item) => (
        <StatsCard
          key={item.id || item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}