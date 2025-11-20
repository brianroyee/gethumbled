export default function Navigation() {
    return (
        <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50 animate-in slide-in-from-top-full duration-500">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="/" className="text-red-500 font-mono uppercase font-bold text-xl hover:text-red-400 transition-colors">
                    LinkedIn Roaster
                </a>
                <div className="flex gap-6">
                    <a href="/support" className="text-zinc-400 hover:text-red-400 font-mono uppercase text-sm transition-colors">
                        Support 💰
                    </a>
                    <a href="/about" className="text-zinc-400 hover:text-red-400 font-mono uppercase text-sm transition-colors">
                        About
                    </a>
                </div>
            </div>
        </nav>
    );
}
