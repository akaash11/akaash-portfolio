// Reserved for future use - Interactive typing speed test game
// Not currently in use but kept for potential future implementation

'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TimerIcon from '@mui/icons-material/Timer';
import SpeedIcon from '@mui/icons-material/Speed';

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. TypeScript is a strongly typed programming language that builds on JavaScript. Software engineering requires both technical skills and creative problem solving.`;

export default function Play() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);

  // Calculate WPM and accuracy
  const wpm = endTime && startTime
    ? Math.round((SAMPLE_TEXT.split(' ').length / ((endTime - startTime) / 1000)) * 60)
    : 0;
  
  const accuracy = input.length > 0
    ? Math.round(((input.length - errors) / input.length) * 100)
    : 100;

  const handleStart = () => {
    setGameState('playing');
    setInput('');
    setCurrentIndex(0);
    setErrors(0);
    setStartTime(Date.now());
    setEndTime(null);
  };

  const handleReset = () => {
    setGameState('idle');
    setInput('');
    setCurrentIndex(0);
    setErrors(0);
    setStartTime(null);
    setEndTime(null);
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'playing') return;

    const value = e.target.value;
    setInput(value);

    // Check for errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== SAMPLE_TEXT[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    setCurrentIndex(value.length);

    // Check if finished
    if (value.length === SAMPLE_TEXT.length) {
      setGameState('finished');
      setEndTime(Date.now());
    }
  }, [gameState]);

  // Render text with highlighting
  const renderText = () => {
    return SAMPLE_TEXT.split('').map((char, idx) => {
      let color = 'text.secondary';
      let bgColor = 'transparent';

      if (idx < currentIndex) {
        if (input[idx] === char) {
          color = 'success.main';
        } else {
          color = 'error.main';
          bgColor = 'rgba(244, 67, 54, 0.1)';
        }
      } else if (idx === currentIndex && gameState === 'playing') {
        bgColor = 'rgba(144, 202, 249, 0.2)';
      }

      return (
        <Box
          key={idx}
          component="span"
          sx={{
            color,
            bgcolor: bgColor,
            fontFamily: 'monospace',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            lineHeight: 2,
          }}
        >
          {char}
        </Box>
      );
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1, fontSize: '0.9375rem' }}>
          Test your typing speed! Type the text below as fast and accurately as you can.
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          A fun little challenge while you're here 🎯
        </Typography>
      </Box>

      {/* Stats Display */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        <Box>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
              <SpeedIcon sx={{ fontSize: 20, color: 'primary.main', mr: 0.5 }} />
              <Typography variant="caption" color="text.secondary">
                WPM
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight={700} color="primary.main">
              {wpm}
            </Typography>
          </Paper>
        </Box>
        <Box>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
              <TimerIcon sx={{ fontSize: 20, color: 'secondary.main', mr: 0.5 }} />
              <Typography variant="caption" color="text.secondary">
                Accuracy
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight={700} color="secondary.main">
              {accuracy}%
            </Typography>
          </Paper>
        </Box>
        <Box>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              Characters
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {currentIndex}/{SAMPLE_TEXT.length}
            </Typography>
          </Paper>
        </Box>
        <Box>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              Errors
            </Typography>
            <Typography variant="h5" fontWeight={700} color={errors > 0 ? 'error.main' : 'text.primary'}>
              {errors}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Text Display */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          mb: 2,
          bgcolor: 'background.default',
          minHeight: 140,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography component="div" sx={{ lineHeight: 2 }}>
          {renderText()}
        </Typography>
      </Paper>

      {/* Input Field */}
      <Box
        component="input"
        value={input}
        onChange={handleInputChange}
        disabled={gameState !== 'playing'}
        placeholder={gameState === 'idle' ? 'Click Start to begin...' : 'Type here...'}
        sx={{
          width: '100%',
          p: 2,
          mb: 2,
          fontFamily: 'monospace',
          fontSize: { xs: '0.875rem', sm: '1rem' },
          bgcolor: 'background.paper',
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          outline: 'none',
          '&:focus': {
            borderColor: 'primary.main',
          },
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
        }}
      />

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        {gameState === 'idle' && (
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={handleStart}
            sx={{ minWidth: 140 }}
          >
            Start
          </Button>
        )}
        {(gameState === 'playing' || gameState === 'finished') && (
          <Button
            variant="outlined"
            size="large"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={{ minWidth: 140 }}
          >
            Reset
          </Button>
        )}
      </Box>

      {/* Result Message */}
      {gameState === 'finished' && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              bgcolor: 'rgba(76, 175, 80, 0.1)',
              borderColor: 'success.main',
            }}
          >
            <Typography variant="h6" color="success.main" gutterBottom>
              🎉 Well Done!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You typed at <strong>{wpm} WPM</strong> with <strong>{accuracy}% accuracy</strong>
            </Typography>
            {wpm > 60 && (
              <Chip
                label="Impressive! 🚀"
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: 'success.main',
                  color: 'white',
                }}
              />
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
}
