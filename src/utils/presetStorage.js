const PRESETS_STORAGE_KEY = 'alamoudi_cover_presets_v3';
const WORKSPACE_STORAGE_KEY = 'alamoudi_studio_workspace_session_v1';

export const BUILTIN_PRESETS = [
  {
    id: 'preset-sale-gold',
    name: '👑 للبيع: الذهب والشامبين (شقة فاخرة 185م)',
    themeId: 'sale-gold',
    finish: 'glossy',
    overlayColor: '#000000',
    overlayOpacity: 35,
    imageBlur: 0,
    imageFilter: 'none',
    hasVignette: true,
    vignetteIntensity: 50,
    cardData: {
      title: 'شقة للبيع',
      titleFont: 'Lalezar',
      titleSize: 38,
      titleColor: '#ffffff',
      titleShimmer: false,
      showSubtitle: false,
      subtitle: 'المساحة',
      subtitleFont: 'Alexandria',
      subtitleSize: 18,
      subtitleColor: '#d4af37',
      heroNumber: '185',
      heroUnit: 'م²',
      heroFont: 'Lalezar',
      heroNumberSize: 76,
      heroUnitSize: 28,
      heroNumberColor: '#ffffff',
      heroUnitColor: '#d4af37',
      heroShimmer: false,
      bottomText: 'حي النرجس',
      bottomFont: 'Alexandria',
      bottomSize: 18,
      bottomTextColor: '#ffffff',
      bottomPillStyle: 'pill',
      showDividers: true,
      dividerStyle: 'fading',
      dividerTagText: 'VIP',
      dividerOpacity: 70,
      dividerCustomColor: '',
      boxWidth: 84,
      boxPaddingY: 20,
      boxBlur: 20,
      boxOpacity: 60,
      verticalPosition: 50,
      borderWidth: 1.5,
      borderRadius: 32,
      borderColorMode: 'theme',
      customBorderColor: '#d4af37',
      borderGlowIntensity: 75,
      glowColorMode: 'theme',
      customGlowColor: '#d4af37',
      borderStyle: 'solid'
    }
  },
  {
    id: 'preset-rent-navy',
    name: '🔑 للإيجار: الكحلي والبلاتين (بنتهاوس 260م)',
    themeId: 'rent-navy',
    finish: 'glossy',
    overlayColor: '#09152b',
    overlayOpacity: 45,
    imageBlur: 0,
    imageFilter: 'cool',
    hasVignette: true,
    vignetteIntensity: 55,
    cardData: {
      title: 'بنتهاوس للإيجار',
      titleFont: 'Noto Kufi Arabic',
      titleSize: 34,
      titleColor: '#ffffff',
      titleShimmer: false,
      showSubtitle: false,
      subtitle: 'المساحة',
      subtitleFont: 'Alexandria',
      subtitleSize: 18,
      subtitleColor: '#94a3b8',
      heroNumber: '260',
      heroUnit: 'م²',
      heroFont: 'Changa',
      heroNumberSize: 74,
      heroUnitSize: 26,
      heroNumberColor: '#ffffff',
      heroUnitColor: '#94a3b8',
      heroShimmer: false,
      bottomText: 'إطلالة بانورامية كاملة',
      bottomFont: 'Alexandria',
      bottomSize: 17,
      bottomTextColor: '#ffffff',
      bottomPillStyle: 'pill',
      showDividers: true,
      dividerStyle: 'double',
      dividerTagText: 'REF',
      dividerOpacity: 70,
      dividerCustomColor: '',
      boxWidth: 84,
      boxPaddingY: 20,
      boxBlur: 22,
      boxOpacity: 65,
      verticalPosition: 50,
      borderWidth: 1.5,
      borderRadius: 30,
      borderColorMode: 'theme',
      customBorderColor: '#94a3b8',
      borderGlowIntensity: 70,
      glowColorMode: 'theme',
      customGlowColor: '#94a3b8',
      borderStyle: 'solid'
    }
  },
  {
    id: 'preset-furnished-bronze',
    name: '🛋️ مفروش: الجرافيت والبرونز (شقة VIP 150م)',
    themeId: 'furnished-bronze',
    finish: 'matte',
    overlayColor: '#2b1b12',
    overlayOpacity: 40,
    imageBlur: 0,
    imageFilter: 'warm',
    hasVignette: true,
    vignetteIntensity: 50,
    cardData: {
      title: 'شقة مفروشة VIP',
      titleFont: 'El Messiri',
      titleSize: 36,
      titleColor: '#ffffff',
      titleShimmer: false,
      showSubtitle: false,
      subtitle: 'المساحة',
      subtitleFont: 'Alexandria',
      subtitleSize: 18,
      subtitleColor: '#c28854',
      heroNumber: '150',
      heroUnit: 'م²',
      heroFont: 'Lalezar',
      heroNumberSize: 76,
      heroUnitSize: 28,
      heroNumberColor: '#ffffff',
      heroUnitColor: '#c28854',
      heroShimmer: false,
      bottomText: '3 غرف نوم - موقع مميز',
      bottomFont: 'Alexandria',
      bottomSize: 17,
      bottomTextColor: '#ffffff',
      bottomPillStyle: 'pill',
      showDividers: true,
      dividerStyle: 'micro-sparkle',
      dividerTagText: 'VIP',
      dividerOpacity: 75,
      dividerCustomColor: '',
      boxWidth: 84,
      boxPaddingY: 20,
      boxBlur: 20,
      boxOpacity: 65,
      verticalPosition: 50,
      borderWidth: 1.5,
      borderRadius: 32,
      borderColorMode: 'theme',
      customBorderColor: '#c28854',
      borderGlowIntensity: 75,
      glowColorMode: 'theme',
      customGlowColor: '#c28854',
      borderStyle: 'solid'
    }
  },
  {
    id: 'preset-commercial-emerald',
    name: '🏢 تجاري: الزمردي والتيفاني (فيلا / مقر 420م)',
    themeId: 'commercial-emerald',
    finish: 'glossy',
    overlayColor: '#062119',
    overlayOpacity: 35,
    imageBlur: 0,
    imageFilter: 'none',
    hasVignette: true,
    vignetteIntensity: 50,
    cardData: {
      title: 'فيلا مودرن للبيع',
      titleFont: 'Noto Kufi Arabic',
      titleSize: 34,
      titleColor: '#ffffff',
      titleShimmer: false,
      showSubtitle: true,
      subtitle: 'المساحة الإجمالية',
      subtitleFont: 'Alexandria',
      subtitleSize: 16,
      subtitleColor: '#2dd4bf',
      heroNumber: '420',
      heroUnit: 'م²',
      heroFont: 'Lalezar',
      heroNumberSize: 76,
      heroUnitSize: 28,
      heroNumberColor: '#ffffff',
      heroUnitColor: '#2dd4bf',
      heroShimmer: false,
      bottomText: 'شمال الرياض - حطين',
      bottomFont: 'Alexandria',
      bottomSize: 17,
      bottomTextColor: '#ffffff',
      bottomPillStyle: 'pill',
      showDividers: true,
      dividerStyle: 'beam',
      dividerTagText: 'VIP',
      dividerOpacity: 75,
      dividerCustomColor: '',
      boxWidth: 84,
      boxPaddingY: 20,
      boxBlur: 20,
      boxOpacity: 60,
      verticalPosition: 50,
      borderWidth: 1.5,
      borderRadius: 32,
      borderColorMode: 'theme',
      customBorderColor: '#2dd4bf',
      borderGlowIntensity: 85,
      glowColorMode: 'theme',
      customGlowColor: '#2dd4bf',
      borderStyle: 'solid'
    }
  },
  {
    id: 'preset-auction-ruby',
    name: '⚡ مزاد وفرص حصرية: الياقوت والعنبر',
    themeId: 'auction-ruby',
    finish: 'glossy',
    overlayColor: '#260a12',
    overlayOpacity: 45,
    imageBlur: 0,
    imageFilter: 'vivid',
    hasVignette: true,
    vignetteIntensity: 60,
    cardData: {
      title: 'فرصة مزاد عقاري',
      titleFont: 'Lalezar',
      titleSize: 38,
      titleColor: '#ffffff',
      titleShimmer: true,
      showSubtitle: true,
      subtitle: 'السعر الافتتاحي',
      subtitleFont: 'Alexandria',
      subtitleSize: 17,
      subtitleColor: '#fb7185',
      heroNumber: '3.5',
      heroUnit: 'مليون ر.س',
      heroFont: 'Lalezar',
      heroNumberSize: 74,
      heroUnitSize: 24,
      heroNumberColor: '#ffffff',
      heroUnitColor: '#fb7185',
      heroShimmer: true,
      bottomText: 'موقع استثماري استثنائي',
      bottomFont: 'Alexandria',
      bottomSize: 17,
      bottomTextColor: '#ffffff',
      bottomPillStyle: 'pill',
      showDividers: true,
      dividerStyle: 'tag',
      dividerTagText: 'مزاد',
      dividerOpacity: 85,
      dividerCustomColor: '',
      boxWidth: 84,
      boxPaddingY: 20,
      boxBlur: 22,
      boxOpacity: 65,
      verticalPosition: 50,
      borderWidth: 2,
      borderRadius: 32,
      borderColorMode: 'theme',
      customBorderColor: '#f43f5e',
      borderGlowIntensity: 90,
      glowColorMode: 'theme',
      customGlowColor: '#f43f5e',
      borderStyle: 'solid'
    }
  }
];

