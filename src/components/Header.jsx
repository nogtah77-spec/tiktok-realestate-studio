import React, { useState } from 'react';
import { Save, RotateCcw, Database, Palette, Trash2, PenLine } from 'lucide-react';
import { NEON_PALETTES, MUTED_LUXURY_PALETTES, MASTER_PALETTES, ALL_PALETTES } from '../utils/themeEngine';
import NeonButton from './NeonButton';

export default function Header({
  presets = [],
  activePresetId,
  onSelectPreset,
  onSavePreset,
  onDeletePreset,
  onResetToDefault,
  onOpenSupabaseModal,
  onOpenCopywriterModal,
  activePlatformThemeId,
  onSelectPlatformTheme,
  activeThemeObj,
  activeNeonButtonStyleId = 'frame-01',
  neonButtonOpacity = 100
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [presetName, setPresetName] = useState('');

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (presetName.trim()) {
      onSavePreset(presetName.trim());
      setPresetName('');
      setIsSaving(false);
    }
  };

  const theme = activeThemeObj || MASTER_PALETTES[1];
  const isCurrentThemeNeon = theme?.group === 'neon';
  const currentPaletteObj = ALL_PALETTES.find(p => p.id === activePlatformThemeId);

  return (
    <header
      className="h-12 sm:h-13 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-2 sm:px-4 border-b transition-colors duration-200"
      style={{
        backgroundColor: theme.bgSurface,
        borderColor: theme.border
      }}
    >
      {/* 1. Right Corner: Brand Luxury Logo Badge */}
      <div className="flex items-center gap-2 shrink-0">
        <div
          className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shadow-md transition-all cursor-default select-none shrink-0"
          style={{
            backgroundColor: theme.accent,
            color: theme.bgDark,
            boxShadow: `0 0 12px ${theme.accentGlow}`
          }}
          title="استوديو أغلفة تيك توك العقارية"
        >
          ع
        </div>
        <div className="hidden lg:flex items-center gap-1.5">
          <span className="font-extrabold text-xs sm:text-sm text-white tracking-tight whitespace-nowrap">العمودي للعقارات</span>
          <span
            className="text-[9px] font-extrabold px-1 py-0.5 rounded border"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.accentText,
              borderColor: theme.border
            }}
          >
            PRO
          </span>
        </div>
      </div>

      {/* 2. Center Controls: Theme Palette Trigger + Circular Neon Switch + Presets Dropdown */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* A. 24 Themes Selector (Compact Icon Button with Native Select Overlay) */}
        <div
          className="relative h-7 sm:h-7.5 flex items-center gap-1 border rounded-xl px-2 transition-all cursor-pointer shadow-sm shrink-0"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.border
          }}
          title="اختيار باقة الثيمات الـ 24"
        >
          <Palette className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accent }} />
          <span className="hidden md:inline text-[11px] font-bold text-slate-200">
            {currentPaletteObj?.name || 'الثيمات'}
          </span>
          <select
            value={activePlatformThemeId}
            onChange={(e) => onSelectPlatformTheme(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full text-black"
            title="اختر باقة الثيمات"
          >
            <optgroup label="⚡ باقة مود النيون (Cyber Neon PRO)" style={{ backgroundColor: '#050714', color: '#00e5ff' }}>
              {NEON_PALETTES.map((p) => (
                <option key={p.id} value={p.id} style={{ backgroundColor: p.bgSurface, color: '#ffffff' }}>
                  {p.num} {p.icon} {p.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="💎 باقة الفخامة الهادئة (70% Muted)" style={{ backgroundColor: '#111827', color: '#93c5fd' }}>
              {MUTED_LUXURY_PALETTES.map((p) => (
                <option key={p.id} value={p.id} style={{ backgroundColor: p.bgSurface, color: '#ffffff' }}>
                  {p.num} {p.icon} {p.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="🎨 الباقة الحيوية (Vibrant)" style={{ backgroundColor: '#111827', color: '#f472b6' }}>
              {MASTER_PALETTES.map((p) => (
                <option key={p.id} value={p.id} style={{ backgroundColor: p.bgSurface, color: '#ffffff' }}>
                  {p.num} {p.icon} {p.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* B. ⚡ Circular On/Off Cyber Neon Switch (Clean, no text) */}
        <NeonButton
          isActive={isCurrentThemeNeon}
          onClick={() => {
            if (isCurrentThemeNeon) {
              onSelectPlatformTheme('matte-charcoal-platinum');
            } else {
              onSelectPlatformTheme('neon-cyber-pink');
            }
          }}
        />

        {/* C. Real Estate Models Presets Dropdown */}
        <div className="flex items-center gap-1">
          <select
            value={activePresetId}
            onChange={(e) => {
              const found = presets.find(p => p.id === e.target.value);
              if (found) onSelectPreset(found);
            }}
            className="h-7 sm:h-7.5 px-2 rounded-xl border text-[10px] sm:text-[11px] font-bold text-slate-200 outline-none cursor-pointer max-w-[95px] sm:max-w-[140px] truncate"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle
            }}
            title="نماذج وقوالب العقارات الجاهزة"
          >
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id} className="bg-slate-900 text-white">
                {preset.name}
              </option>
            ))}
          </select>

          {/* Delete Custom Preset Button (Only for user presets) */}
          {activePresetId?.startsWith('custom-') && !isSaving && (
            <button
              onClick={() => {
                if (window.confirm('هل تريد بالتأكيد حذف هذا القالب المخصص نهائياً؟')) {
                  if (onDeletePreset) onDeletePreset(activePresetId);
                  if (onSelectPreset && presets[0]) onSelectPreset(presets[0]);
                }
              }}
              className="h-7 w-7 rounded-xl border flex items-center justify-center text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all cursor-pointer shrink-0"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle
              }}
              title="حذف هذا القالب المخصص 🗑️"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Save Custom Preset Button */}
          {isSaving ? (
            <form onSubmit={handleSaveSubmit} className="flex items-center gap-1">
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="اسم القالب..."
                className="px-2 py-0.5 rounded-lg border text-[10px] text-white outline-none w-20 sm:w-28 font-bold"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.border
                }}
                autoFocus
              />
              <button
                type="submit"
                className="px-2 py-0.5 rounded-lg font-bold text-[10px] shadow cursor-pointer transition-all"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.bgDark
                }}
              >
                حفظ
              </button>
              <button
                type="button"
                onClick={() => setIsSaving(false)}
                className="px-1.5 py-0.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-[10px] cursor-pointer"
              >
                إلغاء
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSaving(true)}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl border text-[11px] font-semibold text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle
              }}
              title="حفظ التخصيص الحالي كقالب خاص"
            >
              <Save className="w-3 h-3" style={{ color: theme.accent }} />
              <span>حفظ</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Left Controls: Copywriter + Cloud Sync + Reset */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {/* Copywriter Modal Trigger (Clean without sparkles) */}
        <button
          onClick={onOpenCopywriterModal}
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl font-bold text-[10px] sm:text-[11px] shadow-sm transition-all active:scale-95 cursor-pointer border"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.border,
            color: theme.accentText
          }}
          title="صانع النصوص التسويقية والكابشن"
        >
          <PenLine className="w-3 h-3" style={{ color: theme.accent }} />
          <span>نصوص</span>
        </button>

        {/* Supabase Cloud Sync Trigger */}
        <button
          onClick={onOpenSupabaseModal}
          className="p-1.5 rounded-xl border text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle
          }}
          title="إعدادات المزامنة السحابية"
        >
          <Database className="w-3.5 h-3.5" />
        </button>

        {/* Reset to Default */}
        <button
          onClick={onResetToDefault}
          className="p-1.5 rounded-xl border text-slate-400 hover:text-white transition-colors cursor-pointer active:scale-95"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle
          }}
          title="إعادة ضبط للأبعاد الافتراضية"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
