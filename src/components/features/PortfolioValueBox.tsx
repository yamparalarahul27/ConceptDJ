'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/utils';

export const PortfolioValueBox: React.FC = () => {
    const { playSynthesizedSound } = useSound();
    const [activeFilter, setActiveFilter] = useState('YTD');

    const filters = ['D', 'W', 'M', 'YTD', 'Y', 'MAX'];

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
        playSynthesizedSound('tick');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/[0.02] border border-white/10 p-6 rounded-none"
        >
            {/* Header / Title */}
            <div className="flex items-center gap-2 mb-8 opacity-40">
                <TrendingUp size={14} />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Portfolio Performance</span>
            </div>

            {/* Summary Row */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-8">
                <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-2">Total Value</label>
                    <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white font-mono">$276,643.73</div>
                </div>
                <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-2">24h Change</label>
                    <div className="flex items-center gap-3">
                        <span className="text-xl md:text-2xl font-bold text-green-400 font-mono">+$3,513.28</span>
                        <span className="text-xs font-mono px-1.5 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20">
                            +7.2% ↑
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart Area (Simplified SVG Line Chart) */}
            <div className="h-[240px] w-full border border-white/5 bg-white/[0.01] p-4 relative group overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 1000 240" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0 180 Q 100 160 200 190 T 400 140 T 600 120 T 800 80 T 1000 40"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                    />
                    <path
                        d="M 0 180 Q 100 160 200 190 T 400 140 T 600 120 T 800 80 T 1000 40 V 240 H 0 Z"
                        fill="url(#chartGradient)"
                    />
                </svg>

                {/* Hover Tooltip Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black border border-white/20 p-2 font-mono text-[10px]">
                        <div className="text-white/40 mb-1">Feb 16, 2026</div>
                        <div className="text-green-400 font-bold">$276,643.73</div>
                    </div>
                </div>

                {/* Axis Labels */}
                <div className="absolute bottom-2 left-4 text-[9px] font-mono text-white/20 uppercase tracking-tighter">Jan 2026</div>
                <div className="absolute bottom-2 right-4 text-[9px] font-mono text-white/20 uppercase tracking-tighter">Today</div>
            </div>

            {/* Time Filters */}
            <div className="mt-8 flex justify-center">
                <div className="inline-flex gap-1 bg-white/5 p-1 border border-white/10">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => handleFilterClick(f)}
                            className={cn(
                                "px-4 py-1.5 text-[10px] font-mono uppercase transition-all",
                                activeFilter === f
                                    ? "bg-white text-black font-bold"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
