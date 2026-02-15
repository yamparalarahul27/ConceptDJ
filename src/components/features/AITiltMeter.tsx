
import React from 'react';
import { AlertTriangle, Zap, Smile, Frown } from 'lucide-react';

interface AITiltMeterProps {
    tiltLevel: number; // 0 (Zen) to 100 (Full Tilt)
}

/**
 * AITiltMeter Component
 * 
 * PURPOSE:
 * Visualizes the trader's emotional state based on recent performance.
 * Uses a gauge and specific color grading to signal "Tilt" risk.
 */
export const AITiltMeter: React.FC<AITiltMeterProps> = ({ tiltLevel }) => {
    // Determine status and colors based on level
    let status = "ZEN";
    let color = "text-green-400";
    let icon = <Smile size={24} />;
    let desc = "Optimal state. Execution is rational and calm.";
    let borderColor = "border-green-500/20";
    let bgColor = "bg-green-500/10";
    let accentColor = "bg-green-400";

    if (tiltLevel > 30 && tiltLevel <= 70) {
        status = "UNSETTLED";
        color = "text-yellow-400";
        icon = <Zap size={24} />;
        desc = "Emotional variance detected. Stick to the plan.";
        borderColor = "border-yellow-500/20";
        bgColor = "bg-yellow-500/10";
        accentColor = "bg-yellow-400";
    } else if (tiltLevel > 70) {
        status = "CRITICAL TILT";
        color = "text-red-400";
        icon = <AlertTriangle size={24} className="animate-pulse" />;
        desc = "High physiological stress. STOP TRADING immediately.";
        borderColor = "border-red-500/20";
        bgColor = "bg-red-500/10";
        accentColor = "bg-red-400";
    }

    return (
        <div className={`border ${borderColor} ${bgColor} p-6 rounded-none relative overflow-hidden transition-all duration-500`}>
            {/* Background Texture / Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-none bg-white/5 border ${borderColor} ${color}`}>
                        {icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none">AI Tilt Meter</span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 border ${borderColor} ${color} font-bold`}>{status}</span>
                        </div>
                        <h3 className={`text-2xl font-bold font-mono tracking-tighter uppercase ${color}`}>
                            {tiltLevel}% VARIANCE
                        </h3>
                        <p className="text-white/50 text-[10px] font-mono uppercase tracking-tight mt-2 italic">
                            {desc}
                        </p>
                    </div>
                </div>

                {/* Gauge Visualization */}
                <div className="flex-1 w-full max-w-md">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[9px] font-mono text-white/20 uppercase">Rational</span>
                        <span className="text-[9px] font-mono text-white/20 uppercase">Emotional</span>
                    </div>
                    <div className="h-4 w-full bg-white/5 border border-white/10 rounded-none relative overflow-hidden">
                        {/* Threshold Markers */}
                        <div className="absolute left-[30%] inset-y-0 w-px bg-white/10 z-20" />
                        <div className="absolute left-[70%] inset-y-0 w-px bg-white/10 z-20" />

                        {/* Progress Bar */}
                        <div
                            className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out ${accentColor}`}
                            style={{ width: `${tiltLevel}%` }}
                        />

                        {/* Glow effect on the tip */}
                        <div
                            className={`absolute inset-y-0 pointer-events-none blur-sm opacity-50 ${accentColor}`}
                            style={{ left: `${Math.max(0, tiltLevel - 5)}%`, width: '10%' }}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-1 mt-1 text-[8px] font-mono text-white/10 text-center uppercase">
                        <div>Safe Zone</div>
                        <div>Caution</div>
                        <div>Danger</div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-white/5 text-[9px] font-mono text-white/30 uppercase tracking-tighter">
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-none bg-red-500/40"></span>
                    <span>Loss Streak: 3x (High Correlation)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-none bg-yellow-500/40"></span>
                    <span>Frequency: Above Avg</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-none bg-green-500/40"></span>
                    <span>Equity Drawdown: -4.2%</span>
                </div>
            </div>
        </div>
    );
};
