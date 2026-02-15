
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, subMonths } from 'date-fns';

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
    // We'll show the last 2 months for the demo
    const monthsToShow = [subMonths(new Date(), 1), new Date()];

    // Mock intensity map based on day of month for demo
    const getIntensityClass = (date: Date) => {
        const day = date.getDate();
        if (day % 7 === 0) return 'bg-red-500/40 border-red-500/20'; // Big loss
        if (day % 3 === 0) return 'bg-green-500/60 border-green-500/20'; // Big win
        if (day % 2 === 0) return 'bg-green-500/20 border-green-500/10'; // Small win
        if (day % 5 === 0) return 'bg-red-500/20 border-red-500/10'; // Small loss
        return 'bg-white/5 border-white/5'; // Breakeven / No activity
    };

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-6">PnL Intensity Heatmap</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {monthsToShow.map((monthDate, mIdx) => {
                    const start = startOfMonth(monthDate);
                    const end = endOfMonth(monthDate);
                    const days = eachDayOfInterval({ start, end });
                    const monthName = format(monthDate, 'MMMM yyyy');

                    return (
                        <div key={mIdx}>
                            <p className="text-[10px] font-mono text-white/40 uppercase mb-3 text-center">{monthName}</p>
                            <div className="grid grid-cols-7 gap-1.5">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                    <div key={i} className="text-[9px] font-mono text-white/20 text-center pb-1">{d}</div>
                                ))}

                                {/* Padding for start of month */}
                                {Array.from({ length: start.getDay() }).map((_, i) => (
                                    <div key={`pad-${i}`} className="aspect-square" />
                                ))}

                                {days.map((day, i) => (
                                    <div
                                        key={i}
                                        className={`aspect-square border transition-all hover:scale-110 cursor-pointer ${getIntensityClass(day)}`}
                                        title={format(day, 'MMM d, yyyy')}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500/40 border border-red-500/20" />
                    <span className="text-[9px] font-mono text-white/40 uppercase">Loss</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-white/5 border border-white/5" />
                    <span className="text-[9px] font-mono text-white/40 uppercase">Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500/60 border border-green-500/20" />
                    <span className="text-[9px] font-mono text-white/40 uppercase">Profit</span>
                </div>
            </div>
        </div>
    );
};
