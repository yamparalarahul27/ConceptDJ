'use client';

import React, { useState, useEffect } from 'react';

/**
 * SystemStatusStrip Component
 * 
 * Shows hardcoded real-time latency, gas price, and API health.
 * Part of the "Pro Playground" experience.
 */
export default function SystemStatusStrip() {
    const [ping, setPing] = useState(24);
    const [gas, setGas] = useState(12);

    useEffect(() => {
        const interval = setInterval(() => {
            setPing(prev => prev + (Math.random() > 0.5 ? 1 : -1));
            setGas(prev => prev + (Math.random() > 0.5 ? 0.1 : -0.1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-8 bg-black/40 backdrop-blur-md border-t border-white/5 px-6 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest overflow-hidden">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500/50 rounded-none animate-pulse"></span>
                    <span>System Status: <span className="text-green-400">Operational</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <span>Latency: <span className="text-white/60 font-pixel">{ping}ms</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <span>Gas (SOL): <span className="text-white/60 font-pixel">{gas.toFixed(1)} Gwei</span></span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span>API Health: <span className="text-blue-400 font-pixel">99.9%</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-white/20 hover:text-white/60 transition-colors cursor-help">
                        CDJ Collective Engine v2.0.1
                    </span>
                </div>
            </div>
        </div>
    );
}
