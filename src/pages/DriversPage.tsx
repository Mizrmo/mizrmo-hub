import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, Car, Banknote, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const driversData = [
  { id: 1, name: "Kwame Mensah", vehicle: "Toyota Corolla", plate: "GR-1234-20", rating: 4.9, rides: 342, status: "Active", earnings: "GHS 12,500" },
  { id: 2, name: "Ama Serwaa", vehicle: "Honda Civic", plate: "AS-5678-21", rating: 4.7, rides: 215, status: "Active", earnings: "GHS 8,200" },
  { id: 3, name: "Kofi Asante", vehicle: "Hyundai Accent", plate: "BA-9012-22", rating: 4.5, rides: 178, status: "Inactive", earnings: "GHS 6,400" },
  { id: 4, name: "Efua Mensah", vehicle: "Kia Rio", plate: "CR-3456-20", rating: 4.8, rides: 290, status: "Active", earnings: "GHS 10,800" },
  { id: 5, name: "Yaw Boateng", vehicle: "Toyota Yaris", plate: "GR-7890-21", rating: 4.3, rides: 156, status: "Suspended", earnings: "GHS 5,100" },
  { id: 6, name: "Abena Osei", vehicle: "Nissan Versa", plate: "AS-2345-22", rating: 4.6, rides: 203, status: "Active", earnings: "GHS 7,600" },
  { id: 7, name: "Nana Agyei", vehicle: "Hyundai Elantra", plate: "BA-6789-20", rating: 4.9, rides: 410, status: "Active", earnings: "GHS 15,200" },
  { id: 8, name: "Akua Darko", vehicle: "Honda Fit", plate: "CR-0123-21", rating: 4.4, rides: 132, status: "Pending", earnings: "GHS 3,800" },
];

const statusStyle = (status: string) => {
  switch (status) {
    case "Active": return "bg-success/10 text-success border-0 hover:bg-success/20";
    case "Inactive": return "bg-muted text-muted-foreground border-0";
    case "Suspended": return "bg-destructive/10 text-destructive border-0 hover:bg-destructive/20";
    case "Pending": return "bg-warning/10 text-warning border-0 hover:bg-warning/20";
    default: return "";
  }
};

const DriversPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  return (
    <div>
      <DashboardHeader title="Driver Management" subtitle="Dashboard > Drivers" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} label="Total Drivers" value={1222} />
        <StatsCard icon={UserCheck} label="Active Drivers" value={980} />
        <StatsCard icon={Car} label="Online Now" value={45} />
        <StatsCard icon={Banknote} label="Total Earnings" value="GHS 125K" />
      </div>

      {/* Filters */}
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">ID</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Vehicle</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Plate</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Rating</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Rides</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Earnings</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {driversData.map((d) => (
              <tr key={d.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-3 text-sm text-foreground">{d.id}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {d.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{d.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-foreground">{d.vehicle}</td>
                <td className="px-6 py-3 text-sm text-muted-foreground">{d.plate}</td>
                <td className="px-6 py-3 text-sm text-foreground">⭐ {d.rating}</td>
                <td className="px-6 py-3 text-sm text-foreground">{d.rides}</td>
                <td className="px-6 py-3 text-sm font-medium text-foreground">{d.earnings}</td>
                <td className="px-6 py-3">
                  <Badge className={statusStyle(d.status)}>{d.status}</Badge>
                </td>
                <td className="px-6 py-3">
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
          <p className="text-sm text-muted-foreground">Showing 1 to 8 out of 60 records</p>
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
    </div>
  );
};

export default DriversPage;
