'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/utils';
import { PnLChart } from './PnLChart';

const MOCK_PORTFOLIO_SERIES = (() => {
    const base = 205_000;
    let current = base;

    return Array.from({ length: 400 }, (_, i) => {
        const day = i + 1;

        // Create ebb-and-flow with small shocks to show realistic swings
        const drift = 350; // gentle upward trend
        const wave = Math.sin(day / 3) * 2_200 + Math.cos(day / 5) * 1_400;
        const shock = (day % 11 === 0 ? -6_500 : 0) + (day % 17 === 0 ? 5_200 : 0) + (day % 23 === 0 ? -4_800 : 0);
        const correction = day % 7 === 0 ? -2_200 : 0;

        const delta = drift + wave + shock + correction;
        current = Math.max(180_000, current + delta);

        return {
            time: `D${day}`,
            value: Number(current.toFixed(2)),
        };
    });
})();

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
            <div className="flex items-center justify-center text-center gap-2 mb-8 opacity-40">
                <TrendingUp size={14} />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Portfolio Performance</span>
            </div>

            {/* Summary Row */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-8 items-center md:items-center md:justify-center text-center md:text-left">
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

            {/* Chart Area (Interactive PnL chart) */}
            <div className="h-[240px] w-full border border-white/5 bg-white/[0.01] p-2">
                <PnLChart data={MOCK_PORTFOLIO_SERIES} height={240} />
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
