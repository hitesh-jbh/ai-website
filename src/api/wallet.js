import { apiRequest } from "./http";

export function getWallet() {
  return apiRequest("wallet", { auth: true });
}

export function getTransactions({ limit = 20, page = 1 } = {}) {
  const qs = new URLSearchParams({ limit: String(limit), page: String(page) });
  return apiRequest(`wallet/transactions?${qs}`, { auth: true });
}

export function getDailyEarnings() {
  return apiRequest("wallet/daily-earnings", { auth: true });
}

export function requestWithdrawal({ amount, method = "upi", upiId }) {
  return apiRequest("wallet/withdraw", {
    method: "POST",
    auth: true,
    body: { amount, method, upiId },
  });
}
