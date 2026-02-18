'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Liveline, type LivelinePoint } from 'liveline';
import { motion } from 'framer-motion';
import { Activity, Sparkles, Zap } from 'lucide-react';

type ChartConfig = {
    theme: 'light' | 'dark';
    color: string;
    windowSecs: number;
    grid: boolean;
    badge: boolean;
    momentum: boolean;
    fill: boolean;
    scrub: boolean;
    exaggerate: boolean;
    degen: boolean;
    badgeTail: boolean;
    badgeVariant: 'default' | 'minimal';
    showValue: boolean;
    valueMomentumColor: boolean;
    windowStyle: 'default' | 'rounded' | 'text';
    tooltipOutline: boolean;
    pulse: boolean;
    referenceLine?: { value: number; label?: string };
};

const windowOptions = [
    { label: '30s', secs: 30 },
    { label: '1m', secs: 60 },
    { label: '5m', secs: 300 }
];

// Seed data near "now" so the Liveline window shows something immediately.
function buildInitialData(length: number): LivelinePoint[] {
    const data: LivelinePoint[] = [];
    const now = Date.now() / 1000;
    let current = 50;
    for (let i = length - 1; i >= 0; i--) {
        const drift = Math.sin(i / 8) * 4;
        const noise = (Math.random() - 0.5) * 6;
        current = Math.max(10, current + drift + noise);
        // 0.6s spacing keeps the seed within the initial 30s window to avoid a double-line transition.
        data.unshift({ time: now - i * 0.6, value: Number(current.toFixed(2)) });
    }
    return data;
}

function getChartHeight(config: ChartConfig) {
    let h = 300;
    if (config.showValue) h += 12;
    if (config.badge) h += 8;
    if (config.windowStyle === 'text') h += 16;
    if (config.referenceLine) h += 8;
    return h;
}

function Chart({ data, value, config, onWindowChange }: { data: LivelinePoint[]; value: number; config: ChartConfig; onWindowChange: (secs: number) => void }) {
    const height = getChartHeight(config);
    return (
        <div style={{ height }} className="w-full transition-[height] duration-300 ease-out">
            <Liveline
                data={data}
                value={value}
                theme={config.theme}
                color={config.color}
                window={config.windowSecs}
                grid={config.grid}
                badge={config.badge}
                momentum={config.momentum}
                fill={config.fill}
                scrub={config.scrub}
                exaggerate={config.exaggerate}
                degen={config.degen}
                badgeTail={config.badgeTail}
                badgeVariant={config.badgeVariant}
                showValue={config.showValue}
                valueMomentumColor={config.valueMomentumColor}
                windows={windowOptions}
                onWindowChange={onWindowChange}
                windowStyle={config.windowStyle}
                tooltipOutline={config.tooltipOutline}
                pulse={config.pulse}
                referenceLine={config.referenceLine}
            />
        </div>
    );
}

