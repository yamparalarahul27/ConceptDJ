'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    BarChart2,
    BookOpen,
    Zap,
    Brain,
    ShieldAlert,
    TrendingUp,
    Compass,
    Info,
    ChevronRight,
    Search,
    Filter,
    Target,
    Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- COMPONENT IMPORTS (MOCK DATA FOR PREVIEW) ---
import { PaperHandsChart } from '@/components/features/PaperHandsChart';
import { AITiltMeter } from '@/components/features/AITiltMeter';
import { PnLHeatmap } from '@/components/features/PnLHeatmap';
import { RiskAnalyser } from '@/components/features/RiskAnalyser';
import { ExecutionQualityChart } from '@/components/features/ExecutionQualityChart';
import { AssetBenchmarkChart } from '@/components/features/AssetBenchmarkChart';
import { OrderbookWidget } from '@/components/features/OrderbookWidget';
import { ConceptMetaBar } from '@/components/features/ConceptMetaBar';
import { TraderGrade } from '@/components/features/TraderGrade';

// --- CLIENT-ONLY COMPONENTS ---
const LiquidityHeatmap = dynamic(() => import('@/components/features/LiquidityHeatmap').then(mod => mod.LiquidityHeatmap), { ssr: false });

// --- NEW COMPONENTS FOR WIDGETS ---
import TimeBasedPerformanceCard from '@/components/features/TimeBasedPerformanceCard';
import { DirectionalBias } from '@/components/features/DirectionalBias';
import { MarketVolatilityCard } from '@/components/features/MarketVolatilityCard';
import { FundingHeatmap } from '@/components/features/FundingHeatmap';
import { BehavioralConsistencyChart } from '@/components/features/BehavioralConsistencyChart';
import { TradingViewChart } from '@/components/features/TradingViewChart';
import { PortfolioFragilityCard } from '@/components/features/PortfolioFragilityCard';
import { PortfolioValueBox } from '@/components/features/PortfolioValueBox';

// --- METADATA DEFINITION ---
interface WidgetMetadata {
    id: string;
    name: string;
    category: 'Performance' | 'Psychology' | 'Market Depth' | 'Utilities';
    description: string;
    calculation: string;
    utility: string;
    origin: string;
    icon: any;
    component: React.ComponentType<any>;
    mockData?: any;
}

