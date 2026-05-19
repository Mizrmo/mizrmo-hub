import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, User, Car, FileText, Loader2 } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorAlert } from "@/components/ui/error-alert";
import { StatusBadge } from "@/components/ui/status-badge";
import api from "@/lib/api";
import { toast } from "sonner";
import type { DriverProfileSummary } from "@/types/api.types";

const DriverDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [driver, setDriver] = useState<DriverProfileSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    api.get(`/admin/drivers/${id}`)
      .then((data) => setDriver(data?.data ?? data))
      .catch((err: any) => setError(err.message || "Failed to load driver"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApprove = async () => {
    if (!id) return;
    setActionLoading(true);
    try {
      await api.patch(`/admin/drivers/${id}/approve`, {});
      toast.success("Driver approved successfully");
      setDriver((prev) => prev ? { ...prev, approvalStatus: "APPROVED" } : prev);
    } catch (err: any) {
      toast.error(err.message || "Failed to approve driver");
    } finally {
      setActionLoading(false);
      setApproveOpen(false);
    }
  };

  const handleReject = async () => {
    if (!id) return;
    setActionLoading(true);
    try {
      await api.patch(`/admin/drivers/${id}/reject`, { reason: rejectReason });
      toast.success("Driver application rejected");
      setDriver((prev) => prev ? { ...prev, approvalStatus: "REJECTED" } : prev);
    } catch (err: any) {
      toast.error(err.message || "Failed to reject driver");
    } finally {
      setActionLoading(false);
      setRejectOpen(false);
      setRejectReason("");
    }
  };

  if (loading) return <LoadingSpinner message="Loading driver details..." />;
  if (error) return <ErrorAlert message={error} onRetry={() => window.location.reload()} />;
  if (!driver) return null;

  const name = `${driver.user.firstName} ${driver.user.lastName}`;
  const initials = name.split(" ").map((n) => n[0]).join("");
  const isPending = driver.approvalStatus === "PENDING_REVIEW";

  return (
    <div>
      <DashboardHeader
        title="Driver Application"
        subtitle="Dashboard > Driver Applications > Details"
      />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            {driver.user.profilePicture ? (
              <img src={driver.user.profilePicture} alt={name} className="h-full w-full object-cover rounded-full" />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-foreground">{name}</h2>
            <p className="text-sm text-muted-foreground">{driver.user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={driver.approvalStatus} />
          {isPending && (
            <>
              <Button
                onClick={() => setApproveOpen(true)}
                className="gap-2 rounded-full"
                size="sm"
              >
                <CheckCircle size={15} /> Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => setRejectOpen(true)}
                className="gap-2 rounded-full"
                size="sm"
              >
                <XCircle size={15} /> Reject
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0 mb-6">
          {[
            { value: "personal", label: "Personal Info", icon: User },
            { value: "vehicle", label: "Vehicle", icon: Car },
            { value: "documents", label: "Documents", icon: FileText },
          ].map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground flex items-center gap-2"
            >
              <Icon size={14} /> {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Full Name" value={name} />
              <Field label="Email" value={driver.user.email} />
              <Field label="Phone" value={driver.user.phoneNumber} />
              <Field label="License Number" value={driver.licenseNumber} />
              <Field label="License Expiry" value={new Date(driver.licenseExpiryDate).toLocaleDateString()} />
              <Field label="Ghana Card Number" value={driver.ghanaCardNumber} />
              <Field label="Applied On" value={new Date(driver.submittedAt).toLocaleDateString()} />
              {driver.reviewedAt && (
                <Field label="Reviewed On" value={new Date(driver.reviewedAt).toLocaleDateString()} />
              )}
              {driver.approvalNote && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Approval Note</p>
                  <p className="text-sm text-foreground bg-muted/40 rounded-lg px-3 py-2">{driver.approvalNote}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle">
          {driver.vehicle ? (
            <Card>
              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Make" value={driver.vehicle.make} />
                <Field label="Model" value={driver.vehicle.model} />
                <Field label="Year" value={String(driver.vehicle.year)} />
                <Field label="Color" value={driver.vehicle.color} />
                <Field label="License Plate" value={driver.vehicle.licensePlate} />
                <Field label="Capacity" value={`${driver.vehicle.capacity} seats`} />
                <Field
                  label="Roadworthiness Expiry"
                  value={new Date(driver.vehicle.roadworthinessExpiry).toLocaleDateString()}
                />
                <Field
                  label="Insurance Expiry"
                  value={new Date(driver.vehicle.insuranceExpiry).toLocaleDateString()}
                />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Verified</p>
                  <Badge
                    className={driver.vehicle.isVerified
                      ? "bg-success/10 text-success border-0"
                      : "bg-warning/10 text-warning border-0"}
                  >
                    {driver.vehicle.isVerified ? "Yes" : "Pending"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-10 text-center text-muted-foreground">
                No vehicle information submitted.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents">
          {driver.documents && driver.documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {driver.documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-foreground mb-1 capitalize">
                      {doc.documentType.replace(/_/g, " ")}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                    <a
                      href={doc.storageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      View Document
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-10 text-center text-muted-foreground">
                No documents uploaded.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={approveOpen}
        onOpenChange={setApproveOpen}
        title="Approve Driver Application"
        description={`Are you sure you want to approve ${name}'s driver application? They will be notified and able to create trips immediately.`}
        confirmLabel="Approve"
        onConfirm={handleApprove}
        isLoading={actionLoading}
      />

      <ConfirmDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        title="Reject Driver Application"
        description={`Please provide a reason for rejecting ${name}'s application. They will receive this note in their notification.`}
        confirmLabel="Reject"
        variant="destructive"
        onConfirm={handleReject}
        isLoading={actionLoading}
      >
        <Textarea
          placeholder="Reason for rejection..."
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          rows={3}
          className="mt-3"
        />
      </ConfirmDialog>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="text-sm font-medium text-foreground">{value || "—"}</p>
  </div>
);

export default DriverDetailsPage;
