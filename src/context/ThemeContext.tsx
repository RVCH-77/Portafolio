import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  bg: string;
  bgPattern: string;
  bgSurface: string;
  bgCard: string;
  bgCardHover: string;
  borderSubtle: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  navBg: string;
  shadowSubtle: string;
}

export const DARK_THEME: ThemeColors = {
  bg: '#070709',
  bgPattern: 'rgba(255, 255, 255, 0.12)',
  bgSurface: '#0c0d14',
  bgCard: '#0c0d14',
  bgCardHover: 'rgba(255, 255, 255, 0.04)',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.16)',
  textPrimary: '#ffffff',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  accent: '#38bdf8',
  accentHover: '#0284c7',
  accentLight: 'rgba(56, 189, 248, 0.12)',
  navBg: 'rgba(7, 7, 9, 0.85)',
  shadowSubtle: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
};

export const LIGHT_THEME: ThemeColors = {
  bg: '#f8fafc',
  bgPattern: 'rgba(15, 23, 42, 0.08)',
  bgSurface: '#ffffff',
  bgCard: '#ffffff',
  bgCardHover: 'rgba(2, 132, 199, 0.03)',
  borderSubtle: 'rgba(15, 23, 42, 0.09)',
  borderStrong: 'rgba(15, 23, 42, 0.18)',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#64748b',
  accent: '#0284c7',
  accentHover: '#0369a1',
  accentLight: 'rgba(2, 132, 199, 0.1)',
  navBg: 'rgba(255, 255, 255, 0.85)',
  shadowSubtle: '0 20px 35px -10px rgba(15, 23, 42, 0.08)',
};

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Detección de preferencia del sistema si no hay valor guardado
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#070709';
      document.body.style.color = '#ffffff';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
