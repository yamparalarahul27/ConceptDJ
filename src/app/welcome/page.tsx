import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ConceptsLandingPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl text-center relative z-10">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-none bg-purple-500"></div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Pro Concept Preview</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                    CDJ <br />
                    <span className="text-white/20">COLLECTIVE</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/50 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                    Advanced trading analytics and psychological edge tracking.
                    Experience the next generation of professional trading UI.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/playground"
                        className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-purple-500 hover:text-white transition-all duration-500 rounded-none w-full sm:w-auto"
                    >
                        <span className="flex items-center gap-2">
                            Enter Playground <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link
                        href="https://github.com/yamparalarahul27/Concept-DJ"
                        target="_blank"
                        className="px-8 py-4 border border-white/10 text-white/60 font-bold uppercase tracking-widest text-xs hover:border-white hover:text-white transition-all duration-500 rounded-none w-full sm:w-auto"
                    >
                        Source Code
                    </Link>
                </div>

                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
                    <div>
                        <span className="block text-2xl font-bold text-white font-pixel leading-none mb-2">v?.0</span>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Build Version</span>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold text-white font-pixel leading-none mb-2">12+</span>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">UI Concepts</span>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold text-white font-pixel leading-none mb-2">100%</span>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Hardcoded</span>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold text-white font-pixel leading-none mb-2">PRO</span>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Aesthetic</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
