import React, { useState } from 'react';
import { Palette, Check, Smartphone, Monitor, Sparkles, Feather, Zap, Sliders } from 'lucide-react';
import { NEON_PALETTES, MUTED_LUXURY_PALETTES, MASTER_PALETTES } from '../utils/themeEngine';
import { NEON_BUTTON_STYLES } from '../utils/neonButtonStyles';
import NeonButton from './NeonButton';

export default function PalettesStudioPanel({
  activePlatformThemeId,
  onSelectPlatformTheme,
  onApplyToCard,
  activeCardPaletteId,
  activeThemeObj,
  activeNeonButtonStyleId = 'frame-01',
  onSelectNeonButtonStyle,
  neonButtonOpacity = 100,
  onNeonButtonOpacityChange
}) {
  // Main Studio Mode: 'neon-buttons' (20 Neon Button Designs) or 'palettes' (24 Color Themes)
  const [studioSection, setStudioSection] = useState('neon-buttons');
  const [activeGroup, setActiveGroup] = useState('neon'); // for palettes: 'neon', 'muted', 'vibrant', 'all'
  const [neonButtonCategory, setNeonButtonCategory] = useState('all'); // for buttons: 'all', 'frame', 'bg-fx'

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

  const displayedNeonButtons = neonButtonCategory === 'frame'
    ? NEON_BUTTON_STYLES.filter(b => b.category === 'frame')
    : neonButtonCategory === 'bg-fx'
      ? NEON_BUTTON_STYLES.filter(b => b.category === 'bg-fx')
      : NEON_BUTTON_STYLES;

  return (
    <div className="space-y-4 text-xs select-none">
      {/* 1. Master Section Switcher (Neon Buttons Studio vs Palettes Studio) */}
      <div
        className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl border shadow-md"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <button
          onClick={() => setStudioSection('neon-buttons')}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-black text-xs transition-all cursor-pointer shadow-sm"
          style={
            studioSection === 'neon-buttons'
              ? {
                  backgroundColor: '#00e5ff',
                  color: '#050714',
                  boxShadow: '0 0 14px rgba(0, 229, 255, 0.5)'
                }
              : {
                  backgroundColor: theme.bgDark,
                  color: theme.textMuted
                }
          }
        >
          <Zap className="w-4 h-4" />
          <span>أزرار مود النيون (20) ⚡</span>
        </button>

        <button
          onClick={() => setStudioSection('palettes')}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm"
          style={
            studioSection === 'palettes'
              ? {
                  backgroundColor: theme.accent,
                  color: theme.bgDark,
                  boxShadow: `0 0 14px ${theme.accentGlow}`
                }
              : {
                  backgroundColor: theme.bgDark,
                  color: theme.textMuted
                }
          }
        >
          <Palette className="w-4 h-4" />
          <span>ثيمات المنصة والغلاف (24) 🎨</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* ⚡ SECTION A: NEON BUTTONS STUDIO (20 Professional Designs + Opacity)     */}
      {/* ========================================================================= */}
      {studioSection === 'neon-buttons' && (
        <div className="space-y-4">
          {/* Header & Opacity Slider Card */}
          <div
            className="p-4 sm:p-5 rounded-2xl border space-y-4 shadow-md transition-colors duration-200"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderSubtle
            }}
          >
            {/* Header Title & Live Preview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl border flex items-center justify-center font-black shadow-inner shrink-0"
                  style={{
                    backgroundColor: '#050714',
                    borderColor: 'rgba(0,229,255,0.4)',
                    color: '#00e5ff',
                    boxShadow: '0 0 12px rgba(0,229,255,0.3)'
                  }}
                >
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-black text-xs sm:text-sm tracking-tight leading-normal mb-0.5" style={{ color: theme.textPrimary }}>
                    استوديو تصاميم زر مود النيون (20 تصميماً طبق الأصل)
                  </h3>
                  <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>
                    اضغط على أي زر لتطبيقه فوراً على زر الهيدر العلوي، مع تحكم كامل بالشفافية
                  </p>
                </div>
              </div>

              {/* Active Button Live Preview Box */}
              <div
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl border self-start sm:self-auto"
                style={{
                  backgroundColor: '#050714',
                  borderColor: 'rgba(0,229,255,0.3)'
                }}
              >
                <span className="text-[10px] font-bold text-slate-400">المفعّل بالهيدر:</span>
                <NeonButton
                  styleId={activeNeonButtonStyleId}
                  opacity={neonButtonOpacity}
                  isActive={true}
                  size="sm"
                />
              </div>
            </div>

            {/* 🎛️ Neon Button Opacity Slider Control */}
            <div
              className="p-3 sm:p-3.5 rounded-xl border space-y-2"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5" style={{ color: '#00e5ff' }} />
                  <span className="font-bold text-[11px]" style={{ color: theme.textPrimary }}>
                    شفافية وكثافة زر مود النيون:
                  </span>
                </div>
                <span
                  className="font-mono font-black text-xs px-2 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: 'rgba(0,229,255,0.1)',
                    borderColor: 'rgba(0,229,255,0.3)',
                    color: '#00e5ff'
                  }}
                >
                  {neonButtonOpacity}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={neonButtonOpacity}
                onChange={(e) => onNeonButtonOpacityChange(Number(e.target.value))}
                className="luxury-slider w-full cursor-pointer"
                style={{ accentColor: '#00e5ff' }}
              />
              <div className="flex items-center justify-between text-[9.5px] font-medium text-slate-400">
                <span>10% شفاف خفيف جداً</span>
                <span>50% متزن</span>
                <span>100% مشبع وساطع بالكامل</span>
              </div>
            </div>

            {/* Category Filter Tabs (All / Frames 10 / Background FX 10) */}
            <div
              className="grid grid-cols-3 gap-1.5 p-1 rounded-xl border shadow-inner"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle
              }}
            >
              <button
                onClick={() => setNeonButtonCategory('all')}
                className="flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer"
                style={
                  neonButtonCategory === 'all'
                    ? {
                        backgroundColor: '#00e5ff',
                        color: '#050714',
                        boxShadow: '0 0 10px rgba(0,229,255,0.4)'
                      }
                    : { color: theme.textMuted }
                }
              >
                <span>جميع الأزرار (20)</span>
              </button>

              <button
                onClick={() => setNeonButtonCategory('frame')}
                className="flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer"
                style={
                  neonButtonCategory === 'frame'
                    ? {
                        backgroundColor: '#ff2d95',
                        color: '#ffffff',
                        boxShadow: '0 0 10px rgba(255,45,149,0.4)'
                      }
                    : { color: theme.textMuted }
                }
              >
                <span>🌟 الهياكل والإطارات (10)</span>
              </button>

              <button
                onClick={() => setNeonButtonCategory('bg-fx')}
                className="flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer"
                style={
                  neonButtonCategory === 'bg-fx'
                    ? {
                        backgroundColor: '#a855f7',
                        color: '#ffffff',
                        boxShadow: '0 0 10px rgba(168,85,247,0.4)'
                      }
                    : { color: theme.textMuted }
                }
              >
                <span>✨ الخلفيات والمؤثرات (10)</span>
              </button>
            </div>
          </div>

          {/* Grid of 20 Neon Button Designs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayedNeonButtons.map((btnStyle) => {
              const isSelected = activeNeonButtonStyleId === btnStyle.id;
              const isFrameGroup = btnStyle.category === 'frame';

              return (
                <div
                  key={btnStyle.id}
                  onClick={() => onSelectNeonButtonStyle(btnStyle.id)}
                  className="p-3.5 rounded-2xl border transition-all space-y-3 cursor-pointer relative overflow-hidden group"
                  style={{
                    backgroundColor: isSelected ? '#0b1020' : theme.bgSurface,
                    borderColor: isSelected ? (isFrameGroup ? '#00e5ff' : '#a855f7') : theme.borderSubtle,
                    boxShadow: isSelected ? `0 0 16px ${isFrameGroup ? 'rgba(0,229,255,0.4)' : 'rgba(168,85,247,0.4)'}` : undefined
                  }}
                >
                  {/* Top Bar: Number Badge + Category + Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono font-black text-[10px] px-2 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: isSelected ? 'rgba(0,229,255,0.2)' : 'rgba(255,255,255,0.05)',
                          borderColor: isSelected ? '#00e5ff' : theme.borderSubtle,
                          color: isSelected ? '#00e5ff' : theme.textPrimary
                        }}
                      >
                        {btnStyle.num}
                      </span>
                      <span className="font-extrabold text-xs" style={{ color: theme.textPrimary }}>
                        {btnStyle.name}
                      </span>
                    </div>

                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: isFrameGroup ? 'rgba(255,45,149,0.15)' : 'rgba(168,85,247,0.15)',
                        borderColor: isFrameGroup ? 'rgba(255,45,149,0.3)' : 'rgba(168,85,247,0.3)',
                        color: isFrameGroup ? '#ff77a9' : '#c084fc'
                      }}
                    >
                      {isFrameGroup ? 'هيكل وإطار' : 'خلفية إبداعية'}
                    </span>
                  </div>

                  {/* Center Interactive Button Display */}
                  <div
                    className="w-full py-4 rounded-xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-[1.02]"
                    style={{
                      backgroundColor: '#04060d',
                      borderColor: 'rgba(255,255,255,0.06)'
                    }}
                  >
                    <NeonButton
                      styleId={btnStyle.id}
                      opacity={neonButtonOpacity}
                      isActive={isSelected}
                      size="lg"
                    />
                  </div>

                  {/* Bottom Description & Selection Action */}
                  <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: theme.borderSubtle }}>
                    <span className="text-[10px] truncate max-w-[190px]" style={{ color: theme.textMuted }}>
                      {btnStyle.arabicName}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectNeonButtonStyle(btnStyle.id);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer"
                      style={
                        isSelected
                          ? {
                              backgroundColor: '#00e5ff',
                              color: '#050714',
                              borderColor: '#00e5ff',
                              boxShadow: '0 0 8px rgba(0,229,255,0.4)'
                            }
                          : {
                              backgroundColor: theme.bgDark,
                              borderColor: theme.borderSubtle,
                              color: theme.textMuted
                            }
                      }
                    >
                      {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : null}
                      <span>{isSelected ? 'مطبّق بالهيدر ✓' : 'اختيار التصميم'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🎨 SECTION B: COLOR PALETTES STUDIO (24 Themes for Platform & Card)       */}
      {/* ========================================================================= */}
      {studioSection === 'palettes' && (
        <div className="space-y-4">
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
                  <Palette className="w-4 h-4" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-black text-xs sm:text-sm tracking-tight leading-normal mb-1.5" style={{ color: theme.textPrimary }}>
                    استوديو اللوحات اللونية (24 ثيماً)
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
      )}
    </div>
  );
}
