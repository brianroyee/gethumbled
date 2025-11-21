import Navigation from '@/components/Navigation';

export default function WhyAboutMatters() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/20 -z-10" />

            {/* Navigation */}
            <Navigation />

            <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-3 text-red-500 uppercase tracking-tight">
                        Why It Matters
                    </h1>
                    <p className="text-zinc-400 text-lg font-mono max-w-2xl mx-auto">
                        The "About" section isn't just filler text. It's your money maker.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Card 1: The Hook */}
                    <div className="bg-zinc-900 border-2 border-red-500/30 p-8 hover:border-red-500 transition-all duration-300 hover:-translate-y-1 group">
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🎣</div>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase font-mono border-b border-red-500/30 pb-2">The Hook</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Recruiters spend an average of <span className="text-red-400 font-bold">7 seconds</span> on a profile. 
                            Your headline gets them to click, but your About section gets them to stay. 
                            If it reads like a toaster manual, they're gone.
                        </p>
                    </div>

                    {/* Card 2: SEO Goldmine */}
                    <div className="bg-zinc-900 border-2 border-red-500/30 p-8 hover:border-red-500 transition-all duration-300 hover:-translate-y-1 delay-100 group">
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🔍</div>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase font-mono border-b border-red-500/30 pb-2">SEO Goldmine</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            LinkedIn is a search engine. Your About section is where you stuff the keywords 
                            that get you found. Don't just say "Manager" — say "Strategic Leader driving 
                            ROI through cross-functional synergy" (okay, maybe not that buzzwordy).
                        </p>
                    </div>

                    {/* Card 3: The Human Element */}
                    <div className="bg-zinc-900 border-2 border-red-500/30 p-8 hover:border-red-500 transition-all duration-300 hover:-translate-y-1 delay-200 group">
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">👽</div>
                        <h2 className="text-2xl font-bold text-white mb-4 uppercase font-mono border-b border-red-500/30 pb-2">Don't Be a Robot</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Everyone else lists their skills like a grocery list. This is your chance to 
                            show personality. Are you funny? Intense? A data nerd? Let it shine. 
                            People hire people, not bullet points.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <a
                        href="/"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white uppercase py-4 px-12 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all text-lg font-bold tracking-wider font-mono"
                    >
                        ← Back to Roasting
                    </a>
                </div>
            </div>
        </main>
    );
}
