'use client';

import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
    symbol: string;
    price: string;
    change: number;
}

const MOCK_TICKER: TickerItem[] = [
    { symbol: 'SOL/USDC', price: '108.42', change: 2.45 },
    { symbol: 'BTC/USDC', price: '52,142.10', change: 1.12 },
    { symbol: 'ETH/USDC', price: '2,942.50', change: -0.85 },
    { symbol: 'JUP/USDC', price: '0.4852', change: 5.12 },
    { symbol: 'PYTH/USDC', price: '0.5420', change: -1.24 },
    { symbol: 'BONK/USDC', price: '0.0000124', change: 12.42 },
];

export const MarketTicker: React.FC = () => {
    // Duplicate items for seamless loop
    const items = useMemo(() => [...MOCK_TICKER, ...MOCK_TICKER, ...MOCK_TICKER], []);

    return (
        <div className="w-full bg-black border-b border-white/10 overflow-hidden h-10 flex items-center fixed top-0 left-0 right-0 z-[60]">
            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10"></div>

            <div className="flex animate-marquee whitespace-nowrap">
                {items.map((item, i) => (
                    <div
                        key={`${item.symbol}-${i}`}
                        className="flex items-center gap-6 px-12 border-r border-white/5 last:border-none"
                    >
                        <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">
                            {item.symbol}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-pixel text-white tracking-widest">
                                ${item.price}
                            </span>
                            <div className={`flex items-center gap-1 text-[9px] font-mono font-bold ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {Math.abs(item.change)}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </div>
    );
};
