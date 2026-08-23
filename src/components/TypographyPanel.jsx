import React, { useRef, useState } from 'react';
import { Type, Upload, Trash2, AlertCircle } from 'lucide-react';
import { BUILTIN_FONTS } from '../utils/constants';
import { registerFontFace, saveCustomFont, deleteCustomFont } from '../utils/fontLoader';

export default function TypographyPanel({
  customFonts = [],
  onCustomFontsChange
}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    <div className="space-y-3.5 text-xs">
      {/* Upload Custom Font Header */}
      <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span>رفع خط مخصص (عربي أو إنجليزي)</span>
          </label>
          <span className="text-[9px] text-slate-500 font-mono tracking-wider bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800 mr-2">
            TTF, OTF, WOFF
          </span>
        </div>

        {errorMsg && (
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 p-3 border border-dashed border-slate-700 hover:border-amber-400/70 rounded-xl bg-slate-950/60 hover:bg-slate-950 transition-all cursor-pointer text-xs font-bold text-amber-300"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFontUpload}
            accept=".ttf,.otf,.woff,.woff2"
            className="hidden"
          />
          <Upload className="w-3.5 h-3.5" />
          <span>{isUploading ? 'جاري تسجيل الخط...' : 'اختر ملف الخط من جهازك'}</span>
        </div>
      </div>

      {/* User Custom Uploaded Fonts */}
      {customFonts.length > 0 && (
        <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-amber-400">خطوطك الخاصة المرفوعة ({customFonts.length}):</span>
          <div className="space-y-1.5">
            {customFonts.map((font) => (
              <div
                key={font.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-xs text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-bold text-sm" style={{ fontFamily: font.fontClass }}>
                    {font.name} — العمودي للعقارات 2026
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteFont(font)}
                  className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                  title="حذف الخط"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pre-installed Luxury Fonts List */}
      <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
        <span className="text-[11px] font-bold text-slate-300">الخطوط المثبتة مسبقاً:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {BUILTIN_FONTS.map((font) => (
            <div
              key={font.id}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs space-y-0.5"
            >
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span className="font-semibold text-slate-300">{font.name}</span>
                <span className="text-slate-600 font-mono text-[9px]">Google Font</span>
              </div>
              <p
                className="text-xs text-slate-100 font-bold truncate"
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
