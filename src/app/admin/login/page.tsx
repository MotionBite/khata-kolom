"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to login');
      } else {
        toast.success('Welcome back to the Admin Portal!');
        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-4 font-sans relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#7355A4]/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7355A4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#7355A4]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_50px_-20px_rgba(115,85,164,0.15)] border border-gray-100 p-8 relative z-10"
      >
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-14 h-14 bg-[#7355A4]/10 rounded-full flex items-center justify-center mb-4">
            <Leaf size={28} className="text-[#7355A4]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#1F2937]">Admin Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage Khata Kolom Shop</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest text-[#1F2937] uppercase">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7355A4]/20 focus:border-[#7355A4] transition-all text-sm"
                placeholder="admin@paperly.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest text-[#1F2937] uppercase">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7355A4]/20 focus:border-[#7355A4] transition-all text-sm"
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

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 group-hover:border-[#7355A4] transition-colors">
                <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute cursor-pointer" />
                <div className="absolute w-5 h-5 bg-[#7355A4] rounded scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-gray-600 font-medium">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#7355A4] font-medium hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#7355A4] hover:bg-[#5E4389] text-white py-4 rounded-xl font-medium transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 shadow-md shadow-[#7355A4]/20 mt-4"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
