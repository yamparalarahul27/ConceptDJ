'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const DATA = [
    { side: 'LONGS', winRate: 64, pnl: 8420 },
    { side: 'SHORTS', winRate: 42, pnl: -1240 },
];

export const DirectionalBias: React.FC = () => {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-[12px] font-mono font-bold text-white uppercase tracking-widest">Directional Bias</h3>
                    <p className="text-[12px] font-mono text-white/30 uppercase font-bold">Win Rate % by Orientation</p>
                </div>
                <div className="flex gap-2">
                    <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-[12px] font-mono text-green-400 uppercase font-bold">Bully Bias</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                        <ArrowUpRight size={14} />
                        <span className="text-[12px] font-mono uppercase font-bold">Longs</span>
                    </div>
                    <span className="text-2xl font-bold text-white font-pixel">64%</span>
                    <span className="text-[12px] font-mono text-white/20 uppercase block mt-1 font-bold">Win Rate</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                        <ArrowDownRight size={14} />
                        <span className="text-[12px] font-mono uppercase font-bold">Shorts</span>
                    </div>
                    <span className="text-2xl font-bold text-white font-pixel">42%</span>
                    <span className="text-[12px] font-mono text-white/20 uppercase block mt-1 font-bold">Win Rate</span>
                </div>
            </div>

            <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA} layout="vertical" margin={{ left: -20 }}>
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis
                            dataKey="side"
                            type="category"
                            tick={{ fill: '#ffffff20', fontSize: 12, fontFamily: 'monospace', fontWeight: 'bold' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: '#ffffff05' }}
                            contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 0 }}
                            itemStyle={{ fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="winRate" radius={[0, 2, 2, 0]} barSize={20}>
                            {DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.side === 'LONGS' ? '#22c55e' : '#ef4444'} fillOpacity={0.6} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 p-3 bg-blue-500/5 border border-blue-500/10">
                <p className="text-[12px] font-mono text-blue-400 uppercase leading-relaxed text-center font-bold">
                    AI Insight: You perform significantly better during expansion phases than mean-reversion pullbacks.
                </p>
            </div>
        </div>
    );
};
