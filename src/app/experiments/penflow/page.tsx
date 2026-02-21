'use client';

import React, { useState } from 'react';
import { Sparkles, Type, RotateCcw } from 'lucide-react';
import dynamic from 'next/dynamic';

const Penflow = dynamic(() => import('penflow/react').then((mod) => mod.Penflow), {
    ssr: false,
});

export default function PenflowExperimentPage() {
    const [playheadKey, setPlayheadKey] = useState(0);

    const handleReplay = () => {
        setPlayheadKey(prev => prev + 1);
    };

    return (
        <div className="min-h-screen text-white p-8 md:p-16 max-w-6xl mx-auto">
            <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.35em] text-purple-400/70">
                        <Type size={16} className="text-purple-500" />
                        Experiment 05 // Penflow
                    </div>
                    <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight">Penflow Animation</h1>
                    <p className="mt-2 max-w-2xl text-white/50">
                        Integration of the <span className="text-purple-300">penflow/react</span> component for animated text rendering.
                    </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-white/60 bg-white/5 px-4 py-3 border border-white/10 rounded-md">
                    <Sparkles size={14} className="text-yellow-400" /> Typography • Animation
                </div>
            </header>

            <section className="relative flex flex-col items-center justify-center p-12 rounded-xl border border-white/10 bg-white/5 shadow-2xl shadow-purple-500/10 min-h-[400px] overflow-hidden">
                <div className="w-full flex justify-center items-center">
                    <Penflow
                        text="Welcome"
                        fontUrl="/fonts/MomoSignature-Regular.ttf"
                        color="#ffffff"
                        size={80}
                        playheadKey={playheadKey}
                        animate={true}
                    />
                </div>

                <button
                    onClick={handleReplay}
                    className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 transition-all font-mono text-sm uppercase tracking-wider"
                >
                    <RotateCcw size={16} />
                    Replay
                </button>
            </section>
        </div>
    );
}
