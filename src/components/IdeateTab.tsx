import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Zap, Plus, Info, Share2, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils.ts";
import ArgdownRenderer from "./ArgdownRenderer.tsx";
import { ideateReasoning, generateArgdown } from "../services/llmService.ts";
import { Idea } from "../types.ts";

interface Props {
  question: string;
  ideas: Idea[];
  setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>;
}

export default function IdeateTab({ question, ideas, setIdeas }: Props) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState("");
  const [argdownText, setArgdownText] = useState("");

  // Log when component mounts
  useEffect(() => {
    console.log('IdeateTab component initialized');
  }, []);

  const handleIdeate = async () => {
    if (!inputText.trim()) return;

    // Log user interaction
    console.log('User clicked Ideate button');
    console.log('Input text:', inputText.substring(0, 100) + '...');

    setIsLoading(true);
    setError(null);
    try {
      const result = await ideateReasoning(question, inputText);
      setReasoning(result);
      console.log('Ideate successful');
      
      const argdown = await generateArgdown(question, inputText, result);
      setArgdownText(argdown);
      console.log('Argdown generation successful');
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred");
      console.error('Ideate failed:', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!inputText.trim()) return;

    // Log user interaction
    console.log('User clicked Submit button');
    console.log('Submitting idea:', inputText.substring(0, 100) + '...');

    const newIdea: Idea = {
      id: crypto.randomUUID(),
      text: inputText,
      reasoning,
      timestamp: Date.now()
    };
    setIdeas([newIdea, ...ideas]);
    setInputText("");
    setReasoning("");
    console.log('Idea submitted successfully, total ideas:', ideas.length + 1);
  };

  return (
    <div className="flex gap-6 h-full min-h-0 overflow-hidden">
      {/* Left Column (60%) */}
      <div className="w-3/5 flex flex-col h-full gap-6">
        {/* Socratic Reasoning Area */}
        <div className="flex-grow bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Socratic Reasoning Engine</h3>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          
          <div className="p-6 overflow-y-auto relative">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-full gap-2 text-slate-400 py-12"
                >
                  <Zap className="animate-pulse w-5 h-5" />
                  <span className="text-sm font-medium">Generating Perspective...</span>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-3 text-red-500 py-12"
                >
                  <div className="p-3 bg-red-50 rounded-full">
                    <Zap className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold">System Error</p>
                    <p className="text-xs opacity-80 max-w-xs">{error}</p>
                  </div>
                  <button 
                    onClick={handleIdeate}
                    className="mt-2 px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Retry
                  </button>
                </motion.div>
              ) : reasoning ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="font-sans text-sm leading-relaxed text-slate-700">
                    {reasoning.split('\n').map((line, i) => {
                      if (line.startsWith('-')) {
                        return (
                          <details key={i} className="group mb-4 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                            <summary className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-100 transition-colors list-none">
                              <div className="w-6 h-6 rounded bg-indigo-100 shrink-0 flex items-center justify-center text-[10px] font-bold text-indigo-600 border border-indigo-200 group-open:rotate-90 transition-transform">
                                <ChevronRight size={12} />
                              </div>
                              <p className="text-indigo-900 font-medium text-sm truncate">Socratic Inquiry {i + 1}</p>
                            </summary>
                            <div className="p-3 pt-0 pb-3 px-3 pl-9">
                              <p className="text-slate-600 italic text-base">"{line.replace('- ', '')}"</p>
                            </div>
                          </details>
                        );
                      }
                      if (line.trim().length === 0) return null;
                      return (
                        <div key={i} className="pl-9 border-l-2 border-indigo-100 mb-6">
                          <p className="text-sm leading-relaxed text-slate-700">
                            {line}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-4 py-20">
                  <Info size={48} strokeWidth={1} />
                  <p className="text-sm italic font-medium text-center max-w-xs">
                    Engage the system in dialogue by entering an idea below.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* User Input Box */}
        <div className="shrink-0 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <textarea
            className="w-full h-24 p-4 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
            placeholder="Share your perspective here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleIdeate}
              disabled={isLoading}
              className={cn(
                "px-6 py-2.5 bg-white border border-indigo-600 text-indigo-600 text-sm font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              )}
            >
              <Zap size={14} />
              Ideate
            </button>
            <button
              onClick={handleSubmit}
              className={cn(
                "px-8 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg flex items-center gap-2"
              )}
            >
              <Plus size={14} />
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Personal Graph (40%) */}
      <div className="w-2/5 flex flex-col h-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden min-h-0">
        <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Personal Discourse Graph</h3>
          <button className="text-[10px] text-indigo-600 font-bold hover:underline uppercase tracking-tight">Expand View</button>
        </div>
        <div className="flex-grow relative bg-slate-50/30 overflow-hidden">
          {isLoading ? (
            <div className="p-6 space-y-4 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div className="flex-grow h-4 bg-slate-200 rounded"></div>
              </div>
              <div className="flex gap-4 items-center mt-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div className="flex-grow h-4 bg-slate-200 rounded"></div>
              </div>
              <div className="flex gap-4 items-center mt-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div className="flex-grow h-4 bg-slate-200 rounded"></div>
              </div>
            </div>
          ) : (
            <ArgdownRenderer text={argdownText} />
          )}
        </div>
        <div className="p-4 border-t border-slate-100 bg-white shrink-0">
          <p className="text-[10px] text-slate-400 leading-tight italic">
            * This graph dynamically visualizes logical connections between your premise and Socratic inquiries.
          </p>
        </div>
      </div>
    </div>
  );
}

export { IdeateTab };
