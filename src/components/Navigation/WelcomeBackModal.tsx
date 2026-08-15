import React from 'react';
import type { StoredProgress } from '../../utils/storage';
import { Heart, RotateCcw, ArrowRight } from 'lucide-react';

interface WelcomeBackModalProps {
  savedProgress: StoredProgress | null;
  onResume: () => void;
  onStartOver: () => void;
}

export const WelcomeBackModal: React.FC<WelcomeBackModalProps> = ({
  savedProgress,
  onResume,
  onStartOver
}) => {
  if (!savedProgress) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white border border-pink-200 rounded-xl shadow-2xl p-6 sm:p-8 text-center text-stone-800 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center mx-auto text-[#F43F5E]">
          <Heart className="w-6 h-6 fill-current animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="font-cinzel text-xs tracking-[0.3em] text-[#E11D48] uppercase font-bold">
            WELCOME BACK, MY LOVE
          </span>
          <h2 className="font-garamond text-2xl font-bold text-[#881337]">
            Continue reading your story?
          </h2>
          <p className="font-newsreader italic text-stone-600 text-sm pt-2">
            You stopped reading at <span className="text-[#E11D48] font-bold">{savedProgress.chapterTitle}</span> (Page {savedProgress.pageIndex}).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onResume}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#38BDF8] text-white font-sans-ui text-xs font-bold tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>Continue Reading</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onStartOver}
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-pink-200 hover:border-pink-400 font-sans-ui text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Over</span>
          </button>
        </div>
      </div>
    </div>
  );
};
