"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Home, ChevronDown } from 'lucide-react';
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
    category: 'Notebooks'
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
    category: 'Writing Instruments'
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
    category: 'Writing Instruments'
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
    category: 'Desk Care'
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
    category: 'Desk Care'
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
    category: 'Planners'
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
    category: 'Writing Instruments'
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
    category: 'Desk Care'
  },
];

const CATEGORIES = ['All Items', 'Notebooks', 'Writing Instruments', 'Planners', 'Desk Care'];

export default function BestSellersPage() {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [sortBy, setSortBy] = useState('Featured');
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
            image: p.imageSrc || '/notebook.png',
            category: p.category?.name || 'Desk Care'
          }));
          setDbProducts(mapped);
        }
      })
      .catch(err => console.error('Failed to fetch products', err));
  }, []);

  const currentProducts = dbProducts.length > 0 ? dbProducts : PRODUCTS;

  // Filter products
  let displayProducts = currentProducts.filter(product => {
    if (activeCategory === 'All Items') return true;
    return product.category === activeCategory;
  });

  // Sort products
  if (sortBy === 'Price: Low to High') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    displayProducts.sort((a, b) => b.price - a.price);
  } else {
    // Featured - default order
  }

  return (
    <div className="min-h-screen bg-[#FAF9FC]">
      
      {/* Editorial Header Banner */}
      <div className="relative overflow-hidden bg-white border-b border-[#F0ECF4]">
        {/* Soft blur gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40 pointer-events-none">
          <div className="absolute -left-32 top-[-20%] w-96 h-96 bg-[#7355A4]/20 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute -right-32 top-[10%] w-[30rem] h-[30rem] bg-[#8A9A86]/10 rounded-full blur-3xl mix-blend-multiply"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-5 z-10">
            <Link href="/" className="hover:text-[#7355A4] transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">Best Sellers</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 bg-[#FAF9FC] text-[#7355A4] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-[#F0ECF4] mb-4 z-10">
            Customer Favorites
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1F2430] z-10">
            Best Selling Essentials
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto z-10 text-sm md:text-base">
            Discover our most loved stationery items. Hand-picked favorites trusted by thousands of creatives and professionals worldwide.
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
              className="w-full md:w-48 appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#7355A4]/20 focus:border-[#7355A4] cursor-pointer transition-all shadow-sm"
            >
              <option value="Featured">Sort by: Featured</option>
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
