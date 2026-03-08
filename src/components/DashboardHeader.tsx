import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
}

const DashboardHeader = ({ title, subtitle, searchPlaceholder = "search..." }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder={searchPlaceholder}
            className="pl-9 h-10 w-64 rounded-full bg-card border-border"
          />
        </div>
        <button className="relative p-2 rounded-full bg-card hover:bg-muted transition-colors">
          <Bell size={18} className="text-foreground" />
        </button>
        <Avatar className="h-9 w-9 border-2 border-primary">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">A</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default DashboardHeader;
