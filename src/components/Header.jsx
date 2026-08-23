import React, { useState } from 'react';
import { Sparkles, Bookmark, Cloud, RotateCcw, Plus, Trash2, Check, Download, Share2 } from 'lucide-react';

export default function Header({
  presets = [],
  activePresetId,
  onSelectPreset,
  onSavePreset,
  onDeletePreset,
  onResetToDefault,
  onOpenSupabaseModal,
  onOpenCopywriterModal
}) {
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);

  const handleSave = () => {
    if (!newPresetName.trim()) return;
    onSavePreset(newPresetName.trim());
    setNewPresetName('');
    setShowSaveInput(false);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Title */}
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-300/30">
          <Sparkles className="w-5 h-5 text-slate-950" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base lg:text-lg font-bold tracking-tight text-white m-0 p-0">العمودي للخدمات والوساطة العقارية</h1>
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">Studio PRO</span>
          </div>
          <p className="text-xs text-slate-400 m-0 p-0">استوديو أغلفة تيك توك وتوليد النصوص التسويقية الفاخرة</p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Social Copywriter Quick Button */}
        <button
          onClick={onOpenCopywriterModal}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>توليد نصوص السوشيال ميديا</span>
        </button>

        {/* Presets Manager Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsPresetOpen(!isPresetOpen)}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-750 transition-all cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>النماذج المحفوظة ({presets.length})</span>
          </button>

          {isPresetOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400 font-medium">
                <span>النماذج الجاهزة والمحفوظة</span>
                <button
                  onClick={() => setShowSaveInput(true)}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>حفظ الحالي</span>
                </button>
              </div>

              {showSaveInput && (
                <div className="mb-3 p-2 bg-slate-950/80 rounded-lg border border-amber-500/30 flex gap-1.5">
                  <input
                    type="text"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder="اسم النموذج الجديد..."
                    className="flex-1 bg-transparent text-xs text-white outline-none px-1.5"
                    autoFocus
                  />
                  <button
                    onClick={handleSave}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded cursor-pointer"
                  >
                    حفظ
                  </button>
                </div>
              )}

              <div className="max-h-60 overflow-y-auto space-y-1.5">
                {presets.map((preset) => (
                  <div
                    key={preset.id}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                      activePresetId === preset.id
                        ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200 font-semibold'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-transparent'
                    }`}
                  >
                    <button
                      onClick={() => {
                        onSelectPreset(preset);
                        setIsPresetOpen(false);
                      }}
                      className="flex-1 text-right truncate cursor-pointer pl-2"
                    >
                      {preset.name}
                    </button>
                    {preset.id.startsWith('custom-') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePreset(preset.id);
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                        title="حذف النموذج"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Supabase Cloud Connection */}
        <button
          onClick={onOpenSupabaseModal}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer"
          title="إعدادات السحابة و Supabase"
        >
          <Cloud className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">سحابة Supabase</span>
        </button>

        {/* Reset */}
        <button
          onClick={onResetToDefault}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title="إعادة ضبط القالب الافتراضي"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
