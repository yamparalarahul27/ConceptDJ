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
    const [gas, setGas] = useState(0.0024);
    const [block, setBlock] = useState(248592104);

    useEffect(() => {
        const interval = setInterval(() => {
            setPing(prev => Math.max(12, Math.min(60, prev + (Math.random() > 0.5 ? 2 : -2))));
            setGas(prev => Math.max(0.001, prev + (Math.random() > 0.5 ? 0.0001 : -0.0001)));
            setBlock(prev => prev + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-8 bg-black/40 backdrop-blur-md border-t border-white/5 px-6 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest overflow-hidden">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-none"></span>
                        <span className="absolute w-1.5 h-1.5 bg-green-500 rounded-none animate-ping opacity-75"></span>
                    </div>
                    <span>System Status: <span className="text-green-400">Operational</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <span>Latency: <span className="text-white/60 font-pixel">{ping}ms</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <span>Priority Fee: <span className="text-white/60 font-pixel">{gas.toFixed(4)} SOL</span></span>
                </div>
                <div className="flex items-center gap-2 hidden lg:flex">
                    <span>Block: <span className="text-white/60 font-pixel">{block}</span></span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span>Uptime: <span className="text-blue-400 font-pixel">99.98%</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-white/20 hover:text-white/60 transition-colors cursor-help">
                        CDJ Core Engine v3.1.0-STABLE
                    </span>
                </div>
            </div>
        </div>
    );
}
