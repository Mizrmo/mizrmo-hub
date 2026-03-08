import { useState } from "react";
import { MessageSquare, CheckCircle, Clock, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const drivers = [
  { id: 1, name: "Joshua Bala", cardNum: "GHA-001910**.*", expiry: "12- Dec, 2030", status: "Active" },
  { id: 2, name: "Elizabeth Ibe", cardNum: "GHA-001910**.*", expiry: "12- Dec, 2030", status: "Expired" },
  { id: 3, name: "David Usman", cardNum: "GHA-001910**.*", expiry: "12- Dec, 2030", status: "Active" },
  { id: 4, name: "Daniel Opuogbo", cardNum: "GHA-001910**.*", expiry: "12- Dec, 2030", status: "Expired" },
  { id: 5, name: "Paul Ige", cardNum: "GHA-001910**.*", expiry: "12- Dec, 2030", status: "Expired" },
  { id: 6, name: "Hannah Abam", cardNum: "GHA-001910**.*", expiry: "12- Dec, 2030", status: "Active" },
  { id: 7, name: "Michael Saidu", cardNum: "GHA-001910**.*", expiry: "12- Dec, 2030", status: "Expired" },
];

const SecurityPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <DashboardHeader title="Security & Compliance" subtitle="Security & Compliance" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard icon={MessageSquare} label="Total Complaints" value={1222} />
        <StatsCard icon={CheckCircle} label="Total Resolved" value={1222} />
        <StatsCard icon={Clock} label="Pending" value={1222} />
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
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver ID</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Name</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">ID Card-Number</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Expiration Date</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-3 text-sm text-foreground">{d.id}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {d.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{d.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-foreground">{d.cardNum}</td>
                <td className="px-6 py-3 text-sm text-foreground">{d.expiry}</td>
                <td className="px-6 py-3">
                  <Badge
                    className={
                      d.status === "Active"
                        ? "bg-success/10 text-success border-0 hover:bg-success/20"
                        : "bg-destructive/10 text-destructive border-0 hover:bg-destructive/20"
                    }
                  >
                    {d.status}
                  </Badge>
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
          <p className="text-sm text-muted-foreground">Showing 1 to 7 out of 60 records</p>
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

export default SecurityPage;
