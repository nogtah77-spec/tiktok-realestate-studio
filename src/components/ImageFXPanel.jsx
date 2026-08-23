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
    <div className="space-y-3 text-xs">
      {/* 1. Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-3.5 border-2 border-dashed rounded-2xl transition-all cursor-pointer text-center ${
          isDragging
            ? 'border-amber-400 bg-amber-500/15 scale-[1.01]'
            : 'border-slate-800 hover:border-amber-500/50 bg-slate-950/70 hover:bg-slate-950'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 mb-1">
          <Upload className="w-4 h-4" />
        </div>
        <p className="text-xs font-bold text-slate-200">
          {isDragging ? 'أفلت الصورة هنا الآن...' : 'اضغط أو اسحب صورة العقار إلى هنا (Drag & Drop)'}
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WebP بدقة عالية</p>
      </div>

      {/* 2. Quick Sample Real Estate Photos */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400">أو اختر صورة سريعة:</span>
        <div className="grid grid-cols-4 gap-1.5">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onImageChange(sample.url)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                imageUrl === sample.url ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-slate-800 hover:border-slate-700'
              }`}
              title={sample.name}
            >
              <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. Image Pan & Zoom */}
      <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-200 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>الموضع والتكبير</span>
          </span>
          <button
            onClick={() => { setImageZoom(100); setImagePanX(0); setImagePanY(0); }}
            className="text-[10px] text-amber-400 hover:underline"
          >
            إعادة الضبط
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <div className="flex justify-between text-slate-400 mb-1 text-[10px]">
              <span>التكبير</span>
              <span className="text-amber-400 font-mono">{imageZoom}%</span>
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
            <div className="flex justify-between text-slate-400 mb-1 text-[10px]">
              <span>أفقي X</span>
              <span className="text-amber-400 font-mono">{imagePanX}px</span>
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
            <div className="flex justify-between text-slate-400 mb-1 text-[10px]">
              <span>رأسي Y</span>
              <span className="text-amber-400 font-mono">{imagePanY}px</span>
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

      {/* 4. Blur & Color Overlay */}
      <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-200 flex items-center gap-1">
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>بلور وتمويه الخلفية</span>
          </span>
          <span className="text-amber-400 font-mono text-[11px]">{imageBlur}px</span>
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

        {/* Color Tint Palette */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-200">طبقة التعتيم واللون:</span>
            <span className="text-amber-400 font-mono">{overlayOpacity}%</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {OVERLAY_COLOR_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setOverlayColor(preset.color);
                  setOverlayOpacity(preset.defaultOpacity);
                }}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium border transition-all cursor-pointer ${
                  overlayColor === preset.color
                    ? 'border-amber-400 bg-slate-800 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/20"
                  style={{ backgroundColor: preset.color }}
                />
                <span>{preset.name}</span>
              </button>
            ))}

            <label className="flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 cursor-pointer text-[10px]">
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
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Cinematic Filters */}
        <div className="pt-2 border-t border-slate-800 space-y-1.5">
          <span className="font-bold text-slate-200 text-[11px]">الفلاتر السينمائية:</span>
          <div className="grid grid-cols-3 gap-1.5">
            {IMAGE_FILTER_PRESETS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setImageFilter(filter.id)}
                className={`py-1.5 px-2 rounded-xl text-[10px] font-medium border text-center transition-all cursor-pointer ${
                  imageFilter === filter.id
                    ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
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
