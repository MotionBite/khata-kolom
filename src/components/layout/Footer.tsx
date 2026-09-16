"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Leaf, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Headphones
} from 'lucide-react';

const Facebook = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Twitter = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Youtube = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 7.1C2 8.7 2 12 2 12s0 3.3.5 4.9C3 18.5 4.5 20 6.1 20 7.7 20 12 20 12 20s4.3 0 5.9 0c1.6 0 3.1-1.5 3.6-3.1.5-1.6.5-4.9.5-4.9s0-3.3-.5-4.9C21 5.5 19.5 4 17.9 4 16.3 4 12 4 12 4s-4.3 0-5.9 0C4.5 4 3 5.5 2.5 7.1z"/>
    <path d="M10 15l5-3-5-3v6z"/>
  </svg>
);

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname?.startsWith('/admin') || 
    pathname === '/login' || 
    pathname === '/register' || 
    pathname === '/profile' || 
    pathname === '/orders' ||
    pathname === '/best-sellers' ||
    pathname === '/new-arrivals' ||
    pathname === '/about' ||
    pathname === '/checkout'
  ) {
    return null;
  }

  return (
    <footer className="w-full flex flex-col bg-white">
      
      {/* 1. Top Perks Ribbon */}
      <div className="bg-white/70 backdrop-blur-md border-b border-gray-100 py-8 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF5FF] border border-[#E9D8FD] flex items-center justify-center flex-shrink-0 text-[#7355A4]">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black tracking-widest text-[#1F2430] uppercase mb-1">FREE SHIPPING</h4>
              <p className="text-xs text-slate-500">On Orders Over ৳1,500</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF5FF] border border-[#E9D8FD] flex items-center justify-center flex-shrink-0 text-[#7355A4]">
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black tracking-widest text-[#1F2430] uppercase mb-1">EASY RETURNS</h4>
              <p className="text-xs text-slate-500">30-Day Hassle Free Returns</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF5FF] border border-[#E9D8FD] flex items-center justify-center flex-shrink-0 text-[#7355A4]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black tracking-widest text-[#1F2430] uppercase mb-1">SECURE PAYMENT</h4>
              <p className="text-xs text-slate-500">100% Secure Checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF5FF] border border-[#E9D8FD] flex items-center justify-center flex-shrink-0 text-[#7355A4]">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black tracking-widest text-[#1F2430] uppercase mb-1">24/7 SUPPORT</h4>
              <p className="text-xs text-slate-500">We're Here to Help</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Directory & Brand Column (12-column grid) */}
      <div className="pt-16 pb-12 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-y-12 gap-x-8">
          
          {/* Brand Bio */}
          <div className="col-span-12 lg:col-span-4 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-2 mb-1 group inline-flex">
              <Leaf className="text-[#7355A4]" size={24} />
              <span className="text-xl font-bold tracking-widest text-[#1F2430]">
                PAPERLY
              </span>
            </Link>
            <div className="text-[10px] tracking-[0.25em] text-slate-400 font-medium mb-6">
              STATIONERY STORE
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-8 max-w-sm">
              Your one-stop shop for premium stationery and creative essentials. We curate the finest tools for writers, artists, and dreamers.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#" className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-slate-600 hover:bg-[#7355A4] hover:text-white transition-colors border border-gray-100">
                <Instagram size={16} />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-slate-600 hover:bg-[#7355A4] hover:text-white transition-colors border border-gray-100">
                <Facebook size={16} />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-slate-600 hover:bg-[#7355A4] hover:text-white transition-colors border border-gray-100">
                <Twitter size={16} />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-slate-600 hover:bg-[#7355A4] hover:text-white transition-colors border border-gray-100">
                <Youtube size={16} />
              </Link>
            </div>
          </div>

          {/* Collections */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <h3 className="text-xs font-black tracking-widest text-[#1F2430] uppercase mb-6">
              Collections
            </h3>
            <ul className="space-y-4">
              {['Notebooks', 'Pens & Pencils', 'Office Supplies', 'Bags & Cases', 'Art & Craft', 'Planners', 'Gift Sets'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-slate-500 hover:text-[#7355A4] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge (Customer Service) */}
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <h3 className="text-xs font-black tracking-widest text-[#1F2430] uppercase mb-6">
              Concierge
            </h3>
            <ul className="space-y-4">
              {['Help Center', 'Shipping & Delivery', 'Returns & Refunds', 'Track Your Order', 'FAQs', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-slate-500 hover:text-[#7355A4] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Atelier (Company) */}
          <div className="col-span-12 md:col-span-4 lg:col-span-2">
            <h3 className="text-xs font-black tracking-widest text-[#1F2430] uppercase mb-6">
              Atelier
            </h3>
            <ul className="space-y-4">
              {['About Us', 'Blog', 'Careers', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-slate-500 hover:text-[#7355A4] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* 3. Pastel Bottom Strip */}
      <div className="bg-[#F4EEF8] py-5 px-6 lg:px-16 text-[#1F2430]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium text-slate-600">
            © 2026 Paperly Stationery Store. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-500">
            <span className="bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">bKash</span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">Nagad</span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">Visa</span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
