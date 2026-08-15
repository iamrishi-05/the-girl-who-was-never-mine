import React, { useState, useEffect } from 'react';
import type { PageContent, Spread, ViewingMode, FontSize } from '../../types/book';
import { TwoPageSpread } from './TwoPageSpread';
import { SinglePageSpread } from './SinglePageSpread';

interface BookContainerProps {
  spreads: Spread[];
  pages: PageContent[];
  currentSpreadIndex: number;
  currentSpread: Spread;
  activePage: PageContent;
  fontSize: FontSize;
  animationEnabled: boolean;
  viewingMode: ViewingMode;
  isBookmarkedLeft: boolean;
  isBookmarkedRight: boolean;
  isBookmarkedMobile: boolean;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleBookmarkLeft: () => void;
  onToggleBookmarkRight: () => void;
  onToggleBookmarkMobile: () => void;
  onGoToChapter: (num: number) => void;
  onActionReadAgain: () => void;
  onActionReturnCover: () => void;
  onActionShare: () => void;
}

export const BookContainer: React.FC<BookContainerProps> = ({
  currentSpread,
  activePage,
  fontSize,
  animationEnabled,
  isBookmarkedLeft,
  isBookmarkedRight,
  isBookmarkedMobile,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onToggleBookmarkLeft,
  onToggleBookmarkRight,
  onToggleBookmarkMobile,
  onGoToChapter,
  onActionReadAgain,
  onActionReturnCover,
  onActionShare
}) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none p-4 md:p-8">
      {/* Studio Radial Background Spotlight */}
      <div className="absolute inset-0 bg-radial from-[#C5A059]/10 via-transparent to-transparent pointer-events-none filter blur-3xl opacity-50"></div>

      {/* Render 2-page spread on Desktop vs 1-page on Mobile */}
      {isMobile ? (
        <SinglePageSpread
          page={activePage}
          fontSize={fontSize}
          animationEnabled={animationEnabled}
          isBookmarked={isBookmarkedMobile}
          onToggleBookmark={onToggleBookmarkMobile}
          onPrev={onPrev}
          onNext={onNext}
          canPrev={canPrev}
          canNext={canNext}
          onGoToChapter={onGoToChapter}
          onActionReadAgain={onActionReadAgain}
          onActionReturnCover={onActionReturnCover}
          onActionShare={onActionShare}
        />
      ) : (
        <TwoPageSpread
          spread={currentSpread}
          fontSize={fontSize}
          animationEnabled={animationEnabled}
          isBookmarkedLeft={isBookmarkedLeft}
          isBookmarkedRight={isBookmarkedRight}
          onToggleBookmarkLeft={onToggleBookmarkLeft}
          onToggleBookmarkRight={onToggleBookmarkRight}
          onPrev={onPrev}
          onNext={onNext}
          canPrev={canPrev}
          canNext={canNext}
          onGoToChapter={onGoToChapter}
          onActionReadAgain={onActionReadAgain}
          onActionReturnCover={onActionReturnCover}
          onActionShare={onActionShare}
        />
      )}
    </div>
  );
};
