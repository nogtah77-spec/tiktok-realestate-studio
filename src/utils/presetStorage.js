const PRESETS_STORAGE_KEY = 'alamoudi_cover_presets_v2';

export const BUILTIN_PRESETS = [
  {
    id: 'preset-champagne-gold',
    name: '👑 الشامبين والذهب الفندقي (شقة للبيع 185م)',
    themeId: 'champagne-gold',
    finish: 'glossy',
    overlayColor: '#000000',
    overlayOpacity: 35,
    imageBlur: 0,
    imageFilter: 'none',
    hasVignette: true,
    vignetteIntensity: 50,
    cardData: {
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
      bottomPillStyle: 'pill',
      showDividers: true,
      dividerOrnament: 'diamond',
      boxWidth: 84,
      boxBlur: 20,
      boxOpacity: 60,
      borderGlowIntensity: 85,
      verticalPosition: 50
    }
  },
  {
    id: 'preset-tiffany-emerald',
    name: '💎 التيفاني والزمردي العصري (فيلا للبيع 420م)',
    themeId: 'tiffany-emerald',
    finish: 'glossy',
    overlayColor: '#000000',
    overlayOpacity: 30,
    imageBlur: 0,
    imageFilter: 'none',
    hasVignette: true,
    vignetteIntensity: 50,
    cardData: {
      title: 'فيلا للبيع',
      titleFont: 'Alexandria',
      titleSize: 34,
      titleColor: '#ffffff',
      showSubtitle: true,
      subtitle: 'المساحة',
      subtitleFont: 'Alexandria',
      subtitleSize: 18,
      subtitleColor: '#2dd4bf',
      heroNumber: '420',
      heroUnit: 'م²',
      heroFont: 'Alexandria',
      heroNumberSize: 68,
      heroUnitSize: 26,
      heroNumberColor: '#ffffff',
      heroUnitColor: '#2dd4bf',
      bottomText: 'شمال الرياض - حطين',
      bottomFont: 'Alexandria',
      bottomSize: 17,
      bottomTextColor: '#ffffff',
      bottomPillStyle: 'pill',
      showDividers: true,
      dividerOrnament: 'diamond',
      boxWidth: 84,
      boxBlur: 20,
      boxOpacity: 60,
      borderGlowIntensity: 85,
      verticalPosition: 50
    }
  },
  {
    id: 'preset-royal-navy',
    name: '🏛️ الكحلي الليلي والبلاتين (بنتهاوس 260م)',
    themeId: 'royal-navy',
    finish: 'glossy',
    overlayColor: '#09152b',
    overlayOpacity: 45,
    imageBlur: 0,
    imageFilter: 'cool',
    hasVignette: true,
    vignetteIntensity: 55,
    cardData: {
      title: 'بنتهاوس للإيجار',
      titleFont: 'Alexandria',
      titleSize: 32,
      titleColor: '#ffffff',
      showSubtitle: false,
      subtitle: 'المساحة',
      subtitleFont: 'Alexandria',
      subtitleSize: 18,
      subtitleColor: '#94a3b8',
      heroNumber: '260',
      heroUnit: 'م²',
      heroFont: 'Alexandria',
      heroNumberSize: 68,
      heroUnitSize: 26,
      heroNumberColor: '#ffffff',
      heroUnitColor: '#94a3b8',
      bottomText: 'إطلالة بانورامية كاملة',
      bottomFont: 'Alexandria',
      bottomSize: 17,
      bottomTextColor: '#ffffff',
      bottomPillStyle: 'pill',
      showDividers: true,
      dividerOrnament: 'diamond',
      boxWidth: 84,
      boxBlur: 22,
      boxOpacity: 65,
      borderGlowIntensity: 80,
      verticalPosition: 50
    }
  },
  {
    id: 'preset-bronze-graphite',
    name: '🛋️ الجرافيت والبرونز الدافئ (شقة مفروشة 150م)',
    themeId: 'bronze-graphite',
    finish: 'matte',
    overlayColor: '#2b1b12',
    overlayOpacity: 40,
    imageBlur: 0,
    imageFilter: 'warm',
    hasVignette: true,
    vignetteIntensity: 50,
    cardData: {
      title: 'شقة مفروشة',
      titleFont: 'Alexandria',
      titleSize: 34,
      titleColor: '#ffffff',
      showSubtitle: false,
      subtitle: 'المساحة',
      subtitleFont: 'Alexandria',
      subtitleSize: 18,
      subtitleColor: '#c28854',
      heroNumber: '150',
      heroUnit: 'م²',
      heroFont: 'Alexandria',
      heroNumberSize: 68,
      heroUnitSize: 26,
      heroNumberColor: '#ffffff',
      heroUnitColor: '#c28854',
      bottomText: '3 غرف نوم - موقع مميز',
      bottomFont: 'Alexandria',
      bottomSize: 17,
      bottomTextColor: '#ffffff',
      bottomPillStyle: 'pill',
      showDividers: true,
      dividerOrnament: 'diamond',
      boxWidth: 84,
      boxBlur: 18,
      boxOpacity: 65,
      borderGlowIntensity: 75,
      verticalPosition: 50
    }
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