const WIDGET_LIBRARY: WidgetMetadata[] = [
    {
        id: 'trader-grade',
        name: 'Trader Alpha Grade',
        category: 'Performance',
        description: 'Comprehensive performance audit using advanced behavioral analytics.',
        calculation: 'Composite scoring of Risk Consistency, Execution Quality, and Profit Factor.',
        utility: 'Identifies institutional-grade trading patterns and highlights areas for refinement.',
        origin: 'Trader Audit v2',
        icon: Target,
        component: TraderGrade,
        mockData: {
            grade: 'A-',
            totalScore: 88,
            subScores: [
                { label: 'Consistency', value: 94, icon: Shield, color: 'text-purple-400' },
                { label: 'Risk Mgmt', value: 82, icon: Target, color: 'text-blue-400' },
                { label: 'Execution', value: 91, icon: Zap, color: 'text-green-400' },
                { label: 'Discipline', value: 85, icon: Activity, color: 'text-amber-400' }
            ]
        }
    },
    {
        id: 'paper-hands',
        name: 'Paper Hands Tracker',
        category: 'Performance',
        description: 'Visualizes potential profits lost by exiting positions prematurely.',
        calculation: 'Delta between Actual Exit Price and Max Price reached within a T+N time window.',
        utility: 'Helps traders identify "exit anxiety" and refine their take-profit discipline.',
        origin: 'Pro PnL Tracker',
        icon: TrendingUp,
        component: PaperHandsChart,
        mockData: {
            data: [
                { date: '2024-01-01', value: 1000, time: 'Jan 01' },
                { date: '2024-01-02', value: 1250, time: 'Jan 02' },
                { date: '2024-01-03', value: 1100, time: 'Jan 03' },
                { date: '2024-01-04', value: 1400, time: 'Jan 04' },
                { date: '2024-01-05', value: 1350, time: 'Jan 05' },
                { date: '2024-01-06', value: 1800, time: 'Jan 06' },
                { date: '2024-01-07', value: 2100, time: 'Jan 07' },
            ],
            height: 250
        }
    },
    {
        id: 'tilt-meter',
        name: 'AI Tilt Meter',
        category: 'Psychology',
        description: 'A dynamic psychological gauge monitoring emotional trading states.',
        calculation: 'Composite score based on trade frequency, drawdown steepness, and "revenge trade" patterns.',
        utility: 'Provides real-time warnings to stop trading when emotional bias is detected.',
        origin: 'Trading Journal',
        icon: Brain,
        component: AITiltMeter
    },
    {
        id: 'pnl-heatmap',
        name: 'PnL Heatmap',
        category: 'Performance',
        description: 'A calendar-based density map of financial performance.',
        calculation: 'Daily net PnL aggregated and normalized across a color-coded frequency grid.',
        utility: 'Identifies temporal clusters of success or failure (e.g., "Monday Bias").',
        origin: 'Pro PnL Tracker',
        icon: BarChart2,
        component: PnLHeatmap,
        mockData: {
            data: [
                { date: '2024-01-01', pnl: 450 },
                { date: '2024-01-02', pnl: -120 },
                { date: '2024-01-03', pnl: 890 },
                { date: '2024-01-04', pnl: 230 },
                { date: '2024-01-05', pnl: -50 },
                { date: '2024-01-06', pnl: 120 },
                { date: '2024-01-07', pnl: 560 }
            ]
        }
    },
    {
        id: 'risk-analyser',
        name: 'Risk Radar',
        category: 'Performance',
        description: 'A multi-dimensional audit of risk and reward efficiency.',
        calculation: 'Normalization of Profit Factor, Sharpe Ratio, Max Drawdown, and Recovery Factor.',
        utility: 'Offers a holistic view of portfolio stability beyond simple PnL.',
        origin: 'Deep Performance',
        icon: ShieldAlert,
        component: RiskAnalyser
    },
    {
        id: 'execution-quality',
        name: 'Execution Quality',
        category: 'Performance',
        description: 'Analyzes precision of entries and exits relative to market movement.',
        calculation: 'MAE (Maximum Adverse Excursion) vs. MFE (Maximum Favorable Excursion) scatter plot.',
        utility: 'Quantifies how much of a move was captured vs. how much heat was taken.',
        origin: 'Deep Performance',
        icon: Activity,
        component: ExecutionQualityChart,
        mockData: {
            data: [
                { pair: 'SOL-PERP', mae: 120.50, mfe: 450.50, pnl: 380.00 },
                { pair: 'BTC-PERP', mae: 450.00, mfe: 100.00, pnl: -320.00 },
                { pair: 'JUP-PERP', mae: 50.00, mfe: 890.00, pnl: 810.00 },
                { pair: 'ETH-PERP', mae: 230.20, mfe: 560.20, pnl: 430.20 },
                { pair: 'BONK-PERP', mae: 150.50, mfe: 20.00, pnl: -130.50 },
                { pair: 'ARB-PERP', mae: 420.00, mfe: 450.00, pnl: 10.00 },
            ],
            height: 250
        }
    },
    {
        id: 'asset-benchmark',
        name: 'Asset Benchmark',
        category: 'Performance',
        description: 'Compares portfolio performance against major crypto benchmarks.',
        calculation: 'Relative % change of Account Equity indexed against BTC and ETH price action.',
        utility: 'Determines if the trader is actually beating the market or just following Beta.',
        origin: 'Deep Performance',
        icon: Compass,
        component: AssetBenchmarkChart,
        mockData: {
            data: [
                { time: '0', pnl: 0, btc: 0, eth: 0 },
                { time: '1', pnl: 2, btc: 1.5, eth: 1 },
                { time: '2', pnl: 1.5, btc: 3, eth: 2.5 },
                { time: '3', pnl: 4, btc: 3.5, eth: 3 },
                { time: '4', pnl: 6, btc: 5, eth: 4.5 },
                { time: '5', pnl: 5.5, btc: 4.5, eth: 4 },
                { time: '6', pnl: 8.5, btc: 6, eth: 5.5 },
            ],
            height: 250
        }
    },
    {
        id: 'liquidity-heatmap',
        name: 'Liquidity Heatmap',
        category: 'Market Depth',
        description: 'Visualizes price levels with high concentration of resting orders.',
        calculation: 'Aggregated Limit Order Book (LOB) volume across discrete price ticks.',
        utility: 'Identifies institutional resting liquidity and potential reversal zones.',
        origin: 'Liquidity Analyser',
        icon: Zap,
        component: LiquidityHeatmap,
        mockData: { height: 300 }
    },
    {
        id: 'orderbook-visualizer',
        name: 'Orderbook Depth',
        category: 'Market Depth',
        description: 'Real-time visualization of Buy vs. Sell wall pressure.',
        calculation: 'Cumulative volume sum from mid-price to +/- 2% price range.',
        utility: 'Helps scalp traders gauge immediate buy/sell pressure and imbalance.',
        origin: 'Liquidity Analyser',
        icon: Activity,
        component: OrderbookWidget,
        mockData: {
            bids: [
                { price: 108.41, amount: 15.4, total: 15.4 },
                { price: 108.39, amount: 22.1, total: 37.5 },
                { price: 108.35, amount: 145.0, total: 182.5 }
            ],
            asks: [
                { price: 108.43, amount: 8.2, total: 8.2 },
                { price: 108.45, amount: 35.5, total: 43.7 },
                { price: 108.48, amount: 12.0, total: 55.7 }
            ]
        }
    },
    /*
        id: 'equity-curve-analysis',
        name: 'Equity Curve Analysis',
        category: 'Performance',
        description: 'Visual representation of portfolio value changes over time.',
        calculation: 'Cumulative portfolio value indexed to initial capital.',
        utility: 'Tracks overall performance trajectory and drawdown periods.',
        origin: 'Deep Performance',
        icon: TrendingUp,
        component: TimeBasedPerformanceCard,
        mockData: {
            trades: [{
                closedAt: new Date(),
                pnl: 100,
                isWin: true,
                openedAt: new Date()
            }],
            minHeight: "h-[400px]",
            chartHeightClass: "h-[300px]"
        }
    */
    {
        id: 'portfolio-performance',
        name: 'Portfolio Performance',
        category: 'Performance',
        description: 'Summary of current portfolio value and key metrics.',
        calculation: 'Total portfolio value, daily/weekly/monthly returns.',
        utility: 'Provides quick overview of portfolio health.',
        origin: 'Portfolio Dashboard',
        icon: BarChart2,
        component: PortfolioValueBox,
        mockData: {}
    },
    {
        id: 'direction-bias',
        name: 'Direction Bias',
        category: 'Performance',
        description: 'Analysis of trading direction preferences and accuracy.',
        calculation: 'Ratio of long vs short positions and win rates.',
        utility: 'Identifies directional strengths and weaknesses.',
        origin: 'Deep Performance',
        icon: Compass,
        component: DirectionalBias,
        mockData: {}
    },
    {
        id: 'market-volatility',
        name: 'Market Volatility',
        category: 'Market Depth',
        description: 'Real-time volatility metrics for tracked assets.',
        calculation: 'ATR (Average True Range) and volatility bands.',
        utility: 'Helps assess market conditions for trading decisions.',
        origin: 'Deep Performance',
        icon: Zap,
        component: MarketVolatilityCard,
        mockData: {}
    },
    {
        id: 'funding-rate-heatmap',
        name: 'Funding Rate Heatmap',
        category: 'Performance',
        description: 'Calendar view of funding rates over time.',
        calculation: 'Daily funding rate aggregation and color coding.',
        utility: 'Identifies optimal times for long/short positions in perpetuals.',
        origin: 'Deep Performance',
        icon: BarChart2,
        component: FundingHeatmap,
        mockData: {}
    },
    {
        id: 'behavioral-log-card',
        name: 'Behavioral Log Card',
        category: 'Psychology',
        description: 'Tracking of behavioral consistency in trading decisions.',
        calculation: 'Consistency score based on trade patterns.',
        utility: 'Monitors psychological discipline over time.',
        origin: 'Deep Performance',
        icon: Brain,
        component: BehavioralConsistencyChart,
        mockData: {}
    },
    {
        id: 'trading-view-chart',
        name: 'Trading View Chart',
        category: 'Utilities',
        description: 'Advanced interactive charting with technical indicators.',
        calculation: 'Real-time price data with customizable overlays.',
        utility: 'Comprehensive technical analysis tool.',
        origin: 'TradingView Integration',
        icon: Activity,
        component: TradingViewChart,
        mockData: {}
    },
    {
        id: 'portfolio-fragility',
        name: 'Portfolio Fragility',
        category: 'Performance',
        description: 'Assessment of portfolio stability and risk exposure.',
        calculation: 'Fragility index based on diversification and correlations.',
        utility: 'Evaluates overall portfolio resilience.',
        origin: 'Deep Performance',
        icon: ShieldAlert,
        component: PortfolioFragilityCard,
        mockData: {}
    }
];

