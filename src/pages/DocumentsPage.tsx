import { useState } from "react";
import { FileText, CheckCircle, Clock, AlertTriangle, ChevronLeft, ChevronRight, Eye, Download } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatsCard from "@/components/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userDocs = [
  { id: 1, name: "Daniel Asante", docType: "National ID", docNum: "GHA-001910**.*", uploaded: "Sep 15, 2030", status: "Verified" },
  { id: 2, name: "Samuela Kate", docType: "Passport", docNum: "GHA-287410**.*", uploaded: "Sep 12, 2030", status: "Pending" },
  { id: 3, name: "John Dokubo", docType: "Voter's ID", docNum: "GHA-553210**.*", uploaded: "Sep 10, 2030", status: "Verified" },
  { id: 4, name: "Ibiso Okujagu", docType: "National ID", docNum: "GHA-118910**.*", uploaded: "Sep 08, 2030", status: "Rejected" },
  { id: 5, name: "Goinbo Ebizi", docType: "Driver's License", docNum: "GHA-774510**.*", uploaded: "Sep 05, 2030", status: "Verified" },
  { id: 6, name: "Aisha Ibrahim", docType: "National ID", docNum: "GHA-339010**.*", uploaded: "Sep 03, 2030", status: "Pending" },
];

const driverDocs = [
  { id: 1, name: "Kwame Mensah", docType: "Driver's License", docNum: "DL-290110**.*", uploaded: "Sep 20, 2030", expiry: "Dec 2032", status: "Verified" },
  { id: 2, name: "Ama Serwaa", docType: "Vehicle Insurance", docNum: "INS-44210**.*", uploaded: "Sep 18, 2030", expiry: "Mar 2031", status: "Verified" },
  { id: 3, name: "Kofi Asante", docType: "Driver's License", docNum: "DL-112010**.*", uploaded: "Sep 15, 2030", expiry: "Jan 2031", status: "Expired" },
  { id: 4, name: "Efua Mensah", docType: "Vehicle Registration", docNum: "VR-778910**.*", uploaded: "Sep 14, 2030", expiry: "Jun 2031", status: "Verified" },
  { id: 5, name: "Yaw Boateng", docType: "Roadworthiness", docNum: "RW-553210**.*", uploaded: "Sep 12, 2030", expiry: "Sep 2030", status: "Expired" },
  { id: 6, name: "Nana Agyei", docType: "Driver's License", docNum: "DL-887710**.*", uploaded: "Sep 10, 2030", expiry: "Aug 2033", status: "Pending" },
];

const statusStyle = (status: string) => {
  switch (status) {
    case "Verified": return "bg-success/10 text-success border-0";
    case "Pending": return "bg-warning/10 text-warning border-0";
    case "Rejected": return "bg-destructive/10 text-destructive border-0";
    case "Expired": return "bg-destructive/10 text-destructive border-0";
    default: return "";
  }
};

const Pagination = ({ currentPage, setCurrentPage }: { currentPage: number; setCurrentPage: (p: number) => void }) => (
  <div className="px-6 py-4 flex items-center justify-between border-t border-border">
    <p className="text-sm text-muted-foreground">Showing 1 to 6 out of 60 records</p>
    <div className="flex items-center gap-2">
      <button className="p-1 text-muted-foreground hover:text-foreground"><ChevronLeft size={18} /></button>
      {[1, 2, 3].map((page) => (
        <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${currentPage === page ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10"}`}>{page}</button>
      ))}
      <button className="p-1 text-muted-foreground hover:text-foreground"><ChevronRight size={18} /></button>
    </div>
  </div>
);

const DocumentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <DashboardHeader title="Documents" subtitle="Dashboard > Documents" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={FileText} label="Total Documents" value={3450} />
        <StatsCard icon={CheckCircle} label="Verified" value={2800} />
        <StatsCard icon={Clock} label="Pending Review" value={420} />
        <StatsCard icon={AlertTriangle} label="Expired" value={230} />
      </div>

      <Tabs defaultValue="user-docs" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="bg-transparent border-b border-border rounded-none justify-start gap-6 px-0">
            <TabsTrigger value="user-docs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground">
              User Documents
            </TabsTrigger>
            <TabsTrigger value="driver-docs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none px-1 pb-3 text-muted-foreground">
              Driver Documents
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-36 h-9 rounded-lg border-border text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="10">
              <SelectTrigger className="w-20 h-9 rounded-full bg-primary text-primary-foreground border-0 text-sm font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* User Documents */}
        <TabsContent value="user-docs">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">ID</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Name</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Document Type</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Document No.</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Uploaded</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userDocs.map((d) => (
                    <tr key={d.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-foreground">{d.id}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{d.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">{d.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground">{d.docType}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{d.docNum}</td>
                      <td className="px-6 py-3 text-sm text-foreground">{d.uploaded}</td>
                      <td className="px-6 py-3"><Badge className={statusStyle(d.status)}>{d.status}</Badge></td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button className="text-primary hover:text-primary/80"><Eye size={16} /></button>
                          <button className="text-muted-foreground hover:text-foreground"><Download size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </TabsContent>

        {/* Driver Documents */}
        <TabsContent value="driver-docs">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">ID</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Driver</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Document Type</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Document No.</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Uploaded</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Expiry</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Status</th>
                    <th className="text-left text-sm font-semibold text-foreground px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {driverDocs.map((d) => (
                    <tr key={d.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-foreground">{d.id}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{d.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">{d.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground">{d.docType}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{d.docNum}</td>
                      <td className="px-6 py-3 text-sm text-foreground">{d.uploaded}</td>
                      <td className="px-6 py-3 text-sm text-foreground">{d.expiry}</td>
                      <td className="px-6 py-3"><Badge className={statusStyle(d.status)}>{d.status}</Badge></td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button className="text-primary hover:text-primary/80"><Eye size={16} /></button>
                          <button className="text-muted-foreground hover:text-foreground"><Download size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsPage;
