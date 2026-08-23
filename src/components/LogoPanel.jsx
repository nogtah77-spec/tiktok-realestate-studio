import React, { useRef } from 'react';
import { Shield, Upload, Eye } from 'lucide-react';

export default function LogoPanel({
  logoUrl,
  onLogoChange,
  logoPosition,
  setLogoPosition,
  logoScale,
  setLogoScale,
  logoOpacity,
  setLogoOpacity
}) {
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onLogoChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const positions = [
    { id: 'top-right', label: 'أعلى اليمين (موصى به)' },
    { id: 'top-left', label: 'أعلى اليسار' },
    { id: 'top-center', label: 'أعلى المنتصف' },
    { id: 'bottom-right', label: 'أسفل اليمين' },
    { id: 'bottom-left', label: 'أسفل اليسار' }
  ];

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>شعار وهوية البراند (شعار العمودي)</span>
          </label>
          <span className="text-[11px] text-slate-400">PNG شفاف أو SVG</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          يمكنك رفع شعار مخصص لشركتك أو استخدام الشعار الملكي الافتراضي لـ "العمودي للخدمات والوساطة العقارية".
        </p>

        <div className="flex items-center gap-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 p-3 border border-dashed border-amber-500/40 hover:border-amber-400 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 transition-all cursor-pointer text-xs font-bold text-amber-300"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/png,image/svg+xml,image/webp"
              className="hidden"
            />
            <Upload className="w-4 h-4" />
            <span>رفع شعار PNG شفاف</span>
          </div>

          {logoUrl && (
            <button
              onClick={() => onLogoChange('')}
              className="px-3 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              استعادة الشعار الافتراضي
            </button>
          )}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4 text-xs">
        <div className="space-y-2">
          <label className="font-bold text-slate-200 block">موقع الشعار على الغلاف:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {positions.map((p) => (
              <button
                key={p.id}
                onClick={() => setLogoPosition(p.id)}
                className={`py-2 px-2.5 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                  logoPosition === p.id
                    ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>حجم الشعار (Scale)</span>
            <span className="text-amber-400 font-mono">{logoScale}%</span>
          </div>
          <input
            type="range"
            min="40"
            max="160"
            value={logoScale}
            onChange={(e) => setLogoScale(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="pt-2 border-t border-slate-800 space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>شفافية الشعار (Opacity)</span>
            <span className="text-amber-400 font-mono">{logoOpacity}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={logoOpacity}
            onChange={(e) => setLogoOpacity(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
