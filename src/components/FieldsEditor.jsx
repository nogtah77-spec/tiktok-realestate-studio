import React, { useRef } from 'react';
import { Type, Palette, Sparkles, Zap, Upload, Image as ImageIcon } from 'lucide-react';
import { BUILTIN_FONTS, QUICK_TEXT_PRESETS } from '../utils/constants';

export default function FieldsEditor({
  cardData = {},
  onCardDataChange,
  customFonts = [],
  imageUrl = '',
  onImageChange
}) {
  const allFonts = [...BUILTIN_FONTS, ...customFonts];
  const fileInputRef = useRef(null);

  const update = (key, value) => {
    onCardDataChange(prev => ({ ...prev, [key]: value }));
  };

  const applyQuickPreset = (preset) => {
    onCardDataChange(prev => ({
      ...prev,
      title: preset.title,
      subtitle: preset.subtitle,
      showSubtitle: !!preset.subtitle,
      heroNumber: preset.heroNumber,
      heroUnit: preset.heroUnit,
      bottomText: preset.bottomText
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (onImageChange) onImageChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3 text-xs">
      {/* 0. Quick Image Uploader on First Screen */}
      <div className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-100 text-xs">صورة العقار الأساسية</div>
            <div className="text-[10px] text-slate-400">انقر لتغيير أو رفع صورة جديدة</div>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md hover:bg-amber-400 transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>رفع صورة</span>
        </button>
      </div>

      {/* Quick Templates Bar */}
      <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
        <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
          <Zap className="w-3 h-3" />
          <span>تعبئة سريعة:</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {QUICK_TEXT_PRESETS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => applyQuickPreset(qp)}
              className="px-2 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/60 text-slate-300 text-[10px] transition-all cursor-pointer"
            >
              {qp.title} ({qp.heroNumber} {qp.heroUnit})
            </button>
          ))}
        </div>
      </div>

      {/* 1. Header Title */}
      <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
          <label className="font-bold text-slate-100 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-black flex items-center justify-center text-[10px]">1</span>
            <span>العنوان الرئيسي</span>
          </label>
        </div>

        <div>
          <input
            type="text"
            value={cardData.title || ''}
            onChange={(e) => update('title', e.target.value)}
            placeholder="شقة للبيع، فيلا فاخرة..."
            className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">الخط:</span>
            <select
              value={cardData.titleFont || 'Lalezar'}
              onChange={(e) => update('titleFont', e.target.value)}
              className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer"
            >
              {allFonts.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
              <span>الحجم</span>
              <span className="text-amber-400 font-mono">{cardData.titleSize || 38}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="56"
              value={cardData.titleSize || 38}
              onChange={(e) => update('titleSize', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 pt-3">
            <label className="flex items-center gap-1 cursor-pointer">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="color"
                value={cardData.titleColor || '#ffffff'}
                onChange={(e) => update('titleColor', e.target.value)}
                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
              />
            </label>

            <button
              type="button"
              onClick={() => update('titleShimmer', !cardData.titleShimmer)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                cardData.titleShimmer
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>لمعة</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero Number & Unit */}
      <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
          <label className="font-bold text-slate-100 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-black flex items-center justify-center text-[10px]">2</span>
            <span>الرقم البطل والوحدة</span>
          </label>
        </div>

        {/* Subtitle Checkbox */}
        <div className="flex items-center justify-between">
          <label className="text-[10px] text-slate-300 flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={cardData.showSubtitle || false}
              onChange={(e) => update('showSubtitle', e.target.checked)}
              className="rounded accent-amber-500 cursor-pointer"
            />
            <span>كلمة تمهيدية (مثال: "المساحة")</span>
          </label>
          {cardData.showSubtitle && (
            <input
              type="text"
              value={cardData.subtitle || ''}
              onChange={(e) => update('subtitle', e.target.value)}
              placeholder="المساحة..."
              className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-white outline-none w-24"
            />
          )}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">الرقم العملاق:</span>
            <input
              type="text"
              value={cardData.heroNumber || ''}
              onChange={(e) => update('heroNumber', e.target.value)}
              placeholder="185..."
              className="w-full px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-sm font-black text-white outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">الوحدة:</span>
            <input
              type="text"
              value={cardData.heroUnit || ''}
              onChange={(e) => update('heroUnit', e.target.value)}
              placeholder="م²..."
              className="w-full px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400 outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">الخط:</span>
            <select
              value={cardData.heroFont || 'Lalezar'}
              onChange={(e) => update('heroFont', e.target.value)}
              className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer"
            >
              {allFonts.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
              <span>الحجم</span>
              <span className="text-amber-400 font-mono">{cardData.heroNumberSize || 76}px</span>
            </div>
            <input
              type="range"
              min="40"
              max="105"
              value={cardData.heroNumberSize || 76}
              onChange={(e) => update('heroNumberSize', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 pt-3">
            <label className="flex items-center gap-1 cursor-pointer">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="color"
                value={cardData.heroNumberColor || '#ffffff'}
                onChange={(e) => update('heroNumberColor', e.target.value)}
                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
              />
            </label>

            <button
              type="button"
              onClick={() => update('heroShimmer', !cardData.heroShimmer)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                cardData.heroShimmer
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>لمعة</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Pill */}
      <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
          <label className="font-bold text-slate-100 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-black flex items-center justify-center text-[10px]">3</span>
            <span>القسم السفلي (الموقع / الكبسولة)</span>
          </label>
        </div>

        <div>
          <input
            type="text"
            value={cardData.bottomText || ''}
            onChange={(e) => update('bottomText', e.target.value)}
            placeholder="حي النرجس، تشطيب الترا سوبر لوكس..."
            className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">الستايل:</span>
            <select
              value={cardData.bottomPillStyle || 'pill'}
              onChange={(e) => update('bottomPillStyle', e.target.value)}
              className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer"
            >
              <option value="pill">كبسولة زجاجية (Pill)</option>
              <option value="text">نص معلق (Text)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
              <span>الحجم</span>
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
            <span className="text-[10px] text-slate-400 block mb-0.5">الخط:</span>
            <select
              value={cardData.bottomFont || 'Alexandria'}
              onChange={(e) => update('bottomFont', e.target.value)}
              className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer"
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
