'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RiskGauge } from './RiskGauge';
import { calculateRCS, getRCSLabel } from '@/lib/risk-math';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import InfoTooltip from '../ui/InfoTooltip';

export const BehavioralConsistencyChart: React.FC = () => {
    // Hardcoded Behavioral Metrics
    const metrics = {
        stability: 85,    // 40% Weight (Risk StdDev)
        drift: 70,        // 20% Weight (Pos Size Drift)
        escalation: 90,   // 20% Weight (Loss Escalation/Revenge)
        overtrading: 65,  // 10% Weight (Trade Frequency)
        spike: 95         // 10% Weight (Max Risk Spike)
    };

    // Trailing consistency data (Demo)
    const historyData = Array.from({ length: 30 }, (_, i) => ({
        trade: i + 1,
        risk: 80 + Math.sin(i * 0.5) * 10 + (i > 25 ? -15 : 0)
    }));

    const rcs = calculateRCS(
        metrics.stability,
        metrics.drift,
        metrics.escalation,
        metrics.overtrading,
        metrics.spike
    );

    const { label, color } = getRCSLabel(rcs);

    /**
     * TECHNICAL INTEGRATION:
     * 1. Stability: Standard Deviation of (Risk per Trade / Equity) over N trades.
     * 2. Drift: Difference between target vs actual position sizing.
     * 3. Escalation: Detection of increasing size after losses (Martingale pattern).
     * 4. Overtrading: Trades per timeframe vs historical baseline.
     * 5. Spike: Maximum deviation from average risk per trade.
     */

    return (
        <div className="bg-white/5 border border-white/10 p-8 rounded-none relative h-full flex flex-col group">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-[12px] font-mono font-bold text-white uppercase tracking-widest">Risk Consistency</h3>
                        <InfoTooltip infoKey="rcs" />
                    </div>
                    <p className="text-[12px] font-mono text-white/30 uppercase mt-2 font-bold">Behavioral Discipline Trace (30 Trades)</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 flex-1">
                <div className="flex-shrink-0">
                    <RiskGauge
                        score={rcs}
                        label={label}
                        labelColor={color}
                        subLabel="Consistency Score"
                        size={200}
                    />
                </div>

                <div className="flex-1 w-full h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="trade" hide />
                            <YAxis domain={[0, 100]} hide />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-black/90 border border-white/20 p-2 backdrop-blur-md">
                                                <p className="text-[12px] font-mono text-white/40 uppercase">Trade #{payload[0].payload.trade}</p>
                                                <p className="text-[12px] font-mono font-bold text-purple-400">Score: {payload[0].value}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="risk"
                                stroke="#a855f7"
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={true}
                                animationDuration={2000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between text-[12px] font-mono text-white/20 uppercase tracking-widest mt-2 font-bold">
                        <span>Trailing Trade History</span>
                        <span>Current Discipline: Stable</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
