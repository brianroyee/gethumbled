'use client';

import { RoastResponse } from '@/types/roast';
import FeedbackForm from './FeedbackForm';
import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

interface RoastDisplayProps {
    roast: RoastResponse;
    onReset: () => void;
}

export default function RoastDisplay({ roast, onReset }: RoastDisplayProps) {
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const roastRef = useRef<HTMLDivElement>(null);

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

    const generateImage = async () => {
        if (!roastRef.current) return null;
        
        setIsGeneratingImage(true);
        try {
            const dataUrl = await toPng(roastRef.current, {
                quality: 0.95,
                pixelRatio: 2,
            });
            return dataUrl;
        } catch (error) {
            console.error('Failed to generate image:', error);
            return null;
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleShareToLinkedIn = async () => {
        const imageUrl = await generateImage();
        if (!imageUrl) {
            alert('Failed to generate image. Please try again.');
            return;
        }

        // Download the image
        const link = document.createElement('a');
        link.download = 'linkedin-roast.png';
        link.href = imageUrl;
        link.click();

        // Open LinkedIn share dialog
        const text = `I got roasted by GetHumbled and scored ${roast.score}/10 😭\n\nGet your brutal feedback at: ${window.location.origin}`;
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
        
        setTimeout(() => {
            window.open(linkedInUrl, '_blank');
            alert('Image downloaded! Now upload it to your LinkedIn post.');
        }, 500);
    };

    const handleShareToX = async () => {
        const imageUrl = await generateImage();
        if (!imageUrl) {
            alert('Failed to generate image. Please try again.');
            return;
        }

        // Download the image
        const link = document.createElement('a');
        link.download = 'linkedin-roast.png';
        link.href = imageUrl;
        link.click();

        // Open X share dialog
        const tweetText = `I got roasted by GetHumbled and scored ${roast.score}/10 😭\n\nGet humbled at: ${window.location.origin}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        
        setTimeout(() => {
            window.open(twitterUrl, '_blank');
            alert('Image downloaded! Now upload it to your post on X.');
        }, 500);
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Bento Grid Layout */}
            <div ref={roastRef} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* 1. Score Card (Large, Top Left) */}
                <div className="md:col-span-4 bg-zinc-900 border-4 border-red-500 p-8 flex flex-col justify-center items-center text-center shadow-[8px_8px_0px_0px_rgba(239,68,68,0.5)] hover:translate-x-1 hover:-translate-y-1 transition-transform duration-300">
                    <h2 className="text-red-400 font-mono uppercase tracking-wider text-sm mb-2">The Verdict</h2>
                    <div className={`text-8xl font-black font-mono ${getScoreColor(roast.score)}`}>
                        {roast.score}
                    </div>
                    <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest mt-2">
                        / 10
                    </div>
                    <div className="mt-4 px-4 py-1 bg-zinc-800 rounded text-zinc-300 font-mono text-xs uppercase">
                        {getScoreLabel(roast.score)}
                    </div>
                </div>

                {/* 2. Headline Roast (Wide, Top Right) */}
                <div className="md:col-span-8 bg-zinc-900 border-2 border-zinc-700 p-8 flex flex-col justify-center hover:border-red-500/50 transition-colors duration-300">
                    <h3 className="text-red-400 font-mono uppercase tracking-wider text-xs mb-4">Headline Analysis</h3>
                    <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        &ldquo;{roast.headline_roast}&rdquo;
                    </p>
                </div>

                {/* 3. Summary Roast (Medium, Middle Left) */}
                <div className="md:col-span-7 bg-zinc-900 border-2 border-zinc-700 p-8 hover:border-red-500/50 transition-colors duration-300">
                    <h3 className="text-red-400 font-mono uppercase tracking-wider text-xs mb-4">Profile Breakdown</h3>
                    <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-line">
                        {roast.summary_roast}
                    </p>
                </div>

                {/* 4. Red Flags (Medium, Middle Right) */}
                <div className="md:col-span-5 bg-red-950/20 border-2 border-red-900/50 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-red-400 font-mono uppercase tracking-wider text-xs">Red Flags</h3>
                        <span className="bg-red-600 text-white px-2 py-0.5 font-mono text-xs rounded">
                            {roast.buzzword_count} DETECTED
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {roast.red_flags.map((flag, index) => (
                            <span 
                                key={index} 
                                className="inline-flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded hover:bg-red-500/20 transition-colors cursor-default"
                            >
                                <span className="text-red-500">⚠</span> {flag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 5. Career Advice (Full Width, Bottom) */}
                <div className="md:col-span-12 bg-gradient-to-r from-zinc-900 to-zinc-800 border-l-4 border-orange-500 p-8">
                    <h3 className="text-orange-400 font-mono uppercase tracking-wider text-xs mb-2">Unsolicited Career Advice</h3>
                    <p className="text-xl md:text-2xl text-zinc-100 italic font-serif">
                        {roast.career_advice}
                    </p>
                </div>
            </div>

            {/* Feedback Form */}
            <FeedbackForm />

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                    onClick={handleShareToLinkedIn}
                    disabled={isGeneratingImage}
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-mono uppercase tracking-wider py-4 px-8 border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGeneratingImage ? 'Generating...' : '📸 Share to LinkedIn'}
                </button>
                <button
                    onClick={handleShareToX}
                    disabled={isGeneratingImage}
                    className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-mono uppercase tracking-wider py-4 px-8 border-b-4 border-zinc-900 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGeneratingImage ? 'Generating...' : '📸 Share to X'}
                </button>
                <button
                    onClick={onReset}
                    className="flex-1 bg-red-900 hover:bg-red-800 text-zinc-300 font-mono uppercase tracking-wider py-4 px-8 border-b-4 border-red-950 active:border-b-0 active:translate-y-1 transition-all"
                >
                    Roast Another
                </button>
            </div>

            {/* Educational Link */}
            <div className="text-center pt-8 border-t border-zinc-800/50">
                <p className="text-zinc-500 mb-3 text-sm">Stung a little? Here's why it matters:</p>
                <a
                    href="/why-about-matters"
                    className="inline-block bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono uppercase py-3 px-6 border-2 border-zinc-700 hover:border-red-500 transition-all text-sm tracking-wider mt-2"
                >
                    Why the "About" Section is Critical →
                </a>
            </div>
        </div>
    );
}
