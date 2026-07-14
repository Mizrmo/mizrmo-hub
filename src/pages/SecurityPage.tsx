import { useState, useEffect } from "react";
import { MessageSquare, CheckCircle, Clock, ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import api from "@/lib/api";
import { toast } from "sonner";
import type { Dispute, DisputeListResponse, DisputeStatus } from "@/types/api.types";

const statusStyle = (status: DisputeStatus) => {
  switch (status) {
    case "RESOLVED":
      return "bg-success/10 text-success border-0 hover:bg-success/20";
    case "DISMISSED":
      return "bg-muted text-muted-foreground border-0";
    case "UNDER_REVIEW":
      return "bg-warning/10 text-warning border-0 hover:bg-warning/20";
    default:
      return "bg-destructive/10 text-destructive border-0 hover:bg-destructive/20";
  }
};

const PAGE_SIZE = 10;

const SecurityPage = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState<Dispute | null>(null);
  const [resolutionNote, setResolutionNote] = useState("");
  const [isResolving, setIsResolving] = useState(false);

  const fetchDisputes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(PAGE_SIZE),
      });
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }
      const data: DisputeListResponse = await api.get(`/disputes?${params.toString()}`);
      setDisputes(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch disputes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const resolvedCount = disputes.filter((d) => d.status === "RESOLVED").length;
  const pendingCount = disputes.filter((d) => d.status === "OPEN" || d.status === "UNDER_REVIEW").length;

  const handleResolve = async () => {
    if (!resolving) return;
    try {
      setIsResolving(true);
      await api.patch(`/disputes/${resolving.id}/resolve`, {
        resolution: resolutionNote,
        status: "RESOLVED",
      });
      toast.success("Dispute resolved");
      setResolving(null);
      setResolutionNote("");
      fetchDisputes();
    } catch (error: any) {
      toast.error(error.message || "Failed to resolve dispute");
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div>
      <DashboardHeader title="Security & Compliance" subtitle="Dashboard > Security & Compliance" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard icon={MessageSquare} label="Total Complaints" value={total} />
        <StatsCard icon={CheckCircle} label="Resolved (this page)" value={resolvedCount} />
        <StatsCard icon={Clock} label="Open / Under Review (this page)" value={pendingCount} />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-muted-foreground">Status</span>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-44 h-9 rounded-lg border-border text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
            <SelectItem value="DISMISSED">Dismissed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Loading disputes...</p>
          </div>
        ) : disputes.length === 0 ? (
          <EmptyState
            title="No disputes found"
            description="There are no trip disputes matching this filter."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Raised By</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Type</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Description</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Raised On</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((d) => (
                  <tr key={d.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {d.raisedByUser?.firstName?.charAt(0)}
                            {d.raisedByUser?.lastName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">
                          {d.raisedByUser?.firstName} {d.raisedByUser?.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground capitalize">
                      {d.disputeType?.replace(/_/g, " ").toLowerCase()}
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground max-w-xs truncate" title={d.description}>
                      {d.description}
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <Badge className={statusStyle(d.status)}>{d.status.replace(/_/g, " ")}</Badge>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {(d.status === "OPEN" || d.status === "UNDER_REVIEW") && (
                          <button
                            onClick={() => setResolving(d)}
                            className="text-primary hover:text-primary/80 transition-colors"
                            title="Resolve dispute"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {disputes.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}
            {" to "}
            {(currentPage - 1) * PAGE_SIZE + disputes.length} out of {total} records
          </p>
          <div className="flex items-center gap-2">
            <button
              className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-muted-foreground px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!resolving}
        title="Resolve dispute"
        description={`Resolving dispute raised by ${resolving?.raisedByUser?.firstName ?? ""} ${resolving?.raisedByUser?.lastName ?? ""}.`}
        confirmLabel="Resolve"
        isLoading={isResolving}
        onConfirm={handleResolve}
        onCancel={() => {
          setResolving(null);
          setResolutionNote("");
        }}
      >
        <Textarea
          placeholder="Resolution notes..."
          value={resolutionNote}
          onChange={(e) => setResolutionNote(e.target.value)}
          rows={4}
        />
      </ConfirmDialog>
    </div>
  );
};

export default SecurityPage;
