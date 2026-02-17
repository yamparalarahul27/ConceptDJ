'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ConceptMetaBarProps {
    className?: string;
}

/**
 * Shared badge row for concept playground pages.
 */
export const ConceptMetaBar: React.FC<ConceptMetaBarProps> = ({ className }) => {
    return (
        <div className={cn("flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 bg-white/[0.03] border border-white/10 px-4 py-2", className)}>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 font-bold">
                Live Concept Preview
            </span>
            <span className="text-white/30">•</span>
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/60">
                Data: HARDCODED_ENGINE_V2
            </span>
        </div>
    );
};
