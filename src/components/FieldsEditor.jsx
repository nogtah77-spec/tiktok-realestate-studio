import React from 'react';
import { Type, Palette, Sparkles, Hash, AlignCenter } from 'lucide-react';
import { BUILTIN_FONTS } from '../utils/constants';

export default function FieldsEditor({
  cardData = {},
  onCardDataChange,
  customFonts = []
}) {
  const allFonts = [...BUILTIN_FONTS, ...customFonts];

  const update = (key, value) => {
    onCardDataChange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-5 text-xs">
      {/* 1. TOP HEADER TITLE */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <label className="font-bold text-slate-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-black flex items-center justify-center text-[11px]">1</span>
            <span>القسم العلوي (عنوان العرض الرئيسي)</span>
          </label>
        </div>

        <div>
          <label className="text-[11px] text-slate-400 block mb-1">نص العنوان:</label>
          <input
            type="text"
            value={cardData.title || ''}
            onChange={(e) => update('title', e.target.value)}
            placeholder="شقة للبيع، فيلا فاخرة، دوبلكس..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">الخط:</label>
            <select
              value={cardData.titleFont || 'Alexandria'}
              onChange={(e) => update('titleFont', e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer"
            >
              {allFonts.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>حجم الخط</span>
              <span className="text-amber-400 font-mono">{cardData.titleSize || 34}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="50"
              value={cardData.titleSize || 34}
              onChange={(e) => update('titleSize', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-5 cursor-pointer">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <span>لون العنوان:</span>
              <input
                type="color"
                value={cardData.titleColor || '#ffffff'}
                onChange={(e) => update('titleColor', e.target.value)}
                className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE HERO NUMBER & UNIT */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <label className="font-bold text-slate-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-black flex items-center justify-center text-[11px]">2</span>
            <span>القسم الأوسط (الرقم البطل العملاق والوحدة)</span>
          </label>
        </div>

        {/* Optional Subtitle (e.g. "المساحة") */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-850 space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-medium text-slate-300 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={cardData.showSubtitle || false}
                onChange={(e) => update('showSubtitle', e.target.checked)}
                className="rounded accent-amber-500 cursor-pointer"
              />
              <span>إضافة كلمة فرعية تسبق الرقم (مثال: "المساحة" أو "السعر")</span>
            </label>
          </div>

          {cardData.showSubtitle && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <input
                type="text"
                value={cardData.subtitle || ''}
                onChange={(e) => update('subtitle', e.target.value)}
                placeholder="المساحة، السعر الإجمالي..."
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-amber-400"
              />
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="12"
                  max="28"
                  value={cardData.subtitleSize || 18}
                  onChange={(e) => update('subtitleSize', Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-amber-400 font-mono">{cardData.subtitleSize || 18}px</span>
              </div>
            </div>
          )}
        </div>

        {/* Hero Number & Unit Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">الرقم العملاق (Hero Number):</label>
            <input
              type="text"
              value={cardData.heroNumber || ''}
              onChange={(e) => update('heroNumber', e.target.value)}
              placeholder="185، 420، 150، 4.8..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-lg font-black text-white outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">وحدة القياس / العملة (Unit):</label>
            <input
              type="text"
              value={cardData.heroUnit || ''}
              onChange={(e) => update('heroUnit', e.target.value)}
              placeholder="م²، متر، ر.س، مليون..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-amber-400 outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Number Size & Typography */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">الخط:</label>
            <select
              value={cardData.heroFont || 'Alexandria'}
              onChange={(e) => update('heroFont', e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer"
            >
              {allFonts.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>حجم الرقم العملاق</span>
              <span className="text-amber-400 font-mono">{cardData.heroNumberSize || 68}px</span>
            </div>
            <input
              type="range"
              min="40"
              max="95"
              value={cardData.heroNumberSize || 68}
              onChange={(e) => update('heroNumberSize', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>حجم الوحدة (م²)</span>
              <span className="text-amber-400 font-mono">{cardData.heroUnitSize || 26}px</span>
            </div>
            <input
              type="range"
              min="14"
              max="45"
              value={cardData.heroUnitSize || 26}
              onChange={(e) => update('heroUnitSize', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION / CAPSULE PILL */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <label className="font-bold text-slate-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-black flex items-center justify-center text-[11px]">3</span>
            <span>القسم السفلي (الكبسولة / الموقع / المواصفات)</span>
          </label>
        </div>

        <div>
          <label className="text-[11px] text-slate-400 block mb-1">النص السفلي:</label>
          <input
            type="text"
            value={cardData.bottomText || ''}
            onChange={(e) => update('bottomText', e.target.value)}
            placeholder="حي النرجس، تشطيب الترا سوبر لوكس، 3 غرف نوم..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">ستايل العرض:</label>
            <select
              value={cardData.bottomPillStyle || 'pill'}
              onChange={(e) => update('bottomPillStyle', e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer"
            >
              <option value="pill">زر كبسولة زجاجية لامعة (Pill Button)</option>
              <option value="text">نص معلق بدون خلفية (Clean Text)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>حجم الخط السفلي</span>
              <span className="text-amber-400 font-mono">{cardData.bottomSize || 18}px</span>
            </div>
            <input
              type="range"
              min="14"
              max="30"
              value={cardData.bottomSize || 18}
              onChange={(e) => update('bottomSize', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">الخط:</label>
            <select
              value={cardData.bottomFont || 'Alexandria'}
              onChange={(e) => update('bottomFont', e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer"
            >
              {allFonts.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
