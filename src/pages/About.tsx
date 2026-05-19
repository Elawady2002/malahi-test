import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Image1 from "../assets/images/assest/282A3269.jpg";
import Image2 from "../assets/images/assest/DSC_6786.jpg";
import Image3 from "../assets/images/assest/MRAD1974-2.jpg";

const processSteps = [
  {
    title: "Strategic Positioning",
    image: Image2,
  },
  {
    title: "Prime Spot",
    image: Image1,
  },
  {
    title: "Connected Experience",
    image: Image3,
  },
  {
    title: "Broad Appeal",
    image: Image1,
  },
  {
    title: "Repeat Visits",
    image: Image2,
  },
];

export default function About() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="bg-[#0c0c0c] min-h-screen text-[#ebebeb] font-sans w-full overflow-x-hidden flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 w-full min-h-[80vh] flex flex-col items-center justify-center -mt-20 overflow-hidden">
        {/* Mobile Gallery (above header text) */}
        <div className="md:hidden flex flex-row flex-wrap items-center justify-center gap-6 mb-16 z-20 w-full px-4">
            <div className="w-24 h-32 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(-8deg)" }}>
                <motion.img style={{ y: y1 }} src={Image1} alt="Gallery" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="w-32 h-40 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(6deg)", marginTop: "20px" }}>
                <motion.img style={{ y: y2 }} src={Image2} alt="Gallery" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="w-28 h-28 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(-4deg)" }}>
                <motion.img style={{ y: y3 }} src={Image3} alt="Gallery" className="w-full h-full object-cover grayscale" />
            </div>
        </div>

        {/* Huge Text */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative text-[22vw] md:text-[15vw] leading-[0.8] font-display font-bold tracking-tighter text-center z-40 pointer-events-none mt-16 drop-shadow-2xl text-white"
        >
          about us
        </motion.h1>

        {/* Floating Images Gallery (creative random layout) */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-visible hidden md:flex items-center justify-center max-w-[1400px] mx-auto opacity-100 transition-opacity duration-700">
            {/* Left side cluster */}
            <div className="absolute top-[15%] left-[5%] w-24 h-32 md:w-40 md:h-56 overflow-hidden opacity-90 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(-12deg)" }}>
                <motion.img style={{ y: y1 }} src={Image1} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="absolute top-[45%] left-[12%] w-32 h-40 md:w-56 md:h-72 overflow-hidden opacity-100 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(8deg)" }}>
                <motion.img style={{ y: y2 }} src={Image2} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="absolute top-[75%] left-[8%] w-28 h-28 md:w-48 md:h-48 overflow-hidden opacity-80 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(-5deg)" }}>
                <motion.img style={{ y: y3 }} src={Image3} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="absolute top-[25%] left-[28%] w-20 h-28 md:w-36 md:h-48 hidden lg:block overflow-hidden opacity-70 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(15deg)" }}>
                <motion.img style={{ y: y1 }} src={Image1} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
            
            {/* Right side cluster */}
            <div className="absolute top-[20%] right-[8%] w-28 h-36 md:w-48 md:h-64 overflow-hidden opacity-85 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(10deg)" }}>
                <motion.img style={{ y: y2 }} src={Image2} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="absolute top-[50%] right-[15%] w-36 h-48 md:w-64 md:h-80 overflow-hidden opacity-100 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(-6deg)" }}>
                <motion.img style={{ y: y3 }} src={Image3} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="absolute top-[80%] right-[10%] w-24 h-24 md:w-40 md:h-40 overflow-hidden opacity-75 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(12deg)" }}>
                <motion.img style={{ y: y1 }} src={Image1} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="absolute top-[25%] right-[30%] w-20 h-24 md:w-32 md:h-40 hidden lg:block overflow-hidden opacity-65 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(-15deg)" }}>
                <motion.img style={{ y: y2 }} src={Image2} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
            
            {/* Center-ish top/bottom offset */}
            <div className="absolute top-[8%] left-[45%] w-16 h-20 md:w-28 md:h-36 overflow-hidden opacity-50 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(-8deg)" }}>
                <motion.img style={{ y: y3 }} src={Image3} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="absolute bottom-[5%] left-[48%] w-20 h-20 md:w-36 md:h-36 overflow-hidden opacity-60 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg border border-white/10" style={{ transform: "rotate(5deg)" }}>
                <motion.img style={{ y: y1 }} src={Image1} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
            </div>
        </div>

        <div className="mt-24 mb-12 flex flex-col items-center gap-2 z-20">
          <div className="w-6 h-6 border border-white/20 rounded-md flex items-center justify-center text-xs">
            +
          </div>
          <p className="text-xs uppercase tracking-widest text-white/60 text-center">
            Based in Saudi Arabia,
            <br />
            operating nationwide
          </p>
        </div>
      </section>

      {/* Introduction Paragraph */}
      <section className="w-full px-6 py-32 text-center z-10 relative overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 pointer-events-none"
        >
          <source src="/videos/malahi.mp4" type="video/mp4" />
        </video>
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-[2px] rounded-[2rem] overflow-hidden opacity-100 transition-opacity duration-500">
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#fbbc05_360deg)] animate-[spin_4s_linear_infinite]"></div>
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_120deg,transparent_0_340deg,#e21b4d_360deg)] animate-[spin_4s_linear_infinite]"></div>
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_240deg,transparent_0_340deg,#22c55e_360deg)] animate-[spin_4s_linear_infinite]"></div>
          </div>
          <div className="relative z-10 bg-[#0f0f0f] backdrop-blur-lg p-8 md:p-12 rounded-[2rem] border border-transparent shadow-[0_0_80px_rgba(0,0,0,1)]">
            <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight leading-tight mb-8">
              we are the kingdom's largest entertainment operator, creating
              must-visit destinations and vibrant hubs.
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-left text-white/80 max-w-2xl mx-auto leading-relaxed">
              <p>
                Proudly leading the entertainment scene, Malahi has established
                itself as the largest operator during Riyadh Season and in
                Boulevard City. With extensive experience, we have successfully
                brought unforgettable experiences to millions of visitors.
              </p>
              <p>
                Our commitment to delivering top-tier entertainment makes us a
                key player in shaping the region's entertainment landscape. We
                do more than just supply games—we takeover venues, design
                spatial experiences, and operate highly profitable leisure
                zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-32 px-6 relative overflow-hidden bg-[#0c0c0c] border-t border-white/5 pt-40">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 pointer-events-none"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
        </video>
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 relative z-10">
          {/* Left Side: Text List */}
          <div className="flex flex-col gap-12 md:gap-4 w-full md:w-1/2">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col gap-6" onMouseEnter={() => setActiveStepIndex(idx)}>
                <div
                  className={`cursor-pointer transition-colors duration-500 font-sans font-bold text-4xl sm:text-5xl md:text-[80px] tracking-tight whitespace-nowrap
                    ${activeStepIndex === idx ? "text-white" : "text-white/30 md:hover:text-white/60"}`}
                  style={{ lineHeight: "1.1" }}
                >
                  {step.title}
                </div>
                {/* Mobile Image (shown only on small screens beneath each item) */}
                <div className="md:hidden w-full aspect-square sm:aspect-[4/5] overflow-hidden bg-white/5 rounded-2xl relative shadow-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-all duration-700"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Image Display (Desktop only) */}
          <div className="hidden md:flex w-1/2 justify-end">
            <div className="w-full max-w-lg aspect-[4/5] relative overflow-hidden bg-white/5 right-0 block shadow-2xl rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStepIndex}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  src={processSteps[activeStepIndex].image}
                  alt={processSteps[activeStepIndex].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="w-full px-6 py-32 bg-[#0c0c0c] relative z-10 pt-40 pb-40 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16 relative z-10">
          <div className="w-full md:w-1/3 flex flex-col gap-16">
            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">Contact us</h2>
            <div className="space-y-8 text-white/90 text-sm">
              <p>salrashid@malahi.com</p>
              <p>(054) 777-9930</p>
              <div className="pt-2 text-xs">
                <p className="uppercase tracking-wider font-bold mb-1">SAAD AL RASHID</p>
                <p className="text-white/60">Representative</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 pt-6">
            <form className="flex flex-col gap-10">
              {/* Name */}
              <div className="flex flex-col gap-4">
                <label className="text-xs font-bold text-white uppercase tracking-widest">Name (required)</label>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2 flex flex-col gap-2">
                      <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-white transition-colors px-0 rounded-none mix-blend-screen" />
                      <span className="text-[10px] text-white/50">First Name</span>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col gap-2">
                      <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-white transition-colors px-0 rounded-none mix-blend-screen" />
                      <span className="text-[10px] text-white/50">Last Name</span>
                  </div>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex flex-col gap-4">
                <label className="text-xs font-bold text-white uppercase tracking-widest">Email (required)</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-white transition-colors px-0 rounded-none mix-blend-screen" />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-4">
                <label className="text-xs font-bold text-white uppercase tracking-widest">Message (required)</label>
                <textarea rows={3} className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-white transition-colors resize-none px-0 rounded-none mix-blend-screen"></textarea>
              </div>

              <button type="button" className="bg-white/90 text-black font-semibold text-xs tracking-wider uppercase rounded-full px-10 py-4 w-fit mt-4 hover:bg-white transition-colors active:scale-95 duration-200">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

