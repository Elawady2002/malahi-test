import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

import LambyIcon from "../assets/images/assest/lamby.png";
import DossIcon from "../assets/images/assest/doss.png";
import NoosIcon from "../assets/images/assest/1noos.png";
import FizziaIcon from "../assets/images/assest/fizzia.png";

interface Branch {
  nameEn: string;
  nameAr: string;
  cityEn: string;
  cityAr: string;
  region: "central" | "western" | "eastern";
  addressEn: string;
  addressAr: string;
  phone: string;
  hoursEn: string;
  hoursAr: string;
  brands: { name: string; icon: string; bgColor: string }[];
  mapsLink: string;
}

const branches: Branch[] = [
  {
    nameEn: "Boulevard City Branch",
    nameAr: "فرع بوليفارد سيتي",
    cityEn: "Riyadh",
    cityAr: "الرياض",
    region: "central",
    addressEn: "Boulevard City, Prince Turki Al Awwal Rd",
    addressAr: "بوليفارد سيتي، طريق الأمير تركي بن عبد العزيز الأول",
    phone: "+966 53 651 7321",
    hoursEn: "4:00 PM - 12:00 AM Daily",
    hoursAr: "من 4:00 مساءً حتى 12:00 صباحاً يومياً",
    brands: [
      { name: "Doos", icon: DossIcon, bgColor: "#0c1a40" },
      { name: "1noos", icon: NoosIcon, bgColor: "#F28224" },
    ],
    mapsLink: "https://maps.google.com/?q=Boulevard+City+Riyadh",
  },
  {
    nameEn: "Cenomi Nakheel Mall Branch",
    nameAr: "فرع النخيل مول",
    cityEn: "Riyadh",
    cityAr: "الرياض",
    region: "central",
    addressEn: "Nakheel Mall, Al Mughrizat District",
    addressAr: "النخيل مول، حي المغرزات",
    phone: "+966 53 651 7321",
    hoursEn: "10:00 AM - 11:00 PM (Fri: 2 PM - 11 PM)",
    hoursAr: "10:00 صباحاً - 11:00 مساءً (الجمعة: 2 مساءً - 11 مساءً)",
    brands: [
      { name: "Lambee", icon: LambyIcon, bgColor: "#FFA1B5" },
      { name: "Fizzia", icon: FizziaIcon, bgColor: "#0B2114" },
    ],
    mapsLink: "https://maps.google.com/?q=Nakheel+Mall+Riyadh",
  },
  {
    nameEn: "Cenomi Mall of Arabia",
    nameAr: "فرع مول العرب",
    cityEn: "Jeddah",
    cityAr: "جدة",
    region: "western",
    addressEn: "Mall of Arabia, An Nuzhah District",
    addressAr: "مول العرب، حي النزهة",
    phone: "+966 53 651 7321",
    hoursEn: "10:00 AM - 11:00 PM (Fri: 2 PM - 11 PM)",
    hoursAr: "10:00 صباحاً - 11:00 مساءً (الجمعة: 2 مساءً - 11 مساءً)",
    brands: [
      { name: "Doos", icon: DossIcon, bgColor: "#0c1a40" },
      { name: "Fizzia", icon: FizziaIcon, bgColor: "#0B2114" },
    ],
    mapsLink: "https://maps.google.com/?q=Mall+of+Arabia+Jeddah",
  },
  {
    nameEn: "Mall of Dhahran Branch",
    nameAr: "فرع مجمع الظهران",
    cityEn: "Dhahran / Dammam",
    cityAr: "الظهران / الدمام",
    region: "eastern",
    addressEn: "Mall of Dhahran, Al Dawhah Al Janubiyah",
    addressAr: "مجمع الظهران، حي الدوحة الجنوبية",
    phone: "+966 53 651 7321",
    hoursEn: "10:00 AM - 11:00 PM (Fri: 2 PM - 11 PM)",
    hoursAr: "10:00 صباحاً - 11:00 مساءً (الجمعة: 2 مساءً - 11 مساءً)",
    brands: [
      { name: "Lambee", icon: LambyIcon, bgColor: "#FFA1B5" },
      { name: "1noos", icon: NoosIcon, bgColor: "#F28224" },
    ],
    mapsLink: "https://maps.google.com/?q=Mall+of+Dhahran",
  },
];

