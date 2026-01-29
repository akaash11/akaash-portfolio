'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Typography, IconButton, Tooltip, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// TypeScript: Extend Window interface for debug flag
declare global {
  interface Window {
    __EASTER_EGG_LOGGED__?: boolean;
  }
}

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

interface BugMovementParams {
  direction: 1 | -1;
  diagonal: number;
  verticalBias: number;
  baseSpeed: number;
}

const MESSAGES = [
  '404 Not Found — resolved ✓',
  'Stack overflow — refactored 🔧',
  'Race condition — mitigated 🏁',
  'Memory leak — garbage collected 🗑️',
  'Segmentation fault — fixed 🛠️',
  'Null pointer Exception — derefer safely 🎯',
  'Deadlock — released 🔓',

  'Merge conflict — resolved ✨',


];

// Generate movement parameters once per session
const getMovementParams = () => {
  const cached = sessionStorage.getItem('bugMovementParams');
  if (cached) return JSON.parse(cached);
  
  const params = {
    direction: Math.random() > 0.5 ? 1 : -1, // 1 = left→right, -1 = right→left
    diagonal: (Math.random() - 0.5) * 0.3, // Slight diagonal bias
    verticalBias: Math.random() * 0.4 + 0.3, // 0.3-0.7 range for vertical position
    baseSpeed: 18000 + Math.random() * 6000, // 18-24 seconds duration
  };
  
  sessionStorage.setItem('bugMovementParams', JSON.stringify(params));
  return params;
};

const LADYBUG_SVG = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="14" rx="8" ry="10" fill="#ff4444"/>
    <circle cx="12" cy="8" r="4" fill="#1a1a1a"/>
    <circle cx="10" cy="7" r="1" fill="white"/>
    <circle cx="14" cy="7" r="1" fill="white"/>
    <path d="M12 14 L12 24" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="12" r="2" fill="#1a1a1a"/>
    <circle cx="16" cy="12" r="2" fill="#1a1a1a"/>
    <circle cx="9" cy="17" r="2" fill="#1a1a1a"/>
    <circle cx="15" cy="17" r="2" fill="#1a1a1a"/>
    <circle cx="10" cy="21" r="1.5" fill="#1a1a1a"/>
    <circle cx="14" cy="21" r="1.5" fill="#1a1a1a"/>
  </svg>
);

interface TrailDot {
  x: number;
  y: number;
  opacity: number;
  id: number;
}

