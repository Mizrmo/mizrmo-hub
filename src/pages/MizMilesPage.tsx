import { useState } from "react";
import { Heart, Award, Gift, TrendingUp, ChevronLeft, ChevronRight, Star } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tiers = [
  { name: "Bronze", minMiles: 0, maxMiles: 500, color: "bg-orange-400", benefits: ["1% fare discount", "Birthday bonus miles"] },
  { name: "Silver", minMiles: 500, maxMiles: 1500, color: "bg-gray-400", benefits: ["3% fare discount", "Priority support", "1 free cancel/month"] },
  { name: "Gold", minMiles: 1500, maxMiles: 3000, color: "bg-yellow-500", benefits: ["5% fare discount", "Priority matching", "3 free cancels/month"] },
  { name: "Platinum", minMiles: 3000, maxMiles: 5000, color: "bg-blue-500", benefits: ["10% fare discount", "VIP support", "5 free cancels/month", "Airport lounge access"] },
];

const recentActivity = [
  { user: "Daniel Asante", action: "Earned 15 miles", type: "Ride Completion", date: "Sep 30, 2030", miles: "+15" },
  { user: "Samuela Kate", action: "Redeemed 200 miles", type: "Fare Discount", date: "Sep 29, 2030", miles: "-200" },
  { user: "John Dokubo", action: "Earned 12 miles", type: "Ride Completion", date: "Sep 29, 2030", miles: "+12" },
  { user: "Ibiso Okujagu", action: "Earned 50 miles", type: "Referral Bonus", date: "Sep 28, 2030", miles: "+50" },
  { user: "Goinbo Ebizi", action: "Redeemed 500 miles", type: "Free Ride", date: "Sep 28, 2030", miles: "-500" },
  { user: "Aisha Ibrahim", action: "Earned 8 miles", type: "Ride Completion", date: "Sep 27, 2030", miles: "+8" },
];

const redemptionOptions = [
  { name: "Fare Discount (5%)", miles: 100, description: "Get 5% off your next ride fare" },
  { name: "Fare Discount (10%)", miles: 200, description: "Get 10% off your next ride fare" },
  { name: "Free Short Ride", miles: 500, description: "One free ride up to Gh₵30 value" },
  { name: "Free Long Ride", miles: 1000, description: "One free ride up to Gh₵100 value" },
  { name: "Airport Transfer", miles: 1500, description: "Free airport pickup or drop-off" },
  { name: "Weekend Pass", miles: 2000, description: "Unlimited rides for one weekend" },
];

const MizMilesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <DashboardHeader title="Miz Miles" subtitle="Dashboard > Miz Miles" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Heart} label="Total Miles Issued" value="125,000" />
        <StatsCard icon={Gift} label="Miles Redeemed" value="45,000" />
        <StatsCard icon={TrendingUp} label="Active Members" value={2340} />
        <StatsCard icon={Award} label="Gold+ Members" value={185} />
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0">
          <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground">
            Activity
          </TabsTrigger>
          <TabsTrigger value="tiers" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground">
            Tiers
          </TabsTrigger>
          <TabsTrigger value="redemption" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground">
            Redemption Options
          </TabsTrigger>
        </TabsList>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">User</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Type</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Date</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Miles</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((a, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-foreground">{a.user}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{a.action}</td>
                    <td className="px-6 py-3">
                      <Badge variant="outline" className="text-xs">{a.type}</Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{a.date}</td>
                    <td className="px-6 py-3">
                      <span className={`text-sm font-semibold ${a.miles.startsWith("+") ? "text-success" : "text-destructive"}`}>
                        {a.miles}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 flex items-center justify-between border-t border-border">
              <p className="text-sm text-muted-foreground">Showing 1 to 6 out of 120 records</p>
              <div className="flex items-center gap-2">
                <button className="p-1 text-muted-foreground hover:text-foreground"><ChevronLeft size={18} /></button>
                {[1, 2, 3].map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${currentPage === page ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10"}`}>{page}</button>
                ))}
                <button className="p-1 text-muted-foreground hover:text-foreground"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tiers Tab */}
        <TabsContent value="tiers">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tiers.map((tier) => (
              <Card key={tier.name} className="overflow-hidden">
                <div className={`${tier.color} h-2`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${tier.color} flex items-center justify-center`}>
                        <Star size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                        <p className="text-xs text-muted-foreground">{tier.minMiles.toLocaleString()} – {tier.maxMiles.toLocaleString()} miles</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{tier.minMiles.toLocaleString()}</span>
                      <span>{tier.maxMiles.toLocaleString()}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2">Benefits:</p>
                    <ul className="space-y-1">
                      {tier.benefits.map((b, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Redemption Tab */}
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
                      <h4 className="text-sm font-bold text-foreground">{opt.name}</h4>
                      <p className="text-xs text-primary font-semibold">{opt.miles.toLocaleString()} miles</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{opt.description}</p>
                  <Button variant="outline" size="sm" className="w-full rounded-full text-xs">
                    Edit Option
                  </Button>
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
