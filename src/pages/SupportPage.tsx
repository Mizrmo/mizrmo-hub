import { useState } from "react";
import { MessageSquare, CheckCircle, Clock, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reports = [
  { id: 1, user: "Ifechukwu Anozie", type: "Driver Behaviour", issue: "The promo is applied automatically when users meet...", date: "Sep 30, 2030", status: "Resolved" },
  { id: 2, user: "Gbegba Bozimo", type: "App Issue", issue: "The promo is applied automatically when users meet...", date: "Dec 31, 2030", status: "Resolved" },
  { id: 3, user: "Ibim Tamuno", type: "Passenger Behaviour", issue: "The promo is applied automatically when users meet...", date: "Jan 01, 2030", status: "Resolved" },
  { id: 4, user: "Esther Ogan", type: "Ride Quality", issue: "The promo is applied automatically when users meet...", date: "Mar 06, 2030", status: "Resolved" },
  { id: 5, user: "Mary Ige", type: "Driver Behaviour", issue: "The promo is applied automatically when users meet...", date: "Jun 16, 2030", status: "Resolved" },
  { id: 6, user: "Hannah Nwabueze", type: "Driver Behaviour", issue: "The promo is applied automatically when users meet...", date: "Aug 04, 2030", status: "Resolved" },
];

const SupportPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <DashboardHeader title="Support & Communication" subtitle="Support & Communication" />

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
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-36 h-9 rounded-lg border-border text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="driver">Driver Behaviour</SelectItem>
            <SelectItem value="app">App Issue</SelectItem>
            <SelectItem value="passenger">Passenger Behaviour</SelectItem>
            <SelectItem value="ride">Ride Quality</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Report ID</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">User</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Type</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Issue</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Submitted On</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-8 rounded-full bg-accent" />
                    <span className="text-sm text-foreground">{r.id}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-foreground">{r.user}</td>
                <td className="px-6 py-3 text-sm text-foreground">{r.type}</td>
                <td className="px-6 py-3 text-sm text-muted-foreground max-w-[200px] truncate">{r.issue}</td>
                <td className="px-6 py-3 text-sm text-foreground">{r.date}</td>
                <td className="px-6 py-3">
                  <Badge className="bg-success/10 text-success border-0 hover:bg-success/20">{r.status}</Badge>
                </td>
                <td className="px-6 py-3">
                  <button className="text-primary text-sm font-medium hover:underline">View</button>
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

export default SupportPage;
