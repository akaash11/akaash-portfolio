'use client';

import Link from 'next/link';
import { Box, Container, Typography, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * Custom 404 Page
 * Displayed when users navigate to a non-existent route
 */
export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at top, 
              rgba(96, 165, 250, 0.1) 0%, 
              transparent 50%
            ),
            radial-gradient(ellipse at bottom, 
              rgba(167, 139, 250, 0.1) 0%, 
              transparent 50%
            )
          `,
          zIndex: 0,
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          {/* Icon */}
          <SearchOffIcon
            sx={{
              fontSize: 100,
              color: 'primary.main',
              mb: 3,
              opacity: 0.8,
            }}
          />

          {/* 404 Text */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 800,
              fontSize: { xs: '4rem', md: '6rem' },
              background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </Typography>

          {/* Title */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 2,
              fontWeight: 600,
            }}
          >
            Page Not Found
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              lineHeight: 1.6,
              maxWidth: 400,
              mx: 'auto',
            }}
          >
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              sx={{
                minWidth: 160,
                py: 1.5,
              }}
            >
              Go Home
            </Button>

            <Button
              onClick={() => window.history.back()}
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              sx={{
                minWidth: 160,
                py: 1.5,
              }}
            >
              Go Back
            </Button>
          </Box>

          {/* Quick Links */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mb: 2 }}
            >
              Quick links:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/about" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  About
                </Typography>
              </Link>
              <Typography variant="body2" color="text.disabled">
                •
              </Typography>
              <Link href="/projects" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Projects
                </Typography>
              </Link>
              <Typography variant="body2" color="text.disabled">
                •
              </Typography>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Contact
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
