// Simple API client with auth token handling
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", options.body instanceof FormData ? undefined : "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const resp = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const isJson = resp.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await resp.json() : await resp.text();
  if (!resp.ok) {
    const message = (isJson && data?.message) || resp.statusText || "Request failed";
    throw new Error(message);
  }
  return data;
}

export const AuthAPI = {
  login: (payload) => apiRequest("/users/login", { method: "POST", body: JSON.stringify(payload) }),
  register: (payload) => apiRequest("/users/register", { method: "POST", body: JSON.stringify(payload) }),
  profile: () => apiRequest("/users/profile", { method: "GET" }),
  updateProfile: (payload) => apiRequest("/users/profile", { method: "PUT", body: JSON.stringify(payload) }),
};

export const StartupAPI = {
  create: (payload) => apiRequest("/startups", { method: "POST", body: JSON.stringify(payload) }),
  mine: () => apiRequest("/startups/mine", { method: "GET" }),
  get: (id) => apiRequest(`/startups/${id}`, { method: "GET" }),
  update: (id, payload) => apiRequest(`/startups/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id) => apiRequest(`/startups/${id}`, { method: "DELETE" }),
};

export const DocumentAPI = {
  requirements: () => apiRequest("/documents/requirements/list", { method: "GET" }),
  upload: (file) => {
    const form = new FormData();
    form.append("file", file);
    return apiRequest("/documents/upload", { method: "POST", body: form });
  },
  get: (id) => apiRequest(`/documents/${id}`, { method: "GET" }),
  reassign: (id, payload) => apiRequest(`/documents/${id}/reassign`, { method: "POST", body: JSON.stringify(payload) }),
  verify: (id) => apiRequest(`/documents/${id}/verify`, { method: "POST" }),
};