export default function Branches() {
  const { language } = useLanguage();
  const [activeRegion, setActiveRegion] = useState<"all" | "central" | "western" | "eastern">("all");

  const filteredBranches = branches.filter(
    (b) => activeRegion === "all" || b.region === activeRegion
  );

  const t = {
    ar: {
      badge: "فروعنا في جميع أنحاء المملكة",
      title: "فروع ملاهي",
      desc: "ابحث عن أقرب مركز ترفيهي لـ ملاهي. ندير مدن ألعاب داخلية وخارجية متكاملة في المناطق الوسطى، الغربية، والشرقية بالمملكة.",
      regions: [
        { id: "all", label: "كل المناطق" },
        { id: "central", label: "المنطقة الوسطى" },
        { id: "western", label: "المنطقة الغربية" },
        { id: "eastern", label: "المنطقة الشرقية" },
      ],
      regionLabels: {
        central: "الوسطى",
        western: "الغربية",
        eastern: "الشرقية",
      },
      brandsAtBranch: "العلامات التجارية المتاحة",
      directions: "الحصول على الاتجاهات",
      supportTitle: "الدعم والمساعدة",
      supportDesc: "هل لديك استفسارات حول ساعات العمل في العطلات الرسمية، أسعار المجموعات، أو المفقودات؟ اتصل مباشرة بمركز دعم الفروع عبر البريد الإلكتروني info@malahi.com أو عبر الهاتف."
    },
    en: {
      badge: "Located Across the Kingdom",
      title: "Our Branches",
      desc: "Find a Malahi entertainment park near you. We operate massive indoor and outdoor venues in Central, Western, and Eastern regions of Saudi Arabia.",
      regions: [
        { id: "all", label: "All Regions" },
        { id: "central", label: "Central Region" },
        { id: "western", label: "Western Region" },
        { id: "eastern", label: "Eastern Region" },
      ],
      regionLabels: {
        central: "Central",
        western: "Western",
        eastern: "Eastern",
      },
      brandsAtBranch: "Brands at this branch",
      directions: "Get Directions",
      supportTitle: "Need Support?",
      supportDesc: "Have questions about operating hours during holidays, group booking rates, or lost items? Contact our branches support center directly at info@malahi.com or call us."
    }
  }[language];

  return (
    <div className="bg-[#0c0c0c] min-h-screen text-[#ebebeb] font-sans w-full overflow-x-hidden flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 px-6 w-full flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Glow & Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit mx-auto text-xs uppercase tracking-widest text-emerald-400 font-bold font-sans"
          >
            <span>{t.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-none uppercase font-sans"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-sans font-normal"
          >
            {t.desc}
          </motion.p>
        </div>
      </section>

      {/* Region Tabs & Cards */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full z-10 flex-1">
        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {t.regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border duration-300 cursor-pointer font-sans
                ${activeRegion === region.id 
                  ? "bg-white text-black border-white shadow-[0_8px_25px_rgba(255,255,255,0.25)] scale-105" 
                  : "bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20"}`}
            >
              {region.label}
            </button>
          ))}
        </div>

        {/* Branches Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredBranches.map((b) => {
              const name = language === 'ar' ? b.nameAr : b.nameEn;
              const city = language === 'ar' ? b.cityAr : b.cityEn;
              const address = language === 'ar' ? b.addressAr : b.addressEn;
              const hours = language === 'ar' ? b.hoursAr : b.hoursEn;

              return (
                <motion.div
                  key={b.nameEn}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="bg-neutral-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between gap-8 relative overflow-hidden group shadow-2xl hover:border-emerald-500/30 transition-all duration-300 text-start hover:bg-neutral-900/60"
                >
                  <div className="space-y-6">
                    {/* Branch name and region tag */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-start space-y-1">
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug font-sans">{name}</h3>
                        <span className="text-[10px] text-neutral-500 block mt-1 uppercase tracking-widest font-bold font-sans">{city}</span>
                      </div>

                      <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 rounded-full shrink-0 font-sans">
                        {t.regionLabels[b.region]}
                      </span>
                    </div>

                    {/* Branch details */}
                    <div className="space-y-4 text-start border-t border-b border-white/5 py-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                        <div className="text-sm font-sans">
                          <p className="text-neutral-300 font-normal">{address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                        <div className="text-sm font-sans">
                          <p className="text-neutral-300 font-normal">{hours}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-neutral-500 shrink-0" />
                        <span className="text-sm text-neutral-300 font-sans font-normal">{b.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer block: Active Brands & Maps Link */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 shrink-0">
                    {/* Brand icons */}
                    <div className="space-y-2 text-start">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500 block font-sans">{t.brandsAtBranch}</span>
                      <div className="flex items-center gap-3">
                        {b.brands.map((brand, brandIdx) => (
                          <div 
                            key={brandIdx}
                            style={{ backgroundColor: brand.bgColor }}
                            className="w-9 h-9 rounded-full flex items-center justify-center p-1 border border-white/10 relative group/icon shadow-inner"
                            title={brand.name}
                          >
                            <img src={brand.icon} alt={brand.name} className="w-[80%] h-[80%] object-contain" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Direction link */}
                    <a
                      href={b.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full px-5 py-3.5 hover:bg-emerald-400 hover:text-black transition-all shadow-xl font-sans"
                    >
                      <span>{t.directions}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Map note */}
      <section className="py-24 px-6 max-w-4xl mx-auto w-full z-10 text-center">
        <div className="bg-neutral-900/50 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent opacity-80" />
          
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-tight font-sans">{t.supportTitle}</h2>
          <p className="text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            {t.supportDesc}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
