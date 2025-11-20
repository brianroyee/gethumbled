'use client';

import { useState } from 'react';
import { RoastResponse, RoastError } from '@/types/roast';

interface RoastFormProps {
    onRoastComplete: (roast: RoastResponse) => void;
}

const LOADING_MESSAGES = [
    "Analyzing your generic bio...",
    "Laughing at your endorsements...",
    "Finding typos in your 'About' section...",
    "Counting how many times you said 'synergy'...",
    "Judging your professional headshot...",
    "Reading between the lines of your job titles...",
    "Calculating your buzzword-to-substance ratio...",
];

export default function RoastForm({ onRoastComplete }: RoastFormProps) {
    const [profileText, setProfileText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Rotate through loading messages
        let messageIndex = 0;
        setLoadingMessage(LOADING_MESSAGES[0]);
        const messageInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
            setLoadingMessage(LOADING_MESSAGES[messageIndex]);
        }, 2000);

        try {
            const response = await fetch('/api/roast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profileText: profileText.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorData = data as RoastError;
                throw new Error(errorData.message || 'Failed to roast profile');
            }

            onRoastComplete(data as RoastResponse);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            clearInterval(messageInterval);
            setIsLoading(false);
        }
    };

    const isFormValid = profileText.trim().length >= 50;

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="profile-text" className="block text-sm font-mono uppercase tracking-wider text-red-400 mb-3">
                        Paste Your LinkedIn Profile Text
                    </label>
                    <textarea
                        id="profile-text"
                        value={profileText}
                        onChange={(e) => setProfileText(e.target.value)}
                        placeholder="Paste your LinkedIn headline, 'About' section, and work experience here...

Example:
Senior Innovation Catalyst | Digital Transformation Expert

About:
Passionate thought leader with 10+ years driving synergistic solutions...

Experience:
Chief Visionary Officer at TechCorp
• Spearheaded game-changing initiatives..."
                        className="w-full h-48 bg-zinc-900 border-2 border-red-500/30 text-zinc-100 p-4 font-mono text-sm focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-300 resize-none placeholder:text-zinc-600"
                        disabled={isLoading}
                    />
                    {profileText.trim().length < 50 && profileText.length > 0 && (
                        <p className="text-zinc-500 text-sm font-mono mt-2">
                            Need at least 50 characters. Your profile can't be THAT empty... right? ({profileText.trim().length}/50)
                        </p>
                    )}
                </div>

                {error && (
                    <div className="bg-red-950/50 border-2 border-red-500 p-4">
                        <p className="text-red-400 font-mono text-sm">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-mono uppercase tracking-wider py-4 px-8 text-lg border-2 border-red-500 disabled:border-zinc-700 transition-colors"
                >
                    {isLoading ? loadingMessage : 'Roast Me 🔥'}
                </button>
            </form>
        </div>
    );
}
