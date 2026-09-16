"use client";

import { useState, useEffect, useRef } from 'react';
import { Plus, Search, Edit, Archive, Trash2, Filter, X, Upload, Loader2, Image as ImageIcon, Eye, PackageX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Link from 'next/link';

type Category = { id: string; name: string; slug: string };
type Product = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string;
  price: number;
  originalPrice: number | null;
  stockCount: number;
  imageSrc: string | null;
  categoryId: string;
  category: Category;
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search, Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Delete Dialog
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Fetch Data
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/products?page=${page}&search=${searchTerm}&categoryId=${categoryFilter}&stockStatus=${stockFilter}`);
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
        setTotalPages(json.pagination.totalPages || 1);
      } else {
        toast.error(json.error || 'Failed to load products');
      }
    } catch (e) {
      toast.error('Network error while loading products');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const json = await res.json();
      if (json.success) setCategories(json.data);
    } catch (e) {
      console.error('Failed to load categories', e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(delay);
  }, [page, searchTerm, categoryFilter, stockFilter]);

  // Handlers
  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      const res = await fetch(`/api/admin/products/${productToDelete.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        toast.success('Product deleted');
        setProducts(products.filter(p => p.id !== productToDelete.id));
      } else {
        toast.error(json.error);
      }
    } catch (e) {
      toast.error('Delete failed');
    } finally {
      setIsDeleteOpen(false);
    }
  };



  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col gap-1 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7355A4] bg-purple-50 w-fit px-2.5 py-1 rounded-full border border-purple-100 shadow-sm">Catalog & Atelier Inventory</span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-serif font-bold text-[#1F2937]">Product Management</h1>
          <Link 
            href="/admin/products/new"
            className="w-full sm:w-auto justify-center bg-[#7355A4] text-white px-5 py-2.5 rounded-full font-bold tracking-wider hover:bg-[#5E4389] shadow-md shadow-purple-500/20 transition-all flex items-center gap-2 text-xs uppercase"
          >
            <Plus size={16} /> Add New Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative min-h-[400px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative col-span-2 sm:col-span-1 w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search products or SKU..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-white"
              />
              <Search size={16} className="absolute left-3.5 top-2.5 text-gray-400" />
            </div>
            
            <select 
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-white text-gray-600 font-medium appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            
            <select 
              value={stockFilter}
              onChange={(e) => { setStockFilter(e.target.value); setPage(1); }}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-white text-gray-600 font-medium appearance-none"
            >
              <option value="">Stock Status</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <button 
            onClick={() => toast.info('Advanced filters coming soon!')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-wider uppercase text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shrink-0 shadow-sm"
          >
            <Filter size={16} /> More Filters
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-[#FAF9FC] text-gray-500 uppercase text-[10px] tracking-widest border-b border-gray-100 font-black">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 relative">
              {isLoading && products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Loader2 className="animate-spin text-[#7355A4] mx-auto mb-2" />
                    <p className="text-gray-500">Loading products...</p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-500">No products found.</td>
                </tr>
              ) : (
                products.map((product, idx) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FAF9FC] rounded-2xl overflow-hidden flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                          {product.imageSrc ? (
                            <img src={product.imageSrc} alt={product.title} className="w-full h-full object-cover mix-blend-multiply p-1" />
                          ) : (
                            <ImageIcon size={16} className="text-gray-300" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#1F2937] text-sm">{product.title}</span>
                          <span className="text-[10px] font-mono text-gray-400 mt-0.5 tracking-wider uppercase">SKU: {product.slug.substring(0, 8)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-[#FAF5FF] text-[#7355A4] border border-[#E9D8FD] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1F2937]">৳{(Number(product.price)).toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through font-medium">
                            ৳{(Number(product.originalPrice)).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.stockCount > 0 ? (
                        <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full w-fit border border-green-100 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          <span className="text-[10px] font-bold uppercase tracking-wider">{product.stockCount} in stock</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-full w-fit border border-red-100 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                          <span className="text-[10px] font-bold uppercase tracking-wider">Out of Stock</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors" title="Live Preview">
                          <Eye size={16} />
                        </button>
                        <Link href={`/admin/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-[#7355A4] rounded-xl hover:bg-purple-50 transition-colors inline-block" title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => { setProductToDelete(product); setIsDeleteOpen(true); }} className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden">
          {isLoading && products.length === 0 ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin text-[#7355A4] mx-auto mb-2" />
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center text-gray-500">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 p-4">
              {products.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-4 relative"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-[#FAF9FC] rounded-2xl overflow-hidden flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                      {product.imageSrc ? (
                        <img src={product.imageSrc} alt={product.title} className="w-full h-full object-cover mix-blend-multiply p-1" />
                      ) : (
                        <ImageIcon size={24} className="text-gray-300" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-[#1F2937] text-sm line-clamp-2">{product.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase mb-2">SKU: {product.slug.substring(0, 8)}</span>
                      <span className="bg-[#FAF5FF] text-[#7355A4] border border-[#E9D8FD] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider w-fit mb-2">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1F2937]">৳{(Number(product.price)).toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through font-medium">
                            ৳{(Number(product.originalPrice)).toLocaleString()}
                          </span>
                        )}
                      </div>
                      {product.stockCount > 0 ? (
                        <span className="text-[10px] font-bold text-green-600 uppercase mt-0.5">{product.stockCount} in stock</span>
                      ) : (
                        <span className="text-[10px] font-bold text-red-600 uppercase mt-0.5 flex items-center gap-1"><PackageX size={10} /> Out of Stock</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-white hover:shadow-sm transition-all" title="Live Preview">
                        <Eye size={16} />
                      </button>
                      <Link href={`/admin/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-[#7355A4] rounded-lg hover:bg-white hover:shadow-sm transition-all inline-block" title="Edit">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => { setProductToDelete(product); setIsDeleteOpen(true); }} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white hover:shadow-sm transition-all" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-white">
          <span className="font-medium text-xs">Showing Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Prev
            </button>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <AnimatePresence>
        {isDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDeleteOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative z-10">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product</h3>
              <p className="text-gray-500 text-sm mb-6">Are you sure you want to delete <span className="font-semibold">{productToDelete?.title}</span>? This action is permanent.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors">Cancel</button>
                <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm">Delete Product</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
