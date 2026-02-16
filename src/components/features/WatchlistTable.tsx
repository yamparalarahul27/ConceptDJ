'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';

const WATCHLIST_DATA = [
    { symbol: 'BTC/USDT', price: '64,203.12', change: '+2.4%', type: 'pos' },
    { symbol: 'ETH/USDT', price: '3,412.55', change: '+1.8%', type: 'pos' },
    { symbol: 'SOL/USDT', price: '145.22', change: '-4.2%', type: 'neg' },
    { symbol: 'AVAX/USDT', price: '38.12', change: '+0.5%', type: 'pos' },
    { symbol: 'LINK/USDT', price: '18.44', change: '-1.2%', type: 'neg' },
    { symbol: 'DOT/USDT', price: '7.82', change: '+3.1%', type: 'pos' },
];

export const WatchlistTable: React.FC = () => {
    const { playSynthesizedSound } = useSound();
    const [activeTab, setActiveTab] = useState('Watchlist');
    const tabs = ['Watchlist', 'Popular', 'Top Gainers', 'Top Losers'];

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        playSynthesizedSound('tick');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/10 p-6 rounded-none h-full"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Market Watch</h3>

                {/* Tabs */}
                <div className="inline-flex bg-white/5 border border-white/5 p-1 h-9">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={cn(
                                "px-3 py-1 font-mono text-[9px] uppercase tracking-tighter transition-all",
                                activeTab === tab
                                    ? "bg-white text-black font-bold"
                                    : "text-white/30 hover:text-white"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/30">
                            <th className="text-left py-3">Symbol</th>
                            <th className="text-right py-3">Price</th>
                            <th className="text-right py-3">24h Change</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {WATCHLIST_DATA.map((item) => (
                            <tr key={item.symbol} className="group hover:bg-white/[0.02] transition-colors border-b border-white/[0.01]">
                                <td className="py-4 text-left">
                                    <span className="text-sm font-bold font-mono text-white group-hover:text-purple-400 transition-colors">{item.symbol}</span>
                                </td>
                                <td className="py-4 text-right font-mono text-sm text-white/60">${item.price}</td>
                                <td className={cn(
                                    "py-4 text-right font-mono text-xs",
                                    item.type === 'pos' ? "text-green-400" : "text-red-400"
                                )}>
                                    {item.change}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="w-full mt-6 py-3 border border-dashed border-white/10 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] hover:border-white/20 hover:text-white/40 transition-all">
                + Add Symbol to Watchlist
            </button>
        </motion.div>
    );
};
