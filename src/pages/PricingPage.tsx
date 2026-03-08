import { useState } from "react";
import { Pencil, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pricingData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  costKm: "GH₵20.00",
  costMin: "GH₵15.00",
  txnFee: "40%",
  from: "Jan 2024",
  to: "Dec, 2024",
}));

const PricingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <DashboardHeader title="Pricing" subtitle="Pricing" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-foreground">Gh₵20.00</p>
              <p className="text-sm text-muted-foreground">Base Fare</p>
            </div>
            <button className="text-muted-foreground hover:text-primary">
              <Pencil size={18} />
            </button>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-muted-foreground">Cost Per km Distance</p>
              <p className="text-lg font-bold text-foreground">Gh₵8.00</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cost Per Min Time</p>
              <p className="text-lg font-bold text-foreground">Gh₵7.00</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-bold text-foreground">Commission</p>
            <button className="text-muted-foreground hover:text-primary">
              <Pencil size={18} />
            </button>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-muted-foreground">Driver's Share</p>
              <p className="text-lg font-bold text-foreground">60%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">mizrmo's Share</p>
              <p className="text-lg font-bold text-foreground">40%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs with Table */}
      <div className="bg-card rounded-xl border border-border p-6">
        <Tabs defaultValue="all-time">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0">
              <TabsTrigger
                value="all-time"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
              >
                All Time
              </TabsTrigger>
              <TabsTrigger
                value="set-new"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
              >
                Set New Fare
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <Select defaultValue="2021">
                <SelectTrigger className="w-28 h-9 rounded-lg border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">Showing</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-20 h-9 rounded-full bg-primary text-primary-foreground border-0 text-sm font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all-time">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-semibold text-foreground px-4 py-3">Price ID</th>
                  <th className="text-left text-sm font-semibold text-foreground px-4 py-3">Cost/ km Distance</th>
                  <th className="text-left text-sm font-semibold text-foreground px-4 py-3">Cost/ min time</th>
                  <th className="text-left text-sm font-semibold text-foreground px-4 py-3">Transaction Fee</th>
                  <th className="text-left text-sm font-semibold text-foreground px-4 py-3">From</th>
                  <th className="text-left text-sm font-semibold text-foreground px-4 py-3">To</th>
                  <th className="text-left text-sm font-semibold text-foreground px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((p) => (
                  <tr key={p.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">{p.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{p.costKm}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{p.costMin}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{p.txnFee}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{p.from}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{p.to}</td>
                    <td className="px-4 py-3">
                      <button className="text-primary hover:text-primary/80"><Eye size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>

          <TabsContent value="set-new">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Minimum Estimated Distance</label>
                <Input placeholder="example: 5km" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Minimum Estimated Time</label>
                <Input placeholder="example: 30mins" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Cost/ km Distance</label>
                <Input placeholder="example: GH₵10.00" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Cost/ minute Time</label>
                <Input placeholder="example: GH₵20.00" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Transaction Fee %</label>
                <Input placeholder="example: 40%" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Wait Time Cost Per Min</label>
                <Input placeholder="example: GH₵2.00" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button className="rounded-full px-16 h-12 text-base font-semibold">Submit</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PricingPage;
