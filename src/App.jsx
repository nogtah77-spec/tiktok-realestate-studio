import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import CanvasPreview from './components/CanvasPreview';
import ImageFXPanel from './components/ImageFXPanel';
import TypographyPanel from './components/TypographyPanel';
import LayoutAndCardsPanel from './components/LayoutAndCardsPanel';
import FieldsEditor from './components/FieldsEditor';
import LogoPanel from './components/LogoPanel';
import ExportControls, { RightActionWing, LeftActionWing } from './components/ExportControls';
import SocialCopywriterModal from './components/SocialCopywriterModal';
import FullscreenPreviewModal from './components/FullscreenPreviewModal';
import SupabaseModal from './components/SupabaseModal';
import { DEFAULT_GLASS_CARD_DATA, SAMPLE_IMAGES, LUXURY_THEMES } from './utils/constants';
import { getAllPresets, saveUserPreset, deleteUserPreset, BUILTIN_PRESETS, saveWorkspaceSession, loadWorkspaceSession, clearWorkspaceSession, syncPresetsFromCloud, fetchCloudWorkspaceSession, subscribeToWorkspaceRealtime } from './utils/presetStorage';
import { loadSavedCustomFonts } from './utils/fontLoader';
import { ALL_PALETTES, getSavedPlatformThemeId, savePlatformThemeId, applyThemeToCSS } from './utils/themeEngine';
import { Image as ImageIcon, Type, LayoutGrid, FileText, Shield, Maximize2, Palette } from 'lucide-react';

