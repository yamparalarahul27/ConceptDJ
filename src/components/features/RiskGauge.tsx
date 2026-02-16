'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RiskGaugeProps {
    score: number;
    label: string;
    labelColor: string;
    subLabel?: string;
    size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
    score,
    label,
    labelColor,
    subLabel,
    size = 200
}) => {
    const radius = size * 0.4;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getGaugeColor = (val: number) => {
        if (val <= 34) return '#4ade80'; // Green
        if (val <= 64) return '#fbbf24'; // Amber
        if (val <= 79) return '#fb923c'; // Orange
        return '#f87171'; // Red
    };

    return (
        <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="8"
                    fill="transparent"
                />
                {/* Progress Circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getGaugeColor(score)}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="square"
                />
            </svg>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span
                    className="text-4xl font-pixel font-bold text-white mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {Math.round(score)}
                </motion.span>
                <motion.span
                    className={`text-[12px] font-mono uppercase tracking-[0.2em] font-bold ${labelColor}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {label}
                </motion.span>
                {subLabel && (
                    <span className="text-[12px] font-mono text-white/20 uppercase mt-2 tracking-widest font-bold">
                        {subLabel}
                    </span>
                )}
            </div>
        </div>
    );
};
