import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import defaultThemes from '../data/colorThemes.json';

const ThemeContext = createContext();

const DEFAULT_THEME_KEY = 'default';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themes, setThemes] = useState(defaultThemes);
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME_KEY);

  useEffect(() => {
    let isMounted = true;

    const loadThemes = async () => {
      try {
        const response = await fetch('/data/themes/color-themes.json', { cache: 'force-cache' });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (isMounted && data && typeof data === 'object') {
          setThemes(prev => {
            let hasChanges = false;
            const merged = { ...prev };

            Object.entries(data).forEach(([key, value]) => {
              const prevValue = prev[key];
              if (!prevValue || JSON.stringify(prevValue) !== JSON.stringify(value)) {
                merged[key] = value;
                hasChanges = true;
              }
            });

            return hasChanges ? merged : prev;
          });
        }
      } catch (err) {
        console.error('Failed to load themes:', err);
      }
    };

    loadThemes();

    return () => {
      isMounted = false;
    };
  }, []);

  const theme = themes[currentTheme] || themes[DEFAULT_THEME_KEY] || defaultThemes[DEFAULT_THEME_KEY] || {};

  const handleSetTheme = useCallback((themeKey) => {
    setCurrentTheme(prev => (prev === themeKey ? prev : themeKey));
  }, []);

  const value = useMemo(() => ({
    theme,
    currentTheme,
    setTheme: handleSetTheme,
    themes
  }), [theme, currentTheme, handleSetTheme, themes]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
