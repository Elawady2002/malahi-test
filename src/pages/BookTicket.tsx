import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { CreditCard, ChevronRight, Check } from "lucide-react";

import LambyIcon from "../assets/images/assest/lamby.png";
import DossIcon from "../assets/images/assest/doss.png";
import NoosIcon from "../assets/images/assest/1noos.png";
import FizziaIcon from "../assets/images/assest/fizzia.png";

interface BrandOption {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  bgColor: string;
  themeColor: string;
  branchesEn: string[];
  branchesAr: string[];
}

const brands: BrandOption[] = [
  { id: "lamby", name: "Lambee", nameAr: "لمبي", icon: LambyIcon, bgColor: "#FFA1B5", themeColor: "#FF4A8D", branchesEn: ["Cenomi Nakheel Mall Riyadh", "Mall of Dhahran"], branchesAr: ["النخيل مول الرياض", "مجمع الظهران"] },
  { id: "doss", name: "Doos Karting", nameAr: "دوز كارتينج", icon: DossIcon, bgColor: "#0c1a40", themeColor: "#E60000", branchesEn: ["Boulevard City Riyadh", "Cenomi Mall of Arabia Jeddah"], branchesAr: ["بوليفارد سيتي الرياض", "مول العرب جدة"] },
  { id: "noos", name: "1noos", nameAr: "ونوس", icon: NoosIcon, bgColor: "#F28224", themeColor: "#FF6A00", branchesEn: ["Boulevard City Riyadh", "Mall of Dhahran"], branchesAr: ["بوليفارد سيتي الرياض", "مجمع الظهران"] },
  { id: "fizzia", name: "Fizzia", nameAr: "فيزيا", icon: FizziaIcon, bgColor: "#0B2114", themeColor: "#84cc16", branchesEn: ["Cenomi Nakheel Mall Riyadh", "Cenomi Mall of Arabia Jeddah"], branchesAr: ["النخيل مول الرياض", "مول العرب جدة"] },
];

