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

export const PROPERTY_THEMES = [
  {
    id: 'sale',
    label: '🏷️ للبيع (كحلي ملكي وذهبي)',
    badgeText: 'للـبـيـع',
    primaryColor: '#0b192c',
    accentColor: '#d4af37',
    textColor: '#ffffff',
    badgeBg: 'rgba(212, 175, 55, 0.15)',
    badgeBorder: 'rgba(212, 175, 55, 0.4)',
    badgeTextCol: '#fde047'
  },
  {
    id: 'rent',
    label: '🔑 للإيجار (جرافيت وفضي)',
    badgeText: 'للإيـجـار',
    primaryColor: '#181a20',
    accentColor: '#94a3b8',
    textColor: '#ffffff',
    badgeBg: 'rgba(148, 163, 184, 0.15)',
    badgeBorder: 'rgba(148, 163, 184, 0.4)',
    badgeTextCol: '#e2e8f0'
  },
  {
    id: 'furnished',
    label: '🛋️ مفروش فندقي (برونزي وإسبريسو)',
    badgeText: 'مفروش فاخر',
    primaryColor: '#251a14',
    accentColor: '#c28854',
    textColor: '#ffffff',
    badgeBg: 'rgba(194, 136, 84, 0.18)',
    badgeBorder: 'rgba(194, 136, 84, 0.45)',
    badgeTextCol: '#fed7aa'
  },
  {
    id: 'exclusive',
    label: '✨ عرض حصري (زمردي فاخر)',
    badgeText: 'حـصـريـاً',
    primaryColor: '#062822',
    accentColor: '#10b981',
    textColor: '#ffffff',
    badgeBg: 'rgba(16, 185, 129, 0.18)',
    badgeBorder: 'rgba(16, 185, 129, 0.45)',
    badgeTextCol: '#6ee7b7'
  },
  {
    id: 'auction',
    label: '🔨 مزاد عقاري (عنابي فاخر)',
    badgeText: 'مـزاد عـقـاري',
    primaryColor: '#2a0a14',
    accentColor: '#f43f5e',
    textColor: '#ffffff',
    badgeBg: 'rgba(244, 63, 94, 0.18)',
    badgeBorder: 'rgba(244, 63, 94, 0.45)',
    badgeTextCol: '#fda4af'
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
    name: 'فيلا مودرن فاخرة مع مسبح',
    url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sample2',
    name: 'شقة بنتهاوس بإطلالة بانورامية',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sample3',
    name: 'مجلس وصالة فندقية راقية',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sample4',
    name: 'واجهة قصر معماري معاصر',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  }
];

export const DEFAULT_FIELDS = [
  {
    id: 'f1',
    text: 'فيلا مودرن بتصميم أندلسي حديث',
    fontId: 'Alexandria',
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    icon: '✨',
    highlight: true,
    highlightColor: '#d4af37'
  },
  {
    id: 'f2',
    text: 'شمال الرياض - حي حطين النموذجي',
    fontId: 'Readex Pro',
    fontSize: 20,
    fontWeight: '500',
    color: '#e2e8f0',
    icon: '📍',
    highlight: false,
    highlightColor: '#ffffff'
  },
  {
    id: 'f3',
    text: 'مساحة 450 م² | شارع 25م | مسبح ومصعد',
    fontId: 'IBM Plex Sans Arabic',
    fontSize: 18,
    fontWeight: '400',
    color: '#cbd5e1',
    icon: '📐',
    highlight: false,
    highlightColor: '#ffffff'
  },
  {
    id: 'f4',
    text: 'السعر: 4,850,000 ر.س (مباشر وحصري)',
    fontId: 'Alexandria',
    fontSize: 24,
    fontWeight: '800',
    color: '#fde047',
    icon: '🏷️',
    highlight: true,
    highlightColor: '#fde047'
  }
];
