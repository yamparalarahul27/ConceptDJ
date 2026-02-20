'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    CalendarX,
    Clock,
    Gauge,
    Scale,
    Timer,
    TrendingUp,
    Receipt,
    AlertTriangle,
    Lightbulb,
    ChevronLeft,
    ChevronRight,
    LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- MOCK DATA TYPES AND CONTENT ---

type Severity = 'positive' | 'warning' | 'insight';

interface Insight {
    id: string;
    title: string;
    description: string;
    value: string;
    severity: Severity;
    icon: keyof typeof iconMap;
}

const iconMap: Record<string, LucideIcon> = {
    calendar: Calendar,
    calendarX: CalendarX,
    clock: Clock,
    gauge: Gauge,
    scale: Scale,
    timer: Timer,
    trendingUp: TrendingUp,
    receipt: Receipt,
    alertTriangle: AlertTriangle,
    lightbulb: Lightbulb,
};

const severityColors: Record<Severity, string> = {
    positive: 'border-green-500/30 bg-green-500/5',
    warning: 'border-orange-500/30 bg-orange-500/5',
    insight: 'border-purple-500/30 bg-purple-500/5',
};

const iconColors: Record<Severity, string> = {
    positive: 'text-green-400',
    warning: 'text-orange-400',
    insight: 'text-purple-400',
};

const badgeColors: Record<Severity, string> = {
    positive: 'bg-green-500/20 text-green-400',
    warning: 'bg-orange-500/20 text-orange-400',
    insight: 'bg-purple-500/20 text-purple-400',
};

// Mock Insights Library
const MOCK_INSIGHTS: Insight[] = [
    {
        id: '1',
        title: 'Optimal Trading Window',
        description: 'You perform best between 08:00 and 11:00 UTC. Win rate peaks significantly during this session.',
        value: '+14% Win Rate',
        severity: 'positive',
        icon: 'clock',
    },
    {
        id: '2',
        title: 'Revenge Trading Risk',
        description: 'Consecutive losses observed. Historically, taking a 2-hour break prevents further drawdown.',
        value: 'High Risk',
        severity: 'warning',
        icon: 'alertTriangle',
    },
    {
        id: '3',
        title: 'Position Sizing Efficiency',
        description: 'Scaling into positions yields better net average entry prices than single-entry orders.',
        value: '-2.4 BPs Avg Entry',
        severity: 'insight',
        icon: 'scale',
    },
    {
        id: '4',
        title: 'Hold Time vs Profitability',
        description: 'Trades held longer than 45 minutes tend to degrade in profitability due to trailing stop exits.',
        value: 'Optimal: 22m',
        severity: 'insight',
        icon: 'gauge',
    },
    {
        id: '5',
        title: 'Fee Drag Warning',
        description: 'High frequency market orders are accumulating significant taker fees. Consider limit orders.',
        value: '$420 Fees/Wk',
        severity: 'warning',
        icon: 'receipt',
    },
    {
        id: '6',
        title: 'Trend Alignment',
        description: 'Trading in the direction of the daily VWAP has resulted in your highest R:R trades this month.',
        value: '3.2 R:R',
        severity: 'positive',
        icon: 'trendingUp',
    },
    {
        id: '7',
        title: 'Weekend Performance',
        description: 'Saturday/Sunday volume drops correlate with your lowest probability setups. Consider reducing size.',
        value: '-8% Win Rate',
        severity: 'insight',
        icon: 'calendarX',
    },
];

// --- COMPONENTS ---

const InsightCard = ({ insight }: { insight: Insight }) => {
    const IconComponent = iconMap[insight.icon] || Lightbulb;

    return (
        <div className={cn("h-full rounded-none border p-4 flex flex-col justify-between transition-colors", severityColors[insight.severity])}>
            <div>
                <div className="flex items-start justify-between mb-3">
                    <div className={cn("p-1.5 rounded-none bg-black/20", iconColors[insight.severity])}>
                        <IconComponent size={16} />
                    </div>
                    <span className={cn(
                        "text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-none",
                        badgeColors[insight.severity]
                    )}>
                        {insight.severity === "positive" ? "Strength" : insight.severity === "warning" ? "Watch" : "Insight"}
                    </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-tight">{insight.title}</h4>
                <p className="text-[10px] font-mono text-white/50 leading-relaxed font-bold">{insight.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
                <div className="font-pixel text-[12px] font-bold text-white">{insight.value}</div>
            </div>
        </div>
    );
};

interface TradeInsightsProps {
    insights?: Insight[];
    autoPlayInterval?: number;
}

/**
 * TradeInsights Component
 * 
 * A featured widget displaying a responsive, auto-scrolling carousel of automated trading insights.
 * Styled to fit the CDJ aesthetic (vibrant tech/alpha terminal).
 */
export const TradeInsights: React.FC<TradeInsightsProps> = ({
    insights = MOCK_INSIGHTS,
    autoPlayInterval = 5000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Responsive visible count
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setVisibleCount(1);
            else if (window.innerWidth < 1024) setVisibleCount(2);
            else setVisibleCount(3);
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, insights.length - visibleCount);

    const goNext = useCallback(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const goPrev = useCallback(() => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    // Auto-play logic
    useEffect(() => {
        if (isPaused || insights.length <= visibleCount) return;
        timerRef.current = setInterval(goNext, autoPlayInterval);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, goNext, insights.length, visibleCount, autoPlayInterval]);

    if (!insights || insights.length === 0) return null;

    // Calculate layout
    const gapPx = 16;
    const itemWidthCalc = `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`;

    return (
        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-none flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400">
                        <Lightbulb size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Automated Insights</h3>
                        <p className="text-[10px] font-mono text-white/40 uppercase font-bold tracking-widest">{insights.length} active observations</p>
                    </div>
                </div>

                {/* Controls (Hidden if not enough items) */}
                {insights.length > visibleCount && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goPrev}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            className="p-1.5 border border-white/10 text-white/40 hover:text-white hover:bg-white/5 hover:border-white/20 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={goNext}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            className="p-1.5 border border-white/10 text-white/40 hover:text-white hover:bg-white/5 hover:border-white/20 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Carousel Track Container */}
            <div
                className="relative overflow-hidden w-full flex-grow"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    className="flex"
                    style={{ gap: gapPx }}
                    initial={false}
                    animate={{ x: `calc(-${currentIndex} * (${itemWidthCalc} + ${gapPx}px))` }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                    {insights.map((insight) => (
                        <div
                            key={insight.id}
                            className="flex-shrink-0"
                            style={{ width: itemWidthCalc }}
                        >
                            <InsightCard insight={insight} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Progress Dots */}
            {insights.length > visibleCount && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={cn(
                                "h-1 rounded-none transition-all duration-300",
                                currentIndex === idx ? "w-4 bg-purple-500" : "w-1 bg-white/10"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
