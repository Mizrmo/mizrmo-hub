import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Car, 
  FileText,
  Loader2,
  AlertCircle
} from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { toast } from "sonner";

interface DriverDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  vehicleInfo?: {
    model: string;
    make: string;
    year: string;
    plateNumber: string;
  };
  documents?: {
    type: string;
    url: string;
    status: string;
  }[];
}

const DriverDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<DriverDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  useEffect(() => {
    if (id) fetchDriverDetails();
  }, [id]);

  const fetchDriverDetails = async () => {
    try {
      setLoading(true);
      const data = await api.get(`/admin/drivers/${id}`);
      setDriver(data);
    } catch (error: any) {
      console.error("Error fetching driver details:", error);
      toast.error(error.message || "Failed to fetch driver details");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await api.patch(`/admin/drivers/${id}/approve`);
      toast.success("Driver approved successfully");
      navigate("/admin/drivers/pending");
    } catch (error: any) {
      toast.error(error.message || "Failed to approve driver");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      setActionLoading(true);
      await api.patch(`/admin/drivers/${id}/reject`, { reason: rejectionReason });
      toast.success("Driver rejected");
      setIsRejectDialogOpen(false);
      navigate("/admin/drivers/pending");
    } catch (error: any) {
      toast.error(error.message || "Failed to reject driver");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse font-medium">Loading driver data...</p>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold">Driver not found</h2>
        <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft size={20} />
        </Button>
        <DashboardHeader title="Driver Application Details" subtitle={`Applications / ${driver.firstName} ${driver.lastName}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: profile & actions */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-border shadow-md">
            <div className="h-24 bg-primary/10 w-full" />
            <CardContent className="pt-0 -mt-12 text-center pb-6">
              <Avatar className="h-24 w-24 mx-auto border-4 border-card shadow-lg mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {driver.firstName[0]}{driver.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {driver.firstName} {driver.lastName}
              </h2>
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 mb-6 capitalize px-3 py-1">
                {driver.status}
              </Badge>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button 
                  onClick={handleApprove} 
                  disabled={actionLoading}
                  className="bg-success hover:bg-success/90 text-white font-semibold"
                >
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                  Approve
                </Button>
                
                <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" disabled={actionLoading} className="font-semibold">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Reject Application</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for rejecting this driver application. This will be sent to the driver.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Textarea 
                        placeholder="e.g. Invalid document, vehicle too old, etc."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="min-h-[120px] bg-secondary/50 border-border"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="ghost" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
                      <Button 
                        variant="destructive" 
                        onClick={handleReject}
                        disabled={actionLoading || !rejectionReason.trim()}
                      >
                        {actionLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Confirm Rejection
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="text-sm font-medium">{driver.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  <p className="text-sm font-medium">{driver.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Applied On</p>
                  <p className="text-sm font-medium">{new Date(driver.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Info */}
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {driver.vehicleInfo ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Make</p>
                    <p className="text-sm font-semibold">{driver.vehicleInfo.make}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Model</p>
                    <p className="text-sm font-semibold">{driver.vehicleInfo.model}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Year</p>
                    <p className="text-sm font-semibold">{driver.vehicleInfo.year}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Plate Number</p>
                    <p className="text-sm font-bold text-primary">{driver.vehicleInfo.plateNumber}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No vehicle information provided yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Verification Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {driver.documents && driver.documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {driver.documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{doc.type}</p>
                          <p className="text-xs text-muted-foreground">Verification Pending</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">View</a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center bg-secondary/20 rounded-xl border border-dashed border-border">
                  <FileText className="h-10 w-10 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">No documents uploaded for this application.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailsPage;
