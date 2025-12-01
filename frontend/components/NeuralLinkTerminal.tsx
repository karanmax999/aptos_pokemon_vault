import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

export interface LogMessage {
    id: string;
    text: string;
    timestamp: string;
    type: "info" | "success" | "warning" | "error";
}

interface NeuralLinkTerminalProps {
    logs: LogMessage[];
}

export function NeuralLinkTerminal({ logs }: NeuralLinkTerminalProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-sm shadow-2xl relative group">
            {/* Header */}
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-500 animate-pulse" />
                <span className="text-slate-400 uppercase tracking-wider text-xs">Neural Link v1.0 // <span className="text-green-500">ONLINE</span></span>
                <div className="ml-auto flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
            </div>

            {/* Logs Area */}
            <div className="p-4 h-64 overflow-y-auto space-y-2 relative bg-black/50">
                {/* Scanline effect overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>

                {logs.length === 0 && (
                    <div className="text-slate-600 italic">Waiting for neural connection...</div>
                )}

                {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                        <span className={`
              ${log.type === 'success' ? 'text-green-400' : ''}
              ${log.type === 'error' ? 'text-red-400' : ''}
              ${log.type === 'warning' ? 'text-yellow-400' : ''}
              ${log.type === 'info' ? 'text-cyan-300' : ''}
            `}>
                            {log.type === 'success' && '> '}
                            {log.text}
                        </span>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
