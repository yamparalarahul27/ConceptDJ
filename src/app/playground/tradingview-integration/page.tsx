'use client';

import React from 'react';
import { TradingViewChart } from '@/components/features/TradingViewChart';
import { motion } from 'framer-motion';
import { ConceptMetaBar } from '@/components/features/ConceptMetaBar';

export default function TradingViewIntegrationPage() {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 space-y-8 pb-12">
            <ConceptMetaBar />
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                        Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Charts</span>
                    </h1>
                    <p className="text-white/60 font-mono text-sm">
                        High-performance interactive technical analysis engine.
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-none px-4 py-2 self-start md:self-auto">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-white/60 uppercase tracking-widest">Live Feed active</span>
                </div>
            </motion.div>

            {/* Main Chart Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <TradingViewChart />
            </motion.div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Integration Type', value: 'Lightweight Charts' },
                    { label: 'Latency', value: '14ms' },
                    { label: 'Rendering', value: 'Canvas 2D' }
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-1"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">{stat.label}</span>
                        <span className="text-white font-medium">{stat.value}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
