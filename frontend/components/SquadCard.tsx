import { FC } from "react";
import { Zap, Droplet, Flame, Mountain, Wind, Shield, Heart, Eye, Lock, Cpu } from "lucide-react";

interface SquadCardProps {
  squad: {
    name: string;
    label: string;
    type: string;
  };
  count: number;
  onClick: () => void;
}

const squadIcons: Record<string, any> = {
  electric: Zap,
  water: Droplet,
  fire: Flame,
  earth: Mountain,
  air: Wind,
  tank: Shield,
  support: Heart,
  scout: Eye,
  guardian: Lock,
  cyber: Cpu,
};

const squadColors: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  electric: {
    bg: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/50 hover:border-yellow-400",
    glow: "shadow-yellow-500/25 hover:shadow-yellow-400/40",
    text: "text-yellow-400"
  },
  water: {
    bg: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/50 hover:border-blue-400",
    glow: "shadow-blue-500/25 hover:shadow-blue-400/40",
    text: "text-blue-400"
  },
  fire: {
    bg: "from-red-500/20 to-orange-500/20",
    border: "border-red-500/50 hover:border-red-400",
    glow: "shadow-red-500/25 hover:shadow-red-400/40",
    text: "text-red-400"
  },
  earth: {
    bg: "from-green-600/20 to-emerald-600/20",
    border: "border-green-600/50 hover:border-green-500",
    glow: "shadow-green-600/25 hover:shadow-green-500/40",
    text: "text-green-500"
  },
  air: {
    bg: "from-sky-400/20 to-indigo-400/20",
    border: "border-sky-400/50 hover:border-sky-300",
    glow: "shadow-sky-400/25 hover:shadow-sky-300/40",
    text: "text-sky-300"
  },
  tank: {
    bg: "from-slate-500/20 to-slate-600/20",
    border: "border-slate-500/50 hover:border-slate-400",
    glow: "shadow-slate-500/25 hover:shadow-slate-400/40",
    text: "text-slate-400"
  },
  support: {
    bg: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/50 hover:border-pink-400",
    glow: "shadow-pink-500/25 hover:shadow-pink-400/40",
    text: "text-pink-400"
  },
  scout: {
    bg: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/50 hover:border-amber-400",
    glow: "shadow-amber-500/25 hover:shadow-amber-400/40",
    text: "text-amber-400"
  },
  guardian: {
    bg: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/50 hover:border-indigo-400",
    glow: "shadow-indigo-500/25 hover:shadow-indigo-400/40",
    text: "text-indigo-400"
  },
  cyber: {
    bg: "from-cyan-500/20 to-purple-500/20",
    border: "border-cyan-500/50 hover:border-cyan-400",
    glow: "shadow-cyan-500/25 hover:shadow-cyan-400/40",
    text: "text-cyan-400"
  },
};

const SquadCard: FC<SquadCardProps> = ({ squad, onClick, count }) => {
  const Icon = squadIcons[squad.type] || Cpu;
  const colors = squadColors[squad.type] || squadColors.cyber;

  return (
    <div
      className={`
        relative group
        bg-gradient-to-br ${colors.bg}
        border-2 ${colors.border}
        rounded-xl p-6
        transition-all duration-300
        hover:scale-105 hover:-translate-y-1
        shadow-lg ${colors.glow}
        cursor-pointer
        overflow-hidden
      `}
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">

        {/* Icon with Pulse Animation */}
        <div className={`
          ${colors.text}
          group-hover:animate-pulse
          transition-transform duration-300
          group-hover:scale-110
        `}>
          <Icon className="w-12 h-12" strokeWidth={2.5} />
        </div>

        {/* Label */}
        <h3 className="text-white font-bold text-lg text-center">
          {squad.label}
        </h3>

        {/* Count Badge */}
        <div className={`
          ${colors.text}
          bg-slate-900/80 
          px-4 py-2 
          rounded-full 
          font-mono text-2xl font-black
          min-w-[60px] text-center
          border ${colors.border}
        `}>
          {count}
        </div>

        {/* Recruit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={`
            w-full
            bg-gradient-to-r ${colors.bg}
            border-2 ${colors.border}
            ${colors.text}
            font-bold py-2 px-4 rounded-lg
            transition-all duration-200
            hover:bg-opacity-100
            hover:shadow-lg ${colors.glow}
            active:scale-95
          `}
        >
          RECRUIT
        </button>
      </div>

      {/* Corner Accent */}
      <div className={`absolute top-0 right-0 w-16 h-16 ${colors.text} opacity-10`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="100,0 100,100 0,100" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

export default SquadCard;
