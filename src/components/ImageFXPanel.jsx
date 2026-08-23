import React, { useRef, useState } from 'react';
import { Upload, Sliders, Wand2, Sun, Image as ImageIcon, Sparkles } from 'lucide-react';
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
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-2xl transition-all cursor-pointer text-center ${
          isDragging
            ? 'border-white bg-white/15 scale-[1.01]'
            : 'border-slate-800 hover:border-slate-600 bg-slate-950/70 hover:bg-slate-950'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-slate-300 mb-1.5 shadow-sm border border-slate-800">
          <Upload className="w-4 h-4" />
        </div>
        <p className="text-xs font-bold text-slate-200">
          {isDragging ? 'أفلت الصورة هنا الآن...' : 'اضغط أو اسحب صورة العقار إلى هنا (Drag & Drop)'}
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">PNG, JPG, WebP بدقة سينمائية عالية</p>
      </div>

      {/* 2. Quick Sample Real Estate Photos */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-400">أو اختر صورة نموذج سريعة:</span>
        <div className="grid grid-cols-4 gap-2">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onImageChange(sample.url)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                imageUrl === sample.url ? 'border-white ring-1 ring-white/30 shadow-md' : 'border-slate-800 hover:border-slate-700'
              }`}
              title={sample.name}
            >
              <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. Image Pan & Zoom */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <span className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
            <Sliders className="w-4 h-4 text-slate-300" />
            <span>الموضع والتكبير (Pan & Zoom)</span>
          </span>
          <button
            onClick={() => { setImageZoom(100); setImagePanX(0); setImagePanY(0); }}
            className="text-[10px] text-slate-400 hover:text-white font-medium hover:underline transition-colors"
          >
            إعادة الضبط
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">التكبير</span>
              <span className="px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                {imageZoom}%
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="250"
              value={imageZoom}
              onChange={(e) => setImageZoom(Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">أفقي X</span>
              <span className="px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                {imagePanX}px
              </span>
            </div>
            <input
              type="range"
              min="-120"
              max="120"
              value={imagePanX}
              onChange={(e) => setImagePanX(Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
              <span className="font-medium">رأسي Y</span>
              <span className="px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                {imagePanY}px
              </span>
            </div>
            <input
              type="range"
              min="-150"
              max="150"
              value={imagePanY}
              onChange={(e) => setImagePanY(Number(e.target.value))}
              className="luxury-slider mt-1"
            />
          </div>
        </div>
      </div>

      {/* 4. Blur & Color Overlay */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <span className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
            <Wand2 className="w-4 h-4 text-slate-300" />
            <span>بلور وتمويه الخلفية</span>
          </span>
          <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
            {imageBlur}px
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="25"
          step="1"
          value={imageBlur}
          onChange={(e) => setImageBlur(Number(e.target.value))}
          className="luxury-slider mt-1"
        />

        {/* Color Tint Palette */}
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-200">طبقة التعتيم واللون (Overlay):</span>
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
              {overlayOpacity}%
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {OVERLAY_COLOR_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setOverlayColor(preset.color);
                  setOverlayOpacity(preset.defaultOpacity);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-medium border transition-all cursor-pointer ${
                  overlayColor === preset.color
                    ? 'border-white bg-slate-800 text-white shadow'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: preset.color }}
                />
                <span>{preset.name}</span>
              </button>
            ))}

            <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 cursor-pointer text-[11px] hover:text-slate-200">
              <input
                type="color"
                value={overlayColor}
                onChange={(e) => setOverlayColor(e.target.value)}
                className="w-3.5 h-3.5 rounded cursor-pointer bg-transparent border-0"
              />
              <span>مخصص</span>
            </label>
          </div>

          <input
            type="range"
            min="0"
            max="85"
            value={overlayOpacity}
            onChange={(e) => setOverlayOpacity(Number(e.target.value))}
            className="luxury-slider mt-1"
          />
        </div>

        {/* Cinematic Filters */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <span className="font-bold text-slate-200 text-[11px]">الفلاتر السينمائية:</span>
          <div className="grid grid-cols-3 gap-2">
            {IMAGE_FILTER_PRESETS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setImageFilter(filter.id)}
                className={`py-2 px-2 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer ${
                  imageFilter === filter.id
                    ? 'border-white bg-slate-800 text-white font-bold shadow'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
