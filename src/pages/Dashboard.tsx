import { UserPlus, Users, Car, DollarSign, Eye, MoreVertical, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const rideData = [
  { time: "8:00", rides: 160 },
  { time: "9:00", rides: 180 },
  { time: "10:00", rides: 220 },
  { time: "11:00", rides: 195 },
  { time: "12:00", rides: 260 },
  { time: "1:00", rides: 240 },
  { time: "2:00", rides: 210 },
  { time: "3:00", rides: 280 },
  { time: "4:00", rides: 310 },
  { time: "5:00", rides: 345 },
];

const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 48000, expenses: 30000 },
  { month: "Mar", revenue: 55000, expenses: 32000 },
  { month: "Apr", revenue: 51000, expenses: 29000 },
  { month: "May", revenue: 62000, expenses: 35000 },
  { month: "Jun", revenue: 68000, expenses: 38000 },
];

const driverPerformance = [
  { name: "5★", count: 420 },
  { name: "4★", count: 310 },
  { name: "3★", count: 120 },
  { name: "2★", count: 45 },
  { name: "1★", count: 15 },
];

const rideTypeData = [
  { name: "Intercity", value: 45, color: "hsl(var(--primary))" },
  { name: "In-city", value: 30, color: "hsl(var(--accent))" },
  { name: "Airport", value: 15, color: "hsl(var(--success))" },
  { name: "Charter", value: 10, color: "hsl(var(--warning))" },
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
        <StatsCard icon={UserPlus} label="Total Sign Up" value="1,222" trend={{ value: 12, up: true }} />
        <StatsCard icon={Users} label="Active Users" value="987" trend={{ value: 8, up: true }} />
        <StatsCard icon={Car} label="Total Drivers" value="345" trend={{ value: 3, up: false }} />
        <StatsCard icon={DollarSign} label="Revenue" value="GH¢68K" trend={{ value: 15, up: true }} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Rides Today - Area Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Rides Today</h3>
              <p className="text-sm text-muted-foreground">Hourly ride volume</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-success" />
              <span className="text-2xl font-bold text-foreground">345</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={rideData}>
              <defs>
                <linearGradient id="rideGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Area type="monotone" dataKey="rides" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#rideGrad)" dot={{ fill: "hsl(var(--primary))", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Ride Types - Pie Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Ride Types</h3>
          <p className="text-sm text-muted-foreground mb-4">Distribution by category</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={rideTypeData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                {rideTypeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {rideTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-semibold text-foreground ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trends */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Revenue vs Expenses</h3>
              <p className="text-sm text-muted-foreground">Monthly overview (GH¢)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barGap={4}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => [`GH¢${v.toLocaleString()}`, ""]} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Driver Performance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Driver Ratings</h3>
              <p className="text-sm text-muted-foreground">Rating distribution</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={driverPerformance} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={30} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
