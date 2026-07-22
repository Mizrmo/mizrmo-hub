import { useState, useEffect } from "react";
import { MessageSquare, CheckCircle, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorAlert } from "@/components/ui/error-alert";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/ui/status-badge";
import api from "@/lib/api";
import type { SupportTicket, DashboardStats } from "@/types/api.types";

const SupportPage = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        ...(statusFilter && { status: statusFilter }),
      });
      const [ticketsData, statsData] = await Promise.all([
        api.get(`/admin/support/tickets?${params}`),
        stats ? Promise.resolve(null) : api.get("/admin/stats"),
      ]);
      setTickets(ticketsData.data ?? ticketsData);
      setTotalPages(ticketsData.meta?.totalPages ?? 1);
      if (statsData) setStats(statsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, [page, statusFilter]);

  return (
    <div>
      <DashboardHeader title="Support & Communication" subtitle="Support & Communication" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard icon={MessageSquare} label="Open Tickets" value={stats?.totalOpenSupportTickets?.toLocaleString() ?? "—"} />
        <StatsCard icon={CheckCircle} label="Unassigned" value={stats?.totalUnassignedTickets?.toLocaleString() ?? "—"} />
        <StatsCard icon={Clock} label="Urgent" value={stats?.totalUrgentSupportTickets?.toLocaleString() ?? "—"} />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === "ALL" ? "" : v); setPage(1); }}>
          <SelectTrigger className="w-40 h-9 rounded-lg border-border text-sm">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <LoadingSpinner message="Loading tickets..." />
        ) : error ? (
          <ErrorAlert message={error} onRetry={fetchTickets} />
        ) : tickets.length === 0 ? (
          <EmptyState title="No tickets found" description="Try changing the status filter." />
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">User</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Category</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Subject</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Submitted</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Priority</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((r) => (
                  <tr key={r.id} className={`border-b border-border hover:bg-muted/50 transition-colors ${r.isOverdue ? "bg-destructive/5" : ""}`}>
                    <td className="px-6 py-3 text-sm text-foreground">
                      {r.user?.firstName} {r.user?.lastName}
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground">{r.category}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground max-w-[200px] truncate">{r.subject}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3"><StatusBadge status={r.priority} size="sm" /></td>
                    <td className="px-6 py-3"><StatusBadge status={r.status} size="sm" /></td>
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
          </>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
