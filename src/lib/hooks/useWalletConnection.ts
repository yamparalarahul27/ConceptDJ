'use client';

/**
 * Mock wallet connection hook for purely visual concepts.
 * Removes dependencies on @solana and @jup-ag.
 */
export function useWalletConnection() {
    return {
        publicKey: null,
        walletAddress: null,
        shortAddress: null,
        connected: false,
        connecting: false,
        connect: async () => { },
        disconnect: async () => { },
        selectWallet: () => { },
        walletName: null,
        wallets: [],
        openWalletModal: () => { },
        isWalletModalOpen: false
    };
}
