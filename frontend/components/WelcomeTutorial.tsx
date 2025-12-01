import { useState } from "react";
import { X, Zap, Users, TrendingUp, Sparkles } from "lucide-react";

interface WelcomeTutorialProps {
    onClose: () => void;
}

export function WelcomeTutorial({ onClose }: WelcomeTutorialProps) {
    const [step, setStep] = useState(0);

    const steps = [
        {
            icon: <Sparkles className="w-16 h-16 text-yellow-400" />,
            title: "Welcome to AgentVault!",
            description: "Train your AI Pokémon squad on the Aptos blockchain. Each agent evolves as you interact with them.",
            highlight: "Just like catching Pokémon, but on-chain! 🎮"
        },
        {
            icon: <Users className="w-16 h-16 text-cyan-400" />,
            title: "Build Your Squad",
            description: "Choose from 10 unique agent types - Electric, Water, Fire, and more! Each type has its own personality.",
            highlight: "Recruit agents by clicking the RECRUIT button on any card."
        },
        {
            icon: <TrendingUp className="w-16 h-16 text-green-400" />,
            title: "Evolution System",
            description: "Your agents evolve through tiers as you interact with them:",
            highlight: "Tier 1 → Tier 2 (10 interactions) → Tier 3 (50 interactions)"
        },
        {
            icon: <Zap className="w-16 h-16 text-purple-400" />,
            title: "Launch on CreatorBid",
            description: "Once your squad is trained, launch your agent on CreatorBid to make it tradeable!",
            highlight: "Turn your AI companion into a valuable asset. 🚀"
        }
    ];

    const currentStep = steps[step];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-2xl max-w-lg w-full p-8 shadow-2xl shadow-yellow-500/20 animate-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-8">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all ${i === step ? "w-8 bg-yellow-400" : "w-2 bg-slate-600"
                                }`}
                        />
                    ))}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    {currentStep.icon}
                </div>

                {/* Content */}
                <div className="text-center space-y-4 mb-8">
                    <h2 className="text-3xl font-black text-white">
                        {currentStep.title}
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        {currentStep.description}
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <p className="text-yellow-300 font-semibold">
                            💡 {currentStep.highlight}
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                    {step > 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            Back
                        </button>
                    )}

                    {step < steps.length - 1 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-yellow-500/25"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-green-500/25"
                        >
                            Start Training! 🎮
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
