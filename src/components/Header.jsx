import React, { useState } from 'react';
import { Sparkles, Save, RotateCcw, Share2, Database } from 'lucide-react';

export default function Header({
  presets = [],
  activePresetId,
  onSelectPreset,
  onSavePreset,
  onResetToDefault,
  onOpenSupabaseModal,
  onOpenCopywriterModal
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [presetName, setPresetName] = useState('');

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (presetName.trim()) {
      onSavePreset(presetName.trim());
      setPresetName('');
      setIsSaving(false);
    }
  };

  return (
    <header className="h-13 bg-slate-950/95 border-b border-slate-850 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-2.5 sm:px-4">
      {/* Brand Title */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
          ع
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-xs sm:text-sm text-white tracking-tight whitespace-nowrap">العمودي للعقارات</span>
          <span className="text-[9px] font-extrabold px-1 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
            PRO
          </span>
        </div>
      </div>

      {/* Center Presets Dropdown */}
      <div className="hidden md:flex items-center gap-1.5">
        <select
          value={activePresetId}
          onChange={(e) => {
            const found = presets.find(p => p.id === e.target.value);
            if (found) onSelectPreset(found);
          }}
          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-200 outline-none hover:border-amber-500/50 cursor-pointer"
        >
          {presets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {isSaving ? (
          <form onSubmit={handleSaveSubmit} className="flex items-center gap-1">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="اسم النموذج..."
              className="px-2 py-0.5 rounded bg-slate-900 border border-amber-400 text-xs text-white outline-none w-28"
              autoFocus
            />
            <button type="submit" className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-xs">
              حفظ
            </button>
            <button type="button" onClick={() => setIsSaving(false)} className="text-slate-400 text-xs px-1">
              ✕
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsSaving(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-slate-300 transition-colors"
          >
            <Save className="w-3 h-3 text-amber-400" />
            <span>حفظ</span>
          </button>
        )}
      </div>

      {/* Action Buttons (Compact & Guaranteed Single Line) */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onOpenCopywriterModal}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-[11px] whitespace-nowrap shrink-0 transition-all active:scale-95 cursor-pointer"
        >
          <Share2 className="w-3 h-3 shrink-0" />
          <span className="whitespace-nowrap">نصوص</span>
        </button>

        <button
          onClick={onResetToDefault}
          className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="إعادة ضبط"
        >
          <RotateCcw className="w-3 h-3" />
        </button>

        <button
          onClick={onOpenSupabaseModal}
          className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="سحابة Supabase"
        >
          <Database className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
}
