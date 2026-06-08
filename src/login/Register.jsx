import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/auth';
import { setTokenPair } from '../auth/tokenStorage';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await registerApi({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      if (data?.accessToken && data?.refreshToken) {
        setTokenPair(data);
      }
      window.dispatchEvent(new Event('auth:changed'));
      navigate('/home');
    } catch (err) {
      setError(err?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[440px] space-y-8 animate-in fade-in duration-200">

        <div className="space-y-2 text-left">
          <h2 className="text-[32px] font-black tracking-tight text-[#1E293B]">
            Register
          </h2>
          <p className="text-base text-[#64748B] font-medium">
            Join our community today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="name" className="block text-base font-bold text-[#1E293B]">
              Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="block w-full rounded-xl border-0 bg-[#F1F5F9] px-4 py-4 text-base text-[#1E293B] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-colors font-medium"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-base font-bold text-[#1E293B]">
              Email <span className="text-[#EF4444]">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="block w-full rounded-xl border-0 bg-[#F1F5F9] px-4 py-4 text-base text-[#1E293B] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-colors font-medium"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-base font-bold text-[#1E293B]">
              Phone <span className="text-[#EF4444]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9]{10}"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              className="block w-full rounded-xl border-0 bg-[#F1F5F9] px-4 py-4 text-base text-[#1E293B] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-colors font-medium"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-base font-bold text-[#1E293B]">
              Password <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="block w-full rounded-xl border-0 bg-[#F1F5F9] px-4 py-4 pr-12 text-base text-[#1E293B] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-colors font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#64748B] hover:text-[#1E293B]"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-base font-bold text-[#1E293B]">
              Confirm Password <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="block w-full rounded-xl border-0 bg-[#F1F5F9] px-4 py-4 pr-12 text-base text-[#1E293B] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-colors font-medium"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#64748B] hover:text-[#1E293B]"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center pt-1">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              required
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6]"
            />
            <label htmlFor="acceptTerms" className="ml-3 block text-base text-[#475569] font-semibold">
              I accept the terms and conditions.
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-xl bg-[#3B82F6] hover:bg-blue-600 px-4 py-4 text-base font-bold text-white shadow-md shadow-blue-500/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating account…' : 'Sign Up'}
            </button>
          </div>

          <p className="mt-6 text-center text-sm sm:text-base text-[#475569] font-semibold">
            Already have an account?{' '}
            <Link to="/" className="font-bold text-[#3B82F6] hover:underline">
              Sign in
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
}
