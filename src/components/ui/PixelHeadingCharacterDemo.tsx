'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { PixelHeading } from "@/components/ui/pixel-heading-character"
import type { PixelHeadingMode } from "@/components/ui/pixel-heading-character"

/* ─── Constants ─── */

const MODES: PixelHeadingMode[] = ["uniform", "multi", "wave", "random"]
const PREFIX_FONTS = [
    "none",
    "square",
    "grid",
    "circle",
    "line",
] as const
const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const
const FONT_WEIGHTS = [
    { label: "Light", class: "font-light" },
    { label: "Regular", class: "font-normal" },
    { label: "Medium", class: "font-medium" },
    { label: "Semibold", class: "font-semibold" },
    { label: "Bold", class: "font-bold" },
] as const

/* ─── Demo ─── */

export function PixelHeadingCharacterDemo() {
    const [text, setText] = useState("Pixel Fonts")
    const [mode, setMode] = useState<PixelHeadingMode>("wave")
    const [autoPlay, setAutoPlay] = useState(true)
    const [showLabel, setShowLabel] = useState(true)
    const [cycleInterval, setCycleInterval] = useState(340)
    const [staggerDelay, setStaggerDelay] = useState(200)
    const [prefix, setPrefix] = useState("")
    const [prefixFont, setPrefixFont] =
        useState<(typeof PREFIX_FONTS)[number]>("none")
    const [headingLevel, setHeadingLevel] =
        useState<(typeof HEADING_LEVELS)[number]>("h1")
    const [fontWeight, setFontWeight] = useState<(typeof FONT_WEIGHTS)[number]>(FONT_WEIGHTS[4]) // Default to Bold
    const [defaultFontIndex, setDefaultFontIndex] = useState(3)
    const [isolateEnabled, setIsolateEnabled] = useState(false)
    const [isolateChars, setIsolateChars] = useState("x")
    const [isolateFont, setIsolateFont] = useState("sans")

    const isolateMap = isolateEnabled
        ? Object.fromEntries(isolateChars.split("").map((c) => [c, isolateFont]))
        : undefined

    /* ── Reset key forces remount when autoPlay toggles ── */
    const [resetKey, setResetKey] = useState(0)

    return (
        <div className="w-full space-y-8 py-4">
            {/* ── Preview ── */}
            <div className="flex min-h-[240px] items-center justify-center rounded-none border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
                <PixelHeading
                    key={resetKey}
                    as={headingLevel}
                    mode={mode}
                    autoPlay={autoPlay}
                    showLabel={showLabel}
                    cycleInterval={cycleInterval}
                    staggerDelay={staggerDelay}
                    defaultFontIndex={defaultFontIndex}
                    prefix={prefix || undefined}
                    prefixFont={prefixFont}
                    isolate={isolateMap}
                    className={cn("text-5xl md:text-7xl tracking-tighter uppercase text-white", fontWeight.class)}
                >
                    {text}
                </PixelHeading>
            </div>

            {/* ── Controls ── */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Text */}
                <ControlGroup label="Text Content">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="h-10 w-full rounded-none border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-purple-500/50 focus:outline-none transition-colors font-mono"
                        placeholder="Enter heading text"
                    />
                </ControlGroup>

                {/* Mode */}
                <ControlGroup label="Animation Mode">
                    <div className="flex flex-wrap gap-2">
                        {MODES.map((m) => (
                            <button
                                type="button"
                                key={m}
                                onClick={() => {
                                    setMode(m)
                                    setResetKey((k) => k + 1)
                                }}
                                className={`rounded-none px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${mode === m
                                    ? "bg-purple-500 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                    : "bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </ControlGroup>

                {/* Heading Level */}
                <ControlGroup label="HTML Element">
                    <select
                        value={headingLevel}
                        onChange={(e) =>
                            setHeadingLevel(e.target.value as (typeof HEADING_LEVELS)[number])
                        }
                        className="h-10 w-full rounded-none border border-white/10 bg-black text-white px-3 text-sm focus:border-purple-500/50 focus:outline-none font-mono"
                    >
                        {HEADING_LEVELS.map((h) => (
                            <option key={h} value={h} className="bg-black">
                                {h.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </ControlGroup>

                {/* Font Weight */}
                <ControlGroup label="Font Weight">
                    <div className="flex flex-wrap gap-2">
                        {FONT_WEIGHTS.map((w) => (
                            <button
                                type="button"
                                key={w.label}
                                onClick={() => setFontWeight(w)}
                                className={`rounded-none px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider border transition-all ${fontWeight.label === w.label
                                    ? "bg-white text-black border-white"
                                    : "bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {w.label}
                            </button>
                        ))}
                    </div>
                </ControlGroup>

                {/* Cycle Interval */}
                <ControlGroup label={`Cycle Interval (Speed): ${cycleInterval}ms`}>
                    <input
                        type="range"
                        min={30}
                        max={500}
                        step={10}
                        value={cycleInterval}
                        onChange={(e) => setCycleInterval(Number(e.target.value))}
                        className="w-full accent-purple-500 bg-white/10 h-1 appearance-none cursor-pointer"
                    />
                </ControlGroup>

                {/* Stagger Delay */}
                <ControlGroup label={`Stagger (Wave): ${staggerDelay}ms`}>
                    <input
                        type="range"
                        min={0}
                        max={200}
                        step={5}
                        value={staggerDelay}
                        onChange={(e) => setStaggerDelay(Number(e.target.value))}
                        className="w-full accent-purple-500 bg-white/10 h-1 appearance-none cursor-pointer"
                    />
                </ControlGroup>

                {/* Default Font Index (uniform) */}
                <ControlGroup label={`Initial Font: ${defaultFontIndex}`}>
                    <input
                        type="range"
                        min={0}
                        max={3}
                        step={1}
                        value={defaultFontIndex}
                        onChange={(e) => setDefaultFontIndex(Number(e.target.value))}
                        className="w-full accent-purple-500 bg-white/10 h-1 appearance-none cursor-pointer"
                    />
                </ControlGroup>

                {/* Auto Play */}
                <ControlGroup label="Playback">
                    <div className="flex items-center gap-4">
                        <Toggle
                            checked={autoPlay}
                            onChange={(v) => {
                                setAutoPlay(v)
                                setResetKey((k) => k + 1)
                            }}
                        />
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                            Autoplay {autoPlay ? 'ON' : 'OFF'}
                        </span>
                    </div>
                </ControlGroup>

                {/* Show Label */}
                <ControlGroup label="System Labels">
                    <div className="flex items-center gap-4">
                        <Toggle checked={showLabel} onChange={setShowLabel} />
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                            Debug Info {showLabel ? 'Visible' : 'Hidden'}
                        </span>
                    </div>
                </ControlGroup>

                {/* Prefix */}
                <ControlGroup label="Prefix Text">
                    <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        className="h-10 w-full rounded-none border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-purple-500/50 focus:outline-none transition-colors font-mono"
                        placeholder="e.g. CDJ,"
                    />
                </ControlGroup>

                {/* Prefix Font */}
                <ControlGroup label="Prefix Font Style">
                    <select
                        value={prefixFont}
                        onChange={(e) =>
                            setPrefixFont(e.target.value as (typeof PREFIX_FONTS)[number])
                        }
                        className="h-10 w-full rounded-none border border-white/10 bg-black text-white px-3 text-sm focus:border-purple-500/50 focus:outline-none font-mono"
                    >
                        {PREFIX_FONTS.map((f) => (
                            <option key={f} value={f} className="bg-black">
                                {f === 'none' ? 'DEFAULT' : f.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </ControlGroup>

                {/* Isolate */}
                <ControlGroup label="Character Isolation">
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <Toggle checked={isolateEnabled} onChange={setIsolateEnabled} />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                Isolation {isolateEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                        </div>
                        {isolateEnabled && (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={isolateChars}
                                    onChange={(e) => setIsolateChars(e.target.value)}
                                    className="h-9 w-20 rounded-none border border-white/10 bg-white/5 px-3 text-xs text-white focus:border-purple-500/50 focus:outline-none font-mono"
                                    placeholder="chars"
                                />
                                <select
                                    value={isolateFont}
                                    onChange={(e) => setIsolateFont(e.target.value)}
                                    className="h-9 flex-1 rounded-none border border-white/10 bg-black text-white px-3 text-xs focus:border-purple-500/50 focus:outline-none font-mono"
                                >
                                    <option value="sans" className="bg-black">SANS</option>
                                    <option value="mono" className="bg-black">MONO</option>
                                </select>
                            </div>
                        )}
                    </div>
                </ControlGroup>

                {/* Remount */}
                <ControlGroup label="System Reset">
                    <button
                        type="button"
                        onClick={() => setResetKey((k) => k + 1)}
                        className="h-10 w-full rounded-none border border-white/20 bg-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all active:scale-95"
                    >
                        Restart Animation
                    </button>
                </ControlGroup>
            </div>
        </div>
    )
}

/* ─── Shared control primitives ─── */

function ControlGroup({
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-3 bg-white/[0.02] border border-white/5 p-4">
            <span className="block text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-white/30">
                {label}
            </span>
            {children}
        </div>
    )
}

function Toggle({
    checked,
    onChange,
}: {
    checked: boolean
    onChange: (v: boolean) => void
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-none border border-white/10 transition-colors duration-200 focus:outline-none ${checked ? "bg-purple-600/50" : "bg-white/5"
                }`}
        >
            <span
                className={`pointer-events-none block h-full w-4 bg-white shadow-lg transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"
                    }`}
            />
        </button>
    )
}
