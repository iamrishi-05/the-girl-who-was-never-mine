import React from 'react';
import type { PageContent, FontSize } from '../../types/book';
import { SILENT_SOUND_OF_TIME_BOOK } from '../../content/book';
import { Heart } from 'lucide-react';

interface PageRendererProps {
  page: PageContent | null;
  fontSize?: FontSize;
  onGoToChapter?: (num: number) => void;
  onActionReadAgain?: () => void;
  onActionReturnCover?: () => void;
  onActionShare?: () => void;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  fontSize = 'md',
  onGoToChapter,
  onActionReadAgain,
  onActionReturnCover,
  onActionShare
}) => {
  if (!page) {
    return (
      <div className="w-full h-full flex items-center justify-center opacity-30 select-none">
        <span className="font-garamond italic text-sm">Blank Page</span>
      </div>
    );
  }

  const fontSizeClass = {
    sm: 'text-base leading-relaxed',
    md: 'text-lg leading-relaxed md:leading-loose',
    lg: 'text-xl leading-loose'
  }[fontSize];

  switch (page.type) {
    // ----------------------------------------------------
    // COVER PAGE
    // ----------------------------------------------------
    case 'cover':
      return (
        <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 text-center hardcover-texture-romantic text-[#881337] relative overflow-hidden select-none border-4 border-[#F43F5E]/40 rounded-sm shadow-2xl bg-[#FFF0F5]">
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#F43F5E]/60"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#F43F5E]/60"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#F43F5E]/60"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#F43F5E]/60"></div>

          <div className="pt-8">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#9F1239] font-bold">BELOVED EDITION</span>
          </div>

          <div className="my-auto space-y-6 px-4">
            <div className="flex justify-center text-[#E11D48]">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h1 className="font-cinzel text-3xl md:text-5xl font-extrabold tracking-wider leading-tight text-[#881337]">
              {page.title}
            </h1>
            <div className="w-24 h-[1.5px] bg-gradient-to-r from-[#F43F5E] to-[#38BDF8] mx-auto my-4"></div>
            <p className="font-garamond italic text-lg md:text-xl text-[#9F1239] font-semibold">
              {page.subtitle}
            </p>
          </div>

          <div className="pb-8 space-y-2">
            <p className="font-cinzel text-sm tracking-[0.25em] text-[#9F1239] font-bold uppercase">
              {page.author}
            </p>
            <p className="font-garamond text-xs tracking-widest text-[#0284C7] uppercase font-semibold">
              {SILENT_SOUND_OF_TIME_BOOK.publisher}
            </p>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // TITLE PAGE
    // ----------------------------------------------------
    case 'title':
      return (
        <div className="w-full h-full flex flex-col justify-between py-12 px-8 md:px-16 text-center select-none">
          <div className="pt-8">
            <span className="font-cinzel text-xs tracking-[0.25em] text-[#0284C7] font-bold">ROMANTIC EDITIONS</span>
          </div>

          <div className="my-auto space-y-6">
            <div className="flex justify-center text-[#F43F5E]">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <h1 className="font-cinzel text-2xl md:text-4xl font-bold tracking-widest leading-snug">
              {page.title}
            </h1>
            <p className="font-garamond italic text-base md:text-lg opacity-85 max-w-xs mx-auto">
              {page.subtitle}
            </p>
            <div className="w-16 h-[1.5px] bg-[#F43F5E] mx-auto opacity-60"></div>
            <p className="font-garamond text-xl tracking-wider font-semibold text-[#881337]">
              {page.author}
            </p>
          </div>

          <div className="pb-4 space-y-1 text-xs font-garamond opacity-70">
            <p>{SILENT_SOUND_OF_TIME_BOOK.publisher}</p>
            <p>{SILENT_SOUND_OF_TIME_BOOK.publicationYear} • {SILENT_SOUND_OF_TIME_BOOK.edition}</p>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // DEDICATION PAGE
    // ----------------------------------------------------
    case 'dedication':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-16 text-center">
          <div className="max-w-md space-y-8">
            <div className="w-10 h-10 mx-auto text-[#F43F5E] flex items-center justify-center">
              <Heart className="w-8 h-8 fill-current animate-pulse" />
            </div>
            <p className="font-garamond italic text-xl md:text-2xl leading-relaxed text-[#4A041D] font-medium">
              "{page.paragraphs?.[0]}"
            </p>
            <div className="w-12 h-[1.5px] bg-[#F43F5E]/60 mx-auto"></div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // TABLE OF CONTENTS PAGE
    // ----------------------------------------------------
    case 'toc':
      return (
        <div className="w-full h-full flex flex-col p-6 md:p-12 overflow-y-auto">
          <h2 className="font-cinzel text-xl md:text-2xl font-bold text-center tracking-widest pb-6 border-b border-[#F43F5E]/30 text-[#881337]">
            {page.title}
          </h2>

          {page.paragraphs ? (
            <div className="my-auto space-y-6 text-center px-4">
              <p className="font-garamond italic text-lg leading-relaxed opacity-90">
                {page.paragraphs[0]}
              </p>
              <div className="w-16 h-[1.5px] bg-[#38BDF8] mx-auto"></div>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              {SILENT_SOUND_OF_TIME_BOOK.chapters.length === 0 ? (
                <div className="py-12 text-center text-stone-500 font-garamond italic space-y-2">
                  <p className="text-xl text-[#881337] font-bold">Ready to rebuild...</p>
                  <p className="text-sm font-sans-ui opacity-75">Provide Chapter 1 text whenever you are ready to begin.</p>
                </div>
              ) : (
                SILENT_SOUND_OF_TIME_BOOK.chapters.map((ch) => (
                  <button
                    key={ch.number}
                    onClick={() => onGoToChapter?.(ch.number)}
                    className="w-full text-left group flex items-baseline justify-between py-2.5 border-b border-dashed border-pink-200 hover:border-[#F43F5E] transition-colors"
                  >
                    <div className="flex items-baseline space-x-3">
                      <span className="font-cinzel text-sm text-[#F43F5E] font-bold">
                        0{ch.number}
                      </span>
                      <div>
                        <span className="font-garamond text-lg font-bold group-hover:text-[#F43F5E] transition-colors">
                          {ch.title}
                        </span>
                        {ch.subtitle && (
                          <p className="font-garamond text-xs italic opacity-75 text-[#0369A1]">
                            {ch.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-cinzel text-xs text-[#0284C7] font-semibold group-hover:opacity-100 transition-opacity">
                      Ch 0{ch.number} ➔
                    </span>
                  </button>
                ))
              )}
            </div>
          )}

        </div>
      );

    // ----------------------------------------------------
    // CHAPTER START PAGE
    // ----------------------------------------------------
    case 'chapter_start':
      return (
        <div className="w-full h-full flex flex-col justify-between p-8 md:p-14 text-center">
          <div className="pt-6">
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#E11D48] font-bold">
              CHAPTER 0{page.chapterNumber}
            </span>
          </div>

          <div className="my-auto space-y-6 px-4">
            <h2 className="font-cinzel text-2xl md:text-4xl font-extrabold tracking-wider leading-snug text-[#4C0519]">
              {page.chapterTitle}
            </h2>
            {page.chapterSubtitle && (
              <p className="font-garamond italic text-base md:text-xl text-[#9F1239] font-medium">
                {page.chapterSubtitle}
              </p>
            )}

            {page.quote && (
              <div className="mt-8 pt-8 border-t border-[#F43F5E]/30 max-w-sm mx-auto space-y-3">
                <p className="font-garamond italic text-base md:text-lg opacity-90 leading-relaxed text-[#4A041D]">
                  "{page.quote}"
                </p>
                {page.quoteAuthor && (
                  <p className="font-cinzel text-xs tracking-widest text-[#0284C7] font-semibold">
                    — {page.quoteAuthor}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="pb-4 text-[#F43F5E] flex justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>
      );

    // ----------------------------------------------------
    // REGULAR TEXT PAGE
    // ----------------------------------------------------
    case 'text':
      return (
        <div className="w-full h-full flex flex-col p-6 md:p-12 justify-between">
          <div className="space-y-5 font-newsreader text-justify tracking-normal">
            {page.paragraphs?.map((para, idx) => (
              <p
                key={idx}
                className={`${fontSizeClass} whitespace-pre-line ${
                  idx === 0 && page.hasDropCap ? 'drop-cap' : ''
                }`}
              >
                {para}
              </p>
            ))}
          </div>

        </div>
      );

    // ----------------------------------------------------
    // FULL PAGE QUOTE PAGE
    // ----------------------------------------------------
    case 'quote':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-16 text-center">
          <div className="max-w-lg space-y-8 relative">
            <span className="font-cinzel text-6xl text-[#F43F5E]/20 absolute -top-10 -left-6 select-none">
              “
            </span>
            <blockquote className="font-garamond italic text-2xl md:text-3xl leading-relaxed font-normal text-balance text-[#4C0519]">
              {page.quote}
            </blockquote>
            {page.quoteAuthor && (
              <p className="font-cinzel text-xs tracking-[0.25em] text-[#E11D48] uppercase pt-4 font-bold">
                — {page.quoteAuthor}
              </p>
            )}
          </div>
        </div>
      );

    // ----------------------------------------------------
    // POEM PAGE
    // ----------------------------------------------------
    case 'poem':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-14 text-center">
          {page.title && (
            <h3 className="font-cinzel text-lg tracking-widest font-bold text-[#E11D48] mb-8">
              {page.title}
            </h3>
          )}
          <div className="space-y-2 font-newsreader italic text-lg md:text-xl leading-relaxed text-left max-w-sm text-[#4A041D]">
            {page.lines?.map((line, idx) => (
              <p key={idx} className={line === '' ? 'h-4' : ''}>
                {line}
              </p>
            ))}
          </div>
          <div className="w-12 h-[1.5px] bg-[#F43F5E]/60 mt-10"></div>
        </div>
      );

    // ----------------------------------------------------
    // LETTER PAGE (Soft Sky Blue Paper Style)
    // ----------------------------------------------------
    case 'letter':
      return (
        <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 bg-sky-50/80 border border-sky-200 rounded-sm text-[#0C4A6E] shadow-sm overflow-y-auto">
          {page.title && (
            <div className="text-right font-garamond italic text-sm text-[#0369A1] font-semibold mb-2">
              {page.title}
            </div>
          )}
          {page.subtitle && (
            <div className="font-garamond text-base md:text-lg font-bold mb-3 text-[#0C4A6E]">
              {page.subtitle}
            </div>
          )}

          <div className="space-y-3 font-newsreader text-sm md:text-base leading-relaxed italic my-auto">
            {page.paragraphs?.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {page.quoteAuthor && (
            <div className="text-right font-garamond whitespace-pre-line font-bold mt-4 pt-3 border-t border-sky-200 text-[#E11D48] text-sm">
              {page.quoteAuthor}
            </div>
          )}
        </div>
      );


    // ----------------------------------------------------
    // EPILOGUE PAGE
    // ----------------------------------------------------
    case 'epilogue':
      return (
        <div className="w-full h-full flex flex-col justify-center p-8 md:p-14 text-center space-y-6">
          <span className="font-cinzel text-xs tracking-[0.3em] text-[#E11D48] font-bold">EPILOGUE</span>
          <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-[#4C0519]">{page.title}</h2>
          <div className="w-16 h-[1.5px] bg-[#F43F5E]/60 mx-auto my-4"></div>
          <div className="space-y-4 font-newsreader text-base md:text-lg max-w-md mx-auto leading-relaxed text-[#4A041D]">
            {page.paragraphs?.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      );

    // ----------------------------------------------------
    // ABOUT AUTHOR PAGE
    // ----------------------------------------------------
    case 'about_author':
      return (
        <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 space-y-6">
          <div className="border-b border-[#F43F5E]/30 pb-4 text-center">
            <h2 className="font-cinzel text-xl font-bold tracking-widest text-[#881337]">
              ABOUT THIS BOOK
            </h2>
          </div>

          <div className="space-y-4 font-newsreader text-base md:text-lg leading-relaxed opacity-95 my-auto text-[#4C0519]">
            {page.paragraphs?.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {page.quote && (
            <div className="pt-4 border-t border-pink-200 text-center space-y-2">
              <p className="font-garamond italic text-sm text-[#9F1239]">
                "{page.quote}"
              </p>
              <p className="font-cinzel text-xs text-[#0284C7] font-bold uppercase">
                — {page.quoteAuthor}
              </p>
            </div>
          )}
        </div>
      );

    // ----------------------------------------------------
    // THE END PAGE
    // ----------------------------------------------------
    case 'end':
      return (
        <div className="w-full h-full flex flex-col justify-between p-8 md:p-14 text-center select-none">
          <div className="pt-8">
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#0284C7] font-bold">MY HEART IS YOURS</span>
          </div>

          <div className="my-auto space-y-6 px-4">
            <div className="flex justify-center text-[#F43F5E]">
              <Heart className="w-10 h-10 fill-current animate-bounce" />
            </div>
            <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold tracking-widest text-[#881337]">
              THE END
            </h2>
            <p className="font-garamond italic text-lg text-[#9F1239] font-medium">
              Thank you for reading, my love.
            </p>
            <p className="font-cinzel text-sm tracking-widest text-[#E11D48] uppercase font-bold pt-2">
              {SILENT_SOUND_OF_TIME_BOOK.author}
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
              <button
                onClick={onActionReadAgain}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F43F5E] to-[#38BDF8] text-white font-sans-ui text-xs tracking-wider uppercase shadow-md hover:scale-105 transition-all font-semibold"
              >
                Read Again
              </button>
              <button
                onClick={onActionReturnCover}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-pink-300 font-sans-ui text-xs tracking-wider uppercase text-[#881337] hover:border-[#F43F5E] transition-all font-semibold"
              >
                Return to Cover
              </button>
              <button
                onClick={onActionShare}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-sky-300 font-sans-ui text-xs tracking-wider uppercase text-[#0C4A6E] hover:border-[#0284C7] transition-all font-semibold"
              >
                Share Book
              </button>
            </div>
          </div>

          <div className="pb-4">
            <span className="font-garamond text-xs text-[#9F1239] font-medium">
              Written with all my love, forever & always.
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
