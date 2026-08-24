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
    ? 'px-3 py-1 text-[10px] min-w-[105px] h-7.5'
    : size === 'lg'
      ? 'px-5 py-2 text-xs min-w-[130px] h-10'
      : 'px-3.5 py-1.5 text-[11px] min-w-[115px] h-8';

  const baseButtonProps = {
    onClick: onClick,
    className: `relative inline-flex items-center justify-center font-black select-none transition-all duration-200 cursor-pointer active:scale-95 ${sizeClasses} ${className}`,
    style: {
      opacity: opacityVal,
      filter: isActive ? 'drop-shadow(0 0 10px rgba(0,229,255,0.4))' : 'none'
    },
    title: `زر مود النيون - ${currentStyle.arabicName}`
  };

  // Render specific design (1 to 20)
  switch (styleId) {
    // ==========================================
    // 🌟 GROUP 1: 10 FRAME & STRUCTURAL DESIGNS
    // ==========================================
    
    // 01 Neon Dark: Pill with pink top & cyan bottom split arcs + vertical divider
    case 'frame-01':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-[#070a14] rounded-full" />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: '1.5px solid transparent',
              borderTopColor: '#ff2d95',
              borderRightColor: '#ff2d95',
              borderBottomColor: '#00e5ff',
              borderLeftColor: '#00e5ff',
              boxShadow: '0 0 10px rgba(255,45,149,0.35), inset 0 0 8px rgba(0,229,255,0.2)'
            }}
          />
          <div className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide">
            <span style={{ color: '#00e5ff', textShadow: '0 0 6px #00e5ff' }}>مود</span>
            <span className="opacity-40 text-slate-400 font-light">|</span>
            <span style={{ color: '#ff2d95', textShadow: '0 0 6px #ff2d95' }}>النيون</span>
          </div>
        </button>
      );

    // 02 Neon Glow: Smooth stadium pill with continuous vibrant Magenta-to-Cyan laser halo
    case 'frame-02':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-[#050714] rounded-full" />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #ff00e6 0%, #00e5ff 100%)',
              padding: '1.5px'
            }}
          >
            <div className="w-full h-full bg-[#050714] rounded-full" />
          </div>
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: '0 0 14px rgba(255,0,230,0.5), 0 0 20px rgba(0,229,255,0.4), inset 0 0 10px rgba(255,0,230,0.2)'
            }}
          />
          <div className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide">
            <span style={{ color: '#00e5ff', textShadow: '0 0 8px #00e5ff' }}>مود</span>
            <span className="opacity-40 text-slate-400 font-light">|</span>
            <span style={{ color: '#ff00e6', textShadow: '0 0 8px #ff00e6' }}>النيون</span>
          </div>
        </button>
      );

    // 03 Neon Cyber: Chamfered octagonal cyber frame with notches
    case 'frame-03':
      return (
        <button
          {...baseButtonProps}
          style={{
            ...baseButtonProps.style,
            clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)'
          }}
          className={`${baseButtonProps.className} bg-[#060914] border-t-2 border-r-2 border-[#00f0c8] border-b-2 border-l-2 border-[#ff2a85]`}
        >
          <div className="absolute inset-x-2 top-0 h-[1px] bg-cyan-400 opacity-60" />
          <div className="absolute inset-x-2 bottom-0 h-[1px] bg-pink-500 opacity-60" />
          <div className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide">
            <span style={{ color: '#00f0c8', textShadow: '0 0 8px #00f0c8' }}>مود</span>
            <span className="opacity-40 text-cyan-400 font-light">|</span>
            <span style={{ color: '#00f0c8', textShadow: '0 0 8px #00f0c8' }}>النيون</span>
          </div>
        </button>
      );

    // 04 Neon Soft: Soft rounded rectangle with deep violet/lavender uniform halo
    case 'frame-04':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-2xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#0b0817] rounded-2xl border-1.5 border-[#8b5cf6]"
            style={{
              boxShadow: '0 0 14px rgba(139,92,246,0.6), inset 0 0 8px rgba(139,92,246,0.3)'
            }}
          />
          <div className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide">
            <span style={{ color: '#c084fc', textShadow: '0 0 8px #c084fc' }}>مود</span>
            <span className="opacity-40 text-purple-400 font-light">|</span>
            <span style={{ color: '#c084fc', textShadow: '0 0 8px #c084fc' }}>النيون</span>
          </div>
        </button>
      );

    // 05 Neon Gradient: Smooth 3-color linear gradient (Coral -> Magenta -> Cyan)
    case 'frame-05':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-[#0a0914] rounded-full" />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, #ff5722 0%, #ff007f 50%, #00e5ff 100%)',
              padding: '1.5px',
              boxShadow: '0 0 12px rgba(255,87,34,0.4), 0 0 16px rgba(0,229,255,0.4)'
            }}
          >
            <div className="w-full h-full bg-[#0a0914] rounded-full" />
          </div>
          <div className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide">
            <span style={{ color: '#ff77a9', textShadow: '0 0 8px rgba(255,0,127,0.7)' }}>مود</span>
            <span className="opacity-40 text-slate-400 font-light">|</span>
            <span style={{ color: '#00e5ff', textShadow: '0 0 8px rgba(0,229,255,0.7)' }}>النيون</span>
          </div>
        </button>
      );

    // 06 Neon Glass: Shiny 3D acrylic/glass capsule with curved specular highlight
    case 'frame-06':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-[#060c1d] rounded-full border border-cyan-400/40"
            style={{
              boxShadow: '0 0 12px rgba(0,210,255,0.5), inset 0 0 10px rgba(123,0,255,0.4)'
            }}
          />
          <div
            className="absolute top-0 inset-x-1.5 h-[48%] rounded-t-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 80%, transparent 100%)'
            }}
          />
          <div className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide">
            <span style={{ color: '#00e5ff', textShadow: '0 0 8px #00e5ff' }}>مود</span>
            <span className="opacity-40 text-cyan-300 font-light">|</span>
            <span style={{ color: '#00e5ff', textShadow: '0 0 8px #00e5ff' }}>النيون</span>
          </div>
        </button>
      );

    // 07 Neon Outline: Concentric double-border pill (Inner Cyan, Outer Magenta)
    case 'frame-07':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden p-[3px]`}>
          <div className="absolute inset-0 bg-[#070914] rounded-full border border-[#e11d48]/70"
            style={{ boxShadow: '0 0 10px rgba(225,29,72,0.4)' }}
          />
          <div className="relative w-full h-full rounded-full border border-[#00f0c8] flex items-center justify-center px-2 py-0.5"
            style={{ boxShadow: '0 0 8px rgba(0,240,200,0.5)' }}
          >
            <div className="flex items-center justify-center gap-1.5 tracking-wide">
              <span style={{ color: '#00f0c8', textShadow: '0 0 6px #00f0c8' }}>مود</span>
              <span className="opacity-40 text-cyan-400 font-light">|</span>
              <span style={{ color: '#00f0c8', textShadow: '0 0 6px #00f0c8' }}>النيون</span>
            </div>
          </div>
        </button>
      );

    // 08 Neon Pulse: Hybrid dashed border on right + solid glow circular capsule on left
    case 'frame-08':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-[#0d071a] rounded-full" />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: '1.5px dashed #8b5cf6',
              boxShadow: '0 0 10px rgba(139,92,246,0.4)'
            }}
          />
          <div
            className="absolute left-1 top-1 bottom-1 w-6 rounded-full bg-pink-500/20 border border-pink-400"
            style={{ boxShadow: '0 0 8px rgba(244,63,94,0.6)' }}
          />
          <div className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide pr-2">
            <span style={{ color: '#d946ef', textShadow: '0 0 8px #d946ef' }}>مود</span>
            <span className="opacity-40 text-purple-400 font-light">|</span>
            <span style={{ color: '#d946ef', textShadow: '0 0 8px #d946ef' }}>النيون</span>
          </div>
        </button>
      );

    // 09 Neon 3D: Beveled 3D embossed capsule with metallic reflection & cyan/pink rims
    case 'frame-09':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-full overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#141624] via-[#090b14] to-[#04050a] rounded-full border border-slate-700/60"
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.8), 0 0 12px rgba(255,0,127,0.4), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 6px rgba(0,229,255,0.5)'
            }}
          />
          <div className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide">
            <span style={{ color: '#ff2d95', textShadow: '0 0 8px #ff2d95' }}>مود</span>
            <span className="opacity-40 text-slate-400 font-light">|</span>
            <span style={{ color: '#00e5ff', textShadow: '0 0 8px #00e5ff' }}>النيون</span>
          </div>
        </button>
      );

    // 10 Neon Tech: Futuristic HUD cyber bracket frame with corner notches & telemetry dots
    case 'frame-10':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-lg overflow-hidden`}>
          <div className="absolute inset-0 bg-[#030c14] rounded-lg border border-[#00ffcc]/60"
            style={{ boxShadow: '0 0 10px rgba(0,255,204,0.4)' }}
          />
          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t-2 border-l-2 border-[#00ffcc]" />
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t-2 border-r-2 border-[#00ffcc]" />
          <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b-2 border-l-2 border-[#00ffcc]" />
          <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b-2 border-r-2 border-[#00ffcc]" />
          <div className="absolute bottom-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/50 to-transparent" />
          <div className="relative z-10 flex items-center justify-center gap-1.5 tracking-wide">
            <span style={{ color: '#00ffcc', textShadow: '0 0 8px #00ffcc' }}>مود</span>
            <span className="opacity-40 text-cyan-300 font-light">|</span>
            <span style={{ color: '#00ffcc', textShadow: '0 0 8px #00ffcc' }}>النيون</span>
          </div>
        </button>
      );

    // ===============================================
    // ✨ GROUP 2: 10 CREATIVE BACKGROUND & ATMOSPHERE
    // ===============================================

    // 11 (01) Neon Waves: Glowing criss-cross pink/magenta sine light ribbons in background
    case 'bg-01':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#12050f] rounded-xl border border-pink-500/40"
            style={{ boxShadow: '0 0 12px rgba(255,45,149,0.35)' }}
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-75" preserveAspectRatio="none" viewBox="0 0 120 32">
            <path d="M0,24 C30,8 60,32 120,12" fill="none" stroke="#ff2d95" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 4px #ff2d95)' }} />
            <path d="M0,8 C40,28 80,4 120,20" fill="none" stroke="#e11d48" strokeWidth="1" opacity="0.6" />
          </svg>
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#ff4d94', textShadow: '0 0 2px #ffffff, 0 0 10px #ff2d95, 0 0 18px rgba(255,45,149,0.8)' }}>
            مود النيون
          </span>
        </button>
      );

    // 12 (02) Neon Smoke: Electric blue mist / smoke rising from the bottom edge
    case 'bg-02':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#050c1e] rounded-xl border border-cyan-400/40"
            style={{ boxShadow: '0 0 12px rgba(0,229,255,0.4)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[65%] pointer-events-none opacity-80"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(0,229,255,0.6) 0%, rgba(0,112,243,0.35) 45%, transparent 85%)',
              filter: 'blur(3px)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#00e5ff', textShadow: '0 0 2px #ffffff, 0 0 10px #00e5ff, 0 0 20px rgba(0,229,255,0.85)' }}>
            مود النيون
          </span>
        </button>
      );

    // 13 (03) Neon Hyper-Drive: Radiating perspective speed burst laser lines
    case 'bg-03':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#100824] rounded-xl border border-purple-500/40"
            style={{ boxShadow: '0 0 12px rgba(168,85,247,0.4)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(168,85,247,0.5) 0deg 4deg, transparent 4deg 18deg)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#c084fc', textShadow: '0 0 2px #ffffff, 0 0 10px #a855f7, 0 0 18px rgba(168,85,247,0.8)' }}>
            مود النيون
          </span>
        </button>
      );

    // 14 (04) Neon Cyber Hex: Matrix honeycomb hexagon grid
    case 'bg-04':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#05160d] rounded-xl border border-emerald-400/50"
            style={{ boxShadow: '0 0 12px rgba(34,197,94,0.4)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, #22c55e 10%, transparent 11%)',
              backgroundSize: '8px 8px'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#4ade80', textShadow: '0 0 2px #ffffff, 0 0 10px #22c55e, 0 0 18px rgba(34,197,94,0.8)' }}>
            مود النيون
          </span>
        </button>
      );

    // 15 (05) Neon Bokeh: Soft glowing floating magenta bokeh orbs
    case 'bg-05':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#1a0614] rounded-xl border border-rose-500/40"
            style={{ boxShadow: '0 0 12px rgba(244,63,94,0.4)' }}
          />
          <div className="absolute -left-1 -bottom-1 w-7 h-7 rounded-full bg-rose-500/30 blur-[4px] pointer-events-none" />
          <div className="absolute right-2 -top-1 w-6 h-6 rounded-full bg-pink-400/30 blur-[3px] pointer-events-none" />
          <div className="absolute right-6 bottom-0 w-4 h-4 rounded-full bg-fuchsia-500/40 blur-[2px] pointer-events-none" />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#fb7185', textShadow: '0 0 2px #ffffff, 0 0 10px #f43f5e, 0 0 18px rgba(244,63,94,0.8)' }}>
            مود النيون
          </span>
        </button>
      );

    // 16 (06) Neon Scanlines: 45-degree diagonal cyber scanlines texture
    case 'bg-06':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#041720] rounded-xl border border-cyan-400/40"
            style={{ boxShadow: '0 0 12px rgba(6,182,212,0.4)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #06b6d4 0, #06b6d4 1.5px, transparent 0, transparent 6px)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#22d3ee', textShadow: '0 0 2px #ffffff, 0 0 10px #06b6d4, 0 0 18px rgba(6,182,212,0.8)' }}>
            مود النيون
          </span>
        </button>
      );

    // 17 (07) Neon Halftone: Dot matrix along the edges fading inward
    case 'bg-07':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#17061d] rounded-xl border border-fuchsia-500/40"
            style={{ boxShadow: '0 0 12px rgba(217,70,239,0.4)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'radial-gradient(#d946ef 1.5px, transparent 1.5px)',
              backgroundSize: '6px 6px',
              maskImage: 'linear-gradient(to bottom, black, transparent 30%, transparent 70%, black)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#e879f9', textShadow: '0 0 2px #ffffff, 0 0 10px #d946ef, 0 0 18px rgba(217,70,239,0.8)' }}>
            مود النيون
          </span>
        </button>
      );

    // 18 (08) Neon Flame Wave: Fiery gold-orange energy light ribbon
    case 'bg-08':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#1a0e05] rounded-xl border border-amber-500/40"
            style={{ boxShadow: '0 0 12px rgba(245,158,11,0.4)' }}
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" preserveAspectRatio="none" viewBox="0 0 120 32">
            <path d="M0,18 Q30,30 60,16 T120,12" fill="none" stroke="#f59e0b" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 6px #ea580c)' }} />
            <path d="M0,12 Q40,4 70,20 T120,18" fill="none" stroke="#ea580c" strokeWidth="1.2" opacity="0.6" />
          </svg>
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#fbbf24', textShadow: '0 0 2px #ffffff, 0 0 10px #f59e0b, 0 0 18px rgba(245,158,11,0.8)' }}>
            مود النيون
          </span>
        </button>
      );

    // 19 (09) Neon Tech Prism: Diagonal crystalline polygon light beam shard
    case 'bg-09':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#061328] rounded-xl border border-sky-400/40"
            style={{ boxShadow: '0 0 12px rgba(56,189,248,0.4)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(125deg, transparent 30%, rgba(56,189,248,0.3) 45%, rgba(37,99,235,0.45) 55%, transparent 70%)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#38bdf8', textShadow: '0 0 2px #ffffff, 0 0 10px #38bdf8, 0 0 18px rgba(56,189,248,0.8)' }}>
            مود النيون
          </span>
        </button>
      );

    // 20 (10) Neon Nebula: Deep violet cosmic space nebula cloud
    case 'bg-10':
      return (
        <button {...baseButtonProps} className={`${baseButtonProps.className} rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[#0e0b24] rounded-xl border border-indigo-400/40"
            style={{ boxShadow: '0 0 12px rgba(129,140,248,0.4)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-65"
            style={{
              background: 'radial-gradient(circle at 75% 30%, rgba(129,140,248,0.45) 0%, transparent 60%), radial-gradient(circle at 25% 70%, rgba(99,102,241,0.4) 0%, transparent 60%)',
              filter: 'blur(4px)'
            }}
          />
          <span className="relative z-10 tracking-wide font-black" style={{ color: '#a5b4fc', textShadow: '0 0 2px #ffffff, 0 0 10px #818cf8, 0 0 18px rgba(129,140,248,0.8)' }}>
            مود النيون
          </span>
        </button>
      );

    default:
      return null;
  }
}
