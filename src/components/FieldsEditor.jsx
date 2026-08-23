import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Palette } from 'lucide-react';
import { BUILTIN_FONTS } from '../utils/constants';

export default function FieldsEditor({
  fields = [],
  onFieldsChange,
  customFonts = []
}) {
  const allFonts = [...BUILTIN_FONTS, ...customFonts];

  const handleAddField = () => {
    const newField = {
      id: 'field_' + Date.now(),
      text: 'ميزة جديدة أو تفاصيل إضافية',
      fontId: 'Alexandria',
      fontSize: 20,
      fontWeight: '600',
      color: '#ffffff',
      icon: '✨',
      highlight: false,
      highlightColor: '#d4af37'
    };
    onFieldsChange([...fields, newField]);
  };

  const handleUpdateField = (id, updates) => {
    onFieldsChange(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleRemoveField = (id) => {
    if (fields.length <= 1) return;
    onFieldsChange(fields.filter(f => f.id !== id));
  };

  const handleMove = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= fields.length) return;
    const copy = [...fields];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    onFieldsChange(copy);
  };

  const quickIcons = ['✨', '📍', '📐', '🏷️', '🔑', '🛋️', '👑', '🏊‍♂️', '🚗', '💎', '🏢', '🌿'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-200">خانات ونصوص الغلاف (حرية مطلقة بدون قيود)</h3>
          <p className="text-[11px] text-slate-400">تحكم بكل سطر: النص، الخط الخاص به، الحجم، والسماكة واللون</p>
        </div>
        <button
          onClick={handleAddField}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>إضافة خانة جديدة</span>
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3 text-xs"
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-amber-400 flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-200">الخانة رقم {idx + 1}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleMove(idx, -1)}
                  disabled={idx === 0}
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="تحريك لأعلى"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, 1)}
                  disabled={idx === fields.length - 1}
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="تحريك لأسفل"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                {fields.length > 1 && (
                  <button
                    onClick={() => handleRemoveField(field.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer transition-colors"
                    title="حذف هذه الخانة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                value={field.text}
                onChange={(e) => handleUpdateField(field.id, { text: e.target.value })}
                placeholder="اكتب ما تريده هنا بدون قيود..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white font-medium outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">خط هذا السطر:</label>
                <select
                  value={field.fontId || 'Alexandria'}
                  onChange={(e) => handleUpdateField(field.id, { fontId: e.target.value })}
                  className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-amber-400 cursor-pointer"
                >
                  {allFonts.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>حجم الخط</span>
                  <span className="text-amber-400 font-mono">{field.fontSize || 20}px</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="38"
                  value={field.fontSize || 20}
                  onChange={(e) => handleUpdateField(field.id, { fontSize: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">سماكة الخط:</label>
                <select
                  value={field.fontWeight || '600'}
                  onChange={(e) => handleUpdateField(field.id, { fontWeight: e.target.value })}
                  className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="300">خفيف (Light 300)</option>
                  <option value="400">عادي (Regular 400)</option>
                  <option value="600">متوسط (Medium 600)</option>
                  <option value="700">عريض (Bold 700)</option>
                  <option value="800">سميك جداً (ExtraBold 800)</option>
                  <option value="900">أسود بولد (Black 900)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60 flex-wrap">
              <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                <Palette className="w-3 h-3 text-slate-400" />
                <span>لون النص:</span>
                <input
                  type="color"
                  value={field.color || '#ffffff'}
                  onChange={(e) => handleUpdateField(field.id, { color: e.target.value })}
                  className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
                />
              </label>

              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400">الأيقونة:</span>
                <input
                  type="text"
                  value={field.icon || ''}
                  onChange={(e) => handleUpdateField(field.id, { icon: e.target.value })}
                  className="w-9 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-center text-xs text-white outline-none"
                  placeholder="—"
                />
                <div className="flex items-center gap-1 pr-1">
                  {quickIcons.slice(0, 5).map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => handleUpdateField(field.id, { icon: ic })}
                      className="hover:scale-125 transition-transform text-xs cursor-pointer"
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-1.5 text-[11px] text-slate-300 mr-auto cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.highlight || false}
                  onChange={(e) => handleUpdateField(field.id, { highlight: e.target.checked })}
                  className="rounded accent-amber-500 cursor-pointer"
                />
                <span>نقطة تمييز مضيئة</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
