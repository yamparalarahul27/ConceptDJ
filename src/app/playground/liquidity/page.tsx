'use client';

import React from 'react';
import { LiquidityHeatmap } from '@/components/features/LiquidityHeatmap';
import { OrderbookWidget } from '@/components/features/OrderbookWidget';
import { ImpermanentLossCalculator } from '@/components/features/ImpermanentLossCalculator';
import { Zap, Activity, Info, BarChart } from 'lucide-react';
import { useSettings } from '@/components/features/SettingsProvider';

// --- MOCK LIQUIDITY DATA ---
const MOCK_ASKS = [
    { price: 108.52, amount: 24.5, total: 24.5 },
    { price: 108.50, amount: 152.1, total: 176.6 },
    { price: 108.48, amount: 45.2, total: 221.8 },
    { price: 108.46, amount: 12.8, total: 234.6 },
    { price: 108.44, amount: 8.2, total: 242.8 },
];

const MOCK_BIDS = [
    { price: 108.40, amount: 65.2, total: 65.2 },
    { price: 108.38, amount: 12.4, total: 77.6 },
    { price: 108.36, amount: 450.2, total: 527.8 },
    { price: 108.34, amount: 89.1, total: 616.9 },
    { price: 108.32, amount: 124.5, total: 741.4 },
];

/**
 * Liquidity Analyser Page
 * 
 * Part of the "Pro Playground" Phase 5.
 */
export default function LiquidityPage() {
    const { settings } = useSettings();
    return (
        <div className={`max-w-7xl mx-auto py-4 space-y-8 pb-24 px-6 ${settings.compactMode ? 'scale-[0.98] origin-top' : ''}`}>
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tighter text-heading-32">
                        {settings.playerName}'s Liquidity Analyser
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-pink-400 text-[10px] font-mono uppercase tracking-widest">
                            <Zap size={12} className="animate-pulse" />
                            <span>Cluster Detection ACTIVE</span>
                        </div>
                        <span className="text-white/20">•</span>
                        <div className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                            SOL-PERP // DEPTH ENGINE v1.2
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 flex flex-col items-end">
                        <span className="text-[10px] text-white/40 font-mono uppercase leading-none mb-1">Vol 24H</span>
                        <span className="text-sm font-pixel font-bold text-white leading-none tracking-widest">
                            $1.24B
                        </span>
                    </div>
                    <div className="px-4 py-2 bg-pink-500/10 border border-pink-500/20 flex flex-col items-end">
                        <span className="text-[10px] text-pink-400 font-mono uppercase leading-none mb-1">Cluster Stat</span>
                        <span className="text-sm font-bold text-white leading-none font-pixel uppercase tracking-widest">
                            HIGH DENSITY
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Terminal Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Heatmap visualization (8/12) */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {settings.showLiquidityHeatmap && <LiquidityHeatmap height={450} />}

                    {/* Depth Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 p-5 rounded-none flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                            <div>
                                <span className="text-[10px] font-mono text-white/20 uppercase block">Resistance</span>
                                <span className="text-lg font-bold text-red-400 font-pixel">108.50</span>
                            </div>
                            <Activity className="text-red-400/20 group-hover:text-red-400 transition-colors" size={20} />
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-none flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                            <div>
                                <span className="text-[10px] font-mono text-white/20 uppercase block">Support</span>
                                <span className="text-lg font-bold text-green-400 font-pixel">108.36</span>
                            </div>
                            <Activity className="text-green-400/20 group-hover:text-green-400 transition-colors" size={20} />
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-none flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                            <div>
                                <span className="text-[10px] font-mono text-white/20 uppercase block">Imbalance</span>
                                <span className="text-lg font-bold text-blue-400 font-pixel">+2.4%</span>
                            </div>
                            <BarChart className="text-blue-400/20 group-hover:text-blue-400 transition-colors" size={20} />
                        </div>
                    </div>

                    {/* Educational Widget */}
                    <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Info size={48} />
                        </div>
                        <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest mb-4">Liquidity Logic</h4>
                        <p className="text-[10px] font-mono text-white/40 uppercase leading-relaxed tracking-tighter">
                            Heatmap clusters indicate where limit orders are concentrated.
                            <span className="text-white ml-1">Price often seeks high liquidity areas to fill large institutional orders.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
