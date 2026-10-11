import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Users, Car, DollarSign, Eye, MoreVertical, TrendingUp } from "lucide-react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import type { DashboardStats, TripSummary, DriverProfileSummary } from "@/types/api.types";

const rideTypeColors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTrips, setActiveTrips] = useState<TripSummary[]>([]);
  const [pendingDrivers, setPendingDrivers] = useState<DriverProfileSummary[]>([]);
  const [revenue, setRevenue] = useState<{ period: string; commissionEarned: number; bookingCount: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const fetchDashboard = async () => {
    setLoading(true);
    setError("");
    try {
      // Each card loads independently so one failing endpoint doesn't blank the rest.
      const results = await Promise.allSettled([
        api.get("/admin/stats"),
        api.get(`/admin/financials/revenue?from=${thirtyDaysAgo}&to=${today}&groupBy=day`),
        api.get("/admin/rides/trips/active?limit=5"),
        api.get("/admin/drivers/pending"),
      ]);
      const [statsRes, revenueRes, tripsRes, driversRes] = results;
      if (statsRes.status === "fulfilled") setStats(statsRes.value);
      if (revenueRes.status === "fulfilled") {
        const revenueData = revenueRes.value;
        setRevenue(Array.isArray(revenueData) ? revenueData : (revenueData?.data ?? []));
      }
      if (tripsRes.status === "fulfilled") {
        const tripsData = tripsRes.value;
        setActiveTrips(Array.isArray(tripsData) ? tripsData.slice(0, 5) : (tripsData?.data?.slice(0, 5) ?? []));
      }
      if (driversRes.status === "fulfilled") {
        const driversData = driversRes.value;
        setPendingDrivers(Array.isArray(driversData) ? driversData.slice(0, 5) : (driversData?.data?.slice(0, 5) ?? []));
      }
      const failed = results.find((r): r is PromiseRejectedResult => r.status === "rejected");
      if (failed) setError(failed.reason?.message ?? "Some dashboard data failed to load");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  if (loading) {
    return (
      <div>
        <DashboardHeader title="Main Dashboard" subtitle="Dashboard" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Skeleton className="lg:col-span-2 h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  const rideTypeData = [
    { name: "Active Trips", value: stats?.activeTripsCount ?? 0, color: rideTypeColors[0] },
    { name: "Scheduled", value: stats?.scheduledTripsCount ?? 0, color: rideTypeColors[1] },
  ];

  const driverPerformance = [
    { name: "Approved", count: stats?.totalApprovedDrivers ?? 0 },
    { name: "Pending", count: stats?.totalPendingDriverApplications ?? 0 },
    { name: "Total", count: stats?.totalDrivers ?? 0 },
  ];

  return (
    <div>
      <DashboardHeader title="Main Dashboard" subtitle="Dashboard" />

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchDashboard} className="underline text-xs ml-4">Retry</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={UserPlus} label="Total Sign Up" value={stats?.totalUsers?.toLocaleString() ?? "—"} trend={{ value: stats?.newUsersThisWeek ?? 0, up: true }} />
        <StatsCard icon={Users} label="Active Users" value={stats?.totalActiveUsers?.toLocaleString() ?? "—"} />
        <StatsCard icon={Car} label="Total Drivers" value={stats?.totalDrivers?.toLocaleString() ?? "—"} />
        <StatsCard icon={DollarSign} label="Revenue Today" value={stats ? `GHS ${stats.revenueToday?.toLocaleString()}` : "—"} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Revenue (30 Days)</h3>
              <p className="text-sm text-muted-foreground">Commission earned per day</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-success" />
              <span className="text-2xl font-bold text-foreground">
                GHS {stats?.revenueThisMonth?.toLocaleString() ?? "—"}
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenue}>
              <defs>
                <linearGradient id="rideGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="period" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => [`GHS ${v?.toLocaleString()}`, "Commission"]} />
              <Area type="monotone" dataKey="commissionEarned" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#rideGrad)" dot={{ fill: "hsl(var(--primary))", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Trip Status</h3>
          <p className="text-sm text-muted-foreground mb-4">Active vs Scheduled</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={rideTypeData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                {rideTypeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {rideTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-semibold text-foreground ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Booking Volume</h3>
          <p className="text-sm text-muted-foreground mb-4">Daily bookings (30 days)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenue} barGap={4}>
              <XAxis dataKey="period" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="bookingCount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Driver Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">Approval breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={driverPerformance} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={60} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Active Trips</h3>
            <button onClick={() => navigate("/rides")} className="text-sm text-primary font-medium hover:underline">See all</button>
          </div>
          {activeTrips.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No active trips right now.</p>
          ) : (
            <div className="space-y-3">
              {activeTrips.map((trip, i) => (
                <div key={trip.id ?? i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {trip.driver?.firstName?.[0] ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-muted-foreground">{trip.originCity} → {trip.destinationCity}</p>
                      <p className="text-sm font-medium text-foreground">{trip.driver?.firstName} {trip.driver?.lastName}</p>
                    </div>
                    <span className="text-sm text-foreground ml-2">GHS {trip.pricePerSeat}</span>
                  </div>
                  <Button size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-8" onClick={() => navigate("/rides")}>
                    <Eye size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Verify Account Details</h3>
            <button
              onClick={() => navigate("/admin/drivers/pending")}
              className="text-sm text-primary font-medium hover:underline"
            >
              See all
            </button>
          </div>
          {pendingDrivers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No pending applications.</p>
          ) : (
            <div className="space-y-3">
              {pendingDrivers.map((d, i) => (
                <div key={d.id ?? i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {d.user?.firstName?.[0] ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{d.user?.firstName} {d.user?.lastName}</p>
                      <p className="text-xs text-muted-foreground">Driver</p>
                    </div>
                  </div>
                  <button
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => navigate(`/admin/drivers/${d.id}`)}
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
