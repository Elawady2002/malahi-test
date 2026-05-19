import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from 'motion/react';
import FizziaIcon from "../assets/images/assest/fizzia.png";
import FizziaCharacter from "../assets/images/assest/fiaza_character.png";
import photo1 from "../assets/images/assest/282A3269.jpg";
import photo2 from "../assets/images/assest/DSC_6786.jpg";
import photo3 from "../assets/images/assest/MRAD1974-2.jpg";
import { AlertCircle, X, MapPin, Clock, Users, Bell } from 'lucide-react';

import ProgressiveSmearCarousel from "../components/ProgressiveSmearCarousel";

function GridBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#84cc16]">
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
      <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
        <h1 
          className="text-[14vw] font-black tracking-tighter leading-none select-none text-white/40 mix-blend-overlay text-center"
          style={{ 
            fontFamily: 'Impact, Arial Black, sans-serif'
          }}
        >
          FIZZIA WARS
        </h1>
      </div>
    </div>
  );
}

export default function Fizzia() {
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

  return (
    <div className="bg-[#84cc16] min-h-screen w-full relative overflow-x-hidden overflow-y-auto scrollbar-hide font-sans flex flex-col selection:bg-white selection:text-[#84cc16]">
      {/* Grid Background */}
      <GridBackground />

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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Modal background layer */}
            <div className="absolute inset-0" onClick={() => setIsAdExpanded(false)} />
            
            <motion.div 
              layoutId="ad-card-container-fizzia"
              className="relative bg-[#0a0a0a] text-white w-full max-w-[1250px] max-h-[95vh] md:h-[700px] rounded-[2rem] overflow-y-auto scrollbar-hide md:overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white/10"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            >
              <button 
                onClick={() => setIsAdExpanded(false)} 
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/40 backdrop-blur-md flex items-center justify-center rounded-full hover:bg-black/60 border border-white/10 transition-colors text-white"
              >
                <X size={20} />
              </button>

              {/* Pane 1: Details */}
              <div className="w-full lg:w-[320px] bg-[#161616] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/5 shrink-0 md:overflow-y-auto scrollbar-hide relative z-20">
                <div className="flex items-center gap-4 mb-10">
                   <motion.div layoutId="ad-logo-fizzia" className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner shrink-0 p-2">
                       <img src={FizziaIcon} alt="Logo" className="w-full h-full object-contain" />
                   </motion.div>
                   <div>
                     <motion.h2 layoutId="ad-title-fizzia" className="text-2xl font-bold tracking-tight text-white mb-0.5">Fizzia Wars</motion.h2>
                     <p className="text-[#84cc16] text-xs font-bold tracking-wider uppercase">Event Details</p>
                   </div>
                </div>

                <div className="space-y-8">
                  <div>
                     <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Users size={16} className="text-gray-400"/> Suitable For</h3>
                     <p className="text-gray-400 text-sm leading-relaxed mb-3">Perfect for laser tag and battle lovers.</p>
                     <div className="flex flex-wrap gap-2">
                       <span className="text-[11px] px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-gray-300 font-medium">Teens</span>
                       <span className="text-[11px] px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-gray-300 font-medium">Adults</span>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Clock size={16} className="text-gray-400"/> Opening Hours</h3>
                     <ul className="text-sm text-gray-400 space-y-2">
                        <li className="flex justify-between items-center bg-[#1C1C1D] px-3 py-2 rounded-lg border border-white/5"><span>Mon - Thu</span> <span className="text-gray-300 font-semibold">10:00 - 20:00</span></li>
                        <li className="flex justify-between items-center bg-[#1C1C1D] px-3 py-2 rounded-lg border border-white/5"><span>Friday</span> <span className="text-gray-300 font-semibold">10:00 - 22:00</span></li>
                        <li className="flex justify-between items-center bg-[#84cc16]/20 px-3 py-2 rounded-lg border border-[#84cc16]/40 text-[#84cc16]"><span>Sat - Sun</span> <span className="font-bold">09:00 - 23:00</span></li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> Locations</h3>
                     <div className="bg-[#1C1C1D] p-4 rounded-xl border border-white/5">
                        <h4 className="font-bold text-white mb-1">Battle Arena</h4>
                        <p className="text-gray-400 text-xs mb-3">123 Laser Way, Fun City, FC 90210</p>
                        <button className="text-xs font-bold text-[#84cc16] uppercase tracking-wider hover:text-white transition-colors">Get Directions &rarr;</button>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Bell size={16} className="text-gray-400"/> Reminders</h3>
                     <ul className="text-sm text-gray-400 space-y-3">
                        <li className="flex gap-3 items-start"><AlertCircle size={16} className="shrink-0 mt-0.5 text-orange-400"/> Wear dark colors to hide.</li>
                        <li className="flex gap-3 items-start"><AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400"/> No running in the arena.</li>
                     </ul>
                  </div>
                </div>
              </div>

              {/* Pane 3: Tickets */}
              <div className="flex-1 bg-[#0a0a0a] p-6 lg:p-8 md:overflow-y-auto scrollbar-hide relative z-10 flex flex-col">
                 <div className="mb-8 shrink-0">
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Select Tickets</h3>
                    <p className="text-sm text-gray-400">Choose your entry pass.</p>
                 </div>

                 <div className="flex flex-col gap-6 pb-12 overflow-y-auto scrollbar-hide flex-1">
                    {[
                      {
                        title: "Squad Bundle",
                        subtitle: "ENTRY FOR 4 PLAYERS",
                        price: "85",
                        validDate: "10/26 • 4 PAX",
                        primaryColor: "#FFD500",
                        secondaryColor: "#2F7CFF",
                      },
                      {
                        title: "VIP Premium",
                        subtitle: "UNLIMITED AMMO + GEAR",
                        price: "120",
                        validDate: "10/26 • 5 PAX",
                        primaryColor: "#84cc16",
                        secondaryColor: "#FF4500",
                      },
                      {
                        title: "Standard Entry",
                        subtitle: "GENERAL ADMISSION",
                        price: "35",
                        validDate: "10/26 • 1 PAX",
                        primaryColor: "#00E676",
                        secondaryColor: "#AA00FF",
                      }
                    ].map((t, idx) => (
                       <div key={idx} className="w-full shrink-0 flex drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] group cursor-pointer hover:rotate-1 hover:-translate-y-1 transition-all duration-300">
                         {/* Left part */}
                         <div className="flex-1 relative p-6 flex flex-col justify-between overflow-hidden rounded-l-md" style={{ backgroundColor: t.primaryColor }}>
                            <div className="absolute left-[-2px] top-0 bottom-0 w-3 z-10" style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='20' viewBox='0 0 12 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L0 10L12 20Z' fill='%230a0a0a'/%3E%3C/svg%3E")`,
                              backgroundSize: '12px 20px',
                              backgroundPosition: 'left top',
                              backgroundRepeat: 'repeat-y'
                            }}></div>
                            
                            <div className="pl-4 relative z-20 flex flex-col h-full justify-between gap-8">
                               <div>
                                  <h4 className="text-2xl lg:text-3xl font-bold font-display text-[#111] leading-none mb-2 tracking-tight">{t.title}</h4>
                                  <p className="text-[#111]/70 text-[9px] lg:text-[10px] font-bold tracking-wider uppercase max-w-[80%] leading-tight">{t.subtitle}</p>
                               </div>
                               
                               <div>
                                  <div className="text-[#111]/60 text-[10px] tracking-widest uppercase mb-1 font-bold">Total</div>
                                  <div className="text-4xl lg:text-5xl font-bold text-[#111] font-mono tracking-tighter">${t.price}</div>
                               </div>
                            </div>
                         </div>

                         {/* Right part (Stub) */}
                         <div className="w-[100px] lg:w-[130px] relative py-6 px-4 flex flex-col justify-between items-center border-l-[3px] border-dashed border-[#111]/30 rounded-r-md" style={{ backgroundColor: t.secondaryColor }}>
                            <div className="text-[#111] font-bold text-xl lg:text-3xl mt-6 lg:mt-8 font-display text-center leading-none -rotate-90 origin-center absolute top-12 whitespace-nowrap">
                               Admit 1
                            </div>
                            
                            <div className="text-center w-full mt-auto relative z-20">
                               <div className="text-[#111]/80 text-[9px] font-mono tracking-widest uppercase mb-4 font-bold">{t.validDate}</div>
                               <button className="w-full py-2.5 bg-[#111] text-white text-[10px] lg:text-xs font-bold rounded-full hover:bg-black transition-colors shadow-xl">
                                  ADMIT
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
               layoutId="ad-card-container-fizzia" 
               className="bg-[#111111] text-white rounded-[2rem] p-2 pr-6 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-white/10 hover:bg-[#1C1C1D] transition-colors"
               transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
             >
                <motion.div layoutId="ad-logo-fizzia" className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img src={FizziaIcon} alt="Fizzia" className="w-[80%] h-[80%] object-contain" />
                </motion.div>
                
                <div className="flex flex-col justify-center min-w-[140px]">
                    <motion.span layoutId="ad-title-fizzia" className="text-xs font-bold tracking-wide whitespace-nowrap text-white">Event Details</motion.span>
                    <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-0.5">Click for more info</span>
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
