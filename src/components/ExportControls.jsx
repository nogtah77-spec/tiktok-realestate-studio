import React, { useState } from 'react';
import { Download, Copy, Check, Sparkles, Share2, Eye, EyeOff, Smartphone } from 'lucide-react';
import { exportCoverImage, copyCoverImageToClipboard } from '../utils/exportEngine';

export default function ExportControls({
  canvasRef,
  showSafeZone,
  setShowSafeZone,
  isPhoneMockup,
  setIsPhoneMockup,
  onOpenCopywriterModal
}) {
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const handleDownload = async (format = 'png') => {
    if (!canvasRef.current || isExporting) return;
    setIsExporting(true);
    try {
      await exportCoverImage({
        node: canvasRef.current,
        format,
        fileName: 'alamoudi-tiktok-cover'
      });
    } catch (err) {
      alert('حدث خطأ أثناء تصدير الصورة: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyClipboard = async () => {
    if (!canvasRef.current || isCopying) return;
    setIsCopying(true);
    try {
      await copyCoverImageToClipboard({ node: canvasRef.current });
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    } catch (err) {
      alert('تعذر نسخ الصورة للحافظة: ' + err.message);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="p-4 lg:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => handleDownload('png')}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>{isExporting ? 'جاري تصدير الغلاف بدقة 1080×1920...' : 'تحميل الغلاف فائق الدقة (1080×1920)'}</span>
        </button>

        <button
          onClick={handleCopyClipboard}
          disabled={isCopying}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-sm border border-slate-700 shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          {copiedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span className="text-emerald-400">تم النسخ للحافظة بنجاح!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-amber-400" />
              <span>{isCopying ? 'جاري المعالجة والنسخ...' : 'نسخ الصورة للحافظة (لصق فوري)'}</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs flex-wrap gap-2">
        <button
          onClick={() => setShowSafeZone(!showSafeZone)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
            showSafeZone
              ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          {showSafeZone ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>واجهة أزرار تيك توك ({showSafeZone ? 'مفعلة' : 'مخفية'})</span>
        </button>

        <button
          onClick={() => setIsPhoneMockup(!isPhoneMockup)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
            isPhoneMockup
              ? 'border-slate-700 bg-slate-800 text-slate-200'
              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>إطار الهاتف ({isPhoneMockup ? 'ظاهر' : 'مخفي'})</span>
        </button>

        <button
          onClick={onOpenCopywriterModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 font-bold transition-all cursor-pointer mr-auto"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>توليد كابشن وواتساب ↗</span>
        </button>
      </div>
    </div>
  );
}
