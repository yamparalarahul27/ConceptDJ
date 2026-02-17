'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Volume2,
    Zap,
    TrendingUp,
    ShieldAlert,
    Activity,
    Waves,
    Play,
    Info,
    X,
    Bell
} from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/utils';

export default function SoundLabPage() {
    const { playSynthesizedSound } = useSound();
    const [lastPlayed, setLastPlayed] = useState<string | null>(null);

    const handlePlay = (type: 'click' | 'success' | 'alert' | 'tick' | 'error' | 'notification') => {
        playSynthesizedSound(type);
        setLastPlayed(type);
    };

    return (
        <div className="min-h-screen text-white p-8 md:p-16 max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-24">
                <div className="flex items-center gap-3 mb-4">
                    <Waves className="text-purple-500" size={20} />
                    <span className="font-mono text-xs uppercase tracking-[0.4em]">Experiment 02 // Sound Synthesis</span>
                </div>
                <h1 className="text-5xl font-bold uppercase tracking-tighter mb-4">The Sound Lab</h1>
                <p className="text-white/40 max-w-2xl font-light">
                    Researching zero-latency audio feedback using the Web Audio API.
                    No file loading, just mathematical oscillators.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left: Controls */}
                <div className="lg:col-span-4 space-y-12">
                    <section>
                        <h2 className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-6">Master Oscillators</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'click', label: 'UI Click', icon: MousePointer2 },
                                { id: 'tick', label: 'Data Tick', icon: Activity },
                                { id: 'success', label: 'Success', icon: Zap },
                                { id: 'alert', label: 'Alert Thud', icon: ShieldAlert },
                                { id: 'error', label: 'Error Tone', icon: X },
                                { id: 'notification', label: 'Notification', icon: Bell },
                            ].map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => handlePlay(s.id as any)}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-3 p-6 border transition-all group",
                                        lastPlayed === s.id
                                            ? "bg-purple-500/10 border-purple-500/50 text-purple-400"
                                            : "bg-white/[0.02] border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                                    )}
                                >
                                    <s.icon size={20} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest">{s.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-none">
                        <div className="flex items-start gap-3">
                            <Info size={16} className="text-purple-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-white/50 leading-relaxed">
                                Note: These sounds are generated programmatically using Sine, Triangle, and Sawtooth oscillators with exponential decay envelopes.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Right: Interactive Cards */}
                <div className="lg:col-span-8 space-y-12">
                    <h2 className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Interactive Component Test</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* PnL Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePlay('tick')}
                            className="bg-white/[0.01] border border-white/10 p-8 cursor-pointer hover:bg-white/[0.03] transition-colors relative group"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <span className="text-[10px] font-mono text-white/20 uppercase">Daily PnL</span>
                                <TrendingUp size={16} className="text-green-500" />
                            </div>
                            <h3 className="text-4xl font-bold font-pixel text-green-400 mb-2">+$12,402.10</h3>
                            <p className="text-[10px] font-mono text-white/40 uppercase">Click to simulate update tick</p>

                            {/* Sound Indicator */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Volume2 size={12} className="text-purple-400" />
                            </div>
                        </motion.div>

                        {/* Risk Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePlay('alert')}
                            className="bg-white/[0.01] border border-white/10 p-8 cursor-pointer hover:bg-white/[0.03] transition-colors relative group"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <span className="text-[10px] font-mono text-white/20 uppercase">Risk Level</span>
                                <ShieldAlert size={16} className="text-red-500" />
                            </div>
                            <h3 className="text-4xl font-bold font-pixel text-red-400 mb-2">HIGH (7.2)</h3>
                            <p className="text-[10px] font-mono text-white/40 uppercase">Click to simulate alert thud</p>

                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Volume2 size={12} className="text-purple-400" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Visualizer Area */}
                    <div className="h-64 bg-white/[0.02] border border-white/10 flex items-center justify-center relative overflow-hidden">
                        <div className="flex items-end gap-1 h-32">
                            {Array.from({ length: 32 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: lastPlayed ? [2, Math.random() * 80 + 20, 2] : 2,
                                        opacity: lastPlayed ? [0.1, 0.5, 0.1] : 0.1
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: 0,
                                        ease: "circOut",
                                        delay: i * 0.01
                                    }}
                                    className="w-1.5 bg-purple-500"
                                />
                            ))}
                        </div>
                        <span className="absolute bottom-4 text-[9px] font-mono text-white/10 uppercase tracking-[0.5em]">Real-time Waveform Proxy</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Missing icon import from earlier list
function MousePointer2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            <path d="m13 13 6 6" />
        </svg>
    )
}
