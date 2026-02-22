export interface TradeEvent {
    id: string;
    signature: string;
    timestamp: string | number;
    orderType: string;
    tradeType: string;
    price: number | string;
    size: number | string;
    fee: number | string;
    isEntry: boolean;
    positionId: string;
    position?: any;
    rawData?: any;
    metadata?: any;
}

export interface JournalAnalysis {
    aiAnalysis?: any;
    traderProfile?: any;
    macroContext?: any;
    whatIfAnalysis?: any;
}

export interface JournalEntryUpdate {
    notes?: string;
    emotion?: 'Calm' | 'Confident' | 'Anxious' | 'Fearful' | 'Greedy' | 'Neutral';
    rating?: number;
    hypotheticalExitPrice?: number;
}
