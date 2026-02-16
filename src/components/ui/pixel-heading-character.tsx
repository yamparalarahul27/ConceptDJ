'use client'

import React, { useEffect, useState, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

export type PixelHeadingMode = "uniform" | "multi" | "wave" | "random"

interface PixelHeadingProps {
    children: string
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    mode?: PixelHeadingMode
    autoPlay?: boolean
    cycleInterval?: number
    staggerDelay?: number
    defaultFontIndex?: number
    showLabel?: boolean
    prefix?: string
    prefixFont?: "square" | "grid" | "circle" | "line" | "none"
    isolate?: Record<string, string>
    onFontIndexChange?: (index: number) => void
    className?: string
}

const PIXEL_FONTS = ["square", "grid", "circle", "line"] as const
const PIXEL_FONT_VARS = {
    square: "font-pixel-square",
    grid: "font-pixel-grid",
    circle: "font-pixel-circle",
    line: "font-pixel-line",
}

export const PixelHeading = ({
    children,
    as: Component = "h1",
    mode = "wave",
    autoPlay = false,
    cycleInterval = 250,
    staggerDelay = 50,
    defaultFontIndex = 0,
    showLabel = false,
    prefix,
    prefixFont = "none",
    isolate,
    onFontIndexChange,
    className,
}: PixelHeadingProps) => {
    const [isAnimating, setIsAnimating] = useState(autoPlay)
    const [charFonts, setCharFonts] = useState<number[]>(() => {
        // Initial state: Golden ratio distribution or uniform
        return children.split("").map((_, i) => {
            if (mode === "uniform") return defaultFontIndex
            // Pseudo-random distribution based on index to avoid same fonts touching
            return (i * 4) % PIXEL_FONTS.length
        })
    })

    const timerRefs = useRef<(NodeJS.Timeout | null)[]>([])

    const getNextFont = useCallback((currentIndex: number) => {
        return (currentIndex + 1) % PIXEL_FONTS.length
    }, [])

    const animate = useCallback(() => {
        if (!isAnimating) return

        children.split("").forEach((char, i) => {
            if (isolate && isolate[char]) return

            const delay = mode === "wave" || mode === "multi" ? i * staggerDelay : 0

            timerRefs.current[i] = setTimeout(() => {
                setCharFonts((prev) => {
                    const next = [...prev]
                    if (mode === "uniform") {
                        const nextIdx = getNextFont(prev[0])
                        onFontIndexChange?.(nextIdx)
                        return prev.map(() => nextIdx)
                    }
                    next[i] = getNextFont(prev[i])
                    return next
                })

                // Set up next tick
                const interval = setInterval(() => {
                    setCharFonts((prev) => {
                        const next = [...prev]
                        if (mode === "uniform") {
                            const nextIdx = getNextFont(prev[0])
                            onFontIndexChange?.(nextIdx)
                            return prev.map(() => nextIdx)
                        }
                        next[i] = getNextFont(prev[i])
                        return next
                    })
                }, cycleInterval)

                // Store interval to clear later
                timerRefs.current[i + children.length] = interval
            }, delay)
        })
    }, [children, cycleInterval, getNextFont, isAnimating, isolate, mode, onFontIndexChange, staggerDelay])

    useEffect(() => {
        if (isAnimating) {
            animate()
        } else {
            timerRefs.current.forEach(t => {
                if (t) {
                    clearTimeout(t)
                    clearInterval(t as unknown as number)
                }
            })
        }

        return () => {
            timerRefs.current.forEach(t => {
                if (t) {
                    clearTimeout(t)
                    clearInterval(t as unknown as number)
                }
            })
        }
    }, [animate, isAnimating])

    const handleInteractionStart = () => !autoPlay && setIsAnimating(true)
    const handleInteractionEnd = () => !autoPlay && setIsAnimating(false)

    return (
        <div className="flex flex-col items-center">
            <Component
                className={cn("flex flex-wrap items-center justify-center leading-none select-none", className)}
                onMouseEnter={handleInteractionStart}
                onMouseLeave={handleInteractionEnd}
                onFocus={handleInteractionStart}
                onBlur={handleInteractionEnd}
                tabIndex={0}
                aria-label={children}
            >
                {prefix && (
                    <span className={cn("mr-[0.2em]", prefixFont !== "none" && PIXEL_FONT_VARS[prefixFont])}>
                        {prefix}
                    </span>
                )}
                {children.split("").map((char, i) => {
                    const isolatedFont = isolate?.[char]
                    const fontClass = isolatedFont
                        ? isolatedFont === "sans" ? "font-sans" : isolatedFont === "mono" ? "font-mono" : ""
                        : PIXEL_FONT_VARS[PIXEL_FONTS[charFonts[i]]]

                    return (
                        <span
                            key={i}
                            className={cn("inline-block transition-all duration-75", fontClass)}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    )
                })}
            </Component>
            {showLabel && (
                <span className="mt-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    Mode: {mode} | Font: {PIXEL_FONTS[charFonts[0]]}
                </span>
            )}
        </div>
    )
}
