export const TONES = [
  { id: 'luxury', label: '👑 فاخر ومميز', desc: 'أسلوب راقٍ وأنيق موجه للعروض الراقية والمستثمرين' },
  { id: 'urgent', label: '🔥 حماسي وفرصة', desc: 'أسلوب جذاب وسريع يركز على الفرصة وسرعة الحجز' },
  { id: 'warm', label: '🏡 دافئ ومريح', desc: 'يركز على الراحة والسكينة وجودة المكان' },
  { id: 'short', label: '⚡ مختصر ومباشر', desc: 'نقاط سريعة بدون إطالة مع إبراز الأرقام والموقع فوراً' }
];

export const QUICK_PROPERTY_FEATURES = [
  { id: 'instant_delivery', label: '🔑 استلام فوري' },
  { id: 'super_lux', label: '✨ تشطيب سوبر لوكس' },
  { id: 'facilities', label: '💳 توجد تسهيلات بالسداد' },
  { id: 'cash_discount', label: '💵 خصم خاص للكاش' },
  { id: 'registered', label: '📜 مسجل شهر عقاري / عقد نهائي' },
  { id: 'land_share', label: '📝 حصة في الأرض' },
  { id: 'prime_location', label: '🏙️ موقع حيوي مميز' },
  { id: 'elevator', label: '🛗 أسانسير راكب' },
  { id: 'garage', label: '🚗 جراج خاص' },
  { id: 'pool', label: '🏊 حمام سباحة' },
  { id: 'security', label: '🛡️ أمن وحراسة 24 ساعة' }
];

export const OUTRO_PRESETS = [
  { id: 'whatsapp_direct', label: '📲 تواصل عبر الواتساب والموبايل' },
  { id: 'location_viewing', label: '📍 طلب اللوكيشن والمعاينة على الطبيعة' },
  { id: 'direct_owner', label: '💼 للجادين فقط - التعامل مباشر' },
  { id: 'limited_time', label: '⏳ فرصة متاحة لفترة محدودة' }
];

export function generateMarketingCopies({
  fields = [],
  agentName = 'العمودي للخدمات العقارية',
  phone = '01000000000',
  tone = 'luxury',
  selectedFeatures = [],
  closingText = '',
  customNotes = ''
}) {
  const textLines = fields.map(f => f.text).filter(Boolean);
  const mainTitle = textLines[0] || 'عقار مميز للبيع';
  const location = textLines[1] || 'موقع استراتيجي حيوي';
  const details = textLines[2] || 'مواصفات راقية ومساحة ممتازة';

  const viralHashtags = '#عقارات #شقق_للبيع #فلل_فاخرة #عقارات_مصر #الشيخ_زايد #التجمع_الخامس #العاصمة_الإدارية #الساحل_الشمالي #العمودي_للعقارات #استثمار_عقاري #fyp #viral #realestate';

  // Feature bullets
  const featuresText = selectedFeatures.length > 0
    ? '\n💎 أهم المميزات:\n' + selectedFeatures.map(f => `▫️ ${f}`).join('\n') + '\n'
    : '';

  // Closing / CTA line
  const defaultClosing = phone ? `📲 للتواصل والاستفسار والمعاينة (هاتف / واتساب): ${phone}` : '📲 للتواصل والمعاينة يسعدنا اتصالكم';
  const finalClosing = closingText ? `${closingText}\n${defaultClosing}` : defaultClosing;

  let tiktok = '';
  if (tone === 'luxury') {
    tiktok = `✨ ${mainTitle} | فرصة استثنائية\n\n📍 الموقع: ${location}\n📐 المواصفات: ${details}\n${featuresText}\n👑 للباحثين عن الفخامة والمواقع الراقية.\n${finalClosing}\n\n${viralHashtags}`;
  } else if (tone === 'urgent') {
    tiktok = `🚨 فرصة عقارية مميزة لا تُعوّض! 🏃‍♂️💨\n\n🏡 ${mainTitle}\n📍 الموقع: ${location}\n✨ المواصفات: ${details}\n${featuresText}\n⏳ المعاينة متاحة والحجز بأسبقية التواصل!\n${finalClosing}\n\n${viralHashtags}`;
  } else if (tone === 'warm') {
    tiktok = `🏡 مكان صُمم ليمنحك الراحة والسكينة..\n\n✨ ${mainTitle}\n📍 الموقع: ${location}\n🌿 التفاصيل: ${details}\n${featuresText}\n${finalClosing}\n\n${viralHashtags}`;
  } else {
    tiktok = `📌 ${mainTitle}\n📍 الموقع: ${location}\n▫️ المواصفات: ${details}\n${featuresText}\n${finalClosing}\n\n${viralHashtags}`;
  }

  let instagram = `✨ *${mainTitle}* ✨\n\n🏢 تقدم لكم *${agentName}* أحد أفضل العروض العقارية المتميزة:\n\n📍 *الموقع:* ${location}\n📐 *المواصفات:* ${details}\n${featuresText}${customNotes ? `📝 *ملاحظات:* ${customNotes}\n\n` : ''}━━━━━━━━━━━━━━━━━━━\n${finalClosing}\n🏛️ *${agentName}*\n━━━━━━━━━━━━━━━━━━━\n\n${viralHashtags}`;

  let whatsapp = `السلام عليكم ورحمة الله وبركاته 🌹\n\nيسعدنا في *${agentName}* أن نشارككم تفاصيل هذا العرض المميز:\n\n🌟 *${mainTitle}*\n📍 *الموقع:* ${location}\n📐 *المواصفات:* ${details}\n${featuresText}${customNotes ? `💡 *ملاحظة:* ${customNotes}\n` : ''}\n🔗 *لطلب اللوكيشن أو تحديد موعد للمعاينة على الطبيعة:*\n${finalClosing}\n\n_نعتز دائماً بخدمتكم وتوفير أفضل الفرص._`;

  return { tiktok, instagram, whatsapp, hashtags: viralHashtags };
}

export function getWhatsAppUrl(phone, text) {
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text || '');
  if (cleanPhone) {
    return 'https://api.whatsapp.com/send?phone=' + cleanPhone + '&text=' + encodedText;
  }
  return 'https://api.whatsapp.com/send?text=' + encodedText;
}
