import React from 'react';

/**
 * Dark Neon Mode Toggle Button
 * Compact, lightweight, pixel-perfect alignment with dual glowing pink/cyan arcs
 */
export default function NeonButton({
  isActive = false,
  onClick,
  className = ''
}) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center font-black select-none transition-all duration-200 cursor-pointer active:scale-95 px-3 h-7 min-w-[96px] text-[10.5px] rounded-full overflow-hidden shrink-0 ${className}`}
      style={{
        filter: isActive ? 'drop-shadow(0 0 10px rgba(0,229,255,0.5))' : 'none'
      }}
      title="تبديل مود النيون الداكن (Dark Neon)"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#060816] rounded-full" />

      {/* Dual Split Glowing Arc SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 28" fill="none" preserveAspectRatio="none">
        {/* Top Pink Arc with Glow & Core */}
        <path
          d="M 14,2 L 86,2 A 12,12 0 0,1 98,14"
          stroke="#ff2a85"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 4px #ff2a85)' }}
        />
        <path d="M 18,2 L 82,2" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.9" />

        {/* Bottom Cyan Arc with Glow & Core */}
        <path
          d="M 86,26 L 14,26 A 12,12 0 0,1 2,14"
          stroke="#00e5ff"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 4px #00e5ff)' }}
        />
        <path d="M 82,26 L 18,26" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.9" />
      </svg>

      {/* Text with dual neon glow */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 font-black tracking-wider leading-none">
        <span style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 6px #00e5ff, 0 0 12px #00e5ff' }}>مود</span>
        <span className="opacity-30 text-white font-light text-[10px]">|</span>
        <span style={{ color: '#ffffff', textShadow: '0 0 2px #ffffff, 0 0 6px #ff2a85, 0 0 12px #ff2a85' }}>النيون</span>
      </div>
    </button>
  );
}
