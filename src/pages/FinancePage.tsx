import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Wallet, TrendingDown, Award, Gift } from "lucide-react";

const pendingRefunds = [
  { name: "Daniel Asante", amount: "GH₵125", route: "Tema-Kumasi" },
  { name: "Daniel Asante", amount: "GH₵125", route: "Tema-Kumasi" },
];

const pendingOutflows = [
  { name: "Daniel Asante", amount: "GH₵125", route: "Tema-Kumasi" },
  { name: "Daniel Asante", amount: "GH₵125", route: "Tema-Kumasi" },
];

const paymentsToday = [
  { id: "mzpymnt_120", type: "Payment- Transport", amount: "Gh₵500.00", date: "Sep 30, 2030" },
  { id: "mzpymnt_120", type: "Payment- Transport", amount: "Gh₵350.00", date: "Dec 30, 2030" },
  { id: "mzpymnt_120", type: "Payment- Transport", amount: "Gh₵700.00", date: "Nov 30, 2030" },
];

const toPay = [
  { id: "mzpymnt_120", type: "Payment- Transport", paidTo: "Daniel Asante", amount: "Gh₵500.00", date: "Sep 30, 2030" },
  { id: "mzpymnt_120", type: "Payment- Transport", paidTo: "Daniel Asante", amount: "Gh₵500.00", date: "Sep 30, 2030" },
  { id: "mzpymnt_120", type: "Payment- Transport", paidTo: "Daniel Asante", amount: "Gh₵500.00", date: "Sep 30, 2030" },
];

const FinancePage = () => {
  return (
    <div>
      <DashboardHeader title="Financial Management" subtitle="Dashboard > Financial Management" />

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Total Inflows */}
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="p-5">
            <p className="text-xs opacity-80">Sa/Fdksfs</p>
            <p className="text-sm font-medium mt-1">Total Inflows</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold">Gh₵25000</p>
              <div className="text-xs opacity-80">Total Revenue</div>
              <ArrowUpRight size={20} className="opacity-80" />
            </div>
          </CardContent>
        </Card>

        {/* Today Stats */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-foreground">Gh₵20,000</p>
              <Badge variant="outline" className="text-xs">Today</Badge>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Wallet size={14} className="text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Total Outflows</p>
                  <p className="text-sm font-semibold text-foreground">Gh₵12,500</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown size={14} className="text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Pending Outflows</p>
                  <p className="text-sm font-semibold text-foreground">Gh₵7,500</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission / Miz Miles */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-foreground">Gh₵20,000</p>
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

      {/* Middle Row: Refunds/Promo + Pending Outflows */}
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
                    <button className="text-xs text-primary font-medium">See All</button>
                  </div>
                  <div className="space-y-3">
                    {pendingRefunds.map((r, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{r.name} - {r.amount}</p>
                          <p className="text-xs text-muted-foreground">{r.route}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="promotion">
                  <p className="text-sm text-muted-foreground">No active promotions</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">Pending Outflows - Driver</p>
              <button className="text-xs text-primary font-medium">See All</button>
            </div>
            <div className="space-y-3 mb-5">
              {pendingOutflows.map((o, i) => (
                <div key={i} className="py-2 border-b border-border last:border-0">
                  <p className="text-sm font-medium text-foreground">{o.name} - {o.amount}</p>
                  <p className="text-xs text-muted-foreground">{o.route}</p>
                </div>
              ))}
            </div>
            <Button className="w-full rounded-full">Set Fare</Button>
          </CardContent>
        </Card>
      </div>

      {/* Payments Today */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">Payments Today</p>
            <button className="text-xs text-primary font-medium">See All</button>
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
                  <TableCell className="text-sm font-medium">{p.amount}</TableCell>
                  <TableCell className="text-sm">{p.date}</TableCell>
                  <TableCell>
                    <button className="text-xs text-primary font-medium">View</button>
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
            <button className="text-xs text-primary font-medium">See All</button>
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
                    <button className="text-xs text-primary font-medium">Pay</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancePage;
