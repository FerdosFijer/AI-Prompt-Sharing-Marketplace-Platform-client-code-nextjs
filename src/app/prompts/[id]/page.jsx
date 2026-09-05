// src/app/prompts/[id]/page.jsx

import React from 'react';
import Link from 'next/link';
import { getPromptsById } from '@/lib/api/prompts';
import { 
  ArrowLeft, 
  Bookmark, 
  Flag, 
  Copy, 
  Lock, 
  Star, 
  Person, 
  PaperPlane 
} from '@gravity-ui/icons';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

export default async function PromptDetailsPage({ params }) {
  const { id } = await params;
  const user = await getUserSession();
  if(!user){
    redirect (`/auth/signin?redirect=/prompts/${id}`)
  }
  const prompt = await getPromptsById(id);
  if (!prompt) {
    return (
      <div className="min-h-screen bg-[#070A11] text-white flex items-center justify-center">
        <p className="text-gray-400">Prompt not found.</p>
      </div>
    );
  }

  const isPrivate = prompt.visibility === 'private';

  return (
    <div className="min-h-screen bg-[#070A11] text-gray-200 p-6 md:p-12 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Navigation Link */}
      <Link 
        href="/prompts" 
        className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to previous page
      </Link>

      {/* Main Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Main Content & Template */}
        <div className="lg:col-span-2 bg-[#0B0F19] border border-gray-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-8">
          <div>
            {/* Header: Title & Action Buttons */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {prompt.title}
                </h1>
                <p className="text-xs text-gray-400 mt-2 font-medium">
                  {prompt.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2.5 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-2.5 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all">
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Prompt Template Box */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Prompt Template</h3>
                {!isPrivate && (
                  <button className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg text-xs text-gray-300 hover:text-white flex items-center gap-1.5 font-medium transition-all">
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </button>
                )}
              </div>

              {/* Conditional Display for Private (Premium) vs Public Content */}
              {isPrivate ? (
                <div className="relative overflow-hidden bg-[#0D1220] border border-gray-800/90 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4">
                  {/* Backdrop Blurred Preview */}
                  <div className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-md z-0" />
                  
                  <div className="relative z-10 space-y-3 max-w-md">
                    <h4 className="text-lg font-extrabold text-white">
                      Premium Prompt Content Locked
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Unlock access to this prompt, review options, and duplicate copies for a one-time upgrade.
                    </p>
                    <div className="pt-2">
                      <Link 
                        href="/plans" 
                        className="inline-block px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs rounded-full shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-[1.02]"
                      >
                        Subscribe to Premium ($5)
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#050811] border border-gray-800/80 rounded-2xl p-5 text-xs text-purple-300 font-mono leading-relaxed wrap-break-word">
                  {prompt.content}
                </div>
              )}
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="pt-6 border-t border-gray-800/60 space-y-2">
            <h3 className="text-sm font-bold text-white">Usage Instructions</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              For best results, configure your parameters on {prompt.aiTool || 'AI Tool'} with low temperature (0.3 – 0.5) to avoid hallucinations. Replace bracketed tags in the template with your target topic details.
            </p>
          </div>
        </div>

        {/* Right Sidebar: Details & Creator Meta */}
        <div className="bg-[#0B0F19] border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-white border-b border-gray-800/80 pb-4">
              Prompt Details
            </h2>

            <div className="space-y-4 text-xs font-medium">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">AI Engine</span>
                <span className="px-2.5 py-1 bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold uppercase rounded-md text-[10px]">
                  {prompt.aiTool}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Category</span>
                <span className="px-2.5 py-1 bg-teal-950/80 border border-teal-500/40 text-teal-300 font-bold uppercase rounded-md text-[10px]">
                  {prompt.category}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Difficulty</span>
                <span className="px-2.5 py-1 bg-gray-900 border border-gray-700 text-gray-300 font-bold uppercase rounded-md text-[10px]">
                  {prompt.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Visibility</span>
                <span className="font-bold uppercase text-white tracking-wider text-[11px]">
                  {prompt.visibility}
                </span>
              </div>

              <hr className="border-gray-800/80" />

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Copies Made</span>
                <span className="font-bold text-white">{prompt.copyCount || 0}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Bookmarks</span>
                <span className="font-bold text-white">3</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Community Rating</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  5 <span className="text-gray-500 font-normal">(3)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Creator Profile Information */}
          <div className="border-t border-gray-800/80 pt-6 space-y-3">
            <h3 className="text-xs font-bold text-white">Creator Information</h3>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400">
                <Person className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">Mr.Creator</p>
                <p className="text-[11px] text-gray-500 truncate">creator@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Community Reviews Section */}
      <div className="pt-6 space-y-6">
        <h2 className="text-xl font-bold text-white">
          Community Reviews ({isPrivate ? 1 : 0})
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Submit Review Form */}
          <div className="bg-[#0B0F19] border border-gray-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Submit a Review</h3>

            {isPrivate ? (
              <div className="bg-[#070A11] border border-gray-800 rounded-xl p-4 flex items-center gap-3 text-xs text-gray-500">
                <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                <p>
                  Reviews are disabled for premium locked prompts.<br />
                  Subscribe to premium to contribute feedback.
                </p>
              </div>
            ) : (
              <form className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400 cursor-pointer" />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Comment
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your review here. What worked? How did you test it?"
                    className="w-full bg-[#070A11] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
                >
                  <PaperPlane className="w-3.5 h-3.5" />
                  Submit Review
                </button>
              </form>
            )}
          </div>

          {/* Existing Reviews List / Empty State */}
          <div>
            {isPrivate ? (
              <div className="bg-[#0B0F19] border border-gray-800/80 rounded-2xl p-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-xs font-bold text-white">
                    L
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Learning Node (Store)</h4>
                    <p className="text-[10px] text-gray-500">8/10/2026</p>
                    <p className="text-xs text-gray-300 italic mt-2"> Very long prompt </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#0B0F19] border border-gray-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center justify-center text-gray-500">
                  <PaperPlane className="w-4 h-4" />
                </div>
                <p className="text-xs text-gray-400">
                  No reviews submitted yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}