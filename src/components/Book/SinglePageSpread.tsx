import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PageContent, FontSize } from '../../types/book';
import { PageRenderer } from './PageRenderer';
import { BookmarkRibbon } from '../UI/BookmarkRibbon';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface SinglePageSpreadProps {
  page: PageContent;
  fontSize: FontSize;
  animationEnabled: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  onGoToChapter: (num: number) => void;
  onActionReadAgain: () => void;
  onActionReturnCover: () => void;
  onActionShare: () => void;
}

export const SinglePageSpread: React.FC<SinglePageSpreadProps> = ({
  page,
  fontSize,
  animationEnabled,
  isBookmarked,
  onToggleBookmark,
  onPrev,
  onNext,
  canPrev,
  canNext,
  onGoToChapter,
  onActionReadAgain,
  onActionReturnCover,
  onActionShare
}) => {
  return (
    <div className="relative w-full h-[82vh] max-h-[750px] my-auto flex items-center justify-center select-none px-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={page.id}
          initial={animationEnabled ? { opacity: 0, x: 20 } : false}
          animate={{ opacity: 1, x: 0 }}
          exit={animationEnabled ? { opacity: 0, x: -20 } : undefined}
          transition={{ duration: 0.25 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60 && canNext) {
              onNext();
            } else if (info.offset.x > 60 && canPrev) {
              onPrev();
            }
          }}
          className="relative w-full max-w-md h-full paper-texture rounded-md book-shadow border border-[#C5A059]/20 flex flex-col justify-between overflow-hidden"
        >
          {/* Bookmark Ribbon */}
          {page.type !== 'cover' && (
            <BookmarkRibbon
              active={isBookmarked}
              onClick={onToggleBookmark}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark page'}
            />
          )}

          {/* Mobile Header */}
          <div className="h-10 px-6 pt-4 flex items-center justify-between text-[10px] font-cinzel tracking-widest opacity-50 border-b border-stone-200/40 dark:border-stone-800/40">
            <span>{page.sectionLabel || 'THE SILENT SOUND OF TIME'}</span>
            <span>{page.chapterTitle ? `CH 0${page.chapterNumber}` : ''}</span>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 overflow-hidden relative">
            <PageRenderer
              page={page}
              fontSize={fontSize}
              onGoToChapter={onGoToChapter}
              onActionReadAgain={onActionReadAgain}
              onActionReturnCover={onActionReturnCover}
              onActionShare={onActionShare}
            />
          </div>

          {/* Mobile Footer */}
          <div className="h-10 px-6 pb-3 flex items-center justify-between text-[11px] font-cinzel tracking-widest opacity-60 border-t border-stone-200/40 dark:border-stone-800/40">
            <div>
              {canPrev && (
                <button
                  onClick={onPrev}
                  className="p-1 text-stone-600 dark:text-stone-300 hover:text-[#C5A059]"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>

            <span>{page.pageNumber > 0 ? `— ${page.pageNumber} —` : ''}</span>

            <div>
              {canNext && (
                <button
                  onClick={onNext}
                  className="p-1 text-stone-600 dark:text-stone-300 hover:text-[#C5A059]"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
