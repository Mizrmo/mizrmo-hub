import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Mail, Phone, CheckCircle, Shield, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorAlert } from "@/components/ui/error-alert";
import { StatusBadge } from "@/components/ui/status-badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DeleteAccountDialog } from "@/components/DeleteAccountDialog";
import { toast } from "sonner";
import api from "@/lib/api";
import { useApi } from "@/hooks/use-api";
import type { UserDetail } from "@/types/api.types";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { execute, loading: actionLoading } = useApi();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchUser = async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const data = await api.get(`/admin/users/${id}`);
      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, [id]);

  const handleSuspend = async () => {
    if (!id) return;
    await execute(
      () => api.patch(`/admin/users/${id}/suspend`, { reason: "Suspended by admin" }),
      {
        successMessage: "User suspended",
        onSuccess: () => { setSuspendOpen(false); fetchUser(); },
      },
    );
  };

  const handleReactivate = async () => {
    if (!id) return;
    await execute(
      () => api.patch(`/admin/users/${id}/reactivate`),
      { successMessage: "User reactivated", onSuccess: () => fetchUser() },
    );
  };

  if (loading) return <LoadingSpinner message="Loading user profile..." />;
  if (error) return <ErrorAlert message={error} onRetry={fetchUser} />;
  if (!user) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft size={20} />
        </button>
        <DashboardHeader title="Users" subtitle="Dashboard" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <Card className="md:col-span-1">
          <CardContent className="p-6 flex items-start gap-5">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${user.isActive ? "bg-success" : "bg-muted"}`} />
            </div>
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User size={14} className="text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{user.phoneNumber}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                {user.isActive ? (
                  <Button size="sm" variant="destructive" onClick={() => setSuspendOpen(true)} disabled={actionLoading}>
                    Suspend
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleReactivate} disabled={actionLoading}>
                    Reactivate
                  </Button>
                )}
                {!user.roles?.includes("ADMIN") && (
                  <Button size="sm" variant="outline" className="text-destructive border-destructive/40" onClick={() => setDeleteOpen(true)} disabled={actionLoading}>
                    Delete account
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <StatsCard icon={Car} label="Total Bookings" value={user._count?.totalBookings?.toLocaleString() ?? "—"} />
          <StatsCard icon={Car} label="Miz Miles" value={user.mizMilesBalance?.toLocaleString() ?? "—"} />
          <StatsCard icon={CheckCircle} label="Verification" value={user.isPhoneVerified ? "Verified" : "Unverified"} />
          <StatsCard icon={Shield} label="Account Status" value={user.isActive ? "Active" : "Suspended"} />
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="transaction" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0">
                {["document", "miz-miles", "transaction", "trip-history"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground capitalize"
                  >
                    {tab.replace("-", " ")}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Select>
                <SelectTrigger className="w-36 h-9 rounded-lg border-border text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="document">
              <p className="text-sm text-muted-foreground py-8 text-center">No documents uploaded yet.</p>
            </TabsContent>

            <TabsContent value="miz-miles">
              <p className="text-sm text-muted-foreground py-8 text-center">
                Balance: <strong className="text-foreground">{user.mizMilesBalance?.toLocaleString() ?? "0"} miles</strong>
              </p>
            </TabsContent>

            <TabsContent value="transaction">
              {user.recentBookings?.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">No transactions yet.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-semibold px-4 py-3">Reference</th>
                      <th className="text-left text-sm font-semibold px-4 py-3">Seats</th>
                      <th className="text-left text-sm font-semibold px-4 py-3">Fare</th>
                      <th className="text-left text-sm font-semibold px-4 py-3">Status</th>
                      <th className="text-left text-sm font-semibold px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.recentBookings?.map((b) => (
                      <tr key={b.id} className="border-b border-border hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm font-mono">{b.bookingReference}</td>
                        <td className="px-4 py-3 text-sm">{b.seatsBooked}</td>
                        <td className="px-4 py-3 text-sm font-medium">GHS {b.totalFare}</td>
                        <td className="px-4 py-3"><StatusBadge status={b.status} size="sm" /></td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(b.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </TabsContent>

            <TabsContent value="trip-history">
              <p className="text-sm text-muted-foreground py-8 text-center">No trip history yet.</p>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
            <p className="text-sm text-muted-foreground">Showing records</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="p-1 text-muted-foreground hover:text-foreground"><ChevronLeft size={18} /></button>
              <span className="w-8 h-8 rounded-full text-sm font-medium bg-primary text-primary-foreground flex items-center justify-center">{currentPage}</span>
              <button onClick={() => setCurrentPage((p) => p + 1)} className="p-1 text-muted-foreground hover:text-foreground"><ChevronRight size={18} /></button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={suspendOpen}
        title="Suspend User"
        description={`Are you sure you want to suspend ${user.firstName} ${user.lastName}? This will revoke all active sessions.`}
        confirmLabel="Suspend"
        variant="destructive"
        isLoading={actionLoading}
        onConfirm={handleSuspend}
        onCancel={() => setSuspendOpen(false)}
      />

      <DeleteAccountDialog
        open={deleteOpen}
        userId={user.id}
        name={`${user.firstName} ${user.lastName}`}
        onClose={() => setDeleteOpen(false)}
        onDeleted={() => {
          setDeleteOpen(false);
          toast.success("Account deleted");
          navigate("/users");
        }}
      />
    </div>
  );
};

export default UserDetailPage;
