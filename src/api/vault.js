import { apiRequest } from "./http";

export function getUserVaults({ limit = 20, offset = 0 } = {}) {
  const qs = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  return apiRequest(`vaults?${qs}`, { auth: true });
}

export function getSavedVaults({ limit = 20, offset = 0 } = {}) {
  const qs = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  return apiRequest(`vaults/saved?${qs}`, { auth: true });
}

export function getFollowedVaults({ limit = 20, offset = 0 } = {}) {
  const qs = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  return apiRequest(`vaults/followed?${qs}`, { auth: true });
}

export function createVault({ title, description, summary, name, email, mobileNumber }) {
  return apiRequest("vaults", {
    method: "POST",
    auth: true,
    body: { title, description, summary, name, email, mobileNumber },
  });
}

export function followVault(vaultId) {
  return apiRequest(`vaults/${vaultId}/follow`, { method: "POST", auth: true });
}

export function unfollowVault(vaultId) {
  return apiRequest(`vaults/${vaultId}/follow`, { method: "DELETE", auth: true });
}

export function saveVault(vaultId) {
  return apiRequest(`vaults/${vaultId}/save`, { method: "POST", auth: true });
}

export function unsaveVault(vaultId) {
  return apiRequest(`vaults/${vaultId}/save`, { method: "DELETE", auth: true });
}
