"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Package, LogOut, ShieldCheck, ChevronDown } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';

interface UserDropdownProps {
  user: any;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#FAF5FF] border border-[#E9D8FD] rounded-full p-1.5 pr-3 text-[#7355A4] hover:bg-purple-100/50 transition-all cursor-pointer"
      >
        <div className="w-6 h-6 bg-white text-[#7355A4] rounded-full flex items-center justify-center text-[10px] font-black uppercase shadow-sm border border-purple-100">
          {user?.name?.charAt(0)}
        </div>
        <span className="text-[11px] font-bold tracking-widest uppercase">{user?.name?.split(' ')[0]}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl shadow-purple-500/15 border border-purple-50 p-2 z-50">
          <div className="px-3 py-2 mb-1">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Signed in as</p>
            <p className="text-xs font-bold text-[#1F2937] truncate">{user?.name}</p>
          </div>
          
          <div className="space-y-1">
            {user?.role === 'ADMIN' && (
              <Link 
                href="/admin" 
                className="flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold tracking-wider text-[#7355A4] bg-purple-50/50 rounded-2xl hover:bg-purple-100 transition-colors uppercase" 
                onClick={() => setIsOpen(false)}
              >
                <ShieldCheck size={16} /> Admin Portal
              </Link>
            )}
            
            <Link 
              href="/profile" 
              className="flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold tracking-wider text-gray-600 hover:bg-gray-50 hover:text-[#1F2937] rounded-2xl transition-colors uppercase" 
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} /> My Profile
            </Link>
            
            <Link 
              href="/orders" 
              className="flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold tracking-wider text-gray-600 hover:bg-gray-50 hover:text-[#1F2937] rounded-2xl transition-colors uppercase" 
              onClick={() => setIsOpen(false)}
            >
              <Package size={16} /> My Orders
            </Link>
            
            <div className="h-px bg-gray-100 my-1 mx-2"></div>
            
            <button 
              onClick={() => {
                dispatch(logout());
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold tracking-wider text-red-500 hover:bg-red-50 rounded-2xl transition-colors uppercase"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
