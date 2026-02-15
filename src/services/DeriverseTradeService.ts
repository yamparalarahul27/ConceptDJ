import type { Trade } from '../lib/types';

/**
 * Mock Service for purely visual concepts
 */
export class DeriverseTradeService {
    async fetchTradesForWallet(
        connection: any,
        walletAddress: string
    ): Promise<Trade[]> {
        return [];
    }
}
