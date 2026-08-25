import React, { useState } from 'react';
import { Download, Copy, Check, Grid, Shield, Layers, Eye } from 'lucide-react';
import { exportCoverImage, exportTransparentGlassCard, copyCoverImageToClipboard } from '../utils/exportEngine';

export default function ExportControls({
  canvasRef,
  onOpenFullscreenPreview,
  showGridIndicator,
  setShowGridIndicator,
  activeThemeObj
}) {
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const theme = activeThemeObj || {
    bgDark: '#0f172a',
    bgSurface: '#1e293b',
    border: 'rgba(255,255,255,0.2)',
    borderSubtle: 'rgba(255,255,255,0.08)',
    accent: '#ffffff',
    accentGlow: 'rgba(255,255,255,0.3)',
    textPrimary: '#ffffff',
    textMuted: '#94a3b8'
  };

  const handleDownload = async () => {
    const node = canvasRef?.current || document.getElementById('tiktok-canvas-target');
    if (!node) {
      alert('عنصر المعاينة غير جاهز بعد');
      return;
    }
    if (isExporting) return;
    setIsExporting(true);
    try {
      await exportCoverImage({
        node,
        format: 'png',
        fileName: 'alamoudi-tiktok-cover'
      });
    } catch (err) {
      console.error('Export error:', err);
      alert('حدث خطأ أثناء التصدير: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    const node = canvasRef?.current || document.getElementById('tiktok-canvas-target');
    if (!node) {
      alert('عنصر المعاينة غير جاهز بعد');
      return;
    }
    if (isCopying) return;
    setIsCopying(true);
    try {
      await copyCoverImageToClipboard({ node });
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
      alert('تعذر النسخ: ' + err.message);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="w-full flex items-center gap-2 select-none">
      {/* 1. Direct Desktop Download Button */}
      <button
        onClick={handleDownload}
        disabled={isExporting}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-black text-xs shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        style={{
          backgroundColor: theme.accent,
          color: theme.bgDark,
          boxShadow: `0 0 16px ${theme.accentGlow}`
        }}
      >
        <Download className="w-4 h-4 stroke-[2.5]" />
        <span>{isExporting ? 'جاري التحميل...' : 'تحميل الغلاف (1080×1920)'}</span>
      </button>

      {/* 2. Direct Desktop Copy Button */}
      <button
        onClick={handleCopy}
        disabled={isCopying}
        className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl border text-[11px] font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50 shadow-sm"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.border,
          color: theme.textPrimary
        }}
        title="نسخ الغلاف للحافظة"
      >
        {copiedSuccess ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            <span className="text-emerald-400">تم!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>نسخ</span>
          </>
        )}
      </button>

      {/* 3. TikTok Views Toggle Button */}
      <button
        onClick={() => setShowGridIndicator(!showGridIndicator)}
        className="flex items-center gap-1 py-2.5 px-2.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer shadow-sm shrink-0"
        style={
          showGridIndicator
            ? {
                backgroundColor: theme.bgSurface,
                borderColor: theme.border,
                color: theme.textPrimary,
                boxShadow: `0 0 10px ${theme.accentGlow}`
              }
            : {
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textMuted
              }
        }
        title="مؤشر مشاهدات تيك توك ▷"
      >
        <Grid className="w-3.5 h-3.5" style={{ color: showGridIndicator ? theme.accent : undefined }} />
        <span>المشاهدات</span>
      </button>
    </div>
  );
}

