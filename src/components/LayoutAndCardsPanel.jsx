import React from 'react';
import { LayoutGrid, Sparkles, Layers, Palette } from 'lucide-react';
import { PROPERTY_THEMES } from '../utils/constants';

export default function LayoutAndCardsPanel({
  layout,
  setLayout,
  finish,
  setFinish,
  themeId,
  setThemeId,
  customThemeBadge,
  setCustomThemeBadge,
  cardBlur,
  setCardBlur,
  cardOpacity,
  setCardOpacity,
  cardPosition,
  setCardPosition
}) {
  const layouts = [
    { id: 'pills', name: 'كبسولات عائمة منفصلة (Floating Pills)', desc: 'قالب عصري تفاعلي يقسم كل ميزة في بطاقة أنيقة' },
    { id: 'glass-card', name: 'كرت زجاجي فاخر موحد (Glass Card)', desc: 'بطاقة مركزية فندقية مع فواصل ناعمة' },
    { id: 'bento', name: 'شبكة بينتو العصرية (Bento Grid)', desc: 'توزيع شبكي هندسي فائق الأناقة' },
    { id: 'minimal-bar', name: 'شريط بانورامي سفلي (Minimal Bar)', desc: 'شريط سفلي نحيف يركز على إبراز جمال صورة العقار' }
  ];

  return (
    <div className="space-y-6">
      {/* Finish Mode (Matte vs Glossy / Satin) */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>تشطيب ولمعان القالب (Matte vs Glossy)</span>
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
            <div className="text-xs font-bold">💎 بلمعة ومعدني (Glossy / Sheen)</div>
            <div className="text-[10px] text-slate-400 mt-0.5">تدرج ضوئي كريستالي وحواف عاكسة</div>
          </button>
        </div>
      </div>

      {/* Layout Selector */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
          <span>هيكل وتوزيع البطاقات (Layout)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {layouts.map((l) => (
            <button
              key={l.id}
              onClick={() => setLayout(l.id)}
              className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                layout === l.id
                  ? 'border-amber-400 bg-amber-500/10 text-white ring-1 ring-amber-400/30'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-slate-100">{l.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{l.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Property Badge & Color Themes */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span>شارة تصنيف العرض والثيم اللوني</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PROPERTY_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setThemeId(theme.id)}
              className={`p-2.5 rounded-xl border text-xs font-semibold text-right transition-all cursor-pointer ${
                themeId === theme.id
                  ? 'border-amber-400 bg-slate-800 text-white ring-1 ring-amber-400/30'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                <span className="truncate">{theme.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Badge Text Input */}
        <div className="pt-2">
          <label className="text-[11px] text-slate-400 block mb-1">
            تخصيص نص الشارة بحرية (مثلاً: فرصة VIP، مزاد خاص):
          </label>
          <input
            type="text"
            value={customThemeBadge}
            onChange={(e) => setCustomThemeBadge(e.target.value)}
            placeholder="اكتب نص الشارة أو اتركه فارغاً للافتراضي..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Card Transparency, Blur & Position Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3 text-xs">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>الشفافية والبلور وموضع البطاقة</span>
        </label>

        {/* Position: Bottom / Center / Top */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs w-20">الموضع:</span>
          <div className="flex-1 grid grid-cols-3 gap-1.5">
            {[
              { id: 'bottom', name: 'أسفل (موصى به)' },
              { id: 'center', name: 'وسط' },
              { id: 'top', name: 'أعلى' }
            ].map((pos) => (
              <button
                key={pos.id}
                onClick={() => setCardPosition(pos.id)}
                className={`py-1.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                  cardPosition === pos.id
                    ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {pos.name}
              </button>
            ))}
          </div>
        </div>

        {/* Card Blur Slider */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>درجة بلور البطاقة الزجاجية (Card Glass Blur)</span>
            <span className="text-amber-400 font-mono">{cardBlur} px</span>
          </div>
          <input
            type="range"
            min="4"
            max="35"
            value={cardBlur}
            onChange={(e) => setCardBlur(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Card Opacity Slider */}
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>عتامة خلفية البطاقة (Card Opacity)</span>
            <span className="text-amber-400 font-mono">{cardOpacity}%</span>
          </div>
          <input
            type="range"
            min="40"
            max="98"
            value={cardOpacity}
            onChange={(e) => setCardOpacity(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
