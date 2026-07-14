import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorAlert } from "@/components/ui/error-alert";
import { useApi } from "@/hooks/use-api";
import api from "@/lib/api";
import type { SystemConfig } from "@/types/api.types";

interface FareForm {
  BASE_RATE_PER_KM: string;
  MINIMUM_FARE: string;
  PLATFORM_COMMISSION_PERCENTAGE: string;
  DRIVER_PAYOUT_PERCENTAGE: string;
  ROAD_DISTANCE_FACTOR: string;
  MINIMUM_DISTANCE_KM: string;
  WAIT_TIME_COST_PER_MIN: string;
  [key: string]: string;
}

const PricingPage = () => {
  const { execute, loading: saving } = useApi();
  const [settings, setSettings] = useState<FareForm>({
    BASE_RATE_PER_KM: "",
    MINIMUM_FARE: "",
    PLATFORM_COMMISSION_PERCENTAGE: "",
    DRIVER_PAYOUT_PERCENTAGE: "",
    ROAD_DISTANCE_FACTOR: "",
    MINIMUM_DISTANCE_KM: "",
    WAIT_TIME_COST_PER_MIN: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const fetchSettings = async () => {
    setLoading(true);
    setError("");
    try {
      // GET /admin/financials/settings returns { fare: [...], commission: [...] }
      // grouped by config category, not a flat array.
      const data: { fare: SystemConfig[]; commission: SystemConfig[] } = await api.get(
        "/admin/financials/settings"
      );
      const map: FareForm = { ...settings };
      [...(data.fare ?? []), ...(data.commission ?? [])].forEach((item) => {
        if (item.key in map) map[item.key] = item.value;
      });
      setSettings(map);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const commission = parseFloat(settings.PLATFORM_COMMISSION_PERCENTAGE);
    const payout = parseFloat(settings.DRIVER_PAYOUT_PERCENTAGE);
    if (!isNaN(commission) && !isNaN(payout) && Math.abs(commission + payout - 100) > 0.01) {
      setFormError("Commission % + Driver payout % must equal 100");
      return;
    }
    await execute(
      () => api.patch("/admin/financials/settings", {
        updates: Object.entries(settings)
          .filter(([, v]) => v !== "")
          .map(([key, value]) => ({ key, value })),
      }),
      {
        successMessage: "Fare settings updated successfully",
        onSuccess: () => fetchSettings(),
      },
    );
  };

  const displayFare = settings.BASE_RATE_PER_KM ? `GH₵${parseFloat(settings.BASE_RATE_PER_KM).toFixed(2)}` : "—";
  const displayKm = settings.BASE_RATE_PER_KM ? `GH₵${parseFloat(settings.BASE_RATE_PER_KM).toFixed(2)}` : "—";
  const displayMin = settings.WAIT_TIME_COST_PER_MIN ? `GH₵${parseFloat(settings.WAIT_TIME_COST_PER_MIN).toFixed(2)}` : "—";
  const displayCommission = settings.PLATFORM_COMMISSION_PERCENTAGE ? `${settings.PLATFORM_COMMISSION_PERCENTAGE}%` : "—";
  const displayPayout = settings.DRIVER_PAYOUT_PERCENTAGE ? `${settings.DRIVER_PAYOUT_PERCENTAGE}%` : "—";

  return (
    <div>
      <DashboardHeader title="Pricing" subtitle="Pricing" />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      ) : error ? (
        <ErrorAlert message={error} onRetry={fetchSettings} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">{displayFare}</p>
                  <p className="text-sm text-muted-foreground">Base Fare / km</p>
                </div>
                <Pencil size={18} className="text-muted-foreground" />
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-muted-foreground">Cost Per km Distance</p>
                  <p className="text-lg font-bold text-foreground">{displayKm}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Wait Time / min</p>
                  <p className="text-lg font-bold text-foreground">{displayMin}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold text-foreground">Commission</p>
                <Pencil size={18} className="text-muted-foreground" />
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-muted-foreground">Driver's Share</p>
                  <p className="text-lg font-bold text-foreground">{displayPayout}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Mizrmo's Share</p>
                  <p className="text-lg font-bold text-foreground">{displayCommission}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <Tabs defaultValue="set-new">
              <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0 mb-6">
                <TabsTrigger
                  value="set-new"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
                >
                  Update Fare Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="set-new">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: "MINIMUM_DISTANCE_KM", label: "Minimum Estimated Distance (km)" },
                      { key: "WAIT_TIME_COST_PER_MIN", label: "Wait Time Cost Per Min (GH₵)" },
                      { key: "BASE_RATE_PER_KM", label: "Cost / km Distance (GH₵)" },
                      { key: "MINIMUM_FARE", label: "Minimum Fare (GH₵)" },
                      { key: "PLATFORM_COMMISSION_PERCENTAGE", label: "Platform Commission (%)" },
                      { key: "DRIVER_PAYOUT_PERCENTAGE", label: "Driver Payout (%)" },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder={`Current: ${settings[key] || "not set"}`}
                          value={settings[key]}
                          onChange={(e) => setSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                          className="h-12 bg-secondary border-0 rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                  {formError && <p className="mt-4 text-sm text-destructive">{formError}</p>}
                  <div className="flex justify-center mt-8">
                    <Button type="submit" disabled={saving} className="rounded-full px-16 h-12 text-base font-semibold">
                      {saving ? "Saving…" : "Submit"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default PricingPage;
