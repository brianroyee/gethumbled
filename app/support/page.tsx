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
      
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-red-500 uppercase">
            Support 💰
          </h1>
          <p className="text-zinc-400 text-lg">
            Help add LinkedIn URL scraping
          </p>
        </header>

        {/* Goal Card with Progress Bar */}
        <div className="bg-gradient-to-br from-red-950/50 to-red-900/30 border-2 border-red-500 p-8 mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-red-500 mb-2">${goalAmount}</div>
            <div className="text-zinc-300 mb-1">per month goal</div>
            <div className="text-sm text-zinc-400">
              = 1,000 LinkedIn profiles/month via Proxycurl API
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-zinc-400 mb-2">
              <span>${currentFunding} raised</span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-4 border-2 border-zinc-700">
              <div 
                className="bg-gradient-to-r from-red-600 to-orange-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-zinc-500 mt-2 text-center">
              {currentFunding === 0 ? 'Be the first to support!' : `$${goalAmount - currentFunding} more to go!`}
            </p>
          </div>
        </div>

        {/* Why Support - Bullet Points */}
        <div className="bg-zinc-900 border-2 border-red-500/30 p-6 mb-8">
          <h2 className="text-xl text-red-400 mb-4 uppercase">Why?</h2>
          <div className="space-y-3 text-zinc-300">
            <div className="flex items-start gap-3">
              <span className="text-red-500 text-xl">✓</span>
              <span className="text-sm">Paste LinkedIn URL → Instant roast</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500 text-xl">✓</span>
              <span className="text-sm">No more copy/paste hassle</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500 text-xl">✓</span>
              <span className="text-sm">Always fresh, up-to-date data</span>
            </div>
          </div>
        </div>

        {/* Support Methods - Only GPay and Buy Me a Coffee */}
        <div className="mb-8">
          <h2 className="text-xl text-red-400 mb-4 uppercase text-center">Choose Your Method</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Buy Me a Coffee */}
            <a
              href="https://www.buymeacoffee.com/brianroyee"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-yellow-600 hover:bg-yellow-700 text-white uppercase px-6 py-8 border-2 border-yellow-500 transition-colors text-center group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">☕</div>
              <div className="text-lg font-semibold">Buy Me a Coffee</div>
              <div className="text-xs mt-2 opacity-80">One-time or monthly</div>
            </a>

            {/* Google Pay */}
            <a
              href="upi://pay?pa=brian@superyes&pn=LinkedIn Roaster&cu=INR"
              className="block bg-blue-600 hover:bg-blue-700 text-white uppercase px-6 py-8 border-2 border-blue-500 transition-colors text-center group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">💳</div>
              <div className="text-lg font-semibold">Google Pay (UPI)</div>
              <div className="text-xs mt-2 opacity-80">Instant transfer</div>
            </a>
          </div>

          {/* QR Code and UPI ID Display */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-zinc-900 border-2 border-zinc-700 p-6">
              <p className="text-sm text-zinc-400 mb-4 uppercase">Scan to Pay</p>
              
              {/* QR Code Image - Add your QR code to public folder as qr-code.png */}
              <div className="bg-white p-4 inline-block mb-4 rounded">
                <img 
                  src="/qr-code.png" 
                  alt="UPI QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>
              
              <div className="border-t border-zinc-700 pt-4">
                <p className="text-xs text-zinc-500 mb-1">UPI ID:</p>
                <p className="text-zinc-300 text-sm mb-2">brian@superyes</p>
                <button
                  onClick={copyUPI}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors underline"
                >
                  Click to copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency - Simple */}
        <div className="bg-zinc-900 border-2 border-zinc-700 p-6 mb-8">
          <div className="text-center text-zinc-400 text-sm">
            <p className="mb-2">100% transparent • All funds → Proxycurl API</p>
            <p className="text-xs text-zinc-600">Free & open-source forever 🔥</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white uppercase py-3 px-6 border-2 border-red-500 transition-colors text-sm"
          >
            ← Back to Roasting
          </a>
        </div>
      </div>
    </main>
  );
}
