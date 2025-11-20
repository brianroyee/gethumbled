'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

import { getFundingAmount } from '@/app/actions';

export default function SupportPage() {
  const [currentFunding, setCurrentFunding] = useState(0);
  const goalAmount = 50;
  const progressPercentage = (currentFunding / goalAmount) * 100;

  useEffect(() => {
    // Load funding amount from server
    getFundingAmount().then(amount => {
      setCurrentFunding(Number(amount));
    });
  }, []);

  const copyUPI = () => {
    navigator.clipboard.writeText('brian@superyes');
    alert('UPI ID copied!');
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/20 -z-10" />
      
      {/* Navigation */}
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-red-500 uppercase tracking-tight">
            Support 💰
          </h1>
          <p className="text-zinc-400 text-lg font-mono max-w-2xl mx-auto">
            Help add LinkedIn URL scraping (because APIs aren't free).
          </p>
        </header>

        {/* Goal Card with Progress Bar */}
        <div className="bg-zinc-900 border-4 border-red-500 p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(239,68,68,0.5)] hover:translate-x-1 hover:-translate-y-1 transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="text-7xl font-black text-red-500 mb-2 tracking-tighter">${goalAmount}</div>
            <div className="text-zinc-300 mb-1 font-mono uppercase tracking-widest text-sm">Monthly Goal</div>
            <div className="text-xs text-zinc-500 font-mono">
              = 1,000 LinkedIn profiles/month via Proxycurl API
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-zinc-400 mb-2 font-mono uppercase">
              <span>${currentFunding} raised</span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-zinc-950 h-6 border-2 border-zinc-800 relative overflow-hidden">
              <div 
                className="bg-red-600 h-full transition-all duration-1000 ease-out relative"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px] animate-[pulse_2s_linear_infinite]" />
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-3 text-center font-mono">
              {currentFunding === 0 ? 'Be the first to support!' : `$${goalAmount - currentFunding} more to go!`}
            </p>
          </div>
        </div>

        {/* Why Support - Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="bg-zinc-900 border-2 border-red-500/30 p-6 hover:border-red-500 transition-colors group">
                <div className="text-red-500 text-2xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
                <div className="text-sm text-zinc-300 font-mono">Instant Roasts</div>
            </div>
            <div className="bg-zinc-900 border-2 border-red-500/30 p-6 hover:border-red-500 transition-colors group">
                <div className="text-red-500 text-2xl mb-2 group-hover:scale-110 transition-transform">📋</div>
                <div className="text-sm text-zinc-300 font-mono">No Copy/Paste</div>
            </div>
            <div className="bg-zinc-900 border-2 border-red-500/30 p-6 hover:border-red-500 transition-colors group">
                <div className="text-red-500 text-2xl mb-2 group-hover:scale-110 transition-transform">🔄</div>
                <div className="text-sm text-zinc-300 font-mono">Always Fresh Data</div>
            </div>
        </div>

        {/* Support Methods */}
        <div className="mb-12">
          <h2 className="text-xl text-red-400 mb-6 uppercase text-center font-mono tracking-wider">Choose Your Method</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Buy Me a Coffee */}
            <a
              href="https://www.buymeacoffee.com/brianroyee"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-yellow-500 hover:bg-yellow-400 text-black uppercase px-6 py-8 border-b-8 border-yellow-700 active:border-b-0 active:translate-y-2 transition-all text-center group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">☕</div>
              <div className="text-xl font-bold font-mono">Buy Me a Coffee</div>
              <div className="text-xs mt-2 font-mono opacity-80">One-time or monthly</div>
            </a>

            {/* Google Pay */}
            <a
              href="upi://pay?pa=brian@superyes&pn=Brian%20Roy%20Mathew&cu=INR"
              className="block bg-blue-600 hover:bg-blue-500 text-white uppercase px-6 py-8 border-b-8 border-blue-800 active:border-b-0 active:translate-y-2 transition-all text-center group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💳</div>
              <div className="text-xl font-bold font-mono">Google Pay (UPI)</div>
              <div className="text-xs mt-2 font-mono opacity-80">Instant transfer</div>
            </a>
          </div>

          {/* QR Code and UPI ID Display */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-zinc-900 border-2 border-zinc-700 p-8 max-w-sm w-full">
              <p className="text-sm text-zinc-400 mb-6 uppercase font-mono tracking-wider">Scan to Pay</p>
              
              {/* QR Code Image */}
              <div className="bg-white p-4 inline-block mb-6 rounded-sm">
                <img 
                  src="/qr-code.png" 
                  alt="UPI QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>
              
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-xs text-zinc-500 mb-2 font-mono uppercase">UPI ID</p>
                <div className="flex items-center justify-center gap-2 bg-black p-3 border border-zinc-800 mb-2">
                    <code className="text-red-400 font-mono">brian@superyes</code>
                </div>
                <button
                  onClick={copyUPI}
                  className="text-xs text-zinc-400 hover:text-white transition-colors font-mono uppercase tracking-wide border-b border-zinc-700 hover:border-white pb-0.5"
                >
                  Click to copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency */}
        <div className="text-center border-t border-zinc-800 pt-8">
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-2">100% Transparent • All funds go to API costs</p>
            <p className="text-zinc-600 text-[10px] font-mono">Free & open-source forever 🔥</p>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-block bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono uppercase py-3 px-8 border-2 border-zinc-700 transition-colors text-sm tracking-wider"
          >
            ← Back to Roasting
          </a>
        </div>
      </div>
    </main>
  );
}
