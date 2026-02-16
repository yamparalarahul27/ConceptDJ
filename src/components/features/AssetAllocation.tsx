'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AssetRow {
    asset: string;
    holdings: string;
    allocation: number;
    pnl: string;
    pnlType: 'pos' | 'neg';
    color: string;
}

const ASSET_DATA: AssetRow[] = [
    { asset: 'BTC', holdings: '1.5582', allocation: 42, pnl: '+$11,402.10', pnlType: 'pos', color: 'bg-yellow-500' },
    { asset: 'ETH', holdings: '9.2074', allocation: 28, pnl: '+$7,201.45', pnlType: 'pos', color: 'bg-blue-500' },
    { asset: 'SOL', holdings: '142.54', allocation: 14, pnl: '-$1,740.20', pnlType: 'neg', color: 'bg-purple-500' },
    { asset: 'ADA', holdings: '886.32', allocation: 8, pnl: '+$1,120.30', pnlType: 'pos', color: 'bg-green-500' },
    { asset: 'BNB', holdings: '21.87', allocation: 8, pnl: '+$3,050.12', pnlType: 'pos', color: 'bg-orange-500' },
];

export const AssetAllocation: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/10 p-6 rounded-none h-full"
        >
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Asset Allocation</h3>

            {/* Stacked Bar */}
            <div className="w-full h-3 flex mb-8 overflow-hidden bg-white/5 border border-white/5">
                {ASSET_DATA.map((asset) => (
                    <div
                        key={asset.asset}
                        className={cn("h-full", asset.color)}
                        style={{ width: `${asset.allocation}%` }}
                    />
                ))}
            </div>

            {/* Allocation Table */}
            <div className="w-full overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="text-left py-3 text-[10px] font-mono uppercase tracking-widest text-white/30">Asset</th>
                            <th className="text-right py-3 text-[10px] font-mono uppercase tracking-widest text-white/30">Holdings</th>
                            <th className="text-right py-3 text-[10px] font-mono uppercase tracking-widest text-white/30">Alloc %</th>
                            <th className="text-right py-3 text-[10px] font-mono uppercase tracking-widest text-white/30">P&L</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {ASSET_DATA.map((asset) => (
                            <tr key={asset.asset} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-4 text-left">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-1.5 h-4", asset.color)}></div>
                                        <span className="text-sm font-bold font-mono text-white">{asset.asset}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-right font-mono text-sm text-white/60">{asset.holdings}</td>
                                <td className="py-4 text-right font-mono text-sm text-white/60">{asset.allocation}%</td>
                                <td className={cn(
                                    "py-4 text-right font-mono text-sm",
                                    asset.pnlType === 'pos' ? "text-green-400" : "text-red-400"
                                )}>
                                    {asset.pnl}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};
