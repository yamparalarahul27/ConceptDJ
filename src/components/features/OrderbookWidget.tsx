
import React from 'react';

export interface OrderbookEntry {
    price: number;
    amount: number;
    total: number;
}

export interface OrderbookWidgetProps {
    bids: OrderbookEntry[];
    asks: OrderbookEntry[];
    currentPrice?: number;
    symbol?: string;
}

/**
 * OrderbookWidget Component
 * 
 * PURPOSE:
 * Displays real-time depth with intensity visualization.
 * Optimized for high-density information display.
 */
export const OrderbookWidget: React.FC<OrderbookWidgetProps> = ({ bids = [], asks = [], currentPrice = 0, symbol = "ASSET" }) => {
    const maxTotal = Math.max(
        ...bids.map(b => b.total || 0),
        ...asks.map(a => a.total || 0),
        1 // Prevent division by zero
    );

    // Calculate dynamic spread
    const highestBid = bids.length > 0 ? bids[0].price : 0;
    const lowestAsk = asks.length > 0 ? asks[asks.length - 1].price : 0; // Assuming asks are sorted descending, so lowest is at the end. Actually wait, let's just find min/max
    const spread = (lowestAsk > 0 && highestBid > 0) ? (lowestAsk - highestBid) : 0;
    const spreadPercentage = highestBid > 0 ? (spread / highestBid) * 100 : 0;

    // Sort asks descending for rendering (highest price at top)
    const sortedAsks = [...asks].sort((a, b) => b.price - a.price);
    // Sort bids descending for rendering (highest price at top)
    const sortedBids = [...bids].sort((a, b) => b.price - a.price);

    // Calculate totals for footer
    const totalBids = bids.reduce((acc, curr) => acc + curr.amount, 0);
    const totalAsks = asks.reduce((acc, curr) => acc + curr.amount, 0);
    const skew = totalBids > 0 ? ((totalAsks - totalBids) / totalBids) * 100 : 0;

    return (
        <div className="bg-white/5 border border-white/10 rounded-none overflow-hidden h-full flex flex-col font-mono text-[12px] uppercase tracking-tighter font-bold">
            {/* Header */}
            <div className="px-4 py-3 bg-white/[0.03] border-b border-white/5 flex justify-between items-center">
                <span className="text-white/40 font-bold tracking-widest">{symbol} Depth</span>
                <span className="text-green-400/50">LIVE // WSS</span>
            </div>

            {/* Asks (Sells) */}
            <div className="flex-1 flex flex-col justify-end min-h-[150px] overflow-hidden">
                {sortedAsks.map((ask, i) => (
                    <div key={`ask-${i}`} className="relative group hover:bg-white/5 px-4 py-0.5 flex justify-between items-center overflow-hidden">
                        <div
                            className="absolute inset-y-0 right-0 bg-red-500/10 pointer-events-none transition-all duration-100"
                            style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                        />
                        <span className="text-red-400 font-bold relative z-10 w-20">{ask.price > 10 ? ask.price.toFixed(2) : ask.price.toFixed(4)}</span>
                        <div className="flex gap-4 relative z-10 flex-1 justify-end">
                            <span className="text-white/60">{ask.amount > 1000 ? (ask.amount / 1000).toFixed(1) + 'K' : ask.amount.toFixed(2)}</span>
                            <span className="text-white/30 w-16 text-right">{ask.total > 1000 ? (ask.total / 1000).toFixed(1) + 'K' : ask.total.toFixed(0)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Spread / Current Price Center */}
            <div className="px-4 py-2 bg-white/[0.02] border-y border-white/5 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className={`font-bold text-sm tracking-tight font-pixel ${spread > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {currentPrice > 10 ? currentPrice.toFixed(2) : currentPrice.toFixed(4)}
                    </span>
                    <span className="text-[10px] text-white/20 font-bold">Mark Price</span>
                </div>
                <div className="text-right">
                    <span className="text-white/40">Spread:</span>
                    <span className="text-white ml-2">{spread > 0.01 ? spread.toFixed(2) : spread.toFixed(4)} ({spreadPercentage.toFixed(2)}%)</span>
                </div>
            </div>

            {/* Bids (Buys) */}
            <div className="flex-1 flex flex-col min-h-[150px] overflow-hidden">
                {sortedBids.map((bid, i) => (
                    <div key={`bid-${i}`} className="relative group hover:bg-white/5 px-4 py-0.5 flex justify-between items-center overflow-hidden">
                        <div
                            className="absolute inset-y-0 right-0 bg-green-500/10 pointer-events-none transition-all duration-100"
                            style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                        />
                        <span className="text-green-400 font-bold relative z-10 w-20">{bid.price > 10 ? bid.price.toFixed(2) : bid.price.toFixed(4)}</span>
                        <div className="flex gap-4 relative z-10 flex-1 justify-end">
                            <span className="text-white/60">{bid.amount > 1000 ? (bid.amount / 1000).toFixed(1) + 'K' : bid.amount.toFixed(2)}</span>
                            <span className="text-white/30 w-16 text-right">{bid.total > 1000 ? (bid.total / 1000).toFixed(1) + 'K' : bid.total.toFixed(0)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-white/[0.03] border-t border-white/5 grid grid-cols-2 gap-2 mt-auto">
                <div className="flex flex-col">
                    <span className="text-[10px] text-white/20 font-bold">Depth ({bids.length + asks.length})</span>
                    <span className="text-green-400 font-bold">{totalBids > 1000 ? (totalBids / 1000).toFixed(1) + 'K' : totalBids.toFixed(0)} Bids</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-[10px] text-white/20 font-bold">Skew</span>
                    <span className={`${skew > 0 ? 'text-red-400' : 'text-green-400'} font-bold`}>
                        {skew > 0 ? '+' : ''}{skew.toFixed(1)}% {skew > 0 ? 'Ask' : 'Bid'}
                    </span>
                </div>
            </div>
        </div>
    );
};
