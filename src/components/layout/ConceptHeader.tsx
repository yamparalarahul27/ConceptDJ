'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const CORE_CONCEPTS = [
    { name: 'Concept Overview', path: '/playground' },
    { name: 'Pro PnL Tracker', path: '/playground/pnl-tracker' },
    { name: 'Deep Performance', path: '/playground/performance' },
    { name: 'Trading Journal', path: '/playground/journal' },
    { name: 'Liquidity Analyser', path: '/playground/liquidity' },
    { name: 'Advanced Charts', path: '/playground/tradingview-integration' },
    { name: 'Cards & Widgets', path: '/playground/widgets' },
];

const EXPERIMENTS = [
    { name: 'UI Skills Research', path: '/experiments/ui-skills' },
    { name: 'Sound Lab (Web Audio)', path: '/experiments/sound-lab' },
];

export default function ConceptHeader() {
    const router = useRouter();
    const pathname = usePathname();

    const allLinks = [...CORE_CONCEPTS, ...EXPERIMENTS];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2 sm:py-3">
            <div className="bg-black/80 max-w-7xl mx-auto backdrop-blur-xl border border-white/10 rounded-none px-6 py-4 flex items-center justify-between gap-8 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-6">
                    <Link
                        href="https://deriverse.vercel.app"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        <span className="text-sm font-medium whitespace-nowrap">Visit Deriverse Journal [Alpha]</span>
                    </Link>

                </div>

                <div className="relative flex-1 max-w-xs">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between px-4 py-6 font-normal rounded-none border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all group"
                            >
                                <span className="truncate">
                                    {allLinks.find(c => c.path === pathname)?.name || 'Select a Concept...'}
                                </span>
                                <ChevronDown className="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-0 bg-black/90 backdrop-blur-2xl border-white/10 rounded-none shadow-2xl overflow-hidden" align="end">
                            <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                                {/* Core Concepts */}
                                <div className="p-2">
                                    <div className="px-3 py-1.5 mb-1 text-[9px] font-mono text-white/20 uppercase tracking-widest">Core Interface</div>
                                    {CORE_CONCEPTS.map(c => (
                                        <button
                                            key={c.path}
                                            onClick={() => router.push(c.path)}
                                            className={cn(
                                                "w-full text-left px-3 py-2 text-sm font-mono transition-colors rounded-none",
                                                pathname === c.path
                                                    ? "bg-purple-500/20 text-purple-400 border-l-2 border-purple-500 pl-2.5"
                                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Experiments */}
                                <div className="p-2 border-t border-white/5 bg-white/[0.02]">
                                    <div className="px-3 py-1.5 mb-1 text-[9px] font-mono text-purple-500/40 uppercase tracking-widest">Experiments & R&D</div>
                                    {EXPERIMENTS.map(c => (
                                        <button
                                            key={c.path}
                                            onClick={() => router.push(c.path)}
                                            className={cn(
                                                "w-full text-left px-3 py-2 text-sm font-mono transition-colors rounded-none",
                                                pathname === c.path
                                                    ? "bg-purple-500/20 text-purple-400 border-l-2 border-purple-500 pl-2.5"
                                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-2 border-t border-white/5">
                                    <button
                                        onClick={() => router.push('/playground/settings')}
                                        className={cn(
                                            "w-full text-left px-3 py-2 text-xs font-mono transition-colors rounded-none opacity-50 hover:opacity-100",
                                            pathname === '/playground/settings' ? "text-purple-400" : "text-white/60"
                                        )}
                                    >
                                        Collective Settings
                                    </button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </header>
    );
}
