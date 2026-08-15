import { useEffect } from 'react';

interface UseKeyboardNavProps {
  onNext: () => void;
  onPrev: () => void;
  onFirst?: () => void;
  onLast?: () => void;
  onEscape?: () => void;
  onToggleSearch?: () => void;
  enabled?: boolean;
}

export function useKeyboardNav({
  onNext,
  onPrev,
  onFirst,
  onLast,
  onEscape,
  onToggleSearch,
  enabled = true
}: UseKeyboardNavProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when user is typing inside input fields or textareas
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        onToggleSearch?.();
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          onPrev();
          break;
        case 'Space':
          e.preventDefault();
          if (e.shiftKey) {
            onPrev();
          } else {
            onNext();
          }
          break;
        case 'Home':
          e.preventDefault();
          onFirst?.();
          break;
        case 'End':
          e.preventDefault();
          onLast?.();
          break;
        case 'Escape':
          onEscape?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onFirst, onLast, onEscape, onToggleSearch, enabled]);
}
