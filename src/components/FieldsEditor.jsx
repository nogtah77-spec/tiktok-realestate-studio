import React, { useRef } from 'react';
import { Type, Palette, Sparkles, Zap, Upload, Image as ImageIcon, ChevronDown, Heading, Hash, MapPin } from 'lucide-react';
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
      {/* Quick Image Uploader */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-extrabold text-slate-100 text-xs leading-snug mb-0.5">صورة العقار الأساسية</div>
            <div className="text-[10.5px] text-slate-400 leading-normal">انقر لتغيير أو رفع صورة جديدة بجودة عالية</div>
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
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="font-black text-slate-100 text-xs leading-snug">نماذج وعروض سريعة جاهزة</span>
          </div>
          <span className="text-[9px] font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            PRESETS
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          {QUICK_TEXT_PRESETS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => applyQuickPreset(qp)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-slate-300 text-[11px] font-semibold transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              {qp.title} ({qp.heroNumber} {qp.heroUnit})
            </button>
          ))}
        </div>
      </div>

      {/* Main Title Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black shadow-inner">
              <Type className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-slate-100 text-xs leading-snug mb-0.5">العنوان الرئيسي</h4>
              <p className="text-[10.5px] text-slate-400 leading-normal">النص البارز في أعلى الغلاف</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            TITLE
          </span>
        </div>

        <div>
          <input
            type="text"
            value={cardData.title || ''}
            onChange={(e) => update('title', e.target.value)}
            placeholder="شقة للبيع، فيلا فاخرة..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Font Select */}
          <div>
            <span className="text-[10.5px] text-slate-400 block mb-1.5 font-semibold">نوع الخط:</span>
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

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[10.5px] text-slate-400 mb-1.5 font-semibold">
              <span>الحجم</span>
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

          {/* Font Opacity Slider */}
          <div>
            <div className="flex justify-between items-center text-[10.5px] text-slate-400 mb-1.5 font-semibold">
              <span>شفافية الخط</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.titleOpacity ?? 100}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={cardData.titleOpacity ?? 100}
              onChange={(e) => update('titleOpacity', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          {/* Color and Shimmer */}
          <div className="flex items-center gap-2 pt-4">
            <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-semibold cursor-pointer hover:border-slate-700 transition-colors shadow-sm">
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
              className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer shadow-sm ${
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

      {/* Hero Number & Unit Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black shadow-inner">
              <Hash className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-slate-100 text-xs leading-snug mb-0.5">الرقم البطل والوحدة</h4>
              <p className="text-[10.5px] text-slate-400 leading-normal">المساحة أو السعر أو عدد الغرف</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
            METRICS
          </span>
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
              className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none w-32 font-bold"
            />
          )}
        </div>

        {/* Number and Unit Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[10.5px] text-slate-400 block mb-1.5 font-semibold">الرقم العملاق:</span>
            <input
              type="text"
              value={cardData.heroNumber || ''}
              onChange={(e) => update('heroNumber', e.target.value)}
              placeholder="185..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-black text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-500"
            />
          </div>

          <div>
            <span className="text-[10.5px] text-slate-400 block mb-1.5 font-semibold">الوحدة:</span>
            <input
              type="text"
              value={cardData.heroUnit || ''}
              onChange={(e) => update('heroUnit', e.target.value)}
              placeholder="م²..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Font Select */}
          <div>
            <span className="text-[10.5px] text-slate-400 block mb-1.5 font-semibold">نوع الخط:</span>
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
            <div className="flex justify-between items-center text-[10.5px] text-slate-400 mb-1.5 font-semibold">
              <span>الحجم</span>
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

          {/* Font Opacity Slider */}
          <div>
            <div className="flex justify-between items-center text-[10.5px] text-slate-400 mb-1.5 font-semibold">
              <span>شفافية الرقم</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.heroNumberOpacity ?? 100}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={cardData.heroNumberOpacity ?? 100}
              onChange={(e) => update('heroNumberOpacity', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          {/* Color & Shimmer */}
          <div className="flex items-center gap-2 pt-4">
            <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-semibold cursor-pointer hover:border-slate-700 transition-colors shadow-sm">
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
              className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer shadow-sm ${
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

      {/* Bottom Pill Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center font-black shadow-inner">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-slate-100 text-xs leading-snug mb-0.5">القسم السفلي (الموقع والكبسولة)</h4>
              <p className="text-[10.5px] text-slate-400 leading-normal">اسم الحي أو الميزة التنافسية للعقار</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full border border-purple-400/20">
            LOCATION
          </span>
        </div>

        <div>
          <input
            type="text"
            value={cardData.bottomText || ''}
            onChange={(e) => update('bottomText', e.target.value)}
            placeholder="حي النرجس، تشطيب الترا سوبر لوكس..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-slate-500 transition-colors placeholder:text-slate-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Style Select */}
          <div>
            <span className="text-[10.5px] text-slate-400 block mb-1.5 font-semibold">الستايل:</span>
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
            <div className="flex justify-between items-center text-[10.5px] text-slate-400 mb-1.5 font-semibold">
              <span>الحجم</span>
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

          {/* Font Opacity Slider */}
          <div>
            <div className="flex justify-between items-center text-[10.5px] text-slate-400 mb-1.5 font-semibold">
              <span>شفافية النص</span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.bottomTextOpacity ?? 100}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={cardData.bottomTextOpacity ?? 100}
              onChange={(e) => update('bottomTextOpacity', Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          {/* Font Select */}
          <div>
            <span className="text-[10.5px] text-slate-400 block mb-1.5 font-semibold">نوع الخط:</span>
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
