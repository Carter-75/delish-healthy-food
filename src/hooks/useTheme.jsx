import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [themes, setThemes] = useState({});

  useEffect(() => {
    // Load themes from JSON
    fetch('/data/themes/color-themes.json')
      .then(res => res.json())
      .then(data => setThemes(data))
      .catch(err => console.error('Failed to load themes:', err));
  }, []);

  const theme = themes[currentTheme] || themes.default || {};

  const value = {
    theme,
    currentTheme,
    setTheme: setCurrentTheme,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
