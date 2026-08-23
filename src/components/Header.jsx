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
    <header className="h-14 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-3 sm:px-5">
      {/* Brand Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-amber-500/20">
          ع
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">العمودي للعقارات</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
            STUDIO
          </span>
        </div>
      </div>

      {/* Center Presets Dropdown */}
      <div className="hidden md:flex items-center gap-2">
        <select
          value={activePresetId}
          onChange={(e) => {
            const found = presets.find(p => p.id === e.target.value);
            if (found) onSelectPreset(found);
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-750 text-xs font-semibold text-slate-200 outline-none hover:border-amber-500/50 cursor-pointer"
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
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-400 text-xs text-white outline-none w-32"
              autoFocus
            />
            <button type="submit" className="px-2 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
              حفظ
            </button>
            <button type="button" onClick={() => setIsSaving(false)} className="text-slate-400 text-xs px-1">
              إلغاء
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsSaving(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-xs font-medium text-slate-300 transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-amber-400" />
            <span>حفظ كنموذج</span>
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCopywriterModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs transition-all active:scale-95"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>مولد نصوص</span>
        </button>

        <button
          onClick={onResetToDefault}
          className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="إعادة ضبط"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenSupabaseModal}
          className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="سحابة Supabase"
        >
          <Database className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
