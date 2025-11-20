'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import RoastForm from '@/components/RoastForm';
import RoastDisplay from '@/components/RoastDisplay';
import { RoastResponse } from '@/types/roast';

import { incrementVisitorCount } from '@/app/actions';

export default function Home() {
  const [roastResult, setRoastResult] = useState<RoastResponse | null>(null);

  useEffect(() => {
    // Track visitor count on server
    incrementVisitorCount();
  }, []);

  const handleReset = () => {
    setRoastResult(null);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/20 -z-10" />

      {/* Navigation */}
      <Navigation />

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <header className="text-center mb-8 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-3 text-red-500 uppercase tracking-tight animate-in fade-in slide-in-from-top-8 duration-700">
            Get Your Career
            <br />
            <span className="text-white">Humbled.</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-mono max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
            Paste your LinkedIn profile text. Get brutally honest feedback from an AI that's seen it all.
          </p>
        </header>

        {/* Main Content */}
        <div className="mb-8">
          {roastResult ? (
            <RoastDisplay roast={roastResult} onReset={handleReset} />
          ) : (
            <RoastForm onRoastComplete={setRoastResult} />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center text-zinc-600 font-mono text-xs pt-6 mt-8 border-t border-zinc-800">
          <p>No profiles were permanently harmed in the making of this roast!</p>
          <p className="mt-1">Built with love • Powered by techiepedia Project Funds</p>
        </footer>
      </div>
    </main>
  );
}
