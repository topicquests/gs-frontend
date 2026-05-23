/**
 * Main application component.
 * Renders the overall layout with navigation tabs and tab content.
 * Uses localStorage to persist ideas across sessions.
 * Uses lazy loading for tab content components to reduce initial bundle size.
 */
import React, { useState, lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Award, Moon, Sun } from 'lucide-react';
import { Idea } from './types.ts';
import TabButton from './components/TabButton.tsx';
import useLocalStorage from './hooks/useLocalStorage.ts';

const IdeateTab = lazy(() => import('./components/IdeateTab.tsx'));

export default function App() {
  const [activeTab, setActiveTab] = useState<'ideate' | 'graph' | 'contributions'>('ideate');
  const [question] = useState(
    'Are collaborative documents more effective than sequential individual editing?'
  );
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => setIsDark(!isDark);

  useEffect(() => {
    const saved = localStorage.getItem('dark-mode');
    if (saved === 'true') setIsDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('dark-mode', isDark.toString());
  }, [isDark]);

  useEffect(() => {
    console.log(`Dark mode ${isDark ? 'enabled' : 'disabled'}`);
  }, [isDark]);

  const [ideas, setIdeas] = useLocalStorage<Idea[]>('sensemaking-ideas', []);
  const [onlineUsers] = useState(12);

  return (
    <div className="min-h-screen bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark font-sans selection:bg-primary-light/50 flex flex-col">
      {/* Admin Notice Area */}
      <header className="bg-primary-dark dark:bg-primary-dark text-surface-light py-2 px-6 flex justify-between items-center shrink-0 shadow-md">
        <div className="flex items-center space-x-3">
          <span className="bg-indigo-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
            Admin Post
          </span>
          <p className="text-sm font-medium">"{question}"</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-indigo-600 dark:bg-slate-700 hover:bg-indigo-700 dark:hover:bg-slate-600 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="text-xs opacity-80 italic">Active Discussion</div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
        {/* Navigation Tabs */}
        <nav className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-sm px-6 flex items-center h-14 shrink-0 mb-6">
          <div className="flex space-x-8 h-full">
            <TabButton
              active={activeTab === 'ideate'}
              onClick={() => setActiveTab('ideate')}
              label="Ideate"
            />
            <TabButton
              active={activeTab === 'graph'}
              onClick={() => setActiveTab('graph')}
              label="Collaborative Graph"
            />
            <TabButton
              active={activeTab === 'contributions'}
              onClick={() => setActiveTab('contributions')}
              label="Contributions"
            />
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-400"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-green-400"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-400"></div>
            </div>
            <span className="text-xs text-secondary-light dark:text-secondary-dark font-medium">
              {onlineUsers} Online
            </span>
          </div>
        </nav>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === 'ideate' && (
              <Suspense
                fallback={
                  <div className="h-full animate-pulse bg-slate-100 dark:bg-slate-800 rounded" />
                }
              >
                <motion.div
                  key="ideate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full"
                >
                  <IdeateTab question={question} ideas={ideas} setIdeas={setIdeas} />
                </motion.div>
              </Suspense>
            )}
            {activeTab === 'graph' && (
              <motion.div
                key="graph"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full flex-col gap-4 text-secondary-light dark:text-secondary-dark bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-sm"
              >
                <Share2 size={64} strokeWidth={1} />
                <p className="text-xl italic font-serif">Collaborative Graph view coming soon...</p>
              </motion.div>
            )}
            {activeTab === 'contributions' && (
              <motion.div
                key="contributions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full flex-col gap-4 text-secondary-light dark:text-secondary-dark bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-sm"
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
