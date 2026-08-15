import React from 'react';
import type { ReaderTheme, FontSize } from '../../types/book';
import { X, Volume2, VolumeX, Sparkles, Maximize, Minimize, Heart } from 'lucide-react';


interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ReaderTheme;
  fontSize: FontSize;
  soundEnabled: boolean;
  animationEnabled: boolean;
  fullscreen: boolean;
  onSetTheme: (theme: ReaderTheme) => void;
  onSetFontSize: (size: FontSize) => void;
  onToggleSound: () => void;
  onToggleAnimation: () => void;
  onToggleFullscreen: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  fontSize,
  soundEnabled,
  animationEnabled,
  fullscreen,
  onSetTheme,
  onSetFontSize,
  onToggleSound,
  onToggleAnimation,
  onToggleFullscreen
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white border border-pink-200 rounded-xl shadow-2xl p-6 sm:p-8 text-stone-800 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100">
          <div className="flex items-center space-x-3 text-[#F43F5E]">
            <Heart className="w-5 h-5 fill-current" />
            <h2 className="font-cinzel text-lg font-bold tracking-widest uppercase">
              Reading Options
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-pink-50 text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Selection */}
        <div className="space-y-3">
          <label className="font-cinzel text-xs tracking-wider text-[#9F1239] uppercase font-bold">
            Light Romantic Themes
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'rose', label: 'Rose Petal', bg: '#FFF0F5', text: '#4A041D', border: '#FBCFE8' },
              { id: 'sky', label: 'Soft Sky', bg: '#F0F9FF', text: '#0C4A6E', border: '#BAE6FD' },
              { id: 'pearl', label: 'Pearl White', bg: '#FFFFFF', text: '#1C1917', border: '#E7E5E4' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onSetTheme(t.id as ReaderTheme)}
                style={{ backgroundColor: t.bg, color: t.text, borderColor: t.border }}
                className={`p-3 rounded-lg border text-center transition-all font-garamond font-bold text-sm ${
                  theme === t.id || (theme === 'paper' && t.id === 'rose')
                    ? 'ring-2 ring-[#F43F5E] shadow-md scale-105'
                    : 'opacity-90 hover:opacity-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Selection */}
        <div className="space-y-3">
          <label className="font-cinzel text-xs tracking-wider text-[#9F1239] uppercase font-bold">
            Text Size
          </label>
          <div className="grid grid-cols-3 gap-3 font-sans-ui text-xs font-semibold">
            {[
              { id: 'sm', label: 'Small' },
              { id: 'md', label: 'Medium' },
              { id: 'lg', label: 'Large' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => onSetFontSize(s.id as FontSize)}
                className={`p-2.5 rounded-lg border transition-all ${
                  fontSize === s.id
                    ? 'border-[#F43F5E] bg-pink-50 text-[#BE123C]'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-pink-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles (Sound, Motion, Fullscreen) */}
        <div className="pt-2 space-y-3 border-t border-pink-100">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-pink-50/50 border border-pink-100">
            <div className="flex items-center space-x-3 text-stone-700">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#F43F5E]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
              <span className="font-sans-ui text-xs font-medium">Page Turn Sound Effects</span>
            </div>
            <button
              onClick={onToggleSound}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                soundEnabled ? 'bg-[#F43F5E]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  soundEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Animation Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-pink-50/50 border border-pink-100">
            <div className="flex items-center space-x-3 text-stone-700">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span className="font-sans-ui text-xs font-medium">Page Turn Animations</span>
            </div>
            <button
              onClick={onToggleAnimation}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                animationEnabled ? 'bg-[#F43F5E]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  animationEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-pink-50/50 border border-pink-100">
            <div className="flex items-center space-x-3 text-stone-700">
              {fullscreen ? <Minimize className="w-4 h-4 text-[#F43F5E]" /> : <Maximize className="w-4 h-4 text-stone-400" />}
              <span className="font-sans-ui text-xs font-medium">Fullscreen Reading Mode</span>
            </div>
            <button
              onClick={onToggleFullscreen}
              className="px-3 py-1 rounded border border-pink-200 text-xs font-sans-ui text-pink-700 hover:border-[#F43F5E]"
            >
              {fullscreen ? 'Exit' : 'Enter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
