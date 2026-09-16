"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Phone, MapPin, User as UserIcon, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+880 1711 223344');
  const [street, setStreet] = useState('House 12, Road 4, Block C, Banani');
  const [city, setCity] = useState('Dhaka');
  const [postal, setPostal] = useState('1213');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  // Protect route
  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isMounted, isAuthenticated, router]);

  if (!isMounted || !isAuthenticated) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Profile updated successfully!');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#7355A4] transition-colors w-fit">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
        
        {/* Hero Account Badge */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#F0ECF4] p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7355A4]/5 rounded-bl-full -z-0"></div>
          
          <div className="w-24 h-24 bg-[#E9E4F0] text-[#7355A4] rounded-full flex items-center justify-center text-4xl font-serif font-bold uppercase shrink-0 relative z-10 border-4 border-white shadow-md">
            {user?.name?.charAt(0) || 'U'}
          </div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-serif font-bold text-[#1F2430]">
                {user?.name || 'Customer'}
              </h1>
              <ShieldCheck size={20} className="text-[#7355A4]" />
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="bg-[#7355A4]/10 text-[#7355A4] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Atelier Patron
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                Verified Account
              </span>
            </div>
            <p className="text-sm text-gray-500">Member since September 2026</p>
          </div>
        </div>

        {/* 2-Column Details Form */}
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Personal Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#F0ECF4] p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <UserIcon className="text-[#7355A4]" size={22} />
              <h2 className="text-lg font-bold text-[#1F2430]">Personal Details</h2>
            </div>
            
            <div className="space-y-5 flex-1">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#7355A4]/20 focus:border-[#7355A4] transition-all outline-none text-sm text-[#1F2430]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    disabled
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1.5 ml-1">Email cannot be changed.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#7355A4]/20 focus:border-[#7355A4] transition-all outline-none text-sm text-[#1F2430]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-[#7355A4] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-md hover:shadow-lg hover:bg-[#5E4389] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSaving ? 'Saving Changes...' : <><Save size={18} /> Save Profile</>}
              </button>
            </div>
          </div>

          {/* Shipping Destination */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#F0ECF4] p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-[#7355A4]" size={22} />
              <h2 className="text-lg font-bold text-[#1F2430]">Shipping Destination</h2>
            </div>
            
            <div className="space-y-5 flex-1">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Street Address</label>
                <textarea 
                  rows={2}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#7355A4]/20 focus:border-[#7355A4] transition-all outline-none text-sm text-[#1F2430] resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</label>
                  <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#7355A4]/20 focus:border-[#7355A4] transition-all outline-none text-sm text-[#1F2430]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Postal Code</label>
                  <input 
                    type="text" 
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#7355A4]/20 focus:border-[#7355A4] transition-all outline-none text-sm text-[#1F2430]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-[#7355A4] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-md hover:shadow-lg hover:bg-[#5E4389] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSaving ? 'Saving Changes...' : <><Save size={18} /> Save Address</>}
              </button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}
