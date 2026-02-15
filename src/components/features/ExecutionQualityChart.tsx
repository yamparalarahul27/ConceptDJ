
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { Info } from 'lucide-react';

interface ExecutionQualityChartProps {
    data: any[];
    height?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        return (
            <div className="bg-black/90 border border-white/10 p-3 rounded-none shadow-xl backdrop-blur-md">
                <p className="text-white/40 text-[10px] font-mono mb-2 uppercase tracking-wider">{item.pair}</p>
                <div className="space-y-1">
                    <p className="flex justify-between gap-4">
                        <span className="text-white/60 text-xs">MAE (Scary Red):</span>
                        <span className="text-red-400 font-pixel text-xs">-${item.mae.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                        <span className="text-white/60 text-xs">MFE (Potential Peak):</span>
                        <span className="text-green-400 font-pixel text-xs">+${item.mfe.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between gap-4 pt-1 border-t border-white/5">
                        <span className="text-white/60 text-xs font-bold">Realised PnL:</span>
                        <span className={`font-pixel text-xs ${item.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {item.pnl >= 0 ? '+' : ''}${item.pnl.toFixed(2)}
                        </span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

/**
 * ExecutionQualityChart Component (MAE/MFE)
 * 
 * PURPOSE:
 * Shows execution efficiency. MAE (Maximum Adverse Excursion) is the largest paper loss
 * during the trade's life. MFE (Maximum Favorable Excursion) is the largest paper profit.
 */
export const ExecutionQualityChart: React.FC<ExecutionQualityChartProps> = ({ data, height = 300 }) => {
    return (
        <div className="flex flex-col h-full bg-white/5 border border-white/10 p-6 rounded-none relative">
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Execution Quality (MAE/MFE)</h3>
                    <p className="text-[10px] text-white/40 font-mono italic">Analysis of paper losses vs potential peaks</p>
                </div>
                <div className="group relative border border-white/10 p-1 hover:bg-white/5 transition-colors cursor-help">
                    <Info size={14} className="text-white/40 group-hover:text-purple-400 transition-colors" />

                    <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-black/95 border border-white/10 rounded-none shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        <p className="text-[10px] text-white/60 font-mono leading-relaxed">
                            <span className="text-white font-bold block mb-1 uppercase tracking-tight text-[11px]">Knowledge Base:</span>
                            MAE is the deepest "dip" below your start point—it shows how much "scary" red you saw.
                            <br /><br />
                            MFE is the highest "peak"—it shows the most money you could have made if you sold at the very top.
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', height: height - 80 }}>
                <ResponsiveContainer>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            type="number"
                            dataKey="mae"
                            name="MAE"
                            unit="$"
                            label={{ value: 'MAE (Drawdown)', position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <YAxis
                            type="number"
                            dataKey="mfe"
                            name="MFE"
                            unit="$"
                            label={{ value: 'MFE (Max Potential)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <ZAxis type="number" dataKey="pnl" range={[50, 400]} />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.2)' }} />
                        <Scatter
                            name="Trades"
                            data={data}
                            fill="#8b5cf6"
                            stroke="#8c83e9"
                            strokeWidth={1}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-purple-500/50"></span>
                    <span className="text-[10px] font-mono text-white/40 uppercase">Trader Insight: Enter well but exit early</span>
                </div>
            </div>
        </div>
    );
};
