import Navigation from '@/components/Navigation';
import { getRoastCount } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const roastCount = await getRoastCount();

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/20 -z-10" />

            {/* Navigation */}
            <Navigation />

            <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <header className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-mono mb-3 text-red-500 uppercase tracking-tight">
                        Hey, I'm Brian 👋
                    </h1>
                    <p className="text-zinc-400 text-lg font-mono max-w-2xl mx-auto">
                        I built this to roast corporate BS (and because I was bored).
                    </p>
                </header>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    
                    {/* 1. Stats Card (Large, Left) */}
                    <div className="md:col-span-2 bg-zinc-900 border-2 border-red-500/30 p-8 flex flex-col justify-center hover:border-red-500 transition-all duration-300 group">
                        <h2 className="text-red-400 font-mono uppercase tracking-wider text-xs mb-4">Project Stats</h2>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">100%</div>
                                <div className="text-zinc-500 text-xs font-mono uppercase">Open Source</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">0</div>
                                <div className="text-zinc-500 text-xs font-mono uppercase">Data Stored</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">{roastCount}</div>
                                <div className="text-zinc-500 text-xs font-mono uppercase">Roasts Served</div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Powered By (Right) */}
                    <div className="bg-zinc-900 border-2 border-red-500/30 p-8 flex flex-col justify-center items-center text-center hover:border-red-500 transition-all duration-300">
                        <div className="text-5xl mb-4">⚡</div>
                        <div className="text-xl font-bold text-white mb-1">Powered By</div>
                        <div className="text-red-500 font-mono text-sm uppercase">Groq AI Llama 3</div>
                    </div>

                    {/* 3. Tech Stack (Full Width) */}
                    <div className="md:col-span-3 bg-zinc-900 border-2 border-zinc-700 p-8 hover:border-zinc-500 transition-all duration-300">
                        <h2 className="text-zinc-400 font-mono uppercase tracking-wider text-xs mb-6">The Stack</h2>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel KV', 'Groq SDK', 'Framer Motion'].map((tech) => (
                                <span key={tech} className="bg-zinc-800 px-4 py-2 text-sm font-mono text-zinc-300 border border-zinc-700 hover:bg-zinc-700 hover:text-white transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Connect Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <a
                        href="https://brian-page.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-900 border-2 border-zinc-700 p-6 flex items-center justify-between hover:border-red-500 group transition-all duration-300"
                    >
                        <span className="text-zinc-300 font-mono uppercase group-hover:text-white">Portfolio</span>
                        <span className="text-red-500 text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/brianroymathew/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-900 border-2 border-zinc-700 p-6 flex items-center justify-between hover:border-blue-500 group transition-all duration-300"
                    >
                        <span className="text-zinc-300 font-mono uppercase group-hover:text-white">LinkedIn</span>
                        <span className="text-blue-500 text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>

                {/* Back Button */}
                <div className="text-center">
                    <a
                        href="/"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono uppercase py-3 px-8 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all text-sm tracking-wider"
                    >
                        ← Back to Roasting
                    </a>
                </div>
            </div>
        </main>
    );
}
