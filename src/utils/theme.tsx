'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadUserProgress } from '@/utils/storage';

export type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  isDark: true,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{
  initialTheme?: Theme;
  theme?: Theme;
  onToggleTheme?: () => void;
  children: React.ReactNode;
}> = ({ initialTheme, theme: controlledTheme, onToggleTheme, children }) => {
  const [internalTheme, setInternalTheme] = useState<Theme>(initialTheme ?? 'dark');

  useEffect(() => {
    if (!initialTheme && !controlledTheme) {
      const saved = loadUserProgress().theme;
      if (saved) setInternalTheme(saved);
    }
  }, [initialTheme, controlledTheme]);

  const activeTheme = controlledTheme ?? internalTheme;
  const isDark = activeTheme === 'dark';

  const toggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      setInternalTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  const setTheme = (t: Theme) => {
    setInternalTheme(t);
  };

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, isDark, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
