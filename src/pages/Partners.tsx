import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { 
  Building, 
  CheckCircle2, 
  X,
  ShieldCheck, 
  Award, 
  HeartHandshake,
  Mail,
  Phone,
  Upload,
  Send,
  User,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Check,
  ChevronDown,
  Linkedin,
  Twitter
} from "lucide-react";

interface StrategicPartner {
  id: number;
  nameEn: string;
  nameAr: string;
  typeEn: string;
  typeAr: string;
  descriptionEn: string;
  descriptionAr: string;
  statsEn: string;
  statsAr: string;
  icon: React.ReactNode;
}

const partners: StrategicPartner[] = [
  {
    id: 1,
    nameEn: "Riyadh Season / GEA",
    nameAr: "موسم الرياض / الهيئة العامة للترفيه",
    typeEn: "Government & Tourism",
    typeAr: "القطاع الحكومي والسياحي",
    descriptionEn: "Malahi takes over prime zones in Boulevard City and Riyadh Season, installing massive temporary and permanent amusement setups that attract millions of tourists annually.",
    descriptionAr: "تقوم ملاهي بإدارة وتشغيل مناطق رئيسية في بوليفارد سيتي وموسم الرياض، مجهزة بأحدث المنشآت الترفيهية المؤقتة والدائمة لاستقبال ملايين السياح سنويًا.",
    statsEn: "2.5M+ Annual Visitors Served",
    statsAr: "خدمة أكثر من 2.5 مليون زائر سنويًا",
    icon: <Building className="w-8 h-8 text-sky-400" />,
  },
  {
    id: 2,
    nameEn: "Cenomi Malls",
    nameAr: "سينومي سنترز (المراكز العربية)",
    typeEn: "Real Estate & Landlord",
    typeAr: "التطوير العقاري والمجمعات التجارية",
    descriptionEn: "Strategic long-term leases in kingdom-wide premier shopping malls, deploying indoor family hubs (Lambee, Fizz, 1noos) to increase mall footfall and dwell time.",
    descriptionAr: "شراكة استراتيجية طويلة الأجل لافتتاح فروع داخل كبرى المجمعات التجارية لسينومي في المملكة (لمبي، فيزيا، ونوس) لزيادة تدفق الزوار ومدة إقامتهم.",
    statsEn: "15+ Mall Venues Nationwide",
    statsAr: "أكثر من 15 فرعًا داخل المجمعات التجارية",
    icon: <Building className="w-8 h-8 text-purple-400" />,
  },
  {
    id: 3,
    nameEn: "Al Othaim Investment",
    nameAr: "العثيم للاستثمار",
    typeEn: "Strategic Venture",
    typeAr: "الاستثمار المشترك والتطوير العقاري",
    descriptionEn: "Joint investment and development of massive entertainment hubs in second-tier cities, supporting Saudi Vision 2030's quality of life objectives.",
    descriptionAr: "استثمار وتطوير مشترك للمجمعات والمدن الترفيهية الضخمة بالمناطق الواعدة، دعمًا لبرامج جودة الحياة ضمن رؤية المملكة 2030.",
    statsEn: "5 Strategic Joint Venues",
    statsAr: "5 مشاريع استثمارية مشتركة رئيسية",
    icon: <Building className="w-8 h-8 text-amber-400" />,
  },
];

interface AccreditationCard {
  titleEn: string;
  titleAr: string;
  orgEn: string;
  orgAr: string;
  descEn: string;
  descAr: string;
  type: "safety" | "industry" | "quality";
}

