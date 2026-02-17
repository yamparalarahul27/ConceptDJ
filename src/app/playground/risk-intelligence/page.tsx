'use client';

import React from 'react';
import { TradeRiskAnalyzer } from '@/components/features/TradeRiskAnalyzer';
import { PortfolioFragilityCard } from '@/components/features/PortfolioFragilityCard';
import { ConceptMetaBar } from '@/components/features/ConceptMetaBar';

export default function RiskIntelligencePage() {
    return (
        <div className="max-w-7xl mx-auto py-4 space-y-8 pb-32 px-6">
            <ConceptMetaBar />
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter text-heading-32">Risk Intelligence</h1>
                    <div className="flex items-center gap-2 text-white/50 text-[12px] font-mono uppercase tracking-widest font-bold">
                        <span className="w-2 h-2 rounded-none bg-red-500 animate-pulse"></span>
                        <span>Unified Risk Engine Alpha</span>
                        <span className="mx-2">•</span>
                        <span className="border border-white/10 px-2 py-0.5 rounded-none">SCOPE: TACTICAL // STRUCTURAL // BEHAVIORAL</span>
                    </div>
                </div>

                <div className="px-4 py-2 bg-white/5 border border-white/10 flex flex-col items-end">
                    <span className="text-[12px] text-white/40 font-mono uppercase leading-none mb-1 text-right font-bold">System Integrity</span>
                    <span className="text-sm font-bold text-green-400 leading-none font-pixel uppercase">NOMINAL</span>
                </div>
            </header>

            {/* Primary Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Tactical Risk Analyzer (TRS) */}
                <div className="lg:col-span-8">
                    <TradeRiskAnalyzer />
                </div>

                {/* Portfolio Fragility (PRS) */}
                <div className="lg:col-span-4">
                    <PortfolioFragilityCard />
                </div>
            </div>

            {/* Tactical Interpretation Table */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-none">
                <h3 className="text-[12px] font-mono font-bold text-white uppercase tracking-widest mb-6">Risk Interpretation Matrix</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <InterpretationItem
                        pattern="High TRS + High PRS"
                        meaning="IMMEDIATE DANGER"
                        sub="Portfolio structure is fragile and current trade is reckless."
                        color="text-red-400"
                    />
                    <InterpretationItem
                        pattern="Low TRS + High PRS"
                        meaning="STRUCTURAL FRAGILITY"
                        sub="Trade is safe, but portfolio correlations are dangerous."
                        color="text-orange-400"
                    />
                    <InterpretationItem
                        pattern="High TRS + Low RCS"
                        meaning="EMOTIONAL BIAS"
                        sub="High risk spikes combined with unstable behavior patterns."
                        color="text-amber-400"
                    />
                    <InterpretationItem
                        pattern="Low TRS + High RCS"
                        meaning="ELITE DISCIPLINE"
                        sub="Professional risk management and stable behavioral trace."
                        color="text-green-400"
                    />
                </div>
            </div>

            {/* Future Integration Notes */}
            <div className="mt-12 p-6 border border-white/5 bg-black/20 text-[12px] font-mono text-white/20 uppercase tracking-widest leading-relaxed font-bold italic">
                Technical Note: Unified Risk Score (URS) integration planned for Phase 5. //
                Scoring weights are calibrated for active crypto derivatives trading environments. //
                Real data ingestion via WebSocket sub-latency adapters in development.
            </div>
        </div>
    );
}

const InterpretationItem = ({ pattern, meaning, sub, color }: { pattern: string, meaning: string, sub: string, color: string }) => (
    <div className="space-y-3">
        <span className="text-[12px] font-mono text-white/40 uppercase block font-bold">{pattern}</span>
        <span className={`text-[12px] font-pixel font-bold block ${color}`}>{meaning}</span>
        <p className="text-[12px] font-mono text-white/20 uppercase tracking-tighter leading-snug font-bold">
            {sub}
        </p>
    </div>
);
