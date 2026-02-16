
import React from 'react';

interface OrderbookEntry {
    price: number;
    amount: number;
    total: number;
}

interface OrderbookWidgetProps {
    bids: OrderbookEntry[];
    asks: OrderbookEntry[];
}

/**
 * OrderbookWidget Component
 * 
 * PURPOSE:
 * Displays real-time depth with intensity visualization.
 * Optimized for high-density information display.
 */
export const OrderbookWidget: React.FC<OrderbookWidgetProps> = ({ bids = [], asks = [] }) => {
    const maxTotal = Math.max(
        ...bids.map(b => b.total || 0),
        ...asks.map(a => a.total || 0),
        1 // Prevent division by zero
    );

    return (
        <div className="bg-white/5 border border-white/10 rounded-none overflow-hidden h-full flex flex-col font-mono text-[9px] uppercase tracking-tighter">
            {/* Header */}
            <div className="px-4 py-3 bg-white/[0.03] border-b border-white/5 flex justify-between items-center">
                <span className="text-white/40 font-bold tracking-widest">Orderbook Deep</span>
                <span className="text-green-400/50">LIVE // 1s</span>
            </div>

            {/* Asks (Sells) */}
            <div className="flex-1 flex flex-col justify-end min-h-[150px]">
                {asks.slice().reverse().map((ask, i) => (
                    <div key={`ask-${i}`} className="relative group hover:bg-white/5 px-4 py-0.5 flex justify-between items-center overflow-hidden">
                        <div
                            className="absolute inset-y-0 right-0 bg-red-500/10 pointer-events-none transition-all duration-300"
                            style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                        />
                        <span className="text-red-400 font-bold relative z-10">{ask.price.toFixed(2)}</span>
                        <div className="flex gap-4 relative z-10">
                            <span className="text-white/60">{ask.amount.toFixed(1)}</span>
                            <span className="text-white/30 italic w-16 text-right">{ask.total.toFixed(1)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Spread */}
            <div className="px-4 py-2 bg-white/[0.02] border-y border-white/5 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-white font-bold text-sm tracking-tight font-pixel">108.42</span>
                    <span className="text-[7px] text-white/20">Index: 108.41</span>
                </div>
                <div className="text-right">
                    <span className="text-white/40">Spread:</span>
                    <span className="text-white ml-2">0.02 (0.02%)</span>
                </div>
            </div>

            {/* Bids (Buys) */}
            <div className="flex-1 flex flex-col min-h-[150px]">
                {bids.map((bid, i) => (
                    <div key={`bid-${i}`} className="relative group hover:bg-white/5 px-4 py-0.5 flex justify-between items-center overflow-hidden">
                        <div
                            className="absolute inset-y-0 right-0 bg-green-500/10 pointer-events-none transition-all duration-300"
                            style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                        />
                        <span className="text-green-400 font-bold relative z-10">{bid.price.toFixed(2)}</span>
                        <div className="flex gap-4 relative z-10">
                            <span className="text-white/60">{bid.amount.toFixed(1)}</span>
                            <span className="text-white/30 italic w-16 text-right">{bid.total.toFixed(1)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-white/[0.03] border-t border-white/5 grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                    <span className="text-[7px] text-white/20">Depth (50)</span>
                    <span className="text-green-400 font-bold">1.2M Bids</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-[7px] text-white/20">Skew</span>
                    <span className="text-red-400 font-bold">+2.4% Ask</span>
                </div>
            </div>
        </div>
    );
};
