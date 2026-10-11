import { useState, useEffect } from 'react';
import api, { clearSession } from '@/lib/api';
import type { AdminUser } from '@/types/api.types';

interface AuthState {
  user: AdminUser | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setState({ user: null, loading: false, error: null });
      return;
    }
    api
      .get('/auth/me')
      .then((data: any) => {
        const user: AdminUser = data.user ?? data;
        if (!user.roles?.includes('ADMIN')) {
          clearSession();
          setState({ user: null, loading: false, error: 'Not an admin account' });
          return;
        }
        setState({ user, loading: false, error: null });
      })
      .catch(() => {
        clearSession();
        setState({ user: null, loading: false, error: null });
      });
  }, []);

  return state;
}
