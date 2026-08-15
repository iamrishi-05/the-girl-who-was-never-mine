import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Bookmark as BookmarkIcon, 
  Search as SearchIcon, 
  Settings as SettingsIcon, 
  Grid, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize,
  Volume2,
  VolumeX,
  Heart
} from 'lucide-react';

interface ToolbarProps {
  currentChapterTitle: string;
  currentChapterNumber?: number;
  overallProgressPercent: number;
  currentSpreadIndex: number;
  totalSpreads: number;
  soundEnabled: boolean;
  fullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  onOpenTOC: () => void;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onToggleOverview: () => void;
  onToggleSound: () => void;
  onToggleFullscreen: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentChapterTitle,
  currentChapterNumber,
  overallProgressPercent,
  currentSpreadIndex,
  totalSpreads,
  soundEnabled,
  fullscreen,
  onPrev,
  onNext,
  canPrev,
  canNext,
  onOpenTOC,
  onOpenBookmarks,
  onOpenSearch,
  onOpenSettings,
  onToggleOverview,
  onToggleSound,
  onToggleFullscreen
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleActivity = () => {
      setIsVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 3500);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('keydown', handleActivity);

    timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center space-x-2 sm:space-x-3 px-4 py-2.5 bg-white/90 backdrop-blur-md border border-pink-200/80 rounded-full shadow-xl text-stone-700 select-none">
        {/* Table of Contents */}
        <button
          onClick={onOpenTOC}
          className="p-2 rounded-full hover:bg-pink-50 text-stone-600 hover:text-[#F43F5E] transition-colors"
          title="Table of Contents"
          aria-label="Table of Contents"
        >
          <BookOpen className="w-4 h-4" />
        </button>

        {/* Bookmarks Panel */}
        <button
          onClick={onOpenBookmarks}
          className="p-2 rounded-full hover:bg-pink-50 text-stone-600 hover:text-[#F43F5E] transition-colors"
          title="Bookmarks"
          aria-label="Bookmarks"
        >
          <BookmarkIcon className="w-4 h-4" />
        </button>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-full hover:bg-pink-50 text-stone-600 hover:text-[#F43F5E] transition-colors"
          title="Search Book (Cmd+F)"
          aria-label="Search Book"
        >
          <SearchIcon className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-pink-200 mx-1"></div>

        {/* Previous Spread */}
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className="p-1.5 rounded-full hover:bg-pink-50 text-stone-600 disabled:opacity-30 disabled:hover:bg-transparent hover:text-[#F43F5E] transition-colors"
          title="Previous Page (Left Arrow)"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Reading Progress Indicator */}
        <div className="px-2 text-center min-w-[130px] sm:min-w-[170px]">
          <div className="font-cinzel text-[10px] sm:text-[11px] font-bold text-[#BE123C] tracking-wider truncate flex items-center justify-center space-x-1">
            <Heart className="w-3 h-3 fill-current text-[#F43F5E]" />
            <span>{currentChapterNumber ? `CH 0${currentChapterNumber}` : currentChapterTitle}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-[10px] font-garamond text-[#0369A1] font-semibold">
            <span>{overallProgressPercent}% Read</span>
            <span>•</span>
            <span>{currentSpreadIndex + 1}/{totalSpreads}</span>
          </div>
        </div>

        {/* Next Spread */}
        <button
          onClick={onNext}
          disabled={!canNext}
          className="p-1.5 rounded-full hover:bg-pink-50 text-stone-600 disabled:opacity-30 disabled:hover:bg-transparent hover:text-[#F43F5E] transition-colors"
          title="Next Page (Right Arrow)"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-pink-200 mx-1"></div>

        {/* Overview Mode Grid */}
        <button
          onClick={onToggleOverview}
          className="p-2 rounded-full hover:bg-pink-50 text-stone-600 hover:text-[#0284C7] transition-colors"
          title="Overview Grid Mode"
          aria-label="Overview Grid Mode"
        >
          <Grid className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-full hover:bg-pink-50 transition-colors ${
            soundEnabled ? 'text-[#F43F5E]' : 'text-stone-400'
          }`}
          title={soundEnabled ? 'Page sound enabled' : 'Page sound muted'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-full hover:bg-pink-50 text-stone-600 hover:text-[#F43F5E] transition-colors"
          title="Settings"
          aria-label="Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-full hover:bg-pink-50 text-stone-600 hover:text-[#0284C7] transition-colors hidden sm:block"
          title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen Reading Mode'}
          aria-label="Toggle Fullscreen"
        >
          {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
