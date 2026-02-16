
import React, { useState, useMemo } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    subMonths,
    addMonths,
    isSameDay
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PnLHeatmapProps {
    data: any[];
}

/**
 * PnLHeatmap Component
 * 
 * PURPOSE:
 * Visualizes profit/loss intensity in a calendar grid.
 * Helps identifying winning/losing streaks and weekday performance bias.
 */
export const PnLHeatmap: React.FC<PnLHeatmapProps> = ({ data }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

    /**
     * TECHNICAL NOTE: TO INTEGRATE REAL DATA
     * 1. The 'data' prop should be an array of objects: { date: string (ISO), pnl: number }.
     * 2. Use useMemo to index the data by date string for O(1) lookup during rendering.
     * 3. Replace the 'getMockPnL' function with a lookup in your indexed data map.
     */

    // Mock PnL generation (Hardcoded for demo)
    const getMockPnL = (date: Date) => {
        const day = date.getDate();
        // Deterministic mock values based on date
        if (day % 7 === 0) return -142.50; // Loss
        if (day % 3 === 0) return 285.40;  // Win
        if (day % 5 === 0) return -42.10;  // Small loss
        if (day % 2 === 0) return 85.20;   // Small win
        return 0; // Breakeven
    };

    const getIntensityClass = (pnl: number) => {
        if (pnl <= -100) return 'bg-red-500/40 border-red-500/20';
        if (pnl < 0) return 'bg-red-500/20 border-red-500/10';
        if (pnl >= 200) return 'bg-green-500/60 border-green-500/20';
        if (pnl > 0) return 'bg-green-500/20 border-green-500/10';
        return 'bg-white/5 border-white/5';
    };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const activePnL = hoveredDay ? getMockPnL(hoveredDay) : 0;

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none relative">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">PnL Intensity Heatmap</h3>

                <div className="flex items-center gap-4">
                    <button
                        onClick={prevMonth}
                        className="p-1 hover:bg-white/10 transition-colors border border-white/5"
                    >
                        <ChevronLeft size={16} className="text-white/40" />
                    </button>
                    <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest min-w-[120px] text-center">
                        {format(currentMonth, 'MMMM yyyy')}
                    </span>
                    <button
                        onClick={nextMonth}
                        className="p-1 hover:bg-white/10 transition-colors border border-white/5"
                    >
                        <ChevronRight size={16} className="text-white/40" />
                    </button>
                </div>
            </div>

            <div className="relative">
                <div className="grid grid-cols-7 gap-1.5">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} className="text-[9px] font-mono text-white/20 text-center pb-2">{d}</div>
                    ))}

                    {/* Padding for start of month */}
                    {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                        <div key={`pad-${i}`} className="aspect-square" />
                    ))}

                    {days.map((day, i) => {
                        const pnl = getMockPnL(day);
                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredDay(day)}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={`aspect-square border transition-all hover:scale-110 cursor-crosshair ${getIntensityClass(pnl)} flex items-center justify-center relative group/cell`}
                            >
                                <span className="text-[14px] font-mono text-white/20 group-hover/cell:text-white/60 transition-colors">
                                    {format(day, 'd')}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Detailed Tooltip Overlay */}
                {hoveredDay && (
                    <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <div className="bg-black/95 border border-white/30 px-6 py-4 backdrop-blur-xl shadow-2xl flex flex-col items-center min-w-[180px] transform scale-110">
                            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5 border-b border-white/10 pb-1 w-full text-center">
                                {format(hoveredDay, 'EEEE, MMM dd')}
                            </span>
                            <span className={`text-xl font-pixel font-bold mt-1 ${activePnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {activePnL >= 0 ? '+' : ''}${activePnL.toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-10 flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500/40 border border-red-500/20" />
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-tight">Large Loss</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-white/5 border border-white/5" />
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-tight">Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500/60 border border-green-500/20" />
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-tight">Core Profit</span>
                </div>
            </div>
        </div>
    );
};
