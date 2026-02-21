'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BinanceRechartsAreaProps {
    data: { time: number; close: number }[];
    color?: string;
}

export const BinanceRechartsArea: React.FC<BinanceRechartsAreaProps> = ({ data, color = '#3b82f6' }) => {

    // Format the time for the tooltip
    const formatTime = (label: any) => {
        if (typeof label !== 'number') return label;
        const date = new Date(label * 1000);
        return date.toLocaleString();
    };

    // Format the axis time
    const formatAxisTime = (timeInSeconds: number) => {
        const date = new Date(timeInSeconds * 1000);
        return `${date.getHours()}:00`;
    };

    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="time"
                        tickFormatter={formatAxisTime}
                        stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                        minTickGap={30}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                        tickFormatter={(val) => `$${val}`}
                        orientation="right"
                    />
                    <Tooltip
                        labelFormatter={formatTime}
                        contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="close"
                        stroke={color}
                        fillOpacity={1}
                        fill="url(#colorClose)"
                        strokeWidth={2}
                        isAnimationActive={false} // Prevent re-animation on data tick
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
