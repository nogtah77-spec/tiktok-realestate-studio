import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Send, Sparkles, MessageCircle, Video, Camera, Hash, RotateCcw, Trash2, Tag } from 'lucide-react';
import { TONES, QUICK_PROPERTY_FEATURES, OUTRO_PRESETS, generateMarketingCopies, getWhatsAppUrl } from '../utils/copyGenerator';

export default function SocialCopywriterModal({
  isOpen,
  onClose,
  fields = [],
  themeId = 'sale-gold'
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('tiktok'); // 'tiktok', 'instagram', 'whatsapp', 'hashtags'
  const [selectedTone, setSelectedTone] = useState('luxury');
  const [phone, setPhone] = useState('01000000000');
  const [agentName, setAgentName] = useState('العمودي للخدمات العقارية');
  const [selectedFeatures, setSelectedFeatures] = useState(['🔑 استلام فوري', '✨ تشطيب سوبر لوكس', '💳 توجد تسهيلات بالسداد']);
  const [closingText, setClosingText] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  
  // Custom edited copy per tab
  const [customText, setCustomText] = useState('');
  const [copiedTab, setCopiedTab] = useState('');

  // Generate base copies
  const copies = generateMarketingCopies({
    fields,
    agentName,
    phone,
    tone: selectedTone,
    selectedFeatures,
    closingText,
    customNotes
  });

  // Sync edited text on tab or setting changes unless user typed custom text
  useEffect(() => {
    setCustomText(copies[activeTab] || '');
  }, [activeTab, selectedTone, agentName, phone, selectedFeatures, closingText, customNotes]);

  const toggleFeature = (featureLabel) => {
    if (selectedFeatures.includes(featureLabel)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== featureLabel));
    } else {
      setSelectedFeatures([...selectedFeatures, featureLabel]);
    }
  };

  const handleCopy = (text, tabName) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(''), 2000);
  };

  const handleResetToAuto = () => {
    setCustomText(copies[activeTab] || '');
  };

  const handleClear = () => {
    setCustomText('');
  };

  const whatsAppDirectUrl = getWhatsAppUrl(phone, customText || copies.whatsapp);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 text-xs select-none animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center shadow-inner">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-slate-100 text-sm tracking-tight">صانع النصوص الإعلانية والكابشن PRO</h3>
              <p className="text-[11px] text-slate-400 font-medium pt-0.5">نصوص دعائية مهيأة للسوشيال ميديا</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* 1. Quick Info (Agent & Phone) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-300 block mb-1 font-bold">اسم البراند / الشركة:</span>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-slate-500 font-bold"
              />
            </div>

            <div>
              <span className="text-[11px] text-slate-300 block mb-1 font-bold">رقم الموبايل / الواتساب:</span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-slate-500 font-mono"
              />
            </div>
          </div>

          {/* 2. Tone Selector */}
          <div>
            <span className="text-[11px] font-bold text-slate-300 block mb-1.5">نبرة الخطاب التسويقي:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTone(t.id)}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border transition-all text-center cursor-pointer ${
                    selectedTone === t.id
                      ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. One-Click Quick Property Features (Egyptian & Universal terms) */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>أزرار المميزات السريعة (اضغط لتضمينها بالنص):</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROPERTY_FEATURES.map((feat) => {
                const isSelected = selectedFeatures.includes(feat.label);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.label)}
                    className={`py-1 px-2.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {feat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Customizable Outro & Closing */}
          <div className="space-y-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-300 block">خاتمة الإعلان ودعوة للتواصل (Closing & CTA):</span>
            
            {/* Quick Outro Presets */}
            <div className="flex flex-wrap gap-1.5">
              {OUTRO_PRESETS.map((outro) => {
                const isCurrent = closingText === outro.label;
                return (
                  <button
                    key={outro.id}
                    onClick={() => setClosingText(isCurrent ? '' : outro.label)}
                    className={`py-1 px-2.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isCurrent ? '✓ ' : ''}
                    {outro.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Outro Input */}
            <input
              type="text"
              value={closingText}
              onChange={(e) => setClosingText(e.target.value)}
              placeholder="اكتب خاتمة مخصصة أو اختر من الأزرار أعلاه..."
              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-slate-500 font-medium"
            />
          </div>

          {/* 5. Platform Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
            {[
              { id: 'tiktok', label: 'كابشن تيك توك', icon: Video },
              { id: 'instagram', label: 'إنستغرام وفيسبوك', icon: Camera },
              { id: 'whatsapp', label: 'رسالة واتساب', icon: MessageCircle },
              { id: 'hashtags', label: 'الهاشتاقات فقط', icon: Hash }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-950 font-black shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* 6. Live Editable Textarea with Controls */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>يمكنك الكتابة والتعديل بحرية داخل الصندوق قبل النسخ:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetToAuto}
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-300 hover:text-white bg-slate-800 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                  title="استعادة النص المولد تلقائياً"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة توليد</span>
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-rose-400 bg-slate-800 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                  title="تفريغ النص بالكامل"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>تفريغ</span>
                </button>
              </div>
            </div>

            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={7}
              placeholder="اكتب أو عدل النص هنا بحرية..."
              className="w-full p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed outline-none resize-none focus:border-slate-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          {activeTab === 'whatsapp' ? (
            <a
              href={whatsAppDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>فتح دردشة واتساب مباشرة</span>
            </a>
          ) : (
            <button
              onClick={() => handleCopy(copies.hashtags, 'hashtags_only')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-bold text-[11px] border border-slate-700 transition-all cursor-pointer"
            >
              {copiedTab === 'hashtags_only' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  <span className="text-emerald-400">تم نسخ الهاشتاقات!</span>
                </>
              ) : (
                <>
                  <Hash className="w-3.5 h-3.5" />
                  <span>نسخ الهاشتاقات فقط</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => handleCopy(customText, 'main_copy')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-black text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            {copiedTab === 'main_copy' ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">تم النسخ للحافظة بنجاح!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ النص للحافظة (Copy)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
