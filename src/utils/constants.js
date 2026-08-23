export const BUILTIN_FONTS = [
  { id: 'Alexandria', name: 'Alexandria (هندسي عصري فاخر)', fontClass: "'Alexandria', sans-serif", type: 'builtin' },
  { id: 'IBM Plex Sans Arabic', name: 'IBM Plex Sans (تقني وأنيق)', fontClass: "'IBM Plex Sans Arabic', sans-serif", type: 'builtin' },
  { id: 'Readex Pro', name: 'Readex Pro (مودرن وواضح جداً)', fontClass: "'Readex Pro', sans-serif", type: 'builtin' },
  { id: 'Almarai', name: 'المراعي (رسمي وجذاب)', fontClass: "'Almarai', sans-serif", type: 'builtin' },
  { id: 'Tajawal', name: 'تجوال (ناعم وانسيابي)', fontClass: "'Tajawal', sans-serif", type: 'builtin' },
  { id: 'Cairo', name: 'كايرو (قوي وبارز)', fontClass: "'Cairo', sans-serif", type: 'builtin' },
  { id: 'Plus Jakarta Sans', name: 'Jakarta (أرقام وحروف إنجليزية حديثة)', fontClass: "'Plus Jakarta Sans', sans-serif", type: 'builtin' },
  { id: 'Outfit', name: 'Outfit (فاخر عالمي)', fontClass: "'Outfit', sans-serif", type: 'builtin' }
];

export const LUXURY_THEMES = [
  {
    id: 'champagne-gold',
    name: '👑 الشامبين والذهب الفندقي (Champagne Gold)',
    borderColor: '#d4af37',
    borderGlow: 'rgba(212, 175, 55, 0.4)',
    dividerColor: 'rgba(212, 175, 55, 0.5)',
    diamondColor: '#fde047',
    heroUnitColor: '#d4af37',
    pillBg: 'linear-gradient(135deg, rgba(212, 175, 55, 0.85) 0%, rgba(180, 140, 30, 0.95) 100%)',
    pillBorder: 'rgba(255, 235, 150, 0.6)',
    pillTextColor: '#ffffff',
    glassBg: 'rgba(20, 16, 10, 0.55)',
    accent: '#d4af37'
  },
  {
    id: 'tiffany-emerald',
    name: '💎 التيفاني والزمردي العصري (Tiffany & Emerald)',
    borderColor: '#2dd4bf',
    borderGlow: 'rgba(45, 212, 191, 0.45)',
    dividerColor: 'rgba(45, 212, 191, 0.5)',
    diamondColor: '#5eead4',
    heroUnitColor: '#2dd4bf',
    pillBg: 'linear-gradient(135deg, rgba(13, 148, 136, 0.88) 0%, rgba(15, 118, 110, 0.95) 100%)',
    pillBorder: 'rgba(94, 234, 212, 0.5)',
    pillTextColor: '#ffffff',
    glassBg: 'rgba(10, 25, 25, 0.55)',
    accent: '#2dd4bf'
  },
  {
    id: 'royal-navy',
    name: '🏛️ الكحلي الليلي والبلاتين (Royal Navy & Platinum)',
    borderColor: '#94a3b8',
    borderGlow: 'rgba(148, 163, 184, 0.5)',
    dividerColor: 'rgba(148, 163, 184, 0.45)',
    diamondColor: '#e2e8f0',
    heroUnitColor: '#94a3b8',
    pillBg: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
    pillBorder: 'rgba(148, 163, 184, 0.6)',
    pillTextColor: '#ffffff',
    glassBg: 'rgba(15, 23, 42, 0.65)',
    accent: '#94a3b8'
  },
  {
    id: 'bronze-graphite',
    name: '🛋️ الجرافيت والبرونز الدافئ (Dark Graphite & Bronze)',
    borderColor: '#c28854',
    borderGlow: 'rgba(194, 136, 84, 0.45)',
    dividerColor: 'rgba(194, 136, 84, 0.5)',
    diamondColor: '#fed7aa',
    heroUnitColor: '#c28854',
    pillBg: 'linear-gradient(135deg, rgba(67, 48, 38, 0.92) 0%, rgba(45, 30, 22, 0.98) 100%)',
    pillBorder: 'rgba(194, 136, 84, 0.55)',
    pillTextColor: '#ffffff',
    glassBg: 'rgba(30, 24, 20, 0.6)',
    accent: '#c28854'
  }
];

