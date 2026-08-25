import { toPng, toJpeg, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';

/**
 * Mobile-aware download:
 * - Desktop: standard blob URL download (unchanged)
 * - Mobile: opens image in new tab with long-press save instructions
 *   (most reliable cross-platform method, works on all iOS/Android browsers)
 */
async function downloadForDevice(dataUrl, fileName, mimeType = 'image/png') {
  // Convert dataUrl to blob
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  // Detect mobile (iOS / Android)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Open a new tab with the image displayed full-screen
    // User long-presses → "Save to Photos" / "Add to Photos" — guaranteed to work
    const blobUrl = URL.createObjectURL(blob);
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
          <title>حفظ الغلاف</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              background: #0a0a0a;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              min-height: 100dvh;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 16px;
              gap: 16px;
            }
            .instruction {
              background: rgba(255,255,255,0.1);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255,255,255,0.15);
              border-radius: 14px;
              padding: 14px 20px;
              text-align: center;
              color: #fff;
              font-size: 14px;
              font-weight: 700;
              line-height: 1.7;
              max-width: 340px;
              animation: fadeIn 0.4s ease;
            }
            .instruction .icon { font-size: 22px; margin-bottom: 4px; }
            .instruction .sub { color: #94a3b8; font-size: 12px; font-weight: 500; margin-top: 4px; }
            img {
              max-width: 92%;
              max-height: 72vh;
              max-height: 72dvh;
              border-radius: 12px;
              box-shadow: 0 8px 40px rgba(0,0,0,0.6);
              object-fit: contain;
              -webkit-touch-callout: default !important;
              animation: fadeIn 0.5s ease;
            }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          </style>
        </head>
        <body>
          <div class="instruction">
            <div class="icon">👆</div>
            <div>اضغط مطولاً على الصورة</div>
            <div>ثم اختر «حفظ الصورة»</div>
            <div class="sub">الصورة ستُحفظ في معرض الصور مباشرة</div>
          </div>
          <img src="${blobUrl}" alt="غلاف تيك توك" />
        </body>
        </html>
      `);
      newTab.document.close();
    } else {
      // Popup blocked — fallback to direct blob link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    // Don't revoke immediately — the new tab needs the URL
    setTimeout(() => URL.revokeObjectURL(blobUrl), 120000);
    return true;
  }

  // Desktop: standard blob URL download (unchanged behavior)
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
      backgroundColor: 'transparent',
      filter
    });

    const fullFileName = fileName + '-' + Date.now() + '.png';
    await downloadForDevice(dataUrl, fullFileName, 'image/png');

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    return true;
  } catch (err) {
    console.error('Transparent export failed:', err);
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
      filter
    });

    if (!blob) throw new Error('فشل توليد بيانات الصورة');

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);

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
