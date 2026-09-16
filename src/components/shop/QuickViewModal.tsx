'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Star, CheckCircle, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  feature: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: string | number;
  image: string;
}

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      setQuantity(1); // Reset quantity on open
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.warning('Please log in to add items to your cart.');
      onClose();
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
        quantity,
      })
    );
    toast.success('Added to bag');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-1/2 bg-[#F8F9FA] relative flex items-center justify-center p-8 min-h-[300px]">
              <div className="absolute top-6 left-6 bg-white px-3 py-1 rounded-full text-[10px] font-bold text-[#7355A4] tracking-wider shadow-sm uppercase flex items-center gap-1.5">
                <Tag size={12} />
                {product.feature}
              </div>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-[400px] object-contain mix-blend-multiply"
              />
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-[#F5A623]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < product.rating ? 'currentColor' : 'none'}
                      className={i < product.rating ? 'text-[#F5A623]' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-medium">({product.reviews} reviews)</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1F2430] mb-2 leading-tight">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-black text-[#1F2430]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm font-medium text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle size={10} /> IN STOCK
                </span>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Discover the perfect blend of style and utility with this premium {product.name.toLowerCase()}. 
                Designed for those who appreciate quality and functionality in their everyday essentials.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-full bg-gray-50/50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#7355A4] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#1F2430]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#7355A4] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#7355A4] hover:bg-[#5E4389] text-white py-4 rounded-xl font-bold text-sm tracking-widest transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] uppercase"
              >
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
