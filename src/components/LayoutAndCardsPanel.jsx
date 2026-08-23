import React from 'react';
import { Sparkles, Palette, Sliders, Layers, Frame, Shield, Sun } from 'lucide-react';
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
    <div className="space-y-6 text-xs">
      {/* 1. Master Real Estate Luxury Themes */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-100 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>الثيمات اللونية الفاخرة المربوطة بنوع العرض العقاري</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {LUXURY_THEMES.map((theme) => {
            const isSelected = themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setThemeId(theme.id)}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-slate-800 text-white ring-1 ring-amber-400/40 shadow-lg'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-extrabold text-amber-300/90">{theme.categoryLabel}</span>
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: theme.borderColor }}
                  />
                </div>
                <div className="text-xs font-bold text-slate-100 truncate">{theme.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Finish Mode (Matte vs Glossy / Satin) */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <label className="font-bold text-slate-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>طريقة التشطيب واللمعان (Matte vs Glossy)</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setFinish('matte')}
            className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
              finish === 'matte'
                ? 'border-amber-400 bg-amber-500/10 text-white ring-1 ring-amber-400/40 font-bold'
                : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-xs font-bold">✨ مطفي فاخر (Matte)</div>
            <div className="text-[10px] text-slate-400 mt-0.5">زجاج مثلج مخملي وظلال هادئة</div>
          </button>

          <button
            onClick={() => setFinish('glossy')}
            className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
              finish === 'glossy'
                ? 'border-amber-400 bg-amber-500/10 text-white ring-1 ring-amber-400/40 font-bold'
                : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-xs font-bold">💎 بلمعة ومعدني (Glossy Sheen)</div>
            <div className="text-[10px] text-slate-400 mt-0.5">تدرج ضوئي كريستالي وحواف عاكسة</div>
          </button>
        </div>
      </div>

      {/* 3. Glass Transparency & Blur Suite */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
        <label className="font-bold text-slate-200 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>شفافية الزجاج، التمويه، والأبعاد</span>
        </label>

        {/* Glass Opacity */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>شفافية وعتامة الزجاج (Glass Opacity)</span>
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
          <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
            <span>0% زجاج شفاف كلياً</span>
            <span>100% لون معتم صلب</span>
          </div>
        </div>

        {/* Glass Blur */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>درجة بلور وتمويه الزجاج (Backdrop Frost Blur)</span>
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
          <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
            <span>0px كريستالي ناصع</span>
            <span>45px زجاج مثلج كثيف</span>
          </div>
        </div>

        {/* Box Width */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>عرض البوكس (Width)</span>
            <span className="text-amber-400 font-mono">{cardData.boxWidth || 84}%</span>
          </div>
          <input
            type="range"
            min="65"
            max="95"
            value={cardData.boxWidth || 84}
            onChange={(e) => updateCardData('boxWidth', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Vertical Position */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>موضع البوكس الرأسي (Vertical Position)</span>
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

      {/* 4. Master Border & Glow Suite */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <label className="font-bold text-slate-200 flex items-center gap-1.5">
          <Frame className="w-3.5 h-3.5 text-amber-400" />
          <span>منظومة التحكم الشاملة بحدود البوكس وتوهج النيون</span>
        </label>

        {/* Border Width */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>سماكة الإطار (Border Width)</span>
            <span className="text-amber-400 font-mono">{cardData.borderWidth ?? 1.5} px</span>
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
          <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
            <span>0px بدون إطار</span>
            <span>6px إطار عريض وبارز</span>
          </div>
        </div>

        {/* Border Radius */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>انحناء الزوايا والحدة (Border Radius)</span>
            <span className="text-amber-400 font-mono">{cardData.borderRadius ?? 32} px</span>
          </div>
          <input
            type="range"
            min="0"
            max="48"
            value={cardData.borderRadius ?? 32}
            onChange={(e) => updateCardData('borderRadius', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
            <span>0px زوايا حادة معمارية</span>
            <span>48px زوايا كبسولية ناعمة</span>
          </div>
        </div>

        {/* Border Glow Intensity */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>شدة توهج الحواف والنيون (Edge Glow Intensity)</span>
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

        {/* Border Color & Glow Color Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
          <div>
            <span className="text-[11px] text-slate-300 block mb-1.5">لون الإطار:</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="color"
                  value={cardData.customBorderColor || activeTheme.borderColor}
                  onChange={(e) => {
                    updateCardData('customBorderColor', e.target.value);
                    updateCardData('borderColorMode', 'custom');
                  }}
                  className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono">{cardData.customBorderColor || activeTheme.borderColor}</span>
              </label>
              {cardData.borderColorMode === 'custom' && (
                <button
                  onClick={() => updateCardData('borderColorMode', 'theme')}
                  className="text-[10px] text-amber-400 hover:underline"
                >
                  استعادة لون الثيم
                </button>
              )}
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-300 block mb-1.5">لون التوهج:</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="color"
                  value={cardData.customGlowColor || activeTheme.borderColor}
                  onChange={(e) => {
                    updateCardData('customGlowColor', e.target.value);
                    updateCardData('glowColorMode', 'custom');
                  }}
                  className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono">{cardData.customGlowColor || activeTheme.borderColor}</span>
              </label>
              {cardData.glowColorMode === 'custom' && (
                <button
                  onClick={() => updateCardData('glowColorMode', 'theme')}
                  className="text-[10px] text-amber-400 hover:underline"
                >
                  استعادة لون الثيم
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Architectural Dividers Suite */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-200 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>منظومة الفواصل المعمارية الحديثة (Architectural Dividers)</span>
          </label>
        </div>

        {/* Divider Style Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DIVIDER_STYLES.map((d) => {
            const isSelected = (cardData.dividerStyle || 'fading') === d.id;
            return (
              <button
                key={d.id}
                onClick={() => updateCardData('dividerStyle', d.id)}
                className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-slate-800 text-white ring-1 ring-amber-400/30'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-slate-100">{d.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{d.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Tag text if 'tag' style selected */}
        {cardData.dividerStyle === 'tag' && (
          <div className="pt-2">
            <label className="text-[11px] text-slate-300 block mb-1">نص الشارة في منتصف الفاصل:</label>
            <input
              type="text"
              value={cardData.dividerTagText || 'VIP'}
              onChange={(e) => updateCardData('dividerTagText', e.target.value)}
              placeholder="VIP, م², REF, فرصة..."
              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-amber-400"
            />
          </div>
        )}

        {/* Divider Opacity Slider */}
        {cardData.dividerStyle !== 'none' && (
          <div className="pt-2">
            <div className="flex justify-between text-slate-400 mb-1">
              <span>شفافية الفاصل (Divider Opacity)</span>
              <span className="text-amber-400 font-mono">{cardData.dividerOpacity ?? 70}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={cardData.dividerOpacity ?? 70}
              onChange={(e) => updateCardData('dividerOpacity', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
