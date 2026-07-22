import { useState, useEffect } from "react";
import { Heart, Award, Gift, TrendingUp, ChevronLeft, ChevronRight, Star } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";
import api from "@/lib/api";
import type { MizMilesOverview } from "@/types/api.types";

const tiers = [
  { name: "Bronze", minMiles: 0, maxMiles: 500, color: "bg-orange-400", benefits: ["1% fare discount", "Birthday bonus miles"] },
  { name: "Silver", minMiles: 500, maxMiles: 1500, color: "bg-gray-400", benefits: ["3% fare discount", "Priority support", "1 free cancel/month"] },
  { name: "Gold", minMiles: 1500, maxMiles: 3000, color: "bg-yellow-500", benefits: ["5% fare discount", "Priority matching", "3 free cancels/month"] },
  { name: "Platinum", minMiles: 3000, maxMiles: 5000, color: "bg-blue-500", benefits: ["10% fare discount", "VIP support", "5 free cancels/month", "Airport lounge access"] },
];

const redemptionOptions = [
  { name: "Fare Discount (5%)", miles: 100, description: "Get 5% off your next ride fare" },
  { name: "Fare Discount (10%)", miles: 200, description: "Get 10% off your next ride fare" },
  { name: "Free Short Ride", miles: 500, description: "One free ride up to Gh₵30 value" },
  { name: "Free Long Ride", miles: 1000, description: "One free ride up to Gh₵100 value" },
  { name: "Airport Transfer", miles: 1500, description: "Free airport pickup or drop-off" },
  { name: "Weekend Pass", miles: 2000, description: "Unlimited rides for one weekend" },
];

interface WalletEntry {
  id: string;
  balance: number;
  totalEarned: number;
  totalRedeemed: number;
  user: { firstName: string; lastName: string; email: string };
}

const MizMilesPage = () => {
  const [overview, setOverview] = useState<MizMilesOverview | null>(null);
  const [wallets, setWallets] = useState<WalletEntry[]>([]);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingWallets, setLoadingWallets] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.get("/admin/miz-miles/overview")
      .then((data) => setOverview(data))
      .catch(() => {})
      .finally(() => setLoadingOverview(false));
  }, []);

  useEffect(() => {
    api.get(`/admin/miz-miles/wallets?page=${page}&limit=20`)
      .then((data) => {
        setWallets(Array.isArray(data) ? data : (data?.data ?? []));
        setTotalPages(data?.meta?.totalPages ?? 1);
      })
      .catch(() => {})
      .finally(() => setLoadingWallets(false));
  }, [page]);

  return (
    <div>
      <DashboardHeader title="Miz Miles" subtitle="Dashboard > Miz Miles" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Heart} label="Total Miles Issued" value={overview?.totalMilesEverAwarded?.toLocaleString() ?? "—"} />
        <StatsCard icon={Gift} label="Miles Redeemed" value={overview?.totalMilesRedeemed?.toLocaleString() ?? "—"} />
        <StatsCard icon={TrendingUp} label="Active Members" value={overview?.usersWithBalance?.toLocaleString() ?? "—"} />
        <StatsCard icon={Award} label="Active Promos" value={overview?.totalActivePromotions?.toLocaleString() ?? "—"} />
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0">
          {["activity", "tiers", "redemption"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground capitalize"
            >
              {tab === "activity" ? "Wallet Overview" : tab === "redemption" ? "Redemption Options" : "Tiers"}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="activity">
          {loadingWallets ? (
            <LoadingSpinner message="Loading wallets..." />
          ) : wallets.length === 0 ? (
            <EmptyState title="No wallet data" description="No users have Miz Miles yet." />
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">User</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Email</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Balance</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Total Earned</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Total Redeemed</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((w) => (
                    <tr key={w.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-3 text-sm font-medium text-foreground">{w.user?.firstName} {w.user?.lastName}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{w.user?.email}</td>
                      <td className="px-6 py-3">
                        <span className="text-sm font-semibold text-primary">{w.balance?.toLocaleString()} miles</span>
                      </td>
                      <td className="px-6 py-3 text-sm text-success">+{w.totalEarned?.toLocaleString()}</td>
                      <td className="px-6 py-3 text-sm text-destructive">-{w.totalRedeemed?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 flex items-center justify-between border-t border-border">
                <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
                <div className="flex items-center gap-2">
                  <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-40"><ChevronLeft size={18} /></button>
                  <span className="w-8 h-8 rounded-full text-sm font-medium bg-primary text-primary-foreground flex items-center justify-center">{page}</span>
                  <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-40"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tiers">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tiers.map((tier) => (
              <Card key={tier.name} className="overflow-hidden">
                <div className={`${tier.color} h-2`} />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full ${tier.color} flex items-center justify-center`}>
                      <Star size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground">{tier.minMiles.toLocaleString()} – {tier.maxMiles.toLocaleString()} miles</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{tier.minMiles.toLocaleString()}</span>
                      <span>{tier.maxMiles.toLocaleString()}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <p className="text-xs font-semibold text-foreground mb-2">Benefits:</p>
                  <ul className="space-y-1">
                    {tier.benefits.map((b, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="redemption">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {redemptionOptions.map((opt) => (
              <Card key={opt.name}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Gift size={18} className="text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{opt.name}</p>
                      <Badge variant="outline" className="text-xs mt-1">{opt.miles.toLocaleString()} miles</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{opt.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MizMilesPage;
