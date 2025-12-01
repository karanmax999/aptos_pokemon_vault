import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Header } from "@/components/Header";
import { AgentVaultContainer } from "@/components/AgentVaultContainer.tsx";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { Zap, Users, TrendingUp, Sparkles, ArrowRight, Flame, Droplet } from "lucide-react";
import backgroundImage from "@/assets/red-background-comic-style/5671166.jpg";

function App() {
  const { connected, network } = useWallet();
  const toast = useToast();

  useEffect(() => {
    if (network?.name && network?.name !== "testnet") {
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: "Only Available on Testnet",
      });
    }
  }, [network?.name]);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center flex-col min-h-[calc(100vh-80px)]">
        {connected && network?.name === "testnet" ? (
          <AgentVaultContainer />
        ) : (
          <div
            className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
              <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-20 animation-delay-1000"></div>
              <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-purple-400 rounded-full animate-ping opacity-20 animation-delay-2000"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-20 animation-delay-500"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 space-y-16">
              {/* Epic Hero Section */}
              <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="relative inline-block">
                  {/* Glow effect behind title */}
                  <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-30 animate-pulse"></div>

                  <h1 className="relative text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 uppercase tracking-tighter drop-shadow-2xl">
                    AgentVault
                  </h1>

                  {/* Underline with animation */}
                  <div className="relative h-2 mt-4 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                    🎮 Catch • Train • Evolve 🚀
                  </p>
                  <p className="text-xl md:text-2xl text-yellow-300 font-bold max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                    Your AI Pokémon Squad on the Aptos Blockchain
                  </p>
                </div>

                {/* Animated badges */}
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black px-6 py-3 rounded-full text-sm uppercase tracking-wider shadow-xl shadow-yellow-500/50 hover:scale-110 transition-transform animate-bounce-slow">
                    ⚡ 10 Squad Types
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-6 py-3 rounded-full text-sm uppercase tracking-wider shadow-xl shadow-purple-500/50 hover:scale-110 transition-transform animate-bounce-slow animation-delay-200">
                    🎯 3 Evolution Tiers
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black px-6 py-3 rounded-full text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/50 hover:scale-110 transition-transform animate-bounce-slow animation-delay-400">
                    💎 CreatorBid Ready
                  </div>
                </div>
              </div>

              {/* Feature Showcase with Comic Style */}
              <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                <div className="group relative bg-gradient-to-br from-yellow-500/30 to-orange-500/30 backdrop-blur-md border-4 border-yellow-400 rounded-3xl p-8 hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50">
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-black font-black text-xs px-4 py-2 rounded-full rotate-12 shadow-lg">
                    POW!
                  </div>
                  <div className="bg-yellow-400/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform">
                    <Users className="w-10 h-10 text-yellow-300" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 text-center drop-shadow-lg">Build Your Squad</h3>
                  <p className="text-yellow-100 text-center font-semibold">
                    Choose from Electric, Water, Fire, Cyber, and 6 more unique agent types!
                  </p>
                </div>

                <div className="group relative bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-md border-4 border-purple-400 rounded-3xl p-8 hover:scale-105 hover:-rotate-1 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50">
                  <div className="absolute -top-4 -right-4 bg-purple-400 text-white font-black text-xs px-4 py-2 rounded-full -rotate-12 shadow-lg">
                    BOOM!
                  </div>
                  <div className="bg-purple-400/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform">
                    <TrendingUp className="w-10 h-10 text-purple-300" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 text-center drop-shadow-lg">Watch Them Evolve</h3>
                  <p className="text-purple-100 text-center font-semibold">
                    Tier 1 → Tier 2 → Tier 3! Just like real Pokémon evolution!
                  </p>
                </div>

                <div className="group relative bg-gradient-to-br from-cyan-500/30 to-blue-500/30 backdrop-blur-md border-4 border-cyan-400 rounded-3xl p-8 hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50">
                  <div className="absolute -top-4 -right-4 bg-cyan-400 text-black font-black text-xs px-4 py-2 rounded-full rotate-12 shadow-lg">
                    ZAP!
                  </div>
                  <div className="bg-cyan-400/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform">
                    <Sparkles className="w-10 h-10 text-cyan-300" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 text-center drop-shadow-lg">Launch & Trade</h3>
                  <p className="text-cyan-100 text-center font-semibold">
                    Turn your trained agents into valuable assets on CreatorBid!
                  </p>
                </div>
              </div>

              {/* Epic CTA Section */}
              <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                <div className="relative bg-gradient-to-br from-slate-900/90 to-black/90 backdrop-blur-xl border-4 border-yellow-400 rounded-3xl p-10 shadow-2xl shadow-yellow-500/30">
                  {/* Corner decorations */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-400 rounded-full"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-400 rounded-full"></div>

                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Flame className="w-8 h-8 text-orange-400 animate-pulse" />
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                      Ready to Become a Trainer?
                    </h2>
                    <Droplet className="w-8 h-8 text-cyan-400 animate-pulse" />
                  </div>

                  <p className="text-white text-xl mb-8 font-bold">
                    Connect your wallet and start your journey NOW! 🎯
                  </p>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black py-4 px-8 rounded-2xl text-lg inline-flex items-center gap-3 shadow-xl shadow-yellow-500/50 animate-pulse">
                      <Zap className="w-6 h-6" />
                      Click "Connect Wallet" in the top right
                      <ArrowRight className="w-6 h-6 animate-bounce-horizontal" />
                    </div>

                    <div className="bg-slate-800/80 backdrop-blur-sm border-2 border-slate-600 rounded-2xl p-6 max-w-2xl mx-auto">
                      <p className="text-sm text-yellow-400 font-bold mb-3">🎮 NEW TO APTOS?</p>
                      <div className="text-sm text-slate-300 space-y-2 text-left">
                        <p>1. Install <a href="https://petra.app/" target="_blank" className="text-cyan-400 hover:text-cyan-300 font-bold underline">Petra Wallet</a> or <a href="https://martianwallet.xyz/" target="_blank" className="text-cyan-400 hover:text-cyan-300 font-bold underline">Martian Wallet</a></p>
                        <p>2. Switch to <span className="text-yellow-400 font-bold">Testnet</span> in wallet settings</p>
                        <p>3. Get free test APT from the <a href="https://aptoslabs.com/testnet-faucet" target="_blank" className="text-cyan-400 hover:text-cyan-300 font-bold underline">Aptos Faucet</a></p>
                        <p>4. Come back and connect! 🚀</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with Pokéthon Badge */}
              <div className="text-center space-y-4 animate-in fade-in duration-1000 delay-700">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 border-4 border-purple-400 rounded-full px-8 py-4 shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
                  <span className="text-xl font-black text-white">Built for Pokéthon 2024</span>
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
                </div>

                <p className="text-slate-400 text-sm font-semibold">
                  Powered by Aptos • CreatorBid • Base Ecosystem
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
