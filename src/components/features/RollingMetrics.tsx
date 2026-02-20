'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';
import { TrendingUp, Activity, BarChart2, DollarSign } from 'lucide-react';

// --- MOCK DATA TYPES AND CONTENT ---

export interface RollingDataPoint {
    date: string;
    sharpe7d: number;
    sharpe30d: number;
    winRate7d: number;
    winRate30d: number;
    avgPnl7d: number;
    avgPnl30d: number;
    profitFactor7d: number;
    profitFactor30d: number;
}

const generateMockRollingData = (): RollingDataPoint[] => {
    const data: RollingDataPoint[] = [];
    const today = new Date();

    // Generate 30 days of mock rolling data
    for (let i = 30; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        // Add some realistic noise/trends to the data
        const trend = Math.sin(i / 5);

        data.push({
            date: date.toISOString().split('T')[0],
            sharpe7d: 1.2 + (trend * 0.4) + (Math.random() * 0.2),
            sharpe30d: 1.1 + (Math.cos(i / 10) * 0.2),
            winRate7d: 55 + (trend * 10) + (Math.random() * 5),
            winRate30d: 58 + (Math.cos(i / 8) * 4),
            avgPnl7d: 120 + (trend * 40) + (Math.random() * 20),
            avgPnl30d: 110 + (Math.cos(i / 12) * 15),
            profitFactor7d: 1.5 + (trend * 0.3) + (Math.random() * 0.1),
            profitFactor30d: 1.6 + (Math.cos(i / 9) * 0.15),
        });
    }
    return data;
};

const MOCK_DATA = generateMockRollingData();

type MetricKey = "sharpe" | "winRate" | "avgPnl" | "profitFactor";

const metricConfig: Record<MetricKey, { label: string; key7d: keyof RollingDataPoint; key30d: keyof RollingDataPoint; format: (v: number) => string; icon: any }> = {
    sharpe: { label: "Sharpe Ratio", key7d: "sharpe7d", key30d: "sharpe30d", format: (v) => v.toFixed(2), icon: Activity },
    winRate: { label: "Win Rate %", key7d: "winRate7d", key30d: "winRate30d", format: (v) => `${v.toFixed(1)}%`, icon: Target },
    avgPnl: { label: "Avg PnL", key7d: "avgPnl7d", key30d: "avgPnl30d", format: (v) => `$${v.toFixed(0)}`, icon: DollarSign },
    profitFactor: { label: "Profit Factor", key7d: "profitFactor7d", key30d: "profitFactor30d", format: (v) => v.toFixed(2), icon: TrendingUp },
};

// Extracted from original lucide import, replacing Target to avoid conflicts if used elsewhere
import { Target } from 'lucide-react';

const CustomTooltip = ({ active, payload, label, config }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 border border-white/10 p-3 rounded-none shadow-xl backdrop-blur-md min-w-[150px]">
                <p className="text-white/40 text-[10px] font-mono mb-2 uppercase tracking-wider font-bold">{label}</p>
                <div className="space-y-1.5 border-t border-white/5 pt-2">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex justify-between items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: entry.color, opacity: entry.dataKey.includes('30d') ? 0.6 : 1 }}
                                />
                                <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">{entry.name}</span>
                            </div>
                            <span className="font-pixel text-[12px] text-white font-bold">
                                {config.format(entry.value)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

interface RollingMetricsProps {
    data?: RollingDataPoint[];
}

/**
 * RollingMetrics Component
 * 
 * A featured widget displaying 7-day vs 30-day trends for key metrics.
 * Styled with CDJ aesthetics (vibrant neon lines, glassmorphism containers).
 */
export const RollingMetrics: React.FC<RollingMetricsProps> = ({ data = MOCK_DATA }) => {
    const [selectedMetric, setSelectedMetric] = useState<MetricKey>("sharpe");

    if (!data || data.length < 3) {
        return (
            <div className="bg-white/5 border border-white/10 p-6 rounded-none flex flex-col items-center justify-center min-h-[300px]">
                <Activity size={24} className="text-white/20 mb-3" />
                <h3 className="text-[12px] font-mono font-bold text-white uppercase tracking-wider mb-1">Rolling Metrics</h3>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Insufficient Data (Requires &gt; 3 Days)</p>
            </div>
        );
    }

    const config = metricConfig[selectedMetric];

    return (
        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-none flex flex-col h-full w-full">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-white/5 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        <BarChart2 size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Rolling Performance</h3>
                        <p className="text-[10px] font-mono text-white/40 uppercase font-bold tracking-widest">7-Day vs 30-Day Moving Averages</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {(Object.keys(metricConfig) as MetricKey[]).map((key) => {
                        const Icon = metricConfig[key].icon;
                        const isSelected = selectedMetric === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setSelectedMetric(key)}
                                className={cn(
                                    "px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest font-bold border transition-colors flex items-center gap-1.5",
                                    isSelected
                                        ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                                        : "bg-white/5 text-white/40 border-white/10 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Icon size={12} className={cn(isSelected ? "text-blue-400" : "text-white/30")} />
                                {metricConfig[key].label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Chart Area */}
            <div className="h-[280px] w-full mt-2 relative">
                {/* Background decorative gradient based on active metric */}
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-none pointer-events-none opacity-50 transition-opacity duration-1000" />

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)", fontFamily: 'mono', fontWeight: 'bold' }}
                            tickFormatter={(d: string) => {
                                const [year, month, day] = d.split('-');
                                return `${month}/${day}`;
                            }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)", fontFamily: 'mono', fontWeight: 'bold' }}
                            tickFormatter={(v) => config.format(v)}
                            width={60}
                            axisLine={false}
                            tickLine={false}
                            dx={-10}
                        />
                        <Tooltip
                            content={<CustomTooltip config={config} />}
                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />

                        {/* 30-Day Rolling Average (Dashed, lower opacity) */}
                        <Line
                            type="monotone"
                            dataKey={config.key30d}
                            name="30-Day Avg"
                            stroke="#60a5fa" // blue-400
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            dot={false}
                            activeDot={{ r: 4, fill: "#60a5fa", stroke: "#000", strokeWidth: 2 }}
                            strokeOpacity={0.6}
                            animationDuration={1000}
                        />

                        {/* 7-Day Rolling Average (Solid, vibrant) */}
                        <Line
                            type="monotone"
                            dataKey={config.key7d}
                            name="7-Day Avg"
                            stroke="#3b82f6" // blue-500
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: "#3b82f6", stroke: "#000", strokeWidth: 2 }}
                            animationDuration={1000}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Footer Summary */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-none shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <span className="text-[10px] font-mono text-white/40 uppercase font-bold tracking-widest">
                        Solid line crossing above dashed line indicates short-term momentum.
                    </span>
                </div>
            </div>
        </div>
    );
};
