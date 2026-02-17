'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { ShieldAlert, Info } from 'lucide-react';

interface RiskData {
    subject: string;
    A: number;
    fullMark: number;
}

const MOCK_RISK_DATA: RiskData[] = [
    { subject: 'Drawdown', A: 45, fullMark: 100 },
    { subject: 'Win Rate', A: 85, fullMark: 100 },
    { subject: 'Risk-Reward', A: 65, fullMark: 100 },
    { subject: 'Variance', A: 40, fullMark: 100 },
    { subject: 'Slippage', A: 25, fullMark: 100 },
    { subject: 'Latency', A: 30, fullMark: 100 },
];

export const RiskAnalyser: React.FC = () => {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none overflow-hidden group h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-500">
                        <ShieldAlert size={16} />
                    </div>
                    <div>
                        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Risk Profiler</h3>
                        <p className="text-[9px] font-mono text-white/30 uppercase">Portfolio Entropy vs Optimal</p>
                    </div>
                </div>
                <div className="cursor-help text-white/20 hover:text-white/60 transition-colors">
                    <Info size={14} />
                </div>
            </div>

            <div className="flex-1 min-h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_RISK_DATA}>
                        <PolarGrid stroke="#ffffff10" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#ffffff40', fontSize: 10, fontFamily: 'monospace' }}
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        <Radar
                            name="Risk Profile"
                            dataKey="A"
                            stroke="#ef4444"
                            fill="#ef4444"
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-white/40 uppercase">Overall Exposure</span>
                    <span className="text-red-400 font-bold uppercase tracking-widest">Moderate</span>
                </div>
                <div className="h-1 bg-white/5 w-full relative">
                    <div className="absolute inset-y-0 left-0 bg-red-500 w-[45%]"></div>
                </div>
                <p className="text-[9px] font-mono text-white/20 uppercase leading-relaxed">
                    Systemic risk is currently elevated due to high variance in BTC-PERP liquidations.
                </p>
            </div>
        </div>
    );
};
