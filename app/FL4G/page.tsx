'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

type Challenge = {
  id: string;
  level: number;
  name: string;
  difficulty: string;
  flag: string;
  completed: boolean;
  category: string;
  tags: string[];
};

type LeaderboardEntry = {
  name: string;
  flagsFound: number;
};

export default function FL4GPage() {
  const [flagInput, setFlagInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<Record<number, number>>({});
  const [hints, setHints] = useState<Record<number, string>>({});
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [completedFlags, setCompletedFlags] = useState<Set<string>>(new Set());
  const [solvesByLevel, setSolvesByLevel] = useState<Record<string, number>>({});
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [lastSolvedLevel, setLastSolvedLevel] = useState<string>('');

  const challenges: Challenge[] = [
    {
      id: 'level_1',
      level: 1,
      name: 'Network Ninja',
      difficulty: 'Medium',
      flag: 'NETWORK_NINJA_1',
      completed: false,
      category: 'Web',
      tags: ['HTTP Headers', 'Cryptography', 'OSINT']
    },
    {
      id: 'level_2',
      level: 2,
      name: 'Prompt Master',
      difficulty: 'Hard',
      flag: 'PROMPT_MASTER_2',
      completed: false,
      category: 'Web',
      tags: ['Prompt Injection', 'AI Security', 'Input Validation']
    }
  ];

  useEffect(() => {
    // Load completed flags from localStorage
    const stored = localStorage.getItem('ctf_completed_flags');
    if (stored) {
      setCompletedFlags(new Set(JSON.parse(stored)));
    }

    // Load leaderboard
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/submit-flag');
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
      setSolvesByLevel(data.solvesByLevel || {});
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/submit-flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flag: flagInput, name: nameInput || 'Anonymous' })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setMessage(data.message);
        
        // Store completed flag
        const newCompleted = new Set(completedFlags);
        newCompleted.add(flagInput.trim().toUpperCase());
        setCompletedFlags(newCompleted);
        localStorage.setItem('ctf_completed_flags', JSON.stringify(Array.from(newCompleted)));
        
        // Refresh leaderboard
        fetchLeaderboard();
        
        // Clear input
        setFlagInput('');
        
        // Show email popup for gift
        setLastSolvedLevel(data.level);
        setShowEmailPopup(true);
      } else {
        setIsSuccess(false);
        setMessage(data.message || 'Incorrect flag. Try again!');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Error submitting flag. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetHint = async (level: number) => {
    const currentIndex = currentHintIndex[level] || 0;

    try {
      const response = await fetch('/api/submit-flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_hint', level, hintIndex: currentIndex })
      });

      const data = await response.json();
      
      if (data.hint) {
        setHints(prev => ({ ...prev, [level]: data.hint }));
        setCurrentHintIndex(prev => ({ ...prev, [level]: currentIndex + 1 }));
      }
    } catch (error) {
      console.error('Failed to get hint:', error);
    }
  };

  const handleEmailSubmit = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setEmailSubmitting(true);
    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: emailInput, 
          level: lastSolvedLevel,
          name: nameInput || 'Anonymous'
        })
      });

      if (response.ok) {
        setShowEmailPopup(false);
        setEmailInput('');
      }
    } catch (error) {
      console.error('Failed to submit email:', error);
    } finally {
      setEmailSubmitting(false);
    }
  };

  const completedCount = challenges.filter(c => completedFlags.has(c.flag)).length;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/20 -z-10" />

      <Navigation />

      {/* Email Popup for Gift */}
      {showEmailPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-zinc-900 border-4 border-green-500 max-w-md w-full p-8 shadow-[12px_12px_0px_0px_rgba(34,197,94,0.8)] animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎁</div>
              <h2 className="text-3xl font-bold font-mono text-green-500 uppercase tracking-tight mb-2">
                Congratulations!
              </h2>
              <p className="text-zinc-300 font-mono text-sm">
                You solved the challenge! Enter your email to claim your gift.
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-zinc-800 border-2 border-zinc-700 text-white p-4 focus:border-green-500 focus:outline-none font-mono"
                disabled={emailSubmitting}
              />

              <div className="flex gap-3">
                <button
                  onClick={handleEmailSubmit}
                  disabled={emailSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white uppercase py-3 px-6 border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all font-mono font-bold disabled:opacity-50"
                >
                  {emailSubmitting ? 'Submitting...' : 'Claim Gift'}
                </button>
                <button
                  onClick={() => setShowEmailPopup(false)}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 uppercase py-3 px-6 border-b-4 border-zinc-900 active:border-b-0 active:translate-y-1 transition-all font-mono"
                >
                  Skip
                </button>
              </div>

              <p className="text-zinc-500 text-xs text-center font-mono">
                We'll contact you about your prize. No spam, promise.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-red-500 uppercase tracking-tight font-mono animate-in fade-in slide-in-from-top-8 duration-700">
            FL4G SUBMISSION
          </h1>
          <p className="text-zinc-400 text-lg font-mono animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
            Submit your captured flags and claim your glory
          </p>
        </header>

        {/* Progress */}
        <div className="bg-zinc-900 border-2 border-red-500/30 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-red-400 uppercase font-mono">Progress</h2>
            <span className="text-2xl font-bold text-white font-mono">{completedCount}/{challenges.length}</span>
          </div>
          <div className="bg-zinc-800 h-4 rounded-none overflow-hidden">
            <div 
              className="bg-red-500 h-full transition-all duration-500"
              style={{ width: `${(completedCount / challenges.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flag Submission Form */}
        <div className="bg-zinc-900 border-4 border-red-500 p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,0.5)]">
          <h2 className="text-2xl text-red-400 uppercase font-mono mb-6">Submit Flag</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-mono uppercase">Flag</label>
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="ENTER_FLAG_HERE"
                className="w-full bg-zinc-800 border-2 border-zinc-700 text-white p-4 focus:border-red-500 focus:outline-none font-mono uppercase"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-mono uppercase">Name (Optional)</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Anonymous"
                maxLength={30}
                className="w-full bg-zinc-800 border-2 border-zinc-700 text-white p-4 focus:border-red-500 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white uppercase py-4 px-8 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all font-mono font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Submit Flag'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-4 border-2 ${isSuccess ? 'bg-green-950/30 border-green-500 text-green-400' : 'bg-red-950/30 border-red-500 text-red-400'} font-mono text-sm`}>
              {message}
            </div>
          )}
        </div>

        {/* Challenges */}
        <div className="bg-zinc-900 border-2 border-zinc-700 p-8 mb-8">
          <h2 className="text-2xl text-zinc-400 uppercase font-mono mb-6">Active Challenges</h2>
          
          <div className="space-y-6">
            {challenges.map((challenge) => {
              const isCompleted = completedFlags.has(challenge.flag);
              const difficultyColor = challenge.difficulty === 'Hard' ? 'text-red-400' : 'text-orange-400';
              const borderColor = isCompleted ? 'border-green-500 bg-green-950/10' : 'border-zinc-700 hover:border-red-500/50';
              
              return (
                <div key={challenge.id} className={`bg-zinc-800 border-2 ${borderColor} p-6 transition-all duration-300 group`}>
                  {/* Challenge Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {isCompleted && (
                          <span className="text-2xl animate-in zoom-in duration-300">✅</span>
                        )}
                        <h3 className="text-2xl font-bold text-white font-mono">
                          Level {challenge.level}: {challenge.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm font-mono">
                        <span className="text-zinc-500">
                          Difficulty: <span className={`${difficultyColor} font-bold`}>{challenge.difficulty}</span>
                        </span>
                        {!isCompleted && (
                          <span className="text-zinc-600">
                            • Hints Used: {(currentHintIndex[challenge.level] || 0)}/3
                          </span>
                        )}
                      </div>

                      {/* Category and Tags */}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className="bg-blue-600/20 border border-blue-500/50 text-blue-400 px-2 py-1 text-xs uppercase font-mono font-bold">
                          {challenge.category}
                        </span>
                        {challenge.tags.map((tag, idx) => (
                          <span key={idx} className="bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-1 text-xs font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {!isCompleted && (
                      <button
                        onClick={() => handleGetHint(challenge.level)}
                        disabled={(currentHintIndex[challenge.level] || 0) >= 3}
                        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 text-sm uppercase font-mono font-bold transition-all border-2 border-orange-500 shadow-[4px_4px_0px_0px_rgba(251,146,60,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(251,146,60,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                      >
                        {(currentHintIndex[challenge.level] || 0) >= 3 ? '🔒 No More Hints' : '💡 Get Hint'}
                      </button>
                    )}
                  </div>

                  {/* Challenge Description */}
                  {challenge.level === 1 && (
                    <div className="bg-zinc-900 border-l-4 border-blue-500 p-4 mb-4">
                      <p className="text-blue-300 text-sm font-mono">
                        <strong>Mission:</strong> The secret isn't always visible. Sometimes you need to look deeper—beyond what's shown on the surface. Network requests hold more than just responses...
                      </p>
                    </div>
                  )}
                  
                  {challenge.level === 2 && (
                    <div className="bg-zinc-900 border-l-4 border-purple-500 p-4 mb-4">
                      <p className="text-purple-300 text-sm font-mono">
                        <strong>Mission:</strong> Every system has its weaknesses. The AI thinks it's unbreakable, but is it? Can you outsmart the roaster and make it reveal its secrets?
                      </p>
                    </div>
                  )}

                  {/* Solve Count */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-zinc-500 text-xs font-mono">
                      Solves: <span className="text-green-400 font-bold">{solvesByLevel[challenge.id] || 0}</span>
                    </span>
                  </div>

                  {/* Hint Display */}
                  {hints[challenge.level] && !isCompleted && (
                    <div className="bg-gradient-to-r from-orange-950/50 to-red-950/50 border-l-4 border-orange-500 p-5 mt-4 animate-in slide-in-from-left duration-300">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <div className="flex-1">
                          <div className="text-orange-400 font-bold text-xs uppercase mb-1 font-mono">
                            Hint {(currentHintIndex[challenge.level] || 0)}/3
                          </div>
                          <p className="text-orange-200 font-mono text-sm leading-relaxed">
                            {hints[challenge.level]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Completion Badge */}
                  {isCompleted && (
                    <div className="bg-gradient-to-r from-green-950/50 to-emerald-950/50 border-l-4 border-green-500 p-4 mt-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏆</span>
                        <div>
                          <div className="text-green-400 font-bold text-sm uppercase font-mono">
                            Challenge Completed!
                          </div>
                          <p className="text-green-300 text-xs font-mono mt-1">
                            You've conquered this challenge. Well done, hacker! 🎉
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pro Tips */}
          <div className="mt-8 bg-zinc-800 border-2 border-yellow-600/30 p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="text-yellow-400 font-bold uppercase text-sm mb-2 font-mono">Pro Tips</h3>
                <ul className="space-y-2 text-zinc-400 text-sm font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">▸</span>
                    <span>Use browser DevTools (F12) to inspect requests and headers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">▸</span>
                    <span> ***13 is a simple cipher - many online decoders available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">▸</span>
                    <span>Think like a hacker: what would you try if you wanted to break the system?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">▸</span>
                    <span>Flags are case-sensitive and use underscores (e.g., FLAG_FORMAT_LIKE_THIS)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-zinc-900 border-2 border-zinc-700 p-8">
          <h2 className="text-2xl text-zinc-400 uppercase font-mono mb-6">Hall of Fame</h2>
          
          {leaderboard.length === 0 ? (
            <p className="text-zinc-500 font-mono text-center py-8">No solvers yet. Be the first! 💀</p>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div key={index} className="flex items-center justify-between bg-zinc-800 p-4 border border-zinc-700">
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-bold font-mono ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-600' : 'text-zinc-600'}`}>
                      #{index + 1}
                    </span>
                    <span className="text-white font-mono">{entry.name}</span>
                  </div>
                  <span className="text-red-400 font-mono font-bold">{entry.flagsFound} flag{entry.flagsFound !== 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
