'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RiskGauge } from './RiskGauge';
import { calculateTRS, getTRSLabel, getDDS, getPSS, getVRS } from '@/lib/risk-math';
import InfoTooltip from '../ui/InfoTooltip';

export const TradeRiskAnalyzer: React.FC = () => {
    // Hardcoded Inputs for Demo
    const mockInputs = {
        equity: 10000,
        exposure: 2500, // 25% Position Size
        riskAmount: 200, // 2% Risk to Stop
        volatility: 4 // 4% ATR
    };

    const dds = getDDS(2); // 2% -> 50
    const pss = getPSS(25); // 25% -> 30
    const vrs = getVRS(4); // 4% -> 55

    const trs = calculateTRS(pss, dds, vrs);
    const { label, color } = getTRSLabel(trs);

    /**
     * TECHNICAL INTEGRATION:
     * To wire with real data, wrap this in a provider that fetches:
     * 1. Total Equity from Account Balance.
     * 2. Current Position Exposure (Size * Mark Price).
     * 3. Risk amount based on (Entry - StopLoss) * Quantity.
     * 4. ATR% from market data API (e.g., Pyth or TradingView).
     */

    return (
        <div className="bg-white/5 border border-white/10 p-8 rounded-none relative overflow-hidden group">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-shrink-0">
                    <RiskGauge
                        score={trs}
                        label={label}
                        labelColor={color}
                        subLabel="Risk Score"
                        size={280}
                    />
                </div>

                <div className="flex-1 h-full w-full space-y-6">
                    <div>
                        <div className="flex items-center mb-8">
                            <h4 className="text-[12px] font-mono text-white/40 uppercase tracking-[0.2em]">Risk Breakdown</h4>
                            <InfoTooltip infoKey="trs" />
                        </div>
                        <div className="space-y-4">
                            <RiskBar label="Position Size (PSS)" score={pss} value="25% Exp" />
                            <RiskBar label="Drawdown Risk (DDS)" score={dds} value="2.0% Risk" />
                            <RiskBar label="Volatility (VRS)" score={vrs} value="4.0% ATR" />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <p className="text-[12px] font-mono text-white/30 uppercase leading-relaxed font-bold">
                            Measurement: Tactical risk of current individual open position adjusted for volatility and stop distance.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                                <span className="text-white/40">Optimal Range</span>
                                <span className="text-green-400 font-bold">30-60</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                                <span className="text-white/40">Portfolio Threshold</span>
                                <span className="text-amber-400 font-bold">{'>'}70 Critical</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                                <span className="text-white/40">Risk Threshold</span>
                                <span className="text-red-400 font-bold">{'>'}85 Extreme</span>
                            </div>
                            <p className="text-[10px] font-mono text-white/20 uppercase leading-relaxed font-bold mt-3">
                                Recommendation: Monitor position size relative to volatility. Adjust stop-loss based on ATR levels for optimal risk management.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RiskBar = ({ label, score, value }: { label: string, score: number, value: string }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-[12px] font-mono uppercase tracking-widest">
            <span className="text-white/60">{label}</span>
            <span className="text-white font-bold">{value} // {score}</span>
        </div>
        <div className="h-1 bg-white/5 w-full relative overflow-hidden">
            <motion.div
                className={`absolute top-0 left-0 h-full ${score > 70 ? 'bg-red-400' : score > 40 ? 'bg-amber-400' : 'bg-green-400'}`}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: 1 }}
            />
        </div>
    </div>
);
