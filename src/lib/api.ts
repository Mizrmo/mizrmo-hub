const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
}

const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('admin_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('admin_token');
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
