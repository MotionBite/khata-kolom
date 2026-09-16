'use client';

import { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function InspirationNewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    // Simulate API call
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  const galleryImages = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
    '/6.jpg'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Instagram Gallery */}
        <div>
          {/* Header */}
          <div className="flex flex-col items-center justify-center text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-[#E1306C] text-xs font-semibold tracking-wide uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              Instagram
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2430]">
              Curated Community Journals
            </h2>
            <p className="text-gray-500 text-sm">
              Tag us <span className="font-semibold text-[#1F2430]">@khatakolom.shop</span> to get featured!
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((src, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-[#F7F7F8] group cursor-pointer shadow-sm hover:shadow-md transition-all duration-500">
                <Image 
                  src={src} 
                  alt={`Community Inspiration ${idx + 1}`} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Heart size={20} className="fill-white" />
                    <span>{120 + idx * 45}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Luxury Newsletter Banner */}
        <div className="w-full rounded-[2.5rem] bg-gradient-to-r from-[#FFF2F4] via-[#FAF5FF] to-[#F1F3FD] p-10 md:p-16 lg:p-20 relative overflow-hidden shadow-sm border border-white">
          
          {/* Abstract Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2430] mb-5 leading-tight">
              Join Our Atelier Community
            </h2>
            <p className="text-gray-600 mb-10 text-base md:text-lg leading-relaxed">
              Subscribe to receive exclusive access to new arrivals, curated journaling prompts, and special member-only offers.
            </p>
            
            <form onSubmit={handleSubscribe} className="w-full max-w-md relative flex items-center bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm border border-white focus-within:border-[#7355A4]/30 focus-within:ring-4 focus-within:ring-[#7355A4]/10 focus-within:bg-white transition-all duration-300">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="w-full bg-transparent outline-none px-6 text-sm text-[#1F2430] placeholder-gray-400 h-12"
              />
              <button 
                type="submit" 
                className="bg-[#7355A4] text-white rounded-full px-8 py-3.5 text-xs font-bold tracking-wider hover:bg-[#5E4389] transition-colors flex-shrink-0 shadow-sm active:scale-95 uppercase flex items-center gap-2"
              >
                Join
                <Send size={14} className="hidden sm:block" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
