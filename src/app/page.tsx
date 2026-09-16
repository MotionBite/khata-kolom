"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import CategorySection from '@/components/home/CategorySection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FeaturedBanners from '@/components/home/FeaturedBanners';
import BestSellersSection from '@/components/home/BestSellersSection';
import InspirationNewsletterSection from '@/components/home/InspirationNewsletterSection';
import TrustFeatures from '@/components/home/TrustFeatures';

const categories = [
  { id: '1', title: "Notebooks & Journals", image: "/notebook.png", slug: "notebooks" },
  { id: '2', title: "Luxury Pens", image: "/pen.png", slug: "pens" },
  { id: '3', title: "Planners & Organizers", image: "/note.png", slug: "planners" },
  { id: '4', title: "Art & Craft Supplies", image: "/penbox_white.jpg", slug: "art" },
  { id: '5', title: "Desk Accessories", image: "/stiki.png", slug: "accessories" },
];

interface HeroSlide {
  id: number;
  tagline: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageSrc: string;
  imageAlt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tagline: "WRITE. PLAN. CREATE.",
    titlePrefix: "Tactile Tools for ",
    titleHighlight: "Intentional Days.",
    description: "Discover high-quality stationery for every idea, plan, and passion.",
    primaryCtaText: "SHOP NOW",
    primaryCtaLink: "/shop",
    secondaryCtaText: "EXPLORE COLLECTION",
    secondaryCtaLink: "/categories",
    imageSrc: "/slide2.png",
    imageAlt: "Lavender themed desk stationery set with notebooks and organizers"
  },
  {
    id: 2,
    tagline: "LUXURY & ELEGANCE.",
    titlePrefix: "Premium Pens, ",
    titleHighlight: "For Your Best Ideas.",
    description: "Experience the smooth flow of ink with our collection of world-class fountain pens and fine writing instruments.",
    primaryCtaText: "SHOP NOW",
    primaryCtaLink: "/categories/pens",
    secondaryCtaText: "EXPLORE COLLECTION",
    secondaryCtaLink: "/brands",
    imageSrc: "/slide1.png",
    imageAlt: "Minimalist executive fountain pen on desk"
  },
  {
    id: 3,
    tagline: "ORGANIZE YOUR LIFE.",
    titlePrefix: "Beautiful Planners, ",
    titleHighlight: "For Daily Goals.",
    description: "Stay on top of your schedule with our stylish and functional planners.",
    primaryCtaText: "SHOP NOW",
    primaryCtaLink: "/category/planners",
    secondaryCtaText: "EXPLORE COLLECTION",
    secondaryCtaLink: "/categories",
    imageSrc: "/slide3.png",
    imageAlt: "Beautiful planner on a desk"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative w-full bg-[#FBF9FC] min-h-[520px] md:min-h-[600px] overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <img
              src={HERO_SLIDES[currentSlide].imageSrc}
              alt={HERO_SLIDES[currentSlide].imageAlt}
              className="absolute inset-0 w-full h-full object-cover object-center md:object-right"
            />

            {/* Subtle Gradient Overlay for Text Readability (Only on the left side) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9FC] via-[#FBF9FC]/70 to-transparent w-full md:w-2/3 lg:w-1/2 z-0" />

            {/* Text Content */}
            <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8 py-12">
              <div className="md:w-[55%] lg:w-1/2 flex flex-col items-start pt-8 md:pt-0">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white shadow-sm px-4 py-2 rounded-full text-[10px] tracking-[0.25em] font-black text-[#7355A4] uppercase mb-6"
                >
                  <Sparkles size={14} />
                  <span>{HERO_SLIDES[currentSlide].tagline}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#1F2430] leading-[1.12] mb-6"
                >
                  {HERO_SLIDES[currentSlide].titlePrefix}<br />
                  <span className="text-[#7355A4]">{HERO_SLIDES[currentSlide].titleHighlight}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-sm text-[#5C6479] max-w-md mb-10 leading-relaxed font-medium"
                >
                  {HERO_SLIDES[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap items-center gap-4 mb-4"
                >
                  <Link
                    href={HERO_SLIDES[currentSlide].primaryCtaLink}
                    className="flex items-center gap-2 bg-[#7355A4] hover:bg-[#5E4389] text-white rounded-full px-7 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors shadow-sm"
                  >
                    {HERO_SLIDES[currentSlide].primaryCtaText}
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href={HERO_SLIDES[currentSlide].secondaryCtaLink}
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors shadow-sm"
                  >
                    {HERO_SLIDES[currentSlide].secondaryCtaText}
                    <ChevronRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots (Fixed at bottom) */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === idx ? 'bg-[#7355A4] w-8' : 'bg-slate-200 w-2 hover:bg-slate-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Value Proposition Strip */}
      <TrustFeatures />

      {/* Shop By Category */}
      <ScrollReveal delay={0.1}>
        <CategorySection />
      </ScrollReveal>

      {/* Featured Banners */}
      <ScrollReveal delay={0.2}>
        <FeaturedBanners />
      </ScrollReveal>

      {/* Best Sellers Carousel */}
      <ScrollReveal delay={0.3}>
        <BestSellersSection />
      </ScrollReveal>

      {/* Inspiration & Newsletter */}
      <ScrollReveal delay={0.4}>
        <InspirationNewsletterSection />
      </ScrollReveal>



    </div>
  );
}
