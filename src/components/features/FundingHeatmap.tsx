'use client';

import React, { useMemo } from 'react';

export const FundingHeatmap: React.FC = () => {
    // Generate funding rate intensity (Hour x Day)
    const data = useMemo(() => {
        const rows = 8; // Sessions/Hours
        const cols = 14; // Days
        return Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => Math.random())
        );
    }, []);

    const getColor = (val: number) => {
        if (val < 0.3) return 'rgba(255, 255, 255, 0.02)';
        if (val < 0.6) return 'rgba(245, 158, 11, 0.3)'; // Amber/Warning
        if (val < 0.8) return 'rgba(239, 68, 68, 0.5)'; // High funding
        return 'rgba(239, 68, 68, 0.9)'; // Critical spike
    };

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Funding Rate Heatmap</h3>
                    <p className="text-[9px] font-mono text-white/30 uppercase">Relative Intensity // Period: 14D</p>
                </div>
                <div className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-[9px] font-mono text-red-500 uppercase font-bold animate-pulse">
                    Spike Alert: SOL-PERP
                </div>
            </div>

            <div className="flex-1 grid grid-cols-14 gap-1">
                {data.map((row, rIdx) => (
                    row.map((val, cIdx) => (
                        <div
                            key={`${rIdx}-${cIdx}`}
                            className="aspect-square bg-white/5 transition-all duration-300 hover:scale-110 cursor-help border border-white/5"
                            style={{ backgroundColor: getColor(val) }}
                            title={`Funding Impact: ${(val * 10).toFixed(2)} bps`}
                        />
                    ))
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500"></div>
                    <span className="text-[9px] font-mono text-white/40 uppercase">Critical High ({'>'}0.03%)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500"></div>
                    <span className="text-[9px] font-mono text-white/40 uppercase">Warning High (0.01%)</span>
                </div>
            </div>
        </div>
    );
};
