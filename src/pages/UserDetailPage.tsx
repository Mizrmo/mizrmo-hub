import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, CheckCircle, Shield, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, MessageSquare } from "lucide-react";

const UserDetailPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  return (
    <div>
      <DashboardHeader title="Users" subtitle="Dashboard" />

      {/* User Profile + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="p-6 flex items-start gap-5">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">SK</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <div />
                <button className="text-muted-foreground hover:text-primary"><Pencil size={16} /></button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} className="text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="font-medium text-foreground">Samuela Kate</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">samuelak@email.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone Number</p>
                    <p className="font-medium text-foreground">+233 50 123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <StatsCard icon={Car} label="Total Rides" value={1222} />
          <StatsCard icon={Car} label="Total Rides" value={1222} />
          <StatsCard icon={CheckCircle} label="Verification Status" value="Verified" />
          <StatsCard icon={Shield} label="Account Status" value="Active" />
        </div>
      </div>

      {/* Tabs Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Tabs defaultValue="transaction" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0">
                  <TabsTrigger
                    value="document"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
                  >
                    Document
                  </TabsTrigger>
                  <TabsTrigger
                    value="miz-miles"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
                  >
                    Miz Miles
                  </TabsTrigger>
                  <TabsTrigger
                    value="transaction"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
                  >
                    Transaction
                  </TabsTrigger>
                  <TabsTrigger
                    value="trip-history"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground"
                  >
                    Trip History
                  </TabsTrigger>
                </TabsList>

                <Select>
                  <SelectTrigger className="w-36 h-9 rounded-lg border-border text-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="recent">Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="document">
                <p className="text-sm text-muted-foreground py-8 text-center">No documents uploaded yet.</p>
              </TabsContent>
              <TabsContent value="miz-miles">
                <p className="text-sm text-muted-foreground py-8 text-center">No Miz Miles activity yet.</p>
              </TabsContent>
              <TabsContent value="transaction">
                <p className="text-sm text-muted-foreground py-8 text-center">No transactions yet.</p>
              </TabsContent>
              <TabsContent value="trip-history">
                <p className="text-sm text-muted-foreground py-8 text-center">No trip history yet.</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border pt-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailPage;
