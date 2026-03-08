import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";

interface Payment {
  id: string;
  type: string;
  amount: string;
  date: string;
}

interface ViewPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
}

const ViewPaymentDialog = ({ open, onOpenChange, payment }: ViewPaymentDialogProps) => {
  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{payment.id}</p>
              <p className="text-xs text-muted-foreground">{payment.type}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Amount</p>
              <p className="text-lg font-bold text-foreground">{payment.amount}</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Date</p>
              <p className="text-sm font-medium text-foreground">{payment.date}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge className="bg-green-500/10 text-green-600 border-green-200">Completed</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="text-sm font-medium">Mobile Money</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPaymentDialog;
