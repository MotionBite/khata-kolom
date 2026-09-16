'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from '../shop/ProductCard';

interface Product {
  id: string;
  name: string;
  feature: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: string;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimal Spiral Notebook',
    feature: 'Ruled Pages',
    price: 8.99,
    originalPrice: 12.99,
    rating: 5,
    reviews: '1,245',
    image: '/noteCart.png',
  },
  {
    id: '2',
    name: 'Gel Pen Set (10pcs)',
    feature: 'Smooth Writing',
    price: 9.99,
    originalPrice: 14.99,
    rating: 5,
    reviews: '2,153',
    image: '/penCart.png',
  },
  {
    id: '3',
    name: 'Pastel Highlighters',
    feature: 'Chisel Tip - 6 Colors',
    price: 7.99,
    originalPrice: 11.99,
    rating: 5,
    reviews: '1,782',
    image: '/markCart.png',
  },
  {
    id: '4',
    name: 'Desk Organizer',
    feature: 'Multi-Function',
    price: 14.99,
    originalPrice: 21.99,
    rating: 5,
    reviews: '1,012',
    image: '/penbox_white.jpg',
  },
  {
    id: '5',
    name: 'Washi Tape Set',
    feature: 'Colorful Collection',
    price: 6.99,
    originalPrice: 9.99,
    rating: 5,
    reviews: '943',
    image: '/gift.png',
  },
  {
    id: '6',
    name: 'Classic Planner 2024',
    feature: 'Weekly & Monthly',
    price: 16.99,
    originalPrice: 24.99,
    rating: 5,
    reviews: '1,317',
    image: '/note.png',
  },
  {
    id: '7',
    name: 'Premium Ink Bottle',
    feature: '50ml - Royal Blue',
    price: 12.99,
    originalPrice: 15.99,
    rating: 5,
    reviews: '412',
    image: '/pen.png',
  },
  {
    id: '8',
    name: 'Sticky Notes Set',
    feature: 'Pastel Colors',
    price: 4.99,
    originalPrice: 6.99,
    rating: 4,
    reviews: '856',
    image: '/stiki.png',
  },
];

export default function BestSellersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map((p: any) => ({
            id: p.id,
            name: p.title,
            feature: p.subtitle || p.category?.name || 'Premium Quality',
            price: Number(p.price),
            originalPrice: Number(p.originalPrice || p.price * 1.2),
            rating: 5,
            reviews: Math.floor(Math.random() * 500) + 10,
            image: p.imageSrc || '/notebook.png'
          }));
          setDbProducts(mapped);
        }
      })
      .catch(err => console.error('Failed to fetch products', err));
  }, []);

  const displayProducts = dbProducts.length > 0 ? dbProducts : PRODUCTS;

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [displayProducts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#7355A4] text-xs font-semibold tracking-wide">
              <Sparkles size={14} className="text-[#7355A4]" />
              Iconic Favorites
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2430]">
              BEST SELLERS
            </h2>
            <p className="text-gray-500 text-sm max-w-md">
              Discover our most loved stationery essentials, curated for those who appreciate the art of writing.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/best-sellers" 
              className="text-xs font-bold tracking-wider text-[#1F2430] hover:text-[#7355A4] flex items-center gap-1 transition-colors uppercase group"
            >
              VIEW ALL
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            

          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Left Navigation */}
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute -left-4 top-[42%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 transition-all duration-300 ${!canScrollLeft ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#7355A4] hover:text-white hover:scale-110 cursor-pointer'}`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scrollable Track */}
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto gap-5 snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1"
          >
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Right Navigation */}
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute -right-4 top-[42%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 transition-all duration-300 ${!canScrollRight ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#7355A4] hover:text-white hover:scale-110 cursor-pointer'}`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}
