import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, Car, DollarSign, Eye, ChevronLeft, ChevronRight, Search } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorAlert } from "@/components/ui/error-alert";
import { EmptyState } from "@/components/ui/empty-state";
import api from "@/lib/api";
import type { UserSummary, DashboardStats } from "@/types/api.types";

const UsersPage = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        ...(search && { search }),
      });
      const [usersData, statsData] = await Promise.all([
        api.get(`/admin/users?${params}`),
        stats ? Promise.resolve(null) : api.get("/admin/stats"),
      ]);
      setUsers(usersData.data ?? usersData);
      setTotalPages(usersData.meta?.totalPages ?? 1);
      if (statsData) setStats(statsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  return (
    <div>
      <DashboardHeader title="Users" subtitle="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} label="Total Users" value={stats?.totalUsers?.toLocaleString() ?? "—"} />
        <StatsCard icon={UserCheck} label="Active Users" value={stats?.totalActiveUsers?.toLocaleString() ?? "—"} />
        <StatsCard icon={Car} label="Active Trips" value={stats?.activeTripsCount?.toLocaleString() ?? "—"} />
        <StatsCard icon={DollarSign} label="Total Drivers" value={stats?.totalDrivers?.toLocaleString() ?? "—"} />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
            <Input
              placeholder="Search by name or email"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 h-9 rounded-full bg-secondary border-0 text-sm"
            />
          </form>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading users..." />
        ) : error ? (
          <ErrorAlert message={error} onRetry={fetchUsers} />
        ) : users.length === 0 ? (
          <EmptyState title="No users found" description="Try adjusting your search." />
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-t border-border">
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Name</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Email</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Phone</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Role</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{user.firstName} {user.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground">{user.email}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{user.phoneNumber}</td>
                    <td className="px-6 py-3">
                      <Badge className={user.isActive ? "bg-success/10 text-success border-0" : "bg-warning/10 text-warning border-0"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground capitalize">{user.roles?.join(", ").toLowerCase()}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => navigate(`/users/${user.id}`)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-4 flex items-center justify-between border-t border-border">
              <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="w-8 h-8 rounded-full text-sm font-medium bg-primary text-primary-foreground flex items-center justify-center">{page}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-40"
                >
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

export default UsersPage;