export default function WidgetsLibraryPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredWidgets = WIDGET_LIBRARY.filter(w => {
        const matchesCategory = selectedCategory === 'All' || w.category === selectedCategory;
        const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            w.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="w-full max-w-7xl mx-auto px-6 space-y-12 pb-24">
            {/* Header */}
            <header>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-purple-500"></div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Component Audit v1.0</span>
                </div>
                <h1 className="text-4xl font-bold text-white uppercase tracking-tighter mb-4">Cards & Widgets Library</h1>
                <p className="text-white/50 max-w-2xl font-light">
                    A comprehensive technical breakdown of all analytical modules designed for the CDJ collective.
                </p>
            </header>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white/[0.02] border border-white/10 p-4">
                <div className="flex gap-2 flex-wrap">
                    {['All', 'Performance', 'Psychology', 'Market Depth', 'Utilities'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all",
                                selectedCategory === cat
                                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search widgets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-none pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-12">
                {filteredWidgets.map((widget) => (
                    <motion.div
                        key={widget.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-white/5 bg-white/[0.01] p-8 hover:bg-white/[0.02] transition-colors group"
                    >
                        {/* Summary Column */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 border border-white/10 text-purple-400">
                                    <widget.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">{widget.name}</h3>
                                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">{widget.category}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] font-mono text-purple-500/60 uppercase block mb-1">Description</span>
                                    <p className="text-sm text-white/60 leading-relaxed font-light">{widget.description}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-mono text-purple-500/60 uppercase block mb-1">Calculation Method</span>
                                    <p className="text-xs text-white/40 font-mono leading-relaxed">{widget.calculation}</p>
                                </div>
                                <div className="p-4 bg-purple-500/5 border border-purple-500/10">
                                    <span className="text-[10px] font-mono text-purple-400 uppercase block mb-1 flex items-center gap-2">
                                        <Info size={12} /> Trader Utility
                                    </span>
                                    <p className="text-xs text-white/70 leading-relaxed">{widget.utility}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[9px] font-mono text-white/20 uppercase">First seen in:</span>
                                <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">{widget.origin}</span>
                            </div>
                        </div>

                        {/* Preview Column */}
                        <div className="lg:col-span-8 bg-black/40 border border-white/10 p-6 flex flex-col justify-center min-h-[300px] relative overflow-hidden">

                            {/* Render the component with its mock data */}
                            <div className="w-full">
                                <widget.component {...(widget.mockData || {})} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
