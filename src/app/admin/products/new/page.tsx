"use client";

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Upload, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    price: '',
    originalPrice: '',
    inStock: 'true',
    categoryId: '',
    imageSrc: '',
    stockCount: 0,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(json => {
        if (json.success) setCategories(json.data);
      })
      .catch(e => console.error(e));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        setFormData({ ...formData, imageSrc: json.url });
        toast.success('Image uploaded successfully');
      } else {
        toast.error(json.error || 'Upload failed');
      }
    } catch (err) {
      toast.error('Network error during upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stockCount: formData.inStock === 'true' ? 1 : 0
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Product created successfully');
        router.push('/admin/products');
      } else {
        toast.error(json.error || 'Failed to save product');
      }
    } catch (err) {
      toast.error('Network error while saving');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto pb-12 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
        <Link href="/admin/products" className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-500 hover:text-[#1F2937]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1F2937]">Add New Product</h1>
          <p className="text-sm text-gray-500">Create a new item in your atelier catalog.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols) - Main Details & Media */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">Product Information</h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Product Title</label>
              <input 
                required 
                type="text" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-gray-50/50 focus:bg-white" 
                placeholder="e.g. The Artisan Leather Journal" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Subtitle <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input 
                type="text" 
                value={formData.subtitle} 
                onChange={e => setFormData({...formData, subtitle: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-gray-50/50 focus:bg-white" 
                placeholder="A short tagline or quick description" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Rich Description</label>
              <textarea 
                required 
                rows={8} 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-gray-50/50 focus:bg-white resize-none" 
                placeholder="Write a detailed, editorial description highlighting the luxury materials and craftsmanship..."
              ></textarea>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#1F2937]">Media & Photography</h3>
            <p className="text-sm text-gray-500 -mt-2 mb-4">Upload high-quality images of the product. First image will be the cover.</p>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-64 border-2 border-dashed border-purple-200 rounded-2xl bg-purple-50/30 hover:bg-purple-50 transition-colors cursor-pointer flex flex-col items-center justify-center overflow-hidden relative"
            >
              {formData.imageSrc ? (
                <div className="w-full h-full relative group">
                  <img src={formData.imageSrc} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg">Change Image</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                    {isUploading ? <Loader2 className="animate-spin text-[#7355A4]" size={28} /> : <Upload className="text-[#7355A4]" size={28} />}
                  </div>
                  <span className="text-base text-gray-700 font-bold">{isUploading ? 'Uploading Image...' : 'Click or Drag & Drop'}</span>
                  <span className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</span>
                </>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) - Pricing & Inventory */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">Pricing Strategy</h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Selling Price (৳)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">৳</span>
                <input 
                  required 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-gray-50/50 focus:bg-white text-lg font-bold text-[#1F2937]" 
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Original/Compare Price <span className="text-gray-400 font-normal">(Optional)</span></label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">৳</span>
                <input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={formData.originalPrice} 
                  onChange={e => setFormData({...formData, originalPrice: e.target.value})} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-gray-50/50 focus:bg-white line-through text-gray-500" 
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">Setting this will display a sale tag on the storefront.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">Organization & Inventory</h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Category Collection</label>
              <select 
                required 
                value={formData.categoryId} 
                onChange={e => setFormData({...formData, categoryId: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-white font-medium text-gray-700 appearance-none"
              >
                <option value="" disabled>Select a collection</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Stock Status</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`border rounded-xl p-3 flex items-center justify-center cursor-pointer transition-colors ${formData.inStock === 'true' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                  <input type="radio" name="stock" value="true" checked={formData.inStock === 'true'} onChange={() => setFormData({...formData, inStock: 'true'})} className="hidden" />
                  <span className="font-bold text-sm tracking-wider uppercase">In Stock</span>
                </label>
                <label className={`border rounded-xl p-3 flex items-center justify-center cursor-pointer transition-colors ${formData.inStock === 'false' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                  <input type="radio" name="stock" value="false" checked={formData.inStock === 'false'} onChange={() => setFormData({...formData, inStock: 'false'})} className="hidden" />
                  <span className="font-bold text-sm tracking-wider uppercase">Out of Stock</span>
                </label>
              </div>

              {formData.inStock === 'true' && (
                <div className="mt-4">
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Available Quantity</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={formData.stockCount || ''} 
                    onChange={e => setFormData({...formData, stockCount: parseInt(e.target.value) || 0})} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-gray-50/50 focus:bg-white" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-start gap-3 pt-2">
            <Link href="/admin/products" className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isSaving || isUploading} 
              className="bg-[#7355A4] text-white px-6 py-2.5 rounded-xl font-bold tracking-wider hover:bg-[#5E4389] shadow-md shadow-purple-500/20 transition-all flex items-center gap-2 text-sm uppercase disabled:opacity-70"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              সেভ করুন (Save)
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
