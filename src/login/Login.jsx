import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Sending data to backend API:', formData);

    };

    return (

        <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-[440px] space-y-8">

                {/* Header Section */}
                <div className="space-y-2 text-left">
                    <h2 className="text-[32px] font-bold tracking-tight text-[#1E293B]">
                        Welcome back!
                    </h2>
                    <p className="text-base text-[#64748B]">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-base font-medium text-[#1E293B]">
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
                            className="block w-full rounded-xl border-0 bg-[#F1F5F9] px-4 py-4 text-base text-[#1E293B] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-colors"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-base font-medium text-[#1E293B]">
                            Password <span className="text-[#EF4444]">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="block w-full rounded-xl border-0 bg-[#F1F5F9] px-4 py-4 pr-12 text-base text-[#1E293B] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-colors"
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

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm sm:text-base">
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6]"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-[#475569]">
                                Remember me
                            </label>
                        </div>

                        <div>
                            <Link to="/forgot-password" className="font-medium text-[#3B82F6] hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-xl bg-[#3B82F6] px-4 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm sm:text-base text-[#475569]">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-[#3B82F6] hover:underline">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
}
