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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* 1. Header (Slim 56px) */}
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

      {/* 2. Main Studio Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-2 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* RIGHT COLUMN (DESKTOP) / TOP FIXED PREVIEW DECK (MOBILE) */}
        <div className={`lg:col-span-5 xl:col-span-5 flex flex-col items-center gap-3 z-30 ${
          viewMode === 'split'
            ? 'sticky top-14 bg-slate-950/98 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none py-2 lg:py-0 border-b border-slate-800 lg:border-none shadow-2xl lg:shadow-none lg:sticky lg:top-20'
            : 'relative'
        }`}>
          {/* Mobile View Toggle Bar */}
          <div className="lg:hidden w-full flex items-center justify-between px-2 text-xs">
            <span className="font-bold text-slate-300">المعاينة الحية:</span>
            <button
              onClick={() => setViewMode(viewMode === 'split' ? 'full' : 'split')}
              className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg transition-colors"
            >
              {viewMode === 'split' ? (
                <>
                  <Maximize2 className="w-3 h-3" />
                  <span>معاينة مكبرة</span>
                </>
              ) : (
                <>
                  <Split className="w-3 h-3" />
                  <span>وضع الشاشة المنقسمة</span>
                </>
              )}
            </button>
          </div>

          {/* Scaled Preview Frame (Fixed height on mobile in split mode) */}
          <div className={`transition-all duration-150 flex items-center justify-center ${
            viewMode === 'split'
              ? 'h-[230px] sm:h-[280px] lg:h-auto overflow-hidden scale-[0.44] sm:scale-[0.52] lg:scale-100 origin-center -my-24 sm:-my-16 lg:my-0'
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

          {/* Action Bar (Download & Toggles) */}
          <div className="w-full max-w-[430px]">
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

        {/* LEFT COLUMN (DESKTOP) / BOTTOM SCROLLABLE CONTROL DECK (MOBILE) */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-3">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto select-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Control Deck Body */}
          <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-900/75 border border-slate-800/80 backdrop-blur-xl shadow-xl">
            {activeTab === 'fields' && (
              <FieldsEditor
                cardData={cardData}
                onCardDataChange={setCardData}
                customFonts={customFonts}
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
