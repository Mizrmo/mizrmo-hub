import { useState } from "react";
import { Car, MapPin, Clock, Banknote, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const activeRides = [
  { id: "RD-001", rider: "Daniel Asante", driver: "Kwame Mensah", pickup: "Tema Station", dropoff: "Kumasi Adum", fare: "GHS 125.00", status: "In Progress" },
  { id: "RD-002", rider: "Samuela Kate", driver: "Ama Serwaa", pickup: "Accra Mall", dropoff: "Legon", fare: "GHS 35.00", status: "In Progress" },
  { id: "RD-003", rider: "John Dokubo", driver: "Nana Agyei", pickup: "East Legon", dropoff: "Airport", fare: "GHS 45.00", status: "Driver Assigned" },
];

const ridesHistory = [
  { id: "RD-100", rider: "Ibiso Okujagu", driver: "Kofi Asante", pickup: "Osu", dropoff: "Cantonments", date: "Sep 30, 2030", fare: "GHS 28.00", status: "Completed" },
  { id: "RD-101", rider: "Goinbo Ebizi", driver: "Efua Mensah", pickup: "Tema", dropoff: "Accra Central", date: "Sep 29, 2030", fare: "GHS 55.00", status: "Completed" },
  { id: "RD-102", rider: "Aisha Ibrahim", driver: "Yaw Boateng", pickup: "Madina", dropoff: "Circle", date: "Sep 29, 2030", fare: "GHS 22.00", status: "Cancelled" },
  { id: "RD-103", rider: "Deborah Goinbo", driver: "Abena Osei", pickup: "Lapaz", dropoff: "Dansoman", date: "Sep 28, 2030", fare: "GHS 18.00", status: "Completed" },
  { id: "RD-104", rider: "Philip Olabode", driver: "Akua Darko", pickup: "Spintex", dropoff: "Teshie", date: "Sep 28, 2030", fare: "GHS 30.00", status: "Completed" },
  { id: "RD-105", rider: "David Oladipo", driver: "Kwame Mensah", pickup: "Achimota", dropoff: "Legon", date: "Sep 27, 2030", fare: "GHS 25.00", status: "Refunded" },
];

const statusStyle = (status: string) => {
  switch (status) {
    case "In Progress": return "bg-primary/10 text-primary border-0";
    case "Driver Assigned": return "bg-warning/10 text-warning border-0";
    case "Completed": return "bg-success/10 text-success border-0";
    case "Cancelled": return "bg-destructive/10 text-destructive border-0";
    case "Refunded": return "bg-muted text-muted-foreground border-0";
    default: return "";
  }
};

const RidesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <DashboardHeader title="Ride Management" subtitle="Dashboard > Rides" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Car} label="Total Rides" value={8450} />
        <StatsCard icon={MapPin} label="Active Rides" value={3} />
        <StatsCard icon={Clock} label="Avg. Duration" value="25 min" />
        <StatsCard icon={Banknote} label="Revenue Today" value="GHS 12,500" />
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0">
          <TabsTrigger
            value="active"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
          >
            Active Rides
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
          >
            Ride History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Ride ID</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Rider</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Pickup</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Drop-off</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Fare</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeRides.map((r) => (
                  <tr key={r.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-primary">{r.id}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{r.rider}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{r.driver}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{r.pickup}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{r.dropoff}</td>
                    <td className="px-6 py-3 text-sm font-medium text-foreground">{r.fare}</td>
                    <td className="px-6 py-3"><Badge className={statusStyle(r.status)}>{r.status}</Badge></td>
                    <td className="px-6 py-3">
                      <button className="text-primary text-sm font-medium hover:underline">Track</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="flex items-center gap-4 mb-4">
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
            <Select>
              <SelectTrigger className="w-36 h-9 rounded-lg border-border text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Ride ID</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Rider</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Route</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Date</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Fare</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                  <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {ridesHistory.map((r) => (
                  <tr key={r.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-primary">{r.id}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{r.rider}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{r.driver}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{r.pickup} → {r.dropoff}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{r.date}</td>
                    <td className="px-6 py-3 text-sm font-medium text-foreground">{r.fare}</td>
                    <td className="px-6 py-3"><Badge className={statusStyle(r.status)}>{r.status}</Badge></td>
                    <td className="px-6 py-3">
                      <button className="text-primary hover:text-primary/80"><Eye size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-4 flex items-center justify-between border-t border-border">
              <p className="text-sm text-muted-foreground">Showing 1 to 6 out of 60 records</p>
              <div className="flex items-center gap-2">
                <button className="p-1 text-muted-foreground hover:text-foreground"><ChevronLeft size={18} /></button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      currentPage === page ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="p-1 text-muted-foreground hover:text-foreground"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RidesPage;
