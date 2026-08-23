// Real Estate Theme Definitions with Exact Color Mapping
export const LUXURY_THEMES = [
  {
    id: 'sale-gold',
    name: 'شامبين وذهب ملكي',
    categoryLabel: 'للبيع (VIP)',
    borderColor: '#d4af37',
    borderGlow: 'rgba(212, 175, 55, 0.45)',
    glassBg: 'rgba(20, 16, 10, 0.62)',
    accent: '#ffd700',
    heroUnitColor: '#f6d365',
    pillBg: 'linear-gradient(135deg, rgba(212, 175, 55, 0.28), rgba(0, 0, 0, 0.75))',
    pillBorder: 'rgba(212, 175, 55, 0.5)',
    pillTextColor: '#fff7d6',
    diamondColor: '#ffd700',
    dividerColor: 'rgba(212, 175, 55, 0.4)',
    shimmerClass: 'text-shimmer-gold',
    glossyGradient: 'linear-gradient(135deg, #ffffff 0%, #ffd700 35%, #ffffff 50%, #d4af37 75%, #aa771c 100%)',
    matteColor: '#fffdf5'
  },
  {
    id: 'rent-navy',
    name: 'كحلي وبلاتينيوم',
    categoryLabel: 'للإيجار',
    borderColor: '#93c5fd',
    borderGlow: 'rgba(59, 130, 246, 0.35)',
    glassBg: 'rgba(10, 18, 32, 0.65)',
    accent: '#60a5fa',
    heroUnitColor: '#93c5fd',
    pillBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(10, 18, 32, 0.8))',
    pillBorder: 'rgba(147, 197, 253, 0.45)',
    pillTextColor: '#eff6ff',
    diamondColor: '#60a5fa',
    dividerColor: 'rgba(147, 197, 253, 0.35)',
    shimmerClass: 'text-shimmer-chrome',
    glossyGradient: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 35%, #ffffff 50%, #60a5fa 75%, #2563eb 100%)',
    matteColor: '#f8fafc'
  },
  {
    id: 'furnished-bronze',
    name: 'برونز وجرافيت',
    categoryLabel: 'مفروش فاخر',
    borderColor: '#ca8a04',
    borderGlow: 'rgba(202, 138, 4, 0.35)',
    glassBg: 'rgba(24, 18, 12, 0.65)',
    accent: '#eab308',
    heroUnitColor: '#facc15',
    pillBg: 'linear-gradient(135deg, rgba(202, 138, 4, 0.25), rgba(24, 18, 12, 0.8))',
    pillBorder: 'rgba(234, 179, 8, 0.45)',
    pillTextColor: '#fefce8',
    diamondColor: '#eab308',
    dividerColor: 'rgba(202, 138, 4, 0.35)',
    shimmerClass: 'text-shimmer-bronze',
    glossyGradient: 'linear-gradient(135deg, #ffffff 0%, #facc15 35%, #ffffff 50%, #ca8a04 75%, #854d0e 100%)',
    matteColor: '#fefce8'
  },
  {
    id: 'commercial-cyan',
    name: 'سماوي وأزرق معماري',
    categoryLabel: 'تجاري وإداري',
    borderColor: '#38bdf8',
    borderGlow: 'rgba(56, 189, 248, 0.4)',
    glassBg: 'rgba(8, 24, 38, 0.65)',
    accent: '#38bdf8',
    heroUnitColor: '#7dd3fc',
    pillBg: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(8, 24, 38, 0.8))',
    pillBorder: 'rgba(56, 189, 248, 0.45)',
    pillTextColor: '#f0f9ff',
    diamondColor: '#38bdf8',
    dividerColor: 'rgba(56, 189, 248, 0.35)',
    shimmerClass: 'text-shimmer-teal',
    glossyGradient: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 35%, #ffffff 50%, #0284c7 75%, #0369a1 100%)',
    matteColor: '#f0f9ff'
  },
  {
    id: 'medical-emerald',
    name: 'زمرد وتيفاني طبي',
    categoryLabel: 'طبي وعيادات',
    borderColor: '#10b981',
    borderGlow: 'rgba(16, 185, 129, 0.35)',
    glassBg: 'rgba(8, 28, 20, 0.65)',
    accent: '#34d399',
    heroUnitColor: '#6ee7b7',
    pillBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(8, 28, 20, 0.8))',
    pillBorder: 'rgba(52, 211, 153, 0.45)',
    pillTextColor: '#ecfdf5',
    diamondColor: '#34d399',
    dividerColor: 'rgba(16, 185, 129, 0.35)',
    shimmerClass: 'text-shimmer-teal',
    glossyGradient: 'linear-gradient(135deg, #ffffff 0%, #34d399 35%, #ffffff 50%, #059669 75%, #065f46 100%)',
    matteColor: '#ecfdf5'
  },
  {
    id: 'auction-ruby',
    name: 'ياقوت ملكي',
    categoryLabel: 'مزاد علني / فرصة',
    borderColor: '#f43f5e',
    borderGlow: 'rgba(244, 63, 94, 0.4)',
    glassBg: 'rgba(30, 10, 16, 0.65)',
    accent: '#fb7185',
    heroUnitColor: '#fda4af',
    pillBg: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25), rgba(30, 10, 16, 0.8))',
    pillBorder: 'rgba(251, 113, 133, 0.45)',
    pillTextColor: '#fff1f2',
    diamondColor: '#fb7185',
    dividerColor: 'rgba(244, 63, 94, 0.35)',
    shimmerClass: 'text-shimmer-ruby',
    glossyGradient: 'linear-gradient(135deg, #ffffff 0%, #fb7185 35%, #ffffff 50%, #e11d48 75%, #9f1239 100%)',
    matteColor: '#fff1f2'
  }
];