import { getSupabaseClient } from './supabaseClient';

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

// Cloud sync: fetch remote presets and merge with local presets
export async function syncPresetsFromCloud() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return getAllPresets();

    const { data, error } = await supabase
      .from('presets')
      .select('*')
      .neq('id', 'current_workspace_session')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase presets fetch warning:', error);
      return getAllPresets();
    }

    if (data && data.length > 0) {
      const remoteUserPresets = data.map(row => ({
        id: row.id,
        name: row.name,
        themeId: row.theme_id,
        finish: row.finish,
        overlayColor: row.overlay_color,
        overlayOpacity: row.overlay_opacity !== null ? Number(row.overlay_opacity) : 35,
        imageBlur: row.image_blur !== null ? Number(row.image_blur) : 0,
        imageFilter: row.image_filter,
        hasVignette: row.has_vignette,
        vignetteIntensity: row.vignette_intensity !== null ? Number(row.vignette_intensity) : 50,
        cardData: row.card_data || {},
        imageUrl: row.image_url || ''
      }));

      // Merge with existing local presets without duplicate IDs
      const saved = localStorage.getItem(PRESETS_STORAGE_KEY);
      const localPresets = saved ? JSON.parse(saved) : [];
      const mergedMap = new Map();
      localPresets.forEach(p => mergedMap.set(p.id, p));
      remoteUserPresets.forEach(p => mergedMap.set(p.id, p));

      const mergedList = Array.from(mergedMap.values());
      localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(mergedList));
      return [...BUILTIN_PRESETS, ...mergedList];
    }
  } catch (err) {
    console.warn('Cloud sync error for presets:', err);
  }
  return getAllPresets();
}

