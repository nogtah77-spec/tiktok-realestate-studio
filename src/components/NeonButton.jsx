import React from 'react';
import { Zap } from 'lucide-react';

/**
 * Circular Cyber Neon On/Off Toggle Button
 * Minimalist, ultra-clean glowing circular switch with dual pink/cyan neon arcs
 */
export default function NeonButton({
  isActive = false,
  onClick,
  className = ''
}) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none transition-all duration-200 cursor-pointer active:scale-90 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full overflow-hidden shrink-0 shadow-md ${className}`}
      style={{
        filter: isActive ? 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.7)) drop-shadow(0 0 4px rgba(255, 42, 133, 0.5))' : 'none'
      }}
      title={isActive ? 'مود النيون مفعّل (Cyber Neon) - اضغط للإيقاف' : 'تفعيل مود النيون الداكن (Cyber Neon)'}
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#060816] rounded-full" />

      {/* Dual Split Glowing Arc Circular SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none p-0.5" viewBox="0 0 32 32" fill="none">
        {/* Top Pink Semi-Circle Arc */}
        <path
          d="M 6,16 A 10,10 0 0,1 26,16"
          stroke="#ff2a85"
          strokeWidth="2.2"
          strokeLinecap="round"
          style={{ filter: isActive ? 'drop-shadow(0 0 3px #ff2a85)' : 'none' }}
        />
        {isActive && (
          <path d="M 8,16 A 8,8 0 0,1 24,16" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
        )}

        {/* Bottom Cyan Semi-Circle Arc */}
        <path
          d="M 26,16 A 10,10 0 0,1 6,16"
          stroke="#00e5ff"
          strokeWidth="2.2"
          strokeLinecap="round"
          style={{ filter: isActive ? 'drop-shadow(0 0 3px #00e5ff)' : 'none' }}
        />
        {isActive && (
          <path d="M 24,16 A 8,8 0 0,1 8,16" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
        )}
      </svg>

      {/* Center Icon */}
      <Zap
        className={`w-3.5 h-3.5 relative z-10 transition-all duration-200 ${
          isActive ? 'text-cyan-300 scale-110 fill-cyan-400' : 'text-slate-400 opacity-60'
        }`}
        style={
          isActive
            ? { filter: 'drop-shadow(0 0 4px #00e5ff)' }
            : {}
        }
      />
    </button>
  );
}
