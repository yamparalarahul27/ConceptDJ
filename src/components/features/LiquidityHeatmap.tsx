
import React, { useMemo } from 'react';

interface LiquidityHeatmapProps {
    data?: any[]; // Mocked depth data
    height?: number;
}

/**
 * LiquidityHeatmap Component
 * 
 * PURPOSE:
 * Visualizes market liquidity clusters over time and price.
 * Uses a "Discrete Block" (Pixel) aesthetic to align with Geist Pixel system.
 */
export const LiquidityHeatmap: React.FC<LiquidityHeatmapProps> = ({ height = 500 }) => {
    // Generate dummy heatmap data (Price Levels x Time Levels)
    const heatmapData = useMemo(() => {
        const rows = 20; // Price levels
        const cols = 30; // Time steps
        const data = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                // Generate random intensity with clusters
                const base = Math.random();
                const cluster = Math.sin(i / 3) * Math.cos(j / 5);
                const intensity = Math.max(0, Math.min(1, (base + cluster + 1) / 3));
                row.push(intensity);
            }
            data.push(row);
        }
        return data;
    }, []);

    // Color mapper for intensity
    const getIntensityColor = (val: number) => {
        if (val < 0.2) return 'rgba(255, 255, 255, 0.02)';
        if (val < 0.4) return 'rgba(59, 130, 246, 0.2)'; // Blue tint
        if (val < 0.6) return 'rgba(168, 85, 247, 0.4)'; // Purple tint
        if (val < 0.8) return 'rgba(168, 85, 247, 0.7)'; // Brighter purple
        return 'rgba(236, 72, 153, 0.9)'; // Pink/Hot liquidity
    };

    return (
        <div className="bg-white/5 border border-white/10 p-4 rounded-none h-full flex flex-col overflow-hidden relative group">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Liquidity Density Heatmap</h3>
                    <p className="text-[9px] font-mono text-white/30 uppercase">Instrument: SOL-PERP // Aggregation: 10bps</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        <span className="w-1.5 h-1.5 rounded-none bg-blue-500"></span>
                        <span className="text-[8px] font-mono text-white/40 uppercase">Low</span>
                    </div>
                    <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        <span className="w-1.5 h-1.5 rounded-none bg-purple-500"></span>
                        <span className="text-[8px] font-mono text-white/40 uppercase">Med</span>
                    </div>
                    <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        <span className="w-1.5 h-1.5 rounded-none bg-pink-500"></span>
                        <span className="text-[8px] font-mono text-white/40 uppercase">Cluster</span>
                    </div>
                </div>
            </div>

            <div className="relative flex-1" style={{ minHeight: height - 100 }}>
                {/* DISCRETE BLOCK OPTION (Selected) */}
                <div className="grid grid-cols-30 gap-px h-full w-full" style={{ gridTemplateColumns: 'repeat(30, 1fr)' }}>
                    {heatmapData.map((row, rIdx) => (
                        row.map((val, cIdx) => (
                            <div
                                key={`cell-${rIdx}-${cIdx}`}
                                className="w-full h-full transition-colors duration-500"
                                style={{ backgroundColor: getIntensityColor(val) }}
                                title={`Intensity: ${(val * 100).toFixed(0)}%`}
                            />
                        ))
                    ))}
                </div>

                {/* 
                  * SMOOTH GRADIENT OPTION (Alternative)
                  * To enable, replace the grid above with a Canvas or a parent with a CSS Radial/Conic gradient
                  * mix-blend-mode: screen would be used to overlay the smooth circles.
                  */}

                {/* Overlay Price Gauges */}
                <div className="absolute inset-y-0 left-0 flex flex-col justify-between py-1 px-2 pointer-events-none">
                    <span className="text-[8px] font-mono text-white/40 bg-black/40 backdrop-blur-sm px-1">112.50</span>
                    <span className="text-[8px] font-mono text-white/40 bg-black/40 backdrop-blur-sm px-1">110.00</span>
                    <span className="text-[8px] font-mono text-white/40 bg-black/40 backdrop-blur-sm px-1">107.50</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-0.5 bg-pink-500 animate-pulse"></div>
                        <span className="text-[10px] font-mono text-pink-400 uppercase font-bold">WHALE CLUSTER DETECTED</span>
                    </div>
                    <span className="text-white/20">|</span>
                    <span className="text-[9px] font-mono text-white/30 uppercase">Liquidity wall forming at 108.50</span>
                </div>
                <button className="text-[9px] font-mono text-blue-400 uppercase tracking-tighter hover:underline">Download Map .JSON</button>
            </div>
        </div>
    );
};