const accreditations: AccreditationCard[] = [
  {
    titleEn: "IAAPA Active Membership",
    titleAr: "عضوية ناشطة في منظمة آيبا العالمية",
    orgEn: "International Association of Amusement Parks and Attractions",
    orgAr: "المنظمة الدولية للمدن الترفيهية ومراكز الجذب السياحي",
    descEn: "Continuous exchange of knowledge, aligning our parks with international operations and compliance frameworks.",
    descAr: "تبادل مستمر للخبرات ومطابقة وتطوير عمليات التشغيل بما يتناسب مع اللوائح الدولية.",
    type: "industry",
  },
  {
    titleEn: "TUV Certification Compliance",
    titleAr: "التوافق مع شهادات وكالة TÜV الألمانية",
    orgEn: "TÜV Technical Inspection Association",
    orgAr: "هيئة الفحص الفني الألمانية للأمان والجودة",
    descEn: "Strict inspection of amusement tracks, electric circuits, and software to ensure premium safety compliance.",
    descAr: "فحص فني دقيق لكل المسارات والدارات الكهربائية والبرمجيات لضمان أمان فائق للزوار.",
    type: "safety",
  },
  {
    titleEn: "ASTM F24 Amusement Safety Standards",
    titleAr: "معايير السلامة ASTM F24 الدولية",
    orgEn: "American Society for Testing and Materials",
    orgAr: "الجمعية الأمريكية لاختبار المواد والمعايير",
    descEn: "Adhering to strict standards regarding acceleration, G-forces, safety belts, and structural loading requirements.",
    descAr: "الالتزام التام بالحدود القياسية للتسارع، الجاذبية، أحزمة الأمان والأحمال الهيكلية للمدن الترفيهية.",
    type: "safety",
  },
  {
    titleEn: "SASO Quality Mark Compliance",
    titleAr: "مطابقة الهيئة السعودية للمواصفات والمقاييس",
    orgEn: "Saudi Standards, Metrology and Quality Organization",
    orgAr: "الهيئة السعودية للمواصفات والمقاييس والجودة (ساسو)",
    descEn: "Fully complying with local quality codes and entertainment facility regulations of the Kingdom.",
    descAr: "تطوير شامل ومواءمة لكل معايير الجودة المحلية والترخيص السياحي داخل مدن المملكة.",
    type: "quality",
  },
];

