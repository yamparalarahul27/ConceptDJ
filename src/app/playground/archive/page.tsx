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

            {/* Planning Section */}
            <div className="mt-16 border-t border-white/5 pt-8">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-mono uppercase text-purple-500 bg-purple-500/10 px-2 py-1">Tag: Planning</span>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Planning: Future Features</h2>
                </div>
                <p className="text-white/40 text-sm font-mono mb-8">
                    Detailed plans for upcoming features in the Deriverse Journal App.
                </p>

                <div className="space-y-12 text-sm text-white/60">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">6. Trade Alerts/Notifications</h3>
                        <p className="mb-4"><strong>Objective:</strong> Provide real-time and scheduled notifications to keep traders informed about their performance and important events.</p>
                        <div className="mb-4">
                            <strong>Key Components:</strong>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Threshold Alerts: Implement configurable PnL thresholds with immediate alerts when crossed (e.g., loss of 5%, gain of 10%).</li>
                                <li>Email Summaries: Daily/weekly automated emails with trade summaries, performance metrics, and key insights.</li>
                                <li>Browser Notifications: In-app browser notifications for critical events, using Notification API.</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <strong>Technical Implementation:</strong>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Use Web Notifications API for browser alerts.</li>
                                <li>Integrate email service (e.g., SendGrid or AWS SES) for summaries.</li>
                                <li>Store user preferences in settings for alert thresholds and frequencies.</li>
                                <li>Add notification history and management interface.</li>
                            </ul>
                        </div>
                        <div>
                            <strong>UI/UX Considerations:</strong>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Settings panel for configuring alerts.</li>
                                <li>Notification center in the app for viewing past alerts.</li>
                                <li>Clear distinction between different alert types.</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">7. Strategy Tracking</h3>
                        <p className="mb-4"><strong>Objective:</strong> Enable traders to categorize and analyze trades by strategies for better decision-making.</p>
                        <div className="mb-4">
                            <strong>Key Components:</strong>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Strategy Tagging: Allow users to assign predefined or custom strategy tags to each trade (e.g., "Scalping", "Swing", "Arbitrage").</li>
                                <li>Performance Comparison: Dashboard to compare performance across strategies (win rate, average PnL, drawdown).</li>
                                <li>Strategy Identification: Algorithm to suggest best-performing strategies based on historical data.</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <strong>Technical Implementation:</strong>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Extend trade data model to include strategy field.</li>
                                <li>Create strategy analytics functions in risk-math.ts.</li>
                                <li>Add strategy selection UI in trade entry forms.</li>
                                <li>Implement comparison charts using Recharts.</li>
                            </ul>
                        </div>
                        <div>
                            <strong>UI/UX Considerations:</strong>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Strategy selector in trade journal.</li>
                                <li>Dedicated strategy analytics page.</li>
                                <li>Visual indicators for strategy performance trends.</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">8. Social Features</h3>
                        <p className="mb-4"><strong>Objective:</strong> Add community aspects to encourage engagement and learning from peers.</p>
                        <div className="mb-4">
                            <strong>Key Components:</strong>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Anonymous Sharing: Option to share trade performance anonymously with community.</li>
                                <li>Leaderboards: Global or filtered leaderboards based on performance metrics.</li>
                                <li>Community Insights: Aggregated insights from shared trades (e.g., popular strategies, market sentiments).</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <strong>Technical Implementation:</strong>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>User profiles with privacy settings for sharing.</li>
                                <li>Backend for aggregating and anonymizing shared data.</li>
                                <li>Leaderboard algorithms with fair ranking systems.</li>
                                <li>Community dashboard for insights.</li>
                            </ul>
                        </div>
                        <div>
                            <strong>UI/UX Considerations:</strong>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Toggle for anonymous sharing in settings.</li>
                                <li>Leaderboard page with filters and categories.</li>
                                <li>Community insights widget on main dashboard.</li>
                                <li>Privacy-focused design to ensure user comfort.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8">
                        <h3 className="text-lg font-bold text-white mb-4">Overall Considerations</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Ensure all features comply with data privacy regulations.</li>
                            <li>Implement gradual rollout starting with basic functionality.</li>
                            <li>Gather user feedback during development for refinements.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