export const OVERLAY_COLOR_PRESETS = [
  { id: 'black', name: 'أسود كربوني', color: '#000000', defaultOpacity: 45 },
  { id: 'espresso', name: 'بني إسبريسو دافئ', color: '#2b1b12', defaultOpacity: 45 },
  { id: 'dark-gray', name: 'رمادي جرافيت داكن', color: '#1e242d', defaultOpacity: 45 },
  { id: 'light-gray', name: 'رمادي فضي ناعم', color: '#94a3b8', defaultOpacity: 30 },
  { id: 'white', name: 'أبيض حليبي ضبابي', color: '#ffffff', defaultOpacity: 25 },
  { id: 'navy', name: 'كحلي ليلي فاخر', color: '#09152b', defaultOpacity: 50 },
  { id: 'emerald', name: 'زمردي داكن', color: '#062119', defaultOpacity: 45 }
];

export const IMAGE_FILTER_PRESETS = [
  { id: 'none', name: 'طبيعي بدون فلتر', css: 'none' },
  { id: 'monochrome', name: 'أبيض وأسود فاخر (B&W)', css: 'grayscale(100%) contrast(115%) brightness(95%)' },
  { id: 'warm', name: 'دفء سينمائي (Warm Gold)', css: 'sepia(30%) saturate(130%) brightness(102%) contrast(105%)' },
  { id: 'cool', name: 'معماري بارد (Cool Slate)', css: 'hue-rotate(185deg) saturate(90%) contrast(108%)' },
  { id: 'vivid', name: 'ألوان ساطعة حيوية (Vivid)', css: 'saturate(145%) contrast(110%) brightness(103%)' },
  { id: 'moody', name: 'درامي داكن (Dramatic Dark)', css: 'contrast(125%) brightness(85%) saturate(110%)' }
];

export const SAMPLE_IMAGES = [
  {
    id: 'sample1',
    name: 'شقة فاخرة مع إضاءة جدارية مودرن',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sample2',
    name: 'غرفة نوم فندقية سوبر لوكس',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sample3',
    name: 'صالة ومعيشة فندقية VIP',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sample4',
    name: 'واجهة فيلا مودرن مع مسبح',
    url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
  }
];

export const DEFAULT_GLASS_CARD_DATA = {
  title: 'شقة للبيع',
  titleFont: 'Alexandria',
  titleSize: 34,
  titleColor: '#ffffff',

  showSubtitle: false,
  subtitle: 'المساحة',
  subtitleFont: 'Alexandria',
  subtitleSize: 18,
  subtitleColor: '#d4af37',

  heroNumber: '185',
  heroUnit: 'م²',
  heroFont: 'Alexandria',
  heroNumberSize: 68,
  heroUnitSize: 26,
  heroNumberColor: '#ffffff',
  heroUnitColor: '#d4af37',

  bottomText: 'حي النرجس',
  bottomFont: 'Alexandria',
  bottomSize: 18,
  bottomTextColor: '#ffffff',
  bottomPillStyle: 'pill', // 'pill' or 'text'

  showDividers: true,
  dividerOrnament: 'diamond', // 'diamond', 'star', 'dot', 'none'
  
  boxWidth: 84, // in % of canvas width
  boxBlur: 20,
  boxOpacity: 60,
  borderGlowIntensity: 80,
  verticalPosition: 50 // % from top (center is 50)
};
