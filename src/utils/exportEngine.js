import { toPng, toJpeg, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';

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

    const link = document.createElement('a');
    link.download = fileName + '-' + Date.now() + '.' + format;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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

    const link = document.createElement('a');
    link.download = fileName + '-' + Date.now() + '.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
