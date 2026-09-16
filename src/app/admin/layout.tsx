"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Store, Menu, X } from 'lucide-react';
import { useState } from 'react';

const adminLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* Mobile Top Navigation Strip */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 fixed top-0 w-full z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)} 
            className="p-2 -ml-2 text-gray-600 hover:text-[#7355A4] hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-[#1F2430] tracking-widest uppercase text-xs">Admin Portal</span>
        </div>
        <Link href="/" className="text-[10px] font-bold text-[#7355A4] bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 flex items-center gap-1.5 shadow-sm hover:bg-purple-100 transition-colors">
          <Store size={12} />
          দোকান দেখুন
        </Link>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
        md:relative md:translate-x-0
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Admin Portal</h2>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)} 
            className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-900 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 transition-all ${
                  isActive 
                    ? 'bg-[#7355A4] text-white rounded-2xl shadow-lg shadow-purple-500/30' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#1F2937] rounded-lg'
                }`}
              >
                <link.icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full text-[#7355A4] hover:bg-[#7355A4]/10 rounded-lg transition-colors">
            <Store size={18} />
            <span className="font-medium text-sm">Back to Store</span>
          </Link>
          <button 
            onClick={async () => {
              try {
                await fetch('/api/admin/auth/logout', { method: 'POST' });
                window.location.href = '/admin/login';
              } catch (e) {
                console.error('Failed to log out', e);
              }
            }}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pt-[60px] md:pt-0">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </div>
      
    </div>
  );
}
