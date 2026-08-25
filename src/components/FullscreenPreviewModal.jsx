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
  const [isExporting, setIsExporting] = React.useState(false);
  const [isCopying, setIsCopying] = React.useState(false);
  const [copiedSuccess, setCopiedSuccess] = React.useState(false);
  const [dynamicScale, setDynamicScale] = React.useState(0.8);

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

  const internalRef = React.useRef(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const updateScale = () => {
      const availH = window.innerHeight - 100;
      const availW = window.innerWidth - 24;
      const scaleH = availH / 640;
      const scaleW = availW / 360;
      const finalScale = Math.min(scaleH, scaleW, 1.0);
      setDynamicScale(Math.max(finalScale, 0.45));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isOpen]);

  if (!isOpen) return null;

  const getTargetNode = () => {
    return internalRef.current || canvasRef?.current || document.getElementById('fullscreen-tiktok-canvas') || document.querySelector('#tiktok-canvas-target');
  };

  const handleDownloadFull = async () => {
    const targetNode = getTargetNode();
    if (!targetNode) {
      alert('لم يتم العثور على عنصر الغلاف، يرجى إعادة المحاولة');
      return;
    }
    if (isExporting) return;
    setIsExporting(true);
    try {
      await exportCoverImage({
        node: targetNode,
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

  const handleCopyClipboard = async () => {
    const targetNode = getTargetNode();
    if (!targetNode) {
      alert('لم يتم العثور على عنصر الغلاف');
      return;
    }
    if (isCopying) return;
    setIsCopying(true);
    try {
      await copyCoverImageToClipboard({ node: targetNode });
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
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between p-2 sm:p-3 select-none overflow-hidden touch-none h-[100dvh] w-screen transition-colors duration-200"
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
          <span>معاينة الغلاف (1080×1920)</span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
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

      {/* Center Phone Mockup (Dynamically auto-scaled to fit viewport 100%) */}
      <div className="flex-1 flex items-center justify-center w-full max-w-md mx-auto overflow-hidden py-1">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 shrink-0 transition-transform duration-150"
          style={{
            width: '360px',
            height: '640px',
            transform: `scale(${dynamicScale})`,
            transformOrigin: 'center center'
          }}
        >
          <CanvasPreview
            ref={(node) => {
              internalRef.current = node;
              if (canvasRef) {
                if (typeof canvasRef === 'function') canvasRef(node);
                else canvasRef.current = node;
              }
            }}
            id="fullscreen-tiktok-canvas"
            {...previewProps}
            isPhoneMockup={false}
            showGridLines={false}
            showGridIndicator={false}
            activeThemeObj={theme}
          />
        </div>
      </div>

      {/* Mobile Footer (Clean screenshot tip) */}
      <div className="sm:hidden flex-none w-full max-w-sm mx-auto text-center py-2 px-3 rounded-xl bg-white/5 border border-white/10">
        <span className="text-[11px] font-bold text-slate-300">
          📸 المعاينة جاهزة الآن بدقة فائقة
        </span>
      </div>

      {/* Desktop Footer (Download & Copy Buttons) */}
      <div
        className="hidden sm:flex flex-none w-full max-w-md mx-auto items-center gap-2 pt-2 border-t"
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
