import { InboxIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <InboxIcon className="h-10 w-10 text-muted-foreground/40" />
      <p className="font-medium text-foreground">{title}</p>
      {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
