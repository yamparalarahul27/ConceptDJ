'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { TabType } from '../layout/TabNavigation';
import { supabase } from '@/lib/supabaseClient';

const DEFAULT_TAB: TabType = 'dashboard';

export default function ProfileSettings() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);

        try {
            if (supabase) {
                await supabase.auth.signOut();
            }
        } catch (error) {
            console.error('Supabase sign-out failed:', error);
        }

        setTimeout(() => {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem('deriverse.activeTab');
                window.dispatchEvent(
                    new CustomEvent<TabType>('deriverse:set-active-tab', {
                        detail: DEFAULT_TAB,
                    })
                );
                window.dispatchEvent(new Event('deriverse:show-welcome'));
            }

            setIsLoggingOut(false);
        }, 800);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
            <div>
                <h1 className="text-4xl font-bold text-white mb-4">Profile &amp; Settings</h1>
                <p className="text-white/60">Configure your profile details and preferences here.</p>
            </div>

            <Link
                href="/concepts"
                className="px-8 py-3 w-64 border-2 border-purple-500/30 bg-purple-500/10 text-purple-200 font-semibold text-base hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-white transition-all duration-300 mb-2 flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" /><path d="M10 12V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6" /></svg>
                Concept Feature UIs
            </Link>

            <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`px-8 py-3 border-2 rounded-none font-semibold text-base transition-all duration-300 ${isLoggingOut
                    ? 'bg-white/10 border-white/20 text-white/40 cursor-not-allowed'
                    : 'bg-red-900/40 border-red-500/10 text-white hover:bg-red-900/60 hover:border-red-500/10'
                    }`}
            >
                {isLoggingOut ? 'Logging out...' : 'Log out'}
            </button>
        </div>
    );
}
