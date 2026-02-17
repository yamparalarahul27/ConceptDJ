'use client';

import React from 'react';
import { AssetBenchmarkChart } from '@/components/features/AssetBenchmarkChart';
import { ExecutionEfficiencyWidget } from '@/components/features/ExecutionEfficiencyWidget';
import { RiskAnalyser } from '@/components/features/RiskAnalyser';
import { DirectionalBias } from '@/components/features/DirectionalBias';
import { MarketVolatilityCard } from '@/components/features/MarketVolatilityCard';
import TimeBasedPerformanceCard from '@/components/features/TimeBasedPerformanceCard';
import FeeDistribution from '@/components/features/FeeDistribution';
import { generateMockTrades, calculateFeeBreakdown } from '@/lib/mockData';
import { FundingHeatmap } from '@/components/features/FundingHeatmap';
import { ConceptMetaBar } from '@/components/features/ConceptMetaBar';

// --- MOCK PERFORMANCE DATA ---
const MOCK_BENCHMARK_DATA = [
    { time: 'W1', pnl: 2.5, btc: 1.2, eth: 0.8 },
    { time: 'W2', pnl: 4.8, btc: 2.1, eth: 1.5 },
    { time: 'W3', pnl: 3.2, btc: 1.5, eth: 1.2 },
    { time: 'W4', pnl: 6.5, btc: 3.8, eth: 2.5 },
    { time: 'W5', pnl: 8.4, btc: 4.2, eth: 3.1 },
    { time: 'W6', pnl: 7.2, btc: 3.5, eth: 2.8 },
    { time: 'W7', pnl: 10.5, btc: 5.1, eth: 3.9 },
    { time: 'W8', pnl: 12.8, btc: 6.2, eth: 4.5 },
];

const MOCK_EFFICIENCY_DATA = {
    spot: { pnl: 4500, trades: 124, winRate: 54 },
    futures: { pnl: 12840, trades: 86, winRate: 76 }
};

/**
 * Deep Performance Analytics Page
 * 
 * Part of the "Pro Playground" Phase 3.
 */
export default function PerformancePage() {
    return (
        <div className="max-w-7xl mx-auto py-4 space-y-8 pb-24 px-6">
            <ConceptMetaBar />
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter text-heading-32">Deep Analytics</h1>
                    <div className="flex items-center gap-2 text-white/50 text-[12px] font-mono uppercase tracking-widest font-bold">
                        <span className="w-2 h-2 rounded-none bg-blue-500"></span>
                        <span>Performance Engine Alpha</span>
                        <span className="mx-2">•</span>
                        <span className="border border-white/10 px-2 py-0.5 rounded-none">BENCHMARK: BTC/ETH AGGREGATE</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 flex flex-col items-end">
                        <span className="text-[12px] text-white/40 font-mono uppercase leading-none mb-1 font-bold">Alpha Generation</span>
                        <span className="text-sm font-bold text-green-400 leading-none font-pixel">+842 BPS</span>
                    </div>
                </div>
            </header>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Benchmarking (8/12) */}
                <div className="lg:col-span-8">
                    <AssetBenchmarkChart data={MOCK_BENCHMARK_DATA} height={450} />
                </div>

                {/* Right: Asset Class breakdown (4/12) */}
                <div className="lg:col-span-4 h-full">
                    <ExecutionEfficiencyWidget data={MOCK_EFFICIENCY_DATA} />
                </div>
            </div>

            {/* Deep Risk & Bias Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 h-full">
                    <RiskAnalyser />
                </div>
                <div className="lg:col-span-4 h-full">
                    <DirectionalBias />
                </div>
                <div className="lg:col-span-4 h-full">
                    <MarketVolatilityCard />
                </div>
            </div>

            {/* Temporal & Fee Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <TimeBasedPerformanceCard trades={generateMockTrades()} minHeight="h-[400px]" chartHeightClass="h-[300px]" />
                </div>
            </div>

            {/* Performance Analytics Heatmap */}
            <FundingHeatmap />

        </div>
    );
}
