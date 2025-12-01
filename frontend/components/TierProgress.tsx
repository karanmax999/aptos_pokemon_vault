import { TrendingUp } from "lucide-react";

interface TierProgressProps {
    currentTier: number;
    totalInteractions: number;
}

export function TierProgress({ currentTier, totalInteractions }: TierProgressProps) {
    const tierThresholds = [0, 10, 50];
    const tierNames = ["Rookie", "Veteran", "Master"];

    const nextTier = currentTier < 3 ? currentTier + 1 : 3;
    const nextThreshold = tierThresholds[nextTier - 1] || 50;
    const prevThreshold = tierThresholds[currentTier - 1] || 0;

    const progress = currentTier === 3
        ? 100
        : ((totalInteractions - prevThreshold) / (nextThreshold - prevThreshold)) * 100;

    const interactionsNeeded = currentTier === 3 ? 0 : nextThreshold - totalInteractions;

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-semibold text-slate-300">
                        Evolution Progress
                    </span>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                    {tierNames[currentTier - 1]}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="relative">
                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500 relative"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                </div>

                {/* Tier Markers */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1">
                    {[1, 2, 3].map((tier) => (
                        <div
                            key={tier}
                            className={`w-1 h-full ${tier <= currentTier ? "bg-yellow-400" : "bg-slate-600"
                                } rounded-full`}
                        />
                    ))}
                </div>
            </div>

            {/* Status Text */}
            <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">
                    {totalInteractions} / {nextThreshold} interactions
                </span>
                {currentTier < 3 && (
                    <span className="text-purple-400 font-semibold">
                        {interactionsNeeded} to Tier {nextTier}!
                    </span>
                )}
                {currentTier === 3 && (
                    <span className="text-yellow-400 font-semibold flex items-center gap-1">
                        ⭐ MAX LEVEL
                    </span>
                )}
            </div>
        </div>
    );
}
