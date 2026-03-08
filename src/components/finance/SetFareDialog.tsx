import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface SetFareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SetFareDialog = ({ open, onOpenChange }: SetFareDialogProps) => {
  const [form, setForm] = useState({ route: "", baseFare: "", perKm: "", surge: "" });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Set Fare</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Route</Label>
            <Select value={form.route} onValueChange={(v) => setForm((p) => ({ ...p, route: v }))}>
              <SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tema-kumasi">Tema — Kumasi</SelectItem>
                <SelectItem value="accra-cape">Accra — Cape Coast</SelectItem>
                <SelectItem value="kumasi-tamale">Kumasi — Tamale</SelectItem>
                <SelectItem value="accra-ho">Accra — Ho</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Base Fare (GH₵)</Label>
              <Input type="number" placeholder="0.00" value={form.baseFare} onChange={(e) => setForm((p) => ({ ...p, baseFare: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Per Km (GH₵)</Label>
              <Input type="number" placeholder="0.00" value={form.perKm} onChange={(e) => setForm((p) => ({ ...p, perKm: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Surge Multiplier</Label>
            <Select value={form.surge} onValueChange={(v) => setForm((p) => ({ ...p, surge: v }))}>
              <SelectTrigger><SelectValue placeholder="Select multiplier" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1x (Normal)</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
                <SelectItem value="2.5">2.5x</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Save Fare</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetFareDialog;
