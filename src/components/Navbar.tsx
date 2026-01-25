'use client';

import React, { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeModeContext } from './ThemeRegistry';

const sections = [
  { path: '/', id: 'home', label: 'Home' },
  { path: '/about', id: 'about', label: 'About' },
  { path: '/experience', id: 'experience', label: 'Experience' },
  { path: '/projects', id: 'projects', label: 'Projects' },
  { path: '/contact', id: 'contact', label: 'Contact' },
];

/**
 * Smart Navbar Component
 * 
 * HYBRID NAVIGATION:
 * - On homepage (/): Smooth scroll to sections
 * - On other pages: Route-based navigation using Next.js Link
 * 
 * This provides the best UX (scroll on home) while maintaining 
 * SEO benefits (separate routes for search engines).
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const { mode, toggleTheme } = useContext(ThemeModeContext);

  useEffect(() => {
    if (!isHomepage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Handle scroll trigger for navbar background
      setScrolled(window.scrollY > 50);

      // Handle active section on homepage
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 65;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setMobileOpen(false);
  };

  const handleNavClick = (section: typeof sections[0], e: React.MouseEvent) => {
    if (isHomepage) {
      // On homepage: scroll to section
      e.preventDefault();
      scrollToSection(section.id);
    } else {
      // On other pages: navigate to route
      // Let Next.js Link handle it naturally
      setMobileOpen(false);
    }
  };

  const isActive = (section: typeof sections[0]) => {
    if (isHomepage) {
      return activeSection === section.id;
    } else {
      return pathname === section.path;
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        bgcolor: 'background.paper',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={handleDrawerToggle} color="inherit" aria-label="close navigation menu">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton
              component={isHomepage ? 'button' : Link}
              href={isHomepage ? undefined : section.path}
              onClick={(e: React.MouseEvent) => handleNavClick(section, e)}
              selected={isActive(section)}
              aria-label={`Navigate to ${section.label}`}
              aria-current={isActive(section) ? 'page' : undefined}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemText primary={section.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: scrolled ? 'background.paper' : 'transparent',
          transition: 'all 0.3s ease-in-out',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                cursor: 'pointer',
                color: 'text.primary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              AT
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }} component="nav" aria-label="Main navigation">
            {sections.map((section) => (
              <Button
                key={section.id}
                component={isHomepage ? 'button' : Link}
                href={isHomepage ? undefined : section.path}
                onClick={(e: React.MouseEvent) => handleNavClick(section, e)}
                aria-current={isActive(section) ? 'page' : undefined}
                aria-label={`Navigate to ${section.label}`}
                sx={{
                  color: isActive(section) ? 'primary.main' : 'text.primary',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isActive(section) ? '80%' : '0%',
                    height: '2px',
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '80%',
                  },
                }}
              >
                {section.label}
              </Button>
            ))}
            
            {/* Theme Toggle Button - Desktop */}
            <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                role="button"
                tabIndex={0}
                sx={{
                  ml: 1,
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px',
                  },
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Mobile Actions */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, alignItems: 'center' }}>
            {/* Theme Toggle Button - Mobile */}
            <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                role="button"
                tabIndex={0}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px',
                  },
                }}
              >
                {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            
            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
