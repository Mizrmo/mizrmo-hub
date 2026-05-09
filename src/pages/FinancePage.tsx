import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Wallet, TrendingDown, Award, Gift, Plus } from "lucide-react";
import AddPromotionDialog from "@/components/finance/AddPromotionDialog";
import ViewPaymentDialog from "@/components/finance/ViewPaymentDialog";
import PayDriverDialog from "@/components/finance/PayDriverDialog";
import SetFareDialog from "@/components/finance/SetFareDialog";
import RefundActionDialog from "@/components/finance/RefundActionDialog";
import SeeAllDialog from "@/components/finance/SeeAllDialog";

const pendingRefunds = [
  { name: "Daniel Asante", amount: "GHS 125", route: "Tema-Kumasi" },
  { name: "Daniel Asante", amount: "GHS 125", route: "Tema-Kumasi" },
];

const pendingOutflows = [
  { name: "Daniel Asante", amount: "GHS 125", route: "Tema-Kumasi" },
  { name: "Daniel Asante", amount: "GHS 125", route: "Tema-Kumasi" },
];

const paymentsToday = [
  { id: "mzpymnt_120", type: "Payment- Transport", amount: "GHS 500.00", date: "Sep 30, 2030" },
  { id: "mzpymnt_121", type: "Payment- Transport", amount: "GHS 350.00", date: "Dec 30, 2030" },
  { id: "mzpymnt_122", type: "Payment- Transport", amount: "GHS 700.00", date: "Nov 30, 2030" },
];

const toPay = [
  { id: "mzpymnt_120", type: "Payment- Transport", paidTo: "Daniel Asante", amount: "GHS 500.00", date: "Sep 30, 2030" },
  { id: "mzpymnt_121", type: "Payment- Transport", paidTo: "Daniel Asante", amount: "GHS 500.00", date: "Sep 30, 2030" },
  { id: "mzpymnt_122", type: "Payment- Transport", paidTo: "Daniel Asante", amount: "GHS 500.00", date: "Sep 30, 2030" },
];

const promotions = [
  { name: "15% off Ride", reward: "158 Miz miles", expiry: "Sep 30, 2030" },
  { name: "15% off Ride", reward: "158 Miz miles", expiry: "Sep 30, 2030" },
];