export default function Partners() {
  const { language } = useLanguage();
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(null);

  const selectedPartner = partners.find((p) => p.id === selectedPartnerId);

  // Step state for licensing form
  const [formStep, setFormStep] = useState(1);
  
  // Licensing Form state
  const [formData, setFormData] = useState({
    fullName: "",
    brandToLicense: "",
    entityAddress: "",
    entityPhone: "",
    mobileNumber: "",
    email: "",
    currentGeoRegions: "",
    targetGeoRegions: "",
    experienceDesc: "",
    whySuccessfulDesc: "",
    investmentCapital: "",
    notes: ""
  });
  
  // General Enquiry form state
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setSelectedFileNames(filesArray.map(f => f.name));
    }
  };

  const t = {
    ar: {
      badge: "الشركاء والاعتمادات الاستراتيجية",
      title: "الشركاء والاعتمادات",
      desc: "نتعاون مع كبرى الجهات ونلتزم بأعلى معايير السلامة والجودة العالمية لتقديم حلول ترفيهية متكاملة لضيوفنا وشركائنا.",
      casesTitle: "دراسات الشراكة والتعاون الاستراتيجي",
      caseStudyBadge: "دراسة حالة",
      readMore: "اقرأ المزيد ←",
      
      accSectionTitle: "معايير الجودة والاعتمادات الدولية",
      accSectionDesc: "نفخر بتطبيق أعلى معايير السلامة والجودة العالمية. تتوافق كل عملياتنا الترفيهية مع كبرى المنظمات الهندسية وهيئات الأمان لضمان بيئة آمنة وملهمة.",
      typeLabels: {
        safety: "معايير الأمان",
        industry: "معايير الصناعة",
        quality: "معايير الجودة",
      },
      mottoTitle: "أمان بلا تهاون",
      mottoDesc: "تخضع جميع أحزمة الأمان، منصات القفز، الحواجز، والسيارات لفحص هندسي فني دقيق ويومي قبل استقبال الزوار. السلامة ليست مجرد ميزة، بل هي الركيزة الأساسية لعملنا.",
      
      portalTitle: "بوابة الشركاء والمستثمرين",
      portalDesc: "نحن هنا لتطوير الشراكات المستدامة وتوسيع انتشار علاماتنا التجارية. يمكن للمستثمرين ورواد الأعمال التقديم على تراخيص العلامات التجارية لمجموعتنا أو التواصل المباشر مع ممثل الشركة.",
      directContactTitle: "قنوات الاتصال المباشرة",
      representative: "ممثل الشركة",
      repName: "سعد الرشيد",
      repRole: "ممثل الشركة والمستثمرين",
      quickEnquiryTitle: "استفسار سريع",
      quickEnquiryDesc: "تواصل معنا مباشرة لأي استفسارات عامة أو تجارية.",
      formNameLabel: "الاسم",
      formEmailLabel: "البريد الإلكتروني",
      formMessageLabel: "الرسالة",
      formSubmitInquiry: "إرسال الاستفسار",
      
      formTitle: "طلب ترخيص علامة تجارية",
      formDesc: "سيساعدك هذا النموذج في إعداد وتقديم معلوماتك الشخصية والتجارية التي تعد ضرورية لنظرنا في منح التراخيص. يرجى إكماله تماماً ونلاحظ أن إكمال نموذج الطلب هذا لا يفرض أي التزام مستمر عليك أو على ملاهي.",
      formFullName: "اسم المتقدم بالكامل",
      formBrand: "العلامة التجارية المراد منح ترخيصها",
      formSelectBrand: "اختر من القائمة",
      formEntityAddress: "عنوان المنشأة",
      formEntityPhone: "هاتف المنشأة",
      formMobileNumber: "رقم الجوال",
      formEmailAddress: "البريد الإلكتروني",
      formCurrentGeo: "في أي مناطق جغرافية تعمل حالياً في عملك؟",
      formTargetGeo: "في أي مناطق جغرافية ترغب في تشغيل العلامة التجارية لملاهي؟",
      formExperience: "صف خبرتك وعملك الحالي في صناعة الترفيه",
      formWhySuccessful: "صف لماذا تعتقد أنك ستكون مرخصاً لملاهي ناجحاً",
      formCapital: "كم رأس المال المتوفر للاستثمار في هذا العمل؟",
      formAttachments: "المرفقات (السجل التجاري والملفات التجارية)",
      formNotes: "ملاحظات مع الطلب (إن وجد)",
      formSubmitApp: "إرسال الطلب",
      formAddFile: "إضافة ملف",
      formDragDrop: "اختر ملفاً أو اسحبه هنا",
      formStepContact: "بيانات الاتصال",
      formStepBrand: "تفاصيل الترخيص",
      formStepExp: "الخبرة والملفات",
      formNext: "التالي",
      formPrev: "السابق",
      formSuccessTitle: "شكراً لاهتمامك!",
      formSuccessDesc: "تم استلام طلب الترخيص الخاص بك بنجاح. سيقوم فريق التطوير بالشركة بمراجعة الملف والتواصل معك في أقرب وقت ممكن.",
      inquirySuccessDesc: "تم إرسال استفسارك بنجاح. سنرد عليك في أقرب وقت ممكن.",
      requiredField: "مطلوب"
    },
    en: {
      badge: "Partners & Accreditations",
      title: "Partners & Accreditations",
      desc: "We collaborate with leading entities and commit to the highest global safety and quality benchmarks to deliver premium entertainment experiences.",
      casesTitle: "Case Studies & Strategic Ventures",
      caseStudyBadge: "Case Study",
      readMore: "Read More →",

      accSectionTitle: "Quality & Safety Accreditations",
      accSectionDesc: "We take pride in applying the highest international safety benchmarks. Our operations comply with leading international quality and engineering boards to maintain a secure playground.",
      typeLabels: {
        safety: "Safety Standards",
        industry: "Industry Standards",
        quality: "Quality Standards",
      },
      mottoTitle: "Zero Compromise on Safety",
      mottoDesc: "Every harness, jump pad, barrier, and kart undergoes daily inspection checklists by our safety engineers before opening to the public. Safety is not a feature; it is our foundation.",
      
      portalTitle: "Partners & Investors Portal",
      portalDesc: "We are committed to building sustainable partnerships and expanding our brand presence. Investors and entrepreneurs can apply for group trademarks or contact our representative directly.",
      directContactTitle: "Direct Contact Channels",
      representative: "Company Representative",
      repName: "Saad Al Rashid",
      repRole: "Company & Investor Representative",
      quickEnquiryTitle: "Quick Enquiry",
      quickEnquiryDesc: "Contact us directly for any general or commercial enquiries.",
      formNameLabel: "Name",
      formEmailLabel: "Email",
      formMessageLabel: "Message",
      formSubmitInquiry: "Send Enquiry",

      formTitle: "Trademark License Application",
      formDesc: "This form will help you prepare and submit your personal and commercial information required for us to consider granting licenses. Please complete it fully, noting that completing this application form does not impose any ongoing obligation on you or Malahi.",
      formFullName: "Applicant Full Name",
      formBrand: "Trademark to be Licensed",
      formSelectBrand: "Select from the list",
      formEntityAddress: "Entity Address",
      formEntityPhone: "Entity Phone",
      formMobileNumber: "Mobile Number",
      formEmailAddress: "Email Address",
      formCurrentGeo: "In which geographical areas do you currently operate?",
      formTargetGeo: "In which geographical areas do you wish to operate Malahi?",
      formExperience: "Describe your experience & work in the entertainment industry",
      formWhySuccessful: "Describe why you think you will be a successful licensee",
      formCapital: "How much capital is available for investment in this business?",
      formAttachments: "Attachments (Commercial CR & Business Files)",
      formNotes: "Notes with the Request (if any)",
      formSubmitApp: "Submit Application",
      formAddFile: "Add File",
      formDragDrop: "Choose a file or drag it here",
      formStepContact: "Contact Info",
      formStepBrand: "Licensing Details",
      formStepExp: "Experience & Files",
      formNext: "Next",
      formPrev: "Previous",
      formSuccessTitle: "Thank you for your interest!",
      formSuccessDesc: "Your licensing application has been successfully received. Our business development team will review it and get in touch with you shortly.",
      inquirySuccessDesc: "Your enquiry has been successfully sent. We will respond to you as soon as possible.",
      requiredField: "Required"
    }
  }[language];

  function getAccIcon(type: "safety" | "industry" | "quality") {
    switch (type) {
      case "safety":
        return <ShieldCheck className="w-6 h-6 text-rose-400" />;
      case "industry":
        return <HeartHandshake className="w-6 h-6 text-emerald-400" />;
      case "quality":
        return <Award className="w-6 h-6 text-amber-400" />;
    }
  }

  return (
    <div className="bg-[#0c0c0c] min-h-screen text-[#ebebeb] font-sans w-full overflow-x-hidden flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 px-6 w-full flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Glow & Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00AC79]/5 rounded-full blur-[140px] pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit mx-auto text-xs uppercase tracking-widest text-[#00AC79] font-bold font-sans"
          >
            <span>{t.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00AC79] animate-pulse"></span>
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

      {/* Infinite Logo Marquee */}
      <section className="py-10 bg-neutral-950/45 border-t border-b border-white/5 w-full overflow-hidden z-10 relative backdrop-blur-md">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] w-max select-none">
          {[...partners, ...partners].map((p, idx) => {
            const name = language === 'ar' ? p.nameAr : p.nameEn;
            return (
              <span key={idx} className="text-xl md:text-3xl font-sans font-extrabold uppercase tracking-widest text-white/20 hover:text-white/80 transition-colors cursor-pointer">
                {name} •
              </span>
            );
          })}
        </div>
      </section>

      {/* Section 1: Partners Grid */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full z-10">
        <h2 className="text-3xl font-bold text-white text-center mb-16 uppercase tracking-tight font-sans">{t.casesTitle}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner) => {
            const partnerName = language === 'ar' ? partner.nameAr : partner.nameEn;
            const partnerType = language === 'ar' ? partner.typeAr : partner.typeEn;
            const partnerDesc = language === 'ar' ? partner.descriptionAr : partner.descriptionEn;
            const partnerStats = language === 'ar' ? partner.statsAr : partner.statsEn;

            return (
              <motion.div
                key={partner.id}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedPartnerId(partner.id)}
                className="bg-neutral-900/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 flex flex-col justify-between gap-6 cursor-pointer shadow-xl hover:border-[#00AC79]/30 transition-all duration-300 group text-start hover:bg-neutral-900/60"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[#00AC79]">
                      {partner.icon}
                    </div>
                    <span className="px-3 py-1 bg-[#00AC79]/10 text-[#00AC79] border border-[#00AC79]/20 text-[9px] uppercase tracking-widest font-bold rounded-full font-sans">
                      {t.caseStudyBadge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white tracking-tight leading-snug font-sans">{partnerName}</h3>
                    <span className="text-[10px] text-neutral-500 block mt-1 uppercase tracking-widest font-sans font-medium">{partnerType}</span>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed font-sans font-normal">{partnerDesc}</p>
                </div>

                <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-sans font-medium">{partnerStats}</span>
                  <span className="text-[10px] font-bold text-[#00AC79] uppercase tracking-widest group-hover:underline font-sans">{t.readMore}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Quality & Safety Accreditations */}
      <section className="py-24 px-6 bg-neutral-950/20 border-t border-white/5 z-10 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase font-sans">
              {t.accSectionTitle}
            </h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans font-normal">
              {t.accSectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {acacreditations(language)}
          </div>
        </div>
      </section>

      {/* Safety Motto Banner */}
      <section className="py-24 px-6 max-w-4xl mx-auto w-full z-10 text-center">
        <div className="bg-neutral-900/50 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00AC79]/80 to-transparent opacity-80" />
          
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-tight font-sans">{t.mottoTitle}</h2>
          <p className="text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            {t.mottoDesc}
          </p>
        </div>
      </section>

      {/* Section 3: Contact Form (Minimalist) */}
      <section id="licensing-portal" className="py-24 px-6 relative w-full z-10 bg-[#000000]">
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-16 md:gap-8">
            
            {/* Text Column (First in DOM -> Right in RTL) */}
            <div className="w-full md:w-5/12 flex flex-col items-start gap-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-sans">
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </h2>
              
              <div className="space-y-4 pt-4">
                <a href="mailto:salrashid@malahi.com" className="text-sm text-white hover:text-neutral-300 transition-colors font-sans block" dir="ltr">
                  salrashid@malahi.com
                </a>
                <p className="text-sm text-white/50 font-sans">
                  {language === 'ar' ? 'إدارة المبيعات' : 'Sales Management'}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <a href="#" className="w-6 h-6 flex items-center justify-center bg-white text-black hover:bg-neutral-200 transition-colors">
                    <Linkedin size={14} fill="currentColor" className="text-black" />
                  </a>
                  <a href="#" className="w-6 h-6 flex items-center justify-center bg-white text-black hover:bg-neutral-200 transition-colors">
                    <Twitter size={14} fill="currentColor" className="text-black" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column (Second in DOM -> Left in RTL) */}
            <div className="w-full md:w-6/12 pt-4">
              <form 
                onSubmit={(e) => { e.preventDefault(); setInquirySubmitted(true); }}
                className="flex flex-col gap-10"
              >
                {!inquirySubmitted ? (
                  <>
                    <input 
                      type="text" 
                      required
                      placeholder={language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                      value={inquiryData.name}
                      onChange={e => setInquiryData({...inquiryData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 focus:border-white text-white text-sm pb-3 outline-none transition-colors placeholder:text-white/50 font-sans"
                    />
                    
                    <div className="flex flex-col md:flex-row items-center gap-10">
                      {/* Note: RTL means rightmost comes first in DOM. "البريد" is on the right in the image. So it's first. */}
                      <input 
                        type="email" 
                        required
                        placeholder={language === 'ar' ? 'البريد' : 'Email'}
                        value={inquiryData.email}
                        onChange={e => setInquiryData({...inquiryData, email: e.target.value})}
                        className="w-full md:w-1/2 bg-transparent border-b border-white/20 focus:border-white text-white text-sm pb-3 outline-none transition-colors placeholder:text-white/50 font-sans"
                      />
                      <input 
                        type="tel" 
                        required
                        placeholder={language === 'ar' ? 'رقم الجوال' : 'Mobile Number'}
                        className="w-full md:w-1/2 bg-transparent border-b border-white/20 focus:border-white text-white text-sm pb-3 outline-none transition-colors placeholder:text-white/50 font-sans"
                      />
                    </div>

                    <input 
                      type="text" 
                      required
                      placeholder={language === 'ar' ? 'اسم المنشأة' : 'Entity Name'}
                      className="w-full bg-transparent border-b border-white/20 focus:border-white text-white text-sm pb-3 outline-none transition-colors placeholder:text-white/50 font-sans"
                    />

                    <input 
                      type="text"
                      required
                      placeholder={language === 'ar' ? 'الرسالة / الوصف' : 'Message / Description'}
                      value={inquiryData.message}
                      onChange={e => setInquiryData({...inquiryData, message: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 focus:border-white text-white text-sm pb-3 outline-none transition-colors placeholder:text-white/50 font-sans"
                    />

                    <div className="flex justify-start mt-2">
                      <button 
                        type="submit"
                        className="px-10 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-bold transition-colors font-sans cursor-pointer"
                      >
                        {language === 'ar' ? 'ارسال' : 'Send'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-start justify-center py-12 space-y-4">
                    <CheckCircle2 size={48} className="text-white mb-4" />
                    <h3 className="text-xl font-bold text-white font-sans">
                      {language === 'ar' ? 'تم استلام رسالتك' : 'Message Received'}
                    </h3>
                    <p className="text-white/60 font-sans text-sm">
                      {language === 'ar' ? 'سنتواصل معك في أقرب وقت ممكن.' : 'We will get back to you as soon as possible.'}
                    </p>
                    <button 
                      onClick={() => { setInquirySubmitted(false); setInquiryData({name:'', email:'', message:''}); }}
                      className="mt-6 text-xs text-white/50 hover:text-white underline transition-colors font-sans cursor-pointer"
                    >
                      {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedPartnerId !== null && selectedPartner && (() => {
          const partnerName = language === 'ar' ? selectedPartner.nameAr : selectedPartner.nameEn;
          const partnerDesc = language === 'ar' ? selectedPartner.descriptionAr : selectedPartner.descriptionEn;
          const partnerStats = language === 'ar' ? selectedPartner.statsAr : selectedPartner.statsEn;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-xl"
            >
              <div className="absolute inset-0" onClick={() => setSelectedPartnerId(null)} />
              
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-neutral-950 border border-white/10 rounded-[2.5rem] p-10 max-w-2xl w-full relative z-10 shadow-[0_35px_100px_rgba(0,0,0,0.9)] space-y-6 text-start"
              >
                <button
                  onClick={() => setSelectedPartnerId(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[#00AC79] shrink-0">
                    {selectedPartner.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight font-sans">{partnerName}</h3>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full" />

                <div className="space-y-4">
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans font-normal">
                    {partnerDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-sans">
                    <CheckCircle2 size={16} />
                    <span>{partnerStats}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <Footer />

      {/* Global CSS for loop marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );

  function acacreditations(lang: "ar" | "en") {
    return accreditations.map((acc, idx) => {
      const title = lang === 'ar' ? acc.titleAr : acc.titleEn;
      const org = lang === 'ar' ? acc.orgAr : acc.orgEn;
      const desc = lang === 'ar' ? acc.descAr : acc.descEn;
      const typeLabel = t.typeLabels[acc.type];

      return (
        <motion.div
          key={idx}
          whileHover={{ y: -4 }}
          className="p-8 rounded-[2rem] border border-white/10 bg-neutral-900/40 backdrop-blur-xl shadow-xl flex flex-col justify-between gap-6 text-start"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                {getAccIcon(acc.type)}
              </div>
              <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500 font-sans">{typeLabel}</span>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg md:text-xl font-bold text-white font-sans">{title}</h3>
              <p className="text-[10px] text-neutral-500 font-sans font-medium">{org}</p>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans font-normal">{desc}</p>
          </div>
        </motion.div>
      );
    });
  }
}