export function saveUserPreset(preset) {
  try {
    const saved = localStorage.getItem(PRESETS_STORAGE_KEY);
    const existing = saved ? JSON.parse(saved) : [];
    const updated = [preset, ...existing.filter(p => p.id !== preset.id)];
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(updated));

    // Asynchronously sync to Supabase
    const supabase = getSupabaseClient();
    if (supabase) {
      supabase.from('presets').upsert({
        id: preset.id,
        name: preset.name,
        theme_id: preset.themeId || 'sale-gold',
        finish: preset.finish || 'glossy',
        overlay_color: preset.overlayColor || '#000000',
        overlay_opacity: preset.overlayOpacity ?? 35,
        image_blur: preset.imageBlur ?? 0,
        image_filter: preset.imageFilter || 'none',
        has_vignette: preset.hasVignette ?? true,
        vignette_intensity: preset.vignetteIntensity ?? 50,
        card_data: preset.cardData || {},
        image_url: preset.imageUrl || null,
        updated_at: new Date().toISOString()
      }).then(({ error }) => {
        if (error) console.warn('Failed to sync preset to Supabase:', error);
      });
    }

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

    // Asynchronously delete from Supabase
    const supabase = getSupabaseClient();
    if (supabase) {
      supabase.from('presets').delete().eq('id', presetId).then(({ error }) => {
        if (error) console.warn('Failed to delete preset from Supabase:', error);
      });
    }

    return updated;
  } catch (e) {
    console.error('Error deleting preset:', e);
    return [];
  }
}

