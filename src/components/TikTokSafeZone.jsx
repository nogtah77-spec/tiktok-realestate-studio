import React from 'react';
import { Heart, MessageCircle, Bookmark, Share2, Music2, Search, Plus } from 'lucide-react';

export default function TikTokSafeZone({ opacity = 85, isVisible = true }) {
  if (!isVisible) return null;

  return (
    <div
      className="no-export absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 transition-opacity duration-200 select-none"
      style={{ opacity: opacity / 100 }}
    >
      {/* Top TikTok Header */}
      <div className="flex items-center justify-between pt-3 px-2 text-white/90 drop-shadow-md text-xs font-semibold">
        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[11px]">LIVE</span>
        </div>

        <div className="flex items-center gap-4 text-sm font-bold tracking-wide">
          <span className="text-white/60 hover:text-white">متابعة</span>
          <span className="text-white border-b-2 border-white pb-0.5">لك (For You)</span>
        </div>

        <div className="w-7 h-7 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10">
          <Search className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Warning indicator pill */}
      <div className="self-center bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg border border-amber-300/40">
        ⚠️ منطقة واجهة تيك توك التفاعلية (للتأكد من وضوح نصوصك)
      </div>

      {/* Bottom Area: Creator info on left/bottom & Engagement buttons on right */}
      <div className="flex items-end justify-between pb-6 gap-3">
        {/* Creator Handle & Caption Safe Area */}
        <div className="flex-1 max-w-[70%] space-y-1.5 text-right text-white drop-shadow-md">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold">@alamoudi.realestate</span>
            <span className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white">✓</span>
          </div>
          <p className="text-[11px] text-white/90 line-clamp-2 leading-relaxed">
            استوديو أغلفة تيك توك الفاخرة | تغطية حصرية لأرقى الفلل والقصور بالرياض 🏡✨
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-white/75 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full w-fit">
            <Music2 className="w-3 h-3 animate-spin" />
            <span>الصوت الأصلي - العمودي للخدمات العقارية</span>
          </div>
        </div>

        {/* Action Buttons Column on Right */}
        <div className="flex flex-col items-center gap-3.5 text-white">
          {/* Avatar */}
          <div className="relative mb-1">
            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-lg">
              <span className="text-amber-400 font-extrabold text-xs">العمودي</span>
            </div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px] shadow-sm">
              <Plus className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Like */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 drop-shadow">18.4K</span>
          </div>

          {/* Comment */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 drop-shadow">420</span>
          </div>

          {/* Bookmark */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 drop-shadow">2.1K</span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Share2 className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 drop-shadow">980</span>
          </div>

          {/* Sound Disc */}
          <div className="w-7 h-7 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center animate-spin">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
