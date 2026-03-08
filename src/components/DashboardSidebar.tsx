import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Car,
  Wallet,
  FileText,
  Heart,
  Headphones,
  Shield,
  DollarSign,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "User", icon: Users, path: "/users" },
  { label: "Driver", icon: UserCircle, path: "/drivers" },
  { label: "Ride", icon: Car, path: "/rides" },
  { label: "Finance Management", icon: Wallet, path: "/finance" },
  { label: "Document", icon: FileText, path: "/documents" },
  { label: "Miz Miles", icon: Heart, path: "/miz-miles" },
  { label: "Pricing", icon: DollarSign, path: "/pricing" },
  { label: "Support & Communication", icon: Headphones, path: "/support" },
  { label: "Security & Compliance", icon: Shield, path: "/security" },
  { label: "Email Templates", icon: FileText, path: "/email-templates" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-56 min-h-screen bg-sidebar flex flex-col shrink-0">
      <div className="px-6 py-6">
        <p className="text-sidebar-foreground text-lg font-bold">
          Hello, <span className="text-accent">Admin</span>
        </p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-active text-sidebar-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground"
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-sidebar-hover transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
