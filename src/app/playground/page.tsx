'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, BarChart2, BookOpen, Activity, Settings, Zap, Compass, TrendingUp } from 'lucide-react';
import { PixelHeading } from '@/components/ui/pixel-heading-character';
import Footer from '@/components/layout/Footer';

const CONCEPTS = [
    {
        name: 'Pro PnL Tracker',
        description: 'Advanced Profit & Loss analysis with drawdown visualization and calendar heatmaps.',
        path: '/playground/pnl-tracker',
        icon: BarChart2,
        status: 'READY',
        color: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    {
        name: 'Deep Performance',
        description: 'Benchmarking against major assets (BTC/ETH) and asset-class efficiency analysis.',
        path: '/playground/performance',
        icon: Activity,
        status: 'READY',
        color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
        name: 'Trading Journal',
        description: 'Professional trading journal with psychological tracking and AI Tilt Meter.',
        path: '/playground/journal',
        icon: BookOpen,
        status: 'READY',
        color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
        name: 'Liquidity Analyser',
        description: 'Depth analysis and liquidity heatmap concept for professional execution.',
        path: '/playground/liquidity',
        icon: Zap,
        status: 'READY',
        color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    },
    {
        name: 'Pixel Typography',
        description: 'Interactive per-character animated headings using the Geist Pixel font system.',
        path: '/playground/pixel-demo',
        icon: TrendingUp,
        status: 'NEW',
        color: 'bg-purple-600/10 text-purple-400 border-purple-500/30'
    },
    {
        name: 'Portfolio Dashboard',
        description: 'Comprehensive view of portfolio value, asset allocation across chains, and market watch.',
        path: '/playground/portfolio',
        icon: TrendingUp,
        status: 'NEW',
        color: 'bg-purple-600/10 text-purple-400 border-purple-500/30'
    },
    {
        name: 'Advanced Charts',
        description: 'Interactive TradingView lightweight charts for technical analysis.',
        path: '/playground/tradingview-integration',
        icon: BarChart2,
        status: 'READY',
        color: 'bg-pink-500/10 text-pink-400 border-pink-500/20'
    },
    {
        name: 'Cards & Widgets',
        description: 'Comprehensive audit and documentation of all analytical modules.',
        path: '/playground/widgets',
        icon: Compass,
        status: 'READY',
        color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    },
    {
        name: 'Collective Settings',
        description: 'Customize your Pro experience, theme adjustments, and UI preferences.',
        path: '/playground/settings',
        icon: Settings,
        status: 'READY',
        color: 'bg-white/10 text-white border-white/10'
    },
    {
        name: 'Archive',
        description: 'Staged concepts and retired modules for reference.',
        path: '/playground/archive',
        icon: BookOpen,
        status: 'INFO',
        color: 'bg-white/5 text-white/60 border-white/10'
    },
];

export default function PlaygroundDashboard() {
    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            <header className="mb-16 flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-none bg-purple-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Explorer v1.0</span>
                </div>

                <PixelHeading
                    mode="wave"
                    autoPlay
                    cycleInterval={340}
                    staggerDelay={200}
                    defaultFontIndex={0}
                    showLabel={false}
                    className="text-5xl md:text-8xl font-light text-white mb-4 uppercase tracking-tighter"
                >
                    CDJ Collective
                </PixelHeading>

                <h2 className="text-2xl md:text-4xl font-regular text-white/20 mb-8 uppercase">
                    Concept Playground
                </h2>

                <p className="text-lg text-white/50 max-w-2xl font-light leading-relaxed">
                    Explore high-fidelity UI concepts for Deriverse Journal App. <br />
                    Powered by <span className="text-white"><Link href="https://deriverse.io" target="_blank">Deriverse</Link></span> The next-gen, fully on-chain, and decentralized Solana trading ecosystem
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CONCEPTS.map((concept) => (
                    <Link key={concept.path} href={concept.path} className="group flex">
                        <div className="bg-white/[0.03] border border-white/10 rounded-none p-8 hover:bg-white/5 hover:border-white/20 transition-all duration-500 flex flex-col justify-between w-full group-hover:translate-y-[-4px] relative overflow-hidden">
                            {/* Hover Backdrop Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div>
                                <div className="flex justify-between items-start mb-12">
                                    <div className={`p-3 rounded-none bg-white/5 border border-white/10 text-white/60 group-hover:text-white group-hover:border-purple-500/30 transition-all`}>
                                        <concept.icon size={24} />
                                    </div>
                                    <span className={`text-[9px] font-mono font-bold px-2 py-1 uppercase tracking-widest border ${concept.color}`}>
                                        {concept.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors">
                                    {concept.name}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors mb-8">
                                    {concept.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white transition-all duration-300">
                                <span>Execute Module</span>
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <Footer />
        </div>
    );
}
