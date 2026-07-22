import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { isApiError } from '@/lib/api';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const execute = useCallback(
    async <T>(
      fn: () => Promise<T>,
      options?: {
        successMessage?: string;
        errorMessage?: string;
        onSuccess?: (data: T) => void;
      },
    ): Promise<T | null> => {
      setLoading(true);
      try {
        const result = await fn();
        if (options?.successMessage) {
          toast({ title: options.successMessage });
        }
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const message = isApiError(err)
          ? err.message
          : (options?.errorMessage ?? 'Something went wrong');
        toast({ title: 'Error', description: message, variant: 'destructive' });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast],
  );

  return { execute, loading };
}
