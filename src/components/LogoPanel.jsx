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
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black shadow-inner">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-black text-slate-100 text-xs">شعار وهوية البراند</h4>
            <p className="text-[10px] text-slate-400">إظهار أو إخفاء الشعار على الغلاف</p>
          </div>
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
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black shadow-inner">
                  <Upload className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-black text-slate-100 text-xs">رفع واستبدال الشعار</h4>
                  <p className="text-[10px] text-slate-400">يدعم الشعار المفرغ الشفاف بدقة عالية</p>
                </div>
              </div>
              {logoUrl && (
                <button
                  onClick={() => onLogoChange('')}
                  className="text-[10px] text-rose-300 hover:text-white bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 flex items-center gap-1 cursor-pointer font-bold transition-colors"
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
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center font-black shadow-inner">
                  <Sliders className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-black text-slate-100 text-xs">موقع وحجم وشفافية الشعار</h4>
                  <p className="text-[10px] text-slate-400">ضبط إحداثيات ومقياس الشعار على الكانفاس</p>
                </div>
              </div>
              <span className="text-[9px] font-extrabold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full border border-purple-400/20">
                POSITION
              </span>
            </div>

            <div>
              <span className="text-[10.5px] text-slate-400 block mb-1 font-medium">موقع الشعار على الغلاف:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { id: 'top-right', label: 'أعلى اليمين' },
                  { id: 'top-left', label: 'أعلى اليسار' },
                  { id: 'top-center', label: 'أعلى الوسط' },
                  { id: 'bottom-left', label: 'أسفل اليسار' }
                ].map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setLogoPosition(pos.id)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-medium border text-center transition-all cursor-pointer ${
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
