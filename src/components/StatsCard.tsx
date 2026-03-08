import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: { value: number; up: boolean };
}

const StatsCard = ({ icon: Icon, label, value, trend }: StatsCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon size={18} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-foreground">{value}</p>
          {trend && (
            <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${trend.up ? "text-success" : "text-destructive"}`}>
              {trend.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
