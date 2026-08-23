import React, { useRef } from 'react';
import { Type, Palette, Sparkles, Zap, Upload, Image as ImageIcon, ChevronDown } from 'lucide-react';
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
    <div className="space-y-4 text-xs">
      {/* 0. Quick Image Uploader */}
      <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 shadow-inner">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-slate-100 text-xs">صورة العقار الأساسية</div>
            <div className="text-[10px] text-slate-400">انقر لتغيير أو رفع صورة جديدة</div>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-950 font-black text-xs shadow-md hover:bg-slate-200 transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>رفع صورة</span>
        </button>
      </div>

      {/* Quick Templates Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div className="flex items-center gap-1.5 text-slate-200 font-bold text-xs">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>نماذج سريعة جاهزة:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {QUICK_TEXT_PRESETS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => applyQuickPreset(qp)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-slate-300 text-[11px] font-medium transition-all active:scale-95 cursor-pointer"
            >
              {qp.title} ({qp.heroNumber} {qp.heroUnit})
            </button>
          ))}
        </div>
      </div>

      {/* 1. Header Title */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <label className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
            <span className="w-5 h-5 rounded-full bg-white/10 text-white font-black flex items-center justify-center text-[10px] shadow-sm">1</span>
            <span>العنوان الرئيسي</span>
          </label>
        </div>

        <div>
          <input
            type="text"
            value={cardData.title || ''}
            onChange={(e) => update('title', e.target.value)}
            placeholder="شقة للبيع، فيلا فاخرة..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-slate-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Font Select with Explicit Chevron */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1 font-medium">نوع الخط:</span>
            <div className="relative">
              <select
                value={cardData.titleFont || 'Lalezar'}
                onChange={(e) => update('titleFont', e.target.value)}
                className="w-full px-3 pl-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none cursor-pointer luxury-select hover:border-slate-600 transition-colors"
              >
                {allFonts.map((f) => (
                  <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Size Slider with Value Badge */}
          <div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
              <span className="font-medium">الحجم</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.titleSize || 38}px
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="56"
              value={cardData.titleSize || 38}
              onChange={(e) => update('titleSize', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          {/* Color and Shimmer */}
          <div className="flex items-center gap-2 pt-4">
            <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px] cursor-pointer hover:border-slate-700 transition-colors">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <span>اللون</span>
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
              className={`flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                cardData.titleShimmer
                  ? 'border-white bg-white/20 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>لمعة</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero Number & Unit */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <label className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
            <span className="w-5 h-5 rounded-full bg-white/10 text-white font-black flex items-center justify-center text-[10px] shadow-sm">2</span>
            <span>الرقم البطل والوحدة</span>
          </label>
        </div>

        {/* Subtitle Checkbox */}
        <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
          <label className="text-[11px] text-slate-300 flex items-center gap-2 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={cardData.showSubtitle || false}
              onChange={(e) => update('showSubtitle', e.target.checked)}
              className="rounded cursor-pointer"
            />
            <span>كلمة تمهيدية (مثال: "المساحة")</span>
          </label>
          {cardData.showSubtitle && (
            <input
              type="text"
              value={cardData.subtitle || ''}
              onChange={(e) => update('subtitle', e.target.value)}
              placeholder="المساحة..."
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none w-28"
            />
          )}
        </div>

        {/* Number and Unit Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[11px] text-slate-400 block mb-1 font-medium">الرقم العملاق:</span>
            <input
              type="text"
              value={cardData.heroNumber || ''}
              onChange={(e) => update('heroNumber', e.target.value)}
              placeholder="185..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-black text-white outline-none focus:border-slate-500 transition-colors"
            />
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block mb-1 font-medium">الوحدة:</span>
            <input
              type="text"
              value={cardData.heroUnit || ''}
              onChange={(e) => update('heroUnit', e.target.value)}
              placeholder="م²..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-slate-500 transition-colors"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Font Select */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1 font-medium">نوع الخط:</span>
            <div className="relative">
              <select
                value={cardData.heroFont || 'Lalezar'}
                onChange={(e) => update('heroFont', e.target.value)}
                className="w-full px-3 pl-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none cursor-pointer luxury-select hover:border-slate-600 transition-colors"
              >
                {allFonts.map((f) => (
                  <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
              <span className="font-medium">الحجم</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.heroNumberSize || 76}px
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="105"
              value={cardData.heroNumberSize || 76}
              onChange={(e) => update('heroNumberSize', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          {/* Color & Shimmer */}
          <div className="flex items-center gap-2 pt-4">
            <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px] cursor-pointer hover:border-slate-700 transition-colors">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <span>اللون</span>
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
              className={`flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                cardData.heroShimmer
                  ? 'border-white bg-white/20 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>لمعة</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Pill */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <label className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
            <span className="w-5 h-5 rounded-full bg-white/10 text-white font-black flex items-center justify-center text-[10px] shadow-sm">3</span>
            <span>القسم السفلي (الموقع / الكبسولة)</span>
          </label>
        </div>

        <div>
          <input
            type="text"
            value={cardData.bottomText || ''}
            onChange={(e) => update('bottomText', e.target.value)}
            placeholder="حي النرجس، تشطيب الترا سوبر لوكس..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-slate-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Style Select */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1 font-medium">الستايل:</span>
            <div className="relative">
              <select
                value={cardData.bottomPillStyle || 'pill'}
                onChange={(e) => update('bottomPillStyle', e.target.value)}
                className="w-full px-3 pl-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none cursor-pointer luxury-select hover:border-slate-600 transition-colors"
              >
                <option value="pill" className="bg-slate-900 text-white">كبسولة زجاجية (Pill)</option>
                <option value="text" className="bg-slate-900 text-white">نص معلق (Text)</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
              <span className="font-medium">الحجم</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.bottomSize || 18}px
              </span>
            </div>
            <input
              type="range"
              min="14"
              max="30"
              value={cardData.bottomSize || 18}
              onChange={(e) => update('bottomSize', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          {/* Font Select */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1 font-medium">نوع الخط:</span>
            <div className="relative">
              <select
                value={cardData.bottomFont || 'Alexandria'}
                onChange={(e) => update('bottomFont', e.target.value)}
                className="w-full px-3 pl-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none cursor-pointer luxury-select hover:border-slate-600 transition-colors"
              >
                {allFonts.map((f) => (
                  <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
