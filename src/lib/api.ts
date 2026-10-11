const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

const REQUEST_TIMEOUT_MS = 20000;

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
}

export function clearSession() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_refresh_token');
}

let refreshInFlight: Promise<boolean> | null = null;

// Access tokens are short-lived; trade the refresh token for a new pair once
// (shared across concurrent 401s) instead of logging the admin out.
function refreshAccessToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem('admin_refresh_token');
  if (!refreshToken) return Promise.resolve(false);
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
      .then(async (res) => {
        if (!res.ok) return false;
        const data = await res.json();
        if (!data.accessToken) return false;
        localStorage.setItem('admin_token', data.accessToken);
        if (data.refreshToken) localStorage.setItem('admin_refresh_token', data.refreshToken);
        return true;
      })
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

const api = {
  async request(endpoint: string, options: RequestInit = {}, isRetry = false): Promise<any> {
    const token = localStorage.getItem('admin_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    // Never let a hung request leave a page spinning forever.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        signal: options.signal ?? controller.signal,
      });
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') {
        throw { message: 'Request timed out. Please try again.', statusCode: 408 } as ApiError;
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }

    // A 401 from login/refresh themselves (e.g. a wrong password) is a normal
    // error to show, not an expired session.
    if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
      if (!isRetry && (await refreshAccessToken())) {
        return this.request(endpoint, options, true);
      }
      clearSession();
      window.location.href = '/';
      throw { message: 'Session expired', statusCode: 401 } as ApiError;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || `API Error: ${response.status}`,
        statusCode: response.status,
        errors: errorData.errors,
      } as ApiError;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },

  get(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint: string, body: unknown, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  patch(endpoint: string, body?: unknown, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  delete(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },

  upload(endpoint: string, formData: FormData, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
    });
  },
};

export default api;
