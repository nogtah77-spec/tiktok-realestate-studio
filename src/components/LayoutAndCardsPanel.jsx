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
  activePlatformThemeId
}) {
  const [dividerCategory, setDividerCategory] = useState('all');
  const visibleDividers = DIVIDER_STYLES.filter(d => !d.aliasOf && (dividerCategory === 'all' || d.category === dividerCategory));

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
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black shadow-inner">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">الثيم اللوني وتصنيف العرض</h4>
              <p className="text-[10px] text-slate-400">تطبيق الهوية البصرية العقارية الكاملة</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            THEMES
          </span>
        </div>

        {/* Compact Real Estate Category Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LUXURY_THEMES.map((theme) => {
            const isSelected = themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleSelectRealEstateTheme(theme.id)}
                className={`py-2 px-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-white bg-slate-800 text-white ring-1 ring-white/30 shadow-md'
                    : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10.5px] font-black text-white truncate">{theme.categoryLabel}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/30 shrink-0 shadow-sm"
                    style={{ backgroundColor: theme.borderColor, boxShadow: `0 0 6px ${theme.borderColor}60` }}
                  />
                </div>
                <div className="text-[9.5px] text-slate-300/85 truncate font-medium">{theme.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ⚡ 2. Cyber Neon FX Controls */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3 shadow-[0_0_20px_rgba(0,229,255,0.08)]">
        <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-black shadow-[0_0_8px_rgba(0,229,255,0.4)]">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-black text-white text-xs">تأثيرات السايبر نيون المتطورة</h4>
              <p className="text-[10px] text-cyan-400/80">توهج ليزري وشبكة نيون أرضية ثلاثية الأبعاد</p>
            </div>
          </div>
          <span className="text-[9px] font-bold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/40">
            NEON PRO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Toggle 1: True Neon Glow */}
          <button
            onClick={() => updateCardData('neonCyberMode', !cardData.neonCyberMode)}
            className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
              cardData.neonCyberMode
                ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)] ring-1 ring-cyan-400/40'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[10.5px]">⚡ توهج نيون ليزري 100%</div>
          </button>

          {/* Toggle 2: 3D Perspective Cyber Grid */}
          <button
            onClick={() => updateCardData('showCyberGrid', !cardData.showCyberGrid)}
            className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
              cardData.showCyberGrid
                ? 'border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-200 font-bold shadow-[0_0_12px_rgba(255,0,230,0.3)] ring-1 ring-fuchsia-400/40'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[10.5px]">🌐 شبكة نيون 3D أرضية</div>
          </button>

          {/* Toggle 3: Neon Tube Text Glow */}
          <button
            onClick={() => updateCardData('neonTextGlow', !cardData.neonTextGlow)}
            className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
              cardData.neonTextGlow
                ? 'border-amber-400 bg-amber-500/20 text-amber-200 font-bold shadow-[0_0_12px_rgba(255,184,0,0.3)] ring-1 ring-amber-400/40'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[10.5px]">💡 لمعة نيون للنصوص</div>
          </button>
        </div>
      </div>

      {/* 3. Glass Finish Mode (Matte vs Glossy) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center font-black shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">تشطيب ونقاء زجاج القالب</h4>
              <p className="text-[10px] text-slate-400">انعكاسات زجاجية بلمعة أو ملمس مخملي مطفي</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full border border-purple-400/20">
            FINISH
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setFinish('matte')}
            className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
              finish === 'matte'
                ? 'border-white bg-white/15 text-white font-black ring-1 ring-white/30 shadow'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[11px] font-bold">✨ زجاج مطفي (Matte)</div>
          </button>

          <button
            onClick={() => setFinish('glossy')}
            className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
              finish === 'glossy'
                ? 'border-white bg-white/15 text-white font-black ring-1 ring-white/30 shadow'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[11px] font-bold">💎 زجاج بلمعة (Glossy)</div>
          </button>
        </div>
      </div>

      {/* 4. Box Dimensions & Proportions (Width & Height) */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black shadow-inner">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">أبعاد وتناسب البوكس والزجاج</h4>
              <p className="text-[10px] text-slate-400">العرض، الهامش، الموقع الرأسي، والشفافية الكريستالية</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-400/20">
            LAYOUT
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">عرض البوكس</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">الهامش والارتفاع الداخلي</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">الموقع الرأسي (Y)</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">عتمة الزجاج (0%=شفاف)</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">ضبابية الزجاج (0=نقي)</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black shadow-inner">
              <Frame className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">حدود البوكس والتوهج</h4>
              <p className="text-[10px] text-slate-400">سماكة الإطار، انحناء الزوايا، وتأثير الهالة المشعة</p>
            </div>
          </div>

          {/* 3-Way Segmented Control: Theme vs Platform vs Custom */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800">
            <button
              onClick={() => {
                updateCardData('borderColorMode', 'theme');
                updateCardData('glowColorMode', 'theme');
              }}
              className={`flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[9.5px] font-bold border transition-all cursor-pointer ${
                borderMode === 'theme'
                  ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tag className="w-2.5 h-2.5" />
              <span>تصنيف العرض</span>
            </button>

            <button
              onClick={() => {
                updateCardData('borderColorMode', 'platform');
                updateCardData('glowColorMode', 'platform');
              }}
              className={`flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[9.5px] font-bold border transition-all cursor-pointer ${
                borderMode === 'platform'
                  ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-2.5 h-2.5" />
              <span>ثيم المنصة</span>
            </button>

            <button
              onClick={() => {
                updateCardData('borderColorMode', 'custom');
                updateCardData('glowColorMode', 'custom');
              }}
              className={`flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[9.5px] font-bold border transition-all cursor-pointer ${
                borderMode === 'custom'
                  ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-2.5 h-2.5" />
              <span>مخصص</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">سماكة الحد</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">انحناء الزوايا</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">شدة التوهج</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
          <div className="flex items-center gap-4 pt-1 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
            <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
              <span className="text-[11px] font-medium">لون الحد المخصص:</span>
              <input
                type="color"
                value={cardData.customBorderColor || activeTheme.borderColor}
                onChange={(e) => updateCardData('customBorderColor', e.target.value)}
                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
              />
            </label>

            <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
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
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-md">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black shadow-inner">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">استوديو الفواصل المعمارية والسينمائية</h4>
              <p className="text-[10px] text-slate-400">16 نمطاً هندسياً وتحريرياً مع تحكم كامل بالسماكة والسطوع</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            DIVIDERS
          </span>
        </div>

        {/* Compact Segmented Pills for Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-0.5 rounded-xl bg-slate-950 border border-slate-800">
          {DIVIDER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setDividerCategory(cat.id)}
              className={`flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg text-[9.5px] font-extrabold transition-all cursor-pointer ${
                dividerCategory === cat.id
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
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
                className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'border-white bg-slate-800 text-white ring-1 ring-white/30 shadow-md'
                    : 'border-slate-800/80 bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-black text-slate-100">{d.name}</span>
                  {isSelected && <span className="text-[10px] font-black text-emerald-400">✓</span>}
                </div>

                {/* Live Vector Mini-Preview */}
                <div className="w-full h-7 bg-slate-900/90 rounded-lg border border-slate-800/60 flex items-center justify-center px-2 pointer-events-none">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Thickness / Lineweight */}
            <div>
              <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
                <span className="font-medium">سماكة وحدّة الخط</span>
                <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
              <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
                <span className="font-medium">شفافية وسطوع الفاصل</span>
                <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
              <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
                <span className="font-medium">توهج وإشعاع الفاصل</span>
                <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
              <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
                <span className="font-medium">امتداد وعرض الفاصل</span>
                <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
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
