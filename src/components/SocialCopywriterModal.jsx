import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Send, Sparkles, MessageCircle, Video, Camera, Hash, RotateCcw, Trash2, Tag, Building2, PhoneCall, PenTool, BookmarkCheck } from 'lucide-react';
import { TONES, QUICK_PROPERTY_FEATURES, OUTRO_PRESETS, generateMarketingCopies, getWhatsAppUrl } from '../utils/copyGenerator';

export default function SocialCopywriterModal({
  isOpen,
  onClose,
  fields = [],
  themeId = 'sale-gold',
  activeThemeObj
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

  // Fallback theme colors
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

  const platformTabs = [
    { id: 'tiktok', label: 'كابشن تيك توك', icon: Video, desc: 'مهيأ للانتشار بالفيديو' },
    { id: 'instagram', label: 'إنستغرام وفيسبوك', icon: Camera, desc: 'منسق بالنقاط والرموز' },
    { id: 'whatsapp', label: 'رسالة واتساب', icon: MessageCircle, desc: 'رسالة تعارف وترحيب' },
    { id: 'hashtags', label: 'الهاشتاقات فقط', icon: Hash, desc: 'الأكثر رواجاً بالمنطقة' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 text-xs select-none animate-in fade-in duration-150">
      <div
        className="border rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] transition-colors duration-200"
        style={{
          backgroundColor: theme.bgDark,
          borderColor: theme.border,
          color: theme.textPrimary
        }}
      >
        {/* Modal Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between transition-colors duration-200"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.borderSubtle
          }}
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-inner"
              style={{
                backgroundColor: theme.bgCard,
                color: theme.accent,
                border: `1px solid ${theme.borderSubtle}`
              }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-black text-sm tracking-tight text-white flex items-center gap-2">
                <span>صانع النصوص الإعلانية والكابشن PRO</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold border" style={{ borderColor: theme.borderSubtle, backgroundColor: theme.bgDark, color: theme.accent }}>
                  Smart AI
                </span>
              </h3>
              <p className="text-[11px] font-medium leading-relaxed opacity-80" style={{ color: theme.textMuted }}>
                نصوص دعائية مهيأة للسوشيال ميديا ومنصات الفيديو القصيرة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer border"
            style={{
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
              color: theme.textMuted
            }}
          >
            <X className="w-4 h-4 hover:text-white" />
          </button>
        </div>

        {/* Modal Body with Generous Breathing Room */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 luxury-scrollbar">
          
          {/* SECTION 1: Brand & Contact Info */}
          <div
            className="p-4 rounded-2xl border space-y-3 transition-colors duration-200"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderSubtle
            }}
          >
            <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: theme.borderSubtle }}>
              <Building2 className="w-4 h-4 opacity-80" style={{ color: theme.accent }} />
              <span className="font-extrabold text-[11px] text-white">بيانات البراند ووسيلة الاتصال</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <span className="text-[11px] block font-bold" style={{ color: theme.textMuted }}>
                  اسم الشركة / البراند:
                </span>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border text-xs text-white outline-none font-bold transition-all focus:ring-1"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle
                  }}
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] block font-bold" style={{ color: theme.textMuted }}>
                  رقم الموبايل / الواتساب:
                </span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full px-3.5 py-2 rounded-xl border text-xs text-white outline-none font-mono font-bold transition-all focus:ring-1"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle
                  }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Tone Selector Cards */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-white flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 opacity-80" style={{ color: theme.accent }} />
                <span>نبرة الخطاب التسويقي (اختر النمط المناسب):</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TONES.map((t) => {
                const isSelected = selectedTone === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTone(t.id)}
                    className="p-3 rounded-2xl border text-center transition-all cursor-pointer shadow-sm flex flex-col items-center justify-center gap-1 hover:scale-[1.02] active:scale-98"
                    style={{
                      backgroundColor: isSelected ? theme.accent : theme.bgSurface,
                      color: isSelected ? theme.bgDark : theme.textPrimary,
                      borderColor: isSelected ? theme.accent : theme.borderSubtle,
                      boxShadow: isSelected ? `0 0 14px ${theme.accentGlow}` : 'none'
                    }}
                  >
                    <span className="font-black text-xs">{t.label}</span>
                    <span className="text-[9px] opacity-75 line-clamp-1">{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: One-Click Quick Property Features */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-white flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 opacity-80" style={{ color: theme.accent }} />
                <span>المميزات السريعة للعقار (انقر للتضمين المباشر):</span>
              </span>
              <span className="text-[10px] font-mono opacity-70" style={{ color: theme.textMuted }}>
                {selectedFeatures.length} مميزات محددة
              </span>
            </div>

            <div className="flex flex-wrap gap-2 p-3 rounded-2xl border" style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderSubtle }}>
              {QUICK_PROPERTY_FEATURES.map((feat) => {
                const isSelected = selectedFeatures.includes(feat.label);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.label)}
                    className="py-1.5 px-3 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95 shadow-sm"
                    style={{
                      backgroundColor: isSelected ? theme.accent : theme.bgDark,
                      color: isSelected ? theme.bgDark : theme.textMuted,
                      borderColor: isSelected ? theme.accent : theme.borderSubtle
                    }}
                  >
                    <span>{isSelected ? '✓' : '+'}</span>
                    <span>{feat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: Customizable Outro & Closing */}
          <div
            className="p-4 rounded-2xl border space-y-3 transition-colors duration-200"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderSubtle
            }}
          >
            <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: theme.borderSubtle }}>
              <BookmarkCheck className="w-4 h-4 opacity-80" style={{ color: theme.accent }} />
              <span className="font-extrabold text-[11px] text-white">خاتمة الإعلان ودعوة للتواصل (Closing & CTA)</span>
            </div>
            
            {/* Quick Outro Presets */}
            <div className="flex flex-wrap gap-2">
              {OUTRO_PRESETS.map((outro) => {
                const isCurrent = closingText === outro.label;
                return (
                  <button
                    key={outro.id}
                    onClick={() => setClosingText(isCurrent ? '' : outro.label)}
                    className="py-1.5 px-3 rounded-xl text-[11px] font-bold border transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                    style={{
                      backgroundColor: isCurrent ? theme.accent : theme.bgDark,
                      color: isCurrent ? theme.bgDark : theme.textMuted,
                      borderColor: isCurrent ? theme.accent : theme.borderSubtle
                    }}
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
              placeholder="اكتب خاتمة مخصصة إضافية أو اختر من الكبسولات أعلاه..."
              className="w-full px-3.5 py-2 rounded-xl border text-xs text-white outline-none font-medium transition-all"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle
              }}
            />
          </div>

          {/* SECTION 5: Platform Navigation Tabs with Visible Dividers & Clickable Badges */}
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold text-white block">
              اختر صيغة المنصة المطلوبة:
            </span>

            <div
              className="flex items-center p-2 rounded-2xl border select-none shadow-md overflow-x-auto transition-colors duration-200"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderSubtle
              }}
            >
              {platformTabs.map((tab, idx) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <React.Fragment key={tab.id}>
                    {idx > 0 && (
                      <div
                        className="w-[1px] h-6 mx-2 shrink-0 opacity-40"
                        style={{ backgroundColor: theme.border }}
                      />
                    )}
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className="flex-1 flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl font-bold text-[11px] whitespace-nowrap transition-all cursor-pointer hover:scale-[1.02] active:scale-98 border"
                      style={{
                        backgroundColor: isActive ? theme.accent : theme.bgDark,
                        color: isActive ? theme.bgDark : theme.textPrimary,
                        borderColor: isActive ? theme.accent : theme.borderSubtle,
                        boxShadow: isActive ? `0 0 12px ${theme.accentGlow}` : 'none'
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" />
                        <span className="font-extrabold">{tab.label}</span>
                      </div>
                      <span className="text-[9px] opacity-75 hidden sm:block">{tab.desc}</span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* SECTION 6: Live Editable Textarea with Controls & Custom Grab Scrollbar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] px-1" style={{ color: theme.textMuted }}>
              <span className="font-bold text-slate-200">صندوق النص النهائي (يمكنك الكتابة والتعديل مباشرة):</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetToAuto}
                  className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all hover:scale-105 cursor-pointer border"
                  style={{
                    backgroundColor: theme.bgSurface,
                    borderColor: theme.borderSubtle,
                    color: theme.textPrimary
                  }}
                  title="استعادة النص المولد تلقائياً"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة توليد</span>
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all hover:scale-105 cursor-pointer border text-rose-400 hover:text-rose-300"
                  style={{
                    backgroundColor: theme.bgSurface,
                    borderColor: theme.borderSubtle
                  }}
                  title="تفريغ النص بالكامل"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>تفريغ</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={7}
                placeholder="اكتب أو عدل النص هنا بحرية..."
                className="w-full p-4 rounded-2xl border text-xs text-slate-100 font-mono leading-relaxed outline-none resize-none luxury-scrollbar transition-all focus:ring-1"
                style={{
                  backgroundColor: theme.bgSurface,
                  borderColor: theme.borderSubtle
                }}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className="px-6 py-4 border-t flex items-center justify-between gap-3 transition-colors duration-200"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.borderSubtle
          }}
        >
          {activeTab === 'whatsapp' ? (
            <a
              href={whatsAppDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>فتح دردشة واتساب مباشرة</span>
            </a>
          ) : (
            <button
              onClick={() => handleCopy(copies.hashtags, 'hashtags_only')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs border transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle,
                color: theme.textPrimary
              }}
            >
              {copiedTab === 'hashtags_only' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  <span className="text-emerald-400">تم نسخ الهاشتاقات!</span>
                </>
              ) : (
                <>
                  <Hash className="w-4 h-4" />
                  <span>نسخ الهاشتاقات فقط</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => handleCopy(customText, 'main_copy')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: theme.accent,
              color: theme.bgDark,
              boxShadow: `0 0 14px ${theme.accentGlow}`
            }}
          >
            {copiedTab === 'main_copy' ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>تم النسخ للحافظة بنجاح!</span>
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