// Right Wing: الجريد والشعار
export function RightActionWing({
  showGridLines,
  setShowGridLines,
  showLogo,
  setShowLogo,
  activeThemeObj
}) {
  const theme = activeThemeObj || {
    bgDark: '#0f172a',
    bgSurface: '#1e293b',
    border: 'rgba(255,255,255,0.2)',
    borderSubtle: 'rgba(255,255,255,0.08)',
    accent: '#ffffff',
    accentGlow: 'rgba(255,255,255,0.3)',
    textPrimary: '#ffffff',
    textMuted: '#94a3b8'
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-2.5 shrink-0 justify-center items-center">
      <button
        onClick={() => setShowGridLines(!showGridLines)}
        className="flex flex-col items-center justify-center py-2 sm:py-2.5 lg:py-2 xl:py-2.5 px-1.5 sm:px-2 rounded-2xl border text-[10px] sm:text-[11px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold gap-1 transition-all active:scale-95 cursor-pointer w-14 sm:w-14 lg:w-12 xl:w-14 shadow-sm"
        style={
          showGridLines
            ? {
                backgroundColor: theme.bgSurface,
                borderColor: theme.border,
                color: theme.accentText || theme.accent,
                boxShadow: `0 0 12px ${theme.accentGlow}`
              }
            : {
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textMuted
              }
        }
        title="خطوط المحاذاة والسنتر"
      >
        <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4" style={{ color: showGridLines ? theme.accent : undefined }} />
        <span>الجريد</span>
      </button>

      <button
        onClick={() => setShowLogo(!showLogo)}
        className="flex flex-col items-center justify-center py-2 sm:py-2.5 lg:py-2 xl:py-2.5 px-1.5 sm:px-2 rounded-2xl border text-[10px] sm:text-[11px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold gap-1 transition-all active:scale-95 cursor-pointer w-14 sm:w-14 lg:w-12 xl:w-14 shadow-sm"
        style={
          showLogo
            ? {
                backgroundColor: theme.bgSurface,
                borderColor: theme.border,
                color: theme.textPrimary,
                boxShadow: `0 0 10px ${theme.accentGlow}`
              }
            : {
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textMuted
              }
        }
        title="إظهار / إخفاء الشعار"
      >
        <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4" style={{ color: showLogo ? theme.accent : undefined }} />
        <span>الشعار</span>
      </button>
    </div>
  );
}

// Left Wing: نسخ ومفرغ PNG
export function LeftActionWing({
  canvasRef,
  activeThemeObj
}) {
  const [isCopying, setIsCopying] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [isTransparentExporting, setIsTransparentExporting] = useState(false);

  const theme = activeThemeObj || {
    bgDark: '#0f172a',
    bgSurface: '#1e293b',
    border: 'rgba(255,255,255,0.2)',
    borderSubtle: 'rgba(255,255,255,0.08)',
    accent: '#ffffff',
    accentGlow: 'rgba(255,255,255,0.3)',
    textPrimary: '#ffffff',
    textMuted: '#94a3b8'
  };

  const handleCopyClipboard = async () => {
    if (!canvasRef?.current || isCopying) return;
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

  return (
    <div className="flex flex-col gap-2 sm:gap-2.5 shrink-0 justify-center items-center">
      <button
        onClick={handleCopyClipboard}
        disabled={isCopying}
        className="flex flex-col items-center justify-center py-2 sm:py-2.5 lg:py-2 xl:py-2.5 px-1.5 sm:px-2 rounded-2xl border text-[10px] sm:text-[11px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold gap-1 transition-all active:scale-95 cursor-pointer w-14 sm:w-14 lg:w-12 xl:w-14 shadow-sm disabled:opacity-50"
        style={{
          backgroundColor: theme.bgDark,
          borderColor: copiedSuccess ? theme.accent : theme.borderSubtle,
          color: copiedSuccess ? theme.accent : theme.textMuted,
          boxShadow: copiedSuccess ? `0 0 12px ${theme.accentGlow}` : undefined
        }}
        title="نسخ الصورة للحافظة ولصقها فوراً"
      >
        {copiedSuccess ? (
          <>
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 stroke-[3]" style={{ color: theme.accent }} />
            <span className="text-[8.5px] sm:text-[9px] font-black" style={{ color: theme.accent }}>تم!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4" />
            <span>نسخ</span>
          </>
        )}
      </button>

      <button
        onClick={handleDownloadTransparent}
        disabled={isTransparentExporting}
        className="flex flex-col items-center justify-center py-2 sm:py-2.5 lg:py-2 xl:py-2.5 px-1.5 sm:px-2 rounded-2xl border text-[10px] sm:text-[11px] lg:text-[9.5px] xl:text-[10.5px] font-extrabold gap-1 transition-all active:scale-95 cursor-pointer w-14 sm:w-14 lg:w-12 xl:w-14 shadow-sm disabled:opacity-50"
        style={{
          backgroundColor: theme.bgDark,
          borderColor: theme.borderSubtle,
          color: theme.textMuted
        }}
        title="تنزيل الكرت مفرغ بدون خلفية للمونتاج"
      >
        <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4" />
        <span>مفرغ</span>
      </button>
    </div>
  );
}
