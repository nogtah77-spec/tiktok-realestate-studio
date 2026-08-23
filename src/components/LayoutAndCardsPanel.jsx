import React from 'react';
import { Sparkles, Palette, Sliders, Layers } from 'lucide-react';
import { LUXURY_THEMES } from '../utils/constants';

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

  return (
    <div className="space-y-6">
      {/* 1. Master Luxury Color Themes */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-amber-400" />
          <span>الثيمات اللونية الفاخرة للبوكس الزجاجي</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {LUXURY_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setThemeId(theme.id)}
              className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                themeId === theme.id
                  ? 'border-amber-400 bg-slate-800 text-white ring-1 ring-amber-400/40 shadow-lg'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: theme.borderColor }}
                />
                <span className="text-xs font-bold truncate">{theme.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Finish Mode (Matte vs Glossy / Satin) */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
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
            <div className="text-[10px] text-slate-400 mt-0.5">زجاج مثلج مخملي وظلال ناعمة</div>
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

      {/* 3. Glass Box Physical Dimensions & Glass FX */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 text-xs">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>أبعاد البوكس الزجاجي وتأثيرات الإضاءة</span>
        </label>

        {/* Vertical Position */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>موضع البوكس الرأسي على الغلاف</span>
            <span className="text-amber-400 font-mono">{cardData.verticalPosition || 50}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="70"
            value={cardData.verticalPosition || 50}
            onChange={(e) => updateCardData('verticalPosition', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Box Width */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>عرض البوكس الزجاجي (Box Width)</span>
            <span className="text-amber-400 font-mono">{cardData.boxWidth || 84}%</span>
          </div>
          <input
            type="range"
            min="65"
            max="94"
            value={cardData.boxWidth || 84}
            onChange={(e) => updateCardData('boxWidth', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Glass Blur */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>درجة بلور الزجاج الداخلي (Glass Blur)</span>
            <span className="text-amber-400 font-mono">{cardData.boxBlur || 20} px</span>
          </div>
          <input
            type="range"
            min="4"
            max="35"
            value={cardData.boxBlur || 20}
            onChange={(e) => updateCardData('boxBlur', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Glass Opacity */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>عتامة خلفية البوكس (Glass Opacity)</span>
            <span className="text-amber-400 font-mono">{cardData.boxOpacity || 60}%</span>
          </div>
          <input
            type="range"
            min="15"
            max="90"
            value={cardData.boxOpacity || 60}
            onChange={(e) => updateCardData('boxOpacity', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Border Glow Intensity */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>شدة توهج الحواف المضيئة (Edge Glow)</span>
            <span className="text-amber-400 font-mono">{cardData.borderGlowIntensity || 80}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={cardData.borderGlowIntensity || 80}
            onChange={(e) => updateCardData('borderGlowIntensity', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* 4. Dividers & Diamond Ornaments */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-200 flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={cardData.showDividers !== false}
              onChange={(e) => updateCardData('showDividers', e.target.checked)}
              className="rounded accent-amber-500 cursor-pointer"
            />
            <span>إظهار الفواصل الهندسية الفاخرة</span>
          </label>
        </div>

        {cardData.showDividers !== false && (
          <div className="pt-2 flex items-center gap-2">
            <span className="text-slate-400">شكل الألماسة في المنتصف:</span>
            <div className="flex gap-1.5 flex-1">
              {[
                { id: 'diamond', label: 'معين ألماسي ◆' },
                { id: 'star', label: 'نجمة بريق ✦' },
                { id: 'dot', label: 'نقطة ناعمة ●' },
                { id: 'none', label: 'خط بدون نقش' }
              ].map((orn) => (
                <button
                  key={orn.id}
                  onClick={() => updateCardData('dividerOrnament', orn.id)}
                  className={`flex-1 py-1.5 px-1 rounded-lg text-center border text-[11px] transition-all cursor-pointer ${
                    cardData.dividerOrnament === orn.id
                      ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {orn.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
