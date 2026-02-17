'use client';

import React from 'react';
import { useSettings } from '@/components/features/SettingsProvider';
import { Settings as SettingsIcon, Layout, Eye, User, RotateCcw, Save } from 'lucide-react';
import { ConceptMetaBar } from '@/components/features/ConceptMetaBar';

export default function SettingsPage() {
    const { settings, updateSetting, resetSettings } = useSettings();

    const Toggle = ({ label, value, onChange, description }: { label: string, value: boolean, onChange: (val: boolean) => void, description?: string }) => (
        <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 group hover:border-white/20 transition-all">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">{label}</span>
                {description && <span className="text-[9px] font-mono text-white/30 uppercase tracking-tight">{description}</span>}
            </div>
            <button
                onClick={() => onChange(!value)}
                className={`w-12 h-6 rounded-none border transition-all relative ${value ? 'border-purple-500 bg-purple-500/20' : 'border-white/10 bg-white/5'}`}
            >
                <div className={`absolute top-1 bottom-1 w-4 transition-all ${value ? 'right-1 bg-purple-400' : 'left-1 bg-white/20'}`} />
            </button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto py-4 space-y-8 pb-24 px-6">
            <ConceptMetaBar />
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white uppercase tracking-tighter text-heading-32">Collective Settings</h1>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono uppercase tracking-widest">
                        <SettingsIcon size={12} />
                        <span>Persistence Module v1.0 // LOCAL_ONLY</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: General Settings (4/12) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-none">
                        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <User size={14} className="text-purple-400" /> Professional Profile
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[9px] font-mono text-white/20 uppercase block mb-2">Display ID</label>
                                <input
                                    type="text"
                                    value={settings.playerName}
                                    onChange={(e) => updateSetting('playerName', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-none text-white font-mono text-xs focus:border-purple-500 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-[9px] font-mono text-white/20 uppercase block mb-2">AI Coaching Personality</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {(['zen', 'aggressive', 'analytical'] as const).map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => updateSetting('aiPersonality', style)}
                                            className={`p-3 border text-left transition-all ${settings.aiPersonality === style
                                                    ? 'border-purple-500 bg-purple-500/10 text-white'
                                                    : 'border-white/5 bg-white/[0.02] text-white/40'
                                                }`}
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-mono uppercase font-bold">{style}</span>
                                                <span className="text-[8px] font-mono opacity-60">
                                                    {style === 'zen' && 'Long-term focused, calm signals'}
                                                    {style === 'aggressive' && 'High-performance focus, low tolerance'}
                                                    {style === 'analytical' && 'Deep statistics and MAE/MFE focus'}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-none">
                        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            System Commands
                        </h3>
                        <div className="space-y-3">
                            <button
                                onClick={resetSettings}
                                className="w-full py-3 bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={12} /> Reset to Defaults
                            </button>
                            <div className="p-3 bg-blue-500/5 border border-blue-500/10 text-[8px] font-mono text-blue-400 uppercase leading-relaxed text-center">
                                All changes are persisted to your browser's LocalStorage automatically.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Module Toggles (8/12) */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-none">
                        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Layout size={16} className="text-purple-400" /> Module visibility
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Toggle
                                label="AI Tilt Meter"
                                value={settings.showAITiltMeter}
                                onChange={(val) => updateSetting('showAITiltMeter', val)}
                                description="Real-time emotional state monitoring"
                            />
                            <Toggle
                                label="MAE/MFE Analysis"
                                value={settings.showMAEFE}
                                onChange={(val) => updateSetting('showMAEFE', val)}
                                description="Deep execution quality scatter plots"
                            />
                            <Toggle
                                label="PnL Heatmap"
                                value={settings.showPnLHeatmap}
                                onChange={(val) => updateSetting('showPnLHeatmap', val)}
                                description="Calendar-based performance clusters"
                            />
                            <Toggle
                                label="Liquidity Heatmap"
                                value={settings.showLiquidityHeatmap}
                                onChange={(val) => updateSetting('showLiquidityHeatmap', val)}
                                description="Market depth price clusters"
                            />
                        </div>
                    </div>

                    <div className="p-8 bg-white/5 border border-white/10 rounded-none">
                        <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Eye size={16} className="text-purple-400" /> Visual Preferences
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Toggle
                                label="Discrete Blocks"
                                value={settings.useDiscreteHeatmap}
                                onChange={(val) => updateSetting('useDiscreteHeatmap', val)}
                                description="Use pixel grid for heatmaps (Terminal look)"
                            />
                            <Toggle
                                label="Asset Benchmarking"
                                value={settings.showBenchmarkBTC}
                                onChange={(val) => updateSetting('showBenchmarkBTC', val)}
                                description="Show BTC/ETH overlays on PnL charts"
                            />
                            <Toggle
                                label="Compact Mode"
                                value={settings.compactMode}
                                onChange={(val) => updateSetting('compactMode', val)}
                                description="Reduce padding and text size across dashboards"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
