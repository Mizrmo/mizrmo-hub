import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface AddPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPromotionDialog = ({ open, onOpenChange }: AddPromotionDialogProps) => {
  const [form, setForm] = useState({
    title: "",
    code: "",
    discountType: "",
    eligibility: "",
    startDate: "",
    endDate: "",
    method: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">Add New Promotion</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Promo Title</Label>
            <Input placeholder="Enter Promotion title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Promo Code</Label>
            <Input placeholder="e.g. RIDE20OFF" value={form.code} onChange={(e) => handleChange("code", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Discount Type</Label>
            <Select value={form.discountType} onValueChange={(v) => handleChange("discountType", v)}>
              <SelectTrigger><SelectValue placeholder="Select discount type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
                <SelectItem value="mizmiles">Miz Miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Eligibility</Label>
            <Select value={form.eligibility} onValueChange={(v) => handleChange("eligibility", v)}>
              <SelectTrigger><SelectValue placeholder="Select eligible users" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="new">New Users</SelectItem>
                <SelectItem value="returning">Returning Users</SelectItem>
                <SelectItem value="premium">Premium Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Start Date</Label>
            <Input type="date" value={form.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">End Date</Label>
            <Input type="date" value={form.endDate} onChange={(e) => handleChange("endDate", e.target.value)} />
          </div>
          <div className="space-y-1.5 col-span-2 sm:col-span-1">
            <Label className="text-xs">Promotion Method</Label>
            <Select value={form.method} onValueChange={(v) => handleChange("method", v)}>
              <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automatic</SelectItem>
                <SelectItem value="manual">Manual Code</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="w-full rounded-full mt-4" onClick={() => onOpenChange(false)}>Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddPromotionDialog;
