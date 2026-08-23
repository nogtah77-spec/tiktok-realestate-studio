import React from 'react';
import { Sparkles, Palette, Sliders, Layers, Frame } from 'lucide-react';
import { LUXURY_THEMES, DIVIDER_STYLES } from '../utils/constants';

export default function LayoutAndCardsPanel({
  themeId,
  setThemeId,
  finish,
  setFinish,
  cardData,
  setCardData
}) {
  const updateCardData = (key, value) => {
    setCardData(prev => ({ ...prev, [key]: value }));
  };

  const activeTheme = LUXURY_THEMES.find(t => t.id === themeId) || LUXURY_THEMES[0];

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Real Estate Luxury Themes */}
      <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <label className="font-bold text-slate-100 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span>الثيم اللوني وتصنيف العرض</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LUXURY_THEMES.map((theme) => {
            const isSelected = themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setThemeId(theme.id)}
                className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-slate-800 text-white ring-1 ring-amber-400/40 shadow-md'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-amber-300 truncate">{theme.categoryLabel}</span>
                  <span
                    className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: theme.borderColor }}
                  />
                </div>
                <div className="text-[11px] text-slate-300 truncate">{theme.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Finish Mode */}
      <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <label className="font-bold text-slate-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>التشطيب (Matte vs Glossy)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setFinish('matte')}
            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
              finish === 'matte'
                ? 'border-amber-400 bg-amber-500/10 text-white ring-1 ring-amber-400/40 font-bold'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-xs font-bold">✨ مطفي (Matte)</div>
          </button>

          <button
            onClick={() => setFinish('glossy')}
            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
              finish === 'glossy'
                ? 'border-amber-400 bg-amber-500/10 text-white ring-1 ring-amber-400/40 font-bold'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-xs font-bold">💎 بلمعة (Glossy)</div>
          </button>
        </div>
      </div>

      {/* 3. Glass & Blur */}
      <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <label className="font-bold text-slate-200 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>الزجاج، البلور، والموضع</span>
        </label>

        {/* Glass Opacity */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>شفافية الزجاج</span>
            <span className="text-amber-400 font-mono">{cardData.boxOpacity ?? 60}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={cardData.boxOpacity ?? 60}
            onChange={(e) => updateCardData('boxOpacity', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Glass Blur */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>تمويه بلور الزجاج</span>
            <span className="text-amber-400 font-mono">{cardData.boxBlur ?? 20} px</span>
          </div>
          <input
            type="range"
            min="0"
            max="45"
            value={cardData.boxBlur ?? 20}
            onChange={(e) => updateCardData('boxBlur', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Vertical Position */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>الموضع الرأسي للبوكس</span>
            <span className="text-amber-400 font-mono">{cardData.verticalPosition || 50}%</span>
          </div>
          <input
            type="range"
            min="25"
            max="75"
            value={cardData.verticalPosition || 50}
            onChange={(e) => updateCardData('verticalPosition', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* 4. Border & Glow */}
      <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <label className="font-bold text-slate-200 flex items-center gap-1.5">
          <Frame className="w-3.5 h-3.5 text-amber-400" />
          <span>حدود البوكس والتوهج</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>سماكة الحد</span>
              <span className="text-amber-400 font-mono">{cardData.borderWidth ?? 1.5}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="0.5"
              value={cardData.borderWidth ?? 1.5}
              onChange={(e) => updateCardData('borderWidth', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>انحناء الزوايا</span>
              <span className="text-amber-400 font-mono">{cardData.borderRadius ?? 32}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              value={cardData.borderRadius ?? 32}
              onChange={(e) => updateCardData('borderRadius', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>شدة التوهج</span>
              <span className="text-amber-400 font-mono">{cardData.borderGlowIntensity ?? 75}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={cardData.borderGlowIntensity ?? 75}
              onChange={(e) => updateCardData('borderGlowIntensity', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Border and Glow Color Pickers */}
        <div className="flex items-center gap-4 pt-1">
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
            <span className="text-[11px]">لون الحد:</span>
            <input
              type="color"
              value={cardData.customBorderColor || activeTheme.borderColor}
              onChange={(e) => {
                updateCardData('customBorderColor', e.target.value);
                updateCardData('borderColorMode', 'custom');
              }}
              className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
            />
          </label>

          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
            <span className="text-[11px]">لون التوهج:</span>
            <input
              type="color"
              value={cardData.customGlowColor || activeTheme.borderColor}
              onChange={(e) => {
                updateCardData('customGlowColor', e.target.value);
                updateCardData('glowColorMode', 'custom');
              }}
              className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
            />
          </label>
        </div>
      </div>

      {/* 5. Architectural Dividers */}
      <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <label className="font-bold text-slate-200 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>الفواصل المعمارية</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {DIVIDER_STYLES.map((d) => {
            const isSelected = (cardData.dividerStyle || 'tag') === d.id;
            return (
              <button
                key={d.id}
                onClick={() => updateCardData('dividerStyle', d.id)}
                className={`p-2 rounded-xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-slate-800 text-white font-bold'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-[11px] truncate">{d.name}</div>
              </button>
            );
          })}
        </div>

        {cardData.dividerStyle === 'tag' && (
          <div className="pt-1 flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">نص الشارة:</span>
            <input
              type="text"
              value={cardData.dividerTagText || 'VIP'}
              onChange={(e) => updateCardData('dividerTagText', e.target.value)}
              placeholder="VIP..."
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none w-24"
            />
          </div>
        )}
      </div>
    </div>
  );
}
