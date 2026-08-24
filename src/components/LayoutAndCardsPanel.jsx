import React from 'react';
import { Sparkles, Palette, Sliders, Layers, Frame, Maximize2, Monitor, Tag, Zap, Radio } from 'lucide-react';
import { LUXURY_THEMES, DIVIDER_STYLES } from '../utils/constants';

export default function LayoutAndCardsPanel({
  themeId,
  setThemeId,
  finish,
  setFinish,
  cardData,
  setCardData,
  activePlatformThemeId
}) {
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
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
            <Palette className="w-4 h-4 text-slate-300" />
            <span>الثيم اللوني وتصنيف العرض العقاري</span>
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {LUXURY_THEMES.map((theme) => {
            const isSelected = themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleSelectRealEstateTheme(theme.id)}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-white bg-slate-800 text-white ring-1 ring-white/30 shadow-md'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-black text-white truncate">{theme.categoryLabel}</span>
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0 shadow-sm"
                    style={{ backgroundColor: theme.borderColor }}
                  />
                </div>
                <div className="text-[11px] text-slate-300 truncate font-medium">{theme.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ⚡ 2. Cyber Neon FX Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3 shadow-[0_0_20px_rgba(0,229,255,0.08)]">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <label className="font-extrabold text-white flex items-center gap-2 text-xs">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>تأثيرات السايبر نيون المتطورة (Cyber Neon FX)</span>
          </label>
          <span className="text-[9px] font-bold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/40">
            PRO 100%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Toggle 1: True Neon Glow */}
          <button
            onClick={() => updateCardData('neonCyberMode', !cardData.neonCyberMode)}
            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
              cardData.neonCyberMode
                ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)] ring-1 ring-cyan-400/40'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[11px]">⚡ توهج نيون ليزري 100%</div>
          </button>

          {/* Toggle 2: 3D Perspective Cyber Grid */}
          <button
            onClick={() => updateCardData('showCyberGrid', !cardData.showCyberGrid)}
            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
              cardData.showCyberGrid
                ? 'border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-200 font-bold shadow-[0_0_12px_rgba(255,0,230,0.3)] ring-1 ring-fuchsia-400/40'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[11px]">🌐 شبكة نيون 3D أرضية</div>
          </button>

          {/* Toggle 3: Neon Tube Text Glow */}
          <button
            onClick={() => updateCardData('neonTextGlow', !cardData.neonTextGlow)}
            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
              cardData.neonTextGlow
                ? 'border-amber-400 bg-amber-500/20 text-amber-200 font-bold shadow-[0_0_12px_rgba(255,184,0,0.3)] ring-1 ring-amber-400/40'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[11px]">💡 لمعة نيون للنصوص</div>
          </button>
        </div>
      </div>

      {/* 3. Glass Finish Mode (Matte vs Glossy) */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <label className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-slate-300" />
          <span>تشطيب زجاج القالب (Matte vs Glossy)</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setFinish('matte')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              finish === 'matte'
                ? 'border-white bg-white/15 text-white font-black ring-1 ring-white/30 shadow'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-xs font-bold">✨ زجاج مطفي (Matte)</div>
          </button>

          <button
            onClick={() => setFinish('glossy')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              finish === 'glossy'
                ? 'border-white bg-white/15 text-white font-black ring-1 ring-white/30 shadow'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-xs font-bold">💎 زجاج بلمعة (Glossy)</div>
          </button>
        </div>
      </div>

      {/* 4. Box Dimensions & Proportions (Width & Height) */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <label className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
            <Maximize2 className="w-4 h-4 text-slate-300" />
            <span>أبعاد وتناسب البوكس الزجاجي</span>
          </label>
          <span className="text-[10px] text-slate-400 font-mono">Pixel Perfect</span>
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
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <label className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
            <Frame className="w-4 h-4 text-slate-300" />
            <span>حدود البوكس والتوهج</span>
          </label>

          {/* 3-Way Segmented Control: Theme vs Platform vs Custom */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800">
            <button
              onClick={() => {
                updateCardData('borderColorMode', 'theme');
                updateCardData('glowColorMode', 'theme');
              }}
              className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                borderMode === 'theme'
                  ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tag className="w-3 h-3" />
              <span>تصنيف العرض</span>
            </button>

            <button
              onClick={() => {
                updateCardData('borderColorMode', 'platform');
                updateCardData('glowColorMode', 'platform');
              }}
              className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                borderMode === 'platform'
                  ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>ثيم المنصة</span>
            </button>

            <button
              onClick={() => {
                updateCardData('borderColorMode', 'custom');
                updateCardData('glowColorMode', 'custom');
              }}
              className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                borderMode === 'custom'
                  ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3 h-3" />
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

      {/* 6. Architectural Dividers */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <label className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
          <Sliders className="w-4 h-4 text-slate-300" />
          <span>الفواصل المعمارية</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DIVIDER_STYLES.map((d) => {
            const isSelected = (cardData.dividerStyle || 'tag') === d.id;
            return (
              <button
                key={d.id}
                onClick={() => updateCardData('dividerStyle', d.id)}
                className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-white bg-slate-800 text-white font-bold shadow'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-[11px] truncate">{d.name}</div>
              </button>
            );
          })}
        </div>

        {cardData.dividerStyle === 'tag' && (
          <div className="pt-1.5 flex items-center gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-300 text-[11px] font-medium">نص الشارة:</span>
            <input
              type="text"
              value={cardData.dividerTagText !== undefined ? cardData.dividerTagText : 'VIP'}
              onChange={(e) => updateCardData('dividerTagText', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white outline-none w-28 font-bold"
              placeholder="VIP"
            />
          </div>
        )}
      </div>
    </div>
  );
}
