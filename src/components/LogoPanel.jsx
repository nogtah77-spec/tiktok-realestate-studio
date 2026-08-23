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
    <div className="space-y-4 text-xs">
      {/* 1. Toggle */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
        <div className="font-extrabold text-slate-100 flex items-center gap-2 text-xs">
          <Shield className="w-4 h-4 text-slate-300" />
          <span>شعار البراند</span>
        </div>

        <button
          onClick={() => setShowLogo(!showLogo)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            showLogo
              ? 'border-white bg-slate-800 text-white shadow-sm'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
          }`}
        >
          {showLogo ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>ظاهر</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>مخفي</span>
            </>
          )}
        </button>
      </div>

      {showLogo && (
        <>
          {/* 2. Upload */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800">
              <span className="font-extrabold text-slate-200 text-xs">صورة الشعار:</span>
              {logoUrl && (
                <button
                  onClick={() => onLogoChange('')}
                  className="text-[11px] text-rose-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>استعادة شعار العمودي</span>
                </button>
              )}
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-700 hover:border-slate-500 rounded-xl bg-slate-950/60 hover:bg-slate-950 transition-all cursor-pointer text-center"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/png,image/svg+xml,image/webp"
                className="hidden"
              />
              <Upload className="w-4 h-4 text-slate-300 mb-1.5" />
              <p className="font-bold text-slate-200 text-xs">رفع شعار مفرغ بدقة عالية (PNG / SVG)</p>
            </div>
          </div>

          {/* 3. Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5">
            <div>
              <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">موقع الشعار على الغلاف:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'top-right', label: 'أعلى اليمين' },
                  { id: 'top-left', label: 'أعلى اليسار' },
                  { id: 'top-center', label: 'أعلى الوسط' },
                  { id: 'bottom-left', label: 'أسفل اليسار' }
                ].map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setLogoPosition(pos.id)}
                    className={`py-2 px-1.5 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer ${
                      logoPosition === pos.id
                        ? 'border-white bg-slate-800 text-white font-bold shadow'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <div>
                <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
                  <span className="font-medium">الحجم</span>
                  <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                    {logoScale}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="180"
                  value={logoScale}
                  onChange={(e) => setLogoScale(Number(e.target.value))}
                  className="luxury-slider mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-slate-300 mb-1 text-[11px]">
                  <span className="font-medium">الشفافية</span>
                  <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-950 border border-slate-800 text-white">
                    {logoOpacity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={logoOpacity}
                  onChange={(e) => setLogoOpacity(Number(e.target.value))}
                  className="luxury-slider mt-1"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
