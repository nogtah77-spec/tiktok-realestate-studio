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
        <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-2 shadow-inner">
          <Upload className="w-5 h-5" />
        </div>
        <p className="text-xs font-black text-slate-100">
          {isDragging ? 'أفلت الصورة هنا الآن...' : 'اضغط أو اسحب صورة العقار إلى هنا (Drag & Drop)'}
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">PNG, JPG, WebP بدقة 4K سينمائية عالية</p>
      </div>

      {/* 2. Quick Sample Real Estate Photos */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black shadow-inner">
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">معرض الصور والنماذج السريعة</h4>
              <p className="text-[10px] text-slate-400">عقارات وفلل جاهزة للتجربة الفورية</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            GALLERY
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-1">
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
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center font-black shadow-inner">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">الموضع والتكبير (Pan & Zoom)</h4>
              <p className="text-[10px] text-slate-400">تحريك الصورة أفقياً ورأسياً وضبط التركيز</p>
            </div>
          </div>
          <button
            onClick={() => { setImageZoom(100); setImagePanX(0); setImagePanY(0); }}
            className="text-[10px] text-purple-300 hover:text-white font-bold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 transition-colors"
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
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-black shadow-inner">
              <Sun className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-black text-slate-100 text-xs">تمويه الخلفية وطبقة التعتيم والظلال</h4>
              <p className="text-[10px] text-slate-400">عزل الصورة وإبراز نصوص الغلاف بتباين سينمائي</p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full border border-indigo-400/20">
            CINEMATIC
          </span>
        </div>

        <div>
          <div className="flex justify-between items-center text-[11px] text-slate-300 mb-1">
            <span className="font-medium">بلور وتمويه الخلفية:</span>
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
        </div>

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
          <span className="font-bold text-slate-200 text-[11px]">الفلاتر اللونية والسينمائية:</span>
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
