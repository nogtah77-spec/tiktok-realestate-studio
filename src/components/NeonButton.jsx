import React from 'react';

/**
 * Dark Neon Mode Toggle Button
 * Compact, lightweight, pixel-perfect alignment with subtle glowing pink/cyan arcs
 */
export default function NeonButton({
  isActive = false,
  onClick,
  className = ''
}) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center font-black select-none transition-all duration-200 cursor-pointer active:scale-95 px-2.5 h-[25px] min-w-[84px] text-[9.5px] rounded-full overflow-hidden shrink-0 ${className}`}
      style={{
        filter: isActive ? 'drop-shadow(0 0 8px rgba(0,229,255,0.4))' : 'none'
      }}
      title="تبديل مود النيون الداكن (Dark Neon)"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#060816] rounded-full" />

      {/* Dual Split Glowing Arc SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 84 25" fill="none" preserveAspectRatio="none">
        {/* Top Pink Arc with Soft Glow & Core */}
        <path
          d="M 12,2 L 72,2 A 10.5,10.5 0 0,1 82.5,12.5"
          stroke="#ff2a85"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 3px #ff2a85)' }}
        />
        <path d="M 16,2 L 68,2" stroke="#ffffff" strokeWidth="0.7" strokeLinecap="round" opacity="0.85" />

        {/* Bottom Cyan Arc with Soft Glow & Core */}
        <path
          d="M 72,23 L 12,23 A 10.5,10.5 0 0,1 1.5,12.5"
          stroke="#00e5ff"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 3px #00e5ff)' }}
        />
        <path d="M 68,23 L 16,23" stroke="#ffffff" strokeWidth="0.7" strokeLinecap="round" opacity="0.85" />
      </svg>

      {/* Text with soft, subtle neon glow */}
      <div className="relative z-10 flex items-center justify-center gap-1 font-bold tracking-wider leading-none">
        <span style={{ color: '#ffffff', textShadow: '0 0 1px #ffffff, 0 0 3px rgba(0, 229, 255, 0.7)' }}>مود</span>
        <span className="opacity-30 text-white font-light text-[9px]">|</span>
        <span style={{ color: '#ffffff', textShadow: '0 0 1px #ffffff, 0 0 3px rgba(255, 42, 133, 0.7)' }}>النيون</span>
      </div>
    </button>
  );
}
