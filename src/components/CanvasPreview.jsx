import React, { forwardRef } from 'react';
import { LUXURY_THEMES } from '../utils/constants';
import { ALL_PALETTES } from '../utils/themeEngine';

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
  const activePlatformTheme = ALL_PALETTES.find(p => p.id === activePlatformThemeId) || ALL_PALETTES[0];

  // Image Filter CSS with Cyberpunk options
  let filterCss = 'none';
  if (imageFilter === 'monochrome') filterCss = 'grayscale(100%) contrast(115%) brightness(95%)';
  else if (imageFilter === 'warm') filterCss = 'sepia(30%) saturate(130%) brightness(102%) contrast(105%)';
  else if (imageFilter === 'cool') filterCss = 'hue-rotate(185deg) saturate(90%) contrast(108%)';
  else if (imageFilter === 'vivid') filterCss = 'saturate(145%) contrast(110%) brightness(103%)';
  else if (imageFilter === 'moody') filterCss = 'contrast(125%) brightness(85%) saturate(110%)';
  else if (imageFilter === 'cyber-dark') filterCss = 'contrast(140%) brightness(84%) saturate(145%)';
  else if (imageFilter === 'synthwave-neon') filterCss = 'hue-rotate(280deg) saturate(180%) contrast(125%) brightness(90%)';

  const isGlossy = finish === 'glossy';

  // Card parameters with defaults
  const {
    title = 'شقة للبيع',
    titleFont = 'Lalezar',
    titleSize = 38,
    titleColor = '#ffffff',
    titleOpacity = 100,
    titleShimmer = false,

    showSubtitle = false,
    subtitle = 'المساحة',
    subtitleFont = 'Alexandria',
    subtitleSize = 18,
    subtitleColor = '',
    subtitleOpacity = 90,

    heroNumber = '185',
    heroUnit = 'م²',
    heroFont = 'Lalezar',
    heroNumberSize = 76,
    heroUnitSize = 28,
    heroNumberColor = '#ffffff',
    heroUnitColor = '',
    heroNumberOpacity = 100,
    heroUnitOpacity = 90,
    heroShimmer = false,

    bottomText = 'حي النرجس',
    bottomFont = 'Alexandria',
    bottomSize = 18,
    bottomTextColor = '#ffffff',
    bottomTextOpacity = 100,
    bottomPillStyle = 'pill',

    showDividers = true,
    dividerStyle = 'wireframe-pill',
    dividerTagText = 'VIP',
    dividerOpacity = 100,
    dividerThickness = 1.5,
    dividerGlow = 80,
    dividerWidth = 88,
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
    borderStyle = 'solid',

    // ⚡ Cyber Neon Properties (Default to false unless explicitly enabled)
    neonCyberMode = false,
    showCyberGrid = false,
    neonGradientBorder = false,
    neonTextGlow = false
  } = cardData;

  // ⚡ Resolve active palette if applied to card
  const activeCardPalette = (cardData.activePaletteCardId && ALL_PALETTES.find(p => p.id === cardData.activePaletteCardId)) || null;

  // Is Neon Mode explicitly active on the card? (Only if cardData toggle is on, or real estate theme is neon, or active card palette is neon)
  const isNeonModeActive = Boolean(neonCyberMode) || 
    (activeTheme.id === 'neon-cyber-dual' && borderColorMode === 'theme') ||
    (activeCardPalette?.group === 'neon' && borderColorMode === 'platform');

  // Compute final border color, glow, glass tint, and typography accents based on active theme/palette
  let effectiveBorderColor = activeTheme.borderColor;
  let effectiveGlowColor = activeTheme.borderGlow || activeTheme.borderColor;
  let effectiveGlassBg = activeTheme.glassBg;
  let effectiveAccent = activeTheme.accent;
  let effectiveHeroUnitColor = heroUnitColor || activeTheme.heroUnitColor;
  let effectiveShimmerClass = activeTheme.shimmerClass;

  if (borderColorMode === 'platform') {
    const pal = activeCardPalette || activePlatformTheme;
    if (pal && pal.previewCard) {
      effectiveBorderColor = pal.previewCard.borderColor;
      effectiveGlowColor = pal.previewCard.borderGlow;
      effectiveGlassBg = pal.previewCard.glassBg;
      effectiveAccent = pal.previewCard.accent;
      effectiveHeroUnitColor = heroUnitColor || pal.previewCard.heroUnitColor;
      effectiveShimmerClass = pal.previewCard.shimmerClass;
    }
  } else if (borderColorMode === 'custom' && customBorderColor) {
    effectiveBorderColor = customBorderColor;
    effectiveGlowColor = customGlowColor || customBorderColor;
  }

  const effectiveDividerColor = dividerCustomColor || (borderColorMode === 'platform' ? (activeCardPalette?.previewCard?.borderColor || activePlatformTheme.previewCard.borderColor) : (activeTheme.borderColor || '#d4af37'));
  const effectiveSubtitleColor = subtitleColor || effectiveAccent;

  // Dynamic Glass Tint Calculator with Opacity
  const computeGlassBackground = () => {
    if (isNeonModeActive) {
      return `rgba(5, 7, 20, ${boxOpacity / 100})`;
    }
    const rawGlassBg = effectiveGlassBg || 'rgba(20, 16, 10, 0.62)';
    const match = rawGlassBg.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${boxOpacity / 100})`;
    }
    return rawGlassBg;
  };

  // Logo position
  const getLogoPositionClass = () => {
    switch (logoPosition) {
      case 'top-left': return 'top-5 left-5';
      case 'top-right': return 'top-5 right-5';
      case 'bottom-left': return 'bottom-8 left-5';
      case 'bottom-right': return 'bottom-8 right-5';
      default: return 'top-5 right-5';
    }
  };

  // 100% Highly-Responsive & Authentic Box-Shadow Computation
  const computeBoxShadow = () => {
    const intensity = borderGlowIntensity !== undefined ? Number(borderGlowIntensity) : 75;

    if (isNeonModeActive) {
      if (intensity === 0) {
        return `0 0 0 1.5px rgba(255, 255, 255, 0.7), 0 16px 40px rgba(0, 0, 0, 0.85)`;
      }
      const glowBlur = (intensity / 100) * 35;
      const glowSpread = (intensity / 100) * 8;
      return `0 0 0 1.5px rgba(255, 255, 255, 0.8), 0 0 ${glowBlur}px ${glowSpread}px ${effectiveBorderColor}, 0 0 ${glowBlur * 2.2}px ${effectiveGlowColor}, inset 0 0 ${glowBlur * 0.6}px ${effectiveGlowColor}, 0 16px 40px rgba(0, 0, 0, 0.85)`;
    }

    if (isGlossy) {
      if (intensity === 0) {
        return `0 18px 50px rgba(0, 0, 0, 0.65), inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -1px 2px rgba(0, 0, 0, 0.4)`;
      }
      const glowBlur = (intensity / 100) * 45;
      const glowSpread = (intensity / 100) * 6;
      return `0 18px 50px rgba(0, 0, 0, 0.65), 0 0 ${glowBlur}px ${glowSpread}px ${effectiveGlowColor}, inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -1px 2px rgba(0, 0, 0, 0.4)`;
    }

    if (intensity === 0) {
      return `0 14px 35px rgba(0, 0, 0, 0.5)`;
    }
    const glowBlur = (intensity / 100) * 35;
    const glowSpread = (intensity / 100) * 4;
    return `0 14px 35px rgba(0, 0, 0, 0.5), 0 0 ${glowBlur}px ${glowSpread}px ${effectiveGlowColor}`;
  };

  // 16 Master Architectural, Luxury & Cinematic Dividers Renderer
  const renderDivider = () => {
    if (!showDividers || dividerStyle === 'none') return null;

    const thick = Number(dividerThickness) || 1.5;
    const glow = Number(dividerGlow) !== undefined ? Number(dividerGlow) : 80;
    const widthPct = Number(dividerWidth) || 88;
    const rawOpacity = Number(dividerOpacity) !== undefined ? Number(dividerOpacity) : 100;
    const opacityNorm = Math.min(1, rawOpacity / 100);
    const boostGlow = rawOpacity > 100 ? ((rawOpacity - 100) / 100) * 16 : 0;
    const totalGlow = (glow / 100) * 6 + boostGlow;
    const glowFilter = (totalGlow > 0 || isNeonModeActive)
      ? `drop-shadow(0 0 ${totalGlow + (isNeonModeActive ? 4 : 0)}px ${effectiveGlowColor})`
      : 'none';

    // High-visibility crisp gradient
    const crispGradient = `linear-gradient(to right, transparent 0%, ${effectiveDividerColor} 25%, ${effectiveDividerColor} 75%, transparent 100%)`;
    const rightFadeGradient = `linear-gradient(to right, transparent, ${effectiveDividerColor})`;
    const leftFadeGradient = `linear-gradient(to left, transparent, ${effectiveDividerColor})`;

    const containerProps = {
      className: "w-full flex items-center justify-center my-2 select-none",
      style: {
        width: `${widthPct}%`,
        opacity: opacityNorm,
        filter: glowFilter
      }
    };

    // 🏛️ 1. المسطرة الهندسية وشُرَط القياس
    if (dividerStyle === 'dim-ticks') {
      const tickH = Math.max(5, thick * 3.5);
      return (
        <div {...containerProps}>
          <div className="w-full flex items-center justify-between relative" style={{ height: `${tickH + 2}px` }}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2" style={{ height: `${thick}px`, background: crispGradient }} />
            <div className="z-10" style={{ width: `${Math.max(1, thick)}px`, height: `${tickH * 0.6}px`, backgroundColor: effectiveDividerColor }} />
            <div className="z-10" style={{ width: `${Math.max(1, thick)}px`, height: `${tickH}px`, backgroundColor: effectiveDividerColor }} />
            <div className="z-10 rounded-full" style={{ width: `${Math.max(4, thick * 2.5)}px`, height: `${Math.max(4, thick * 2.5)}px`, backgroundColor: effectiveDividerColor }} />
            <div className="z-10" style={{ width: `${Math.max(1, thick)}px`, height: `${tickH}px`, backgroundColor: effectiveDividerColor }} />
            <div className="z-10" style={{ width: `${Math.max(1, thick)}px`, height: `${tickH * 0.6}px`, backgroundColor: effectiveDividerColor }} />
          </div>
        </div>
      );
    }

    // 🏛️ 2. محور الإحداثيات والكروسهير
    if (dividerStyle === 'crosshair') {
      const chSize = Math.max(12, thick * 8);
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: rightFadeGradient }} />
          <div className="relative flex items-center justify-center mx-2" style={{ width: `${chSize}px`, height: `${chSize}px` }}>
            <div className="rounded-full border" style={{ width: `${chSize * 0.7}px`, height: `${chSize * 0.7}px`, borderColor: effectiveDividerColor, borderWidth: `${Math.max(1, thick * 0.7)}px` }} />
            <div className="absolute" style={{ width: `${chSize}px`, height: `${thick}px`, backgroundColor: effectiveDividerColor }} />
            <div className="absolute" style={{ height: `${chSize}px`, width: `${thick}px`, backgroundColor: effectiveDividerColor }} />
          </div>
          <div className="flex-1" style={{ height: `${thick}px`, background: leftFadeGradient }} />
        </div>
      );
    }

    // 🏛️ 3. الكمرة الهندسية المزدوجة
    if (dividerStyle === 'double-beam') {
      return (
        <div {...containerProps}>
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <div className="w-full" style={{ height: `${thick}px`, background: crispGradient }} />
            <div className="w-1/2" style={{ height: `${Math.max(0.75, thick * 0.65)}px`, background: crispGradient }} />
          </div>
        </div>
      );
    }

    // 🏛️ 4. المثلث المساحي ونقطة الاتزان
    if (dividerStyle === 'surveyor-prism') {
      const triSize = Math.max(5, thick * 3);
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: rightFadeGradient }} />
          <div className="w-0 h-0 mx-2" style={{ borderLeft: `${triSize * 0.7}px solid transparent`, borderRight: `${triSize * 0.7}px solid transparent`, borderTop: `${triSize}px solid ${effectiveDividerColor}` }} />
          <div className="flex-1" style={{ height: `${thick}px`, background: leftFadeGradient }} />
        </div>
      );
    }

    // ✨ 5. الألماس الثلاثي المتدرج
    if (dividerStyle === 'triple-diamond' || dividerStyle === 'diamond') {
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: rightFadeGradient }} />
          <div className="flex items-center gap-1.5 mx-2 font-serif select-none">
            <span style={{ color: effectiveDividerColor, fontSize: `${Math.max(8, thick * 5)}px` }}>◇</span>
            <span style={{ color: effectiveDividerColor, fontSize: `${Math.max(12, thick * 7)}px` }}>◆</span>
            <span style={{ color: effectiveDividerColor, fontSize: `${Math.max(8, thick * 5)}px` }}>◇</span>
          </div>
          <div className="flex-1" style={{ height: `${thick}px`, background: leftFadeGradient }} />
        </div>
      );
    }

    // ✨ 6. الخيط الليزري المتلاشي
    if (dividerStyle === 'radiant-hairline' || dividerStyle === 'line') {
      return (
        <div {...containerProps}>
          <div className="w-full" style={{ height: `${thick}px`, background: crispGradient }} />
        </div>
      );
    }

    // ✨ 7. المصفوفة النقطية السويسرية
    if (dividerStyle === 'dot-matrix') {
      const dotS = Math.max(3, thick * 2);
      const dotL = Math.max(5, thick * 3);
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: rightFadeGradient }} />
          <div className="flex items-center gap-2 mx-2">
            <div className="rotate-45" style={{ width: `${dotS}px`, height: `${dotS}px`, backgroundColor: effectiveDividerColor }} />
            <div className="rotate-45" style={{ width: `${dotL}px`, height: `${dotL}px`, backgroundColor: effectiveDividerColor }} />
            <div className="rotate-45" style={{ width: `${dotS}px`, height: `${dotS}px`, backgroundColor: effectiveDividerColor }} />
          </div>
          <div className="flex-1" style={{ height: `${thick}px`, background: leftFadeGradient }} />
        </div>
      );
    }

    // ✨ 8. القوس المعماري الحديث
    if (dividerStyle === 'modern-arch') {
      const archW = Math.max(24, thick * 16);
      const archH = Math.max(10, thick * 7);
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: rightFadeGradient }} />
          <div className="rounded-t-full mx-2" style={{ width: `${archW}px`, height: `${archH}px`, borderTop: `${Math.max(2, thick * 1.3)}px solid ${effectiveDividerColor}`, borderLeft: `${Math.max(1, thick * 0.7)}px solid ${effectiveDividerColor}`, borderRight: `${Math.max(1, thick * 0.7)}px solid ${effectiveDividerColor}` }} />
          <div className="flex-1" style={{ height: `${thick}px`, background: leftFadeGradient }} />
        </div>
      );
    }

    // 🏷️ 9. الكبسولة الهندسية المفرغة
    if (dividerStyle === 'wireframe-pill' || dividerStyle === 'tag') {
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: rightFadeGradient }} />
          <span
            className="px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-md flex items-center gap-1 mx-2"
            style={{
              background: isNeonModeActive
                ? 'rgba(0,0,0,0.9)'
                : isGlossy
                  ? `${effectiveBorderColor}25`
                  : 'rgba(255,255,255,0.12)',
              border: `${Math.max(1, thick)}px solid ${effectiveDividerColor}`,
              color: '#ffffff'
            }}
          >
            <span>{dividerTagText || 'VIP'}</span>
          </span>
          <div className="flex-1" style={{ height: `${thick}px`, background: leftFadeGradient }} />
        </div>
      );
    }

    // 🏷️ 10. الأقواس التوثيقية والرمز
    if (dividerStyle === 'bracketed-monogram') {
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: rightFadeGradient }} />
          <div className="flex items-center gap-1 font-mono text-[10px] font-black tracking-wider mx-2" style={{ color: effectiveDividerColor }}>
            <span style={{ fontSize: `${Math.max(12, thick * 7)}px` }}>[</span>
            <span className="text-white px-1 font-sans text-[10px] font-extrabold uppercase">{dividerTagText || 'VIP'}</span>
            <span style={{ fontSize: `${Math.max(12, thick * 7)}px` }}>]</span>
          </div>
          <div className="flex-1" style={{ height: `${thick}px`, background: leftFadeGradient }} />
        </div>
      );
    }

    // 🏷️ 11. الخط المشطوف المعماري
    if (dividerStyle === 'beveled-cut') {
      const chamferS = Math.max(10, thick * 6);
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: rightFadeGradient }} />
          <div className="rotate-45 origin-center mx-1.5" style={{ width: `${chamferS}px`, height: `${thick}px`, backgroundColor: effectiveDividerColor }} />
          <div className="flex-1" style={{ height: `${thick}px`, background: leftFadeGradient }} />
        </div>
      );
    }

    // 🏷️ 12. شريط الأضلاع بالنسبة الذهبية
    if (dividerStyle === 'golden-ratio-bars') {
      return (
        <div {...containerProps}>
          <div className="w-full flex items-center justify-center gap-2">
            <div className="flex-1" style={{ height: `${thick}px`, backgroundColor: effectiveDividerColor }} />
            <div className="flex-[1.618]" style={{ height: `${Math.max(2, thick * 1.5)}px`, backgroundColor: effectiveDividerColor }} />
            <div className="flex-1" style={{ height: `${thick}px`, backgroundColor: effectiveDividerColor }} />
          </div>
        </div>
      );
    }

    // 🎬 13. الشريط السينمائي العريض
    if (dividerStyle === 'cinematic-block') {
      return (
        <div {...containerProps}>
          <div className="w-full flex items-center gap-1.5">
            <div className="w-2" style={{ height: `${Math.max(3, thick * 2)}px`, backgroundColor: effectiveDividerColor }} />
            <div className="flex-1" style={{ height: `${Math.max(2, thick * 1.5)}px`, backgroundColor: effectiveDividerColor }} />
            <div className="w-2" style={{ height: `${Math.max(3, thick * 2)}px`, backgroundColor: effectiveDividerColor }} />
          </div>
        </div>
      );
    }

    // 🎬 14. نبض الليزر السايبر المتوهج
    if (dividerStyle === 'cyber-pulse') {
      const nodeS = Math.max(6, thick * 4);
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: `linear-gradient(to right, transparent, ${effectiveDividerColor})` }} />
          <div className="relative flex items-center justify-center mx-2">
            <div className="absolute rounded-full animate-ping opacity-75" style={{ width: `${nodeS * 1.5}px`, height: `${nodeS * 1.5}px`, backgroundColor: effectiveDividerColor }} />
            <div className="rounded-full shadow-lg" style={{ width: `${nodeS}px`, height: `${nodeS}px`, backgroundColor: '#ffffff', border: `1.5px solid ${effectiveDividerColor}` }} />
          </div>
          <div className="flex-1" style={{ height: `${thick}px`, background: `linear-gradient(to left, transparent, ${effectiveDividerColor})` }} />
        </div>
      );
    }

    // 🎬 15. زوايا عدسة المونتاج والكاميرا
    if (dividerStyle === 'corner-brackets') {
      const brSize = Math.max(8, thick * 5);
      return (
        <div {...containerProps}>
          <div className="flex-1" style={{ height: `${thick}px`, background: rightFadeGradient }} />
          <div className="flex items-center gap-1.5 mx-2 font-mono text-[9px] font-black uppercase tracking-wider" style={{ color: effectiveDividerColor }}>
            <span className="font-sans font-bold" style={{ fontSize: `${brSize * 1.4}px`, lineHeight: 0.8 }}>⌜</span>
            <span className="text-white px-1 font-bold">{dividerTagText || 'REC 4K'}</span>
            <span className="font-sans font-bold" style={{ fontSize: `${brSize * 1.4}px`, lineHeight: 0.8 }}>⌟</span>
          </div>
          <div className="flex-1" style={{ height: `${thick}px`, background: leftFadeGradient }} />
        </div>
      );
    }

    // 🎬 16. الخط المصمت المباشر 100%
    if (dividerStyle === 'minimal-solid') {
      return (
        <div {...containerProps}>
          <div className="w-full rounded-full" style={{ height: `${thick}px`, backgroundColor: effectiveDividerColor }} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative flex items-center justify-center select-none bg-transparent gpu-accelerated">
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
          className={`relative w-[340px] h-[604px] overflow-hidden select-none ${
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

          {/* ⚡ 4. 3D Perspective Cyber Grid (Only when explicitly enabled by user) */}
          {showCyberGrid && (
            <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-10 neon-grid-3d opacity-60" />
          )}

          {/* 5. Alignment Grid Lines & Crosshairs */}
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

          {/* 6. Brand Logo Layer */}
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

          {/* 7. Master 3-Tier Luxury Glass Box */}
          <div
            id="tiktok-glass-card-root"
            className="absolute inset-x-0 z-20 flex items-center justify-center pointer-events-none px-3"
            style={{
              top: `${verticalPosition}%`,
              transform: 'translateY(-50%)'
            }}
          >
            <div
              className={`relative flex flex-col items-center justify-center text-center transition-all duration-150 ${
                isNeonModeActive ? 'neon-card-smoked' : ''
              }`}
              style={{
                width: `${boxWidth}%`,
                padding: `${boxPaddingY || 20}px 16px`,
                borderRadius: `${borderRadius}px`,
                backgroundColor: computeGlassBackground(),
                backdropFilter: boxBlur > 0 ? `blur(${boxBlur}px)` : 'none',
                WebkitBackdropFilter: boxBlur > 0 ? `blur(${boxBlur}px)` : 'none',
                border: borderWidth > 0 ? `${borderWidth}px ${borderStyle === 'double' ? 'double' : 'solid'} ${effectiveBorderColor}` : 'none',
                boxShadow: computeBoxShadow()
              }}
            >
              {/* Glossy Sheen Overlay */}
              {isGlossy && !isNeonModeActive && (
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
                  className={`font-extrabold tracking-tight m-0 p-0 leading-tight transition-opacity ${
                    titleShimmer ? effectiveShimmerClass : ''
                  }`}
                  style={{
                    fontFamily: titleFont ? `'${titleFont}', sans-serif` : 'inherit',
                    fontSize: `${titleSize}px`,
                    color: titleShimmer ? 'transparent' : (titleColor || '#ffffff'),
                    opacity: (titleOpacity ?? 100) / 100,
                    textShadow: (neonTextGlow || isNeonModeActive)
                      ? `0 0 2px #ffffff, 0 0 8px ${effectiveBorderColor}, 0 0 20px ${effectiveGlowColor}`
                      : undefined,
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
                    className="font-bold mb-0.5 tracking-wide transition-opacity"
                    style={{
                      fontFamily: subtitleFont ? `'${subtitleFont}', sans-serif` : 'inherit',
                      fontSize: `${subtitleSize}px`,
                      color: effectiveSubtitleColor,
                      opacity: (subtitleOpacity ?? 90) / 100,
                      textShadow: (neonTextGlow || isNeonModeActive) ? `0 0 6px ${effectiveGlowColor}` : undefined,
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
                      className="font-bold tracking-tight select-none transition-opacity"
                      style={{
                        fontFamily: heroFont ? `'${heroFont}', sans-serif` : 'inherit',
                        fontSize: `${heroUnitSize}px`,
                        color: effectiveHeroUnitColor,
                        opacity: (heroUnitOpacity ?? 90) / 100,
                        textShadow: (neonTextGlow || isNeonModeActive) ? `0 0 8px ${effectiveGlowColor}` : undefined,
                        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7))'
                      }}
                    >
                      {heroUnit}
                    </span>
                  )}

                  <span
                    className={`font-black tracking-tight leading-none transition-opacity ${heroShimmer ? effectiveShimmerClass : ''}`}
                    style={{
                      fontFamily: heroFont ? `'${heroFont}', sans-serif` : 'inherit',
                      fontSize: `${heroNumberSize}px`,
                      color: heroShimmer ? 'transparent' : (heroNumberColor || '#ffffff'),
                      opacity: (heroNumberOpacity ?? 100) / 100,
                      textShadow: (neonTextGlow || isNeonModeActive)
                        ? `0 0 2px #ffffff, 0 0 10px ${effectiveBorderColor}, 0 0 26px ${effectiveGlowColor}`
                        : undefined,
                      filter: heroShimmer ? 'none' : 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.9))'
                    }}
                  >
                    {heroNumber}
                  </span>
                </div>
              </div>

              {/* SECTION 3: BOTTOM PILL / LOCATION */}
              {bottomText && (
                <div className="mt-2.5 w-full flex items-center justify-center">
                  {bottomPillStyle === 'text' ? (
                    <span
                      className="font-bold text-center leading-normal transition-all"
                      style={{
                        fontFamily: bottomFont ? `'${bottomFont}', sans-serif` : 'inherit',
                        fontSize: `${bottomSize}px`,
                        color: bottomTextColor || '#ffffff',
                        opacity: (bottomTextOpacity ?? 100) / 100,
                        textShadow: (neonTextGlow || isNeonModeActive) ? `0 0 8px ${effectiveGlowColor}` : '0 2px 8px rgba(0,0,0,0.8)'
                      }}
                    >
                      {bottomText}
                    </span>
                  ) : (
                    <div
                      className="inline-flex items-center justify-center text-center transition-all px-4 py-1"
                      style={{
                        fontFamily: bottomFont ? `'${bottomFont}', sans-serif` : 'inherit',
                        fontSize: `${bottomSize}px`,
                        color: bottomTextColor || '#ffffff',
                        opacity: (bottomTextOpacity ?? 100) / 100,
                        borderRadius: `${Math.max(6, Math.round(borderRadius * 0.45))}px`,
                        background: isNeonModeActive
                          ? 'rgba(0, 229, 255, 0.15)'
                          : isGlossy
                            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.04) 100%)'
                            : 'rgba(255, 255, 255, 0.09)',
                        backgroundColor: isNeonModeActive
                          ? undefined
                          : isGlossy
                            ? `${effectiveBorderColor}18`
                            : 'rgba(255, 255, 255, 0.09)',
                        border: `1px solid ${effectiveBorderColor}${isGlossy ? '90' : '50'}`,
                        boxShadow: isNeonModeActive
                          ? `0 0 12px ${effectiveGlowColor}`
                          : isGlossy
                            ? 'inset 0 1px 1px rgba(255, 255, 255, 0.35), 0 4px 12px rgba(0, 0, 0, 0.25)'
                            : 'none',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        textShadow: (neonTextGlow || isNeonModeActive) ? `0 0 6px ${effectiveGlowColor}` : '0 1px 4px rgba(0,0,0,0.6)'
                      }}
                    >
                      <span className="leading-tight text-center flex items-center justify-center">{bottomText}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 8. Bottom TikTok UI Simulation Indicator */}
          {showGridIndicator && (
            <div className="no-export absolute bottom-3 inset-x-0 flex items-center justify-between px-4 text-[10px] text-white/70 pointer-events-none z-30 font-mono">
              <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                <span>▶</span>
                <span>{gridViewsCount || '1.9K'}</span>
              </div>
              <div className="bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10 text-[9px]">
                9:16 HD
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CanvasPreview;
