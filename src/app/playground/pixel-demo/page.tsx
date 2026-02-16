'use client';

import React from 'react';
import { PixelHeadingCharacterDemo } from '@/components/ui/PixelHeadingCharacterDemo';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PixelDemoPage() {
    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            <div className="mb-12">
                <Link
                    href="/playground"
                    className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Playground
                </Link>

                <h1 className="text-4xl font-bold text-white mb-4 uppercase tracking-tighter">
                    Pixel Typography <br />
                    <span className="text-white/20">Interactive Lab</span>
                </h1>
                <p className="text-white/40 text-sm max-w-2xl font-mono leading-relaxed">
                    A per-character pixel-font heading with multiple animation modes.
                    Fine-tune the Geist Pixel system parameters to create unique glitch and wave effects.
                </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-8 shadow-2xl">
                <PixelHeadingCharacterDemo />
            </div>
        </div>
    );
}
