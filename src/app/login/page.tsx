"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Login failed');
        setIsLoading(false);
        return;
      }

      dispatch(setUser(data.user));
      toast.success('Welcome back!');
      router.push('/');
    } catch (err) {
      toast.error('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-[#F0ECF4]">
        <div className="bg-[#E9E4F0] p-6 flex flex-col items-center justify-center border-b border-[#D6CDE3]">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 relative">
             <Leaf size={32} className="text-[#7355A4]" />
          </div>
          <h2 className="text-2xl font-outfit font-bold text-[#1F2430]">Welcome Back</h2>
          <p className="text-sm text-gray-600 mt-2 font-inter">Log in to your Khata Kolom account</p>
        </div>

        <div className="p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-inter mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7355A4] focus:border-transparent transition-all outline-none text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 font-inter">
                  Password
                </label>
                <Link href="#" className="text-xs text-[#7355A4] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7355A4] focus:border-transparent transition-all outline-none text-sm pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7355A4] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7355A4] text-white py-3 rounded-lg font-medium hover:bg-[#5E4286] transition-colors flex items-center justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 font-inter">
              Don't have an account?{' '}
              <Link href="/register" className="text-[#7355A4] font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
