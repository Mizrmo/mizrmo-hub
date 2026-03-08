import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Refund {
  name: string;
  amount: string;
  route: string;
}

interface RefundActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refund: Refund | null;
}

const RefundActionDialog = ({ open, onOpenChange, refund }: RefundActionDialogProps) => {
  if (!refund) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Process Refund</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Customer</span>
              <span className="font-medium">{refund.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold">{refund.amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Route</span>
              <span>{refund.route}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Refund Amount</Label>
            <Input defaultValue={refund.amount.replace("GH₵", "")} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Reason</Label>
            <Textarea placeholder="Enter reason for refund..." rows={3} />
          </div>
        </div>
        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Decline</Button>
          <Button onClick={() => onOpenChange(false)}>Approve Refund</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RefundActionDialog;
