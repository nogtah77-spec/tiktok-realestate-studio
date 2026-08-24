import React from 'react';
import { X, Download, Copy, Check, Sparkles } from 'lucide-react';
import CanvasPreview from './CanvasPreview';
import { exportCoverImage, copyCoverImageToClipboard } from '../utils/exportEngine';

export default function FullscreenPreviewModal({
  isOpen,
  onClose,
  canvasRef,
  previewProps = {},
  activeThemeObj
}) {
  if (!isOpen) return null;

  const [isExporting, setIsExporting] = React.useState(false);
  const [isCopying, setIsCopying] = React.useState(false);
  const [copiedSuccess, setCopiedSuccess] = React.useState(false);

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

  const handleDownloadFull = async () => {
    if (!canvasRef.current || isExporting) return;
    setIsExporting(true);
    try {
      await exportCoverImage({
        node: canvasRef.current,
        format: 'png',
        fileName: 'alamoudi-tiktok-cover'
      });
    } catch (err) {
      alert('حدث خطأ أثناء التصدير: ' + err.message);
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
      setTimeout(() => setCopiedSuccess(false), 2000);
    } catch (err) {
      alert('تعذر النسخ: ' + err.message);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between p-3 select-none overflow-hidden touch-none h-[100dvh] w-screen transition-colors duration-200"
      style={{
        backgroundColor: theme.bgDark,
        color: theme.textPrimary
      }}
    >
      {/* Top Header Bar */}
      <div
        className="flex-none w-full max-w-md mx-auto flex items-center justify-between pb-2 border-b"
        style={{ borderColor: theme.borderSubtle }}
      >
        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
          <Sparkles className="w-4 h-4" style={{ color: theme.accent }} />
          <span>معاينة الغلاف بالكامل (1080×1920)</span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.borderSubtle,
            color: theme.textPrimary
          }}
        >
          <X className="w-4 h-4 text-rose-400" />
          <span>إغلاق والعودة</span>
        </button>
      </div>

      {/* Center Phone Mockup (Locked in view, zero scrolling) */}
      <div className="flex-1 flex items-center justify-center w-full max-w-sm mx-auto overflow-hidden py-1">
        <div className="scale-[0.78] sm:scale-95 origin-center">
          <CanvasPreview
            ref={canvasRef}
            {...previewProps}
            isPhoneMockup={true}
            activeThemeObj={theme}
          />
        </div>
      </div>

      {/* Bottom Action Buttons (Download & Copy) */}
      <div
        className="flex-none w-full max-w-md mx-auto flex items-center gap-2 pt-2 border-t"
        style={{ borderColor: theme.borderSubtle }}
      >
        <button
          onClick={handleDownloadFull}
          disabled={isExporting}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-black text-xs shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          style={{
            backgroundColor: theme.accent,
            color: theme.bgDark,
            boxShadow: `0 0 12px ${theme.accentGlow}`
          }}
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>{isExporting ? 'جاري التحميل...' : 'تحميل الغلاف (1080×1920)'}</span>
        </button>

        <button
          onClick={handleCopyClipboard}
          disabled={isCopying}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs border shadow transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.borderSubtle,
            color: theme.textPrimary
          }}
        >
          {copiedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span className="text-emerald-400">تم النسخ!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>نسخ للحافظة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
