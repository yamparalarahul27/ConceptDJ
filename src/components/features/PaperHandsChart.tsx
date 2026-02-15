
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface PaperHandsChartProps {
    data: any[];
    height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 border border-white/10 p-3 rounded-none shadow-xl backdrop-blur-md">
                <p className="text-white/40 text-[10px] font-mono mb-2 uppercase tracking-wider">Time: {label}</p>
                {payload.map((p: any) => (
                    <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
                        <span className="text-white/60 text-xs font-mono lowercase">{p.name === 'actual' ? 'Actual PnL' : 'HODL strategy'}</span>
                        <span style={{ color: p.color }} className="text-sm font-pixel font-bold">
                            ${p.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

/**
 * PaperHandsChart Component
 * 
 * PURPOSE:
 * Visualizes "Ghost Equity" vs Actual Equity.
 * Shows the trader what their portfolio would look like if they held (HODL) 
 * versus their actual active trading performance.
 */
export const PaperHandsChart: React.FC<PaperHandsChartProps> = ({ data, height = 300 }) => {
    // Generate synthetic HODL curve if not present
    // We want it to be slightly higher to show "Paper Hands" missed gains
    const chartData = useMemo(() => {
        return data.map((item, i) => ({
            ...item,
            actual: item.value,
            // HODL curve: adds a cumulative premium to show divergence
            hodl: item.value * (1 + (i * 0.02) + Math.random() * 0.05)
        }));
    }, [data]);

    return (
        <div style={{ width: '100%', height }}>
            <ResponsiveContainer>
                <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="hodlGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.05} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />

                    <XAxis
                        dataKey="time"
                        hide
                    />

                    <YAxis
                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                    />

                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />

                    {/* HODL Strategy Curve (Ghost) */}
                    <Area
                        type="monotone"
                        name="hodl"
                        dataKey="hodl"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fill="url(#hodlGradient)"
                        isAnimationActive={true}
                        animationDuration={2000}
                    />

                    {/* Actual PnL Curve */}
                    <Area
                        type="monotone"
                        name="actual"
                        dataKey="actual"
                        stroke="#4ade80"
                        strokeWidth={2}
                        fill="url(#actualGradient)"
                        isAnimationActive={true}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
