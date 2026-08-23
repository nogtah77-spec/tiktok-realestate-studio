import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import CanvasPreview from './components/CanvasPreview';
import ImageFXPanel from './components/ImageFXPanel';
import TypographyPanel from './components/TypographyPanel';
import LayoutAndCardsPanel from './components/LayoutAndCardsPanel';
import FieldsEditor from './components/FieldsEditor';
import LogoPanel from './components/LogoPanel';
import PalettesStudioPanel from './components/PalettesStudioPanel';
import ExportControls, { SideActionWings } from './components/ExportControls';
import SocialCopywriterModal from './components/SocialCopywriterModal';
import FullscreenPreviewModal from './components/FullscreenPreviewModal';
import SupabaseModal from './components/SupabaseModal';
import { DEFAULT_GLASS_CARD_DATA, SAMPLE_IMAGES, LUXURY_THEMES } from './utils/constants';
import { getAllPresets, saveUserPreset, deleteUserPreset, BUILTIN_PRESETS } from './utils/presetStorage';
import { loadSavedCustomFonts } from './utils/fontLoader';
import { MASTER_PALETTES, getSavedPlatformThemeId, savePlatformThemeId } from './utils/themeEngine';
import { Image as ImageIcon, Type, LayoutGrid, FileText, Shield, Maximize2, Palette } from 'lucide-react';

