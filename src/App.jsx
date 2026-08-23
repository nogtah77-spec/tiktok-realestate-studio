import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import CanvasPreview from './components/CanvasPreview';
import ImageFXPanel from './components/ImageFXPanel';
import TypographyPanel from './components/TypographyPanel';
import LayoutAndCardsPanel from './components/LayoutAndCardsPanel';
import FieldsEditor from './components/FieldsEditor';
import LogoPanel from './components/LogoPanel';
import ExportControls from './components/ExportControls';
import SocialCopywriterModal from './components/SocialCopywriterModal';
import SupabaseModal from './components/SupabaseModal';
import { DEFAULT_GLASS_CARD_DATA, SAMPLE_IMAGES, LUXURY_THEMES } from './utils/constants';
import { getAllPresets, saveUserPreset, deleteUserPreset, BUILTIN_PRESETS } from './utils/presetStorage';
import { loadSavedCustomFonts } from './utils/fontLoader';
import { Image as ImageIcon, Type, LayoutGrid, FileText, Shield, Maximize2, Split } from 'lucide-react';

export default function App() {
  const canvasRef = useRef(null);

  // 1. Navigation & View State
  const [activeTab, setActiveTab] = useState('fields');
  const [presets, setPresets] = useState(getAllPresets);
  const [activePresetId, setActivePresetId] = useState('preset-sale-gold');
  const [customFonts, setCustomFonts] = useState([]);
  const [viewMode, setViewMode] = useState('split'); // 'split' (fixed top preview) or 'full'

  // 2. Modals
  const [isCopywriterOpen, setIsCopywriterOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);

  // 3. Image State
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

  // 4. Luxury Glass Card & Theme State
  const [themeId, setThemeId] = useState('sale-gold');
  const [finish, setFinish] = useState('glossy');
  const [cardData, setCardData] = useState(DEFAULT_GLASS_CARD_DATA);

  // 5. Logo State
  const [showLogo, setShowLogo] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');
  const [logoPosition, setLogoPosition] = useState('top-right');
  const [logoScale, setLogoScale] = useState(100);
  const [logoOpacity, setLogoOpacity] = useState(100);

  // 6. Preview Toggles
  const [isPhoneMockup, setIsPhoneMockup] = useState(true);
  const [showGridLines, setShowGridLines] = useState(false);
  const [showGridIndicator, setShowGridIndicator] = useState(true);

  // Load custom fonts from IndexedDB on startup
  useEffect(() => {
    loadSavedCustomFonts().then((loaded) => {
      if (loaded && loaded.length > 0) {
        setCustomFonts(loaded);
      }
    });
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Slim Header (52px) */}
      <Header
        presets={presets}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
        onSavePreset={handleSavePreset}
        onDeletePreset={handleDeletePreset}
        onResetToDefault={handleResetToDefault}
        onOpenSupabaseModal={() => setIsSupabaseOpen(true)}
        onOpenCopywriterModal={() => setIsCopywriterOpen(true)}
      />

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-[1550px] w-full mx-auto p-2 sm:p-3 lg:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-start pb-4">
        
        {/* RIGHT COLUMN (DESKTOP) / TOP STICKY PREVIEW BAR (MOBILE) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center gap-2 lg:sticky lg:top-16 z-30">
          
          {/* Mobile View Toggle Bar */}
          <div className="lg:hidden w-full flex items-center justify-between px-1 text-xs">
            <span className="font-bold text-slate-300 text-[11px]">المعاينة الحية:</span>
            <button
              onClick={() => setViewMode(viewMode === 'split' ? 'full' : 'split')}
              className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
            >
              {viewMode === 'split' ? (
                <>
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>معاينة مكبرة</span>
                </>
              ) : (
                <>
                  <Split className="w-2.5 h-2.5" />
                  <span>وضع منقسم</span>
                </>
              )}
            </button>
          </div>

          {/* Sticky Canvas Stage on Mobile */}
          <div className={`w-full flex items-center justify-center transition-all ${
            viewMode === 'split'
              ? 'sticky top-13 lg:static bg-slate-950/98 lg:bg-transparent backdrop-blur-md py-1 rounded-2xl lg:rounded-none border-b lg:border-none border-slate-800'
              : 'relative'
          }`}>
            <div className={`transition-transform duration-150 flex items-center justify-center ${
              viewMode === 'split'
                ? 'h-[250px] sm:h-[290px] lg:h-auto overflow-hidden scale-[0.48] sm:scale-[0.55] lg:scale-100 origin-center -my-22 sm:-my-16 lg:my-0'
                : 'w-full'
            }`}>
              <CanvasPreview
                ref={canvasRef}
                imageUrl={imageUrl}
                imageZoom={imageZoom}
                imagePanX={imagePanX}
                imagePanY={imagePanY}
                imageBlur={imageBlur}
                imageFilter={imageFilter}
                overlayColor={overlayColor}
                overlayOpacity={overlayOpacity}
                hasVignette={hasVignette}
                vignetteIntensity={vignetteIntensity}
                themeId={themeId}
                finish={finish}
                cardData={cardData}
                showLogo={showLogo}
                logoUrl={logoUrl}
                logoPosition={logoPosition}
                logoScale={logoScale}
                logoOpacity={logoOpacity}
                isPhoneMockup={isPhoneMockup}
                showGridLines={showGridLines}
                showGridIndicator={showGridIndicator}
                gridViewsCount="1916"
              />
            </div>
          </div>

          {/* Quick Action Toolbar (Download, Copy, Toolstrip) */}
          <div className="w-full max-w-[420px]">
            <ExportControls
              canvasRef={canvasRef}
              showGridLines={showGridLines}
              setShowGridLines={setShowGridLines}
              showLogo={showLogo}
              setShowLogo={setShowLogo}
              showGridIndicator={showGridIndicator}
              setShowGridIndicator={setShowGridIndicator}
              onOpenCopywriterModal={() => setIsCopywriterOpen(true)}
            />
          </div>
        </div>

        {/* LEFT COLUMN (DESKTOP) / BOTTOM CONTROL DECK (MOBILE) */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-2">
          {/* Segmented Tabs Navigation with Luxury Dividers */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto select-none shadow-md">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <React.Fragment key={tab.id}>
                  {index > 0 && <div className="w-[1px] h-3.5 bg-slate-800 mx-0.5 shrink-0" />}
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.name}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Control Deck Body (Clean & Compact) */}
          <div className="p-3 sm:p-4 rounded-3xl bg-slate-900/75 border border-slate-800/80 backdrop-blur-xl shadow-xl">
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
          </div>
        </div>
      </main>

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
