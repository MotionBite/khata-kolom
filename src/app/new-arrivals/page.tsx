"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Home, ChevronDown, Flame } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';

interface Product {
  id: string;
  name: string;
  feature: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: string;
  image: string;
  category: string;
  badge?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'na-1',
    name: 'Velvet Touch Journal',
    feature: '120gsm Dotted Pages',
    price: 18.99,
    originalPrice: 22.99,
    rating: 5,
    reviews: '342',
    image: '/noteCart.png',
    category: 'Paper Goods',
    badge: 'Trending'
  },
  {
    id: 'na-2',
    name: 'Brass Fountain Pen',
    feature: 'Fine Nib - Elegant Finish',
    price: 45.99,
    originalPrice: 55.00,
    rating: 5,
    reviews: '128',
    image: '/penCart.png',
    category: 'Writing Atelier',
    badge: 'Limited Run'
  },
  {
    id: 'na-3',
    name: 'Pastel Highlighters Vol. 2',
    feature: 'Dual Tip - 8 New Colors',
    price: 12.99,
    originalPrice: 15.99,
    rating: 4,
    reviews: '56',
    image: '/markCart.png',
    category: 'Writing Atelier',
    badge: 'New Palette'
  },
  {
    id: 'na-4',
    name: 'Ceramic Pen Holder',
    feature: 'Handcrafted Minimalist',
    price: 24.99,
    originalPrice: 30.00,
    rating: 5,
    reviews: '89',
    image: '/penbox_white.jpg',
    category: 'Desk Architecture',
    badge: 'Trending'
  },
  {
    id: 'na-5',
    name: 'Hand-pressed Washi Tape',
    feature: 'Botanical Series',
    price: 8.99,
    originalPrice: 12.99,
    rating: 5,
    reviews: '210',
    image: '/gift.png',
    category: 'Paper Goods',
    badge: 'Limited Run'
  },
  {
    id: 'na-6',
    name: 'Executive Leather Planner',
    feature: '2026-2027 Edition',
    price: 35.99,
    originalPrice: 45.00,
    rating: 5,
    reviews: '412',
    image: '/note.png',
    category: 'Paper Goods',
    badge: 'Trending'
  },
  {
    id: 'na-7',
    name: 'Calligraphy Ink Set',
    feature: '3 Exclusive Shades',
    price: 28.99,
    originalPrice: 35.00,
    rating: 4,
    reviews: '77',
    image: '/pen.png',
    category: 'Writing Atelier',
    badge: 'New Palette'
  },
  {
    id: 'na-8',
    name: 'Aesthetic Sticky Notes',
    feature: 'Transparent Set',
    price: 5.99,
    originalPrice: 8.99,
    rating: 5,
    reviews: '155',
    image: '/stiki.png',
    category: 'Desk Architecture',
    badge: 'New Palette'
  },
];

const CATEGORIES = ['All Drops', 'Limited Runs', 'Writing Atelier', 'Paper Goods', 'Desk Architecture'];

export default function NewArrivalsPage() {
  const [activeCategory, setActiveCategory] = useState('All Drops');
  const [sortBy, setSortBy] = useState('Newly Dropped');
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map((p: any, index: number) => ({
            id: p.id,
            name: p.title,
            feature: p.subtitle || p.category?.name || 'Premium Quality',
            price: Number(p.price),
            originalPrice: Number(p.originalPrice || p.price * 1.2),
            rating: 5,
            reviews: Math.floor(Math.random() * 500) + 10,
            image: p.imageSrc || '/notebook.png',
            category: p.category?.name || 'Paper Goods',
            badge: index % 2 === 0 ? 'Trending' : 'Limited Run'
          }));
          setDbProducts(mapped);
        }
      })
      .catch(err => console.error('Failed to fetch products', err));
  }, []);

  const currentProducts = dbProducts.length > 0 ? dbProducts : PRODUCTS;

  // Filter products
  let displayProducts = currentProducts.filter(product => {
    if (activeCategory === 'All Drops') return true;
    if (activeCategory === 'Limited Runs') return product.badge === 'Limited Run';
    return product.category === activeCategory;
  });

  // Sort products
  if (sortBy === 'Price: Low to High') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    displayProducts.sort((a, b) => b.price - a.price);
  } else {
    // Newly Dropped - default order (could simulate by retaining original array order)
  }

  return (
    <div className="min-h-screen bg-[#FAF9FC]">
      
      {/* Editorial Header Banner */}
      <div className="relative overflow-hidden bg-[#FAF9FC] border-b border-[#F0ECF4]">
        {/* Soft blur glowing ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-50 pointer-events-none">
          <div className="absolute -left-20 top-[-10%] w-96 h-96 bg-purple-300/30 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute right-0 top-[20%] w-[25rem] h-[25rem] bg-pink-300/20 rounded-full blur-3xl mix-blend-multiply"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-5 z-10">
            <Link href="/" className="hover:text-[#7355A4] transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">New Arrivals</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 bg-white text-orange-600 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-orange-100 shadow-sm mb-4 z-10">
            <Flame size={14} className="text-orange-500" /> Autumn 2026 Collection Dropped
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1F2430] z-10">
            Fresh Off The Press
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto z-10 text-sm md:text-base">
            Discover the latest additions to our stationery curation. Fresh designs, innovative materials, and limited edition drops just arrived.
          </p>
        </div>
      </div>

      {/* Interactive Filter & Sort */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          
          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar shrink-0">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-[#7355A4] text-white shadow-md shadow-[#7355A4]/20' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-[#7355A4] hover:text-[#7355A4]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-56 appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#7355A4]/20 focus:border-[#7355A4] cursor-pointer transition-all shadow-sm"
            >
              <option value="Newly Dropped">Sort by: Newly Dropped</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-20">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} className="w-full h-full" />
          ))}
          {displayProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500">No products found for this category.</p>
            </div>
          )}
        </div>
        
      </div>
      
    </div>
  );
}
