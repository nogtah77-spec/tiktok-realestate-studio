import React, { useState } from 'react';
import { Palette, Check, Smartphone, Monitor, Sparkles, Feather, Zap } from 'lucide-react';
import { NEON_PALETTES, MUTED_LUXURY_PALETTES, MASTER_PALETTES } from '../utils/themeEngine';

export default function PalettesStudioPanel({
  activePlatformThemeId,
  onSelectPlatformTheme,
  onApplyToCard,
  activeCardPaletteId
}) {
  const [activeGroup, setActiveGroup] = useState('neon'); // 'neon', 'muted', 'vibrant', 'all'

  const displayedPalettes = activeGroup === 'neon'
    ? NEON_PALETTES
    : activeGroup === 'muted'
      ? MUTED_LUXURY_PALETTES
      : activeGroup === 'vibrant'
        ? MASTER_PALETTES
        : [...NEON_PALETTES, ...MUTED_LUXURY_PALETTES, ...MASTER_PALETTES];

  return (
    <div className="space-y-4 text-xs select-none">
      {/* Header & Group Selector Tabs */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3.5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-bold shadow-inner">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-black text-slate-100 text-xs sm:text-sm tracking-tight leading-snug mb-0.5">استوديو اللوحات اللونية والنيون (24 ثيماً)</h3>
              <p className="text-[10.5px] text-slate-400 leading-normal">اختر بين باقة السايبر نيون، الفخامة الهادئة، أو الباقة الحيوية</p>
            </div>
          </div>
        </div>

        {/* Group Selector Segmented Toggle (4-way) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveGroup('neon')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
              activeGroup === 'neon'
                ? 'bg-cyan-400 text-slate-950 font-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'text-cyan-400/80 hover:text-cyan-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>مود النيون (8)</span>
          </button>

          <button
            onClick={() => setActiveGroup('muted')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
              activeGroup === 'muted'
                ? 'bg-white text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>الهادئة 70% (8)</span>
          </button>

          <button
            onClick={() => setActiveGroup('vibrant')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
              activeGroup === 'vibrant'
                ? 'bg-white text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>الحيوية (8)</span>
          </button>

          <button
            onClick={() => setActiveGroup('all')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
              activeGroup === 'all'
                ? 'bg-white text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>الكل (24)</span>
          </button>
        </div>
      </div>

      {/* Grid of Theme Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayedPalettes.map((palette) => {
          const isPlatformActive = activePlatformThemeId === palette.id;
          const isCardActive = activeCardPaletteId === palette.id;
          const isNeon = palette.group === 'neon';

          return (
            <div
              key={palette.id}
              className={`p-3.5 rounded-2xl border transition-all space-y-3 ${
                isPlatformActive || isCardActive
                  ? isNeon
                    ? 'border-cyan-400 bg-slate-900 ring-1 ring-cyan-400/50 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                    : 'border-white bg-slate-900 ring-1 ring-white/30 shadow-lg'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
              }`}
            >
              {/* Header: Number, Icon, Title, and Color Dots Preview */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-7 h-7 rounded-xl border flex items-center justify-center text-xs shadow-inner shrink-0"
                    style={{
                      backgroundColor: isNeon ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      borderColor: isNeon ? palette.accent : 'rgba(255, 255, 255, 0.15)',
                      boxShadow: isNeon ? `0 0 10px ${palette.accentGlow}` : 'none'
                    }}
                  >
                    {palette.icon}
                  </span>
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-slate-100 text-xs leading-snug mb-0.5">{palette.name}</span>
                    {palette.group === 'neon' && (
                      <span className="text-[9px] text-cyan-400 font-bold font-mono leading-tight">⚡ نيون ليزري 100%</span>
                    )}
                    {palette.group === 'muted' && (
                      <span className="text-[9px] text-emerald-400 font-medium font-mono leading-tight">هادئ ومريح 70%</span>
                    )}
                    {palette.group === 'vibrant' && (
                      <span className="text-[9px] text-amber-400 font-medium font-mono leading-tight">حيوي وتباين عالي</span>
                    )}
                  </div>
                </div>

                {/* 3 Accent Color Dots */}
                <div className="flex items-center gap-1.5 shrink-0 bg-slate-900/90 px-2 py-1 rounded-xl border border-slate-800">
                  <span
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{
                      backgroundColor: palette.accent,
                      boxShadow: isNeon ? `0 0 6px ${palette.accentGlow}` : 'none'
                    }}
                  />
                  <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: palette.bgSurface }} />
                  <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: palette.textPrimary }} />
                </div>
              </div>

              {/* Two Action Buttons with Breathing Room */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                {/* 1. Apply to Platform */}
                <button
                  onClick={() => onSelectPlatformTheme(palette.id)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-[10.5px] font-bold border transition-all active:scale-95 cursor-pointer shadow-sm ${
                    isPlatformActive
                      ? isNeon
                        ? 'border-cyan-400 bg-cyan-400 text-slate-950 font-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                        : 'border-white bg-white text-slate-950 font-black shadow'
                      : 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {isPlatformActive ? <Check className="w-3 h-3 stroke-[3]" /> : <Monitor className="w-3 h-3" />}
                  <span>{isPlatformActive ? 'ثيم المنصة (نشط)' : 'ثيم المنصة'}</span>
                </button>

                {/* 2. Apply to TikTok Cover Card */}
                <button
                  onClick={() => onApplyToCard(palette)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-[10.5px] font-bold border transition-all active:scale-95 cursor-pointer shadow-sm ${
                    isCardActive
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 font-black shadow ring-1 ring-emerald-400/40'
                      : 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {isCardActive ? <Check className="w-3 h-3 stroke-[3] text-emerald-400" /> : <Smartphone className="w-3 h-3" />}
                  <span>{isCardActive ? 'مطبّق على الغلاف ✓' : 'تطبيق على الغلاف'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
