import { UserPlus, Users, Car, DollarSign, Eye, MoreVertical } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const chartData = [
  { time: "8:00PM", rides: 160 },
  { time: "8:30PM", rides: 170 },
  { time: "9:00PM", rides: 180 },
  { time: "9:30PM", rides: 200 },
  { time: "10:00PM", rides: 175 },
  { time: "10:30PM", rides: 165 },
  { time: "11:00", rides: 155 },
  { time: "11:30", rides: 160 },
];

const activeRides = [
  { name: "Daniel Asante", amount: "GH¢22.00" },
  { name: "Diobu Okujagu", amount: "GH¢32.00" },
  { name: "Lydia Aliyu", amount: "GH¢15.00" },
  { name: "Daniel Gbobo", amount: "GH¢35.00" },
];

const verifyAccounts = [
  { name: "Adela Parkson", role: "Driver" },
  { name: "Christian Mad", role: "Rider" },
  { name: "Jason Statham", role: "Rider" },
];

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader title="Main Dashboard" subtitle="Dashboard" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={UserPlus} label="Total Sign Up" value={1222} />
        <StatsCard icon={Users} label="Total Active Users" value={1222} />
        <StatsCard icon={Car} label="Total Drivers" value={1222} />
        <StatsCard icon={DollarSign} label="Total Riders" value={1222} />
      </div>

      {/* Chart */}
      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Today, 13 Sep 2021</span>
            <span className="text-sm text-muted-foreground">Category</span>
          </div>
          <p className="text-2xl font-bold text-foreground">345 Rides</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
              }}
            />
            <Line
              type="monotone"
              dataKey="rides"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--accent))", r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--accent))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Rides */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Active Rides</h3>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>
          <div className="space-y-3">
            {activeRides.map((ride, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {ride.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">Ride</p>
                    <p className="text-sm font-medium text-foreground">{ride.name}</p>
                  </div>
                  <span className="text-sm text-foreground ml-2">{ride.amount}</span>
                </div>
                <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                  <Eye size={14} className="mr-1" /> View
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Verify Account Details */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Verify Account Details</h3>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>
          <div className="space-y-3">
            {verifyAccounts.map((account, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {account.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{account.name}</p>
                    <p className="text-xs text-muted-foreground">{account.role}</p>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreVertical size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
