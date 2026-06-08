import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentSubscriptionStatus,
  activateFreePlan,
  getSubscriptionPlans,
} from '../api/subscription';
import { createPaymentOrder, verifyPayment } from '../api/payments';
import { openRazorpayCheckout } from '../payments/razorpay';
import { getProfile } from '../api/auth';

function formatPrice(price, currency) {
  const symbol = currency === 'INR' ? '₹' : currency ? `${currency} ` : '';
  const num = Number(price);
  if (Number.isNaN(num)) return `${symbol}${price}`;
  return `${symbol}${num.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })}`;
}

function PlanCard({
  plan,
  isCurrent,
  isBusy,
  onSubscribe,
  tone = 'indigo',
}) {
  const palette = {
    indigo: {
      bg: 'bg-[#EEF2FF]',
      border: 'border-indigo-200/50',
      badgeBg: 'bg-indigo-600',
      badgeText: 'text-white',
      priceText: 'text-indigo-900',
      priceSubText: 'text-indigo-600/80',
      button: 'bg-indigo-600 hover:bg-indigo-700',
    },
    emerald: {
      bg: 'bg-[#E6F4EA]',
      border: 'border-emerald-200/50',
      badgeBg: 'bg-emerald-600',
      badgeText: 'text-white',
      priceText: 'text-emerald-900',
      priceSubText: 'text-emerald-600/80',
      button: 'bg-emerald-600 hover:bg-emerald-700',
    },
    amber: {
      bg: 'bg-[#FEF3C7]',
      border: 'border-amber-200/50',
      badgeBg: 'bg-amber-600',
      badgeText: 'text-white',
      priceText: 'text-amber-900',
      priceSubText: 'text-amber-600/80',
      button: 'bg-amber-600 hover:bg-amber-700',
    },
  }[tone] || {};

  return (
    <div
      data-testid={`plan-card-${plan.id}`}
      className={`${palette.bg} rounded-3xl p-6 border ${palette.border} shadow-sm relative overflow-hidden`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span
            className={`inline-block ${palette.badgeBg} ${palette.badgeText} text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md`}
          >
            {plan.planType || 'Plan'}
          </span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
            {plan.name}
          </h3>
          {plan.description ? (
            <p className="text-sm text-slate-500 font-medium max-w-[85%]">
              {plan.description}
            </p>
          ) : null}
        </div>
        {isCurrent ? (
          <span
            data-testid={`plan-current-badge-${plan.id}`}
            className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs"
          >
            Current
          </span>
        ) : null}
      </div>

      <div className={`mt-4 flex items-baseline gap-1 ${palette.priceText}`}>
        <span className="text-3xl font-black">
          {formatPrice(plan.price, plan.currency)}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-wider ${palette.priceSubText}`}
        >
          {plan.billingCycle || 'per month'}
        </span>
      </div>

      <div className="space-y-2 mt-4">
        {plan.dailyQueriesLimit ? (
          <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
            <div className="bg-slate-800 text-white rounded-full p-0.5 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <span>{Number(plan.dailyQueriesLimit).toLocaleString()} queries/day</span>
          </div>
        ) : null}
        {plan.dailyTokensLimit ? (
          <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
            <div className="bg-slate-800 text-white rounded-full p-0.5 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <span>{Number(plan.dailyTokensLimit).toLocaleString()} tokens/day</span>
          </div>
        ) : null}
      </div>

      <button
        data-testid={`plan-subscribe-btn-${plan.id}`}
        onClick={() => onSubscribe(plan)}
        disabled={isCurrent || isBusy}
        className={`w-full mt-6 font-bold py-3.5 px-4 rounded-2xl shadow-xs transition-colors text-sm text-center ${
          isCurrent
            ? 'bg-slate-200 text-slate-500 cursor-default'
            : `${palette.button} text-white disabled:opacity-60 disabled:cursor-wait`
        }`}
      >
        {isCurrent
          ? 'Current Plan'
          : isBusy
          ? 'Processing…'
          : `Subscribe — ${formatPrice(plan.price, plan.currency)}`}
      </button>
    </div>
  );
}

export default function ManageSubscriptions({ onPlanSelect }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Options');
  const [status, setStatus] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busyPlanId, setBusyPlanId] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      getCurrentSubscriptionStatus(),
      getSubscriptionPlans(),
      getProfile().catch(() => null),
    ])
      .then(([statusRes, plansRes, profileRes]) => {
        if (!mounted) return;
        if (statusRes.status === 'fulfilled') {
          setStatus(statusRes.value);
        } else {
          setError(statusRes.reason?.message || 'Failed to load subscription');
        }

        if (plansRes.status === 'fulfilled') {
          const list = Array.isArray(plansRes.value)
            ? plansRes.value
            : plansRes.value?.plans || plansRes.value?.items || [];
          setPlans(list);
        }

        if (profileRes.status === 'fulfilled' && profileRes.value) {
          setProfile(profileRes.value);
        }
      })
      .finally(() => mounted && setIsLoading(false));

    return () => {
      mounted = false;
    };
  }, [onPlanSelect]);

  const refreshStatus = async () => {
    const data = await getCurrentSubscriptionStatus();
    setStatus(data);
    if (data?.hasSubscription) onPlanSelect('active');
    return data;
  };

  const handleActivateFree = async () => {
    setError('');
    setSuccess('');
    setBusyPlanId('free');
    try {
      await activateFreePlan();
      await refreshStatus();
      setSuccess('Free plan activated.');
    } catch (err) {
      setError(err?.message || 'Failed to activate plan');
    } finally {
      setBusyPlanId(null);
    }
  };

  const handlePaidSubscribe = async (plan) => {
    setError('');
    setSuccess('');
    setBusyPlanId(plan.id);
    try {
      // 1. Create order on backend
      const orderRes = await createPaymentOrder(plan.id);
      const order = orderRes?.order;
      const keyId = orderRes?.keyId;
      const planMeta = orderRes?.plan || plan;

      if (!order?.id || !keyId) {
        throw new Error('Could not initialise payment. Please try again.');
      }

      // 2. Open Razorpay checkout
      const userObj =
        profile?.user || profile?.profile || profile || {};
      const result = await openRazorpayCheckout({
        keyId,
        order,
        plan: planMeta,
        prefill: {
          name: userObj.name || '',
          email: userObj.email || '',
          contact: userObj.phone || userObj.contact || '',
        },
      });

      // 3. Verify on backend
      await verifyPayment({
        planId: plan.id,
        razorpayOrderId: result.razorpay_order_id,
        razorpayPaymentId: result.razorpay_payment_id,
        razorpaySignature: result.razorpay_signature,
      });

      await refreshStatus();
      setSuccess(`${plan.name} subscription activated successfully!`);
    } catch (err) {
      setError(err?.message || 'Payment failed. Please try again.');
    } finally {
      setBusyPlanId(null);
    }
  };

  const usage = status?.usage;
  const planName = status?.subscription?.plan || 'Free';
  const queriesUsed = usage?.queriesUsedToday ?? 0;
  const queriesLimit = usage?.dailyQueriesLimit ?? status?.subscription?.dailyQueriesLimit ?? 40;
  const tokensUsed = usage?.tokensUsedToday ?? 0;
  const tokensLimit = usage?.dailyTokensLimit ?? status?.subscription?.dailyTokensLimit ?? 400000;
  const queriesPct = queriesLimit ? Math.min(100, (queriesUsed / queriesLimit) * 100) : 0;
  const tokensPct = tokensLimit ? Math.min(100, (tokensUsed / tokensLimit) * 100) : 0;

  const handleTabNavigation = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path);
  };

  const currentPlanId = status?.subscription?.planId || status?.subscription?.plan_id;
  const freePlan = plans.find((p) => p.planType === 'free' || p.name?.toLowerCase().includes('free'));
  const paidPlans = plans.filter(
    (p) => p.planType !== 'free' && !(p.name?.toLowerCase().includes('free'))
  );
  const tones = ['indigo', 'emerald', 'amber'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-24 md:pb-6 relative overflow-hidden">

      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 py-4 md:px-8 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              data-testid="subscription-back-btn"
              onClick={() => navigate('/options')}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-sm transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Subscriptions</h1>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[
              { id: 'Home', path: '/home' },
              { id: 'Leaderboard', path: '/leaderboard' },
              { id: 'Vaults', path: '/vault' },
              { id: 'Options', path: '/options' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabNavigation(tab.id, tab.path)}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.id}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="w-full max-w-xl mx-auto px-4 space-y-6 mt-6">
        {error ? (
          <div
            data-testid="subscription-error-banner"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {error}
          </div>
        ) : null}
        {success ? (
          <div
            data-testid="subscription-success-banner"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            {success}
          </div>
        ) : null}
        {isLoading ? (
          <p className="text-center text-sm text-slate-400 font-semibold">Loading subscription…</p>
        ) : null}

        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">Current Plan Status</h2>
          <div className="flex items-baseline justify-between">
            <p data-testid="current-plan-name" className="text-2xl font-black text-slate-900">{planName} Plan</p>
          </div>
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-500">Queries Used</span>
              <span className="font-bold text-slate-800">{queriesUsed} / {queriesLimit}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${queriesPct}%` }} />
            </div>
            <div className="flex justify-between items-center text-sm pt-1">
              <span className="font-semibold text-slate-500">Tokens Used</span>
              <span className="font-bold text-slate-800">{tokensUsed.toLocaleString()} / {tokensLimit.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${tokensPct}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight px-1">Available Plans</h3>

          {/* Free Plan */}
          <div className="bg-white rounded-3xl p-6 border-2 border-blue-500 shadow-sm space-y-4 relative">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                  {freePlan?.name || 'FREE'}
                </h4>
                <p className="text-sm text-slate-400 font-semibold mt-0.5">Free</p>
              </div>
              {status?.hasSubscription && status?.subscription?.plan === 'free' ? (
                <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  Current
                </span>
              ) : null}
            </div>

            <div className="text-3xl font-black text-slate-900 pt-1">Free</div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="bg-slate-800 text-white rounded-full p-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span>{Number(freePlan?.dailyQueriesLimit || 40).toLocaleString()} queries/day</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="bg-slate-800 text-white rounded-full p-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span>{Number(freePlan?.dailyTokensLimit || 400000).toLocaleString()} tokens/day</span>
              </div>
            </div>

            <button
              data-testid="activate-free-plan-btn"
              onClick={status?.hasSubscription ? undefined : handleActivateFree}
              disabled={status?.hasSubscription || busyPlanId === 'free'}
              className={`w-full mt-4 font-bold py-4 rounded-2xl text-base transition-colors ${
                status?.hasSubscription
                  ? 'bg-slate-200 text-slate-500 cursor-default'
                  : 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60'
              }`}
            >
              {status?.hasSubscription
                ? 'Current Plan'
                : busyPlanId === 'free'
                ? 'Activating…'
                : 'Activate Free Plan'}
            </button>
          </div>

          {/* Paid Plans (dynamic) */}
          {paidPlans.length === 0 && !isLoading ? (
            <p className="text-sm text-slate-400 text-center py-2">
              No paid plans available right now.
            </p>
          ) : null}

          {paidPlans.map((plan, idx) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              tone={tones[idx % tones.length]}
              isCurrent={
                status?.hasSubscription &&
                (currentPlanId === plan.id ||
                  status?.subscription?.plan === plan.planType)
              }
              isBusy={busyPlanId === plan.id}
              onSubscribe={handlePaidSubscribe}
            />
          ))}
        </div>

      </main>

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur-md px-4 py-2 shadow-2xl md:hidden">
        <div className="flex items-center justify-around">
          {[
            { id: 'Home', path: '/home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
            { id: 'Leaderboard', path: '/leaderboard', icon: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125V18.75m9 0V16.5L12 3L3 16.5v2.25' },
            { id: 'Vaults', path: '/vault', icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' },
            { id: 'Options', path: '/options', icon: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabNavigation(item.id, item.path)}
              className={`flex flex-col items-center gap-0.5 p-2 transition-all ${activeTab === item.id || (item.id === 'Options' && window.location.pathname === '/subscriptions') ? 'text-blue-600 scale-105' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-[10px] font-bold">{item.id}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
