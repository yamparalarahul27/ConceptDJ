'use client';

import React, { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    subMonths,
    addMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

export const FundingHeatmap: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

    // Mock Funding Rate logic (Hardcoded for demo)
    const getMockFunding = (date: Date) => {
        const day = date.getDate();
        // Deterministic mock values (bps)
        if (day % 11 === 0) return 0.045; // Critical High
        if (day % 4 === 0) return 0.012;  // Warning High
        return 0.003; // Normal
    };

    const getColorClass = (rate: number) => {
        if (rate >= 0.03) return 'bg-red-500/80 border-red-500/30';
        if (rate >= 0.01) return 'bg-amber-500/50 border-amber-500/20';
        return 'bg-white/5 border-white/5';
    };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Adjust for Monday-start week
    const startDay = (monthStart.getDay() + 6) % 7; // Monday = 0

    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const activeRate = hoveredDay ? getMockFunding(hoveredDay) : 0;

    // Function to render a calendar for a given month
    const renderCalendar = (month: Date) => {
        const calMonthStart = startOfMonth(month);
        const calMonthEnd = endOfMonth(month);
        const calDays = eachDayOfInterval({ start: calMonthStart, end: calMonthEnd });
        const calStartDay = (calMonthStart.getDay() + 6) % 7; // Monday = 0
        const calTotalCells = calStartDay + calDays.length;
        const calEndPad = (7 - (calTotalCells % 7)) % 7;

        return (
            <div className="flex-1">
                <div className="text-center mb-4">
                    <span className="text-[12px] font-mono text-white/60 uppercase tracking-widest font-bold">
                        {format(month, 'MMM yyyy')}
                    </span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} className="text-[10px] font-mono text-white/20 text-center pb-1 font-bold">{d}</div>
                    ))}

                    {/* Padding for start of month */}
                    {Array.from({ length: calStartDay }).map((_, i) => (
                        <div key={`pad-${month.getTime()}-${i}`} className="aspect-square" />
                    ))}

                    {calDays.map((day, i) => {
                        const rate = getMockFunding(day);
                        return (
                            <div
                                key={day.getTime()}
                                onMouseEnter={() => setHoveredDay(day)}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={`aspect-square border transition-all hover:scale-110 cursor-crosshair ${getColorClass(rate)} flex items-center justify-center relative group/cell`}
                            >
                                <span className="text-[12px] font-mono text-white/20 group-hover/cell:text-white/60 transition-colors">
                                    {format(day, 'd')}
                                </span>
                            </div>
                        );
                    })}

                    {/* Padding for end of month */}
                    {Array.from({ length: calEndPad }).map((_, i) => (
                        <div key={`end-pad-${month.getTime()}-${i}`} className="aspect-square" />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none relative flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Funding Rate Heatmap</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[12px] font-mono text-white/30 uppercase tracking-tighter font-bold">Instrument: SOL-PERP</span>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-500/10 border border-red-500/20">
                            <AlertTriangle size={8} className="text-red-500" />
                            <span className="text-[12px] font-mono text-red-500 uppercase font-bold">Spike Alert</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={prevMonth}
                        className="p-1 hover:bg-white/10 transition-colors border border-white/5"
                    >
                        <ChevronLeft size={16} className="text-white/40" />
                    </button>
                    <span className="text-[12px] font-mono text-white/80 uppercase tracking-widest min-w-[120px] text-center font-bold">
                        {format(subMonths(currentMonth, 1), 'MMM')} - {format(addMonths(currentMonth, 1), 'MMM yyyy')}
                    </span>
                    <button
                        onClick={nextMonth}
                        className="p-1 hover:bg-white/10 transition-colors border border-white/5"
                    >
                        <ChevronRight size={16} className="text-white/40" />
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {renderCalendar(subMonths(currentMonth, 1))}
                {renderCalendar(currentMonth)}
                {renderCalendar(addMonths(currentMonth, 1))}
            </div>

            {/* Detailed Tooltip Overlay */}
            {hoveredDay && (
                <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="bg-black/95 border border-white/30 px-6 py-4 backdrop-blur-xl shadow-2xl flex flex-col items-center min-w-[180px] transform scale-110">
                        <span className="text-[12px] font-mono text-white/50 uppercase tracking-widest mb-1.5 border-b border-white/10 pb-1 w-full text-center font-bold block">
                            {format(hoveredDay, 'EEEE, MMM dd')}
                        </span>
                        <span className={`text-xl font-pixel font-bold mt-1 ${activeRate >= 0.03 ? 'text-red-400' : activeRate >= 0.01 ? 'text-amber-400' : 'text-white/80'}`}>
                            {activeRate.toFixed(3)}%
                        </span>
                        <span className="text-[12px] font-mono text-white/20 uppercase mt-1 font-bold">Funding Impact (Est)</span>
                    </div>
                </div>
            )}

            <div className="mt-8 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500/80"></div>
                    <span className="text-[12px] font-mono text-white/40 uppercase font-bold">Critical High ({'>'}0.03%)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500/50"></div>
                    <span className="text-[12px] font-mono text-white/40 uppercase font-bold">Warning High (0.01%)</span>
                </div>
            </div>
        </div>
    );
};
