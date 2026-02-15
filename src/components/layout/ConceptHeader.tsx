'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const CONCEPTS = [
    { name: 'Pro PnL Tracker', path: '/pro-pnl-tracker' },
];

export default function ConceptHeader() {
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const path = e.target.value;
        if (path) router.push(path);
    };

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

                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/assets/deriverse_desktop_icon.png"
                            alt="CDJ"
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-none"
                        />
                        <span className="font-bold text-lg tracking-tight">Concepts</span>
                    </Link>
                </div>

                <div className="relative flex-1 max-w-xs">
                    <select
                        value={pathname}
                        onChange={handleChange}
                        className="appearance-none bg-white/5 border border-white/10 rounded-none pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 hover:bg-white/10 transition-colors cursor-pointer w-full"
                    >
                        <option value="/">Select a Concept...</option>
                        {CONCEPTS.map(c => (
                            <option key={c.path} value={c.path}>{c.name}</option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                </div>
            </div>
        </header>
    );
}
