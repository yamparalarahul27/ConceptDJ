'use client';

import React from 'react';
import { BrainCircuit, MessageSquare, Sparkles } from 'lucide-react';

export const AIBehavioralCoach: React.FC = () => {
    return (
        <div className="bg-purple-500/5 border border-purple-500/20 p-6 rounded-none relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] pointer-events-none"></div>

            <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/20 border border-purple-500/30 text-purple-400">
                        <BrainCircuit size={20} className="animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            Neural Execution Coach
                            <Sparkles size={12} className="text-purple-400" />
                        </h3>
                        <p className="text-[10px] font-mono text-white/30 uppercase">AI-Driven Behavioral Analysis</p>
                    </div>
                </div>
                <div className="text-[10px] font-mono text-purple-400/50 uppercase tracking-widest">
                    v4.2.0-PRO
                </div>
            </div>

            <div className="mt-8 space-y-4 relative z-10">
                <div className="p-4 bg-white/5 border-l-2 border-purple-500 text-[11px] font-mono text-white/80 leading-relaxed uppercase tracking-tight">
                    "I noticed your last 3 losses occurred within 15 minutes of each other. Your 'Revenge Trading' score is spiking. I recommend taking a 60-minute cooling break."
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                    <button className="py-2 bg-purple-500/10 border border-purple-500/20 text-[9px] font-mono text-purple-400 uppercase hover:bg-purple-500/20 transition-all flex items-center justify-center gap-2">
                        <MessageSquare size={12} /> Ask Analytics API
                    </button>
                    <button className="py-2 bg-white/5 border border-white/10 text-[9px] font-mono text-white/40 uppercase hover:text-white transition-all">
                        Ignore Observation
                    </button>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-[8px] text-white/20 uppercase">Model Reliability</span>
                        <span className="text-[10px] font-pixel text-purple-400">98.4%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] text-white/20 uppercase">Nudge Impact</span>
                        <span className="text-[10px] font-pixel text-blue-400">+12% PnL</span>
                    </div>
                </div>
                <div className="w-16 h-4 bg-purple-500/10 flex items-center gap-0.5 px-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="flex-1 bg-purple-500/40 h-1.5 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
