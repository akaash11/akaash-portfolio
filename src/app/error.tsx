'use client';

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Error Boundary for the entire application
 * Catches React errors and displays a fallback UI
 * 
 * Next.js automatically wraps this as an Error Boundary
 * https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log error to console in development, or to an error reporting service in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error);
    }
    
    // TODO: Send to error reporting service (Sentry, LogRocket, etc.)
    // Example:
    // Sentry.captureException(error);
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 80,
              color: 'error.main',
              mb: 3,
            }}
          />
          
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 700,
            }}
          >
            Something went wrong
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            We encountered an unexpected error. This has been logged and we'll look into it.
            You can try refreshing the page to continue.
          </Typography>

          {process.env.NODE_ENV === 'development' && error.message && (
            <Box
              sx={{
                mb: 4,
                p: 2,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'error.main',
                borderRadius: 1,
                textAlign: 'left',
                overflow: 'auto',
              }}
            >
              <Typography
                variant="caption"
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: 'error.main',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {error.message}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<RefreshIcon />}
              onClick={reset}
              sx={{
                minWidth: 140,
              }}
            >
              Try Again
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => window.location.href = '/'}
              sx={{
                minWidth: 140,
              }}
            >
              Go Home
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
