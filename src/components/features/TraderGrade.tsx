'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Info, Target, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubScore {
    label: string;
    value: number;
    icon: any;
    color: string;
}

interface TraderGradeProps {
    grade: string;
    totalScore: number;
    subScores: SubScore[];
    description?: string;
}

const getGradeColor = (grade: string) => {
    const primary = grade.charAt(0);
    switch (primary) {
        case 'A': return 'text-green-400';
        case 'B': return 'text-blue-400';
        case 'C': return 'text-amber-400';
        case 'D': return 'text-orange-400';
        case 'F': return 'text-red-400';
        default: return 'text-white';
    }
};

const getScoreColor = (score: number) => {
    if (score >= 80) return 'stroke-green-400';
    if (score >= 60) return 'stroke-blue-400';
    if (score >= 40) return 'stroke-amber-400';
    return 'stroke-red-400';
};

/**
 * TraderGrade Component
 * 
 * A featured widget that visualizes a trader's performance grade and key metrics.
 * Designed with CDJ aesthetic: Geist fonts, glassmorphism, and neon accents.
 */
export const TraderGrade: React.FC<TraderGradeProps> = ({
    grade,
    totalScore,
    subScores,
    description = "Performance audit based on historical consistency and risk management."
}) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (totalScore / 100) * circumference;

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start bg-white/5 border border-white/10 p-8 rounded-none relative overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500" />

            {/* Gauge Section */}
            <div className="relative flex-shrink-0">
                <div className="relative w-48 h-48">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        {/* Track */}
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.03)"
                            strokeWidth="8"
                        />
                        {/* Progress */}
                        <motion.circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            className={cn("transition-colors duration-500", getScoreColor(totalScore))}
                            strokeWidth="8"
                            strokeLinecap="square"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        />
                    </svg>

                    {/* Inner Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            className={cn("text-6xl font-bold tracking-tighter mb-1", getGradeColor(grade))}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                        >
                            {grade}
                        </motion.span>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] font-bold">Trader Grade</span>
                            <span className="text-[14px] font-pixel text-white/60 font-bold">{totalScore}/100</span>
                        </div>
                    </div>
                </div>

                {/* Score Marker */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-3 h-1",
                                    i <= Math.ceil(totalScore / 20) ? "bg-purple-500" : "bg-white/5"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="flex-grow space-y-6 w-full">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500" />
                        <h3 className="text-[12px] font-mono font-bold text-white uppercase tracking-widest">Grade Analysis</h3>
                    </div>
                    <p className="text-[12px] text-white/40 font-mono leading-relaxed font-bold">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subScores.map((score, idx) => (
                        <motion.div
                            key={score.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + (idx * 0.1) }}
                            className="bg-white/[0.02] border border-white/5 p-4 relative group/item"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className={cn("p-1.5 bg-white/5 text-xs text-white/60", score.color)}>
                                        <score.icon size={14} />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">{score.label}</span>
                                </div>
                                <span className="text-[14px] font-pixel text-white font-bold">{score.value}%</span>
                            </div>

                            <div className="w-full h-[2px] bg-white/5 overflow-hidden">
                                <motion.div
                                    className={cn("h-full", score.color.replace('text-', 'bg-'))}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${score.value}%` }}
                                    transition={{ duration: 1, delay: 1 + (idx * 0.1) }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Insight Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Info size={12} className="text-purple-400" />
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold">
                            Top 12% of SOL Traders
                        </span>
                    </div>
                    <button className="text-[10px] font-mono text-white/20 hover:text-white/60 transition-colors uppercase tracking-widest font-bold">
                        Detailed Audit
                    </button>
                </div>
            </div>
        </div>
    );
};
