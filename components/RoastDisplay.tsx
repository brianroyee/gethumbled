'use client';

import { RoastResponse } from '@/types/roast';

interface RoastDisplayProps {
    roast: RoastResponse;
    onReset: () => void;
}

export default function RoastDisplay({ roast, onReset }: RoastDisplayProps) {
    const getScoreColor = (score: number) => {
        if (score <= 3) return 'text-red-500';
        if (score <= 6) return 'text-orange-500';
        return 'text-yellow-500';
    };

    const getScoreLabel = (score: number) => {
        if (score <= 3) return 'UNEMPLOYABLE';
        if (score <= 5) return 'NEEDS WORK';
        if (score <= 7) return 'MEDIOCRE';
        return 'NOT TERRIBLE';
    };

    const handleShare = () => {
        const tweetText = `I got roasted by LinkedIn Profile Roaster and scored ${roast.score}/10 😭\n\n"${roast.career_advice}"\n\nGet humbled at: ${window.location.origin}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Header with Score */}
            <div className="bg-zinc-900 border-4 border-red-500 p-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-red-400 font-mono uppercase tracking-wider text-sm">The Verdict</h2>
                    <div className="text-right">
                        <div className={`text-6xl font-bold font-mono ${getScoreColor(roast.score)}`}>
                            {roast.score}/10
                        </div>
                        <div className="text-zinc-500 font-mono text-xs uppercase mt-1">
                            {getScoreLabel(roast.score)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Headline Roast */}
            <div className="bg-zinc-900 border-2 border-red-500/30 p-6">
                <h3 className="text-red-400 font-mono uppercase tracking-wider text-xs mb-3">Headline Analysis</h3>
                <p className="text-zinc-100 text-lg leading-relaxed">{roast.headline_roast}</p>
            </div>

            {/* Summary Roast */}
            <div className="bg-zinc-900 border-2 border-red-500/30 p-6">
                <h3 className="text-red-400 font-mono uppercase tracking-wider text-xs mb-3">Profile Breakdown</h3>
                <p className="text-zinc-100 leading-relaxed whitespace-pre-line">{roast.summary_roast}</p>
            </div>

            {/* Red Flags */}
            <div className="bg-red-950/30 border-2 border-red-500 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-red-400 font-mono uppercase tracking-wider text-xs">Red Flags Detected</h3>
                    <span className="bg-red-600 text-white px-3 py-1 font-mono text-sm">
                        {roast.buzzword_count} BUZZWORDS
                    </span>
                </div>
                <ul className="space-y-2">
                    {roast.red_flags.map((flag, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="text-red-500 text-xl">⚠</span>
                            <span className="text-zinc-100 flex-1">{flag}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Career Advice */}
            <div className="bg-zinc-900 border-2 border-orange-500/50 p-6">
                <h3 className="text-orange-400 font-mono uppercase tracking-wider text-xs mb-3">Unsolicited Career Advice</h3>
                <p className="text-zinc-100 text-lg italic leading-relaxed">&ldquo;{roast.career_advice}&rdquo;</p>
            </div>

            {/* Educational Link */}
            <div className="mt-8 text-center">
                <p className="text-zinc-500 mb-3 text-sm">Stung a little? Here's why it matters:</p>
                <a
                    href="/why-about-matters"
                    className="inline-block bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 px-6 py-3 rounded transition-colors text-sm uppercase tracking-wide"
                >
                    Why the "About" Section is Critical →
                </a>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={handleShare}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-mono uppercase tracking-wider py-4 px-8 border-2 border-blue-500 transition-colors"
                >
                    Share This Humiliation on X
                </button>
                <button
                    onClick={onReset}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono uppercase tracking-wider py-4 px-8 border-2 border-zinc-700 transition-colors"
                >
                    Roast Another Profile
                </button>
            </div>
        </div>
    );
}
