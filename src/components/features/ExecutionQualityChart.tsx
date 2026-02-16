
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
                <p className="text-white/40 text-[12px] font-mono mb-2 uppercase tracking-wider font-bold">{item.pair}</p>
                <div className="space-y-1">
                    <p className="flex justify-between gap-4">
                        <span className="text-white/60 text-[12px] font-bold">MAE (Scary Red):</span>
                        <span className="text-red-400 font-pixel text-[12px] font-bold">-${item.mae.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                        <span className="text-white/60 text-[12px] font-bold">MFE (Potential Peak):</span>
                        <span className="text-green-400 font-pixel text-[12px] font-bold">+${item.mfe.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between gap-4 pt-1 border-t border-white/5">
                        <span className="text-white/60 text-[12px] font-bold">Realised PnL:</span>
                        <span className={`font-pixel text-[12px] font-bold ${item.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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
                    <h3 className="text-[12px] font-mono font-bold text-white uppercase tracking-wider">Execution Quality (MAE/MFE)</h3>
                    <p className="text-[12px] text-white/40 font-mono font-bold">Analysis of paper losses vs potential peaks</p>
                </div>
                <div className="group relative border border-white/10 p-1 hover:bg-white/5 transition-colors cursor-help">
                    <Info size={14} className="text-white/40 group-hover:text-purple-400 transition-colors" />

                    <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-black/95 border border-white/10 rounded-none shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        <p className="text-[12px] text-white/60 font-mono leading-relaxed font-bold">
                            <span className="text-white font-bold block mb-1 uppercase tracking-tight text-[12px]">Knowledge Base:</span>
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
                            label={{ value: 'MAE (Drawdown)', position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'monospace', fontWeight: 'bold' }}
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: 'monospace', fontWeight: 'bold' }}
                        />
                        <YAxis
                            type="number"
                            dataKey="mfe"
                            name="MFE"
                            unit="$"
                            label={{ value: 'MFE (Max Potential)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'monospace', fontWeight: 'bold' }}
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: 'monospace', fontWeight: 'bold' }}
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

                {/* Mobile Fallback */}
                <div className="sm:hidden flex flex-col justify-center items-center h-full text-center p-4">
                    <div className="text-[12px] font-mono text-white/40 uppercase mb-4 font-bold">View restricted on mobile</div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="p-3 bg-white/5 border border-white/10">
                            <span className="text-[12px] text-white/20 uppercase block font-bold">Avg MAE</span>
                            <span className="text-sm font-bold text-red-400 font-pixel">-$120</span>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10">
                            <span className="text-[12px] text-white/20 uppercase block font-bold">Avg MFE</span>
                            <span className="text-sm font-bold text-green-400 font-pixel">+$450</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-purple-500/50"></span>
                    <span className="text-[12px] font-mono text-white/40 uppercase font-bold">Trader Insight: Enter well but exit early</span>
                </div>
            </div>
        </div>
    );
};