export default function App() {
  const canvasRef = useRef(null);
  const fullscreenCanvasRef = useRef(null);
  const isRemoteUpdatingRef = useRef(false);

  // Load initial saved workspace session if available
  const initialSession = loadWorkspaceSession();

  // 1. Navigation & View State
  const [activeTab, setActiveTab] = useState('fields');
  const [presets, setPresets] = useState(getAllPresets);
  const [activePresetId, setActivePresetId] = useState(initialSession?.activePresetId || 'preset-sale-gold');
  const [customFonts, setCustomFonts] = useState([]);
  const [isFullscreenPreviewOpen, setIsFullscreenPreviewOpen] = useState(false);

  // 2. 16 Pro Palettes Theme Engine & 20 Neon Button Styles
  const [activePlatformThemeId, setActivePlatformThemeId] = useState(() => initialSession?.activePlatformThemeId || getSavedPlatformThemeId());
  const [activeCardPaletteId, setActiveCardPaletteId] = useState(initialSession?.activeCardPaletteId || null);
  const [activeNeonButtonStyleId, setActiveNeonButtonStyleId] = useState(() => initialSession?.activeNeonButtonStyleId || 'frame-01');
  const [neonButtonOpacity, setNeonButtonOpacity] = useState(() => initialSession?.neonButtonOpacity ?? 100);
  const activeThemeObj = ALL_PALETTES.find(p => p.id === activePlatformThemeId) || ALL_PALETTES[0];

  // 3. Modals
  const [isCopywriterOpen, setIsCopywriterOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);

  // 4. Image State
  const [imageUrl, setImageUrl] = useState(initialSession?.imageUrl || SAMPLE_IMAGES[0].url);
  const [imageZoom, setImageZoom] = useState(initialSession?.imageZoom ?? 100);
  const [imagePanX, setImagePanX] = useState(initialSession?.imagePanX ?? 0);
  const [imagePanY, setImagePanY] = useState(initialSession?.imagePanY ?? 0);
  const [imageBlur, setImageBlur] = useState(initialSession?.imageBlur ?? 0);
  const [imageFilter, setImageFilter] = useState(initialSession?.imageFilter || 'none');
  const [overlayColor, setOverlayColor] = useState(initialSession?.overlayColor || '#000000');
  const [overlayOpacity, setOverlayOpacity] = useState(initialSession?.overlayOpacity ?? 35);
  const [hasVignette, setHasVignette] = useState(initialSession?.hasVignette ?? true);
  const [vignetteIntensity, setVignetteIntensity] = useState(initialSession?.vignetteIntensity ?? 50);

  // 5. Luxury Glass Card & Theme State
  const [themeId, setThemeId] = useState(initialSession?.themeId || 'sale-gold');
  const [finish, setFinish] = useState(initialSession?.finish || 'glossy');
  const [cardData, setCardData] = useState(initialSession?.cardData || DEFAULT_GLASS_CARD_DATA);

  // 6. Logo State
  const [showLogo, setShowLogo] = useState(initialSession?.showLogo ?? true);
  const [logoUrl, setLogoUrl] = useState(initialSession?.logoUrl || '');
  const [logoPosition, setLogoPosition] = useState(initialSession?.logoPosition || 'top-right');
  const [logoScale, setLogoScale] = useState(initialSession?.logoScale ?? 100);
  const [logoOpacity, setLogoOpacity] = useState(initialSession?.logoOpacity ?? 100);

  // 7. Preview Toggles
  const [isPhoneMockup, setIsPhoneMockup] = useState(true);
  const [showGridLines, setShowGridLines] = useState(false);
  const [showGridIndicator, setShowGridIndicator] = useState(true);

  const handleSelectPlatformTheme = (newThemeId) => {
    if (!newThemeId) return;
    setActivePlatformThemeId(newThemeId);
    savePlatformThemeId(newThemeId);
    const foundTheme = ALL_PALETTES.find(p => p.id === newThemeId);
    if (foundTheme) {
      applyThemeToCSS(foundTheme);
    }
  };

  // Load custom fonts & apply theme CSS variables on startup or theme change
  useEffect(() => {
    applyThemeToCSS(activeThemeObj);
  }, [activePlatformThemeId, activeThemeObj]);

  useEffect(() => {
    // 1. Load custom fonts from IndexedDB
    loadSavedCustomFonts().then((loaded) => {
      if (loaded && loaded.length > 0) {
        setCustomFonts(loaded);
      }
    });

    // 2. Sync user presets from Supabase cloud
    syncPresetsFromCloud().then((cloudPresets) => {
      if (cloudPresets && cloudPresets.length > 0) {
        setPresets(cloudPresets);
      }
    });

    // 3. Cloud-First Workspace Hydration (Always pull latest workspace state from cloud)
    fetchCloudWorkspaceSession().then((cloudSession) => {
      if (cloudSession) {
        if (cloudSession.themeId) setThemeId(cloudSession.themeId);
        if (cloudSession.finish) setFinish(cloudSession.finish);
        if (cloudSession.imageUrl !== undefined) setImageUrl(cloudSession.imageUrl);
        if (cloudSession.overlayColor) setOverlayColor(cloudSession.overlayColor);
        if (cloudSession.overlayOpacity !== undefined) setOverlayOpacity(cloudSession.overlayOpacity);
        if (cloudSession.imageBlur !== undefined) setImageBlur(cloudSession.imageBlur);
        if (cloudSession.imageFilter) setImageFilter(cloudSession.imageFilter);
        if (cloudSession.hasVignette !== undefined) setHasVignette(cloudSession.hasVignette);
        if (cloudSession.vignetteIntensity !== undefined) setVignetteIntensity(cloudSession.vignetteIntensity);
        if (cloudSession.cardData) setCardData(cloudSession.cardData);
        if (cloudSession.showLogo !== undefined) setShowLogo(cloudSession.showLogo);
        if (cloudSession.logoUrl !== undefined) setLogoUrl(cloudSession.logoUrl);
        if (cloudSession.logoPosition) setLogoPosition(cloudSession.logoPosition);
        if (cloudSession.logoScale !== undefined) setLogoScale(cloudSession.logoScale);
        if (cloudSession.logoOpacity !== undefined) setLogoOpacity(cloudSession.logoOpacity);
        if (cloudSession.imageZoom !== undefined) setImageZoom(cloudSession.imageZoom);
        if (cloudSession.imagePanX !== undefined) setImagePanX(cloudSession.imagePanX);
        if (cloudSession.imagePanY !== undefined) setImagePanY(cloudSession.imagePanY);
        if (cloudSession.activePlatformThemeId) handleSelectPlatformTheme(cloudSession.activePlatformThemeId);
        if (cloudSession.activePresetId) setActivePresetId(cloudSession.activePresetId);
        if (cloudSession.activeCardPaletteId !== undefined) setActiveCardPaletteId(cloudSession.activeCardPaletteId);
        if (cloudSession.activeNeonButtonStyleId) setActiveNeonButtonStyleId(cloudSession.activeNeonButtonStyleId);
        if (cloudSession.neonButtonOpacity !== undefined) setNeonButtonOpacity(cloudSession.neonButtonOpacity);
      }
    });

    // 4. Live Cross-Device Realtime Subscription (WebSocket mirror for both state & custom presets)
    const unsubscribe = subscribeToWorkspaceRealtime(
      (remoteState) => {
        if (!remoteState) return;
        isRemoteUpdatingRef.current = true;
        if (remoteState.themeId) setThemeId(remoteState.themeId);
        if (remoteState.finish) setFinish(remoteState.finish);
        if (remoteState.imageUrl !== undefined) setImageUrl(remoteState.imageUrl);
        if (remoteState.overlayColor) setOverlayColor(remoteState.overlayColor);
        if (remoteState.overlayOpacity !== undefined) setOverlayOpacity(remoteState.overlayOpacity);
        if (remoteState.imageBlur !== undefined) setImageBlur(remoteState.imageBlur);
        if (remoteState.imageFilter) setImageFilter(remoteState.imageFilter);
        if (remoteState.hasVignette !== undefined) setHasVignette(remoteState.hasVignette);
        if (remoteState.vignetteIntensity !== undefined) setVignetteIntensity(remoteState.vignetteIntensity);
        if (remoteState.cardData) setCardData(remoteState.cardData);
        if (remoteState.showLogo !== undefined) setShowLogo(remoteState.showLogo);
        if (remoteState.logoUrl !== undefined) setLogoUrl(remoteState.logoUrl);
        if (remoteState.logoPosition) setLogoPosition(remoteState.logoPosition);
        if (remoteState.logoScale !== undefined) setLogoScale(remoteState.logoScale);
        if (remoteState.logoOpacity !== undefined) setLogoOpacity(remoteState.logoOpacity);
        if (remoteState.imageZoom !== undefined) setImageZoom(remoteState.imageZoom);
        if (remoteState.imagePanX !== undefined) setImagePanX(remoteState.imagePanX);
        if (remoteState.imagePanY !== undefined) setImagePanY(remoteState.imagePanY);
        if (remoteState.activePlatformThemeId) handleSelectPlatformTheme(remoteState.activePlatformThemeId);
        if (remoteState.activePresetId) setActivePresetId(remoteState.activePresetId);
        if (remoteState.activeCardPaletteId !== undefined) setActiveCardPaletteId(remoteState.activeCardPaletteId);
        if (remoteState.activeNeonButtonStyleId) setActiveNeonButtonStyleId(remoteState.activeNeonButtonStyleId);
        if (remoteState.neonButtonOpacity !== undefined) setNeonButtonOpacity(remoteState.neonButtonOpacity);
      },
      (newPresetsList) => {
        if (newPresetsList && newPresetsList.length > 0) {
          setPresets(newPresetsList);
        }
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Auto-save session state to local storage & cloud (skips echo if state was applied from remote)
  useEffect(() => {
    if (isRemoteUpdatingRef.current) {
      isRemoteUpdatingRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      saveWorkspaceSession({
        activePresetId,
        activePlatformThemeId,
        activeCardPaletteId,
        activeNeonButtonStyleId,
        neonButtonOpacity,
        imageUrl,
        imageZoom,
        imagePanX,
        imagePanY,
        imageBlur,
        imageFilter,
        overlayColor,
        overlayOpacity,
        hasVignette,
        vignetteIntensity,
        themeId,
        finish,
        cardData,
        showLogo,
        logoUrl,
        logoPosition,
        logoScale,
        logoOpacity
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [
    activePresetId,
    activePlatformThemeId,
    activeCardPaletteId,
    activeNeonButtonStyleId,
    neonButtonOpacity,
    imageUrl,
    imageZoom,
    imagePanX,
    imagePanY,
    imageBlur,
    imageFilter,
    overlayColor,
    overlayOpacity,
    hasVignette,
    vignetteIntensity,
    themeId,
    finish,
    cardData,
    showLogo,
    logoUrl,
    logoPosition,
    logoScale,
    logoOpacity
  ]);

  const handleApplyPaletteToCard = (palette) => {
    if (!palette) return;
    setActiveCardPaletteId(palette.id);
    const isNeon = palette.group === 'neon';
    setCardData(prev => ({
      ...prev,
      borderColorMode: 'platform',
      activePaletteCardId: palette.id,
      customBorderColor: palette.previewCard.borderColor,
      glowColorMode: 'custom',
      customGlowColor: palette.previewCard.borderGlow,
      borderGlowIntensity: isNeon ? 90 : 80,
      neonCyberMode: isNeon,
      neonTextGlow: isNeon,
      subtitleColor: palette.previewCard.accent,
      heroUnitColor: palette.previewCard.heroUnitColor,
      dividerCustomColor: palette.previewCard.borderColor
    }));
  };

  const handleSetThemeId = (newThemeId) => {
    setThemeId(newThemeId);
    setActiveCardPaletteId(null);
  };

  // Handle Preset selection
  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setActiveCardPaletteId(null);
    if (preset.themeId) setThemeId(preset.themeId);
    if (preset.finish) setFinish(preset.finish);
    if (preset.overlayColor) setOverlayColor(preset.overlayColor);
    if (preset.overlayOpacity !== undefined) setOverlayOpacity(preset.overlayOpacity);
    if (preset.imageBlur !== undefined) setImageBlur(preset.imageBlur);
    if (preset.imageFilter) setImageFilter(preset.imageFilter);
    if (preset.hasVignette !== undefined) setHasVignette(preset.hasVignette);
    if (preset.vignetteIntensity !== undefined) setVignetteIntensity(preset.vignetteIntensity);
    if (preset.cardData) setCardData(preset.cardData);
  };

  const handleSavePreset = (name) => {
    const newPreset = {
      id: 'custom-' + Date.now(),
      name,
      themeId,
      finish,
      overlayColor,
      overlayOpacity,
      imageBlur,
      imageFilter,
      hasVignette,
      vignetteIntensity,
      cardData
    };
    saveUserPreset(newPreset);
    setPresets(getAllPresets());
    setActivePresetId(newPreset.id);
  };

  const handleDeletePreset = (id) => {
    deleteUserPreset(id);
    setPresets(getAllPresets());
  };

  const handleResetToDefault = () => {
    clearWorkspaceSession();
    handleSelectPreset(BUILTIN_PRESETS[0]);
    setImageUrl(SAMPLE_IMAGES[0].url);
  };

  // Studio Control Tabs
  const tabs = [
    { id: 'fields', name: 'النصوص والأرقام', icon: FileText },
    { id: 'layout', name: 'الثيم والحدود', icon: LayoutGrid },
    { id: 'image', name: 'الصورة والبلور', icon: ImageIcon },
    { id: 'typography', name: 'الخطوط', icon: Type },
    { id: 'logo', name: 'الشعار', icon: Shield }
  ];

  // Helper fields for copywriter
  const copyFields = [
    { text: cardData.title },
    { text: cardData.bottomText },
    { text: `${cardData.subtitle || 'المساحة'}: ${cardData.heroNumber} ${cardData.heroUnit}` }
  ];

  // Shared preview props
  const previewProps = {
    imageUrl,
    imageZoom,
    imagePanX,
    imagePanY,
    imageBlur,
    imageFilter,
    overlayColor,
    overlayOpacity,
    hasVignette,
    vignetteIntensity,
    themeId,
    finish,
    cardData,
    showLogo,
    logoUrl,
    logoPosition,
    logoScale,
    logoOpacity,
    showGridLines,
    showGridIndicator,
    gridViewsCount: '1916',
    activePlatformThemeId,
    activeThemeObj
  };

  return (
    <div
      className="h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden antialiased transition-colors duration-200"
      style={{
        backgroundColor: activeThemeObj.bgDark,
        color: activeThemeObj.textPrimary
      }}
    >
      {/* 1. Header (Fixed Height 48px) */}
      <div className="flex-none">
        <Header
          presets={presets}
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
          onSavePreset={handleSavePreset}
          onDeletePreset={handleDeletePreset}
          onResetToDefault={handleResetToDefault}
          onOpenSupabaseModal={() => setIsSupabaseOpen(true)}
          onOpenCopywriterModal={() => setIsCopywriterOpen(true)}
          activePlatformThemeId={activePlatformThemeId}
          onSelectPlatformTheme={handleSelectPlatformTheme}
          activeThemeObj={activeThemeObj}
          activeNeonButtonStyleId={activeNeonButtonStyleId}
          neonButtonOpacity={neonButtonOpacity}
        />
      </div>

      {/* 2. Main Studio Workspace (Mobile: Vertical Split Flex / Desktop: 12-Col Grid) */}
      <main className="flex-1 overflow-hidden flex flex-col lg:grid lg:grid-cols-12 max-w-[1600px] w-full mx-auto p-2 sm:p-3 lg:p-4 gap-4 lg:overflow-y-auto">
        
        {/* TOP PREVIEW STAGE (MOBILE: Fixed top / DESKTOP: Smooth Sticky Floating Pane) */}
        <div
          className="flex-none lg:col-span-5 xl:col-span-5 flex flex-col items-center gap-2 py-2 px-1 sm:px-2 border-b lg:border-none shadow-md lg:shadow-none w-full transition-all duration-200 lg:sticky lg:top-0 lg:self-start z-20 rounded-3xl"
          style={{
            backgroundColor: activeThemeObj.bgSurface,
            borderColor: activeThemeObj.borderSubtle
          }}
        >
          
          {/* Stage Bay: Centered with Generous Breathing Room between Canvas and Side Wings */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6 px-1 sm:px-2 lg:px-3 py-2">
            {/* Right Wing: Centered with comfortable margin */}
            <div className="flex-none flex items-center justify-center">
              <RightActionWing
                showGridLines={showGridLines}
                setShowGridLines={setShowGridLines}
                showLogo={showLogo}
                setShowLogo={setShowLogo}
                activeThemeObj={activeThemeObj}
              />
            </div>

            {/* Center Canvas Preview: Exact pixel footprint on mobile with zero dead space */}
            <div className="flex-none flex items-center justify-center">
              {/* MOBILE COMPACT PREVIEW (145px x 258px) - Click to expand */}
              <div
                onClick={() => setIsFullscreenPreviewOpen(true)}
                className="lg:hidden w-[145px] h-[258px] relative overflow-hidden rounded-[22px] shadow-2xl ring-1 cursor-pointer active:scale-98 transition-transform shrink-0"
                style={{
                  backgroundColor: activeThemeObj.bgDark,
                  borderColor: activeThemeObj.border
                }}
                title="اضغط لتكبير ومعاينة الغلاف على كامل الشاشة"
              >
                <div
                  className="absolute top-0 left-0 origin-top-left pointer-events-none"
                  style={{
                    width: '360px',
                    height: '640px',
                    transform: 'scale(0.402)'
                  }}
                >
                  <CanvasPreview
                    {...previewProps}
                    isPhoneMockup={false}
                    activeThemeObj={activeThemeObj}
                  />
                </div>
              </div>

              {/* DESKTOP FULL-SIZE CANVAS */}
              <div className="hidden lg:block w-full max-w-[360px]">
                <CanvasPreview
                  ref={canvasRef}
                  {...previewProps}
                  isPhoneMockup={isPhoneMockup}
                  activeThemeObj={activeThemeObj}
                />
                <div className="pt-2.5">
                  <ExportControls
                    canvasRef={canvasRef}
                    onOpenFullscreenPreview={() => setIsFullscreenPreviewOpen(true)}
                    showGridIndicator={showGridIndicator}
                    setShowGridIndicator={setShowGridIndicator}
                    activeThemeObj={activeThemeObj}
                  />
                </div>
              </div>
            </div>

            {/* Left Wing: Centered with comfortable margin */}
            <div className="flex-none flex items-center justify-center">
              <LeftActionWing
                canvasRef={canvasRef}
                activeThemeObj={activeThemeObj}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM CONTROL DECK (MOBILE: Scrollable independent pane / DESKTOP: Left column) */}
        <div className="flex-1 overflow-y-auto lg:overflow-visible lg:col-span-7 xl:col-span-7 space-y-3 overscroll-contain pr-0.5">
          {/* Segmented Tabs Navigation with Clear Luxury Dividers */}
          <div
            className="flex items-center p-1.5 rounded-2xl border overflow-x-auto select-none shadow-md sticky top-0 z-20 backdrop-blur-md transition-colors duration-200"
            style={{
              backgroundColor: activeThemeObj.bgSurface,
              borderColor: activeThemeObj.borderSubtle
            }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <React.Fragment key={tab.id}>
                  {index > 0 && (
                    <div
                      className="w-[1px] h-4 mx-1 shrink-0 opacity-40"
                      style={{ backgroundColor: activeThemeObj.border }}
                    />
                  )}
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive ? 'shadow-md font-black scale-[1.02]' : 'hover:opacity-100 opacity-75'
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: activeThemeObj.accent,
                            color: activeThemeObj.bgDark,
                            boxShadow: `0 0 12px ${activeThemeObj.accentGlow}`
                          }
                        : {
                            color: activeThemeObj.textMuted
                          }
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.name}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Control Deck Body (Clean, Breathable & Reactive to Active Platform Theme) */}
          <div
            className="p-3.5 sm:p-5 rounded-3xl border shadow-xl mb-3 transition-colors duration-200"
            style={{
              backgroundColor: activeThemeObj.bgCard,
              borderColor: activeThemeObj.borderSubtle
            }}
          >
            {activeTab === 'fields' && (
              <FieldsEditor
                cardData={cardData}
                onCardDataChange={setCardData}
                customFonts={customFonts}
                imageUrl={imageUrl}
                onImageChange={setImageUrl}
                activeThemeObj={activeThemeObj}
              />
            )}

            {activeTab === 'layout' && (
              <LayoutAndCardsPanel
                themeId={themeId}
                setThemeId={handleSetThemeId}
                finish={finish}
                setFinish={setFinish}
                cardData={cardData}
                setCardData={setCardData}
                activePlatformThemeId={activePlatformThemeId}
                activeThemeObj={activeThemeObj}
              />
            )}

            {activeTab === 'image' && (
              <ImageFXPanel
                imageUrl={imageUrl}
                onImageChange={setImageUrl}
                imageZoom={imageZoom}
                setImageZoom={setImageZoom}
                imagePanX={imagePanX}
                setImagePanX={setImagePanX}
                imagePanY={imagePanY}
                setImagePanY={setImagePanY}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                imageFilter={imageFilter}
                setImageFilter={setImageFilter}
                overlayColor={overlayColor}
                setOverlayColor={setOverlayColor}
                overlayOpacity={overlayOpacity}
                setOverlayOpacity={setOverlayOpacity}
                hasVignette={hasVignette}
                setHasVignette={setHasVignette}
                vignetteIntensity={vignetteIntensity}
                setVignetteIntensity={setVignetteIntensity}
                activeThemeObj={activeThemeObj}
              />
            )}

            {activeTab === 'typography' && (
              <TypographyPanel
                customFonts={customFonts}
                onCustomFontsChange={setCustomFonts}
                activeThemeObj={activeThemeObj}
              />
            )}

            {activeTab === 'logo' && (
              <LogoPanel
                showLogo={showLogo}
                setShowLogo={setShowLogo}
                logoUrl={logoUrl}
                onLogoChange={setLogoUrl}
                logoPosition={logoPosition}
                setLogoPosition={setLogoPosition}
                logoScale={logoScale}
                setLogoScale={setLogoScale}
                logoOpacity={logoOpacity}
                setLogoOpacity={setLogoOpacity}
                activeThemeObj={activeThemeObj}
              />
            )}
          </div>
        </div>
      </main>

      {/* Fullscreen Lightbox Dedicated Page */}
      <FullscreenPreviewModal
        isOpen={isFullscreenPreviewOpen}
        onClose={() => setIsFullscreenPreviewOpen(false)}
        canvasRef={fullscreenCanvasRef}
        previewProps={previewProps}
        activeThemeObj={activeThemeObj}
      />

      <SocialCopywriterModal
        isOpen={isCopywriterOpen}
        onClose={() => setIsCopywriterOpen(false)}
        fields={copyFields}
        themeId={themeId}
        activeThemeObj={activeThemeObj}
      />

      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
        activeThemeObj={activeThemeObj}
      />
    </div>
  );
}
