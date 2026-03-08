import { Pencil } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingPage = () => {
  return (
    <div>
      <DashboardHeader title="Pricing" subtitle="Pricing" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-foreground">GH¢20.00</p>
              <p className="text-sm text-muted-foreground">Base Fare</p>
            </div>
            <button className="text-muted-foreground hover:text-primary">
              <Pencil size={18} />
            </button>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-muted-foreground">Cost Per km Distance</p>
              <p className="text-lg font-bold text-foreground">GH¢8.00</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cost Per Min Time</p>
              <p className="text-lg font-bold text-foreground">GH¢7.00</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-foreground">Commission</p>
            </div>
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

      {/* Fare Settings Tabs */}
      <div className="bg-card rounded-xl border border-border p-6">
        <Tabs defaultValue="all-time">
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-6 px-0 mb-6">
            <TabsTrigger
              value="all-time"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
            >
              All Time
            </TabsTrigger>
            <TabsTrigger
              value="set-new"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
            >
              Set New Fare
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-time">
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
                <label className="text-sm font-medium text-foreground mb-2 block">Minimum Estimated Cost</label>
                <Input placeholder="example: GH¢20.00" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Cost/ km Distance</label>
                <Input placeholder="example: GH¢10.00" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Cost/ minute Time</label>
                <Input placeholder="example: GH¢20.00" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Wait Time Cost Per Min</label>
                <Input placeholder="example: GH¢20.00" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Transaction Fee Percentage</label>
                <Input placeholder="example: GH¢20.00" className="h-12 bg-secondary border-0 rounded-lg" />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button className="rounded-full px-16 h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold">
                Submit
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="set-new">
            <p className="text-muted-foreground">Configure new fare settings here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PricingPage;
