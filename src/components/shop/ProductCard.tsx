'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/redux/slices/cartSlice';
import { toggleWishlist } from '@/redux/slices/wishlistSlice';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import QuickViewModal from './QuickViewModal';

interface Product {
  id: string;
  name: string;
  feature: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: string | number;
  image: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Redux state
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.warning('Please log in to add items to your wishlist.');
      window.location.href = '/login';
      return;
    }
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }));
    if (isWishlisted) {
      toast.info('Removed from Wishlist');
    } else {
      toast.success('Added to Wishlist');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.warning('Please log in to add items to your cart.');
      window.location.href = '/login';
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        productId: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    toast.success('Added to bag');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className={`flex-shrink-0 snap-start bg-white rounded-2xl flex flex-col relative group/card hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden ${className || 'w-[195px]'}`}>
        {/* Image Container */}
        <div className="h-44 w-full relative bg-[#F8F9FA] flex items-center justify-center p-4">
          {product.badge && (
            <span className="absolute top-3 left-3 z-10 px-2 py-1 bg-[#1F2430] text-white text-[9px] font-bold uppercase tracking-wider rounded">
              {product.badge}
            </span>
          )}
          {/* Wishlist Button */}
          <button 
            type="button"
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors shadow-sm"
          >
            <Heart 
              size={16} 
              className={`transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-500'}`} 
            />
          </button>
          <img 
            src={product.image} 
            alt={product.name}
            onClick={handleQuickView}
            className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105 mix-blend-multiply cursor-pointer" 
          />
        </div>

        {/* Details */}
        <div className="flex flex-col p-3.5 flex-1">
          <h3 className="text-[15px] font-bold text-[#1F2430] line-clamp-1 mb-0.5" title={product.name}>
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 line-clamp-1 mb-2">
            {product.feature}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="flex tracking-tighter text-[#F5A623]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[12px] leading-none">
                    {i < product.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-gray-500 font-medium ml-1.5">
                ({product.reviews})
              </span>
            </div>
            {/* Quick View Button */}
            <button 
              type="button"
              onClick={handleQuickView}
              className="w-[30px] h-[30px] rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F2430] hover:text-white transition-colors text-gray-600 bg-white shadow-sm flex-shrink-0"
            >
              <ShoppingCart size={14} />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-1">
            <span className="text-[15px] font-black text-[#1F2430]">
              ${product.price.toFixed(2)}
            </span>
            
            <button 
              type="button"
              onClick={handleAddToCart}
              className="bg-[#7355A4] hover:bg-[#5E4389] text-white text-[10px] font-bold px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shadow-sm active:scale-95"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
}
