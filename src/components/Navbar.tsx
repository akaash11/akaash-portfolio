'use client';

import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  // { id: 'play', label: 'Play' }, // Reserved for future use
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 125; // Offset for navbar height + buffer
      
      // Handle scroll trigger for navbar background
      setScrolled(window.scrollY > 50);

      // Handle active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 94; // Navbar height + padding
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setMobileOpen(false);
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
        <IconButton onClick={handleDrawerToggle} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton
              onClick={() => scrollToSection(section.id)}
              selected={activeSection === section.id}
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
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={() => scrollToSection('home')}
          >
            AT
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                sx={{
                  color: activeSection === section.id ? 'primary.main' : 'text.primary',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: activeSection === section.id ? '80%' : '0%',
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
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
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
