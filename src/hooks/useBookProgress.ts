import { useState, useEffect, useMemo, useCallback } from 'react';
import type { PageContent, Spread } from '../types/book';
import { storage, type StoredProgress } from '../utils/storage';
import { paperSound } from '../utils/sound';


export function useBookProgress(
  spreads: Spread[],
  pages: PageContent[],
  soundEnabled: boolean
) {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState<number>(0);
  const [savedProgress, setSavedProgress] = useState<StoredProgress | null>(null);

  // Check saved position on initial load
  useEffect(() => {
    const saved = storage.getProgress();
    if (saved && saved.spreadIndex > 0 && saved.spreadIndex < spreads.length) {
      setSavedProgress(saved);
    }
  }, [spreads.length]);

  const currentSpread = useMemo(() => {
    return spreads[currentSpreadIndex] || spreads[0];
  }, [spreads, currentSpreadIndex]);

  // Determine current active page & chapter info
  const activePage = useMemo(() => {
    return currentSpread.rightPage || currentSpread.leftPage || pages[0];
  }, [currentSpread, pages]);

  const currentChapterTitle = activePage.chapterTitle || activePage.sectionLabel || 'Introduction';
  const currentChapterNumber = activePage.chapterNumber;

  // Calculate Overall Progress %
  const overallProgressPercent = useMemo(() => {
    if (spreads.length <= 1) return 0;
    return Math.round((currentSpreadIndex / (spreads.length - 1)) * 100);
  }, [currentSpreadIndex, spreads.length]);

  // Calculate Chapter-specific progress %
  const chapterProgressPercent = useMemo(() => {
    if (!currentChapterNumber) return overallProgressPercent;
    const chapterPages = pages.filter(p => p.chapterNumber === currentChapterNumber);
    if (chapterPages.length === 0) return 0;
    const activeChapterPageIndex = chapterPages.findIndex(p => p.id === activePage.id);
    if (activeChapterPageIndex === -1) return 0;
    return Math.round(((activeChapterPageIndex + 1) / chapterPages.length) * 100);
  }, [currentChapterNumber, activePage.id, pages, overallProgressPercent]);

  // Save location to LocalStorage whenever spread changes
  useEffect(() => {
    if (currentSpreadIndex > 0) {
      storage.setProgress({
        spreadIndex: currentSpreadIndex,
        pageIndex: activePage.pageNumber,
        chapterTitle: currentChapterTitle,
        chapterNumber: currentChapterNumber
      });
    }
  }, [currentSpreadIndex, activePage.pageNumber, currentChapterTitle, currentChapterNumber]);

  // Navigation handlers
  const goToSpread = useCallback((targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < spreads.length) {
      setCurrentSpreadIndex(targetIndex);
      paperSound.playPageTurnSound(soundEnabled);
    }
  }, [spreads.length, soundEnabled]);

  const nextSpread = useCallback(() => {
    if (currentSpreadIndex < spreads.length - 1) {
      goToSpread(currentSpreadIndex + 1);
    }
  }, [currentSpreadIndex, spreads.length, goToSpread]);

  const prevSpread = useCallback(() => {
    if (currentSpreadIndex > 0) {
      goToSpread(currentSpreadIndex - 1);
    }
  }, [currentSpreadIndex, goToSpread]);

  const goToPageNumber = useCallback((pageNumber: number) => {
    const targetPage = pages.find(p => p.pageNumber === pageNumber);
    if (targetPage) {
      goToSpread(targetPage.spreadIndex);
    }
  }, [pages, goToSpread]);

  const goToChapter = useCallback((chapterNumber: number) => {
    const targetPage = pages.find(p => p.chapterNumber === chapterNumber);
    if (targetPage) {
      goToSpread(targetPage.spreadIndex);
    }
  }, [pages, goToSpread]);

  const dismissSavedProgress = () => {
    setSavedProgress(null);
  };

  const resumeSavedProgress = () => {
    if (savedProgress) {
      goToSpread(savedProgress.spreadIndex);
      setSavedProgress(null);
    }
  };

  return {
    currentSpreadIndex,
    currentSpread,
    activePage,
    totalSpreads: spreads.length,
    currentChapterTitle,
    currentChapterNumber,
    chapterProgressPercent,
    overallProgressPercent,
    savedProgress,
    nextSpread,
    prevSpread,
    goToSpread,
    goToPageNumber,
    goToChapter,
    dismissSavedProgress,
    resumeSavedProgress
  };
}