// Debounced Cloud Session Sync timer
let cloudSyncTimer = null;

// Workspace Session Persistence (Auto-Save State)
export function saveWorkspaceSession(state) {
  try {
    if (!state) return;
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(state));

    // Debounced Cloud Sync for current workspace
    if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(() => {
      const supabase = getSupabaseClient();
      if (supabase) {
        supabase.from('presets').upsert({
          id: 'current_workspace_session',
          name: 'جلسة العمل السحابية الحالية',
          theme_id: state.themeId || 'sale-gold',
          finish: state.finish || 'glossy',
          overlay_color: state.overlayColor || '#000000',
          overlay_opacity: state.overlayOpacity ?? 35,
          image_blur: state.imageBlur ?? 0,
          image_filter: state.imageFilter || 'none',
          has_vignette: state.hasVignette ?? true,
          vignette_intensity: state.vignetteIntensity ?? 50,
          card_data: {
            ...state.cardData,
            _sessionMeta: {
              activePlatformThemeId: state.activePlatformThemeId,
              activePresetId: state.activePresetId,
              activeCardPaletteId: state.activeCardPaletteId,
              imageZoom: state.imageZoom,
              imagePanX: state.imagePanX,
              imagePanY: state.imagePanY,
              showLogo: state.showLogo,
              logoUrl: state.logoUrl,
              logoPosition: state.logoPosition,
              logoScale: state.logoScale,
              logoOpacity: state.logoOpacity
            }
          },
          image_url: state.imageUrl || null,
          updated_at: new Date().toISOString()
        }).then(({ error }) => {
          if (error) console.warn('Failed to sync workspace to Supabase:', error);
        });
      }
    }, 2000);
  } catch (e) {
    console.warn('Unable to auto-save session state:', e);
  }
}

export function loadWorkspaceSession() {
  try {
    const saved = localStorage.getItem(WORKSPACE_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Unable to load saved session state:', e);
  }
  return null;
}

// Fetch latest Cloud Workspace Session (for other devices)
export async function fetchCloudWorkspaceSession() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('presets')
      .select('*')
      .eq('id', 'current_workspace_session')
      .single();

    if (error || !data) return null;

    const sessionMeta = data.card_data?._sessionMeta || {};
    return {
      themeId: data.theme_id,
      finish: data.finish,
      overlayColor: data.overlay_color,
      overlayOpacity: data.overlay_opacity !== null ? Number(data.overlay_opacity) : 35,
      imageBlur: data.image_blur !== null ? Number(data.image_blur) : 0,
      imageFilter: data.image_filter,
      hasVignette: data.has_vignette,
      vignetteIntensity: data.vignette_intensity !== null ? Number(data.vignette_intensity) : 50,
      imageUrl: data.image_url || '',
      cardData: data.card_data || {},
      activePlatformThemeId: sessionMeta.activePlatformThemeId,
      activePresetId: sessionMeta.activePresetId,
      activeCardPaletteId: sessionMeta.activeCardPaletteId,
      imageZoom: sessionMeta.imageZoom ?? 100,
      imagePanX: sessionMeta.imagePanX ?? 0,
      imagePanY: sessionMeta.imagePanY ?? 0,
      showLogo: sessionMeta.showLogo ?? true,
      logoUrl: sessionMeta.logoUrl ?? '',
      logoPosition: sessionMeta.logoPosition ?? 'top-right',
      logoScale: sessionMeta.logoScale ?? 100,
      logoOpacity: sessionMeta.logoOpacity ?? 100
    };
  } catch (err) {
    console.warn('Could not fetch cloud workspace session:', err);
    return null;
  }
}

export function clearWorkspaceSession() {
  try {
    localStorage.removeItem(WORKSPACE_STORAGE_KEY);
  } catch (e) {}
}
