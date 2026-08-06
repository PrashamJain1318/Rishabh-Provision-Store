const BASE_URL = "http://localhost:5001/api/v1";

export const api = {
  async get(endpoint: string, options: any = {}) {
    let url = `${BASE_URL}${endpoint}`;
    if (options.params) {
      const query = new URLSearchParams(options.params).toString();
      if (query) url += `?${query}`;
    }
    const token = localStorage.getItem("accessToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, { method: "GET", headers });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP error ${response.status}`);
    }
    return { data };
  },

  async post(endpoint: string, body: any = {}, options: any = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const token = localStorage.getItem("accessToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP error ${response.status}`);
    }
    return { data };
  },
};

export default api;
