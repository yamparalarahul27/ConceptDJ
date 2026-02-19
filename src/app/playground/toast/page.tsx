'use client';

import React, { useMemo, useState } from 'react';
import { Toaster, sileo } from 'sileo';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, XCircle, Info, Loader2, Timer } from 'lucide-react';

const POSITIONS: { label: string; value: Parameters<typeof Toaster>[0]['position'] }[] = [
    { label: 'Top Right', value: 'top-right' },
    { label: 'Top Left', value: 'top-left' },
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
];

export default function ToastDemoPage() {
    const [position, setPosition] = useState<Parameters<typeof Toaster>[0]['position']>('top-right');
    const [topOffset, setTopOffset] = useState(24);
    const [bottomOffset, setBottomOffset] = useState(24);

    const computedOffset = useMemo(() => {
        const isTop = position?.startsWith('top');
        return isTop ? { top: `${topOffset}px` } : { bottom: `${bottomOffset}px` };
    }, [position, topOffset, bottomOffset]);

    const fireSamples = () => {
        sileo.success({ title: 'Saved', description: 'Your settings were persisted.' });
        sileo.error({ title: 'API Error', description: 'Upstream returned 502.' });
        sileo.info({ title: 'Heads up', description: 'Latency up slightly.' });
        sileo.warning({ title: 'Margin Call', description: 'Collateral nearing threshold.' });
    };

    const firePromise = () => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => Math.random() > 0.3 ? resolve('ok') : reject(new Error('Failed')), 1500);
        });

        sileo.promise(promise, {
            loading: { title: 'Syncing', icon: <Loader2 className="animate-spin" size={14} /> },
            success: { title: 'Settled', description: 'Commit confirmed on-chain.' },
            error: { title: 'Rollback', description: 'Transaction reverted.' },
            position,
        });
    };

    const fireAction = () => {
        sileo.action({
            title: 'Restore defaults',
            description: 'Reset UI settings to baseline?',
            button: {
                title: 'Reset',
                onClick: () => sileo.success({ title: 'Restored', description: 'Defaults applied.', position })
            }
        });
    };

    return (
        <div className="min-h-screen text-white p-8 md:p-16 max-w-6xl mx-auto bg-black">
            <Toaster position={position} offset={computedOffset} options={{ fill: '#0b0b0f', roundness: 14 }} />

            <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.35em] text-emerald-400/70">
                        <Zap size={16} className="text-emerald-400" />
                        Experiment // Toast System
                    </div>
                    <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight">Sileo Toasts</h1>
                    <p className="mt-2 max-w-2xl text-white/50">
                        Physics-based, opinionated toast notifications. Explore states, positions, and promise lifecycle.
                    </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-white/60 bg-white/5 px-4 py-3 border border-white/10">
                    <Timer size={14} className="text-emerald-300" /> Demo Added: {new Date().toLocaleDateString('en-US')}
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border border-white/10 bg-white/5 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-white/50">
                            <Info size={14} /> States
                        </div>
                        <div className="flex gap-2 text-[10px] font-mono text-white/40">
                            <span className="px-2 py-1 bg-white/5 border border-white/10">Position: {position}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button onClick={() => sileo.success({ title: 'Success', description: 'Order filled instantly.', position })} className="flex items-center gap-2 px-3 py-3 border border-emerald-500/30 text-emerald-200 bg-emerald-500/5 text-sm font-mono uppercase tracking-[0.2em] hover:bg-emerald-500/10 transition-colors">
                            <CheckCircle2 size={16} /> Success
                        </button>
                        <button onClick={() => sileo.error({ title: 'Error', description: 'Failed to route order.', position })} className="flex items-center gap-2 px-3 py-3 border border-red-500/30 text-red-200 bg-red-500/5 text-sm font-mono uppercase tracking-[0.2em] hover:bg-red-500/10 transition-colors">
                            <XCircle size={16} /> Error
                        </button>
                        <button onClick={() => sileo.info({ title: 'Info', description: 'Session restored.', position })} className="flex items-center gap-2 px-3 py-3 border border-blue-500/30 text-blue-200 bg-blue-500/5 text-sm font-mono uppercase tracking-[0.2em] hover:bg-blue-500/10 transition-colors">
                            <Info size={16} /> Info
                        </button>
                        <button onClick={() => sileo.warning({ title: 'Warning', description: 'Latency spike detected.', position })} className="flex items-center gap-2 px-3 py-3 border border-yellow-500/30 text-yellow-200 bg-yellow-500/5 text-sm font-mono uppercase tracking-[0.2em] hover:bg-yellow-500/10 transition-colors">
                            <Loader2 size={16} className="animate-spin" /> Warning
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button onClick={fireSamples} className="text-[11px] font-mono px-3 py-2 border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-all">Blast Pack</button>
                        <button onClick={firePromise} className="text-[11px] font-mono px-3 py-2 border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-all">Promise Flow</button>
                        <button onClick={fireAction} className="text-[11px] font-mono px-3 py-2 border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-all">Action Toast</button>
                        <button onClick={() => sileo.clear()} className="text-[11px] font-mono px-3 py-2 border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-all">Clear All</button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="border border-white/10 bg-white/5 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-white/50">
                            <Timer size={14} /> Placement
                        </div>
                        <span className="text-[10px] font-mono text-white/40">Choose anchor</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {POSITIONS.map(pos => (
                            <button
                                key={pos.value}
                                onClick={() => setPosition(pos.value)}
                                className={`px-3 py-3 border text-sm font-mono uppercase tracking-[0.2em] transition-colors ${position === pos.value ? 'border-emerald-400 text-emerald-200 bg-emerald-500/10' : 'border-white/15 text-white/60 hover:text-white hover:border-white/40'}`}
                            >
                                {pos.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
                        <label className="flex flex-col gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40">Top Offset (px)</span>
                            <input
                                type="number"
                                value={topOffset}
                                onChange={e => setTopOffset(Number(e.target.value) || 0)}
                                className="bg-black border border-white/10 px-3 py-2 text-white text-sm focus:border-emerald-400 outline-none"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40">Bottom Offset (px)</span>
                            <input
                                type="number"
                                value={bottomOffset}
                                onChange={e => setBottomOffset(Number(e.target.value) || 0)}
                                className="bg-black border border-white/10 px-3 py-2 text-white text-sm focus:border-emerald-400 outline-none"
                            />
                        </label>
                    </div>

                    <div className="mt-6 text-sm text-white/40 leading-relaxed">
                        Sileo supports stacking, action buttons, promise transitions, and physics-based entry/exit. Use it for transactional feedback without heavy UI chrome.
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
