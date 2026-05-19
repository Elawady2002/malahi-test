import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from "../assets/images/assest/logo.png";
import LambyIcon from "../assets/images/assest/lamby.png";
import DossIcon from "../assets/images/assest/doss.png";
import NoosIcon from "../assets/images/assest/1noos.png";
import FizziaIcon from "../assets/images/assest/fizzia.png";

const dropdownLinks = [
  { name: "About Us", path: "/about" },
  { name: "One Entity", path: "/one-entity" },
  { name: "Brand Identity", path: "/brand-identity" },
  { name: "Malahi Studio", path: "/malahi-studio" },
  { name: "International Accreditations", path: "/accreditations" },
  { name: "Partners", path: "/partners" },
  { name: "Branches", path: "/branches" },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDetailPage = ['/lamby', '/doss', '/noos', '/fizzia'].includes(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1800px] z-50 flex items-center justify-between px-6 py-6" style={{ pointerEvents: 'auto' }}>
      <div className="flex items-center flex-1">
        <Link to="/">
          <img
            src={Logo}
            alt="Malahi Logo"
            className="w-[104px] h-[60px] object-contain"
          />
        </Link>
      </div>

      {/* Brand Switcher - Restored */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center pointer-events-none">
        <div className="bg-[#1B1B1B] rounded-full px-5 py-2 flex items-center gap-6 relative pointer-events-auto">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-white -translate-y-1/2 z-0"></div>
          
          <Link to="/lamby" className="relative w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 z-10 transition-transform duration-300 hover:scale-110 bg-[#FFA1B5] flex items-center justify-center mt-[-2px] mb-[-2px]">
            <img src={LambyIcon} alt="Lamby" className="w-[85%] h-[85%] object-contain" />
          </Link>
          <Link to="/doss" className="relative w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 z-10 transition-transform duration-300 hover:scale-110 bg-[#0c1a40] flex items-center justify-center mt-[-2px] mb-[-2px]">
            <img src={DossIcon} alt="Doss" className="w-[80%] h-[80%] object-contain drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" />
          </Link>
          <Link to="/noos" className="relative w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 z-10 transition-transform duration-300 hover:scale-110 bg-[#F28224] flex items-center justify-center mt-[-2px] mb-[-2px]">
            <img src={NoosIcon} alt="1noos" className="w-[90%] h-[90%] object-contain" />
          </Link>
          <Link to="/fizzia" className="relative w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 z-10 transition-transform duration-300 hover:scale-110 bg-[#0B2114] flex items-center justify-center mt-[-2px] mb-[-2px]">
            <img src={FizziaIcon} alt="Fizzia" className="w-[85%] h-[85%] object-contain" />
          </Link>
        </div>
      </div>


      <div className="flex items-center gap-4 flex-1 justify-end">
        {isDetailPage && (
          <Link
            to="/book"
            className="bg-[#1B1B1B] text-white text-[13px] font-medium tracking-wide rounded-[24px] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center shrink-0 whitespace-nowrap px-6"
            style={{ height: '48px', width: 'fit-content' }}
          >
            BOOK A TICKET
          </Link>
        )}
        {isDetailPage && (
          <Link
            to="/"
            className="bg-white text-[#1B1B1B] text-[13px] font-medium tracking-wide rounded-[24px] hover:bg-gray-200 transition-colors flex items-center justify-center shrink-0 whitespace-nowrap px-6"
            style={{ height: '48px', width: 'fit-content' }}
          >
            BACK CLOSE ➔
          </Link>
        )}
        {!isDetailPage && isHome && (
          <Link
            to="/book"
            className="bg-[#1B1B1B] text-white text-[13px] font-medium tracking-wide rounded-[24px] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center shrink-0 whitespace-nowrap px-6"
            style={{ height: '48px', width: 'fit-content' }}
          >
            BOOK A TICKET
          </Link>
        )}
        {!isDetailPage && !isHome && (
          <Link
            to="/"
            className="border border-white/30 bg-[#0c0c0c] md:bg-transparent rounded-full px-[22px] h-[48px] text-xs font-medium tracking-wide text-[#ebebeb] hover:bg-white hover:text-black transition-colors flex items-center justify-center shrink-0 whitespace-nowrap"
            style={{ width: 'fit-content' }}
          >
            Home
          </Link>
        )}
        {!isDetailPage && (
          <div className="relative" onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`border border-white/30 ${isHome ? 'bg-transparent' : 'bg-[#0c0c0c]'} md:bg-transparent rounded-full w-[48px] h-[48px] flex items-center justify-center text-[#ebebeb] hover:bg-white hover:text-black transition-colors shrink-0`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-[56px] w-[280px] bg-[#111111] rounded-[24px] shadow-2xl overflow-hidden py-4 z-50 border border-white/10"
                >
                  <div className="flex items-center justify-between px-6 pb-4 mb-2 border-b border-white/10">
                    <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Menu</span>
                  </div>
                  <div className="flex flex-col">
                    {dropdownLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.path}
                        className="px-6 py-3 text-[17px] text-white/70 hover:text-white hover:bg-white/5 transition-all font-medium flex items-center group relative overflow-hidden"
                      >
                        <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300 relative z-10 flex items-center justify-between w-full">
                          <span>{link.name}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] text-white/50">●</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </nav>
  );
}
