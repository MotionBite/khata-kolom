import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    tagText: "Academic Atelier",
    title: "Back to School\nEssentials",
    subtitle: "Curated picks for a\nproductive new start.",
    ctaText: "SHOP NOW",
    ctaLink: "/category/school",
    image: "/images/banners/school-backpack.png",
    gradient: "bg-gradient-to-br from-[#DDEAE6] to-[#EAF2F0]",
    badgeText: "Save 20%",
  },
  {
    id: 2,
    tagText: "Mindful Habits",
    title: "Plan Your Best\nYear Yet!",
    subtitle: "Explore planners\ndesigned for clarity.",
    ctaText: "SHOP PLANNERS",
    ctaLink: "/category/planners",
    image: "/images/banners/planner-diary.png",
    gradient: "bg-gradient-to-br from-[#FBE4EA] to-[#FDF0F3]",
    badgeText: "2026 Editions",
  },
  {
    id: 3,
    tagText: "Artisan Palette",
    title: "Bright Ideas,\nBeautiful Tools",
    subtitle: "Premium stationery\nthat fuels creativity.",
    ctaText: "ART SUPPLIES",
    ctaLink: "/category/art",
    image: "/images/banners/art-materials.png",
    gradient: "bg-gradient-to-br from-[#FDF0DE] to-[#FEF6EB]",
    badgeText: "New Palette",
  },
];

export default function FeaturedBanners() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-white/80 border border-purple-100/80 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-[#7355A4] shadow-sm mb-4">
            <Sparkles size={12} strokeWidth={2.5} />
            Seasonal Curations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2430] tracking-tight">
            Designed for Inspired Days
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto mt-2.5 leading-relaxed font-normal">
            Discover our hand-picked collections tailored for productivity, creativity, and finding joy in the everyday details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BANNERS.map((banner) => (
            <Link 
              key={banner.id} 
              href={banner.ctaLink}
              className={`relative overflow-hidden rounded-3xl border border-white/80 ${banner.gradient} p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-xl hover:shadow-[#7355A4]/5 hover:-translate-y-1.5 min-h-[280px]`}
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/50 blur-3xl rounded-full z-0 pointer-events-none"></div>

              {/* Top Right Micro-Pill Badge */}
              <div className="absolute top-6 right-6 z-20 px-3 py-1 bg-white/60 backdrop-blur-md rounded-full border border-white/80 text-[9px] font-bold uppercase tracking-[0.15em] text-[#1F2430] shadow-sm">
                {banner.badgeText}
              </div>

              {/* Image Content */}
              <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <img 
                  src={banner.image} 
                  alt={banner.title.replace('\n', ' ')}
                  className="w-full h-full object-cover object-right transform origin-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />
              </div>

              {/* Text Content */}
              <div className="relative z-10 w-[70%] sm:w-[65%] flex flex-col h-full justify-between">
                <div>
                  {/* Micro-tag with Sparkles */}
                  <div className="inline-flex items-center gap-1.5 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#7355A4] bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/60 shadow-sm w-fit">
                    <Sparkles size={12} strokeWidth={2.5} />
                    {banner.tagText}
                  </div>

                  <h3 className="font-serif text-2xl lg:text-[26px] font-bold text-[#1F2430] leading-snug whitespace-pre-line mb-3">
                    {banner.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#5C6479] mb-8 whitespace-pre-line leading-relaxed font-medium">
                    {banner.subtitle}
                  </p>
                </div>
                
                {/* Chic Pill Button */}
                <div className="inline-flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1F2430] shadow-sm hover:bg-white transition-colors w-fit group-hover:shadow-md">
                  {banner.ctaText}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
