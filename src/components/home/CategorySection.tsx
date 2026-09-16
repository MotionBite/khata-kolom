import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface CategoryItem {
  name: string;
  image: string;
  href: string;
  bg: string;
  itemCount: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: 'NOTEBOOKS',
    image: '/notebook.png',
    href: '/category/notebooks',
    bg: 'bg-[#F4EEFB]',
    itemCount: '32 Items',
  },
  {
    name: 'PENS & PENCILS',
    image: '/pen.png',
    href: '/category/pens',
    bg: 'bg-[#F0F7FF]',
    itemCount: '45 Items',
  },
  {
    name: 'OFFICE SUPPLIES',
    image: '/stiki.png',
    href: '/category/office-supplies',
    bg: 'bg-[#FFF8EE]',
    itemCount: '18 Items',
  },
  {
    name: 'BAGS & CASES',
    image: '/bag_white.jpg',
    href: '/category/bags',
    bg: 'bg-[#EFFBF4]',
    itemCount: '24 Items',
  },
  {
    name: 'ART & CRAFT',
    image: '/penbox_white.jpg',
    href: '/category/art',
    bg: 'bg-[#FFF0F3]',
    itemCount: '56 Items',
  },
  {
    name: 'PLANNERS',
    image: '/note.png',
    href: '/category/planners',
    bg: 'bg-[#F5F3FF]',
    itemCount: '12 Items',
  },
  {
    name: 'GIFT SETS',
    image: '/gift.png',
    href: '/category/gift-sets',
    bg: 'bg-[#FFFBEB]',
    itemCount: '8 Items',
  },
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-white border-b border-[#F0ECF4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="bg-white/80 border border-purple-100/80 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-[#7355A4] shadow-sm mb-4 inline-block">
            Explore Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2430] tracking-tight mb-4">
            Curated Collections
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto font-normal leading-relaxed tracking-normal">
            Discover our hand-picked selection of premium stationery, crafted to elevate your daily rituals and workspace aesthetics.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.name} 
              href={category.href}
              className="flex flex-col items-center group cursor-pointer w-full"
            >
              <div className={`w-full aspect-square ${category.bg} rounded-3xl border border-white/90 mb-4 flex items-center justify-center p-5 relative overflow-hidden transition-all duration-300 shadow-sm group-hover:shadow-md`}>
                
                {/* Floating Arrow (Fades in on hover) */}
                <div className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-sm border border-white/50 z-10">
                  <ArrowUpRight size={14} className="text-[#1F2430]" />
                </div>

                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-contain mix-blend-darken transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 relative z-0" 
                />
              </div>
              
              <div className="text-center w-full">
                <h3 className="text-[13px] font-bold text-[#1F2430] tracking-tight transition-colors duration-300 group-hover:text-[#7355A4]">
                  {category.name}
                </h3>
                <span className="text-[10px] font-medium text-slate-400 tracking-wide block mt-0.5">
                  {category.itemCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
