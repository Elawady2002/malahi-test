import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useAnimation } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Calendar, 
  Award, 
  Users, 
  Sparkles, 
  Star, 
  Palette, 
  Hammer, 
  Layout, 
  PencilRuler,
  Paintbrush,
  Wrench,
  Settings,
  Rocket,
  Move,
  X,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from "lucide-react";

import Image1 from "../assets/images/assest/282A3269.jpg";
import Image2 from "../assets/images/assest/DSC_6786.jpg";
import Image3 from "../assets/images/assest/MRAD1974-2.jpg";
import Image4 from "../assets/images/assest/park_operations.png";
import StudioLogo from "../assets/images/assest/logo.png";

import ConceptDesignImg from "../assets/images/assest/concept_design.png";
import LayoutPlanningImg from "../assets/images/assest/layout_planning.png";
import FabricationImg from "../assets/images/assest/fabrication.png";

import LambyChar from "../assets/images/assest/lamby_character.png";
import DossChar from "../assets/images/assest/doos_character.png";
import NoosChar from "../assets/images/assest/noos_character.png";
import FizziaChar from "../assets/images/assest/fiaza_character.png";

import LambyIcon from "../assets/images/assest/lamby.png";
import DossIcon from "../assets/images/assest/doss.png";
import NoosIcon from "../assets/images/assest/1noos.png";
import FizziaIcon from "../assets/images/assest/fizzia.png";


