'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Settings Context
 * 
 * Manages user preferences for widget visibility and UI layout.
 * Persists to localStorage.
 */

interface SettingsState {
    showAITiltMeter: boolean;
    showMAEFE: boolean;
    showPnLHeatmap: boolean;
    showLiquidityHeatmap: boolean;
    useDiscreteHeatmap: boolean;
    compactMode: boolean;
    showBenchmarkBTC: boolean;
    playerName: string;
    aiPersonality: 'zen' | 'aggressive' | 'analytical';
}

const DEFAULT_SETTINGS: SettingsState = {
    showAITiltMeter: true,
    showMAEFE: true,
    showPnLHeatmap: true,
    showLiquidityHeatmap: true,
    useDiscreteHeatmap: true,
    compactMode: false,
    showBenchmarkBTC: true,
    playerName: 'TRADER_X',
    aiPersonality: 'analytical',
};

interface SettingsContextType {
    settings: SettingsState;
    updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
    resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('cdj_settings');
        if (saved) {
            try {
                setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
            } catch (e) {
                console.error("Failed to load settings", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cdj_settings', JSON.stringify(settings));
        }
    }, [settings, isLoaded]);

    const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
