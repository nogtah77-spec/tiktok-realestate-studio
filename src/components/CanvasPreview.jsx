import React, { forwardRef } from 'react';
import TikTokSafeZone from './TikTokSafeZone';
import { PROPERTY_THEMES } from '../utils/constants';

const CanvasPreview = forwardRef(({
  imageUrl,
  imageZoom = 100,
  imagePanX = 0,
  imagePanY = 0,
  imageBlur = 0,
  imageFilter = 'none',
  overlayColor = '#000000',
  overlayOpacity = 40,
  hasVignette = true,
  vignetteIntensity = 60,
  layout = 'pills',
  finish = 'glossy',
  themeId = 'sale',
  customThemeBadge,
  cardBlur = 16,
  cardOpacity = 85,
  cardPosition = 'bottom',
  fields = [],
  logoUrl,
  logoPosition = 'top-right',
  logoScale = 100,
  logoOpacity = 100,
  showSafeZone = false,
  safeZoneOpacity = 80,
  isPhoneMockup = true
}, ref) => {
  const activeTheme = PROPERTY_THEMES.find(t => t.id === themeId) || PROPERTY_THEMES[0];
  const badgeLabel = customThemeBadge || activeTheme.badgeText;

  let filterCss = 'none';
  if (imageFilter === 'monochrome') filterCss = 'grayscale(100%) contrast(115%) brightness(95%)';
  else if (imageFilter === 'warm') filterCss = 'sepia(30%) saturate(130%) brightness(102%) contrast(105%)';
  else if (imageFilter === 'cool') filterCss = 'hue-rotate(185deg) saturate(90%) contrast(108%)';
  else if (imageFilter === 'vivid') filterCss = 'saturate(145%) contrast(110%) brightness(103%)';
  else if (imageFilter === 'moody') filterCss = 'contrast(125%) brightness(85%) saturate(110%)';

  const isGlossy = finish === 'glossy';
  const finishCardClass = isGlossy
    ? 'glass-card-glossy border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
    : 'glass-card-matte border border-white/12 shadow-[0_15px_35px_rgba(0,0,0,0.4)]';

  const getLogoPositionClass = () => {
    switch (logoPosition) {
      case 'top-left': return 'top-6 left-6';
      case 'top-center': return 'top-6 left-1/2 -translate-x-1/2';
      case 'bottom-right': return 'bottom-6 right-6';
      case 'bottom-left': return 'bottom-6 left-6';
      default: return 'top-6 right-6';
    }
  };

  const getAlignmentClass = () => {
    if (cardPosition === 'top') return 'justify-start pt-20';
    if (cardPosition === 'center') return 'justify-center';
    return 'justify-end pb-12';
  };

  return (
    <div className={`relative flex items-center justify-center transition-all ${isPhoneMockup ? 'p-4' : 'p-0'}`}>
      <div className={`relative ${isPhoneMockup ? 'rounded-[44px] p-2.5 bg-slate-900 ring-1 ring-slate-700/60 shadow-[0_25px_70px_rgba(0,0,0,0.8)]' : ''}`}>
        
        {isPhoneMockup && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end px-2.5 pointer-events-none shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
          </div>
        )}

        <div
          ref={ref}
          id="tiktok-canvas-target"
          className={`relative w-[380px] h-[675px] sm:w-[410px] sm:h-[728px] overflow-hidden select-none ${
            isPhoneMockup ? 'rounded-[36px]' : 'rounded-2xl'
          } bg-slate-950`}
          style={{ aspectRatio: '9 / 16' }}
        >
          {imageUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-75"
              style={{
                backgroundImage: `url(${imageUrl})`,
                transform: `scale(${imageZoom / 100}) translate(${imagePanX}px, ${imagePanY}px)`,
                filter: `${filterCss} blur(${imageBlur}px)`,
                transformOrigin: 'center center'
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center text-slate-500 gap-2 p-6 text-center">
              <span className="text-4xl">📷</span>
              <p className="text-xs font-medium text-slate-400">يرجى رفع صورة العقار أو اختيار نموذج من لوحة التحكم</p>
            </div>
          )}

          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-200"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity / 100
            }}
          />

          {hasVignette && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                background: `linear-gradient(to top, rgba(0,0,0,${vignetteIntensity / 100}) 0%, rgba(0,0,0,${(vignetteIntensity / 100) * 0.5}) 40%, transparent 100%)`
              }}
            />
          )}

          <div className={`absolute z-20 pointer-events-none ${getLogoPositionClass()}`}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Brand Logo"
                className="object-contain transition-all drop-shadow-lg"
                style={{
                  height: `${(logoScale / 100) * 44}px`,
                  opacity: logoOpacity / 100
                }}
              />
            ) : (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-amber-400/30 shadow-lg text-right"
                style={{ opacity: logoOpacity / 100 }}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center font-black text-slate-950 text-xs shadow-sm">
                  ع
                </div>
                <div>
                  <div className="text-[11px] font-extrabold text-white tracking-wide">العمودي للعقارات</div>
                  <div className="text-[8px] font-medium text-amber-300/90 tracking-wider">AL-AMOUDI REAL ESTATE</div>
                </div>
              </div>
            )}
          </div>

          <div className={`absolute inset-0 z-20 flex flex-col ${getAlignmentClass()} p-5 pointer-events-none`}>
            <div className="mb-3 flex items-center gap-2">
              <div
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-md border ${
                  isGlossy ? 'shadow-[0_4px_14px_rgba(0,0,0,0.4)] ring-1 ring-white/30' : ''
                }`}
                style={{
                  backgroundColor: activeTheme.badgeBg,
                  borderColor: activeTheme.badgeBorder,
                  color: activeTheme.badgeTextCol
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeTheme.badgeTextCol }} />
                <span>{badgeLabel}</span>
              </div>
            </div>

            {layout === 'pills' && (
              <div className="flex flex-col gap-2.5 w-full">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl w-full text-right transition-all ${finishCardClass}`}
                    style={{
                      backgroundColor: `rgba(15, 23, 42, ${cardOpacity / 100})`,
                      backdropFilter: `blur(${cardBlur}px)`,
                      WebkitBackdropFilter: `blur(${cardBlur}px)`
                    }}
                  >
                    {field.icon && <span className="text-base shrink-0 select-none">{field.icon}</span>}
                    <span
                      className="flex-1 truncate tracking-tight"
                      style={{
                        fontFamily: field.fontId ? `'${field.fontId}', sans-serif` : 'inherit',
                        fontSize: `${field.fontSize || 20}px`,
                        fontWeight: field.fontWeight || '600',
                        color: field.color || '#ffffff',
                        textShadow: '0 2px 8px rgba(0,0,0,0.6)'
                      }}
                    >
                      {field.text}
                    </span>
                    {field.highlight && (
                      <span
                        className="w-2 h-2 rounded-full shrink-0 animate-ping"
                        style={{ backgroundColor: field.highlightColor || activeTheme.accentColor }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {layout === 'glass-card' && (
              <div
                className={`p-4 rounded-3xl w-full text-right divide-y divide-white/10 space-y-2.5 ${finishCardClass}`}
                style={{
                  backgroundColor: `rgba(15, 23, 42, ${cardOpacity / 100})`,
                  backdropFilter: `blur(${cardBlur}px)`,
                  WebkitBackdropFilter: `blur(${cardBlur}px)`
                }}
              >
                {fields.map((field, idx) => (
                  <div key={field.id} className={`flex items-center gap-2.5 ${idx > 0 ? 'pt-2.5' : ''}`}>
                    {field.icon && <span className="text-base shrink-0 select-none">{field.icon}</span>}
                    <span
                      className="flex-1 leading-snug tracking-tight"
                      style={{
                        fontFamily: field.fontId ? `'${field.fontId}', sans-serif` : 'inherit',
                        fontSize: `${field.fontSize || 20}px`,
                        fontWeight: field.fontWeight || '600',
                        color: field.color || '#ffffff',
                        textShadow: '0 2px 6px rgba(0,0,0,0.5)'
                      }}
                    >
                      {field.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {layout === 'bento' && (
              <div className="grid grid-cols-2 gap-2 w-full text-right">
                {fields.map((field, idx) => {
                  const isFull = idx === 0 || idx === fields.length - 1;
                  return (
                    <div
                      key={field.id}
                      className={`${isFull ? 'col-span-2' : 'col-span-1'} p-3 rounded-2xl flex items-center gap-2 ${finishCardClass}`}
                      style={{
                        backgroundColor: `rgba(15, 23, 42, ${cardOpacity / 100})`,
                        backdropFilter: `blur(${cardBlur}px)`,
                        WebkitBackdropFilter: `blur(${cardBlur}px)`
                      }}
                    >
                      {field.icon && <span className="text-base shrink-0 select-none">{field.icon}</span>}
                      <span
                        className="truncate flex-1"
                        style={{
                          fontFamily: field.fontId ? `'${field.fontId}', sans-serif` : 'inherit',
                          fontSize: `${(field.fontSize || 20) * (isFull ? 1 : 0.88)}px`,
                          fontWeight: field.fontWeight || '600',
                          color: field.color || '#ffffff',
                          textShadow: '0 2px 6px rgba(0,0,0,0.5)'
                        }}
                      >
                        {field.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {layout === 'minimal-bar' && (
              <div
                className={`p-3.5 rounded-2xl w-full text-right space-y-1.5 border-t-2 ${finishCardClass}`}
                style={{
                  borderTopColor: activeTheme.accentColor,
                  backgroundColor: `rgba(10, 15, 29, ${cardOpacity / 100})`,
                  backdropFilter: `blur(${cardBlur}px)`,
                  WebkitBackdropFilter: `blur(${cardBlur}px)`
                }}
              >
                {fields.map((field) => (
                  <div key={field.id} className="flex items-center gap-2">
                    {field.icon && <span className="text-sm shrink-0">{field.icon}</span>}
                    <span
                      className="truncate flex-1"
                      style={{
                        fontFamily: field.fontId ? `'${field.fontId}', sans-serif` : 'inherit',
                        fontSize: `${field.fontSize || 18}px`,
                        fontWeight: field.fontWeight || '500',
                        color: field.color || '#ffffff'
                      }}
                    >
                      {field.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <TikTokSafeZone opacity={safeZoneOpacity} isVisible={showSafeZone} />
        </div>
      </div>
    </div>
  );
});

export default CanvasPreview;
