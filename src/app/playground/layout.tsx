'use client';

import React from 'react';
import TabNavigation from '@/components/layout/TabNavigation';
import SystemStatusStrip from '@/components/layout/SystemStatusStrip';

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
    // Note: TabNavigation currently has its own header (GlassmorphismNavbar)
    // In a future phase, we might separate the navigation from the screens.
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col">
                {children}
            </main>

            {/* Persistent Status Bar at footer */}
            <footer className="fixed bottom-0 left-0 right-0 z-50">
                <SystemStatusStrip />
            </footer>
        </div>
    );
}
