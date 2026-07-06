import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared container for recharts custom tooltips so every chart renders the
 * same glassmorphism shell. Charts keep their own tooltip content and pass
 * it as children; per-chart deltas go through className.
 */
export default function ChartTooltipShell({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn('bg-black/90 border border-white/10 p-3 rounded-none shadow-xl backdrop-blur-md', className)}>
            {children}
        </div>
    );
}
