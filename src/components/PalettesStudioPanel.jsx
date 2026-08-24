import React, { useState } from 'react';
import { Palette, Check, Smartphone, Monitor, Sparkles, Feather, Zap } from 'lucide-react';
import { NEON_PALETTES, MUTED_LUXURY_PALETTES, MASTER_PALETTES } from '../utils/themeEngine';

export default function PalettesStudioPanel({
  activePlatformThemeId,
  onSelectPlatformTheme,
  onApplyToCard,
  activeCardPaletteId,
  activeThemeObj
}) {
  const [activeGroup, setActiveGroup] = useState('neon'); // 'neon', 'muted', 'vibrant', 'all'

  const theme = activeThemeObj || {
    bgDark: '#0f172a',
    bgSurface: '#1e293b',
    bgCard: '#1e293b',
    border: 'rgba(255,255,255,0.2)',
    borderSubtle: 'rgba(255,255,255,0.08)',
    accent: '#ffffff',
    accentGlow: 'rgba(255,255,255,0.3)',
    accentText: '#ffffff',
    badgeBg: 'rgba(255,255,255,0.1)',
    textPrimary: '#ffffff',
    textMuted: '#94a3b8'
  };

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
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-md transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl border flex items-center justify-center font-bold shadow-inner"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-black text-xs sm:text-sm tracking-tight leading-normal mb-1.5" style={{ color: theme.textPrimary }}>
                استوديو اللوحات اللونية والنيون (24 ثيماً)
              </h3>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>
                اختر بين باقة السايبر نيون، الفخامة الهادئة، أو الباقة الحيوية
              </p>
            </div>
          </div>
        </div>

        {/* Group Selector Segmented Toggle (4-way) */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl border shadow-inner"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle
          }}
        >
          <button
            onClick={() => setActiveGroup('neon')}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer"
            style={
              activeGroup === 'neon'
                ? {
                    backgroundColor: theme.accent,
                    color: theme.bgDark,
                    boxShadow: `0 0 10px ${theme.accentGlow}`
                  }
                : {
                    color: theme.textMuted
                  }
            }
          >
            <Zap className="w-3.5 h-3.5" />
            <span>مود النيون (8)</span>
          </button>

          <button
            onClick={() => setActiveGroup('muted')}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer"
            style={
              activeGroup === 'muted'
                ? {
                    backgroundColor: theme.accent,
                    color: theme.bgDark,
                    boxShadow: `0 0 10px ${theme.accentGlow}`
                  }
                : {
                    color: theme.textMuted
                  }
            }
          >
            <Feather className="w-3.5 h-3.5" />
            <span>الهادئة 70% (8)</span>
          </button>

          <button
            onClick={() => setActiveGroup('vibrant')}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer"
            style={
              activeGroup === 'vibrant'
                ? {
                    backgroundColor: theme.accent,
                    color: theme.bgDark,
                    boxShadow: `0 0 10px ${theme.accentGlow}`
                  }
                : {
                    color: theme.textMuted
                  }
            }
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>الحيوية (8)</span>
          </button>

          <button
            onClick={() => setActiveGroup('all')}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer"
            style={
              activeGroup === 'all'
                ? {
                    backgroundColor: theme.accent,
                    color: theme.bgDark,
                    boxShadow: `0 0 10px ${theme.accentGlow}`
                  }
                : {
                    color: theme.textMuted
                  }
            }
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
              className="p-3.5 rounded-2xl border transition-all space-y-3"
              style={{
                backgroundColor: isPlatformActive || isCardActive ? theme.bgCard : theme.bgSurface,
                borderColor: isPlatformActive || isCardActive ? palette.accent : theme.borderSubtle,
                boxShadow: isPlatformActive || isCardActive ? `0 0 14px ${palette.accentGlow}` : undefined
              }}
            >
              {/* Header: Number, Icon, Title, and Color Dots Preview */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-7 h-7 rounded-xl border flex items-center justify-center text-xs shadow-inner shrink-0"
                    style={{
                      backgroundColor: palette.bgDark,
                      borderColor: palette.accent,
                      boxShadow: isNeon ? `0 0 10px ${palette.accentGlow}` : 'none'
                    }}
                  >
                    {palette.icon}
                  </span>
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-xs leading-snug mb-0.5" style={{ color: theme.textPrimary }}>{palette.name}</span>
                    {palette.group === 'neon' && (
                      <span className="text-[9px] font-bold font-mono leading-tight" style={{ color: palette.accent }}>⚡ نيون ليزري 100%</span>
                    )}
                    {palette.group === 'muted' && (
                      <span className="text-[9px] font-medium font-mono leading-tight" style={{ color: palette.accent }}>هادئ ومريح 70%</span>
                    )}
                    {palette.group === 'vibrant' && (
                      <span className="text-[9px] font-medium font-mono leading-tight" style={{ color: palette.accent }}>حيوي وتباين عالي</span>
                    )}
                  </div>
                </div>

                {/* 3 Accent Color Dots */}
                <div
                  className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded-xl border"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle
                  }}
                >
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
              <div
                className="grid grid-cols-2 gap-2 pt-2 border-t"
                style={{ borderColor: theme.borderSubtle }}
              >
                {/* 1. Apply to Platform */}
                <button
                  onClick={() => onSelectPlatformTheme(palette.id)}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-[10.5px] font-bold border transition-all active:scale-95 cursor-pointer shadow-sm"
                  style={
                    isPlatformActive
                      ? {
                          backgroundColor: palette.accent,
                          color: palette.bgDark,
                          borderColor: palette.accent,
                          boxShadow: `0 0 10px ${palette.accentGlow}`
                        }
                      : {
                          backgroundColor: theme.bgDark,
                          borderColor: theme.borderSubtle,
                          color: theme.textMuted
                        }
                  }
                >
                  {isPlatformActive ? <Check className="w-3 h-3 stroke-[3]" /> : <Monitor className="w-3 h-3" />}
                  <span>{isPlatformActive ? 'ثيم المنصة (نشط)' : 'ثيم المنصة'}</span>
                </button>

                {/* 2. Apply to TikTok Cover Card */}
                <button
                  onClick={() => onApplyToCard(palette)}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-[10.5px] font-bold border transition-all active:scale-95 cursor-pointer shadow-sm"
                  style={
                    isCardActive
                      ? {
                          backgroundColor: 'rgba(16, 185, 129, 0.2)',
                          borderColor: '#34d399',
                          color: '#6ee7b7',
                          boxShadow: '0 0 10px rgba(52, 211, 153, 0.3)'
                        }
                      : {
                          backgroundColor: theme.bgDark,
                          borderColor: theme.borderSubtle,
                          color: theme.textMuted
                        }
                  }
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