export default function BookTicket() {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<BrandOption>(brands[0]);
  const [selectedBranchIdx, setSelectedBranchIdx] = useState<number>(-1);
  const [ticketDate, setTicketDate] = useState("");
  const [ticketCounts, setTicketCounts] = useState({ standard: 1, vip: 0, family: 0 });
  const [isSuccess, setIsSuccess] = useState(false);

  // Price models
  const prices = { standard: 35, vip: 85, family: 120 };

  const totalAmount = 
    ticketCounts.standard * prices.standard + 
    ticketCounts.vip * prices.vip + 
    ticketCounts.family * prices.family;

  const t = {
    ar: {
      title1: "احجز تذكرتك",
      title2: "خطط ليومك المليء بالفرح والمغامرة",
      subtitle: "دفع إلكتروني آمن عبر ميسر / آبل باي",
      alertBranch: "الرجاء اختيار الفرع أولاً",
      alertDate: "الرجاء اختيار التاريخ أولاً",
      alertTicket: "الرجاء اختيار تذكرة واحدة على الأقل",
      step1: "1. العلامة والموقع",
      step2: "2. اختر التذاكر",
      step3: "3. الدفع السريع",
      labelBrand: "1. اختر العلامة التجارية",
      labelBranch: "2. اختر الفرع",
      chooseBranch: "اختر الفرع...",
      labelDate: "3. اختر التاريخ",
      labelCategories: "اختر فئات التذاكر",
      categories: [
        { key: "standard" as const, name: "الدخول العام", desc: "دخول الألعاب والأنشطة الترفيهية القياسية" },
        { key: "vip" as const, name: "المسار السريع VIP", desc: "دخول ذو أولوية وقسيمة هدايا مخصصة" },
        { key: "family" as const, name: "الباقة العائلية", desc: "دخول عام لعدد يصل إلى 5 أفراد من العائلة" },
      ],
      labelPayment: "إتمام الدفع الآمن عبر ميسر",
      cardType: "بطاقة مدى / بطاقة ائتمانية",
      cardNumber: "رقم البطاقة",
      expiration: "تاريخ الانتهاء",
      cvv: "الرمز السري",
      payApple: "الدفع باستخدام Apple Pay",
      back: "السابق",
      next: "الخطوة التالية",
      complete: "إتمام الحجز",
      summaryTitle: "تفاصيل الحجز",
      summaryBrand: "العلامة المختارة",
      summaryBranch: "الفرع",
      summaryDate: "التاريخ",
      noTickets: "لم يتم اختيار تذاكر بعد",
      total: "الإجمالي",
      ticketNames: {
        standard: "دخول عام",
        vip: "مسار سريع VIP",
        family: "باقة عائلية"
      },
      successTitle: "تم تأكيد حجزك بنجاح!",
      successDesc: "تم إرسال نسخة من تذاكرك الرقمية ورموز الاستجابة السريعة (QR) إلى بريدك الإلكتروني. نتطلع لرسم السعادة معك!",
      successBtn: "حجز تذكرة أخرى",
      successBrand: "العلامة",
      successBranch: "الفرع",
      successDate: "التاريخ",
      successPaid: "المبلغ المدفوع"
    },
    en: {
      title1: "Book a Ticket",
      title2: "Plan your day filled with joy and adventure",
      subtitle: "Secure checkout via Moyasar / Apple Pay",
      alertBranch: "Please select a branch first",
      alertDate: "Please select a date first",
      alertTicket: "Please select at least 1 ticket",
      step1: "1. Brand & Location",
      step2: "2. Select Tickets",
      step3: "3. Fast Checkout",
      labelBrand: "1. Select Brand",
      labelBranch: "2. Select Branch",
      chooseBranch: "Choose a branch...",
      labelDate: "3. Select Date",
      labelCategories: "Select Ticket Categories",
      categories: [
        { key: "standard" as const, name: "General Admission", desc: "Access to standard rides & attractions" },
        { key: "vip" as const, name: "VIP Fast Pass", desc: "Priority entry & custom gift voucher" },
        { key: "family" as const, name: "Family Bundle", desc: "General entry for up to 5 family members" },
      ],
      labelPayment: "Moyasar Payment Integration",
      cardType: "Debit/Credit Card",
      cardNumber: "Card Number",
      expiration: "Expiration",
      cvv: "CVV",
      payApple: "Pay with Apple Pay",
      back: "Back",
      next: "Next Step",
      complete: "Complete Booking",
      summaryTitle: "Booking Summary",
      summaryBrand: "Selected Brand",
      summaryBranch: "Branch",
      summaryDate: "Date",
      noTickets: "No tickets selected yet",
      total: "Total",
      ticketNames: {
        standard: "General Admission",
        vip: "VIP Fast Pass",
        family: "Family Bundle"
      },
      successTitle: "Booking Confirmed!",
      successDesc: "A copy of your digital tickets and QR codes has been sent to your email. We look forward to drawing happiness with you!",
      successBtn: "Book Another Ticket",
      successBrand: "Brand",
      successBranch: "Branch",
      successDate: "Date",
      successPaid: "Amount Paid"
    }
  }[language];

  const handleNextStep = () => {
    if (step === 1 && selectedBranchIdx === -1) {
      alert(t.alertBranch);
      return;
    }
    if (step === 1 && !ticketDate) {
      alert(t.alertDate);
      return;
    }
    if (step === 2 && totalAmount === 0) {
      alert(t.alertTicket);
      return;
    }
    setStep(step + 1);
  };

  const handleBook = () => {
    setIsSuccess(true);
  };

  const branchName = selectedBranchIdx !== -1 
    ? (language === 'ar' ? selectedBrand.branchesAr[selectedBranchIdx] : selectedBrand.branchesEn[selectedBranchIdx])
    : "";

  return (
    <div className="bg-[#0c0c0c] min-h-screen text-[#ebebeb] font-sans w-full overflow-x-hidden flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-12 px-6 w-full flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Dynamic Glow background linked to selected brand */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-0 opacity-10 transition-colors duration-700" 
          style={{ backgroundColor: selectedBrand.themeColor }}
        />
        
        <div className="max-w-4xl mx-auto z-10 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none uppercase font-sans"
          >
            {t.title1} <br />
            <span className="text-neutral-500 text-xl font-medium block mt-2 font-sans">{t.title2}</span>
          </motion.h1>
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold font-sans">{t.subtitle}</p>
        </div>
      </section>

      {/* Booking Form Layout */}
      <section className="py-10 px-6 max-w-5xl mx-auto w-full z-10 flex-1 flex flex-col items-center justify-center">
        {isSuccess ? (
          /* SUCCESS SCREEN */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-[#111] border border-white/10 rounded-[2.5rem] p-12 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Glowing borders */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: selectedBrand.themeColor }} />
            
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Check size={40} strokeWidth={3} />
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3 font-sans">{t.successTitle}</h2>
            
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4 text-start mb-8">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-white/40 uppercase font-bold">{t.successBrand}</span>
                <span className="text-white font-bold" style={{ color: selectedBrand.themeColor }}>
                  {language === 'ar' ? selectedBrand.nameAr : selectedBrand.name}
                </span>
              </div>
              <div className="flex justify-between items-start text-xs gap-4 font-sans">
                <span className="text-white/40 uppercase font-bold">{t.successBranch}</span>
                <span className="text-white font-semibold text-right">{branchName}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-white/40 uppercase font-bold">{t.successDate}</span>
                <span className="text-white font-mono">{ticketDate}</span>
              </div>
              <div className="h-[1px] bg-white/10 w-full" />
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-white/40 uppercase font-bold">{t.successPaid}</span>
                <span className="text-base font-extrabold text-white font-mono">${totalAmount}</span>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed mb-6 font-sans">
              {t.successDesc}
            </p>
            
            <button 
              onClick={() => { setStep(1); setSelectedBranchIdx(-1); setTicketDate(""); setTicketCounts({ standard: 1, vip: 0, family: 0 }); setIsSuccess(false); }}
              className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors shadow-xl cursor-pointer font-sans"
            >
              {t.successBtn}
            </button>
          </motion.div>
        ) : (
          /* MULTI STEP FORM */
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Step Wizard Container (left 7 cols) */}
            <div className="lg:col-span-8 bg-[#111]/80 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl space-y-10">
              {/* Step indicator header */}
              <div className="flex items-center gap-6 border-b border-white/5 pb-6">
                {[
                  { label: t.step1, active: step >= 1 },
                  { label: t.step2, active: step >= 2 },
                  { label: t.step3, active: step >= 3 },
                ].map((s, idx) => (
                  <span 
                    key={idx}
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 font-sans
                      ${s.active ? "text-white" : "text-white/20"}`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>

              {/* STEP 1: BRAND AND LOCATION */}
              {step === 1 && (
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="space-y-8 text-start"
                >
                  {/* Select Brand Grid */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-white uppercase tracking-widest block font-sans">{t.labelBrand}</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {brands.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => { setSelectedBrand(b); setSelectedBranchIdx(-1); }}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 relative cursor-pointer font-sans
                            ${selectedBrand.id === b.id 
                              ? "bg-white text-black border-white scale-105 shadow-xl" 
                              : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"}`}
                        >
                          <div 
                            style={{ backgroundColor: selectedBrand.id === b.id ? "transparent" : b.bgColor }}
                            className="w-12 h-12 rounded-full flex items-center justify-center p-1 border border-white/10"
                          >
                            <img src={b.icon} alt={b.name} className="w-[85%] h-[85%] object-contain" />
                          </div>
                          <span className="text-xs font-bold tracking-wide uppercase">{language === 'ar' ? b.nameAr : b.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Branch Dropdown */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-white uppercase tracking-widest block font-sans">{t.labelBranch}</label>
                    <div className="relative">
                      <select
                        value={selectedBranchIdx}
                        onChange={(e) => setSelectedBranchIdx(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-white transition-colors cursor-pointer font-sans"
                      >
                        <option value={-1} disabled className="bg-[#111] text-white">{t.chooseBranch}</option>
                        {(language === 'ar' ? selectedBrand.branchesAr : selectedBrand.branchesEn).map((br, index) => (
                          <option key={index} value={index} className="bg-[#111] text-white">{br}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Select Date */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-white uppercase tracking-widest block font-sans">{t.labelDate}</label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={ticketDate}
                        onChange={(e) => setTicketDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-white transition-colors font-mono cursor-pointer"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: SELECT TICKETS */}
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8 text-start"
                >
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-white uppercase tracking-widest block font-sans">{t.labelCategories}</label>
                    
                    {/* Ticket options list */}
                    {t.categories.map((tick) => (
                      <div 
                        key={tick.key}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-6 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="text-start">
                          <h4 className="text-base font-bold text-white tracking-tight font-sans">{tick.name}</h4>
                          <p className="text-xs text-white/50 mt-1 font-sans">{tick.desc}</p>
                          <span className="text-sm font-extrabold text-white font-mono block mt-2">${prices[tick.key]}</span>
                        </div>

                        {/* Count Controls */}
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setTicketCounts({
                              ...ticketCounts,
                              [tick.key]: Math.max(0, ticketCounts[tick.key] - 1)
                            })}
                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-sm font-extrabold text-white font-mono w-4 text-center">{ticketCounts[tick.key]}</span>
                          <button
                            onClick={() => setTicketCounts({
                              ...ticketCounts,
                              [tick.key]: ticketCounts[tick.key] + 1
                            })}
                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CHECKOUT */}
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8 text-start"
                >
                  <div className="space-y-6">
                    <label className="text-xs font-bold text-white uppercase tracking-widest block font-sans">{t.labelPayment}</label>
                    
                    {/* Mock credit card form */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-[#141414] to-[#1e1e1e] space-y-4 relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                        <CreditCard className="w-24 h-24 text-white" />
                      </div>

                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider font-sans">{t.cardType}</span>
                        <div className="h-6 w-9 bg-white/10 rounded-md border border-white/20" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase tracking-wider font-bold text-white/50 font-sans">{t.cardNumber}</label>
                        <input 
                          type="text"
                          placeholder="•••• •••• •••• ••••"
                          maxLength={19}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white outline-none focus:border-white font-mono tracking-widest"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] uppercase tracking-wider font-bold text-white/50 font-sans">{t.expiration}</label>
                          <input 
                            type="text"
                            placeholder="MM / YY"
                            maxLength={5}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white outline-none focus:border-white font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] uppercase tracking-wider font-bold text-white/50 font-sans">{t.cvv}</label>
                          <input 
                            type="text"
                            placeholder="•••"
                            maxLength={3}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white outline-none focus:border-white font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/10 my-4" />

                    {/* Apple Pay Button Mock */}
                    <button 
                      onClick={handleBook}
                      className="w-full py-4 bg-white text-black hover:bg-gray-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      <CreditCard size={16} />
                      <span>{t.payApple}</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Navigation wizard controls */}
              <div className="flex items-center justify-between border-t border-white/5 pt-8">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:bg-white/5 transition-colors cursor-pointer font-sans"
                  >
                    &larr; {t.back}
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-xl cursor-pointer font-sans"
                  >
                    <span>{t.next}</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleBook}
                    className="px-8 py-3.5 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xl hover:opacity-95 cursor-pointer font-sans"
                    style={{ backgroundColor: selectedBrand.themeColor }}
                  >
                    <span>{t.complete}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Cart summary preview (right 4 cols) */}
            <div className="lg:col-span-4 bg-[#111]/80 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 shadow-2xl space-y-6 text-left relative overflow-hidden">
              {/* Dynamic light glowing top strip */}
              <div className="absolute top-0 left-0 right-0 h-[4px] transition-colors duration-700" style={{ backgroundColor: selectedBrand.themeColor }} />
              
              <h3 className="text-lg font-bold text-white tracking-tight uppercase font-sans">{t.summaryTitle}</h3>
              
              <div className="space-y-4 border-b border-white/5 pb-6">
                {/* Brand row */}
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="text-white/40 uppercase font-bold">{t.summaryBrand}</span>
                  <div className="flex items-center gap-2">
                    <div 
                      style={{ backgroundColor: selectedBrand.bgColor }}
                      className="w-6 h-6 rounded-full flex items-center justify-center p-0.5 border border-white/10"
                    >
                      <img src={selectedBrand.icon} alt={selectedBrand.name} className="w-[80%] h-[80%] object-contain" />
                    </div>
                    <span className="text-white font-bold">{language === 'ar' ? selectedBrand.nameAr : selectedBrand.name}</span>
                  </div>
                </div>

                {/* Branch row */}
                {selectedBranchIdx !== -1 && (
                  <div className="flex justify-between items-start text-xs gap-4 font-sans">
                    <span className="text-white/40 uppercase font-bold shrink-0">{t.summaryBranch}</span>
                    <span className="text-white font-semibold text-right">{branchName}</span>
                  </div>
                )}

                {/* Date row */}
                {ticketDate && (
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-white/40 uppercase font-bold">{t.summaryDate}</span>
                    <span className="text-white font-mono">{ticketDate}</span>
                  </div>
                )}
              </div>

              {/* Tickets breakdown details */}
              <div className="space-y-3 border-b border-white/5 pb-6 text-xs text-white/70">
                {ticketCounts.standard > 0 && (
                  <div className="flex justify-between items-center font-sans">
                    <span>{ticketCounts.standard}x {t.ticketNames.standard}</span>
                    <span className="font-mono">${ticketCounts.standard * prices.standard}</span>
                  </div>
                )}
                {ticketCounts.vip > 0 && (
                  <div className="flex justify-between items-center font-sans">
                    <span>{ticketCounts.vip}x {t.ticketNames.vip}</span>
                    <span className="font-mono">${ticketCounts.vip * prices.vip}</span>
                  </div>
                )}
                {ticketCounts.family > 0 && (
                  <div className="flex justify-between items-center font-sans">
                    <span>{ticketCounts.family}x {t.ticketNames.family}</span>
                    <span className="font-mono">${ticketCounts.family * prices.family}</span>
                  </div>
                )}

                {totalAmount === 0 && (
                  <p className="text-center text-white/30 text-xs py-4 font-sans">{t.noTickets}</p>
                )}
              </div>

              {/* Total amount row */}
              <div className="flex justify-between items-center font-sans">
                <span className="text-sm font-bold text-white uppercase tracking-wider">{t.total}</span>
                <span className="text-2xl font-extrabold text-white font-mono">${totalAmount}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
