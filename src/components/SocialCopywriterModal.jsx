import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, Sparkles, MessageCircle, Video, Camera } from 'lucide-react';
import { TONES, generateMarketingCopies, getWhatsAppUrl } from '../utils/copyGenerator';

export default function SocialCopywriterModal({
  isOpen,
  onClose,
  fields = [],
  themeId = 'sale-gold'
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('tiktok'); // 'tiktok', 'instagram', 'whatsapp'
  const [selectedTone, setSelectedTone] = useState('luxury');
  const [phone, setPhone] = useState('0500000000');
  const [agentName, setAgentName] = useState('العمودي للخدمات والوساطة العقارية');
  const [customNotes, setCustomNotes] = useState('');
  const [copiedTab, setCopiedTab] = useState('');

  const copies = generateMarketingCopies({
    fields,
    themeId,
    agentName,
    phone,
    tone: selectedTone,
    customNotes
  });

  const handleCopy = (text, tabName) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(''), 2000);
  };

  const currentText = copies[activeTab] || '';
  const whatsAppDirectUrl = getWhatsAppUrl(phone, copies.whatsapp);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 text-xs select-none animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-100 text-sm">مولد النصوص التسويقية والكابشن</h3>
              <p className="text-[10px] text-slate-400">نصوص منسقة تلقائياً لتيك توك وإنستغرام والواتساب</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1">
          {/* Tone Selector */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 block mb-1">نبرة الخطاب التسويقي:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTone(t.id)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                    selectedTone === t.id
                      ? 'border-amber-400 bg-amber-500/15 text-amber-300 shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Inputs (Agent & Phone) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 block mb-0.5">اسم البراند / الوسيط:</span>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block mb-0.5">رقم هاتف الواتساب:</span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05xxxxxxxx"
                className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* Platform Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
            {[
              { id: 'tiktok', label: 'كابشن تيك توك', icon: Video },
              { id: 'instagram', label: 'إنستغرام وفيسبوك', icon: Camera },
              { id: 'whatsapp', label: 'رسالة واتساب', icon: MessageCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-black shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Textarea Preview */}
          <div className="relative">
            <textarea
              readOnly
              value={currentText}
              rows={8}
              className="w-full p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed outline-none resize-none select-all"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-2">
          {activeTab === 'whatsapp' ? (
            <a
              href={whatsAppDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال مباشر عبر واتساب</span>
            </a>
          ) : (
            <div className="text-[10px] text-slate-500 font-mono">
              {currentText.length} حرف
            </div>
          )}

          <button
            onClick={() => handleCopy(currentText, activeTab)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            {copiedTab === activeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
                <span>تم النسخ بنجاح!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ النص للحافظة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
