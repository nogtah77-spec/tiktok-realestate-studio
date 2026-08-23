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

  const options = {
    pixelRatio: 2.84, // 380x675 * 2.84 = 1080x1920 crisp resolution
    quality: 0.98,
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

  try {
    const blob = await toBlob(node, {
      pixelRatio: 2.84,
      quality: 0.98,
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
  }
}
