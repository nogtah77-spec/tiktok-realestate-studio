import React, { useRef, useState } from 'react';
import { Type, Upload, Trash2, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUILTIN_FONTS } from '../utils/constants';
import { registerFontFace, saveCustomFont, deleteCustomFont } from '../utils/fontLoader';

export default function TypographyPanel({
  customFonts = [],
  onCustomFontsChange,
  activeThemeObj
}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const theme = activeThemeObj || {
    bgDark: '#0f172a',
    bgSurface: '#1e293b',
    bgCard: '#1e293b',
    border: 'rgba(255,255,255,0.15)',
    borderSubtle: 'rgba(255,255,255,0.08)',
    accent: '#ffffff',
    accentGlow: 'rgba(255,255,255,0.3)',
    textPrimary: '#f8fafc',
    textMuted: '#94a3b8'
  };

  const handleFontUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setIsUploading(true);

    try {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      const fontId = 'custom_' + cleanName + '_' + Date.now();
      const arrayBuffer = await file.arrayBuffer();

      const registered = await registerFontFace(cleanName, arrayBuffer);
      if (!registered) {
        throw new Error('فشل تسجيل ملف الخط. تأكد من صيغة الملف (TTF, OTF, WOFF, WOFF2)');
      }

      const fontMeta = {
        id: fontId,
        name: cleanName,
        fileName: file.name,
        format: file.name.split('.').pop()?.toLowerCase() || 'ttf'
      };

      await saveCustomFont(fontMeta, arrayBuffer);

      const newFontEntry = {
        id: cleanName,
        name: cleanName + ' (مخصص)',
        fontClass: "'" + cleanName + "', sans-serif",
        type: 'custom',
        fileName: file.name
      };

      onCustomFontsChange([...customFonts, newFontEntry]);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'حدث خطأ أثناء تحميل الخط');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteFont = async (fontEntry) => {
    await deleteCustomFont(fontEntry.id);
    onCustomFontsChange(customFonts.filter(f => f.id !== fontEntry.id));
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Upload Custom Font Header */}
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
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>رفع وتثبيت خط مخصص</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>يدعم الخطوط العربية والإنجليزية الاحترافية</p>
            </div>
          </div>
          <span
            className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.badgeBg || 'rgba(255,255,255,0.08)',
              color: theme.accentText || theme.textPrimary,
              borderColor: theme.border
            }}
          >
            FONTS
          </span>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2.5 p-4 border border-dashed rounded-xl transition-all cursor-pointer text-xs font-bold shadow-sm"
          style={{
            backgroundColor: theme.bgDark,
            borderColor: theme.borderSubtle,
            color: theme.textPrimary
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFontUpload}
            accept=".ttf,.otf,.woff,.woff2"
            className="hidden"
          />
          <Upload className="w-4 h-4" style={{ color: theme.accent }} />
          <span>{isUploading ? 'جاري تسجيل الخط في المتصفح...' : 'اختر ملف الخط من جهازك للرفع (TTF, OTF, WOFF)'}</span>
        </div>
      </div>

      {/* 2. User Custom Uploaded Fonts */}
      {customFonts.length > 0 && (
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
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>الخطوط المخصصة المثبتة</h4>
                <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>إجمالي {customFonts.length} خطوط نشطة</p>
              </div>
            </div>
            <span
              className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
              style={{
                backgroundColor: theme.badgeBg || 'rgba(255,255,255,0.08)',
                color: theme.accentText || theme.textPrimary,
                borderColor: theme.border
              }}
            >
              ACTIVE
            </span>
          </div>

          <div className="space-y-2.5">
            {customFonts.map((font) => (
              <div
                key={font.id}
                className="flex items-center justify-between p-4 rounded-xl border text-xs shadow-sm"
                style={{
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle,
                  color: theme.textPrimary
                }}
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                    <span className="font-bold text-xs" style={{ color: theme.textMuted }}>{font.name}</span>
                  </div>
                  <span className="font-bold text-sm pt-0.5 leading-relaxed" style={{ fontFamily: font.fontClass, color: theme.textPrimary }}>
                    العمودي للعقارات — شقة فاخرة 185 م² (VIP)
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteFont(font)}
                  className="p-2 cursor-pointer transition-colors opacity-70 hover:opacity-100 hover:text-rose-400"
                  style={{ color: theme.textMuted }}
                  title="حذف الخط"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Pre-installed Luxury Fonts List with Authentic Rendered Typography */}
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
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>مكتبة الخطوط العربية المدمجة</h4>
              <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>إجمالي {BUILTIN_FONTS.length} خطوط مختارة بعناية للأغلفة</p>
            </div>
          </div>
          <span
            className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.badgeBg || 'rgba(255,255,255,0.08)',
              color: theme.accentText || theme.textPrimary,
              borderColor: theme.border
            }}
          >
            LIBRARY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BUILTIN_FONTS.map((font) => (
            <div
              key={font.id}
              className="p-4 rounded-xl border text-xs space-y-2 transition-colors shadow-sm"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle
              }}
            >
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="font-bold" style={{ color: theme.textPrimary }}>{font.name}</span>
                <span
                  className="font-mono text-[9px] px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: theme.bgSurface,
                    borderColor: theme.borderSubtle,
                    color: theme.textMuted
                  }}
                >
                  {font.id}
                </span>
              </div>
              <p
                className="text-sm font-bold truncate leading-relaxed pt-0.5"
                style={{ fontFamily: font.fontClass, color: theme.textPrimary }}
              >
                العمودي للخدمات العقارية 2026
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