interface Milestone {
  year: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const milestones: Milestone[] = [
  {
    year: "1994",
    titleEn: "The Foundation",
    titleAr: "البداية والتأسيس",
    descEn: "Initial entry into the Saudi family entertainment market, building a foundation of trust and safety.",
    descAr: "الدخول الأول إلى سوق الترفيه العائلي السعودي، وتأسيس ركائز الثقة والأمان لعملائنا.",
    icon: <Calendar className="w-6 h-6 text-[#00AC79]" />,
  },
  {
    year: "2010",
    titleEn: "National Expansion",
    titleAr: "التوسع على مستوى المملكة",
    descEn: "Opening multiple entertainment venues in key cities, introducing new indoor play concepts.",
    descAr: "افتتاح مراكز ترفيهية متعددة في المدن الرئيسية بالمملكة وإدخال مفاهيم جديدة للألعاب المغلقة.",
    icon: <Award className="w-6 h-6 text-[#00AC79]" />,
  },
  {
    year: "2018",
    titleEn: "Strategic Partnership Era",
    titleAr: "حقبة الشراكات الاستراتيجية",
    descEn: "Forming partnerships with regional malls and launching innovative interactive attraction zones.",
    descAr: "بناء شراكات متينة مع المجمعات التجارية وإطلاق مناطق جذب تفاعلية ومبتكرة.",
    icon: <Users className="w-6 h-6 text-[#00AC79]" />,
  },
  {
    year: "2022",
    titleEn: "The Great Merger (Malahi)",
    titleAr: "الاندماج الكبير (ملاهي)",
    descEn: "Merging all operating entities under 'Malahi Company' to create a unified powerhouse in the Saudi entertainment sector.",
    descAr: "دمج جميع الكيانات التشغيلية تحت مظلة 'شركة ملاهي' لإنشاء قوة موحدة ورائدة في قطاع الترفيه بالمملكة.",
    icon: <Sparkles className="w-6 h-6 text-[#00AC79]" />,
  },
  {
    year: "2024",
    titleEn: "Takeover & Scale",
    titleAr: "الهيمنة والتوسع الضخم",
    descEn: "Becoming the largest operator during Riyadh Season and in Boulevard City, serving millions of visitors.",
    descAr: "الحصول على أكبر حصة تشغيلية في موسم الرياض وبوليفارد سيتي وتقديم خدماتنا لملايين الزوار.",
    icon: <Star className="w-6 h-6 text-[#00AC79]" />,
  },
];

interface DesignProject {
  id: number;
  titleEn: string;
  titleAr: string;
  category: "spatial" | "layout" | "production";
  image: string;
  descEn: string;
  descAr: string;
}

const projects: DesignProject[] = [
  {
    id: 1,
    titleEn: "Doos Karting Main Track",
    titleAr: "حلبة دوز كارتينج الرئيسية",
    category: "spatial",
    image: Image1,
    descEn: "Designing safe, high-speed curves and barriers integrated with modern neon lighting and safety grids.",
    descAr: "تصميم حلبة متكاملة الحواجز والمنعطفات السريعة والآمنة مع إضاءات نيون وشبكات حماية.",
  },
  {
    id: 2,
    titleEn: "Lambee Soft Play Zone",
    titleAr: "منطقة ألعاب لمبي للاستكشاف",
    category: "layout",
    image: Image2,
    descEn: "Strategic spacing for kids under ten, creating visual zones that combine physical action with exploration hubs.",
    descAr: "تقسيم استراتيجي للأطفال دون سن العاشرة لدمج الحركة البدنية مع غرف الاستكشاف الهادئة.",
  },
  {
    id: 3,
    titleEn: "Fizz Trampoline Park Structure",
    titleAr: "هيكل مدينة ترامبولين فيزيا",
    category: "production",
    image: Image3,
    descEn: "Custom fabrication of gravity-defying climbing structures and spring-loaded trampoline systems.",
    descAr: "تصنيع وتركيب جدران تسلق مخصصة وأنظمة ترامبولين حديثة تتحدى الجاذبية.",
  },
];

interface BrandTheme {
  id: string;
  nameEn: string;
  nameAr: string;
  color: string;
  accent: string;
  textColor: string;
  characterImg: string;
  logo: string;
  descEn: string;
  descAr: string;
  valuesEn: string[];
  valuesAr: string[];
}

const brandThemes: BrandTheme[] = [
  {
    id: "lamby",
    nameEn: "Lambee",
    nameAr: "لمبي",
    color: "#FFA1B5",
    accent: "#FF4A8D",
    textColor: "#111",
    characterImg: LambyChar,
    logo: LambyIcon,
    descEn: "Designed for children under ten, combining play, exploration, and education under specialized supervision.",
    descAr: "مخصصة للأطفال دون سن العاشرة، وتجمع بين اللعب والتعليم والاستكشاف تحت إشراف متخصص وآمن.",
    valuesEn: ["Safe Play", "Learning", "Curiosity"],
    valuesAr: ["اللعب الآمن", "التعليم التفاعلي", "الفضول المعرفي"],
  },
  {
    id: "doss",
    nameEn: "Doos Karting",
    nameAr: "دوز كارتينج",
    color: "#0c1a40",
    accent: "#E60000",
    textColor: "#fff",
    characterImg: DossChar,
    logo: DossIcon,
    descEn: "High-speed electric indoor karting designed for racing enthusiasts and adrenaline seekers.",
    descAr: "حلبات كارتينج كهربائية داخلية عالية السرعة مصممة لعشاق السباقات ومحبي الأدرينالين.",
    valuesEn: ["Adrenaline", "Precision", "Competition"],
    valuesAr: ["الحماس والإثارة", "الدقة والتحكم", "روح المنافسة"],
  },
  {
    id: "noos",
    nameEn: "1noos",
    nameAr: "ونوس",
    color: "#F28224",
    accent: "#FF6A00",
    textColor: "#111",
    characterImg: NoosChar,
    logo: NoosIcon,
    descEn: "Action-packed adventures, climbing, and jumping with a proud Saudi spirit and identity.",
    descAr: "مغامرات حركية، تسلق، وقفز ترفيهي بأجواء عائلية مشبعة بالروح والهوية السعودية.",
    valuesEn: ["Saudi Spirit", "Adventure", "Family Fun"],
    valuesAr: ["الروح السعودية", "المغامرة الحرة", "المرح العائلي"],
  },
  {
    id: "fizzia",
    nameEn: "Fizzia",
    nameAr: "فيزيا",
    color: "#0B2114",
    accent: "#84cc16",
    textColor: "#fff",
    characterImg: FizziaChar,
    logo: FizziaIcon,
    descEn: "Trampolines, climbing walls, and gravity-defying challenges to improve fitness and family bonding.",
    descAr: "منصات قفز، جدران تسلق، وتحديات تتحدى الجاذبية لتعزيز اللياقة البدنية والترابط العائلي.",
    valuesEn: ["Fitness", "Gravity Free", "Vitality"],
    valuesAr: ["اللياقة البدنية", "تحدي الجاذبية", "الحيوية والنشاط"],
  },
];

interface CanvasItem {
  id: number;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

const canvasItemsList = (
  Image1: string,
  Image2: string,
  Image3: string,
  Image4: string,
  ConceptDesignImg: string,
  LayoutPlanningImg: string,
  FabricationImg: string,
  LambyChar: string,
  DossChar: string,
  NoosChar: string,
  FizziaChar: string,
  LambyIcon: string,
  DossIcon: string,
  NoosIcon: string,
  FizziaIcon: string,
  StudioLogo: string
): CanvasItem[] => [
  {
    id: 1,
    src: Image1,
    x: -600,
    y: -450,
    width: 320,
    height: 420,
    rotate: -8,
    titleAr: "الاستكشاف النشط",
    titleEn: "Active Exploration",
    descAr: "الأطفال يقضون أوقاتًا مليئة بالمرح والحركة في مسارات الاستكشاف الخاصة بنا.",
    descEn: "Children spending fun-filled moments of movement in our exploration paths."
  },
  {
    id: 2,
    src: Image2,
    x: -150,
    y: -700,
    width: 380,
    height: 290,
    rotate: 6,
    titleAr: "لحظات البهجة",
    titleEn: "Beaming Smiles",
    descAr: "تصميم مناطق اللعب لتبعث الفرح والراحة والاندماج التام للأطفال.",
    descEn: "Designing play zones to radiate joy, comfort, and total integration for children."
  },
  {
    id: 3,
    src: Image3,
    x: 300,
    y: -550,
    width: 300,
    height: 400,
    rotate: -4,
    titleAr: "عالم الواقع الافتراضي التفاعلي",
    titleEn: "Interactive VR Worlds",
    descAr: "أحدث التقنيات الرقمية المدمجة في تجارب اللعب الجماعي.",
    descEn: "The latest digital technology integrated into multiplayer gaming experiences."
  },
  {
    id: 4,
    src: ConceptDesignImg,
    x: 750,
    y: -350,
    width: 440,
    height: 310,
    rotate: 12,
    titleAr: "رسم الأفكار الإبداعية",
    titleEn: "Concept Designing",
    descAr: "تصور ثلاثي الأبعاد مبتكر يدمج الإضاءات الفوسفورية والمنعطفات الترفيهية.",
    descEn: "Innovative 3D renders combining neon lights and complex entertainment curves."
  },
  {
    id: 5,
    src: LayoutPlanningImg,
    x: -750,
    y: 100,
    width: 360,
    height: 460,
    rotate: 5,
    titleAr: "تخطيط المساحات",
    titleEn: "Layout Planning",
    descAr: "مخططات هندسية مدروسة تضمن حركة آمنة وانسيابية وسعة استيعاب قصوى.",
    descEn: "Studied layouts ensuring safe, fluid crowd movement and maximum capacity."
  },
  {
    id: 6,
    src: FabricationImg,
    x: -250,
    y: -150,
    width: 400,
    height: 300,
    rotate: -3,
    titleAr: "التصنيع والإنتاج",
    titleEn: "Fabrication & Production",
    descAr: "أقسام التصنيع المخصصة لبناء الهياكل المعدنية والترامبولين بجودة فائقة.",
    descEn: "In-house production department building robust metal frames and trampolines."
  },
  {
    id: 7,
    src: Image4,
    x: 250,
    y: 150,
    width: 330,
    height: 430,
    rotate: 10,
    titleAr: "التركيب والتشغيل",
    titleEn: "Setup & Operations",
    descAr: "إشراف هندسي متكامل لتركيب واختبار الألعاب الترفيهية قبل إطلاقها.",
    descEn: "Comprehensive engineering supervision to install and test rides before launch."
  },
  {
    id: 8,
    src: LambyChar,
    x: 700,
    y: 300,
    width: 280,
    height: 380,
    rotate: -6,
    titleAr: "شخصية لمبي",
    titleEn: "Lamby Character",
    descAr: "شخصية لمبي الترفيهية المحبوبة للأطفال في مناطق الألعاب والمدن الترفيهية.",
    descEn: "The beloved Lamby mascot leading children in interactive play centers."
  },
  {
    id: 9,
    src: DossChar,
    x: -600,
    y: 650,
    width: 290,
    height: 390,
    rotate: -8,
    titleAr: "شخصية دوس",
    titleEn: "Doss Character",
    descAr: "شخصية دوس التي تضيف الإثارة والحماس لسباقات الكارتينج السريعة.",
    descEn: "Doss character adding speed and thrills to our karting tracks."
  },
  {
    id: 10,
    src: NoosChar,
    x: -100,
    y: 550,
    width: 280,
    height: 360,
    rotate: 4,
    titleAr: "شخصية ونوس",
    titleEn: "Noos Character",
    descAr: "تميمة ونوس الداعية للاكتشاف والمغامرة والتعلم التفاعلي.",
    descEn: "The friendly Noos mascot inspiring exploration and interactive learning."
  },
  {
    id: 11,
    src: FizziaChar,
    x: 350,
    y: 700,
    width: 300,
    height: 400,
    rotate: -9,
    titleAr: "شخصية فيزيا",
    titleEn: "Fizzia Character",
    descAr: "تميمة فيزيا التي تجعل العلوم ممتعة ومشوقة وتجذب العقول الشابة.",
    descEn: "Fizzia mascot bringing physics and science to life for kids."
  },
  {
    id: 12,
    src: LambyIcon,
    x: -1050,
    y: -750,
    width: 250,
    height: 250,
    rotate: -12,
    titleAr: "شعار لمبي",
    titleEn: "Lamby Brand Logo",
    descAr: "العلامة البصرية الفريدة لمدينة ألعاب لمبي المخصصة للاكتشاف.",
    descEn: "The unique brand logo for Lamby exploration and soft play park."
  },
  {
    id: 13,
    src: DossIcon,
    x: 950,
    y: -750,
    width: 250,
    height: 250,
    rotate: 15,
    titleAr: "شعار دوس كارتينج",
    titleEn: "Doss Karting Logo",
    descAr: "شعار حلبات سباق دوس كارتينج المليئة بالإثارة والسرعة.",
    descEn: "Brand logo for Doss Karting tracks filled with speed and adrenaline."
  },
  {
    id: 14,
    src: NoosIcon,
    x: -1100,
    y: 450,
    width: 240,
    height: 240,
    rotate: -5,
    titleAr: "شعار ونوس",
    titleEn: "Noos Brand Logo",
    descAr: "العلامة الترفيهية لـ ونوس التي توحد الفرح والمغامرات العائلية.",
    descEn: "The signature logo of Noos family adventure centers."
  },
  {
    id: 15,
    src: FizziaIcon,
    x: 1000,
    y: 650,
    width: 250,
    height: 250,
    rotate: 8,
    titleAr: "شعار مدينة ترامبولين فيزيا",
    titleEn: "Fizzia Trampoline Logo",
    descAr: "شعار فيزيا لمدن الترامبولين والقفز الحر والجاذبية المعاكسة.",
    descEn: "The official logo of Fizzia Trampoline & active entertainment parks."
  },
  {
    id: 16,
    src: StudioLogo,
    x: 0,
    y: 0,
    width: 220,
    height: 220,
    rotate: 0,
    titleAr: "شعار ستوديو ملاهي",
    titleEn: "Malahi Studio Logo",
    descAr: "الهوية البصرية الرسمية لمجموعة ملاهي الرائدة في قطاع الترفيه.",
    descEn: "Official visual identity of Malahi, the leading entertainment studio."
  }
];

export default function About() {
  const { language } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("story");
  const [activeCategory, setActiveCategory] = useState<"all" | "spatial" | "layout" | "production">("all");
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const [activeBrandId, setActiveBrandId] = useState("lamby");

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [activePhoto, setActivePhoto] = useState<CanvasItem | null>(null);
  const controls = useAnimation();

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.15, 2));
  };
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.15, 0.45));
  };
  const handleRecenter = () => {
    setZoom(1);
    controls.start({ x: 0, y: 0, scale: 1 });
  };

  const canvasItems = canvasItemsList(
    Image1,
    Image2,
    Image3,
    Image4,
    ConceptDesignImg,
    LayoutPlanningImg,
    FabricationImg,
    LambyChar,
    DossChar,
    NoosChar,
    FizziaChar,
    LambyIcon,
    DossIcon,
    NoosIcon,
    FizziaIcon,
    StudioLogo
  );

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredBrandLogo, setHoveredBrandLogo] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const orderedBrands = [
    brandThemes.find(b => b.id === 'fizzia'),
    brandThemes.find(b => b.id === 'noos'),
    brandThemes.find(b => b.id === 'doss'),
    brandThemes.find(b => b.id === 'lamby'),
  ].filter(Boolean) as BrandTheme[];

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  // Hook up timeline scroll progress (align draw to center of viewport)
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const activeBrand = brandThemes.find(b => b.id === activeBrandId) || brandThemes[0];
  const filteredProjects = projects.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const processSteps = language === 'ar' ? [
    { title: "تموضع استراتيجي", image: Image2 },
    { title: "مواقع ممتازة", image: Image1 },
    { title: "تجربة متصلة", image: Image3 },
    { title: "جاذبية واسعة", image: Image1 },
    { title: "زيارات متكررة", image: Image2 },
  ] : [
    { title: "Strategic Positioning", image: Image2 },
    { title: "Prime Spot", image: Image1 },
    { title: "Connected Experience", image: Image3 },
    { title: "Broad Appeal", image: Image1 },
    { title: "Repeat Visits", image: Image2 },
  ];

  const t = {
    ar: {
      storyTab: "قصتنا وقيمنا",
      journeyTab: "مسيرتنا التاريخية",
      studioTab: "ستوديو ملاهي",
      identityTab: "الهوية البصرية",
      contactTab: "اتصل بنا",

      journeyBadge: "كيان واحد قوي",
      journeyTitle: "كيان واحد",
      journeySubtitle: "مجموعة ملاهي المتكاملة",
      journeyDesc: "اتحاد استراتيجي يدمج عقودًا من الخبرة لتشكيل مستقبل الترفيه السعودي. من البداية عام 1994 إلى الاندماج الضخم في عام 2022، نرسم السعادة في جميع أنحاء المملكة.",
      visionTitle: "رؤيتنا الموحدة",
      visionDesc: "من خلال دمج جميع العمليات تحت مجلس إدارة استراتيجي واحد، تبسط ملاهي العمليات التشغيلية، وتزيد من قابلية التوسع، وتدخل مفاهيم عالمية فاخرة في المشهد المحلي. نحن كيان واحد يحركه هدف واحد: ابتكار الفرح.",

      studioBadge: "تصميم وهندسة الفرح",
      studioTitle: "ستوديو ملاهي الإبداعي",
      studioDesc: "ستوديو التصميم والتخطيط الهندسي المخصص للشركة. نقوم بتصميم وبناء المخططات وهندسة المكونات الهيكلية الترفيهية بمعايير عالمية لضمان أقصى درجات الأمان والتشغيل المربح.",
      studioCategories: [
        { id: "all", label: "كل الخدمات" },
        { id: "spatial", label: "تصميم المساحات" },
        { id: "layout", label: "التخطيط الهيكلي" },
        { id: "production", label: "التصنيع والتركيب" },
      ],
      capabilitiesTitle: "قدراتنا الهندسية",
      cap1Title: "رسم الأفكار الإبداعية",
      cap1Desc: "صياغة إبداعية ومخططات ثلاثية الأبعاد للمدن الترفيهية.",
      cap1Sub: "الرؤية الإبداعية",
      cap2Title: "تخطيط المساحات",
      cap2Desc: "توزيع استراتيجي للمساحات لزيادة الطاقة الاستيعابية والتدفق المالي.",
      cap2Sub: "الهندسة الفراغية",
      cap3Title: "التصنيع والإنتاج",
      cap3Desc: "تصنيع الهياكل الحديدية والألعاب الترفيهية بأعلى معايير السلامة العالمية.",
      cap3Sub: "التصنيع والتشييد",
      cap4Title: "التركيب والتشغيل",
      cap4Desc: "تجهيز كامل للمواقع وإطلاق آمن للتشغيل تحت إشراف هندسي متكامل.",
      cap4Sub: "التسليم والتشغيل",

      identityBadge: "التعبير البصري عن الفرح",
      identityTitle: "الهوية البصرية وعلاماتنا",
      identityDesc: "تتمحور هويتنا حول فلسفة وشعار \"رسم السعادة\". تم تصميم وتنسيق الشعارات، شخصيات التميمة، ولوحات الألوان بعناية لبث الحماس والطاقة الإيجابية والبهجة في قلوب ضيوفنا.",
      colorPaletteTitle: "علاماتنا الترفيهية",
      exploreBtn: "اكتشف التجربة ←",
      mascotTitle: "تمائم العروض الترفيهية",
      valuesLabel: "القيم الأساسية",
      philTitle: "فلسفتنا التصميمية",
      philDesc: "تم بناء شعار ملاهي حول شبكة هندسية نظيفة توحي بالاستقرار والتميز الدولي. من خلال الحفاظ على معايير تصميم أنيقة وترك تمائم العلامات التجارية تقود تجربة العملاء، تحقق ملاهي التوازن المثالي بين الهوية المؤسسية والجاذبية الترفيهية الاستهلاكية.",
      galleryCta: "استكشف الفضاء البصري",
      galleryDesc: "استكشف عالم ملاهي من خلال لوحة تفاعلية ثرية بالصور",
      galleryClose: "إغلاق المعرض",
      galleryRecenter: "إعادة التمركز",
      galleryInstruction: "اسحب للتصفح في أي اتجاه • انقر على الصورة للتفاصيل"
    },
    en: {
      storyTab: "Our Story & Values",
      journeyTab: "Our History",
      studioTab: "Malahi Studio",
      identityTab: "Brand Identity",
      contactTab: "Contact Us",
 
      journeyBadge: "One Unified Powerhouse",
      journeyTitle: "One Entity",
      journeySubtitle: "Malahi Combined Group",
      journeyDesc: "A strategic union merging decades of experience to shape the future of Saudi entertainment. From 1994's foundation to the massive 2022 merger, we draw happiness nationwide.",
      visionTitle: "Our Single Vision",
      visionDesc: "By integrating all operations under one strategic board, Malahi simplifies processes, increases scalability, and introduces premium global concepts into the local landscape. We are one entity driven by a single purpose: to innovate joy.",
 
      studioBadge: "Engineering Play & Wonder",
      studioTitle: "Malahi Studio",
      studioDesc: "Our specialized in-house design and spatial planning studio. We engineer visuals, layouts, and manufacture high-standard structural components to create safe and unforgettable entertainment environments.",
      studioCategories: [
        { id: "all", label: "All Services" },
        { id: "spatial", label: "Spatial Design" },
        { id: "layout", label: "Layout Planning" },
        { id: "production", label: "Production & Build" },
      ],
      capabilitiesTitle: "Our Capabilities",
      cap1Title: "Concept Designing",
      cap1Desc: "Creative drafting and 3D visual concepts of play-parks.",
      cap1Sub: "Creative Vision",
      cap2Title: "Layout Planning",
      cap2Desc: "Strategic space allocation to maximize capacity and cashflow.",
      cap2Sub: "Spatial Layout",
      cap3Title: "Fabrication & Build",
      cap3Desc: "Manufacturing structures under certified global safety standards.",
      cap3Sub: "Production & Build",
      cap4Title: "Setup & Operations",
      cap4Desc: "Full on-site installation and safe operational launch.",
      cap4Sub: "Launch & Operations",
 
      identityBadge: "Expressing Joy Visually",
      identityTitle: "Brand Identity & Entertainment Worlds",
      identityDesc: "Our identity is centered around the slogan \"Draw Happiness\". Every logo, mascot, and color palette has been carefully curated to invoke positive emotions, excitement, and energy.",
      colorPaletteTitle: "Our Entertainment Brands",
      exploreBtn: "Explore Experience →",
      mascotTitle: "Brand Mascots",
      valuesLabel: "Core Values",
      philTitle: "Our Philosophy",
      philDesc: "The brand logo is built around clean geometric grids, portraying stability and international excellence. By maintaining a clean design code and letting brand mascots lead our customer interaction points, Malahi strikes the perfect balance between professional corporate identity and playful consumer attraction.",
      galleryCta: "Explore Visual Space",
      galleryDesc: "Explore the world of Malahi through a rich interactive canvas",
      galleryClose: "Close Gallery",
      galleryRecenter: "Recenter Canvas",
      galleryInstruction: "Drag to pan in any direction • Click any photo for details"
    }
  }[language];

  const handleTabClick = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120; // Offset for navbar and sticky tabbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const capabilities = [
    {
      id: 1,
      title: t.cap1Title,
      subtitle: t.cap1Sub,
      desc: t.cap1Desc,
      image: ConceptDesignImg,
      icon: Paintbrush,
      bgColor: "bg-[#C5FF4A]", // Lime Green
      left: "13%",
      top: "28%",
      rotate: "-5deg",
    },
    {
      id: 2,
      title: t.cap2Title,
      subtitle: t.cap2Sub,
      desc: t.cap2Desc,
      image: LayoutPlanningImg,
      icon: Layout,
      bgColor: "bg-[#2D4059]", // Slate Blue
      left: "38%",
      top: "72%",
      rotate: "3deg",
    },
    {
      id: 3,
      title: t.cap3Title,
      subtitle: t.cap3Sub,
      desc: t.cap3Desc,
      image: FabricationImg,
      icon: Wrench,
      bgColor: "bg-[#A1D6FF]", // Sky Blue
      left: "63%",
      top: "28%",
      rotate: "-3deg",
    },
    {
      id: 4,
      title: t.cap4Title,
      subtitle: t.cap4Sub,
      desc: t.cap4Desc,
      image: Image4,
      icon: Rocket,
      bgColor: "bg-[#FF9BE0]", // Pastel Pink
      left: "87%",
      top: "72%",
      rotate: "5deg",
    },
  ];

  return (
    <div className="bg-[#0c0c0c] min-h-screen text-[#ebebeb] font-sans w-full overflow-x-hidden flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative pt-40 pb-20 px-6 w-full min-h-[70vh] flex flex-col items-center justify-center -mt-20 overflow-hidden">
        {/* Fine grid dot pattern */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-40" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)", 
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)"
          }} 
        />

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-[#00AC79]/5 rounded-full blur-[100px] pointer-events-none z-0 animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute top-[35%] right-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none z-0 animate-[pulse_8s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0 animate-[pulse_10s_ease-in-out_infinite_2s]" />

        {/* Mobile Gallery */}
        <div className="md:hidden flex flex-row flex-wrap items-center justify-center gap-6 mb-16 z-20 w-full px-4">
          <div className="w-24 h-32 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-none border border-white/10" style={{ transform: "rotate(-8deg)" }}>
            <motion.img style={{ y: y1 }} src={Image1} alt="Gallery" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="w-32 h-40 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-none border border-white/10" style={{ transform: "rotate(6deg)", marginTop: "20px" }}>
            <motion.img style={{ y: y2 }} src={Image2} alt="Gallery" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="w-28 h-28 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-none border border-white/10" style={{ transform: "rotate(-4deg)" }}>
            <motion.img style={{ y: y3 }} src={Image3} alt="Gallery" className="w-full h-full object-cover grayscale" />
          </div>
        </div>

        {/* Huge Text */}
        <motion.h1
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-[18vw] md:text-[12vw] leading-[0.8] font-black tracking-tighter text-center z-40 pointer-events-none mt-16 drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white uppercase whitespace-nowrap font-sans"
        >
          {language === 'ar' ? 'عن ملاهي' : 'about us'}
        </motion.h1>

        {/* Floating Images Gallery (creative random layout) */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-visible hidden md:flex items-center justify-center max-w-[1400px] mx-auto opacity-100 transition-opacity duration-700">
          {/* Card 1: Top Left */}
          <div className="absolute top-[8%] left-[2%] w-24 h-32 md:w-36 md:h-48 overflow-hidden opacity-90 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-none border border-white/10 hover:border-white/20 transition-all duration-500" style={{ transform: "rotate(-15deg)" }}>
            <motion.img style={{ y: y1 }} src={Image1} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
          </div>
          {/* Card 2: Mid Left */}
          <div className="absolute top-[40%] left-[2%] w-28 h-36 md:w-44 md:h-56 overflow-hidden opacity-100 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-none border border-white/10 hover:border-white/20 transition-all duration-500" style={{ transform: "rotate(12deg)" }}>
            <motion.img style={{ y: y2 }} src={Image2} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
          </div>
          {/* Card 3: Bottom Left */}
          <div className="absolute top-[72%] left-[2%] w-24 h-24 md:w-40 md:h-40 overflow-hidden opacity-80 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-none border border-white/10 hover:border-white/20 transition-all duration-500" style={{ transform: "rotate(-8deg)" }}>
            <motion.img style={{ y: y3 }} src={Image3} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
          </div>
          
          {/* Card 4: Top Right */}
          <div className="absolute top-[8%] right-[2%] w-28 h-36 md:w-40 md:h-56 overflow-hidden opacity-85 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-none border border-white/10 hover:border-white/20 transition-all duration-500" style={{ transform: "rotate(15deg)" }}>
            <motion.img style={{ y: y2 }} src={Image2} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
          </div>
          {/* Card 5: Mid Right */}
          <div className="absolute top-[40%] right-[2%] w-32 h-44 md:w-48 md:h-64 overflow-hidden opacity-100 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-none border border-white/10 hover:border-white/20 transition-all duration-500" style={{ transform: "rotate(-12deg)" }}>
            <motion.img style={{ y: y3 }} src={Image3} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
          </div>
          {/* Card 6: Bottom Right */}
          <div className="absolute top-[72%] right-[2%] w-28 h-28 md:w-44 md:h-44 overflow-hidden opacity-90 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-none border border-white/10 hover:border-white/20 transition-all duration-500" style={{ transform: "rotate(8deg)" }}>
            <motion.img style={{ y: y1 }} src={Image1} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
          </div>

          {/* Card 7: Top Center-Left */}
          <div className="absolute top-[3%] left-[30%] w-24 h-32 md:w-36 md:h-48 overflow-hidden opacity-80 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-none border border-white/10 hover:border-white/20 transition-all duration-500" style={{ transform: "rotate(5deg)" }}>
            <motion.img style={{ y: y2 }} src={ConceptDesignImg} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
          </div>
          {/* Card 8: Bottom Center-Right */}
          <div className="absolute top-[85%] right-[30%] w-32 h-24 md:w-48 md:h-36 overflow-hidden opacity-85 group cursor-pointer pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-none border border-white/10 hover:border-white/20 transition-all duration-500" style={{ transform: "rotate(-6deg)" }}>
            <motion.img style={{ y: y3 }} src={LayoutPlanningImg} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
          </div>
        </div>

        <div className="mt-24 mb-6 flex flex-col items-center gap-4 z-20">
          <button 
            onClick={() => setIsGalleryOpen(true)}
            className="group px-8 py-4 bg-white text-black hover:bg-neutral-100 transition-all duration-300 font-extrabold uppercase tracking-wider font-sans flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] cursor-pointer rounded-full border-0 text-xs md:text-sm hover:scale-[1.03]"
          >
            <span>{t.galleryCta}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">&rarr;</span>
          </button>
        </div>
      </section>

      {/* Sticky Sub-Navbar */}
      <div className="sticky top-[80px] z-30 bg-[#0c0c0c]/80 backdrop-blur-md border-y border-white/5 py-4 w-full flex justify-center">
        <div className="flex items-center justify-center gap-1.5 md:gap-6 flex-wrap px-4">
          {[
            { id: "story", label: t.storyTab },
            { id: "journey", label: t.journeyTab },
            { id: "studio", label: t.studioTab }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300 cursor-pointer font-sans
                ${activeTab === tab.id 
                  ? "bg-white text-black font-semibold shadow-lg scale-105" 
                  : "text-white/60 hover:text-white hover:bg-white/5"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Story & Introduction */}
      <div id="story" className="scroll-mt-32">
        {/* Introduction Paragraph */}
        <section className="w-full px-6 py-28 text-center z-10 relative overflow-hidden">
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
            {/* Ambient Background Glow behind the card */}
            <div className="absolute -inset-4 rounded-[3rem] bg-[#00AC79]/5 opacity-50 blur-3xl group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10 bg-neutral-900/50 backdrop-blur-xl p-10 md:p-16 rounded-[2.5rem] border border-white/10 group-hover:border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-all duration-500">
              <h2 className="text-2xl md:text-5xl font-sans font-medium tracking-tight leading-tight mb-8 text-white">
                {language === 'ar' ? (
                  "نحن أكبر مشغل للمراكز الترفيهية في المملكة، نصنع وجهات مميزة ومراكز تنبض بالحياة والسعادة."
                ) : (
                  "We are the Kingdom's largest entertainment operator, creating must-visit destinations and vibrant hubs."
                )}
              </h2>
              <div className="grid md:grid-cols-2 gap-10 text-sm text-start text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                {language === 'ar' ? (
                  <>
                    <p>
                      بكل فخر، نقود المشهد الترفيهي في المملكة، حيث رسخت ملاهي مكانتها كأكبر مشغل خلال موسم الرياض وفي بوليفارد سيتي. ومن خلال خبراتنا الطويلة، نجحنا في جلب تجارب لا تنسى لملايين الزوار من مختلف الأعمار.
                    </p>
                    <p>
                      إن التزامنا التام بتقديم مستويات ترفيه عالمية يجعلنا شريكاً محورياً في إعادة تشكيل مشهد الترفيه بالمنطقة. نحن لا نوفر الألعاب فحسب، بل نصمم المساحات والوجهات ونشغل مناطق ترفيهية متكاملة ذات عوائد عالية.
                    </p>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="w-full py-24 px-6 relative overflow-hidden bg-[#0c0c0c] border-t border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
          <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 relative z-10">
            {/* Left Side: Text List */}
            <div className="flex flex-col gap-12 md:gap-4 w-full md:w-1/2">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col gap-6" onMouseEnter={() => setActiveStepIndex(idx)}>
                  <div
                    className={`cursor-pointer transition-colors duration-500 font-sans font-bold text-4xl sm:text-5xl md:text-[80px] tracking-tight whitespace-nowrap
                      ${activeStepIndex === idx ? "text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                    style={{ lineHeight: "1.1" }}
                  >
                    {step.title}
                  </div>
                  {/* Mobile Image */}
                  <div className="md:hidden w-full aspect-square sm:aspect-[4/5] overflow-hidden bg-[#111] rounded-none relative shadow-2xl">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-all duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Image Display */}
            <div className="hidden md:flex w-1/2 justify-end">
              <div className="w-full max-w-lg aspect-[4/5] relative overflow-hidden bg-[#111] right-0 block shadow-2xl rounded-none border border-white/10">
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
      </div>

      {/* Section 2: Journey & Timeline (One Entity) */}
      <div id="journey" className="scroll-mt-32 border-t border-white/5 bg-[#0a0a0a] py-28 relative">
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#00AC79]/5 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <section className="relative px-6 max-w-4xl mx-auto w-full z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-sans">
              {t.journeyTitle}
              <span className="text-[#00AC79] text-2xl md:text-4xl block mt-2 font-sans font-medium">{t.journeySubtitle}</span>
            </h2>

            <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed font-sans">
              {t.journeyDesc}
            </p>
          </div>
        </section>

        {/* Timeline Container */}
        <section ref={timelineContainerRef} className="relative py-12 px-6 max-w-5xl mx-auto w-full z-10">
          {/* Inner milestones wrapper to bound the vertical timeline line */}
          <div className="relative pb-20">
            {/* Central Vertical Line (Desktop only) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block" />
            {/* Animated Central Progress Line */}
            <motion.div 
              style={{ scaleY }}
              className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#00AC79] -translate-x-1/2 origin-top hidden md:block"
            />

            <div className="space-y-16 md:space-y-24 relative">
              {milestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                const milestoneTitle = language === 'ar' ? milestone.titleAr : milestone.titleEn;
                const milestoneDesc = language === 'ar' ? milestone.descAr : milestone.descEn;

                return (
                  <div key={idx} className={`flex flex-col md:flex-row items-center justify-between w-full relative group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    {/* Year tag - Center */}
                    <motion.div 
                      initial={{ scale: 0.85, borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "#0c0c0c" }}
                      whileInView={{ scale: 1.15, borderColor: "#00AC79", backgroundColor: "rgba(0, 172, 121, 0.1)" }}
                      viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border flex items-center justify-center z-20 hidden md:flex shadow-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center">
                        <span className="text-xs font-black text-white font-sans">{milestone.year}</span>
                      </div>
                    </motion.div>

                    {/* Left/Right Card Container */}
                    <div className="w-full md:w-[45%]">
                      <motion.div
                        initial={{ opacity: 0.2, x: isEven ? 80 : -80, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="p-8 rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl transition-all duration-500 relative overflow-hidden group/card text-start hover:border-[#00AC79]/30 hover:bg-neutral-900/60 shadow-md"
                      >
                        {/* Ambient background glow inside cards (subtle white) */}
                        <div className="absolute -inset-10 bg-gradient-to-br from-white/0 to-white/0 group-hover/card:to-white/[0.015] opacity-0 group-hover/card:opacity-100 transition-all duration-700 blur-2xl pointer-events-none" />

                        {/* Mobile Year Badge */}
                        <div className="flex md:hidden items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-white/10 text-white font-bold text-xs rounded-full font-mono">{milestone.year}</span>
                          <div className="h-[1px] bg-white/10 flex-1" />
                        </div>

                        <div className="flex items-start gap-4 mb-6 relative z-10">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                            {milestone.icon}
                          </div>
                          <div className="flex-1 text-start">
                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight font-sans">{milestoneTitle}</h3>
                          </div>
                        </div>

                        <div className="space-y-4 text-start border-t border-white/5 pt-4 relative z-10">
                          <p className="text-sm text-neutral-300 leading-relaxed font-sans font-normal">
                            {milestoneDesc}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Empty spacing box for opposite side */}
                    <div className="w-[45%] hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Vision Box (Interacts with the central vertical line and animates dynamically) */}
          <div className="pt-8 px-6 max-w-4xl mx-auto w-full relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0.2, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-neutral-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-lg"
            >
              {/* Expanding Top Green Line starting from center (connecting with vertical timeline line) */}
              <motion.div 
                initial={{ width: "0%", left: "50%" }}
                whileInView={{ width: "100%", left: "0%" }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ delay: 0.1, duration: 0.7, ease: "easeInOut" }}
                className="absolute top-0 h-[2px] bg-[#00AC79]"
              />
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight font-sans">{t.visionTitle}</h2>
              <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
                {t.visionDesc}
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Section 3: Malahi Studio (Design & Engineering) */}
      <div id="studio" className="scroll-mt-32 border-t border-white/5 py-28 relative bg-[#0c0c0c]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
        
        <section className="relative px-6 max-w-4xl mx-auto w-full z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-sans">
              {t.studioTitle}
            </h2>

            <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed font-sans">
              {t.studioDesc}
            </p>
          </div>
        </section>

        {/* Categories & Grid */}
        <section className="py-8 px-6 max-w-6xl mx-auto w-full z-10">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {t.studioCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border duration-300 cursor-pointer font-sans
                  ${activeCategory === cat.id 
                    ? "bg-white text-black border-white shadow-[0_8px_25px_rgba(255,255,255,0.25)] scale-105" 
                    : "bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => {
                const projectTitle = language === 'ar' ? p.titleAr : p.titleEn;
                const projectDesc = language === 'ar' ? p.descAr : p.descEn;
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onMouseEnter={() => setHoveredProjectId(p.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    className="bg-neutral-900 rounded-none border border-white/10 overflow-hidden relative group aspect-[4/5] shadow-2xl transition-all duration-500 hover:border-white/30"
                  >
                    <img 
                      src={p.image} 
                      alt={projectTitle}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-[1deg] grayscale group-hover:grayscale-0" 
                    />
                    
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent z-10" />

                    {/* Content Block */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-start">
                      <div className="space-y-3">
                        <span className="px-3 py-1 bg-white/10 text-white font-bold text-[10px] uppercase rounded-full tracking-wider border border-white/10 w-fit block font-sans">
                          {p.category}
                        </span>
                        
                        <h3 className="text-xl font-bold text-white tracking-tight leading-tight font-sans">{projectTitle}</h3>

                        {/* Expandable description on hover */}
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: hoveredProjectId === p.id ? "auto" : 0,
                            opacity: hoveredProjectId === p.id ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-white/10 pt-3 mt-2"
                        >
                          <p className="text-xs text-neutral-300 leading-relaxed text-start font-sans font-normal">{projectDesc}</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Engineering Excellence Panel (Roadmap Layout) */}
        <section className="pt-24 pb-32 px-6 max-w-6xl mx-auto w-full z-10 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight font-sans">
            {t.capabilitiesTitle}
          </h2>
          
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mb-16 leading-relaxed font-sans">
            {language === 'ar' 
              ? "من الفكرة والتخطيط الإبداعي ثلاثي الأبعاد إلى التصنيع والتركيب والتشغيل الآمن بالكامل." 
              : "From concept design and creative 3D models to certified manufacturing, installation, and safe operations."}
          </p>

          {/* Desktop Visual Map (hidden on mobile) */}
          <div className="hidden md:block relative w-full h-[650px] mt-12 bg-[#0c0c0c] rounded-[3rem] p-8 overflow-visible">
            
            {/* SVG Connecting Dashed Track */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10" 
              viewBox="0 0 1000 600" 
              preserveAspectRatio="none"
            >
              {/* Outer Glow Path */}
              <path
                d="M 50 170 L 130 170 C 180 170, 220 300, 255 300 C 290 300, 330 430, 380 430 C 440 430, 470 300, 505 300 C 540 300, 570 170, 630 170 C 680 170, 715 300, 750 300 C 785 300, 820 430, 870 430 L 950 430"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="6"
              />
              {/* Inner Dashed Path */}
              <path
                d="M 50 170 L 130 170 C 180 170, 220 300, 255 300 C 290 300, 330 430, 380 430 C 440 430, 470 300, 505 300 C 540 300, 570 170, 630 170 C 680 170, 715 300, 750 300 C 785 300, 820 430, 870 430 L 950 430"
                fill="none"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="2.5"
                strokeDasharray="8 8"
              />
            </svg>

            {/* Path Decorators: Consistent Malahi Green Icon Circles sitting directly on the line in the gaps */}
            <div className="absolute left-[25.5%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-11 h-11 rounded-full bg-[#00AC79] text-black flex items-center justify-center shadow-md border border-black/10 hover:scale-110 transition-transform duration-300"
              >
                <PencilRuler className="w-5 h-5 text-black" />
              </motion.div>
            </div>

            <div className="absolute left-[50.5%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="w-11 h-11 rounded-full bg-[#00AC79] text-black flex items-center justify-center shadow-md border border-black/10 hover:scale-110 transition-transform duration-300"
              >
                <Hammer className="w-5 h-5 text-black" />
              </motion.div>
            </div>

            <div className="absolute left-[75%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-11 h-11 rounded-full bg-[#00AC79] text-black flex items-center justify-center shadow-md border border-black/10 hover:scale-110 transition-transform duration-300"
              >
                <Sparkles className="w-5 h-5 text-black" />
              </motion.div>
            </div>

            {/* Asymmetric Floating Cards */}
            {capabilities.map((cap) => {
              return (
                <div
                  key={cap.id}
                  className="absolute z-20 group"
                  style={{
                    left: cap.left,
                    top: cap.top,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: 0,
                      y: -5,
                      boxShadow: "0 30px 60px -15px rgba(255, 255, 255, 0.12)"
                    }}
                    initial={{ rotate: cap.rotate }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-[175px] h-[245px] bg-transparent rounded-none p-0 relative shadow-2xl cursor-pointer flex flex-col justify-between overflow-visible text-start"
                  >
                    {/* Card Image Container (Full borderless image style) */}
                    <div className="w-full h-full overflow-hidden rounded-none relative shadow-md">
                      <img
                        src={cap.image}
                        alt={cap.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-neutral-950/5" />
                    </div>

                    {/* Overlapping White Label block */}
                    <div className="bg-white text-black py-2.5 px-3 rounded-2xl shadow-xl absolute left-3 right-3 bottom-[-14px] z-20 text-center border border-neutral-100 flex flex-col items-center justify-center min-h-[64px]">
                      <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-sans font-bold leading-none mb-1">
                        {cap.subtitle}
                      </p>
                      <p className="text-xs font-black text-neutral-900 font-sans tracking-tight leading-tight">
                        {cap.title}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Responsive Mobile Layout (stacked layout) */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
            {capabilities.map((cap) => {
              return (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-[280px] mx-auto h-[320px] bg-transparent rounded-none p-0 relative shadow-xl text-start flex flex-col justify-between mb-8"
                >
                  <div className="w-full h-full overflow-hidden rounded-none relative shadow-md">
                    <img
                      src={cap.image}
                      alt={cap.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-neutral-950/5" />
                  </div>

                  <div className="bg-white text-black py-3.5 px-5 rounded-[1.8rem] shadow-xl absolute left-4 right-4 bottom-[-16px] z-20 text-center border border-neutral-100 flex flex-col items-center justify-center min-h-[70px]">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-sans font-bold leading-none mb-1">{cap.subtitle}</p>
                    <h4 className="font-extrabold text-sm font-sans text-neutral-900 tracking-tight leading-snug">{cap.title}</h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>




      {/* Interactive Gallery Canvas Overlay */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-[#0c0c0c]/98 backdrop-blur-md overflow-hidden flex flex-col selection:bg-white selection:text-black"
          >
            {/* Header controls overlay */}
            <div className="absolute top-0 left-0 right-0 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-[170] bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/10 pointer-events-none">
              <div className="pointer-events-auto text-start">
                <h2 className="text-xl font-extrabold tracking-tight text-white font-sans uppercase">
                  {language === 'ar' ? "فضاء ملاهي التفاعلي" : "Malahi Interactive Space"}
                </h2>
                <p className="text-[10px] text-white/50 font-semibold tracking-wider font-sans uppercase mt-0.5">
                  {t.galleryInstruction}
                </p>
              </div>

              <div className="flex items-center gap-3 pointer-events-auto">
                <button
                  onClick={handleRecenter}
                  title={t.galleryRecenter}
                  className="w-12 h-12 bg-[#1B1B1B]/80 backdrop-blur-md border border-white/20 text-[#ebebeb] rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all shadow-xl"
                >
                  <RotateCcw size={16} />
                </button>
                <div className="flex items-center gap-3 bg-[#1B1B1B]/80 backdrop-blur-md border border-white/20 px-4 h-12 rounded-full text-xs text-[#ebebeb] shadow-xl">
                  <button 
                    onClick={handleZoomOut} 
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:text-black text-white/70 hover:text-black transition-colors cursor-pointer"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="font-mono w-10 text-center font-bold text-xs text-white">{Math.round(zoom * 100)}%</span>
                  <button 
                    onClick={handleZoomIn} 
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:text-black text-white/70 hover:text-black transition-colors cursor-pointer"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
                <button
                  onClick={() => setIsGalleryOpen(false)}
                  className="bg-white text-[#1B1B1B] text-xs font-bold tracking-wider rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center shrink-0 whitespace-nowrap px-6 h-12 cursor-pointer shadow-xl border-0 font-sans"
                >
                  <X size={15} className="mr-1.5" />
                  <span>{t.galleryClose}</span>
                </button>
              </div>
            </div>

            {/* Draggable Canvas Viewport */}
            <div className="flex-1 w-full h-full overflow-hidden relative flex items-center justify-center bg-[#070707]">
              {/* Outer drag boundary helper grid - Restored dot pattern */}
              <div className="absolute inset-0 bg-[#070707] z-0 pointer-events-none" 
                   style={{
                     backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
                     backgroundSize: "40px 40px"
                   }} 
              />
              
              <motion.div
                drag
                dragConstraints={{
                  left: -1200,
                  right: 1200,
                  top: -1200,
                  bottom: 1200
                }}
                dragElastic={0.15}
                animate={controls}
                style={{ scale: zoom }}
                className="absolute w-[3000px] h-[3000px] cursor-grab active:cursor-grabbing select-none overflow-visible flex items-center justify-center bg-transparent"
              >
                {/* Center Glow - Restored with new neon green theme */}
                <div className="absolute w-[800px] h-[800px] bg-[#00FF87]/5 rounded-full blur-[150px] pointer-events-none z-0" />

                {/* Canvas Gallery Items - Pure images with premium spring hover transitions */}
                {canvasItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="absolute cursor-pointer pointer-events-auto hover:z-50 select-none overflow-hidden rounded-none shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10"
                    style={{
                      left: 1500 + item.x - item.width / 2,
                      top: 1500 + item.y - item.height / 2,
                      width: item.width,
                      height: item.height,
                      transform: `rotate(${item.rotate}deg)`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhoto(item);
                    }}
                    whileHover={{ 
                      scale: 1.08, 
                      rotate: item.rotate * 0.3,
                      borderColor: "rgba(0, 255, 135, 0.4)",
                      boxShadow: "0 30px 65px rgba(0,0,0,0.9), 0 0 30px rgba(0, 255, 135, 0.3)" 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src={item.src}
                      alt={language === 'ar' ? item.titleAr : item.titleEn}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Instruction tooltip overlay at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[160] px-6 py-2.5 bg-[#1B1B1B]/95 border border-white/10 backdrop-blur-md text-[10px] text-white/70 tracking-wider uppercase font-sans pointer-events-none rounded-full flex items-center gap-2 shadow-xl">
              <Move size={12} className="text-[#00FF87]" />
              <span>{t.galleryInstruction}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox / Zoom-in detail Overlay */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-neutral-900 border border-white/10 flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer text-white z-50 rounded-none border-0"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full bg-neutral-950 border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row cursor-default rounded-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Box */}
              <div className="flex-1 max-h-[60vh] md:max-h-[80vh] bg-black flex items-center justify-center">
                <img
                  src={activePhoto.src}
                  alt={language === 'ar' ? activePhoto.titleAr : activePhoto.titleEn}
                  className="max-w-full max-h-full w-auto h-auto object-contain select-none"
                />
              </div>

              {/* Detail Sidebar */}
              <div className="w-full md:w-[350px] p-8 bg-neutral-950 shrink-0 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between text-start font-sans">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold tracking-widest text-[#00AC79] uppercase font-sans">
                      {language === 'ar' ? "تفاصيل المعرض" : "Gallery details"}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white leading-tight font-sans">
                      {language === 'ar' ? activePhoto.titleAr : activePhoto.titleEn}
                    </h3>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed font-sans font-normal">
                    {language === 'ar' ? activePhoto.descAr : activePhoto.descEn}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/10 mt-12 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500 font-mono">ID: MLH-0{activePhoto.id}</span>
                  <button
                    onClick={() => setActivePhoto(null)}
                    className="px-6 py-2.5 bg-white text-black hover:bg-[#00AC79] hover:text-white font-bold text-xs uppercase transition-colors rounded-none cursor-pointer font-sans border-0"
                  >
                    {language === 'ar' ? "رجوع" : "Back"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
