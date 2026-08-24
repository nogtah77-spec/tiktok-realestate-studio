import React, { useState } from 'react';
import { X, Cloud, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { getSupabaseConfig, saveSupabaseConfig, testSupabaseConnection } from '../utils/supabaseClient';

export default function SupabaseModal({ isOpen, onClose, activeThemeObj }) {
  const [url, setUrl] = useState(() => getSupabaseConfig().url);
  const [anonKey, setAnonKey] = useState(() => getSupabaseConfig().anonKey);
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, message: string }

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div
        className="border rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col transition-colors duration-200"
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
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{
                backgroundColor: theme.bgCard,
                borderColor: theme.borderSubtle,
                color: theme.accent
              }}
            >
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-normal mb-1">إعدادات سحابة Supabase</h2>
              <p className="text-xs leading-relaxed opacity-75" style={{ color: theme.textMuted }}>مزامنة الخطوط المخصصة والنماذج سحابياً</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors cursor-pointer border"
            style={{
              backgroundColor: theme.bgCard,
              borderColor: theme.borderSubtle,
              color: theme.textMuted
            }}
          >
            <X className="w-4 h-4 hover:text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          <p className="leading-relaxed" style={{ color: theme.textMuted }}>
            هذه الخطوة <span className="font-bold text-white">اختيارية</span> تماماً. إذا كنت تريد مشاركة القوالب والخطوط بين أكثر من جهاز، ضع بيانات مشروعك هنا.
          </p>

          <div>
            <label className="block mb-1 font-medium" style={{ color: theme.textMuted }}>Project URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-project.supabase.co"
              className="w-full px-3 py-2 rounded-xl border text-white font-mono outline-none transition-colors"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderSubtle
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" style={{ color: theme.textMuted }}>Anon Public Key:</label>
            <input
              type="password"
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
              className="w-full px-3 py-2 rounded-xl border text-white font-mono outline-none transition-colors"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderSubtle
              }}
            />
          </div>

          {status && (
            <div className={`p-3 rounded-xl flex items-center gap-2 border ${
              status.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {status.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{status.message}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className="px-6 py-4 border-t flex items-center justify-between gap-3 transition-colors duration-200"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.borderSubtle
          }}
        >
          <button
            onClick={handleTest}
            disabled={isTesting}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-xs border transition-all cursor-pointer disabled:opacity-50"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle,
              color: theme.textPrimary
            }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>اختبار الاتصال</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer"
            style={{
              backgroundColor: theme.accent,
              color: theme.bgDark,
              boxShadow: `0 0 12px ${theme.accentGlow}`
            }}
          >
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}
