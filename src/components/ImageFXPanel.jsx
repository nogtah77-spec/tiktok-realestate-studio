import React, { useRef } from 'react';
import { Upload, Sliders, Wand2, Sun, Image as ImageIcon } from 'lucide-react';
import { OVERLAY_COLOR_PRESETS, IMAGE_FILTER_PRESETS, SAMPLE_IMAGES } from '../utils/constants';

export default function ImageFXPanel({
  imageUrl,
  onImageChange,
  imageZoom,
  setImageZoom,
  imagePanX,
  setImagePanX,
  imagePanY,
  setImagePanY,
  imageBlur,
  setImageBlur,
  imageFilter,
  setImageFilter,
  overlayColor,
  setOverlayColor,
  overlayOpacity,
  setOverlayOpacity,
  hasVignette,
  setHasVignette,
  vignetteIntensity,
  setVignetteIntensity
}) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload & Sample Images */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-amber-400" />
            <span>صورة العقار الأساسية</span>
          </label>
          <span className="text-[11px] text-slate-400">نسبة 9:16 أو صورة أفقية</span>
        </div>

        {/* Upload Trigger Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 transition-all cursor-pointer text-center"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-amber-500/20 flex items-center justify-center text-slate-300 group-hover:text-amber-300 transition-colors mb-2">
            <ImageIcon className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
            اضغط لرفع صورة من جهازك
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, WebP بدقة عالية</p>
        </div>

        {/* Sample Real Estate Images */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-medium text-slate-400">أو اختر من النماذج العقارية السريعة:</span>
          <div className="grid grid-cols-4 gap-2">
            {SAMPLE_IMAGES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onImageChange(sample.url)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  imageUrl === sample.url ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800 hover:border-slate-600'
                }`}
                title={sample.name}
              >
                <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Position & Zoom Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>ضبط موضع وتكبير الصورة داخل الإطار</span>
          </span>
          <button
            onClick={() => { setImageZoom(100); setImagePanX(0); setImagePanY(0); }}
            className="text-[11px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            إعادة الضبط
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>التكبير (Zoom)</span>
              <span className="text-slate-200 font-mono">{imageZoom}%</span>
            </div>
            <input
              type="range"
              min="100"
              max="250"
              value={imageZoom}
              onChange={(e) => setImageZoom(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>تحريك أفقي (X)</span>
              <span className="text-slate-200 font-mono">{imagePanX}px</span>
            </div>
            <input
              type="range"
              min="-120"
              max="120"
              value={imagePanX}
              onChange={(e) => setImagePanX(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>تحريك رأسي (Y)</span>
              <span className="text-slate-200 font-mono">{imagePanY}px</span>
            </div>
            <input
              type="range"
              min="-150"
              max="150"
              value={imagePanY}
              onChange={(e) => setImagePanY(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Blur & Color Overlays (User Requested Feature) */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>طبقة البلور (تمويه خلفية العقار)</span>
          </label>
          <span className="text-xs font-mono text-amber-400">{imageBlur} px</span>
        </div>
        <input
          type="range"
          min="0"
          max="25"
          step="1"
          value={imageBlur}
          onChange={(e) => setImageBlur(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />

        {/* Color Overlay */}
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200">
            <span>طبقة التلوين والتعتيم (Color Tint Overlay)</span>
            <span className="text-xs font-mono text-amber-400">{overlayOpacity}%</span>
          </div>

          {/* Quick Palette */}
          <div className="flex items-center gap-2 flex-wrap">
            {OVERLAY_COLOR_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setOverlayColor(preset.color);
                  setOverlayOpacity(preset.defaultOpacity);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  overlayColor === preset.color
                    ? 'border-amber-400 bg-slate-800 text-white ring-1 ring-amber-400/40'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: preset.color }}
                />
                <span>{preset.name}</span>
              </button>
            ))}

            {/* Custom Color Picker */}
            <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 cursor-pointer">
              <input
                type="color"
                value={overlayColor}
                onChange={(e) => setOverlayColor(e.target.value)}
                className="w-3.5 h-3.5 rounded cursor-pointer bg-transparent border-0"
              />
              <span>لون مخصص</span>
            </label>
          </div>

          {/* Overlay Opacity Slider */}
          <div>
            <input
              type="range"
              min="0"
              max="90"
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Cinematic Filters */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>الفلاتر السينمائية الجاهزة</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {IMAGE_FILTER_PRESETS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setImageFilter(filter.id)}
                className={`px-2.5 py-2 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                  imageFilter === filter.id
                    ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Smart Bottom Vignette */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasVignette}
                onChange={(e) => setHasVignette(e.target.checked)}
                className="rounded accent-amber-500 cursor-pointer"
              />
              <span>تدرج التعتيم السفلي لتعزيز وضوح النص (Smart Vignette)</span>
            </label>
            {hasVignette && <span className="text-xs font-mono text-amber-400">{vignetteIntensity}%</span>}
          </div>
          {hasVignette && (
            <input
              type="range"
              min="20"
              max="95"
              value={vignetteIntensity}
              onChange={(e) => setVignetteIntensity(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}
