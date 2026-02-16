'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';

interface Transaction {
    date: string;
    time: string;
    type: 'Deposit' | 'Withdraw' | 'Transfer';
    asset: string;
    amount: string;
    status: 'Done' | 'Pending' | 'Failed';
    id: string;
}

const TX_DATA: Transaction[] = [
    { date: '2026-02-16', time: '10:42', type: 'Deposit', asset: 'BTC', amount: '0.012300', status: 'Done', id: '#TXN10293' },
    { date: '2026-02-15', time: '19:10', type: 'Deposit', asset: 'USDT', amount: '250.00', status: 'Done', id: '#TXN10211' },
    { date: '2026-02-15', time: '09:05', type: 'Deposit', asset: 'ETH', amount: '0.450000', status: 'Pending', id: '#TXN10177' },
    { date: '2026-02-14', time: '21:36', type: 'Deposit', asset: 'INR', amount: '10,000.00', status: 'Failed', id: '#TXN10102' },
];

export const TransactionHistory: React.FC = () => {
    const { playSynthesizedSound } = useSound();
    const [activeTab, setActiveTab] = useState('Deposit');
    const tabs = ['Withdraw', 'Deposit', 'Transfer'];

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        playSynthesizedSound('tick');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.02] border border-white/10 p-6 rounded-none"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Transaction History</h3>

                {/* Switcher */}
                <div className="inline-flex bg-white/5 border border-white/5 p-1 h-9">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={cn(
                                "px-4 py-1 font-mono text-[10px] uppercase tracking-tighter transition-all",
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

            <div className="w-full overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                            <th className="text-left py-4 w-[200px]">Date / Time</th>
                            <th className="text-left py-4 w-[120px]">Type</th>
                            <th className="text-left py-4 w-[100px]">Asset</th>
                            <th className="text-right py-4 w-[160px]">Amount</th>
                            <th className="text-center py-4 w-[110px]">Status</th>
                            <th className="text-right py-4">Ref ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {TX_DATA.map((tx) => (
                            <tr key={tx.id} className="group hover:bg-white/[0.02] transition-colors border-b border-white/[0.01]">
                                <td className="py-4 text-left">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-mono text-white">{tx.date}</span>
                                        <span className="text-[10px] font-mono text-white/20">{tx.time}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-left">
                                    <span className="text-xs font-mono text-white/60">{tx.type}</span>
                                </td>
                                <td className="py-4 text-left">
                                    <span className="text-xs font-bold font-mono text-white">{tx.asset}</span>
                                </td>
                                <td className="py-4 text-right font-mono text-sm text-white/60">{tx.amount}</td>
                                <td className="py-4 text-center">
                                    <span className={cn(
                                        "inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border",
                                        tx.status === 'Done' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                            tx.status === 'Pending' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                                "bg-red-500/10 text-red-500 border-red-500/20"
                                    )}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="py-4 text-right font-mono text-xs text-white/20 italic group-hover:text-white/40 transition-colors">
                                    {tx.id}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-between items-center text-[10px] font-mono text-white/10 uppercase tracking-widest">
                <span>Showing 1–4 of 42 transactions</span>
                <div className="flex gap-4">
                    <button className="hover:text-white transition-colors">Prev</button>
                    <span className="text-white/40">Page 1 of 11</span>
                    <button className="hover:text-white transition-colors">Next</button>
                </div>
            </div>
        </motion.div>
    );
};
