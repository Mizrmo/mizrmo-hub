import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Eye, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";
import { toast } from "sonner";

interface PendingDriver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

const PendingDriversPage = () => {
  const [drivers, setDrivers] = useState<PendingDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingDrivers();
  }, []);

  const fetchPendingDrivers = async () => {
    try {
      setLoading(true);
      const data = await api.get("/admin/drivers/pending");
      setDrivers(data);
    } catch (error: any) {
      console.error("Error fetching pending drivers:", error);
      toast.error(error.message || "Failed to fetch pending drivers");
      // Fallback for demo if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeader title="Pending Driver Applications" subtitle="Dashboard > Driver Applications" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} label="Pending Applications" value={drivers.length} />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Loading applications...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver</th>
                <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Email</th>
                <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Phone</th>
                <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Applied On</th>
                <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length > 0 ? (
                drivers.map((d) => (
                  <tr key={d.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {d.firstName[0]}{d.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">
                          {d.firstName} {d.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground">{d.email}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{d.phone}</td>
                    <td className="px-6 py-3 text-sm text-foreground">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <Badge className="bg-warning/10 text-warning border-0 hover:bg-warning/20 capitalize">
                        {d.status}
                      </Badge>
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                    No pending driver applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {drivers.length} record(s)
          </p>
          <div className="flex items-center gap-2">
            <button className="p-1 text-muted-foreground hover:text-foreground"><ChevronLeft size={18} /></button>
            <button className="w-8 h-8 rounded-full text-sm font-medium bg-primary text-primary-foreground">1</button>
            <button className="p-1 text-muted-foreground hover:text-foreground"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingDriversPage;
