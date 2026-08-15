import React, { useState, useMemo } from 'react';
import type { PageContent, SearchResult } from '../../types/book';
import { Search as SearchIcon, X, ArrowRight, Heart } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: PageContent[];
  onSelectResult: (spreadIndex: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  pages,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');

  const searchResults: SearchResult[] = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed || trimmed.length < 2) return [];

    const results: SearchResult[] = [];

    pages.forEach((page) => {
      if (page.chapterTitle && page.chapterTitle.toLowerCase().includes(trimmed)) {
        results.push({
          id: `sr-${page.id}-title`,
          pageNumber: page.pageNumber,
          spreadIndex: page.spreadIndex,
          chapterTitle: page.chapterTitle,
          chapterNumber: page.chapterNumber,
          matchSnippet: `Chapter Title: "${page.chapterTitle}"`,
          matchType: 'chapter'
        });
      }

      if (page.quote && page.quote.toLowerCase().includes(trimmed)) {
        results.push({
          id: `sr-${page.id}-quote`,
          pageNumber: page.pageNumber,
          spreadIndex: page.spreadIndex,
          chapterTitle: page.chapterTitle || page.sectionLabel || 'Book Quote',
          chapterNumber: page.chapterNumber,
          matchSnippet: `Quote: "${page.quote}"`,
          matchType: 'quote'
        });
      }

      if (page.paragraphs) {
        page.paragraphs.forEach((para) => {
          const matchIdx = para.toLowerCase().indexOf(trimmed);
          if (matchIdx !== -1) {
            const start = Math.max(0, matchIdx - 40);
            const end = Math.min(para.length, matchIdx + trimmed.length + 50);
            const snippet = (start > 0 ? '...' : '') + para.slice(start, end) + (end < para.length ? '...' : '');

            results.push({
              id: `sr-${page.id}-para-${matchIdx}`,
              pageNumber: page.pageNumber,
              spreadIndex: page.spreadIndex,
              chapterTitle: page.chapterTitle || page.sectionLabel || 'Page Text',
              chapterNumber: page.chapterNumber,
              matchSnippet: snippet,
              matchType: 'text'
            });
          }
        });
      }

      if (page.lines) {
        page.lines.forEach((line) => {
          if (line.toLowerCase().includes(trimmed)) {
            results.push({
              id: `sr-${page.id}-poem`,
              pageNumber: page.pageNumber,
              spreadIndex: page.spreadIndex,
              chapterTitle: page.chapterTitle || 'Poem',
              chapterNumber: page.chapterNumber,
              matchSnippet: `Poem line: "${line}"`,
              matchType: 'text'
            });
          }
        });
      }
    });

    return results;
  }, [query, pages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white border border-pink-200 rounded-xl shadow-2xl p-6 sm:p-8 text-stone-800 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100">
          <div className="flex items-center space-x-3 text-[#F43F5E]">
            <Heart className="w-5 h-5 fill-current" />
            <h2 className="font-cinzel text-lg font-bold tracking-widest uppercase">
              Search Book
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-pink-50 text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Field */}
        <div className="pt-6 pb-4">
          <div className="relative">
            <SearchIcon className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search words, phrases, quotes, or chapter titles..."
              className="w-full pl-11 pr-4 py-3 bg-pink-50/50 border border-pink-200 focus:border-[#F43F5E] rounded-xl font-sans-ui text-sm text-stone-800 placeholder-stone-400 focus:outline-none transition-colors"
              autoFocus
            />
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto py-2 space-y-3 pr-1">
          {query.trim().length > 0 && query.trim().length < 2 && (
            <p className="text-center py-6 text-xs text-stone-400 font-sans-ui">
              Type at least 2 characters to search...
            </p>
          )}

          {query.trim().length >= 2 && searchResults.length === 0 && (
            <div className="py-12 text-center text-stone-500 font-garamond italic space-y-2">
              <p className="text-lg">No matches found for "{query}"</p>
              <p className="text-xs font-sans-ui opacity-75">
                Try searching for words like "love", "smile", "heart", or "sky".
              </p>
            </div>
          )}

          {searchResults.map((res) => (
            <button
              key={res.id}
              onClick={() => {
                onSelectResult(res.spreadIndex);
                onClose();
              }}
              className="w-full text-left p-4 rounded-xl border border-pink-100 hover:border-[#F43F5E]/60 bg-pink-50/30 hover:bg-pink-50 transition-all group flex items-start justify-between space-x-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-3 text-xs font-cinzel text-[#E11D48] font-bold">
                  <span>Page {res.pageNumber}</span>
                  <span>•</span>
                  <span>{res.chapterTitle}</span>
                </div>
                <p className="font-newsreader text-sm text-stone-700 leading-relaxed italic">
                  {res.matchSnippet}
                </p>
              </div>

              <span className="font-cinzel text-xs text-[#0284C7] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 pt-1">
                <span>Jump</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
