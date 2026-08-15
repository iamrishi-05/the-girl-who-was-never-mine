export type PageType = 
  | 'cover' 
  | 'title' 
  | 'dedication' 
  | 'toc' 
  | 'chapter_start' 
  | 'text' 
  | 'quote' 
  | 'poem' 
  | 'letter' 
  | 'epilogue' 
  | 'about_author' 
  | 'end';

export interface PageContent {
  id: string;
  type: PageType;
  chapterNumber?: number;
  chapterTitle?: string;
  chapterSubtitle?: string;
  title?: string;
  subtitle?: string;
  author?: string;
  paragraphs?: string[];
  lines?: string[];
  quote?: string;
  quoteAuthor?: string;
  hasDropCap?: boolean;
  pageNumber: number;
  spreadIndex: number;
  sectionLabel?: string;
}

export interface ChapterMeta {
  number: number;
  title: string;
  subtitle?: string;
  epigraph?: {
    quote: string;
    author: string;
  };
  startPageNumber: number;
  pageCount: number;
}

export interface BookData {
  title: string;
  subtitle: string;
  author: string;
  dedicatee?: string;
  publicationYear: string;
  publisher: string;
  edition: string;
  dedication: string;
  synopsis: string;
  aboutAuthor: {
    name: string;
    bio: string[];
    quote: string;
  };
  chapters: {
    number: number;
    title: string;
    subtitle?: string;
    epigraph?: {
      quote: string;
      author: string;
    };
    contentBlocks: Array<
      | { type: 'text'; paragraphs: string[]; hasDropCap?: boolean }
      | { type: 'quote'; quote: string; quoteAuthor: string }
      | { type: 'poem'; title?: string; lines: string[] }
      | { type: 'letter'; date?: string; recipient?: string; paragraphs: string[]; signoff?: string }
    >;
  }[];
  epilogue: {
    title: string;
    subtitle?: string;
    paragraphs: string[];
  };
}

export interface Spread {
  index: number;
  leftPage: PageContent | null;
  rightPage: PageContent | null;
}

export interface Bookmark {
  id: string;
  pageNumber: number;
  spreadIndex: number;
  chapterTitle: string;
  chapterNumber?: number;
  snippet: string;
  timestamp: number;
}

export type ReaderTheme = 'rose' | 'sky' | 'pearl' | 'paper' | 'night' | 'warm';
export type FontSize = 'sm' | 'md' | 'lg';

export interface ReaderSettings {
  theme: ReaderTheme;
  fontSize: FontSize;
  soundEnabled: boolean;
  animationEnabled: boolean;
  fullscreen: boolean;
}

export type ViewingMode = 'read' | 'overview';

export interface SearchResult {
  id: string;
  pageNumber: number;
  spreadIndex: number;
  chapterTitle: string;
  chapterNumber?: number;
  matchSnippet: string;
  matchType: 'chapter' | 'quote' | 'text';
}
