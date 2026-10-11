import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/use-api";
import api from "@/lib/api";
import type { SystemConfig } from "@/types/api.types";

const SettingsPage = () => {
  const { toast } = useToast();
  const { execute, loading: saving } = useApi();
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [changedKeys, setChangedKeys] = useState<Set<string>>(new Set());

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "Admin",
  });
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((data: any) => {
        const u = data.user ?? data;
        setProfile({
          firstName: u.firstName ?? "",
          lastName: u.lastName ?? "",
          email: u.email ?? "",
          phoneNumber: u.phoneNumber ?? "",
          role: "Admin",
        });
      })
      .catch(() => {})
      .finally(() => setProfileLoading(false));
  }, []);

  const handleSaveProfile = () =>
    execute(
      () =>
        api.patch("/auth/me", {
          firstName: profile.firstName,
          lastName: profile.lastName,
          phoneNumber: profile.phoneNumber,
        }),
      { successMessage: "Profile saved" },
    );

  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    newDriverSignup: true,
    complaints: true,
    paymentIssues: true,
    weeklyReport: true,
    rideAlerts: false,
  });

  const [appConfig, setAppConfig] = useState<Record<string, string>>({
    APP_NAME: "Mizrmo",
    SUPPORT_EMAIL: "support@mizrmo.com",
    DEFAULT_CURRENCY: "GHS",
    PLATFORM_COMMISSION_PERCENTAGE: "15",
    MAX_FREE_CANCELLATIONS: "2",
  });

  useEffect(() => {
    api
      .get("/admin/config")
      .then((data: SystemConfig[]) => {
        if (Array.isArray(data)) {
          const map: Record<string, string> = {};
          data.forEach((item) => {
            map[item.key] = item.value;
          });
          setAppConfig((prev) => ({ ...prev, ...map }));
        }
      })
      .catch(() => {})
      .finally(() => setLoadingConfig(false));
  }, []);

  const handleConfigChange = (key: string, value: string) => {
    setAppConfig((prev) => ({ ...prev, [key]: value }));
    setChangedKeys((prev) => new Set(prev).add(key));
  };

  const handleSaveConfig = async () => {
    if (changedKeys.size === 0) {
      toast({ title: "No changes to save" });
      return;
    }
    for (const key of Array.from(changedKeys)) {
      await execute(() => api.patch(`/admin/config/${key}`, { value: appConfig[key] }), {
        errorMessage: `Failed to save ${key}`,
      });
    }
    setChangedKeys(new Set());
    toast({ title: "Settings saved", description: "All changes have been applied" });
  };

  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Dashboard > Settings" />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="app">App Config</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="bg-card rounded-xl border border-border p-6 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">{(profile.firstName[0] ?? "A").toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">{profileLoading ? "Loading…" : `${profile.firstName} ${profile.lastName}`.trim() || "Admin"}</h3>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={profile.email} disabled className="mt-1 bg-muted" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={profile.phoneNumber} onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Role</Label>
                <Input value={profile.role} disabled className="mt-1 bg-muted" />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button onClick={handleSaveProfile} disabled={saving}>{saving ? "Saving…" : "Save Changes"}</Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="bg-card rounded-xl border border-border p-6 max-w-2xl space-y-5">
            <h3 className="font-semibold text-foreground mb-2">Notification Channels</h3>
            {[
              { key: "emailAlerts", label: "Email Alerts", desc: "Receive alerts via email" },
              { key: "smsAlerts", label: "SMS Alerts", desc: "Receive alerts via SMS" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifSettings[item.key as keyof typeof notifSettings]}
                  onCheckedChange={(v) => setNotifSettings({ ...notifSettings, [item.key]: v })}
                />
              </div>
            ))}
            <h3 className="font-semibold text-foreground mt-6 mb-2">Alert Types</h3>
            {[
              { key: "newDriverSignup", label: "New Driver Signups" },
              { key: "complaints", label: "Complaint Escalations" },
              { key: "paymentIssues", label: "Payment Failures" },
              { key: "weeklyReport", label: "Weekly Report" },
              { key: "rideAlerts", label: "Ride Issues" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <Switch
                  checked={notifSettings[item.key as keyof typeof notifSettings]}
                  onCheckedChange={(v) => setNotifSettings({ ...notifSettings, [item.key]: v })}
                />
              </div>
            ))}
            <Button onClick={() => toast({ title: "Notification preferences saved" })} className="mt-4">
              Save Preferences
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="app">
          <div className="bg-card rounded-xl border border-border p-6 max-w-2xl">
            {loadingConfig ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "APP_NAME", label: "App Name" },
                  { key: "SUPPORT_EMAIL", label: "Support Email" },
                  { key: "DEFAULT_CURRENCY", label: "Default Currency" },
                  { key: "PLATFORM_COMMISSION_PERCENTAGE", label: "Commission Rate (%)" },
                  { key: "MAX_FREE_CANCELLATIONS", label: "Free Cancellations / Month" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <Input
                      value={appConfig[key] ?? ""}
                      onChange={(e) => handleConfigChange(key, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            )}
            <Button onClick={handleSaveConfig} disabled={saving} className="mt-6">
              {saving ? "Saving…" : "Save Configuration"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
