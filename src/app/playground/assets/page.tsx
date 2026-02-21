'use client';

import React, { useState, useEffect } from 'react';
import { OrderbookWidget, OrderbookEntry } from '@/components/features/OrderbookWidget';
import { BinanceTradingViewChart } from '@/components/features/BinanceTradingViewChart';
import { BinanceRechartsArea } from '@/components/features/BinanceRechartsArea';

const SUPPORTED_ASSETS = [
    { symbol: 'BTC', name: 'Bitcoin', binance: 'BTCUSDT' },
    { symbol: 'ETH', name: 'Ethereum', binance: 'ETHUSDT' },
    { symbol: 'SOL', name: 'Solana', binance: 'SOLUSDT' },
    { symbol: 'JUP', name: 'Jupiter', binance: 'JUPUSDT' },
    { symbol: 'PYTH', name: 'Pyth', binance: 'PYTHUSDT' },
    { symbol: 'BONK', name: 'Bonk', binance: 'BONKUSDT' },
    { symbol: 'JTO', name: 'Jito', binance: 'JTOUSDT' },
    { symbol: 'WIF', name: 'Dogwifhat', binance: 'WIFUSDT' },
    { symbol: 'RAY', name: 'Raydium', binance: 'RAYUSDT' }
];

export default function AssetDetailsPage() {
    const [selectedAsset, setSelectedAsset] = useState(SUPPORTED_ASSETS[2]); // Default to SOL
    const [chartType, setChartType] = useState<'tradingview' | 'bklit'>('tradingview');

    // Live Data State
    const [bids, setBids] = useState<OrderbookEntry[]>([]);
    const [asks, setAsks] = useState<OrderbookEntry[]>([]);
    const [currentPrice, setCurrentPrice] = useState<number>(0);

    // Historical Chart State
    const [chartData, setChartData] = useState<{ time: number, open: number, high: number, low: number, close: number }[]>([]);
    const [isLoadingChart, setIsLoadingChart] = useState(true);

    // WebSocket Effects
    useEffect(() => {
        // Reset states when changing assets
        setBids([]);
        setAsks([]);
        setCurrentPrice(0);
        setIsLoadingChart(true);
        setChartData([]);

        const symbolLower = selectedAsset.binance.toLowerCase();

        // 0. Fetch Historical K-lines (1h interval)
        fetch(`https://api.binance.com/api/v3/klines?symbol=${selectedAsset.binance}&interval=1h&limit=100`)
            .then(res => res.json())
            .then(data => {
                const formattedData = data.map((d: any) => ({
                    time: Math.floor(d[0] / 1000), // Unix timestamp in seconds for lightweight-charts
                    open: parseFloat(d[1]),
                    high: parseFloat(d[2]),
                    low: parseFloat(d[3]),
                    close: parseFloat(d[4]),
                }));
                // Ensure data is sorted by time ascending
                formattedData.sort((a: any, b: any) => a.time - b.time);
                setChartData(formattedData);
                setIsLoadingChart(false);
            })
            .catch(err => {
                console.error("Failed to fetch historical k-lines", err);
                setIsLoadingChart(false);
            });

        // 1. Orderbook Depth Stream (20 levels, 100ms updates)
        const depthWs = new WebSocket(`wss://stream.binance.com:9443/ws/${symbolLower}@depth20@100ms`);
        depthWs.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.bids && data.asks) {
                    // Parse Binance format [price, quantity]
                    const parsedBids = data.bids.map((b: string[]) => ({
                        price: parseFloat(b[0]),
                        amount: parseFloat(b[1]),
                        total: parseFloat(b[0]) * parseFloat(b[1])
                    }));
                    const parsedAsks = data.asks.map((a: string[]) => ({
                        price: parseFloat(a[0]),
                        amount: parseFloat(a[1]),
                        total: parseFloat(a[0]) * parseFloat(a[1])
                    }));
                    setBids(parsedBids);
                    setAsks(parsedAsks);
                }
            } catch (err) {
                console.error("Depth WS Parse Error", err);
            }
        };

        // 2. Ticker Stream (for exact Current Price)
        const tickerWs = new WebSocket(`wss://stream.binance.com:9443/ws/${symbolLower}@ticker`);
        tickerWs.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.c) {
                    setCurrentPrice(parseFloat(data.c));
                }
            } catch (err) {
                console.error("Ticker WS Parse Error", err);
            }
        };

        // Cleanup connections
        return () => {
            depthWs.close();
            tickerWs.close();
        };
    }, [selectedAsset]);

    return (
        <div className="px-3 sm:px-6 flex-1 flex flex-col overflow-hidden pb-12">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col overflow-hidden relative font-mono text-white selection:bg-white/30">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mt-6 px-6 relative z-10 border-b border-white/10">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter text-heading-32">
                            Asset Deep Dive
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 text-white/50 text-[10px] font-mono uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-none bg-green-500 animate-pulse"></span>
                            <span>Live Data from Binance API</span>
                            <span className="mx-2 hidden sm:inline">•</span>
                            <span className="border border-white/10 px-2 py-0.5 rounded-none bg-white/5">
                                HISTORICAL: 1H K-Lines (REST)
                            </span>
                            <span className="border border-white/10 px-2 py-0.5 rounded-none bg-white/5">
                                DEPTH: 100MS (WebSocket)
                            </span>
                        </div>
                    </div>
                </header>

                {/* Top Striper Tabs */}
                <div className="w-full border-b border-white/10 flex overflow-x-auto no-scrollbar bg-black z-10">
                    {SUPPORTED_ASSETS.map((asset) => (
                        <button
                            key={asset.binance}
                            onClick={() => setSelectedAsset(asset)}
                            className={`px-6 py-4 border-r border-white/10 uppercase font-mono tracking-widest text-xs transition-colors whitespace-nowrap
                                ${selectedAsset.binance === asset.binance
                                    ? 'bg-white/10 text-white font-bold'
                                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                                }
                            `}
                        >
                            <span className="opacity-50 mr-2">{asset.name}</span>
                            {asset.symbol}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full grid grid-cols-12 gap-px bg-white/10">

                        {/* Left Column: Historical Charts (8 cols) */}
                        <div className="col-span-8 bg-black flex flex-col overflow-hidden relative">
                            {/* Chart Header & Toggles */}
                            <div className="p-4 border-b border-white/10 justify-between items-center hidden sm:flex">
                                <div>
                                    <h1 className="text-2xl font-pixel">{selectedAsset.symbol}/USDT</h1>
                                    <span className="text-white/40 text-xs">Binance Spot Data</span>
                                </div>
                                <div className="flex bg-white/5 border border-white/10 p-1">
                                    <button
                                        onClick={() => setChartType('tradingview')}
                                        className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider ${chartType === 'tradingview' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                                    >
                                        TradingView
                                    </button>
                                    <button
                                        onClick={() => setChartType('bklit')}
                                        className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider ${chartType === 'bklit' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                                    >
                                        Bklit UI
                                    </button>
                                </div>
                            </div>

                            {/* Chart Area */}
                            <div className="flex-1 flex flex-col p-4 w-full relative">
                                {isLoadingChart ? (
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="animate-pulse text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">
                                            Loading Historical Data...
                                        </div>
                                    </div>
                                ) : chartData.length > 0 ? (
                                    <div className="flex-1 w-full flex items-center justify-center">
                                        {chartType === 'tradingview' ? (
                                            <BinanceTradingViewChart data={chartData} />
                                        ) : (
                                            <BinanceRechartsArea data={chartData} color={chartData[chartData.length - 1].close >= chartData[0].close ? '#22c55e' : '#ef4444'} />
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-white/40 text-[10px] uppercase tracking-widest">
                                        Failed to load chart data
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Orderbook (4 cols) */}
                        <div className="col-span-4 bg-black flex flex-col overflow-hidden max-h-[600px] overflow-y-auto custom-scrollbar">
                            <OrderbookWidget
                                bids={bids}
                                asks={asks}
                                currentPrice={currentPrice}
                                symbol={selectedAsset.symbol}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
