import { getSupabaseClient } from './supabaseClient';

const PRESETS_STORAGE_KEY = 'alamoudi_cover_presets';

export const BUILTIN_PRESETS = [
  {
    id: 'preset-luxury-villa',
    name: '👑 فيلا فاخرة مودرن (كحلي ملكي وذهبي)',
    themeId: 'sale',
    finish: 'glossy',
    layout: 'pills',
    cardBlur: 16,
    cardOpacity: 85,
    overlayColor: '#000000',
    overlayOpacity: 40,
    imageBlur: 0,
    imageFilter: 'none',
    hasVignette: true,
    vignetteIntensity: 65,
    logoPosition: 'top-right',
    logoScale: 100,
    logoOpacity: 100,
    fields: [
      { id: 'f1', text: 'فيلا مودرن بتصميم أندلسي حديث', fontId: 'Alexandria', fontSize: 26, fontWeight: '700', color: '#ffffff', icon: '✨', highlight: true, highlightColor: '#d4af37' },
      { id: 'f2', text: 'شمال الرياض - حي حطين النموذجي', fontId: 'Readex Pro', fontSize: 20, fontWeight: '500', color: '#e2e8f0', icon: '📍', highlight: false, highlightColor: '#ffffff' },
      { id: 'f3', text: 'مساحة 450 م² | شارع 25م | مسبح ومصعد', fontId: 'IBM Plex Sans Arabic', fontSize: 18, fontWeight: '400', color: '#cbd5e1', icon: '📐', highlight: false, highlightColor: '#ffffff' },
      { id: 'f4', text: 'السعر: 4,850,000 ر.س (مباشر وحصري)', fontId: 'Alexandria', fontSize: 24, fontWeight: '800', color: '#fde047', icon: '🏷️', highlight: true, highlightColor: '#fde047' }
    ]
  },
  {
    id: 'preset-penthouse-rent',
    name: '🏢 شقة بنتهاوس للإيجار (جرافيت وفضي)',
    themeId: 'rent',
    finish: 'matte',
    layout: 'glass-card',
    cardBlur: 20,
    cardOpacity: 85,
    overlayColor: '#1e242d',
    overlayOpacity: 45,
    imageBlur: 2,
    imageFilter: 'cool',
    hasVignette: true,
    vignetteIntensity: 50,
    logoPosition: 'top-right',
    logoScale: 90,
    logoOpacity: 95,
    fields: [
      { id: 'f1', text: 'بنتهاوس فاخر بإطلالة بانورامية كاملة', fontId: 'Alexandria', fontSize: 26, fontWeight: '700', color: '#ffffff', icon: '🏙️', highlight: true, highlightColor: '#94a3b8' },
      { id: 'f2', text: 'الخبر - برج الواجهة البحرية', fontId: 'Readex Pro', fontSize: 20, fontWeight: '500', color: '#e2e8f0', icon: '📍', highlight: false, highlightColor: '#ffffff' },
      { id: 'f3', text: '3 غرف ماستر + صالة واسعة + بلكونة', fontId: 'IBM Plex Sans Arabic', fontSize: 18, fontWeight: '400', color: '#cbd5e1', icon: '🛋️', highlight: false, highlightColor: '#ffffff' },
      { id: 'f4', text: 'الإيجار السنوي: 110,000 ر.س (دفعتين)', fontId: 'Alexandria', fontSize: 23, fontWeight: '700', color: '#e2e8f0', icon: '🔑', highlight: true, highlightColor: '#e2e8f0' }
    ]
  },
  {
    id: 'preset-furnished-hotel',
    name: '🛋️ جناح فندقي مفروش (برونزي وإسبريسو)',
    themeId: 'furnished',
    finish: 'glossy',
    layout: 'bento',
    cardBlur: 18,
    cardOpacity: 90,
    overlayColor: '#2b1b12',
    overlayOpacity: 50,
    imageBlur: 0,
    imageFilter: 'warm',
    hasVignette: true,
    vignetteIntensity: 60,
    logoPosition: 'top-left',
    logoScale: 95,
    logoOpacity: 100,
    fields: [
      { id: 'f1', text: 'جناح فندقي VIP مؤثث بالكامل', fontId: 'Alexandria', fontSize: 25, fontWeight: '700', color: '#fed7aa', icon: '🌟', highlight: true, highlightColor: '#c28854' },
      { id: 'f2', text: 'جدة - كورنيش أبحر الشمالية', fontId: 'Readex Pro', fontSize: 19, fontWeight: '500', color: '#e2e8f0', icon: '📍', highlight: false, highlightColor: '#ffffff' },
      { id: 'f3', text: 'دخول ذكي | خدمات فندقية 24/7 | نادي صحي', fontId: 'IBM Plex Sans Arabic', fontSize: 17, fontWeight: '400', color: '#ffedd5', icon: '🛎️', highlight: false, highlightColor: '#ffffff' },
      { id: 'f4', text: 'إيجار شهري وسنوي متاح فوري', fontId: 'Alexandria', fontSize: 22, fontWeight: '800', color: '#fed7aa', icon: '✨', highlight: true, highlightColor: '#fed7aa' }
    ]
  }
];

export function getAllPresets() {
  try {
    const saved = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (saved) {
      const userPresets = JSON.parse(saved);
      return [...BUILTIN_PRESETS, ...userPresets];
    }
  } catch (e) {
    console.error('Error reading presets:', e);
  }
  return BUILTIN_PRESETS;
}

export function saveUserPreset(preset) {
  try {
    const saved = localStorage.getItem(PRESETS_STORAGE_KEY);
    const existing = saved ? JSON.parse(saved) : [];
    const updated = [preset, ...existing.filter(p => p.id !== preset.id)];
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving preset:', e);
    return [];
  }
}

export function deleteUserPreset(presetId) {
  try {
    const saved = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (!saved) return [];
    const existing = JSON.parse(saved);
    const updated = existing.filter(p => p.id !== presetId);
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting preset:', e);
    return [];
  }
}
