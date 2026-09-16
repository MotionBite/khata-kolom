"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Sparkles, Feather, Leaf, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-[#FAF9FC] border-b border-[#F0ECF4] py-10 sm:py-14">
        {/* Soft lavender backdrop glows */}
        <div className="absolute inset-0 w-full h-full opacity-50 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 top-[-10%] w-96 h-96 bg-purple-300/30 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute right-10 bottom-[-10%] w-[30rem] h-[30rem] bg-indigo-200/30 rounded-full blur-3xl mix-blend-multiply"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-6 z-10">
            <Link href="/" className="hover:text-[#7355A4] transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">Our Story</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 bg-white text-[#7355A4] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#F0ECF4] shadow-sm mb-5 z-10">
            <Sparkles size={14} className="text-[#7355A4]" /> The Atelier Philosophy
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1F2430] z-10 max-w-3xl">
            Where Craft Meets Mindfulness
          </h1>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto z-10 text-sm md:text-base leading-relaxed">
            Paperly was born from a simple belief: the tools we use to capture our thoughts should be as beautiful and enduring as the ideas themselves.
          </p>
        </div>
      </div>

      {/* Brand Story Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Image Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#7355A4]/5 rounded-3xl transform -rotate-3 transition-transform group-hover:rotate-0 duration-500"></div>
              <div className="relative bg-white p-4 rounded-3xl shadow-xl shadow-gray-200/50">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100">
                  <img 
                    src="/1.jpg" 
                    alt="Brand Story" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                    <Feather size={16} className="text-[#7355A4]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1F2430]">Hand-Finished</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Editorial Narrative */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1F2430] mb-6">
                Redefining the modern desk experience.
              </h2>
              <div className="space-y-5 text-gray-500 text-sm md:text-base leading-relaxed mb-10">
                <p>
                  In a world dominated by digital fleetingness, we wanted to bring back the tangible weight of a thought. Every notebook, pen, and desk accessory in our collection is meticulously curated and designed to inspire slower, more intentional creation.
                </p>
                <p>
                  From hand-stitched bindings to sustainably sourced paper that welcomes every drop of ink without bleeding, our obsession with detail ensures that your desk becomes a sanctuary for your mind.
                </p>
              </div>
              <div>
                <Link 
                  href="/best-sellers" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#1F2430] hover:bg-[#7355A4] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg hover:shadow-[#7355A4]/30 hover:-translate-y-1"
                >
                  Explore The Collection
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-[#FAF9FC] border-t border-[#F0ECF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1F2430]">Our Core Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Value 1 */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-[#F0ECF4] hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#7355A4]/10 text-[#7355A4] rounded-2xl flex items-center justify-center mb-6">
                <Feather size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#1F2430] mb-3">Bleedproof Craft</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Premium 120gsm paper designed to handle fountain pens and markers without ghosting or bleeding through the page.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-[#F0ECF4] hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Leaf size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#1F2430] mb-3">Sustainably Minded</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We partner with FSC-certified mills and prioritize eco-friendly packaging to reduce our footprint on the planet.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-[#F0ECF4] hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#1F2430] mb-3">Mindful Rituals</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We believe journaling isn't just writing—it's a grounding ritual. Our tools are crafted to bring joy to that daily practice.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
