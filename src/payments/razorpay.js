const RAZORPAY_SDK_URL = "https://checkout.razorpay.com/v1/checkout.js";

let sdkLoadPromise = null;

/**
 * Dynamically loads the Razorpay checkout SDK once and caches the promise.
 * Resolves with `true` when window.Razorpay is available, rejects otherwise.
 */
export function loadRazorpaySdk() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay can only be loaded in the browser"));
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${RAZORPAY_SDK_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => {
        sdkLoadPromise = null;
        reject(new Error("Failed to load Razorpay SDK"));
      });
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SDK_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      sdkLoadPromise = null;
      reject(new Error("Failed to load Razorpay SDK"));
    };
    document.body.appendChild(script);
  });

  return sdkLoadPromise;
}

/**
 * Opens the Razorpay checkout modal.
 *
 * @param {Object} params
 * @param {string} params.keyId           - Razorpay public key (rzp_test_... / rzp_live_...)
 * @param {Object} params.order           - Order returned by backend: { id, amount, currency }
 * @param {Object} params.plan            - Plan metadata: { name, planType }
 * @param {Object} [params.prefill]       - { name, email, contact }
 * @param {string} [params.themeColor]    - Hex color for checkout theme
 * @returns {Promise<{ razorpay_order_id, razorpay_payment_id, razorpay_signature }>}
 *          Resolves on successful payment, rejects on dismiss/error.
 */
export async function openRazorpayCheckout({
  keyId,
  order,
  plan,
  prefill = {},
  themeColor = "#3B82F6",
  description,
  notes,
}) {
  await loadRazorpaySdk();

  return new Promise((resolve, reject) => {
    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "KnowVaults",
      description:
        description ||7
        (plan?.name ? `${plan.name} Subscription` : "Subscription"),
      order_id: order.id,
      prefill: {
        name: prefill.name || "",
        email: prefill.email || "",
        contact: prefill.contact || "",
      },
      notes: notes || { planType: plan?.planType || "" },
      theme: { color: themeColor },
      handler: (response) => {
        resolve({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: () => {
          reject(new Error("Payment cancelled"));
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", (response) => {
      const description =
        response?.error?.description || "Payment failed. Please try again.";
      reject(new Error(description));
    });

    rzp.open();
  });
}
