import React from 'react';

interface BookmarkRibbonProps {
  active: boolean;
  onClick?: () => void;
  title?: string;
}

export const BookmarkRibbon: React.FC<BookmarkRibbonProps> = ({ active, onClick, title }) => {
  return (
    <button
      onClick={onClick}
      title={title || (active ? 'Remove bookmark' : 'Bookmark this page')}
      className={`absolute top-0 right-8 z-30 transition-all duration-300 transform origin-top group ${
        active 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-3 opacity-40 hover:translate-y-0 hover:opacity-90'
      }`}
      aria-label={active ? 'Remove bookmark' : 'Bookmark page'}
    >
      <svg
        width="28"
        height="56"
        viewBox="0 0 28 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`filter drop-shadow-md transition-colors duration-300 ${
          active ? 'text-[#F43F5E]' : 'text-pink-300'
        }`}
      >
        <path
          d="M0 0H28V52L14 42L0 52V0Z"
          fill="currentColor"
        />
        <path
          d="M4 0V48L14 40.5L24 48V0"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </button>
  );
};
