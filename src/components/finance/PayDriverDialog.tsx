import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface ToPayItem {
  id: string;
  type: string;
  paidTo: string;
  amount: string;
  date: string;
}

interface PayDriverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ToPayItem | null;
}

const PayDriverDialog = ({ open, onOpenChange, item }: PayDriverDialogProps) => {
  const [method, setMethod] = useState("");

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Driver</span>
              <span className="font-medium">{item.paidTo}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold text-lg">{item.amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction</span>
              <span className="font-medium">{item.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Type</span>
              <span>{item.type}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Payment Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger><SelectValue placeholder="Select payment method" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="momo">Mobile Money</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Note (optional)</Label>
            <Input placeholder="Add a note for this payment" />
          </div>
        </div>
        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Confirm Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PayDriverDialog;
