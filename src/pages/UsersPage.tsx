import { Users, UserCheck, Car, Banknote, Eye, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const usersData = [
  { id: 1, name: "Ibiso Okujagu", status: "Active", rating: 4.8 },
  { id: 2, name: "Goinbo Ebizi", status: "Active", rating: 4.9 },
  { id: 3, name: "Aisha Ibrahim", status: "Inactive", rating: 4.7 },
  { id: 4, name: "Deborah Goinbo", status: "Active", rating: 4.2 },
  { id: 5, name: "John Dokubo", status: "Active", rating: 4.3 },
  { id: 6, name: "Philip Olabode", status: "Inactive", rating: 4.5 },
  { id: 7, name: "David Oladipo", status: "Active", rating: 4.7 },
  { id: 8, name: "John Eze", status: "Active", rating: 4.9 },
];

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  return (
    <div>
      <DashboardHeader title="Users" subtitle="Dashboard" searchPlaceholder="search user" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} label="Total Users" value={1222} />
        <StatsCard icon={UserCheck} label="Active Users" value={1222} />
        <StatsCard icon={Car} label="Active Carpools" value={2} />
        <StatsCard icon={Banknote} label="Total Riders" value={1222} />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Showing</span>
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">8</span>
          <span className="text-sm text-muted-foreground">Category</span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-t border-border">
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">User ID</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Name</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Avg Rating</th>
              <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-3 text-sm text-foreground">{user.id}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
                    className={
                      user.status === "Active"
                        ? "bg-success/10 text-success border-0 hover:bg-success/20"
                        : "bg-warning/10 text-warning border-0 hover:bg-warning/20"
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-3 text-sm text-foreground">{user.rating}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <Pencil size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
          <p className="text-sm text-muted-foreground">Showing 1 to 8 out of 60 records</p>
          <div className="flex items-center gap-2">
            <button className="p-1 text-muted-foreground hover:text-foreground">
              <ChevronLeft size={18} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "text-primary hover:bg-primary/10"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-1 text-muted-foreground hover:text-foreground">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
