import { getAccessToken, getRefreshToken, setTokenPair, clearTokens } from "../auth/tokenStorage";

function joinUrl(base, path) {
  const normalizedBase = String(base || "").replace(/\/+$/, "");
  const normalizedPath = String(path || "").replace(/^\/+/, "");
  return `${normalizedBase}/${normalizedPath}`;
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
}

async function readJsonSafe(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export class ApiError extends Error {
  constructor(message, { status, payload } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export async function apiRequest(path, { method = "GET", body, auth = false, headers } = {}) {
  const url = joinUrl(getApiBaseUrl(), path);

  const finalHeaders = {
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...(headers || {}),
  };

  if (auth) {
    const token = getAccessToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await readJsonSafe(res);

  if (res.ok && payload?.success !== false) {
    return payload?.data ?? payload;
  }

  // Handle common auth error: expired/invalid token
  if (res.status === 401 && auth) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshed = await apiRequest("auth/refresh", {
        method: "POST",
        body: { refreshToken },
        auth: false,
      });

      if (refreshed?.accessToken && refreshed?.refreshToken) {
        setTokenPair(refreshed);
        return apiRequest(path, { method, body, auth, headers });
      }
    }

    clearTokens();
  }

  const message = payload?.message || `Request failed (${res.status})`;
  throw new ApiError(message, { status: res.status, payload });
}

