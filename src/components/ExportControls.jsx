import React, { useState } from 'react';
import { Download, Copy, Check, Share2, Eye, Grid, Shield, Layers } from 'lucide-react';
import { exportCoverImage, exportTransparentGlassCard, copyCoverImageToClipboard } from '../utils/exportEngine';

export default function ExportControls({
  canvasRef,
  showGridLines,
  setShowGridLines,
  showLogo,
  setShowLogo,
  showGridIndicator,
  setShowGridIndicator,
  onOpenCopywriterModal
}) {
  const [isExporting, setIsExporting] = useState(false);
  const [isTransparentExporting, setIsTransparentExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

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

  const handleCopyClipboard = async () => {
    if (!canvasRef.current || isCopying) return;
    setIsCopying(true);
    try {
      await copyCoverImageToClipboard({ node: canvasRef.current });
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    } catch (err) {
      alert('تعذر النسخ: ' + err.message);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl space-y-2.5 text-xs">
      {/* 1. Main Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleDownloadFull('png')}
          disabled={isExporting}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>{isExporting ? 'جاري التصدير...' : 'تحميل الغلاف (1080×1920)'}</span>
        </button>

        <button
          onClick={handleCopyClipboard}
          disabled={isCopying}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs border border-slate-700 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {copiedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span className="text-emerald-400">تم النسخ!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-amber-400" />
              <span>{isCopying ? 'جاري النسخ...' : 'نسخ للحافظة'}</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Transparent Export + Quick Toggles */}
      <div className="grid grid-cols-4 gap-1.5 pt-1 border-t border-slate-800">
        <button
          onClick={handleDownloadTransparent}
          disabled={isTransparentExporting}
          className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-medium transition-colors"
          title="كرت مفرغ بدون خلفية للمونتاج"
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>مفرغ PNG</span>
        </button>

        <button
          onClick={() => setShowGridLines(!showGridLines)}
          className={`flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg border text-[11px] font-medium transition-all ${
            showGridLines
              ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>الجريد {showGridLines ? '✓' : ''}</span>
        </button>

        <button
          onClick={() => setShowLogo(!showLogo)}
          className={`flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg border text-[11px] font-medium transition-all ${
            showLogo
              ? 'border-amber-400 bg-amber-500/15 text-amber-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>الشعار {showLogo ? '✓' : '✕'}</span>
        </button>

        <button
          onClick={onOpenCopywriterModal}
          className="flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>مولد نصوص</span>
        </button>
      </div>
    </div>
  );
}
