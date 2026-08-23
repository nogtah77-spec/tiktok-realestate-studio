import React, { useState } from 'react';
import { Download, Copy, Check, Share2, Grid, Shield, Layers, Smartphone, Eye, Sparkles } from 'lucide-react';
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
      setTimeout(() => setCopiedSuccess(false), 2200);
    } catch (err) {
      alert('تعذر النسخ: ' + err.message);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl flex items-center justify-between gap-1.5 text-xs select-none">
      {/* 1. Main High-Res Download (Icon + Label) */}
      <button
        onClick={() => handleDownloadFull('png')}
        disabled={isExporting}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        title="تحميل الغلاف فائق الدقة (1080×1920)"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span className="whitespace-nowrap">{isExporting ? 'تصدير...' : 'تحميل 1080p'}</span>
      </button>

      {/* 2. Fast Copy to Clipboard (Icon + Label) */}
      <button
        onClick={handleCopyClipboard}
        disabled={isCopying}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs border border-slate-700 shadow transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        title="نسخ الصورة للحافظة ولصقها فوراً في برامج المونتاج"
      >
        {copiedSuccess ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            <span className="text-emerald-400 whitespace-nowrap">تم النسخ!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-amber-400" />
            <span className="whitespace-nowrap">{isCopying ? 'معالجة...' : 'نسخ للحافظة'}</span>
          </>
        )}
      </button>

      {/* 3. Luxury Micro-Icon Toolbar Strip */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Transparent PNG for video editors */}
        <button
          onClick={handleDownloadTransparent}
          disabled={isTransparentExporting}
          className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
          title="تصدير كرت مفرغ بدون خلفية (PNG) للمونتاج"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        {/* Grid lines toggle */}
        <button
          onClick={() => setShowGridLines(!showGridLines)}
          className={`p-2 rounded-xl border transition-all cursor-pointer ${
            showGridLines
              ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
          title="إظهار / إخفاء خطوط الجريد والمحاذاة"
        >
          <Grid className="w-3.5 h-3.5" />
        </button>

        {/* Logo toggle */}
        <button
          onClick={() => setShowLogo(!showLogo)}
          className={`p-2 rounded-xl border transition-all cursor-pointer ${
            showLogo
              ? 'border-amber-400 bg-amber-500/15 text-amber-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
          title="إظهار / إخفاء الشعار"
        >
          <Shield className="w-3.5 h-3.5" />
        </button>

        {/* TikTok views counter toggle */}
        <button
          onClick={() => setShowGridIndicator(!showGridIndicator)}
          className={`p-2 rounded-xl border transition-all cursor-pointer ${
            showGridIndicator
              ? 'border-slate-700 bg-slate-800 text-slate-200'
              : 'border-slate-800 bg-slate-950 text-slate-500 hover:text-slate-300'
          }`}
          title="مؤشر مشاهدات تيك توك ▷"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
