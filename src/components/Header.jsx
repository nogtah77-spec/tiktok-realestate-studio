import React, { useState } from 'react';
import { Sparkles, Save, RotateCcw, Share2, Database, Palette } from 'lucide-react';
import { MASTER_PALETTES } from '../utils/themeEngine';

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

  return (
    <header
      className="h-13 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-2.5 sm:px-4 border-b transition-colors duration-200"
      style={{
        backgroundColor: theme.bgSurface,
        borderColor: theme.border
      }}
    >
      {/* Brand Title */}
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
            {MASTER_PALETTES.map((p) => (
              <option key={p.id} value={p.id} style={{ backgroundColor: p.bgSurface, color: '#ffffff' }}>
                {p.num} {p.icon} {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </option>
            ))}
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
          {presets.map((p) => (
            <option key={p.id} value={p.id} style={{ backgroundColor: theme.bgSurface, color: '#ffffff' }}>
              {p.name}
            </option>
          ))}
        </select>

        {isSaving ? (
          <form onSubmit={handleSaveSubmit} className="flex items-center gap-1">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="اسم النموذج..."
              className="px-2 py-0.5 rounded border text-xs text-white outline-none w-28"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.accent
              }}
              autoFocus
            />
            <button
              type="submit"
              className="px-2 py-0.5 rounded font-bold text-xs"
              style={{
                backgroundColor: theme.accent,
                color: theme.bgDark
              }}
            >
              حفظ
            </button>
            <button type="button" onClick={() => setIsSaving(false)} className="text-slate-400 text-xs px-1">
              ✕
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsSaving(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-medium text-slate-300 transition-colors"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle
            }}
          >
            <Save className="w-3 h-3" style={{ color: theme.accent }} />
            <span>حفظ</span>
          </button>
        )}
      </div>

      {/* Action Buttons (Compact & Guaranteed Single Line) */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onOpenCopywriterModal}
          className="flex items-center gap-1 px-2 py-1 rounded-lg border font-bold text-[11px] whitespace-nowrap shrink-0 transition-all active:scale-95 cursor-pointer"
          style={{
            backgroundColor: theme.badgeBg,
            color: theme.accentText,
            borderColor: theme.border
          }}
        >
          <Share2 className="w-3 h-3 shrink-0" />
          <span className="whitespace-nowrap">نصوص</span>
        </button>

        <button
          onClick={onResetToDefault}
          className="p-1 rounded-lg border text-slate-400 hover:text-white transition-colors"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle
          }}
          title="إعادة ضبط"
        >
          <RotateCcw className="w-3 h-3" />
        </button>

        <button
          onClick={onOpenSupabaseModal}
          className="p-1 rounded-lg border text-slate-400 hover:text-white transition-colors"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle
          }}
          title="سحابة Supabase"
        >
          <Database className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
}
