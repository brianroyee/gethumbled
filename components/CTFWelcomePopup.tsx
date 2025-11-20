'use client';

import { useState, useEffect } from 'react';

export default function CTFWelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('ctf_popup_seen');
    
    if (!hasSeenPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ctf_popup_seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-900 border-4 border-red-500 max-w-2xl w-full p-8 shadow-[12px_12px_0px_0px_rgba(239,68,68,0.8)] animate-in slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold font-mono text-red-500 uppercase tracking-tight">
            🚨 CTF ALERT 🚨
          </h2>
          <button
            onClick={handleDismiss}
            className="text-zinc-500 hover:text-red-500 text-2xl font-bold transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-zinc-300 font-mono">
          <p className="text-lg">
            This website contains <span className="text-red-400 font-bold">hidden CTF challenges</span> for hackers, developers, and security enthusiasts.
          </p>

          <div className="bg-zinc-800 border-2 border-zinc-700 p-4">
            <h3 className="text-red-400 uppercase text-sm mb-3">Active Challenges:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-orange-500">🔸</span>
                <span><strong className="text-white">Level 1:</strong> Network Inspector (Medium)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">🔸</span>
                <span><strong className="text-white">Level 2:</strong> Prompt Injection Master (Hard)</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-zinc-400">
            Find the flags and submit them at <code className="bg-zinc-800 px-2 py-1 text-red-400">/FL4G</code> to claim your spot on the leaderboard.
          </p>

          <div className="flex gap-4 pt-4">
            <a
              href="/FL4G"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center uppercase py-3 px-6 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all font-bold"
            >
              Start Hacking →
            </a>
            <button
              onClick={handleDismiss}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 uppercase py-3 px-6 border-b-4 border-zinc-950 active:border-b-0 active:translate-y-1 transition-all"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
