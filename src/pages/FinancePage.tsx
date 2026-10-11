import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Wallet, TrendingDown, Award, Gift, Plus, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AddPromotionDialog from "@/components/finance/AddPromotionDialog";
import ViewPaymentDialog from "@/components/finance/ViewPaymentDialog";
import PayDriverDialog from "@/components/finance/PayDriverDialog";
import SetFareDialog from "@/components/finance/SetFareDialog";
import RefundActionDialog from "@/components/finance/RefundActionDialog";
import SeeAllDialog from "@/components/finance/SeeAllDialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import api from "@/lib/api";
import type { PlatformBalance, PayoutRequest } from "@/types/api.types";

interface LiveRevenue {
  revenueToday: number;
  commissionsToday: number;
  payoutsToday: number;
}

const FinancePage = () => {
  const [balance, setBalance] = useState<PlatformBalance | null>(null);
  const [liveRevenue, setLiveRevenue] = useState<LiveRevenue | null>(null);
  const [pendingPayouts, setPendingPayouts] = useState<PayoutRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [promoOpen, setPromoOpen] = useState(false);
  const [fareOpen, setFareOpen] = useState(false);
  const [viewPayment, setViewPayment] = useState<any>(null);
  const [payDriver, setPayDriver] = useState<PayoutRequest | null>(null);
  const [refundItem, setRefundItem] = useState<any>(null);
  const [seeAll, setSeeAll] = useState<{ title: string; type: "refunds" | "outflows" | "payments" | "topay" } | null>(null);

  const fetchFinance = async () => {
    setLoading(true);
    try {
      const [balanceData, liveData, payoutsData] = await Promise.all([
        api.get("/admin/financials/platform-balance").catch(() => null),
        api.get("/admin/financials/revenue/live").catch(() => null),
        api.get("/admin/financials/payouts/pending").catch(() => ({ data: [] })),
      ]);
      if (balanceData) setBalance(balanceData);
      if (liveData) setLiveRevenue(liveData);
      const payouts = Array.isArray(payoutsData) ? payoutsData : (payoutsData?.data ?? []);
      setPendingPayouts(payouts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFinance(); }, []);

  const inflows = balance?.ledger?.totalPaymentsReceived ?? liveRevenue?.revenueToday ?? 0;
  const outflows = balance?.ledger?.totalPayoutsSent ?? 0;
  const pendingOutflowsAmt = balance?.ledger?.totalDriverEarningsAccrued
    ? balance.ledger.totalDriverEarningsAccrued - balance.ledger.totalPayoutsSent
    : 0;
  const commission = balance?.ledger?.netCommissionRetained ?? liveRevenue?.commissionsToday ?? 0;

  return (
    <div>
      <DashboardHeader title="Financial Management" subtitle="Dashboard > Financial Management" />

      {loading ? (
        <LoadingSpinner message="Loading financial data..." />
      ) : (
        <>
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <Card className="bg-primary text-primary-foreground border-none cursor-pointer hover:opacity-90 transition-opacity">
              <CardContent className="p-5">
                <p className="text-xs opacity-80">Total Inflows</p>
                <p className="text-sm font-medium mt-1">Platform Revenue</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-2xl font-bold">GHS {inflows.toLocaleString()}</p>
                  <ArrowUpRight size={20} className="opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-foreground">GHS {commission.toLocaleString()}</p>
                  <Badge variant="outline" className="text-xs">Commission</Badge>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Wallet size={14} className="text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Total Outflows</p>
                      <p className="text-sm font-semibold text-foreground">GHS {outflows.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown size={14} className="text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Pending Outflows</p>
                      <p className="text-sm font-semibold text-foreground">GHS {pendingOutflowsAmt.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-foreground">Paystack</p>
                  <Badge variant="outline" className="text-xs">Live</Badge>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Available</p>
                      <p className="text-sm font-semibold text-foreground">
                        GHS {(balance?.paystack?.available ?? 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift size={14} className="text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Pending</p>
                      <p className="text-sm font-semibold text-foreground">
                        GHS {(balance?.paystack?.pending ?? 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-5">
                  <Tabs defaultValue="refunds">
                    <TabsList className="bg-transparent p-0 gap-4 h-auto mb-4">
                      <TabsTrigger value="refunds" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-0 pb-2 text-base font-semibold">
                        Refunds
                      </TabsTrigger>
                      <TabsTrigger value="promotion" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-0 pb-2 text-base font-semibold">
                        Promotion
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="refunds">
                      <p className="text-sm text-muted-foreground py-4 text-center">No pending refunds.</p>
                    </TabsContent>
                    <TabsContent value="promotion">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-muted-foreground">Active Promotions</p>
                        <Button size="sm" variant="default" className="rounded-full gap-1 text-xs" onClick={() => setPromoOpen(true)}>
                          <Plus size={14} /> Create Reward
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground py-4 text-center">No active promotions.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-foreground">Pending Payouts</p>
                  <button className="text-xs text-primary font-medium hover:underline" onClick={() => setSeeAll({ title: "All Pending Outflows", type: "outflows" })}>See All</button>
                </div>
                <div className="space-y-3 mb-5">
                  {pendingPayouts.slice(0, 3).map((p) => (
                    <div key={p.id} className="py-2 border-b border-border last:border-0">
                      <p className="text-sm font-medium text-foreground">{p.driver?.firstName} {p.driver?.lastName} — GHS {p.totalAmount?.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Week: {p.weekIdentifier}</p>
                    </div>
                  ))}
                  {pendingPayouts.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No pending payouts.</p>
                  )}
                </div>
                <Button className="w-full rounded-full" onClick={() => setFareOpen(true)}>Set Fare</Button>
              </CardContent>
            </Card>
          </div>

          {/* To Pay */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-foreground">Driver Payout Queue</p>
                <button className="text-xs text-primary font-medium hover:underline" onClick={() => setSeeAll({ title: "All Pending Payments", type: "topay" })}>See All</button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Driver</TableHead>
                    <TableHead className="text-xs">Week</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayouts.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-sm">{p.driver?.firstName} {p.driver?.lastName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.weekIdentifier}</TableCell>
                      <TableCell className="text-sm font-medium">GHS {p.totalAmount?.toLocaleString()}</TableCell>
                      <TableCell className="text-sm">{p.status}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-xs text-primary font-medium" onClick={() => setPayDriver(p)}>
                          Pay
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingPayouts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-8">No pending payouts</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      <AddPromotionDialog open={promoOpen} onOpenChange={setPromoOpen} />
      <ViewPaymentDialog open={!!viewPayment} onOpenChange={(o) => !o && setViewPayment(null)} payment={viewPayment} />
      <PayDriverDialog
        open={!!payDriver}
        onOpenChange={(o) => !o && setPayDriver(null)}
        item={
          payDriver
            ? {
                id: payDriver.id,
                type: "Payout",
                paidTo: `${payDriver.driver.firstName} ${payDriver.driver.lastName}`,
                amount: String(payDriver.totalAmount),
                date: payDriver.processedAt ?? payDriver.weekIdentifier,
              }
            : null
        }
      />
      <SetFareDialog open={fareOpen} onOpenChange={setFareOpen} />
      <RefundActionDialog open={!!refundItem} onOpenChange={(o) => !o && setRefundItem(null)} refund={refundItem} />
      <SeeAllDialog open={!!seeAll} onOpenChange={(o) => !o && setSeeAll(null)} title={seeAll?.title ?? ""} type={seeAll?.type ?? "refunds"} />
    </div>
  );
};

export default FinancePage;
