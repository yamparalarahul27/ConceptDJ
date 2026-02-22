'use client'

import { useState } from 'react'
import { TradeDetailAsSidebar } from '@/components/experiments/TradeDetailAsSidebar'
import { TradeEvent } from '@/lib/api'

export default function TradeDetailExperimentPage() {
    const [isOpen, setIsOpen] = useState(false)

    // Mock trade data to display in the sidebar
    const mockTrade: TradeEvent = {
        id: 'trd_1234567890abcdef',
        signature: '5xV8...mock...hash',
        timestamp: 1716300000000, // Static timestamp to prevent hydration error
        orderType: 'market',
        tradeType: 'PERP',
        price: 64230.50,
        size: 0.5,
        fee: 12.50,
        isEntry: true,
        positionId: 'pos_btc_long_1',
        position: {
            market: 'BTC-PERP',
            side: 'LONG',
            status: 'OPEN',
            avgEntryPrice: 64230.50,
            totalSize: 0.5,
            totalFees: 12.50,
            realizedPnl: 150.25,
            notes: '',
            rating: 0,
            aiScore: 8,
            aiReview: "Solid entry pattern respecting the 1H support level. The size is appropriate for your portfolio risk constraints.",
            aiBias: "Optimal",
            aiNextAction: "Consider moving stop loss to breakeven if price reaches $65,000",
            marketSentiment: "Bullish",
            traderProfile: "Momentum",
            macroContext: "Bitcoin ETF inflows remain strong this week.",
            lastNudge: "You often exit profitable trades too early."
        },
        rawData: { source: 'binance', latency: '45ms' },
        metadata: { route: 'smart-router-v2', slip: '0.01%' }
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[60vh] dark">
            <div className="max-w-xl text-center space-y-6 bg-card border border-border rounded-xl p-8 shadow-sm">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Trade Detail Sidebar</h1>
                <p className="text-muted-foreground text-sm">
                    Click the button below to toggle the TradeDetailAsSidebar component. This page tests the slide-out sidebar, its journaling form, and the mock AI analysis feature.
                </p>

                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-pnl-gain text-white font-bold uppercase rounded-sm shadow-sm hover:opacity-90 transition-all active:scale-95 text-xs inline-block"
                >
                    Open Trade Details Sidebar
                </button>
            </div>

            <TradeDetailAsSidebar
                trade={mockTrade}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onUpdated={(res) => console.log('Journal updated:', res)}
            />
        </div>
    )
}
