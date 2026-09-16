import React from 'react';
import { ShieldCheck, Leaf, Truck, CreditCard } from 'lucide-react';

const valueProps = [
  { 
    icon: ShieldCheck, 
    title: "Authentic Stationery", 
    desc: "100% genuine premium brands",
    badge: "Curated",
    gradient: "from-purple-100 to-purple-50",
    iconColor: "text-purple-600"
  },
  { 
    icon: Leaf, 
    title: "Eco-friendly Paper", 
    desc: "Sustainable & recycled materials",
    badge: "120 GSM",
    gradient: "from-green-100 to-green-50",
    iconColor: "text-green-600"
  },
  { 
    icon: Truck, 
    title: "Express Dispatch", 
    desc: "Nationwide delivery in 48 hrs",
    badge: "Tracked",
    gradient: "from-blue-100 to-blue-50",
    iconColor: "text-blue-600"
  },
  { 
    icon: CreditCard, 
    title: "Cash on Delivery", 
    desc: "Pay safely when you receive",
    badge: "Secure",
    gradient: "from-orange-100 to-orange-50",
    iconColor: "text-orange-600"
  },
];

export default function TrustFeatures() {
  return (
    <section className="bg-[#FDFCFE] py-12 border-b border-[#F0ECF4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {valueProps.map((vp, idx) => (
            <div 
              key={idx} 
              className="relative bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-purple-50/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-purple-900/5 hover:-translate-y-1 transition-all duration-300 group flex items-start gap-4 overflow-hidden"
            >
              {/* Decorative background glow on hover */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>

              {/* Icon Pod */}
              <div className={`w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br ${vp.gradient} flex items-center justify-center ${vp.iconColor} group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm border border-white/50`}>
                <vp.icon size={22} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="flex-col pt-0.5">
                <h4 className="font-semibold text-[#1F2430] text-[13px] tracking-wide pr-14 leading-tight">{vp.title}</h4>
                <p className="text-[11px] text-[#5C6479] mt-1.5 leading-relaxed">{vp.desc}</p>
              </div>

              {/* Micro Badge */}
              <div className="absolute top-4 right-4 px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-400 text-[8px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                {vp.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
