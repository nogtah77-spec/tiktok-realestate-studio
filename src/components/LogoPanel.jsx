import React, { useRef } from 'react';
import { Shield, Upload, Trash2, Sliders, Eye, EyeOff } from 'lucide-react';

export default function LogoPanel({
  showLogo,
  setShowLogo,
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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onLogoChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5 text-xs">
      {/* 1. Master Show / Hide Logo Toggle */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-100 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>عرض شعار البراند على الغلاف</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            يمكنك إظهار الشعار في الزاوية أو إخفاؤه تماماً للتركيز على العقار
          </p>
        </div>

        <button
          onClick={() => setShowLogo(!showLogo)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            showLogo
              ? 'border-amber-400 bg-amber-500/20 text-amber-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          {showLogo ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>الشعار ظاهر</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>الشعار مخفي</span>
            </>
          )}
        </button>
      </div>

      {showLogo && (
        <>
          {/* 2. Logo Upload & Default Emblem */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-200">صورة الشعار:</label>
              {logoUrl && (
                <button
                  onClick={() => onLogoChange('')}
                  className="text-[11px] text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>العودة لشعار "العمودي" الافتراضي</span>
                </button>
              )}
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl bg-slate-950/60 hover:bg-slate-950 transition-all cursor-pointer text-center"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/png,image/svg+xml,image/webp"
                className="hidden"
              />
              <Upload className="w-5 h-5 text-amber-400 mb-1" />
              <p className="font-bold text-slate-200">اضغط لرفع شعار شفاف (PNG / SVG)</p>
              <p className="text-[10px] text-slate-400 mt-0.5">يفضل ملف بخلفية شفافة</p>
            </div>
          </div>

          {/* 3. Position & Scale Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>موضع وحجم الشعار</span>
            </label>

            {/* Position buttons */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5">الموقع على الشاشة:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'top-right', label: 'أعلى اليمين (افتراضي)' },
                  { id: 'top-left', label: 'أعلى اليسار' },
                  { id: 'top-center', label: 'أعلى المنتصف' },
                  { id: 'bottom-left', label: 'أسفل اليسار' }
                ].map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setLogoPosition(pos.id)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer ${
                      logoPosition === pos.id
                        ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale Slider */}
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>حجم الشعار (Scale)</span>
                <span className="text-amber-400 font-mono">{logoScale}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="180"
                value={logoScale}
                onChange={(e) => setLogoScale(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Opacity Slider */}
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>شفافية الشعار (Opacity)</span>
                <span className="text-amber-400 font-mono">{logoOpacity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={logoOpacity}
                onChange={(e) => setLogoOpacity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
