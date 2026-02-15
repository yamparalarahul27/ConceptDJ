'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Zap } from 'lucide-react';

export const MarketVolatilityCard: React.FC = () => {
    const [volacity, setVolacity] = useState(14.2);

    useEffect(() => {
        const interval = setInterval(() => {
            setVolacity(prev => Math.max(5, Math.min(40, prev + (Math.random() > 0.5 ? 0.5 : -0.5))));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const getStatus = () => {
        if (volacity > 30) return { label: 'EXTREME', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
        if (volacity > 20) return { label: 'HIGH', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
        return { label: 'STABLE', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
    };

    const status = getStatus();

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none flex flex-col justify-between h-full group">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 ${status.bg} border ${status.border} ${status.color}`}>
                        <Activity size={16} />
                    </div>
                    <div>
                        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Market Volatility</h3>
                        <p className="text-[9px] font-mono text-white/30 uppercase">Real-time Entropy Index</p>
                    </div>
                </div>
                <div className={`px-2 py-0.5 ${status.bg} border ${status.border} text-[9px] font-mono ${status.color} uppercase font-bold`}>
                    {status.label}
                </div>
            </div>

            <div className="my-8">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white font-pixel tracking-tighter">
                        {volacity.toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-white/20 font-mono uppercase tracking-widest">HV_ANUALIZED</span>
                </div>
                <div className="mt-4 flex gap-1 h-1 w-full">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 transition-all duration-500 ${i < volacity ? (volacity > 30 ? 'bg-red-500' : 'bg-green-500') : 'bg-white/5'}`}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3 text-[9px] font-mono pt-4 border-t border-white/5">
                <Zap size={10} className="text-yellow-500" />
                <span className="text-white/40 uppercase">Liquidation Engine sensitivity increased</span>
            </div>
        </div>
    );
};
