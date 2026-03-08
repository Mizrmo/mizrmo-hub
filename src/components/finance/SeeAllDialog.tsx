import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface SeeAllDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: "refunds" | "outflows" | "payments" | "topay";
}

const refundsData = [
  { name: "Daniel Asante", amount: "GH₵125", route: "Tema-Kumasi", status: "Pending" },
  { name: "Ama Mensah", amount: "GH₵80", route: "Accra-Cape Coast", status: "Pending" },
  { name: "Kwame Boateng", amount: "GH₵200", route: "Kumasi-Tamale", status: "Approved" },
  { name: "Efua Dartey", amount: "GH₵150", route: "Accra-Ho", status: "Pending" },
  { name: "Kofi Adjei", amount: "GH₵95", route: "Tema-Accra", status: "Declined" },
];

const outflowsData = [
  { name: "Daniel Asante", amount: "GH₵125", route: "Tema-Kumasi", status: "Pending" },
  { name: "Yaw Mensah", amount: "GH₵340", route: "Accra-Kumasi", status: "Pending" },
  { name: "Esi Appiah", amount: "GH₵210", route: "Cape Coast-Accra", status: "Processing" },
  { name: "Nana Osei", amount: "GH₵450", route: "Tamale-Kumasi", status: "Pending" },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Approved": case "Completed": return "bg-green-500/10 text-green-600 border-green-200";
    case "Processing": return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
    case "Declined": return "bg-red-500/10 text-red-600 border-red-200";
    default: return "bg-muted text-muted-foreground";
  }
};

const SeeAllDialog = ({ open, onOpenChange, title, type }: SeeAllDialogProps) => {
  const data = type === "refunds" ? refundsData : outflowsData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Name</TableHead>
              <TableHead className="text-xs">Amount</TableHead>
              <TableHead className="text-xs">Route</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="text-sm font-medium">{item.name}</TableCell>
                <TableCell className="text-sm">{item.amount}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.route}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColor(item.status)}>{item.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default SeeAllDialog;
