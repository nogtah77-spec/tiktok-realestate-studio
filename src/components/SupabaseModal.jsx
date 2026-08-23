import React, { useState } from 'react';
import { X, Cloud, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { getSupabaseConfig, saveSupabaseConfig, testSupabaseConnection } from '../utils/supabaseClient';

export default function SupabaseModal({ isOpen, onClose }) {
  const [url, setUrl] = useState(() => getSupabaseConfig().url);
  const [anonKey, setAnonKey] = useState(() => getSupabaseConfig().anonKey);
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, message: string }

  if (!isOpen) return null;

  const handleSave = () => {
    saveSupabaseConfig({ url: url.trim(), anonKey: anonKey.trim() });
    alert('تم حفظ إعدادات Supabase بنجاح!');
    onClose();
  };

  const handleTest = async () => {
    if (!url.trim() || !anonKey.trim()) {
      setStatus({ success: false, message: 'يرجى إدخال الرابط والمفتاح أولاً' });
      return;
    }
    setIsTesting(true);
    setStatus(null);
    const res = await testSupabaseConnection(url.trim(), anonKey.trim());
    setStatus(res);
    setIsTesting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white m-0 p-0">إعدادات سحابة Supabase</h2>
              <p className="text-xs text-slate-400 m-0 p-0">مزامنة الخطوط المخصصة والنماذج سحابياً بين أجهزتك</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <p className="text-slate-300 leading-relaxed">
            هذه الخطوة <span className="text-amber-400 font-bold">اختيارية</span> تماماً. إذا كنت تريد مشاركة القوالب والخطوط بين أكثر من جهاز أو مع فريق عملك، ضع بيانات مشروعك في Supabase هنا.
          </p>

          <div>
            <label className="text-slate-400 block mb-1 font-medium">Project URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-project.supabase.co"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-medium">Anon Public Key:</label>
            <input
              type="password"
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono outline-none focus:border-emerald-400"
            />
          </div>

          {status && (
            <div className={`p-3 rounded-xl flex items-center gap-2 ${
              status.success ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}>
              {status.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{status.message}</span>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3">
          <button
            onClick={handleTest}
            disabled={isTesting}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-medium text-xs border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>اختبار الاتصال</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}
