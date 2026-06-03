import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword as forgotPasswordApi } from '../api/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await forgotPasswordApi({ email });
      setIsSent(true);
    } catch (err) {
      setError(err?.message || 'Failed to send reset link');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[440px] space-y-8">
        
        {/* IF NOT SENT: Show the form */}
        {!isSent ? (
          <>
            <div className="space-y-2 text-left">
              <h2 className="text-[32px] font-bold tracking-tight text-[#1E293B]">
                Forgot Password?
              </h2>
              <p className="text-base text-[#64748B]">
                We will send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}
              <div className="space-y-2">
                <label className="block text-base font-medium text-[#1E293B]">
                  Email Address <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-full rounded-xl border-0 bg-[#F1F5F9] px-4 py-4 text-base text-[#1E293B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-xl bg-[#3B82F6] px-4 py-4 text-base font-semibold text-white hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          /* IF SENT: Hide the form and show this clean success view instead */
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto">
              {/* Checkmark Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#1E293B]">Check your email</h2>
              <p className="text-base text-[#64748B]">
                We have sent a password reset link to <strong className="text-[#1E293B]">{email}</strong>.
              </p>
            </div>
            <p className="text-sm text-[#94A3B8]">
              You can safely close this window or return to login below.
            </p>
          </div>
        )}

        {/* Back to Login stays visible on both views */}
        <div className="text-center pt-4">
          <Link to="/" className="inline-flex items-center gap-2 text-base font-medium text-[#3B82F6] hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Login
          </Link>
        </div>
        
      </div>
    </div>
  );
}