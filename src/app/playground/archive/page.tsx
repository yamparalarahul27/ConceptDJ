'use client';

import React from 'react';
import { PsychologicalBiasTracker } from '@/components/features/PsychologicalBiasTracker';
import { BehavioralConsistencyChart } from '@/components/features/BehavioralConsistencyChart';
import { ConceptMetaBar } from '@/components/features/ConceptMetaBar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const BIAS_DATA = [
    { subject: 'FOMO', A: 45, fullMark: 100 },
    { subject: 'Revenge Trading', A: 85, fullMark: 100 },
    { subject: 'Sunk Cost', A: 30, fullMark: 100 },
    { subject: 'Overconfidence', A: 65, fullMark: 100 },
    { subject: 'Loss Aversion', A: 75, fullMark: 100 },
    { subject: 'Hesitation', A: 20, fullMark: 100 },
];

const EFFICIENCY_CARDS = [
    {
        title: 'Time Weighted Alpha',
        value: '1.24x',
        body: 'Your strategy generates 1.24% extra return for every 1% of market volatility.',
        color: 'text-white'
    },
    {
        title: 'Execution Score',
        value: '92/100',
        body: 'Top quartile efficiency. Your exit timing is in the top 5% of active users.',
        color: 'text-purple-400'
    },
    {
        title: 'Asset Allocation Opt',
        value: 'Spot +8%',
        body: 'Algorithmic suggestion: Increase spot exposure to diversify volatility profile.',
        color: 'text-blue-400'
    },
];

export default function ArchivePage() {
    return (
        <div className="max-w-7xl mx-auto py-8 px-6 space-y-8">
            <ConceptMetaBar />

            <div className="flex items-center gap-3 text-[10px] font-mono uppercase text-white/40">
                <Link href="/playground" className="flex items-center gap-2 hover:text-white transition-colors">
                    <ArrowLeft size={14} /> Back to Playground
                </Link>
                <span className="text-white/20">•</span>
                <span>Archive Zone</span>
            </div>

            <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Archive: Cognitive Bias Mapping</h1>
            <p className="text-white/40 text-sm font-mono max-w-3xl">
                Historical and experimental modules are staged here. The Cognitive Bias Mapping card is preserved for reference.
            </p>

            <div className="grid grid-cols-1 gap-8">
                <PsychologicalBiasTracker data={BIAS_DATA} />
                <BehavioralConsistencyChart />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EFFICIENCY_CARDS.map((card) => (
                    <div key={card.title} className="bg-white/5 border border-white/10 p-6 rounded-none h-full">
                        <span className="text-white/40 text-[12px] font-mono uppercase block mb-1 font-bold">{card.title}</span>
                        <span className={`text-3xl font-bold font-pixel ${card.color}`}>{card.value}</span>
                        <p className="mt-2 text-[12px] text-white/20 font-mono uppercase tracking-tighter leading-relaxed font-bold">
                            {card.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
