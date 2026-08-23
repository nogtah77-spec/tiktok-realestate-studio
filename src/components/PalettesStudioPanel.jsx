import React from 'react';
import { Palette, Check, Sparkles, Smartphone, Eye, Monitor } from 'lucide-react';
import { MASTER_PALETTES } from '../utils/themeEngine';

export default function PalettesStudioPanel({
  activePlatformThemeId,
  onSelectPlatformTheme,
  onApplyToCard
}) {
  return (
    <div className="space-y-4 text-xs select-none">
      {/* Header Info */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-100 text-sm">استوديو اللوحات اللونية الاحترافية</h3>
              <p className="text-[10px] text-slate-400">8 أنظمة لونية ملكية بدرجات 50-950 لتخصيص واجهة المنصة وقوالب الأغلفة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 8 Master Palettes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {MASTER_PALETTES.map((palette) => {
          const isPlatformActive = activePlatformThemeId === palette.id;

          return (
            <div
              key={palette.id}
              className={`p-3.5 rounded-2xl border transition-all space-y-3 ${
                isPlatformActive
                  ? 'border-amber-400 bg-slate-900/95 ring-1 ring-amber-400/40 shadow-xl'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
              }`}
            >
              {/* Card Header: Num, Icon, Name, Vibe */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-black text-amber-400 text-xs shadow-inner">
                    {palette.num}
                  </span>
                  <span className="text-base">{palette.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-slate-100 text-xs flex items-center gap-1.5">
                      <span>{palette.name}</span>
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">{palette.englishName}</p>
                  </div>
                </div>

                {isPlatformActive && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-[10px] flex items-center gap-1 shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>نشط حالياً</span>
                  </span>
                )}
              </div>

              {/* Vibe Description */}
              <p className="text-[10px] text-slate-400 leading-relaxed bg-slate-950/60 p-2 rounded-xl border border-slate-850">
                {palette.vibe}
              </p>

              {/* 5-Column Swatch Progression Bars */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono px-0.5">
                  <span>50 (فاتح)</span>
                  <span>400 (وسط)</span>
                  <span>600 (تفاعل)</span>
                  <span>950 (عميق)</span>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {palette.swatches.map((swatch, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="h-7 rounded-lg overflow-hidden flex flex-col border border-white/10 shadow-sm">
                        <div className="flex-1" style={{ backgroundColor: swatch.hex50 }} />
                        <div className="flex-1" style={{ backgroundColor: swatch.hex400 }} />
                        <div className="flex-1" style={{ backgroundColor: swatch.hex600 }} />
                        <div className="flex-1" style={{ backgroundColor: swatch.hex950 }} />
                      </div>
                      <span className="text-[8px] text-slate-400 text-center block truncate font-medium">
                        {swatch.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-850">
                <button
                  onClick={() => onSelectPlatformTheme(palette.id)}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all active:scale-95 cursor-pointer ${
                    isPlatformActive
                      ? 'border-amber-400 bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title="تغيير ثيم وهوية المنصة بالكامل إلى هذه اللوحة"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>ثيم المنصة</span>
                </button>

                <button
                  onClick={() => onApplyToCard(palette)}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-[11px] font-bold transition-all active:scale-95 cursor-pointer"
                  title="تطبيق ألوان هذه اللوحة على كرت غلاف تيك توك"
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>تطبيق على الغلاف</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
