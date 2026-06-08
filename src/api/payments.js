import { apiRequest } from "./http";

/**
 * POST /payments/create-order
 * Creates a Razorpay order for the given subscription plan.
 * Returns: { order: { id, amount, currency, receipt, status, createdAt }, keyId, plan }
 */
export function createPaymentOrder(planId) {
  return apiRequest("payments/create-order", {
    method: "POST",
    auth: true,
    body: { planId },
  });
}

/**
 * POST /payments/verify
 * Verifies Razorpay payment signature and activates subscription.
 * Returns: the newly created subscription record
 */
export function verifyPayment({
  planId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) {
  return apiRequest("payments/verify", {
    method: "POST",
    auth: true,
    body: {
      planId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    },
  });
}
