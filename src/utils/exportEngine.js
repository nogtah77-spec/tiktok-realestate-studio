import { toPng, toJpeg, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';

/**
 * Show luxurious In-App Modal on mobile for direct long-press save to Photos/Gallery
 * (Zero popup blockers, zero blob isolation issues, 100% reliable)
 */
function showMobileSaveModal(dataUrl, fileName) {
  const existing = document.getElementById('mobile-image-save-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'mobile-image-save-modal';
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 14px 12px;
    padding-top: max(14px, env(safe-area-inset-top));
    padding-bottom: max(14px, env(safe-area-inset-bottom));
    box-sizing: border-box;
    overflow-y: auto;
    animation: mobileModalFadeIn 0.25s ease-out;
  `;

  modal.innerHTML = `
    <style>
      @keyframes mobileModalFadeIn {
        from { opacity: 0; transform: scale(0.97); }
        to { opacity: 1; transform: scale(1); }
      }
      .mobile-save-img {
        max-width: 90vw;
        max-height: 65vh;
        max-height: 65dvh;
        border-radius: 16px;
        box-shadow: 0 12px 48px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.15);
        object-fit: contain;
        -webkit-touch-callout: default !important;
        user-select: auto !important;
        -webkit-user-select: auto !important;
      }
    </style>

    <!-- Top Bar: Title & Close Button -->
    <div style="width: 100%; max-width: 380px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
      <span style="color: #f8fafc; font-size: 13px; font-weight: 800; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        حفظ الغلاف للاستوديو 📸
      </span>
      <button id="close-mobile-save-modal" style="
        background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.2);
        color: #ffffff;
        font-size: 11px;
        font-weight: 700;
        padding: 6px 14px;
        border-radius: 10px;
        cursor: pointer;
      ">
        ✕ إغلاق
      </button>
    </div>

    <!-- Center: High-Res Image -->
    <div style="flex: 1; display: flex; align-items: center; justify-content: center; width: 100%; padding: 6px 0;">
      <img src="${dataUrl}" alt="غلاف تيك توك بدقة فائقة" class="mobile-save-img" />
    </div>

    <!-- Bottom Instruction Pill -->
    <div style="
      width: 100%;
      max-width: 380px;
      background: linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95));
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 16px;
      padding: 12px 16px;
      text-align: center;
      box-shadow: 0 8px 30px rgba(0,0,0,0.5);
      margin-top: 6px;
    ">
      <div style="color: #ffffff; font-size: 12.5px; font-weight: 900; font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: flex; align-items: center; justify-content: center; gap: 6px;">
        <span>👆</span>
        <span>اضغط مطولاً على الصورة ثم اختر «حفظ الصورة»</span>
      </div>
      <div style="color: #94a3b8; font-size: 11px; font-weight: 600; margin-top: 3px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        تُحفظ مباشرة في ألبوم الكاميرا (1080×1920 بدقة فائقة)
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close handlers
  const closeBtn = modal.querySelector('#close-mobile-save-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.remove());
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

/**
 * Mobile-aware download:
 * - Mobile: opens In-App modal with native long-press save to Photos
 * - Desktop: standard blob URL download
 */
async function downloadForDevice(dataUrl, fileName, mimeType = 'image/png') {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || ('ontouchstart' in window && window.innerWidth <= 768);

  if (isMobile) {
    showMobileSaveModal(dataUrl, fileName);
    return true;
  }

  // Desktop: standard blob URL download (unchanged behavior)
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = blobUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  return true;
}

export async function exportCoverImage({
  node,
  format = 'png',
  fileName = 'alamoudi-tiktok-cover'
}) {
  if (!node) throw new Error('عنصر المعاينة غير متوفر للتصدير');

  if (document.fonts) {
    await document.fonts.ready;
  }

  const filter = (domNode) => {
    if (domNode.classList && domNode.classList.contains('no-export')) {
      return false;
    }
    return true;
  };

  // Add clean export class to strip backdrop-filter and ensure rectangular 9:16 export
  node.classList.add('is-exporting');

  const options = {
    pixelRatio: 3, // 360x640 * 3 = exact 1080x1920 UHD resolution
    quality: 1,
    cacheBust: true,
    width: 360,
    height: 640,
    style: {
      transform: 'none',
      transformOrigin: '0 0',
      borderRadius: '0px'
    },
    filter
  };

  try {
    let dataUrl;
    if (format === 'jpeg' || format === 'jpg') {
      dataUrl = await toJpeg(node, options);
    } else {
      dataUrl = await toPng(node, options);
    }

    const fullFileName = fileName + '-' + Date.now() + '.' + format;
    const mimeType = (format === 'jpeg' || format === 'jpg') ? 'image/jpeg' : 'image/png';
    await downloadForDevice(dataUrl, fullFileName, mimeType);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    return true;
  } catch (err) {
    console.error('Export failed:', err);
    throw err;
  } finally {
    node.classList.remove('is-exporting');
  }
}

export async function exportTransparentGlassCard({
  cardNode,
  fileName = 'alamoudi-glass-card-transparent'
}) {
  if (!cardNode) throw new Error('عنصر البوكس الزجاجي غير متوفر');

  if (document.fonts) {
    await document.fonts.ready;
  }

  const filter = (domNode) => {
    if (domNode.classList && domNode.classList.contains('no-export')) {
      return false;
    }
    return true;
  };

  cardNode.classList.add('is-exporting');

  try {
    const dataUrl = await toPng(cardNode, {
      pixelRatio: 3,
      quality: 1,
      cacheBust: true,
      width: 360,
      height: 640,
      style: {
        transform: 'none',
        transformOrigin: '0 0',
        borderRadius: '0px'
      },
      backgroundColor: 'transparent',
      filter
    });

    const fullFileName = fileName + '-' + Date.now() + '.png';
    await downloadForDevice(dataUrl, fullFileName, 'image/png');

    try {
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    return true;
  } catch (err) {
    console.error('Export transparent card failed:', err);
    throw err;
  } finally {
    cardNode.classList.remove('is-exporting');
  }
}

export async function copyCoverImageToClipboard({ node }) {
  if (!node) throw new Error('عنصر المعاينة غير متوفر للنسخ');

  if (document.fonts) {
    await document.fonts.ready;
  }

  const filter = (domNode) => {
    if (domNode.classList && domNode.classList.contains('no-export')) {
      return false;
    }
    return true;
  };

  node.classList.add('is-exporting');

  try {
    const blob = await toBlob(node, {
      pixelRatio: 3,
      quality: 1,
      cacheBust: true,
      width: 360,
      height: 640,
      style: {
        transform: 'none',
        transformOrigin: '0 0',
        borderRadius: '0px'
      },
      filter
    });

    if (navigator.clipboard && navigator.clipboard.write) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
    } else {
      throw new Error('متصفحك لا يدعم النسخ المباشر للصور، استخدم زر التحميل');
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    return true;
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    throw err;
  } finally {
    node.classList.remove('is-exporting');
  }
}
