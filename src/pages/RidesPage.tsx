import { useState, useEffect, useRef } from "react";
import { Car, MapPin, Clock, DollarSign, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorAlert } from "@/components/ui/error-alert";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/ui/status-badge";
import api from "@/lib/api";
import type { TripSummary, DashboardStats } from "@/types/api.types";

const RidesPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeRides, setActiveRides] = useState<TripSummary[]>([]);
  const [ridesHistory, setRidesHistory] = useState<TripSummary[]>([]);
  const [loadingActive, setLoadingActive] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [errorActive, setErrorActive] = useState("");
  const [errorHistory, setErrorHistory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchActive = async () => {
    try {
      const data = await api.get("/admin/rides/trips/active");
      setActiveRides(Array.isArray(data) ? data : (data?.data ?? []));
    } catch (err: any) {
      setErrorActive(err.message);
    } finally {
      setLoadingActive(false);
    }
  };

  const fetchHistory = async () => {
    setLoadingHistory(true);
    setErrorHistory("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        ...(statusFilter && { status: statusFilter }),
      });
      const [histData, statsData] = await Promise.all([
        api.get(`/admin/rides/trips?${params}`),
        stats ? Promise.resolve(null) : api.get("/admin/stats"),
      ]);
      setRidesHistory(histData.data ?? histData);
      setTotalPages(histData.meta?.totalPages ?? 1);
      if (statsData) setStats(statsData);
    } catch (err: any) {
      setErrorHistory(err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchActive();
    intervalRef.current = setInterval(fetchActive, 30000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => { fetchHistory(); }, [page, statusFilter]);

  return (
    <div>
      <DashboardHeader title="Ride Management" subtitle="Dashboard > Rides" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Car} label="Active Trips" value={stats?.activeTripsCount?.toLocaleString() ?? String(activeRides.length)} />
        <StatsCard icon={MapPin} label="Scheduled" value={stats?.scheduledTripsCount?.toLocaleString() ?? "—"} />
        <StatsCard icon={Clock} label="Open Tickets" value={stats?.totalOpenSupportTickets?.toLocaleString() ?? "—"} />
        <StatsCard icon={DollarSign} label="Revenue Today" value={stats ? `GHS ${stats.revenueToday?.toLocaleString()}` : "—"} />
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0">
          <TabsTrigger
            value="active"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
          >
            Active Rides
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
          >
            Ride History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {loadingActive ? (
            <LoadingSpinner message="Loading active trips..." />
          ) : errorActive ? (
            <ErrorAlert message={errorActive} onRetry={fetchActive} />
          ) : activeRides.length === 0 ? (
            <EmptyState title="No active trips" description="All clear — no rides in progress right now." />
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Trip ID</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Route</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Departure</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Fare</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Seats</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRides.map((r) => (
                    <tr key={r.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-3 text-xs font-mono text-primary">{r.id.slice(0, 8)}…</td>
                      <td className="px-6 py-3 text-sm text-foreground">{r.driver?.firstName} {r.driver?.lastName}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{r.originCity} → {r.destinationCity}</td>
                      <td className="px-6 py-3 text-sm text-foreground">{new Date(r.departureDate).toLocaleString()}</td>
                      <td className="px-6 py-3 text-sm font-medium text-foreground">GHS {r.pricePerSeat}</td>
                      <td className="px-6 py-3 text-sm text-foreground">{r.confirmedBookingCount}/{r.totalSeats}</td>
                      <td className="px-6 py-3"><StatusBadge status={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <div className="flex items-center gap-4 mb-4">
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === "ALL" ? "" : v); setPage(1); }}>
              <SelectTrigger className="w-44 h-9 rounded-lg border-border text-sm">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loadingHistory ? (
            <LoadingSpinner message="Loading ride history..." />
          ) : errorHistory ? (
            <ErrorAlert message={errorHistory} onRetry={fetchHistory} />
          ) : ridesHistory.length === 0 ? (
            <EmptyState title="No rides found" description="Try changing the status filter." />
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Trip ID</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Route</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Date</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Fare</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ridesHistory.map((r) => (
                    <tr key={r.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-3 text-xs font-mono text-primary">{r.id.slice(0, 8)}…</td>
                      <td className="px-6 py-3 text-sm text-foreground">{r.driver?.firstName} {r.driver?.lastName}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{r.originCity} → {r.destinationCity}</td>
                      <td className="px-6 py-3 text-sm text-foreground">{new Date(r.departureDate).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-sm font-medium text-foreground">GHS {r.pricePerSeat}</td>
                      <td className="px-6 py-3"><StatusBadge status={r.status} /></td>
                      <td className="px-6 py-3">
                        <button className="text-primary hover:text-primary/80"><Eye size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-6 py-4 flex items-center justify-between border-t border-border">
                <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
                <div className="flex items-center gap-2">
                  <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-40"><ChevronLeft size={18} /></button>
                  <span className="w-8 h-8 rounded-full text-sm font-medium bg-primary text-primary-foreground flex items-center justify-center">{page}</span>
                  <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-40"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RidesPage;
