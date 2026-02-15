
import React from 'react';

interface ExecutionEfficiencyWidgetProps {
    data: {
        spot: { pnl: number; trades: number; winRate: number };
        futures: { pnl: number; trades: number; winRate: number };
    };
}

/**
 * ExecutionEfficiencyWidget Component
 * 
 * PURPOSE:
 * Breaks down performance by asset class (Spot vs. Perpetuals).
 * Helps identify the trader's "Edge" in specific markets.
 */
export const ExecutionEfficiencyWidget: React.FC<ExecutionEfficiencyWidgetProps> = ({ data }) => {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none flex flex-col h-full">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-8">Edge Discovery (Spot vs. Futures)</h3>

            <div className="space-y-8 flex-1">
                {/* Spot Performance */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">Asset Class</span>
                            <span className="text-sm font-bold text-white tracking-tighter">SPOT MARKETS</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-mono text-green-400 font-bold block leading-none mb-1 font-pixel">+{data.spot.winRate}% WIN RATE</span>
                            <span className="text-xs font-mono text-white/40 uppercase tracking-tight">{data.spot.trades} TRADES</span>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-none overflow-hidden relative border border-white/5">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500/20 to-blue-500/60"
                            style={{ width: `${data.spot.winRate}%` }}
                        />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-white/40">
                        <span>Net Profit</span>
                        <span className="text-white font-pixel text-xs">+${data.spot.pnl.toLocaleString()}</span>
                    </div>
                </div>

                {/* Futures/Perps Performance */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">Asset Class</span>
                            <span className="text-sm font-bold text-purple-400 tracking-tighter">PERPETUALS</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-mono text-green-400 font-bold block leading-none mb-1 font-pixel">+{data.futures.winRate}% WIN RATE</span>
                            <span className="text-xs font-mono text-white/40 uppercase tracking-tight">{data.futures.trades} TRADES</span>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-none overflow-hidden relative border border-white/5">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500/20 to-purple-500/60"
                            style={{ width: `${data.futures.winRate}%` }}
                        />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-white/40">
                        <span>Net Profit</span>
                        <span className="text-white font-pixel text-xs">+${data.futures.pnl.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-purple-500/5 border border-purple-500/10 rounded-none">
                <p className="text-[10px] font-mono text-purple-400 leading-relaxed uppercase tracking-tighter italic">
                    <span className="font-bold underline">TRADER EDGE:</span> YOUR EXECUTION EFFICIENCY IS 22% HIGHER ON PERPETUALS. CONSIDER REDUCING SPOT ALLOCATION.
                </p>
            </div>
        </div>
    );
};
