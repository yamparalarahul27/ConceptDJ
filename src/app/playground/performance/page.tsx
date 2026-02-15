'use client';

import React from 'react';

/**
 * Performance Analytics Placeholder
 */
export default function PerformancePage() {
    return (
        <div className="flex-1 flex items-center justify-center p-8 bg-[#0D0D21]">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">📊</span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Performance Analytics</h1>
                <p className="text-white/40 text-sm font-mono">
                    Deep dive into Spot vs. Futures execution efficiency.
                    <br />
                    <span className="text-purple-400 mt-2 block">[ Milestone: Phase 3 ]</span>
                </p>
            </div>
        </div>
    );
}
