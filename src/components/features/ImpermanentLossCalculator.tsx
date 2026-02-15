'use client';

import React, { useState } from 'react';
import { Calculator, Info } from 'lucide-react';

export const ImpermanentLossCalculator: React.FC = () => {
    const [priceChange, setPriceChange] = useState(50); // 1.5x

    const calculateIL = (ratio: number) => {
        const il = (2 * Math.sqrt(ratio)) / (1 + ratio) - 1;
        return (il * 100).toFixed(2);
    };

    const ilValue = calculateIL((100 + priceChange) / 100);

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                        <Calculator size={16} />
                    </div>
                    <div>
                        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">IL Calculator</h3>
                        <p className="text-[9px] font-mono text-white/30 uppercase">Automated Market Maker Edge Case</p>
                    </div>
                </div>
                <Info size={14} className="text-white/20" />
            </div>

            <div className="space-y-8 flex-1">
                <div>
                    <div className="flex justify-between items-end mb-3">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Asset A Price Change</span>
                        <span className="text-sm font-bold text-white font-pixel">+{priceChange}%</span>
                    </div>
                    <input
                        type="range"
                        min="-90"
                        max="500"
                        value={priceChange}
                        onChange={(e) => setPriceChange(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 appearance-none outline-none cursor-pointer accent-yellow-500"
                    />
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 text-center flex flex-col gap-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] relative z-10">Calculated Impermanent Loss</span>
                    <span className="text-4xl font-bold text-yellow-500 font-pixel relative z-10">{ilValue}%</span>
                    <p className="text-[8px] font-mono text-white/20 uppercase mt-2 relative z-10 tracking-tighter">
                        Loss compared to holding assets outside the pool.
                    </p>
                </div>
            </div>

            <div className="mt-8 p-3 border border-dashed border-white/10 text-[9px] font-mono text-white/40 uppercase leading-relaxed">
                <span className="text-yellow-500/60 font-bold block mb-1">PRO INSIGHT:</span>
                Yield farming APR must exceed {Math.abs(parseFloat(ilValue))}% to be net-profitable in this scenario.
            </div>
        </div>
    );
};
