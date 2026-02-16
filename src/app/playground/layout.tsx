'use client';

import React from 'react';
import ConceptHeader from '@/components/layout/ConceptHeader';
import SystemStatusStrip from '@/components/layout/SystemStatusStrip';
import { SettingsProvider } from '@/components/features/SettingsProvider';
import { ProTour } from '@/components/features/ProTour';
import { MarketTicker } from '@/components/features/MarketTicker';

/**
 * PlaygroundLayout
 * 
 * The shared layout for the authenticated "Playground" area.
 * Includes the status strip at the bottom and shared header elements.
 */
export default function PlaygroundLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SettingsProvider>
            <ProTour />
            <div className="flex flex-col min-h-screen">
                <ConceptHeader />
                <MarketTicker />
                <main className="flex-1 flex flex-col pt-[104px] sm:pt-[20px] relative">
                    {children}
                </main>

                {/* Persistent Status Bar at footer */}
                <footer className="fixed bottom-0 left-0 right-0 z-50">
                    <SystemStatusStrip />
                </footer>
            </div>
        </SettingsProvider>
    );
}
