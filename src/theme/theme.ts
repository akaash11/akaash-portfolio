'use client';

import { createTheme, PaletteMode } from '@mui/material/styles';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#60a5fa' : '#2563eb', // blue-400 / blue-600
      light: mode === 'dark' ? '#93c5fd' : '#60a5fa',
      dark: mode === 'dark' ? '#3b82f6' : '#1e40af',
    },
    secondary: {
      main: mode === 'dark' ? '#a78bfa' : '#7c3aed', // purple-400 / purple-600
      light: mode === 'dark' ? '#c4b5fd' : '#a78bfa',
      dark: mode === 'dark' ? '#8b5cf6' : '#5b21b6',
    },
    background: {
      default: mode === 'dark' ? '#0a0a0a' : '#ffffff',
      paper: mode === 'dark' ? '#1a1a1a' : '#f9fafb',
    },
    text: {
      primary: mode === 'dark' ? '#f5f5f5' : '#111827',
      secondary: mode === 'dark' ? '#a3a3a3' : '#6b7280',
    },
    divider: mode === 'dark' ? '#2a2a2a' : '#e5e7eb',
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

// Default to dark mode
const theme = getTheme('dark');
export default theme;
