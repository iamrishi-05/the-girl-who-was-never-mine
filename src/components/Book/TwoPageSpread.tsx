import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Spread, FontSize } from '../../types/book';
import { SILENT_SOUND_OF_TIME_BOOK } from '../../content/book';
import { PageRenderer } from './PageRenderer';
import { BookmarkRibbon } from '../UI/BookmarkRibbon';
import { ChevronLeft, ChevronRight } from 'lucide-react';



interface TwoPageSpreadProps {
  spread: Spread;
  fontSize: FontSize;
  animationEnabled: boolean;
  isBookmarkedLeft: boolean;
  isBookmarkedRight: boolean;
  onToggleBookmarkLeft: () => void;
  onToggleBookmarkRight: () => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  onGoToChapter: (num: number) => void;
  onActionReadAgain: () => void;
  onActionReturnCover: () => void;
  onActionShare: () => void;
}

export const TwoPageSpread: React.FC<TwoPageSpreadProps> = ({
  spread,
  fontSize,
  animationEnabled,
  isBookmarkedLeft,
  isBookmarkedRight,
  onToggleBookmarkLeft,
  onToggleBookmarkRight,
  onPrev,
  onNext,
  canPrev,
  canNext,
  onGoToChapter,
  onActionReadAgain,
  onActionReturnCover,
  onActionShare
}) => {
  const { leftPage, rightPage } = spread;

  return (
    <div className="relative w-full max-w-6xl h-[78vh] min-h-[580px] max-h-[780px] my-auto flex items-center justify-center select-none book-perspective">
      {/* Background Physical Page Stack Shadows */}
      <div className="absolute inset-x-2 -bottom-3 h-6 bg-black/40 rounded-b-xl filter blur-lg"></div>
      <div className="absolute inset-x-4 -bottom-1.5 h-3 bg-stone-900/60 rounded-b-md"></div>

      {/* Main Two-Page Book Spread Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={spread.index}
          initial={animationEnabled ? { opacity: 0, scale: 0.98 } : false}
          animate={{ opacity: 1, scale: 1 }}
          exit={animationEnabled ? { opacity: 0, scale: 0.98 } : undefined}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full h-full flex rounded-md overflow-hidden book-shadow border border-[#C5A059]/20"
        >
          {/* =---------------------------------------------------- */}
          {/* LEFT PAGE */}
          {/* =---------------------------------------------------- */}
          <div className="relative w-1/2 h-full paper-texture page-left-shadow flex flex-col justify-between border-r border-stone-300/40 dark:border-stone-800/40">
            {/* Left Spine Fold Shadow */}
            <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-black/15 via-black/5 to-transparent pointer-events-none z-20"></div>

            {/* Left Bookmark Ribbon */}
            {leftPage && leftPage.type !== 'cover' && (
              <BookmarkRibbon
                active={isBookmarkedLeft}
                onClick={onToggleBookmarkLeft}
                title={isBookmarkedLeft ? 'Remove bookmark' : 'Bookmark left page'}
              />
            )}

            {/* Left Header */}
            <div className="h-12 px-10 pt-6 flex items-center justify-between text-[11px] font-cinzel tracking-widest opacity-50 border-b border-stone-200/40 dark:border-stone-800/40">
              <span>{leftPage?.sectionLabel || 'THE SILENT SOUND OF TIME'}</span>
              <span>{leftPage?.chapterTitle ? `CH 0${leftPage.chapterNumber}` : ''}</span>
            </div>

            {/* Left Body Content */}
            <div className="flex-1 overflow-hidden relative">
              <PageRenderer
                page={leftPage}
                fontSize={fontSize}
                onGoToChapter={onGoToChapter}
                onActionReadAgain={onActionReadAgain}
                onActionReturnCover={onActionReturnCover}
                onActionShare={onActionShare}
              />
            </div>

            {/* Left Footer (Page Number) */}
            <div className="h-10 px-10 pb-4 flex items-center justify-start text-xs font-cinzel tracking-widest opacity-60">
              {leftPage && leftPage.pageNumber > 0 ? (
                <span>— {leftPage.pageNumber} —</span>
              ) : null}
            </div>

            {/* Left Navigation Click Area */}
            {canPrev && (
              <button
                onClick={onPrev}
                className="absolute inset-y-0 left-0 w-16 group flex items-center justify-start pl-3 z-30 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-black/10 to-transparent"
                title="Previous page"
              >
                <div className="w-9 h-9 rounded-full bg-stone-900/80 text-stone-100 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              </button>
            )}
          </div>

          {/* =---------------------------------------------------- */}
          {/* CENTER SPINE BINDING */}
          {/* =---------------------------------------------------- */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 z-20 pointer-events-none bg-gradient-to-r from-black/25 via-black/10 to-black/25 border-x border-black/10"></div>

          {/* =---------------------------------------------------- */}
          {/* RIGHT PAGE */}
          {/* =---------------------------------------------------- */}
          <div className="relative w-1/2 h-full paper-texture page-right-shadow flex flex-col justify-between border-l border-stone-300/40 dark:border-stone-800/40">
            {/* Right Spine Fold Shadow */}
            <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none z-20"></div>

            {/* Right Bookmark Ribbon */}
            {rightPage && rightPage.type !== 'cover' && (
              <BookmarkRibbon
                active={isBookmarkedRight}
                onClick={onToggleBookmarkRight}
                title={isBookmarkedRight ? 'Remove bookmark' : 'Bookmark right page'}
              />
            )}

            {/* Right Header */}
            <div className="h-12 px-10 pt-6 flex items-center justify-between text-[11px] font-cinzel tracking-widest opacity-50 border-b border-stone-200/40 dark:border-stone-800/40">
              <span>{rightPage?.chapterTitle || rightPage?.sectionLabel || ''}</span>
              <span>{SILENT_SOUND_OF_TIME_BOOK.author.toUpperCase()}</span>
            </div>

            {/* Right Body Content */}
            <div className="flex-1 overflow-hidden relative">
              <PageRenderer
                page={rightPage}
                fontSize={fontSize}
                onGoToChapter={onGoToChapter}
                onActionReadAgain={onActionReadAgain}
                onActionReturnCover={onActionReturnCover}
                onActionShare={onActionShare}
              />
            </div>

            {/* Right Footer (Page Number) */}
            <div className="h-10 px-10 pb-4 flex items-center justify-end text-xs font-cinzel tracking-widest opacity-60">
              {rightPage && rightPage.pageNumber > 0 ? (
                <span>— {rightPage.pageNumber} —</span>
              ) : null}
            </div>

            {/* Right Navigation Click Area */}
            {canNext && (
              <button
                onClick={onNext}
                className="absolute inset-y-0 right-0 w-16 group flex items-center justify-end pr-3 z-30 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-l from-black/10 to-transparent"
                title="Next page"
              >
                <div className="w-9 h-9 rounded-full bg-stone-900/80 text-stone-100 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
