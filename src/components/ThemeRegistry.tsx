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
  // Default to dark mode so the server render (and therefore search engines
  // and any JS-disabled client) gets real content immediately. Previously
  // this component returned `null` until mounted, which meant the ENTIRE
  // page body — every section on every route — was absent from the initial
  // HTML and Next.js bailed out to full client-side rendering. Returning
  // `null` here is never worth it: the "flash of wrong theme" it prevents is
  // far cheaper than making the whole site invisible without JavaScript.
  const [mode, setMode] = React.useState<PaletteMode>('dark');

  // Sync theme from localStorage after mount (client-only, may briefly
  // repaint if the visitor previously chose light mode).
  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode && savedMode !== mode) {
      setMode(savedMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
