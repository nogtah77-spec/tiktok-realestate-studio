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
    <div className="space-y-3.5 text-xs">
      {/* Quick Image Uploader */}
      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="w-7 h-7 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
            <ImageIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-extrabold text-slate-100 text-xs">صورة العقار الأساسية</div>
            <div className="text-[10px] text-slate-400">انقر لتغيير أو رفع صورة جديدة بجودة عالية</div>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-950 font-black text-xs shadow-md hover:bg-slate-200 transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Upload className="w-3 h-3" />
          <span>رفع صورة</span>
        </button>
      </div>

      {/* Quick Templates Bar */}
      <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-3 h-3" />
            </div>
            <span className="font-black text-slate-100 text-xs">نماذج وعروض سريعة جاهزة</span>
          </div>
          <span className="text-[9px] font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            PRESETS
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {QUICK_TEXT_PRESETS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => applyQuickPreset(qp)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-slate-300 text-[10.5px] font-medium transition-all active:scale-95 cursor-pointer"
            >
              {qp.title} ({qp.heroNumber} {qp.heroUnit})
            </button>
          ))}
        </div>
      </div>

      {/* Main Title Section */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black shadow-inner">
              <Type className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">العنوان الرئيسي</h4>
              <p className="text-[10px] text-slate-400">النص البارز في أعلى الغلاف</p>
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
            className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-slate-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-0.5">
          {/* Font Select */}
          <div>
            <span className="text-[10px] text-slate-400 block mb-1 font-medium">نوع الخط:</span>
            <div className="relative">
              <select
                value={cardData.titleFont || 'Lalezar'}
                onChange={(e) => update('titleFont', e.target.value)}
                className="w-full px-2.5 pl-7 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-bold text-white outline-none cursor-pointer luxury-select hover:border-slate-600 transition-colors"
              >
                {allFonts.map((f) => (
                  <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
              <span className="font-medium">الحجم</span>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.titleSize || 38}px
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="56"
              value={cardData.titleSize || 38}
              onChange={(e) => update('titleSize', Number(e.target.value))}
              className="luxury-slider mt-0.5"
            />
          </div>

          {/* Font Opacity Slider */}
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
              <span className="font-medium">شفافية الخط</span>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.titleOpacity ?? 100}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={cardData.titleOpacity ?? 100}
              onChange={(e) => update('titleOpacity', Number(e.target.value))}
              className="luxury-slider mt-0.5"
            />
          </div>

          {/* Color and Shimmer */}
          <div className="flex items-center gap-1.5 pt-3">
            <label className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-[10px] cursor-pointer hover:border-slate-700 transition-colors">
              <Palette className="w-3 h-3 text-slate-400" />
              <span>اللون</span>
              <input
                type="color"
                value={cardData.titleColor || '#ffffff'}
                onChange={(e) => update('titleColor', e.target.value)}
                className="w-3.5 h-3.5 rounded cursor-pointer bg-transparent border-0"
              />
            </label>

            <button
              type="button"
              onClick={() => update('titleShimmer', !cardData.titleShimmer)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                cardData.titleShimmer
                  ? 'border-white bg-white/20 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>لمعة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Number & Unit Section */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black shadow-inner">
              <Hash className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">الرقم البطل والوحدة</h4>
              <p className="text-[10px] text-slate-400">المساحة أو السعر أو عدد الغرف</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
            METRICS
          </span>
        </div>

        {/* Subtitle Checkbox */}
        <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-xl border border-slate-800">
          <label className="text-[10.5px] text-slate-300 flex items-center gap-2 cursor-pointer font-medium">
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
              className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-white outline-none w-28"
            />
          )}
        </div>

        {/* Number and Unit Inputs */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="text-[10.5px] text-slate-400 block mb-1 font-medium">الرقم العملاق:</span>
            <input
              type="text"
              value={cardData.heroNumber || ''}
              onChange={(e) => update('heroNumber', e.target.value)}
              placeholder="185..."
              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-black text-white outline-none focus:border-slate-500 transition-colors"
            />
          </div>

          <div>
            <span className="text-[10.5px] text-slate-400 block mb-1 font-medium">الوحدة:</span>
            <input
              type="text"
              value={cardData.heroUnit || ''}
              onChange={(e) => update('heroUnit', e.target.value)}
              placeholder="م²..."
              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-slate-500 transition-colors"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-0.5">
          {/* Font Select */}
          <div>
            <span className="text-[10px] text-slate-400 block mb-1 font-medium">نوع الخط:</span>
            <div className="relative">
              <select
                value={cardData.heroFont || 'Lalezar'}
                onChange={(e) => update('heroFont', e.target.value)}
                className="w-full px-2.5 pl-7 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-bold text-white outline-none cursor-pointer luxury-select hover:border-slate-600 transition-colors"
              >
                {allFonts.map((f) => (
                  <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
              <span className="font-medium">الحجم</span>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.heroNumberSize || 76}px
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="105"
              value={cardData.heroNumberSize || 76}
              onChange={(e) => update('heroNumberSize', Number(e.target.value))}
              className="luxury-slider mt-0.5"
            />
          </div>

          {/* Font Opacity Slider */}
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
              <span className="font-medium">شفافية الرقم</span>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.heroNumberOpacity ?? 100}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={cardData.heroNumberOpacity ?? 100}
              onChange={(e) => update('heroNumberOpacity', Number(e.target.value))}
              className="luxury-slider mt-0.5"
            />
          </div>

          {/* Color & Shimmer */}
          <div className="flex items-center gap-1.5 pt-3">
            <label className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-[10px] cursor-pointer hover:border-slate-700 transition-colors">
              <Palette className="w-3 h-3 text-slate-400" />
              <span>اللون</span>
              <input
                type="color"
                value={cardData.heroNumberColor || '#ffffff'}
                onChange={(e) => update('heroNumberColor', e.target.value)}
                className="w-3.5 h-3.5 rounded cursor-pointer bg-transparent border-0"
              />
            </label>

            <button
              type="button"
              onClick={() => update('heroShimmer', !cardData.heroShimmer)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                cardData.heroShimmer
                  ? 'border-white bg-white/20 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>لمعة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Pill Section */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center font-black shadow-inner">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">القسم السفلي (الموقع والكبسولة)</h4>
              <p className="text-[10px] text-slate-400">اسم الحي أو الميزة التنافسية للعقار</p>
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
            className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white outline-none focus:border-slate-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-0.5">
          {/* Style Select */}
          <div>
            <span className="text-[10px] text-slate-400 block mb-1 font-medium">الستايل:</span>
            <div className="relative">
              <select
                value={cardData.bottomPillStyle || 'pill'}
                onChange={(e) => update('bottomPillStyle', e.target.value)}
                className="w-full px-2.5 pl-7 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-bold text-white outline-none cursor-pointer luxury-select hover:border-slate-600 transition-colors"
              >
                <option value="pill" className="bg-slate-900 text-white">كبسولة زجاجية (Pill)</option>
                <option value="text" className="bg-slate-900 text-white">نص معلق (Text)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
              <span className="font-medium">الحجم</span>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.bottomSize || 18}px
              </span>
            </div>
            <input
              type="range"
              min="14"
              max="30"
              value={cardData.bottomSize || 18}
              onChange={(e) => update('bottomSize', Number(e.target.value))}
              className="luxury-slider mt-0.5"
            />
          </div>

          {/* Font Opacity Slider */}
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
              <span className="font-medium">شفافية النص</span>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-slate-950 border border-slate-800 text-white">
                {cardData.bottomTextOpacity ?? 100}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={cardData.bottomTextOpacity ?? 100}
              onChange={(e) => update('bottomTextOpacity', Number(e.target.value))}
              className="luxury-slider mt-0.5"
            />
          </div>

          {/* Font Select */}
          <div>
            <span className="text-[10px] text-slate-400 block mb-1 font-medium">نوع الخط:</span>
            <div className="relative">
              <select
                value={cardData.bottomFont || 'Alexandria'}
                onChange={(e) => update('bottomFont', e.target.value)}
                className="w-full px-2.5 pl-7 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-bold text-white outline-none cursor-pointer luxury-select hover:border-slate-600 transition-colors"
              >
                {allFonts.map((f) => (
                  <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
