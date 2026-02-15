/**
 * Mock Service for purely visual concepts
 */

export interface TransactionLog {
    signature: string;
    time: number;
    type: string;
    status: 'Confirmed' | 'Failed';
    fee: number;
}

export interface TransactionHistoryResponse {
    transactions: TransactionLog[];
}

export class HeliusService {
    async fetchAllTransactions(address: string): Promise<TransactionHistoryResponse> {
        return { transactions: [] };
    }

    static formatTime(timestamp: number): string {
        return '';
    }
}
