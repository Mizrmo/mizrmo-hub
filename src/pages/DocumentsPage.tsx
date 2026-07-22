import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, CheckCircle, Clock, AlertTriangle, ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import api from "@/lib/api";
import { toast } from "sonner";
import type { DriverProfileSummary } from "@/types/api.types";

const statusStyle = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-success/10 text-success border-0";
    case "PENDING_REVIEW":
      return "bg-warning/10 text-warning border-0";
    case "REJECTED":
      return "bg-destructive/10 text-destructive border-0";
    case "SUSPENDED":
      return "bg-destructive/10 text-destructive border-0";
    default:
      return "";
  }
};

const isExpired = (dateStr?: string) => !!dateStr && new Date(dateStr) < new Date();

const DocumentsPage = () => {
  const [drivers, setDrivers] = useState<DriverProfileSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await api.get("/admin/drivers");
      setDrivers(Array.isArray(data) ? data : (data?.data ?? []));
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  const total = drivers.length;
  const verified = drivers.filter((d) => d.approvalStatus === "APPROVED").length;
  const pending = drivers.filter((d) => d.approvalStatus === "PENDING_REVIEW").length;
  const expired = drivers.filter((d) => isExpired(d.licenseExpiryDate)).length;

  return (
    <div>
      <DashboardHeader title="Documents" subtitle="Dashboard > Documents" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={FileText} label="Total Driver Profiles" value={total} />
        <StatsCard icon={CheckCircle} label="Approved" value={verified} />
        <StatsCard icon={Clock} label="Pending Review" value={pending} />
        <StatsCard icon={AlertTriangle} label="License Expired" value={expired} />
      </div>

      <Tabs defaultValue="driver-docs" className="space-y-4">
        <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0">
          <TabsTrigger value="driver-docs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground">
            Driver Documents
          </TabsTrigger>
          <TabsTrigger value="user-docs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground">
            User Documents
          </TabsTrigger>
        </TabsList>

        {/* Driver Documents — backed by GET /admin/drivers */}
        <TabsContent value="driver-docs">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading driver documents...</p>
              </div>
            ) : drivers.length === 0 ? (
              <EmptyState title="No driver profiles found" description="No drivers have submitted documents yet." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver</th>
                      <th className="text-left text-sm font-semibold text-foreground px-6 py-3">License No.</th>
                      <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Ghana Card No.</th>
                      <th className="text-left text-sm font-semibold text-foreground px-6 py-3">License Expiry</th>
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
                                {d.user?.firstName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-foreground">
                              {d.user?.firstName} {d.user?.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm text-muted-foreground">{d.licenseNumber}</td>
                        <td className="px-6 py-3 text-sm text-muted-foreground">{d.ghanaCardNumber}</td>
                        <td className="px-6 py-3 text-sm text-foreground">
                          <span className={isExpired(d.licenseExpiryDate) ? "text-destructive" : ""}>
                            {new Date(d.licenseExpiryDate).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <Badge className={statusStyle(d.approvalStatus)}>
                            {d.approvalStatus.replace(/_/g, " ")}
                          </Badge>
                        </td>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => navigate(`/admin/drivers/${d.id}`)}
                            className="text-primary hover:text-primary/80"
                            title="Review documents"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* User (rider) documents — no backend endpoint exists for this yet.
            Riders don't upload verification documents in the current data model;
            only DriverProfile has documents. */}
        <TabsContent value="user-docs">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <EmptyState
              title="Not available"
              description="Rider accounts don't have verification documents in the current backend — only driver profiles do. This tab has no API to wire yet."
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsPage;
