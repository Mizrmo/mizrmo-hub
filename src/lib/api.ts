// Using a placeholder for now, user can replace it with the actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://mizrmo-backend.vercel.app";

const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("admin_token");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return response.json();
  },

  get(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, { ...options, method: "GET" });
  },

  post(endpoint: string, body: any, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  patch(endpoint: string, body?: any, options?: RequestInit) {
    return this.request(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  },
};

export default api;
