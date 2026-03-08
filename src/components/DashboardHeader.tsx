import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Moon, Sun, X, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  onExport?: () => void;
}

// Mock search data
const searchIndex = [
  { label: "Daniel Asante", type: "User", path: "/users/1" },
  { label: "Kwame Mensah", type: "Driver", path: "/drivers" },
  { label: "Lydia Aliyu", type: "User", path: "/users/2" },
  { label: "Tema → Kumasi", type: "Ride", path: "/rides" },
  { label: "Accra → Cape Coast", type: "Ride", path: "/rides" },
  { label: "Finance Management", type: "Page", path: "/finance" },
  { label: "Miz Miles", type: "Page", path: "/miz-miles" },
  { label: "Pricing", type: "Page", path: "/pricing" },
];

const notifications = [
  { id: 1, text: "New driver signup: Kofi Boateng", time: "2m ago", unread: true },
  { id: 2, text: "Complaint #1042 escalated", time: "15m ago", unread: true },
  { id: 3, text: "Payment failed for ride #8821", time: "1h ago", unread: true },
  { id: 4, text: "Driver Kwame Mensah went offline", time: "2h ago", unread: false },
  { id: 5, text: "Weekly report is ready", time: "5h ago", unread: false },
];

const DashboardHeader = ({ title, subtitle, searchPlaceholder = "Search users, drivers, rides...", onExport }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const results = query.length > 0
    ? searchIndex.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div ref={searchRef} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => query.length > 0 && setSearchOpen(true)}
            className="pl-9 h-10 w-48 sm:w-64 rounded-full bg-card border-border"
          />
          {query && (
            <button onClick={() => { setQuery(""); setSearchOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
          {searchOpen && results.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              {results.map((r, i) => (
                <button
                  key={i}
                  onClick={() => { navigate(r.path); setQuery(""); setSearchOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors text-left"
                >
                  <span className="text-sm text-foreground">{r.label}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{r.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export */}
        {onExport && (
          <button onClick={onExport} className="p-2 rounded-full bg-card hover:bg-muted transition-colors border border-border" title="Export CSV">
            <Download size={18} className="text-foreground" />
          </button>
        )}

        {/* Dark Mode Toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-full bg-card hover:bg-muted transition-colors border border-border" title="Toggle theme">
          {theme === "dark" ? <Sun size={18} className="text-foreground" /> : <Moon size={18} className="text-foreground" />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-full bg-card hover:bg-muted transition-colors border border-border">
            <Bell size={18} className="text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {notifications.filter((n) => n.unread).length}
            </span>
          </button>
          {notifOpen && (
            <div className="absolute top-12 right-0 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h4 className="font-semibold text-sm text-foreground">Notifications</h4>
                <button className="text-xs text-primary font-medium">Mark all read</button>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className={`px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0 ${n.unread ? "bg-primary/5" : ""}`}>
                  <div className="flex items-start gap-2">
                    {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                    <div className={!n.unread ? "ml-4" : ""}>
                      <p className="text-sm text-foreground">{n.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="px-4 py-2 text-center">
                <button className="text-xs text-primary font-medium">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <Avatar className="h-9 w-9 border-2 border-primary">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">A</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default DashboardHeader;
