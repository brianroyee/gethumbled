import Navigation from '@/components/Navigation';

export default function WhyAboutMattersPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/20 -z-10" />
      
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-red-500 uppercase">
            Why It Matters
          </h1>
          <p className="text-zinc-400 text-lg">
            The "About" section isn't just filler text. It's your money maker.
          </p>
        </header>

        <div className="grid gap-8">
          {/* Card 1: The Hook */}
          <div className="bg-zinc-900 border-2 border-red-500/30 p-8 hover:border-red-500 transition-colors">
            <div className="text-4xl mb-4">🎣</div>
            <h2 className="text-2xl font-bold text-white mb-3 uppercase">The Hook</h2>
            <p className="text-zinc-400 leading-relaxed">
              Recruiters spend an average of <span className="text-red-400 font-bold">7 seconds</span> on a profile. 
              Your headline gets them to click, but your About section gets them to stay. 
              If it reads like a toaster manual, they're gone.
            </p>
          </div>

          {/* Card 2: SEO Goldmine */}
          <div className="bg-zinc-900 border-2 border-red-500/30 p-8 hover:border-red-500 transition-colors">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-3 uppercase">SEO Goldmine</h2>
            <p className="text-zinc-400 leading-relaxed">
              LinkedIn is a search engine. Your About section is where you stuff the keywords 
              that get you found. Don't just say "Manager" — say "Strategic Leader driving 
              ROI through cross-functional synergy" (okay, maybe not that buzzwordy, but you get it).
            </p>
          </div>

          {/* Card 3: The Human Element */}
          <div className="bg-zinc-900 border-2 border-red-500/30 p-8 hover:border-red-500 transition-colors">
            <div className="text-4xl mb-4">👽</div>
            <h2 className="text-2xl font-bold text-white mb-3 uppercase">Don't Be a Robot</h2>
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
            className="inline-block bg-red-600 hover:bg-red-700 text-white uppercase py-4 px-8 border-2 border-red-500 transition-colors text-lg font-bold"
          >
            ← Go Fix Your Profile
          </a>
        </div>
      </div>
    </main>
  );
}
