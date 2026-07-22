import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'default';
}

const statusStyles: Record<string, string> = {
  APPROVED: 'bg-success/10 text-success border-0',
  COMPLETED: 'bg-success/10 text-success border-0',
  ACTIVE: 'bg-success/10 text-success border-0',
  Active: 'bg-success/10 text-success border-0',
  Completed: 'bg-success/10 text-success border-0',
  PENDING: 'bg-warning/10 text-warning border-0',
  PENDING_REVIEW: 'bg-warning/10 text-warning border-0',
  SCHEDULED: 'bg-warning/10 text-warning border-0',
  Pending: 'bg-warning/10 text-warning border-0',
  REJECTED: 'bg-destructive/10 text-destructive border-0',
  CANCELLED: 'bg-destructive/10 text-destructive border-0',
  SUSPENDED: 'bg-destructive/10 text-destructive border-0',
  Inactive: 'bg-destructive/10 text-destructive border-0',
  Cancelled: 'bg-destructive/10 text-destructive border-0',
  IN_PROGRESS: 'bg-primary/10 text-primary border-0',
  OPEN: 'bg-primary/10 text-primary border-0',
  'In Progress': 'bg-primary/10 text-primary border-0',
  CLOSED: 'bg-muted text-muted-foreground border-0',
  EXPIRED: 'bg-muted text-muted-foreground border-0',
  RESOLVED: 'bg-success/10 text-success border-0',
};

export function StatusBadge({ status, size }: StatusBadgeProps) {
  const style = statusStyles[status] ?? 'bg-muted text-muted-foreground border-0';
  return (
    <Badge className={cn(style, size === 'sm' && 'text-xs px-2 py-0')}>
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}
