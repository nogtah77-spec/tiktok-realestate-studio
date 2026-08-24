import React, { useState } from 'react';
import { Download, Copy, Check, Grid, Shield, Layers, Eye } from 'lucide-react';
import { exportCoverImage, exportTransparentGlassCard, copyCoverImageToClipboard } from '../utils/exportEngine';

export default function ExportControls({
  canvasRef,
  showGridIndicator,
  setShowGridIndicator
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadFull = async (format = 'png') => {
    if (!canvasRef.current || isExporting) return;
    setIsExporting(true);
    try {
      await exportCoverImage({
        node: canvasRef.current,
        format,
        fileName: 'alamoudi-tiktok-cover'
      });
    } catch (err) {
      alert('حدث خطأ أثناء التصدير: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full flex items-center gap-2 select-none">
      {/* Main High-Res Download Button */}
      <button
        onClick={() => handleDownloadFull('png')}
        disabled={isExporting}
        className="flex-1 flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
      >
        <Download className="w-4 h-4 stroke-[2.5]" />
        <span>{isExporting ? 'جاري التصدير...' : 'تحميل الغلاف (1080×1920)'}</span>
      </button>

      {/* TikTok Views Toggle Button */}
      <button
        onClick={() => setShowGridIndicator(!showGridIndicator)}
        className={`flex items-center gap-1.5 py-2 px-3 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
          showGridIndicator
            ? 'border-white/30 bg-slate-800 text-white shadow-sm'
            : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
        }`}
        title="مؤشر مشاهدات تيك توك ▷"
      >
        <Eye className="w-3.5 h-3.5" />
        <span>المشاهدات</span>
      </button>
    </div>
  );
}

// Compact Side Action Wings next to the Canvas Preview
export function SideActionWings({
  canvasRef,
  showGridLines,
  setShowGridLines,
  showLogo,
  setShowLogo
}) {
  const [isCopying, setIsCopying] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [isTransparentExporting, setIsTransparentExporting] = useState(false);

  const handleCopyClipboard = async () => {
    if (!canvasRef.current || isCopying) return;
    setIsCopying(true);
    try {
      await copyCoverImageToClipboard({ node: canvasRef.current });
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    } catch (err) {
      alert('تعذر النسخ: ' + err.message);
    } finally {
      setIsCopying(false);
    }
  };

  const handleDownloadTransparent = async () => {
    const cardRoot = document.getElementById('tiktok-glass-card-root');
    if (!cardRoot || isTransparentExporting) return;
    setIsTransparentExporting(true);
    try {
      await exportTransparentGlassCard({
        cardNode: cardRoot,
        fileName: 'alamoudi-glass-card-transparent'
      });
    } catch (err) {
      alert('حدث خطأ أثناء تصدير الكرت المفرغ: ' + err.message);
    } finally {
      setIsTransparentExporting(false);
    }
  };

  return {
    // Right Wing: الجريد والشعار
    rightWing: (
      <div className="flex flex-col gap-2 sm:gap-2.5 shrink-0 justify-center items-center">
        <button
          onClick={() => setShowGridLines(!showGridLines)}
          className={`flex flex-col items-center justify-center py-2 sm:py-2.5 lg:py-2 xl:py-2.5 px-1.5 sm:px-2 rounded-2xl border text-[10px] sm:text-[11px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold gap-1 transition-all active:scale-95 cursor-pointer w-14 sm:w-14 lg:w-12 xl:w-14 shadow-sm ${
            showGridLines
              ? 'border-cyan-400 bg-cyan-500/25 text-cyan-200 ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(0,229,255,0.25)]'
              : 'border-slate-800 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-700'
          }`}
          title="خطوط المحاذاة والسنتر"
        >
          <Grid className={`w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 ${showGridLines ? 'text-cyan-300' : 'text-slate-400'}`} />
          <span>الجريد</span>
        </button>

        <button
          onClick={() => setShowLogo(!showLogo)}
          className={`flex flex-col items-center justify-center py-2 sm:py-2.5 lg:py-2 xl:py-2.5 px-1.5 sm:px-2 rounded-2xl border text-[10px] sm:text-[11px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold gap-1 transition-all active:scale-95 cursor-pointer w-14 sm:w-14 lg:w-12 xl:w-14 shadow-sm ${
            showLogo
              ? 'border-white/40 bg-slate-800 text-white shadow'
              : 'border-slate-800 bg-slate-900/90 text-slate-400 hover:text-slate-200'
          }`}
          title="إظهار / إخفاء الشعار"
        >
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-slate-300" />
          <span>الشعار</span>
        </button>
      </div>
    ),

    // Left Wing: نسخ ومفرغ PNG
    leftWing: (
      <div className="flex flex-col gap-2 sm:gap-2.5 shrink-0 justify-center items-center">
        <button
          onClick={handleCopyClipboard}
          disabled={isCopying}
          className="flex flex-col items-center justify-center py-2 sm:py-2.5 lg:py-2 xl:py-2.5 px-1.5 sm:px-2 rounded-2xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-[10px] sm:text-[11px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold gap-1 transition-all active:scale-95 cursor-pointer w-14 sm:w-14 lg:w-12 xl:w-14 shadow-sm disabled:opacity-50"
          title="نسخ الصورة للحافظة ولصقها فوراً"
        >
          {copiedSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-emerald-400 stroke-[3]" />
              <span className="text-emerald-400 text-[8.5px] sm:text-[9px] font-black">تم!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-slate-300" />
              <span>نسخ</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownloadTransparent}
          disabled={isTransparentExporting}
          className="flex flex-col items-center justify-center py-2 sm:py-2.5 lg:py-2 xl:py-2.5 px-1.5 sm:px-2 rounded-2xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] sm:text-[11px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold gap-1 transition-all active:scale-95 cursor-pointer w-14 sm:w-14 lg:w-12 xl:w-14 shadow-sm disabled:opacity-50"
          title="تنزيل الكرت مفرغ بدون خلفية للمونتاج"
        >
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-slate-300" />
          <span>مفرغ</span>
        </button>
      </div>
    )
  };
}
