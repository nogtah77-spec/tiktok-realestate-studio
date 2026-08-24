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
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <label className="text-xs font-extrabold text-slate-100 flex items-center gap-2">
            <Type className="w-4 h-4 text-slate-300" />
            <span>رفع خط مخصص (عربي أو إنجليزي)</span>
          </label>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
            TTF, OTF, WOFF, WOFF2
          </span>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 p-4 border border-dashed border-slate-700 hover:border-slate-500 rounded-xl bg-slate-950/60 hover:bg-slate-950 transition-all cursor-pointer text-xs font-bold text-white shadow-sm"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFontUpload}
            accept=".ttf,.otf,.woff,.woff2"
            className="hidden"
          />
          <Upload className="w-4 h-4 text-slate-300" />
          <span>{isUploading ? 'جاري تسجيل الخط في المتصفح...' : 'اختر ملف الخط من جهازك للرفع'}</span>
        </div>
      </div>

      {/* 2. User Custom Uploaded Fonts */}
      {customFonts.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
          <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>خطوطك الخاصة المرفوعة ({customFonts.length}):</span>
          </span>
          <div className="space-y-2">
            {customFonts.map((font) => (
              <div
                key={font.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-bold text-xs text-slate-300">{font.name}</span>
                  </div>
                  <span className="font-bold text-sm text-white pt-0.5" style={{ fontFamily: font.fontClass }}>
                    العمودي للعقارات — شقة فاخرة 185 م² (VIP)
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteFont(font)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 cursor-pointer transition-colors"
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
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>الخطوط الفاخرة المثبتة مسبقاً ({BUILTIN_FONTS.length}):</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Google Web Fonts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BUILTIN_FONTS.map((font) => (
            <div
              key={font.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 hover:border-slate-700 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span className="font-bold text-slate-200">{font.name}</span>
                <span className="font-mono text-[9px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-slate-400">
                  {font.id}
                </span>
              </div>
              <p
                className="text-sm text-slate-100 font-bold truncate leading-relaxed pt-0.5"
                style={{ fontFamily: font.fontClass }}
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
