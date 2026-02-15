'use client';

import React, { useState } from 'react';
import { AITiltMeter } from '@/components/features/AITiltMeter';
import { PsychologicalBiasTracker } from '@/components/features/PsychologicalBiasTracker';
import { ProJournalEntry } from '@/components/features/ProJournalEntry';
import { Brain, Sliders, Info, LineChart } from 'lucide-react';
import { useSettings } from '@/components/features/SettingsProvider';

// --- MOCK DATA ---
const BIAS_DATA = [
    { subject: 'FOMO', A: 45, fullMark: 100 },
    { subject: 'Revenge Trading', A: 85, fullMark: 100 },
    { subject: 'Sunk Cost', A: 30, fullMark: 100 },
    { subject: 'Overconfidence', A: 65, fullMark: 100 },
    { subject: 'Loss Aversion', A: 75, fullMark: 100 },
    { subject: 'Hesitation', A: 20, fullMark: 100 },
];

const JOURNAL_ENTRIES = [
    {
        id: 'j1',
        date: 'FEB 15, 2024',
        sentiment: 'NEGATIVE' as const,
        bias: 'REVENGE TRADING',
        metrics: { pnl: -1240, trades: 18 },
        content: 'Started with a small loss on SOL-PERP. Tried to force it back by doubling size on BTC. Emotion took over. Need to stick to max daily draw limit. 18 trades is too high - overtrading confirmed.'
    },
    {
        id: 'j2',
        date: 'FEB 14, 2024',
        sentiment: 'POSITIVE' as const,
        bias: 'NONE DETECTED',
        metrics: { pnl: 2850, trades: 4 },
        content: 'Very patient session. Waited for the 4H breakout. Took 1/3 profit at first TP. Let the rest run. Felt calm. This is what systematic trading feels like.'
    },
    {
        id: 'j3',
        date: 'FEB 13, 2024',
        sentiment: 'NEUTRAL' as const,
        bias: 'FOMO',
        metrics: { pnl: 120, trades: 7 },
        content: 'Caught the BONK rally late. Exited early due to fear of reversal. Profit is profit, but entry was purely impulse based on X (Twitter) hype. Must filter social noise.'
    }
];

export default function ProJournalPage() {
    const { settings } = useSettings();
    const [tiltLevel, setTiltLevel] = useState(78); // High tilt for demonstration

    return (
        <div className={`max-w-7xl mx-auto py-4 space-y-8 pb-24 px-6 ${settings.compactMode ? 'scale-[0.98] origin-top' : ''}`}>
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tighter text-heading-32">
                        {settings.playerName}'s Psychological Edge
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-purple-400 text-[10px] font-mono uppercase tracking-widest">
                            <Brain size={12} />
                            <span>Neural Bias Ingestion ACTIVE</span>
                        </div>
                        <span className="text-white/20">•</span>
                        <div className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                            SESSION REFLECTION v2.4
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setTiltLevel(Math.floor(Math.random() * 100))}
                        className="px-4 py-2 border border-white/10 bg-white/5 text-[10px] font-mono text-white/60 hover:text-white hover:bg-white/10 transition-all uppercase flex items-center gap-2"
                    >
                        <Sliders size={12} />
                        Simulate Variance
                    </button>
                    <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 flex flex-col items-end">
                        <span className="text-[10px] text-purple-400 font-mono uppercase leading-none mb-1">Current State</span>
                        <span className="text-sm font-bold text-white leading-none font-pixel uppercase tracking-widest">
                            {tiltLevel > 70 ? 'DANGER' : tiltLevel > 30 ? 'CAUTION' : 'ZEN'}
                        </span>
                    </div>
                </div>
            </header>

            {/* AI Tilt Meter - Full Width Hero */}
            {settings.showAITiltMeter && (
                <section>
                    <AITiltMeter tiltLevel={tiltLevel} />
                </section>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Bias Discovery (4/12) */}
                <div className="lg:col-span-12 xl:col-span-4">
                    <PsychologicalBiasTracker data={BIAS_DATA} />
                </div>

                {/* Journal Feed (8/12) */}
                <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
                    <div className="flex justify-between items-center mb-6 px-4 py-2 border-l border-white/20 bg-white/5">
                        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
                            Recent Behavioral Logs
                        </h3>
                        <div className="flex gap-4">
                            <span className="text-[9px] font-mono text-white/20 uppercase cursor-pointer hover:text-white transition-colors flex items-center gap-1.5">
                                <LineChart size={10} /> Analytics
                            </span>
                            <span className="text-[9px] font-mono text-white/20 uppercase cursor-pointer hover:text-white transition-colors flex items-center gap-1.5">
                                <Info size={10} /> Filter By Emotion
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {JOURNAL_ENTRIES.map(entry => (
                            <ProJournalEntry
                                key={entry.id}
                                date={entry.date}
                                sentiment={entry.sentiment}
                                bias={entry.bias}
                                metrics={entry.metrics}
                                content={entry.content}
                            />
                        ))}
                    </div>

                    <button className="mt-8 w-full py-4 border border-dashed border-white/10 text-[10px] font-mono text-white/20 uppercase hover:border-white/30 hover:text-white/60 transition-all tracking-widest">
                        + Load Archival Session Data
                    </button>
                </div>
            </div>
        </div>
    );
}
