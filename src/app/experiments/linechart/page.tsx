'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, Zap } from 'lucide-react';
import { curveLinear, curveMonotoneX, curveStep } from '@visx/curve';

import { LineChart } from '@/components/charts/line-chart';
import { Line } from '@/components/charts/line';
import { Grid } from '@/components/charts/grid';
import { XAxis } from '@/components/charts/x-axis';
import { ChartTooltip } from '@/components/charts/tooltip';

type ChartConfig = {
    curveType: 'monotone' | 'linear' | 'step';
    strokeWidth: number;
    fadeEdges: boolean;
    showHighlight: boolean;
    animate: boolean;
    animationDuration: number;
    grid: 'horizontal' | 'vertical' | 'both' | 'none';
    showTooltip: boolean;
    showXAxis: boolean;
};

const curveMap = {
    monotone: curveMonotoneX,
    linear: curveLinear,
    step: curveStep
};

function buildInitialData(length: number) {
    const data = [];
    const now = Date.now();
    let current = 50;
    for (let i = length - 1; i >= 0; i--) {
        const drift = Math.sin(i / 8) * 4;
        const noise = (Math.random() - 0.5) * 6;
        current = Math.max(10, current + drift + noise);
        data.unshift({ date: new Date(now - i * 1000), value: Number(current.toFixed(2)) });
    }
    return data;
}

export default function LineChartExperimentPage() {
    const [data, setData] = useState<any[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [config, setConfig] = useState<ChartConfig>({
        curveType: 'monotone',
        strokeWidth: 2,
        fadeEdges: true,
        showHighlight: true,
        animate: true,
        animationDuration: 500,
        grid: 'horizontal',
        showTooltip: true,
        showXAxis: true
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setData(buildInitialData(60));

        timerRef.current = setInterval(() => {
            setData(prev => {
                const now = new Date();
                const last = prev[prev.length - 1];
                const base = last?.value ?? 50;
                const drift = Math.sin(now.getTime() / 5000) * 2;
                const noise = (Math.random() - 0.5) * 3;
                const nextVal = Math.max(10, base + drift + noise);
                const nextPoint = { date: now, value: Number(nextVal.toFixed(2)) };
                const next = [...prev, nextPoint];
                return next.slice(-60); // keep rolling window
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const liveValue = useMemo(() => data[data.length - 1]?.value ?? 50, [data]);
    const previousValue = useMemo(() => data[data.length - 2]?.value ?? liveValue, [data, liveValue]);
    const delta = liveValue - previousValue;
    const trendUp = delta >= 0;

    const toggle = (key: keyof ChartConfig) => {
        setConfig(prev => ({ ...prev, [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key] } as ChartConfig));
    };

    const cycleCurve = () => setConfig(prev => ({
        ...prev,
        curveType: prev.curveType === 'monotone' ? 'linear' : prev.curveType === 'linear' ? 'step' : 'monotone'
    }));

    const cycleGrid = () => setConfig(prev => ({
        ...prev,
        grid: prev.grid === 'horizontal' ? 'vertical' : prev.grid === 'vertical' ? 'both' : prev.grid === 'both' ? 'none' : 'horizontal'
    }));

    const cycleStrokeWidth = () => setConfig(prev => ({
        ...prev,
        strokeWidth: prev.strokeWidth === 1 ? 2 : prev.strokeWidth === 2 ? 3 : 1
    }));

    if (!mounted) {
        return <div className="min-h-screen text-white p-8 md:p-16 max-w-6xl mx-auto" />
    }

    return (
        <div className="min-h-screen text-white p-8 md:p-16 max-w-6xl mx-auto">
            <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.35em] text-purple-400/70">
                        <Activity size={16} className="text-purple-500" />
                        Experiment 04 // Bklit UI Line Chart
                    </div>
                    <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight">Interactive Line Chart</h1>
                    <p className="mt-2 max-w-2xl text-white/50">
                        Integration of the <span className="text-purple-300">@bklitui/ui/charts</span> component for high-performance React charts.
                        Configurable layout, smoothing, and animated data updates.
                    </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-white/60 bg-white/5 px-4 py-3 border border-white/10 rounded-md">
                    <Sparkles size={14} className="text-yellow-400" /> Visx • shadcn/ui • Composable
                </div>
            </header>

            <section className="grid grid-cols-1 gap-y-[32px]">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-2"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-white/50 ">
                            <Zap size={14} className="text-green-400" /> Live Metric
                        </div>
                        <div className="flex items-baseline gap-2 font-mono">
                            <span className="text-lg">{liveValue.toFixed(2)}</span>
                            <span className={`text-xs ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                                {trendUp ? '+' : ''}{delta.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="w-full h-[300px] transition-all duration-300 ease-out">
                        <LineChart
                            data={data}
                            xDataKey="date"
                            className="h-full"
                            aspectRatio="auto"
                            animationDuration={config.animate ? config.animationDuration : 0}
                        >
                            {config.grid !== 'none' && (
                                <Grid
                                    horizontal={config.grid === 'horizontal' || config.grid === 'both'}
                                    vertical={config.grid === 'vertical' || config.grid === 'both'}
                                    strokeDasharray="4,4"
                                />
                            )}

                            <Line
                                dataKey="value"
                                stroke="#a855f7"
                                strokeWidth={config.strokeWidth}
                                curve={curveMap[config.curveType]}
                                animate={config.animate}
                                fadeEdges={config.fadeEdges}
                                showHighlight={config.showHighlight}
                            />

                            {config.showXAxis && <XAxis />}
                            {config.showTooltip && <ChartTooltip />}
                        </LineChart>
                    </div>


                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-purple-500/10"
                >
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-4">Chart Toggles</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <button onClick={cycleCurve} className="text-[10px] font-mono px-3 py-1.5 border border-white/10 text-white/70 hover:text-white rounded-sm">
                            Curve: {config.curveType}
                        </button>
                        <button onClick={cycleGrid} className="text-[10px] font-mono px-3 py-1.5 border border-white/10 text-white/70 hover:text-white rounded-sm">
                            Grid: {config.grid}
                        </button>
                        <button onClick={cycleStrokeWidth} className="text-[10px] font-mono px-3 py-1.5 border border-white/10 text-white/70 hover:text-white rounded-sm">
                            Stroke Width: {config.strokeWidth}px
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-white/70">
                        {[
                            { key: 'fadeEdges', label: 'Fade Edges' },
                            { key: 'showHighlight', label: 'Hover Highlight' },
                            { key: 'animate', label: 'Animate Line' },
                            { key: 'showTooltip', label: 'Tooltip' },
                            { key: 'showXAxis', label: 'X-Axis' }
                        ].map(item => (
                            <button
                                key={item.key}
                                onClick={() => toggle(item.key as keyof ChartConfig)}
                                className={`w-full text-left px-3 py-2 border rounded-sm ${config[item.key as keyof ChartConfig] ? 'border-purple-500 text-purple-200' : 'border-white/10 text-white/50 hover:text-white/80'}`}
                            >
                                {config[item.key as keyof ChartConfig] ? 'On' : 'Off'} • {item.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
