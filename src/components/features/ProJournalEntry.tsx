
import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Clock, Info } from 'lucide-react';

interface ProJournalEntryProps {
    date: string;
    sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
    bias: string;
    content: string;
    metrics: { pnl: number; trades: number };
}

/**
 * ProJournalEntry Component
 * 
 * PURPOSE:
 * A rich display for a single trading session reflection.
 * Includes emotional tagging and automatic bias identification.
 */
export const ProJournalEntry: React.FC<ProJournalEntryProps> = ({ date, sentiment, bias, content, metrics }) => {
    const sentimentColor = sentiment === 'POSITIVE' ? 'text-green-400' : sentiment === 'NEGATIVE' ? 'text-red-400' : 'text-blue-400';
    const SentimentIcon = sentiment === 'POSITIVE' ? ThumbsUp : sentiment === 'NEGATIVE' ? ThumbsDown : Info;

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-none group hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Metadata */}
                <div className="w-full md:w-48 shrink-0">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-2 bg-white/5 border border-white/10 ${sentimentColor}`}>
                            <SentimentIcon size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{date}</span>
                            <span className={`text-[10px] font-bold font-mono tracking-widest uppercase ${sentimentColor}`}>{sentiment}</span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5 text-[9px] font-mono uppercase tracking-widest">
                        <div className="flex justify-between">
                            <span className="text-white/20">Session PnL</span>
                            <span className={metrics.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>${metrics.pnl.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/20">Volume</span>
                            <span className="text-white/60">{metrics.trades} Trades</span>
                        </div>
                        <div className="flex justify-between items-center text-red-500/50">
                            <span className="text-[8px] font-bold underline">TAGGED BIAS:</span>
                            <span className="text-[9px] uppercase">{bias}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 text-white/30">
                        <MessageSquare size={14} />
                        <span className="text-[10px] font-mono uppercase tracking-tighter">Session Reflection Log // RAW_TEXT</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-none relative">
                        <p className="text-sm font-light text-white/70 leading-relaxed italic">
                            "{content}"
                        </p>
                        <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-20 transition-opacity">
                            <Clock size={48} />
                        </div>
                    </div>

                    <div className="mt-4 flex gap-4">
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[8px] font-mono text-white/40 uppercase cursor-pointer hover:bg-white/10 transition-colors">Edit Log</span>
                        <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[8px] font-mono text-blue-400 uppercase cursor-pointer hover:bg-blue-500/20 transition-colors">Connect Snapshot</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
