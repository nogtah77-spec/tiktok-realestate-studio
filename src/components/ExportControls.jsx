import React, { useState } from 'react';
import { Download, Copy, Check, Grid, Shield, Layers, Eye } from 'lucide-react';
import { exportCoverImage, exportTransparentGlassCard, copyCoverImageToClipboard } from '../utils/exportEngine';

export default function ExportControls({
  canvasRef,
  showGridLines,
  setShowGridLines,
  showLogo,
  setShowLogo,
  showGridIndicator,
  setShowGridIndicator
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
    <div className="w-full flex flex-col gap-2 select-none">
      {/* 1. Main High-Res Download Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleDownloadFull('png')}
          disabled={isExporting}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>{isExporting ? 'جاري التصدير...' : 'تحميل الغلاف عالي الدقة (1080×1920)'}</span>
        </button>

        {/* TikTok Views Toggle */}
        <button
          onClick={() => setShowGridIndicator(!showGridIndicator)}
          className={`flex items-center gap-1 py-2.5 px-2.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
            showGridIndicator
              ? 'border-slate-700 bg-slate-800 text-slate-200'
              : 'border-slate-800 bg-slate-950 text-slate-500 hover:text-slate-300'
          }`}
          title="مؤشر مشاهدات تيك توك ▷"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="text-[10px]">المشاهدات</span>
        </button>
      </div>
    </div>
  );
}

// Side Action Wings Components for Direct Placement next to the Canvas
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
      setTimeout(() => setCopiedSuccess(false), 2200);
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
    // Right Side Wing (الجريد والشعار)
    rightWing: (
      <div className="flex flex-col gap-2 shrink-0">
        <button
          onClick={() => setShowGridLines(!showGridLines)}
          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-bold gap-1 transition-all cursor-pointer w-14 ${
            showGridLines
              ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-sm'
              : 'border-slate-800 bg-slate-900/90 text-slate-400 hover:text-slate-200'
          }`}
          title="خطوط المحاذاة والسنتر"
        >
          <Grid className="w-4 h-4 text-cyan-400" />
          <span>الجريد</span>
        </button>

        <button
          onClick={() => setShowLogo(!showLogo)}
          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-bold gap-1 transition-all cursor-pointer w-14 ${
            showLogo
              ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-sm'
              : 'border-slate-800 bg-slate-900/90 text-slate-400 hover:text-slate-200'
          }`}
          title="إظهار / إخفاء الشعار"
        >
          <Shield className="w-4 h-4 text-amber-400" />
          <span>الشعار</span>
        </button>
      </div>
    ),

    // Left Side Wing (مفرغ PNG ونسخ للحافظة)
    leftWing: (
      <div className="flex flex-col gap-2 shrink-0">
        <button
          onClick={handleCopyClipboard}
          disabled={isCopying}
          className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-[10px] font-bold gap-1 transition-all active:scale-95 cursor-pointer w-14 disabled:opacity-50"
          title="نسخ الصورة للحافظة ولصقها فوراً"
        >
          {copiedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span className="text-emerald-400 text-[9px]">تم النسخ!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-amber-400" />
              <span>نسخ</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownloadTransparent}
          disabled={isTransparentExporting}
          className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 text-[10px] font-bold gap-1 transition-all active:scale-95 cursor-pointer w-14 disabled:opacity-50"
          title="تنزيل الكرت مفرغ بدون خلفية للمونتاج"
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>مفرغ</span>
        </button>
      </div>
    )
  };
}
