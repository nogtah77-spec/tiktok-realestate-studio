import React, { useState } from 'react';
import { Sparkles, Save, RotateCcw, Database, Palette } from 'lucide-react';
import { NEON_PALETTES, MUTED_LUXURY_PALETTES, MASTER_PALETTES } from '../utils/themeEngine';

export default function Header({
  presets = [],
  activePresetId,
  onSelectPreset,
  onSavePreset,
  onResetToDefault,
  onOpenSupabaseModal,
  onOpenCopywriterModal,
  activePlatformThemeId,
  onSelectPlatformTheme,
  activeThemeObj
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

  return (
    <header
      className="h-13 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-2.5 sm:px-4 border-b transition-colors duration-200"
      style={{
        backgroundColor: theme.bgSurface,
        borderColor: theme.border
      }}
    >
      {/* Brand Title & Neon Mode Indicator */}
      <div className="flex items-center gap-2 shrink-0">
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shadow-sm transition-all"
          style={{
            backgroundColor: theme.accent,
            color: theme.bgDark,
            boxShadow: `0 0 10px ${theme.accentGlow}`
          }}
        >
          ع
        </div>
        <div className="flex items-center gap-1.5">
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

      {/* Center Theme Switcher & Presets Dropdown */}
      <div className="hidden md:flex items-center gap-2">
        {/* ⚡ Quick Neon Mode Switcher Button with Deep Plasma & Pure Clean Text */}
        <button
          onClick={() => {
            if (isCurrentThemeNeon) {
              onSelectPlatformTheme('matte-charcoal-platinum');
            } else {
              onSelectPlatformTheme('neon-cyber-pink');
            }
          }}
          className={`relative overflow-hidden group px-3.5 py-1 rounded-xl text-[11px] font-black border transition-all duration-300 cursor-pointer shadow-md select-none ${
            isCurrentThemeNeon
              ? 'border-cyan-400 text-white neon-btn-active'
              : 'border-cyan-500/30 text-cyan-200/90 hover:border-cyan-400 hover:text-white'
          }`}
          style={{
            backgroundColor: isCurrentThemeNeon ? '#050714' : '#0a0e1a'
          }}
          title="تبديل وضع السايبر نيون"
        >
          {/* Layer 1: Deep Plasma Glow in the Background Behind Text */}
          <div
            className={`absolute top-1/2 left-1/2 w-28 h-12 rounded-full pointer-events-none blur-md -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              isCurrentThemeNeon ? 'opacity-90 neon-btn-plasma' : 'opacity-35 group-hover:opacity-75'
            }`}
            style={{
              background: isCurrentThemeNeon
                ? 'radial-gradient(ellipse at center, rgba(0,229,255,0.7) 0%, rgba(255,0,128,0.45) 50%, transparent 80%)'
                : 'radial-gradient(ellipse at center, rgba(0,229,255,0.4) 0%, transparent 75%)'
            }}
          />

          {/* Layer 2: Subtle Animated Lightning/Electric Shimmer Sweep Behind Text */}
          <div
            className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 ${
              isCurrentThemeNeon ? 'opacity-75' : 'opacity-0 group-hover:opacity-50'
            }`}
          >
            <div
              className="w-10 h-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent neon-btn-lightning"
            />
          </div>

          {/* Layer 3: Glass Top Reflection */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 60%, transparent 100%)'
            }}
          />

          {/* Layer 4: Pure Floating Text "مود النيون" */}
          <span
            className="relative z-10 tracking-wide transition-all duration-200"
            style={{
              textShadow: isCurrentThemeNeon
                ? '0 0 2px #ffffff, 0 0 8px #00e5ff, 0 0 16px rgba(0,229,255,0.85)'
                : '0 0 6px rgba(0,229,255,0.5)'
            }}
          >
            مود النيون
          </span>
        </button>

        {/* Quick Platform Theme Selector */}
        <div
          className="flex items-center gap-1 border rounded-lg px-2 py-0.5"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.border
          }}
        >
          <Palette className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accent }} />
          <select
            value={activePlatformThemeId}
            onChange={(e) => onSelectPlatformTheme(e.target.value)}
            className="bg-transparent text-[11px] font-bold text-slate-200 outline-none cursor-pointer pr-1"
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

        {/* Real Estate Models Preset Dropdown */}
        <select
          value={activePresetId}
          onChange={(e) => {
            const found = presets.find(p => p.id === e.target.value);
            if (found) onSelectPreset(found);
          }}
          className="px-2.5 py-1 rounded-lg border text-[11px] font-semibold text-slate-200 outline-none cursor-pointer"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle
          }}
        >
          {presets.map((preset) => (
            <option key={preset.id} value={preset.id} className="bg-slate-900 text-white">
              {preset.name}
            </option>
          ))}
        </select>

        {/* Save Custom Preset Button */}
        {isSaving ? (
          <form onSubmit={handleSaveSubmit} className="flex items-center gap-1">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="اسم القالب..."
              className="px-2 py-0.5 rounded-lg border text-[11px] text-white outline-none w-28 font-bold"
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
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle
            }}
          >
            <Save className="w-3 h-3" style={{ color: theme.accent }} />
            <span>حفظ كقالب</span>
          </button>
        )}
      </div>

      {/* Right Controls: AI Copywriter + Cloud Sync + Reset */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Copywriter Modal Trigger */}
        <button
          onClick={onOpenCopywriterModal}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg font-bold text-[11px] shadow-sm transition-all active:scale-95 cursor-pointer border"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.border,
            color: theme.accentText
          }}
          title="مولد النصوص التسويقية والكابشن لتيك توك وإنستغرام"
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accent }} />
          <span>صانع النصوص</span>
        </button>

        {/* Supabase Cloud Sync Modal Trigger */}
        <button
          onClick={onOpenSupabaseModal}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle
          }}
          title="إعدادات المزامنة السحابية"
        >
          <Database className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">سحابة</span>
        </button>

        {/* Reset to Default */}
        <button
          onClick={onResetToDefault}
          className="p-1.5 rounded-lg border text-slate-400 hover:text-white transition-colors cursor-pointer"
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
