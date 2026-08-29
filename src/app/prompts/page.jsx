import { PromptsHeaderBar, PromptsSidebarFilter } from "@/components/prompt/PromptsFilter";
import PromptListingContainer from "@/components/prompt/PromptListingContainer";
import { getAllPrompts } from "@/lib/api/prompts";

export default async function PromptsPage({ searchParams }) {
  const { search, category, aiTool, difficulty, sortBy } = (await searchParams) || {};
  const prompts = await getAllPrompts() || [];

  // Filtering
  let filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      !search ||
      prompt.title?.toLowerCase().includes(search.toLowerCase()) ||
      prompt.description?.toLowerCase().includes(search.toLowerCase()) ||
      prompt.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      !category || category === "All" || prompt.category?.toLowerCase() === category.toLowerCase();

    const matchesAiTool =
      !aiTool || aiTool === "All" || prompt.aiTool?.toLowerCase() === aiTool.toLowerCase();

    const matchesDifficulty =
      !difficulty || difficulty === "All" || prompt.difficulty?.toLowerCase() === difficulty.toLowerCase();

    return matchesSearch && matchesCategory && matchesAiTool && matchesDifficulty;
  });

  // Sorting
  if (sortBy === "Most Copied") {
    filteredPrompts.sort((a, b) => (b.copyCount || 0) - (a.copyCount || 0));
  } else if (sortBy === "Most Popular") {
    filteredPrompts.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));
  } else {
    filteredPrompts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <PromptsHeaderBar totalPrompts={filteredPrompts.length} />

      {/* Main Container Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <PromptsSidebarFilter />
        <PromptListingContainer prompts={filteredPrompts} />
      </div>
    </div>
  );
}