import { useState } from "react";
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
  Mail,
  Menu,
  X,
  Settings,
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
  { label: "Support", icon: Headphones, path: "/support" },
  { label: "Security", icon: Shield, path: "/security" },
  { label: "Email Templates", icon: Mail, path: "/email-templates" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      <div className="px-5 py-5">
        <p className="text-sidebar-foreground text-lg font-bold">
          Hello, <span className="text-accent">Admin</span>
        </p>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-active text-sidebar-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground"
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <button
          onClick={() => handleNav("/")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-sidebar-hover transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-foreground/40" onClick={() => setMobileOpen(false)}>
          <aside
            className="w-60 min-h-screen bg-sidebar flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-3 text-sidebar-foreground/80 hover:text-sidebar-foreground"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 min-h-screen bg-sidebar flex-col shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
};

export default DashboardSidebar;
