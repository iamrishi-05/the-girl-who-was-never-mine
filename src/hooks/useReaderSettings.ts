import { useState, useEffect } from 'react';
import type { ReaderSettings, ReaderTheme, FontSize } from '../types/book';
import { storage } from '../utils/storage';


export function useReaderSettings() {
  const [settings, setSettings] = useState<ReaderSettings>(() => storage.getSettings());

  useEffect(() => {
    // Apply theme class to <body>
    const body = document.body;
    body.classList.remove('theme-paper', 'theme-night', 'theme-warm');
    body.classList.add(`theme-${settings.theme}`);
  }, [settings.theme]);

  const setTheme = (theme: ReaderTheme) => {
    const updated = storage.saveSettings({ theme });
    setSettings(updated);
  };

  const setFontSize = (fontSize: FontSize) => {
    const updated = storage.saveSettings({ fontSize });
    setSettings(updated);
  };

  const toggleSound = () => {
    const updated = storage.saveSettings({ soundEnabled: !settings.soundEnabled });
    setSettings(updated);
  };

  const toggleAnimation = () => {
    const updated = storage.saveSettings({ animationEnabled: !settings.animationEnabled });
    setSettings(updated);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      const updated = storage.saveSettings({ fullscreen: true });
      setSettings(updated);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      const updated = storage.saveSettings({ fullscreen: false });
      setSettings(updated);
    }
  };

  useEffect(() => {
    const handleFSChange = () => {
      setSettings(prev => ({ ...prev, fullscreen: !!document.fullscreenElement }));
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  return {
    settings,
    setTheme,
    setFontSize,
    toggleSound,
    toggleAnimation,
    toggleFullscreen
  };
}
