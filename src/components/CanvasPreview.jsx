import React, { forwardRef } from 'react';
import { LUXURY_THEMES } from '../utils/constants';
import { MASTER_PALETTES } from '../utils/themeEngine';

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
  themeId = 'sale-gold',
  finish = 'glossy',
  activePlatformThemeId = 'italian-mocha',

  // Card Content & Controls
  cardData = {},

  // Logo props
  showLogo = true,
  logoUrl = '',
  logoPosition = 'top-right',
  logoScale = 100,
  logoOpacity = 100,

  // View settings
  isPhoneMockup = true,
  showGridLines = false,
  showGridIndicator = true,
  gridViewsCount = '1916'
}, ref) => {
  const activeTheme = LUXURY_THEMES.find(t => t.id === themeId) || LUXURY_THEMES[0];
  const activePlatformTheme = MASTER_PALETTES.find(p => p.id === activePlatformThemeId) || MASTER_PALETTES[1];

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
    titleFont = 'Lalezar',
    titleSize = 38,
    titleColor = '#ffffff',
    titleShimmer = false,

    showSubtitle = false,
    subtitle = 'المساحة',
    subtitleFont = 'Alexandria',
    subtitleSize = 18,
    subtitleColor = '',

    heroNumber = '185',
    heroUnit = 'م²',
    heroFont = 'Lalezar',
    heroNumberSize = 76,
    heroUnitSize = 28,
    heroNumberColor = '#ffffff',
    heroUnitColor = '',
    heroShimmer = false,

    bottomText = 'حي النرجس',
    bottomFont = 'Alexandria',
    bottomSize = 18,
    bottomTextColor = '#ffffff',
    bottomPillStyle = 'pill',

    showDividers = true,
    dividerStyle = 'tag',
    dividerTagText = 'VIP',
    dividerOpacity = 75,
    dividerCustomColor = '',

    boxWidth = 84,
    boxPaddingY = 20,
    boxBlur = 20,
    boxOpacity = 60,
    verticalPosition = 50,

    borderWidth = 1.5,
    borderRadius = 32,
    borderColorMode = 'theme',
    customBorderColor = '#d4af37',
    borderGlowIntensity = 75,
    glowColorMode = 'theme',
    customGlowColor = '#d4af37',
    borderStyle = 'solid'
  } = cardData;

  // Compute final border color & glow based on explicit mode
  let effectiveBorderColor = activeTheme.borderColor;
  let effectiveGlowColor = activeTheme.borderGlow || activeTheme.borderColor;

  if (borderColorMode === 'platform') {
    effectiveBorderColor = activePlatformTheme.previewCard.borderColor;
    effectiveGlowColor = activePlatformTheme.previewCard.borderGlow;
  } else if (borderColorMode === 'custom' && customBorderColor) {
    effectiveBorderColor = customBorderColor;
    effectiveGlowColor = customGlowColor || customBorderColor;
  }

  const effectiveDividerColor = dividerCustomColor || (borderColorMode === 'platform' ? activePlatformTheme.previewCard.borderColor : activeTheme.dividerColor);

  // Logo position
  const getLogoPositionClass = () => {
    switch (logoPosition) {
      case 'top-left': return 'top-5 left-5';
      case 'top-center': return 'top-5 left-1/2 -translate-x-1/2';
      case 'bottom-right': return 'bottom-5 right-5';
      case 'bottom-left': return 'bottom-5 left-5';
      default: return 'top-5 right-5';
    }
  };

  // Render Architectural Divider Component
  const renderDivider = () => {
    if (!showDividers || dividerStyle === 'none') return null;

    if (dividerStyle === 'tag') {
      const tagText = cardData.dividerTagText !== undefined ? cardData.dividerTagText : 'VIP';
      return (
        <div className="w-full flex items-center justify-center my-2 px-4 relative" style={{ opacity: dividerOpacity / 100 }}>
          <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${effectiveDividerColor})` }} />
          {tagText !== '' ? (
            <span
              className="mx-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold border tracking-wider"
              style={{
                borderColor: effectiveDividerColor,
                color: effectiveBorderColor,
                backgroundColor: 'rgba(0,0,0,0.45)'
              }}
            >
              • {tagText} •
            </span>
          ) : (
            <span className="mx-1 text-[8px]" style={{ color: effectiveBorderColor }}>•</span>
          )}
          <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${effectiveDividerColor})` }} />
        </div>
      );
    }

    if (dividerStyle === 'fading') {
      return (
        <div className="w-full flex items-center justify-center my-2 px-4" style={{ opacity: dividerOpacity / 100 }}>
          <div
            className="w-full h-[1px]"
            style={{
              background: `linear-gradient(to right, transparent 0%, ${effectiveDividerColor} 50%, transparent 100%)`
            }}
          />
        </div>
      );
    }

    if (dividerStyle === 'double') {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-1 my-2 px-6" style={{ opacity: dividerOpacity / 100 }}>
          <div className="w-full h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${effectiveDividerColor}, transparent)` }} />
          <div className="w-3/4 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${effectiveDividerColor}, transparent)` }} />
        </div>
      );
    }

    if (dividerStyle === 'beam') {
      return (
        <div className="w-full flex items-center justify-center my-2.5 px-8" style={{ opacity: dividerOpacity / 100 }}>
          <div
            className="w-full h-[2px] rounded-full blur-[0.5px]"
            style={{
              background: `radial-gradient(ellipse at center, ${effectiveBorderColor} 0%, transparent 80%)`,
              boxShadow: `0 0 10px ${effectiveGlowColor}`
            }}
          />
        </div>
      );
    }

    if (dividerStyle === 'micro-sparkle') {
      return (
        <div className="w-full flex items-center justify-center my-2 px-4 relative" style={{ opacity: dividerOpacity / 100 }}>
          <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${effectiveDividerColor})` }} />
          <span className="mx-2 text-[10px] leading-none" style={{ color: activeTheme.diamondColor, filter: `drop-shadow(0 0 4px ${effectiveGlowColor})` }}>
            ✦
          </span>
          <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${effectiveDividerColor})` }} />
        </div>
      );
    }

    if (dividerStyle === 'dotted') {
      return (
        <div className="w-full flex items-center justify-center gap-1.5 my-2" style={{ opacity: dividerOpacity / 100 }}>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: effectiveDividerColor }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: effectiveBorderColor }} />
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: effectiveDividerColor }} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative flex items-center justify-center select-none bg-transparent">
      {/* Phone Frame Container */}
      <div className={`relative ${isPhoneMockup ? 'rounded-[38px] p-2 bg-slate-900/90 ring-1 ring-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.7)]' : ''}`}>
        
        {/* Dynamic Island */}
        {isPhoneMockup && (
          <div className="no-export absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-40 flex items-center justify-end px-2 pointer-events-none shadow-sm">
            <div className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-slate-800" />
          </div>
        )}

        {/* 9:16 Canvas Root */}
        <div
          ref={ref}
          id="tiktok-canvas-target"
          className={`relative w-[340px] h-[604px] sm:w-[380px] sm:h-[675px] overflow-hidden select-none ${
            isPhoneMockup ? 'rounded-[32px]' : 'rounded-2xl'
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
              <span className="text-3xl">📷</span>
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

          {/* 4. Alignment Grid Lines & Crosshairs */}
          {showGridLines && (
            <div className="no-export absolute inset-0 z-30 pointer-events-none border border-cyan-400/20">
              <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-cyan-400/30 border-r border-dashed border-cyan-400/40" />
              <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-cyan-400/30 border-r border-dashed border-cyan-400/40" />
              <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-cyan-400/30 border-b border-dashed border-cyan-400/40" />
              <div className="absolute left-0 right-0 bottom-1/3 h-[1px] bg-cyan-400/30 border-b border-dashed border-cyan-400/40" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-amber-400/35" />
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-amber-400/35" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-amber-400/50" />
            </div>
          )}

          {/* 5. Brand Logo Layer */}
          {showLogo && (
            <div className={`absolute z-20 pointer-events-none ${getLogoPositionClass()}`}>
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Brand Logo"
                  className="object-contain transition-all drop-shadow-xl"
                  style={{
                    height: `${(logoScale / 100) * 40}px`,
                    opacity: logoOpacity / 100
                  }}
                />
              ) : (
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 shadow-lg text-right"
                  style={{ opacity: logoOpacity / 100 }}
                >
                  <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center font-black text-slate-950 text-[10px] shadow-sm">
                    ع
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold text-white leading-tight">العمودي للعقارات</div>
                    <div className="text-[7px] font-bold text-slate-300 tracking-wider">AL-AMOUDI REAL ESTATE</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. Master 3-Tier Luxury Glass Box */}
          <div
            id="tiktok-glass-card-root"
            className="absolute inset-x-0 z-20 flex items-center justify-center pointer-events-none px-3"
            style={{
              top: `${verticalPosition}%`,
              transform: 'translateY(-50%)'
            }}
          >
            <div
              className="relative flex flex-col items-center justify-center text-center transition-all duration-150"
              style={{
                width: `${boxWidth}%`,
                padding: `${boxPaddingY || 20}px 16px`,
                borderRadius: `${borderRadius}px`,
                backgroundColor: activeTheme.glassBg.replace('0.55', (boxOpacity / 100).toString()).replace('0.65', (boxOpacity / 100).toString()).replace('0.62', (boxOpacity / 100).toString()).replace('0.6', (boxOpacity / 100).toString()),
                backdropFilter: boxBlur > 0 ? `blur(${boxBlur}px)` : 'none',
                WebkitBackdropFilter: boxBlur > 0 ? `blur(${boxBlur}px)` : 'none',
                border: borderWidth > 0 ? `${borderWidth}px ${borderStyle === 'double' ? 'double' : 'solid'} ${effectiveBorderColor}` : 'none',
                boxShadow: isGlossy
                  ? `0 18px 50px rgba(0, 0, 0, 0.65), 0 0 ${borderGlowIntensity * 0.4}px ${effectiveGlowColor}, inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -1px 2px rgba(0, 0, 0, 0.4)`
                  : `0 14px 35px rgba(0, 0, 0, 0.5), 0 0 ${borderGlowIntensity * 0.2}px ${effectiveGlowColor}`
              }}
            >
              {/* Glossy Sheen Overlay */}
              {isGlossy && (
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{
                    borderRadius: `${borderRadius}px`,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 100%)'
                  }}
                />
              )}

              {/* SECTION 1: TOP TITLE */}
              <div className="w-full px-1">
                <h2
                  className={`font-extrabold tracking-tight m-0 p-0 leading-tight ${titleShimmer ? activeTheme.shimmerClass : ''}`}
                  style={{
                    fontFamily: titleFont ? `'${titleFont}', sans-serif` : 'inherit',
                    fontSize: `${titleSize}px`,
                    color: titleShimmer ? 'transparent' : (titleColor || '#ffffff'),
                    filter: titleShimmer ? 'none' : 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.85))'
                  }}
                >
                  {title}
                </h2>
              </div>

              {/* DIVIDER 1 */}
              {renderDivider()}

              {/* SECTION 2: HERO NUMBER & UNIT */}
              <div className="flex flex-col items-center justify-center my-0.5 w-full">
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
                <div className="flex items-baseline justify-center gap-1.5 rtl:flex-row ltr:flex-row">
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

                  <span
                    className={`font-black tracking-tighter select-none leading-none ${heroShimmer ? activeTheme.shimmerClass : ''}`}
                    style={{
                      fontFamily: heroFont ? `'${heroFont}', sans-serif` : 'inherit',
                      fontSize: `${heroNumberSize}px`,
                      color: heroShimmer ? 'transparent' : (heroNumberColor || '#ffffff'),
                      filter: heroShimmer ? 'none' : 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.9))'
                    }}
                  >
                    {heroNumber}
                  </span>
                </div>
              </div>

              {/* DIVIDER 2 */}
              {renderDivider()}

              {/* SECTION 3: BOTTOM CAPSULE PILL */}
              {bottomText && (
                <div className="w-full flex justify-center mt-1">
                  {bottomPillStyle === 'pill' ? (
                    <div
                      className="px-5 py-1.5 rounded-xl text-center w-full max-w-[92%] shadow-md border transition-all"
                      style={{
                        background: activeTheme.pillBg,
                        borderColor: activeTheme.pillBorder,
                        boxShadow: isGlossy
                          ? '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5)'
                          : '0 3px 10px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <span
                        className="font-bold tracking-tight block truncate"
                        style={{
                          fontFamily: bottomFont ? `'${bottomFont}', sans-serif` : 'inherit',
                          fontSize: `${bottomSize}px`,
                          color: bottomTextColor || activeTheme.pillTextColor,
                          textShadow: '0 2px 5px rgba(0, 0, 0, 0.6)'
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

          {/* 7. Realistic TikTok Grid View Counter Overlay */}
          {showGridIndicator && (
            <div className="no-export absolute bottom-3.5 right-3.5 z-30 flex items-center gap-1 text-white/90 font-bold text-[11px] bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md drop-shadow">
              <span>{gridViewsCount}</span>
              <span className="text-[9px]">▷</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

export default CanvasPreview;
