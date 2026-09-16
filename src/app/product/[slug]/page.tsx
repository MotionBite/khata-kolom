"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Minus, 
  Plus, 
  Truck, 
  ShieldCheck, 
  Leaf, 
  ChevronDown 
} from 'lucide-react';
import { addToCart } from '@/redux/slices/cartSlice';
import { toggleWishlist } from '@/redux/slices/wishlistSlice';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// --- Mock Data ---
const PRODUCT = {
  id: "prod-artisan-001",
  title: "The Artisan Journal",
  sku: "ART-NB-001",
  category: "Premium Notebooks",
  price: 35.00,
  originalPrice: 45.00,
  images: [
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1531346878377-a541e4ab04ce?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1572016335398-3ba34d6be20a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=1200"
  ],
  specs: ["Dotted", "Ruled", "Blank", "Grid"],
  badge: "Handcrafted",
  details: {
    paper: "Experience the ultimate writing surface with our 120gsm, 100% cotton rag paper. Fountain pen friendly, acid-free, and designed to preserve your thoughts for generations.",
    shipping: "Free express shipping on all orders over $50. Enjoy our hassle-free 30-day return policy. Items must be in original condition.",
    story: "Bound by master craftsmen in a family-owned workshop in Italy, each Artisan Journal represents hours of meticulous work using century-old techniques."
  }
};

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSpec, setSelectedSpec] = useState(PRODUCT.specs[0]);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeAccordion, setActiveAccordion] = useState<string | null>("paper");

  // Magnifier Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // Handlers
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.warning('Please log in to add items to your cart.');
      router.push('/login');
      return;
    }
    dispatch(addToCart({
      id: `${PRODUCT.id}-${selectedSpec}`,
      productId: PRODUCT.id,
      title: `${PRODUCT.title} - ${selectedSpec}`,
      price: PRODUCT.price,
      image: PRODUCT.images[0],
      quantity
    }));
    toast.success('Added to bag');
  };

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      toast.warning('Please log in to add items to your wishlist.');
      router.push('/login');
      return;
    }
    dispatch(toggleWishlist({
      id: PRODUCT.id,
      name: PRODUCT.title,
      price: PRODUCT.price,
      image: PRODUCT.images[0]
    }));
    toast.success('Wishlist updated');
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(prev => prev === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#7355A4]/20 selection:text-[#1F2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* LEFT COLUMN: Gallery Showcase */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 md:gap-6">
            
            {/* Thumbnail Strip */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar pb-2 md:pb-0 md:w-24 shrink-0">
              {PRODUCT.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-24 md:w-24 md:h-32 shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                    activeImage === idx 
                      ? 'ring-2 ring-[#7355A4] ring-offset-2 opacity-100' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`} 
                    fill 
                    className="object-cover" 
                    unoptimized 
                  />
                </button>
              ))}
            </div>

            {/* Main Image Stage */}
            <div 
              className="relative w-full aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden cursor-crosshair group shadow-sm"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image 
                src={PRODUCT.images[activeImage]}
                alt={PRODUCT.title}
                fill
                priority
                className={`object-cover transition-transform duration-300 ${isZoomed ? 'ease-out' : 'ease-in-out'}`}
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transform: isZoomed ? 'scale(2.2)' : 'scale(1)'
                }}
                unoptimized
              />
              
              {/* Micro-badge Overlay */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                <span className="bg-white/90 backdrop-blur-md text-[#7355A4] px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                  {PRODUCT.badge}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Product Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 flex flex-col gap-8">
              
              {/* Header Section */}
              <div className="flex flex-col gap-3">
                <nav className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  {PRODUCT.category} <span className="mx-2">•</span> SKU: {PRODUCT.sku}
                </nav>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#1F2430] leading-tight">
                  {PRODUCT.title}
                </h1>
                
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-medium text-[#1F2430]">
                    ${PRODUCT.price.toFixed(2)}
                  </span>
                  {PRODUCT.originalPrice > PRODUCT.price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ${PRODUCT.originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                        Save {Math.round((1 - PRODUCT.price / PRODUCT.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Paper Specs Selector */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#1F2430] uppercase tracking-wider">
                    Paper Pattern
                  </h3>
                  <span className="text-sm text-gray-500">{selectedSpec}</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {PRODUCT.specs.map(spec => (
                    <button
                      key={spec}
                      onClick={() => setSelectedSpec(spec)}
                      className={`py-3 text-sm font-medium rounded-lg transition-all duration-200 border ${
                        selectedSpec === spec 
                          ? 'border-[#7355A4] bg-[#7355A4]/5 text-[#7355A4]' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-stretch h-14">
                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 w-32 shrink-0">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-gray-500 hover:text-[#7355A4] transition-colors p-1"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-semibold text-[#1F2430]">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-gray-500 hover:text-[#7355A4] transition-colors p-1"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#7355A4] hover:bg-[#5f458a] text-white font-bold tracking-wider uppercase text-sm rounded-xl transition-all duration-300 shadow-[0_8px_20px_-8px_rgba(115,85,164,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(115,85,164,0.6)] active:scale-[0.98]"
                  >
                    Add to Cart
                  </button>

                  {/* Wishlist Button */}
                  <button 
                    onClick={handleToggleWishlist}
                    className="w-14 flex items-center justify-center border border-gray-200 hover:border-[#7355A4] text-gray-400 hover:text-[#7355A4] rounded-xl transition-colors bg-white group"
                  >
                    <Heart size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Shipping Perks */}
              <div className="py-6 border-y border-gray-100 flex justify-between gap-4">
                <div className="flex flex-col items-center gap-2 flex-1 text-center">
                  <Truck size={22} strokeWidth={1.5} className="text-[#7355A4]" />
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1 text-center border-l border-gray-100">
                  <ShieldCheck size={22} strokeWidth={1.5} className="text-[#7355A4]" />
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">30-Day Return</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1 text-center border-l border-gray-100">
                  <Leaf size={22} strokeWidth={1.5} className="text-[#7355A4]" />
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Eco Friendly</span>
                </div>
              </div>

              {/* Accordion Specs */}
              <div className="flex flex-col">
                {[
                  { id: 'paper', title: 'Paper & Binding Specs', content: PRODUCT.details.paper },
                  { id: 'shipping', title: 'Shipping & Returns', content: PRODUCT.details.shipping },
                  { id: 'story', title: 'Artisan Story', content: PRODUCT.details.story },
                ].map((section) => (
                  <div key={section.id} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => toggleAccordion(section.id)}
                      className="w-full flex items-center justify-between py-4 text-left group"
                    >
                      <span className={`font-semibold tracking-wide text-sm transition-colors ${
                        activeAccordion === section.id ? 'text-[#7355A4]' : 'text-[#1F2430] group-hover:text-[#7355A4]'
                      }`}>
                        {section.title}
                      </span>
                      <ChevronDown 
                        size={18} 
                        className={`text-gray-400 transition-transform duration-300 ${
                          activeAccordion === section.id ? 'rotate-180 text-[#7355A4]' : ''
                        }`} 
                      />
                    </button>
                    <AnimatePresence>
                      {activeAccordion === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-gray-500 text-sm leading-relaxed pr-6">
                            {section.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
