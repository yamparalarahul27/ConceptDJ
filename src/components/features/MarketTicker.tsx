'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
    symbol: string;
    targetSymbol: string;
    price: string;
    change: number;
}

const SUPPORTED_TOKENS = [
    { display: 'BTC', binance: 'BTCUSDT' },
    { display: 'ETH', binance: 'ETHUSDT' },
    { display: 'SOL', binance: 'SOLUSDT' },
    { display: 'JUP', binance: 'JUPUSDT' },
    { display: 'PYTH', binance: 'PYTHUSDT' },
    { display: 'BONK', binance: 'BONKUSDT' },
    { display: 'JTO', binance: 'JTOUSDT' },
    { display: 'WIF', binance: 'WIFUSDT' },
    { display: 'RAY', binance: 'RAYUSDT' }
];

export const MarketTicker: React.FC = () => {
    const [tickerMap, setTickerMap] = useState<Record<string, TickerItem>>({});
    const [isConnecting, setIsConnecting] = useState(true);

    useEffect(() => {
        // Construct the combined stream URL
        const streams = SUPPORTED_TOKENS.map(t => `${t.binance.toLowerCase()}@ticker`).join('/');
        const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            // Connection established, wait for first data packets
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.data) {
                    const data = message.data;
                    const binanceSymbol = data.s;
                    const token = SUPPORTED_TOKENS.find(t => t.binance === binanceSymbol);

                    if (token) {
                        const priceNum = parseFloat(data.c);
                        let formattedPrice = data.c;

                        // Format formatting logic based on value size
                        if (priceNum > 1000) {
                            formattedPrice = priceNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        } else if (priceNum < 0.01) {
                            formattedPrice = priceNum.toFixed(7);
                        } else {
                            formattedPrice = priceNum.toFixed(4);
                        }

                        setTickerMap(prev => {
                            const newMap = {
                                ...prev,
                                [binanceSymbol]: {
                                    symbol: `${token.display}/USDT`,
                                    targetSymbol: binanceSymbol,
                                    price: formattedPrice,
                                    change: Number(parseFloat(data.P).toFixed(2))
                                }
                            };

                            // If we have received data for at least half the tokens, dismiss the loader
                            if (Object.keys(newMap).length >= SUPPORTED_TOKENS.length / 2) {
                                setIsConnecting(false);
                            }

                            return newMap;
                        });
                    }
                }
            } catch (err) {
                console.error("Error parsing Binance websocket message", err);
            }
        };

        ws.onerror = (error) => {
            console.error("Binance WebSocket Error:", error);
            setIsConnecting(false); // Drop loading state if errored out completely
        };

        ws.onclose = () => {
            // Optionally, try to reconnect here
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, []);

    // Convert map to ordered array based on SUPPORTED_TOKENS order
    const orderedTickers = useMemo(() => {
        return SUPPORTED_TOKENS.map(t => tickerMap[t.binance]).filter(Boolean);
    }, [tickerMap]);

    const items = useMemo(() => {
        if (orderedTickers.length === 0) return [];
        return [...orderedTickers, ...orderedTickers, ...orderedTickers]; // Duplicate for marquee
    }, [orderedTickers]);

    const isLoading = isConnecting && orderedTickers.length === 0;

    return (
        <div className="w-full bg-black border-b border-white/10 overflow-hidden h-10 flex items-center justify-center fixed top-0 left-0 right-0 z-[60]">
            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10"></div>

            {isLoading ? (
                <div className="flex items-center justify-center w-full z-20">
                    <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest animate-pulse">
                        Connecting to Binance Live Stream...
                    </span>
                </div>
            ) : (
                <div className="flex animate-marquee whitespace-nowrap w-full justify-start">
                    {items.map((item, i) => (
                        <div
                            key={`${item.targetSymbol}-${i}`}
                            className="flex items-center gap-6 px-12 border-r border-white/5 last:border-none"
                        >
                            <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">
                                {item.symbol}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-pixel text-white tracking-widest w-[80px]">
                                    ${item.price}
                                </span>
                                <div className={`flex items-center gap-1 text-[9px] font-mono font-bold w-[45px] ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    {Math.abs(item.change)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    /* Adjusted speed considering more tokens */
                    animation: marquee 60s linear infinite;
                }
            `}</style>
        </div>
    );
};
