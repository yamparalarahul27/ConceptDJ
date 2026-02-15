'use client';

import React from 'react';

// --- DATA TYPES (Isolated) ---
interface ChartPoint {
    date: string;
    value: number;
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
    { date: '2024-01-01', value: 1000 },
    { date: '2024-01-02', value: 1250 },
    { date: '2024-01-03', value: 1100 },
    { date: '2024-01-04', value: 1400 },
    { date: '2024-01-05', value: 1350 },
    { date: '2024-01-06', value: 1800 },
    { date: '2024-01-07', value: 2100 },
];

const MOCK_TRADES: Trade[] = [
    { id: 't1', pair: 'SOL-PERP', side: 'LONG', pnl: 450.50, roi: 12.5, date: '2024-01-07 14:30' },
    { id: 't2', pair: 'BTC-PERP', side: 'SHORT', pnl: -120.00, roi: -2.1, date: '2024-01-06 09:15' },
    { id: 't3', pair: 'JUP-PERP', side: 'LONG', pnl: 890.00, roi: 45.0, date: '2024-01-05 11:20' },
    { id: 't4', pair: 'ETH-PERP', side: 'SHORT', pnl: 230.20, roi: 5.4, date: '2024-01-04 16:45' },
    { id: 't5', pair: 'BONK-PERP', side: 'LONG', pnl: -50.50, roi: -5.5, date: '2024-01-03 10:10' },
];

export default function ProPnLTrackerPage() {
    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Pro PnL Analytics</h1>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Live Concept Preview</span>
                    <span className="mx-2">•</span>
                    <span className="font-mono text-xs border border-white/10 px-2 py-0.5 rounded">DATA: HARDCODED</span>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                    <span className="text-white/40 text-sm block mb-1">Total PnL</span>
                    <span className="text-3xl font-bold text-green-400">+$2,450.20</span>
                    <span className="text-green-500/50 text-xs ml-2">+15.2%</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                    <span className="text-white/40 text-sm block mb-1">Win Rate</span>
                    <span className="text-3xl font-bold text-white">68%</span>
                    <span className="text-white/30 text-xs ml-2">Last 30 days</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                    <span className="text-white/40 text-sm block mb-1">Profit Factor</span>
                    <span className="text-3xl font-bold text-blue-400">2.4</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                    <span className="text-white/40 text-sm block mb-1">Avg Trade</span>
                    <span className="text-3xl font-bold text-white">$120.50</span>
                </div>
            </div>

            {/* Main Chart Area (Placeholder) */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-[400px] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-500/5 pointer-events-none"></div>
                <div className="text-center">
                    <p className="text-white/40 mb-4">Interactive PnL Equity Curve Visualization</p>
                    {/* Simple CSS Bar Chart for demo */}
                    <div className="flex items-end gap-2 h-32">
                        {MOCK_PNL_HISTORY.map((point, i) => (
                            <div key={i} className="w-8 bg-green-500/20 hover:bg-green-500/60 transition-all rounded-t-sm relative group/bar" style={{ height: `${(point.value / 2500) * 100}%` }}>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 whitespace-nowrap z-10">
                                    ${point.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Trades Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-semibold text-white">Recent Trades</h3>
                    <button className="text-xs text-purple-400 hover:text-purple-300">View All</button>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-white/40">
                        <tr>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium">Pair</th>
                            <th className="px-6 py-3 font-medium">Side</th>
                            <th className="px-6 py-3 font-medium text-right">PnL</th>
                            <th className="px-6 py-3 font-medium text-right">ROI</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {MOCK_TRADES.map((trade) => (
                            <tr key={trade.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-white/60 font-mono text-xs">{trade.date}</td>
                                <td className="px-6 py-4 text-white font-medium">{trade.pair}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${trade.side === 'LONG' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {trade.side}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 text-right font-mono ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                                </td>
                                <td className={`px-6 py-4 text-right font-mono ${trade.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {trade.roi >= 0 ? '+' : ''}{trade.roi.toFixed(1)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
