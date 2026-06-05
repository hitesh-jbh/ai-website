import { apiRequest } from "./http";

export function getUserPoints() {
  return apiRequest("rewards/points", { auth: true });
}

export function getUserRewards({ limit = 20, page = 1 } = {}) {
  const qs = new URLSearchParams({ limit: String(limit), page: String(page) });
  return apiRequest(`rewards?${qs}`, { auth: true });
}

export function getRedeemableBalance() {
  return apiRequest("coin-redemptions/redeemable-balance", { auth: true });
}

export function requestRedemption({ coins, upiId }) {
  return apiRequest("coin-redemptions/request", {
    method: "POST",
    auth: true,
    body: { coins, upiId },
  });
}
