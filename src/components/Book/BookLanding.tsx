import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SILENT_SOUND_OF_TIME_BOOK } from '../../content/book';
import { Heart } from 'lucide-react';

interface BookLandingProps {
  onOpenBook: () => void;
}

export const BookLanding: React.FC<BookLandingProps> = ({ onOpenBook }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * -20;
    setMousePos({ x, y });
  };

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpenBook();
    }, 1200);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-gradient-to-b from-[#FFF5F8] via-[#FCE7F0] to-[#F0F9FF] flex flex-col items-center justify-center overflow-hidden select-none book-perspective"
    >
      {/* Soft Romantic Floating Radial Glow */}
      <div className="absolute inset-0 bg-radial from-[#FB7185]/20 via-transparent to-transparent pointer-events-none filter blur-3xl opacity-70"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#38BDF8]/15 rounded-full filter blur-[100px] pointer-events-none animate-pulse"></div>

      {/* Floating Gentle Heart Sparkles */}
      <div className="absolute top-12 left-1/4 text-[#FB7185]/30 animate-bounce duration-1000">
        <Heart className="w-6 h-6 fill-current" />
      </div>
      <div className="absolute bottom-20 right-1/4 text-[#38BDF8]/40 animate-pulse">
        <Heart className="w-5 h-5 fill-current" />
      </div>

      {/* 3D Romantic Book Presentation Container */}
      <motion.div
        animate={{
          rotateY: isOpening ? -160 : mousePos.x,
          rotateX: isOpening ? 10 : mousePos.y,
          scale: isOpening ? 1.15 : 1,
          z: isOpening ? 100 : 0
        }}
        transition={{
          rotateY: isOpening ? { duration: 1.2, ease: [0.645, 0.045, 0.355, 1.000] } : { duration: 0.3 },
          scale: { duration: 1.2 }
        }}
        className="relative w-[320px] sm:w-[380px] h-[480px] sm:h-[560px] rounded-r-md hardcover-texture-romantic text-[#881337] shadow-2xl border-2 border-[#F43F5E]/40 flex flex-col justify-between p-8 sm:p-10 cursor-pointer group transform-style-3d bg-[#FFF0F5]"
        onClick={handleOpenClick}
      >
        {/* Spine Depth Shadow on Left Edge */}
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[#881337]/30 via-[#881337]/10 to-transparent z-20 rounded-l-sm border-r border-[#F43F5E]/30"></div>

        {/* Paper Edge Stack 3D Effect on Right */}
        <div className="absolute top-2 right-[-14px] bottom-2 w-4 bg-gradient-to-r from-pink-100 via-white to-sky-100 border-r border-pink-300 rounded-r-sm shadow-md"></div>
        <div className="absolute top-3 right-[-24px] bottom-3 w-3 bg-gradient-to-r from-pink-50 via-white to-sky-50 rounded-r-sm shadow-sm opacity-90"></div>

        {/* Romantic Corner Frame Accents */}
        <div className="absolute top-4 left-10 w-8 h-8 border-t-2 border-l-2 border-[#F43F5E]"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#F43F5E]"></div>
        <div className="absolute bottom-4 left-10 w-8 h-8 border-b-2 border-l-2 border-[#F43F5E]"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#F43F5E]"></div>

        {/* Top Header */}
        <div className="pt-4 text-center pl-6">
          <span className="font-cinzel text-[11px] tracking-[0.35em] text-[#9F1239] uppercase font-bold">
            A BOOK WRITTEN FOR YOU
          </span>
        </div>

        {/* Title Center */}
        <div className="my-auto text-center space-y-5 pl-6">
          <div className="flex justify-center text-[#E11D48]">
            <Heart className="w-8 h-8 fill-current drop-shadow" />
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-widest leading-tight text-[#881337] drop-shadow-sm">
            {SILENT_SOUND_OF_TIME_BOOK.title}
          </h1>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-[#F43F5E] to-[#38BDF8] mx-auto"></div>
          <p className="font-garamond italic text-sm sm:text-base text-[#9F1239] max-w-xs mx-auto font-medium">
            {SILENT_SOUND_OF_TIME_BOOK.subtitle}
          </p>
        </div>

        {/* Author Footer */}
        <div className="pb-4 text-center pl-6 space-y-2">
          <p className="font-cinzel text-xs tracking-[0.25em] text-[#9F1239] uppercase font-bold">
            {SILENT_SOUND_OF_TIME_BOOK.author}
          </p>
          <p className="font-garamond text-[10px] tracking-widest text-[#0284C7] uppercase font-semibold">
            {SILENT_SOUND_OF_TIME_BOOK.publisher}
          </p>
        </div>
      </motion.div>

      {/* OPEN THE BOOK CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 z-30"
      >
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className="group relative inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#38BDF8] text-white font-sans-ui text-xs font-bold tracking-[0.2em] uppercase shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/50"
        >
          <Heart className="w-4 h-4 fill-current transition-transform group-hover:scale-125" />
          <span>{isOpening ? 'Opening Book...' : 'Open Your Book'}</span>
        </button>
      </motion.div>

      {/* Subtitle Hint */}
      <p className="mt-4 font-garamond italic text-xs text-[#881337] opacity-80">
        Click cover or button to begin reading your story
      </p>
    </div>
  );
};
