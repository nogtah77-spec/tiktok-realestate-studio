import React from 'react';
import { NEON_BUTTON_STYLES } from '../utils/neonButtonStyles';

export default function NeonButton({
  styleId = 'frame-01',
  isActive = false,
  opacity = 100,
  onClick,
  className = '',
  size = 'md' // 'sm', 'md', 'lg'
}) {
  const currentStyle = NEON_BUTTON_STYLES.find(s => s.id === styleId) || NEON_BUTTON_STYLES[0];
  const opacityVal = Math.max(0.1, Math.min(1, (opacity ?? 100) / 100));

  // Size variations
  const sizeClasses = size === 'sm'
    ? 'px-3 py-1 text-[10.5px] min-w-[110px] h-7.5'
    : size === 'lg'
      ? 'px-5 py-2.5 text-xs min-w-[140px] h-10.5'
      : 'px-4 py-1.5 text-[11px] min-w-[125px] h-8.5';

  const baseButtonProps = {
    onClick: onClick,
    className: `relative inline-flex items-center justify-center font-black select-none transition-all duration-200 cursor-pointer active:scale-95 ${sizeClasses} ${className}`,
    style: {
      opacity: opacityVal,
      filter: isActive ? 'drop-shadow(0 0 12px rgba(0,229,255,0.45))' : 'none'
    },
    title: `زر مود النيون - ${currentStyle.arabicName}`
  };

  switch (styleId) {
    // =========================================================================
    // 🌟 IMAGE 1: 10 STRUCTURAL & FRAME DESIGNS (Without Zap Icon)
    // =========================================================================

    // 01 Neon Dark: Pill capsule with Pink top arc & Cyan bottom arc with cutouts
    case 'frame-01':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-[#050814] rounded-full" />
          {/* Dual Split Glowing Arc SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 140 36" fill="none">
            {/* Top Pink Arc with White Core */}
            <path d="M 18,2 L 122,2 A 16,16 0 0,1 138,18" stroke="#ff2a85" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px #ff2a85)' }} />
            <path d="M 22,2 L 118,2" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
            {/* Bottom Cyan Arc with White Core */}
            <path d="M 122,34 L 18,34 A 16,16 0 0,1 2,18" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px #00e5ff)' }} />
            <path d="M 118,34 L 22,34" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
          </svg>
          <div className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide">
            <span style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 6px #00e5ff, 0 0 14px #00e5ff' }}>مود</span>
            <span className="opacity-30 text-white font-light text-xs">|</span>
            <span style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 6px #ff2a85, 0 0 14px #ff2a85' }}>النيون</span>
          </div>
        </button>
      );

    // 02 Neon Glow: Vibrant Stadium Pill with High-Intensity Magenta-to-Cyan Bloom
    case 'frame-02':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-[#080414] rounded-full" />
          {/* Radiant Gradient Ring */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              padding: '2px',
              background: 'linear-gradient(135deg, #ff00c8 0%, #ff007f 40%, #00e5ff 100%)',
              boxShadow: '0 0 18px rgba(255,0,200,0.6), 0 0 26px rgba(0,229,255,0.45), inset 0 0 10px rgba(255,0,200,0.3)'
            }}
          >
            <div className="w-full h-full bg-[#080414] rounded-full" />
          </div>
          <div className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide">
            <span style={{ color: '#00e5ff', textShadow: '0 0 2px #ffffff, 0 0 8px #00e5ff, 0 0 18px #00e5ff' }}>مود</span>
            <span className="opacity-30 text-white font-light text-xs">|</span>
            <span style={{ color: '#ff00c8', textShadow: '0 0 2px #ffffff, 0 0 8px #ff00c8, 0 0 18px #ff00c8' }}>النيون</span>
          </div>
        </button>
      );

    // 03 Neon Cyber: Chamfered Octagonal Cyber Frame with Angled Corners & Tech Notches
    case 'frame-03':
      return (
        <button
          {...baseButtonProps}
          style={{
            ...baseButtonProps.style,
            clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)'
          }}
          className={`${baseButtonProps.className} bg-[#030712] relative overflow-hidden`}
        >
          {/* Cyber SVG Border with Notches */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 140 36" preserveAspectRatio="none">
            {/* Top-Right Cyan Bracket */}
            <path d="M 40,1.5 L 130,1.5 L 138.5,10 L 138.5,26 L 130,34.5 L 100,34.5" fill="none" stroke="#00f0c8" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #00f0c8)' }} />
            {/* Bottom-Left Pink Bracket */}
            <path d="M 100,34.5 L 10,34.5 L 1.5,26 L 1.5,10 L 10,1.5 L 40,1.5" fill="none" stroke="#ff2a85" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #ff2a85)' }} />
            {/* Center Notches */}
            <line x1="30" y1="1.5" x2="45" y2="1.5" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="95" y1="34.5" x2="110" y2="34.5" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
          <div className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide">
            <span style={{ color: '#00f0c8', textShadow: '0 0 2px #ffffff, 0 0 8px #00f0c8, 0 0 16px #00f0c8' }}>مود</span>
            <span className="opacity-30 text-cyan-300 font-light text-xs">|</span>
            <span style={{ color: '#00f0c8', textShadow: '0 0 2px #ffffff, 0 0 8px #00f0c8, 0 0 16px #00f0c8' }}>النيون</span>
          </div>
        </button>
      );

    // 04 Neon Soft: Rounded Rectangle with Deep Ultraviolet / Lavender Uniform Glow
    case 'frame-04':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-2xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#090518] rounded-2xl border-2 border-[#8b5cf6]"
            style={{
              boxShadow: '0 0 16px rgba(139,92,246,0.7), 0 0 30px rgba(139,92,246,0.3), inset 0 0 10px rgba(139,92,246,0.35)'
            }}
          />
          <div className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide">
            <span style={{ color: '#d8b4fe', textShadow: '0 0 2px #ffffff, 0 0 8px #a855f7, 0 0 18px #9333ea' }}>مود</span>
            <span className="opacity-30 text-purple-300 font-light text-xs">|</span>
            <span style={{ color: '#d8b4fe', textShadow: '0 0 2px #ffffff, 0 0 8px #a855f7, 0 0 18px #9333ea' }}>النيون</span>
          </div>
        </button>
      );

    // 05 Neon Gradient: Smooth 3-Color Gradient Pill (Coral -> Magenta -> Cyan)
    case 'frame-05':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-[#080512] rounded-full" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 140 36" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad05" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#ff4500" />
                <stop offset="45%" stopColor="#ff007f" />
                <stop offset="100%" stopColor="#00e5ff" />
              </linearGradient>
            </defs>
            <rect x="1.5" y="1.5" width="137" height="33" rx="16.5" fill="none" stroke="url(#grad05)" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 8px #ff007f)' }} />
          </svg>
          <div className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide">
            <span style={{ color: '#ff66a3', textShadow: '0 0 2px #ffffff, 0 0 8px #ff007f, 0 0 16px #ff007f' }}>مود</span>
            <span className="opacity-30 text-white font-light text-xs">|</span>
            <span style={{ color: '#38bdf8', textShadow: '0 0 2px #ffffff, 0 0 8px #00e5ff, 0 0 16px #00e5ff' }}>النيون</span>
          </div>
        </button>
      );

    // 06 Neon Glass: Shiny 3D Acrylic Glass Capsule with Curved Specular Highlight
    case 'frame-06':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          {/* Deep Acrylic Base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1738] via-[#060c22] to-[#040817] rounded-full border border-cyan-400/50"
            style={{
              boxShadow: '0 0 16px rgba(0,210,255,0.6), inset 0 0 12px rgba(123,0,255,0.4), 0 6px 14px rgba(0,0,0,0.8)'
            }}
          />
          {/* Curved Specular Dome Highlight (Realistic 3D Acrylic Lens) */}
          <div
            className="absolute top-0.5 inset-x-2 h-[48%] rounded-t-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 65%, transparent 100%)'
            }}
          />
          <div className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide pt-0.5">
            <span style={{ color: '#00e5ff', textShadow: '0 0 2px #ffffff, 0 0 8px #00e5ff, 0 0 18px #00e5ff' }}>مود</span>
            <span className="opacity-30 text-cyan-300 font-light text-xs">|</span>
            <span style={{ color: '#00e5ff', textShadow: '0 0 2px #ffffff, 0 0 8px #00e5ff, 0 0 18px #00e5ff' }}>النيون</span>
          </div>
        </button>
      );

    // 07 Neon Outline: Double Concentric Outlines (Inner Cyan + Outer Magenta)
    case 'frame-07':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden p-[2.5px]`}>
          {/* Outer Magenta Ring */}
          <div className="absolute inset-0 bg-[#060814] rounded-full border-1.5 border-[#ff0055]"
            style={{ boxShadow: '0 0 12px rgba(255,0,85,0.5)' }}
          />
          {/* Inner Cyan Ring */}
          <div className="relative w-full h-full rounded-full border-1.5 border-[#00f0c8] flex items-center justify-center px-3 py-1"
            style={{ boxShadow: '0 0 10px rgba(0,240,200,0.6), inset 0 0 6px rgba(0,240,200,0.3)' }}
          >
            <div className="flex items-center justify-center gap-2 font-black tracking-wide">
              <span style={{ color: '#00f0c8', textShadow: '0 0 2px #ffffff, 0 0 8px #00f0c8' }}>مود</span>
              <span className="opacity-30 text-cyan-300 font-light text-xs">|</span>
              <span style={{ color: '#00f0c8', textShadow: '0 0 2px #ffffff, 0 0 8px #00f0c8' }}>النيون</span>
            </div>
          </div>
        </button>
      );

    // 08 Neon Pulse: Hybrid Dashed Purple Border on Right + Solid Pink Glow Ring on Left
    case 'frame-08':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-[#0c051a] rounded-full" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 140 36" preserveAspectRatio="none">
            {/* Dashed Right/Center Frame */}
            <rect x="1.5" y="1.5" width="137" height="33" rx="16.5" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 4" style={{ filter: 'drop-shadow(0 0 6px #a855f7)' }} />
            {/* Solid Left Glow Pill Indicator */}
            <rect x="4" y="4" width="28" height="28" rx="14" fill="rgba(244,63,94,0.25)" stroke="#ff007f" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px #ff007f)' }} />
          </svg>
          <div className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide pr-2">
            <span style={{ color: '#e879f9', textShadow: '0 0 2px #ffffff, 0 0 8px #d946ef, 0 0 16px #a855f7' }}>مود</span>
            <span className="opacity-30 text-purple-300 font-light text-xs">|</span>
            <span style={{ color: '#e879f9', textShadow: '0 0 2px #ffffff, 0 0 8px #d946ef, 0 0 16px #a855f7' }}>النيون</span>
          </div>
        </button>
      );

    // 09 Neon 3D: Heavy Metallic Beveled Embossed Capsule with 3D Specular Rims
    case 'frame-09':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          {/* Metallic 3D Capsule Shell */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #2a2d42 0%, #121422 40%, #060812 100%)',
              borderTop: '2px solid rgba(255, 0, 128, 0.85)',
              borderBottom: '2px solid rgba(0, 229, 255, 0.85)',
              borderLeft: '1.5px solid rgba(255, 255, 255, 0.3)',
              borderRight: '1.5px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.9), 0 0 14px rgba(255,0,128,0.5), inset 0 2px 2px rgba(255,255,255,0.4), inset 0 -3px 8px rgba(0,229,255,0.6)'
            }}
          />
          <div className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide">
            <span style={{ color: '#ff2d95', textShadow: '0 0 2px #ffffff, 0 0 8px #ff2d95, 0 0 16px #ff2d95' }}>مود</span>
            <span className="opacity-30 text-white font-light text-xs">|</span>
            <span style={{ color: '#00e5ff', textShadow: '0 0 2px #ffffff, 0 0 8px #00e5ff, 0 0 16px #00e5ff' }}>النيون</span>
          </div>
        </button>
      );

    // 10 Neon Tech: Futuristic HUD Cyber Bracket Frame with Segmented Marks & Dotted Lines
    case 'frame-10':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-lg overflow-hidden`}>
          <div className="absolute inset-0 bg-[#020b12] rounded-lg border border-[#00ffcc]/60"
            style={{ boxShadow: '0 0 14px rgba(0,255,204,0.45)' }}
          />
          {/* HUD Tech Corner Brackets */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#00ffcc]" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#00ffcc]" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#00ffcc]" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#00ffcc]" />
          {/* Tech Circuit Dots */}
          <div className="absolute top-0 inset-x-8 h-[1.5px] bg-[#00ffcc]/40" />
          <div className="absolute bottom-0 inset-x-8 h-[1.5px] bg-[#00ffcc]/40" />
          <div className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide">
            <span style={{ color: '#00ffcc', textShadow: '0 0 2px #ffffff, 0 0 8px #00ffcc, 0 0 18px #00ffcc' }}>مود</span>
            <span className="opacity-30 text-cyan-300 font-light text-xs">|</span>
            <span style={{ color: '#00ffcc', textShadow: '0 0 2px #ffffff, 0 0 8px #00ffcc, 0 0 18px #00ffcc' }}>النيون</span>
          </div>
        </button>
      );

    // =========================================================================
    // ✨ IMAGE 2: 10 CREATIVE BACKGROUND FX (Text-Only with Graphic Artworks)
    // =========================================================================

    // 11 (01) Neon Waves: Flowing Multi-Frequency Glowing Magenta Silk Wave Ribbons
    case 'bg-01':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#0d020a] rounded-xl border border-[#ff007f]/50"
            style={{ boxShadow: '0 0 14px rgba(255,0,127,0.45)' }}
          />
          {/* Flowing Laser Silk Waves SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 140 36">
            <defs>
              <linearGradient id="waveGrad01" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0055" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ff00cc" stopOpacity="1" />
                <stop offset="100%" stopColor="#ff007f" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path d="M 0,28 C 35,6 70,36 140,8" fill="none" stroke="url(#waveGrad01)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #ff00cc)' }} />
            <path d="M 0,10 C 45,34 95,2 140,24" fill="none" stroke="#ff0055" strokeWidth="1.2" opacity="0.65" />
            <path d="M 0,20 C 50,28 85,8 140,16" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
          </svg>
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #ff007f, 0 0 20px #ff007f' }}>
            مود النيون
          </span>
        </button>
      );

    // 12 (02) Neon Smoke: High-Fidelity Electric Blue Volumetric Rising Fog Billows
    case 'bg-02':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#030818] rounded-xl border border-[#00e5ff]/50"
            style={{ boxShadow: '0 0 14px rgba(0,229,255,0.45)' }}
          />
          {/* Volumetric Smoke Texture */}
          <div
            className="absolute inset-x-0 bottom-0 h-[75%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 25% 100%, rgba(0,229,255,0.7) 0%, rgba(0,112,243,0.4) 50%, transparent 80%), radial-gradient(ellipse at 75% 100%, rgba(0,240,200,0.65) 0%, rgba(37,99,235,0.35) 50%, transparent 80%)',
              filter: 'blur(3.5px)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #00e5ff, 0 0 22px #00e5ff' }}>
            مود النيون
          </span>
        </button>
      );

    // 13 (03) Neon Hyper-Drive: 3D Perspective Speed Burst Laser Lines Converging
    case 'bg-03':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#09031a] rounded-xl border border-[#a855f7]/50"
            style={{ boxShadow: '0 0 14px rgba(168,85,247,0.45)' }}
          />
          {/* Hyper-Drive Speed Burst SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 140 36">
            <line x1="70" y1="18" x2="0" y2="0" stroke="#a855f7" strokeWidth="1.5" />
            <line x1="70" y1="18" x2="35" y2="0" stroke="#c084fc" strokeWidth="1" />
            <line x1="70" y1="18" x2="70" y2="0" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="70" y1="18" x2="105" y2="0" stroke="#c084fc" strokeWidth="1" />
            <line x1="70" y1="18" x2="140" y2="0" stroke="#a855f7" strokeWidth="1.5" />
            <line x1="70" y1="18" x2="0" y2="36" stroke="#a855f7" strokeWidth="1.5" />
            <line x1="70" y1="18" x2="40" y2="36" stroke="#c084fc" strokeWidth="1" />
            <line x1="70" y1="18" x2="70" y2="36" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="70" y1="18" x2="100" y2="36" stroke="#c084fc" strokeWidth="1" />
            <line x1="70" y1="18" x2="140" y2="36" stroke="#a855f7" strokeWidth="1.5" />
          </svg>
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #c084fc, 0 0 20px #a855f7' }}>
            مود النيون
          </span>
        </button>
      );

    // 14 (04) Neon Cyber Hex: Matrix Honeycomb Hexagon Wireframe Grid
    case 'bg-04':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#031208] rounded-xl border border-[#22c55e]/60"
            style={{ boxShadow: '0 0 14px rgba(34,197,94,0.45)' }}
          />
          {/* Honeycomb Hex Grid Pattern SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexGrid04" width="16" height="27.71" patternUnits="userSpaceOnUse">
                <path d="M8 0 L16 4.62 L16 13.86 L8 18.48 L0 13.86 L0 4.62 Z M8 27.71 L16 23.09 L16 13.86 L8 18.48 L0 13.86 L0 23.09 Z" fill="none" stroke="#22c55e" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexGrid04)" />
          </svg>
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #22c55e, 0 0 20px #16a34a' }}>
            مود النيون
          </span>
        </button>
      );

    // 15 (05) Neon Bokeh: Multi-Layered Glowing Bokeh Orbs with Gaussian Depth
    case 'bg-05':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#14030d] rounded-xl border border-[#f43f5e]/50"
            style={{ boxShadow: '0 0 14px rgba(244,63,94,0.45)' }}
          />
          {/* Bokeh Particle Circles */}
          <div className="absolute -left-2 -bottom-2 w-8 h-8 rounded-full bg-pink-500/40 blur-[3px] pointer-events-none" />
          <div className="absolute left-6 -top-2 w-7 h-7 rounded-full bg-rose-500/35 blur-[2.5px] pointer-events-none" />
          <div className="absolute right-3 -bottom-1 w-6 h-6 rounded-full bg-fuchsia-500/45 blur-[2px] pointer-events-none" />
          <div className="absolute right-12 top-0.5 w-4 h-4 rounded-full bg-pink-300/50 blur-[1.5px] pointer-events-none" />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #f43f5e, 0 0 20px #e11d48' }}>
            مود النيون
          </span>
        </button>
      );

    // 16 (06) Neon Scanlines: High-Density 45-Degree Cybernetic Holographic Scanlines
    case 'bg-06':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#021018] rounded-xl border border-[#06b6d4]/60"
            style={{ boxShadow: '0 0 14px rgba(6,182,212,0.45)' }}
          />
          {/* 45-degree crisp hatch scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #06b6d4 0, #06b6d4 1.5px, transparent 0, transparent 5px)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #06b6d4, 0 0 20px #0891b2' }}>
            مود النيون
          </span>
        </button>
      );

    // 17 (07) Neon Halftone: Dense Halftone Dot Matrix along Borders Fading Inward
    case 'bg-07':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#100316] rounded-xl border border-[#d946ef]/60"
            style={{ boxShadow: '0 0 14px rgba(217,70,239,0.45)' }}
          />
          {/* Halftone Dot Matrix Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-45"
            style={{
              backgroundImage: 'radial-gradient(#d946ef 1.5px, transparent 1.5px)',
              backgroundSize: '5px 5px',
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 35%, transparent 65%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 35%, transparent 65%, black 100%)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #d946ef, 0 0 20px #c026d3' }}>
            مود النيون
          </span>
        </button>
      );

    // 18 (08) Neon Flame Wave: 3D Swirling Silky Ribbon of Golden Fire & Amber Flame
    case 'bg-08':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#140801] rounded-xl border border-[#f59e0b]/60"
            style={{ boxShadow: '0 0 14px rgba(245,158,11,0.45)' }}
          />
          {/* 3D Liquid Fire Silk Ribbon SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 140 36">
            <defs>
              <linearGradient id="fireGrad08" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <path d="M 0,22 Q 40,36 75,18 T 140,12" fill="none" stroke="url(#fireGrad08)" strokeWidth="3.5" style={{ filter: 'drop-shadow(0 0 8px #f59e0b)' }} />
            <path d="M 0,14 Q 35,2 70,22 T 140,20" fill="none" stroke="#fde047" strokeWidth="1.5" opacity="0.8" />
          </svg>
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #f59e0b, 0 0 20px #ea580c' }}>
            مود النيون
          </span>
        </button>
      );

    // 19 (09) Neon Tech Prism: Diagonal Crystalline Glass Prism Shard Slash
    case 'bg-09':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#030c1c] rounded-xl border border-[#38bdf8]/60"
            style={{ boxShadow: '0 0 14px rgba(56,189,248,0.45)' }}
          />
          {/* Angled Glass Prism Shard */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(130deg, transparent 25%, rgba(56,189,248,0.4) 40%, rgba(37,99,235,0.6) 55%, transparent 70%)'
            }}
          />
          <div className="absolute inset-0 pointer-events-none border-t border-b border-sky-300/30" />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #38bdf8, 0 0 20px #2563eb' }}>
            مود النيون
          </span>
        </button>
      );

    // 20 (10) Neon Nebula: Deep Space Galactic Nebula Clouds with Stardust
    case 'bg-10':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#080518] rounded-xl border border-[#818cf8]/60"
            style={{ boxShadow: '0 0 14px rgba(129,140,248,0.45)' }}
          />
          {/* Galactic Cosmic Nebula Cloud */}
          <div
            className="absolute inset-0 pointer-events-none opacity-80"
            style={{
              background: 'radial-gradient(circle at 80% 25%, rgba(129,140,248,0.6) 0%, rgba(168,85,247,0.35) 45%, transparent 70%), radial-gradient(circle at 20% 75%, rgba(99,102,241,0.55) 0%, rgba(217,70,239,0.3) 45%, transparent 70%)',
              filter: 'blur(3px)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 8px #a5b4fc, 0 0 20px #818cf8' }}>
            مود النيون
          </span>
        </button>
      );

    default:
      return null;
  }
}
