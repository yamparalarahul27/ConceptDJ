'use client';

import React from 'react';

/**
 * Settings Placeholder
 */
export default function SettingsPage() {
    return (
        <div className="flex-1 flex items-center justify-center p-8 bg-[#0D0D21]">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">⚙️</span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Collective Settings</h1>
                <p className="text-white/40 text-sm font-mono">
                    Manage multi-wallet connections and persistent layout preferences.
                    <br />
                    <span className="text-purple-400 mt-2 block">[ Milestone: Phase 6 ]</span>
                </p>
            </div>
        </div>
    );
}
