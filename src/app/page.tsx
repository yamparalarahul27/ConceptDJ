import Link from 'next/link';

export default function ConceptsLandingPage() {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
                    CDJ Concepts
                </h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                    Experimental features and future UI concepts.
                    <br />
                    purely visual, hardcoded data, no backend connection.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/pro-pnl-tracker" className="group block">
                    <div className="bg-white/5 border border-white/10 rounded-none p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </div>
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-mono rounded-none border border-purple-500/20">
                                ANALYTICS v2
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">Pro PnL Tracker</h2>
                        <p className="text-white/50">
                            Advanced Profit & Loss analysis with drawdown visualization and calendar heatmaps.
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
