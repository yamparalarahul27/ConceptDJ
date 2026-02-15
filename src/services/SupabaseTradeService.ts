import type { Trade } from '@/lib/types';

export interface SaveTradesResult {
    saved: number;
    updated: number;
    errors: number;
}

/**
 * Mock Service for purely visual concepts
 */
export class SupabaseTradeService {
    async saveTrades(walletAddress: string, trades: Trade[]): Promise<SaveTradesResult> {
        return { saved: 0, updated: 0, errors: 0 };
    }

    async getTrades(walletAddress: string, limit?: number): Promise<Trade[]> {
        return [];
    }

    async getTradeCount(walletAddress: string): Promise<number> {
        return 0;
    }

    async deleteTrades(walletAddress: string): Promise<number> {
        return 0;
    }

    async getAnalytics(walletAddress: string): Promise<{
        totalTrades: number;
        totalPnl: number;
        winRate: number;
        totalFees: number;
    }> {
        return { totalTrades: 0, totalPnl: 0, winRate: 0, totalFees: 0 };
    }
}
