import { toPng, toJpeg, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';

/**
 * Mobile-aware download: uses Web Share API on mobile (saves to Photos gallery)
 * and falls back to standard <a download> on desktop.
 */
async function downloadForDevice(dataUrl, fileName, mimeType = 'image/png') {
  // Convert dataUrl to blob
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  // Detect mobile (iOS / Android)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Try Web Share API on mobile (allows "Save Image" to Photos gallery)
  if (isMobile && navigator.canShare) {
    try {
      const file = new File([blob], fileName, { type: mimeType });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: fileName
        });
        return true;
      }
    } catch (shareErr) {
      // User cancelled share or share failed — fall through to blob download
      if (shareErr.name === 'AbortError') return true; // user cancelled, not an error
    }
  }

  // Fallback: blob URL download (works reliably on desktop, better than dataUrl on some mobile)
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = blobUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Clean up blob URL after a short delay
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