export default function LivelineExperimentPage() {
    const [data, setData] = useState(() => buildInitialData(50));
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [config, setConfig] = useState<ChartConfig>({
        theme: 'dark',
        color: '#3b82f6',
        windowSecs: windowOptions[0].secs,
        grid: true,
        badge: true,
        momentum: true,
        fill: true,
        scrub: true,
        exaggerate: false,
        degen: false,
        badgeTail: true,
        badgeVariant: 'default',
        showValue: false,
        valueMomentumColor: false,
        windowStyle: 'default',
        tooltipOutline: true,
        pulse: true,
        referenceLine: undefined
    });

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setData(prev => {
                const now = Date.now() / 1000;
                const last = prev[prev.length - 1];
                const base = last?.value ?? 50;
                const drift = Math.sin(now / 5) * 2;
                const noise = (Math.random() - 0.5) * 3;
                const nextVal = Math.max(10, base + drift + noise);
                const nextPoint: LivelinePoint = { time: now, value: Number(nextVal.toFixed(2)) };
                const next = [...prev, nextPoint];
                // Keep a few minutes of data to avoid unbounded growth.
                return next.slice(-400);
            });
        }, 800);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const liveValue = useMemo(() => data[data.length - 1]?.value ?? 50, [data]);

    const delta = liveValue - (data[data.length - 1]?.value ?? liveValue);
    const trendUp = delta >= 0;

    const toggle = (key: keyof ChartConfig) => {
        setConfig(prev => ({ ...prev, [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key] } as ChartConfig));
    };

    const cycleTheme = () => setConfig(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
    const cycleBadgeVariant = () => setConfig(prev => ({ ...prev, badgeVariant: prev.badgeVariant === 'default' ? 'minimal' : 'default' }));
    const cycleWindowStyle = () => setConfig(prev => ({ ...prev, windowStyle: prev.windowStyle === 'default' ? 'rounded' : prev.windowStyle === 'rounded' ? 'text' : 'default' }));
    const setWindowSecs = (secs: number) => setConfig(prev => ({ ...prev, windowSecs: secs }));

    const applyReferenceLine = () => setConfig(prev => ({ ...prev, referenceLine: prev.referenceLine ? undefined : { value: liveValue, label: 'Ref' } }));

    return (
        <div className="min-h-screen text-white p-8 md:p-16 max-w-6xl mx-auto">
            <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.35em] text-purple-400/70">
                        <Activity size={16} className="text-purple-500" />
                        Experiment 03 // Liveline
                    </div>
                    <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight">Realtime Liveline Chart</h1>
                    <p className="mt-2 max-w-2xl text-white/50">
                        Quick integration of the <span className="text-purple-300">liveline</span> micro-chart for streaming style visuals.
                        This experiment pipes faux tick data into the component to mirror an updating metric.
                    </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-white/60 bg-white/5 px-4 py-3 border border-white/10">
                    <Sparkles size={14} className="text-yellow-400" /> Lightweight • Headless • SVG
                </div>
            </header>

            <section className="grid grid-cols-1 gap-8">
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

                    <Chart data={data} value={liveValue} config={config} onWindowChange={setWindowSecs} />

                    <div className="mt-4 text-xs font-mono text-white/40 leading-relaxed mt-12">
                        <p>Data length: {data.length} points • Latest tick captured above.</p>
                        <p className="mt-1">Liveline renders a smooth SVG path that tracks updates without heavy charting overhead.</p>
                        <p className="mt-2">
                            Credit: <a href="https://benji.org" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">benji.org</a>
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-purple-500/10"
                >
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-4">Liveline Types & Toggles</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {windowOptions.map(w => (
                            <button
                                key={w.secs}
                                onClick={() => setWindowSecs(w.secs)}
                                className={`text-[10px] font-mono px-2 py-1 border ${config.windowSecs === w.secs ? 'border-purple-500 text-purple-300' : 'border-white/10 text-white/50 hover:text-white'}`}
                            >
                                Window {w.label}
                            </button>
                        ))}
                        <button onClick={cycleTheme} className="text-[10px] font-mono px-2 py-1 border border-white/10 text-white/70 hover:text-white">Theme: {config.theme}</button>
                        <button onClick={cycleBadgeVariant} className="text-[10px] font-mono px-2 py-1 border border-white/10 text-white/70 hover:text-white">Badge: {config.badgeVariant}</button>
                        <button onClick={cycleWindowStyle} className="text-[10px] font-mono px-2 py-1 border border-white/10 text-white/70 hover:text-white">Window Style: {config.windowStyle}</button>
                        <button onClick={applyReferenceLine} className={`text-[10px] font-mono px-2 py-1 border ${config.referenceLine ? 'border-green-500 text-green-300' : 'border-white/10 text-white/70 hover:text-white'}`}>
                            {config.referenceLine ? 'Reference On' : 'Reference Off'}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-mono text-white/70">
                        {[{ key: 'grid', label: 'Grid' }, { key: 'badge', label: 'Badge' }, { key: 'momentum', label: 'Momentum' }, { key: 'fill', label: 'Fill' }, { key: 'scrub', label: 'Scrub' }, { key: 'exaggerate', label: 'Exaggerate' }, { key: 'degen', label: 'Degen' }, { key: 'badgeTail', label: 'Badge Tail' }, { key: 'showValue', label: 'Show Value' }, { key: 'valueMomentumColor', label: 'Momentum Color' }, { key: 'tooltipOutline', label: 'Tooltip Outline' }, { key: 'pulse', label: 'Pulse' }].map(item => (
                            <button
                                key={item.key}
                                onClick={() => toggle(item.key as keyof ChartConfig)}
                                className={`w-full text-left px-2 py-2 border ${config[item.key as keyof ChartConfig] ? 'border-purple-500 text-purple-200' : 'border-white/10 text-white/50 hover:text-white/80'}`}
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
