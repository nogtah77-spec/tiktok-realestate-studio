import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, Sparkles, MessageCircle, Camera } from 'lucide-react';
import { TONES, generateMarketingCopies, getWhatsAppUrl } from '../utils/copyGenerator';

export default function SocialCopywriterModal({
  isOpen,
  onClose,
  fields = [],
  themeId = 'sale'
}) {
  const [tone, setTone] = useState('luxury');
  const [phone, setPhone] = useState('0501234567');
  const [agentName, setAgentName] = useState('العمودي للخدمات والوساطة العقارية');
  const [customNotes, setCustomNotes] = useState('');
  const [activeTab, setActiveTab] = useState('tiktok'); // 'tiktok', 'instagram', 'whatsapp'
  const [copiedTab, setCopiedTab] = useState('');

  if (!isOpen) return null;

  const copies = generateMarketingCopies({
    fields,
    themeId,
    agentName,
    phone,
    tone,
    customNotes
  });

  const handleCopy = async (text, tabKey) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tabKey);
      setTimeout(() => setCopiedTab(''), 2000);
    } catch (e) {
      alert('حدث خطأ أثناء النسخ');
    }
  };

  const currentCopy = activeTab === 'tiktok' ? copies.tiktok : activeTab === 'instagram' ? copies.instagram : copies.whatsapp;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white m-0 p-0">مولد نصوص وكابشن السوشيال ميديا</h2>
              <p className="text-xs text-slate-400 m-0 p-0">صياغة تسويقية فورية لتيك توك، إنستغرام، ورسائل الواتساب</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Tone of Voice Selector */}
          <div className="space-y-2">
            <label className="font-bold text-slate-200 block">اختر نبرة الصوت التسويقية (Tone of Voice):</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    tone === t.id
                      ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold">{t.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details Config */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">رقم التواصل / الواتساب:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0500000000"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">اسم البراند أو المسوّق:</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="العمودي للخدمات والوساطة العقارية"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Platform Tabs (TikTok, Instagram, WhatsApp) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('tiktok')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  activeTab === 'tiktok'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <span>كابشن تيك توك + هاشتاجات</span>
              </button>

              <button
                onClick={() => setActiveTab('instagram')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  activeTab === 'instagram'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>بوست إنستغرام وفيسبوك</span>
              </button>

              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>رسالة واتساب تسويقية</span>
              </button>
            </div>

            {/* Generated Copy Output Box */}
            <div className="relative p-4 rounded-2xl bg-slate-950 border border-slate-850 font-sans text-xs text-slate-200 leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto select-text">
              {currentCopy}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3">
          {activeTab === 'whatsapp' ? (
            <a
              href={getWhatsAppUrl(phone, copies.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال مباشر عبر واتساب</span>
            </a>
          ) : <div />}

          <button
            onClick={() => handleCopy(currentCopy, activeTab)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            {copiedTab === activeTab ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>تم النسخ بنجاح!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ النص بضغطة زر</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
