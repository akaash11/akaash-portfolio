'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { PaletteMode } from '@mui/material';
import { getTheme } from '@/theme/theme';

// Create a context for theme mode
export const ThemeModeContext = React.createContext({
  mode: 'dark' as PaletteMode,
  toggleTheme: () => {},
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const [mounted, setMounted] = React.useState(false);

  // Load theme from localStorage on mount
  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = React.useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  }, []);

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  // Prevent flash of wrong theme on initial load
  if (!mounted) {
    return null;
  }

  return (
    <AppRouterCacheProvider>
      <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
