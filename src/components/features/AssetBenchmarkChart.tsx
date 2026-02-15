
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AssetBenchmarkChartProps {
    data: any[];
    height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 border border-white/10 p-3 rounded-none shadow-xl backdrop-blur-md">
                <p className="text-white/40 text-[10px] font-mono mb-2 uppercase tracking-wider">Time: {label}</p>
                {payload.map((p: any) => (
                    <div key={p.name} className="flex items-center justify-between gap-6 mb-1">
                        <span className="text-white/60 text-xs font-mono uppercase tracking-tight">{p.name}</span>
                        <span style={{ color: p.color }} className="text-sm font-pixel font-bold">
                            {p.value >= 0 ? '+' : ''}{p.value.toFixed(2)}%
                        </span>
                    </div>
                ))}
                {payload.length > 1 && (
                    <div className="mt-2 pt-2 border-t border-white/5">
                        <p className="flex justify-between gap-4">
                            <span className="text-purple-400 text-[10px] font-mono uppercase font-bold">Alpha vs BTC:</span>
                            <span className="text-purple-400 font-pixel text-xs">
                                {(payload[0].value - payload[1].value).toFixed(2)}%
                            </span>
                        </p>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

/**
 * AssetBenchmarkChart Component
 * 
 * PURPOSE:
 * Benchmarks the trader's performance against major assets (BTC, ETH).
 * Visualizes relative performance in percentage terms to show "Alpha" generation.
 */
export const AssetBenchmarkChart: React.FC<AssetBenchmarkChartProps> = ({ data, height = 400 }) => {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Self vs. Market (Alpha Analysis)</h3>
                    <p className="text-[10px] text-white/40 font-mono italic">Relative performance in % yield</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-white/40 font-mono uppercase block mb-1 font-bold text-purple-400 tracking-tighter">TOTAL ALPHA (MTD)</span>
                    <span className="text-xl font-bold text-white font-pixel">+8.42%</span>
                </div>
            </div>

            <div className="flex-1" style={{ width: '100%', minHeight: height - 100 }}>
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="time"
                            hide
                        />
                        <YAxis
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                        <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="rect"
                            formatter={(value) => <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter ml-1">{value}</span>}
                        />

                        <Line
                            type="monotone"
                            dataKey="pnl"
                            name="Your Performance"
                            stroke="#4ade80"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0, fill: '#4ade80' }}
                            isAnimationActive={true}
                        />
                        <Line
                            type="monotone"
                            dataKey="btc"
                            name="BTC Benchmark"
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth={1.5}
                            strokeDasharray="4 4"
                            dot={false}
                            isAnimationActive={true}
                        />
                        <Line
                            type="monotone"
                            dataKey="eth"
                            name="ETH Benchmark"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth={1.5}
                            strokeDasharray="4 4"
                            dot={false}
                            isAnimationActive={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-blue-500/50"></span>
                    <span className="text-[10px] font-mono text-white/40 uppercase">Insight: You are currently outperforming Market Beta by 842bps.</span>
                </div>
            </div>
        </div>
    );
};
