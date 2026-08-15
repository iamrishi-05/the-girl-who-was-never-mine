import React from 'react';
import type { Spread } from '../../types/book';
import { PageRenderer } from '../Book/PageRenderer';
import { X, Heart } from 'lucide-react';


interface OverviewGridProps {
  spreads: Spread[];
  currentSpreadIndex: number;
  onSelectSpread: (index: number) => void;
  onClose: () => void;
}

export const OverviewGrid: React.FC<OverviewGridProps> = ({
  spreads,
  currentSpreadIndex,
  onSelectSpread,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#FFF5F8]/95 backdrop-blur-md flex flex-col p-6 sm:p-10 select-none overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-pink-200">
        <div className="flex items-center space-x-3 text-[#F43F5E]">
          <Heart className="w-5 h-5 fill-current" />
          <h2 className="font-cinzel text-xl font-bold tracking-widest uppercase text-[#881337]">
            Book Overview Grid
          </h2>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-full border border-pink-300 text-xs font-sans-ui text-[#881337] hover:border-[#F43F5E] hover:bg-pink-50 flex items-center space-x-2 transition-colors font-semibold"
        >
          <X className="w-4 h-4" />
          <span>Exit Overview</span>
        </button>
      </div>

      {/* Spreads Grid */}
      <div className="flex-1 overflow-y-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {spreads.map((spread) => {
            const isCurrent = spread.index === currentSpreadIndex;

            return (
              <div
                key={spread.index}
                onClick={() => {
                  onSelectSpread(spread.index);
                  onClose();
                }}
                className={`group relative aspect-[1.4/1] rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-105 flex shadow-md overflow-hidden ${
                  isCurrent
                    ? 'border-[#F43F5E] ring-2 ring-[#F43F5E]/60 scale-105'
                    : 'border-pink-200 hover:border-[#F43F5E]/60'
                }`}
              >
                {/* Left Thumbnail Page */}
                <div className="w-1/2 h-full paper-texture border-r border-pink-200 p-2 overflow-hidden text-[6px] scale-[0.4] origin-top-left w-[250%] h-[250%] pointer-events-none select-none">
                  <PageRenderer page={spread.leftPage} />
                </div>

                {/* Right Thumbnail Page */}
                <div className="w-1/2 h-full paper-texture p-2 overflow-hidden text-[6px] scale-[0.4] origin-top-left w-[250%] h-[250%] pointer-events-none select-none">
                  <PageRenderer page={spread.rightPage} />
                </div>

                {/* Overlay Tag */}
                <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm border border-pink-200 rounded px-2.5 py-1 flex items-center justify-between text-[10px] font-cinzel text-stone-700 group-hover:text-[#F43F5E] transition-colors font-bold">
                  <span className="truncate">
                    {spread.rightPage?.chapterTitle || spread.leftPage?.sectionLabel || `Spread ${spread.index}`}
                  </span>
                  <span>#{spread.index}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
