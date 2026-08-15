import { useState, useEffect } from 'react';
import type { Bookmark, PageContent } from '../types/book';
import { storage } from '../utils/storage';


export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => storage.getBookmarks());

  useEffect(() => {
    storage.saveBookmarks(bookmarks);
  }, [bookmarks]);

  const isBookmarked = (pageNumber: number) => {
    return bookmarks.some(b => b.pageNumber === pageNumber);
  };

  const toggleBookmark = (page: PageContent) => {
    if (isBookmarked(page.pageNumber)) {
      setBookmarks(prev => prev.filter(b => b.pageNumber !== page.pageNumber));
    } else {
      let snippet = page.title || page.chapterTitle || 'Bookmarked Page';
      if (page.paragraphs && page.paragraphs.length > 0) {
        snippet = page.paragraphs[0].slice(0, 90) + '...';
      } else if (page.quote) {
        snippet = `"${page.quote.slice(0, 80)}..."`;
      }

      const newBookmark: Bookmark = {
        id: `bm-${Date.now()}-${page.pageNumber}`,
        pageNumber: page.pageNumber,
        spreadIndex: page.spreadIndex,
        chapterTitle: page.chapterTitle || page.sectionLabel || 'Book Section',
        chapterNumber: page.chapterNumber,
        snippet,
        timestamp: Date.now()
      };

      setBookmarks(prev => [newBookmark, ...prev]);
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark
  };
}
