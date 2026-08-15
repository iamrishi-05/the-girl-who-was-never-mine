import type { Bookmark, ReaderSettings } from '../types/book';


const KEYS = {
  PROGRESS: 'silent_book_reading_progress',
  BOOKMARKS: 'silent_book_bookmarks',
  SETTINGS: 'silent_book_settings'
};

export interface StoredProgress {
  spreadIndex: number;
  pageIndex: number;
  chapterTitle: string;
  chapterNumber?: number;
  timestamp: number;
}

export const DEFAULT_SETTINGS: ReaderSettings = {
  theme: 'paper',
  fontSize: 'md',
  soundEnabled: false,
  animationEnabled: true,
  fullscreen: false
};

export const storage = {
  // Reading Position
  getProgress(): StoredProgress | null {
    try {
      const data = localStorage.getItem(KEYS.PROGRESS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setProgress(progress: Omit<StoredProgress, 'timestamp'>) {
    try {
      const stored: StoredProgress = {
        ...progress,
        timestamp: Date.now()
      };
      localStorage.setItem(KEYS.PROGRESS, JSON.stringify(stored));
    } catch {
      // Ignore quota errors
    }
  },

  clearProgress() {
    try {
      localStorage.removeItem(KEYS.PROGRESS);
    } catch {
      // Ignore
    }
  },

  // Bookmarks
  getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveBookmarks(bookmarks: Bookmark[]) {
    try {
      localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch {
      // Ignore
    }
  },

  // Settings
  getSettings(): ReaderSettings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: Partial<ReaderSettings>) {
    try {
      const current = storage.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }
};
