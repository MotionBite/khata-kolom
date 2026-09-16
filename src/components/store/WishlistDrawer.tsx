"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleWishlistDrawer, toggleWishlist } from '@/redux/slices/wishlistSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function WishlistDrawer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isOpen = useSelector((state: RootState) => state.wishlist.isWishlistOpen);
  const wishlistItems = useSelector((state: RootState) => 
    state.wishlist.items.filter(item => typeof item === 'object' && item !== null && item.price !== undefined)
  );

  const handleAddToCart = (item: any) => {
    if (!isAuthenticated) {
      toast.warning('Please log in to add items to your cart.');
      dispatch(toggleWishlistDrawer());
      router.push('/login');
      return;
    }
    dispatch(
      addToCart({
        id: item.id,
        productId: item.id,
        title: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    );
    dispatch(toggleWishlist(item));
    toast.success('Added to bag');
  };

  const handleRemoveFromWishlist = (item: any) => {
    dispatch(toggleWishlist(item));
    toast.info('Removed from Wishlist');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleWishlistDrawer())}
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
              <h2 className="text-xl font-serif font-bold text-[#1F2937]">Your Wishlist</h2>
              <button 
                onClick={() => dispatch(toggleWishlistDrawer())}
                className="text-gray-500 hover:text-rose-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>Your wishlist is empty.</p>
                  <button onClick={() => dispatch(toggleWishlistDrawer())} className="mt-4 text-rose-500 underline">
                    Discover Products
                  </button>
                </div>
              ) : (
                wishlistItems.map((item) => {
                  // Catch legacy string items from old persisted state
                  if (typeof item !== 'object' || !item || item.price === undefined) {
                    return null;
                  }
                  
                  return (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm relative group">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-[#F8F9FA] flex items-center justify-center border border-gray-100">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start pr-6">
                        <h3 className="text-[#1F2937] font-medium text-sm line-clamp-2 leading-snug">{item.name}</h3>
                      </div>
                      
                      <button 
                        onClick={() => handleRemoveFromWishlist(item)}
                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-center justify-between mt-3">
                        <p className="font-bold text-[#1F2937]">৳{(item.price).toLocaleString()}</p>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-[#7355A4] hover:bg-[#5E4389] text-white text-[10px] font-bold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                          <ShoppingCart size={12} />
                          ADD
                        </button>
                      </div>
                    </div>
                  </div>
                )})
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
