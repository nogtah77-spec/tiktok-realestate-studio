import React from 'react';
import { Palette, Check, Smartphone, Monitor } from 'lucide-react';
import { MASTER_PALETTES } from '../utils/themeEngine';

export default function PalettesStudioPanel({
  activePlatformThemeId,
  onSelectPlatformTheme,
  onApplyToCard
}) {
  return (
    <div className="space-y-3 text-xs select-none">
      {/* Header (Clean & Minimal) */}
      <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
            <Palette className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-extrabold text-slate-100 text-xs">استوديو اللوحات اللونية الاحترافية</h3>
        </div>
      </div>

      {/* 8 Compact Theme Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {MASTER_PALETTES.map((palette) => {
          const isPlatformActive = activePlatformThemeId === palette.id;

          return (
            <div
              key={palette.id}
              className={`p-3 rounded-2xl border transition-all space-y-2.5 ${
                isPlatformActive
                  ? 'border-amber-400 bg-slate-900 ring-1 ring-amber-400/40 shadow-lg'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
              }`}
            >
              {/* Header: Number, Icon, Title, and Color Dots Preview */}
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-black text-amber-400 text-[10px]">
                    {palette.num}
                  </span>
                  <span className="text-sm">{palette.icon}</span>
                  <span className="font-bold text-slate-100 text-xs">{palette.name}</span>
                </div>

                {/* 3 Accent Color Dots */}
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: palette.accent }} />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: palette.bgSurface }} />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: palette.textPrimary }} />
                </div>
              </div>

              {/* Two Compact Action Buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-800">
                <button
                  onClick={() => onSelectPlatformTheme(palette.id)}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[10px] font-bold border transition-all active:scale-95 cursor-pointer ${
                    isPlatformActive
                      ? 'border-amber-400 bg-amber-500 text-slate-950 font-black shadow'
                      : 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                  <span>{isPlatformActive ? 'ثيم المنصة (نشط)' : 'ثيم المنصة'}</span>
                </button>

                <button
                  onClick={() => onApplyToCard(palette)}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-[10px] font-bold transition-all active:scale-95 cursor-pointer"
                >
                  <Smartphone className="w-3 h-3 text-amber-400" />
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
