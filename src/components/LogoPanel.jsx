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
  setLogoOpacity,
  activeThemeObj
}) {
  const fileInputRef = useRef(null);

  const theme = activeThemeObj || {
    bgDark: '#0f172a',
    bgSurface: '#1e293b',
    bgCard: '#1e293b',
    border: 'rgba(255,255,255,0.2)',
    borderSubtle: 'rgba(255,255,255,0.08)',
    accent: '#ffffff',
    accentGlow: 'rgba(255,255,255,0.3)',
    accentText: '#ffffff',
    badgeBg: 'rgba(255,255,255,0.1)',
    textPrimary: '#ffffff',
    textMuted: '#94a3b8'
  };

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
      <div
        className="p-4 sm:p-5 rounded-2xl border flex items-center justify-between shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderSubtle
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
            style={{
              backgroundColor: theme.bgDark,
              borderColor: theme.borderSubtle,
              color: theme.accent
            }}
          >
            <Shield className="w-4 h-4" />
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>شعار وهوية البراند</h4>
            <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>إظهار أو إخفاء الشعار على الغلاف</p>
          </div>
        </div>

        <button
          onClick={() => setShowLogo(!showLogo)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-sm"
          style={
            showLogo
              ? {
                  backgroundColor: theme.accent,
                  color: theme.bgDark,
                  borderColor: theme.accent,
                  boxShadow: `0 0 10px ${theme.accentGlow}`
                }
              : {
                  backgroundColor: theme.bgDark,
                  borderColor: theme.borderSubtle,
                  color: theme.textMuted
                }
          }
        >
          {showLogo ? (
            <>
              <Eye className="w-4 h-4" />
              <span>ظاهر</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              <span>مخفي</span>
            </>
          )}
        </button>
      </div>

      {showLogo && (
        <>
          {/* 2. Upload */}
          <div
            className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-sm transition-colors duration-200"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderSubtle
            }}
          >
            <div
              className="flex items-center justify-between pb-2.5 border-b"
              style={{ borderColor: theme.borderSubtle }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle,
                    color: theme.accent
                  }}
                >
                  <Upload className="w-4 h-4" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>رفع واستبدال الشعار</h4>
                  <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>يدعم الشعار المفرغ الشفاف بدقة عالية</p>
                </div>
              </div>
              {logoUrl && (
                <button
                  onClick={() => onLogoChange('')}
                  className="text-[10.5px] px-2.5 py-1 rounded-xl border flex items-center gap-1.5 cursor-pointer font-bold transition-colors"
                  style={{
                    backgroundColor: 'rgba(244, 63, 94, 0.1)',
                    borderColor: 'rgba(244, 63, 94, 0.3)',
                    color: '#fda4af'
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>استعادة شعار العمودي</span>
                </button>
              )}
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-4 border border-dashed rounded-xl transition-all cursor-pointer text-center"
              style={{
                backgroundColor: theme.bgDark,
                borderColor: theme.borderSubtle
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/png,image/svg+xml,image/webp"
                className="hidden"
              />
              <Upload className="w-5 h-5 mb-1.5" style={{ color: theme.accent }} />
              <p className="font-bold text-xs leading-normal" style={{ color: theme.textPrimary }}>رفع شعار مفرغ بدقة عالية (PNG / SVG)</p>
            </div>
          </div>

          {/* 3. Controls */}
          <div
            className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-sm transition-colors duration-200"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderSubtle
            }}
          >
            <div
              className="flex items-center justify-between pb-2.5 border-b"
              style={{ borderColor: theme.borderSubtle }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-inner border"
                  style={{
                    backgroundColor: theme.bgDark,
                    borderColor: theme.borderSubtle,
                    color: theme.accent
                  }}
                >
                  <Sliders className="w-4 h-4" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-black text-xs leading-normal mb-1.5" style={{ color: theme.textPrimary }}>موقع وحجم وشفافية الشعار</h4>
                  <p className="text-[10.5px] leading-relaxed" style={{ color: theme.textMuted }}>ضبط إحداثيات ومقياس الشعار على الكانفاس</p>
                </div>
              </div>
              <span
                className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: theme.badgeBg || 'rgba(255,255,255,0.08)',
                  color: theme.accentText || theme.textPrimary,
                  borderColor: theme.border
                }}
              >
                POSITION
              </span>
            </div>

            <div>
              <span className="text-[10.5px] block mb-1.5 font-semibold" style={{ color: theme.textMuted }}>موقع الشعار على الغلاف:</span>
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
                    className="py-2 px-2 rounded-xl text-[10.5px] font-semibold border text-center transition-all cursor-pointer shadow-sm"
                    style={{
                      backgroundColor: logoPosition === pos.id ? theme.bgCard : theme.bgDark,
                      borderColor: logoPosition === pos.id ? theme.accent : theme.borderSubtle,
                      color: logoPosition === pos.id ? theme.textPrimary : theme.textMuted,
                      boxShadow: logoPosition === pos.id ? `0 0 10px ${theme.accentGlow}` : undefined
                    }}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <div>
                <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
                  <span>الحجم</span>
                  <span
                    className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                    style={{
                      backgroundColor: theme.bgDark,
                      borderColor: theme.borderSubtle
                    }}
                  >
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
                <div className="flex justify-between items-center mb-1.5 text-[11px] font-semibold" style={{ color: theme.textMuted }}>
                  <span>الشفافية</span>
                  <span
                    className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border text-white"
                    style={{
                      backgroundColor: theme.bgDark,
                      borderColor: theme.borderSubtle
                    }}
                  >
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