export default function App() {
  const canvasRef = useRef(null);
  const fullscreenCanvasRef = useRef(null);

  // 1. Navigation & View State
  const [activeTab, setActiveTab] = useState('fields');
  const [presets, setPresets] = useState(getAllPresets);
  const [activePresetId, setActivePresetId] = useState('preset-sale-gold');
  const [customFonts, setCustomFonts] = useState([]);
  const [isFullscreenPreviewOpen, setIsFullscreenPreviewOpen] = useState(false);

  // 2. 8 Pro Palettes Theme Engine
  const [activePlatformThemeId, setActivePlatformThemeId] = useState(getSavedPlatformThemeId);
  const activeThemeObj = MASTER_PALETTES.find(p => p.id === activePlatformThemeId) || MASTER_PALETTES[1];

  // 3. Modals
  const [isCopywriterOpen, setIsCopywriterOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);

  // 4. Image State
  const [imageUrl, setImageUrl] = useState(SAMPLE_IMAGES[0].url);
  const [imageZoom, setImageZoom] = useState(100);
  const [imagePanX, setImagePanX] = useState(0);
  const [imagePanY, setImagePanY] = useState(0);
  const [imageBlur, setImageBlur] = useState(0);
  const [imageFilter, setImageFilter] = useState('none');
  const [overlayColor, setOverlayColor] = useState('#000000');
  const [overlayOpacity, setOverlayOpacity] = useState(35);
  const [hasVignette, setHasVignette] = useState(true);
  const [vignetteIntensity, setVignetteIntensity] = useState(50);

  // 5. Luxury Glass Card & Theme State
  const [themeId, setThemeId] = useState('sale-gold');
  const [finish, setFinish] = useState('glossy');
  const [cardData, setCardData] = useState(DEFAULT_GLASS_CARD_DATA);

  // 6. Logo State
  const [showLogo, setShowLogo] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');
  const [logoPosition, setLogoPosition] = useState('top-right');
  const [logoScale, setLogoScale] = useState(100);
  const [logoOpacity, setLogoOpacity] = useState(100);

  // 7. Preview Toggles
  const [isPhoneMockup, setIsPhoneMockup] = useState(true);
  const [showGridLines, setShowGridLines] = useState(false);
  const [showGridIndicator, setShowGridIndicator] = useState(true);

  // Load custom fonts on startup
  useEffect(() => {
    loadSavedCustomFonts().then((loaded) => {
      if (loaded && loaded.length > 0) {
        setCustomFonts(loaded);
      }
    });
  }, []);

  const handleSelectPlatformTheme = (newThemeId) => {
    setActivePlatformThemeId(newThemeId);
    savePlatformThemeId(newThemeId);
  };

  const handleApplyPaletteToCard = (palette) => {
    if (!palette) return;
    setCardData(prev => ({
      ...prev,
      borderColorMode: 'custom',
      customBorderColor: palette.previewCard.borderColor,
      glowColorMode: 'custom',
      customGlowColor: palette.previewCard.borderGlow,
      borderGlowIntensity: 85
    }));
  };

  // Handle Preset selection
  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
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
    handleSelectPreset(BUILTIN_PRESETS[0]);
    setImageUrl(SAMPLE_IMAGES[0].url);
  };

  // Reordered Tabs: Theme Studio is strictly the LAST tab after Logo
  const tabs = [
    { id: 'fields', name: 'النصوص والأرقام', icon: FileText },
    { id: 'layout', name: 'الثيم والحدود', icon: LayoutGrid },
    { id: 'image', name: 'الصورة والبلور', icon: ImageIcon },
    { id: 'typography', name: 'الخطوط', icon: Type },
    { id: 'logo', name: 'الشعار', icon: Shield },
    { id: 'palettes', name: 'استوديو الثيمات (8)', icon: Palette }
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
    gridViewsCount: '1916'
  };

  // Get Side Action Wings for the Stage Bay
  const sideWings = SideActionWings({
    canvasRef,
    showGridLines,
    setShowGridLines,
    showLogo,
    setShowLogo
  });

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
        />
      </div>

      {/* 2. Main Studio Workspace (Mobile: Vertical Split Flex / Desktop: 12-Col Grid) */}
      <main className="flex-1 overflow-hidden flex flex-col lg:grid lg:grid-cols-12 max-w-[1550px] w-full mx-auto p-2 sm:p-3 lg:p-4 gap-2.5 lg:overflow-y-auto">
        
        {/* TOP PREVIEW STAGE (MOBILE: Fixed non-scrolling top / DESKTOP: Sticky column) */}
        <div
          className="flex-none lg:col-span-5 xl:col-span-5 flex flex-col items-center gap-1 py-1 border-b lg:border-none shadow-md lg:shadow-none w-full transition-colors duration-200"
          style={{
            backgroundColor: activeThemeObj.bgSurface,
            borderColor: activeThemeObj.borderSubtle
          }}
        >
          
          {/* Mobile Top Bar: Title + Open Fullscreen Lightbox Button */}
          <div className="lg:hidden w-full flex items-center justify-between px-1 text-[11px] pb-0.5">
            <span className="font-bold text-slate-300">المعاينة الحية:</span>
            <button
              onClick={() => setIsFullscreenPreviewOpen(true)}
              className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm border"
              style={{
                backgroundColor: activeThemeObj.bgDark,
                borderColor: activeThemeObj.border,
                color: activeThemeObj.accentText
              }}
            >
              <Maximize2 className="w-3 h-3" style={{ color: activeThemeObj.accent }} />
              <span>تكبير المعاينة 🔍</span>
            </button>
          </div>

          {/* Stage Bay: Flanked by Right and Left Wings with refined 2mm spacing */}
          <div className="w-full flex items-center justify-center gap-3.5 sm:gap-4">
            {/* Right Wing: الجريد والشعار */}
            {sideWings.rightWing}

            {/* Center Canvas Preview: Exact pixel footprint on mobile with zero dead space */}
            <div className="flex items-center justify-center">
              {/* MOBILE COMPACT PREVIEW (130px x 231px) - Click to expand */}
              <div
                onClick={() => setIsFullscreenPreviewOpen(true)}
                className="lg:hidden w-[130px] h-[231px] relative overflow-hidden rounded-[20px] shadow-xl ring-1 cursor-pointer active:scale-98 transition-transform"
                style={{
                  backgroundColor: activeThemeObj.bgDark,
                  borderColor: activeThemeObj.border
                }}
                title="اضغط لتكبير المعاينة على كامل الشاشة"
              >
                <div
                  className="absolute top-0 left-0 origin-top-left pointer-events-none"
                  style={{ transform: 'scale(0.3823)' }}
                >
                  <CanvasPreview
                    ref={canvasRef}
                    {...previewProps}
                    isPhoneMockup={false}
                  />
                </div>
              </div>

              {/* DESKTOP FULL-SIZE CANVAS */}
              <div className="hidden lg:block w-full max-w-[380px]">
                <CanvasPreview
                  ref={canvasRef}
                  {...previewProps}
                  isPhoneMockup={isPhoneMockup}
                />
              </div>
            </div>

            {/* Left Wing: نسخ ومفرغ PNG */}
            {sideWings.leftWing}
          </div>

          {/* Compact Bottom Action Bar: High-Res Download & Views */}
          <div className="w-full max-w-[360px] lg:max-w-[420px] pt-1">
            <ExportControls
              canvasRef={canvasRef}
              showGridIndicator={showGridIndicator}
              setShowGridIndicator={setShowGridIndicator}
            />
          </div>
        </div>

        {/* BOTTOM CONTROL DECK (MOBILE: Scrollable independent pane / DESKTOP: Left column) */}
        <div className="flex-1 overflow-y-auto lg:overflow-visible lg:col-span-7 xl:col-span-7 space-y-2 overscroll-contain pr-0.5">
          {/* Segmented Tabs Navigation with Luxury Dividers */}
          <div
            className="flex items-center p-1 rounded-2xl border overflow-x-auto select-none shadow-md sticky top-0 z-20 backdrop-blur-md transition-colors duration-200"
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
                  {index > 0 && <div className="w-[1px] h-3.5 mx-0.5 shrink-0 opacity-40" style={{ backgroundColor: activeThemeObj.border }} />}
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive ? 'shadow-md font-black' : 'text-slate-400 hover:text-slate-200'
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: activeThemeObj.accent,
                            color: activeThemeObj.bgDark,
                            boxShadow: `0 0 10px ${activeThemeObj.accentGlow}`
                          }
                        : {}
                    }
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.name}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Control Deck Body (Clean & Reactive to Active Platform Theme) */}
          <div
            className="p-3 sm:p-4 rounded-3xl border shadow-xl mb-3 transition-colors duration-200"
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
              />
            )}

            {activeTab === 'layout' && (
              <LayoutAndCardsPanel
                themeId={themeId}
                setThemeId={setThemeId}
                finish={finish}
                setFinish={setFinish}
                cardData={cardData}
                setCardData={setCardData}
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
              />
            )}

            {activeTab === 'typography' && (
              <TypographyPanel
                customFonts={customFonts}
                onCustomFontsChange={setCustomFonts}
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
              />
            )}

            {activeTab === 'palettes' && (
              <PalettesStudioPanel
                activePlatformThemeId={activePlatformThemeId}
                onSelectPlatformTheme={handleSelectPlatformTheme}
                onApplyToCard={handleApplyPaletteToCard}
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
      />

      <SocialCopywriterModal
        isOpen={isCopywriterOpen}
        onClose={() => setIsCopywriterOpen(false)}
        fields={copyFields}
        themeId={themeId}
      />

      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
      />
    </div>
  );
}
