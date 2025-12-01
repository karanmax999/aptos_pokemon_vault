import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface BondingCurveChartProps {
    currentSupply: number;
}

export function BondingCurveChart({ currentSupply }: BondingCurveChartProps) {
    // Generate data points based on current supply
    // We simulate a bonding curve where Price = 0.001 * Supply^1.5
    const data = Array.from({ length: 20 }, (_, i) => {
        const supply = i * 5;
        return {
            supply,
            price: 0.001 + (0.00005 * Math.pow(supply, 1.8)),
        };
    });

    // Calculate current price for reference line
    const currentPrice = 0.001 + (0.00005 * Math.pow(currentSupply, 1.8));

    return (
        <div className="h-48 w-full mt-4 relative">
            <div className="absolute top-0 left-0 text-xs font-mono text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                Current Price: {currentPrice.toFixed(4)} APT
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="supply"
                        stroke="#475569"
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#d8b4fe' }}
                        labelStyle={{ color: '#94a3b8' }}
                        formatter={(value: number) => [`${value.toFixed(4)} APT`, 'Price']}
                    />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#a855f7"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                    />
                    {currentSupply > 0 && (
                        <ReferenceLine x={currentSupply} stroke="#e879f9" strokeDasharray="3 3" />
                    )}
                </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between text-xs text-slate-500 px-2 mt-1 font-mono">
                <span>Supply: {currentSupply}</span>
                <span>Target: 100</span>
            </div>
        </div>
    );
}
