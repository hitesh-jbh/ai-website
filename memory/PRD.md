# KnowVaults — Razorpay Subscription Integration

## Original Problem Statement
> i have a repo for frontend of my website in github name ai-website that i am working on and the backend of this web is in the repo ai-search-engine. I want to integrate razorpay in subscription section/page. the apis you can find in ai-search-engine repository. make sure work only on dev branch of ai-website.

## Repos & Branch
- Frontend: `github.com/hitesh-jbh/ai-website` — branch: **dev** (working tree at `/app`)
- Backend: `ai-search-engine` (private, Node + Express + TypeScript + Razorpay SDK + Postgres)

## Backend API Contracts (provided by user)
- `POST /api/payments/create-order` — auth required, body: `{ planId }` → `{ order: {id, amount, currency, receipt, status, createdAt}, keyId, plan }`
- `POST /api/payments/verify` — auth required, body: `{ planId, razorpayOrderId, razorpayPaymentId, razorpaySignature }` → subscription record
- `GET /api/subscription-plans` — public, returns active plans
- `GET /api/subscriptions/current/status` — auth required, returns current subscription + usage
- `POST /api/subscriptions/free` — auth required, activates free plan

## Razorpay Credentials
- Test Key ID: `rzp_test_4eHvFAxy7IeTMj` (key is delivered by backend in `create-order` response — NOT embedded in frontend env)
- Secret stays on backend only.

## Architecture (Frontend)
1. **`src/api/payments.js`** — Thin wrapper around `apiRequest`:
   - `createPaymentOrder(planId)` → POST `/payments/create-order`
   - `verifyPayment({ planId, razorpayOrderId, razorpayPaymentId, razorpaySignature })` → POST `/payments/verify`
2. **`src/payments/razorpay.js`** — Razorpay checkout helper:
   - `loadRazorpaySdk()` — dynamic `<script>` injection of `checkout.razorpay.com/v1/checkout.js`, cached
   - `openRazorpayCheckout({ keyId, order, plan, prefill, themeColor })` — promise-based wrapper that resolves on success handler and rejects on dismiss / `payment.failed`
3. **`src/Subscription/Subscription.jsx`** — Updated subscription page:
   - Fetches `getSubscriptionPlans()`, `getCurrentSubscriptionStatus()`, `getProfile()` in parallel
   - Renders Free plan + dynamic list of paid plans (PlanCard component)
   - Full flow: `createPaymentOrder` → `openRazorpayCheckout` → `verifyPayment` → refresh status → call `onPlanSelect('active')`
   - Inline error + success banners; per-plan `Processing…` state via `busyPlanId`

## What's Implemented (2026-01-08)
- [x] Razorpay checkout flow integrated in the Manage Subscriptions page
- [x] Dynamic plan rendering (replaced previous hardcoded Space/Recharge cards)
- [x] Free plan activation preserved
- [x] User profile prefill (name / email / phone) into Razorpay checkout
- [x] Promise-based modal-dismiss & payment-failure handling
- [x] Production build verified (`yarn build` → 422 kB JS)
- [x] data-testid added to all interactive subscription elements

## Files Added / Modified
- ADDED `src/api/payments.js`
- ADDED `src/payments/razorpay.js`
- MODIFIED `src/Subscription/Subscription.jsx`

## Backlog / Next Action Items
- **P1** Live E2E test with real auth token + Razorpay test card `4111 1111 1111 1111` (requires running backend access + login)
- **P1** Razorpay webhook on backend for async payment events (server-side; out of scope of this repo)
- **P2** Discount / coupon code support on the checkout
- **P2** Plan comparison table (feature matrix) above the cards
- **P2** Invoice download after successful payment
- **P3** Subscription cancellation / management UI

## Test Cards (Razorpay Test Mode)
- Success: `4111 1111 1111 1111`, any future expiry, CVV `123`
- 3DS challenge: `5267 3181 8797 5449`
