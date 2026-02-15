'use client';

import React from 'react';
import { Wallet, ChevronDown } from 'lucide-react';

/**
 * MultiWalletSelector Stub
 * 
 * A placeholder component for the future multi-wallet management experience.
 * Part of the Phase 1 Foundation.
 */
export default function MultiWalletSelector() {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group">
            <Wallet size={14} className="text-purple-400" />
            <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/40 leading-none">CONNECTED WALLETS</span>
                <span className="text-xs font-bold text-white leading-none"><span className="font-pixel">3</span> Accounts Linked</span>
            </div>
            <ChevronDown size={14} className="text-white/20 group-hover:text-white transition-colors ml-1" />
        </div>
    );
}
