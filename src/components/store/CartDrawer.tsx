"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '@/redux/slices/cartSlice';
import Link from 'next/link';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 1500;
  const progress = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const awayFromFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalAmount, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleCart())}
            className="fixed inset-0 bg-[#1F2937]/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#FDFBF7] shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-200">
              <h2 className="text-xl font-serif font-bold text-[#1F2937]">Your Cart</h2>
              <button 
                onClick={() => dispatch(toggleCart())}
                className="text-gray-500 hover:text-[#C25E43] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between text-sm mb-2 text-[#1F2937] font-medium">
                {awayFromFreeShipping > 0 
                  ? <span>Add ৳{awayFromFreeShipping.toLocaleString()} for <span className="font-bold">Free Shipping</span></span>
                  : <span className="text-[#8A9A86] font-bold">You unlocked Free Shipping!</span>
                }
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className={`h-full ${progress === 100 ? 'bg-[#8A9A86]' : 'bg-[#1F2937]'}`}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>Your cart is empty.</p>
                  <button onClick={() => dispatch(toggleCart())} className="mt-4 text-[#C25E43] underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <h3 className="text-[#1F2937] font-medium text-sm line-clamp-2">{item.title}</h3>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.productId))}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                            onClick={() => dispatch(updateQuantity({ id: item.productId, quantity: Math.max(1, item.quantity - 1) }))}
                          >-</button>
                          <span className="px-2 text-sm text-[#1F2937]">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                            onClick={() => dispatch(updateQuantity({ id: item.productId, quantity: item.quantity + 1 }))}
                          >+</button>
                        </div>
                        <p className="font-semibold text-[#1F2937]">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between mb-4 text-[#1F2937]">
                  <span className="font-medium text-gray-500">Subtotal</span>
                  <span className="font-bold text-lg">৳{totalAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6 text-center">Taxes and shipping calculated at checkout.</p>
                
                <Link 
                  href="/checkout" 
                  onClick={() => dispatch(toggleCart())}
                  className="w-full bg-[#1F2937] text-white py-4 rounded-md font-medium hover:bg-[#7355A4] transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
                
                <button 
                  onClick={() => dispatch(clearCart())} 
                  className="w-full mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
