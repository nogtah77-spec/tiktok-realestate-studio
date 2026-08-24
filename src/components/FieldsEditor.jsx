import React, { useRef } from 'react';
import { Type, Palette, Sparkles, Zap, Upload, Image as ImageIcon, ChevronDown, Heading, Hash, MapPin } from 'lucide-react';
import { BUILTIN_FONTS, QUICK_TEXT_PRESETS } from '../utils/constants';

export default function FieldsEditor({
  cardData = {},
  onCardDataChange,
  customFonts = [],
  imageUrl = '',
  onImageChange,
  activeThemeObj
}) {
  const allFonts = [...BUILTIN_FONTS, ...customFonts];
  const fileInputRef = useRef(null);

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
      <div
        className="p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-md transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-inner border"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle,
              color: theme.accent
            }}
          >
            <ImageIcon className="w-4 h-4" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-extrabold text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>صورة العقار الأساسية</div>
            <div className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>انقر لتغيير أو رفع صورة جديدة بجودة عالية</div>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          style={{
            backgroundColor: theme.accent,
            color: theme.bgDark,
            boxShadow: `0 0 12px ${theme.accentGlow}`
          }}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>رفع صورة</span>
        </button>
      </div>

      {/* Quick Templates Bar */}
      <div
        className="p-3.5 sm:p-4 rounded-2xl border space-y-2.5 shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center font-bold border"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="font-black text-xs leading-normal" style={{ color: theme.textPrimary }}>نماذج وعروض سريعة جاهزة</span>
          </div>
          <span
            className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.accentText,
              borderColor: theme.border
            }}
          >
            PRESETS
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          {QUICK_TEXT_PRESETS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => applyQuickPreset(qp)}
              className="px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all active:scale-95 cursor-pointer shadow-sm hover:opacity-100"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textMuted
              }}
            >
              {qp.title} ({qp.heroNumber} {qp.heroUnit})
            </button>
          ))}
        </div>
      </div>

      {/* Main Title Section */}
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
              <Type className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>العنوان الرئيسي</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>النص البارز في أعلى الغلاف</p>
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
            TITLE
          </span>
        </div>

        <div>
          <input
            type="text"
            value={cardData.title || ''}
            onChange={(e) => update('title', e.target.value)}
            placeholder="شقة للبيع، فيلا فاخرة..."
            className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none transition-colors"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle,
              color: '#ffffff'
            }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Font Select */}
          <div>
            <span className="text-[10.5px] block mb-1.5 font-semibold" style={{ color: theme.textMuted }}>نوع الخط:</span>
            <div className="relative">
              <select
                value={cardData.titleFont || 'Lalezar'}
                onChange={(e) => update('titleFont', e.target.value)}
                className="w-full px-3 pl-8 py-2 rounded-xl border text-xs font-bold outline-none cursor-pointer transition-colors"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle,
                  color: '#ffffff'
                }}
              >
                {allFonts.map((f) => (
                  <option key={f.id} value={f.id} style={{ backgroundColor: theme.bgDark, color: '#ffffff' }}>{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: theme.textMuted }} />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[10.5px] mb-1.5 font-semibold" style={{ color: theme.textMuted }}>
              <span>الحجم</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
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
            <div className="flex justify-between items-center text-[10.5px] mb-1.5 font-semibold" style={{ color: theme.textMuted }}>
              <span>شفافية الخط</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
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
            <label
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold cursor-pointer transition-colors shadow-sm"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textPrimary
              }}
            >
              <Palette className="w-3.5 h-3.5" style={{ color: theme.accent }} />
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
              className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer shadow-sm"
              style={
                cardData.titleShimmer
                  ? {
                      backgroundColor: theme.accent,
                      color: theme.bgDark,
                      borderColor: theme.accent,
                      boxShadow: `0 0 10px ${theme.accentGlow}`
                    }
                  : {
                      backgroundColor: theme.bgDark,
                      borderColor: theme.borderSubtle,
                      color: theme.textMuted
                    }
              }
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>لمعة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Number & Unit Section */}
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
              <Hash className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>الرقم البطل والوحدة</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>المساحة أو السعر أو عدد الغرف</p>
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
            METRICS
          </span>
        </div>

        {/* Subtitle Checkbox */}
        <div
          className="flex items-center justify-between p-2.5 rounded-xl border"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle
          }}
        >
          <label className="text-[11px] flex items-center gap-2 cursor-pointer font-medium" style={{ color: theme.textPrimary }}>
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
              className="px-3 py-1 rounded-lg border text-xs text-white outline-none w-32 font-bold"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderSubtle
              }}
            />
          )}
        </div>

        {/* Number and Unit Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[10.5px] block mb-1.5 font-semibold" style={{ color: theme.textMuted }}>الرقم العملاق:</span>
            <input
              type="text"
              value={cardData.heroNumber || ''}
              onChange={(e) => update('heroNumber', e.target.value)}
              placeholder="185..."
              className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-black outline-none transition-colors"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: '#ffffff'
              }}
            />
          </div>

          <div>
            <span className="text-[10.5px] block mb-1.5 font-semibold" style={{ color: theme.textMuted }}>الوحدة:</span>
            <input
              type="text"
              value={cardData.heroUnit || ''}
              onChange={(e) => update('heroUnit', e.target.value)}
              placeholder="م²..."
              className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none transition-colors"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: '#ffffff'
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Font Select */}
          <div>
            <span className="text-[10.5px] block mb-1.5 font-semibold" style={{ color: theme.textMuted }}>نوع الخط:</span>
            <div className="relative">
              <select
                value={cardData.heroFont || 'Lalezar'}
                onChange={(e) => update('heroFont', e.target.value)}
                className="w-full px-3 pl-8 py-2 rounded-xl border text-xs font-bold outline-none cursor-pointer transition-colors"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle,
                  color: '#ffffff'
                }}
              >
                {allFonts.map((f) => (
                  <option key={f.id} value={f.id} style={{ backgroundColor: theme.bgDark, color: '#ffffff' }}>{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: theme.textMuted }} />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[10.5px] mb-1.5 font-semibold" style={{ color: theme.textMuted }}>
              <span>الحجم</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
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
            <div className="flex justify-between items-center text-[10.5px] mb-1.5 font-semibold" style={{ color: theme.textMuted }}>
              <span>شفافية الرقم</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
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
            <label
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold cursor-pointer transition-colors shadow-sm"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textPrimary
              }}
            >
              <Palette className="w-3.5 h-3.5" style={{ color: theme.accent }} />
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
              className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer shadow-sm"
              style={
                cardData.heroShimmer
                  ? {
                      backgroundColor: theme.accent,
                      color: theme.bgDark,
                      borderColor: theme.accent,
                      boxShadow: `0 0 10px ${theme.accentGlow}`
                    }
                  : {
                      backgroundColor: theme.bgDark,
                      borderColor: theme.borderSubtle,
                      color: theme.textMuted
                    }
              }
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>لمعة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Pill Section */}
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
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>القسم السفلي (الموقع والكبسولة)</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>اسم الحي أو الميزة التنافسية للعقار</p>
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
            LOCATION
          </span>
        </div>

        <div>
          <input
            type="text"
            value={cardData.bottomText || ''}
            onChange={(e) => update('bottomText', e.target.value)}
            placeholder="حي النرجس، تشطيب الترا سوبر لوكس..."
            className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold outline-none transition-colors"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle,
              color: '#ffffff'
            }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Style Select */}
          <div>
            <span className="text-[10.5px] block mb-1.5 font-semibold" style={{ color: theme.textMuted }}>الستايل:</span>
            <div className="relative">
              <select
                value={cardData.bottomPillStyle || 'pill'}
                onChange={(e) => update('bottomPillStyle', e.target.value)}
                className="w-full px-3 pl-8 py-2 rounded-xl border text-xs font-bold outline-none cursor-pointer transition-colors"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle,
                  color: '#ffffff'
                }}
              >
                <option value="pill" style={{ backgroundColor: theme.bgDark, color: '#ffffff' }}>كبسولة زجاجية (Pill)</option>
                <option value="text" style={{ backgroundColor: theme.bgDark, color: '#ffffff' }}>نص معلق (Text)</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: theme.textMuted }} />
            </div>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex justify-between items-center text-[10.5px] mb-1.5 font-semibold" style={{ color: theme.textMuted }}>
              <span>الحجم</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
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
            <div className="flex justify-between items-center text-[10.5px] mb-1.5 font-semibold" style={{ color: theme.textMuted }}>
              <span>شفافية النص</span>
              <span
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle
                }}
              >
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
            <span className="text-[10.5px] block mb-1.5 font-semibold" style={{ color: theme.textMuted }}>نوع الخط:</span>
            <div className="relative">
              <select
                value={cardData.bottomFont || 'Alexandria'}
                onChange={(e) => update('bottomFont', e.target.value)}
                className="w-full px-3 pl-8 py-2 rounded-xl border text-xs font-bold outline-none cursor-pointer transition-colors"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle,
                  color: '#ffffff'
                }}
              >
                {allFonts.map((f) => (
                  <option key={f.id} value={f.id} style={{ backgroundColor: theme.bgDark, color: '#ffffff' }}>{f.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: theme.textMuted }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
