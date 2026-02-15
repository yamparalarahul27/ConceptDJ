/**
 * Mock Service for purely visual concepts
 */

export interface UserWallet {
    id: string;
    wallet_address: string;
    network: string;
    wallet_provider: string;
    connection_method: string;
    last_synced_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface SaveWalletParams {
    address: string;
    network: string;
    provider?: string;
    method?: 'manual' | 'wallet_connect';
}

export class SupabaseWalletService {
    async saveWallet(params: SaveWalletParams): Promise<UserWallet> {
        throw new Error("Mock only");
    }

    async getWallet(address: string): Promise<UserWallet | null> {
        return null;
    }

    async updateSyncTime(address: string): Promise<void> {
    }

    async getRecentWallets(limit: number = 5): Promise<UserWallet[]> {
        return [];
    }

    isDataStale(wallet: UserWallet, hoursThreshold: number = 24): boolean {
        return true;
    }

    getTimeSinceSync(wallet: UserWallet): string {
        return 'Never synced';
    }
}
