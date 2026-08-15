import { useState, useMemo, useCallback } from 'react';
import { SILENT_SOUND_OF_TIME_BOOK } from './content/book';
import { buildBookPages, buildBookSpreads } from './utils/paginator';
import { useReaderSettings } from './hooks/useReaderSettings';
import { useBookmarks } from './hooks/useBookmarks';
import { useBookProgress } from './hooks/useBookProgress';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { BookLanding } from './components/Book/BookLanding';
import { BookContainer } from './components/Book/BookContainer';
import { Toolbar } from './components/Navigation/Toolbar';
import { WelcomeBackModal } from './components/Navigation/WelcomeBackModal';
import { OverviewGrid } from './components/Navigation/OverviewGrid';
import { TableOfContents } from './components/Modals/TableOfContents';
import { BookmarksPanel } from './components/Modals/BookmarksPanel';
import { SearchModal } from './components/Modals/SearchModal';
import { SettingsModal } from './components/Modals/SettingsModal';

export function App() {
  const pages = useMemo(() => buildBookPages(SILENT_SOUND_OF_TIME_BOOK), []);
  const spreads = useMemo(() => buildBookSpreads(pages), [pages]);

  const [viewState, setViewState] = useState<'landing' | 'read' | 'overview'>('landing');

  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const {
    settings,
    setTheme,
    setFontSize,
    toggleSound,
    toggleAnimation,
    toggleFullscreen
  } = useReaderSettings();

  const {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark
  } = useBookmarks();

  const {
    currentSpreadIndex,
    currentSpread,
    activePage,
    totalSpreads,
    currentChapterTitle,
    currentChapterNumber,
    overallProgressPercent,
    savedProgress,
    nextSpread,
    prevSpread,
    goToSpread,
    goToChapter,
    dismissSavedProgress,
    resumeSavedProgress
  } = useBookProgress(spreads, pages, settings.soundEnabled);

  useKeyboardNav({
    onNext: nextSpread,
    onPrev: prevSpread,
    onFirst: () => goToSpread(0),
    onLast: () => goToSpread(spreads.length - 1),
    onEscape: () => {
      setIsTOCOpen(false);
      setIsBookmarksOpen(false);
      setIsSearchOpen(false);
      setIsSettingsOpen(false);
      if (viewState === 'overview') setViewState('read');
    },
    onToggleSearch: () => setIsSearchOpen(prev => !prev),
    enabled: viewState === 'read'
  });

  const handleOpenBook = () => {
    setViewState('read');
  };

  const handleReturnToCover = () => {
    goToSpread(0);
    setViewState('landing');
  };

  const handleReadAgain = () => {
    goToSpread(0);
    setViewState('read');
  };

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: SILENT_SOUND_OF_TIME_BOOK.title,
        text: `Read "${SILENT_SOUND_OF_TIME_BOOK.title}" by ${SILENT_SOUND_OF_TIME_BOOK.author}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setShareToast('Book link copied to clipboard!');
        setTimeout(() => setShareToast(null), 3000);
      });
    }
  }, []);

  return (
    <main className="w-full h-screen min-h-screen bg-[#FFF5F8] text-stone-800 overflow-hidden font-newsreader relative">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F43F5E] to-[#38BDF8] text-white font-sans-ui text-xs font-bold tracking-wider uppercase shadow-2xl animate-bounce">
          {shareToast}
        </div>
      )}

      {/* 1. LANDING COVER VIEW */}
      {viewState === 'landing' && (
        <BookLanding onOpenBook={handleOpenBook} />
      )}

      {/* 2. READ MODE VIEW */}
      {viewState === 'read' && (
        <>
          <BookContainer
            spreads={spreads}
            pages={pages}
            currentSpreadIndex={currentSpreadIndex}
            currentSpread={currentSpread}
            activePage={activePage}
            fontSize={settings.fontSize}
            animationEnabled={settings.animationEnabled}
            viewingMode={viewState}
            isBookmarkedLeft={currentSpread.leftPage ? isBookmarked(currentSpread.leftPage.pageNumber) : false}
            isBookmarkedRight={currentSpread.rightPage ? isBookmarked(currentSpread.rightPage.pageNumber) : false}
            isBookmarkedMobile={isBookmarked(activePage.pageNumber)}
            canPrev={currentSpreadIndex > 0}
            canNext={currentSpreadIndex < totalSpreads - 1}
            onPrev={prevSpread}
            onNext={nextSpread}
            onToggleBookmarkLeft={() => currentSpread.leftPage && toggleBookmark(currentSpread.leftPage)}
            onToggleBookmarkRight={() => currentSpread.rightPage && toggleBookmark(currentSpread.rightPage)}
            onToggleBookmarkMobile={() => toggleBookmark(activePage)}
            onGoToChapter={goToChapter}
            onActionReadAgain={handleReadAgain}
            onActionReturnCover={handleReturnToCover}
            onActionShare={handleShare}
          />

          <Toolbar
            currentChapterTitle={currentChapterTitle}
            currentChapterNumber={currentChapterNumber}
            overallProgressPercent={overallProgressPercent}
            currentSpreadIndex={currentSpreadIndex}
            totalSpreads={totalSpreads}
            soundEnabled={settings.soundEnabled}
            fullscreen={settings.fullscreen}
            onPrev={prevSpread}
            onNext={nextSpread}
            canPrev={currentSpreadIndex > 0}
            canNext={currentSpreadIndex < totalSpreads - 1}
            onOpenTOC={() => setIsTOCOpen(true)}
            onOpenBookmarks={() => setIsBookmarksOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onToggleOverview={() => setViewState('overview')}
            onToggleSound={toggleSound}
            onToggleFullscreen={toggleFullscreen}
          />
        </>
      )}

      {/* 3. OVERVIEW MODE GRID */}
      {viewState === 'overview' && (
        <OverviewGrid
          spreads={spreads}
          currentSpreadIndex={currentSpreadIndex}
          onSelectSpread={(idx) => {
            goToSpread(idx);
            setViewState('read');
          }}
          onClose={() => setViewState('read')}
        />
      )}

      {/* 4. MODALS & OVERLAYS */}
      <WelcomeBackModal
        savedProgress={savedProgress}
        onResume={() => {
          resumeSavedProgress();
          setViewState('read');
        }}
        onStartOver={dismissSavedProgress}
      />

      <TableOfContents
        isOpen={isTOCOpen}
        onClose={() => setIsTOCOpen(false)}
        onSelectChapter={(chNum) => {
          goToChapter(chNum);
          setViewState('read');
        }}
        currentChapterNumber={currentChapterNumber}
      />

      <BookmarksPanel
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onSelectBookmark={(spreadIndex) => {
          goToSpread(spreadIndex);
          setViewState('read');
        }}
        onRemoveBookmark={removeBookmark}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        pages={pages}
        onSelectResult={(spreadIndex) => {
          goToSpread(spreadIndex);
          setViewState('read');
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={settings.theme}
        fontSize={settings.fontSize}
        soundEnabled={settings.soundEnabled}
        animationEnabled={settings.animationEnabled}
        fullscreen={settings.fullscreen}
        onSetTheme={setTheme}
        onSetFontSize={setFontSize}
        onToggleSound={toggleSound}
        onToggleAnimation={toggleAnimation}
        onToggleFullscreen={toggleFullscreen}
      />
    </main>
  );
}

export default App;
