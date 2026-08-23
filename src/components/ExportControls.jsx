import React, { useState } from 'react';
import { Download, Copy, Check, Share2, Eye, EyeOff, Smartphone, Grid, Shield, Sparkles, Layers } from 'lucide-react';
import { exportCoverImage, exportTransparentGlassCard, copyCoverImageToClipboard } from '../utils/exportEngine';

export default function ExportControls({
  canvasRef,
  showGridLines,
  setShowGridLines,
  showLogo,
  setShowLogo,
  showGridIndicator,
  setShowGridIndicator,
  isPhoneMockup,
  setIsPhoneMockup,
  onOpenCopywriterModal,
  viewMode = 'split',
  setViewMode
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
      alert('حدث خطأ أثناء تصدير الصورة: ' + err.message);
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
      alert('تعذر نسخ الصورة للحافظة: ' + err.message);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="p-4 lg:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-3.5 text-xs">
      {/* 1. Main Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          onClick={() => handleDownloadFull('png')}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>{isExporting ? 'جاري التصدير (1080×1920)...' : 'تحميل الغلاف عالي الدقة (1080×1920)'}</span>
        </button>

        <button
          onClick={handleCopyClipboard}
          disabled={isCopying}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs border border-slate-700 shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          {copiedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span className="text-emerald-400">تم النسخ للحافظة بنجاح!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-amber-400" />
              <span>{isCopying ? 'جاري النسخ...' : 'نسخ الصورة للحافظة (لصق فوري)'}</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Transparent Glass Card Export for Video Editing */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] text-slate-300 font-medium">تصدير للمونتاج: كرت مفرغ بدون خلفية (PNG)</span>
        </div>
        <button
          onClick={handleDownloadTransparent}
          disabled={isTransparentExporting}
          className="px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-500/30 transition-all cursor-pointer disabled:opacity-50"
        >
          {isTransparentExporting ? 'جاري التصدير...' : 'تنزيل مفرغ 📥'}
        </button>
      </div>

      {/* 3. Auxiliary Quick Controls Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
        {/* Grid Lines Toggle */}
        <button
          onClick={() => setShowGridLines(!showGridLines)}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
            showGridLines
              ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
          title="خطوط المحاذاة والسنتر"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>خطوط الجريد {showGridLines ? '✓' : ''}</span>
        </button>

        {/* Show/Hide Logo Quick Toggle */}
        <button
          onClick={() => setShowLogo(!showLogo)}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
            showLogo
              ? 'border-amber-400 bg-amber-500/15 text-amber-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>الشعار {showLogo ? 'ظاهر' : 'مخفي'}</span>
        </button>

        {/* TikTok Grid Counter Toggle */}
        <button
          onClick={() => setShowGridIndicator(!showGridIndicator)}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
            showGridIndicator
              ? 'border-slate-700 bg-slate-800 text-slate-200'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>المشاهدات ▷</span>
        </button>

        {/* Social Copywriter Trigger */}
        <button
          onClick={onOpenCopywriterModal}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[11px] transition-all cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>كابشن وواتساب ↗</span>
        </button>
      </div>
    </div>
  );
}
