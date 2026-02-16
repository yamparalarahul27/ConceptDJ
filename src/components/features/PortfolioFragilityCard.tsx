'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RiskGauge } from './RiskGauge';
import { calculatePRS, getPRSLabel } from '@/lib/risk-math';

import InfoTooltip from '../ui/InfoTooltip';

export const PortfolioFragilityCard: React.FC = () => {
    // Hardcoded Metrics for Demo
    const metrics = {
        heat: 45,        // 40% Weight
        exposure: 60,    // 20% Weight
        concentration: 30, // 15% Weight
        correlation: 20,  // 10% Weight
        volatility: 50    // 15% Weight
    };

    const prs = calculatePRS(
        metrics.heat,
        metrics.exposure,
        metrics.concentration,
        metrics.correlation,
        metrics.volatility
    );

    const { label, color } = getPRSLabel(prs);

    /**
     * TECHNICAL INTEGRATION:
     * 1. Heat: (Σ Loss_to_Stop / Equity) mapped to scale.
     * 2. Exposure: (Σ Gross Exposure / Equity) mapped to scale.
     * 3. Concentration: Largest position % contribution.
     * 4. Correlation: Peer-wise correlation of open positions.
     * 5. Volatility: Weighted ATR portfolio baseline.
     */

    return (
        <div className="bg-white/5 border border-white/10 p-8 rounded-none relative h-full flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-[12px] font-mono font-bold text-white uppercase tracking-widest">Portfolio Fragility</h3>
                        <InfoTooltip infoKey="prs" />
                    </div>
                    <p className="text-[12px] font-mono text-white/30 uppercase mt-2 font-bold">Cross-Asset Structural Risk</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-8">
                <RiskGauge
                    score={prs}
                    label={label}
                    labelColor={color}
                    subLabel="Portfolio Risk Score"
                    size={220}
                />
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-8 border-t border-white/5">
                <MetricItem label="Total Heat" value="4.2%" intent="amber" />
                <MetricItem label="Gross Leverage" value="1.8x" intent="green" />
                <MetricItem label="Concentration" value="Low" intent="green" />
                <MetricItem label="Correlation" value="0.42" intent="amber" />
            </div>
        </div>
    );
};

const MetricItem = ({ label, value, intent }: { label: string, value: string, intent: 'green' | 'amber' | 'red' }) => (
    <div className="flex justify-between items-center">
        <span className="text-[12px] font-mono text-white/30 uppercase font-bold">{label}</span>
        <span className={`text-[12px] font-mono font-bold ${intent === 'green' ? 'text-green-400' : intent === 'amber' ? 'text-amber-400' : 'text-red-400'}`}>
            {value}
        </span>
    </div>
);