const FinancePage = () => {
  const [promoOpen, setPromoOpen] = useState(false);
  const [fareOpen, setFareOpen] = useState(false);
  const [viewPayment, setViewPayment] = useState<typeof paymentsToday[0] | null>(null);
  const [payDriver, setPayDriver] = useState<typeof toPay[0] | null>(null);
  const [refundItem, setRefundItem] = useState<typeof pendingRefunds[0] | null>(null);
  const [seeAll, setSeeAll] = useState<{ title: string; type: "refunds" | "outflows" | "payments" | "topay" } | null>(null);

  return (
    <div>
      <DashboardHeader title="Financial Management" subtitle="Dashboard > Financial Management" />

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <Card className="bg-primary text-primary-foreground border-none cursor-pointer hover:opacity-90 transition-opacity">
          <CardContent className="p-5">
            <p className="text-xs opacity-80">Sa/Fdksfs</p>
            <p className="text-sm font-medium mt-1">Total Inflows</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold">GHS 25000</p>
              <div className="text-xs opacity-80">Total Revenue</div>
              <ArrowUpRight size={20} className="opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-foreground">GHS 20,000</p>
              <Badge variant="outline" className="text-xs">Today</Badge>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Wallet size={14} className="text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Total Outflows</p>
                  <p className="text-sm font-semibold text-foreground">GHS 12,500</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown size={14} className="text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Pending Outflows</p>
                  <p className="text-sm font-semibold text-foreground">GHS 7,500</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-foreground">GHS 20,000</p>
              <Badge variant="outline" className="text-xs">Commission</Badge>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Award size={14} className="text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Awarded Miz Miles</p>
                  <p className="text-sm font-semibold text-foreground">12,500</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gift size={14} className="text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Redeemed Miz Miles</p>
                  <p className="text-sm font-semibold text-foreground">7,500</p>
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
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground">Pending Refunds</p>
                    <button className="text-xs text-primary font-medium hover:underline" onClick={() => setSeeAll({ title: "All Refunds", type: "refunds" })}>See All</button>
                  </div>
                  <div className="space-y-3">
                    {pendingRefunds.map((r, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:bg-muted/50 rounded px-2 -mx-2 transition-colors" onClick={() => setRefundItem(r)}>
                        <div>
                          <p className="text-sm font-medium text-foreground">{r.name} - {r.amount}</p>
                          <p className="text-xs text-muted-foreground">{r.route}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">Process</Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="promotion">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground">Active Promotions</p>
                    <Button size="sm" variant="default" className="rounded-full gap-1 text-xs" onClick={() => setPromoOpen(true)}>
                      <Plus size={14} /> Create Reward
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {promotions.map((p, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Gift size={12} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.reward}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{p.expiry}</span>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><span className="text-xs">✏️</span></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><span className="text-xs">🗑️</span></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">Pending Outflows - Driver</p>
              <button className="text-xs text-primary font-medium hover:underline" onClick={() => setSeeAll({ title: "All Pending Outflows", type: "outflows" })}>See All</button>
            </div>
            <div className="space-y-3 mb-5">
              {pendingOutflows.map((o, i) => (
                <div key={i} className="py-2 border-b border-border last:border-0">
                  <p className="text-sm font-medium text-foreground">{o.name} - {o.amount}</p>
                  <p className="text-xs text-muted-foreground">{o.route}</p>
                </div>
              ))}
            </div>
            <Button className="w-full rounded-full" onClick={() => setFareOpen(true)}>Set Fare</Button>
          </CardContent>
        </Card>
      </div>

      {/* Payments Today */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">Payments Today</p>
            <button className="text-xs text-primary font-medium hover:underline" onClick={() => setSeeAll({ title: "All Payments", type: "payments" })}>See All</button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Transaction ID</TableHead>
                <TableHead className="text-xs">Transaction Type</TableHead>
                <TableHead className="text-xs">Amount</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentsToday.map((p, i) => (
                <TableRow key={i} className="cursor-pointer hover:bg-muted/50" onClick={() => setViewPayment(p)}>
                  <TableCell className="text-sm">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-foreground/10 flex items-center justify-center">
                        <Wallet size={12} className="text-foreground" />
                      </span>
                      {p.id}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{p.type}</TableCell>
                  <TableCell className="text-sm font-medium">{p.amount}</TableCell>
                  <TableCell className="text-sm">{p.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs text-primary font-medium" onClick={(e) => { e.stopPropagation(); setViewPayment(p); }}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* To Pay */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">To Pay</p>
            <button className="text-xs text-primary font-medium hover:underline" onClick={() => setSeeAll({ title: "All Pending Payments", type: "topay" })}>See All</button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Transaction ID</TableHead>
                <TableHead className="text-xs">Transaction Type</TableHead>
                <TableHead className="text-xs">Paid To</TableHead>
                <TableHead className="text-xs">Amount</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {toPay.map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-foreground/10 flex items-center justify-center">
                        <Wallet size={12} className="text-foreground" />
                      </span>
                      {p.id}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{p.type}</TableCell>
                  <TableCell className="text-sm">{p.paidTo}</TableCell>
                  <TableCell className="text-sm font-medium">{p.amount}</TableCell>
                  <TableCell className="text-sm">{p.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs text-primary font-medium" onClick={() => setPayDriver(p)}>Pay</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddPromotionDialog open={promoOpen} onOpenChange={setPromoOpen} />
      <ViewPaymentDialog open={!!viewPayment} onOpenChange={(o) => !o && setViewPayment(null)} payment={viewPayment} />
      <PayDriverDialog open={!!payDriver} onOpenChange={(o) => !o && setPayDriver(null)} item={payDriver} />
      <SetFareDialog open={fareOpen} onOpenChange={setFareOpen} />
      <RefundActionDialog open={!!refundItem} onOpenChange={(o) => !o && setRefundItem(null)} refund={refundItem} />
      <SeeAllDialog open={!!seeAll} onOpenChange={(o) => !o && setSeeAll(null)} title={seeAll?.title ?? ""} type={seeAll?.type ?? "refunds"} />
    </div>
  );
};

export default FinancePage;
