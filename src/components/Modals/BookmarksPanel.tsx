import React from 'react';
import type { Bookmark } from '../../types/book';
import { Bookmark as BookmarkIcon, X, Trash2, ArrowRight, Heart } from 'lucide-react';

interface BookmarksPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onSelectBookmark: (spreadIndex: number) => void;
  onRemoveBookmark: (id: string) => void;
}

export const BookmarksPanel: React.FC<BookmarksPanelProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onSelectBookmark,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-white border border-pink-200 rounded-xl shadow-2xl p-6 sm:p-8 text-stone-800 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100">
          <div className="flex items-center space-x-3 text-[#F43F5E]">
            <Heart className="w-5 h-5 fill-current" />
            <h2 className="font-cinzel text-lg font-bold tracking-widest uppercase">
              Bookmarked Pages ({bookmarks.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-pink-50 text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="Close bookmarks"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto py-6 space-y-3.5 pr-2">
          {bookmarks.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-3 font-garamond italic">
              <BookmarkIcon className="w-10 h-10 mx-auto text-[#F43F5E]/40" />
              <p className="text-lg text-stone-600">No bookmarks saved yet.</p>
              <p className="text-xs font-sans-ui text-stone-400">
                Click the silk ribbon on top of any page while reading to bookmark it.
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="group p-4 rounded-xl border border-pink-100 hover:border-[#F43F5E]/60 bg-pink-50/30 hover:bg-pink-50 transition-all flex items-start justify-between space-x-4"
              >
                <div
                  className="flex-1 cursor-pointer space-y-2"
                  onClick={() => {
                    onSelectBookmark(bm.spreadIndex);
                    onClose();
                  }}
                >
                  <div className="flex items-center space-x-3 text-xs font-cinzel text-[#E11D48] font-bold">
                    <span>Page {bm.pageNumber}</span>
                    <span>•</span>
                    <span>{bm.chapterTitle}</span>
                  </div>
                  <p className="font-newsreader italic text-stone-700 text-sm line-clamp-2">
                    {bm.snippet}
                  </p>
                  <div className="flex items-center space-x-1 text-xs font-cinzel text-[#0284C7] font-semibold group-hover:opacity-100 transition-opacity">
                    <span>Jump to page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <button
                  onClick={() => onRemoveBookmark(bm.id)}
                  className="p-1.5 rounded-full hover:bg-rose-100 text-stone-400 hover:text-rose-600 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
