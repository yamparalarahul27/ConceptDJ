/**
 * Risk Intelligence Math Utilities
 * 
 * Normalized 0-100 scoring engine for crypto risk management.
 */

// --- 1. Trade Risk Score (TRS) Utilities ---

/**
 * DDS (Drawdown Risk Score) Lookup
 * Map Risk% to a 0-100 score
 */
export const getDDS = (riskPercent: number): number => {
    if (riskPercent <= 0.5) return 10;
    if (riskPercent <= 1) return 25;
    if (riskPercent <= 2) return 50;
    if (riskPercent <= 3) return 70;
    if (riskPercent <= 5) return 90;
    return 100;
};

/**
 * PSS (Position Size Risk Score) Lookup
 * Map Exposure% to a 0-100 score
 */
export const getPSS = (exposurePercent: number): number => {
    if (exposurePercent <= 10) return 10;
    if (exposurePercent <= 25) return 30;
    if (exposurePercent <= 50) return 55;
    if (exposurePercent <= 75) return 70;
    if (exposurePercent <= 100) return 80;
    return 100;
};

/**
 * VRS (Volatility Risk Score) Lookup
 * Map ATR% to a 0-100 score
 */
export const getVRS = (atrPercent: number): number => {
    if (atrPercent <= 1) return 10;
    if (atrPercent <= 2) return 25;
    if (atrPercent <= 4) return 55;
    if (atrPercent <= 6) return 75;
    return 100;
};

/**
 * Calculate TRS (Trade Risk Score)
 * 0.40 * PSS + 0.35 * DDS + 0.25 * VRS
 */
export const calculateTRS = (pss: number, dds: number, vrs: number): number => {
    return (0.40 * pss) + (0.35 * dds) + (0.25 * vrs);
};

export const getTRSLabel = (score: number) => {
    if (score <= 34) return { label: 'Conservative', color: 'text-green-400' };
    if (score <= 64) return { label: 'Balanced', color: 'text-amber-400' };
    if (score <= 79) return { label: 'Aggressive', color: 'text-orange-400' };
    return { label: 'Reckless', color: 'text-red-400' };
};

// --- 2. Portfolio Risk Score (PRS) Utilities ---

/**
 * Calculate PRS (Portfolio Risk Score)
 * Combined weights based on Heat, Exposure, Concentration, Correlation, Volatility
 */
export const calculatePRS = (
    heat: number,
    exposure: number,
    concentration: number,
    correlation: number,
    volatility: number
): number => {
    return (
        (0.40 * heat) +
        (0.20 * exposure) +
        (0.15 * concentration) +
        (0.10 * correlation) +
        (0.15 * volatility)
    );
};

export const getPRSLabel = (score: number) => {
    if (score <= 34) return { label: 'Stable', color: 'text-green-400' };
    if (score <= 64) return { label: 'Controlled', color: 'text-amber-400' };
    if (score <= 79) return { label: 'Stressed', color: 'text-orange-400' };
    return { label: 'Fragile', color: 'text-red-400' };
};

// --- 3. Risk Consistency Score (RCS) Utilities ---

/**
 * Calculate RCS (Risk Consistency Score)
 * Evaluates behavioral discipline over time.
 */
export const calculateRCS = (
    stability: number,
    drift: number,
    escalation: number,
    overtrading: number,
    spike: number
): number => {
    return (
        (0.40 * stability) +
        (0.20 * drift) +
        (0.20 * escalation) +
        (0.10 * overtrading) +
        (0.10 * spike)
    );
};

export const getRCSLabel = (score: number) => {
    if (score >= 80) return { label: 'Disciplined', color: 'text-green-400' };
    if (score >= 60) return { label: 'Consistent', color: 'text-amber-400' };
    if (score >= 40) return { label: 'Unstable', color: 'text-orange-400' };
    return { label: 'Emotion Driven', color: 'text-red-400' };
};
