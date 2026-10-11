import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api, { isApiError } from "@/lib/api";

interface DeleteAccountDialogProps {
  open: boolean;
  userId: string;
  name: string;
  onClose: () => void;
  onDeleted: () => void;
}

const CONFIRM_WORD = "DELETE";

export function DeleteAccountDialog({ open, userId, name, onClose, onDeleted }: DeleteAccountDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setConfirmText("");
      setReason("");
      setError("");
    }
  }, [open]);

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await api.delete(`/admin/users/${userId}`, {
        body: JSON.stringify({ reason: reason.trim() || undefined }),
      });
      onDeleted();
    } catch (err) {
      setError(isApiError(err) ? err.message : "Failed to delete the account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !loading && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>
            This permanently deletes {name}&apos;s account. Their personal details are erased, they are signed out
            everywhere and can never log in again. Bookings and payment records are kept for accounting. This cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Reason (optional, saved in the audit log)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={loading}
          />
          <div>
            <p className="text-sm text-muted-foreground mb-1.5">
              Type <span className="font-semibold text-foreground">{CONFIRM_WORD}</span> to confirm
            </p>
            <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} disabled={loading} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading || confirmText !== CONFIRM_WORD}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Delete account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
