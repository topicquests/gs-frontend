import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, Award } from "lucide-react";
import { Idea } from "./types.ts";
import { clsxMerge } from "./lib/utils.ts";
import IdeateTab from "./components/IdeateTab.tsx";
import TabButton from "./components/TabButton.tsx";
import useLocalStorage from "./hooks/useLocalStorage.ts";

export default function App() {
  const [activeTab, setActiveTab] = useState<"ideate" | "graph" | "contributions">("ideate");
  const [question] = useState("Are collaborative documents more effective than sequential individual editing?");
  const [ideas, setIdeas] = useLocalStorage<Idea[]>("sensemaking-ideas", []);
  const [onlineUsers] = useState(12);
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 flex flex-col">
      {/* Admin Notice Area */}
      <header className="bg-indigo-700 text-white py-2 px-6 flex justify-between items-center shrink-0 shadow-md">
        <div className="flex items-center space-x-3">
          <span className="bg-indigo-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Admin Post</span>
          <p className="text-sm font-medium">"{question}"</p>
        </div>
        <div className="text-xs opacity-80 italic">Active Discussion</div>
      </header>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
        {/* Navigation Tabs */}
        <nav className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 flex items-center h-14 shrink-0 mb-6">
          <div className="flex space-x-8 h-full">
            <TabButton 
              active={activeTab === "ideate"} 
              onClick={() => setActiveTab("ideate")}
              label="Ideate"
            />
            <TabButton 
              active={activeTab === "graph"} 
              onClick={() => setActiveTab("graph")}
              label="Collaborative Graph"
            />
            <TabButton 
              active={activeTab === "contributions"} 
              onClick={() => setActiveTab("contributions")}
              label="Contributions"
            />
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-400"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-green-400"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-400"></div>
            </div>
            <span className="text-xs text-slate-400 font-medium">{onlineUsers} Online</span>
          </div>
        </nav>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === "ideate" && (
              <motion.div
                key="ideate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <IdeateTab question={question} ideas={ideas} setIdeas={setIdeas} />
              </motion.div>
            )}
            {activeTab === "graph" && (
              <motion.div
                key="graph"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full flex-col gap-4 text-slate-400 bg-white border border-slate-200 rounded-2xl shadow-sm"
              >
                <Share2 size={64} strokeWidth={1} />
                <p className="text-xl italic font-serif">Collaborative Graph view coming soon...</p>
              </motion.div>
            )}
            {activeTab === "contributions" && (
              <motion.div
                key="contributions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full flex-col gap-4 text-slate-400 bg-white border border-slate-200 rounded-2xl shadow-sm"
              >
                <Award size={64} strokeWidth={1} />
                <p className="text-xl italic font-serif">Your contributions will appear here.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

