import React from 'react';
import { SILENT_SOUND_OF_TIME_BOOK } from '../../content/book';
import { X, Heart } from 'lucide-react';


interface TableOfContentsProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (num: number) => void;
  currentChapterNumber?: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  currentChapterNumber
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
              Table of Contents
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-pink-50 text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="Close contents"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto py-6 space-y-3.5 pr-2">
          {SILENT_SOUND_OF_TIME_BOOK.chapters.map((chapter) => {
            const isActive = chapter.number === currentChapterNumber;

            return (
              <button
                key={chapter.number}
                onClick={() => {
                  onSelectChapter(chapter.number);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  isActive
                    ? 'border-[#F43F5E] bg-pink-50 text-[#881337] shadow-sm'
                    : 'border-pink-100/70 hover:border-[#F43F5E]/60 hover:bg-pink-50/40 text-stone-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-cinzel text-xs text-[#E11D48] font-bold">
                      0{chapter.number}
                    </span>
                    <span className="font-garamond text-xl font-bold group-hover:text-[#E11D48] transition-colors">
                      {chapter.title}
                    </span>
                  </div>
                  {chapter.subtitle && (
                    <p className="font-garamond text-xs italic text-[#0369A1] pl-8">
                      {chapter.subtitle}
                    </p>
                  )}
                </div>

                <span className="font-cinzel text-xs text-[#0284C7] font-semibold group-hover:opacity-100 transition-opacity">
                  Read ➔
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-pink-100 text-center font-garamond text-xs text-stone-500">
          Click any chapter to jump directly to its opening page
        </div>
      </div>
    </div>
  );
};
