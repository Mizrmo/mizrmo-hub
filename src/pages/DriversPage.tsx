import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, Car, Banknote, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorAlert } from "@/components/ui/error-alert";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/ui/status-badge";
import api from "@/lib/api";
import type { DriverProfileSummary, DashboardStats } from "@/types/api.types";

const DriversPage = () => {
  const [drivers, setDrivers] = useState<DriverProfileSummary[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const fetchDrivers = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        ...(statusFilter && { status: statusFilter }),
      });
      const [driversData, statsData] = await Promise.all([
        api.get(`/admin/drivers?${params}`),
        stats ? Promise.resolve(null) : api.get("/admin/stats"),
      ]);
      const list = Array.isArray(driversData) ? driversData : (driversData?.data ?? []);
      setDrivers(list);
      setTotalPages(driversData?.meta?.totalPages ?? 1);
      if (statsData) setStats(statsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDrivers(); }, [page, statusFilter]);

  return (
    <div>
      <DashboardHeader title="Driver Management" subtitle="Dashboard > Drivers" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} label="Total Drivers" value={stats?.totalDrivers?.toLocaleString() ?? "—"} />
        <StatsCard icon={UserCheck} label="Approved" value={stats?.totalApprovedDrivers?.toLocaleString() ?? "—"} />
        <StatsCard icon={Car} label="Active Trips" value={stats?.activeTripsCount?.toLocaleString() ?? "—"} />
        <StatsCard icon={Banknote} label="Pending Review" value={stats?.totalPendingDriverApplications?.toLocaleString() ?? "—"} />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-muted-foreground">Filter by status</span>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === "ALL" ? "" : v); setPage(1); }}>
          <SelectTrigger className="w-44 h-9 rounded-lg border-border text-sm">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING_REVIEW">Pending Review</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
            <SelectItem value="SUSPENDED">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <LoadingSpinner message="Loading drivers..." />
        ) : error ? (
          <ErrorAlert message={error} onRetry={fetchDrivers} />
        ) : drivers.length === 0 ? (
          <EmptyState title="No drivers found" description="Try changing the status filter." />
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Vehicle</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Plate</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">License</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d) => (
                  <tr key={d.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {d.user?.firstName?.[0]}{d.user?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{d.user?.firstName} {d.user?.lastName}</p>
                          <p className="text-xs text-muted-foreground">{d.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground">
                      {d.vehicle ? `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}` : "—"}
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{d.vehicle?.licensePlate ?? "—"}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{d.licenseNumber}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={d.approvalStatus} />
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => navigate(`/admin/drivers/${d.id}`)}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-4 flex items-center justify-between border-t border-border">
              <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
              <div className="flex items-center gap-2">
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-40">
                  <ChevronLeft size={18} />
                </button>
                <span className="w-8 h-8 rounded-full text-sm font-medium bg-primary text-primary-foreground flex items-center justify-center">{page}</span>
                <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-40">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DriversPage;
