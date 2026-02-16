'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Layout, Zap, Brain, ArrowUpRight } from 'lucide-react';

/**
 * ProTour Component
 * 
 * PURPOSE:
 * A non-intrusive onboarding tour for the "Pro Playground".
 * Only shown once per user via localStorage.
 */
export const ProTour: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('cdj_tour_seen');
        if (!hasSeenTour) {
            const timer = setTimeout(() => setIsVisible(true), 1500); // Delayed entry
            return () => clearTimeout(timer);
        }
    }, []);

    const completeTour = () => {
        setIsVisible(false);
        localStorage.setItem('cdj_tour_seen', 'true');
    };

    if (!isVisible) return null;

    const steps = [
        {
            title: "The Pro Switcher",
            description: "Navigate between high-fidelity concepts like the PnL Tracker and Liquidity Analyser using the top selector.",
            icon: Layout,
        },
        {
            title: "Behavioral Coaching",
            description: "Our AI Tilt Meter and Bias Tracker analyze your psychology, not just your profit.",
            icon: Brain,
        },
        {
            title: "Execution Efficiency",
            description: "Deep analytics like MAE/MFE show you where you're leaving money on the table.",
            icon: Zap,
        }
    ];

    const currentStep = steps[step];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500">
            <div className="bg-black border border-white/10 w-full max-w-md p-8 rounded-none relative overflow-hidden shadow-2xl">
                {/* Background Glitch Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] pointer-events-none" />

                <button
                    onClick={completeTour}
                    className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 bg-purple-500"></div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Pro Onboarding</span>
                </div>

                <div className="mb-8">
                    <div className="p-4 bg-white/5 border border-white/10 w-fit mb-6 text-purple-400">
                        <currentStep.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3 uppercase tracking-tighter">
                        {currentStep.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed font-light">
                        {currentStep.description}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 transition-all duration-300 ${i === step ? 'w-8 bg-purple-500' : 'w-2 bg-white/10'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => step < steps.length - 1 ? setStep(step + 1) : completeTour()}
                        className="flex items-center gap-2 bg-white text-black px-6 py-2.5 text-[10px] font-mono uppercase font-semibold hover:bg-purple-500 hover:text-white transition-all group"
                    >
                        {step === steps.length - 1 ? 'Execute Playground' : 'Next Discovery'}
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-center">
                    <button
                        onClick={completeTour}
                        className="text-[9px] font-mono text-white/20 uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Skip Discovery Tour
                    </button>
                </div>
            </div>
        </div>
    );
};
