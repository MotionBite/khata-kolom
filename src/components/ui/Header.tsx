"use client";

import Link from 'next/link';
import { ShoppingCart, User, Search, Truck, Tag, RotateCcw, ChevronDown, Leaf, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { toggleCart, selectCartCount } from '@/redux/slices/cartSlice';
import { selectWishlistCount, toggleWishlistDrawer } from '@/redux/slices/wishlistSlice';
import { checkAuth, selectAuthUser, selectIsAuthenticated } from '@/redux/slices/authSlice';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import UserDropdown from '@/components/layout/UserDropdown';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const cartQuantity = useSelector(selectCartCount);
  const wishlistQuantity = useSelector(selectWishlistCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    dispatch(checkAuth());
  }, [dispatch]);

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
    <header className="w-full flex flex-col z-50">
      {/* Top Announcement Ribbon */}
      <div className="bg-[#F6F2FA] text-[#7355A4] border-b border-purple-100/60 py-2.5 px-4 sm:px-8 w-full flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
        <div className="flex items-center gap-2 hidden md:flex">
          <Truck size={14} /> 
          <span>Free Shipping on Orders Over ৳1,500</span>
        </div>
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <Tag size={14} /> 
          <span>10% OFF Your First Order | Use Code: WRITE10</span>
        </div>
        <div className="flex items-center gap-2 hidden md:flex">
          <RotateCcw size={14} /> 
          <span>30-Day Easy Returns</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-20 bg-white/90 backdrop-blur-md border-b border-gray-100/90 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full grid grid-cols-3 lg:flex lg:justify-between items-center">
          
          {/* Mobile Menu Toggle (Left) */}
          <div className="flex lg:hidden items-center justify-start">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-700 hover:text-[#7355A4] hover:bg-purple-50 p-2 -ml-2 rounded-xl transition-all cursor-pointer"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Brand Logomark (Center Mobile, Left Desktop) */}
          <div className="flex items-center justify-center lg:justify-start">
            <Link href="/" className="flex flex-col items-center justify-center relative group">
              <div className="flex flex-col items-center">
                <Leaf size={18} className="text-[#7355A4] absolute -top-4 -ml-2" />
                <div className="text-[22px] font-sans font-bold tracking-[0.2em] text-[#1F2430]">
                  PAPERLY
                </div>
                <div className="text-[9px] tracking-[0.25em] text-gray-400 font-medium uppercase mt-0.5">
                  Stationery Store
                </div>
              </div>
            </Link>
          </div>


          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            <Link href="/" className="text-[12px] font-bold tracking-[0.15em] text-[#1F2430] hover:text-[#7355A4] transition-colors uppercase">
              HOME
            </Link>
            
            {/* Collections Mega Menu */}
            <div className="relative group h-full flex items-center">
              <Link href="/categories" className="text-[12px] font-bold tracking-[0.15em] text-gray-700 hover:text-[#7355A4] transition-colors uppercase flex items-center gap-1.5 cursor-pointer">
                COLLECTIONS
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              
              {/* Dropdown Panel */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 p-6 z-50 before:content-[''] before:absolute before:-top-6 before:left-0 before:w-full before:h-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Notebooks', count: '24 Items', image: '/notebook.png', link: '/category/notebooks' },
                    { name: 'Luxury Pens', count: '18 Items', image: '/pen.png', link: '/category/pens' },
                    { name: 'Planners', count: '12 Items', image: '/note.png', link: '/category/planners' },
                    { name: 'Accessories', count: '35 Items', image: '/stiki.png', link: '/category/accessories' },
                  ].map((col) => (
                    <Link key={col.name} href={col.link} className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-50/50 transition-colors group/item">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1F2430] tracking-wider uppercase mb-0.5 group-hover/item:text-[#7355A4] transition-colors">{col.name}</div>
                        <div className="text-[10px] font-medium text-gray-500">{col.count}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/best-sellers" className="text-[12px] font-bold tracking-[0.15em] text-gray-700 hover:text-[#7355A4] transition-colors uppercase">
              BEST SELLERS
            </Link>
            
            <Link href="/new-arrivals" className="text-[12px] font-bold tracking-[0.15em] text-gray-700 hover:text-[#7355A4] transition-colors uppercase relative flex items-center">
              NEW IN
              <span className="bg-pink-50 border border-pink-100 text-pink-500 text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-widest absolute -top-3.5 -right-7 shadow-sm">HOT</span>
            </Link>
            
            <Link href="/about" className="text-[12px] font-bold tracking-[0.15em] text-gray-700 hover:text-[#7355A4] transition-colors uppercase">
              OUR STORY
            </Link>
          </nav>

          {/* Right Utilities / Actions */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="text-gray-700 hover:text-[#7355A4] hover:bg-purple-50 p-2 rounded-xl transition-all cursor-pointer"
            >
              <Search size={19} />
            </button>
            <div className="hidden lg:block">
              {isMounted && isAuthenticated ? (
                <UserDropdown user={user} />
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-[#7355A4] hover:bg-purple-50 p-2 rounded-xl transition-all cursor-pointer block">
                  <User size={19} />
                </Link>
              )}
            </div>
            
            <button 
              onClick={() => dispatch(toggleWishlistDrawer())}
              className="relative text-gray-700 hover:text-[#7355A4] hover:bg-purple-50 p-2 rounded-xl transition-all cursor-pointer hidden sm:block"
            >
              <Heart size={19} />
              {isMounted && wishlistQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm translate-x-1/4 -translate-y-1/4 border-2 border-white">
                  {wishlistQuantity}
                </span>
              )}
            </button>

            <button 
              onClick={() => dispatch(toggleCart())}
              className="relative text-gray-700 hover:text-[#7355A4] hover:bg-purple-50 p-2 rounded-xl transition-all cursor-pointer"
            >
              <ShoppingCart size={19} />
              {isMounted && cartQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-[#7355A4] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm translate-x-1/4 -translate-y-1/4 border-2 border-white">
                  {cartQuantity}
                </span>
              )}
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white border-b border-gray-100 shadow-sm"
          >
            <div className="p-4 px-6 max-w-7xl mx-auto flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all text-sm font-medium"
              />
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Slide-Over Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed left-0 top-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <Leaf size={20} className="text-[#7355A4]" />
                  <span className="text-xl font-bold tracking-[0.2em] text-[#1F2430]">PAPERLY</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
                <nav className="flex flex-col space-y-2">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold tracking-widest text-[#1F2430] hover:text-[#7355A4] hover:bg-purple-50 rounded-xl transition-all uppercase">
                    Home
                  </Link>
                  <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold tracking-widest text-[#1F2430] hover:text-[#7355A4] hover:bg-purple-50 rounded-xl transition-all uppercase">
                    Collections
                  </Link>
                  <Link href="/best-sellers" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold tracking-widest text-[#1F2430] hover:text-[#7355A4] hover:bg-purple-50 rounded-xl transition-all uppercase">
                    Best Sellers
                  </Link>
                  <Link href="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold tracking-widest text-[#1F2430] hover:text-[#7355A4] hover:bg-purple-50 rounded-xl transition-all uppercase flex justify-between items-center">
                    New Arrivals
                    <span className="bg-pink-50 border border-pink-100 text-pink-500 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">HOT</span>
                  </Link>
                  <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold tracking-widest text-[#1F2430] hover:text-[#7355A4] hover:bg-purple-50 rounded-xl transition-all uppercase">
                    Our Story
                  </Link>
                </nav>

                <div className="border-t border-gray-100 pt-6 px-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7355A4] flex items-center justify-center font-bold text-lg">
                          {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm rounded-xl transition-colors">
                        My Profile
                      </Link>
                      {user?.role === 'ADMIN' && (
                        <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2.5 bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#7355A4] font-bold text-sm rounded-xl transition-colors border border-[#E9D8FD]">
                          Admin Portal
                        </Link>
                      )}
                      <button onClick={async () => {
                        await fetch('/api/auth/logout', { method: 'POST' });
                        window.location.href = '/login';
                      }} className="block w-full text-center py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm rounded-xl transition-colors">
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-3 bg-[#7355A4] hover:bg-[#5E4389] text-white font-bold tracking-wider text-sm rounded-xl transition-colors shadow-md shadow-purple-500/20 uppercase">
                      Sign In to Account
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