export const DIVIDER_STYLES = [
  { id: 'tag', name: 'شارة مدمجة (VIP)' },
  { id: 'fading', name: 'تلاشي تدريجي' },
  { id: 'double', name: 'خط معماري مزدوج' },
  { id: 'beam', name: 'شعاع نيون' },
  { id: 'micro-sparkle', name: 'نجمة ماسية' },
  { id: 'dotted', name: 'نقاط كلاسيكية' },
  { id: 'none', name: 'بدون فواصل' }
];

export const BUILTIN_FONTS = [
  { id: 'Lalezar', name: 'لاله زار (عريض)', fontClass: "'Lalezar', cursive", type: 'builtin' },
  { id: 'Aref Ruqaa', name: 'عارف رقعة (ديواني)', fontClass: "'Aref Ruqaa', serif", type: 'builtin' },
  { id: 'Noto Kufi Arabic', name: 'نوتو كوفي (معماري)', fontClass: "'Noto Kufi Arabic', sans-serif", type: 'builtin' },
  { id: 'El Messiri', name: 'المسيري (فني)', fontClass: "'El Messiri', sans-serif", type: 'builtin' },
  { id: 'Amiri', name: 'أميري (رسمي)', fontClass: "'Amiri', serif", type: 'builtin' },
  { id: 'Changa', name: 'تشانجا (مضلع)', fontClass: "'Changa', sans-serif", type: 'builtin' },
  { id: 'Alexandria', name: 'الإسكندرية (مودرن)', fontClass: "'Alexandria', sans-serif", type: 'builtin' },
  { id: 'Cairo', name: 'كايرو (متزن)', fontClass: "'Cairo', sans-serif", type: 'builtin' },
  { id: 'Plus Jakarta Sans', name: 'Jakarta (إنجليزي)', fontClass: "'Plus Jakarta Sans', sans-serif", type: 'builtin' }
];

export const QUICK_TEXT_PRESETS = [
  { title: 'شقة للبيع', heroNumber: '185', heroUnit: 'م²', bottomText: 'حي النرجس', subtitle: 'المساحة' },
  { title: 'فيلا مودرن', heroNumber: '375', heroUnit: 'م²', bottomText: 'حي الياسمين', subtitle: 'المساحة الإجمالية' },
  { title: 'دور فاخر للإيجار', heroNumber: '4', heroUnit: 'غرف', bottomText: 'حي الملقا', subtitle: 'عدد الغرف' },
  { title: 'مكتب تجاري', heroNumber: '120', heroUnit: 'م²', bottomText: 'طريق الملك فهد', subtitle: 'المساحة الصافية' },
  { title: 'مجمع عيادات', heroNumber: '6', heroUnit: 'أدوار', bottomText: 'شارع التحلية', subtitle: 'الترخيص الطبي' }
];

export const DEFAULT_GLASS_CARD_DATA = {
  title: 'شقة للبيع',
  titleFont: 'Lalezar',
  titleSize: 38,
  titleColor: '#ffffff',
  titleShimmer: false,

  showSubtitle: false,
  subtitle: 'المساحة',
  subtitleFont: 'Alexandria',
  subtitleSize: 18,
  subtitleColor: '',

  heroNumber: '185',
  heroUnit: 'م²',
  heroFont: 'Lalezar',
  heroNumberSize: 76,
  heroUnitSize: 28,
  heroNumberColor: '#ffffff',
  heroUnitColor: '',
  heroShimmer: false,

  bottomText: 'حي النرجس',
  bottomFont: 'Alexandria',
  bottomSize: 18,
  bottomTextColor: '#ffffff',
  bottomPillStyle: 'pill',

  showDividers: true,
  dividerStyle: 'tag',
  dividerTagText: 'VIP',
  dividerOpacity: 75,
  dividerCustomColor: '',

  boxWidth: 84,
  boxPaddingY: 20,
  boxBlur: 20,
  boxOpacity: 60,
  verticalPosition: 50,
  textFinish: 'glossy',

  borderWidth: 1.5,
  borderRadius: 32,
  borderColorMode: 'theme',
  customBorderColor: '#d4af37',
  borderGlowIntensity: 75,
  glowColorMode: 'theme',
  customGlowColor: '#d4af37',
  borderStyle: 'solid'
};

export const SAMPLE_IMAGES = [
  { id: 'luxury-villa', name: 'فيلا فاخرة', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1080&q=80' },
  { id: 'modern-apartment', name: 'شقة عصرية', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1080&q=80' },
  { id: 'penthouse-night', name: 'بنتهاوس ليلي', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1080&q=80' },
  { id: 'commercial-tower', name: 'برج تجاري', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1080&q=80' }
];

export const OVERLAY_COLOR_PRESETS = [
  { id: 'dark-navy', name: 'كحلي داكن', color: '#090d16', defaultOpacity: 45 },
  { id: 'rich-black', name: 'أسود فحمي', color: '#050505', defaultOpacity: 40 },
  { id: 'champagne-gold', name: 'ذهبي خافت', color: '#2c220f', defaultOpacity: 35 },
  { id: 'emerald-night', name: 'زمردي ليلي', color: '#091612', defaultOpacity: 40 }
];

export const IMAGE_FILTER_PRESETS = [
  { id: 'none', name: 'طبيعي' },
  { id: 'warm', name: 'دافئ وذهبي' },
  { id: 'cool', name: 'بارد وعصري' },
  { id: 'vivid', name: 'حيوي وعميق' },
  { id: 'moody', name: 'سينمائي غامق' },
  { id: 'monochrome', name: 'أبيض وأسود' }
];
