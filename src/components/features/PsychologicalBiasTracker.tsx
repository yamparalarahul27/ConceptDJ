
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface PsychologicalBiasTrackerProps {
    data: any[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 border border-white/10 p-3 rounded-none backdrop-blur-md shadow-2xl">
                <p className="text-white font-mono text-[10px] uppercase font-bold mb-1">{payload[0].payload.subject}</p>
                <p className="text-purple-400 font-pixel text-lg">{payload[0].value}%</p>
                <div className="mt-2 text-[9px] text-white/40 font-mono uppercase leading-tight">
                    Detected via behavioral <br /> execution patterns.
                </div>
            </div>
        );
    }
    return null;
};

/**
 * PsychologicalBiasTracker Component
 * 
 * PURPOSE:
 * Visualizes common trading biases using a radar chart.
 * Helps traders identify their psychological "blind spots".
 */
export const PsychologicalBiasTracker: React.FC<PsychologicalBiasTrackerProps> = ({ data }) => {
    return (
        <div className="bg-white/5 border border-white/10 p-8 rounded-none h-full flex flex-col">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-12">Cognitive Bias Mapping</h3>

            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Radar
                            name="Intensity"
                            dataKey="A"
                            stroke="#a855f7"
                            fill="#a855f7"
                            fillOpacity={0.2}
                            isAnimationActive={true}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="text-[8px] font-mono text-white/20 uppercase block mb-1">Top Bias</span>
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-tighter">REVENGE TRADING</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5">
                    <span className="text-[8px] font-mono text-white/20 uppercase block mb-1">Impact Factor</span>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-tighter">HIGH RISK</span>
                </div>
            </div>
        </div>
    );
};
