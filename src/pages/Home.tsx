import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterBgImage from "../assets/images/assest/footers bg.png";

import HeroSlider from "../components/HeroSlider";

export default function Home() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const transitionRef = useRef(false);
  const cooldownRef = useRef(false);
  const footerScrollRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const slides = language === 'ar' ? [
    {
      type: "image" as const,
      src: "/hero_bg.png",
      content: "hero",
    },
    {
      type: "video" as const,
      src: "/videos/2.mp4",
      content: "section",
      data: {
        topText: (
          <>
            <span className="text-white block mt-[-5px]">أهلاً</span>
            <span className="text-[#FF4A8D] block mt-[-5px]">بالمستكشف</span>
          </>
        ),
        bottomText: "الصغير",
        bottomColor: "text-[#FF4A8D]",
        desc: "عالم ناعم وآمن حيث يمكن لطفلك اللعب والتعلم والنمو بكل فرح وسعادة.",
        link: "/lamby",
      }
    },
    {
      type: "video" as const,
      src: "/videos/3.mp4",
      content: "section",
      data: {
        topText: (
          <>
            <span className="text-white">تسيّد </span>
            <span className="text-[#E60000]">مضمار</span>
          </>
        ),
        bottomText: "السباق",
        bottomColor: "text-[#E60000]",
        desc: "تجربة كارتينج داخلية عالية السرعة مصممة لعشاق الحماس والإثارة والأدرينالين.",
        link: "/doss",
      }
    },
    {
      type: "video" as const,
      src: "/videos/4.mp4",
      content: "section",
      data: {
        topText: (
          <>
            <span className="text-white block mt-[-5px]">كل</span>
            <span className="text-[#FF6A00] block mt-[-5px]">لعبة</span>
          </>
        ),
        bottomText: "فوز جديد",
        bottomColor: "text-[#FF6A00]",
        desc: "ألعاب مهارية وتحديات حركية تفاعلية تعيد تعريف المتعة العائلية بطابع سعودي فخور.",
        link: "/noos",
      }
    },
    {
      type: "video" as const,
      src: "/videos/5.mp4",
      content: "section",
      data: {
        topText: (
          <>
            <span className="text-white normal-case">فيزيا </span>
            <span className="text-[#84cc16] normal-case">تقود</span>
          </>
        ),
        bottomText: "التحدي!",
        bottomColor: "text-[#84cc16]",
        desc: "منصات قفز وجدران تسلق تمنحك طاقة وحيوية بلا حدود وتتحدى الجاذبية للياقة بدنية أفضل.",
        link: "/fizzia",
      }
    },
    {
      type: "image" as const,
      src: FooterBgImage,
      content: "footer",
    }
  ] : [
    {
      type: "image" as const,
      src: "/hero_bg.png",
      content: "hero",
    },
    {
      type: "video" as const,
      src: "/videos/2.mp4",
      content: "section",
      data: {
        topText: (
          <>
            <span className="text-white block mt-[-5px]">HELLO</span>
            <span className="text-[#FF4A8D] block mt-[-5px]">LITTLE</span>
          </>
        ),
        bottomText: "EXPLORER",
        bottomColor: "text-[#FF4A8D]",
        desc: "A SOFT, SAFE WORLD WHERE YOUR CHILD CAN PLAY, LEARN, AND GROW WITH JOY.",
        link: "/lamby",
      }
    },
    {
      type: "video" as const,
      src: "/videos/3.mp4",
      content: "section",
      data: {
        topText: (
          <>
            <span className="text-white">OWN </span>
            <span className="text-[#E60000]">THE</span>
          </>
        ),
        bottomText: "TRACK",
        bottomColor: "text-[#E60000]",
        desc: "HIGH-SPEED INDOOR KARTING EXPERIENCE BUILT FOR ADRENALINE LOVERS.",
        link: "/doss",
      }
    },
    {
      type: "video" as const,
      src: "/videos/4.mp4",
      content: "section",
      data: {
        topText: (
          <>
            <span className="text-white block mt-[-5px]">EVERY</span>
            <span className="text-[#FF6A00] block mt-[-5px]">GAME</span>
          </>
        ),
        bottomText: "IS A WIN",
        bottomColor: "text-[#FF6A00]",
        desc: "ACTION-PACKED ADVENTURES, CLIMBING AND JUMPING WTH A PROUD SAUDI SPIRIT.",
        link: "/noos",
      }
    },
    {
      type: "video" as const,
      src: "/videos/5.mp4",
      content: "section",
      data: {
        topText: (
          <>
            <span className="text-white normal-case">Fizzia </span>
            <span className="text-[#84cc16] normal-case">Leads</span>
          </>
        ),
        bottomText: "THE GAME!",
        bottomColor: "text-[#84cc16]",
        desc: "GRAVITY-DEFYING JUMPS AND CLIMBS DESIGNED TO BOOST FITNESS AND FAMILY FUN.",
        link: "/fizzia",
      }
    },
    {
      type: "image" as const,
      src: FooterBgImage,
      content: "footer",
    }
  ];

  const nextSlide = useCallback(() => {
    if (transitionRef.current) return;
    transitionRef.current = true;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (transitionRef.current) return;
    transitionRef.current = true;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleTransitionEnd = useCallback(() => {
    transitionRef.current = false;
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 500);
  }, []);

  const items = React.useMemo(() => slides.map((s, i) => {
    const isFooter = s.content === "footer";
    const src = isFooter ? slides[i - 1].src : s.src;
    const type = isFooter ? slides[i - 1].type : s.type;
    return { id: i, type, src };
  }), [slides]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      wheelTimeoutRef.current = setTimeout(() => {
        hasTriggeredRef.current = false;
      }, 200);

      if (transitionRef.current || cooldownRef.current || hasTriggeredRef.current) return;

      if (currentIndex === slides.length - 1 && footerScrollRef.current) {
        const el = footerScrollRef.current;
        const isAtTop = el.scrollTop <= 2;

        if (e.deltaY > 0) {
          return;
        } else if (e.deltaY < 0) {
          if (isAtTop && Math.abs(e.deltaY) > 35) {
            hasTriggeredRef.current = true;
            prevSlide();
          }
          return;
        }
      }
      
      if (Math.abs(e.deltaY) > 35) {
        hasTriggeredRef.current = true;
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };
    
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [nextSlide, prevSlide, currentIndex, slides.length]);

  useEffect(() => {
    if (currentIndex === slides.length - 1 && footerScrollRef.current) {
      footerScrollRef.current.scrollTop = 0;
    }
  }, [currentIndex, slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="bg-[#0c0c0c] h-screen w-full overflow-hidden text-[#ebebeb] font-sans relative select-none">
      <div 
        id="global-webgl-background" 
        className="fixed inset-0 w-full h-full z-0"
        style={{ visibility: currentIndex === slides.length - 1 ? "hidden" : "visible" }}
      >
        <HeroSlider 
          currentIndex={currentIndex} 
          items={items}
          paused={currentIndex === slides.length - 1}
          onTransitionEnd={handleTransitionEnd}
        />
        <div id="bg-overlay" className="absolute inset-0 bg-[#0c0c0c]/40 z-10" />
      </div>
      
      <Navbar />

      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 w-full h-full pointer-events-none"
        >
          {currentSlide.content === "hero" && (
            <div className="flex flex-col items-center justify-center h-full pt-24 pb-12">
              <div className="absolute bottom-[7%] flex flex-col items-center w-full justify-center pointer-events-auto">
                <div className="flex flex-col items-center mb-6">
                  <span className="text-sm md:text-base font-medium tracking-wide">
                    {language === 'ar' ? '#ارسم_السعادة' : '#Draw happiness'}
                  </span>
                  <svg viewBox="0 0 48 14" fill="none" className="mt-2 w-20 h-auto">
                    <path d="M2 2C12 11 36 11 46 2" stroke="#00B27B" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter text-center leading-[1.05] uppercase">
                  {language === 'ar' ? (
                    <>
                      أهلاً بك في <br />
                      م<span className="text-[#00B27B]">لا</span>هي
                    </>
                  ) : (
                    <>
                      WELCOME TO <br />
                      M<span className="text-[#00B27B]">ALA</span>HI
                    </>
                  )}
                </h1>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="mt-10 bg-white text-black rounded-full px-6 py-3 flex items-center gap-3 text-sm font-bold hover:bg-gray-200 transition-colors pointer-events-auto cursor-pointer"
                >
                  <span>{language === 'ar' ? 'اسحب للأسفل' : 'Scroll down'}</span>
                  <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                    <rect x="1" y="1" width="12" height="20" rx="6" stroke="black" strokeWidth="1.5"/>
                    <circle cx="7" cy="6" r="1.5" fill="black"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {currentSlide.content === "section" && currentSlide.data && (
            <div className="w-full h-full flex flex-col justify-between p-12 md:p-24">
               <motion.div 
                className="pt-20"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-6xl md:text-8xl lg:text-[120px] font-bold leading-none tracking-tighter drop-shadow-xl">
                  {currentSlide.data.topText}
                </h2>
              </motion.div>

              <motion.div 
                className={`self-end flex flex-col items-start max-w-2xl md:-mr-24 ${language === 'ar' ? 'text-right items-end md:pl-[150px] md:pr-0' : 'text-left md:pr-[150px] md:pl-0'}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className={`text-6xl md:text-[100px] lg:text-[120px] font-bold leading-[1.1] tracking-tighter mb-4 ${currentSlide.data.bottomColor} drop-shadow-xl`}>
                  {currentSlide.data.bottomText}
                </h2>
                <p className="text-white font-medium text-sm md:text-base max-w-lg mb-8 drop-shadow-md uppercase tracking-wide">
                  {currentSlide.data.desc}
                </p>
                <Link to={currentSlide.data.link} className="bg-[#1B1B1B] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#2a2a2a] transition-colors flex items-center justify-center pointer-events-auto" style={{ width: '143px', height: '48px' }}>
                  {language === 'ar' ? 'تفاصيل أكثر' : 'MORE DETAILS'}
                </Link>
              </motion.div>
            </div>
          )}

          {currentSlide.content === "footer" && (
            <div 
              ref={footerScrollRef}
              className="flex flex-col h-full bg-[#0c0c0c] pt-24 pb-0 pointer-events-auto overflow-y-auto scrollbar-hide"
              style={{ overscrollBehavior: "none", willChange: "transform" }}
            >
                <Footer />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30 pointer-events-auto">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (transitionRef.current) return;
              transitionRef.current = true;
              setCurrentIndex(idx);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "bg-white scale-125" : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
