export const TONES = [
  { id: 'luxury', label: '👑 فخم واستثماري', desc: 'أسلوب راقٍ ونخبة موجه للمستثمرين وأصحاب الذوق الرفيع' },
  { id: 'urgent', label: '⚡ حماسي وعاجل', desc: 'أسلوب جذاب وسريع يركز على الفرصة الحصرية وسرعة الحجز' },
  { id: 'warm', label: '🏡 دافئ وعائلي', desc: 'يركز على جودة الحياة، الراحة والسكينة العائلية' },
  { id: 'short', label: '🎯 مقتضب ومباشر', desc: 'نقاط مركزة وسريعة بدون إطالة مع إبراز السعر والموقع' }
];

export function generateMarketingCopies({
  fields = [],
  themeLabel = 'عرض عقاري مميز',
  themeId = 'sale',
  agentName = 'العمودي للخدمات والوساطة العقارية',
  phone = '0500000000',
  tone = 'luxury',
  customNotes = ''
}) {
  const textLines = fields.map(f => f.text).filter(Boolean);
  const mainTitle = textLines[0] || 'عقار فاخر للبيع';
  const location = textLines[1] || 'موقع استراتيجي مميز';
  const details = textLines[2] || 'مواصفات راقية وتشطيب سوبر ديلوكس';
  const price = textLines[3] || 'السعر والتفاصيل عند التواصل';

  const viralHashtags = '#عقارات #عقارات_الرياض #عقارات_السعودية #فلل_مودرن #عقار #تيك_توك_عقارات #الرياض #العمودي_للعقارات #explore #fyp #realestate';

  let tiktok = '';
  if (tone === 'luxury') {
    tiktok = '✨ ' + mainTitle + ' | تحفة معمارية استثنائية\n\n📍 ' + location + '\n🏛️ ' + details + '\n💎 ' + price + '\n\n👑 فرصة استثنائية لراغبي الفخامة والاستثمار الراقي.\n📲 للحجز والمعاينة الخاصة: ' + phone + '\n\n' + viralHashtags;
  } else if (tone === 'urgent') {
    tiktok = '🚨 فرصة عقارية لا تُعوّض في أفضل المواقع! 🏃‍♂️💨\n\n🏡 ' + mainTitle + '\n📍 ' + location + '\n✨ ' + details + '\n💰 ' + price + '\n\n⏳ العرض مباشر وحصري – الأولوية للأسبقية!\n📞 تواصل معنا فوراً قبل فوات الأوان: ' + phone + '\n\n' + viralHashtags;
  } else if (tone === 'warm') {
    tiktok = '🏡 بيت العمر وراحة البال تبدأ من هنا..\n\n✨ ' + mainTitle + '\n📍 ' + location + '\n🌿 ' + details + '\n🤍 ' + price + '\n\nمكان صُمم ليصنع أجمل الذكريات لعائلتك.\n📲 تواصل معنا لمعاينة الموقع: ' + phone + '\n\n' + viralHashtags;
  } else {
    tiktok = '📌 ' + mainTitle + '\n📍 ' + location + '\n▫️ ' + details + '\n💵 ' + price + '\n\n📞 للاستفسار والحجز: ' + phone + '\n\n' + viralHashtags;
  }

  let instagram = '✨ *' + mainTitle + '* ✨\n\n🏢 تقدم لكم *' + agentName + '* أحد أرقى العروض العقارية المتميزة:\n\n📍 *الموقع:* ' + location + '\n📐 *المواصفات:* ' + details + '\n💰 *السعر:* ' + price + '\n\n' + (customNotes ? '📝 *ملاحظات إضافية:* ' + customNotes + '\n\n' : '') + '💎 *مميزات العقار:*\n▫️ تشطيب هندسي فائق الجودة\n▫️ موقع استراتيجي قريب من كافة الخدمات\n▫️ توثيق رسمي ووساطة معتمدة 100%\n\n━━━━━━━━━━━━━━━━━━━\n📲 *للتواصل والاستفسار والمعاينة:*\n📞 هاتف / واتساب: ' + phone + '\n🏛️ *' + agentName + '*\n━━━━━━━━━━━━━━━━━━━\n\n#عقارات_الرياض #فلل_للبيع #عقارات_فاخرة #عقار #استثمار_عقاري #الرياض #تصميم_مودرن #ديكور #قصور #شقق_فاخرة';

  let whatsapp = 'السلام عليكم ورحمة الله وبركاته 🌹\n\nيسعدنا في *' + agentName + '* أن نشارككم هذا العرض العقاري الحصري:\n\n🌟 *' + mainTitle + '*\n📍 *الموقع:* ' + location + '\n📐 *المواصفات:* ' + details + '\n🏷️ *السعر:* ' + price + (customNotes ? '\n\n💡 *ملاحظة:* ' + customNotes : '') + '\n\n🔗 *لحجز موعد للمعاينة أو طلب اللوكيشن والصور والفيديو:*\nيسعدنا تواصلكم مباشرة عبر الواتساب على هذا الرقم 📲\n' + phone + '\n\n_نعتز بخدمتكم وتوفير أفضل الفرص الاستثمارية._';

  return { tiktok, instagram, whatsapp };
}

export function getWhatsAppUrl(phone, text) {
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text || '');
  if (cleanPhone) {
    return 'https://api.whatsapp.com/send?phone=' + cleanPhone + '&text=' + encodedText;
  }
  return 'https://api.whatsapp.com/send?text=' + encodedText;
}
