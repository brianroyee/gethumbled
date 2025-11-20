import Navigation from '@/components/Navigation';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/20 -z-10" />

            {/* Navigation */}
            <Navigation />

            <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold font-mono mb-3 text-red-500 uppercase">
                        Hey, I'm Brian 👋
                    </h1>
                    <p className="text-zinc-400 text-lg font-mono">
                        I built this to roast corporate BS
                    </p>
                </header>

                {/* Quick Stats Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    <div className="bg-zinc-900 border-2 border-red-500/30 p-6 text-center">
                        <div className="text-3xl font-bold text-red-500 mb-2">100%</div>
                        <div className="text-zinc-400 text-sm font-mono">Free & Open Source</div>
                    </div>
                    <div className="bg-zinc-900 border-2 border-red-500/30 p-6 text-center">
                        <div className="text-3xl font-bold text-red-500 mb-2">0</div>
                        <div className="text-zinc-400 text-sm font-mono">Data Stored</div>
                    </div>
                    <div className="bg-zinc-900 border-2 border-red-500/30 p-6 text-center">
                        <div className="text-3xl font-bold text-red-500 mb-2">AI</div>
                        <div className="text-zinc-400 text-sm font-mono">Powered by Groq</div>
                    </div>
                </div>

                {/* Tech Stack - Compact */}
                <div className="bg-zinc-900 border-2 border-red-500/30 p-6 mb-8">
                    <h2 className="text-xl font-mono text-red-400 mb-4 uppercase">Built With</h2>
                    <div className="flex flex-wrap gap-3">
                        <span className="bg-zinc-800 px-4 py-2 text-sm font-mono text-zinc-300 border border-zinc-700">Next.js 14</span>
                        <span className="bg-zinc-800 px-4 py-2 text-sm font-mono text-zinc-300 border border-zinc-700">TypeScript</span>
                        <span className="bg-zinc-800 px-4 py-2 text-sm font-mono text-zinc-300 border border-zinc-700">Tailwind CSS</span>
                        <span className="bg-zinc-800 px-4 py-2 text-sm font-mono text-zinc-300 border border-zinc-700">Groq AI</span>
                    </div>
                    <p className="text-zinc-500 text-xs mt-4 font-mono">
                        Special thanks: techiepedia 🙏
                    </p>
                </div>

                {/* Connect - Compact */}
                <div className="bg-zinc-900 border-2 border-red-500/30 p-6 mb-8">
                    <h2 className="text-xl font-mono text-red-400 mb-4 uppercase">Connect</h2>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="https://brian-page.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 hover:bg-red-700 text-white font-mono uppercase px-6 py-3 border-2 border-red-500 transition-colors text-sm"
                        >
                            Portfolio
                        </a>
                        <a
                            href="https://www.linkedin.com/in/brianroymathew/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono uppercase px-6 py-3 border-2 border-zinc-700 transition-colors text-sm"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:briancodee@gmail.com"
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono uppercase px-6 py-3 border-2 border-zinc-700 transition-colors text-sm"
                        >
                            Email
                        </a>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center">
                    <a
                        href="/"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono uppercase py-3 px-6 border-2 border-red-500 transition-colors text-sm"
                    >
                        ← Back to Roasting
                    </a>
                </div>
            </div>
        </main>
    );
}
