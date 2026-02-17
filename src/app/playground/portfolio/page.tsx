'use client';

import React from 'react';
import { PortfolioValueBox } from '@/components/features/PortfolioValueBox';
import { AssetAllocation } from '@/components/features/AssetAllocation';
import { WatchlistTable } from '@/components/features/WatchlistTable';
import { TransactionHistory } from '@/components/features/TransactionHistory';
import { ConceptMetaBar } from '@/components/features/ConceptMetaBar';

export default function PortfolioPage() {
    return (
        <div className="px-3 sm:px-6">
            <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 min-h-screen">
                <ConceptMetaBar />
                {/* Div 1: Portfolio Value Box */}
                <PortfolioValueBox />

                {/* Div 2: Allocation & Watchlist Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <AssetAllocation />
                    <WatchlistTable />
                </div>

                {/* Div 3: Transaction History */}
                <TransactionHistory />

                {/* Bottom Padding for Footer spacing */}
                <div className="h-16" />
            </div>
        </div>
    );
}
