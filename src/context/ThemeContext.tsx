import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Mode = 'light' | 'dark';
export type ThemeColor = 'red' | 'blue' | 'green';

interface ThemeContextType {
  mode: Mode;
  color: ThemeColor;
  toggleMode: () => void;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  themeColor?: ThemeColor;
}

export const ThemeProvider = ({ children, themeColor = 'blue' }: ThemeProviderProps) => {
  // Initialize mode (light/dark)
  const [mode, setMode] = useState<Mode>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Initialize color theme (red/blue/green)
  const [color, setColor] = useState<ThemeColor>(themeColor);

  useEffect(() => {
    // Apply both mode and color to document root
    document.documentElement.setAttribute('data-mode', mode);
    document.documentElement.setAttribute('data-theme-color', color);
  }, [mode, color]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const setThemeColor = (newColor: ThemeColor) => {
    setColor(newColor);
  };

  return (
    <ThemeContext.Provider value={{ mode, color, toggleMode, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

