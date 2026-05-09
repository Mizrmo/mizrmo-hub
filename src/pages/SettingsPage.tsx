import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@mizrmo.com",
    phone: "+233 24 000 0000",
    role: "Super Admin",
  });

  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    newDriverSignup: true,
    complaints: true,
    paymentIssues: true,
    weeklyReport: true,
    rideAlerts: false,
  });

  const [appConfig, setAppConfig] = useState({
    appName: "Mizrmo",
    supportEmail: "support@mizrmo.com",
    defaultCurrency: "GHS",
    commissionRate: "15",
    maxCancelFree: "2",
  });

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your changes have been saved successfully." });
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

        {/* Profile */}
        <TabsContent value="profile">
          <div className="bg-card rounded-xl border border-border p-6 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">A</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Role</Label>
                <Input value={profile.role} disabled className="mt-1 bg-muted" />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </TabsContent>

        {/* Notifications */}
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
            <Button onClick={handleSave} className="mt-4">Save Preferences</Button>
          </div>
        </TabsContent>

        {/* App Config */}
        <TabsContent value="app">
          <div className="bg-card rounded-xl border border-border p-6 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>App Name</Label>
                <Input value={appConfig.appName} onChange={(e) => setAppConfig({ ...appConfig, appName: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Support Email</Label>
                <Input value={appConfig.supportEmail} onChange={(e) => setAppConfig({ ...appConfig, supportEmail: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Default Currency</Label>
                <Input value={appConfig.defaultCurrency} onChange={(e) => setAppConfig({ ...appConfig, defaultCurrency: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Commission Rate (%)</Label>
                <Input type="number" value={appConfig.commissionRate} onChange={(e) => setAppConfig({ ...appConfig, commissionRate: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Free Cancellations / Month</Label>
                <Input type="number" value={appConfig.maxCancelFree} onChange={(e) => setAppConfig({ ...appConfig, maxCancelFree: e.target.value })} className="mt-1" />
              </div>
            </div>
            <Button onClick={handleSave} className="mt-6">Save Configuration</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