const EasterEggComponent = function EasterEgg() {
  // Feature flag: Check if Easter Egg is enabled
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_EASTER_EGG === 'true';
  
  // Early return if feature is disabled
  if (!isEnabled) {
    return null;
  }
  
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Track theme to detect changes and kill/restart bug
  const prevThemeMode = useRef(isDark);
  const [isThemeTransitioning, setIsThemeTransitioning] = React.useState(false);
  
  const [mounted, setMounted] = useState(false);
  const [showBug, setShowBug] = useState(false);
  const [bugTransform, setBugTransform] = useState({ x: -50, y: 50, rotation: 0 });
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastPosition, setToastPosition] = useState({ x: 0, y: 0 });
  const [isCaught, setIsCaught] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  
  const lastTrailTime = useRef(0);
  const pauseUntil = useRef(0);
  const speedMultiplier = useRef(1);
  const animationFrameId = useRef<number | null>(null);
  const respawnTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutId = useRef<NodeJS.Timeout | null>(null);
  
  // Detect theme changes - KILL the bug completely and restart fresh
  useEffect(() => {
    if (prevThemeMode.current !== isDark) {
      prevThemeMode.current = isDark;
      
      // Cancel animation
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      
      // Clear all timers
      if (respawnTimeoutId.current) {
        clearTimeout(respawnTimeoutId.current);
        respawnTimeoutId.current = null;
      }
      if (fadeTimeoutId.current) {
        clearTimeout(fadeTimeoutId.current);
        fadeTimeoutId.current = null;
      }
      if (toastTimeoutId.current) {
        clearTimeout(toastTimeoutId.current);
        toastTimeoutId.current = null;
      }
      
      // KILL the bug - reset all state
      setShowBug(false);
      setIsCaught(false);
      setIsHovered(false);
      setShowToast(false);
      setTrail([]);
      setIsThemeTransitioning(true);
      
      // Restart fresh after theme applies (brief delay)
      const timer = setTimeout(() => {
        setIsThemeTransitioning(false);
        
        // Respawn bug fresh after theme change
        sessionStorage.removeItem('bugMovementParams'); // New random path
        setMounted(true);
        setShowBug(true); // Start fresh!
      }, 150); // Minimal delay just to let theme apply
      
      return () => clearTimeout(timer);
    }
  }, [isDark]);
  
  // Initialization useEffect - MUST be before any conditional returns!
  useEffect(() => {
    // Check if already shown this session
    const hasSeenBug = sessionStorage.getItem('easterEggShown');
    if (hasSeenBug) return;

    // Wait for page to fully load and idle
    const initBug = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setMounted(true);
          // Wait additional 2s after idle to ensure no performance impact
          setTimeout(() => {
            setShowBug(true);
            sessionStorage.setItem('easterEggShown', 'true');
          }, 2000);
        });
      } else {
        // Fallback: wait 3s after mount
        setTimeout(() => {
          setMounted(true);
          setTimeout(() => setShowBug(true), 1000);
          sessionStorage.setItem('easterEggShown', 'true');
        }, 3000);
      }
    };

    // Ensure DOM is fully loaded
    if (document.readyState === 'complete') {
      initBug();
    } else {
      window.addEventListener('load', initBug);
      return () => window.removeEventListener('load', initBug);
    }
  }, []);

  useEffect(() => {
    // Guard: don't start if bug shouldn't show or is caught
    // Note: No need to check isThemeTransitioning since we kill the bug completely
    if (!showBug || isCaught) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }

    // Guard: prevent double-initialization
    if (animationFrameId.current !== null) {
      return;
    }

    let isMounted = true;
    let frameCount = 0;
    const MAX_FRAMES = 10000;
    
    // Get or create movement params (inline to avoid dependency issues)
    let params = sessionStorage.getItem('bugMovementParams');
    let parsedParams: BugMovementParams;
    
    if (params) {
      parsedParams = JSON.parse(params);
    } else {
      const direction: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      const verticalBias = 0.1 + Math.random() * 0.8;
      const baseSpeed = 18000 + Math.random() * 6000;
      const diagonal = (Math.random() - 0.5) * 0.6;
      
      parsedParams = { direction, verticalBias, baseSpeed, diagonal };
      sessionStorage.setItem('bugMovementParams', JSON.stringify(parsedParams));
    }
    
    const duration = parsedParams.baseSpeed;
    const startTime = Date.now();
    
    const minY = 100;
    const maxY = window.innerHeight - 150;
    const baseY = minY + (maxY - minY) * parsedParams.verticalBias;
    
    const startX = parsedParams.direction === 1 ? -50 : window.innerWidth + 50;
    const endX = parsedParams.direction === 1 ? window.innerWidth + 50 : -50;
    
    let rotationOffset = 0;
    let rotationSpeed = (Math.random() - 0.5) * 0.2;
    let lastPauseCheck = 0;
    let lastFrameTime = 0;
    const TARGET_FPS = 30; // Reduced from 60fps to 30fps for better performance
    const FRAME_INTERVAL = 1000 / TARGET_FPS; // ~33ms between frames

    const animate = (currentTime: number = Date.now()) => {
      // Critical safety checks
      if (!isMounted || frameCount++ > MAX_FRAMES) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
        return;
      }
      
      // Stop if caught (external state changed)
      if (isCaught) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
        return;
      }
      
      // Pause on hover (keep loop alive but don't update)
      if (isHovered) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      // Throttle to 30fps - skip frames if updating too frequently
      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < FRAME_INTERVAL) {
        animationFrameId.current = requestAnimationFrame(animate);
        return; // Skip this frame
      }
      lastFrameTime = currentTime;
      
      const now = Date.now();
      const elapsed = now - startTime;
      
      // Handle micro-pauses (every 4-6 seconds, pause for 250-400ms)
      if (now < pauseUntil.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      if (elapsed - lastPauseCheck > 4000 && Math.random() > 0.75) {
        pauseUntil.current = now + (250 + Math.random() * 150);
        lastPauseCheck = elapsed;
      }
      
      // Speed variation
      const targetSpeed = 0.82 + Math.sin(elapsed * 0.0008) * 0.12;
      const currentSpeed = Math.max(0.7, Math.min(0.95, targetSpeed));
      speedMultiplier.current = currentSpeed;
      
      const effectiveElapsed = elapsed * currentSpeed;
      const progress = effectiveElapsed / duration;

      // Bug completed journey - escape
      if (progress >= 1) {
        if (isMounted) {
          setShowBug(false);
          setTrail([]);
          
          const respawnDelay = 15000 + Math.random() * 15000;
          respawnTimeoutId.current = setTimeout(() => {
            if (isMounted) {
              sessionStorage.removeItem('bugMovementParams');
              setShowBug(true);
              setIsCaught(false);
              setIsHovered(false);
            }
          }, respawnDelay);
        }
        return;
      }

      // Calculate position
      const baseProgress = progress;
      const crawlPattern = Math.sin(progress * Math.PI * 10) * 0.015;
      const x = startX + (endX - startX) * (baseProgress + crawlPattern);
      
      const primaryWave = Math.sin(progress * Math.PI * 5) * 12;
      const secondaryWave = Math.sin(progress * Math.PI * 15) * 4;
      const diagonalDrift = (endX - startX) * progress * parsedParams.diagonal;
      const y = baseY + primaryWave + secondaryWave + diagonalDrift;
      
      // Rotation
      rotationOffset += rotationSpeed;
      rotationSpeed += (Math.random() - 0.5) * 0.03;
      rotationSpeed = Math.max(-0.3, Math.min(0.3, rotationSpeed));
      
      const baseRotation = parsedParams.direction === 1 ? -15 : 15;
      const jitter = Math.sin(rotationOffset) * 2.5;
      const rotation = baseRotation + jitter;

      // Update state only if mounted and not caught
      if (isMounted && !isCaught) {
        // Batch position and rotation into single state update to reduce renders
        setBugTransform({ x, y, rotation });
        
        // Trail (heavily throttled to reduce renders) - only update every 300ms
        if (now - lastTrailTime.current > 300) {
          lastTrailTime.current = now;
          setTrail(prev => {
            const newDot: TrailDot = { x, y, opacity: 0.5, id: now };
            return [...prev, newDot].slice(-3);
          });
        }
        
        // Queue next frame
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      isMounted = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [showBug, isCaught, isHovered]);
  
  // Comprehensive cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all timers immediately
      if (respawnTimeoutId.current) {
        clearTimeout(respawnTimeoutId.current);
        respawnTimeoutId.current = null;
      }
      if (fadeTimeoutId.current) {
        clearTimeout(fadeTimeoutId.current);
        fadeTimeoutId.current = null;
      }
      if (toastTimeoutId.current) {
        clearTimeout(toastTimeoutId.current);
        toastTimeoutId.current = null;
      }
      // Clear animation frame
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, []);
  
  // Separate effect: pause/cleanup timers during caught state to reduce interference
  useEffect(() => {
    if (isCaught) {
      // When caught, ensure animation is fully stopped
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }
  }, [isCaught]);
  
  // Fade out trail dots
  useEffect(() => {
    if (trail.length === 0) return;
    
    const fadeInterval = setInterval(() => {
      setTrail(prev => 
        prev
          .map(dot => ({ ...dot, opacity: dot.opacity - 0.1 }))
          .filter(dot => dot.opacity > 0)
      );
    }, 100);
    
    return () => clearInterval(fadeInterval);
  }, [trail.length]);
  
  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (!showToast) return;
    
    toastTimeoutId.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    
    return () => {
      if (toastTimeoutId.current) {
        clearTimeout(toastTimeoutId.current);
      }
    };
  }, [showToast]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCaught) return;
    
    // Stop animation immediately
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    
    setIsCaught(true);
    setTrail([]);
    
    // Position toast
    setToastPosition({
      x: bugTransform.x + 40,
      y: bugTransform.y - 20,
    });
    
    // Show message
    const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setMessage(randomMessage);
    setShowToast(true);

    // Clear existing timers
    if (fadeTimeoutId.current) clearTimeout(fadeTimeoutId.current);
    if (respawnTimeoutId.current) clearTimeout(respawnTimeoutId.current);

    // Fade and respawn
    fadeTimeoutId.current = setTimeout(() => {
      setShowBug(false);
      
      respawnTimeoutId.current = setTimeout(() => {
        sessionStorage.removeItem('bugMovementParams');
        setShowBug(true);
        setIsCaught(false);
        setIsHovered(false);
      }, 15000 + Math.random() * 15000);
    }, 2800);
  }, [isCaught, bugTransform]);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  // Early returns for performance - prevent rendering when not needed
  if (isThemeTransitioning || !mounted || !showBug) return null;

  return (
    <>
      {/* Trail dots (fading) */}
      {trail.map((dot) => (
        <Box
          key={dot.id}
          sx={{
            position: 'fixed',
            left: `${dot.x}px`,
            top: `${dot.y + 10}px`,
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            bgcolor: '#ff4444',
            opacity: dot.opacity * 0.4,
            zIndex: 1,
            pointerEvents: 'none',
            transition: 'opacity 0.1s linear',
            willChange: 'opacity', // Optimize opacity transitions
            contain: 'strict', // Fully isolate trail dots
          }}
        />
      ))}
      
      {/* Ladybug */}
      <Box
        onClick={handleClick}
        onMouseEnter={() => !isCaught && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => !isCaught && setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isCaught) {
            e.preventDefault();
            handleClick(e as any);
          }
        }}
        role="button"
        tabIndex={isCaught ? -1 : 0}
        aria-label={isCaught ? 'Bug caught!' : 'Catch the bug for a surprise message'}
        aria-disabled={isCaught}
        title={isCaught ? 'Bug caught!' : 'Catch me!'}
        sx={{
          position: 'fixed',
          left: `${bugTransform.x}px`,
          top: `${bugTransform.y}px`,
          zIndex: 2,
          cursor: isCaught ? 'default' : 'pointer',
          transform: `rotate(${bugTransform.rotation}deg)`,
          transition: isCaught ? 'opacity 0.6s ease' : 'none',
          opacity: isCaught ? 0.4 : (isHovered ? 1 : 0.9),
          willChange: 'transform, left, top', // Hint browser to optimize
          contain: 'layout style paint', // Isolate rendering
          '&:hover': {
            transform: isCaught 
              ? `rotate(${bugTransform.rotation}deg)` 
              : `rotate(${bugTransform.rotation}deg) scale(1.15)`,
          },
          '&:focus-visible': {
            outline: isCaught ? 'none' : '2px solid #ff4444',
            outlineOffset: '4px',
            borderRadius: '50%',
          },
          pointerEvents: isCaught ? 'none' : 'all',
          filter: isHovered && !isCaught 
            ? 'drop-shadow(0 0 4px rgba(255, 68, 68, 0.6))' 
            : 'none',
        }}
      >
        {LADYBUG_SVG}
      </Box>

      {/* Toast notification - positioned near bug */}
      {showToast && (
        <Box
          sx={{
            position: 'fixed',
            left: `${toastPosition.x}px`,
            top: `${toastPosition.y}px`,
            zIndex: 1300,
            bgcolor: 'background.paper',
            color: 'text.primary',
            px: 2,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 3,
            border: '1px solid',
            borderColor: 'divider',
            fontWeight: 500,
            fontSize: '0.9rem',
            maxWidth: '280px',
            animation: 'fadeIn 0.2s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(-10px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>{message}</Box>
          <IconButton
            size="small"
            aria-label="close"
            onClick={handleCloseToast}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
};

// Export memoized version to prevent unnecessary re-renders during theme changes
export default React.memo(EasterEggComponent);
