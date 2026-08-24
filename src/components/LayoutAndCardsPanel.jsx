import React, { useState } from 'react';
import { Sparkles, Palette, Sliders, Layers, Frame, Maximize2, Monitor, Tag, Zap, Radio } from 'lucide-react';
import { LUXURY_THEMES, DIVIDER_STYLES, DIVIDER_CATEGORIES } from '../utils/constants';

export default function LayoutAndCardsPanel({
  themeId,
  setThemeId,
  finish,
  setFinish,
  cardData,
  setCardData,
  activePlatformThemeId,
  activeThemeObj
}) {
  const [dividerCategory, setDividerCategory] = useState('all');
  const visibleDividers = DIVIDER_STYLES.filter(d => !d.aliasOf && (dividerCategory === 'all' || d.category === dividerCategory));

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

  const updateCardData = (key, value) => {
    setCardData(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectRealEstateTheme = (newThemeId) => {
    setThemeId(newThemeId);
    // Automatically apply the complete real estate category theme (including borders)
    setCardData(prev => ({
      ...prev,
      borderColorMode: 'theme',
      glowColorMode: 'theme',
      neonCyberMode: newThemeId === 'neon-cyber-dual'
    }));
  };

  const activeTheme = LUXURY_THEMES.find(t => t.id === themeId) || LUXURY_THEMES[0];
  const borderMode = cardData.borderColorMode || 'theme';

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Real Estate Luxury Themes */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div
          className="flex items-center justify-between pb-2.5 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>الثيم اللوني وتصنيف العرض</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>تطبيق الهوية البصرية العقارية الكاملة</p>
            </div>
          </div>
          <span
            className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.accentText,
              borderColor: theme.border
            }}
          >
            THEMES
          </span>
        </div>

        {/* Real Estate Category Buttons with Generous Breathing Room */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {LUXURY_THEMES.map((t) => {
            const isSelected = themeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectRealEstateTheme(t.id)}
                className="py-2.5 px-3 rounded-xl border text-right transition-all cursor-pointer shadow-sm"
                style={{
                  backgroundColor: isSelected ? theme.bgCard : theme.bgDark,
                  borderColor: isSelected ? theme.accent : theme.borderSubtle,
                  boxShadow: isSelected ? `0 0 12px ${theme.accentGlow}` : undefined
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-black truncate leading-snug" style={{ color: theme.textPrimary }}>{t.categoryLabel}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full border shrink-0 shadow-sm"
                    style={{
                      backgroundColor: t.borderColor,
                      borderColor: 'rgba(255,255,255,0.4)',
                      boxShadow: `0 0 6px ${t.borderColor}60`
                    }}
                  />
                </div>
                <div className="text-[10px] truncate font-medium leading-normal" style={{ color: theme.textMuted }}>{t.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ⚡ 2. Cyber Neon FX Controls */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.border,
          boxShadow: `0 0 20px ${theme.accentGlow}`
        }}
      >
        <div
          className="flex items-center justify-between pb-2.5 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-sm border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.border,
                color: theme.accent
              }}
            >
              <Zap className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>تأثيرات السايبر نيون المتطورة</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>توهج ليزري وشبكة نيون أرضية ثلاثية الأبعاد</p>
            </div>
          </div>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.accentText,
              borderColor: theme.border
            }}
          >
            NEON PRO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Toggle 1: True Neon Glow */}
          <button
            onClick={() => updateCardData('neonCyberMode', !cardData.neonCyberMode)}
            className="py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer shadow-sm"
            style={{
              backgroundColor: cardData.neonCyberMode ? theme.bgCard : theme.bgDark,
              borderColor: cardData.neonCyberMode ? theme.accent : theme.borderSubtle,
              color: cardData.neonCyberMode ? theme.textPrimary : theme.textMuted,
              boxShadow: cardData.neonCyberMode ? `0 0 12px ${theme.accentGlow}` : undefined
            }}
          >
            <div className="text-[11px] leading-snug font-bold">⚡ توهج نيون ليزري 100%</div>
          </button>

          {/* Toggle 2: 3D Perspective Cyber Grid */}
          <button
            onClick={() => updateCardData('showCyberGrid', !cardData.showCyberGrid)}
            className="py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer shadow-sm"
            style={{
              backgroundColor: cardData.showCyberGrid ? theme.bgCard : theme.bgDark,
              borderColor: cardData.showCyberGrid ? theme.accent : theme.borderSubtle,
              color: cardData.showCyberGrid ? theme.textPrimary : theme.textMuted,
              boxShadow: cardData.showCyberGrid ? `0 0 12px ${theme.accentGlow}` : undefined
            }}
          >
            <div className="text-[11px] leading-snug font-bold">🌐 شبكة نيون 3D أرضية</div>
          </button>

          {/* Toggle 3: Neon Tube Text Glow */}
          <button
            onClick={() => updateCardData('neonTextGlow', !cardData.neonTextGlow)}
            className="py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer shadow-sm"
            style={{
              backgroundColor: cardData.neonTextGlow ? theme.bgCard : theme.bgDark,
              borderColor: cardData.neonTextGlow ? theme.accent : theme.borderSubtle,
              color: cardData.neonTextGlow ? theme.textPrimary : theme.textMuted,
              boxShadow: cardData.neonTextGlow ? `0 0 12px ${theme.accentGlow}` : undefined
            }}
          >
            <div className="text-[11px] leading-snug font-bold">💡 لمعة نيون للنصوص</div>
          </button>
        </div>
      </div>

      {/* 3. Glass Finish Mode (Matte vs Glossy) */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div
          className="flex items-center justify-between pb-2.5 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>تشطيب ونقاء زجاج القالب</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>انعكاسات زجاجية بلمعة أو ملمس مخملي مطفي</p>
            </div>
          </div>
          <span
            className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.accentText,
              borderColor: theme.border
            }}
          >
            FINISH
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setFinish('matte')}
            className="py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer shadow-sm"
            style={
              finish === 'matte'
                ? {
                    backgroundColor: theme.accent,
                    color: theme.bgDark,
                    borderColor: theme.accent,
                    boxShadow: `0 0 12px ${theme.accentGlow}`
                  }
                : {
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle,
                    color: theme.textMuted
                  }
            }
          >
            <div className="text-[11.5px] font-bold">✨ زجاج مطفي (Matte)</div>
          </button>

          <button
            onClick={() => setFinish('glossy')}
            className="py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer shadow-sm"
            style={
              finish === 'glossy'
                ? {
                    backgroundColor: theme.accent,
                    color: theme.bgDark,
                    borderColor: theme.accent,
                    boxShadow: `0 0 12px ${theme.accentGlow}`
                  }
                : {
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle,
                    color: theme.textMuted
                  }
            }
          >
            <div className="text-[11.5px] font-bold">💎 زجاج بلمعة (Glossy)</div>
          </button>
        </div>
      </div>

      {/* 4. Box Dimensions & Proportions (Width & Height) */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div
          className="flex items-center justify-between pb-2.5 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>أبعاد وتناسب البوكس والزجاج</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>العرض، الهامش، الموقع الرأسي، والشفافية الكريستالية</p>
            </div>
          </div>
          <span
            className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.accentText,
              borderColor: theme.border
            }}
          >
            LAYOUT
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>عرض البوكس</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
                {cardData.boxWidth ?? 84}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={cardData.boxWidth ?? 84}
              onChange={(e) => updateCardData('boxWidth', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>الهامش والارتفاع الداخلي</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
                {cardData.boxPaddingY ?? 20}px
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="44"
              value={cardData.boxPaddingY ?? 20}
              onChange={(e) => updateCardData('boxPaddingY', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>الموقع الرأسي (Y)</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
                {cardData.verticalPosition ?? 50}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              value={cardData.verticalPosition ?? 50}
              onChange={(e) => updateCardData('verticalPosition', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>عتمة الزجاج (0%=شفاف)</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
                {cardData.boxOpacity ?? 60}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={cardData.boxOpacity ?? 60}
              onChange={(e) => updateCardData('boxOpacity', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>ضبابية الزجاج (0=نقي)</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
                {cardData.boxBlur ?? 20}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={cardData.boxBlur ?? 20}
              onChange={(e) => updateCardData('boxBlur', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>
        </div>
      </div>

      {/* 5. Border & Glow Controls with Dynamic Source Selection */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div
          className="flex items-center justify-between pb-2.5 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Frame className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>حدود البوكس والتوهج</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>سماكة الإطار، انحناء الزوايا، وتأثير الهالة المشعة</p>
            </div>
          </div>

          {/* 3-Way Segmented Control: Theme vs Platform vs Custom */}
          <div
            className="flex items-center gap-1 p-1 rounded-xl border shadow-inner"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle
            }}
          >
            <button
              onClick={() => {
                updateCardData('borderColorMode', 'theme');
                updateCardData('glowColorMode', 'theme');
              }}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer"
              style={
                borderMode === 'theme'
                  ? {
                      backgroundColor: theme.accent,
                      color: theme.bgDark,
                      borderColor: theme.accent,
                      boxShadow: `0 0 10px ${theme.accentGlow}`
                    }
                  : {
                      backgroundColor: theme.bgDark,
                      borderColor: 'transparent',
                      color: theme.textMuted
                    }
              }
            >
              <Tag className="w-3 h-3" />
              <span>تصنيف العرض</span>
            </button>

            <button
              onClick={() => {
                updateCardData('borderColorMode', 'platform');
                updateCardData('glowColorMode', 'platform');
              }}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer"
              style={
                borderMode === 'platform'
                  ? {
                      backgroundColor: theme.accent,
                      color: theme.bgDark,
                      borderColor: theme.accent,
                      boxShadow: `0 0 10px ${theme.accentGlow}`
                    }
                  : {
                      backgroundColor: theme.bgDark,
                      borderColor: 'transparent',
                      color: theme.textMuted
                    }
              }
            >
              <Monitor className="w-3 h-3" />
              <span>ثيم المنصة</span>
            </button>

            <button
              onClick={() => {
                updateCardData('borderColorMode', 'custom');
                updateCardData('glowColorMode', 'custom');
              }}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer"
              style={
                borderMode === 'custom'
                  ? {
                      backgroundColor: theme.accent,
                      color: theme.bgDark,
                      borderColor: theme.accent,
                      boxShadow: `0 0 10px ${theme.accentGlow}`
                    }
                  : {
                      backgroundColor: theme.bgDark,
                      borderColor: 'transparent',
                      color: theme.textMuted
                    }
              }
            >
              <Palette className="w-3 h-3" />
              <span>مخصص</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>سماكة الحد</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
                {cardData.borderWidth ?? 1.5}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="0.5"
              value={cardData.borderWidth ?? 1.5}
              onChange={(e) => updateCardData('borderWidth', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>انحناء الزوايا</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
                {cardData.borderRadius ?? 32}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              value={cardData.borderRadius ?? 32}
              onChange={(e) => updateCardData('borderRadius', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>شدة التوهج</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
                {cardData.borderGlowIntensity ?? 75}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={cardData.borderGlowIntensity ?? 75}
              onChange={(e) => updateCardData('borderGlowIntensity', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>
        </div>

        {/* Custom Border and Glow Color Pickers (Visible when custom mode is active) */}
        {borderMode === 'custom' && (
          <div
            className="flex items-center gap-4 pt-1 p-2.5 rounded-xl border"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle
            }}
          >
            <label className="flex items-center gap-2 cursor-pointer" style={{ color: theme.textPrimary }}>
              <span className="text-[11px] font-medium">لون الحد المخصص:</span>
              <input
                type="color"
                value={cardData.customBorderColor || activeTheme.borderColor}
                onChange={(e) => updateCardData('customBorderColor', e.target.value)}
                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
              />
            </label>

            <label className="flex items-center gap-2 cursor-pointer" style={{ color: theme.textPrimary }}>
              <span className="text-[11px] font-medium">لون التوهج المخصص:</span>
              <input
                type="color"
                value={cardData.customGlowColor || activeTheme.borderColor}
                onChange={(e) => updateCardData('customGlowColor', e.target.value)}
                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
              />
            </label>
          </div>
        )}
      </div>

      {/* 6. Master Architectural & Luxury Dividers Studio */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-md transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div
          className="flex items-center justify-between pb-2.5 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Sliders className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>استوديو الفواصل المعمارية والسينمائية</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>16 نمطاً هندسياً وتحريرياً مع تحكم كامل بالسماكة والسطوع</p>
            </div>
          </div>
          <span
            className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.accentText,
              borderColor: theme.border
            }}
          >
            DIVIDERS
          </span>
        </div>

        {/* Compact Segmented Pills for Categories */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl border shadow-inner"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle
          }}
        >
          {DIVIDER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setDividerCategory(cat.id)}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer"
              style={
                dividerCategory === cat.id
                  ? {
                      backgroundColor: theme.accent,
                      color: theme.bgDark,
                      boxShadow: `0 0 8px ${theme.accentGlow}`
                    }
                  : {
                      color: theme.textMuted
                    }
              }
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Visual Interactive Mini-Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1">
          {visibleDividers.map((d) => {
            const isSelected = (cardData.dividerStyle || 'wireframe-pill') === d.id ||
              ((cardData.dividerStyle === 'tag' && d.id === 'wireframe-pill') ||
               (cardData.dividerStyle === 'diamond' && d.id === 'triple-diamond') ||
               (cardData.dividerStyle === 'line' && d.id === 'radiant-hairline'));

            return (
              <button
                key={d.id}
                onClick={() => updateCardData('dividerStyle', d.id)}
                className="p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between gap-1.5 cursor-pointer"
                style={{
                  backgroundColor: isSelected ? theme.bgCard : theme.bgDark,
                  borderColor: isSelected ? theme.accent : theme.borderSubtle,
                  boxShadow: isSelected ? `0 0 10px ${theme.accentGlow}` : undefined
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-black" style={{ color: isSelected ? theme.textPrimary : theme.textMuted }}>{d.name}</span>
                  {isSelected && <span className="text-[10px] font-black" style={{ color: theme.accent }}>✓</span>}
                </div>

                {/* Live Vector Mini-Preview */}
                <div
                  className="w-full h-7 rounded-lg border flex items-center justify-center px-2 pointer-events-none"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle
                  }}
                >
                  {d.id === 'dim-ticks' && (
                    <div className="w-full flex items-center justify-between relative h-1.5">
                      <div className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-amber-400/60" />
                      <div className="w-[1px] h-1.5 bg-amber-400 z-10" />
                      <div className="w-[1px] h-2 bg-amber-400 z-10" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 z-10" />
                      <div className="w-[1px] h-2 bg-amber-400 z-10" />
                      <div className="w-[1px] h-1.5 bg-amber-400 z-10" />
                    </div>
                  )}

                  {d.id === 'crosshair' && (
                    <div className="w-full flex items-center justify-center gap-2">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full border border-amber-400 flex items-center justify-center">
                        <div className="w-1 h-1 bg-amber-400 rounded-full" />
                      </div>
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                  )}

                  {d.id === 'double-beam' && (
                    <div className="w-full flex flex-col items-center gap-0.5">
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                      <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
                    </div>
                  )}

                  {d.id === 'surveyor-prism' && (
                    <div className="w-full flex items-center justify-center gap-1.5">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                      <span className="text-[8px] text-amber-400 leading-none">▲</span>
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                  )}

                  {d.id === 'triple-diamond' && (
                    <div className="w-full flex items-center justify-center gap-1">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                      <span className="text-[6px] text-amber-400/70">◇</span>
                      <span className="text-[9px] text-amber-400">◆</span>
                      <span className="text-[6px] text-amber-400/70">◇</span>
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                  )}

                  {d.id === 'radiant-hairline' && (
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  )}

                  {d.id === 'dot-matrix' && (
                    <div className="w-full flex items-center justify-center gap-1.5">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400/50" />
                      <div className="w-1 h-1 rounded-sm rotate-45 bg-amber-400/70" />
                      <div className="w-1.5 h-1.5 rounded-sm rotate-45 bg-amber-400" />
                      <div className="w-1 h-1 rounded-sm rotate-45 bg-amber-400/70" />
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400/50" />
                    </div>
                  )}

                  {d.id === 'modern-arch' && (
                    <div className="w-full flex items-center justify-center gap-1.5">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                      <div className="w-5 h-2.5 border-t-2 border-amber-400 rounded-t-full" />
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                  )}

                  {d.id === 'wireframe-pill' && (
                    <div className="w-full flex items-center justify-center gap-1">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                      <span className="px-2 py-0.2 rounded-full border border-amber-400 text-[8px] font-black text-amber-300">
                        {cardData.dividerTagText || 'VIP'}
                      </span>
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                  )}

                  {d.id === 'bracketed-monogram' && (
                    <div className="w-full flex items-center justify-center gap-1 font-mono text-[8px] font-bold text-amber-400">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                      <span>[ {cardData.dividerTagText || 'VIP'} ]</span>
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                  )}

                  {d.id === 'beveled-cut' && (
                    <div className="w-full flex items-center justify-center gap-1">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                      <div className="w-2 h-[1px] rotate-45 bg-amber-400" />
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                  )}

                  {d.id === 'golden-ratio-bars' && (
                    <div className="w-full flex items-center justify-center gap-1">
                      <div className="w-3 h-[1px] bg-amber-400/50" />
                      <div className="w-6 h-[1.5px] bg-amber-400" />
                      <div className="w-3 h-[1px] bg-amber-400/50" />
                    </div>
                  )}

                  {d.id === 'cinematic-block' && (
                    <div className="w-full flex items-center gap-1">
                      <div className="w-1.5 h-2 bg-amber-400" />
                      <div className="flex-1 h-1.5 bg-amber-400" />
                      <div className="w-1.5 h-2 bg-amber-400" />
                    </div>
                  )}

                  {d.id === 'cyber-pulse' && (
                    <div className="w-full flex items-center justify-center gap-1">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white border border-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
                    </div>
                  )}

                  {d.id === 'corner-brackets' && (
                    <div className="w-full flex items-center justify-center gap-1 font-mono text-[8px] font-bold text-amber-400">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                      <span className="text-[10px] font-bold leading-none">⌜</span>
                      <span className="text-[7px] text-white font-bold">{cardData.dividerTagText || 'REC 4K'}</span>
                      <span className="text-[10px] font-bold leading-none">⌟</span>
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                  )}

                  {d.id === 'minimal-solid' && (
                    <div className="w-full h-1 bg-amber-400 rounded-full" />
                  )}

                  {d.id === 'none' && (
                    <span className="text-[10px] text-slate-500 font-medium">بدون أي خط فاصل</span>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 truncate">{d.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Smart Inline Text Input (Only visible when selected divider supports customizable text) */}
        {(() => {
          const currentStyle = cardData.dividerStyle || 'wireframe-pill';
          const isTextSupported = currentStyle === 'wireframe-pill' || currentStyle === 'bracketed-monogram' || currentStyle === 'corner-brackets' || currentStyle === 'tag';
          if (!isTextSupported) return null;

          return (
            <div className="pt-2 flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-200 text-xs font-bold">النص المخصص للفاصل:</span>
              </div>
              <input
                type="text"
                value={cardData.dividerTagText !== undefined ? cardData.dividerTagText : 'VIP'}
                onChange={(e) => updateCardData('dividerTagText', e.target.value)}
                className="bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs text-white outline-none w-32 font-black text-center transition-all"
                placeholder="VIP"
              />
            </div>
          );
        })()}

        {/* Advanced Multi-Parameter Sliders for Pro Divider Customization */}
        <div className="space-y-3 pt-1 border-t border-slate-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* 1. Thickness */}
            <div>
              <div className="flex justify-between items-center mb-1 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
                <span>سمك وحدة الفاصل</span>
                <span
                  className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle
                  }}
                >
                  {cardData.dividerThickness ?? 1.5}px
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={cardData.dividerThickness ?? 1.5}
                onChange={(e) => updateCardData('dividerThickness', Number(e.target.value))}
                className="luxury-slider mt-1"
              />
            </div>

            {/* 2. Opacity / Boost up to 200% */}
            <div>
              <div className="flex justify-between items-center mb-1 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
                <span>شفافية وسطوع الفاصل</span>
                <span
                  className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle
                  }}
                >
                  {cardData.dividerOpacity ?? 100}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={cardData.dividerOpacity ?? 100}
                onChange={(e) => updateCardData('dividerOpacity', Number(e.target.value))}
                className="luxury-slider mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 3. Glow Intensity up to 200% */}
            <div>
              <div className="flex justify-between items-center mb-1 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
                <span>توهج وإشعاع الفاصل</span>
                <span
                  className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle
                  }}
                >
                  {cardData.dividerGlow ?? 80}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={cardData.dividerGlow ?? 80}
                onChange={(e) => updateCardData('dividerGlow', Number(e.target.value))}
                className="luxury-slider mt-1"
              />
            </div>

            {/* 4. Divider Width */}
            <div>
              <div className="flex justify-between items-center mb-1 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
                <span>امتداد وعرض الفاصل</span>
                <span
                  className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle
                  }}
                >
                  {cardData.dividerWidth ?? 88}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="2"
                value={cardData.dividerWidth ?? 88}
                onChange={(e) => updateCardData('dividerWidth', Number(e.target.value))}
                className="luxury-slider mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
