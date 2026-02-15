'use client';

import React from 'react';
import { PaperHandsChart } from '../../../components/features/PaperHandsChart';
import { ExecutionQualityChart } from '../../../components/features/ExecutionQualityChart';
import { PnLHeatmap } from '../../../components/features/PnLHeatmap';
import { useSettings } from '../../../components/features/SettingsProvider';

// ... DATA TYPES ...
interface ChartPoint {
    date: string;
    value: number;
    time: string;
}

interface Trade {
    id: string;
    pair: string;
    side: 'LONG' | 'SHORT';
    pnl: number;
    roi: number;
    date: string;
}

// --- HARDCODED DATA (No Backend) ---
const MOCK_PNL_HISTORY: ChartPoint[] = [
    { date: '2024-01-01', value: 1000, time: 'Jan 01' },
    { date: '2024-01-02', value: 1250, time: 'Jan 02' },
    { date: '2024-01-03', value: 1100, time: 'Jan 03' },
    { date: '2024-01-04', value: 1400, time: 'Jan 04' },
    { date: '2024-01-05', value: 1350, time: 'Jan 05' },
    { date: '2024-01-06', value: 1800, time: 'Jan 06' },
    { date: '2024-01-07', value: 2100, time: 'Jan 07' },
];

const MOCK_TRADES_MAE_MFE = [
    { pair: 'SOL-PERP', mae: 120.50, mfe: 450.50, pnl: 380.00 },
    { pair: 'BTC-PERP', mae: 450.00, mfe: 100.00, pnl: -320.00 },
    { pair: 'JUP-PERP', mae: 50.00, mfe: 890.00, pnl: 810.00 },
    { pair: 'ETH-PERP', mae: 230.20, mfe: 560.20, pnl: 430.20 },
    { pair: 'BONK-PERP', mae: 150.50, mfe: 20.00, pnl: -130.50 },
    { pair: 'ARB-PERP', mae: 420.00, mfe: 450.00, pnl: 10.00 },
];

const MOCK_TRADES: Trade[] = [
    { id: 't1', pair: 'SOL-PERP', side: 'LONG', pnl: 450.50, roi: 12.5, date: '2024-01-07 14:30' },
    { id: 't2', pair: 'BTC-PERP', side: 'SHORT', pnl: -120.00, roi: -2.1, date: '2024-01-06 09:15' },
    { id: 't3', pair: 'JUP-PERP', side: 'LONG', pnl: 890.00, roi: 45.0, date: '2024-01-05 11:20' },
    { id: 't4', pair: 'ETH-PERP', side: 'SHORT', pnl: 230.20, roi: 5.4, date: '2024-01-04 16:45' },
    { id: 't5', pair: 'BONK-PERP', side: 'LONG', pnl: -50.50, roi: -5.5, date: '2024-01-03 10:10' },
];

export default function ProPnLTrackerPage() {
    const { settings } = useSettings();
    return (
        <div className="px-3 sm:px-6">
            <div className={`max-w-7xl mx-auto py-4 space-y-8 pb-24 px-6 ${settings.compactMode ? 'scale-[0.98] origin-top' : ''}`}>
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter text-heading-32">
                            {settings.playerName}'s PnL Analytics
                        </h1>
                        <div className="flex items-center gap-2 text-white/50 text-[10px] font-mono uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-none bg-green-500"></span>
                            <span>Live Concept Preview</span>
                            <span className="mx-2">•</span>
                            <span className="border border-white/10 px-2 py-0.5 rounded-none">DATA: HARDCODED_ENGINE_V2</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-white/5 border border-white/10 flex flex-col items-end">
                            <span className="text-[10px] text-white/40 font-mono uppercase leading-none mb-1">Last Analysis</span>
                            <span className="text-sm font-bold text-white leading-none font-pixel">Just now</span>
                        </div>
                    </div>
                </header>

                {/* Main Section: Equity & Execution */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Paper Hands Tracker (2/3 width) */}
                    <div className={`${settings.showMAEFE ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-4`}>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-none relative">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Equity Curve Analysis</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-0.5 bg-green-400"></div>
                                            <span className="text-[10px] text-white/40 font-mono uppercase">Actual PnL</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-px bg-purple-500 border-t border-dashed border-purple-500"></div>
                                            <span className="text-[10px] text-white/40 font-mono uppercase">HODL Strategy</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="text-[10px] text-white/40 font-mono uppercase block mb-1">Paper Hands Impact</span>
                                    <span className="text-xl font-bold text-red-400 font-pixel">-$342.10</span>
                                </div>
                            </div>

                            <PaperHandsChart data={MOCK_PNL_HISTORY} height={350} />
                        </div>
                    </div>

                    {/* Execution Quality (1/3 width) */}
                    {settings.showMAEFE && (
                        <div className="lg:col-span-1">
                            <ExecutionQualityChart data={MOCK_TRADES_MAE_MFE} height={428} />
                        </div>
                    )}
                </div>

                {/* Stats & Heatmap Section */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Stats Column */}
                    <div className="lg:col-span-1 grid grid-cols-1 gap-4">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-none">
                            <span className="text-white/40 text-[10px] font-mono uppercase block mb-1">Total Net PnL</span>
                            <span className="text-3xl font-bold text-green-400 font-pixel">+$2,450.20</span>
                            <div className="mt-2 text-green-500/50 text-[10px] font-mono flex items-center gap-1">
                                <span>▲</span>
                                <span>+15.2% VS PREV MONTH</span>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-none">
                            <span className="text-white/40 text-[10px] font-mono uppercase block mb-1">Profit Factor</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-blue-400 font-pixel">2.4</span>
                                <span className="text-[10px] text-white/20 font-mono">/ OPTIMAL</span>
                            </div>
                        </div>
                    </div>

                    {/* Heatmap Section */}
                    {settings.showPnLHeatmap && (
                        <div className="lg:col-span-3">
                            <PnLHeatmap data={[]} />
                        </div>
                    )}
                </div>

                {/* Table Area */}
                <div className="bg-white/5 border border-white/10 rounded-none overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <h3 className="font-bold text-xs font-mono text-white uppercase tracking-widest">Recent Executions</h3>
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[9px] font-mono uppercase border border-purple-500/10">Filtered: Last 7 Days</span>
                        </div>
                        <button className="text-[10px] font-mono text-purple-400 hover:text-purple-300 uppercase tracking-tight">Export .CSV</button>
                    </div>
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-white/[0.03] text-white/30">
                            <tr>
                                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-tight font-medium">Timestamp</th>
                                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-tight font-medium">Instrument</th>
                                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-tight font-medium">Side</th>
                                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-tight font-medium text-right">PnL Result</th>
                                <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-tight font-medium text-right">ROI %</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MOCK_TRADES.map((trade) => (
                                <tr key={trade.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 text-white/40 font-mono text-[10px] uppercase">{trade.date}</td>
                                    <td className="px-6 py-4 text-white font-bold text-xs tracking-tight">{trade.pair}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-none text-[10px] font-bold ${trade.side === 'LONG' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                            {trade.side}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 text-right font-pixel text-xs ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                                    </td>
                                    <td className={`px-6 py-4 text-right font-pixel text-xs ${trade.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {trade.roi >= 0 ? '+' : ''}{trade.roi.toFixed(1)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
