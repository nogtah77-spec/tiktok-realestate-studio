import React, { forwardRef } from 'react';
import { LUXURY_THEMES } from '../utils/constants';

const CanvasPreview = forwardRef(({
  // Image props
  imageUrl,
  imageZoom = 100,
  imagePanX = 0,
  imagePanY = 0,
  imageBlur = 0,
  imageFilter = 'none',
  overlayColor = '#000000',
  overlayOpacity = 35,
  hasVignette = true,
  vignetteIntensity = 50,

  // Theme & Finish
  themeId = 'champagne-gold',
  finish = 'glossy', // 'glossy' or 'matte'

  // Card Content & Typography
  cardData = {},

  // Logo props
  logoUrl,
  logoPosition = 'top-right',
  logoScale = 100,
  logoOpacity = 100,

  // View settings
  isPhoneMockup = true,
  showGridIndicator = true,
  gridViewsCount = '1916'
}, ref) => {
  const activeTheme = LUXURY_THEMES.find(t => t.id === themeId) || LUXURY_THEMES[0];

  // Image Filter CSS
  let filterCss = 'none';
  if (imageFilter === 'monochrome') filterCss = 'grayscale(100%) contrast(115%) brightness(95%)';
  else if (imageFilter === 'warm') filterCss = 'sepia(30%) saturate(130%) brightness(102%) contrast(105%)';
  else if (imageFilter === 'cool') filterCss = 'hue-rotate(185deg) saturate(90%) contrast(108%)';
  else if (imageFilter === 'vivid') filterCss = 'saturate(145%) contrast(110%) brightness(103%)';
  else if (imageFilter === 'moody') filterCss = 'contrast(125%) brightness(85%) saturate(110%)';

  const isGlossy = finish === 'glossy';

  // Card parameters with defaults
  const {
    title = 'شقة للبيع',
    titleFont = 'Alexandria',
    titleSize = 34,
    titleColor = '#ffffff',

    showSubtitle = false,
    subtitle = 'المساحة',
    subtitleFont = 'Alexandria',
    subtitleSize = 18,
    subtitleColor = activeTheme.accent,

    heroNumber = '185',
    heroUnit = 'م²',
    heroFont = 'Alexandria',
    heroNumberSize = 68,
    heroUnitSize = 26,
    heroNumberColor = '#ffffff',
    heroUnitColor = activeTheme.heroUnitColor,

    bottomText = 'حي النرجس',
    bottomFont = 'Alexandria',
    bottomSize = 18,
    bottomTextColor = '#ffffff',
    bottomPillStyle = 'pill',

    showDividers = true,
    dividerOrnament = 'diamond',

    boxWidth = 84,
    boxBlur = 20,
    boxOpacity = 60,
    borderGlowIntensity = 80,
    verticalPosition = 50
  } = cardData;

  // Logo position
  const getLogoPositionClass = () => {
    switch (logoPosition) {
      case 'top-left': return 'top-6 left-6';
      case 'top-center': return 'top-6 left-1/2 -translate-x-1/2';
      case 'bottom-right': return 'bottom-6 right-6';
      case 'bottom-left': return 'bottom-6 left-6';
      default: return 'top-6 right-6';
    }
  };

  return (
    <div className={`relative flex items-center justify-center transition-all ${isPhoneMockup ? 'p-3' : 'p-0'}`}>
      {/* Phone Mockup Frame */}
      <div className={`relative ${isPhoneMockup ? 'rounded-[46px] p-2.5 bg-slate-900 ring-1 ring-slate-700/60 shadow-[0_30px_90px_rgba(0,0,0,0.85)]' : ''}`}>
        
        {/* Phone Dynamic Island */}
        {isPhoneMockup && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end px-2.5 pointer-events-none shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
          </div>
        )}

        {/* 9:16 Canvas Root (Width: 380px x 675px -> Scaled to 1080x1920 on export) */}
        <div
          ref={ref}
          id="tiktok-canvas-target"
          className={`relative w-[380px] h-[675px] sm:w-[410px] sm:h-[728px] overflow-hidden select-none ${
            isPhoneMockup ? 'rounded-[38px]' : 'rounded-2xl'
          } bg-slate-950`}
          style={{ aspectRatio: '9 / 16' }}
        >
          {/* 1. Property Background Image */}
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
              <p className="text-xs font-medium text-slate-400">يرجى رفع صورة العقار</p>
            </div>
          )}

          {/* 2. Color Overlay Layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-200"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity / 100
            }}
          />

          {/* 3. Dark Bottom Vignette */}
          {hasVignette && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                background: `linear-gradient(to top, rgba(0,0,0,${vignetteIntensity / 100}) 0%, rgba(0,0,0,${(vignetteIntensity / 100) * 0.4}) 35%, transparent 100%)`
              }}
            />
          )}

          {/* 4. Brand Logo Layer */}
          <div className={`absolute z-20 pointer-events-none ${getLogoPositionClass()}`}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Brand Logo"
                className="object-contain transition-all drop-shadow-xl"
                style={{
                  height: `${(logoScale / 100) * 44}px`,
                  opacity: logoOpacity / 100
                }}
              />
            ) : (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/75 backdrop-blur-md border border-amber-400/30 shadow-xl text-right"
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

          {/* 5. The Master 3-Tier Luxury Glass Box */}
          <div
            className="absolute inset-x-0 z-20 flex items-center justify-center pointer-events-none px-4"
            style={{
              top: `${verticalPosition}%`,
              transform: 'translateY(-50%)'
            }}
          >
            <div
              className="relative flex flex-col items-center justify-center text-center transition-all duration-150"
              style={{
                width: `${boxWidth}%`,
                padding: '24px 20px',
                borderRadius: '32px',
                backgroundColor: activeTheme.glassBg.replace('0.55', (boxOpacity / 100).toString()),
                backdropFilter: `blur(${boxBlur}px)`,
                WebkitBackdropFilter: `blur(${boxBlur}px)`,
                border: `1.5px solid ${activeTheme.borderColor}`,
                boxShadow: isGlossy
                  ? `0 20px 60px rgba(0, 0, 0, 0.65), 0 0 ${borderGlowIntensity * 0.4}px ${activeTheme.borderGlow}, inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -1px 2px rgba(0, 0, 0, 0.4)`
                  : `0 15px 40px rgba(0, 0, 0, 0.5), 0 0 ${borderGlowIntensity * 0.2}px ${activeTheme.borderGlow}`
              }}
            >
              {/* Glossy Sheen Overlay */}
              {isGlossy && (
                <div
                  className="absolute inset-0 rounded-[32px] pointer-events-none overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 100%)'
                  }}
                />
              )}

              {/* SECTION 1: TOP TITLE */}
              <div className="w-full px-2">
                <h2
                  className="font-extrabold tracking-tight m-0 p-0 leading-tight"
                  style={{
                    fontFamily: titleFont ? `'${titleFont}', sans-serif` : 'inherit',
                    fontSize: `${titleSize}px`,
                    color: titleColor,
                    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))'
                  }}
                >
                  {title}
                </h2>
              </div>

              {/* DIVIDER 1: Luxury Diamond Line */}
              {showDividers && (
                <div className="w-full flex items-center justify-center my-3 relative px-4">
                  <div
                    className="flex-1 h-[1px]"
                    style={{
                      background: `linear-gradient(to right, transparent, ${activeTheme.dividerColor})`
                    }}
                  />
                  {dividerOrnament === 'diamond' && (
                    <div
                      className="w-2.5 h-2.5 rotate-45 mx-2.5 shrink-0 shadow-sm"
                      style={{
                        backgroundColor: activeTheme.diamondColor,
                        boxShadow: `0 0 8px ${activeTheme.diamondColor}`
                      }}
                    />
                  )}
                  {dividerOrnament === 'star' && (
                    <span className="mx-2 text-xs" style={{ color: activeTheme.diamondColor }}>✦</span>
                  )}
                  {dividerOrnament === 'dot' && (
                    <div className="w-1.5 h-1.5 rounded-full mx-2" style={{ backgroundColor: activeTheme.diamondColor }} />
                  )}
                  <div
                    className="flex-1 h-[1px]"
                    style={{
                      background: `linear-gradient(to left, transparent, ${activeTheme.dividerColor})`
                    }}
                  />
                </div>
              )}

              {/* SECTION 2: HERO NUMBER & UNIT */}
              <div className="flex flex-col items-center justify-center my-1 w-full">
                {/* Optional Subtitle (e.g. "المساحة") */}
                {showSubtitle && subtitle && (
                  <span
                    className="font-bold mb-0.5 tracking-wide"
                    style={{
                      fontFamily: subtitleFont ? `'${subtitleFont}', sans-serif` : 'inherit',
                      fontSize: `${subtitleSize}px`,
                      color: subtitleColor || activeTheme.accent,
                      filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7))'
                    }}
                  >
                    {subtitle}
                  </span>
                )}

                {/* Giant Hero Number with Unit */}
                <div className="flex items-baseline justify-center gap-2 rtl:flex-row ltr:flex-row">
                  {/* Unit (م² / متر) */}
                  {heroUnit && (
                    <span
                      className="font-bold tracking-tight select-none"
                      style={{
                        fontFamily: heroFont ? `'${heroFont}', sans-serif` : 'inherit',
                        fontSize: `${heroUnitSize}px`,
                        color: heroUnitColor || activeTheme.heroUnitColor,
                        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7))'
                      }}
                    >
                      {heroUnit}
                    </span>
                  )}

                  {/* Giant Number */}
                  <span
                    className="font-black tracking-tighter select-none leading-none"
                    style={{
                      fontFamily: heroFont ? `'${heroFont}', sans-serif` : 'inherit',
                      fontSize: `${heroNumberSize}px`,
                      color: heroNumberColor,
                      filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.85))'
                    }}
                  >
                    {heroNumber}
                  </span>
                </div>
              </div>

              {/* DIVIDER 2: Luxury Diamond Line */}
              {showDividers && (
                <div className="w-full flex items-center justify-center my-3 relative px-4">
                  <div
                    className="flex-1 h-[1px]"
                    style={{
                      background: `linear-gradient(to right, transparent, ${activeTheme.dividerColor})`
                    }}
                  />
                  {dividerOrnament === 'diamond' && (
                    <div
                      className="w-2.5 h-2.5 rotate-45 mx-2.5 shrink-0 shadow-sm"
                      style={{
                        backgroundColor: activeTheme.diamondColor,
                        boxShadow: `0 0 8px ${activeTheme.diamondColor}`
                      }}
                    />
                  )}
                  {dividerOrnament === 'star' && (
                    <span className="mx-2 text-xs" style={{ color: activeTheme.diamondColor }}>✦</span>
                  )}
                  {dividerOrnament === 'dot' && (
                    <div className="w-1.5 h-1.5 rounded-full mx-2" style={{ backgroundColor: activeTheme.diamondColor }} />
                  )}
                  <div
                    className="flex-1 h-[1px]"
                    style={{
                      background: `linear-gradient(to left, transparent, ${activeTheme.dividerColor})`
                    }}
                  />
                </div>
              )}

              {/* SECTION 3: BOTTOM CAPSULE PILL OR SUBTITLE */}
              {bottomText && (
                <div className="w-full flex justify-center mt-1">
                  {bottomPillStyle === 'pill' ? (
                    <div
                      className="px-6 py-2 rounded-2xl text-center w-full max-w-[92%] shadow-lg border transition-all"
                      style={{
                        background: activeTheme.pillBg,
                        borderColor: activeTheme.pillBorder,
                        boxShadow: isGlossy
                          ? '0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.5)'
                          : '0 4px 12px rgba(0, 0, 0, 0.35)'
                      }}
                    >
                      <span
                        className="font-bold tracking-tight block truncate"
                        style={{
                          fontFamily: bottomFont ? `'${bottomFont}', sans-serif` : 'inherit',
                          fontSize: `${bottomSize}px`,
                          color: bottomTextColor || activeTheme.pillTextColor,
                          textShadow: '0 2px 6px rgba(0, 0, 0, 0.6)'
                        }}
                      >
                        {bottomText}
                      </span>
                    </div>
                  ) : (
                    <span
                      className="font-bold tracking-tight text-center block truncate"
                      style={{
                        fontFamily: bottomFont ? `'${bottomFont}', sans-serif` : 'inherit',
                        fontSize: `${bottomSize}px`,
                        color: bottomTextColor || '#ffffff',
                        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))'
                      }}
                    >
                      {bottomText}
                    </span>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* 6. Realistic TikTok Grid View Counter Overlay (Bottom Right Thumbnail) */}
          {showGridIndicator && (
            <div className="no-export absolute bottom-4 right-4 z-30 flex items-center gap-1 text-white/90 font-bold text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md drop-shadow">
              <span>{gridViewsCount}</span>
              <span className="text-[10px]">▷</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

export default CanvasPreview;
