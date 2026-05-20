import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import DossIcon from "../assets/images/assest/doss.png";
import photo1 from "../assets/images/assest/282A3269.jpg";
import photo2 from "../assets/images/assest/DSC_6786.jpg";
import photo3 from "../assets/images/assest/MRAD1974-2.jpg";
import { AlertCircle, X, MapPin, Clock, Users, Bell } from 'lucide-react';

import ProgressiveSmearCarousel from "../components/ProgressiveSmearCarousel";

function GridBackground({ language }: { language: string }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#032458]">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '5vw 5vw',
          backgroundPosition: 'center center'
        }}
      />
      {/* Text centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 
          className="text-[30vw] font-black tracking-tighter leading-none select-none text-white/40 mix-blend-overlay uppercase"
          style={{ 
            fontFamily: 'Impact, Arial Black, sans-serif'
          }}
        >
          {language === 'ar' ? 'دوس' : 'DOSS'}
        </h1>
      </div>
    </div>
  );
}

export default function Doss() {
  const { language } = useLanguage();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isAdExpanded, setIsAdExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const carouselImages = [
    photo1,
    photo2,
    photo3,
    photo1,
    photo2,
    photo3,
  ];

  const content = {
    ar: {
      eventDetails: "تفاصيل الفعالية",
      suitableFor: "مناسب لـ",
      suitableDesc: "مثالي لعشاق الأدرينالين والسرعة، الأصدقاء، والعائلات.",
      teensAdults: "مراهقين وبالغين",
      kids10: "أطفال (10+ سنوات)",
      openingHours: "ساعات العمل",
      monThu: "الاثنين - الخميس",
      friday: "الجمعة",
      satSun: "السبت - الأحد",
      locations: "المواقع",
      mainTrack: "المضمار الرئيسي",
      address: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
      getDirections: "احصل على الاتجاهات",
      reminders: "تعليمات هامة",
      reminder1: "يرجى الحضور قبل 15 دقيقة من موعد السباق.",
      reminder2: "يلزم ارتداء أحذية مغلقة بالكامل.",
      reminder3: "يتم توفير الخوذات وأدوات السلامة مجاناً.",
      selectTickets: "اختر التذاكر",
      choosePass: "اختر بطاقة الدخول الخاصة بك واستعد للانطلاق والمنافسة.",
      total: "الإجمالي",
      admit: "حجز دخول",
      admitOne: "دخول فرد",
      clickInfo: "اضغط لمزيد من التفاصيل",
      ticketTypes: [
        {
          title: "الباقة العائلية",
          subtitle: "دخول شخصين بالغين و3 أطفال",
          price: "85",
          validDate: "10/26 • 5 أفراد",
          primaryColor: "#FFD500",
          secondaryColor: "#2F7CFF",
        },
        {
          title: "باقة كبار الشخصيات VIP",
          subtitle: "دخول سريع وممر الصيانة والتحضير",
          price: "120",
          validDate: "10/26 • 5 أفراد",
          primaryColor: "#032458",
          secondaryColor: "#4ca5ff",
        },
        {
          title: "التذكرة العادية",
          subtitle: "دخول عام ومشاركة تجربة السباق",
          price: "35",
          validDate: "10/26 • فرد واحد",
          primaryColor: "#00E676",
          secondaryColor: "#AA00FF",
        }
      ]
    },
    en: {
      eventDetails: "Event Details",
      suitableFor: "Suitable For",
      suitableDesc: "Perfect for adrenaline lovers, friends, and family.",
      teensAdults: "Teens & Adults",
      kids10: "Kids (10+)",
      openingHours: "Opening Hours",
      monThu: "Mon - Thu",
      friday: "Friday",
      satSun: "Sat - Sun",
      locations: "Locations",
      mainTrack: "Main Track",
      address: "King Fahd Road, Riyadh, Saudi Arabia",
      getDirections: "Get Directions",
      reminders: "Reminders",
      reminder1: "Arrive 15 mins before race time.",
      reminder2: "Closed-toe shoes required.",
      reminder3: "Helmets provided.",
      selectTickets: "Select Tickets",
      choosePass: "Choose your entry pass.",
      total: "Total",
      admit: "ADMIT",
      admitOne: "Admit 1",
      clickInfo: "Click for more info",
      ticketTypes: [
        {
          title: "Family Bundle",
          subtitle: "ENTRY FOR 2 ADULTS & 3 CHILDREN",
          price: "85",
          validDate: "10/26 • 5 PAX",
          primaryColor: "#FFD500",
          secondaryColor: "#2F7CFF",
        },
        {
          title: "VIP Premium",
          subtitle: "PRIORITY & PIT PASS",
          price: "120",
          validDate: "10/26 • 5 PAX",
          primaryColor: "#032458",
          secondaryColor: "#4ca5ff",
        },
        {
          title: "Standard Entry",
          subtitle: "GENERAL ADMISSION",
          price: "35",
          validDate: "10/26 • 1 PAX",
          primaryColor: "#00E676",
          secondaryColor: "#AA00FF",
        }
      ]
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  return (
    <div className="bg-[#032458] min-h-screen w-full relative overflow-x-hidden overflow-y-auto scrollbar-hide font-sans flex flex-col selection:bg-white selection:text-[#032458]">
      {/* Grid Background */}
      <GridBackground language={language} />

      {/* Navigation Overlay */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Center Stage Carousel Block */}
      <main className="relative z-30 w-full flex items-center justify-center -mt-10 overflow-visible min-h-screen">
          <div className="w-full h-full min-h-[600px] flex items-center justify-center relative overflow-visible">
            <ProgressiveSmearCarousel 
              images={carouselImages}
              itemWidth={isMobile ? 280 : 550}
              itemHeight={isMobile ? 280 : 550}
              sideItemWidth={isMobile ? 180 : 350}
              sideItemHeight={isMobile ? 180 : 350}
              gap={isMobile ? 40 : 80}
              maxRotation={45}
              perspective={1200}
              borderRadius={4}
              scrollDamping={15}
              edgeColor="#000000"
              edgeWidth={0}
            />
          </div>
      </main>

      {/* Expandable Ad Details */}
      <AnimatePresence>
        {isAdExpanded ? (
          <motion.div
            key="ad-expanded"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-[#0c0c0c]/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Modal background layer */}
            <div className="absolute inset-0" onClick={() => setIsAdExpanded(false)} />
            
            <motion.div 
              layoutId="ad-card-container-doss"
              className="relative bg-[#0a0a0a] text-white w-full max-w-[1250px] max-h-[95vh] md:h-[700px] rounded-[2rem] overflow-y-auto scrollbar-hide md:overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white/10"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            >
              <button 
                onClick={() => setIsAdExpanded(false)} 
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-[#0c0c0c]/40 backdrop-blur-md flex items-center justify-center rounded-full hover:bg-[#0c0c0c]/60 border border-white/10 transition-colors text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Pane 1: Details */}
              <div className="w-full lg:w-[350px] bg-[#161616] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/5 shrink-0 md:overflow-y-auto scrollbar-hide relative z-20 text-start">
                <div className="flex items-center gap-4 mb-10">
                   <motion.div layoutId="ad-logo-doss" className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner shrink-0 p-2">
                       <img src={DossIcon} alt="Logo" className="w-full h-full object-contain" />
                   </motion.div>
                   <div>
                     <motion.h2 layoutId="ad-title-doss" className="text-2xl font-bold tracking-tight text-white mb-0.5 font-sans">Doss Karting</motion.h2>
                     <p className="text-[#032458] text-xs font-bold tracking-wider uppercase font-sans">{t.eventDetails}</p>
                   </div>
                </div>

                <div className="space-y-8">
                  <div>
                     <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 font-sans"><Users size={16} className="text-gray-400"/> {t.suitableFor}</h3>
                     <p className="text-gray-400 text-sm leading-relaxed mb-3 font-sans">{t.suitableDesc}</p>
                     <div className="flex flex-wrap gap-2">
                       <span className="text-[11px] px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-gray-300 font-medium font-sans">{t.teensAdults}</span>
                       <span className="text-[11px] px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-gray-300 font-medium font-sans">{t.kids10}</span>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 font-sans"><Clock size={16} className="text-gray-400"/> {t.openingHours}</h3>
                     <ul className="text-sm text-gray-400 space-y-2 font-sans">
                        <li className="flex justify-between items-center bg-[#1C1C1D] px-3 py-2 rounded-lg border border-white/5"><span>{t.monThu}</span> <span className="text-gray-300 font-semibold font-mono">10:00 - 20:00</span></li>
                        <li className="flex justify-between items-center bg-[#1C1C1D] px-3 py-2 rounded-lg border border-white/5"><span>{t.friday}</span> <span className="text-gray-300 font-semibold font-mono">10:00 - 22:00</span></li>
                        <li className="flex justify-between items-center bg-[#032458]/40 px-3 py-2 rounded-lg border border-[#032458]/40 text-[#4ca5ff]"><span>{t.satSun}</span> <span className="font-bold font-mono">09:00 - 23:00</span></li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 font-sans"><MapPin size={16} className="text-gray-400"/> {t.locations}</h3>
                     <div className="bg-[#1C1C1D] p-4 rounded-xl border border-white/5 font-sans">
                        <h4 className="font-bold text-white mb-1">{t.mainTrack}</h4>
                        <p className="text-gray-400 text-xs mb-3 leading-relaxed">{t.address}</p>
                        <button className="text-xs font-bold text-[#4ca5ff] uppercase tracking-wider hover:text-white transition-colors cursor-pointer">{t.getDirections} &rarr;</button>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 font-sans"><Bell size={16} className="text-gray-400"/> {t.reminders}</h3>
                     <ul className="text-sm text-gray-400 space-y-3 font-sans">
                        <li className="flex gap-3 items-start"><AlertCircle size={16} className="shrink-0 mt-0.5 text-orange-400"/> {t.reminder1}</li>
                        <li className="flex gap-3 items-start"><AlertCircle size={16} className="shrink-0 mt-0.5 text-blue-400"/> {t.reminder2}</li>
                        <li className="flex gap-3 items-start"><AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400"/> {t.reminder3}</li>
                     </ul>
                  </div>
                </div>
              </div>

              {/* Pane 3: Tickets */}
              <div className="flex-1 bg-[#0a0a0a] p-6 lg:p-8 md:overflow-y-auto scrollbar-hide relative z-10 flex flex-col text-start font-sans">
                 <div className="mb-8 shrink-0">
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-2 font-sans">{t.selectTickets}</h3>
                    <p className="text-sm text-gray-400 font-sans">{t.choosePass}</p>
                 </div>

                 <div className="flex flex-col gap-6 pb-12 overflow-y-auto scrollbar-hide flex-1">
                    {t.ticketTypes.map((ticket, idx) => (
                       <div key={idx} className="w-full shrink-0 flex drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] group cursor-pointer hover:rotate-1 hover:-translate-y-1 transition-all duration-300">
                          {/* Left part */}
                          <div className="flex-1 relative p-6 flex flex-col justify-between overflow-hidden rounded-l-md" style={{ backgroundColor: ticket.primaryColor }}>
                             <div className="absolute left-[-2px] top-0 bottom-0 w-3 z-10" style={{
                               backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='20' viewBox='0 0 12 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L0 10L12 20Z' fill='%230a0a0a'/%3E%3C/svg%3E")`,
                               backgroundSize: '12px 20px',
                               backgroundPosition: 'left top',
                               backgroundRepeat: 'repeat-y'
                             }}></div>
                             
                             <div className="pl-4 relative z-20 flex flex-col h-full justify-between gap-8">
                                <div>
                                   <h4 className="text-2xl lg:text-3xl font-bold font-sans text-[#111] leading-none mb-2 tracking-tight">{ticket.title}</h4>
                                   <p className="text-[#111]/70 text-[9px] lg:text-[10px] font-bold tracking-wider uppercase max-w-[80%] leading-tight font-sans">{ticket.subtitle}</p>
                                </div>
                                
                                <div>
                                   <div className="text-[#111]/60 text-[10px] tracking-widest uppercase mb-1 font-bold font-sans">{t.total}</div>
                                   <div className="text-4xl lg:text-5xl font-bold text-[#111] font-mono tracking-tighter">${ticket.price}</div>
                                </div>
                             </div>
                          </div>

                          {/* Right part (Stub) */}
                          <div className="w-[100px] lg:w-[130px] relative py-6 px-4 flex flex-col justify-between items-center border-l-[3px] border-dashed border-[#111]/30 rounded-r-md" style={{ backgroundColor: ticket.secondaryColor }}>
                             <div className="text-[#111] font-bold text-xl lg:text-3xl mt-6 lg:mt-8 font-sans text-center leading-none -rotate-90 origin-center absolute top-12 whitespace-nowrap">
                                {t.admitOne}
                             </div>
                             
                             <div className="text-center w-full mt-auto relative z-20">
                                <div className="text-[#111]/80 text-[9px] font-mono tracking-widest uppercase mb-4 font-bold">{ticket.validDate}</div>
                                <button className="w-full py-2.5 bg-[#111] text-white text-[10px] lg:text-xs font-bold rounded-full hover:bg-[#0c0c0c] transition-colors shadow-xl cursor-pointer font-sans">
                                   {t.admit}
                                </button>
                             </div>

                             <div className="absolute right-[-1px] top-0 bottom-0 w-3 z-10" style={{
                               backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='20' viewBox='0 0 12 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L12 10L0 20Z' fill='%230a0a0a'/%3E%3C/svg%3E")`,
                               backgroundSize: '12px 20px',
                               backgroundPosition: 'right top',
                               backgroundRepeat: 'repeat-y'
                             }}></div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="ad-collapsed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.15, duration: 0.4 }}
            className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto cursor-pointer"
            onClick={() => setIsAdExpanded(true)}
          >
             <motion.div 
               layoutId="ad-card-container-doss" 
               className="bg-[#111111] text-white rounded-[2rem] p-2 pr-6 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-white/10 hover:bg-[#1C1C1D] transition-colors"
               transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
             >
                <motion.div layoutId="ad-logo-doss" className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img src={DossIcon} alt="Doss" className="w-[80%] h-[80%] object-contain" />
                </motion.div>
                
                <div className="flex flex-col justify-center min-w-[140px]">
                    <motion.span layoutId="ad-title-doss" className="text-xs font-bold tracking-wide whitespace-nowrap text-white font-sans">{t.eventDetails}</motion.span>
                    <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-0.5 font-sans">{t.clickInfo}</span>
                </div>
                
                <div className="flex items-center gap-4 ml-2">
                   <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black">
                      <AlertCircle size={18} strokeWidth={2.5} />
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
