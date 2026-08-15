import type { BookData, PageContent, Spread } from '../types/book';


/**
 * Transforms raw BookData into an array of sequential PageContent pages.
 */
export function buildBookPages(book: BookData): PageContent[] {
  const pages: PageContent[] = [];
  let physicalPageNum = 1;
  let spreadCounter = 0;

  // 1. Cover Page
  pages.push({
    id: 'page-cover',
    type: 'cover',
    title: book.title,
    subtitle: book.subtitle,
    author: book.author,
    pageNumber: 0,
    spreadIndex: spreadCounter++,
    sectionLabel: 'COVER'
  });

  // 2. Title Page (Spread 1, Left)
  pages.push({
    id: 'page-title',
    type: 'title',
    title: book.title,
    subtitle: book.subtitle,
    author: book.author,
    pageNumber: physicalPageNum++,
    spreadIndex: spreadCounter,
    sectionLabel: 'TITLE PAGE'
  });

  // 3. Dedication Page (Spread 1, Right)
  pages.push({
    id: 'page-dedication',
    type: 'dedication',
    paragraphs: [book.dedication],
    pageNumber: physicalPageNum++,
    spreadIndex: spreadCounter++,
    sectionLabel: 'DEDICATION'
  });

  // 4. Table of Contents
  pages.push({
    id: 'page-toc-1',
    type: 'toc',
    title: 'CONTENTS',
    pageNumber: physicalPageNum++,
    spreadIndex: spreadCounter++,
    sectionLabel: 'CONTENTS'
  });

  if (book.synopsis && book.synopsis.trim().length > 0) {
    pages.push({
      id: 'page-toc-2',
      type: 'toc',
      title: 'PREFACE',
      paragraphs: [book.synopsis],
      pageNumber: physicalPageNum++,
      spreadIndex: spreadCounter++,
      sectionLabel: 'PREFACE'
    });
  }

  // 5. Chapters
  book.chapters.forEach((chapter) => {
    // Chapter Title / Opening Page
    pages.push({
      id: `chapter-${chapter.number}-opening`,
      type: 'chapter_start',
      chapterNumber: chapter.number,
      chapterTitle: chapter.title,
      chapterSubtitle: chapter.subtitle,
      quote: chapter.epigraph?.quote,
      quoteAuthor: chapter.epigraph?.author,
      pageNumber: physicalPageNum++,
      spreadIndex: Math.floor(pages.length / 2),
      sectionLabel: `CHAPTER 0${chapter.number}`
    });

    // Process Content Blocks inside Chapter
    chapter.contentBlocks.forEach((block, bIdx) => {
      if (block.type === 'text') {
        pages.push({
          id: `chapter-${chapter.number}-text-${bIdx}`,
          type: 'text',
          chapterNumber: chapter.number,
          chapterTitle: chapter.title,
          paragraphs: block.paragraphs,
          hasDropCap: block.hasDropCap ?? (bIdx === 0),
          pageNumber: physicalPageNum++,
          spreadIndex: Math.floor(pages.length / 2),
          sectionLabel: `CHAPTER 0${chapter.number}`
        });
      } else if (block.type === 'quote') {
        pages.push({
          id: `chapter-${chapter.number}-quote-${bIdx}`,
          type: 'quote',
          chapterNumber: chapter.number,
          chapterTitle: chapter.title,
          quote: block.quote,
          quoteAuthor: block.quoteAuthor,
          pageNumber: physicalPageNum++,
          spreadIndex: Math.floor(pages.length / 2),
          sectionLabel: `CHAPTER 0${chapter.number}`
        });
      } else if (block.type === 'poem') {
        pages.push({
          id: `chapter-${chapter.number}-poem-${bIdx}`,
          type: 'poem',
          chapterNumber: chapter.number,
          chapterTitle: chapter.title,
          title: block.title,
          lines: block.lines,
          pageNumber: physicalPageNum++,
          spreadIndex: Math.floor(pages.length / 2),
          sectionLabel: `CHAPTER 0${chapter.number}`
        });
      } else if (block.type === 'letter') {
        pages.push({
          id: `chapter-${chapter.number}-letter-${bIdx}`,
          type: 'letter',
          chapterNumber: chapter.number,
          chapterTitle: chapter.title,
          title: block.date ? `Cape Wrath — ${block.date}` : undefined,
          subtitle: block.recipient,
          paragraphs: block.paragraphs,
          quoteAuthor: block.signoff,
          pageNumber: physicalPageNum++,
          spreadIndex: Math.floor(pages.length / 2),
          sectionLabel: `CHAPTER 0${chapter.number}`
        });
      }
    });
  });

  // 6. Epilogue (only if provided)
  if (book.epilogue && book.epilogue.title && book.epilogue.paragraphs.length > 0) {
    pages.push({
      id: 'page-epilogue',
      type: 'epilogue',
      title: book.epilogue.title,
      subtitle: book.epilogue.subtitle,
      paragraphs: book.epilogue.paragraphs,
      pageNumber: physicalPageNum++,
      spreadIndex: Math.floor(pages.length / 2),
      sectionLabel: 'EPILOGUE'
    });
  }

  // 7. About Author (only if provided)
  if (book.aboutAuthor && book.aboutAuthor.bio.length > 0) {
    pages.push({
      id: 'page-about-author',
      type: 'about_author',
      title: 'ABOUT THE AUTHOR',
      paragraphs: book.aboutAuthor.bio,
      quote: book.aboutAuthor.quote,
      quoteAuthor: book.aboutAuthor.name,
      pageNumber: physicalPageNum++,
      spreadIndex: Math.floor(pages.length / 2),
      sectionLabel: 'ABOUT THE AUTHOR'
    });
  }

  // 8. The End Page
  pages.push({
    id: 'page-end',
    type: 'end',
    title: 'THE END',
    subtitle: 'Thank you for reading.',
    author: book.author,
    pageNumber: physicalPageNum++,
    spreadIndex: Math.floor(pages.length / 2),
    sectionLabel: 'THE END'
  });


  // Recalculate spreadIndex for all pages to guarantee 2-page pairings
  pages.forEach((p, idx) => {
    if (idx === 0) {
      p.spreadIndex = 0; // Cover is spread 0
    } else {
      p.spreadIndex = Math.ceil(idx / 2);
    }
  });

  return pages;
}

/**
 * Bundles pages into 2-page Spreads for dual-page desktop view.
 */
export function buildBookSpreads(pages: PageContent[]): Spread[] {
  const spreads: Spread[] = [];

  // Cover is spread 0 (standalone right page or full spread)
  spreads.push({
    index: 0,
    leftPage: null,
    rightPage: pages[0] // Cover
  });

  // Loop through remaining pages two by two
  for (let i = 1; i < pages.length; i += 2) {
    const leftPage = pages[i] || null;
    const rightPage = pages[i + 1] || null;
    spreads.push({
      index: spreads.length,
      leftPage,
      rightPage
    });
  }

  return spreads;
}
