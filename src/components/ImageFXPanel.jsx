import React, { useRef, useState } from 'react';
import { Upload, Sliders, Wand2, Sun, Image as ImageIcon, Sparkles, RotateCcw } from 'lucide-react';
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
  setVignetteIntensity,
  activeThemeObj
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const theme = activeThemeObj || {
    bgDark: '#0f172a',
    bgSurface: '#1e293b',
    bgCard: '#1e293b',
    border: 'rgba(255,255,255,0.2)',
    borderSubtle: 'rgba(255,255,255,0.08)',
    accent: '#ffffff',
    accentGlow: 'rgba(255,255,255,0.3)',
    accentText: '#ffffff',
    badgeBg: 'rgba(255,255,255,0.1)',
    textPrimary: '#ffffff',
    textMuted: '#94a3b8'
  };

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
        className="relative flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-2xl transition-all cursor-pointer text-center"
        style={{
          backgroundColor: isDragging ? theme.bgCard : theme.bgSurface,
          borderColor: isDragging ? theme.accent : theme.borderSubtle,
          boxShadow: isDragging ? `0 0 16px ${theme.accentGlow}` : undefined
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center mb-2 shadow-inner border"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle,
            color: theme.accent
          }}
        >
          <Upload className="w-5 h-5" />
        </div>
        <p className="text-xs font-black" style={{ color: theme.textPrimary }}>
          {isDragging ? 'أفلت الصورة هنا الآن...' : 'اضغط أو اسحب صورة العقار إلى هنا (Drag & Drop)'}
        </p>
        <p className="text-[10.5px] mt-1.5 leading-relaxed font-medium" style={{ color: theme.textMuted }}>PNG, JPG, WebP بدقة 4K سينمائية عالية</p>
      </div>

      {/* 2. Quick Sample Real Estate Photos */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div
          className="flex items-center justify-between pb-2.5 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>معرض الصور والنماذج السريعة</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>عقارات وفلل جاهزة للتجربة الفورية</p>
            </div>
          </div>
          <span
            className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.accentText,
              borderColor: theme.border
            }}
          >
            GALLERY
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 pt-1">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onImageChange(sample.url)}
              className="relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-98"
              style={{
                borderColor: imageUrl === sample.url ? theme.accent : theme.borderSubtle,
                boxShadow: imageUrl === sample.url ? `0 0 12px ${theme.accentGlow}` : undefined
              }}
              title={sample.name}
            >
              <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. Image Pan & Zoom */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div
          className="flex items-center justify-between pb-2.5 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Sliders className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>الموضع والتكبير (Pan & Zoom)</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>تحريك الصورة أفقياً ورأسياً وضبط التركيز</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.accentText,
                borderColor: theme.border
              }}
            >
              ZOOM
            </span>
            <button
              onClick={() => { setImageZoom(100); setImagePanX(0); setImagePanY(0); }}
              className="w-7 h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textMuted
              }}
              title="إعادة ضبط هذا القسم"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3.5 pt-1">
          <div>
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>التكبير</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
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
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>أفقي X</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
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
            <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
              <span>رأسي Y</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
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
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div
          className="flex items-center justify-between pb-2.5 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Sun className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>تمويه الخلفية وطبقة التعتيم والظلال</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>عزل الصورة وإبراز نصوص الغلاف بتباين سينمائي</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.accentText,
                borderColor: theme.border
              }}
            >
              CINEMATIC
            </span>
            <button
              onClick={() => {
                setImageBlur(0);
                setOverlayColor('#000000');
                setOverlayOpacity(30);
                setImageFilter('none');
              }}
              className="w-7 h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textMuted
              }}
              title="إعادة ضبط هذا القسم"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-[11px] mb-1.5 font-semibold" style={{ color: theme.textMuted }}>
            <span>بلور وتمويه الخلفية:</span>
            <span
              className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle
              }}
            >
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
        <div
          className="pt-3 border-t space-y-3"
          style={{ borderColor: theme.borderSubtle }}
        >
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold" style={{ color: theme.textPrimary }}>طبقة التعتيم واللون (Overlay):</span>
            <span
              className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle
              }}
            >
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer shadow-sm"
                style={{
                  backgroundColor: overlayColor === preset.color ? theme.bgCard : theme.bgDark,
                  borderColor: overlayColor === preset.color ? theme.accent : theme.borderSubtle,
                  color: overlayColor === preset.color ? theme.textPrimary : theme.textMuted,
                  boxShadow: overlayColor === preset.color ? `0 0 10px ${theme.accentGlow}` : undefined
                }}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: preset.color }}
                />
                <span>{preset.name}</span>
              </button>
            ))}

            <label
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border cursor-pointer text-[11px] font-semibold transition-colors shadow-sm"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textMuted
              }}
            >
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
        <div
          className="pt-3 border-t space-y-2.5"
          style={{ borderColor: theme.borderSubtle }}
        >
          <span className="font-bold text-[11px]" style={{ color: theme.textPrimary }}>الفلاتر اللونية والسينمائية:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {IMAGE_FILTER_PRESETS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setImageFilter(filter.id)}
                className="py-2 px-2 rounded-xl text-[10.5px] font-semibold border text-center transition-all cursor-pointer shadow-sm"
                style={{
                  backgroundColor: imageFilter === filter.id ? theme.bgCard : theme.bgDark,
                  borderColor: imageFilter === filter.id ? theme.accent : theme.borderSubtle,
                  color: imageFilter === filter.id ? theme.textPrimary : theme.textMuted,
                  boxShadow: imageFilter === filter.id ? `0 0 10px ${theme.accentGlow}` : undefined
                }}
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
