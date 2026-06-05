import { apiRequest } from "./http";

export function getCurrentSubscriptionStatus() {
  return apiRequest("subscriptions/current/status", { auth: true });
}

export function activateFreePlan() {
  return apiRequest("subscriptions/free", { method: "POST", auth: true });
}

export function getSubscriptionPlans() {
  return apiRequest("subscription-plans", { auth: false });
}
