import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: "cyan" | "green" | "amber" | "red" | "primary";
  onClick?: () => void;
}

const colorMap = {
  cyan: "from-cyan-500 to-blue-500",
  green: "from-emerald-500 to-green-400",
  amber: "from-amber-500 to-yellow-400",
  red: "from-rose-500 to-red-400",
  primary: "from-indigo-500 to-purple-500",
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "primary",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl shadow-lg text-white cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${colorMap[color]} p-6`}
    >
      {/* Faint background icon */}
      <div className="absolute right-4 top-4 opacity-20">
        <Icon className="w-16 h-16" />
      </div>

      <div className="relative z-10">
        <h3 className="text-sm font-medium text-white/80">{title}</h3>
        <h2 className="text-4xl font-bold mt-1 mb-2">{value}</h2>

        {subtitle && <p className="text-sm text-white/70 mb-4">{subtitle}</p>}

        <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all">
          More info →
        </button>
      </div>
    </div>
  );
};

export default StatCard;
