import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, InputViewFunctionData, Network } from "@aptos-labs/ts-sdk";
import { FormEvent, useEffect, useState } from "react";
import SquadCard from "@/components/SquadCard.tsx";
import AddCollectionForm from "@/components/AddCollectionForm.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { MODULE_ADDRESS, squadData } from "@/constants.ts";
import { ArrowRight, Activity, Zap, Users } from "lucide-react";
import { NeuralLinkTerminal, LogMessage } from "@/components/NeuralLinkTerminal.tsx";
import { BondingCurveChart } from "@/components/BondingCurveChart.tsx";
import { WelcomeTutorial } from "@/components/WelcomeTutorial.tsx";
import { TierProgress } from "@/components/TierProgress.tsx";

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

const squadColors: Record<string, string> = {
  electric: "from-yellow-400 to-orange-500",
  water: "from-blue-400 to-cyan-600",
  fire: "from-red-500 to-orange-600",
  earth: "from-emerald-500 to-green-700",
  air: "from-sky-300 to-indigo-400",
  tank: "from-slate-400 to-slate-600",
  support: "from-pink-400 to-rose-500",
  scout: "from-amber-400 to-yellow-600",
  guardian: "from-indigo-500 to-purple-600",
  cyber: "from-cyan-400 to-purple-600",
};

export function AgentVaultContainer() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [agentVault, setAgentVault] = useState<any[] | null>(null);
  const [agentName, setAgentName] = useState("");
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const moduleAddress = MODULE_ADDRESS;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const addLog = (text: string, type: LogMessage["type"] = "info") => {
    const newLog: LogMessage = {
      id: Math.random().toString(36).substring(7),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      type,
    };
    setLogs((prev) => [...prev, newLog]);
  };

  async function getAgentVault() {
    setIsLoading(true);
    const payload: InputViewFunctionData = {
      function: `${moduleAddress}::agent_vault_v2::view_agent_vault`,
      functionArguments: [account?.address],
    };
    try {
      const response = await aptos.view({ payload });
      if (response.length > 0) {
        setAgentVault(response);
        if (logs.length === 0) {
          addLog("Neural link established. Vault data synced.", "success");
          addLog(`Welcome back, Commander. Agent mood is ${response[12]}%.`, "info");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addLog(`Initializing new Agent Vault: ${agentName}...`, "warning");
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::agent_vault_v2::init_agent_vault`,
        functionArguments: [agentName],
        typeArguments: [],
      },
    };
    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      getAgentVault();
      toast({
        title: "Success",
        description: "Agent Vault Initialized!",
      });
      addLog("Agent Vault initialized successfully.", "success");
      addLog("Systems online. Ready for squad recruitment.", "info");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize vault.",
      });
      addLog("Initialization failed. Transaction aborted.", "error");
    }
  }

  async function addSquadMember(type: string) {
    addLog(`Recruiting ${type} unit...`, "warning");
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::agent_vault_v2::add_${type}_member`,
        functionArguments: [],
        typeArguments: [],
      },
    };
    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      getAgentVault();
      toast({
        title: "Recruited!",
        description: `${type} member added to squad.`,
      });
      addLog(`Unit recruited successfully. ${type.toUpperCase()} squad power increased.`, "success");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Recruitment failed.",
      });
      addLog(`Recruitment failed for ${type} unit.`, "error");
    }
  }

  useEffect(() => {
    if (account) {
      getAgentVault();
    } else {
      setLogs([]);
    }
  }, [account]);

  const vaultName = agentVault ? agentVault[0] : "";
  const totalInteractions = agentVault ? agentVault[11] : 0;
  const moodIndex = agentVault ? agentVault[12] : 50;
  const tier = agentVault ? agentVault[13] : 1;

  let dominantSquad = "cyber";
  let maxCount = -1;

  if (agentVault) {
    squadData.forEach((squad, index) => {
      const count = Number(agentVault[index + 1]);
      if (count > maxCount) {
        maxCount = count;
        dominantSquad = squad.type;
      }
    });
  }

  const themeGradient = squadColors[dominantSquad] || squadColors["cyber"];

  return (
    <div className="flex flex-col gap-10 w-full max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${themeGradient} uppercase tracking-tighter transition-all duration-1000`}>
          Agent Vault
        </h1>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <p className="text-slate-400 text-lg">
            Build your on-chain agent squad. Train your AI companion.
          </p>
          {agentVault && (
            <span className="bg-purple-900/50 border border-purple-500/50 text-purple-300 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Tier {tier}
            </span>
          )}
          <button
            onClick={() => setShowTutorial(true)}
            className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-xs font-bold px-3 py-1 rounded hover:bg-yellow-500/30 transition-colors"
          >
            ❓ How to Play
          </button>
        </div>

        {agentVault && maxCount > 0 && (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 text-xs font-mono uppercase tracking-widest animate-in fade-in slide-in-from-top-2`}>
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${themeGradient}`}></span>
            Dominant Signal: <span className="text-white font-bold">{dominantSquad}</span>
          </div>
        )}
      </div>

      {/* Welcome Tutorial Modal */}
      {showTutorial && <WelcomeTutorial onClose={() => setShowTutorial(false)} />}

      {/* Main Content */}
      {isLoading && !agentVault ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 text-xl animate-pulse">Syncing with Aptos Chain...</p>
        </div>
      ) : agentVault ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Squad Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Users className="text-cyan-400" />
                Active Squad
              </h2>
              <span className="bg-cyan-900/50 text-cyan-300 px-4 py-1 rounded-full font-mono">
                {vaultName}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {squadData.map((squad, index) => (
                <SquadCard
                  key={squad.name}
                  squad={squad}
                  count={Number(agentVault[index + 1])}
                  onClick={() => addSquadMember(squad.type)}
                />
              ))}
            </div>
          </div>

          {/* Right: Agent Status & CreatorBid */}
          <div className="space-y-6">
            <NeuralLinkTerminal logs={logs} />

            {/* Status Panel */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="text-green-400" />
                Agent Status <span className="ml-auto text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">Lv. {tier}</span>
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm text-slate-400 mb-1">
                    <span>Mood Index</span>
                    <span>{moodIndex}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${moodIndex}%` }}
                    ></div>
                  </div>
                </div>

                <TierProgress currentTier={tier} totalInteractions={totalInteractions} />

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-mono text-white">{totalInteractions}</div>
                    <div className="text-xs text-slate-500 uppercase">Interactions</div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-mono text-white">{agentVault.length - 4}</div>
                    <div className="text-xs text-slate-500 uppercase">Archetypes</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-300 italic">
                    "{moodIndex > 75 ? "Systems optimal. Ready for deployment." : "Awaiting further squad reinforcement."}"
                  </p>
                </div>
              </div>
            </div>

            {/* CreatorBid Section */}
            <div className="bg-gradient-to-br from-purple-900/50 to-slate-900 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-24 h-24 text-purple-500" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Launch on CreatorBid</h3>
              <p className="text-slate-300 text-sm mb-4">
                Turn this Agent Vault into a tradeable AI asset. Holders get access to exclusive squad missions.
              </p>

              <BondingCurveChart currentSupply={totalInteractions} />

              <button className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/25">
                Mint Agent Keys <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Initialize Agent</h2>
          <AddCollectionForm
            handleSubmit={handleSubmit}
            collectionName={agentName}
            setCollectionName={setAgentName}
          />
        </div>
      )}
    </div>
  );
}
