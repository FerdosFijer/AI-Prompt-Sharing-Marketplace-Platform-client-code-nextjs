"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { FileText, Copy, Bookmark } from "@gravity-ui/icons";
import DashboardStats from "@/components/dashboard/StatsCard";

const CreatorDashboardHomePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Data array fed directly into the reusable stats component
  const creatorStatsData = [
    {
      id: "prompts",
      title: "Total Prompts",
      value: 2,
      color: "purple",
      icon: <FileText />,
    },
    {
      id: "copies",
      title: "Total Copies",
      value: 1,
      color: "cyan",
      icon: <Copy />,
    },
    {
      id: "bookmarks",
      title: "Total Bookmarks",
      value: 0,
      color: "emerald",
      icon: <Bookmark />,
    },
  ];

  return (
    <div className="p-6 sm:p-10 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Creator Analytics Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-default-400">
          Real-time usage statistics and performance insights for {user?.name || "Creator"}.
        </p>
      </div>

      {/* Reusable Component Call */}
      <DashboardStats stats={creatorStatsData} isLoading={isPending} />
    </div>
  );
};

export default CreatorDashboardHomePage;